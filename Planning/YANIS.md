# ⚙️ Yanis - Tâches Backend

## 👤 Rôle
**Backend Developer** - API REST et logique métier en Python

---

## 📅 Planning détaillé

### Phase 1 : Setup & API Core

#### Setup initial
- [ ] Choisir le framework : **FastAPI** (recommandé) ou Flask
- [ ] Setup environnement :
  ```bash
  python -m venv venv
  source venv/bin/activate  # Linux/Mac
  pip install fastapi uvicorn sqlalchemy psycopg2-binary python-dotenv
  ```
- [ ] Structure du projet :
  ```
  Back/
  ├── app/
  │   ├── __init__.py
  │   ├── main.py           # Point d'entrée
  │   ├── database.py       # Connexion DB
  │   ├── models/           # Modèles SQLAlchemy
  │   ├── routes/           # Endpoints API
  │   ├── schemas/          # Pydantic schemas
  │   └── utils/            # Fonctions utilitaires
  ├── requirements.txt
  └── .env                  # Variables d'environnement
  ```
- [ ] Configuration CORS pour le frontend
- [ ] Test de connexion à la base de données

#### Modèles & Database
- [ ] Créer les modèles SQLAlchemy :
  - Champion
  - Player
  - Match
  - MatchParticipant
  - ForumPost
  - Build
  - Comment
- [ ] Créer les relations entre modèles
- [ ] Script de migration (Alembic ou création manuelle)
- [ ] Tester la création des tables
- [ ] Script d'insertion de données de test

#### API Champions
- [ ] **GET /api/champions** - Liste tous les champions
  - Pagination (limit, offset)
  - Filtres (role, difficulty)
  - Recherche par nom
- [ ] **GET /api/champions/{id}** - Détail d'un champion
  - Infos complètes
  - Statistiques
- [ ] **GET /api/champions/{id}/builds** - Builds pour un champion
- [ ] Tests avec Postman/Thunder Client
- [ ] Documentation Swagger (auto-généré avec FastAPI)

#### API Profils & Matchs
- [ ] **GET /api/players/search** - Recherche un joueur
  - Par summoner_name
  - Par région
- [ ] **GET /api/players/{id}** - Profil d'un joueur
  - Stats globales
  - Rang, level, win rate
- [ ] **GET /api/players/{id}/matches** - Historique des matchs
  - Pagination
  - Filtres (champion, date)
- [ ] **GET /api/matches/{id}** - Détail d'un match
  - Tous les participants
  - Statistiques complètes
- [ ] Tests et corrections

#### Intégration Frontend
- [ ] Tests d'intégration avec Redwan
- [ ] Corrections des endpoints selon les besoins frontend
- [ ] Gestion des erreurs uniformisée :
  - 404 Not Found
  - 400 Bad Request
  - 500 Server Error
- [ ] Optimisation des requêtes SQL (éviter N+1)
- [ ] Documentation complète des endpoints

---

### Phase 2 : Features & Intégration API Riot

#### API Forum
- [ ] **GET /api/forum/posts** - Liste des posts
  - Pagination
  - Filtres (champion, date, popularité)
- [ ] **GET /api/forum/posts/{id}** - Détail d'un post
  - Avec commentaires
- [ ] **POST /api/forum/posts** - Créer un post
  - Validation des données
- [ ] **POST /api/forum/posts/{id}/comments** - Ajouter un commentaire
- [ ] **PUT/DELETE /api/forum/posts/{id}** - Modifier/Supprimer
- [ ] **POST /api/forum/posts/{id}/vote** - Voter (upvote/downvote)

#### API Stats Pro & Riot Games
- [ ] **GET /api/pro/matches** - Liste matchs pros
  - Filtres (joueur, équipe, champion, date)
  - Pagination
- [ ] **GET /api/pro/matches/{id}** - Détail match pro
- [ ] **GET /api/pro/players** - Liste joueurs pros
- [ ] Intégration API Riot Games :
  - Obtenir une clé développeur : https://developer.riotgames.com/
  - Module pour requêtes Riot API
  - Rate limiting (20 req/sec)
  - Mise en cache des réponses
- [ ] Endpoint pour rafraîchir les données d'un joueur depuis Riot

#### Optimisations & Cache
- [ ] Mise en place du caching :
  - Redis (si temps) ou cache in-memory
  - Cache pour les données statiques (champions, items)
  - TTL appropriés
- [ ] Optimisation des performances :
  - Indexes sur les colonnes recherchées
  - Pagination efficace
  - Eager loading des relations
- [ ] Background tasks pour mise à jour données :
  - Celery (optionnel si temps)
  - Ou scripts cron simples
- [ ] Logging des requêtes

#### Tests & Sécurité
- [ ] Tests unitaires des endpoints critiques
- [ ] Tests d'intégration complets
- [ ] Validation des inputs (Pydantic schemas)
- [ ] Gestion des erreurs améliorée
- [ ] Rate limiting sur les endpoints
- [ ] Variables d'environnement sécurisées (.env)
- [ ] Documentation finale de l'API

#### Déploiement
- [ ] Configuration pour production :
  - Gunicorn/Uvicorn workers
  - Variables d'environnement production
- [ ] Déploiement (Render/Railway/Heroku) :
  - Configuration du serveur
  - Variables d'environnement
  - Connexion à la DB distante
