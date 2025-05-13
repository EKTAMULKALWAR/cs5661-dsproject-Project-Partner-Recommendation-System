import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function Recommendation() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [domain, setDomain] = useState("");
  const [bio, setBio] = useState("");
  const [results, setResults] = useState([]);
  const [bioResults, setBioResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getRecommendations = async () => {
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const response = await axios.post("http://127.0.0.1:5000/recommend", {
        username,
        location,
        domain: domain === "All" ? "" : domain, // <-- KEY FIX

      });
      setResults(response.data);
    } catch (err) {
      console.error("❌ Axios error:", err);
      setError("⚠️ Failed to fetch partner recommendations.");
    } finally {
      setLoading(false);
    }
  };

  const getBioRecommendations = async () => {
    setLoading(true);
    setError("");
    setBioResults([]);

    try {
      const response = await axios.post("http://127.0.0.1:5000/semantic-bio-recommend", {
        bio,
      });
      setBioResults(response.data);
    } catch (err) {
      console.error("❌ Axios error (bio):", err);
      setError("⚠️ Failed to fetch bio-based recommendations.");
    } finally {
      setLoading(false);
    }
  };

 const domainOptions = [
  "DevOps",
  "Web Dev (Ruby)",
  "Sparse",
  "Web Dev",
  "Misc",
  "Systems",
  "Infrastructure",
  "Generalist",
  "Ripple Projects",
  "Game Dev"
];

  return (
    <div className="container">
      <h2>🤝 GitHub Project Partner Recommendation</h2>

      {/* Hybrid Filters */}
      <div className="input-box">
        <input
          type="text"
          placeholder="GitHub Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Preferred Location (Optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <select value={domain} onChange={(e) => setDomain(e.target.value)}>
          {domainOptions.map((d, i) => (
            <option key={i} value={d}>{d || "Any Domain"}</option>
          ))}
        </select>
        <button onClick={getRecommendations} disabled={loading || !username}>
          {loading ? "Loading..." : "Get Partner Matches"}
        </button>
      </div>

      {/* Semantic Bio Filter */}
      <div className="input-box">
        <input
          type="text"
          placeholder="Enter Bio to Get Semantic Matches"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <button onClick={getBioRecommendations} disabled={loading || !bio}>
          {loading ? "Loading..." : "Get Bio Matches"}
        </button>
      </div>

      {error && <div className="error-box">{error}</div>}

      {/* Hybrid Results */}
      {results.length > 0 && (
        <div className="results-box">
          <h3>🎯 Top Hybrid Matches</h3>
          <div className="card-container">
            {results.map((r, i) => (
              <div className="card" key={i}>
                <h4>{r.Username}</h4>
                <p><strong>Score:</strong> {r.hybrid_score?.toFixed(2)}</p>
                {r.Domain_Tag && <p><strong>Domain:</strong> {r.Domain_Tag}</p>}
                {r.Location && <p><strong>Location:</strong> {r.Location}</p>}
                {r.Profile_URL && (
                  <p>
                    <a href={r.Profile_URL} target="_blank" rel="noreferrer">
                      View GitHub Profile
                    </a>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Semantic Bio Results */}
      {bioResults.length > 0 && (
        <div className="results-box">
          <h3>🧠 Semantic Bio Recommendations</h3>
          <div className="card-container">
            {bioResults.map((r, i) => (
              <div className="card" key={i}>
                <h4>{r.Username}</h4>
                <p><strong>Similarity:</strong> {r.similarity.toFixed(2)}</p>
                {r.Location && <p><strong>Location:</strong> {r.Location}</p>}
                {r.Profile_URL && (
                  <p>
                    <a href={r.Profile_URL} target="_blank" rel="noreferrer">
                      View GitHub Profile
                    </a>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Recommendation;
