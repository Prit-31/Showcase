import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/projects.css";

const STACK = [
  { label: "Snort IDS/IPS", desc: "Network analysis" },
  { label: "ModSecurity", desc: "WAF / OWASP CRS" },
  { label: "Splunk SIEM", desc: "Analytics & Monitoring" },
  { label: "Python", desc: "Automation Engine" },
  { label: "Linux / UFW", desc: "Infrastructure" },
  { label: "Regex", desc: "Attack Matching" },
];

const PROTECTION = [
  {
    layer: "Snort IDS/IPS",
    items: [
      { label: "Port Scanning", badge: "block" },
      { label: "Brute Force", badge: "block" },
      { label: "DoS / Flood Attacks", badge: "block" },
      { label: "Nmap Reconnaissance", badge: "detect" },
    ],
  },
  {
    layer: "ModSecurity WAF",
    items: [
      { label: "SQL Injection", badge: "block" },
      { label: "Cross-Site Scripting (XSS)", badge: "block" },
      { label: "Local File Inclusion (LFI)", badge: "block" },
      { label: "OWASP Top 10", badge: "active" },
    ],
  },
  {
    layer: "Python Automation",
    items: [
      { label: "Dynamic IP Blacklisting", badge: "active" },
      { label: "Real-time UFW Integration", badge: "active" },
    ],
  },
];

function BadgePill({ type }) {
  const map = {
    block: ["b-block", "Blocked"],
    detect: ["b-detect", "Flagged"],
    active: ["b-active", "Active"],
  };
  const [cls, text] = map[type];
  return <span className={`b ${cls}`}>{text}</span>;
}

