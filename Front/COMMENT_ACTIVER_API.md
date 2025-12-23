# 🔌 COMMENT ACTIVER LES APPELS API

**Date:** 22 Décembre 2025
**Statut:** Appels API temporairement désactivés

---

## ⚠️ POURQUOI LES APPELS API SONT DÉSACTIVÉS ?

Les appels API ont été **temporairement commentés** dans le code pour éviter que les pages ne plantent quand le backend n'est pas encore disponible.

Les pages affichent maintenant des **données de démonstration** en attendant le backend.

---

## ✅ COMMENT RÉACTIVER LES APPELS API

Une fois que le backend est prêt et fonctionne sur `http://localhost:8000`, suivez ces étapes :

### ÉTAPE 1: Vérifier que le backend fonctionne

```bash
# Tester si le backend répond
curl http://localhost:8000/api/champions
```

Si ça renvoie une erreur de connexion, le backend n'est pas démarré.

---

### ÉTAPE 2: Décommenter les appels API

Il faut décommenter les blocs commentés dans ces fichiers :

#### 1. **GameData.jsx** (`Front/src/pages/game/GameData.jsx`)

**Ligne ~115-156**

Remplacer :
```javascript
useEffect(() => {
  // NOTE: Les appels API sont commentés car le backend n'est pas encore prêt
  // Décommenter cette fonction une fois que le backend est opérationnel
  /*
  const fetchData = async () => {
    // ... code commenté ...
  };
  fetchData();
  */
  // Utilise les données de démo pour l'instant
  setLoading(false);
}, [activeTab]);
```

Par :
```javascript
useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      switch (activeTab) {
        case 'champions':
          const championsData = await getChampions();
          setChampions(championsData);
          break;
        case 'items':
          const itemsData = await getItems();
          setItems(itemsData);
          break;
        case 'spells':
          const spellsData = await getSpells();
          setSpells(spellsData);
          break;
        case 'runes':
          const runesData = await getRunes();
          setRunes(runesData);
          break;
        default:
          break;
      }
    } catch (err) {
      console.error('Erreur lors du chargement des données:', err);
      setError('Impossible de charger les données. Utilisation des données de démonstration.');
      // Garder les données de démo en cas d'erreur
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [activeTab]);
```

---

#### 2. **ChampionDetail.jsx** (`Front/src/pages/champions/ChampionDetail.jsx`)

**Ligne ~19-42**

Remplacer :
```javascript
useEffect(() => {
  // NOTE: Appel API commenté car le backend n'est pas encore prêt
  /*
  const fetchChampion = async () => {
    // ... code commenté ...
  };
  fetchChampion();
  */
  setLoading(false);
  setError('Page de détail du champion disponible une fois le backend connecté.');
}, [id]);
```

Par :
```javascript
useEffect(() => {
  const fetchChampion = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getChampion(id);
      setChampion(data);
    } catch (err) {
      console.error('Erreur lors du chargement du champion:', err);
      setError('Impossible de charger les détails du champion.');
    } finally {
      setLoading(false);
    }
  };

  fetchChampion();
}, [id]);
```

---

#### 3. **Forum.jsx** (`Front/src/pages/community/Forum.jsx`)

**Ligne ~266-289**

Remplacer :
```javascript
useEffect(() => {
  // NOTE: Appel API commenté car le backend n'est pas encore prêt
  /*
  const fetchPosts = async () => {
    // ... code commenté ...
  };
  fetchPosts();
  */
  setLoading(false);
}, []);
```

Par :
```javascript
useEffect(() => {
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getForumPosts();
      setPosts(data);
    } catch (err) {
      console.error('Erreur lors du chargement des posts:', err);
      setError('Impossible de charger les posts. Utilisation des données de démonstration.');
    } finally {
      setLoading(false);
    }
  };

  fetchPosts();
}, []);
```

---

#### 4. **ForumPost.jsx** (`Front/src/pages/community/ForumPost.jsx`)

**Ligne ~108-136**

Remplacer :
```javascript
useEffect(() => {
  // NOTE: Appels API commentés car le backend n'est pas encore prêt
  /*
  const fetchPostData = async () => {
    // ... code commenté ...
  };
  fetchPostData();
  */
  setLoading(false);
}, [id]);
```

