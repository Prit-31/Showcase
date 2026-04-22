import { useState } from "react";
import { Link } from "react-router-dom";
import "../../../styles/projects.css";
import { LabStep, LabMedia, LabMeta } from "../../../components/practice/LabWrapper.jsx";

const STEPS = [
  { num: 1, icon: "🕐", title: "Malware Creation Time", question: "What was the time of malware creation?", answer: "2022-09-28 17:40", img: "../../assets/images/practical/Threat Hunting/oski/q-1.jpeg", caption: "Timestamp analysis from metadata or sandbox report" },
  { num: 2, icon: "🌐", title: "C2 Communication", question: "Which C2 server does the malware in the PPT file communicate with?", answer: "http://171.22.28.221/5c06c05b7b34e8e6.php", img: "../../assets/images/practical/Threat Hunting/oski/q-2.jpeg", caption: "Network traffic capture identifying the C2 URL" },
  { num: 3, icon: "📄", title: "Post-Infection Libraries", question: "What is the first library that the malware requests post-infection?", answer: "sqlite3.dll", img: "../../assets/images/practical/Threat Hunting/oski/q-3.jpeg", caption: "Module load events showing request for sqlite3.dll" },
  { num: 4, icon: "🔑", title: "Decryption Key", question: "What RC4 key is used by the malware to decrypt its base64-encoded string?", answer: "5329514621441247975720749009", img: "../../assets/images/practical/Threat Hunting/oski/q-4.jpeg", caption: "Memory strings or configuration extraction revealing the RC4 key" },
  { num: 5, icon: "🛡", title: "MITRE ATT&CK Technique", question: "Identify the main MITRE technique (not sub-techniques) the malware uses to steal the user's password.", answer: "T1555", img: "../../assets/images/practical/Threat Hunting/oski/q-6.jpeg", caption: "Sandbox MITRE matrix highlighting Credentials from Password Stores" },
  { num: 6, icon: "📁", title: "Target Directory", question: "Which directory does the malware target for the deletion of all DLL files?", answer: "C:\\ProgramData", img: "../../assets/images/practical/Threat Hunting/oski/q-5.jpeg", caption: "File system activity showing deletion operations in ProgramData" },
  { num: 7, icon: "⏳", title: "Self-Deletion Timer", question: "After successfully exfiltrating the user's data, how many seconds does it take for the malware to self-delete?", answer: "5", img: "../../assets/images/practical/Threat Hunting/oski/q-7.jpeg", caption: "Process monitoring showing the timeout command before deletion" },
];

export default function Oski() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <div className="proj-page">
      <div className="proj-topbar">
        <Link to="/practice/blue-team" className="proj-back">Back to Labs</Link>
        <span className="proj-topbar-title">&gt;_ Oski Analysis</span>
        <span style={{ fontSize: 11, color: "var(--muted)", letterSpacing: 1 }}>Threat Intel</span>
      </div>

      <div className="proj-hero">
        <div className="proj-hero-label">06 — BLUE TEAM / LAB 02</div>
        <h1>🦠 Oski <span>Malware Analysis</span></h1>
        <p className="proj-hero-sub">
          Sandbox report analysis & behavior extraction of an info-stealer distributed via a malicious
          PPT attachment. Investigated C2 communication, RC4 decryption keys, and self-deletion behavior.
        </p>
        <div className="proj-tag-row">
          {["Threat Intel", "Info-Stealer", "ANY.RUN", "VirusTotal", "MITRE ATT&CK"].map((t) => (
            <span key={t} className="proj-tag">{t}</span>
          ))}
        </div>
      </div>

      <div className="proj-body">
        <div className="p-card">
          <div className="p-card-head"><span className="p-card-icon">📋</span><h2>Scenario</h2></div>
          <div className="p-card-body">
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.8 }}>
              The accountant at the company received an email titled "Urgent New Order" from a client late
              in the afternoon. When he attempted to access the attached invoice, he discovered it contained
              false order information. Subsequently, the SIEM solution generated an alert regarding downloading
              a potentially malicious file. The task involves a detailed examination of this file using sandbox analysis.
            </p>
            <LabMeta
              category="Threat Intel"
              tactics={["Initial Access", "Execution", "Defense Evasion", "Credential Access", "Command & Control", "Exfiltration"]}
              tools={["VirusTotal", "ANY.RUN"]}
              proofLink="https://cyberdefenders.org/blueteam-ctf-challenges/achievements/Prit_Gujarati/oski/"
            />
            <div className="lab-media" style={{ marginTop: 20 }} onClick={() => setLightbox("../../assets/images/practical/Threat Hunting/oski/main.jpeg")}>
              <img src="../../assets/images/practical/Threat Hunting/oski/main.jpeg" alt="Oski Main" />
            </div>
          </div>
        </div>

        {STEPS.map((s) => (
          <LabStep key={s.num} num={s.num} icon={s.icon} title={s.title} question={s.question} answer={s.answer}>
            <LabMedia src={s.img} alt={s.title} caption={s.caption} onZoom={setLightbox} />
          </LabStep>
        ))}
      </div>

      <footer className="proj-footer">
        <span>Lab by <a href="https://www.linkedin.com/in/prit-gujarati-2a703b275/" target="_blank" rel="noopener noreferrer">Prit Gujarati</a></span>
        <span>[ OSKI ]</span>
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