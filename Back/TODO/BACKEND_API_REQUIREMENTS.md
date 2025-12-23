# API Backend Requirements - LP Winners

Ce document liste TOUS les endpoints API que le backend DOIT implémenter pour que le front-end fonctionne correctement.

> **Base URL:** `http://localhost:8000`
>
> **Format:** Toutes les réponses doivent être en JSON
>
> **Headers:** Les endpoints protégés nécessitent un header `Authorization: Bearer {token}`

---

## 📋 TABLE DES MATIÈRES

1. [Authentification](#1-authentification)
2. [Champions](#2-champions)
3. [Items](#3-items)
4. [Sorts d'Invocateur](#4-sorts-dinvocateur)
5. [Runes](#5-runes)
6. [Forum](#6-forum)
7. [Commentaires](#7-commentaires)
8. [Joueurs](#8-joueurs)
9. [Statistiques Professionnelles](#9-statistiques-professionnelles)

---

## 1. AUTHENTIFICATION

### POST `/api/auth/register`
**Créer un nouveau compte utilisateur**

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response Success (201):**
```json
{
  "token": "string (JWT token)",
  "user": {
    "id": "number",
    "username": "string",
    "email": "string",
    "avatar": "string (URL) | null",
    "created_at": "string (ISO date)"
  }
}
```

**Response Error (400):**
```json
{
  "message": "Email already exists"
}
```

---

### POST `/api/auth/login`
**Connecter un utilisateur existant**

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response Success (200):**
```json
{
  "token": "string (JWT token)",
  "user": {
    "id": "number",
    "username": "string",
    "email": "string",
    "avatar": "string (URL) | null"
  }
}
```

**Response Error (401):**
```json
{
  "message": "Invalid credentials"
}
```

---

## 2. CHAMPIONS

### GET `/api/champions`
**Récupérer la liste de tous les champions**

**Query Parameters:** Aucun

**Response Success (200):**
```json
[
  {
    "id": "number",
    "name": "string",
    "title": "string",
    "role": "string (assassin | fighter | mage | marksman | support | tank)",
    "image_url": "string (URL)"
  }
]
```

---

### GET `/api/champions/:id`
**Récupérer les détails d'un champion spécifique**

**URL Parameters:**
- `id`: ID du champion

**Response Success (200):**
```json
{
  "id": "number",
  "name": "string",
  "title": "string",
  "role": "string",
  "image_url": "string (URL)",
  "lore": "string | null",
  "difficulty": "number (1-10) | null",
  "stats": {
    "hp": "number",
    "mana": "number",
    "attack_damage": "number",
    "ability_power": "number",
    "armor": "number",
    "magic_resist": "number",
    "attack_speed": "number",
    "movement_speed": "number"
  },
  "abilities": [
    {
      "name": "string",
      "key": "string (Q|W|E|R|Passive)",
      "description": "string",
      "image_url": "string (URL) | null",
      "cooldown": "number | null"
    }
  ],
  "tips": ["string"] | null
}
```

**Response Error (404):**
```json
{
  "message": "Champion not found"
}
```

---

## 3. ITEMS

### GET `/api/items`
**Récupérer la liste de tous les items**

**Response Success (200):**
```json
[
  {
    "id": "number",
    "name": "string",
    "category": "string (damage | magic | tank | defense | etc.)",
    "gold": "number",
    "image_url": "string (URL)"
  }
]
```

---

## 4. SORTS D'INVOCATEUR

### GET `/api/spells`
**Récupérer la liste de tous les sorts d'invocateur**

**Response Success (200):**
```json
[
  {
    "id": "number",
    "name": "string",
    "cooldown": "number (en secondes)",
    "image_url": "string (URL)"
  }
]
```

---

## 5. RUNES

### GET `/api/runes`
**Récupérer la liste de toutes les runes**

**Response Success (200):**
```json
[
  {
    "id": "number",
    "name": "string",
    "category": "string",
    "image_url": "string (URL)"
  }
]
```

---

## 6. FORUM

### GET `/api/forum/posts`
**Récupérer la liste de tous les posts du forum**

**Response Success (200):**
```json
[
  {
    "id": "string | number",
    "type": "string (guide | discussion | highlight | meta)",
    "layout": "string (featured | standard | tall | wide)",
    "author": "string",
    "rank": "string",
    "avatar": "string (URL)",
    "title": "string",
    "subtitle": "string | null",
    "desc": "string",
    "votes": "number | string",
    "comments": "number",
    "tags": ["string"],
    "image": "string (URL)",
    "color": "string (gradient CSS)",
    "accent": "string (hex color)"
  }
]
```

---

### GET `/api/forum/posts/:id`
**Récupérer le détail complet d'un post du forum**

**URL Parameters:**
- `id`: ID du post

**Response Success (200):**
```json
{
  "id": "string",
  "title": "string",
  "author": {
    "name": "string",
    "rank": "string",
    "mastery": "string",
    "avatar": "string (URL)"
  },
  "stats": {
    "votes": "number",
    "views": "string",
    "date": "string",
    "winrate": "string | null"
  },
  "champion": {
    "name": "string",
    "title": "string",
    "role": "string",
    "splash": "string (URL)",
    "icon": "string (URL)"
  } | null,
  "content": {
    "intro": "string",
    "gameplay": "string",
    "combos": [
      {
        "keys": ["string"],
        "desc": "string"
      }
    ]
  },
  "loadout": {
    "runes": {
      "primary": "string",
      "secondary": "string",
      "tree": ["string"]
    },
    "spells": ["string"]
  } | null,
  "items": {
    "core": [
      {
        "name": "string",
        "img": "string (URL)"
      }
    ],
    "situational": [
      {
        "name": "string",
        "img": "string (URL)"
      }
    ]
  } | null,
  "synergies": {
    "good": ["string"],
    "bad": ["string"]
  } | null
}
```

**Response Error (404):**
```json
{
  "message": "Post not found"
}
```

---

### POST `/api/forum/posts`
**Créer un nouveau post sur le forum**

**Headers:**
- `Authorization: Bearer {token}` (REQUIS)

**Request Body:**
```json
{
  "title": "string",
  "type": "string (guide | discussion | highlight | meta)",
  "desc": "string",
  "content": {
    "intro": "string",
    "gameplay": "string"
  },
  "tags": ["string"]
}
```

**Response Success (201):**
```json
{
  "id": "string | number",
  "title": "string",
  "author": "string",
  "created_at": "string (ISO date)"
}
```

**Response Error (401):**
```json
{
  "message": "Unauthorized"
}
```

---

## 7. COMMENTAIRES

### GET `/api/forum/posts/:postId/comments`
**Récupérer les commentaires d'un post**

**URL Parameters:**
- `postId`: ID du post

**Response Success (200):**
```json
[
  {
    "id": "number",
    "user": "string",
    "text": "string",
    "votes": "number",
    "time": "string",
    "created_at": "string (ISO date)"
  }
]
```

---

### POST `/api/forum/posts/:postId/comments`
**Créer un nouveau commentaire sur un post**

**URL Parameters:**
- `postId`: ID du post

**Headers:**
- `Authorization: Bearer {token}` (REQUIS)

**Request Body:**
```json
{
  "text": "string"
}
```

**Response Success (201):**
```json
{
  "id": "number",
  "user": "string",
  "text": "string",
  "votes": 0,
  "time": "string",
  "created_at": "string (ISO date)"
}
```

**Response Error (401):**
```json
{
  "message": "Unauthorized"
}
```

---

## 8. JOUEURS

### GET `/api/players/search`
**Rechercher un joueur par nom et région**

**Query Parameters:**
- `name`: Nom d'invocateur (REQUIS)
- `region`: Région (EUW, NA, KR, EUNE) (REQUIS)

**Example:** `/api/players/search?name=HideOnBush&region=KR`

**Response Success (200):**
```json
{
  "id": "string",
  "name": "string",
  "avatar": "string (URL) | null",
  "rank": "string",
  "level": "number",
  "winrate": "number (percentage)"
}
```

**Response Error (404):**
```json
{
  "message": "Player not found"
}
```

---

### GET `/api/players/:playerId/matches`
**Récupérer l'historique des matchs d'un joueur**

**URL Parameters:**
- `playerId`: ID du joueur

**Response Success (200):**
```json
[
  {
    "win": "boolean",
    "champion": "string",
    "kda": "string (ex: 5/2/8)",
    "date": "string",
    "created_at": "string (ISO date)"
  }
]
```

---

## 9. STATISTIQUES PROFESSIONNELLES

### GET `/api/pro/matches`
**Récupérer les matchs professionnels récents**

**Response Success (200):**
```json
[
  {
    "id": "number",
    "team1_name": "string",
    "team1_logo": "string (URL) | null",
    "team1_score": "number",
    "team2_name": "string",
    "team2_logo": "string (URL) | null",
    "team2_score": "number",
    "tournament": "string",
    "date": "string",
    "created_at": "string (ISO date)"
  }
]
```

---

## 📝 NOTES IMPORTANTES POUR LE BACKEND

### Priorités d'implémentation

**🔴 PRIORITÉ HAUTE (à faire en premier):**
1. `/api/auth/register` et `/api/auth/login` - Authentification
2. `/api/champions` - Liste des champions
3. `/api/forum/posts` - Liste des posts du forum
4. `/api/forum/posts/:id` - Détails d'un post

**⚠️ PRIORITÉ MOYENNE:**
5. `/api/forum/posts/:postId/comments` (GET) - Récupérer les commentaires
6. `/api/forum/posts/:postId/comments` (POST) - Créer un commentaire
7. `/api/players/search` - Rechercher un joueur
8. `/api/items` - Liste des items
9. `/api/spells` - Liste des sorts

**📝 PRIORITÉ BASSE:**
10. `/api/champions/:id` - Détails d'un champion
11. `/api/pro/matches` - Matchs professionnels
12. `/api/players/:playerId/matches` - Historique de matchs
13. `/api/runes` - Liste des runes
14. `/api/forum/posts` (POST) - Créer un post

### Gestion des erreurs

Tous les endpoints doivent renvoyer des codes HTTP appropriés :
- `200` - Succès
- `201` - Ressource créée
- `400` - Requête invalide
- `401` - Non autorisé
- `404` - Non trouvé
- `500` - Erreur serveur

### CORS

Le backend DOIT permettre les requêtes depuis `http://localhost:5173` (ou le port du front-end).

### Authentification

- Utiliser JWT pour l'authentification
- Le token doit être valide pendant au moins 7 jours
- Stocker le token dans `localStorage` côté front

### Base de données

Vous aurez besoin au minimum des tables suivantes :
- `users`
- `champions`
- `items`
- `spells`
- `runes`
- `forum_posts`
- `comments`
- `players` (peut-être relié à une API externe comme Riot Games)
- `pro_matches`

---

## 🚀 TESTING

Pour tester les endpoints, vous pouvez utiliser :
- **Postman** - Collection de requêtes
- **Thunder Client** (VS Code extension)
- **curl** - Ligne de commande

### Exemple de test avec curl :

```bash
# Test registration
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'

# Test login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Test get champions
curl http://localhost:8000/api/champions

# Test protected endpoint (create comment)
curl -X POST http://localhost:8000/api/forum/posts/1/comments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"text":"Great guide!"}'
```

---

## ✅ CHECKLIST POUR LE BACKEND

Avant de dire que le backend est prêt, vérifier que :

- [ ] Tous les endpoints prioritaires (HAUTE) sont implémentés
- [ ] L'authentification fonctionne correctement
- [ ] Les tokens JWT sont générés et validés
- [ ] CORS est configuré pour accepter les requêtes du front
- [ ] La base de données contient des données de test
- [ ] Les codes d'erreur HTTP sont correctement renvoyés
- [ ] Le serveur tourne sur `http://localhost:8000`
- [ ] Au moins 10 champions sont présents dans la DB
- [ ] Au moins 5 posts de forum sont présents dans la DB
- [ ] Les réponses JSON suivent exactement les formats spécifiés

---

**Date de création:** 22 Décembre 2025
**Version:** 1.0
**Contact Frontend:** Voir README.md du projet