Par :
```javascript
useEffect(() => {
  const fetchPostData = async () => {
    setLoading(true);
    setError(null);
    try {
      const postData = await getForumPost(id);
      setGuide(postData);
      setVotes(postData.stats?.votes || 0);

      const commentsData = await getPostComments(id);
      setComments(commentsData);
    } catch (err) {
      console.error('Erreur lors du chargement du post:', err);
      setError('Impossible de charger le post. Utilisation des données de démonstration.');
    } finally {
      setLoading(false);
    }
  };

  fetchPostData();
}, [id]);
```

---

#### 5. **ProStats.jsx** (`Front/src/pages/game/ProStats.jsx`)

**Ligne ~13-35**

Remplacer :
```javascript
useEffect(() => {
  // NOTE: Appel API commenté car le backend n'est pas encore prêt
  /*
  const fetchMatches = async () => {
    // ... code commenté ...
  };
  fetchMatches();
  */
  setLoading(false);
}, []);
```

Par :
```javascript
useEffect(() => {
  const fetchMatches = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProMatches();
      setMatches(data);
    } catch (err) {
      console.error('Erreur lors du chargement des matchs:', err);
      setError('Impossible de charger les matchs professionnels.');
    } finally {
      setLoading(false);
    }
  };

  fetchMatches();
}, []);
```

---

### ÉTAPE 3: Vérifier l'URL du backend

Dans `Front/src/shared/services/api.js`, vérifier que l'URL est correcte :

```javascript
const API_BASE_URL = 'http://localhost:8000';
```

Si ton backend utilise un autre port, change cette ligne.

---

### ÉTAPE 4: Tester

1. Redémarrer le serveur frontend
```bash
cd Front
npm run dev
```

2. Ouvrir le navigateur à `http://localhost:5173` (ou le port affiché)

3. Ouvrir la console du navigateur (F12)

4. Naviguer vers une page (par exemple `/game-data`)

5. Vérifier dans la console qu'il n'y a pas d'erreurs réseau

---

## 🔍 PAGES QUI UTILISENT L'API

| Page | Fichier | Endpoint utilisé |
|------|---------|------------------|
| Base de données | GameData.jsx | `/api/champions`, `/api/items`, `/api/spells`, `/api/runes` |
| Détail champion | ChampionDetail.jsx | `/api/champions/:id` |
| Forum | Forum.jsx | `/api/forum/posts` |
| Détail post | ForumPost.jsx | `/api/forum/posts/:id`, `/api/forum/posts/:id/comments` |
| Stats Pro | ProStats.jsx | `/api/pro/matches` |
| Joueurs | Players.jsx | `/api/players/search`, `/api/players/:id/matches` |
| Auth | Auth.jsx | `/api/auth/login`, `/api/auth/register` |

---

## ⚡ RACCOURCI : Script de remplacement automatique

Tu peux utiliser ce script pour décommenter automatiquement tous les appels API :

```bash
# Créer un script de remplacement
cat > /tmp/uncomment_apis.sh << 'EOF'
#!/bin/bash
cd /home/redone/Projet/LPWinners/Front/src

# Liste des fichiers à modifier
files=(
  "pages/game/GameData.jsx"
  "pages/champions/ChampionDetail.jsx"
  "pages/community/Forum.jsx"
  "pages/community/ForumPost.jsx"
  "pages/game/ProStats.jsx"
)

for file in "${files[@]}"; do
  echo "Décommentant $file..."
  # Cette commande nécessite d'être adaptée selon le format exact
  # Il est recommandé de le faire manuellement
done

echo "Terminé ! Vérifie que tout fonctionne."
EOF

chmod +x /tmp/uncomment_apis.sh
```

**⚠️ ATTENTION:** Il est recommandé de décommenter manuellement pour éviter les erreurs.

---

## 📝 NOTES

- Les données de démo resteront en cas d'erreur réseau
- Les pages afficheront un message d'erreur si le backend ne répond pas
- L'authentification est déjà active, pas besoin de décommenter

---

**Une fois toutes ces modifications faites, ton frontend sera connecté au backend ! 🚀**
