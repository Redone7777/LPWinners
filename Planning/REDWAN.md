# 🎨 Redwan - Tâches Frontend

## 👤 Rôle
**Frontend Developer** - Interface utilisateur avec React + Vite (Bun)

---

## 📅 Planning détaillé

### Phase 1 : Setup & MVP

#### Setup initial ✅
- [x] Configuration environnement (Bun, Vite, React)
- [x] Structure du projet
- [x] Test connexion Backend

#### Architecture frontend
- [ ] Installer les dépendances nécessaires :
  - React Router (navigation)
  - Axios (requêtes HTTP)
  - CSS framework (Tailwind/Material-UI)
- [ ] Créer la structure des dossiers :
  ```
  src/
  ├── components/      # Composants réutilisables
  ├── pages/          # Pages principales
  ├── services/       # Appels API
  ├── hooks/          # Custom hooks
  ├── utils/          # Fonctions utilitaires
  └── assets/         # Images, icons
  ```
- [ ] Setup React Router avec routes de base

#### Layout & Navigation
- [ ] Créer le composant Header (navigation)
- [ ] Créer le composant Footer
- [ ] Créer le Layout principal
- [ ] Page d'accueil (Home) avec hero section
- [ ] Menu de navigation :
  - Accueil
  - Champions
  - Forum
  - Profils
  - Stats Pro

#### Page Champions
- [ ] Créer `services/api.js` pour les appels backend
- [ ] Page liste des champions :
  - Grille de cartes champions
  - Barre de recherche
  - Filtres par rôle
- [ ] Page détail champion :
  - Infos générales
  - Statistiques
  - Builds recommandés

#### Intégration API
- [ ] Connecter liste champions à l'API
- [ ] Connecter détail champion à l'API
- [ ] Gestion des états de chargement (loading)
- [ ] Gestion des erreurs
- [ ] Tests d'intégration avec Backend

---

### Phase 2 : Features & Polish

#### Page Profils Joueurs
- [ ] Créer page recherche de joueur :
  - Input de recherche
  - Sélection région
  - Bouton de recherche
- [ ] Page profil joueur :
  - Infos générales (rang, level, win rate)
  - Champions les plus joués
  - Historique de matchs (tableau)
- [ ] Intégration API profils

#### Forum
- [ ] Page liste des posts forum :
  - Affichage des posts
  - Filtres par champion
  - Bouton "Nouveau post"
- [ ] Page détail post :
  - Contenu du post
  - Commentaires
  - Système de votes (upvote/downvote)
- [ ] Formulaire création de post :
  - Titre, contenu
  - Sélection champion
  - Build (items/runes) optionnel
- [ ] Intégration API forum

#### Stats Pro & Polish
- [ ] Page stats pro :
  - Tableau des derniers matchs pros
  - Filtres (joueur, champion, équipe)
  - Détails d'un match
- [ ] Amélioration design général :
  - Responsive design (mobile)
  - Transitions et animations
  - Loading skeletons
- [ ] Page 404
- [ ] Amélioration UX (tooltips, feedback utilisateur)

#### Tests & Debug
- [ ] Tests complets de toutes les pages
- [ ] Corrections des bugs
- [ ] Optimisation des performances :
  - Lazy loading des images
  - Code splitting
  - Caching
- [ ] Tests cross-browser (Chrome, Firefox, Safari)
- [ ] Tests responsive (mobile, tablette, desktop)

#### Déploiement & Documentation
- [ ] Build production (`bun run build`)
- [ ] Déploiement (Vercel/Netlify)
- [ ] Documentation README :
  - Installation
  - Lancement
  - Structure du projet
  - Features implémentées
- [ ] Screenshots pour la présentation
- [ ] Préparation démo

---

## 🛠️ Stack technique

### Core
- **React 19** - Framework UI
- **Vite** - Build tool
- **Bun** - Runtime & package manager
- **React Router** - Navigation

### Styling
- **Tailwind CSS** ou **Material-UI** (à choisir)
- **CSS Modules** pour composants spécifiques

### HTTP & State
- **Axios** - Requêtes HTTP
- **React Context** ou **Zustand** (state management léger)

### Utilitaires
- **React Icons** - Icônes
- **date-fns** - Manipulation de dates
- **react-loading-skeleton** - Loading states

---

## 📁 Structure des fichiers

```
Front/
├── public/
│   └── assets/           # Images statiques
├── src/
│   ├── components/
│   │   ├── common/       # Composants génériques
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Input.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Layout.jsx
│   │   ├── champions/
│   │   │   ├── ChampionCard.jsx
│   │   │   ├── ChampionList.jsx
│   │   │   └── ChampionDetail.jsx
│   │   ├── forum/
│   │   │   ├── PostCard.jsx
│   │   │   ├── PostForm.jsx
│   │   │   └── CommentList.jsx
│   │   └── profile/
│   │       ├── PlayerCard.jsx
│   │       ├── MatchHistory.jsx
│   │       └── StatsTable.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Champions.jsx
│   │   ├── ChampionDetail.jsx
│   │   ├── Forum.jsx
│   │   ├── PostDetail.jsx
│   │   ├── Profile.jsx
│   │   ├── ProStats.jsx
│   │   └── NotFound.jsx
│   ├── services/
│   │   └── api.js        # Toutes les requêtes API
│   ├── hooks/
│   │   ├── useChampions.js
│   │   ├── usePlayer.js
│   │   └── useForum.js
│   ├── utils/
│   │   ├── constants.js
│   │   └── helpers.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── vite.config.js
```

---

## 🎯 Checklist finale

### Fonctionnalités
- [ ] Navigation fluide entre les pages
- [ ] Affichage liste champions avec recherche/filtres
- [ ] Page détail champion complète
- [ ] Recherche et affichage profil joueur
- [ ] Forum : liste posts + détail + création
- [ ] Page stats pro avec matchs

### Qualité
- [ ] Responsive (mobile/tablette/desktop)
- [ ] Gestion erreurs et états de chargement
- [ ] Performance optimale (< 3s chargement)
- [ ] Code propre et commenté
- [ ] Pas d'erreurs console

### Livraison
- [ ] Build production fonctionnel
- [ ] Site déployé en ligne
- [ ] README à jour
- [ ] Screenshots/vidéo démo

---

## 📞 Communication avec l'équipe

### Points de synchro quotidiens
- **Matin** : Objectifs du jour
- **Soir** : Bilan, blocages

### Dépendances
- **Backend (Yanis)** : 
  - Endpoints API documentés
  - CORS configuré
  - Format des réponses JSON
  
- **Database (Jimmy)** :
  - Schéma BDD finalisé
  - Données de test disponibles

---

## 💡 Conseils

1. **Commence simple** : Page statique d'abord, puis connexion API
2. **Composants réutilisables** : DRY (Don't Repeat Yourself)
3. **Mobile-first** : Design d'abord pour mobile
4. **Git régulier** : Commit souvent avec messages clairs
5. **Teste en continu** : Ne laisse pas les bugs s'accumuler
6. **Demande de l'aide** : Si bloqué > 1h, demande à l'équipe

## 🚀 Commandes utiles

```bash
# Développement
make front
```

---

**Tu gères le front ! 💪**
