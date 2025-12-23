import json
import os

# --- CONFIGURATION DES FICHIERS JSON ---
# ATTENTION : On utilise maintenant championFull.json pour avoir le lore et les tips !
CHAMPION_JSON = '/home/jd/L3/database/caca/dragontail-15.23.1/15.23.1/data/fr_FR/championFull.json' 
ITEM_JSON = '/home/jd/L3/database/caca/dragontail-15.23.1/15.23.1/data/fr_FR/item.json'
RUNE_JSON = '/home/jd/L3/database/caca/dragontail-15.23.1/15.23.1/data/fr_FR/runesReforged.json'
SUMMONER_JSON = '/home/jd/L3/database/caca/dragontail-15.23.1/15.23.1/data/fr_FR/summoner.json'

# --- FONCTIONS UTILITAIRES ---
def clean(txt):
    """Échappe les apostrophes pour le SQL."""
    if txt is None: return ""
    return str(txt).replace("'", "''")

def to_sql_array(data_list):
    """Transforme une liste Python en format tableau PostgreSQL {a,b}."""
    if not data_list: return "{}"
    cleaned_items = [f'"{str(i)}"' for i in data_list]
    return "{" + ",".join(cleaned_items) + "}"

def to_float_array(data_list):
    """Transforme une liste de nombres en format tableau PostgreSQL {1.0,2.0}."""
    if not data_list: return "{}"
    return "{" + ",".join([str(f) for f in data_list]) + "}"

# --- DÉBUT DU SCRIPT SQL ---
print("BEGIN;")

# On vide les tables
print('TRUNCATE champion, spell, skin, item, rune_root, rune, summoner, utilisateurs RESTART IDENTITY CASCADE;')

# ---------------------------------------------------------
# 1. CHAMPIONS, SKINS & SPELLS (Depuis championFull.json)
# ---------------------------------------------------------
try:
    if not os.path.exists(CHAMPION_JSON):
        # Fallback au cas où l'utilisateur n'a que champion.json, mais on le prévient
        print(f"-- ATTENTION: {CHAMPION_JSON} introuvable, tentative avec champion.json (données partielles)...")
        CHAMPION_JSON = 'champion.json'

    with open(CHAMPION_JSON, 'r', encoding='utf-8') as f:
        champs = json.load(f)['data']

    for name, info in champs.items():
        champ_id = int(info['key']) 
        stats = info.get('stats', {})
        
        # INSERT CHAMPION
        # Note : lore, tips et passive seront maintenant bien remplis grâce à championFull.json
        print(f"""INSERT INTO champion (
            id, riot_id, name, title, lore, blurb, allytips, enemytips, image_icone, tags, partype,
            attack, defense, magic, difficulty,
            hp, hpperlevel, mp, mpperlevel, movespeed, armor, armorperlevel,
            spellblock, spellblockperlevel, attackrange, hpregen, hpregenperlevel,
            mpregen, mpregenperlevel, crit, critperlevel, attackdamage, attackdamageperlevel,
            attackspeedperlevel, attackspeed, passive
        ) VALUES (
            {champ_id}, '{clean(info['id'])}', '{clean(info['name'])}', '{clean(info['title'])}', 
            '{clean(info.get('lore', ''))}', '{clean(info['blurb'])}', 
            '{json.dumps(info.get('allytips', [])).replace("'", "''")}', 
            '{json.dumps(info.get('enemytips', [])).replace("'", "''")}', 
            '{info['image']['full']}', '{to_sql_array(info.get('tags'))}', '{clean(info['partype'])}',
            {info['info']['attack']}, {info['info']['defense']}, {info['info']['magic']}, {info['info']['difficulty']},
            {stats['hp']}, {stats['hpperlevel']}, {stats['mp']}, {stats['mpperlevel']}, {stats['movespeed']},
            {stats['armor']}, {stats['armorperlevel']}, {stats['spellblock']}, {stats['spellblockperlevel']},
            {stats['attackrange']}, {stats['hpregen']}, {stats['hpregenperlevel']}, {stats['mpregen']},
            {stats['mpregenperlevel']}, {stats['crit']}, {stats['critperlevel']}, {stats['attackdamage']},
            {stats['attackdamageperlevel']}, {stats['attackspeedperlevel']}, {stats['attackspeed']},
            '{json.dumps(info.get('passive', {})).replace("'", "''")}'
        );""")

        # INSERT SKINS
        for skin in info.get('skins', []):
            print(f"""INSERT INTO skin (id, champion_id, num, name, chromas, image_splash, image_tile) 
            VALUES ({int(skin['id'])}, {champ_id}, {skin['num']}, '{clean(skin['name'])}', {str(skin['chromas']).lower()}, 'splash_{skin['num']}.jpg', 'tile_{skin['num']}.jpg');""")

        # INSERT SPELLS
        for s in info.get('spells', []):
            print(f"""INSERT INTO spell (champion_id, riot_spell_id, name, description, cooldown, cooldownBurn, cost, costBurn, range, rangeBurn, effect, image_spell) 
            VALUES (
                {champ_id}, '{s['id']}', '{clean(s['name'])}', '{clean(s['description'])}', 
                '{to_float_array(s.get('cooldown'))}', '{clean(s.get('cooldownBurn'))}', 
                '{to_float_array(s.get('cost'))}', '{clean(s.get('costBurn'))}', 
                '{to_float_array(s.get('range'))}', '{clean(s.get('rangeBurn'))}', 
                '{json.dumps(s.get('effect', [])).replace("'", "''")}', '{s['image']['full']}'
            );""")
