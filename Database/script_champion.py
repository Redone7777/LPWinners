import json

# Chemin de ton fichier
json_path = '/home/jd/L3/database/caca/dragontail-15.23.1/15.23.1/data/fr_FR/championFull.json'

with open(json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

champions = data['data']

print("BEGIN;") # Pour que tout s'insère d'un coup (plus rapide)

for champ_id, info in champions.items():
    # Fonction pour doubler les apostrophes
    def clean(txt):
        return str(txt).replace("'", "''") if txt else ""

    # Préparation des types complexes
    tags_sql = "{" + ",".join([f'"{t}"' for t in info['tags']]) + "}"
    ally_tips = json.dumps(info['allytips']).replace("'", "''")
    enemy_tips = json.dumps(info['enemytips']).replace("'", "''")
    passive = json.dumps(info['passive']).replace("'", "''")

    # 1. INSERT CHAMPION (Toutes les colonnes de ta table)
    print(f"""
INSERT INTO champion (
    riot_id, riot_key, name, title, lore, blurb, allytips, enemytips, 
    image_icone, tags, partype, attack, defense, magic, difficulty,
    hp, hpperlevel, mp, mpperlevel, movespeed, armor, armorperlevel,
    spellblock, spellblockperlevel, attackrange, hpregen, hpregenperlevel,
    mpregen, mpregenperlevel, crit, critperlevel, attackdamage, 
    attackdamageperlevel, attackspeedperlevel, attackspeed, passive
) VALUES (
    '{info['id']}', {info['key']}, '{clean(info['name'])}', '{clean(info['title'])}', 
    '{clean(info['lore'])}', '{clean(info['blurb'])}', '{ally_tips}', '{enemy_tips}', 
    '{info['image']['full']}', '{tags_sql}', '{info['partype']}', 
    {info['info']['attack']}, {info['info']['defense']}, {info['info']['magic']}, {info['info']['difficulty']},
    {info['stats']['hp']}, {info['stats']['hpperlevel']}, {info['stats']['mp']}, {info['stats']['mpperlevel']},
    {info['stats']['movespeed']}, {info['stats']['armor']}, {info['stats']['armorperlevel']},
    {info['stats']['spellblock']}, {info['stats']['spellblockperlevel']}, {info['stats']['attackrange']},
    {info['stats']['hpregen']}, {info['stats']['hpregenperlevel']}, {info['stats']['mpregen']}, {info['stats']['mpregenperlevel']},
    {info['stats']['crit']}, {info['stats']['critperlevel']}, {info['stats']['attackdamage']}, {info['stats']['attackdamageperlevel']},
    {info['stats']['attackspeedperlevel']}, {info['stats']['attackspeed']}, '{passive}'
);""")

    # 2. INSERT SKINS
    for skin in info['skins']:
        img_name = f"{info['id']}_{skin['num']}"
        print(f"INSERT INTO skin (champion_id, riot_skin_id, num, name, chromas, image_splash, image_tile) VALUES (currval('champion_id_seq'), '{skin['id']}', {skin['num']}, '{clean(skin['name'])}', {str(skin['chromas']).lower()}, '{img_name}.jpg', '{img_name}.png');")

    # 3. INSERT SPELLS
    for spell in info['spells']:
        effect_json = json.dumps(spell['effect']).replace("'", "''")
        print(f"""INSERT INTO spell (champion_id, riot_spell_id, name, description, cooldown, cooldownBurn, cost, costBurn, range, rangeBurn, effect, image_spell) 
VALUES (currval('champion_id_seq'), '{spell['id']}', '{clean(spell['name'])}', '{clean(spell['description'])}', ARRAY{spell['cooldown']}, '{spell['cooldownBurn']}', ARRAY{spell['cost']}, '{spell['costBurn']}', ARRAY{spell['range']}, '{spell['rangeBurn']}', '{effect_json}', '{spell['image']['full']}');""")

print("COMMIT;")