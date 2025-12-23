# TESTER TON BACKEND

## Pourquoi tester

Avant de connecter le frontend, tu dois vérifier que chaque endpoint marche correctement.

Sans tests, tu lances le frontend, ça marche pas, et tu passes 2h à débugger sans savoir si c'est le frontend ou le backend qui déconne.

Avec tests, tu vérifies chaque endpoint individuellement. Si ça marche dans Postman, c'est bon.

## Outils de test

### Option 1 : Thunder Client (recommandé)
Extension VS Code. Pratique car intégré dans l'éditeur.

Installe : Extensions → Cherche "Thunder Client" → Install

### Option 2 : Postman
App standalone. Plus de features mais plus lourd.

Télécharge : postman.com/downloads

### Option 3 : /docs (Swagger UI)
FastAPI génère automatiquement une doc interactive sur http://localhost:8000/docs

Pratique pour tester rapidement sans installer d'outil.

On va utiliser les 3 selon les cas.

## Test 1 : Vérifier que le serveur tourne

Ouvre http://localhost:8000 dans le navigateur.

Tu dois voir :

{
  "message": "LP Winners API is running",
  "version": "1.0.0",
  "endpoints": [...]
}

Status : 200 OK

Si erreur de connexion → le serveur ne tourne pas. Lance python3 main.py

## Test 2 : Register (créer un compte)

### Avec Thunder Client

1. New Request
2. Method: POST
3. URL: http://localhost:8000/api/auth/register
4. Body → JSON

{
  "username": "Yanis",
  "email": "yanis@test.com",
  "password": "password123"
}

5. Send

**Résultat attendu** :

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "Yanis",
    "email": "yanis@test.com",
    "avatar": null
  }
}

Status : 200 OK

**IMPORTANT** : Copie le token. Tu vas en avoir besoin pour les routes protégées.

### Erreurs possibles

400 - Email already exists
→ Tu as déjà créé ce compte. Utilise un autre email.

500 - Internal Server Error
→ Regarde les logs du serveur dans le terminal. Problème de connexion DB probablement.

## Test 3 : Login

### Avec Thunder Client

1. New Request
2. Method: POST
3. URL: http://localhost:8000/api/auth/login
4. Body → JSON

{
  "email": "yanis@test.com",
  "password": "password123"
}

5. Send

**Résultat attendu** : Même format que register avec le token.

### Erreurs possibles

401 - Invalid credentials
→ Email ou mot de passe incorrect.

## Test 4 : Champions (liste)

### Dans le navigateur

http://localhost:8000/api/champions

Tu dois voir un gros JSON avec tous les champions.

Pas besoin de token pour cette route (elle est publique).

## Test 5 : Champion (détails)

### Dans le navigateur

http://localhost:8000/api/champions/1

Tu dois voir les détails complets du champion avec stats, abilities, tips.

### Erreurs possibles

404 - Champion not found
→ L'id n'existe pas. Essaie avec un autre id.

## Test 6 : Forum posts (liste)

### Dans le navigateur

http://localhost:8000/api/forum/posts

Array de posts (peut être vide si aucun post créé).

## Test 7 : Créer un post (PROTÉGÉ)

### Avec Swagger UI (le plus simple)

1. Va sur http://localhost:8000/docs
2. Cherche POST /api/forum/posts
3. Clique "Try it out"
4. Clique "Authorize" en haut à droite (icône cadenas)
5. Entre : Bearer TON_TOKEN (le token du register/login)
6. Click "Authorize" puis "Close"
7. Remplis le Request body :

{
  "type": "guide",
  "layout": "featured",
  "title": "Ultimate Jinx Guide",
  "subtitle": "Carry every game",
  "description": "Learn to dominate with Jinx",
  "content": {
    "intro": "Jinx is a hyper carry marksman...",
    "gameplay": "Focus on farming early game..."
  },
  "tags": ["ADC", "Guide", "Jinx"]
}

8. Execute

**Résultat attendu** :

