# 🗄️ Jimmy - Tâches Database

## 👤 Rôle
**Database Administrator** - Conception et gestion de la base de données

---

## 📅 Planning détaillé

### Phase 1 : Conception & Implémentation

#### Analyse & Conception
- [ ] Analyser les besoins du projet
- [ ] Identifier toutes les entités nécessaires :
  - Champions
  - Players (Joueurs)
  - Matches (Parties)
  - Match Participants
  - Items, Runes, Spells
  - Forum Posts
  - Comments
  - Builds
  - Pro Players
  - Teams
- [ ] Créer le schéma entité-association (MCD)
- [ ] Identifier les dépendances fonctionnelles

#### Normalisation BCNF
- [ ] Normaliser le schéma en 1NF (Première Forme Normale)
- [ ] Normaliser en 2NF (Deuxième Forme Normale)
- [ ] Normaliser en 3NF (Troisième Forme Normale)
- [ ] Vérifier et atteindre BCNF (Forme Normale de Boyce-Codd)
- [ ] Documenter chaque étape de normalisation
- [ ] Créer le schéma relationnel final
- [ ] Définir toutes les clés primaires et étrangères
- [ ] Définir les contraintes d'intégrité

#### Création de la BDD
- [ ] Choisir le SGBD : PostgreSQL (recommandé) ou MySQL
- [ ] Installer et configurer le SGBD
- [ ] Créer la base de données `lpwinners`
- [ ] Créer tous les scripts SQL de création :
  ```sql
  -- Champions
  CREATE TABLE champions (
      id SERIAL PRIMARY KEY,
      riot_id VARCHAR(50) UNIQUE NOT NULL,
      name VARCHAR(100) NOT NULL,
      title VARCHAR(200),
      role VARCHAR(50),
      difficulty INTEGER CHECK (difficulty BETWEEN 1 AND 10),
      image_url TEXT,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  
  -- Players
  CREATE TABLE players (
      id SERIAL PRIMARY KEY,
      summoner_name VARCHAR(100) NOT NULL,
      region VARCHAR(10) NOT NULL,
      puuid VARCHAR(100) UNIQUE,
      level INTEGER,
      profile_icon INTEGER,
      rank VARCHAR(50),
      tier VARCHAR(50),
      lp INTEGER,
      wins INTEGER,
      losses INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(summoner_name, region)
  );
  
  -- Matches
  -- Forum
  -- etc.
  ```
- [ ] Exécuter les scripts de création
- [ ] Vérifier la structure avec des commandes SQL

#### Données de test & Index
- [ ] Créer un script d'insertion de données de test :
  - Au moins 20 champions
  - 50 joueurs fictifs
  - 100 matchs
  - 20 posts forum
  - Builds associés
- [ ] Créer les index pour optimiser les requêtes :
  ```sql
  CREATE INDEX idx_champions_role ON champions(role);
  CREATE INDEX idx_players_summoner ON players(summoner_name);
  CREATE INDEX idx_players_region ON players(region);
  CREATE INDEX idx_matches_date ON matches(game_date);
  CREATE INDEX idx_forum_champion ON forum_posts(champion_id);
  ```
- [ ] Tester les performances des requêtes
- [ ] Donner accès à Yanis (credentials, host, port)

#### Intégration Backend
- [ ] Session de travail avec Yanis
- [ ] Vérifier que tous les modèles SQLAlchemy correspondent
- [ ] Ajuster le schéma si nécessaire
- [ ] Créer des vues SQL pour requêtes complexes :
  ```sql
  -- Vue pour statistiques joueur
  CREATE VIEW player_stats AS
  SELECT p.id, p.summoner_name, 
         COUNT(mp.match_id) as games_played,
         AVG(mp.kills) as avg_kills,
         AVG(mp.deaths) as avg_deaths,
         AVG(mp.assists) as avg_assists
  FROM players p
  LEFT JOIN match_participants mp ON p.id = mp.player_id
  GROUP BY p.id, p.summoner_name;
  ```
- [ ] Tester les requêtes depuis le backend

---

### Phase 2 : Optimisation & Maintenance

#### Procédures stockées & Triggers
- [ ] Créer des procédures stockées pour opérations complexes :
  ```sql
  -- Procédure pour calculer le win rate
  CREATE OR REPLACE FUNCTION calculate_winrate(player_id_param INTEGER)
  RETURNS DECIMAL AS $$
  DECLARE
      total_games INTEGER;
      total_wins INTEGER;
  BEGIN
      SELECT COUNT(*) INTO total_games
      FROM match_participants
      WHERE player_id = player_id_param;
      
      SELECT COUNT(*) INTO total_wins
      FROM match_participants mp
      JOIN matches m ON mp.match_id = m.id
      WHERE mp.player_id = player_id_param
        AND mp.team_id = m.winning_team;
      
      RETURN (total_wins::DECIMAL / total_games * 100);
  END;
  $$ LANGUAGE plpgsql;
  ```
