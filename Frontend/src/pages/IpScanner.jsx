import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/projects.css";

const SLIDES = [
  { src: "../assets/images/projects/ip-scanner/disclaimer.png", alt: "Disclaimer" },
  { src: "../assets/images/projects/ip-scanner/dash.png", alt: "Main Dashboard" },
  { src: "../assets/images/projects/ip-scanner/dash-2.png", alt: "Dashboard View 2" },
  { src: "../assets/images/projects/ip-scanner/tcp.png", alt: "TCP Scan Results" },
  { src: "../assets/images/projects/ip-scanner/host.png", alt: "Host Detection" },
];

const FEATURES = [
  "IP Scanner – Detects private/public IP, subnet, hostname, MAC address.",
  "OS fingerprinting & firewall detection using nmap -O.",
  "TCP & UDP port scanning with service and version detection.",
  "Subnet (/24) scanning to detect all active devices on the network.",
  "Public IP geolocation — Country, ISP, ASN, City, Lat/Lon.",
];

const ENDPOINTS = [
  { method: "GET", path: "/scan?ip=", desc: "Scan single IP for full info" },
  { method: "GET", path: "/tcp?ip=", desc: "TCP Port Scan with service detection" },
  { method: "GET", path: "/udp?ip=", desc: "UDP Port Scan" },
  { method: "GET", path: "/active-devices?ip=", desc: "Active device scan on /24 subnet" },
];

const STACK = [
  { label: "Backend", items: "Python, FastAPI, Nmap, Psutil, Socket, Getmac" },
  { label: "Frontend", items: "React.js, HTML5, CSS3" },
  { label: "Tools", items: "IP-API (geolocation), Networking APIs" },
];

const USE_CASES = [
  { role: "Admins", desc: "Monitor local networks and identify open ports." },
  { role: "Pentesters", desc: "Fingerprint OS, detect firewall rules and services." },
  { role: "Students", desc: "Learn real-world networking & security fundamentals." },
];

