# GUIDE BACKEND FASTAPI POUR YANIS

**Lis ce document dans l'ordre. Ne saute pas d'étapes. Ne fais pas "à ta manière".**

Le frontend est DÉJÀ FAIT. La base de données PostgreSQL est DÉJÀ FAITE par Jimmy.

TON SEUL TRAVAIL : Créer le serveur backend FastAPI qui fait le pont entre la base de données de Jimmy et le frontend.

---

## PARTIE 1 : COMPRENDRE LES APIS (OBLIGATOIRE À LIRE)

### C'est quoi une API ?

Une API (Application Programming Interface) est un serveur qui reçoit des requêtes HTTP et renvoie des données au format JSON.

**Exemple concret :**

Le frontend veut afficher la liste des champions. Voilà ce qui se passe :

1. Frontend envoie : `GET http://localhost:8000/api/champions`
2. Backend reçoit la requête
3. Backend va chercher les données dans PostgreSQL
4. Backend transforme les données au bon format
5. Backend renvoie : `[{"id": 1, "name": "Jinx", "role": "marksman"}, ...]`
6. Frontend affiche les champions à l'utilisateur

**Les 4 types de requêtes HTTP que tu vas utiliser :**

- **GET** : Récupérer des données (ex: liste des champions)
- **POST** : Créer quelque chose (ex: nouveau commentaire)
- **PUT** : Modifier quelque chose (ex: éditer un post)
- **DELETE** : Supprimer quelque chose (ex: supprimer un commentaire)

### Comment tester une API ?

Tu utilises **Postman** ou **Thunder Client** (extension VS Code).

**Exemple de test :**

```
GET http://localhost:8000/api/champions
```

Résultat attendu :
```json
[
  {
    "id": 1,
    "name": "Jinx",
    "title": "the Loose Cannon",
    "role": "marksman",
    "image_url": "https://..."
  }
]
```

### Authentification JWT

Pour certaines routes (créer un post, poster un commentaire), l'utilisateur doit être connecté.

**Comment ça marche :**

1. Utilisateur se connecte avec email + mot de passe
2. Backend vérifie les identifiants
3. Backend crée un TOKEN JWT (une longue chaîne de caractères cryptée)
4. Frontend stocke ce token
5. Pour chaque requête protégée, frontend envoie : `Authorization: Bearer TOKEN`
6. Backend vérifie le token avant d'exécuter l'action

---

## PARTIE 2 : STRUCTURE DU PROJET

### Ce qui est DÉJÀ fait (ne touche PAS) :

- Frontend React complet (port 5173)
- Base de données PostgreSQL par Jimmy avec tables : `champion`, `item`, `spell`, `rune`, `summoner`, `utilisateurs`

### Ce que TU dois faire :

Créer un backend FastAPI (Python) sur le port 8000 qui :

1. Se connecte à la base PostgreSQL de Jimmy
2. Expose des routes API (`/api/champions`, `/api/forum/posts`, etc.)
3. Transforme les données de Jimmy au format attendu par le frontend
4. Gère l'authentification JWT

### Structure des dossiers que tu vas créer :

```
Backend/
├── main.py              # Point d'entrée du serveur
├── .env                 # Configuration (mot de passe DB, secret JWT)
├── requirements.txt     # Dépendances Python
├── database/
│   └── db.py           # Connexion PostgreSQL
├── models/
│   └── schemas.py      # Structures de données (Pydantic)
├── routes/
│   ├── auth.py         # Login/Register
│   ├── champions.py    # Champions
│   ├── forum.py        # Forum posts
│   └── items.py        # Items, sorts, runes
└── utils/
    └── auth.py         # Gestion JWT
```

---

## PARTIE 3 : INSTALLATION ET CONFIGURATION

### Étape 1 : Installer Python et les dépendances

Tu as besoin de Python 3.8+ installé.

Crée le dossier Backend :

```bash
cd /home/redone/Projet/LPWinners
mkdir Backend
cd Backend
```

Crée un fichier `requirements.txt` avec ce contenu :

```
fastapi==0.104.1
uvicorn==0.24.0
psycopg2-binary==2.9.9
python-dotenv==1.0.0
pydantic==2.5.0
python-jose[cryptography]==3.3.0
passlib==1.7.4
bcrypt==4.1.1
```

Installe tout :

```bash
pip install -r requirements.txt
```

### Étape 2 : Configuration de la base de données

