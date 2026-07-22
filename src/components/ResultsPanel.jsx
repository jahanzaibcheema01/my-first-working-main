export default function ResultsPanel({ results }) {
  return (
    <div className="panel results">
      <h2>🏆 Results</h2>
      {results.length === 0 ? (
        <div className="none">No spins yet.</div>
      ) : (
        <ol>
          {[...results].reverse().map((name, i) => (
            <li key={results.length - 1 - i}>{name}</li>
          ))}
        </ol>
      )}
    </div>
  )
}
