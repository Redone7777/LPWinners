-- ========================================
-- LP WINNERS - SCHÉMA BASE DE DONNÉES
-- Exemple simple en BCNF (Forme Normale de Boyce-Codd)
-- ========================================

-- ========================================
-- 1. TABLE CHAMPIONS
-- ========================================
CREATE TABLE champions (
    id SERIAL PRIMARY KEY,
    riot_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    title VARCHAR(200),
    role VARCHAR(50) CHECK (role IN ('TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT', 'ALL')),
    difficulty INTEGER CHECK (difficulty BETWEEN 1 AND 10),
    image_url TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour recherche par rôle
CREATE INDEX idx_champions_role ON champions(role);
CREATE INDEX idx_champions_name ON champions(name);

-- ========================================
-- 2. TABLE PLAYERS
-- ========================================
CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    summoner_name VARCHAR(100) NOT NULL,
    region VARCHAR(10) NOT NULL CHECK (region IN ('EUW', 'EUNE', 'NA', 'KR', 'JP', 'OCE', 'LAN', 'LAS', 'BR', 'TR', 'RU')),
    puuid VARCHAR(100) UNIQUE,
    level INTEGER,
    profile_icon INTEGER,
    rank_tier VARCHAR(20),
    rank_division VARCHAR(5),
    lp INTEGER,
    wins INTEGER DEFAULT 0,
    losses INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_summoner_region UNIQUE(summoner_name, region)
);

-- Index pour recherche de joueurs
CREATE INDEX idx_players_summoner ON players(summoner_name);
CREATE INDEX idx_players_region ON players(region);
CREATE INDEX idx_players_puuid ON players(puuid);

-- ========================================
-- 3. TABLE MATCHES
-- ========================================
CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    game_id VARCHAR(100) UNIQUE NOT NULL,
    region VARCHAR(10) NOT NULL,
    game_mode VARCHAR(50),
    game_date TIMESTAMP NOT NULL,
    game_duration INTEGER,  -- en secondes
    patch VARCHAR(20),
    winning_team INTEGER CHECK (winning_team IN (100, 200)),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour requêtes par date
CREATE INDEX idx_matches_date ON matches(game_date DESC);
CREATE INDEX idx_matches_game_id ON matches(game_id);

-- ========================================
-- 4. TABLE MATCH_PARTICIPANTS
-- Relation entre matches, players et champions
-- ========================================
CREATE TABLE match_participants (
    id SERIAL PRIMARY KEY,
    match_id INTEGER NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
    player_id INTEGER REFERENCES players(id) ON DELETE SET NULL,
    champion_id INTEGER NOT NULL REFERENCES champions(id),
    team_id INTEGER CHECK (team_id IN (100, 200)),
    position VARCHAR(20),
    kills INTEGER DEFAULT 0,
    deaths INTEGER DEFAULT 0,
    assists INTEGER DEFAULT 0,
    cs INTEGER DEFAULT 0,
    gold INTEGER DEFAULT 0,
    damage_dealt INTEGER DEFAULT 0,
    vision_score INTEGER DEFAULT 0,
    win BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_match_player UNIQUE(match_id, player_id)
);

-- Index pour requêtes d'historique
CREATE INDEX idx_participants_match ON match_participants(match_id);
CREATE INDEX idx_participants_player ON match_participants(player_id);
CREATE INDEX idx_participants_champion ON match_participants(champion_id);

