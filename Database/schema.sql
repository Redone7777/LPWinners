-- CREATE DATABASE lpwinners;
-- USE lpwinners;

DROP TABLE IF EXISTS utilisateurs, summoner, rune, rune_root, item, spell, skin, champion CASCADE;

CREATE TABLE champion (
    -- Info général
    id INT PRIMARY KEY,
    riot_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(50) NOT NULL,
    title VARCHAR(100),

    -- Lore
    lore TEXT,
    blurb TEXT,
    allytips JSONB,
    enemytips JSONB,

    -- Image
    image_icone VARCHAR(100),

    tags VARCHAR(50)[],
    partype VARCHAR(50),

    -- Stat (Base)
    attack INT,
    defense INT,
    magic INT,
    difficulty INT,

    -- Stat
    hp FLOAT,
    hpperlevel FLOAT,
    mp FLOAT,
    mpperlevel FLOAT,
    movespeed FLOAT,
    armor FLOAT,
    armorperlevel FLOAT,
    spellblock FLOAT,
    spellblockperlevel FLOAT,
    attackrange FLOAT,
    hpregen FLOAT,
    hpregenperlevel FLOAT,
    mpregen FLOAT,
    mpregenperlevel FLOAT,
    crit FLOAT,
    critperlevel FLOAT,
    attackdamage FLOAT,
    attackdamageperlevel FLOAT,
    attackspeedperlevel FLOAT,
    attackspeed FLOAT,

    passive JSONB
);

CREATE TABLE skin (
    id INT PRIMARY KEY, -- utiliser pour identifier le skin dans la base de données
    champion_id INT REFERENCES champion(id) ON DELETE CASCADE, -- foreign key pour identifier le champion
    
    num INT,
    name VARCHAR(150),
    chromas BOOLEAN DEFAULT FALSE,

    image_splash VARCHAR(100),
    image_tile VARCHAR(100)
);

CREATE TABLE spell (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    champion_id INT REFERENCES champion(id) ON DELETE CASCADE,

    riot_spell_id VARCHAR(50),
    name VARCHAR(100),
    description TEXT,

    cooldown FLOAT[],
    cooldownBurn VARCHAR(50),
    cost FLOAT[],
    costBurn VARCHAR(50),
    range FLOAT[],
    rangeBurn VARCHAR(50),

    effect JSONB,

    image_spell VARCHAR(100)
);

CREATE TABLE item (
    id INT PRIMARY KEY,
    name VARCHAR(200),
    description TEXT,
    plaintext TEXT,
    from_items VARCHAR(50)[],
    into_items VARCHAR(50)[],

    depth INT, -- Pour les recettes par exemple zonya depth = 3
    in_store BOOLEAN DEFAULT TRUE,

    image_icon VARCHAR(100),

    cost_base INT,
    cost_total INT,
    purchasable BOOLEAN DEFAULT TRUE,
    sell_price INT,

    tags VARCHAR(50)[],
    maps JSONB,
    stats JSONB,
    effect JSONB
);


CREATE TABLE rune_root (
    rune_root_id INT PRIMARY KEY,
    rune_root_key VARCHAR(50),
    image_icon VARCHAR(100),
    name VARCHAR(50)
);

CREATE TABLE rune (
    rune_id INT PRIMARY KEY,
    rune_root_id INT REFERENCES rune_root(rune_root_id) ON DELETE CASCADE,

    slot_number INT,
    runes_mineur_key VARCHAR(50),
    image_icon VARCHAR(100),
    name VARCHAR(50),
    shortDesc TEXT,
    longDesc TEXT
);

CREATE TABLE summoner (
    id INT PRIMARY KEY,
    riot_key VARCHAR(50),
    name VARCHAR(50),
    description TEXT,
    cooldown INT,
    summoner_level INT,
    range INT,
    image_icon VARCHAR(100),
    modes VARCHAR(50)[]
);

CREATE TABLE utilisateurs (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    pseudo VARCHAR(50) UNIQUE NOT NULL,
    mail VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL
);

-- Forum posts table
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES utilisateurs(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    category VARCHAR(50),
    champion_id INT REFERENCES champion(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_category ON posts(category);