Crée un fichier `.env` :

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lpwinners
DB_USER=postgres
DB_PASSWORD=ton_mot_de_passe
JWT_SECRET=un_secret_ultra_long_et_securise_minimum_32_caracteres
```

**IMPORTANT :** Remplace `ton_mot_de_passe` par ton vrai mot de passe PostgreSQL.

### Étape 3 : Vérifier que la base de Jimmy existe

```bash
psql -U postgres -d lpwinners -c "\dt"
```

Tu dois voir les tables : `champion`, `item`, `spell`, `rune`, `summoner`, `utilisateurs`.

**Si elles n'existent pas :**

```bash
cd ../Database
psql -U postgres -d lpwinners -f schema.sql
psql -U postgres -d lpwinners -f data.sql
```

### Étape 4 : Créer les tables forum (manquantes)

Jimmy n'a créé que les tables de jeu. Il manque les tables forum.

Connecte-toi à PostgreSQL :

```bash
psql -U postgres -d lpwinners
```

Exécute ces commandes :

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

CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    post_id INT REFERENCES forum_posts(id) ON DELETE CASCADE,
    user_id INT REFERENCES utilisateurs(id),
    text TEXT NOT NULL,
    votes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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

Quitte PostgreSQL : `\q`

---

## PARTIE 4 : MAPPING BASE DE DONNÉES → FRONTEND

**ATTENTION YANIS :** La base de Jimmy utilise des noms de colonnes DIFFÉRENTS de ce que le frontend attend.

### Table utilisateurs (Jimmy) → User (Frontend)

| Base de données | Frontend attend |
|-----------------|-----------------|
| `pseudo` | `username` |
| `mail` | `email` |
| `password` | `password` |

### Table champion (Jimmy) → Champion (Frontend)

| Base de données | Frontend attend | Note |
|-----------------|-----------------|------|
| `riot_id` | - | Utilise pour construire image_url |
| `name` | `name` | Pareil |
| `title` | `title` | Pareil |
| `tags[1]` | `role` | Premier tag = rôle |
| `hp` | `stats.hp` | Arrondir |
| `mp` | `stats.mana` | Arrondir |
| `attackdamage` | `stats.attack_damage` | Arrondir |
| `armor` | `stats.armor` | Arrondir |
| `spellblock` | `stats.magic_resist` | Arrondir |
| `attackspeed` | `stats.attack_speed` | Décimal |
| `movespeed` | `stats.movement_speed` | Arrondir |
| `allytips` | `tips` | Array JSONB |

### URLs CDN pour les images

Les images ne sont pas dans ta base. Tu dois construire les URLs :

```python
# Champion splash
f"https://ddragon.leagueoflegends.com/cdn/img/champion/splash/{riot_id}_0.jpg"

# Item
f"https://ddragon.leagueoflegends.com/cdn/13.1.1/img/item/{item_id}.png"

# Spell
f"https://ddragon.leagueoflegends.com/cdn/13.1.1/img/spell/{image_spell}"
```

---

## PARTIE 5 : CODE DU BACKEND (PAR ORDRE DE PRIORITÉ)

### PRIORITÉ 1 : Connexion à la base de données

Crée `database/db.py` :

**Principe :** Ce fichier crée une connexion à PostgreSQL que tous tes endpoints vont utiliser.

```python
import psycopg2
from psycopg2.extras import RealDictCursor
import os
from dotenv import load_dotenv

load_dotenv()

def get_db_connection():
    return psycopg2.connect(
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT"),
        database=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        cursor_factory=RealDictCursor  # Retourne des dicts au lieu de tuples
    )
```

**RealDictCursor** = les résultats SQL seront des dictionnaires Python (pratique pour JSON).

### PRIORITÉ 2 : Authentification JWT

Crée `utils/auth.py` :

**Principe :** Fonctions pour créer et vérifier les tokens JWT.

```python
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
import os

SECRET_KEY = os.getenv("JWT_SECRET")
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    """Hasher le mot de passe avec bcrypt"""
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    """Vérifier que le mot de passe correspond"""
    return pwd_context.verify(plain, hashed)

def create_token(data: dict) -> str:
    """Créer un token JWT valide 7 jours"""
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=7)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def verify_token(token: str) -> dict:
    """Vérifier et décoder le token"""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None
```

### PRIORITÉ 3 : Routes d'authentification

Crée `routes/auth.py` :

**Principe :** 2 routes - register pour créer un compte, login pour se connecter.

Format de réponse attendu par le frontend :

```json
{
  "token": "eyJhbGciOi...",
  "user": {
    "id": 1,
    "username": "Yanis",
    "email": "yanis@example.com",
    "avatar": null
  }
}
```

Code (simplifié, tu complètes) :

```python
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database.db import get_db_connection
from utils.auth import hash_password, verify_password, create_token

