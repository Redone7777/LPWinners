# 📊 LP Winners - Vue d'ensemble du projet

## 🎯 Résumé exécutif

**LP Winners** est une plateforme web complète d'analyse de données pour League of Legends, développée par une équipe de 3 personnes dans le cadre d'un projet de Base de Données.

### Objectif principal
Créer un site similaire à op.gg permettant aux joueurs de :
- Consulter des statistiques détaillées
- Partager des builds via un forum
- Analyser des matchs professionnels
- Obtenir des suggestions de gameplay

---

## 👥 Répartition des tâches

### 🎨 Frontend
**Technologies :** React 19, Vite, Bun  
**Responsabilités :**
- Interface utilisateur responsive
- Navigation entre les pages
- Appels API vers le backend
- Composants réutilisables
- Design et UX

**Livrables :**
- Page d'accueil
- Liste et détail champions
- Profil joueur avec historique
- Forum (liste, détail, création posts)
- Stats pro

📄 Planning détaillé : [REDWAN.md](REDWAN.md)

---

### ⚙️ Backend
**Technologies :** Python, FastAPI, SQLAlchemy  
**Responsabilités :**
- API REST complète
- Connexion à la base de données
- Intégration Riot Games API
- Logique métier
- Validation des données

**Livrables :**
- Endpoints champions
- Endpoints joueurs et matchs
- Endpoints forum
- Endpoints stats pro
- Documentation Swagger
- Système de cache

📄 Planning détaillé : [YANIS.md](YANIS.md)

---

### 🗄️ Database
**Technologies :** PostgreSQL, SQL  
**Responsabilités :**
- Conception du schéma
- Normalisation BCNF
- Création des tables
- Données de test
- Optimisation (index, vues)

**Livrables :**
- Schéma relationnel complet
- Documentation BCNF
- Scripts SQL (création + données)
- Vues et procédures stockées
- Base de données déployée

📄 Planning détaillé : [JIMMY.md](JIMMY.md)

---

## 📊 Architecture du système

```
┌─────────────────────────────────────────────────────────┐
│                    UTILISATEUR                          │
│                    (Navigateur)                         │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   FRONTEND                              │
│              React + Vite (Bun)                         │
│                                                         │
│  Pages:                      Components:                │
│  - Home                      - ChampionCard             │
│  - Champions                 - PlayerCard               │
│  - Profile                   - MatchHistory             │
│  - Forum                     - PostCard                 │
│  - ProStats                  - Navigation               │
│                                                         │
│  Services: api.js (Axios)                               │
└────────────────────┬────────────────────────────────────┘
                     │ REST API (JSON)
                     ▼
┌─────────────────────────────────────────────────────────┐
│                    BACKEND                              │
│              Python + FastAPI                           │
│                                                         │
│  Routes:                     Services:                  │
│  /api/champions              - riot_api.py              │
│  /api/players                - cache.py                 │
│  /api/matches                                           │
│  /api/forum                  Models (SQLAlchemy):       │
│  /api/pro                    - Champion, Player         │
│                              - Match, ForumPost         │
│  Validation: Pydantic schemas                           │
└────────────────────┬────────────────────────────────────┘
                     │ SQL
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   DATABASE                              │
│                 PostgreSQL                              │
│                                                         │
│  Tables (BCNF):                                         │
│  - champions                                            │
│  - players                                              │
│  - matches                                              │
│  - match_participants                                   │
│  - forum_posts                                          │
│  - forum_comments                                       │
│                                                         │
│  Vues:                       Fonctions:                 │
│  - player_statistics         - calculate_kda()          │
│  - popular_champions         - calculate_winrate()      │
│                                                         │
│  Index optimisés sur colonnes recherchées               │
└─────────────────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              RIOT GAMES API                             │
│         (Données officielles LoL)                       │
└─────────────────────────────────────────────────────────┘
```

---

## 🔄 Flow de données - Exemple

### Scénario : Recherche d'un profil joueur

1. **User → Frontend**
   - L'utilisateur entre "Faker" dans la barre de recherche
   - Clic sur "Rechercher"

2. **Frontend → Backend**
   ```javascript
   GET /api/players/search?name=Faker&region=KR
   ```

