import { SKILLS } from "../data/constants";

export default function Skills() {
  return (
    <section id="skills" className="section skills-section">
      <div className="sec-label">02 — SKILLS</div>
      <div className="sec-title">Technical <span>Arsenal</span></div>
      <div className="skills-grid">
        {SKILLS.map((s) => (
          <div key={s.name} className="skill-card">
            <img
              src={s.icon}
              alt={s.name}
              onError={(e) => { e.target.style.display = "none"; }}
            />
            <span>{s.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
