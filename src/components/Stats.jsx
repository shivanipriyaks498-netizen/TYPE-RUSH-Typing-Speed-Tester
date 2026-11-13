
function Stats({ timeLeft, wpm, accuracy, typedCount, totalCount }) {
  return (
    <div className="stats">

      <div className="stat-card">
        <h3>Time Left</h3>
        <h2>{timeLeft}s</h2>
      </div>

      <div className="stat-card">
        <h3>WPM</h3>
        <h2>{wpm}</h2>
      </div>

      <div className="stat-card">
        <h3>Accuracy</h3>
        <h2>{accuracy}%</h2>
      </div>

      <div className="stat-card">
        <h3>Characters</h3>
        <h2>{typedCount}/{totalCount}</h2>
      </div>

    </div>
  );
}

export default Stats;
