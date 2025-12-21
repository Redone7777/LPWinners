import { useState, useEffect } from 'react';

function ProStats() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // TODO: Fetch pro matches from API
  }, []);

  return (
    <div className="pro-stats">
      <h1>Statistiques Pro</h1>
      <div className="matches-list">
        {/* Liste des matchs pro */}
      </div>
    </div>
  );
}

export default ProStats;
