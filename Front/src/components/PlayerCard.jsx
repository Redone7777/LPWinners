function PlayerCard({ player }) {
  return (
    <div className="player-card">
      <h3>{player.summoner_name}</h3>
      <p>Région: {player.region}</p>
      <p>Rank: {player.rank_tier}</p>
      <p>Win Rate: {player.wins}/{player.losses}</p>
    </div>
  );
}

export default PlayerCard;
