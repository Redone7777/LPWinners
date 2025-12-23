# CONNEXION À POSTGRESQL

## Ce qu'on va créer

Un fichier `database/db.py` avec une fonction `get_db_connection()` que tous les endpoints vont utiliser.

**Pourquoi une fonction ?** Pour pas répéter 50 fois le même code de connexion.

## Comment psycopg2 fonctionne

psycopg2 = Le driver PostgreSQL pour Python.

**Flow standard :**

1. Tu ouvres une connexion
2. Tu crées un cursor
3. Tu exécutes des requêtes SQL
4. Tu récupères les résultats
5. Tu commit (si INSERT/UPDATE/DELETE)
6. Tu fermes cursor et connexion

**Important** : Si tu oublies de fermer, tu vas avoir des "connection pool exhausted" au bout d'un moment.

## RealDictCursor vs Cursor normal

### Cursor normal (tuple)
```python
cursor.execute("SELECT id, name FROM champion WHERE id = 1")
result = cursor.fetchone()
# result = (1, "Jinx")  ← tuple, tu dois te rappeler l'ordre
```

### RealDictCursor (dictionnaire)
```python
cursor.execute("SELECT id, name FROM champion WHERE id = 1")
result = cursor.fetchone()
# result = {"id": 1, "name": "Jinx"}  ← dict, tu accèdes par clé
```

On utilise **RealDictCursor** parce que :
- Pas besoin de se rappeler l'ordre des colonnes
- Facile à convertir en JSON
- Plus lisible

## Créer database/db.py

```bash
cd /home/redone/Projet/LPWinners/Back
nano database/db.py
```

Copie dedans :

```python
import psycopg2
from psycopg2.extras import RealDictCursor
import os
from dotenv import load_dotenv

# Charge les variables d'environnement depuis .env
load_dotenv()

def get_db_connection():
    """
    Crée et retourne une connexion PostgreSQL.
    Utilise RealDictCursor pour avoir des dicts au lieu de tuples.
    """
    return psycopg2.connect(
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT"),
        database=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        cursor_factory=RealDictCursor
    )
```

Sauvegarde.

## Explication ligne par ligne

```python
import psycopg2
```
Le driver PostgreSQL.

```python
from psycopg2.extras import RealDictCursor
```
Import du cursor qui retourne des dicts.

```python
from dotenv import load_dotenv
```
Pour lire le fichier .env.

```python
load_dotenv()
```
Charge DB_HOST, DB_PORT, etc. depuis .env dans l'environnement.

```python
def get_db_connection():
```
Fonction qu'on va appeler partout.

```python
return psycopg2.connect(...)
```
Crée la connexion avec les paramètres depuis .env.

```python
cursor_factory=RealDictCursor
```
Force l'utilisation de RealDictCursor.

## Comment l'utiliser dans un endpoint

```python
from database.db import get_db_connection

@app.get("/api/champions")
def get_champions():
    # 1. Ouvrir connexion
    conn = get_db_connection()
    cursor = conn.cursor()

    # 2. Exécuter requête
    cursor.execute("SELECT id, name, title FROM champion")

    # 3. Récupérer résultats
    champions = cursor.fetchall()  # Liste de dicts

    # 4. Fermer
    cursor.close()
    conn.close()

    # 5. Return
    return champions
```

## fetchone() vs fetchall() vs fetchmany()

```python
# fetchone() → Un seul résultat (dict ou None)
cursor.execute("SELECT * FROM champion WHERE id = %s", (1,))
champion = cursor.fetchone()
# champion = {"id": 1, "name": "Jinx", ...}

# fetchall() → Tous les résultats (liste de dicts)
cursor.execute("SELECT * FROM champion")
champions = cursor.fetchall()
# champions = [{"id": 1, ...}, {"id": 2, ...}, ...]

# fetchmany(n) → n résultats
cursor.execute("SELECT * FROM champion")
first_10 = cursor.fetchmany(10)
```

## Requêtes paramétrées (CRITIQUE pour la sécurité)

### ❌ DANGER - Injection SQL
```python
# JAMAIS FAIRE ÇA
name = request.get("name")
cursor.execute(f"SELECT * FROM champion WHERE name = '{name}'")
# Si name = "'; DROP TABLE champion; --"
# Ta base est détruite
```

### ✅ CORRECT - Requête paramétrée
```python
name = request.get("name")
cursor.execute("SELECT * FROM champion WHERE name = %s", (name,))
# psycopg2 échappe automatiquement les caractères dangereux
```

