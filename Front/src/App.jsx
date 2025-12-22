import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import GameData from './pages/GameData';
import ChampionDetail from './pages/ChampionDetail';
import Profile from './pages/Profile';
import Players from './pages/Players';
import Notifications from './pages/Notifications';
import Forum from './pages/Forum';
import ForumPost from './pages/ForumPost';
import ProStats from './pages/ProStats';
import Auth from './pages/Auth';
import './styles/index.css';

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

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<PublicRoute><Auth /></PublicRoute>} />
            <Route path="/game-data" element={<GameData />} />
            <Route path="/champions/:id" element={<ChampionDetail />} />
            <Route path="/players" element={<Players />} />
            <Route path="/players/:name" element={<Players />} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/forum/:id" element={<ForumPost />} />
            <Route path="/pro-stats" element={<ProStats />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
