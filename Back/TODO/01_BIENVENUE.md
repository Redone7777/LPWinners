# BIENVENUE YANIS

## Pourquoi tu lis ce guide

Parce que tu dois créer le backend de LP Winners. C'est pas optionnel, c'est ta partie du projet.

Le frontend est fait. La base de données est faite. Ton job : connecter les deux.

## Ce que tu vas apprendre

- **FastAPI** : Framework Python pour créer des APIs
- **PostgreSQL** : Système de base de données relationnel
- **JWT** : Tokens pour authentifier les utilisateurs
- **REST API** : Convention pour organiser les endpoints

C'est ce qu'on utilise dans 90% des boîtes tech. Pas de choix fantaisiste ici.

## Concrètement, ton backend fait quoi

Le frontend veut afficher la liste des champions. Il demande à ton backend.

Ton backend :
1. Reçoit la requête HTTP
2. Va chercher les données dans PostgreSQL
3. Les transforme au format JSON
4. Les renvoie au frontend

**Simple. Répétitif. Efficace.**

## Pourquoi FastAPI et pas autre chose

- **Django** : Trop lourd pour ce qu'on fait
- **Flask** : Trop basique, on doit tout coder à la main
- **FastAPI** : Rapide, moderne, validation automatique, documentation auto-générée

On utilise FastAPI parce que c'est le meilleur choix pour ce type de projet. Point.

## Le schéma complet

```
Frontend (React) → Envoie requête HTTP
       ↓
Backend (FastAPI) → Ton code ici
       ↓
Database (PostgreSQL) → Données de Jimmy
```

## Ce que tu DOIS faire

1. Créer un serveur FastAPI qui tourne sur le port 8000
2. Le connecter à la base PostgreSQL de Jimmy
3. Créer des routes (endpoints) que le frontend va appeler
4. Gérer l'authentification avec JWT
5. Tester que tout fonctionne

## Ce que tu NE DOIS PAS faire

- Toucher au frontend (déjà fait)
- Modifier les tables de Jimmy (sauf créer celles du forum)
- Demander à une IA de tout générer à ta place
- Sauter des étapes en pensant que tu comprends déjà

## Pourquoi tu dois le faire toi-même

Si tu demandes à ChatGPT de générer tout le code :

1. **Tu ne comprendras rien** quand y'aura un bug
2. **Tu ne sauras pas débugger** quand ça plante
3. **Tu seras perdu** au premier entretien technique
4. **Tu n'apprendras rien** et ça se verra

Ce guide te montre COMMENT faire et POURQUOI. Lis, comprends, code. Dans cet ordre.


## La règle

**Un fichier = Une notion**

Tu lis dans l'ordre. Tu ne sautes pas. Tu codes après avoir lu.

## Fichier suivant

**02_COMPRENDRE_LES_APIS.md**

Explications directes sur ce qu'est une API et comment ça marche vraiment.

Pas d'analogies débiles. Juste les faits.

C'est parti.