3. **Backend → Database**
   ```sql
   SELECT * FROM players 
   WHERE summoner_name ILIKE '%Faker%' 
   AND region = 'KR';
   ```

4. **Backend → Riot API** (si données à jour)
   ```
   GET https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/Faker
   ```

5. **Backend → Frontend**
   ```json
   {
     "id": 1,
     "summoner_name": "Faker",
     "region": "KR",
     "rank_tier": "CHALLENGER",
     "level": 450,
     "wins": 350,
     "losses": 180
   }
   ```

6. **Frontend → User**
   - Affichage du profil avec stats
   - Historique des matchs
   - Champions les plus joués

---

## 📋 Fonctionnalités détaillées

### 1. 🗣️ Forum communautaire

**User Stories :**
- En tant que joueur, je veux partager mon build pour aider la communauté
- En tant que lecteur, je veux trouver des guides pour mon champion préféré
- En tant que membre, je veux commenter et voter sur les posts

**Features :**
- Création de posts avec champion, titre, contenu
- Build avec items et runes (optionnel)
- Système de votes (upvote/downvote)
- Commentaires sur les posts
- Filtres par champion et popularité

**Tables DB :**
- `forum_posts` (id, author_id, champion_id, title, content, upvotes, downvotes)
- `forum_comments` (id, post_id, author_id, content, upvotes)

---

### 2. 📊 Analyse Pro

**User Stories :**
- En tant que fan d'esport, je veux voir les stats des pros
- En tant que joueur compétitif, je veux analyser les builds pros
- En tant qu'analyste, je veux filtrer par joueur/champion/équipe

**Features :**
- Liste des matchs professionnels
- Détails complets (build, KDA, CS, dégâts)
- Filtres avancés
- Statistiques agrégées par joueur/champion

**Tables DB :**
- `matches` avec flag `is_pro_match`
- `pro_players` (id, player_id, team_id, real_name)
- `pro_teams` (id, name, region, logo)

---

### 3. 🔍 Profils joueurs

**User Stories :**
- En tant que joueur, je veux voir mes propres stats
- En tant qu'observateur, je veux analyser un autre joueur
- En tant que recruteur, je veux évaluer le niveau d'un joueur

**Features :**
- Recherche par pseudo + région
- Statistiques globales (win rate, KDA, rank)
- Champions les plus joués
- Historique détaillé des matchs
- Graphiques de progression (si temps)

**Tables DB :**
- `players` (id, summoner_name, region, rank, wins, losses)
- `match_participants` (match_id, player_id, champion_id, stats)

---

### 4. 💡 Assistant en partie (MVP+)

**User Stories :**
- En tant que joueur en partie, je veux des suggestions de build
- En tant que débutant, je veux savoir quoi acheter
- En tant que stratège, je veux des conseils selon la compo

**Features :**
- Input : champion joué + adversaires
- Output : build recommandé, ordre des items
- Suggestions de runes optimales
- Tips stratégiques

**Complexité :** Haute (algorithme de recommandation)  
**Priorité :** Basse (si temps restant)

---

## 🏗️ Normalisation BCNF - Résumé

### Pourquoi BCNF ?

La **Forme Normale de Boyce-Codd** garantit :
- ❌ Aucune redondance de données
- ✅ Intégrité référentielle
- ✅ Mises à jour cohérentes
- ✅ Performance optimisée

### Exemple concret

**Avant normalisation :**
```
Match_Data_Bad:
match_id | player_name | player_region | champion_name | kills | deaths
```
❌ Problème : `player_name → player_region` (redondance)

**Après BCNF :**
```
players:           match_participants:
id | name | region    match_id | player_id | champion_id | kills | deaths
```
✅ Solution : Séparation des entités, référence par ID

📄 Documentation complète : [Database/examples/BCNF_EXAMPLE.md](Database/examples/BCNF_EXAMPLE.md)

---

## 📅 Timeline de développement (2 semaines)

### Semaine 1 : Fondations et MVP

**Jours 1-2** : Setup et Architecture
- Jimmy : Schéma BDD, normalisation BCNF
- Yanis : Structure backend, modèles SQLAlchemy
- Redwan : Structure frontend, routing

**Jours 3-5** : MVP Core
- Jimmy : Création tables + données de test
- Yanis : API Champions + Players (endpoints de base)
- Redwan : Pages Champions + Layout

