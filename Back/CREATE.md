# Backend API Requirements

Le frontend (`create.js`) attend une API REST tournant sur `http://localhost:8000`.
Voici les endpoints nécessaires :

## 1. Champions
**GET /champions**

Doit renvoyer une liste JSON de champions.

**Format attendu par objet :**
```json
{
    "id": 1,
    "nom": "Aatrox",
    "image": "URL_SPLASH_ART",
    "skins": [
        "URL_SKIN_1",
        "URL_SKIN_2"
    ],
    "passif": "Nom ou Description du passif",
    "passifImage": "URL_PASSIF_ICON (Optionnel)"
}
```

## 2. Items
**GET /items**

Doit renvoyer une liste JSON d'objets.

**Format attendu par objet :**
```json
{
    "nom": "Infinity Edge",
    "image": "URL_ICON_ITEM",
    "rarete": "Basique" | "Epique" | "Legendaire"
}
```

## 3. Runes
**GET /runes**

Doit renvoyer une liste JSON de runes.

**Format attendu par objet :**
```json
{
    "nom": "Conqueror",
    "image": "URL_ICON_RUNE"
}
```

## Notes
- Le Frontend tourne sur `http://localhost:3000`.
- CORS doit être activé pour permettre les requêtes depuis ce domaine.
- En cas d'erreur de connexion, le frontend affiche une alerte simple.
