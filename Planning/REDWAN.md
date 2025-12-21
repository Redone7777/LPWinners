# 🎨 Redwan - Frontend (Version Simplifiée)

## 🎯 Objectif
Créer les pages du site et afficher les infos.

---

## 📅 Planning Simple

### Étape 1 : La Coquille Vide
- [ ] Créer le projet avec Vite (`npm create vite@latest` ou avec Bun).
- [ ] Nettoyer le projet (supprimer les fichiers exemples inutiles).
- [ ] Installer **React Router** pour pouvoir changer de page.
- [ ] Créer 3 pages vides : `Accueil`, `Champions`, `Forum`.
- [ ] Faire une barre de navigation (Menu) simple pour passer d'une page à l'autre.

### Étape 2 : Le Design (Statique)
- [ ] Sur la page `Champions`, créer des "Cartes" avec du faux texte (Nom du champion, Image).
- [ ] Utiliser du CSS simple (ou Tailwind si tu es à l'aise) pour que ça ressemble à une grille.
- [ ] Ne t'occupe pas encore des données de Yanis, fais juste en sorte que ce soit joli.

### Étape 3 : Connecter avec Yanis
- [ ] Utiliser `fetch` ou `axios` pour appeler l'adresse de Yanis (`http://localhost:8000/champions`).
- [ ] Remplacer ton faux texte par les vraies données reçues.
  ```javascript
  // Exemple simple
  useEffect(() => {
    fetch('http://localhost:8000/champions')
      .then(response => response.json())
      .then(data => setChampions(data));
  }, []);
  ```

### Étape 4 : Les détails
- [ ] Ajouter un champ de recherche simple pour filtrer la liste des champions.
- [ ] Faire une page "Détail" quand on clique sur un champion.

---

## 💡 Conseils pour débutant
1. **Un problème à la fois** : D'abord l'affichage (HTML/CSS), ensuite la logique (JS).
2. **Console.log est ton ami** : Si ça ne marche pas, fais `console.log(data)` pour voir ce que Yanis t'envoie.
3. **Copie-colle intelligemment** : Regarde comment font les tutos pour "React fetch data list", c'est la base de tout site web.