export default function IpScanner() {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), 2800);
    return () => clearInterval(t);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setCurrent((c) => (c + 1) % SLIDES.length);

  return (
    <div className="proj-page">
      {/* TOP NAV */}
      <div className="proj-topbar">
        <Link to="/" className="proj-back">Back to Portfolio</Link>
        <span className="proj-topbar-title">&gt;_ Network Port Scanner</span>
        <span style={{ fontSize: 11, color: "var(--muted)", letterSpacing: 1 }}>Security Tool</span>
      </div>

      {/* HERO */}
      <div className="proj-hero">
        <div className="proj-hero-label">04 — PROJECT DETAIL</div>
        <h1>🔍 Network Port <span>Scanner</span></h1>
        <p className="proj-hero-sub">
          Full-stack cybersecurity application. FastAPI backend + React frontend. IP scanning,
          OS detection, geolocation, TCP/UDP port analysis for security researchers and pentesters.
        </p>
        <div className="proj-tag-row">
          {["Python", "FastAPI", "React.js", "Nmap", "IP-API"].map((t) => (
            <span key={t} className="proj-tag">{t}</span>
          ))}
        </div>
      </div>

      {/* BODY */}
      <div className="proj-body">

        {/* SCREENSHOT SLIDER */}
        <div className="p-card">
          <div className="p-card-head">
            <span className="p-card-icon">🖼</span>
            <h2>Screenshots</h2>
          </div>
          <div className="p-card-body" style={{ padding: "28px 28px 16px" }}>
            <div style={{ position: "relative", overflow: "hidden", border: "1px solid var(--border)" }}>
              <img
                src={SLIDES[current].src}
                alt={SLIDES[current].alt}
                style={{ width: "100%", height: 380, objectFit: "contain", background: "#07100707", display: "block", cursor: "zoom-in" }}
                onClick={() => setLightbox(SLIDES[current].src)}
              />
              <button onClick={prev} style={arrowStyle("left")}>‹</button>
              <button onClick={next} style={arrowStyle("right")}>›</button>
              <span style={{
                position: "absolute", bottom: 12, right: 16,
                fontSize: 10, color: "var(--muted)", letterSpacing: 1,
                fontFamily: "'Fira Code', monospace",
              }}>
                {current + 1} / {SLIDES.length}
              </span>
            </div>
            <div style={{ display: "flex", gap: 4, justifyContent: "center", marginTop: 14 }}>
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  style={{
                    width: i === current ? 20 : 6, height: 6,
                    background: i === current ? "var(--g)" : "var(--border)",
                    border: "none", cursor: "pointer", padding: 0,
                    transition: "all .3s",
                    boxShadow: i === current ? "0 0 6px var(--g)" : "none",
                  }}
                />
              ))}
            </div>
            <p className="p-caption" style={{ marginTop: 12 }}>{SLIDES[current].alt}</p>
          </div>
        </div>

        {/* OVERVIEW */}
        <div className="p-card">
          <div className="p-card-head">
            <span className="p-card-icon">ℹ</span>
            <h2>Project Overview</h2>
          </div>
          <div className="p-card-body">
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.9 }}>
              This project is a{" "}
              <strong style={{ color: "var(--g)" }}>full-stack cybersecurity application</strong>{" "}
              built with <strong style={{ color: "var(--c)" }}>Python (FastAPI)</strong> on the backend
              and a custom <strong style={{ color: "var(--c)" }}>React.js frontend</strong>. It provides
              real-time <strong style={{ color: "var(--g)" }}>IP scanning, OS detection, geolocation,
              and TCP/UDP port analysis</strong>. Designed for security researchers, system administrators,
              and penetration testers.
            </p>
          </div>
        </div>

        {/* KEY FEATURES */}
        <div className="p-card">
          <div className="p-card-head">
            <span className="p-card-icon">✦</span>
            <h2>Key Features</h2>
          </div>
          <div className="p-card-body">
            <ul className="feat-list">
              {FEATURES.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* REST API ENDPOINTS */}
        <div className="p-card">
          <div className="p-card-head">
            <span className="p-card-icon">⚡</span>
            <h2>REST API Endpoints</h2>
          </div>
          <div className="p-card-body">
            <div className="endpoint-list">
              {ENDPOINTS.map((ep) => (
                <div key={ep.path} className="endpoint">
                  <span className="ep-method">{ep.method}</span>
                  <span className="ep-path">{ep.path}</span>
                  <span className="ep-desc">{ep.desc}</span>
                </div>
              ))}
            </div>
            <div className="p-terminal" style={{ marginTop: 20 }}>
              <span className="t-green"># Example request</span><br />
              curl <span className="t-cyan">http://localhost:8000/scan?ip=192.168.1.1</span><br />
              <span className="t-green"># Returns: OS, ports, hostname, MAC, geolocation</span>
            </div>
          </div>
        </div>

        {/* TECH STACK */}
        <div className="p-card">
          <div className="p-card-head">
            <span className="p-card-icon">🔧</span>
            <h2>Tech Stack</h2>
          </div>
          <div className="p-card-body">
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {STACK.map((s) => (
                <div key={s.label} className="tool-row" style={{ padding: "14px 0" }}>
                  <strong style={{ color: "var(--g)", minWidth: 100 }}>{s.label}</strong>
                  <span style={{ color: "var(--muted)", fontSize: 12, fontFamily: "'Fira Code', monospace" }}>{s.items}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* USE CASES */}
        <div className="p-card">
          <div className="p-card-head">
            <span className="p-card-icon">🎯</span>
            <h2>Use Cases</h2>
          </div>
          <div className="p-card-body">
            <ul className="feat-list">
              {USE_CASES.map((u) => (
                <li key={u.role}>
                  <strong>For {u.role}:</strong>&nbsp;{u.desc}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="proj-footer">
        <span>Project by <a href="https://www.linkedin.com/in/prit-gujarati-2a703b275/" target="_blank" rel="noopener noreferrer">Prit Gujarati</a></span>
        <span>[ NETWORK PORT SCANNER ]</span>
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

function arrowStyle(side) {
  return {
    position: "absolute",
    top: "50%", [side]: 10,
    transform: "translateY(-50%)",
    background: "rgba(6,13,6,0.85)",
    border: "1px solid var(--border)",
    color: "var(--g)", fontSize: 22,
    width: 36, height: 36,
    cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    transition: "all .2s",
  };
}