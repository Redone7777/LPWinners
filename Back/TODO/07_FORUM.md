# ROUTES FORUM

## Ce qu'on va créer

Routes pour le forum avec posts et commentaires :

**Routes publiques** (pas besoin de token) :
- GET /api/forum/posts → Liste des posts
- GET /api/forum/posts/{id} → Détails d'un post
- GET /api/forum/posts/{id}/comments → Commentaires d'un post

**Routes protégées** (token JWT required) :
- POST /api/forum/posts → Créer un post
- POST /api/forum/posts/{id}/comments → Ajouter un commentaire
- PUT /api/forum/posts/{id}/vote → Voter sur un post

## Créer models/schemas.py

On va créer des modèles Pydantic pour valider les données entrantes.

**Pourquoi Pydantic ?**

Si le frontend envoie n'importe quoi, Pydantic bloque automatiquement et renvoie une 422 avec un message clair.

Exemple :
- Tu attends tags comme array → frontend envoie "ADC" (string)
- Pydantic bloque → 422 "field tags: value is not a valid list"

**Trois modèles à créer** :

PostCreate : pour créer un post
- type (str) : "guide", "discussion", "question"
- layout (str) : "featured", "standard"
- title (str)
- subtitle (Optional[str])
- description (Optional[str])
- content (Dict[str, Any]) : JSONB libre
- tags (List[str]) : array de strings
- image, color, accent (Optional[str])

CommentCreate : pour créer un commentaire
- text (str)

VoteAction : pour voter
- action (str) : "upvote" ou "downvote"

**Code complet** : FOR_MY_LITTLE_BOY_YANIS.md à partir de la ligne 670

## Route GET /api/forum/posts

**Ce qu'elle fait** :

