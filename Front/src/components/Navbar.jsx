import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">LP Winners</Link>
      </div>
      <ul className="navbar-menu">
        <li><Link to="/champions">Champions</Link></li>
        <li><Link to="/profile">Profil</Link></li>
        <li><Link to="/forum">Forum</Link></li>
        <li><Link to="/pro-stats">Stats Pro</Link></li>
        <li><Link to="/login">Connexion</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
