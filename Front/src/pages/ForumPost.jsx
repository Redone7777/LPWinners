import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, ChatIcon } from '../components/icons';

function ForumPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    // TODO: Fetch post details from API
  }, [id]);

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* ═══════════════════════════════════════════════════════════════════
          HEADER
      ═══════════════════════════════════════════════════════════════════ */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/forum')}
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
            <h1 className="text-2xl font-bold text-white">
              {post ? post.title : 'Chargement...'}
            </h1>
            <p className="text-white/50 text-sm">Discussion du forum</p>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════
          CONTENU
      ═══════════════════════════════════════════════════════════════════ */}
      {post ? (
        <div className="
          bg-white/[0.04] backdrop-blur-xl
          border border-white/[0.08]
          rounded-2xl p-6
        ">
          {/* Contenu du post */}
          <div className="text-white/80">
            {post.content}
          </div>
          
          {/* Section commentaires */}
          <div className="mt-8 pt-6 border-t border-white/[0.08]">
            <h3 className="text-lg font-semibold text-white mb-4">Commentaires</h3>
            {/* Liste des commentaires */}
          </div>
        </div>
      ) : (
        <div className="
          text-center py-16
          text-white/40
        ">
          <ChatIcon size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg">
            Chargement du post...
          </p>
        </div>
      )}
    </div>
  );
}

export default ForumPost;