- [ ] Créer des triggers pour :
  - Mise à jour automatique des timestamps
  - Validation de données
  - Logs d'audit
- [ ] Tester toutes les procédures

#### Données réelles
- [ ] Récupérer des vraies données (avec Yanis) :
  - Champions depuis Data Dragon
  - Quelques matchs depuis API Riot
  - Items et runes
- [ ] Importer les données réelles
- [ ] Nettoyer et formater les données
- [ ] Vérifier l'intégrité des données

#### Optimisation & Backup
- [ ] Analyser les requêtes lentes (EXPLAIN ANALYZE)
- [ ] Optimiser les requêtes problématiques
- [ ] Ajouter des index supplémentaires si nécessaire
- [ ] Mettre en place système de backup :
  ```bash
  # Script de backup automatique
  pg_dump -U username -d lpwinners > backup_$(date +%Y%m%d).sql
  ```
- [ ] Tester la restauration depuis backup
- [ ] Documenter la procédure de backup/restore

#### Tests & Documentation
- [ ] Tests d'intégrité :
  - Toutes les contraintes fonctionnent
  - Pas de données orphelines
  - Clés étrangères valides
- [ ] Tests de performance :
  - Mesurer temps de réponse des requêtes
  - Vérifier avec volume de données important
- [ ] Documentation complète :
  - Schéma relationnel détaillé
  - Dictionnaire de données
  - Explication de la normalisation BCNF
  - Guide d'utilisation
  - Requêtes SQL utiles

#### Déploiement & Finitions
- [ ] Migration vers base de données de production :
  - PostgreSQL sur Render/Railway/Supabase
  - Ou MySQL sur PlanetScale
- [ ] Configurer les accès distants
- [ ] Exécuter scripts de création en production
- [ ] Importer les données
- [ ] Vérifier la connexion depuis le backend déployé
- [ ] Tests finaux
- [ ] Préparation de la présentation (schéma, métriques)

---

## 🗂️ Schéma de Base de Données (BCNF)

### Tables principales

#### 1. Champions
```sql
CREATE TABLE champions (
    id SERIAL PRIMARY KEY,
    riot_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    title VARCHAR(200),
    role VARCHAR(50),  -- TOP, JUNGLE, MID, ADC, SUPPORT
    difficulty INTEGER CHECK (difficulty BETWEEN 1 AND 10),
    image_url TEXT,
    splash_url TEXT,
    description TEXT,
    lore TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 2. Players
```sql
CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    summoner_name VARCHAR(100) NOT NULL,
    region VARCHAR(10) NOT NULL,
    puuid VARCHAR(100) UNIQUE,
    summoner_id VARCHAR(100),
    account_id VARCHAR(100),
    level INTEGER,
    profile_icon INTEGER,
    rank VARCHAR(50),
    tier VARCHAR(50),
    division VARCHAR(10),
    lp INTEGER,
    wins INTEGER DEFAULT 0,
    losses INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(summoner_name, region)
);
```

#### 3. Matches
```sql
CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    game_id VARCHAR(100) UNIQUE NOT NULL,
    region VARCHAR(10),
    game_mode VARCHAR(50),
    game_type VARCHAR(50),
    game_date TIMESTAMP NOT NULL,
    game_duration INTEGER,  -- en secondes
    patch VARCHAR(20),
    winning_team INTEGER CHECK (winning_team IN (100, 200)),
    is_pro_match BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 4. Match_Participants
```sql
CREATE TABLE match_participants (
    id SERIAL PRIMARY KEY,
    match_id INTEGER REFERENCES matches(id) ON DELETE CASCADE,
    player_id INTEGER REFERENCES players(id),
    champion_id INTEGER REFERENCES champions(id),
    team_id INTEGER CHECK (team_id IN (100, 200)),
    role VARCHAR(50),
    kills INTEGER DEFAULT 0,
    deaths INTEGER DEFAULT 0,
    assists INTEGER DEFAULT 0,
    cs INTEGER DEFAULT 0,  -- Creep Score
    gold INTEGER DEFAULT 0,
    damage_dealt INTEGER DEFAULT 0,
    damage_taken INTEGER DEFAULT 0,
    vision_score INTEGER DEFAULT 0,
    items JSONB,  -- Array d'IDs d'items
    runes JSONB,  -- Configuration runes
    summoner_spells JSONB,  -- 2 sorts d'invocateur
    win BOOLEAN,
    UNIQUE(match_id, player_id)
);
```

#### 5. Items
```sql
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    riot_id INTEGER UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    gold_cost INTEGER,
    image_url TEXT,
    stats JSONB,  -- Stats que l'item donne
    tags TEXT[],  -- Damage, Tank, Support, etc.
    buildable BOOLEAN DEFAULT TRUE
);
```

#### 6. Runes
```sql
CREATE TABLE runes (
    id SERIAL PRIMARY KEY,
    riot_id INTEGER UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    tree VARCHAR(50),  -- Precision, Domination, etc.
    slot INTEGER,  -- Position dans l'arbre
    description TEXT,
    image_url TEXT
);
```

