import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BellIcon, ChevronLeftIcon } from '../../components/icons';

function Notifications() {
  const navigate = useNavigate();
  const [notifications] = useState([
    // TODO: Fetch notifications from API
  ]);

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
            <h1 className="text-2xl font-bold text-white">Notifications</h1>
            <p className="text-white/50 text-sm">Restez informé des dernières activités</p>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────────────
          Liste des notifications
      ───────────────────────────────────────────────────────────────────────── */}
      {notifications.length > 0 ? (
        <div className="space-y-4">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="
                bg-white/[0.04] backdrop-blur-xl
                border border-white/[0.08]
                rounded-2xl p-4
                flex items-start gap-4
                hover:bg-white/[0.06]
                transition-all duration-300
              "
            >
              <div className="
                p-2 rounded-xl
                bg-arcane-500/20
                text-arcane-400
              ">
                <BellIcon size={20} />
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">
                  {notification.title}
                </p>
                <p className="text-white/60 text-sm mt-1">
                  {notification.message}
                </p>
                <span className="text-white/40 text-xs mt-2 block">
                  {notification.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="
          text-center py-16
          text-white/40
        ">
          <BellIcon size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg">
            Aucune notification pour le moment
          </p>
          <p className="text-sm mt-2">
            Les nouvelles notifications apparaîtront ici
          </p>
        </div>
      )}
    </div>
  );
}

export default Notifications;