{
  "id": 1,
  "message": "Post created successfully",
  "created_at": "2025-12-23T14:30:00"
}

Status : 200 OK

### Avec Thunder Client

1. New Request
2. Method: POST
3. URL: http://localhost:8000/api/forum/posts
4. Headers → Add
   - Key: Authorization
   - Value: Bearer TON_TOKEN
5. Body → JSON (même qu'au-dessus)
6. Send

### Erreurs possibles

401 - Missing authorization header
→ Tu as oublié d'ajouter le header Authorization.

401 - Invalid or expired token
→ Token invalide ou expiré. Refais un login.

422 - Validation Error
→ Les données ne respectent pas le schéma Pydantic. Vérifie que tags est bien un array, content un objet, etc.

## Test 8 : Détails d'un post

http://localhost:8000/api/forum/posts/1

Tu dois voir ton post avec toutes les infos + author.

## Test 9 : Créer un commentaire (PROTÉGÉ)

### Sur /docs

1. POST /api/forum/posts/1/comments
2. Authorize avec ton token
3. Body :

{
  "text": "Super guide, merci!"
}

4. Execute

**Résultat attendu** :

{
  "id": 1,
  "text": "Super guide, merci!",
  "votes": 0,
  "created_at": "2025-12-23T14:35:00",
  "author": {
    "id": 1,
    "username": "Yanis"
  }
}

## Test 10 : Liste des commentaires

http://localhost:8000/api/forum/posts/1/comments

Tu dois voir ton commentaire.

## Test 11 : Voter sur un post (PROTÉGÉ)

### Sur /docs

1. PUT /api/forum/posts/1/vote
2. Authorize avec ton token
3. Body :

{
  "action": "upvote"
}

4. Execute

**Résultat attendu** :

{
  "message": "Vote recorded",
  "new_votes": 1
}

## Checklist complète

Avant de dire "mon backend est fini", vérifie :

### Authentification
- [ ] POST /api/auth/register → 200 avec token
- [ ] POST /api/auth/register (email existant) → 400
- [ ] POST /api/auth/login → 200 avec token
- [ ] POST /api/auth/login (mauvais password) → 401

### Champions
- [ ] GET /api/champions → 200 avec array
- [ ] GET /api/champions/1 → 200 avec détails
- [ ] GET /api/champions/99999 → 404

### Forum (public)
- [ ] GET /api/forum/posts → 200
- [ ] GET /api/forum/posts/1 → 200
- [ ] GET /api/forum/posts/1/comments → 200

### Forum (protégé)
- [ ] POST /api/forum/posts (sans token) → 401
- [ ] POST /api/forum/posts (avec token) → 200
- [ ] POST /api/forum/posts/1/comments (sans token) → 401
- [ ] POST /api/forum/posts/1/comments (avec token) → 200
- [ ] PUT /api/forum/posts/1/vote (avec token) → 200

## Debugging

### Le serveur ne répond pas

Vérifie qu'il tourne :

ps aux | grep python

Si pas de processus, relance :

python3 main.py

### 500 Internal Server Error

Regarde les logs dans le terminal où tu as lancé python3 main.py

L'erreur sera affichée avec la stack trace complète.

### CORS errors

Si tu testes depuis le frontend et tu vois :

Access to fetch has been blocked by CORS policy

Vérifie :
1. Le middleware CORS est bien dans main.py
2. L'URL du frontend est dans allow_origins
3. Le serveur a bien redémarré après l'ajout du middleware

### Token expired

Les tokens expirent après 7 jours. Refais un login pour avoir un nouveau token.

## Récap

✅ Tous les endpoints testés individuellement
✅ Register + Login fonctionnent
✅ Token JWT généré et validé
✅ Routes publiques accessibles
✅ Routes protégées nécessitent le token
✅ Codes HTTP corrects (200, 401, 404, 500)

## Ton backend est prêt

Si tous les tests passent, GG. Ton backend est fonctionnel.

Reste plus qu'à le connecter au frontend de Redwan.
