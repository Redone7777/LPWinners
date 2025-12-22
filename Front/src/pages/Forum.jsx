import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, ChatIcon } from '../components/icons';

function Forum() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // TODO: Fetch forum posts from API
  }, []);

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
            <h1 className="text-2xl font-bold text-white">Forum</h1>
            <p className="text-white/50 text-sm">Échangez avec la communauté LP Winners</p>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════
          CONTENU
      ═══════════════════════════════════════════════════════════════════ */}
      {posts.length > 0 ? (
        <div className="space-y-4">
          {/* Liste des posts */}
        </div>
      ) : (
        <div className="
          text-center py-16
          text-white/40
        ">
          <ChatIcon size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg">
            Aucune discussion pour le moment
          </p>
          <p className="text-sm mt-2">
            Soyez le premier à lancer une discussion !
          </p>
        </div>
      )}
    </div>
  );
}

export default Forum;
