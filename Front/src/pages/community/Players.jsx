import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SearchIcon, ChevronLeftIcon } from '../../components/icons';

function Players() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);
  const [searchQuery, setSearchQuery] = useState(name || '');

  useEffect(() => {
    if (name) {
      // TODO: Fetch player profile from API
      setSearchQuery(name);
    }
  }, [name]);

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* ═══════════════════════════════════════════════════════════════════
          HEADER
      ═══════════════════════════════════════════════════════════════════ */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="
              p-2 rounded-xl
              bg-white/[0.05] border border-white/10
              text-white/60
              hover:bg-white/[0.08] hover:text-white/90
              transition-all duration-200
            "
          >
            <ChevronLeftIcon size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Rechercher un Joueur</h1>
            <p className="text-white/50 text-sm">Trouvez des joueurs et consultez leurs statistiques</p>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────────────
          Barre de recherche
      ───────────────────────────────────────────────────────────────────────── */}
      <div className="
        relative mb-8
        bg-white/[0.04] backdrop-blur-xl
        border border-white/[0.08]
        rounded-2xl
        overflow-hidden
      ">
        <div className="flex items-center px-4 py-3">
          <SearchIcon size={20} className="text-white/40 mr-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Entrez le nom d'invocateur..."
            className="
              flex-1 bg-transparent
              text-white placeholder-white/40
              outline-none
              text-lg
            "
          />
          <button className="
            px-6 py-2
            bg-arcane-500/20 hover:bg-arcane-500/30
            border border-arcane-500/30
            rounded-xl
            text-arcane-400 font-medium
            transition-all duration-300
          ">
            Rechercher
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────
          Résultats / Profil joueur
      ───────────────────────────────────────────────────────────────────────── */}
      {player ? (
        <div className="
          bg-white/[0.04] backdrop-blur-xl
          border border-white/[0.08]
          rounded-2xl p-6
        ">
          <h2 className="text-xl font-bold text-white mb-4">
            Profil de {player.name}
          </h2>
          {/* Stats et historique du joueur */}
        </div>
      ) : (
        <div className="
          text-center py-16
          text-white/40
        ">
          <SearchIcon size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg">
            Recherchez un joueur pour voir son profil
          </p>
        </div>
      )}
    </div>
  );
}

export default Players;
