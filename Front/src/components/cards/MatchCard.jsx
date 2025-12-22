function MatchCard({ match }) {
  return (
    <div className="match-card">
      <div className="match-info">
        <p>{match.game_mode}</p>
        <p>{new Date(match.played_at).toLocaleDateString()}</p>
      </div>
      <div className="match-result">
        {/* Résultat du match */}
      </div>
    </div>
  );
}

export default MatchCard;
