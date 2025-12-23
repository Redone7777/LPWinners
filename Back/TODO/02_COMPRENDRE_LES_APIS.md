# COMPRENDRE LES APIS

## C'est quoi une API

**API = Application Programming Interface**

Un serveur qui écoute sur un port (8000 dans notre cas) et répond à des requêtes HTTP.

Quand le frontend veut des données, il envoie une requête HTTP à ton backend. Ton backend va chercher dans PostgreSQL et renvoie du JSON.

C'est tout. Pas de magie.
Frontend demande → Backend cherche → Backend renvoie.

## Les 4 verbes HTTP

### GET = Récupérer des données
- `GET /api/champions` → Donne-moi tous les champions
- `GET /api/champions/1` → Donne-moi le champion avec l'id 1
- `GET /api/forum/posts` → Donne-moi tous les posts du forum

**Règle** : GET ne modifie JAMAIS la base de données. C'est juste de la lecture.

### POST = Créer quelque chose
- `POST /api/auth/register` → Crée un nouveau compte
- `POST /api/forum/posts` → Crée un nouveau post
- `POST /api/forum/posts/5/comments` → Crée un commentaire sur le post 5

**Règle** : POST ajoute une nouvelle ligne dans la base de données.

### PUT = Modifier quelque chose
- `PUT /api/forum/posts/5` → Modifie le post 5
- `PUT /api/users/me` → Modifie mon profil

**Règle** : PUT met à jour une ligne existante.

### DELETE = Supprimer quelque chose
- `DELETE /api/forum/posts/5` → Supprime le post 5
- `DELETE /api/comments/42` → Supprime le commentaire 42

**Règle** : DELETE efface une ligne.

## Le format JSON

**JSON = JavaScript Object Notation**

C'est le format universel pour échanger des données sur Internet.

Exemple :

```json
{
  "id": 1,
  "name": "Jinx",
  "role": "marksman",
  "stats": {
    "hp": 610,
    "attack_damage": 59
  },
  "abilities": ["Switcheroo!", "Zap!", "Flame Chompers!"],
  "isPopular": true,
  "winRate": 51.5
}
```

**C'est juste un dictionnaire Python.** Ou un objet JavaScript. Même chose.

Pourquoi JSON et pas autre chose ?
- Léger (pas de balises lourdes comme XML)
- Lisible (un humain peut le comprendre)
- Universel (tous les langages le supportent)

## Une requête HTTP complète

Quand le frontend demande la liste des champions :

### Ce qu'il envoie
```
GET /api/champions HTTP/1.1
Host: localhost:8000
Content-Type: application/json
```

### Ce que ton backend doit renvoyer
```
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "id": 1,
    "name": "Jinx",
    "role": "marksman",
    "image_url": "https://..."
  }
]
```

Le `200` veut dire "OK, tout s'est bien passé".

## Les codes HTTP (à connaître)

### 2xx = Succès
- **200 OK** : Requête réussie
- **201 Created** : Ressource créée avec succès
- **204 No Content** : Succès mais rien à renvoyer

### 4xx = Erreur du client
- **400 Bad Request** : Les données envoyées sont invalides
- **401 Unauthorized** : Token JWT manquant ou invalide
- **404 Not Found** : La ressource n'existe pas
- **403 Forbidden** : Tu n'as pas le droit d'accéder à ça

### 5xx = Erreur du serveur (ton code a planté)
- **500 Internal Server Error** : Ton code a crashé
- **503 Service Unavailable** : Le serveur est down

## Pourquoi /api/ dans les routes

Convention universelle :

- `/` → Page HTML
- `/champions` → Page HTML
- `/api/champions` → Données JSON

Le `/api/` dit clairement : "C'est pour les machines, pas pour les humains".

## REST API (le standard)

**REST = Representational State Transfer**

C'est juste une façon logique d'organiser tes routes.

### Mauvais (chacun invente ses routes)
```
/getChampionList
/createNewPost
/deleteCommentById
```

### REST (standardisé)
```
GET    /api/champions        → Liste
GET    /api/champions/1      → Détails
POST   /api/posts            → Créer
PUT    /api/posts/5          → Modifier
DELETE /api/comments/42      → Supprimer
```

**Règle REST** : L'URL = la ressource (champions, posts). Le verbe HTTP = l'action (GET, POST, etc.).

## Ton backend en une ligne

```python
@app.get("/api/champions")
def get_champions():
    # 1. Requête SQL
    # 2. Transformation
    # 3. Return JSON
```

FastAPI gère tout le reste (recevoir HTTP, parser JSON, renvoyer la réponse, codes d'erreur).

Tu te concentres juste sur : récupérer les données + les formater.

## Exemple complet : Poster un commentaire

### 1. Frontend envoie
```
POST /api/forum/posts/5/comments
Authorization: Bearer eyJhbGciOi...
Content-Type: application/json

{
  "text": "Super guide!"
}
```

### 2. Ton backend
```python
@app.post("/api/forum/posts/{post_id}/comments")
def create_comment(post_id: int, data: CommentData, user: User):
    # FastAPI a déjà vérifié :
    # - Le token JWT est valide
    # - post_id est bien un int
    # - data contient bien "text"

    # Toi tu fais juste :
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO comments (post_id, user_id, text) VALUES (%s, %s, %s) RETURNING id",
        (post_id, user["id"], data.text)
    )

    comment_id = cursor.fetchone()["id"]
    conn.commit()

    return {"id": comment_id, "text": data.text, "votes": 0}
```

### 3. Frontend reçoit
```json
{
  "id": 123,
  "text": "Super guide!",
  "votes": 0
}
```

Tout ça en 200ms.

## Le cycle complet

```
1. Frontend → Requête HTTP
2. FastAPI → Reçoit et parse
3. Ton code → Requête SQL
4. PostgreSQL → Renvoie les données
5. Ton code → Transforme en JSON
6. FastAPI → Renvoie la réponse HTTP
7. Frontend → Affiche
```

## Pourquoi c'est universel

Ton API REST peut être utilisée par :
- Une app React (notre cas)
- Une app mobile iOS
- Une app Android
- Un autre backend
- N'importe quoi qui parle HTTP

Tu codes le backend **une fois**, tout le monde peut l'utiliser.

## Ce que tu dois retenir

1. **API = Serveur HTTP qui renvoie du JSON**
2. **GET/POST/PUT/DELETE = Les 4 actions de base**
3. **REST = Convention pour organiser les routes**
4. **JSON = Format universel d'échange**
5. **FastAPI gère la plomberie, toi tu gères la logique**

## Prochaine étape

**03_ENVIRONNEMENT.md**

Installation de Python, FastAPI, PostgreSQL et tout ce qu'il faut pour commencer à coder.

On passe à la pratique.
