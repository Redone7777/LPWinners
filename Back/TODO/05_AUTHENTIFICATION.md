# AUTHENTIFICATION JWT

## Le problème

HTTP est stateless. Le serveur ne se rappelle pas de toi entre deux requêtes.

Quand tu te connectes sur Instagram, comment le serveur sait que c'est toujours toi 5 minutes après ?

**Réponse** : JWT (JSON Web Token)

## Comment ça marche

1. Tu te connectes avec email + password
2. Le backend vérifie dans la base de données
3. Si c'est bon, il crée un TOKEN (une longue chaîne cryptée)
4. Le frontend stocke ce token (localStorage)
5. Pour chaque requête suivante, le frontend envoie : Authorization: Bearer TOKEN
6. Le backend vérifie le token et sait qui tu es

## C'est quoi un JWT concrètement

Un JWT ressemble à ça :

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJZYW5pcyJ9.KjsD8f7s9dfh4f98h4f

C'est 3 parties séparées par des points :
1. **Header** : Type + algorithme de chiffrement
2. **Payload** : Tes données (id, username, email)
3. **Signature** : Hash cryptographique pour vérifier l'intégrité

**Important** : Le payload est encodé, pas chiffré. Tout le monde peut le lire. Ne mets JAMAIS de mot de passe dedans.

## Hasher les mots de passe

On ne stocke JAMAIS les mots de passe en clair dans la base.

Si quelqu'un vole ta base de données, il ne doit pas pouvoir lire les mots de passe.

**Solution** : bcrypt

Au lieu de stocker "password123", on stocke "$2b$12$Klskdjflksjdfljsdfljsdflkjsflkjsflkjsf..."

Impossible à inverser. Même mot de passe = hash différent à chaque fois (grâce au salt).

## Ce qu'on va créer

Deux fichiers :
1. utils/auth.py → Fonctions pour JWT et hashing
2. routes/auth.py → Routes /register et /login

## Créer utils/auth.py

Ce fichier contient 5 fonctions essentielles.

### Fonction hash_password

Prend un mot de passe en clair, retourne un hash bcrypt.

Exemple d'utilisation :
hashed = hash_password("password123")
→ retourne "$2b$12$lksjdflksjdf..."

### Fonction verify_password

Compare un mot de passe en clair avec un hash.

Exemple :
verify_password("password123", hashed_from_db)
→ retourne True si ça match, False sinon

### Fonction create_token

Crée un JWT contenant les données user.

Exemple :
token = create_token({"id": 1, "username": "Yanis", "email": "yanis@test.com"})
→ retourne "eyJhbGciOi..."

Le token expire après 7 jours. Il est signé avec ton JWT_SECRET du .env.

### Fonction verify_token

Décode un JWT et vérifie sa validité.

Exemple :
payload = verify_token(token)
→ retourne {"id": 1, "username": "Yanis", "email": "yanis@test.com"} si valide
→ retourne None si invalide ou expiré

### Fonction get_current_user

C'est une dependency FastAPI. Elle extrait l'user depuis le header Authorization.

Tu l'utilises comme ça :

@router.post("/api/forum/posts")
def create_post(data: PostData, user = Depends(get_current_user)):
    # Si le token est invalide → FastAPI renvoie 401 automatiquement
    # Si valide → user contient {"id": 1, "username": "...", "email": "..."}

    # Tu peux utiliser user["id"] pour ton INSERT
    cursor.execute(
        "INSERT INTO forum_posts (user_id, title) VALUES (%s, %s)",
        (user["id"], data.title)
    )

**Code complet** : Ouvre FOR_MY_LITTLE_BOY_YANIS.md lignes 312-345 et copie dans utils/auth.py

**Points clés** :
- SECRET_KEY vient du .env (ton JWT_SECRET)
- Algorithme HS256 (standard)
- Tokens valides 7 jours
- get_current_user() s'utilise avec Depends() dans FastAPI

## Créer routes/auth.py

Deux routes principales : /register et /login

### Route POST /api/auth/register

**Flow complet** :

1. Reçoit username, email, password du frontend
2. Vérifie que l'email n'existe pas déjà : SELECT * FROM utilisateurs WHERE mail = %s
3. Si existe déjà → erreur 400 "Email already exists"
4. Sinon, hashe le mot de passe avec hash_password()
5. INSERT INTO utilisateurs (pseudo, mail, password) VALUES (...)
6. Récupère l'id auto-généré avec RETURNING id
7. Crée un JWT avec create_token({"id": user_id, "username": ..., "email": ...})
8. Retourne le token + les données user

**ATTENTION CRITIQUE** : La table de Jimmy s'appelle "utilisateurs" avec les colonnes "pseudo" et "mail", pas "username" et "email".

Mais le frontend attend "username" et "email".

Donc dans ton INSERT tu utilises pseudo et mail, mais dans ta réponse JSON tu renvoies username et email.

**Format de réponse** :

{
  "token": "eyJhbGci...",
  "user": {
    "id": 1,
    "username": "Yanis",
    "email": "yanis@test.com",
    "avatar": null
  }
}

### Route POST /api/auth/login

**Flow complet** :

1. Reçoit email, password
2. SELECT id, pseudo, mail, password FROM utilisateurs WHERE mail = %s
3. Si pas d'user → erreur 401 "Invalid credentials"
4. Vérifie le mot de passe avec verify_password(plain_password, user["password"])
5. Si faux → erreur 401 "Invalid credentials"
6. Crée un JWT avec create_token()
7. Retourne token + user (même format que register)

**Pourquoi 401 et pas 400 ?**
- 400 = Format de données invalide
- 401 = Identifiants incorrects

**Code complet** : FOR_MY_LITTLE_BOY_YANIS.md lignes 370-425

**Points clés** :
- Utilise Pydantic BaseModel pour valider les données
- EmailStr valide automatiquement le format email
- Toujours fermer cursor et connexion dans le finally
- Même réponse pour register et login

## Protéger une route

Pour qu'une route nécessite d'être connecté, ajoute user = Depends(get_current_user) dans les paramètres.

Le frontend doit envoyer le header Authorization: Bearer TOKEN

Si le token manque ou est invalide, FastAPI renvoie automatiquement 401.

Si valide, la variable user contient les données décodées du JWT.

## Test rapide

Crée test_auth.py :

from utils.auth import hash_password, verify_password

password = "test123"
hashed = hash_password(password)
print(f"Password: {password}")
print(f"Hashed: {hashed}")
print(f"Vérif: {verify_password(password, hashed)}")

Lance python3 test_auth.py. Tu dois voir True.

Supprime le fichier après.

## Récap

✅ utils/auth.py créé avec 5 fonctions
✅ JWT avec expiration 7 jours
✅ Bcrypt pour hasher les mots de passe
✅ routes/auth.py créé avec /register et /login
✅ Transformation pseudo/mail → username/email
✅ Dependency get_current_user pour protéger les routes

## Prochaine étape

**06_PREMIERE_ROUTE.md**

On va créer les routes champions et assembler tout le backend avec main.py.
