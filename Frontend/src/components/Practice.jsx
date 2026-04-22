import { Link } from "react-router-dom";
import { PRACTICES } from "../data/constants.js";

export default function Practice() {
  return (
    <section id="practice" className="section practice-section">
      <div className="sec-label">06 — PRACTICE</div>
      <div className="sec-title">Lab <span>Exercises</span></div>
      <div className="practice-grid">
        {PRACTICES.map((p) => (
          <div key={p.name} className="practice-card">
            <span className="practice-icon">{p.icon}</span>
            <span className="practice-count">{p.count}</span>
            <div className="practice-name">{p.name}</div>
            <p className="practice-desc">{p.desc}</p>
            <Link className="practice-link" to={p.link}>
              Open Lab →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}