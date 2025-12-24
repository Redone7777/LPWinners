import sys
from PyQt6 import QtCore, QtWidgets
from PyQt6.QtCore import Qt
from PyQt6.QtWidgets import (QComboBox, QApplication, QCompleter, QWidget, QMainWindow, 
                             QTableWidget, QVBoxLayout, QHBoxLayout, QLabel, QPushButton, 
                             QTableWidgetItem, QHeaderView)
import psycopg2

class MainWindow(QMainWindow):

    def __init__(self):
        super().__init__()

        self.resize(1200, 800)

        main = QWidget()
        self.setCentralWidget(main)
        main.setLayout(QVBoxLayout())
        
        # --- UI SETUP ---
        self.tableWidget = QTableWidget()
        # self.tableWidget.doubleClicked.connect(self.table_Click)

        controls_panel = QHBoxLayout()
        main.layout().addLayout(controls_panel)
        main.layout().addWidget(self.tableWidget)

        # 1. Choix de la Table (Le maître du jeu)
        _label = QLabel('Table: ', self)
        self.table_box = QComboBox()
        # On définit les tables disponibles
        self.table_box.addItems(['champion', 'item', 'rune_root', 'summoner'])
        # IMPORTANT : Quand on change de table, on met à jour les filtres
        self.table_box.currentTextChanged.connect(self.update_filters)
        controls_panel.addWidget(_label)
        controls_panel.addWidget(self.table_box)

        # 2. Choix du Nom (Dépend de la table)
        _label = QLabel('Name: ', self)
        self.first_box = QComboBox()
        self.first_box.setEditable(True)
        self.first_box.completer().setCompletionMode(QCompleter.CompletionMode.PopupCompletion)
        self.first_box.setInsertPolicy(QComboBox.InsertPolicy.NoInsert)
        controls_panel.addWidget(_label)
        controls_panel.addWidget(self.first_box)

        # 3. Choix Extra (Skin, Spell, Rune...)
        _label = QLabel('Extra: ', self)
        self.extra_box = QComboBox()
        self.extra_box.setEditable(True)
        controls_panel.addWidget(_label)
        controls_panel.addWidget(self.extra_box)

        self.go_button = QPushButton("Go!")
        self.go_button.clicked.connect(self.button_Go)
        controls_panel.addWidget(self.go_button)

        # --- DB CONNECTION ---
        self.connect_DB()
        
        # Une fois connecté, on initialise les filtres pour la première table (champion)
        self.update_filters(self.table_box.currentText())

        self.show()

    def connect_DB(self):
        try:
            # Ajout de l'encodage utf8 pour les accents
            self.conn = psycopg2.connect(
                database="lpwinners", user="jimmy", host="localhost", password="Jimmy8540",
                options="-c client_encoding=utf8"
            )
            self.cursor = self.conn.cursor()
        except Exception as e:
            print("Erreur de connexion:", e)

    def update_filters(self, table_name):
        """Met à jour les listes déroulantes quand on change de table"""
        self.first_box.clear()
        self.extra_box.clear()
        self.first_box.addItem("") # Ligne vide par défaut
        self.extra_box.addItem("") 

        try:
            if table_name == "champion":
                self.cursor.execute("SELECT name FROM champion ORDER BY name")
                rows = self.cursor.fetchall()
                for row in rows: self.first_box.addItem(str(row[0]))
                
                self.extra_box.addItem("Skin")
                self.extra_box.addItem("Spell")

            elif table_name == "item":
                self.cursor.execute("SELECT name FROM item ORDER BY name")
                rows = self.cursor.fetchall()
                for row in rows: self.first_box.addItem(str(row[0]))
                # Item n'a pas d'extra particulier ici

            elif table_name == "rune_root":
                self.cursor.execute("SELECT name FROM rune_root")
                rows = self.cursor.fetchall()
                for row in rows: self.first_box.addItem(str(row[0]))
                self.extra_box.addItem("rune")

            elif table_name == "summoner":
                self.cursor.execute("SELECT name FROM summoner ORDER BY name")
                rows = self.cursor.fetchall()
                for row in rows: self.first_box.addItem(str(row[0]))

        except Exception as e:
            print(f"Erreur SQL update_filters: {e}")

    def button_Go(self):
        self.tableWidget.clear()
        self.tableWidget.setRowCount(0)
        self.tableWidget.setColumnCount(0)

        selected_table = self.table_box.currentText()
        selected_name = self.first_box.currentText()
        selected_extra = self.extra_box.currentText()

        query = ""
        params = []

        # --- LOGIQUE PAR TABLE ---
        if selected_table == "champion":
            select = "SELECT c.id, c.name, c.title, c.tags"
            frm = "FROM champion c"
            where = "WHERE 1=1"

            # Gestion Extra (Jointures)
            if selected_extra == "Skin":
                select += ", s.name as skin_name"
                frm += " JOIN skin s ON c.id = s.champion_id"
            elif selected_extra == "Spell":
                select += ", sp.name as spell_name, sp.description"
                frm += " JOIN spell sp ON c.id = sp.champion_id"

            # Gestion Filtre Nom
            if selected_name != "":
                where += " AND c.name = %s"
                params.append(selected_name)
            
            query = f"{select} {frm} {where} ORDER BY c.name"

        elif selected_table == "item":
            query = "SELECT * FROM item WHERE 1=1"
            if selected_name != "":
                query += " AND name = %s"
                params.append(selected_name)
            query += " ORDER BY name"

        elif selected_table == "rune_root":
            # Si on veut voir les runes liées à une racine (ex: Domination -> Electrocute)
            if selected_extra == "rune":
                query = """
                    SELECT rr.name as branche, r.name as rune, r.shortdesc 
                    FROM rune_root rr 
                    JOIN rune r ON rr.rune_root_id = r.rune_root_id
                    WHERE 1=1
                """
            else:
                query = "SELECT * FROM rune_root WHERE 1=1"
            
            if selected_name != "":
                query += " AND rr.name = %s" if "rr.name" in query else " AND name = %s"
                params.append(selected_name)

        elif selected_table == "summoner":
            query = "SELECT * FROM summoner WHERE 1=1"
            if selected_name != "":
                query += " AND name = %s"
                params.append(selected_name)

        # --- EXECUTION ---
        try:
            self.cursor.execute(query, tuple(params))
            rows = self.cursor.fetchall()
            
            if not rows: return

            # Affichage dynamique
            self.tableWidget.setRowCount(len(rows))
            self.tableWidget.setColumnCount(len(rows[0]))
            
            if self.cursor.description:
                headers = [desc[0] for desc in self.cursor.description]
                self.tableWidget.setHorizontalHeaderLabels(headers)

            for i, row in enumerate(rows):
                for j, col in enumerate(row):
                    self.tableWidget.setItem(i, j, QTableWidgetItem(str(col)))
            
            # Ajustement colonnes
            header = self.tableWidget.horizontalHeader()
            for j in range(len(rows[0])):
                header.setSectionResizeMode(j, QHeaderView.ResizeMode.ResizeToContents)

        except Exception as e:
            print(f"Erreur SQL execution: {e}")

if __name__ == '__main__':
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec())