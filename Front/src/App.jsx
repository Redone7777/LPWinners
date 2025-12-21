import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import Home from './pages/Home';
import Champions from './pages/Champions';
import ChampionDetail from './pages/ChampionDetail';
import Profile from './pages/Profile';
import Forum from './pages/Forum';
import ForumPost from './pages/ForumPost';
import ProStats from './pages/ProStats';
import './styles/index.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/champions" element={<Champions />} />
          <Route path="/champions/:id" element={<ChampionDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:name" element={<Profile />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/forum/:id" element={<ForumPost />} />
          <Route path="/pro-stats" element={<ProStats />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;