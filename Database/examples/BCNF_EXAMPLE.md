# 📊 Normalisation BCNF - Exemple LP Winners

## Qu'est-ce que la BCNF ?

**BCNF (Boyce-Codd Normal Form)** est une forme normale stricte en conception de bases de données qui élimine les anomalies de mise à jour, d'insertion et de suppression.

### Règle BCNF
Pour chaque dépendance fonctionnelle **X → Y** dans une table :
- **X doit être une super-clé** (c'est-à-dire qu'il identifie de manière unique une ligne)

---

## 🎯 Exemple : Table Match_Participants

### ❌ Version NON normalisée (problématique)

```
Match_Participants_Bad:
----------------------------------------------------------
match_id | player_name | player_region | champion_name | kills | deaths | assists
----------------------------------------------------------
1        | Faker       | KR            | Zed           | 18    | 2      | 7
1        | Caps        | EUW           | Yasuo         | 10    | 5      | 12
2        | Faker       | KR            | Ahri          | 12    | 3      | 15
```

### Problèmes identifiés :

1. **Redondance** : Les informations du joueur (name, region) sont répétées
2. **player_name → player_region** : Dépendance partielle non basée sur la clé
3. **Anomalies** :
   - **Insertion** : Ne peut pas ajouter un joueur sans match
   - **Mise à jour** : Si Faker change de région, il faut modifier tous ses matchs
   - **Suppression** : Supprimer tous les matchs d'un joueur = perte des infos joueur

