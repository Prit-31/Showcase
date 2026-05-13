import { SKILLS } from "../data/constants";

export default function Skills() {
  return (
    <section id="skills" className="section skills-section">
      <p className="sec-label">02 — SKILLS</p>
      <h2 className="sec-title">Technical <span>Arsenal</span></h2>

      {SKILLS.map((group) => (
        <div key={group.category} className="skill-category">
          <h3 className="category-title">{group.category}</h3>

          <div className="skills-grid">
            {group.items.map((skill) => (
              <div key={skill.name} className="skill-card">
                <img
                  src={skill.icon}
                  alt={skill.name}
                  loading="lazy"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}