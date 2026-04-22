import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/projects.css";

export function LabWrapper({ title, subtitle, backTo, backLabel, children, footerTag }) {
  const [lightbox, setLightbox] = useState(null);

  return (
    <div className="proj-page">
      {/* TOP NAV */}
      <div className="proj-topbar">
        <Link to={backTo || "/practice/blue-team"} className="proj-back">
          {backLabel || "Back to Labs"}
        </Link>
        <span className="proj-topbar-title">&gt;_ {title}</span>
        <span style={{ fontSize: 11, color: "var(--muted)", letterSpacing: 1 }}>{subtitle}</span>
      </div>

      {/* PAGE CONTENT — pass setLightbox via context trick (prop drilling) */}
      {children(setLightbox)}

      {/* FOOTER */}
      <footer className="proj-footer">
        <span>
          Lab by{" "}
          <a href="https://www.linkedin.com/in/prit-gujarati-2a703b275/" target="_blank" rel="noopener noreferrer">
            Prit Gujarati
          </a>
        </span>
        <span>{footerTag || `[ ${title.toUpperCase()} ]`}</span>
      </footer>

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>×</button>
          <img src={lightbox} alt="Zoomed" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}

/* ── Reusable Step Block ── */
export function LabStep({ num, icon, title, question, answer, children }) {
  return (
    <div className="lab-step">
      <div className="lab-step-head">
        <span className="lab-step-num">Q{num}</span>
        <h3>{icon} {title}</h3>
      </div>
      <div className="lab-step-body">
        {question && <p className="lab-question">{question}</p>}
        {answer && <div className="lab-answer">{answer}</div>}
        {children}
      </div>
    </div>
  );
}

/* ── Media (zoomable image) ── */
export function LabMedia({ src, alt, caption, onZoom }) {
  return (
    <>
      <div className="lab-media" onClick={() => onZoom && onZoom(src)}>
        <img src={src} alt={alt || caption || "Evidence"} />
      </div>
      {caption && <p className="lab-caption">// {caption}</p>}
    </>
  );
}

/* ── Metadata row ── */
export function LabMeta({ category, tactics = [], tools = [], proofLink }) {
  return (
    <div className="lab-meta">
      {category && (
        <div className="lab-meta-row">
          <div className="lab-meta-label">Category</div>
          <div className="lab-meta-tags">
            <span className="lbadge lbadge-cat">{category}</span>
          </div>
        </div>
      )}
      {tactics.length > 0 && (
        <div className="lab-meta-row">
          <div className="lab-meta-label">Tactics</div>
          <div className="lab-meta-tags">
            {tactics.map((t) => <span key={t} className="lbadge lbadge-tactic">{t}</span>)}
          </div>
        </div>
      )}
      {tools.length > 0 && (
        <div className="lab-meta-row">
          <div className="lab-meta-label">Tools</div>
          <div className="lab-meta-tags">
            {tools.map((t) => <span key={t} className="lbadge lbadge-tool">{t}</span>)}
          </div>
        </div>
      )}
      {proofLink && (
        <a href={proofLink} target="_blank" rel="noopener noreferrer" className="lab-proof-btn">
          ✓ View Proof
        </a>
      )}
    </div>
  );
}

/* ── Terminal / Command block ── */
export function LabCmd({ children }) {
  return (
    <div className="p-terminal" style={{ marginTop: 0 }}>
      {children}
    </div>
  );
}

/* ── Methodology / filter box ── */
export function LabMethod({ title, filter, children }) {
  return (
    <div className="lab-method">
      {title && <div className="lab-method-title">{title}</div>}
      <div>{children}</div>
      {filter && <div className="lab-filter">{filter}</div>}
    </div>
  );
}