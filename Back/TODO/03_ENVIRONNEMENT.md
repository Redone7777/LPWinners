# INSTALLER TON ENVIRONNEMENT

## Ce qu'on va installer et pourquoi

### Python
Le langage de programmation. FastAPI est en Python, donc obligatoire.

### FastAPI
Le framework web qui gère les requêtes HTTP. Sans ça, tu devrais tout coder à la main comme un sauvage.

### Uvicorn
Le serveur qui fait tourner FastAPI. FastAPI ne tourne pas tout seul.

### psycopg2
Le driver PostgreSQL pour Python. C'est ce qui permet à Python de parler à PostgreSQL.

### python-dotenv
Pour lire les variables d'environnement depuis un fichier `.env`. Parce que tu ne vas pas mettre tes mots de passe en dur dans le code.

### Pydantic
Pour valider automatiquement les données. Si le frontend envoie n'importe quoi, Pydantic bloque et renvoie une 400.

### python-jose + passlib + bcrypt
Pour créer et vérifier les tokens JWT + hasher les mots de passe. Sécurité de base.

---

## ÉTAPE 1 : Vérifier Python

```bash
python3 --version
```

Il faut Python 3.8 minimum. Idéalement 3.10+.

Si pas installé :

**Ubuntu/Debian :**
```bash
sudo apt update
sudo apt install python3 python3-pip
```

**macOS :**
```bash
brew install python3
```

**Windows :**
Télécharge depuis python.org.

---

## ÉTAPE 2 : Créer la structure

Va dans le projet :

```bash
cd /home/redone/Projet/LPWinners/Back
```

Crée les dossiers :

```bash
mkdir -p database models routes utils
```

**Ce que fait chaque dossier :**

- `database/` → Code de connexion PostgreSQL
- `models/` → Structures Pydantic pour valider les données
- `routes/` → Tous les endpoints (champions, auth, forum, items)
- `utils/` → Fonctions réutilisables (JWT, etc.)

On sépare pour pas avoir 3000 lignes dans un fichier.

---

## ÉTAPE 3 : Créer requirements.txt

Ce fichier liste toutes les dépendances Python. Comme ça, n'importe qui peut installer tout d'un coup.

Crée le fichier :

```bash
nano requirements.txt
```

Copie dedans :

```
fastapi==0.104.1
uvicorn==0.24.0
psycopg2-binary==2.9.9
python-dotenv==1.0.0
pydantic==2.5.0
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
```

Sauvegarde (Ctrl+X, Y, Enter).

**Pourquoi des versions précises ?** Pour éviter les conflits et bugs. Ces versions marchent ensemble.

---

## ÉTAPE 4 : Installer toutes les dépendances

```bash
pip3 install -r requirements.txt
```

Attends 1-2 minutes que tout se télécharge et s'installe.

Si erreur de permissions :

```bash
pip3 install --user -r requirements.txt
```

---

## ÉTAPE 5 : Créer le fichier .env

Ce fichier contient tes secrets (mot de passe DB, clé JWT).

**RÈGLE** : Ce fichier ne doit JAMAIS être commit sur Git.

```bash
nano .env
```

Copie dedans :

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lpwinners
DB_USER=postgres
DB_PASSWORD=TON_MOT_DE_PASSE_POSTGRESQL_ICI
JWT_SECRET=change_moi_avec_une_longue_chaine_aleatoire_minimum_32_caracteres
```

**Remplace** :
- `TON_MOT_DE_PASSE_POSTGRESQL_ICI` par ton vrai mot de passe PostgreSQL
- `JWT_SECRET` par une chaîne aléatoire longue (tape sur ton clavier comme un bourrin)

Exemple de JWT_SECRET : `jf84hf9d8h4f9h4f98h4f98h4f98h4f9h4f84hf9d8h4f9h4f`

**Pourquoi c'est critique ?**
Si quelqu'un a ton JWT_SECRET, il peut se faire passer pour n'importe quel utilisateur.

Sauvegarde et quitte.

---

## ÉTAPE 6 : Ajouter .env au .gitignore

Pour pas accidentellement push tes mots de passe sur GitHub.

Va à la racine :

```bash
cd /home/redone/Projet/LPWinners
```

Édite .gitignore :

```bash
nano .gitignore
```

Ajoute à la fin :

```
# Secrets
Back/.env
.env

