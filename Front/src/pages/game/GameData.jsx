/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎮 GameData - Base de données du jeu (Champions, Items, Sorts, Runes)
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Page centrale contenant toutes les données du jeu :
 * - Champions
 * - Items
 * - Sorts d'invocateur
 * - Runes
 */

import { useState, useEffect } from 'react';
import ChampionCard from '../../components/cards/ChampionCard';
import { GlassCard, FilterChip } from '../../components/ui';
import {
  ChevronLeftIcon,
  ChevronDownIcon,
  GridIcon,
  SearchIcon,
  TopLaneIcon,
  JungleIcon,
  MidLaneIcon,
  BotLaneIcon,
  SupportIcon,
  MarksmanIcon,
  MageIcon,
  AssassinIcon,
  FighterIcon,
  TankIcon
} from '../../components/icons';

// ═══════════════════════════════════════════════════════════════════════════
// DONNÉES DE DÉMONSTRATION
// ═══════════════════════════════════════════════════════════════════════════

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

const DEMO_ITEMS = [
  { id: 1, name: 'Infinity Edge', category: 'damage', gold: 3400, image_url: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/3031.png' },
  { id: 2, name: 'Rabadon\'s Deathcap', category: 'magic', gold: 3600, image_url: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/3089.png' },
  { id: 3, name: 'Thornmail', category: 'tank', gold: 2700, image_url: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/3075.png' },
  { id: 4, name: 'Guardian Angel', category: 'defense', gold: 3200, image_url: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/3026.png' },
];

const DEMO_SPELLS = [
  { id: 1, name: 'Flash', cooldown: 300, image_url: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/spell/SummonerFlash.png' },
  { id: 2, name: 'Ignite', cooldown: 180, image_url: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/spell/SummonerDot.png' },
  { id: 3, name: 'Heal', cooldown: 240, image_url: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/spell/SummonerHeal.png' },
  { id: 4, name: 'Teleport', cooldown: 360, image_url: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/spell/SummonerTeleport.png' },
];

// ═══════════════════════════════════════════════════════════════════════════
// ONGLETS PRINCIPAUX
// ═══════════════════════════════════════════════════════════════════════════

const MAIN_TABS = [
  { id: 'champions', label: 'Champions', icon: GridIcon },
  { id: 'items', label: 'Items', icon: null },
  { id: 'spells', label: 'Sorts', icon: null },
  { id: 'runes', label: 'Runes', icon: null },
];

const ROLE_FILTERS = [
  { id: 'all', label: 'Tous' },
  { id: 'assassin', label: 'Assassins', icon: AssassinIcon },
  { id: 'fighter', label: 'Combattants', icon: FighterIcon },
  { id: 'mage', label: 'Mages', icon: MageIcon },
  { id: 'marksman', label: 'Tireurs', icon: MarksmanIcon },
  { id: 'support', label: 'Supports', icon: SupportIcon },
  { id: 'tank', label: 'Tanks', icon: TankIcon },
];

const POSITION_FILTERS = [
  { id: 'all', label: 'Toutes', icon: null },
  { id: 'top', label: 'Top', icon: TopLaneIcon },
  { id: 'jungle', label: 'Jungle', icon: JungleIcon },
  { id: 'mid', label: 'Mid', icon: MidLaneIcon },
  { id: 'bot', label: 'Bot', icon: BotLaneIcon },
  { id: 'support', label: 'Support', icon: SupportIcon },
];

const ITEM_CATEGORIES = [
  { id: 'all', label: 'Tous' },
  { id: 'damage', label: 'Dégâts' },
  { id: 'magic', label: 'Magie' },
  { id: 'tank', label: 'Tank' },
  { id: 'defense', label: 'Défense' },
];

function GameData() {
  const [activeTab, setActiveTab] = useState('champions');
  const [champions, setChampions] = useState(DEMO_CHAMPIONS);
  const [items, setItems] = useState(DEMO_ITEMS);
  const [spells, setSpells] = useState(DEMO_SPELLS);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRole, setActiveRole] = useState('all');
  const [activePosition, setActivePosition] = useState('all');
  const [activeItemCategory, setActiveItemCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([480, 6800]);

  useEffect(() => {
    // TODO: Fetch data from API based on activeTab
  }, [activeTab]);

  // Filtrage des champions
  const filteredChampions = champions.filter(champ => {
    if (searchQuery && !champ.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (activeRole !== 'all' && champ.role !== activeRole) return false;
    return true;
  });

  // Filtrage des items
  const filteredItems = items.filter(item => {
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (activeItemCategory !== 'all' && item.category !== activeItemCategory) return false;
    return true;
  });

  // Filtrage des sorts
  const filteredSpells = spells.filter(spell => {
    if (searchQuery && !spell.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* ═══════════════════════════════════════════════════════════════════
          HEADER
      ═══════════════════════════════════════════════════════════════════ */}
      <header className="flex items-center justify-between mb-8">
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
          <div>
            <h1 className="text-2xl font-bold text-white">Base de données</h1>
            <p className="text-white/50 text-sm">Champions, Items, Sorts & Runes</p>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════
          ONGLETS PRINCIPAUX + BARRE DE RECHERCHE
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        {/* Onglets */}
        <div className="
          flex items-center gap-2 p-1.5
          bg-white/[0.03] backdrop-blur-lg
          border border-white/[0.06]
          rounded-2xl
        ">
          {MAIN_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSearchQuery('');
              }}
              className={`
                flex items-center gap-2 px-5 py-2.5
                rounded-xl font-medium
                transition-all duration-300
                ${activeTab === tab.id
                  ? 'bg-arcane-500/20 text-arcane-400 shadow-[0_0_20px_rgba(168,85,247,0.2)]' 
                  : 'text-white/50 hover:text-white/80 hover:bg-white/[0.05]' 
                }
              `}
            >
              {tab.icon && <tab.icon size={18} />}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Barre de recherche */}
        <div className="
          relative flex items-center
          w-full sm:w-72
          bg-white/[0.04] backdrop-blur-xl
          border border-white/[0.08]
          rounded-xl
          overflow-hidden
        ">
          <SearchIcon size={18} className="absolute left-3 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Rechercher ${activeTab === 'champions' ? 'un champion' : activeTab === 'items' ? 'un item' : 'un sort'}...`}
            className="
              w-full py-2.5 pl-10 pr-4
              bg-transparent
              text-white placeholder-white/40
              outline-none
              text-sm
            "
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-white/40 hover:text-white/70"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-6">
        {/* ═══════════════════════════════════════════════════════════════════
            SIDEBAR FILTRES
        ═══════════════════════════════════════════════════════════════════ */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <GlassCard padding="lg" className="sticky top-6">
            {activeTab === 'champions' && (
              <>
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
                          className="w-4 h-4 accent-arcane-500"
                        />
                        {pos.icon && <pos.icon size={18} className="text-white/50" />}
                        <span className="text-sm text-white/70">{pos.label}</span>
                      </label>
                    ))}
                  </div>
                </FilterSection>
                
                <FilterSection title="Coût (BE)" defaultOpen={true}>
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
                      <span>{priceRange[0]} BE</span>
                      <span>{priceRange[1]} BE</span>
                    </div>
                  </div>
                </FilterSection>
              </>
            )}

            {activeTab === 'items' && (
              <FilterSection title="Catégorie" defaultOpen={true}>
                <div className="space-y-2">
                  {ITEM_CATEGORIES.map((cat) => (
                    <label 
                      key={cat.id}
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
                        name="itemCategory"
                        checked={activeItemCategory === cat.id}
                        onChange={() => setActiveItemCategory(cat.id)}
                        className="w-4 h-4 accent-arcane-500"
                      />
                      <span className="text-sm text-white/70">{cat.label}</span>
                    </label>
                  ))}
                </div>
              </FilterSection>
            )}

            {(activeTab === 'spells' || activeTab === 'runes') && (
              <div className="text-center py-8 text-white/40">
                <p className="text-sm">Filtres à venir...</p>
              </div>
            )}
          </GlassCard>
        </aside>

        {/* ═══════════════════════════════════════════════════════════════════
            CONTENU PRINCIPAL
        ═══════════════════════════════════════════════════════════════════ */}
        <div className="flex-1">
          {/* ─────────────────────────────────────────────────────────────────
              CHAMPIONS
          ───────────────────────────────────────────────────────────────────── */}
          {activeTab === 'champions' && (
            <>
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
                    Aucun champion trouvé avec ces filtres.
                  </div>
                )}
              </GlassCard>
              
              {/* Filtres par rôle */}
              <div className="
                flex justify-center items-center gap-1.5
                mt-6 p-2
                bg-white/[0.03] backdrop-blur-lg
                border border-white/[0.06]
                rounded-full
                max-w-max mx-auto
                overflow-x-auto
              ">
                {ROLE_FILTERS.map((role) => {
                  const IconComponent = role.icon;
                  return (
                    <button
                      key={role.id}
                      onClick={() => setActiveRole(role.id)}
                      className={`
                        inline-flex items-center gap-1.5 px-4 py-2
                        rounded-full
                        text-sm font-medium
                        transition-all duration-200 ease-out
                        whitespace-nowrap
                        ${activeRole === role.id
                          ? 'bg-white/[0.12] text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]' 
                          : 'text-white/60 hover:text-white/90 hover:bg-white/[0.06]' 
                        }
                      `}
                    >
                      {IconComponent && (
                        <IconComponent 
                          size={14} 
                          className={activeRole === role.id ? 'text-white' : 'text-white/50'} 
                        />
                      )}
                      <span>{role.label}</span>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* ─────────────────────────────────────────────────────────────────
              ITEMS
          ───────────────────────────────────────────────────────────────────── */}
          {activeTab === 'items' && (
            <GlassCard padding="lg" variant="subtle">
              <div className="
                grid gap-4
                grid-cols-3 
                sm:grid-cols-4 
                lg:grid-cols-5 
                xl:grid-cols-6
              ">
                {filteredItems.map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
              
              {filteredItems.length === 0 && (
                <div className="text-center py-12 text-white/50">
                  Aucun item trouvé avec ces filtres.
                </div>
              )}
            </GlassCard>
          )}

          {/* ─────────────────────────────────────────────────────────────────
              SORTS
          ───────────────────────────────────────────────────────────────────── */}
          {activeTab === 'spells' && (
            <GlassCard padding="lg" variant="subtle">
              <div className="
                grid gap-4
                grid-cols-2 
                sm:grid-cols-3 
                lg:grid-cols-4
              ">
                {filteredSpells.map((spell) => (
                  <SpellCard key={spell.id} spell={spell} />
                ))}
              </div>
              
              {filteredSpells.length === 0 && (
                <div className="text-center py-12 text-white/50">
                  Aucun sort trouvé avec cette recherche.
                </div>
              )}
            </GlassCard>
          )}

          {/* ─────────────────────────────────────────────────────────────────
              RUNES
          ───────────────────────────────────────────────────────────────────── */}
          {activeTab === 'runes' && (
            <GlassCard padding="lg" variant="subtle">
              <div className="text-center py-16 text-white/50">
                <MageIcon size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg">Runes à venir...</p>
                <p className="text-sm mt-2">Cette section sera bientôt disponible</p>
              </div>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPOSANTS AUXILIAIRES
// ═══════════════════════════════════════════════════════════════════════════

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
 * ItemCard - Carte pour un item
 */
const ItemCard = ({ item }) => {
  return (
    <div className="
      group relative
      bg-white/[0.03] hover:bg-white/[0.08]
      border border-white/[0.06] hover:border-arcane-500/30
      rounded-xl p-3
      cursor-pointer
      transition-all duration-300
      hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]
    ">
      <div className="
        w-full aspect-square
        rounded-lg overflow-hidden
        bg-void-800
        mb-2
      ">
        <img 
          src={item.image_url} 
          alt={item.name}
          className="w-full h-full object-cover"
          draggable="false"
        />
      </div>
      <h3 className="text-sm font-medium text-white/90 truncate">
        {item.name}
      </h3>
      <p className="text-xs text-gold-400 mt-1">
        {item.gold} gold
      </p>
    </div>
  );
};

/**
 * SpellCard - Carte pour un sort d'invocateur
 */
const SpellCard = ({ spell }) => {
  return (
    <div className="
      group relative
      bg-white/[0.03] hover:bg-white/[0.08]
      border border-white/[0.06] hover:border-arcane-500/30
      rounded-xl p-4
      cursor-pointer
      transition-all duration-300
      hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]
      flex items-center gap-4
    ">
      <div className="
        w-14 h-14 flex-shrink-0
        rounded-lg overflow-hidden
        bg-void-800
      ">
        <img 
          src={spell.image_url} 
          alt={spell.name}
          className="w-full h-full object-cover"
          draggable="false"
        />
      </div>
      <div>
        <h3 className="text-base font-medium text-white/90">
          {spell.name}
        </h3>
        <p className="text-sm text-white/50 mt-1">
          Cooldown: {spell.cooldown}s
        </p>
      </div>
    </div>
  );
};

export default GameData;