except FileNotFoundError:
    print(f"-- ERREUR CRITIQUE: Ni championFull.json ni champion.json n'ont été trouvés --")

# ---------------------------------------------------------
# 2. ITEMS
# ---------------------------------------------------------
try:
    with open(ITEM_JSON, 'r', encoding='utf-8') as f:
        items_dict = json.load(f)['data']

    for iid, info in items_dict.items():
        gold = info.get('gold', {})
        maps_json = json.dumps(info.get('maps', {})).replace("'", "''")
        stats_json = json.dumps(info.get('stats', {})).replace("'", "''")
        effect_json = json.dumps(info.get('effect', {})).replace("'", "''")
        
        print(f"""INSERT INTO item (id, name, description, plaintext, from_items, into_items, depth, in_store, image_icon, cost_base, cost_total, purchasable, sell_price, tags, maps, stats, effect) 
        VALUES ({int(iid)}, '{clean(info.get('name'))}', '{clean(info.get('description'))}', '{clean(info.get('plaintext'))}', '{to_sql_array(info.get('from'))}', '{to_sql_array(info.get('into'))}', {info.get('depth', 1)}, {str(info.get('inStore', True)).lower()}, '{info.get('image', {}).get('full')}', {gold.get('base', 0)}, {gold.get('total', 0)}, {str(gold.get('purchasable', True)).lower()}, {gold.get('sell', 0)}, '{to_sql_array(info.get('tags'))}', '{maps_json}', '{stats_json}', '{effect_json}');""")
except FileNotFoundError:
    print(f"-- ERREUR: Fichier {ITEM_JSON} introuvable --")

# ---------------------------------------------------------
# 3. RUNES
# ---------------------------------------------------------
try:
    with open(RUNE_JSON, 'r', encoding='utf-8') as f:
        runes_data = json.load(f)

    for tree in runes_data:
        print(f"INSERT INTO rune_root (rune_root_id, rune_root_key, image_icon, name) VALUES ({tree['id']}, '{tree['key']}', '{tree['icon']}', '{clean(tree['name'])}');")
        for slot_idx, slot in enumerate(tree['slots']):
            for r in slot['runes']:
                print(f"""INSERT INTO rune (rune_id, rune_root_id, slot_number, runes_mineur_key, image_icon, name, shortDesc, longDesc) 
                VALUES ({r['id']}, {tree['id']}, {slot_idx}, '{r['key']}', '{r['icon']}', '{clean(r['name'])}', '{clean(r['shortDesc'])}', '{clean(r['longDesc'])}');""")
except FileNotFoundError:
    print(f"-- ERREUR: Fichier {RUNE_JSON} introuvable --")

# ---------------------------------------------------------
# 4. SUMMONERS
# ---------------------------------------------------------
try:
    with open(SUMMONER_JSON, 'r', encoding='utf-8') as f:
        summoners_dict = json.load(f)['data']

    for tech_name, info in summoners_dict.items():
        real_id = int(info['key'])
        cd = int(info['cooldown'][0]) if info.get('cooldown') else 0
        rng = int(info['range'][0]) if info.get('range') else 0
        modes_sql = to_sql_array(info.get('modes', []))

        print(f"""INSERT INTO summoner (id, riot_key, name, description, cooldown, summoner_level, range, image_icon, modes) 
        VALUES ({real_id}, '{info['id']}', '{clean(info['name'])}', '{clean(info['description'])}', {cd}, {info['summonerLevel']}, {rng}, '{info['image']['full']}', '{modes_sql}');""")
except FileNotFoundError:
    print(f"-- ERREUR: Fichier {SUMMONER_JSON} introuvable --")

print("COMMIT;")