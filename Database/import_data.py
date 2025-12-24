import psycopg2
import os
from dotenv import load_dotenv

# Chargement de la configuration
load_dotenv(dotenv_path="../.env")

def run_import():
    try:
        # Connexion à la base de données
        conn = psycopg2.connect(
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            host=os.getenv("DB_HOST"),
            port=os.getenv("DB_PORT"),
            dbname=os.getenv("DB_NAME")
        )
        conn.autocommit = True
        cursor = conn.cursor()
        
        # Exécution des scripts SQL
        for sql_file in ["schema.sql", "data.sql"]:
            print(f"Exécution de {sql_file}...")
            
            with open(sql_file, 'r', encoding='utf-8') as f:
                cursor.execute(f.read())
                
            print(f"{sql_file} terminé.")

        # Fermeture des connexions
        cursor.close()
        conn.close()

    except Exception as e:
        print(f"Erreur : {e}")

if __name__ == "__main__":
    run_import()