**Règle absolue** : TOUJOURS utiliser `%s` et passer les valeurs en tuple.

## INSERT et récupérer l'id

```python
cursor.execute(
    "INSERT INTO utilisateurs (pseudo, mail, password) VALUES (%s, %s, %s) RETURNING id",
    ("Yanis", "yanis@test.com", "hashed_password")
)

user_id = cursor.fetchone()["id"]  # Récupère l'id auto-généré
conn.commit()  # OBLIGATOIRE pour les INSERT/UPDATE/DELETE
```

**RETURNING id** = PostgreSQL te renvoie l'id de la ligne créée.

## UPDATE

```python
cursor.execute(
    "UPDATE forum_posts SET votes = votes + 1 WHERE id = %s",
    (post_id,)
)
conn.commit()  # OBLIGATOIRE
```

## DELETE

```python
cursor.execute(
    "DELETE FROM comments WHERE id = %s",
    (comment_id,)
)
conn.commit()  # OBLIGATOIRE
```

## Commit vs Rollback

### Commit
= Valider les changements définitivement.

```python
cursor.execute("INSERT INTO ...")
conn.commit()  # Les données sont maintenant dans la base
```

### Rollback
= Annuler les changements.

```python
try:
    cursor.execute("INSERT INTO ...")
    cursor.execute("UPDATE ...")
    conn.commit()
except Exception as e:
    conn.rollback()  # Annule tout en cas d'erreur
    raise e
```

**Règle** : Les SELECT ne nécessitent PAS de commit. Les INSERT/UPDATE/DELETE OUI.

## Gestion des erreurs

```python
from database.db import get_db_connection
from fastapi import HTTPException

@app.get("/api/champions/{champion_id}")
def get_champion(champion_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT * FROM champion WHERE id = %s", (champion_id,))
        champion = cursor.fetchone()

        if not champion:
            raise HTTPException(status_code=404, detail="Champion not found")

        return champion

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        conn.close()
```

**finally** = S'exécute TOUJOURS, même si erreur. Garantit que la connexion est fermée.

## JSONB dans PostgreSQL

La base de Jimmy utilise JSONB pour certaines colonnes (tags, content, etc.).

**Bonne nouvelle** : psycopg2 convertit automatiquement JSONB en dict Python.

```python
cursor.execute("SELECT tags FROM champion WHERE id = 1")
result = cursor.fetchone()
# result["tags"] = ["Marksman", "Assassin"]  ← Déjà un array Python
```

Pour INSERT avec JSONB :

```python
from psycopg2.extras import Json

content = {"intro": "...", "gameplay": "..."}
tags = ["ADC", "Guide"]

cursor.execute(
    "INSERT INTO forum_posts (content, tags) VALUES (%s, %s)",
    (Json(content), Json(tags))
)
```

**Json()** = Wrapper pour dire à psycopg2 de traiter ça comme du JSONB.

## Arrays PostgreSQL

Jimmy utilise des arrays (`tags TEXT[]` par exemple).

**Accéder au premier élément** :

```python
# SQL
cursor.execute("SELECT tags[1] as role FROM champion WHERE id = 1")
# PostgreSQL array commence à 1, pas 0

result = cursor.fetchone()
# result["role"] = "Marksman"
```

## Test de la connexion

Crée un fichier de test :

```bash
nano test_db.py
```

Copie dedans :

```python
from database.db import get_db_connection

try:
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) as total FROM champion")
    result = cursor.fetchone()

    print(f"✅ Connexion réussie ! Il y a {result['total']} champions dans la base.")

    cursor.close()
    conn.close()

except Exception as e:
    print(f"❌ Erreur de connexion : {e}")
```

Lance :

```bash
python3 test_db.py
```

Tu dois voir :

```
✅ Connexion réussie ! Il y a 168 champions dans la base.
```

Si erreur, vérifie :
- PostgreSQL tourne (`systemctl status postgresql`)
- .env contient le bon mot de passe
- La base `lpwinners` existe

Supprime le test :

```bash
rm test_db.py
```

## Récap

✅ `database/db.py` créé avec `get_db_connection()`
✅ Utilise `RealDictCursor` pour avoir des dicts
✅ Requêtes paramétrées avec `%s` (sécurité)
✅ `commit()` après INSERT/UPDATE/DELETE
✅ `finally` pour toujours fermer les connexions
✅ JSONB converti automatiquement en dict
✅ Test de connexion réussi

## Prochaine étape

**05_AUTHENTIFICATION.md**

On va créer le système JWT pour les connexions utilisateurs (register, login, protection des routes).
