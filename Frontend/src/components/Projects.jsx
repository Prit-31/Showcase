import { Link } from "react-router-dom";
import { PROJECTS } from "../data/constants.js";

export default function Projects() {
  return (
    <section id="work" className="section projects-section">
      <div className="sec-label">04 — PROJECTS</div>
      <div className="sec-title">Operations <span>Log</span></div>
      <div className="projects-grid">
        {PROJECTS.map((p) => (
          <div key={p.id} className="project-card">
            <div className="project-img">
              <img
                src={p.img}
                alt={p.name}
                onError={(e) => { e.target.style.opacity = "0"; }}
              />
              <div className="project-img-overlay">
                <span className="project-tag-pill">{p.tag}</span>
              </div>
            </div>
            <div className="project-body">
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="project-emoji">{p.emoji}</span>
                <span className="project-name">{p.name}</span>
              </div>
              <p className="project-desc">{p.desc}</p>
              <div className="project-stack">
                {p.tags.map((t) => (
                  <span key={t} className="stack-pill">{t}</span>
                ))}
              </div>
            </div>
            <div className="project-footer">
              <Link className="proj-link" to={`/projects/${p.id}`}>
                View Details <span>→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}