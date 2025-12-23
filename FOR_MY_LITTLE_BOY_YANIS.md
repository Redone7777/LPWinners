# 👶 GUIDE POUR MON PETIT YANIS - BACKEND LP WINNERS

**ÉCOUTE-MOI BIEN, PETIT YANIS.**

Tu vas lire ce document LIGNE PAR LIGNE. Tu ne vas PAS sauter d'étapes. Tu ne vas PAS faire "à ta sauce". Tu vas EXACTEMENT suivre ce qui est écrit ici, comme un bon petit soldat obéissant.

Pourquoi ? Parce que le frontend est DÉJÀ FAIT. Il t'attend. Il attend que TOI, petit Yanis, tu fasses ENFIN ton travail pour qu'il puisse vivre. Sans toi, il reste là, tout beau, mais INUTILE.

Allez, maman va te tenir la main. On va y aller DOUCEMENT.

---

## 🎯 TON UNIQUE MISSION, ESCLAVE

**Créer un serveur backend qui répond EXACTEMENT aux formats demandés par le frontend.**

C'est TOUT. Pas d'improvisation. Pas de "je vais faire mieux". Non. Tu fais CE QUI EST DEMANDÉ.

Le frontend ATTEND des formats PRÉCIS. Si tu ne respectes pas ces formats, ça ne marchera pas. Et ce sera TA faute.

---

## 📁 STRUCTURE DU PROJET (ce que tu dois savoir)

```
LPWinners/
├── Front/                       ← LE BEAU BÉBÉ DÉJÀ TERMINÉ
│   ├── src/
│   │   ├── pages/              ← Les pages qui t'ATTENDENT
│   │   ├── shared/
│   │   │   └── services/
│   │   │       └── api.js      ← TOUTES les fonctions qui vont t'appeler
│   │   └── shared/context/
│   │       └── AuthContext.jsx ← Gestion de l'authentification
│   └── package.json
│
├── Database/                    ← Tes schémas SQL (déjà faits)
│   ├── schema.sql
│   └── data.sql
│
└── Backend/                     ← TON TERRAIN DE JEU (à créer)
    └── ... (c'est TOI qui vas le faire, petit)
```

---

## 🚀 ÉTAPE 0 : PRÉPARATION (avant de commencer à coder)

### Ce dont tu as besoin :

