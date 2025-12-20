# 🏆 LP Winners

Plateforme d'analyse et de statistiques pour League of Legends - Projet de Base de Données.

---

## 👥 Équipe

- **Redwan** - Frontend (React + Vite + Bun)
- **Yanis** - Backend (Python + FastAPI)
- **Jimmy** - Database (PostgreSQL)

---

## 📋 Description du projet

LP Winners est une plateforme inspirée d'op.gg qui combine :

1. **🗣️ Forum communautaire** - Builds, guides et discussions
2. **📊 Analyse Pro** - Statistiques des matchs professionnels
3. **🔍 Profils joueurs** - Historique et stats personnelles
4. **💡 Assistant en partie** - Suggestions en temps réel

Voir [PROJET.md](docs/PROJET.md) pour la documentation complète.

---

## 🚀 Démarrage rapide

### Frontend (Redwan)
```bash
make front
```
→ Voir [REDWAN.md](REDWAN.md)

### Backend (Yanis)
```bash
make back
```
→ Voir [YANIS.md](YANIS.md)

### Database (Jimmy)
```bash
cd Database
psql -U postgres -d lpwinners -f schemas/schema.sql
psql -U postgres -d lpwinners -f scripts/seed_data.sql
```
→ Voir [JIMMY.md](JIMMY.md) et [Database/README.md](Database/README.md)

---

## 📁 Structure du projet

```
lpwinners/
├── Front/                    # Application React
│   ├── src/
│   │   ├── components/      # Composants réutilisables
│   │   ├── pages/           # Pages de l'application
│   │   ├── services/        # Appels API
│   │   └── App.jsx          # Composant principal
│   └── package.json
│
├── Back/                     # API Python
│   ├── app/
│   │   ├── main.py          # Point d'entrée FastAPI
│   │   ├── models/          # Modèles SQLAlchemy
│   │   ├── routes/          # Endpoints API
│   │   └── schemas/         # Validation Pydantic
│   └── requirements.txt
│
├── Database/                 # Base de données
│   └── examples/
│       ├── schema.sql       # Schéma complet (BCNF)
│       ├── seed_data.sql    # Données de test
│       └── BCNF_EXAMPLE.md  # Documentation normalisation
│
├── docs/                     # Documentation et ressources
│   ├── projet.pdf           # Énoncé du projet
│   └── works.png            # Schémas/captures
│
├── Planning/     
│   ├── REDWAN.md        # Tâches et planning Frontend
│   ├── YANIS.md          # Tâches et planning Backend
│   └── JIMMY.md         # Tâches et planning Database
│
├── PROJET.md                 # Documentation complète du projet

└── README.md                 # Ce fichier
```

---

## 🛠️ Stack technique

### Frontend
- **React 19** - Framework UI
- **Vite** - Build tool ultra rapide
- **Bun** - Runtime & package manager
- **React Router** - Navigation
- **Axios** - Requêtes HTTP

### Backend
- **Python 3.10+** - Langage
- **FastAPI** - Framework web moderne
- **SQLAlchemy** - ORM
- **Uvicorn** - Serveur ASGI
- **Pydantic** - Validation de données

### Database
- **PostgreSQL** - SGBD relationnel
- **BCNF** - Normalisation stricte
- Vues, procédures stockées, triggers

### APIs externes
- **Riot Games API** - Données officielles LoL
- **Data Dragon** - Champions, items, runes

---

## 📅 Planning

### Phase 1
- Setup et architecture
- Schéma BDD + API de base
- Frontend MVP

### Phase 2
- Features principales (Forum, Profils)
- Intégration complète
- Tests, polish et déploiement

---

## 🎯 MVP (Minimum Viable Product)

### Fonctionnalités essentielles
1. ✅ Liste et détail des champions
2. ✅ Recherche de profil joueur
3. ✅ Historique de matchs
4. ✅ Forum avec posts et commentaires
5. ✅ Base de données normalisée BCNF

### Nice to have (si temps)
- Stats professionnelles
- Graphiques et visualisations
- Assistant en partie
- Système d'authentification

---

## 🔗 Liens utiles

### Documentation
- [Riot Developer Portal](https://developer.riotgames.com/)
- [Data Dragon](https://developer.riotgames.com/docs/lol#data-dragon)
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [React Docs](https://react.dev/)

### Outils
- [Postman/Thunder Client](https://www.postman.com/) - Test API
- [DBeaver](https://dbeaver.io/) - Client PostgreSQL
- [Excalidraw](https://excalidraw.com/) - Schémas

---

## 🚦 État du projet

- [x] Setup initial Frontend
- [x] Setup initial Backend
- [ ] Schéma BDD finalisé
- [ ] API Champions complète
- [ ] Page liste champions
- [ ] API Profils joueurs
- [ ] Page profil joueur
- [ ] API Forum
- [ ] Page forum
- [ ] Intégration Riot API
- [ ] Tests complets
- [ ] Déploiement

---

## 📞 Communication

### Daily standups
- **Matin** : Objectifs du jour
- **Soir** : Bilan et blocages

### Points importants
- Partager les problèmes rapidement
- Documenter les décisions techniques
- Tester l'intégration régulièrement

---

## 🆘 Support

### En cas de blocage
1. Consulter la documentation spécifique (REDWAN/YANIS/JIMMY.md)
2. Demander à l'équipe
3. Chercher sur Stack Overflow / Documentation officielle
4. Simplifier le problème pour le résoudre étape par étape

---

## 📜 Licence

Projet académique 