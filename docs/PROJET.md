# 🏆 LP Winners - Projet BDD

## 📋 Vue d'ensemble

**LP Winners** est une plateforme d'analyse et de statistiques pour League of Legends, inspirée d'op.gg. Le projet combine analyse de données, communauté et assistance en temps réel pour les joueurs.

**Équipe :** 
- Redwan - Frontend (React + Vite)
- Yanis - Backend (Python)
- Jimmy - Base de données

---

## 🎯 Fonctionnalités principales

### 1. 🗣️ Forum communautaire
- Discussions sur les champions
- Partage de builds personnalisés
- Guides et stratégies par lane
- Système de commentaires et votes
- Inspiration : [MOBAFire](https://www.mobafire.com/league-of-legends/champion/khazix-105)

**Données nécessaires :**
- Champions, lanes, rôles
- Builds (items, runes, sorts)
- Posts utilisateurs, commentaires
- Votes/likes

### 2. 📊 Analyse Pro
- Historique des parties professionnelles
- Statistiques détaillées par match :
  - Build utilisé
  - CS/min
  - KDA
  - Dégâts, vision, etc.
- Filtres par joueur, champion, équipe
- Tendances meta

**Données nécessaires :**
- Matchs pro (résultats, durée, patch)
- Joueurs pro (équipe, rôle)
- Statistiques détaillées par match
- Items et runes utilisés

### 3. 🔍 Profils joueurs
- Recherche de compte par pseudo
- Historique de parties
- Statistiques globales :
  - Win rate
  - Champions les plus joués
  - Progression du rang
- Statistiques par champion

**Données nécessaires :**
- Comptes joueurs (pseudo, rang, région)
- Historique de matchs
- Statistiques agrégées

### 4. 💡 Assistant en partie (MVP Plus)
- Suggestions de build en temps réel
- Recommandations selon la composition
- Tips stratégiques
- Intégration pendant la partie

**Données nécessaires :**
- Données en temps réel (API Riot)
- Algorithmes de recommandation
- Base de builds optimaux

---

## 🎪 Approche : MVP (Minimum Viable Product)

### Phase 1 - MVP Core
**Objectif :** Avoir une base fonctionnelle avec données et affichage

1. **Database** : Schéma BCNF avec données de base
2. **Backend** : API REST pour récupérer champions/stats
3. **Frontend** : Page d'accueil + recherche de champion basique

### Phase 2 - Features essentielles
**Objectif :** Ajouter les fonctionnalités principales

1. **Forum** : Création/affichage de posts
2. **Profils** : Recherche et affichage d'un joueur
3. **Stats Pro** : Affichage de quelques matchs pros

### Phase 3 - Polish & Déploiement
**Objectif :** Finaliser et déployer

1. Design et UX
2. Tests et corrections
3. Documentation
4. Déploiement

---

## 🗄️ Sources de données

### API Riot Games
- [API Officielle Riot](https://developer.riotgames.com/)
- Rate limits : 20 req/sec (dev key)
- Données joueurs, matchs, classement

### Data Dragon (Riot)
- Champions, items, runes
- Images et assets
- Mises à jour par patch

### APIs tierces
- [Op.gg API](https://www.op.gg/) (si disponible)
- Scraping de sites pros (avec précaution)

### Données statiques
- Champions et capacités
- Items et statistiques
- Runes et arbres

---

## 🏗️ Architecture technique

```
┌─────────────┐
│   Frontend  │  React + Vite (Bun)
│  (Redwan)   │  
└──────┬──────┘
       │ HTTP/REST
┌──────▼──────┐
│   Backend   │  Python (FastAPI/Flask)
│   (Yanis)   │  API REST + Logique métier
└──────┬──────┘
       │ SQL
┌──────▼──────┐
│  Database   │  PostgreSQL/MySQL
│   (Jimmy)   │  Schéma BCNF normalisé
└─────────────┘
```

---

## 📊 Schéma BDD (aperçu)

### Tables principales

**Champions**
- id, nom, rôle, difficulté
- image_url, description

**Players**
- id, summoner_name, region, rank
- level, profile_icon

**Matches**
- id, game_id, date, duration, patch
- queue_type, winning_team

**MatchParticipants**
- match_id, player_id, champion_id
- kills, deaths, assists, cs, gold
- items, runes

**ForumPosts**
- id, author_id, champion_id, titre
- contenu, date, votes

**Builds**
- id, champion_id, author_id, nom
- items, runes, spells, description

---

## ⚠️ Défis et risques

1. **Complexité du projet** : Très ambitieux, nécessite une bonne organisation
2. **API Riot** : Rate limits et clé de développement
3. **Volume de données** : Gestion de grandes quantités de matchs
4. **Temps limité** : Priorisation essentielle

## 💡 Recommandations

1. **Focus sur le MVP** : Ne pas tout implémenter
2. **Données limitées** : Commencer avec un petit dataset
3. **API mock** : Simuler certaines données si nécessaire
4. **Communication** : Synchro quotidienne de l'équipe

---

## 📅 Planning général

### Phase initiale
- Setup complet du projet
- Architecture BDD et normalisation BCNF
- API Backend de base (Champions, Players)
- Frontend MVP (Layout, Navigation, Pages de base)

### Phase finale
- Features principales (Forum, Profils, Stats)
- Intégration Riot API
- Polish UI/UX + Corrections bugs
- Tests complets
- Documentation + Préparation démo
- Rendu final

---

## 🚀 Critères de succès

### Minimum (pour valider)
- ✅ Base de données normalisée (BCNF)
- ✅ API REST fonctionnelle
- ✅ Interface utilisable
- ✅ Au moins 2 fonctionnalités complètes
- ✅ Documentation technique

### Idéal
- ✅ Toutes les fonctionnalités implémentées
- ✅ Design soigné et responsive
- ✅ Déploiement en ligne
- ✅ Tests automatisés
- ✅ Présentation démo convaincante