1. SELECT avec JOIN pour récupérer les posts + les infos de l'auteur
2. FROM forum_posts fp JOIN utilisateurs u ON fp.user_id = u.id
3. ORDER BY fp.created_at DESC (posts récents d'abord)
4. Transforme chaque post au format attendu
5. Ajoute un sous-objet author avec id et username
6. Return le tableau

**Exemple de transformation** :

Base : user_id=1, pseudo="Yanis", title="Guide Jinx", votes=42

Devient :

{
  "id": 1,
  "title": "Guide Jinx",
  "votes": 42,
  "author": {
    "id": 1,
    "username": "Yanis"
  },
  ...
}

**Point clé** : On fait un JOIN pour récupérer le pseudo de l'auteur en une seule requête au lieu de faire une requête par post.

## Route GET /api/forum/posts/{id}

**Ce qu'elle fait** :

1. SELECT le post avec JOIN pour l'auteur
2. Si pas trouvé → 404
3. UPDATE forum_posts SET views = views + 1 (incrémente les vues)
4. conn.commit() car c'est un UPDATE
5. Return le post avec views+1

**Pourquoi incrémenter les vues ?**
Quand quelqu'un ouvre un post, on compte ça comme une vue. Comme sur YouTube.

## Route GET /api/forum/posts/{id}/comments

**Ce qu'elle fait** :

1. SELECT comments avec JOIN sur utilisateurs pour avoir l'auteur
2. WHERE post_id = id
3. ORDER BY created_at DESC (commentaires récents en premier)
4. Transforme avec sous-objet author
5. Return le tableau

Même principe que la liste des posts, juste filtré par post_id.

## Route POST /api/forum/posts (PROTÉGÉE)

**Ce qu'elle fait** :

1. Reçoit les données validées par Pydantic (PostCreate)
2. Reçoit l'user depuis Depends(get_current_user)
3. INSERT INTO forum_posts avec toutes les colonnes
4. Utilise Json() pour wrapper content et tags (JSONB)
5. RETURNING id, created_at pour récupérer les infos du post créé
6. conn.commit()
7. Return id + message de confirmation

**Exemple d'utilisation de Json()** :

from psycopg2.extras import Json

cursor.execute(
    "INSERT INTO forum_posts (content, tags) VALUES (%s, %s)",
    (Json(data.content), Json(data.tags))
)

Sans Json(), psycopg2 ne sait pas que c'est du JSONB et ça va planter.

**Point critique** : user["id"] vient du JWT décodé. C'est l'id de l'utilisateur connecté.

## Route POST /api/forum/posts/{id}/comments (PROTÉGÉE)

**Ce qu'elle fait** :

1. Vérifie que le post existe : SELECT id FROM forum_posts WHERE id = post_id
2. Si pas trouvé → 404 "Post not found"
3. INSERT INTO comments (post_id, user_id, text) VALUES (...)
4. RETURNING id, created_at
5. conn.commit()
6. Return le commentaire créé avec infos de l'auteur

**Pourquoi vérifier que le post existe ?**
Pour pas créer un commentaire orphelin sur un post qui n'existe pas.

## Route PUT /api/forum/posts/{id}/vote (PROTÉGÉE)

**Ce qu'elle fait** :

1. Reçoit action : "upvote" ou "downvote"
2. Si upvote : UPDATE forum_posts SET votes = votes + 1
3. Si downvote : UPDATE forum_posts SET votes = votes - 1
4. Si autre chose → 400 "Invalid action"
5. RETURNING votes pour récupérer le nouveau total
6. Si pas de post trouvé → 404
7. conn.commit()
8. Return le nouveau nombre de votes

**Pourquoi votes = votes + 1 ?**
Pour éviter les race conditions. Si deux personnes votent en même temps, ça compte bien les deux.

Pas besoin de faire un SELECT puis calcul puis UPDATE.

## Mettre à jour main.py

Ajoute l'import :

from routes import auth, champions, forum

Enregistre le router :

app.include_router(forum.router)

Met à jour la liste des endpoints dans la route racine.

Le serveur va auto-reload si reload=True est activé.

## Tester dans le navigateur

### Liste des posts

http://localhost:8000/api/forum/posts

Si vide → normal, aucun post n'a été créé encore.

### Créer un post

Va sur http://localhost:8000/docs

1. Trouve POST /api/forum/posts
2. Clique "Try it out"
3. Clique "Authorize" en haut (icône de cadenas)
4. Entre : Bearer TON_TOKEN
   (récupère le token en faisant un /register ou /login d'abord)
5. Remplis le body :

{
  "type": "guide",
  "layout": "featured",
  "title": "Guide Jinx ADC",
  "description": "Comment carry avec Jinx",
  "content": {"intro": "Jinx est un hyper carry...", "gameplay": "Farm early game..."},
  "tags": ["ADC", "Guide", "Jinx"]
}

6. Execute

Si ça marche → 200 avec l'id du post créé

### Détails du post

http://localhost:8000/api/forum/posts/1

Tu dois voir ton post avec toutes les infos.

### Créer un commentaire

Sur /docs, POST /api/forum/posts/1/comments

Avec le token Bearer, envoie :

{
  "text": "Super guide!"
}

## Code complet

Tout le code de routes/forum.py est dans FOR_MY_LITTLE_BOY_YANIS.md lignes 510-569.

C'est long car y'a 6 routes, mais c'est répétitif. Même structure partout :
1. get_db_connection()
2. Requête SQL
3. Transformation
4. Return
5. finally: fermer cursor et connexion

## Récap

✅ models/schemas.py créé avec Pydantic
✅ routes/forum.py créé avec 6 endpoints
✅ 3 routes publiques GET
✅ 3 routes protégées POST/PUT
✅ JOIN SQL pour récupérer l'auteur
✅ Json() pour insérer du JSONB
✅ main.py mis à jour
✅ Tests dans /docs

## Prochaine étape

**08_TESTS.md**

On va tester toutes les routes avec Thunder Client ou Postman pour vérifier que tout marche.