# Python
__pycache__/
*.pyc
*.pyo
venv/
env/
```

Sauvegarde.

---

## ÉTAPE 7 : Vérifier PostgreSQL

Jimmy a déjà créé la base. Vérifie qu'elle existe et qu'elle est accessible :

```bash
psql -U postgres -d lpwinners -c "\dt"
```

Tu dois voir les tables : `champion`, `item`, `spell`, `rune`, `summoner`, `utilisateurs`.

Si erreur "could not connect" :

**Linux :**
```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**macOS :**
```bash
brew services start postgresql
```

**Windows :**
Services → PostgreSQL → Démarrer

---

## ÉTAPE 8 : Créer les tables forum

Jimmy a créé les tables de jeu mais pas celles du forum. On doit les créer.

Connecte-toi :

```bash
psql -U postgres -d lpwinners
```

Copie-colle ces 3 commandes **une par une** :

### Table forum_posts

```sql
CREATE TABLE IF NOT EXISTS forum_posts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES utilisateurs(id),
    type VARCHAR(50),
    layout VARCHAR(50),
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    description TEXT,
    content JSONB,
    tags JSONB,
    image VARCHAR(255),
    color VARCHAR(100),
    accent VARCHAR(50),
    votes INT DEFAULT 0,
    views INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Table comments

```sql
CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    post_id INT REFERENCES forum_posts(id) ON DELETE CASCADE,
    user_id INT REFERENCES utilisateurs(id),
    text TEXT NOT NULL,
    votes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**ON DELETE CASCADE** = si un post est supprimé, tous ses commentaires sont supprimés aussi. Logique.

### Table pro_matches

```sql
CREATE TABLE IF NOT EXISTS pro_matches (
    id SERIAL PRIMARY KEY,
    team1_name VARCHAR(100),
    team1_score INT,
    team2_name VARCHAR(100),
    team2_score INT,
    tournament VARCHAR(100),
    date VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Quitte PostgreSQL :

```sql
\q
```

---

## ÉTAPE 9 : Test rapide

On va créer un serveur minimal pour vérifier que tout fonctionne.

```bash
cd /home/redone/Projet/LPWinners/Back
nano test.py
```

Copie dedans :

```python
from fastapi import FastAPI
import uvicorn

app = FastAPI()

@app.get("/")
def root():
    return {"message": "LP Winners API fonctionne"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

**Explication** :
1. `FastAPI()` → Crée l'app
2. `@app.get("/")` → Route GET sur /
3. `uvicorn.run()` → Lance le serveur sur le port 8000

Sauvegarde et lance :

```bash
python3 test.py
```

Tu dois voir :

```
INFO:     Uvicorn running on http://0.0.0.0:8000
```

Ouvre ton navigateur : `http://localhost:8000`

Tu dois voir :

```json
{
  "message": "LP Winners API fonctionne"
}
```

**Si tu vois ça, c'est bon.** Tout est installé correctement.

Arrête le serveur (Ctrl+C).

Supprime le fichier de test :

```bash
rm test.py
```

---

## Récap

✅ Python installé
✅ Toutes les dépendances installées
✅ Structure de dossiers créée
✅ Fichier .env créé avec les secrets
✅ .env ajouté au .gitignore
✅ PostgreSQL accessible
✅ Tables forum créées
✅ Test réussi

---

## Prochaine étape

**04_BASE_DE_DONNEES.md**

On va créer le code de connexion à PostgreSQL. C'est ce que tous les endpoints vont utiliser pour récupérer les données.
