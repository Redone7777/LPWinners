import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import Home from './pages/Home';
import Champions from './pages/Champions';
import ChampionDetail from './pages/ChampionDetail';
import Profile from './pages/Profile';
import Forum from './pages/Forum';
import ForumPost from './pages/ForumPost';
import ProStats from './pages/ProStats';
import Login from './pages/Login';
import './styles/index.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route sans layout pour la page de connexion */}
        <Route path="/login" element={<Login />} />
        
        {/* Routes avec layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/champions" element={<Champions />} />
          <Route path="/champions/:id" element={<ChampionDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:name" element={<Profile />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/forum/:id" element={<ForumPost />} />
          <Route path="/pro-stats" element={<ProStats />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;