# 🗄️ Jimmy - Base de Données (Version Simplifiée)

## 🎯 Objectif
Créer une base de données simple pour stocker les infos du site.

---

## 📅 Planning Simple

### Étape 1 : Conception (Papier/Crayon)
- [ ] Lister les infos qu'on veut vraiment afficher (Nom du champion, Image, Rôle, Description).
- [ ] Dessiner 3 tables simples sur une feuille :
  1. **Champions** (Les persos du jeu)
  2. **Players** (Les joueurs inscrits ou recherchés)
  3. **Posts** (Pour le forum)

### Étape 2 : Création de la Base
- [ ] Installer PostgreSQL (ou utiliser SQLite qui est inclus dans Python pour commencer très vite).
- [ ] Créer la base de données nommée `lpwinners`.
- [ ] Écrire les scripts SQL simples :

```sql
-- Table Champions
CREATE TABLE champions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    role VARCHAR(50),
    difficulty INTEGER,
    description TEXT,
    image_url TEXT
);

-- Table Players (Joueurs)
CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    pseudo VARCHAR(100),
    region VARCHAR(10),
    rank VARCHAR(50),
    level INTEGER
);

-- Table Forum (Posts)
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200),
    content TEXT,
    author_name VARCHAR(100)
);
```

### Étape 3 : Fausses Données (Pour tester)
- [ ] Insérer manuellement 5 champions (Ahri, Garen, Lux, etc.) via SQL ou l'interface graphique (pgAdmin/DBeaver).
- [ ] Insérer 2-3 joueurs fictifs.
- [ ] Vérifier que tu peux lire les données avec `SELECT * FROM champions;`.

### Étape 4 : Aider Yanis
- [ ] Donner à Yanis les infos de connexion (Host, User, Password, Database Name).
- [ ] L'aider à connecter son code Python à ta base de données.

---

## 💡 Conseils pour débutant
1. **Fais simple** : Pas besoin de 15 tables. Commence avec 3.
2. **Pas de stress sur la performance** : On s'en fiche des index et de l'optimisation pour l'instant.
3. **Utilise une interface graphique** : Installe **DBeaver** ou **pgAdmin**, c'est beaucoup plus simple que la ligne de commande pour voir tes tables.
