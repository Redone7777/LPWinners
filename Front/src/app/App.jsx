import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Layout } from '../components/layout';
import { AuthProvider, useAuth } from '../shared/context/AuthContext';
import PageTransition from '../components/common/PageTransition';
import Home from '../pages/user/Home';
import GameData from '../pages/game/GameData';
import ChampionDetail from '../pages/champions/ChampionDetail';
import Profile from '../pages/user/Profile';
import Players from '../pages/community/Players';
import Notifications from '../pages/user/Notifications';
import Forum from '../pages/community/Forum';
import ForumPost from '../pages/community/ForumPost';
import ProStats from '../pages/game/ProStats';
import Auth from '../pages/auth/Auth';
import '../styles/index.css';

// Route protégée : accessible uniquement si connecté
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

// Route publique : accessible uniquement si NON connecté (ex: login)
const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/profile" /> : children;
};

// Composant wrapper pour les routes avec transitions
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/login" element={<PageTransition><PublicRoute><Auth /></PublicRoute></PageTransition>} />
        <Route path="/game-data" element={<PageTransition><GameData /></PageTransition>} />
        <Route path="/champions/:id" element={<PageTransition><ChampionDetail /></PageTransition>} />
        <Route path="/players" element={<PageTransition><Players /></PageTransition>} />
        <Route path="/players/:name" element={<PageTransition><Players /></PageTransition>} />
        <Route path="/profile" element={<PageTransition><PrivateRoute><Profile /></PrivateRoute></PageTransition>} />
        <Route path="/notifications" element={<PageTransition><Notifications /></PageTransition>} />
        <Route path="/forum" element={<PageTransition><Forum /></PageTransition>} />
        <Route path="/forum/:id" element={<PageTransition><ForumPost /></PageTransition>} />
        <Route path="/pro-stats" element={<PageTransition><ProStats /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
