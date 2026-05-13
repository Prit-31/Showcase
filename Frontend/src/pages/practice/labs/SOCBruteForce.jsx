import { useState } from "react";
import { Link } from "react-router-dom";
import "../../../styles/projects.css";
import { LabMedia } from "../../../components/practice/LabWrapper.jsx";

export default function SOCBruteForce() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <div className="proj-page">
      <div className="proj-topbar">
        <Link to="/practice/blue-team" className="proj-back">Back to Labs</Link>
        <span className="proj-topbar-title">&gt;_ SOC Brute Force</span>
        <span style={{ fontSize: 11, color: "var(--muted)", letterSpacing: 1 }}>Incident Response</span>
      </div>

      <div className="proj-hero">
        <div className="proj-hero-label">06 — BLUE TEAM / LAB 05</div>
        <h1>🔑 SOC Brute Force <span>Investigation</span></h1>
        <p className="proj-hero-sub">
          Hands-on SOC workflow: detect and investigate a brute force attack through log analysis,
          Splunk queries, evidence collection, and professional report documentation.
        </p>
        <div className="proj-tag-row">
          {["Incident Response", "Brute Force", "Splunk", "Log Analysis", "SOC"].map((t) => (
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
              This project demonstrates hands-on SOC Analyst practice focused on detecting and investigating
              a brute force attack in a controlled lab environment. The objective was to follow a real-world
              SOC workflow: <strong style={{ color: "var(--g)" }}>detection → investigation → evidence collection → reporting</strong>.
            </p>
            <ul className="feat-list">
              <li>Simulated brute force login attempts from an attacker machine</li>
              <li>Monitored authentication and system logs</li>
              <li>Identified brute force indicators (multiple failed logins)</li>
              <li>Analyzed attack patterns and source behavior</li>
              <li>Built an investigation timeline</li>
              <li>Documented findings in a professional SOC report (PDF)</li>
            </ul>
            <div style={{ marginTop: 14, fontSize: 12, color: "var(--muted)" }}>
              <strong style={{ color: "var(--g)" }}>Skills:</strong> Log Analysis · Incident Investigation · Brute Force Detection · Authentication Attacks · Security Monitoring · Reporting
            </div>
          </div>
        </div>

        {/* VIDEO */}
        <div className="p-card">
          <div className="p-card-head"><span className="p-card-icon">▶</span><h2>Demonstration</h2></div>
          <div className="p-card-body">
            <div className="p-video-wrap">
              <iframe src="https://drive.google.com/file/d/1kyGTUvrB32urTnUIFUA1LMTEYxSnEJ0o/preview" allow="autoplay" allowFullScreen title="SOC Brute Force Demo" />
            </div>
          </div>
        </div>

        {/* INVESTIGATION */}
        <div className="p-card">
          <div className="p-card-head"><span className="p-card-icon">🔍</span><h2>Brute Force Attack Investigation</h2></div>
          <div className="p-card-body">
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.8, marginBottom: 16 }}>
              During the investigation, I analyzed authentication logs to detect repeated failed login
              attempts from a single source, confirming brute force behavior.
            </p>
            <div className="p-terminal">
              <span className="t-red">Failed login attempts detected</span><br />
              Repeated authentication failures from same IP<br />
              Short time interval between attempts
            </div>
            <LabMedia
              src="/assets/images/practical/SOC/soc-1.png"
              alt="Brute force log analysis 1"
              caption="Brute force indicators in authentication logs"
              onZoom={setLightbox}
            />
            <LabMedia
              src="/assets/images/practical/SOC/soc-2.png"
              alt="Brute force log analysis 2"
              caption="Splunk dashboard showing failed login count by IP"
              onZoom={setLightbox}
            />
          </div>
        </div>

        {/* SPLUNK QUERIES */}
        <div className="p-card">
          <div className="p-card-head"><span className="p-card-icon">⚡</span><h2>Splunk Queries</h2></div>
          <div className="p-card-body">
            <div className="p-terminal">
              <span className="t-green"># Detect brute force — top offending IPs</span><br />
              index=main sourcetype=linux_auth <span className="t-cyan">"failed password"</span><br />
              | stats count by src_ip, user<br />
              | where count &gt; 5<br />
              | sort - count
            </div>
            <div className="p-terminal">
              <span className="t-green"># Timeline of failed attempts from attacker IP</span><br />
              index=main sourcetype=linux_auth <span className="t-cyan">"failed password"</span> src_ip=10.89.146.71<br />
              | bin _time span=5m<br /><br />
              <span className="t-green"># Detect successful login after brute force</span><br />
              index=main sourcetype=linux_auth <span className="t-cyan">"accepted password"</span> src_ip=10.89.146.71<br />
              | bin _time span=5m<br /><br />
              <span className="t-green"># Check for privilege escalation post-compromise</span><br />
              index=main sourcetype=linux_auth (<span className="t-cyan">"sudo"</span> OR <span className="t-cyan">"su"</span> OR <span className="t-cyan">"adduser"</span>) src_ip=10.89.146.71<br />
              | bin _time span=5m
            </div>
          </div>
        </div>

        {/* REPORT */}
        <div className="p-card">
          <div className="p-card-head"><span className="p-card-icon">📄</span><h2>SOC Investigation Report</h2></div>
          <div className="p-card-body">
            <ul className="feat-list" style={{ marginBottom: 20 }}>
              <li>Attack overview and objective</li>
              <li>Indicators of compromise (IOCs)</li>
              <li>Attack timeline reconstruction</li>
              <li>Observed attacker behavior and techniques</li>
              <li>Impact assessment</li>
              <li>Security recommendations</li>
            </ul>
            <iframe
              src="/assets/images/practical/SOC/SOC-001-Report.pdf"
              style={{ width: "100%", height: 560, border: "1px solid var(--border)", display: "block" }}
              title="SOC Brute Force Report"
            />
          </div>
        </div>
      </div>

      <footer className="proj-footer">
        <span>Lab by <a href="https://www.linkedin.com/in/prit-gujarati-2a703b275/" target="_blank" rel="noopener noreferrer">Prit Gujarati</a></span>
        <span>[ SOC BRUTE FORCE ]</span>
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