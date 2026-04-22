import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/projects.css";

export default function Firewall() {
  const [view, setView] = useState("ufw"); // "ufw" | "corporate"
  const [lightbox, setLightbox] = useState(null);

  const Img = ({ src, alt }) => (
    <div className="lab-media" onClick={() => setLightbox(src)}>
      <img src={src} alt={alt} />
    </div>
  );

  return (
    <div className="proj-page">
      {/* TOP NAV */}
      <div className="proj-topbar">
        <Link to="/" className="proj-back">Back to Portfolio</Link>
        <span className="proj-topbar-title">&gt;_ Linux UFW Firewall</span>
        <span style={{ fontSize: 11, color: "var(--muted)", letterSpacing: 1 }}>Practice</span>
      </div>

      {/* HERO */}
      <div className="proj-hero">
        <div className="proj-hero-label">06 — PRACTICE</div>
        <h1>🔥 Linux UFW <span>Firewall</span></h1>
        <p className="proj-hero-sub">
          Host firewall configuration following Zero-Trust principles — default-deny policy,
          SSH rate limiting, ICMP restrictions, stealth scan blocking, and anti-spoofing rules.
        </p>
        <div className="proj-tag-row">
          {["Linux Security", "UFW", "Firewall Policies", "Network Hardening", "Blue Team"].map((t) => (
            <span key={t} className="proj-tag">{t}</span>
          ))}
        </div>
      </div>

      <div className="proj-body">
        {/* TOGGLE TABS */}
        <div className="fw-tabs">
          <button className={`fw-tab ${view === "ufw" ? "active" : ""}`} onClick={() => setView("ufw")}>
            UFW Lab
          </button>
          <button className={`fw-tab ${view === "corporate" ? "active" : ""}`} onClick={() => setView("corporate")}>
            Corporate Hardening
          </button>
        </div>

        {/* ═══ UFW LAB VIEW ═══ */}
        {view === "ufw" && (
          <>
            {/* OVERVIEW */}
            <div className="p-card">
              <div className="p-card-head"><span className="p-card-icon">ℹ</span><h2>Project Overview</h2></div>
              <div className="p-card-body">
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.8, marginBottom: 20 }}>
                  As part of my self-driven cybersecurity practice, I designed and implemented a
                  <strong style={{ color: "var(--g)" }}> corporate-style host-based firewall</strong> using UFW
                  on a Linux system. The objective was to simulate how organizations harden servers and validate
                  each control through real attacker and client testing.
                </p>
                <ul className="feat-list">
                  <li>Installed and configured UFW to control inbound and outbound traffic</li>
                  <li>Applied a <strong>default deny</strong> policy for incoming connections</li>
                  <li>Secured remote administration using <strong>SSH allow + rate limiting</strong></li>
                  <li>Defined service-level access for HTTP, HTTPS, FTP, MySQL, and ICMP</li>
                  <li>Tested firewall behavior from a separate client / attacker machine</li>
                  <li>Verified rules and logs using <code style={{ color: "var(--c)", fontFamily: "Fira Code" }}>ufw status verbose</code></li>
                </ul>
                <div style={{ marginTop: 16, fontSize: 12, color: "var(--muted)" }}>
                  <strong style={{ color: "var(--g)" }}>Skills:</strong> Linux Security · UFW · Firewall Policies · Network Hardening · Blue Team · Defensive Testing
                </div>
              </div>
            </div>

            {/* VIDEO */}
            <div className="p-card">
              <div className="p-card-head"><span className="p-card-icon">▶</span><h2>Demonstration</h2></div>
              <div className="p-card-body">
                <div className="p-video-wrap">
                  <iframe
                    src="https://drive.google.com/file/d/1n22eUlWlfEnuJjdwxMKI3hQvNpTHGQdo/preview"
                    allow="autoplay"
                    allowFullScreen
                    title="UFW Firewall Demo"
                  />
                </div>
              </div>
            </div>

            {/* SSH */}
            <div className="p-card">
              <div className="p-card-head"><span className="p-card-icon">🔒</span><h2>SSH – Secure Administrative Access</h2></div>
              <div className="p-card-body">
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.8 }}>
                  SSH access was restricted and protected using UFW's built-in rate limiting to reduce
                  the risk of brute-force attacks while maintaining administrative usability.
                </p>
                <div className="p-terminal">
                  <span className="t-green"># Enable SSH with rate limiting (blocks after 6 attempts / 30s)</span><br />
                  ufw limit ssh
                </div>
                <p className="p-caption">Click images to zoom</p>
                <Img src="/assets/images/practical/firewall/ssh-rate-limit.jpeg" alt="SSH rate limiting rule" />
                <Img src="/assets/images/practical/firewall/test-ssh-rate-limit.jpeg" alt="SSH brute-force test result" />
              </div>
            </div>

            {/* ICMP */}
            <div className="p-card">
              <div className="p-card-head"><span className="p-card-icon">🌐</span><h2>ICMP – Ping Flood Protection</h2></div>
              <div className="p-card-body">
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.8 }}>
                  ICMP echo requests were evaluated and restricted to demonstrate how organizations
                  reduce reconnaissance and ping-flood attack surfaces.
                </p>

                <div className="state-label state-before">Before: Unrestricted ICMP</div>
                <div className="p-terminal">$ ping <span className="t-cyan">x.x.x.x</span> <span className="t-red"># From attacker machine — succeeds</span></div>
                <Img src="/assets/images/practical/firewall/before-icmp-block.jpeg" alt="ICMP allowed before hardening" />

                <div className="state-label state-after">After: ICMP Blocked</div>
                <div className="p-terminal">
                  nano /etc/ufw/before.rules<br />
                  <span className="t-green"># Comment or remove the following line:</span><br />
                  <span className="t-red"># -A ufw-before-input -p icmp --icmp-type echo-request -j ACCEPT</span><br /><br />
                  ufw reload
                </div>
                <Img src="/assets/images/practical/firewall/block-icmp.jpeg" alt="ICMP rule disabled" />
                <Img src="/assets/images/practical/firewall/after-icmp-block.jpeg" alt="ICMP blocked after hardening" />
              </div>
            </div>
          </>
        )}

        {/* ═══ CORPORATE HARDENING VIEW ═══ */}
        {view === "corporate" && (
          <>
            <div className="p-card">
              <div className="p-card-head"><span className="p-card-icon">🏢</span><h2>Professional Firewall Hardening</h2></div>
              <div className="p-card-body">
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.8, marginBottom: 20 }}>
                  Lab environment on Kali Linux to practice corporate-level server security. Goal: implement
                  real-world firewall and network hardening techniques in a controlled environment.
                </p>
                <div className="p-media" onClick={() => setLightbox("/assets/images/practical/firewall/company-server.png")}>
                  <img src="/assets/images/practical/firewall/company-server.png" alt="Company server hardening" />
                </div>
              </div>
            </div>

            {/* HARDENING CHANGES */}
            {[
              {
                num: 1, title: "mDNS (5353) and UPnP (1900)",
                before: "Allowed by default",
                beforeCmd: `-A ufw-before-input -p udp --dport 5353 -j ACCEPT\n-A ufw-before-input -p udp --dport 1900 -j ACCEPT`,
                after: "Removed to reduce attack surface",
                afterCmd: `# No rules for ports 5353 or 1900`,
              },
              {
                num: 2, title: "TCP Flag Filtering (Stealth Scans)",
                before: "No TCP flag filtering",
                beforeCmd: `# All TCP packets accepted regardless of flags`,
                after: "Drops illegal TCP flag combinations (Xmas/Null scans)",
                afterCmd: `-A ufw-before-input -p tcp --tcp-flags ALL ALL -j DROP\n-A ufw-before-input -p tcp --tcp-flags ALL NONE -j DROP`,
              },
              {
                num: 3, title: "ICMP Rate Limiting",
                before: "Unrestricted ICMP (all ping requests allowed)",
                beforeCmd: `-A ufw-before-input -p icmp --icmp-type echo-request -j ACCEPT`,
                after: "Rate-limited ICMP to prevent ping floods",
                afterCmd: `-A ufw-before-input -p icmp --icmp-type echo-request -m limit --limit 1/s --limit-burst 5 -j ACCEPT\n-A ufw-before-input -p icmp --icmp-type echo-request -j DROP`,
              },
              {
                num: 4, title: "Anti-Spoofing",
                before: "No anti-spoofing rules",
                beforeCmd: `# Packets claiming to be from 127.0.0.1 accepted from any interface`,
                after: "Only allow loopback traffic from loopback interface",
                afterCmd: `-A ufw-before-input -s 127.0.0.0/8 ! -i lo -j DROP`,
              },
            ].map((h) => (
              <div key={h.num} className="p-card">
                <div className="p-card-head">
                  <span className="p-card-icon">🛡</span>
                  <h2>{h.num}. {h.title}</h2>
                </div>
                <div className="p-card-body">
                  <div className="p-terminal">
                    <span className="t-red">// BEFORE: {h.before}</span><br />
                    <span className="t-cyan">{h.beforeCmd.split("\n").map((l, i) => <span key={i}>{l}<br /></span>)}</span>
                    <br />
                    <span className="t-green">// AFTER: {h.after}</span><br />
                    {h.afterCmd.split("\n").map((l, i) => <span key={i}>{l}<br /></span>)}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <footer className="proj-footer">
        <span>Practice by <a href="https://www.linkedin.com/in/prit-gujarati-2a703b275/" target="_blank" rel="noopener noreferrer">Prit Gujarati</a></span>
        <span>[ LINUX UFW FIREWALL ]</span>
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