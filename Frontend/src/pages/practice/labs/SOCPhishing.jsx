import { useState } from "react";
import { Link } from "react-router-dom";
import "../../../styles/projects.css";
import { LabMedia } from "../../../components/practice/LabWrapper.jsx";

export default function SOCPhishing() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <div className="proj-page">
      <div className="proj-topbar">
        <Link to="/practice/blue-team" className="proj-back">Back to Labs</Link>
        <span className="proj-topbar-title">&gt;_ SOC Phishing</span>
        <span style={{ fontSize: 11, color: "var(--muted)", letterSpacing: 1 }}>Incident Response</span>
      </div>

      <div className="proj-hero">
        <div className="proj-hero-label">06 — BLUE TEAM / LAB 06</div>
        <h1>🎣 SOC Phishing <span>Investigation</span></h1>
        <p className="proj-hero-sub">
          Email &amp; firewall log correlation for a phishing incident. Confirmed user interaction,
          classified the alert, executed containment actions, and documented all IOCs.
        </p>
        <div className="proj-tag-row">
          {["Incident Response", "Phishing Analysis", "Log Correlation", "SIEM", "IOC Handling"].map((t) => (
            <span key={t} className="proj-tag">{t}</span>
          ))}
        </div>
      </div>

      <div className="proj-body">
        {/* OVERVIEW */}
        <div className="p-card">
          <div className="p-card-head"><span className="p-card-icon">ℹ</span><h2>Project Overview</h2></div>
          <div className="p-card-body">
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.8, marginBottom: 16 }}>
              Real-world SOC phishing investigation in a controlled lab environment. The objective was
              to investigate a phishing email alert, correlate multiple log sources, confirm user
              interaction, and execute appropriate incident response actions.
            </p>
            <ul className="feat-list">
              <li>Inbound phishing email alert triggered</li>
              <li>Email impersonated Microsoft using a lookalike domain</li>
              <li>Email, Firewall, and SIEM logs correlated</li>
              <li>User interaction with malicious link confirmed</li>
              <li>Incident classified and escalated</li>
              <li>Containment and remediation actions performed</li>
            </ul>
          </div>
        </div>

        {/* PHISHING ANALYSIS */}
        <div className="p-card">
          <div className="p-card-head"><span className="p-card-icon">📧</span><h2>Phishing Incident Analysis</h2></div>
          <div className="p-card-body">
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.8, marginBottom: 14 }}>
              An alert was generated for an inbound email containing a suspicious external link.
              The email impersonated Microsoft using the domain{" "}
              <strong style={{ color: "var(--g)", fontFamily: "Fira Code" }}>m1crosoftsupport[.]co</strong>{" "}
              and attempted to lure the user with a fake security warning.
            </p>
            <div className="p-terminal">
              Subject: <span className="t-red">Unusual Sign-In Activity on Your Microsoft Account</span><br />
              Sender Domain: <span className="t-cyan">m1crosoftsupport.co</span><br />
              Threat Type: <span className="t-red">Credential Harvesting</span>
            </div>
            <LabMedia src="./assets/images/practical/phishing/s-1.png" alt="Email phishing alert" caption="Email phishing alert — lookalike domain identified" onZoom={setLightbox} />
          </div>
        </div>

        {/* LOG CORRELATION */}
        <div className="p-card">
          <div className="p-card-head"><span className="p-card-icon">🔗</span><h2>Log Correlation</h2></div>
          <div className="p-card-body">
            <div className="p-terminal">
              <span className="t-green">✔ Email Security Logs: Phishing email delivered</span><br />
              <span className="t-red">✔ Firewall Logs: One malicious URL blocked</span><br />
              <span className="t-red">✔ Firewall Logs: One outbound connection allowed</span>
            </div>
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.8, margin: "14px 0" }}>
              The correlation confirmed <strong style={{ color: "var(--g)" }}>user interaction (link click)</strong>,
              increasing the risk of credential compromise.
            </p>
            <LabMedia src="./assets/images/practical/phishing/s-2.png" alt="Firewall log correlation" caption="Firewall logs confirming user clicked the malicious link" onZoom={setLightbox} />
          </div>
        </div>

        {/* SIEM QUERIES */}
        <div className="p-card">
          <div className="p-card-head"><span className="p-card-icon">⚡</span><h2>SIEM Queries</h2></div>
          <div className="p-card-body">
            <div className="p-terminal">
              <span className="t-green"># Search for phishing domain in email logs</span><br />
              index=email_logs <span className="t-cyan">"m1crosoftsupport.co"</span><br />
              | stats count by sender, recipient, subject
            </div>
            <div className="p-terminal">
              <span className="t-green"># Check firewall activity for the domain</span><br />
              index=firewall_logs <span className="t-cyan">"m1crosoftsupport.co"</span><br />
              | stats count by src_ip, action
            </div>
          </div>
        </div>

        {/* INCIDENT RESPONSE */}
        <div className="p-card">
          <div className="p-card-head"><span className="p-card-icon">⚡</span><h2>Incident Response Actions</h2></div>
          <div className="p-card-body">
            <ul className="feat-list" style={{ marginBottom: 16 }}>
              <li>Incident classified as <strong>True Positive</strong></li>
              <li>User password reset and forced reauthentication</li>
              <li>MFA verification initiated</li>
              <li>Malicious domain and IP addresses blocked</li>
              <li>Endpoint investigation performed</li>
              <li>Indicators of Compromise documented</li>
            </ul>
            <div className="p-terminal">
              <span className="t-green">Outcome: Threat contained successfully</span><br />
              Impact: No confirmed credential misuse
            </div>
          </div>
        </div>

        {/* REPORT */}
        <div className="p-card">
          <div className="p-card-head"><span className="p-card-icon">📄</span><h2>SOC Investigation Report</h2></div>
          <div className="p-card-body">
            <iframe
              src="./assets/images/practical/phishing/THM-SOC-004.pdf"
              style={{ width: "100%", height: 560, border: "1px solid var(--border)", display: "block" }}
              title="SOC Phishing Report"
            />
          </div>
        </div>
      </div>

      <footer className="proj-footer">
        <span>Lab by <a href="https://www.linkedin.com/in/prit-gujarati-2a703b275/" target="_blank" rel="noopener noreferrer">Prit Gujarati</a></span>
        <span>[ SOC PHISHING ]</span>
      </footer>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>×</button>
          <img src={lightbox} alt="Zoomed" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}