router = APIRouter(prefix="/api/auth", tags=["auth"])

class RegisterRequest(BaseModel):
    username: str
    email: str
    password: str

@router.post("/register")
def register(data: RegisterRequest):
    conn = get_db_connection()
    cursor = conn.cursor()

    # Vérifier si l'email existe déjà
    cursor.execute("SELECT * FROM utilisateurs WHERE mail = %s", (data.email,))
    if cursor.fetchone():
        raise HTTPException(status_code=400, detail="Email already exists")

    # Hasher le mot de passe
    hashed = hash_password(data.password)

    # Insérer l'utilisateur (ATTENTION : colonnes pseudo et mail, pas username et email)
    cursor.execute(
        "INSERT INTO utilisateurs (pseudo, mail, password) VALUES (%s, %s, %s) RETURNING id",
        (data.username, data.email, hashed)
    )
    user_id = cursor.fetchone()["id"]
    conn.commit()

    # Créer le token
    token = create_token({"id": user_id, "username": data.username, "email": data.email})

    cursor.close()
    conn.close()

    # Retourner au format attendu par le frontend
    return {
        "token": token,
        "user": {
            "id": user_id,
            "username": data.username,
            "email": data.email,
            "avatar": None,
            "created_at": datetime.now().isoformat()
        }
    }

@router.post("/login")
def login(data: LoginRequest):
    # Même principe mais tu vérifies le mot de passe au lieu de créer un user
    # ...
```

**Points importants :**

- PostgreSQL utilise `%s` pour les paramètres (pas `?` comme SQLite)
- Tu DOIS utiliser `pseudo` et `mail` (colonnes de Jimmy), pas `username` et `email`
- Tu DOIS retourner `username` et `email` au frontend (transformation)

### PRIORITÉ 4 : Routes champions

Crée `routes/champions.py` :

**Principe :** 2 routes - liste de tous les champions, détails d'un champion.

**Route 1 : GET /api/champions**

Format attendu :

```json
[
  {
    "id": 1,
    "name": "Jinx",
    "title": "the Loose Cannon",
    "role": "marksman",
    "image_url": "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jinx_0.jpg"
  }
]
```

Code (simplifié) :

```python
from fastapi import APIRouter
from database.db import get_db_connection

router = APIRouter(prefix="/api/champions", tags=["champions"])

@router.get("")
def get_all_champions():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Requête SQL : ATTENTION aux transformations
    cursor.execute("""
        SELECT
            id,
            name,
            title,
            tags[1] as role,
            riot_id
        FROM champion
        ORDER BY name
    """)

    champions = cursor.fetchall()
    cursor.close()
    conn.close()

    # Transformer pour ajouter image_url
    result = []
    for champ in champions:
        result.append({
            "id": champ["id"],
            "name": champ["name"],
            "title": champ["title"],
            "role": champ["role"],
            "image_url": f"https://ddragon.leagueoflegends.com/cdn/img/champion/splash/{champ['riot_id']}_0.jpg"
        })

    return result
```

**Route 2 : GET /api/champions/{id}**

Format attendu : Beaucoup plus complexe avec stats, abilities, tips.

**Astuce :** Tu dois faire 2 requêtes SQL :
1. Récupérer le champion
2. Récupérer ses spells (compétences)

Ensuite tu combines tout dans un seul objet JSON.

### PRIORITÉ 5 : Routes forum

Crée `routes/forum.py` :

**4 routes importantes :**

1. `GET /api/forum/posts` - Liste des posts
2. `GET /api/forum/posts/{id}` - Détails d'un post
3. `POST /api/forum/posts` - Créer un post (PROTÉGÉ par JWT)
4. `GET /api/forum/posts/{id}/comments` - Commentaires d'un post
5. `POST /api/forum/posts/{id}/comments` - Ajouter un commentaire (PROTÉGÉ)

**Comment protéger une route avec JWT :**

```python
from fastapi import Depends, Header, HTTPException
from utils.auth import verify_token