- [ ] Tests post-déploiement
- [ ] Documentation déploiement
- [ ] Préparation démo

---

## 🛠️ Stack technique

### Core
- **FastAPI** - Framework web moderne et rapide
- **Uvicorn** - Serveur ASGI
- **SQLAlchemy** - ORM Python
- **Pydantic** - Validation de données

### Database
- **PostgreSQL** ou **MySQL** (selon choix de Jimmy)
- **Alembic** - Migrations (optionnel)

### Intégrations
- **Riot Games API** - Données officielles LoL
- **Requests** ou **httpx** - Requêtes HTTP
- **python-dotenv** - Variables d'environnement

### Utilitaires
- **python-jose** - JWT (si authentification)
- **passlib** - Hashing passwords (si auth)
- **Redis** - Cache (optionnel)

---

## 📁 Structure du projet

```
Back/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app + CORS
│   ├── database.py          # Connexion SQLAlchemy
│   ├── models/
│   │   ├── __init__.py
│   │   ├── champion.py
│   │   ├── player.py
│   │   ├── match.py
│   │   ├── forum.py
│   │   └── build.py
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── champion.py      # Pydantic schemas
│   │   ├── player.py
│   │   ├── match.py
│   │   └── forum.py
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── champions.py     # Endpoints champions
│   │   ├── players.py       # Endpoints joueurs
│   │   ├── matches.py       # Endpoints matchs
│   │   ├── forum.py         # Endpoints forum
│   │   └── pro.py           # Endpoints stats pro
│   ├── services/
│   │   ├── __init__.py
│   │   ├── riot_api.py      # Intégration Riot API
│   │   └── cache.py         # Système de cache
│   └── utils/
│       ├── __init__.py
│       └── helpers.py
├── tests/
│   ├── test_champions.py
│   ├── test_players.py
│   └── test_forum.py
├── requirements.txt
├── .env                      # DB_URL, RIOT_API_KEY, etc.
├── .env.example
└── README.md
```

---

## 📡 Endpoints API (résumé)

### Champions
```
GET    /api/champions              # Liste champions
GET    /api/champions/{id}         # Détail champion
GET    /api/champions/{id}/builds  # Builds du champion
```

### Joueurs
```
GET    /api/players/search         # Recherche joueur
GET    /api/players/{id}           # Profil joueur
GET    /api/players/{id}/matches   # Historique matchs
POST   /api/players/refresh        # Rafraîchir depuis Riot API
```

### Matchs
```
GET    /api/matches                # Liste matchs
GET    /api/matches/{id}           # Détail match
```

### Forum
```
GET    /api/forum/posts            # Liste posts
GET    /api/forum/posts/{id}       # Détail post
POST   /api/forum/posts            # Créer post
PUT    /api/forum/posts/{id}       # Modifier post
DELETE /api/forum/posts/{id}       # Supprimer post
POST   /api/forum/posts/{id}/vote  # Voter
POST   /api/forum/posts/{id}/comments  # Commenter
```

### Stats Pro
```
GET    /api/pro/matches            # Matchs pros
GET    /api/pro/matches/{id}       # Détail match pro
GET    /api/pro/players            # Joueurs pros
```

---

## 🎯 Checklist finale

### API
- [ ] Tous les endpoints fonctionnels
- [ ] Documentation Swagger accessible
- [ ] Gestion des erreurs cohérente
- [ ] Validation des inputs
- [ ] CORS configuré pour le frontend

### Performance
- [ ] Requêtes SQL optimisées
- [ ] Pagination sur toutes les listes
- [ ] Cache pour données statiques
- [ ] Temps de réponse < 500ms

### Sécurité
- [ ] Variables sensibles dans .env
- [ ] Rate limiting
- [ ] Validation stricte des inputs
- [ ] Pas de secrets dans le code

### Déploiement
- [ ] API déployée en ligne
- [ ] Base de données distante connectée
- [ ] Tests post-déploiement OK
- [ ] Documentation à jour

---

## 📞 Communication avec l'équipe

### Points de synchro
- Valider schéma DB avec Jimmy
- Fournir endpoints de base à Redwan
- Session d'intégration frontend-backend
- Tests complets ensemble

### Dépendances
- **Database (Jimmy)** :
  - Schéma finalisé
  - Base accessible
  - Données de test

- **Frontend (Redwan)** :
  - Format attendu des réponses
  - Besoins spécifiques d'endpoints

---

## 💡 Conseils

1. **FastAPI > Flask** : Plus moderne, auto-documentation, validation automatique
2. **Start simple** : API basique d'abord, optimisations ensuite
3. **Documentation** : Swagger auto-généré = documentation gratuite
4. **Tests** : Thunder Client/Postman pour tester chaque endpoint
5. **Git** : Commit après chaque endpoint fonctionnel
6. **Riot API** : Attention aux rate limits, cache les résultats
7. **Erreurs claires** : Messages d'erreur explicites pour le frontend

## 🚀 Commandes utiles

```bash
# Développement
make back
```

## 📖 Ressources

- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [SQLAlchemy Docs](https://docs.sqlalchemy.org/)
- [Riot API Docs](https://developer.riotgames.com/apis)

---

**C'est parti pour le back ! 🔥**