export default function SentinelShield() {
  const [lightbox, setLightbox] = useState(null);

  const openLightbox = (src) => setLightbox(src);
  const closeLightbox = () => setLightbox(null);

  const Img = ({ src, alt }) => (
    <div className="p-media" onClick={() => openLightbox(src)}>
      <img src={src} alt={alt} />
    </div>
  );

  return (
    <div className="proj-page">
      {/* TOP NAV */}
      <div className="proj-topbar">
        <Link to="/" className="proj-back">Back to Portfolio</Link>
        <span className="proj-topbar-title">&gt;_ SentinelShield</span>
        <span style={{ fontSize: 11, color: "var(--muted)", letterSpacing: 1 }}>IDS / WAF</span>
      </div>

      {/* HERO */}
      <div className="proj-hero">
        <div className="proj-hero-label">04 — PROJECT DETAIL</div>
        <h1>🛡️ Sentinel<span>Shield</span></h1>
        <p className="proj-hero-sub">
          Advanced Intrusion Detection &amp; Web Protection System. Combines Snort IPS + ModSecurity
          + Python automation engine. Blocks SQLi, XSS, DoS, port scans with real-time UFW IP blacklisting.
        </p>
        <div className="proj-tag-row">
          {["Python", "Snort", "ModSecurity", "Splunk", "Linux/UFW"].map((t) => (
            <span key={t} className="proj-tag">{t}</span>
          ))}
        </div>
      </div>

      {/* BODY */}
      <div className="proj-body">

        {/* PROJECT STRATEGY */}
        <div className="p-card">
          <div className="p-card-head">
            <span className="p-card-icon">⚙</span>
            <h2>Project Strategy</h2>
          </div>
          <div className="p-card-body">
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.8, marginBottom: 24 }}>
              SentinelShield is designed to mitigate the full spectrum of the Cyber Kill Chain. By combining{" "}
              <strong style={{ color: "var(--g)" }}>Snort</strong> for network-layer visibility and{" "}
              <strong style={{ color: "var(--g)" }}>ModSecurity</strong> for application-layer defense, the system
              creates a hostile environment for attackers.
            </p>
            <div className="tool-grid">
              {STACK.map((s) => (
                <div key={s.label} className="tool-row">
                  <strong>{s.label}</strong>
                  <span>{s.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PROTECTION CAPABILITIES */}
        <div className="p-card">
          <div className="p-card-head">
            <span className="p-card-icon">🛡</span>
            <h2>Protection Capabilities</h2>
          </div>
          <div className="p-card-body" style={{ padding: 0 }}>
            <table className="p-table">
              <thead>
                <tr>
                  <th>Defense Layer</th>
                  <th>Attack Vectors &amp; Status</th>
                </tr>
              </thead>
              <tbody>
                {PROTECTION.map((row) => (
                  <tr key={row.layer}>
                    <td><strong>{row.layer}</strong></td>
                    <td>
                      {row.items.map((item) => (
                        <div key={item.label}>
                          {item.label}<BadgePill type={item.badge} />
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ padding: "20px 28px", borderTop: "1px solid var(--border)" }}>
            <a
              href="https://github.com/Prit-31/SentinelShield/blob/main/README.md"
              target="_blank"
              rel="noopener noreferrer"
              className="p-gh-btn"
            >
              ⬡ View Full Configuration &amp; Code
            </a>
          </div>
        </div>

        {/* DEMO VIDEO */}
        <div className="p-card">
          <div className="p-card-head">
            <span className="p-card-icon">▶</span>
            <h2>Tactical Demonstration</h2>
          </div>
          <div className="p-card-body">
            <div className="p-video-wrap">
              <iframe
                src="https://drive.google.com/file/d/11Nn5VfIyp6Xphgp9pX6tQiTevPooLg59/preview"
                allow="autoplay"
                title="SentinelShield Demo"
              />
            </div>
            <p className="p-caption">Stress testing the automated response engine against Nmap and SQLMap.</p>
          </div>
        </div>

        {/* WAF CASE STUDY */}
        <div className="p-card">
          <div className="p-card-head">
            <span className="p-card-icon">🌐</span>
            <h2>Defense: ModSecurity WAF</h2>
          </div>
          <div className="p-card-body">
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.8, marginBottom: 20 }}>
              Vulnerabilities like SQL injection allow attackers to bypass authentication. We implemented the
              OWASP Core Rule Set (CRS) to filter malicious payloads at the HTTP layer.
            </p>

            <div className="state-label state-before">Case 1: Vulnerable Entry Point</div>
            <Img src="../assets/images/projects/SentinelShield/Before-waf.jpg" alt="Vulnerable State" />

            <div className="state-label state-after">Case 2: Hardened WAF Configuration</div>
            <div className="p-terminal">
              <span className="t-green"># Security Rule Activation</span><br />
              SecRuleEngine On<br />
              SecDefaultAction <span className="t-cyan">"phase:1,log,auditlog,deny,status:403"</span>
            </div>
            <Img src="../assets/images/projects/SentinelShield/after-waf.jpg" alt="Blocked Request" />
          </div>
        </div>

        {/* IPS CASE STUDY */}
        <div className="p-card">
          <div className="p-card-head">
            <span className="p-card-icon">⚡</span>
            <h2>Automated IPS Mitigation</h2>
          </div>
          <div className="p-card-body">
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.8, marginBottom: 20 }}>
              Using a Python-based middleware, SentinelShield parses Snort logs in real-time and updates
              the host firewall (UFW) to drop packets from offending IPs instantly.
            </p>

            <div className="state-label state-before">Initial Attack: Full Reconnaissance</div>
            <div className="p-terminal">
              $ nmap -sV -p- <span className="t-cyan">10.87.240.40</span>
            </div>
            <Img src="../assets/images/projects/SentinelShield/before-ips-ids.jpg" alt="Nmap Scan Result" />

            <div className="state-label state-after">Defense Active: Triggering the Auto-Blocker</div>
            <div className="p-terminal">
              <span className="t-green"># Monitoring Snort Alert Fast Log...</span><br />
              <span className="t-red">[ALERT]</span> Priority 1: ICMP PING Detected from <span className="t-cyan">10.87.240.71</span><br />
              <span className="t-green">[SYSTEM]</span> Executing: ufw insert 1 deny from <span className="t-cyan">10.87.240.71</span>
            </div>
            <Img src="../assets/images/projects/SentinelShield/ip-auto-block.jpg" alt="Automation Script" />
            <Img src="../assets/images/projects/SentinelShield/ip-block-in-firewall.jpg" alt="UFW Status" />

            <div className="state-label state-after">Post-Defense: Attacker Throttled</div>
            <Img src="../assets/images/projects/SentinelShield/after-ips-ids.jpg" alt="Blocked Scan" />
            <p className="p-caption">The attacker's scan stalls indefinitely as the connection is dropped at the kernel level.</p>
          </div>
        </div>

        {/* SIEM DASHBOARD */}
        <div className="p-card">
          <div className="p-card-head">
            <span className="p-card-icon">📊</span>
            <h2>Intelligence &amp; Monitoring</h2>
          </div>
          <div className="p-card-body">
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.8, marginBottom: 20 }}>
              Data without visualization is noise. All events are indexed into Splunk to provide a
              bird's-eye view of the threat landscape.
            </p>
            <Img src="../assets/images/projects/SentinelShield/dash.png" alt="Splunk Dashboard" />
            <p className="p-caption">Real-time tracking of over 500,000 security events with geographic and volumetric analysis.</p>
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="proj-footer">
        <span>Project by <a href="https://www.linkedin.com/in/prit-gujarati-2a703b275/" target="_blank" rel="noopener noreferrer">Prit Gujarati</a></span>
        <span>[ SENTINELSHIELD ]</span>
      </footer>

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>×</button>
          <img src={lightbox} alt="Zoomed" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}