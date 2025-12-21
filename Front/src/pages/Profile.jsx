import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Profile() {
  const { name } = useParams();
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    // TODO: Fetch player profile from API
  }, [name]);

  return (
    <div className="profile">
      <h1>Profil Joueur</h1>
      {/* Stats et historique du joueur */}
    </div>
  );
}

export default Profile;