#### 7. Forum_Posts
```sql
CREATE TABLE forum_posts (
    id SERIAL PRIMARY KEY,
    author_id INTEGER REFERENCES players(id),
    champion_id INTEGER REFERENCES champions(id),
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    build_items JSONB,  -- Array d'items
    build_runes JSONB,  -- Configuration runes
    upvotes INTEGER DEFAULT 0,
    downvotes INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 8. Forum_Comments
```sql
CREATE TABLE forum_comments (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES forum_posts(id) ON DELETE CASCADE,
    author_id INTEGER REFERENCES players(id),
    content TEXT NOT NULL,
    upvotes INTEGER DEFAULT 0,
    downvotes INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 9. Builds
```sql
CREATE TABLE builds (
    id SERIAL PRIMARY KEY,
    champion_id INTEGER REFERENCES champions(id),
    creator_id INTEGER REFERENCES players(id),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    items JSONB NOT NULL,  -- Ordre des items
    runes JSONB NOT NULL,
    summoner_spells JSONB,
    skill_order VARCHAR(50),  -- Ex: "Q>E>W"
    role VARCHAR(50),
    upvotes INTEGER DEFAULT 0,
    games_played INTEGER DEFAULT 0,
    win_rate DECIMAL(5,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 10. Pro_Players
```sql
CREATE TABLE pro_players (
    id SERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES players(id),
    team_id INTEGER REFERENCES pro_teams(id),
    in_game_name VARCHAR(100) NOT NULL,
    real_name VARCHAR(200),
    country VARCHAR(100),
    role VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 11. Pro_Teams
```sql
CREATE TABLE pro_teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    short_name VARCHAR(10),
    region VARCHAR(50),
    logo_url TEXT,
    website VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📊 Normalisation BCNF - Documentation

### Étapes de normalisation

#### 1NF (Première Forme Normale)
- ✅ Élimination des groupes répétitifs
- ✅ Chaque attribut contient une valeur atomique
- ✅ Exemple : `items` stocké en JSONB au lieu de colonnes item1, item2, etc.

#### 2NF (Deuxième Forme Normale)
- ✅ Déjà en 1NF
- ✅ Tous les attributs non-clés dépendent de la totalité de la clé primaire
- ✅ Pas de dépendances partielles

#### 3NF (Troisième Forme Normale)
- ✅ Déjà en 2NF
- ✅ Aucune dépendance transitive
- ✅ Séparation des entités (Players, Champions, Matches séparés)

#### BCNF (Forme Normale de Boyce-Codd)
- ✅ Déjà en 3NF
- ✅ Pour chaque dépendance fonctionnelle X → Y, X est une super-clé
- ✅ Exemple : Match_Participants utilise une clé composite (match_id, player_id)

---

## 🎯 Checklist finale

### Schéma
- [ ] Toutes les tables créées
- [ ] Toutes les relations définies (clés étrangères)
- [ ] Contraintes d'intégrité en place
- [ ] Index sur colonnes recherchées
- [ ] Documentation BCNF complète

### Données
- [ ] Données de test insérées
- [ ] Données réelles importées
- [ ] Intégrité vérifiée (pas d'orphelins)
- [ ] Volume suffisant pour tester performance

### Performance
- [ ] Requêtes optimisées
- [ ] Index appropriés
- [ ] Vues pour requêtes complexes
- [ ] Procédures stockées testées

### Production
- [ ] Base déployée en ligne
- [ ] Accès configurés
- [ ] Backup automatisé
- [ ] Tests de connexion OK

---

## 📞 Communication avec l'équipe

### Livrables pour l'équipe
- Schéma finalisé + credentials DB
- Données de test disponibles
- Session d'intégration avec Yanis
- Base production prête

### Points de synchro
- Session quotidienne avec Yanis (backend)
- Validation du schéma avec toute l'équipe

---

## 💡 Conseils

1. **BCNF avant tout** : Bien normaliser dès le début évite les problèmes
2. **PostgreSQL > MySQL** : JSONB, performances, fonctionnalités avancées
3. **Index stratégiques** : Sur les colonnes de recherche/jointure
4. **Données de test** : Essentielles pour que l'équipe puisse travailler
5. **Documentation** : Schéma clair = équipe efficace
6. **Backup quotidien** : Ne jamais perdre de données

## 🚀 Commandes utiles

```bash
# PostgreSQL
createdb lpwinners
psql -U username -d lpwinners -f schema.sql
psql -U username -d lpwinners -f seed_data.sql

# Backup
pg_dump lpwinners > backup.sql

# Restore
psql lpwinners < backup.sql

# Se connecter
psql -U username -d lpwinners
```

## 📖 Ressources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Normalisation BCNF](https://fr.wikipedia.org/wiki/Forme_normale_de_Boyce-Codd)
- [Riot Data Dragon](https://developer.riotgames.com/docs/lol#data-dragon)

---

**La base solide, c'est toi ! 💪**