def get_current_user(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Unauthorized")

    token = authorization.replace("Bearer ", "")
    user = verify_token(token)

    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")

    return user

@router.post("/posts/{post_id}/comments")
def create_comment(post_id: int, data: CommentRequest, user = Depends(get_current_user)):
    # user contient maintenant {"id": 1, "username": "...", "email": "..."}
    # Tu peux utiliser user["id"] pour insérer le commentaire
    ...
```

### PRIORITÉ 6 : Routes items, sorts, runes

Crée `routes/items.py` :

**3 routes simples :**

```python
@router.get("/items")
def get_items():
    # SELECT id, name, tags[1] as category, cost_total as gold FROM item WHERE in_store = true
    # Ajouter image_url avec CDN
    ...

@router.get("/spells")
def get_spells():
    # SELECT id, name, cooldown, image_icon FROM summoner
    # Ajouter image_url avec CDN
    ...

@router.get("/runes")
def get_runes():
    # JOIN entre rune et rune_root
    # SELECT rune_id, rune.name, rune_root.name as category, image_icon
    ...
```

### PRIORITÉ 7 : Fichier principal

Crée `main.py` :

**Principe :** Lance le serveur FastAPI et enregistre toutes les routes.

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth, champions, forum, items

app = FastAPI(title="LP Winners API")

# CORS pour permettre au frontend de te parler
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5175"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Enregistrer toutes les routes
app.include_router(auth.router)
app.include_router(champions.router)
app.include_router(forum.router)
app.include_router(items.router)

@app.get("/")
def root():
    return {"message": "LP Winners API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

### PRIORITÉ 8 : Lancer le serveur

```bash
cd Backend
python main.py
```

Tu dois voir :

```
INFO:     Uvicorn running on http://0.0.0.0:8000
```

Teste dans ton navigateur : `http://localhost:8000`

Tu dois voir : `{"message": "LP Winners API is running"}`

### PRIORITÉ 9 : Tester les endpoints

Utilise Postman ou Thunder Client.

**Test 1 : Register**

```
POST http://localhost:8000/api/auth/register
Content-Type: application/json

{
  "username": "Yanis",
  "email": "yanis@test.com",
  "password": "password123"
}
```

Résultat attendu : Status 200 + token + user

**Test 2 : Champions**

```
GET http://localhost:8000/api/champions
```

Résultat attendu : Status 200 + array de champions

**Test 3 : Créer un commentaire (protégé)**

```
POST http://localhost:8000/api/forum/posts/1/comments
Content-Type: application/json
Authorization: Bearer TON_TOKEN_ICI

{
  "text": "Super guide !"
}
```

Résultat attendu : Status 201 + nouveau commentaire

---

## PARTIE 6 : DONNÉES DE TEST (SEED)

Crée un fichier `seed.py` à la racine de Backend :

**Principe :** Script Python qui ajoute des données de forum (Jimmy a déjà rempli champions/items/etc.)

```python
import psycopg2
from psycopg2.extras import Json
from utils.auth import hash_password
import os
from dotenv import load_dotenv

load_dotenv()

conn = psycopg2.connect(
    host=os.getenv("DB_HOST"),
    database=os.getenv("DB_NAME"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD")
)

cursor = conn.cursor()

# Créer un utilisateur de test
hashed = hash_password("password123")
cursor.execute(
    "INSERT INTO utilisateurs (pseudo, mail, password) VALUES (%s, %s, %s) RETURNING id",
    ("TestUser", "test@example.com", hashed)
)
user_id = cursor.fetchone()[0]

# Créer un post de forum
content = {
    "intro": "Jinx is a hyper carry ADC...",
    "gameplay": "Focus on farming...",
    "combos": []
}

tags = ["ADC", "Guide", "Jinx"]

cursor.execute("""
    INSERT INTO forum_posts (user_id, type, layout, title, description, content, tags, votes, views)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
""", (user_id, "guide", "featured", "Ultimate Jinx Guide", "Learn to carry",
      Json(content), Json(tags), 42, 1523))

# Créer des commentaires
cursor.execute("""
    INSERT INTO comments (post_id, user_id, text, votes)
    VALUES (1, %s, %s, %s)
""", (user_id, "Great guide!", 5))

conn.commit()
cursor.close()
conn.close()

print("Seed completed!")
```

Lance-le :

```bash
python seed.py
```

---

## PARTIE 7 : CHECKLIST AVANT DE DIRE "C'EST FINI"

### Configuration

- [ ] PostgreSQL installé et tourne
- [ ] Base de données `lpwinners` existe
- [ ] Tables de Jimmy présentes (champion, item, spell, rune, summoner, utilisateurs)
- [ ] Tables forum créées (forum_posts, comments, pro_matches)
- [ ] Fichier .env configuré avec bon mot de passe
- [ ] Dépendances Python installées (requirements.txt)

### Endpoints authentification

- [ ] POST /api/auth/register fonctionne
- [ ] POST /api/auth/login fonctionne
- [ ] Les tokens JWT sont générés
- [ ] Les mots de passe sont hashés (bcrypt)
- [ ] Format de réponse correct (token + user)

### Endpoints champions

- [ ] GET /api/champions retourne la liste
- [ ] GET /api/champions/{id} retourne les détails
- [ ] Les données sont transformées au bon format
- [ ] Les image_url sont construites avec CDN

### Endpoints forum

- [ ] GET /api/forum/posts retourne la liste
- [ ] GET /api/forum/posts/{id} retourne le détail
- [ ] POST /api/forum/posts crée un post (protégé JWT)
- [ ] GET /api/forum/posts/{id}/comments retourne les commentaires
- [ ] POST /api/forum/posts/{id}/comments crée un commentaire (protégé JWT)

### Endpoints items/sorts/runes

- [ ] GET /api/items fonctionne
- [ ] GET /api/spells fonctionne
- [ ] GET /api/runes fonctionne
- [ ] Les données sont transformées au bon format

### Sécurité

- [ ] CORS activé pour localhost:5173
- [ ] JWT fonctionne pour les routes protégées
- [ ] Mot de passe jamais en clair
- [ ] .env dans .gitignore

### Tests

- [ ] Testé tous les endpoints avec Postman
- [ ] Vérifié les codes HTTP (200, 201, 400, 401, 404, 500)
- [ ] Données de test présentes (seed.py)

---

## PARTIE 8 : ERREURS COURANTES

### Erreur : "Cannot connect to database"

Solutions :
- Vérifie que PostgreSQL tourne : `systemctl status postgresql`
- Vérifie le mot de passe dans .env
- Vérifie que la base `lpwinners` existe : `psql -U postgres -l`

### Erreur : "CORS policy error"

Solutions :
- Vérifie que tu as ajouté le middleware CORS dans main.py
- Vérifie que l'URL du frontend est dans allow_origins

### Erreur : "column pseudo does not exist"

Solutions :
- Tu as utilisé "username" au lieu de "pseudo"
- Rappel : base de Jimmy utilise "pseudo" et "mail", pas "username" et "email"

### Erreur : "Unauthorized" même avec token

Solutions :
- Vérifie que tu envoies `Authorization: Bearer TOKEN`
- Vérifie que JWT_SECRET est le même partout
- Vérifie que le token n'a pas expiré (7 jours)

### Erreur : "syntax error near $1"

Solutions :
- PostgreSQL utilise %s, pas $1 en psycopg2
- Exemple correct : `cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))`

---

## PARTIE 9 : RÉSUMÉ POUR YANIS

### Ce qui est déjà fait (ne touche pas)

- Base de données PostgreSQL par Jimmy (champion, item, spell, rune, summoner, utilisateurs)
- Frontend React complet
- Documentation complète

### Ton travail (dans l'ordre)

1. Installer Python et dépendances (requirements.txt)
2. Créer fichier .env avec configuration DB
3. Créer les tables forum (forum_posts, comments, pro_matches)
4. Créer database/db.py (connexion PostgreSQL)
5. Créer utils/auth.py (JWT et hashing)
6. Créer routes/auth.py (register + login)
7. Créer routes/champions.py (liste + détails)
8. Créer routes/forum.py (posts + commentaires)
9. Créer routes/items.py (items + spells + runes)
10. Créer main.py (serveur FastAPI)
11. Lancer seed.py pour données de test
12. Tester TOUS les endpoints avec Postman

### Points critiques à ne pas rater

- PostgreSQL utilise %s pour les paramètres (pas $1)
- Table users s'appelle "utilisateurs" avec colonnes "pseudo" et "mail"
- Tu dois TRANSFORMER les données de Jimmy en formats frontend
- JSONB n'a pas besoin de conversion (déjà dict Python)
- Les arrays PostgreSQL : tags[1] pour le premier élément
- Toujours utiliser RealDictCursor pour avoir des dicts
- Construire les image_url avec les CDN (pas dans la base)
- JWT pour protéger certaines routes (Depends)
- CORS obligatoire sinon le frontend ne peut pas te parler

### Temps estimé

- Si tu suis le guide : 3-4 heures
- Si tu improvises : 3 jours + bugs

### Commandes de base

```bash
# Installer dépendances
pip install -r requirements.txt

# Lancer le serveur
python main.py

# Seed la base
python seed.py

# Tester connexion PostgreSQL
psql -U postgres -d lpwinners
```

---

**Date de création :** 23 Décembre 2025

**Pour :** Yanis

**De :** Ton guide de développement

**Database :** Déjà faite par Jimmy (PostgreSQL)

**Frontend :** Déjà fait (React)

**Backend :** À faire par toi (FastAPI Python)

**Bon courage. Tu peux le faire si tu suis les étapes.**
