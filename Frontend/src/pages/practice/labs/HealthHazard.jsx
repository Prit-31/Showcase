import { useState } from "react";
import { Link } from "react-router-dom";
import "../../../styles/projects.css";
import { LabMedia } from "../../../components/practice/LabWrapper.jsx";

export default function HealthHazard() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <div className="proj-page">
      <div className="proj-topbar">
        <Link to="/practice/blue-team" className="proj-back">Back to Labs</Link>
        <span className="proj-topbar-title">&gt;_ Health Hazard</span>
        <span style={{ fontSize: 11, color: "var(--muted)", letterSpacing: 1 }}>Threat Hunting</span>
      </div>

      <div className="proj-hero">
        <div className="proj-hero-label">06 — BLUE TEAM / LAB 07</div>
        <h1>⚡ Health Hazard — <span>Supply Chain</span></h1>
        <p className="proj-hero-sub">
          Threat hunting investigation into a trojanized NPM package. Traced PowerShell encoded command
          execution, malware download, registry Run key persistence, and reconstructed the full attack timeline.
        </p>
        <div className="proj-tag-row">
          {["Threat Hunting", "Supply Chain", "Sysmon", "Splunk", "MITRE ATT&CK", "Persistence"].map((t) => (
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
              Threat hunting investigation involving a compromised development environment caused by a
              <strong style={{ color: "var(--g)" }}> trojanized NPM package</strong>. The objective was
              to reconstruct the attack chain, identify persistence mechanisms, and analyse malicious
              execution behaviour using SIEM telemetry.
            </p>
            <ul className="feat-list">
              <li>Malicious NPM package execution detected</li>
              <li>PowerShell encoded command execution identified</li>
              <li>Malware download and persistence confirmed</li>
              <li>Registry Run key used for attacker persistence</li>
              <li>Attack timeline reconstructed using SIEM logs</li>
            </ul>
            <div style={{ marginTop: 14, fontSize: 12, color: "var(--muted)" }}>
              <strong style={{ color: "var(--g)" }}>Skills:</strong> Threat Hunting · Supply Chain Attack · Sysmon Log Analysis · Persistence Analysis · MITRE ATT&amp;CK Mapping
            </div>
          </div>
        </div>

        {/* STAGE 1 — INITIAL ACCESS */}
        <div className="p-card">
          <div className="p-card-head"><span className="p-card-icon">📦</span><h2>Stage 1 — Initial Compromise</h2></div>
          <div className="p-card-body">
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.8, marginBottom: 14 }}>
              The investigation revealed that the developer installed a compromised NPM package
              <strong style={{ color: "var(--g)", fontFamily: "Fira Code" }}> healthchk-lib@1.0.1</strong>.
              During installation, malicious code executed silently in the background, providing the
              attacker with initial access.
            </p>
            <div className="p-terminal">
              $ npm install <span className="t-red">healthchk-lib@1.0.1</span>
              <span className="t-green"><br /># Malicious postinstall script triggers silently</span>
            </div>
            <LabMedia src="/assets/images/practical/health-hazard/s-1.png" alt="Stage 1 Initial Access" caption="Attack Chain Stage 1 – Supply Chain Initial Access" onZoom={setLightbox} />
          </div>
        </div>

        {/* STAGE 2 — EXECUTION */}
        <div className="p-card">
          <div className="p-card-head"><span className="p-card-icon">💻</span><h2>Stage 2 — Malicious Execution</h2></div>
          <div className="p-card-body">
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.8, marginBottom: 14 }}>
              The trojanized package executed a hidden PowerShell command through cmd.exe.
              The command downloaded a malicious payload named{" "}
              <strong style={{ color: "var(--g)", fontFamily: "Fira Code" }}>SystemHealthUpdater.exe</strong>.
            </p>
            <div className="p-terminal">
              cmd.exe /d /s /c powershell.exe <span className="t-red">-NoP -W Hidden -EncodedCommand</span>
              <span className="t-green"><br /># Encoded payload downloads SystemHealthUpdater.exe</span>
            </div>
            <LabMedia src="/assets/images/practical/health-hazard/s-2.png" alt="Stage 2 Execution" caption="Attack Chain Stage 2 – Hidden PowerShell Execution" onZoom={setLightbox} />
          </div>
        </div>

        {/* SIEM / SPLUNK */}
        <div className="p-card">
          <div className="p-card-head"><span className="p-card-icon">📊</span><h2>SIEM Log Analysis (Splunk)</h2></div>
          <div className="p-card-body">
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.8, marginBottom: 14 }}>
              Sysmon telemetry confirmed the execution chain. Logs showed cmd.exe spawning PowerShell
              with encoded commands originating from the malicious NPM package path.
            </p>
            <div className="p-terminal">
              <span className="t-green"># Hunt for encoded PowerShell executions</span><br />
              index=sysmon EventCode=1<br />
              | search <span className="t-cyan">powershell.exe</span> AND <span className="t-cyan">EncodedCommand</span>
            </div>
            <LabMedia src="/assets/images/practical/health-hazard/splunk.png" alt="Splunk log evidence" caption="Sysmon telemetry confirming the execution chain in Splunk" onZoom={setLightbox} />
          </div>
        </div>

        {/* STAGE 3 — PERSISTENCE */}
        <div className="p-card">
          <div className="p-card-head"><span className="p-card-icon">🔑</span><h2>Stage 3 — Persistence Mechanism</h2></div>
          <div className="p-card-body">
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.8, marginBottom: 14 }}>
              The attacker created a registry Run key to maintain access across system restarts.
              This allowed automatic execution of the malware whenever the user logged in.
            </p>
            <div className="p-terminal">
              <span className="t-green"># Registry persistence key</span><br />
              HKCU\Software\Microsoft\Windows\CurrentVersion\Run<br />
              Value Name: <span className="t-red">Windows Update Monitor</span>
            </div>
            <LabMedia src="/assets/images/practical/health-hazard/s-3.png" alt="Stage 3 Persistence" caption="Attack Chain Stage 3 – Registry Run Key Persistence" onZoom={setLightbox} />
          </div>
        </div>

        {/* RESPONSE */}
        <div className="p-card">
          <div className="p-card-head"><span className="p-card-icon">⚡</span><h2>Incident Response Actions</h2></div>
          <div className="p-card-body">
            <ul className="feat-list">
              <li>Malicious NPM package removed from the environment</li>
              <li>Registry persistence key deleted</li>
              <li>Malware payload quarantined</li>
              <li>Endpoint scanned for additional artifacts</li>
              <li>Compromised system credentials reset</li>
              <li>Development dependency auditing implemented</li>
            </ul>
            <div className="p-terminal" style={{ marginTop: 16 }}>
              <span className="t-green">Outcome: Persistence removed and endpoint secured</span>
            </div>
          </div>
        </div>
      </div>

      <footer className="proj-footer">
        <span>Lab by <a href="https://www.linkedin.com/in/prit-gujarati-2a703b275/" target="_blank" rel="noopener noreferrer">Prit Gujarati</a></span>
        <span>[ HEALTH HAZARD ]</span>
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