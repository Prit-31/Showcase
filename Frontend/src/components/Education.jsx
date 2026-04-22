const EDUCATION = [
  {
    id: "jain",
    degree: "Master of Computer Applications in Cybersecurity",
    institution: "Jain Deemed to be University",
    period: "2025–2027",
    status: "pursuing",
    logo: "/assets/images/educat/jain.png",
    logoAlt: "Jain University",
    fallback: "🎓",
  },
  {
    id: "sutex",
    degree: "Bachelor of Computer Applications",
    institution: "Sutex Bank College of Computer Applications and Science | VNSGU",
    period: "2022–2025",
    status: "completed",
    logo: "/assets/images/educat/sutex.png",
    logoAlt: "Sutex",
    fallback: "🏫",
  },
];

export default function Education() {
  return (
    <section id="education" className="section education-section">
      <div className="sec-label">03 — EDUCATION</div>
      <div className="sec-title">Academic <span>Background</span></div>
      <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 30, fontStyle: "italic" }}>
        // "Education is not the learning of facts, but the training of the mind to think."
      </p>
      <div className="edu-timeline">
        {EDUCATION.map((edu) => (
          <div key={edu.id} className="edu-item">
            <div className="edu-logo">
              <img
                src={edu.logo}
                alt={edu.logoAlt}
                onError={(e) => {
                  e.target.replaceWith(
                    Object.assign(document.createElement("span"), {
                      textContent: edu.fallback,
                      style: "font-size:28px",
                    })
                  );
                }}
              />
            </div>
            <div className="edu-info">
              <h3>{edu.degree}</h3>
              <p>{edu.institution}</p>
              <span className={`edu-badge ${edu.status}`}>
                {edu.period} &nbsp;|&nbsp;{" "}
                {edu.status.charAt(0).toUpperCase() + edu.status.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
