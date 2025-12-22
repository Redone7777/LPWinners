import { useNavigate } from 'react-router-dom';
import { UserIcon, ChevronLeftIcon } from '../../components/icons';
import { useAuth } from '../../shared/context/AuthContext';

function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  if (!user) return null; // Normalement géré par le routing mais sécurité

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
            <h1 className="text-2xl font-bold text-white">Mon Profil</h1>
            <p className="text-white/50 text-sm">Gérez vos informations personnelles</p>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────────────
          Carte profil
      ───────────────────────────────────────────────────────────────────────── */}
      <div className="
        bg-white/[0.04] backdrop-blur-xl
        border border-white/[0.08]
        rounded-2xl p-6
        mb-6
      ">
        <div className="flex items-center gap-6">
          {/* Avatar */}
          <div className="
            w-24 h-24 rounded-full
            bg-arcane-500/20
            border-2 border-arcane-500/30
            flex items-center justify-center
          ">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-full h-full rounded-full object-cover"
                draggable="false"
              />
            ) : (
              <UserIcon size={40} className="text-arcane-400" />
            )}
          </div>

          {/* Infos */}
          <div>
            <h2 className="text-2xl font-bold text-white">
              {user.name}
            </h2>
            <p className="text-white/60 mt-1">
              {user.email}
            </p>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────
          Paramètres
      ───────────────────────────────────────────────────────────────────────── */}
      <div className="
        bg-white/[0.04] backdrop-blur-xl
        border border-white/[0.08]
        rounded-2xl p-6
      ">
        <h3 className="text-lg font-semibold text-white mb-4">
          Paramètres du compte
        </h3>
        
        <div className="space-y-4">
          <button className="
            w-full text-left px-4 py-3
            bg-white/[0.02] hover:bg-white/[0.06]
            border border-white/[0.06]
            rounded-xl
            text-white/80 hover:text-white
            transition-all duration-300
          ">
            Modifier le profil
          </button>
          
          <button className="
            w-full text-left px-4 py-3
            bg-white/[0.02] hover:bg-white/[0.06]
            border border-white/[0.06]
            rounded-xl
            text-white/80 hover:text-white
            transition-all duration-300
          ">
            Préférences de notification
          </button>
          
          <button 
            onClick={logout}
            className="
            w-full text-left px-4 py-3
            bg-red-500/10 hover:bg-red-500/20
            border border-red-500/20
            rounded-xl
            text-red-400 hover:text-red-300
            transition-all duration-300
          ">
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