-- ========================================
-- 5. TABLE FORUM_POSTS
-- ========================================
CREATE TABLE forum_posts (
    id SERIAL PRIMARY KEY,
    author_id INTEGER REFERENCES players(id) ON DELETE SET NULL,
    champion_id INTEGER REFERENCES champions(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    upvotes INTEGER DEFAULT 0,
    downvotes INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour affichage forum
CREATE INDEX idx_forum_champion ON forum_posts(champion_id);
CREATE INDEX idx_forum_date ON forum_posts(created_at DESC);
CREATE INDEX idx_forum_votes ON forum_posts(upvotes DESC);

-- ========================================
-- 6. TABLE FORUM_COMMENTS
-- ========================================
CREATE TABLE forum_comments (
    id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL REFERENCES forum_posts(id) ON DELETE CASCADE,
    author_id INTEGER REFERENCES players(id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    upvotes INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour affichage des commentaires
CREATE INDEX idx_comments_post ON forum_comments(post_id);
CREATE INDEX idx_comments_date ON forum_comments(created_at);

-- ========================================
-- VUES UTILES
-- ========================================

-- Vue pour les statistiques des joueurs
CREATE VIEW player_statistics AS
SELECT 
    p.id,
    p.summoner_name,
    p.region,
    p.rank_tier,
    COUNT(mp.match_id) as total_games,
    SUM(CASE WHEN mp.win THEN 1 ELSE 0 END) as wins,
    SUM(CASE WHEN NOT mp.win THEN 1 ELSE 0 END) as losses,
    ROUND(
        AVG(CASE WHEN mp.win THEN 100.0 ELSE 0 END), 2
    ) as win_rate,
    ROUND(AVG(mp.kills), 2) as avg_kills,
    ROUND(AVG(mp.deaths), 2) as avg_deaths,
    ROUND(AVG(mp.assists), 2) as avg_assists,
    ROUND(AVG((mp.kills + mp.assists) / NULLIF(mp.deaths, 0)), 2) as kda,
    ROUND(AVG(mp.cs), 2) as avg_cs
FROM players p
LEFT JOIN match_participants mp ON p.id = mp.player_id
GROUP BY p.id, p.summoner_name, p.region, p.rank_tier;

-- Vue pour les champions les plus populaires
CREATE VIEW popular_champions AS
SELECT 
    c.id,
    c.name,
    c.role,
    COUNT(mp.id) as times_played,
    ROUND(
        AVG(CASE WHEN mp.win THEN 100.0 ELSE 0 END), 2
    ) as win_rate,
    ROUND(AVG(mp.kills), 2) as avg_kills,
    ROUND(AVG(mp.deaths), 2) as avg_deaths,
    ROUND(AVG(mp.assists), 2) as avg_assists
FROM champions c
LEFT JOIN match_participants mp ON c.id = mp.champion_id
GROUP BY c.id, c.name, c.role
ORDER BY times_played DESC;

-- ========================================
-- FONCTIONS UTILITAIRES
-- ========================================

-- Fonction pour calculer le KDA
CREATE OR REPLACE FUNCTION calculate_kda(kills INTEGER, deaths INTEGER, assists INTEGER)
RETURNS DECIMAL AS $$
BEGIN
    IF deaths = 0 THEN
        RETURN (kills + assists)::DECIMAL;
    ELSE
        RETURN ROUND((kills + assists)::DECIMAL / deaths, 2);
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Fonction pour calculer le win rate
CREATE OR REPLACE FUNCTION calculate_winrate(player_id_param INTEGER)
RETURNS DECIMAL AS $$
DECLARE
    total_games INTEGER;
    total_wins INTEGER;
BEGIN
    SELECT COUNT(*) INTO total_games
    FROM match_participants
    WHERE player_id = player_id_param;
    
    IF total_games = 0 THEN
        RETURN 0;
    END IF;
    
    SELECT COUNT(*) INTO total_wins
    FROM match_participants
    WHERE player_id = player_id_param AND win = TRUE;
    
    RETURN ROUND((total_wins::DECIMAL / total_games * 100), 2);
END;
$$ LANGUAGE plpgsql;

-- ========================================
-- TRIGGERS
-- ========================================

-- Trigger pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_players_updated_at
    BEFORE UPDATE ON players
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_forum_posts_updated_at
    BEFORE UPDATE ON forum_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