### Dépendances fonctionnelles :
- `match_id, player_name → champion_name, kills, deaths, assists` ✅ (clé composite)
- `player_name → player_region` ❌ **Problème !** (player_name n'est pas une super-clé)

---

## ✅ Version BCNF (solution)

### Étape 1 : Séparer les entités

#### Table `players`
```sql
CREATE TABLE players (
    id SERIAL PRIMARY KEY,              -- Super-clé
    summoner_name VARCHAR(100) NOT NULL,
    region VARCHAR(10) NOT NULL,
    puuid VARCHAR(100) UNIQUE,
    level INTEGER,
    rank_tier VARCHAR(20),
    UNIQUE(summoner_name, region)       -- Contrainte d'unicité
);
```

**Dépendance** : `id → summoner_name, region, puuid, level, rank_tier` ✅

#### Table `champions`
```sql
CREATE TABLE champions (
    id SERIAL PRIMARY KEY,              -- Super-clé
    riot_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(50),
    difficulty INTEGER
);
```

**Dépendance** : `id → riot_id, name, role, difficulty` ✅

#### Table `matches`
```sql
CREATE TABLE matches (
    id SERIAL PRIMARY KEY,              -- Super-clé
    game_id VARCHAR(100) UNIQUE NOT NULL,
    region VARCHAR(10) NOT NULL,
    game_date TIMESTAMP NOT NULL,
    game_duration INTEGER,
    winning_team INTEGER
);
```

**Dépendance** : `id → game_id, region, game_date, game_duration, winning_team` ✅

#### Table `match_participants`
```sql
CREATE TABLE match_participants (
    id SERIAL PRIMARY KEY,
    match_id INTEGER REFERENCES matches(id),
    player_id INTEGER REFERENCES players(id),
    champion_id INTEGER REFERENCES champions(id),
    kills INTEGER,
    deaths INTEGER,
    assists INTEGER,
    cs INTEGER,
    win BOOLEAN,
    UNIQUE(match_id, player_id)         -- Un joueur = une seule participation par match
);
```

**Dépendances** :
- `id → match_id, player_id, champion_id, kills, deaths, assists, cs, win` ✅
- `(match_id, player_id) → champion_id, kills, deaths, assists, cs, win` ✅

---

## 📝 Vérification BCNF étape par étape

### Table `players`

| Dépendance fonctionnelle | X est super-clé ? | BCNF ? |
|--------------------------|-------------------|--------|
| `id → summoner_name, region, ...` | ✅ Oui (PK) | ✅ Oui |

### Table `match_participants`

| Dépendance fonctionnelle | X est super-clé ? | BCNF ? |
|--------------------------|-------------------|--------|
| `id → match_id, player_id, ...` | ✅ Oui (PK) | ✅ Oui |
| `(match_id, player_id) → champion_id, kills, ...` | ✅ Oui (Contrainte UNIQUE) | ✅ Oui |

---

## 🔍 Comparaison Avant/Après

### Avant (Non normalisé)
```
Match_Participants_Bad (6 colonnes, données redondantes)
- match_id, player_name, player_region, champion_name, kills, deaths, assists
- 100 matchs avec Faker = "Faker" et "KR" répétés 100 fois
```

### Après (BCNF)
```
players (3 colonnes principales)
- id, summoner_name, region

champions (3 colonnes principales)  
- id, name, role

matches (4 colonnes principales)
- id, game_id, game_date, duration

match_participants (5 colonnes principales + 3 FK)
- id, match_id, player_id, champion_id, kills, deaths, assists
- 100 matchs avec Faker = player_id référence une seule fois les infos
```

### Avantages :
✅ **Pas de redondance** : Infos joueur stockées une seule fois  
✅ **Intégrité** : Modification du joueur = un seul endroit  
✅ **Flexibilité** : Peut ajouter des joueurs sans matchs  
✅ **Performance** : Moins d'espace disque, index efficaces  
✅ **Maintenance** : Modifications simples et sûres  

---

## 🎓 Les 3 formes normales en résumé

### 1NF (Première Forme Normale)
- ✅ Attributs atomiques (pas de listes dans une colonne)
- ✅ Pas de groupes répétitifs
- ✅ Exemple : `items_json` stocké en JSONB plutôt que `item1, item2, item3...`

### 2NF (Deuxième Forme Normale)
- ✅ Déjà en 1NF
- ✅ Tous les attributs dépendent de **toute** la clé primaire
- ✅ Pas de dépendances partielles

### 3NF (Troisième Forme Normale)
- ✅ Déjà en 2NF
- ✅ Pas de dépendances transitives (A → B → C)
- ✅ Exemple : Séparer `players` et `teams` car `player_id → team_id → team_name`

### BCNF (Boyce-Codd)
- ✅ Déjà en 3NF
- ✅ Pour **chaque** dépendance X → Y, X est une super-clé
- ✅ Forme la plus stricte et la plus robuste

---

## 🛠️ Exercice pratique

### Problème : Table Forum
```
forum_bad:
post_id | author_name | author_region | champion_name | title | content
```

**Question** : Identifier les problèmes et normaliser en BCNF.

<details>
<summary>Solution</summary>

### Problèmes :
- `author_name → author_region` (dépendance non basée sur la clé)
- `champion_name` devrait être une FK vers une table champions

### Solution BCNF :
```sql
-- Réutiliser players existant
-- Réutiliser champions existant

CREATE TABLE forum_posts (
    id SERIAL PRIMARY KEY,
    author_id INTEGER REFERENCES players(id),
    champion_id INTEGER REFERENCES champions(id),
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL
);
```

✅ Toutes les dépendances sont basées sur des super-clés !
</details>

---

## 📚 Ressources

- [Cours sur la normalisation](https://fr.wikipedia.org/wiki/Forme_normale_de_Boyce-Codd)
- [Tutoriel BCNF interactif](https://www.guru99.com/database-normalization.html)
- [Exemples pratiques](https://www.geeksforgeeks.org/boyce-codd-normal-form-bcnf/)

---

## ✅ Checklist BCNF pour LP Winners

- [x] Table `champions` en BCNF
- [x] Table `players` en BCNF
- [x] Table `matches` en BCNF
- [x] Table `match_participants` en BCNF
- [x] Table `forum_posts` en BCNF
- [x] Table `forum_comments` en BCNF
- [x] Aucune redondance de données
- [x] Toutes les clés étrangères définies
- [x] Contraintes d'intégrité en place
