# 🗄️ Database - LP Winners

Base de données PostgreSQL normalisée en BCNF pour le projet LP Winners.

---

## 📁 Structure

```
Database/
├── schemas/
│   └── schema.sql           # Schéma complet de la BDD
├── scripts/
│   └── seed_data.sql        # Données de test
├── examples/
│   └── BCNF_EXAMPLE.md      # Documentation de la normalisation
└── README.md                # Ce fichier
```

---

## 🚀 Installation rapide

### 1. Installer PostgreSQL

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# macOS (avec Homebrew)
brew install postgresql
brew services start postgresql

# Vérifier l'installation
psql --version
```

### 2. Créer la base de données

```bash
# Se connecter à PostgreSQL
sudo -u postgres psql

# Créer la base
CREATE DATABASE lpwinners;

# Créer un utilisateur (optionnel)
CREATE USER lpwinnersuser WITH PASSWORD 'votre_mot_de_passe';
GRANT ALL PRIVILEGES ON DATABASE lpwinners TO lpwinnersuser;

# Quitter
\q
```

### 3. Exécuter les scripts

```bash
# Créer les tables
psql -U postgres -d lpwinners -f schemas/schema.sql

# Insérer les données de test
psql -U postgres -d lpwinners -f scripts/seed_data.sql
```

---

## 📊 Schéma de la base

### Tables principales

1. **champions** - Liste des champions League of Legends
2. **players** - Comptes joueurs
3. **matches** - Parties jouées
4. **match_participants** - Participation des joueurs aux matchs
5. **forum_posts** - Posts du forum
6. **forum_comments** - Commentaires sur les posts

### Relations

```
champions ─┐
           ├──→ match_participants ───→ matches
players ───┘

players ───→ forum_posts ───→ forum_comments
champions ─→ forum_posts
```

---

## 🔍 Requêtes utiles

### Statistiques d'un joueur

```sql
SELECT * FROM player_statistics 
WHERE summoner_name = 'Faker';
```

### Champions les plus populaires

```sql
SELECT * FROM popular_champions 
ORDER BY times_played DESC 
LIMIT 10;
```

### Historique de matchs d'un joueur

```sql
SELECT 
    m.game_date,
    c.name as champion,
    mp.kills,
    mp.deaths,
    mp.assists,
    mp.win
FROM match_participants mp
JOIN matches m ON mp.match_id = m.id
JOIN champions c ON mp.champion_id = c.id
WHERE mp.player_id = 1
ORDER BY m.game_date DESC;
```

### Posts forum par champion

```sql
SELECT 
    fp.title,
    p.summoner_name as author,
    fp.upvotes,
    fp.views,
    fp.created_at
FROM forum_posts fp
JOIN players p ON fp.author_id = p.id
WHERE fp.champion_id = 16  -- Yasuo
ORDER BY fp.upvotes DESC;
```

---

## 🎯 Normalisation BCNF

La base de données est entièrement normalisée en **Forme Normale de Boyce-Codd (BCNF)**.

### Avantages :
- ✅ Aucune redondance de données
- ✅ Intégrité référentielle garantie
- ✅ Mises à jour cohérentes
- ✅ Performance optimisée avec index

Voir [BCNF_EXAMPLE.md](examples/BCNF_EXAMPLE.md) pour les détails complets.

---

## 📝 Variables d'environnement

Pour le backend, créer un fichier `.env` :

```env
DATABASE_URL=postgresql://username:password@localhost:5432/lpwinners
```

Ou pour SQLAlchemy :

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lpwinners
DB_USER=username
DB_PASSWORD=password
```

---

## 🔧 Commandes utiles

```bash
# Se connecter à la base
psql -U postgres -d lpwinners

# Lister les tables
\dt

# Décrire une table
\d champions

# Voir les données
SELECT * FROM champions LIMIT 5;

# Backup
pg_dump -U postgres lpwinners > backup.sql

# Restore
psql -U postgres lpwinners < backup.sql

# Drop et recréer
dropdb lpwinners
createdb lpwinners
```

---

## 🌐 Hébergement production

### Options recommandées :

1. **Supabase** (PostgreSQL gratuit)
   - https://supabase.com
   - Interface web
   - API auto-générée

2. **Render** (PostgreSQL gratuit)
   - https://render.com
   - Facile à déployer
   - Bon plan gratuit

3. **Railway** (PostgreSQL)
   - https://railway.app
   - $5/mois
   - Excellent pour dev

4. **Neon** (Serverless PostgreSQL)
   - https://neon.tech
   - Plan gratuit généreux

---

## 📚 Documentation

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Guide de normalisation BCNF](examples/BCNF_EXAMPLE.md)
- [SQLAlchemy ORM](https://docs.sqlalchemy.org/)

---

## 🧪 Tests

Vérifier que tout fonctionne :

```sql
-- Compter les enregistrements
SELECT 
    'Champions' as table_name, COUNT(*) as count FROM champions
UNION ALL
SELECT 'Players', COUNT(*) FROM players
UNION ALL
SELECT 'Matches', COUNT(*) FROM matches
UNION ALL
SELECT 'Participants', COUNT(*) FROM match_participants
UNION ALL
SELECT 'Forum Posts', COUNT(*) FROM forum_posts;

-- Vérifier les relations
SELECT 
    mp.id,
    p.summoner_name,
    c.name as champion,
    m.game_id
FROM match_participants mp
JOIN players p ON mp.player_id = p.id
JOIN champions c ON mp.champion_id = c.id
JOIN matches m ON mp.match_id = m.id
LIMIT 5;
```

---

**Database par Jimmy 💾**
