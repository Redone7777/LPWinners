# LIRE MOI EN PREMIER

## Yanis, commence ici

**CONSEIL DE VIE** : Si tu es bloqué ou si tu as besoin d'aide, utilise **Codex**. C'est la lumière ! Il t'aidera à comprendre tes erreurs et à t'orienter si tu es perdu.

Ce dossier contient tout ce dont tu as besoin pour créer le backend de LP Winners.

**RÈGLE N°1 : WORKFLOW GIT (OBLIGATOIRE)**
Tu ne travailles JAMAIS directement sur la branche `dev` ou `main`.
1. Modifie ton code dans la branche `yanis`.
2. Commit tes changements.
3. Va sur la branche `dev`.
4. Fusionne (`merge`) ton travail.

**Exemple de commandes à suivre :**
```bash
# 1. Travailler sur ta branche
git switch yanis
# ... fais tes modifs ...
git add .
git commit -m "Ajout du feature"

# 2. Mettre à jour la branche dev (sécurité)
git switch dev
git merge yanis

# 3. Retourner bosser
git switch yanis
```

**RÈGLE N°2** : Lis les fichiers dans l'ordre numérique. Ne saute pas.

## Ordre de lecture

### 1. [01_BIENVENUE.md](01_BIENVENUE.md)
**Temps : 5 min**

Vue d'ensemble du projet. Ce que tu vas faire et pourquoi.

Lis ça pour comprendre ton rôle dans le projet.

### 2. [02_COMPRENDRE_LES_APIS.md](02_COMPRENDRE_LES_APIS.md)
**Temps : 15 min**

Les bases des APIs REST, HTTP, JSON.

Si tu ne comprends pas ce fichier, tu vas être perdu pour le reste.

### 3. [03_ENVIRONNEMENT.md](03_ENVIRONNEMENT.md)
**Temps : 30 min**

Installation de Python, FastAPI, PostgreSQL et toutes les dépendances.

Création de la structure du projet.

**À la fin de ce fichier, ton serveur basique doit tourner.**

### 4. [04_BASE_DE_DONNEES.md](04_BASE_DE_DONNEES.md)
**Temps : 20 min**

Connexion à PostgreSQL avec psycopg2.

Création de `database/db.py`.

**À la fin, tu dois pouvoir te connecter à la base de Jimmy.**

### 5. [05_AUTHENTIFICATION.md](05_AUTHENTIFICATION.md)
**Temps : 30 min**

JWT, hashing de mots de passe, routes register/login.

Création de `utils/auth.py` et `routes/auth.py`.

**À la fin, tu peux créer un compte et te connecter.**

### 6. [06_PREMIERE_ROUTE.md](06_PREMIERE_ROUTE.md)
**Temps : 30 min**

Routes champions + création de `main.py`.

Premier endpoint fonctionnel de bout en bout.

**À la fin, tu peux récupérer la liste des champions dans le navigateur.**

### 7. [07_FORUM.md](07_FORUM.md)
**Temps : 45 min**

Routes forum (posts, commentaires, votes).

Protection JWT sur les routes POST/PUT.

**À la fin, tu peux créer des posts et des commentaires.**

### 8. [08_TESTS.md](08_TESTS.md)
**Temps : 45 min**

Tests complets de tous les endpoints avec Thunder Client ou Postman.

**À la fin, tous les endpoints sont testés et fonctionnels.**

---

## Temps total estimé

**3h30** si tu lis et codes dans l'ordre.

**3 jours** si tu sautes des étapes et improvises.

---

## Ce que tu dois avoir avant de commencer

✅ Python 3.8+ installé
✅ PostgreSQL installé et tourné
✅ Base `lpwinners` créée par Jimmy
✅ VS Code ou un éditeur de code
✅ Thunder Client (extension VS Code) ou Postman

---

## Structure finale du projet

À la fin, tu auras cette structure :

```
Back/
├── main.py                    # Point d'entrée du serveur
├── .env                       # Secrets (mot de passe DB, JWT secret)
├── requirements.txt           # Dépendances Python
├── database/
│   ├── __init__.py
│   └── db.py                 # Connexion PostgreSQL
├── models/
│   ├── __init__.py
│   └── schemas.py            # Modèles Pydantic
├── routes/
│   ├── __init__.py
│   ├── auth.py               # Register, login
│   ├── champions.py          # Champions liste et détails
│   └── forum.py              # Posts et commentaires
├── utils/
│   ├── __init__.py
│   └── auth.py               # JWT et hashing
└── TODO/
    ├── 00_LIRE_MOI_EN_PREMIER.md
    ├── 01_BIENVENUE.md
    ├── 02_COMPRENDRE_LES_APIS.md
    ├── 03_ENVIRONNEMENT.md
    ├── 04_BASE_DE_DONNEES.md
    ├── 05_AUTHENTIFICATION.md
    ├── 06_PREMIERE_ROUTE.md
    ├── 07_FORUM.md
    └── 08_TESTS.md
```

