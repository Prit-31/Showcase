import { CERTS } from "../data/constants";

export default function Certificates() {
  return (
    <section id="cert" className="section cert-section">
      <div className="sec-label">05 — CERTIFICATIONS</div>
      <div className="sec-title">Verified <span>Credentials</span></div>
      <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 30, fontStyle: "italic" }}>
        // "A certificate is proof of learning; expertise is proof of practice."
      </p>
      <div className="certs-grid">
        {CERTS.map((c) =>
          c.link ? (
            <a
              key={c.name}
              className="cert-card"
              href={c.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <img src={c.img} alt={c.name} />
              <div className="cert-card-label">{c.name} ↗</div>
            </a>
          ) : (
            <div key={c.name} className="cert-card">
              <img src={c.img} alt={c.name} />
              <div className="cert-card-label">{c.name}</div>
            </div>
          )
        )}
      </div>
    </section>
  );
}
