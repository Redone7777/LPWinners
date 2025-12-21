/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🏆 Champions - Page de liste des champions Liquid Glass
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Page complète avec :
 * - Header avec titre et filtres dropdown
 * - Barre de filtres par catégorie (All, Assassins, Fighters, etc.)
 * - Sidebar de filtres avancés (Position, Cost, Release date)
 * - Grille de cartes de champions
 */

import { useState, useEffect } from 'react';
import ChampionCard from '../components/ChampionCard';
import { GlassCard, FilterChip } from '../components/ui';
import { 
  ChevronLeftIcon, 
  ChevronDownIcon,
  BellIcon,
  TopLaneIcon,
  JungleIcon,
  MidLaneIcon,
  BotLaneIcon,
  SupportIcon,
  MarksmanIcon
} from '../components/icons';

// Données de démonstration (à remplacer par l'API)
const DEMO_CHAMPIONS = [
  { id: 1, name: 'Evelynn', title: "Agony's embrace", role: 'assassin', image_url: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Evelynn_0.jpg' },
  { id: 2, name: 'Taric', title: 'The shield of valoran', role: 'support', image_url: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Taric_0.jpg' },
  { id: 3, name: 'Briar', title: 'The restrained hunger', role: 'fighter', image_url: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Briar_0.jpg' },
  { id: 4, name: 'Vayne', title: 'The night hunter', role: 'marksman', image_url: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Vayne_0.jpg' },
  { id: 5, name: 'Fiora', title: 'The grand duelist', role: 'fighter', image_url: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Fiora_0.jpg' },
  { id: 6, name: 'Lillia', title: 'The bashful bloom', role: 'mage', image_url: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lillia_0.jpg' },
  { id: 7, name: 'Ahri', title: 'The nine-tailed fox', role: 'mage', image_url: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg' },
  { id: 8, name: 'Jinx', title: 'The loose cannon', role: 'marksman', image_url: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jinx_0.jpg' },
];

const ROLE_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'assassin', label: 'Assassins' },
  { id: 'fighter', label: 'Fighters' },
  { id: 'mage', label: 'Mages' },
  { id: 'marksman', label: 'Marksmen' },
  { id: 'support', label: 'Supports' },
  { id: 'tank', label: 'Tanks' },
];

const POSITION_FILTERS = [
  { id: 'all', label: 'All', icon: null },
  { id: 'top', label: 'Top line', icon: TopLaneIcon },
  { id: 'support', label: 'Support', icon: SupportIcon },
  { id: 'jungle', label: 'Forest', icon: JungleIcon },
  { id: 'bot', label: 'Dragon line', icon: BotLaneIcon },
];

function Champions() {
  const [champions, setChampions] = useState(DEMO_CHAMPIONS);
  const [loading, setLoading] = useState(false);
  const [activeRole, setActiveRole] = useState('all');
  const [activePosition, setActivePosition] = useState('all');
  const [priceRange, setPriceRange] = useState([480, 6800]);

  useEffect(() => {
    // TODO: Fetch champions from API
    // setLoading(true);
    // fetch('/api/champions').then(...)
  }, []);

  // Filtrage des champions
  const filteredChampions = champions.filter(champ => {
    if (activeRole !== 'all' && champ.role !== activeRole) return false;
    return true;
  });

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* ═══════════════════════════════════════════════════════════════════
          HEADER
      ═══════════════════════════════════════════════════════════════════ */}
      <header className="flex items-center justify-between mb-8">
        {/* Bouton retour + Titre */}
        <div className="flex items-center gap-4">
          <button className="
            p-2 rounded-xl
            bg-white/[0.05] border border-white/10
            text-white/60
            hover:bg-white/[0.08] hover:text-white/90
            transition-all duration-200
          ">
            <ChevronLeftIcon size={20} />
          </button>
          <h1 className="text-2xl font-bold text-white">Champions list</h1>
        </div>
        
        {/* Actions droite */}
        <div className="flex items-center gap-3">
          <button className="
            p-2.5 rounded-xl
            bg-white/[0.05] border border-white/10
            text-white/60
            hover:bg-white/[0.08] hover:text-white/90
            transition-all duration-200
          ">
            <BellIcon size={20} />
          </button>
          <div className="
            w-10 h-10 rounded-full
            bg-gradient-to-br from-arcane-400 to-electric-500
            overflow-hidden
            border-2 border-white/20
          ">
            <img 
              src="https://i.pravatar.cc/100" 
              alt="User" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      <div className="flex gap-6">
        {/* ═══════════════════════════════════════════════════════════════════
            SIDEBAR FILTRES (Gauche)
        ═══════════════════════════════════════════════════════════════════ */}
        <aside className="
          hidden lg:block
          w-64 flex-shrink-0
        ">
          <GlassCard padding="lg" className="sticky top-6">
            {/* Difficulté */}
            <FilterSection title="Difficult" defaultOpen={false}>
              <input 
                type="range" 
                min="1" 
                max="10" 
                className="w-full accent-arcane-500"
              />
            </FilterSection>
            
            {/* Position */}
            <FilterSection title="Position" defaultOpen={true}>
              <div className="space-y-2">
                {POSITION_FILTERS.map((pos) => (
                  <label 
                    key={pos.id}
                    className="
                      flex items-center gap-3 
                      py-2 px-3 
                      rounded-xl
                      cursor-pointer
                      transition-all duration-200
                      hover:bg-white/[0.05]
                    "
                  >
                    <input 
                      type="radio" 
                      name="position"
                      checked={activePosition === pos.id}
                      onChange={() => setActivePosition(pos.id)}
                      className="
                        w-4 h-4 
                        accent-arcane-500
                        bg-void-600 
                        border-white/20
                      "
                    />
                    {pos.icon && <pos.icon size={18} className="text-white/50" />}
                    <span className="text-sm text-white/70">{pos.label}</span>
                  </label>
                ))}
              </div>
            </FilterSection>
            
            {/* Coût */}
            <FilterSection title="Cost" defaultOpen={true}>
              <div className="space-y-3">
                <input 
                  type="range" 
                  min="450" 
                  max="7800" 
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-arcane-500"
                />
                <div className="flex justify-between text-xs text-white/50">
                  <span>{priceRange[0]} RP</span>
                  <span>{priceRange[1]} RP</span>
                </div>
              </div>
            </FilterSection>
            
            {/* Date de sortie */}
            <FilterSection title="Realise date" defaultOpen={false}>
              <div className="text-sm text-white/50">Coming soon...</div>
            </FilterSection>
          </GlassCard>
        </aside>

        {/* ═══════════════════════════════════════════════════════════════════
            CONTENU PRINCIPAL
        ═══════════════════════════════════════════════════════════════════ */}
        <div className="flex-1">
          {/* ─────────────────────────────────────────────────────────────────
              Filtres dropdown (en ligne)
          ───────────────────────────────────────────────────────────────────── */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <DropdownFilter 
              icon={<BotLaneIcon size={16} />}
              label="Position"
              value="DRAGON LINE"
            />
            <DropdownFilter 
              icon={<MarksmanIcon size={16} />}
              label="Role"
              value="MARKSMAN"
            />
            <DropdownFilter 
              label="Region"
              value="BILGEWATER"
            />
            <div className="ml-auto flex items-center gap-2 text-sm text-white/50">
              <span>Difficult</span>
              <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-gradient-to-r from-arcane-500 to-electric-500" />
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────────
              Grille de champions
          ───────────────────────────────────────────────────────────────────── */}
          <GlassCard padding="lg" variant="subtle">
            <div className="
              grid gap-4
              grid-cols-2 
              sm:grid-cols-3 
              lg:grid-cols-3 
              xl:grid-cols-4
              2xl:grid-cols-5
            ">
              {filteredChampions.map((champion) => (
                <ChampionCard key={champion.id} champion={champion} />
              ))}
            </div>
            
            {filteredChampions.length === 0 && (
              <div className="text-center py-12 text-white/50">
                No champions found with current filters.
              </div>
            )}
          </GlassCard>
          
          {/* ─────────────────────────────────────────────────────────────────
              Barre de filtres par rôle (bas de page)
          ───────────────────────────────────────────────────────────────────── */}
          <div className="
            flex justify-center items-center gap-2
            mt-6 p-2
            bg-white/[0.03] backdrop-blur-lg
            border border-white/[0.06]
            rounded-full
            max-w-max mx-auto
          ">
            {ROLE_FILTERS.map((role) => (
              <FilterChip
                key={role.id}
                active={activeRole === role.id}
                onClick={() => setActiveRole(role.id)}
              >
                {role.label}
              </FilterChip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * FilterSection - Section de filtre dans la sidebar
 */
const FilterSection = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="border-b border-white/[0.06] py-4 first:pt-0 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center justify-between w-full
          text-sm font-medium text-white/80
          hover:text-white
          transition-colors
        "
      >
        {title}
        <ChevronDownIcon 
          size={16} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      
      {isOpen && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  );
};

/**
 * DropdownFilter - Filtre dropdown en ligne
 */
const DropdownFilter = ({ icon, label, value }) => {
  return (
    <button className="
      flex items-center gap-2 px-4 py-2.5
      bg-white/[0.05] backdrop-blur-lg
      border border-white/[0.1]
      rounded-xl
      text-sm
      hover:bg-white/[0.08] hover:border-white/[0.15]
      transition-all duration-200
      group
    ">
      {icon && <span className="text-white/50">{icon}</span>}
      <div className="text-left">
        <div className="text-[10px] text-white/40 uppercase tracking-wider">{label}</div>
        <div className="text-white/90 font-medium">{value}</div>
      </div>
      <ChevronDownIcon size={14} className="text-white/40 ml-2" />
    </button>
  );
};

export default Champions;