---

## Endpoints que tu vas créer

### Authentification
- `POST /api/auth/register` → Créer un compte
- `POST /api/auth/login` → Se connecter

### Champions
- `GET /api/champions` → Liste de tous les champions
- `GET /api/champions/{id}` → Détails d'un champion

### Forum
- `GET /api/forum/posts` → Liste des posts
- `GET /api/forum/posts/{id}` → Détails d'un post
- `POST /api/forum/posts` → Créer un post (JWT required)
- `GET /api/forum/posts/{id}/comments` → Commentaires
- `POST /api/forum/posts/{id}/comments` → Ajouter un commentaire (JWT required)
- `PUT /api/forum/posts/{id}/vote` → Voter (JWT required)

**Total : 9 endpoints**

---

## Règles importantes

### 1. Lis dans l'ordre
Chaque fichier construit sur les connaissances du précédent.

### 2. Ne copie-colle pas sans comprendre
Lis le code, comprends ce qu'il fait, PUIS copie.

### 3. Teste après chaque étape
Ne code pas 3 fichiers d'un coup. Code, teste, passe au suivant.

### 4. Regarde les logs
Si erreur, le terminal affiche la stack trace complète. Lis-la.

### 5. Ne demande pas à une IA de tout générer
Si tu fais ça, tu n'apprendras rien et tu seras bloqué au premier bug.

### 6. Workflow Git
Tu vas toujours modifier dans la branche `yanis`, puis tu vas commit, puis aller dans la branche `dev` par sécurité et faire un `git merge yanis`.

---

## Quand tu es bloqué

### 1. Lis l'erreur dans le terminal
90% du temps, l'erreur te dit exactement ce qui ne va pas.

### 2. Vérifie que PostgreSQL tourne
```bash
systemctl status postgresql
```

### 3. Vérifie ton fichier .env
Mot de passe correct ? JWT_SECRET défini ?

### 4. Vérifie que les imports sont corrects
```python
from database.db import get_db_connection
```

### 5. Vérifie que les fichiers __init__.py existent
Sinon Python ne reconnaît pas les dossiers comme des modules.

### 6. Demande à Redwan ou Jimmy
Mais montre-leur l'erreur exacte et ce que tu as déjà essayé.

### 7. Utilise Codex
Si tu es bloqué ou si tu as besoin d'aide, utilise **Codex**. C'est la lumière ! Il t'aidera à comprendre tes erreurs et à t'orienter si tu es perdu.

---

## Checklist finale

Avant de dire "j'ai fini", vérifie que :

✅ Tous les fichiers sont créés
✅ Le serveur démarre sans erreur
✅ Tu peux créer un compte
✅ Tu peux te connecter
✅ Tu peux récupérer la liste des champions
✅ Tu peux récupérer les détails d'un champion
✅ Tu peux créer un post (avec token)
✅ Tu peux ajouter un commentaire (avec token)
✅ Tous les tests Postman/Thunder Client passent

---

## Commandes utiles

### Lancer le serveur
```bash
cd /home/redone/Projet/LPWinners/Back
python3 main.py
```

### Vérifier PostgreSQL
```bash
psql -U postgres -d lpwinners -c "\dt"
```

### Installer les dépendances
```bash
pip3 install -r requirements.txt
```

### Voir les logs en temps réel
Le terminal où tu as lancé `python3 main.py` affiche tous les logs.

---

## Ressources

### Documentation FastAPI
https://fastapi.tiangolo.com/

### Documentation psycopg2
https://www.psycopg.org/docs/

### Thunder Client
Extension VS Code, cherche dans Extensions

### Postman
https://www.postman.com/downloads

---

## C'est parti

Ouvre [01_BIENVENUE.md](01_BIENVENUE.md) et commence.

Pas d'excuses. Pas de procrastination.

Le frontend attend ton backend.

Jimmy a fait la base de données.
Redwan a fait le frontend.

Ton job : connecter les deux.

Tu as tout ce qu'il faut dans ce dossier.

Go.
