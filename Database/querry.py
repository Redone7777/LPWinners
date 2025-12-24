import sys
import math
import random
import os
from PyQt6 import QtGui, QtCore, QtWidgets
from PyQt6.QtCore import QSortFilterProxyModel, Qt
from PyQt6.QtWidgets import QComboBox, QApplication, QCompleter, QWidget, QMainWindow, QTableWidget, QVBoxLayout, QHBoxLayout, QLabel, QPushButton, QTableWidgetItem, QHeaderView
import psycopg2

class MainWindow(QMainWindow):

    def __init__(self):
        super().__init__()

        self.resize(1200, 800)

        main = QWidget()
        self.setCentralWidget(main)
        main.setLayout(QVBoxLayout())
        main.setFocusPolicy(Qt.FocusPolicy.StrongFocus)

        self.tableWidget = QTableWidget()
        self.tableWidget.doubleClicked.connect(self.table_Click)

        controls_panel = QHBoxLayout()

        main.layout().addLayout(controls_panel)
        main.layout().addWidget(self.tableWidget)

        _label = QLabel('Champion: ', self)
        _label.setFixedSize(70,20)
        self.first_box = QComboBox()
        self.first_box.setEditable(True)
        self.first_box.completer().setCompletionMode(QCompleter.CompletionMode.PopupCompletion)
        self.first_box.setInsertPolicy(QComboBox.InsertPolicy.NoInsert)
        controls_panel.addWidget(_label)
        controls_panel.addWidget(self.first_box)

        _label = QLabel('Extra: ', self)
        _label.setFixedSize(40,20)
        self.extra_box = QComboBox()
        self.extra_box.setEditable(True)
        self.extra_box.completer().setCompletionMode(QCompleter.CompletionMode.PopupCompletion)
        self.extra_box.setInsertPolicy(QComboBox.InsertPolicy.NoInsert)
        controls_panel.addWidget(_label)
        controls_panel.addWidget(self.extra_box)

        _label = QLabel('Table: ', self)
        _label.setFixedSize(40,20)
        self.table_box = QComboBox()
        self.table_box.addItems( ['champion', 'item', 'rune_root', 'summoner'] )
        self.table_box.setCurrentIndex( 2 )
        controls_panel.addWidget(_label)
        controls_panel.addWidget(self.table_box)

        # self.tags_layout = QHBoxLayout()
        # self.available_tags = ["Figter", "Mage", "Assasin", "Tank", "Support", "Marksman"]
        # self.checkboxes = []
        # for tag in self.available_tags:
        #     cb = QtWidgets.QCheckBox(tag)
        #     self.tags_layout.addWidget(cb)
        #     self.checkboxes.append(cb)
        # controls_panel.addChildLayout(self.tags_layout)

        self.go_button = QPushButton("Go!")
        self.go_button.clicked.connect(self.button_Go)
        controls_panel.addWidget(self.go_button)

        self.connect_DB()

        self.show()


    def keyPressEvent(self, event):
        if event.key() == Qt.Key.Key_Escape:
            self.close()
        super().keyPressEvent(event)


    def connect_DB(self):
        self.conn = psycopg2.connect(database="lpwinners", user="jimmy", host="localhost", password="Jimmy8540")
        #self.conn = psycopg2.connect(database="myuniversitydb", user="mynabil", host="localhost", password="test")
        self.cursor = self.conn.cursor()

        _table = int(self.table_box.currentText())
        #query to get the GUI dropdown box values, query result put in variable 'rows'
        if _table == "champion":
                self.cursor.execute("""SELECT * FROM champion ORDER BY name""")
                self.conn.commit()
                rows = self.cursor.fetchall()

                #pour rajouter une ligne par défaut vide
                self.first_box.addItem("")
                self.extra_box.addItem("")

                #set the values of the GUI dropdown box to those present in 'rows' 
                for row in rows : 
                    self.first_box.addItem(str(row[2]))

                self.extra_box.addItem("Skin")
                self.extra_box.addItem("Spell")

        elif _table == "item":
            self.cursor.execute("""SELECT * FROM item ORDER BY name""")
            self.conn.commit()
            rows = self.cursor.fetchall()
            #pour rajouter une ligne par défaut vide
            self.first_box.addItem("")
            #set the values of the GUI dropdown box to those present in 'rows' 
            for row in rows : 
                self.first_box.addItem(str(row[1]))
        
        elif _table == "rune_root":
            self.cursor.execute("""SELECT * FROM rune_root ORDER BY name""")
            self.conn.commit()
            rows = self.cursor.fetchall()
            #pour rajouter une ligne par défaut vide
            self.first_box.addItem("")
            self.extra_box.addItem("")
            #set the values of the GUI dropdown box to those present in 'rows' 
            for row in rows : 
                self.first_box.addItem(str(row[0]))

            self.extra_box.addItem("rune")

        elif _table == "summoner":
            self.cursor.execute("""SELECT * FROM rune_root ORDER BY name""")
            self.conn.commit()
            rows = self.cursor.fetchall()
            #pour rajouter une ligne par défaut vide
            self.first_box.addItem("")
            #set the values of the GUI dropdown box to those present in 'rows' 
            for row in rows : 
                self.first_box.addItem(str(row[1]))




    def button_Go(self):
        self.tableWidget.clearContents()

        _fromfirst = str(self.first_box.currentText())
        _extrastation = str(self.extra_box.currentText())
        _table = int(self.table_box.currentText())

        # selected_tags = []
        # for cb in self.checkboxes:
        #     if cb.isChecked():
        #         selected_tags.append(cb.text())

        rows = []

        #run query and put result in variable 'rows'
        query = ""

        #rajoute la colonne skin ou spell
        if _extrastation == "":
            query = "SELECT champion.id, champion.name, champion.title, champion.difficulty FROM champion WHERE 1 = 1 "
        else:
            query = f"SELECT champion.id, champion.name, champion.title, {_extrastation}.id, {_extrastation}.name FROM champion, {_extrastation} WHERE {_extrastation}.champion_id = champion.id "


        if _fromfirst != "":
            query = query + f"AND champion.name = '{_fromfirst}' ORDER BY champion.name"


        self.cursor.execute(query)
        self.conn.commit()
        rows += self.cursor.fetchall()

        #set values in the GUI table
        if len(rows) == 0 : 
            self.tableWidget.setRowCount(0)
            self.tableWidget.setColumnCount(0)
            return

        self.tableWidget.setRowCount(len(rows))
        self.tableWidget.setColumnCount(len(rows[-1]))

        i = 0
        for row in rows : 
            j = 0
            for col in row :
                self.tableWidget.setItem(i, j, QtWidgets.QTableWidgetItem(str(col)))
                j = j + 1
            i = i + 1

        header = self.tableWidget.horizontalHeader()
        j = 0
        while j < len(rows[-1]) :
            header.setSectionResizeMode(j, QHeaderView.ResizeMode.ResizeToContents)
            j = j+1
        
        self.update()	
       

    def table_Click(self):
        print("\n")
        for currentQTableWidgetItem in self.tableWidget.selectedItems():
            print(currentQTableWidgetItem.row(), currentQTableWidgetItem.column(), currentQTableWidgetItem.text())       
        




if __name__ == '__main__':
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec())
