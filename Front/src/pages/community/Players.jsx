import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SearchIcon, ChevronLeftIcon } from '../../components/icons';
import { GlassCard } from '../../components/ui';
import { searchPlayer, getPlayerMatches } from '../../shared/services/api';

function Players() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);
  const [matches, setMatches] = useState([]);
  const [searchQuery, setSearchQuery] = useState(name || '');
  const [region, setRegion] = useState('EUW');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const playerData = await searchPlayer(searchQuery, region);
      setPlayer(playerData);

      // Charger l'historique des matchs
      if (playerData.id) {
        const matchesData = await getPlayerMatches(playerData.id);
        setMatches(matchesData);
      }
    } catch (err) {
      console.error('Erreur lors de la recherche du joueur:', err);
      setError('Joueur introuvable. Vérifiez le nom et la région.');
      setPlayer(null);
      setMatches([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (name) {
      setSearchQuery(name);
      // Ne pas appeler handleSearch automatiquement car le backend n'est pas prêt
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
        <div className="flex items-center gap-4 px-4 py-3">
          <SearchIcon size={20} className="text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Entrez le nom d'invocateur..."
            className="
              flex-1 bg-transparent
              text-white placeholder-white/40
              outline-none
              text-lg
            "
          />
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="
              bg-white/[0.08] border border-white/[0.08]
              rounded-lg px-3 py-2
              text-white text-sm
              outline-none
            "
          >
            <option value="EUW">EUW</option>
            <option value="NA">NA</option>
            <option value="KR">KR</option>
            <option value="EUNE">EUNE</option>
          </select>
          <button
            onClick={handleSearch}
            disabled={loading}
            className="
              px-6 py-2
              bg-arcane-500/20 hover:bg-arcane-500/30
              border border-arcane-500/30
              rounded-xl
              text-arcane-400 font-medium
              transition-all duration-300
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {loading ? 'Recherche...' : 'Rechercher'}
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────
          Résultats / Profil joueur
      ───────────────────────────────────────────────────────────────────────── */}

      {/* Error Message */}
      {error && (
        <div className="
          mb-4 p-4 rounded-xl
          bg-red-500/10 border border-red-500/30
          text-red-400 text-sm
        ">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <GlassCard padding="lg">
          <div className="text-center py-12">
            <div className="
              w-12 h-12 mx-auto mb-4
              border-4 border-arcane-500/30 border-t-arcane-500
              rounded-full animate-spin
            " />
            <p className="text-white/50">Recherche en cours...</p>
          </div>
        </GlassCard>
      )}

      {/* Player Profile */}
      {!loading && player && (
        <div className="space-y-6">
          <GlassCard padding="lg">
            <div className="flex items-start gap-6">
              {player.avatar && (
                <img
                  src={player.avatar}
                  alt={player.name}
                  className="w-24 h-24 rounded-xl"
                />
              )}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {player.name}
                </h2>
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 rounded-lg bg-arcane-500/20 border border-arcane-500/30 text-arcane-400 text-sm font-semibold">
                    {player.rank || 'Unranked'}
                  </span>
                  {player.level && (
                    <span className="text-white/60 text-sm">
                      Niveau {player.level}
                    </span>
                  )}
                </div>
                {player.winrate && (
                  <div className="mt-4">
                    <p className="text-sm text-white/50 mb-1">Taux de victoire</p>
                    <p className="text-xl font-bold text-white">{player.winrate}%</p>
                  </div>
                )}
              </div>
            </div>
          </GlassCard>

          {/* Match History */}
          {matches.length > 0 && (
            <GlassCard padding="lg">
              <h3 className="text-xl font-bold text-white mb-4">Historique des matchs</h3>
              <div className="space-y-3">
                {matches.map((match, index) => (
                  <div
                    key={index}
                    className="
                      p-4 rounded-lg
                      bg-white/[0.03] border border-white/[0.06]
                    "
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className={`
                          px-3 py-1 rounded text-sm font-semibold
                          ${match.win
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                          }
                        `}>
                          {match.win ? 'Victoire' : 'Défaite'}
                        </span>
                        <div>
                          <p className="text-white font-medium">{match.champion}</p>
                          <p className="text-white/50 text-sm">{match.kda}</p>
                        </div>
                      </div>
                      <p className="text-white/40 text-sm">{match.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}
        </div>
      )}

      {/* Empty State */}
      {!loading && !player && !error && (
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
