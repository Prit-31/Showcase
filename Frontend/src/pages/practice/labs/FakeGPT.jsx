import { useState } from "react";
import { Link } from "react-router-dom";
import "../../../styles/projects.css";
import { LabStep, LabMedia, LabMeta } from "../../../components/practice/LabWrapper.jsx";

const STEPS = [
  { num: 1, icon: "⚙", title: "Obfuscation Method", question: "Which encoding method does the browser extension use to obscure target URLs?", answer: "base64", img: "../../assets/images/practical/Malware Analysis/fakegpt/s-1.png", caption: "Decoding obfuscated strings found in the extension source code" },
  { num: 2, icon: "🎯", title: "Targeted Website", question: "Which website does the extension monitor for data theft?", answer: "www.facebook.com", img: "../../assets/images/practical/Malware Analysis/fakegpt/ss-2.jpeg", caption: "Target domain in the content script listeners" },
  { num: 3, icon: "📄", title: "Exfiltration Element", question: "Which type of HTML element is utilized by the extension to send stolen data?", answer: "<img>", img: "../../assets/images/practical/Malware Analysis/fakegpt/ss-3.jpeg", caption: "JavaScript code creating image elements for covert data transmission" },
  { num: 4, icon: "🐛", title: "Anti-Analysis Trigger", question: "What is the first specific condition in the code that triggers the extension to deactivate itself?", answer: "navigator.plugins.length === 0", img: "../../assets/images/practical/Malware Analysis/fakegpt/ss-4.jpeg", caption: "Sandbox evasion check found in the main logic" },
  { num: 5, icon: "🖊", title: "Form Submission Event", question: "Which event does the extension capture to track user input submitted through forms?", answer: "submit", img: "../../assets/images/practical/Malware Analysis/fakegpt/ss-5.jpeg", caption: "Event listener hooked to form submission" },
  { num: 6, icon: "⌨", title: "Keystroke Monitoring", question: "Which API or method does the extension use to capture user keystrokes?", answer: "keydown", img: "../../assets/images/practical/Malware Analysis/fakegpt/ss-6.jpeg", caption: "keydown event listener capturing individual user inputs" },
  { num: 7, icon: "🖥", title: "C2 Exfiltration Domain", question: "What is the domain where the extension transmits the exfiltrated data?", answer: "Mo.Elshaheedy.com", img: "../../assets/images/practical/Malware Analysis/fakegpt/ss-7.jpeg", caption: "Extracting the attacker's domain from the URL generator function" },
  { num: 8, icon: "🔑", title: "Credential Theft Function", question: "Which function in the code is used to exfiltrate user credentials?", answer: "exfiltrateCredentials(username, password);", img: "../../assets/images/practical/Malware Analysis/fakegpt/ss-8.jpeg", caption: "Function declaration for credential theft" },
  { num: 9, icon: "🔒", title: "Encryption Algorithm", question: "Which encryption algorithm is applied to secure the data before sending?", answer: "AES", img: "../../assets/images/practical/Malware Analysis/fakegpt/ss-9.jpeg", caption: "Identification of the encryption library and AES method" },
  { num: 10, icon: "🍪", title: "Sensitive Data Access", question: "What does the extension access to store or manipulate session-related data?", answer: "cookies", img: "../../assets/images/practical/Malware Analysis/fakegpt/ss-10.jpeg", caption: "Extension permissions and code accessing chrome.cookies API" },
];

export default function FakeGPT() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <div className="proj-page">
      <div className="proj-topbar">
        <Link to="/practice/blue-team" className="proj-back">Back to Labs</Link>
        <span className="proj-topbar-title">&gt;_ FakeGPT Analysis</span>
        <span style={{ fontSize: 11, color: "var(--muted)", letterSpacing: 1 }}>Malware Analysis</span>
      </div>

      <div className="proj-hero">
        <div className="proj-hero-label">06 — BLUE TEAM / LAB 01</div>
        <h1>🧩 FakeGPT <span>Malware Analysis</span></h1>
        <p className="proj-hero-sub">
          Static analysis & behavioral investigation of a malicious Chrome extension that harvested
          Facebook credentials via base64 obfuscation, keylogging, and AES-encrypted exfiltration.
        </p>
        <div className="proj-tag-row">
          {["Malware Analysis", "Chrome Extension", "Credential Theft", "ExtAnalysis", "CRX Viewer"].map((t) => (
            <span key={t} className="proj-tag">{t}</span>
          ))}
        </div>
      </div>

      <div className="proj-body">
        {/* SCENARIO */}
        <div className="p-card">
          <div className="p-card-head"><span className="p-card-icon">📋</span><h2>Scenario</h2></div>
          <div className="p-card-body">
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.8 }}>
              Your cybersecurity team has been alerted to suspicious activity on your organization's network.
              Several employees reported unusual behavior in their browsers after installing what they believed
              to be a helpful browser extension named "ChatGPT". However, strange things started happening:
              accounts were being compromised, and sensitive information appeared to be leaking.
            </p>
            <LabMeta
              category="Malware Analysis"
              tactics={["Credential Access", "Collection", "Command and Control", "Exfiltration"]}
              tools={["ExtAnalysis", "CRX Viewer"]}
              proofLink="https://cyberdefenders.org/blueteam-ctf-challenges/achievements/Prit_Gujarati/fakegpt/"
            />
            <div className="lab-media" style={{ marginTop: 20 }} onClick={() => setLightbox("../../assets/images/practical/Malware Analysis/fakegpt/main.png")}>
              <img src="../../assets/images/practical/Malware Analysis/fakegpt/main.png" alt="FakeGPT Main" />
            </div>
          </div>
        </div>

        {/* STEPS */}
        {STEPS.map((s) => (
          <LabStep key={s.num} num={s.num} icon={s.icon} title={s.title} question={s.question} answer={s.answer}>
            <LabMedia src={s.img} alt={s.title} caption={s.caption} onZoom={setLightbox} />
          </LabStep>
        ))}
      </div>

      <footer className="proj-footer">
        <span>Lab by <a href="https://www.linkedin.com/in/prit-gujarati-2a703b275/" target="_blank" rel="noopener noreferrer">Prit Gujarati</a></span>
        <span>[ FAKEGPT ]</span>
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