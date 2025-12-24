# Spécification API LPWinners

> **Objectif de ce document** : Cette spécification définit le contrat API pour le frontend de la base de données LPWinners. Les développeurs backend doivent implémenter ces endpoints exactement comme spécifié pour assurer une intégration transparente.

**URL de base** : `/api/v1`

---

## 1. Champions

### `GET /api/v1/champions`

Récupère tous les champions ou filtre par rôle/difficulté.

**Paramètres de requête :**
| Paramètre | Type | Requis | Valeurs |
|-----------|------|--------|---------|
| `role` | string | Non | `top`, `jungle`, `mid`, `bot`, `support` |
| `difficulty` | string | Non | `easy`, `medium`, `hard` |

**Réponse :**
```json
{
  "data": [
    {
      "id": "Aatrox",
      "name": "Aatrox",
      "title": "L'épée des Darkin",
      "role": "top",
      "difficulty": "hard"
    },
    {
      "id": "Ahri",
      "name": "Ahri",
      "title": "La Renarde à neuf queues",
      "role": "mid",
      "difficulty": "medium"
    }
  ]
}
```

**Définition des champs :**
| Champ | Type | Description |
|-------|------|-------------|
| `id` | string | Identifiant du champion (utilisé pour l'URL d'image DDragon) |
| `name` | string | Nom d'affichage |
| `title` | string | Titre/sous-titre du champion |
| `role` | string | Rôle principal : `top`, `jungle`, `mid`, `bot`, `support` |
| `difficulty` | string | Niveau de difficulté : `easy`, `medium`, `hard` |

---

## 2. Objets (Items)

### `GET /api/v1/items`

Récupère tous les objets ou filtre par catégorie.

**Paramètres de requête :**
| Paramètre | Type | Requis | Valeurs |
|-----------|------|--------|---------|
| `category` | string | Non | `damage`, `defense`, `magic`, `boots`, `consumable` |

**Réponse :**
```json
{
  "data": [
    {
      "id": "3031",
      "name": "Lame de l'infini",
      "price": 3400,
      "stats": "+70 AD, +20% Crit",
      "category": "damage"
    },
    {
      "id": "3089",
      "name": "Coiffe de Rabadon",
      "price": 3600,
      "stats": "+120 AP",
      "category": "magic"
    }
  ]
}
```

**Définition des champs :**
| Champ | Type | Description |
|-------|------|-------------|
| `id` | string | ID de l'objet (utilisé pour l'URL d'image DDragon) |
| `name` | string | Nom d'affichage |
| `price` | number | Coût en or |
| `stats` | string | Résumé des statistiques pour l'affichage |
| `category` | string | Catégorie de l'objet pour le filtrage |

---

## 3. Runes

### `GET /api/v1/runes`

Récupère toutes les runes ou filtre par arbre.

**Paramètres de requête :**
| Paramètre | Type | Requis | Valeurs |
|-----------|------|--------|---------|
| `tree` | string | Non | `Precision`, `Domination`, `Sorcellerie`, `Volonté`, `Inspiration` |

**Réponse :**
```json
{
  "data": [
    {
      "id": "LethalTempo",
      "name": "Tempo létal",
      "tree": "Precision",
      "keystone": true
    },
    {
      "id": "Conqueror",
      "name": "Conquérant",
      "tree": "Precision",
      "keystone": true
    }
  ]
}
```

**Définition des champs :**
| Champ | Type | Description |
|-------|------|-------------|
| `id` | string | Identifiant de la rune (utilisé pour le chemin d'image DDragon) |
| `name` | string | Nom d'affichage |
| `tree` | string | Nom de l'arbre de runes |
| `keystone` | boolean | `true` si c'est une rune clé de voûte |

---

## 4. Sorts (Compétences de champions)

### `GET /api/v1/spells`

Récupère les compétences/sorts des champions.

**Paramètres de requête :**
| Paramètre | Type | Requis | Description |
|-----------|------|--------|-------------|
| `championId` | string | Non | Filtrer par champion |

**Réponse :**
```json
{
  "data": [
    {
      "id": "AatroxQ",
      "name": "La Lame des Darkin",
      "cost": "0",
      "desc": "Aatrox abat son épée, infligeant des dégâts physiques."
    },
    {
      "id": "AhriQ",
      "name": "Orbe de tromperie",
      "cost": "65-85",
      "desc": "Ahri envoie et rappelle son orbe, infligeant des dégâts magiques."
    }
  ]
}
```

**Définition des champs :**
| Champ | Type | Description |
|-------|------|-------------|
| `id` | string | Identifiant du sort (utilisé pour l'URL d'image DDragon) |
| `name` | string | Nom de la compétence |
| `cost` | string | Coût en mana (peut être une plage comme "65-85" ou "0") |
| `desc` | string | Description courte |

---

## 5. Sorts d'invocateur

### `GET /api/v1/summoners`

Récupère tous les sorts d'invocateur.

**Réponse :**
```json
{
  "data": [
    {
      "id": "SummonerFlash",
      "name": "Flash",
      "cooldown": "300s"
    },
    {
      "id": "SummonerDot",
      "name": "Embrasement",
      "cooldown": "180s"
    }
  ]
}
```

**Définition des champs :**
| Champ | Type | Description |
|-------|------|-------------|
| `id` | string | ID du sort (identifiant d'image DDragon) |
| `name` | string | Nom d'affichage |
| `cooldown` | string | Durée du temps de recharge avec unité |

---

## Format des réponses d'erreur

Tous les endpoints doivent retourner les erreurs dans ce format :

```json
{
  "error": {
    "status": 404,
    "message": "Ressource non trouvée"
  }
}
```

**Codes de statut HTTP :**
| Code | Description |
|------|-------------|
| 200 | Succès |
| 400 | Requête invalide (paramètres incorrects) |
| 404 | Ressource non trouvée |
| 500 | Erreur serveur interne |

---

## Référence des URLs d'images

Le frontend construit les URLs d'images en utilisant DDragon. Les champs `id` correspondent aux formats suivants :

| Entité | Format d'URL |
|--------|--------------|
| Champions | `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/{id}_0.jpg` |
| Objets | `https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/{id}.png` |
| Runes | `https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/{tree}/{id}/{id}.png` |
| Sorts | `https://ddragon.leagueoflegends.com/cdn/14.24.1/img/spell/{id}.png` |
| Invocateur | `https://ddragon.leagueoflegends.com/cdn/14.24.1/img/spell/{id}.png` |
