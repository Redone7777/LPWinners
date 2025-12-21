# 🎨 LP Winners - Design System "Liquid Glass"

## Vue d'ensemble

Le design system "Liquid Glass" de LP Winners s'inspire de l'esthétique moderne d'Apple (iOS/macOS) adaptée à l'univers sombre et néon de l'esport. Il crée une expérience visuelle premium avec des effets de verre dépoli, des lueurs colorées et une profondeur immersive.

---

## 🎯 Principes de Design

### 1. Glassmorphisme Premium
- **Effet de verre dépoli** : Utilisation intensive de `backdrop-filter: blur()` pour créer une impression de transparence
- **Arrière-plans semi-transparents** : Couleurs avec opacité faible (3-8%)
- **Bordures lumineuses** : Bordures subtiles qui captent la lumière

### 2. Ambiance Néon Sombre
- **Palette sombre** : Fonds quasi-noirs (#0a0a0f à #1a1a28)
- **Accents néon** : Violets, bleus électriques et magentas
- **Lueurs (glow)** : Effets de halo coloré sur les éléments actifs

### 3. Profondeur et Superposition
- **Hiérarchie Z** : Éléments "flottants" au-dessus du fond
- **Ombres douces** : Ombres diffuses pour suggérer la profondeur
- **Orbes de couleur** : Dégradés radiaux dans le fond

---

## 🎨 Palette de Couleurs

### Couleurs de Fond (Void)
```css
--color-void-900: #0a0a0f;  /* Fond le plus profond */
--color-void-800: #0d0d14;  /* Fond principal */
--color-void-700: #12121c;  /* Fond des panneaux */
--color-void-600: #1a1a28;  /* Fond des cartes */
--color-void-500: #252536;  /* Éléments surélevés */
```

### Accents
```css
--color-arcane: #a855f7;    /* Violet principal */
--color-electric: #3b82f6;  /* Bleu électrique */
--color-neon: #d946ef;      /* Magenta */
```

### Couleurs de Verre
```css
--glass-bg: rgba(255, 255, 255, 0.03);
--glass-border: rgba(255, 255, 255, 0.08);
--glass-blur: 12px;
```

---

## 📦 Composants

### GlassCard
Carte de base avec effet glassmorphisme.

```jsx
import { GlassCard } from './components/ui';

// Utilisation basique
<GlassCard>
  <h2>Titre</h2>
  <p>Contenu</p>
</GlassCard>

// Avec options
<GlassCard 
  variant="glow"       // 'default' | 'subtle' | 'glow' | 'solid'
  hover="lift"         // 'default' | 'lift' | 'glow' | 'scale' | 'none'
  padding="lg"         // 'none' | 'sm' | 'md' | 'lg' | 'xl'
  rounded="xl"         // 'md' | 'lg' | 'xl' | '2xl'
>
  <Content />
</GlassCard>
```

### GlassButton
Bouton avec effet de verre.

```jsx
import { GlassButton } from './components/ui';

<GlassButton variant="primary" size="lg">
  Click me
</GlassButton>
```

### FilterChip
Pilule de filtre pour les interfaces de sélection.

```jsx
import { FilterChip } from './components/ui';

<FilterChip active={isActive} onClick={handleClick}>
  Assassins
</FilterChip>
```

### ChampionCard
Carte de champion avec image, overlay gradient et effet de survol.

```jsx
import ChampionCard from './components/ChampionCard';

<ChampionCard champion={{
  id: 1,
  name: 'Ahri',
  title: 'The Nine-Tailed Fox',
  role: 'mage',
  image_url: '...'
}} />
```

---

## 🏗️ Structure des Fichiers

```
Front/src/
├── components/
│   ├── ui/                    # Composants UI réutilisables
│   │   ├── GlassCard.jsx
│   │   ├── GlassButton.jsx
│   │   ├── FilterChip.jsx
│   │   └── index.js
│   ├── icons/                 # Icônes SVG personnalisées
│   │   ├── Icons.jsx
│   │   └── index.js
│   ├── layout/                # Composants de layout
│   │   ├── Layout.jsx
│   │   ├── Sidebar.jsx
│   │   └── index.js
│   └── ChampionCard.jsx
├── pages/
│   ├── Home.jsx
│   ├── Champions.jsx
│   └── ...
└── styles/
    └── index.css              # Styles globaux + Tailwind
```

---

## ⚙️ Configuration Tailwind

Le fichier `tailwind.config.js` étend le thème par défaut avec :

### Couleurs personnalisées
- `void-*` : Échelle de gris sombres
- `arcane-*` : Violets
- `electric-*` : Bleus
- `neon-*` : Magentas
- `glass-*` : Transparences pour le verre

### Ombres personnalisées
- `glass` : Ombre douce pour cartes
- `glow-arcane` : Lueur violette
- `card-hover` : Ombre au survol

### Animations
- `glow-pulse` : Pulsation de lueur
- `float` : Effet de flottement
- `shimmer` : Effet de brillance

---

## 🎭 Classes CSS Utilitaires

### Dans `index.css`

```css
/* Carte en verre */
.glass-card { ... }

/* Panneau en verre */
.glass-panel { ... }

/* Bouton en verre */
.glass-button { ... }

/* Effets de lueur */
.glow-arcane { ... }
.glow-icon { ... }

/* Icône de navigation */
.nav-icon { ... }
.nav-icon.active { ... }

/* Carte de champion */
.champion-card-glass { ... }

/* Texte en dégradé */
.text-gradient { ... }

/* Fond cosmique */
.bg-cosmic { ... }
```

---

## 🚀 Utilisation

### Import des composants
```jsx
import { GlassCard, GlassButton, FilterChip } from './components/ui';
import { Layout } from './components/layout';
import { HomeIcon, GridIcon, SearchIcon } from './components/icons';
```

### Exemple de page
```jsx
function MyPage() {
  return (
    <div className="p-8">
      <GlassCard padding="lg" hover="lift">
        <h1 className="text-2xl font-bold text-white mb-4">
          Mon titre
        </h1>
        <p className="text-white/60">
          Contenu de la page...
        </p>
        <GlassButton variant="primary" className="mt-4">
          Action
        </GlassButton>
      </GlassCard>
    </div>
  );
}
```

---

## 📱 Responsive

Le design est responsive avec des breakpoints Tailwind :
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

La grille de champions s'adapte automatiquement :
```css
grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5
```

---

## 🛠️ Installation

1. **Installer les dépendances Tailwind** :
```bash
bun add -D tailwindcss postcss autoprefixer
```

2. **Les fichiers de config sont déjà créés** :
   - `tailwind.config.js`
   - `postcss.config.js`

3. **Lancer le serveur de dev** :
```bash
bun run dev
```

---

## 🎨 Bonnes Pratiques

1. **Toujours utiliser les composants UI** pour maintenir la cohérence
2. **Préférer les classes Tailwind** aux styles inline
3. **Utiliser les variables CSS** pour les couleurs récurrentes
4. **Tester sur fond sombre** - le design est optimisé pour les thèmes dark
5. **Optimiser les images** - utiliser le lazy loading pour les cartes
