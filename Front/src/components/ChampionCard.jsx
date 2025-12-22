/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎮 ChampionCard - Carte de champion Liquid Glass
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Carte premium avec effet glassmorphisme pour afficher les champions
 * Inspirée de image_0.png et image_1.png
 */

import { Link } from 'react-router-dom';
import { MarksmanIcon, MageIcon, AssassinIcon, FighterIcon, TankIcon, SupportClassIcon } from './icons';

// Map des icônes de rôle
const roleIcons = {
  marksman: MarksmanIcon,
  mage: MageIcon,
  assassin: AssassinIcon,
  fighter: FighterIcon,
  tank: TankIcon,
  support: SupportClassIcon,
};

function ChampionCard({ champion }) {
  // Icône de rôle (fallback sur marksman)
  const RoleIcon = roleIcons[champion.role?.toLowerCase()] || MarksmanIcon;
  
  return (
    <Link 
      to={`/champions/${champion.id}`} 
      className="
        group relative block
        aspect-[4/5]
        rounded-2xl
        overflow-hidden
        cursor-pointer
        transition-all duration-500 ease-out
        hover:-translate-y-2 hover:scale-[1.02]
        hover:shadow-[0_25px_50px_rgba(0,0,0,0.5),0_0_40px_rgba(168,85,247,0.15)]
      "
    >
      {/* ─────────────────────────────────────────────────────────────────────
          Image du champion
      ───────────────────────────────────────────────────────────────────────── */}
      <img 
        src={champion.image_url || `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.name}_0.jpg`}
        alt={champion.name}
        className="
          w-full h-full object-cover
          transition-transform duration-700 ease-out
          group-hover:scale-110
        "
        loading="lazy"
        draggable="false"
      />
      
      {/* ─────────────────────────────────────────────────────────────────────
          Overlay gradient (bas de la carte)
      ───────────────────────────────────────────────────────────────────────── */}
      <div 
        className="
          absolute inset-0
          bg-gradient-to-t from-void-900/95 via-void-900/40 to-transparent
          pointer-events-none
        "
      />
      
      {/* ─────────────────────────────────────────────────────────────────────
          Bordure en verre
      ───────────────────────────────────────────────────────────────────────── */}
      <div 
        className="
          absolute inset-0
          rounded-2xl
          border border-white/10
          transition-all duration-300
          group-hover:border-arcane-500/40
          group-hover:shadow-[inset_0_0_30px_rgba(168,85,247,0.1)]
          pointer-events-none
        "
      />
      
      {/* ─────────────────────────────────────────────────────────────────────
          Contenu (nom, titre, icône)
      ───────────────────────────────────────────────────────────────────────── */}
      <div className="
        absolute bottom-0 left-0 right-0
        p-4
        flex items-end justify-between
      ">
        {/* Infos du champion */}
        <div>
          <h3 className="
            text-base font-bold
            text-white
            uppercase tracking-wide
            mb-0.5
            group-hover:text-arcane-300
            transition-colors duration-300
          ">
            {champion.name}
          </h3>
          <p className="
            text-xs
            text-white/50
            font-normal
            capitalize
          ">
            {champion.title || 'The Champion'}
          </p>
        </div>
        
        {/* Icône de rôle */}
        <div className="
          w-7 h-7
          flex items-center justify-center
          text-white/50
          transition-all duration-300
          group-hover:text-arcane-400
          group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]
        ">
          <RoleIcon size={20} />
        </div>
      </div>
    </Link>
  );
}

export default ChampionCard;