**Jours 6-7** : Intégration première version
- Session commune : connexion Front-Back-DB
- Tests d'intégration basiques
- Corrections bugs critiques

### Semaine 2 : Features et Finalisation

**Jours 8-10** : Features principales
- Jimmy : Optimisation DB (index, vues)
- Yanis : API Forum + Stats Pro
- Redwan : Pages Forum + Profils

**Jours 11-12** : Intégration Riot API
- Yanis : Connexion API Riot + données réelles
- Redwan : Affichage données réelles
- Jimmy : Ajustements DB si nécessaire

**Jours 13-14** : Polish et livraison
- Tests complets de toutes les features
- Debug et optimisations critiques
- Responsive design
- Déploiement en production
- Documentation finale
- Préparation présentation

---

## ✅ Critères d'évaluation (estimés)

### Base de données (40%)
- [ ] Schéma relationnel complet et cohérent
- [ ] Normalisation BCNF respectée et documentée
- [ ] Données de test pertinentes
- [ ] Requêtes SQL complexes (jointures, agrégations)
- [ ] Index et optimisations
- [ ] Documentation claire

### Backend (30%)
- [ ] API REST fonctionnelle
- [ ] Connexion DB opérationnelle
- [ ] Validation des données
- [ ] Gestion des erreurs
- [ ] Code propre et structuré
- [ ] Documentation Swagger

### Frontend (20%)
- [ ] Interface utilisable et intuitive
- [ ] Au moins 4 pages fonctionnelles
- [ ] Responsive design
- [ ] Intégration API réussie
- [ ] Gestion des états (loading, erreur)

### Projet global (10%)
- [ ] Architecture cohérente
- [ ] Travail d'équipe visible (Git)
- [ ] Documentation complète
- [ ] Présentation convaincante
- [ ] Déploiement en ligne (bonus)

---

## 🎯 Definition of Done

### Pour chaque feature

✅ **Code**
- Implémenté et fonctionnel
- Testé manuellement
- Sans erreurs console
- Commenté si nécessaire

✅ **Backend**
- Endpoint documenté (Swagger)
- Validation des inputs
- Gestion des erreurs
- Testé avec Postman

✅ **Frontend**
- Composant créé et intégré
- Responsive (mobile + desktop)
- Loading states + error handling
- Testé dans le navigateur

✅ **Database**
- Table(s) créée(s)
- Données de test insérées
- Relations vérifiées
- Requêtes testées

✅ **Équipe**
- Code poussé sur Git
- Documentation à jour
- Équipe informée

---

## 📚 Ressources clés

### Tutorials
- [FastAPI Tutorial](https://fastapi.tiangolo.com/tutorial/)
- [React Tutorial](https://react.dev/learn)
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)

### APIs
- [Riot API Docs](https://developer.riotgames.com/apis)
- [Data Dragon](https://developer.riotgames.com/docs/lol#data-dragon)

### Outils
- [Postman](https://www.postman.com/) - Test API
- [DBeaver](https://dbeaver.io/) - Client DB
- [Figma](https://figma.com/) - Design (si temps)

---

## 💡 Conseils pour réussir

### Communication
- 🗓️ Daily standup matin + soir
- 🚨 Signaler les blocages rapidement
- 🤝 S'entraider entre développeurs

### Développement
- 📏 Commencer simple, itérer
- 🧪 Tester régulièrement
- 💾 Commit souvent avec messages clairs
- 📖 Documenter au fur et à mesure

### Gestion du temps
- ⏰ Prioriser le MVP
- 🎯 Features essentielles d'abord
- ⚠️ Ne pas sur-engineer
- 🔄 Intégration continue (pas tout à la fin)

---

## 🏆 Objectif final

**Livrer une démo convaincante qui montre :**
1. Une base de données bien conçue (BCNF)
2. Une API fonctionnelle et documentée
3. Une interface utilisateur agréable et responsive
4. Un travail d'équipe cohérent

**Bonus si réussi :**
- Déploiement en ligne fonctionnel
- Intégration réelle de l'API Riot
- Design soigné et professionnel
- Tests automatisés

---

**Bonne chance à l'équipe LP Winners ! 🚀🏆**
