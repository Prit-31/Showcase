const ABOUT_TAGS = [
  "Windows Security Logs", "SIEM / Splunk", "Network Traffic Analysis",
  "Brute-Force Detection", "Web Attack Detection", "Python Scripting",
  "Blue Team", "Incident Response", "SOC Operations",
];

export default function About() {
  return (
    <section id="about" className="section about-section">
      <div className="sec-label">01 — ABOUT</div>
      <div className="sec-title">Profile <span>Scan</span></div>

      <div className="about-grid">
        <div>
          <div className="about-img-wrap">
            <img src="./assets/images/profile.jpeg" alt="Prit Gujarati" />
          </div>
        </div>

        <div>
          <div className="terminal-window">
            <div className="terminal-titlebar">
              <div className="t-dot" style={{ background: "#f85149" }} />
              <div className="t-dot" style={{ background: "#e3b341" }} />
              <div className="t-dot" style={{ background: "#3fb950" }} />
              <span style={{ marginLeft: 8, fontSize: 11, color: "var(--muted)", letterSpacing: 1 }}>
                prit@kali:~$ whoami --verbose
              </span>
            </div>
            <div className="terminal-body">
              <div className="t-line">
                <span className="t-prompt">$ </span>
                <span className="t-cmd">cat /prit/profile.json</span>
              </div>
              <br />
              <div className="t-line">
                <span className="t-out">
                  <span className="t-key">"name"</span>
                  <span className="t-comment">:</span>{" "}
                  <span className="t-val">"Prit Gujarati"</span>,
                </span>
              </div>
              <div className="t-line">
                <span className="t-out">
                  <span className="t-key">"role"</span>
                  <span className="t-comment">:</span>{" "}
                  <span className="t-val">"Cybersecurity Student | SOC Analyst Intern Aspirant"</span>,
                </span>
              </div>
              <div className="t-line">
                <span className="t-out">
                  <span className="t-key">"location"</span>
                  <span className="t-comment">:</span>{" "}
                  <span className="t-val">"Mumbai, Maharashtra, India"</span>,
                </span>
              </div>
              <div className="t-line">
                <span className="t-out">
                  <span className="t-key">"email"</span>
                  <span className="t-comment">:</span>{" "}
                  <span className="t-val">"gujaratip31@gmail.com"</span>
                </span>
              </div>
              <br />
              <div className="t-line">
                <span className="t-prompt">$ </span>
                <span className="t-cmd">cat bio.txt</span>
              </div>
              <br />
              <div
                className="t-line"
                style={{ paddingLeft: 18, fontSize: 12, color: "var(--text)", lineHeight: 1.9 }}
              >
                Cybersecurity student with strong hands-on experience in Windows security logs,
                SIEM (Splunk), network traffic analysis, and attack detection. Skilled in detecting
                brute-force attacks, suspicious authentication behavior, and web application attacks.
                Built security monitoring and intrusion detection projects using Python and log
                analysis. Actively seeking a SOC / Cybersecurity Internship to apply blue team and
                incident response skills.
              </div>
            </div>
          </div>

          <div className="about-tags" style={{ marginTop: 20 }}>
            {ABOUT_TAGS.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>

          <div style={{ marginTop: 24 }}>
            <a
              className="btn-g"
              // https://drive.google.com/file/d/1fZG4VVrDjLcTLUX_yRxTlwlkITYRnGG8/view?usp=drive_link
              href="https://drive.google.com/file/d/1fZG4VVrDjLcTLUX_yRxTlwlkITYRnGG8/view?drive_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              ↗ Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
