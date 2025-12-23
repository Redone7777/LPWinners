import json

# Charge ton fichier item.json
with open('/home/jd/L3/database/caca/dragontail-15.23.1/15.23.1/data/fr_FR/item.json', 'r', encoding='utf-8') as f:
    items_data = json.load(f)

print("BEGIN;")
# On vide la table pour tes tests
print("TRUNCATE item RESTART IDENTITY;")

for item_id, info in items_data['data'].items():
    # Nettoyage des textes
    def clean(txt):
        return str(txt).replace("'", "''") if txt else ""

    # Préparation des tableaux SQL
    def to_sql_array(list_data):
        if not list_data: return '{}'
        return "{" + ",".join([f'"{x}"' for x in list_data]) + "}"

    # Extraction des données
    gold = info.get('gold', {})
    image = info.get('image', {}).get('full', '')
    
    # Construction de la requête
    print(f"""
INSERT INTO item (
    riot_item_id, name, description, colloq, plaintext, 
    from_items, into_items, depth, required_champion, in_store,
    image_icon, cost_base, cost_total, purchasable, sell_price,
    tags, maps, stats, effect
) VALUES (
    {item_id}, '{clean(info['name'])}', '{clean(info['description'])}', 
    '{clean(info.get('colloq', ''))}', '{clean(info.get('plaintext', ''))}',
    '{to_sql_array(info.get('from'))}', '{to_sql_array(info.get('into'))}',
    {info.get('depth', 1)}, '{clean(info.get('requiredChampion', ''))}', {str(info.get('inStore', True)).lower()},
    '{image}', {gold.get('base', 0)}, {gold.get('total', 0)}, {str(gold.get('purchasable', True)).lower()}, {gold.get('sell', 0)},
    '{to_sql_array(info.get('tags'))}', '{json.dumps(info.get('maps'))}', 
    '{json.dumps(info.get('stats'))}', '{json.dumps(info.get('effect'))}'
);""")

print("COMMIT;")