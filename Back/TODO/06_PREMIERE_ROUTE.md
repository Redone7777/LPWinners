# PREMIÈRE ROUTE : CHAMPIONS

## Ce qu'on va faire

Créer deux routes pour les champions :
- GET /api/champions → Liste de tous les champions
- GET /api/champions/{id} → Détails d'un champion avec stats et abilities

Puis créer main.py qui assemble tout le backend.

## Le problème du mapping

La base de Jimmy utilise des noms de colonnes différents de ce que le frontend attend.

**Base de Jimmy** :
- Table : champion
- Colonnes : riot_id, tags, hp, mp, attackdamage, armor, spellblock, attackspeed, movespeed, allytips

**Frontend attend** :
- role (pas tags)
- stats.hp, stats.mana (pas hp, mp)
- stats.attack_damage (pas attackdamage)
- stats.magic_resist (pas spellblock)
- image_url (pas dans la base)

**Ton job** : Transformer les données de Jimmy au format frontend.

## Les images (CDN Riot)

Les images ne sont pas stockées dans la base. Tu construis les URLs avec le CDN de Riot.

**Champion splash** :
https://ddragon.leagueoflegends.com/cdn/img/champion/splash/{riot_id}_0.jpg

Exemple pour Jinx avec riot_id "Jinx" :
https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jinx_0.jpg

**Spell icon** :
https://ddragon.leagueoflegends.com/cdn/13.1.1/img/spell/{image_spell}.png

**Item icon** :
https://ddragon.leagueoflegends.com/cdn/13.1.1/img/item/{item_id}.png

Tu vas utiliser des f-strings pour construire ces URLs dynamiquement.

## Créer routes/champions.py

### Route GET /api/champions

**Ce qu'elle fait** :

1. Connexion à la base avec get_db_connection()
2. Requête SQL : SELECT id, name, title, tags[1] as role, riot_id FROM champion ORDER BY name
3. Pour chaque champion dans le résultat, crée un dict avec les bonnes clés
4. Ajoute image_url construite avec f-string
5. Return le tableau de champions

**Point clé sur tags[1]** :
En PostgreSQL, les arrays commencent à 1 (pas 0 comme en Python).
tags[1] récupère le premier élément de l'array tags, qui correspond au rôle principal.

**Exemple de transformation** :

Données de la base :
id=1, name="Jinx", title="the Loose Cannon", tags[1]="Marksman", riot_id="Jinx"

Devient :

{
  "id": 1,
  "name": "Jinx",
  "title": "the Loose Cannon",
  "role": "Marksman",
  "image_url": "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jinx_0.jpg"
}

**Code complet** : FOR_MY_LITTLE_BOY_YANIS.md lignes 457-496

### Route GET /api/champions/{id}

**Ce qu'elle fait** :

1. Requête SQL 1 : SELECT toutes les colonnes du champion WHERE id = champion_id
2. Si pas de résultat → HTTPException 404 "Champion not found"
3. Requête SQL 2 : SELECT les spells WHERE champion_id = champion_id
4. Transforme tout au format attendu :
   - Crée un sous-objet stats avec hp, mana, attack_damage, etc.
   - Arrondit les valeurs avec round()
   - Crée un array abilities en transformant les spells
   - Ajoute image_url pour le champion et chaque spell
5. Return le tout

**Exemple de transformation stats** :

Base : hp=610.48, mp=245.6, attackdamage=59.38

Devient :

"stats": {
  "hp": 610,
  "mana": 246,
  "attack_damage": 59,
  ...
}

**Exemple de transformation spells** :

Base : name="Switcheroo!", description="...", image_spell="JinxQ", cooldown=0.9

Devient dans abilities :

{
  "name": "Switcheroo!",
  "description": "...",
  "image_url": "https://ddragon.leagueoflegends.com/cdn/13.1.1/img/spell/JinxQ.png",
  "cooldown": 0.9
}

**Code complet** : FOR_MY_LITTLE_BOY_YANIS.md lignes 498-507

## Créer main.py

C'est le cerveau du backend. Il assemble tout.

**Ce qu'il fait** :

1. Crée l'app FastAPI
2. Configure CORS (CRITIQUE sinon le frontend ne peut pas te parler)
3. Enregistre tous les routers
4. Définit la route racine /
5. Lance Uvicorn sur le port 8000

**CORS expliqué simplement** :

Par défaut, les navigateurs bloquent les requêtes entre domaines différents (sécurité).

Frontend tourne sur http://localhost:5173
Backend tourne sur http://localhost:8000

→ Deux domaines différents → Bloqué par le navigateur

Le middleware CORS dit au navigateur : "C'est OK, autorise ces domaines".

**Structure minimale de main.py** :

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth, champions

app = FastAPI(title="LP Winners API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(champions.router)

@app.get("/")
def root():
    return {"message": "LP Winners API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

**reload=True** : Le serveur redémarre automatiquement quand tu modifies le code. Pratique pour le dev.

**Code complet** : FOR_MY_LITTLE_BOY_YANIS.md lignes 574-606

## Créer les fichiers __init__.py

FastAPI (et Python en général) a besoin de fichiers __init__.py pour reconnaître les dossiers comme des modules.

Sans ça, les imports ne marcheront pas.

Crée 4 fichiers vides :

touch database/__init__.py
touch models/__init__.py
touch routes/__init__.py
touch utils/__init__.py

## Lancer le serveur

cd /home/redone/Projet/LPWinners/Back
python3 main.py

Tu dois voir :

INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Started reloader process
INFO:     Application startup complete.

## Tester dans le navigateur

### Route racine

Ouvre http://localhost:8000

Tu dois voir :

{
  "message": "LP Winners API is running"
}

### Liste champions

http://localhost:8000/api/champions

Tu dois voir un gros JSON avec tous les champions (168 normalement).

### Détails champion

http://localhost:8000/api/champions/1

Tu dois voir les détails complets avec stats, abilities, tips.

**Si ça marche → GG, ton premier endpoint fonctionne de bout en bout.**

## Documentation auto-générée

FastAPI génère automatiquement une doc interactive Swagger.

Va sur http://localhost:8000/docs

Tu vois tous tes endpoints avec :
- Les paramètres requis
- Les formats de réponse
- Un bouton "Try it out" pour tester directement

C'est inclus gratuitement avec FastAPI. Pratique pour tester sans Postman.

## Récap

✅ routes/champions.py créé avec 2 endpoints
✅ Transformation des données Jimmy → format frontend
✅ Construction des URLs CDN avec f-strings
✅ main.py créé avec CORS configuré
✅ Fichiers __init__.py créés
✅ Serveur lancé et fonctionnel
✅ Tests réussis dans le navigateur
✅ Doc auto-générée accessible sur /docs

## Prochaine étape

**07_FORUM.md**

Routes forum (posts, comments) avec protection JWT.