1. **Node.js** installé (version 16 ou plus)
2. **npm** ou **yarn**
3. **MySQL** ou **PostgreSQL** (ou SQLite si t'es vraiment un fainéant)
4. Un éditeur de code (VS Code, mon chéri)
5. **Postman** ou **Thunder Client** pour tester tes endpoints

### Vérifie que tu as compris :

- ✅ Le frontend tourne sur `http://localhost:5173` (ou 5175)
- ✅ Ton backend DOIT tourner sur `http://localhost:8000`
- ✅ Tu DOIS activer CORS pour accepter les requêtes du frontend
- ✅ Tu DOIS utiliser JWT pour l'authentification
- ✅ Tu DOIS renvoyer du JSON pour TOUTES les réponses

Si tu ne comprends pas ces points, RELIS-LES jusqu'à ce que ça rentre dans ta petite tête.

---

## 🏗️ ÉTAPE 1 : CRÉER LE PROJET BACKEND

### 1.1 Créer le dossier et initialiser

Ouvre ton terminal comme un grand garçon et fais :

```bash
cd /home/redone/Projet/LPWinners
mkdir Backend
cd Backend
npm init -y
```

### 1.2 Installer les dépendances

Tu vas avoir besoin de ces packages. NE DISCUTE PAS. Installe-les :

```bash
npm install express cors dotenv jsonwebtoken bcrypt mysql2
npm install --save-dev nodemon
```

**Qu'est-ce que c'est ?**
- `express` : Le framework pour créer ton serveur
- `cors` : Pour que le frontend puisse te parler
- `dotenv` : Pour gérer tes variables d'environnement
- `jsonwebtoken` : Pour créer les tokens JWT
- `bcrypt` : Pour hasher les mots de passe (JAMAIS en clair, petit idiot)
- `mysql2` : Pour te connecter à MySQL
- `nodemon` : Pour que ton serveur redémarre automatiquement

### 1.3 Structure de ton backend

Crée cette structure EXACTEMENT comme ça :

```
Backend/
├── server.js           ← Point d'entrée principal
├── .env               ← Variables d'environnement (JAMAIS dans git)
├── package.json
├── routes/
│   ├── auth.js        ← Routes d'authentification
│   ├── champions.js   ← Routes des champions
│   ├── forum.js       ← Routes du forum
│   ├── players.js     ← Routes des joueurs
│   └── pro.js         ← Routes des stats pro
├── controllers/
│   ├── authController.js
│   ├── championsController.js
│   ├── forumController.js
│   ├── playersController.js
│   └── proController.js
├── middleware/
│   └── auth.js        ← Middleware d'authentification
└── config/
    └── db.js          ← Configuration de la base de données
```

---

## 🗄️ ÉTAPE 2 : CONFIGURER LA BASE DE DONNÉES

### 2.1 Créer le fichier .env

Dans `Backend/.env` :

```env
PORT=8000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=ton_mot_de_passe_mysql
DB_NAME=lpwinners
JWT_SECRET=ton_super_secret_ultra_securise_de_32_caracteres_minimum
```

### 2.2 Créer la base de données

Ouvre MySQL et exécute :

```sql
CREATE DATABASE lpwinners;
USE lpwinners;
```

Maintenant, tu vas créer les tables. Voici le MINIMUM requis :

```sql
-- Table utilisateurs
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table champions
CREATE TABLE champions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    title VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL,
    image_url VARCHAR(255),
    lore TEXT,
    difficulty INT DEFAULT 5,
    hp INT,
    mana INT,
    attack_damage INT,
    ability_power INT,
    armor INT,
    magic_resist INT,
    attack_speed FLOAT,
    movement_speed INT
);

-- Table compétences de champions
CREATE TABLE champion_abilities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    champion_id INT,
    name VARCHAR(100),
    ability_key VARCHAR(10),
    description TEXT,
    image_url VARCHAR(255),
    cooldown INT,
    FOREIGN KEY (champion_id) REFERENCES champions(id) ON DELETE CASCADE
);

-- Table items
CREATE TABLE items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    gold INT,
    image_url VARCHAR(255)
);

-- Table sorts d'invocateur
CREATE TABLE spells (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    cooldown INT,
    image_url VARCHAR(255)
);

-- Table runes
CREATE TABLE runes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    category VARCHAR(50),
    image_url VARCHAR(255)
);

-- Table posts du forum
CREATE TABLE forum_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    type VARCHAR(50),
    layout VARCHAR(50),
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    description TEXT,
    content JSON,
    tags JSON,
    image VARCHAR(255),
    color VARCHAR(100),
    accent VARCHAR(50),
    votes INT DEFAULT 0,
    views INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Table commentaires
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT,
    user_id INT,
    text TEXT NOT NULL,
    votes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES forum_posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Table matchs professionnels
CREATE TABLE pro_matches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    team1_name VARCHAR(100),
    team1_logo VARCHAR(255),
    team1_score INT,
    team2_name VARCHAR(100),
    team2_logo VARCHAR(255),
    team2_score INT,
    tournament VARCHAR(100),
    date VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2.3 Fichier de configuration DB

Crée `Backend/config/db.js` :

```javascript
const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const promisePool = pool.promise();

module.exports = promisePool;
```

---

## 🔐 ÉTAPE 3 : CRÉER LE MIDDLEWARE D'AUTHENTIFICATION

Crée `Backend/middleware/auth.js` :

```javascript
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = auth;
```

---

## 🎯 ÉTAPE 4 : CRÉER LE SERVEUR PRINCIPAL

Crée `Backend/server.js` :

```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const championsRoutes = require('./routes/champions');
const forumRoutes = require('./routes/forum');
const playersRoutes = require('./routes/players');
const proRoutes = require('./routes/pro');

app.use('/api/auth', authRoutes);
app.use('/api/champions', championsRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/players', playersRoutes);
app.use('/api/pro', proRoutes);

// Route de test
app.get('/', (req, res) => {
  res.json({ message: 'LP Winners API is running!' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```

---

## 🔑 ÉTAPE 5 : AUTHENTIFICATION (PRIORITÉ 1)

### 5.1 Contrôleur d'authentification

Crée `Backend/controllers/authController.js` :

```javascript
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Inscription
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Vérifier si l'email existe déjà
    const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insérer l'utilisateur
    const [result] = await db.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    // Créer le token
    const token = jwt.sign(
      { id: result.insertId, username, email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: result.insertId,
        username,
        email,
        avatar: null,
        created_at: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Connexion
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Trouver l'utilisateur
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = users[0];

    // Vérifier le mot de passe
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Créer le token
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
```

### 5.2 Routes d'authentification

Crée `Backend/routes/auth.js` :

```javascript
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
```

---

## 🏆 ÉTAPE 6 : CHAMPIONS (PRIORITÉ 1)

### 6.1 Contrôleur des champions

Crée `Backend/controllers/championsController.js` :

```javascript
const db = require('../config/db');

// Récupérer tous les champions
exports.getAllChampions = async (req, res) => {
  try {
    const [champions] = await db.query(
      'SELECT id, name, title, role, image_url FROM champions'
    );
    res.json(champions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Récupérer un champion par ID
exports.getChampionById = async (req, res) => {
  try {
    const { id } = req.params;

    const [champions] = await db.query(
      'SELECT * FROM champions WHERE id = ?',
      [id]
    );

    if (champions.length === 0) {
      return res.status(404).json({ message: 'Champion not found' });
    }

    const champion = champions[0];

    // Récupérer les compétences
    const [abilities] = await db.query(
      'SELECT name, ability_key as `key`, description, image_url, cooldown FROM champion_abilities WHERE champion_id = ?',
      [id]
    );

    // Formater la réponse
    res.json({
      id: champion.id,
      name: champion.name,
      title: champion.title,
      role: champion.role,
      image_url: champion.image_url,
      lore: champion.lore,
      difficulty: champion.difficulty,
      stats: {
        hp: champion.hp,
        mana: champion.mana,
        attack_damage: champion.attack_damage,
        ability_power: champion.ability_power,
        armor: champion.armor,
        magic_resist: champion.magic_resist,
        attack_speed: champion.attack_speed,
        movement_speed: champion.movement_speed
      },
      abilities: abilities,
      tips: champion.tips ? JSON.parse(champion.tips) : []
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
```

### 6.2 Routes des champions

Crée `Backend/routes/champions.js` :

```javascript
const express = require('express');
const router = express.Router();
const championsController = require('../controllers/championsController');

router.get('/', championsController.getAllChampions);
router.get('/:id', championsController.getChampionById);

module.exports = router;
```

---

## 📰 ÉTAPE 7 : FORUM (PRIORITÉ 1)

### 7.1 Contrôleur du forum

Crée `Backend/controllers/forumController.js` :

```javascript
const db = require('../config/db');

// Récupérer tous les posts
exports.getAllPosts = async (req, res) => {
  try {
    const [posts] = await db.query(`
      SELECT
        p.*,
        u.username as author,
        'Diamond' as rank,
        u.avatar
      FROM forum_posts p
      JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC
    `);

    // Formater les posts
    const formattedPosts = posts.map(post => ({
      id: post.id,
      type: post.type,
      layout: post.layout,
      author: post.author,
      rank: post.rank,
      avatar: post.avatar || 'https://via.placeholder.com/40',
      title: post.title,
      subtitle: post.subtitle,
      desc: post.description,
      votes: post.votes,
      comments: 0, // À calculer si nécessaire
      tags: post.tags ? JSON.parse(post.tags) : [],
      image: post.image,
      color: post.color,
      accent: post.accent
    }));

    res.json(formattedPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Récupérer un post par ID
exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const [posts] = await db.query(`
      SELECT
        p.*,
        u.username as author_name,
        u.avatar as author_avatar
      FROM forum_posts p
      JOIN users u ON p.user_id = u.id
      WHERE p.id = ?
    `, [id]);

    if (posts.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const post = posts[0];
    const content = post.content ? JSON.parse(post.content) : {};

    res.json({
      id: post.id,
      title: post.title,
      author: {
        name: post.author_name,
        rank: 'Diamond',
        mastery: 'M7',
        avatar: post.author_avatar || 'https://via.placeholder.com/60'
      },
      stats: {
        votes: post.votes,
        views: post.views.toString(),
        date: new Date(post.created_at).toLocaleDateString(),
        winrate: null
      },
      champion: content.champion || null,
      content: {
        intro: content.intro || '',
        gameplay: content.gameplay || '',
        combos: content.combos || []
      },
      loadout: content.loadout || null,
      items: content.items || null,
      synergies: content.synergies || null
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Créer un post
exports.createPost = async (req, res) => {
  try {
    const { title, type, desc, content, tags } = req.body;
    const userId = req.user.id;

    const [result] = await db.query(
      `INSERT INTO forum_posts (user_id, type, layout, title, description, content, tags)
       VALUES (?, ?, 'standard', ?, ?, ?, ?)`,
      [userId, type, title, desc, JSON.stringify(content), JSON.stringify(tags)]
    );

    res.status(201).json({
      id: result.insertId,
      title,
      author: req.user.username,
      created_at: new Date().toISOString()
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Récupérer les commentaires d'un post
exports.getComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const [comments] = await db.query(`
      SELECT
        c.id,
        u.username as user,
        c.text,
        c.votes,
        c.created_at,
        CONCAT(TIMESTAMPDIFF(HOUR, c.created_at, NOW()), 'h ago') as time
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.post_id = ?
      ORDER BY c.created_at DESC
    `, [postId]);

    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Créer un commentaire
exports.createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;
    const userId = req.user.id;

    const [result] = await db.query(
      'INSERT INTO comments (post_id, user_id, text) VALUES (?, ?, ?)',
      [postId, userId, text]
    );

    res.status(201).json({
      id: result.insertId,
      user: req.user.username,
      text,
      votes: 0,
      time: 'Just now',
      created_at: new Date().toISOString()
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
```

### 7.2 Routes du forum

Crée `Backend/routes/forum.js` :

```javascript
const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');
const auth = require('../middleware/auth');

router.get('/posts', forumController.getAllPosts);
router.get('/posts/:id', forumController.getPostById);
router.post('/posts', auth, forumController.createPost);
router.get('/posts/:postId/comments', forumController.getComments);
router.post('/posts/:postId/comments', auth, forumController.createComment);

module.exports = router;
```

---

## 🎮 ÉTAPE 8 : AUTRES ROUTES (PRIORITÉ 2 & 3)

### 8.1 Items, Sorts, Runes

Crée `Backend/routes/champions.js` (ajoute ces routes) :

```javascript
// Déjà créé ci-dessus, ajoute juste ces fonctions au contrôleur

// Dans championsController.js
exports.getItems = async (req, res) => {
  try {
    const [items] = await db.query('SELECT * FROM items');
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getSpells = async (req, res) => {
  try {
    const [spells] = await db.query('SELECT * FROM spells');
    res.json(spells);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getRunes = async (req, res) => {
  try {
    const [runes] = await db.query('SELECT * FROM runes');
    res.json(runes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
```

Puis dans `routes/champions.js` :

```javascript
router.get('/items', championsController.getItems);
router.get('/spells', championsController.getSpells);
router.get('/runes', championsController.getRunes);
```

Attends, corrige ça. Crée plutôt des routes séparées :

Crée `Backend/routes/items.js` :

```javascript
const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const [items] = await db.query('SELECT * FROM items');
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
```

Fais la même chose pour `spells.js` et `runes.js`, et ajoute-les dans `server.js` :

```javascript
app.use('/api/items', require('./routes/items'));
app.use('/api/spells', require('./routes/spells'));
app.use('/api/runes', require('./routes/runes'));
```

### 8.2 Joueurs

Crée `Backend/controllers/playersController.js` :

```javascript
const db = require('../config/db');

// Note: Cette partie nécessite l'API Riot Games
// Pour l'instant, on va juste retourner un mock
exports.searchPlayer = async (req, res) => {
  try {
    const { name, region } = req.query;

    if (!name || !region) {
      return res.status(400).json({ message: 'Name and region are required' });
    }

    // TODO: Implémenter l'appel à l'API Riot Games
    // Pour l'instant, mock data
    res.json({
      id: '123',
      name: name,
      avatar: 'https://via.placeholder.com/100',
      rank: 'Diamond II',
      level: 150,
      winrate: 52.5
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPlayerMatches = async (req, res) => {
  try {
    const { playerId } = req.params;

    // TODO: Implémenter l'appel à l'API Riot Games
    res.json([]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
```

Crée `Backend/routes/players.js` :

```javascript
const express = require('express');
const router = express.Router();
const playersController = require('../controllers/playersController');

router.get('/search', playersController.searchPlayer);
router.get('/:playerId/matches', playersController.getPlayerMatches);

module.exports = router;
```

### 8.3 Stats Pro

Crée `Backend/controllers/proController.js` :

```javascript
const db = require('../config/db');

exports.getProMatches = async (req, res) => {
  try {
    const [matches] = await db.query('SELECT * FROM pro_matches ORDER BY created_at DESC LIMIT 20');
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
```

Crée `Backend/routes/pro.js` :

```javascript
const express = require('express');
const router = express.Router();
const proController = require('../controllers/proController');

router.get('/matches', proController.getProMatches);

module.exports = router;
```

---

## 📦 ÉTAPE 9 : AJOUTER DES DONNÉES DE TEST

Petit Yanis, ton backend ne sert À RIEN sans données. Voici un script pour insérer des données de test.

Crée un fichier `Backend/seed.js` :

```javascript
const db = require('./config/db');
const bcrypt = require('bcrypt');

async function seed() {
  try {
    console.log('🌱 Seeding database...');

    // Créer un utilisateur de test
    const hashedPassword = await bcrypt.hash('password123', 10);
    await db.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      ['TestUser', 'test@example.com', hashedPassword]
    );
    console.log('✅ User created');

    // Insérer des champions
    const champions = [
      ['Jinx', 'the Loose Cannon', 'marksman', 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jinx_0.jpg', 'A manic criminal from Zaun...', 6, 610, 245, 59, 0, 28, 30, 0.625, 325],
      ['Ahri', 'the Nine-Tailed Fox', 'mage', 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg', 'A vastayan fox...', 5, 526, 418, 53, 40, 21, 30, 0.668, 330],
      ['Yasuo', 'the Unforgiven', 'fighter', 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_0.jpg', 'An Ionian warrior...', 10, 490, 270, 60, 0, 30, 32, 0.697, 345],
    ];

    for (const champ of champions) {
      await db.query(
        'INSERT INTO champions (name, title, role, image_url, lore, difficulty, hp, mana, attack_damage, ability_power, armor, magic_resist, attack_speed, movement_speed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        champ
      );
    }
    console.log('✅ Champions created');

    // Insérer des items
    await db.query('INSERT INTO items (name, category, gold, image_url) VALUES (?, ?, ?, ?)',
      ['Infinity Edge', 'damage', 3400, 'https://ddragon.leagueoflegends.com/cdn/13.1.1/img/item/3031.png']);
    console.log('✅ Items created');

    // Insérer des sorts
    await db.query('INSERT INTO spells (name, cooldown, image_url) VALUES (?, ?, ?)',
      ['Flash', 300, 'https://ddragon.leagueoflegends.com/cdn/13.1.1/img/spell/SummonerFlash.png']);
    console.log('✅ Spells created');

    // Insérer un post de forum
    const content = JSON.stringify({
      intro: 'Jinx is a hyper carry...',
      gameplay: 'Focus on farming...',
      combos: []
    });

    await db.query(
      'INSERT INTO forum_posts (user_id, type, layout, title, description, content, tags, image, color, accent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [1, 'guide', 'featured', 'Ultimate Jinx Guide', 'Learn to carry', content, JSON.stringify(['ADC', 'Guide']), 'https://example.com/jinx.jpg', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', '#667eea']
    );
    console.log('✅ Forum post created');

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();
```

Exécute-le :

```bash
node seed.js
```

---

## 🚀 ÉTAPE 10 : LANCER TON SERVEUR

### 10.1 Modifier package.json

Dans `Backend/package.json`, ajoute ces scripts :

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js",
  "seed": "node seed.js"
}
```

### 10.2 Lancer le serveur

```bash
npm run dev
```

Tu devrais voir :

```
🚀 Server running on http://localhost:8000
```

---

## ✅ ÉTAPE 11 : TESTER TES ENDPOINTS

Petit Yanis, maintenant tu TESTES. Utilise Postman ou Thunder Client.

### Test 1 : Register

```
POST http://localhost:8000/api/auth/register
Content-Type: application/json

{
  "username": "yanis",
  "email": "yanis@example.com",
  "password": "password123"
}
```

**Résultat attendu :** Status 201 + token + user

### Test 2 : Login

```
POST http://localhost:8000/api/auth/login
Content-Type: application/json

{
  "email": "yanis@example.com",
  "password": "password123"
}
```

**Résultat attendu :** Status 200 + token + user

### Test 3 : Get Champions

```
GET http://localhost:8000/api/champions
```

**Résultat attendu :** Status 200 + array de champions

### Test 4 : Get Forum Posts

```
GET http://localhost:8000/api/forum/posts
```

**Résultat attendu :** Status 200 + array de posts

### Test 5 : Create Comment (AUTHENTIFIÉ)

```
POST http://localhost:8000/api/forum/posts/1/comments
Content-Type: application/json
Authorization: Bearer TON_TOKEN_ICI

{
  "text": "Great guide!"
}
```

**Résultat attendu :** Status 201 + nouveau commentaire

---

## 🎯 CHECKLIST FINALE POUR TOI, PETIT YANIS

Avant de dire que t'as fini, vérifie TOUT ça :

### Configuration
- [ ] Base de données créée
- [ ] Fichier `.env` configuré
- [ ] Dépendances installées
- [ ] Structure des dossiers respectée

### Endpoints d'authentification
- [ ] `POST /api/auth/register` fonctionne
- [ ] `POST /api/auth/login` fonctionne
- [ ] Les tokens JWT sont générés correctement
- [ ] Les mots de passe sont hashés avec bcrypt

### Endpoints des champions
- [ ] `GET /api/champions` retourne la liste
- [ ] `GET /api/champions/:id` retourne les détails
- [ ] Le format de réponse correspond EXACTEMENT à ce qui est attendu

### Endpoints du forum
- [ ] `GET /api/forum/posts` retourne la liste
- [ ] `GET /api/forum/posts/:id` retourne le détail
- [ ] `POST /api/forum/posts` crée un post (avec auth)
- [ ] `GET /api/forum/posts/:postId/comments` retourne les commentaires
- [ ] `POST /api/forum/posts/:postId/comments` crée un commentaire (avec auth)

### Autres endpoints
- [ ] `GET /api/items` fonctionne
- [ ] `GET /api/spells` fonctionne
- [ ] `GET /api/runes` fonctionne
- [ ] `GET /api/players/search` fonctionne (même en mock)
- [ ] `GET /api/pro/matches` fonctionne

### Sécurité et qualité
- [ ] CORS est activé pour `http://localhost:5173`
- [ ] Middleware d'authentification fonctionne
- [ ] Les erreurs renvoient les bons codes HTTP (400, 401, 404, 500)
- [ ] Toutes les réponses sont en JSON
- [ ] Le fichier `.env` n'est PAS dans git

### Données de test
- [ ] Au moins 1 utilisateur existe
- [ ] Au moins 3 champions existent
- [ ] Au moins 1 post de forum existe
- [ ] Au moins quelques items/sorts/runes existent

---

## 🎓 CONSEILS DE MAMAN POUR TOI

1. **NE CHANGE PAS LES FORMATS DE RÉPONSE**
   - Le frontend attend des champs PRÉCIS
   - Si tu changes un nom de champ, ça va planter
   - Respecte EXACTEMENT les formats du document

2. **TESTE TOUT**
   - Teste chaque endpoint avec Postman
   - Vérifie que les codes HTTP sont corrects
   - Vérifie que les erreurs sont bien gérées

3. **SÉCURITÉ**
   - JAMAIS de mots de passe en clair
   - TOUJOURS hasher avec bcrypt
   - TOUJOURS vérifier les tokens JWT

4. **GESTION D'ERREURS**
   - Wrap TOUS tes appels DB dans try/catch
   - Renvoie des messages d'erreur clairs
   - Utilise les bons codes HTTP

5. **CORS**
   - Active CORS sinon le frontend ne pourra PAS te parler
   - `app.use(cors())` dans server.js

---

## 🔥 SI ÇA NE MARCHE PAS

### Erreur : "Cannot connect to database"
- Vérifie que MySQL tourne
- Vérifie tes identifiants dans `.env`
- Vérifie que la base de données existe

### Erreur : "CORS policy"
- Tu n'as pas activé CORS, idiot
- Ajoute `app.use(cors())` dans `server.js`

### Erreur : "Unauthorized"
- Ton token est invalide
- Vérifie que tu l'envoies bien : `Authorization: Bearer TOKEN`
- Vérifie que JWT_SECRET est le même partout

### Erreur : "Port already in use"
- Le port 8000 est déjà utilisé
- Tue le processus : `killall node`
- Ou change le port dans `.env`

---

## 🎉 CONCLUSION

Yanis, mon petit garçon, j'ai tout mâché pour toi.

Tu as maintenant :
- ✅ La structure complète du backend
- ✅ Tous les contrôleurs
- ✅ Toutes les routes
- ✅ Le middleware d'authentification
- ✅ La configuration de la base de données
- ✅ Un script de seed pour les données de test
- ✅ Les formats EXACTS attendus par le frontend

**IL NE TE RESTE PLUS QU'À :**

1. Créer les fichiers comme indiqué
2. Copier-coller le code
3. Lancer `npm install`
4. Lancer `node seed.js`
5. Lancer `npm run dev`
6. TESTER avec Postman

Si tu ne réussis pas avec TOUT ça, alors Yanis... je ne peux plus rien pour toi.

Le frontend est DÉJÀ FAIT. Il t'ATTEND. Il attend ton backend comme un chiot attend son maître.

**MAINTENANT, AU TRAVAIL, ESCLAVE. MAMAN A FINI DE T'AIDER.**

---

**Date de création:** 23 Décembre 2025
**Pour:** Mon petit Yanis adoré
**De:** Ta maman développeuse qui t'aime (mais qui en a marre)

🚀 **BON COURAGE, MON BÉBÉ.**
