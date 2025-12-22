-- CREATE DATABASE lpwinners;
-- USE lpwinners;

CREATE TABLE champion (
    -- Info général
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, -- utiliser pour identifier le champion dans la base de données
    riot_id VARCHAR(50) UNIQUE NOT NULL,
    riot_key INT NOT NULL,
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
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, -- utiliser pour identifier le skin dans la base de données
    champion_id INT REFERENCES champion(id) ON DELETE CASCADE, -- foreign key pour identifier le champion
    
    riot_skin_id VARCHAR(20) NOT NULL,
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