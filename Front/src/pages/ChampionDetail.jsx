import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ChampionDetail() {
  const { id } = useParams();
  const [champion, setChampion] = useState(null);

  useEffect(() => {
    // TODO: Fetch champion details from API
  }, [id]);

  return (
    <div className="champion-detail">
      <h1>Détails du Champion</h1>
      {/* Détails du champion */}
    </div>
  );
}

export default ChampionDetail;
