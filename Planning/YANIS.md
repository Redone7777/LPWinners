# ⚙️ Yanis - Backend (Version Simplifiée)

## 🎯 Objectif
Faire le lien entre la base de données de Jimmy et le site de Redwan.

---

## 📅 Planning Simple

### Étape 1 : Démarrage
- [ ] Installer **FastAPI** et **Uvicorn** (c'est le plus simple en Python).
- [ ] Créer un fichier `main.py`.
- [ ] Faire marcher le "Hello World" :
  ```python
  from fastapi import FastAPI
  app = FastAPI()

  @app.get("/")
  def read_root():
      return {"message": "Salut l'équipe !"}
  ```
- [ ] Lancer le serveur (`uvicorn main:app --reload`) et voir si ça marche dans le navigateur.

### Étape 2 : Les Champions (Données fausses)
- [ ] Créer une route `/champions` qui renvoie une liste écrite en dur dans le code (juste pour tester).
  ```python
  @app.get("/champions")
  def get_champions():
      return [{"name": "Ahri", "role": "Mid"}, {"name": "Garen", "role": "Top"}]
  ```
- [ ] Dire à Redwan : "C'est bon, tu peux essayer d'afficher cette liste".

### Étape 3 : Connexion Base de Données (Le vrai truc)
- [ ] Installer `sqlalchemy` et `psycopg2`.
- [ ] Connecter le code à la base de données de Jimmy.
- [ ] Remplacer la liste fausse par une vraie requête qui va chercher les champions dans la table `champions`.

### Étape 4 : API Riot (Bonus)
- [ ] Ne te prends pas la tête avec ça au début.
- [ ] Une fois que le reste marche, essaie juste de récupérer le niveau d'un joueur via son pseudo avec la librairie `requests`.

---

## 💡 Conseils pour débutant
1. **Teste tout le temps** : Utilise ton navigateur pour aller sur `http://localhost:8000/champions` et voir si tes données s'affichent (en JSON).
2. **FastAPI fait la doc tout seul** : Va sur `http://localhost:8000/docs`, tu pourras tester tes boutons sans coder.
3. **Parle à Redwan** : Demande-lui "De quelles données tu as besoin exactement ?" (Nom ? Image ? Prix ?).
