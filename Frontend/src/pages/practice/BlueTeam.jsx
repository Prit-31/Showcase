import { Link } from "react-router-dom";
import "../../styles/projects.css";

const LABS = [
  {
    id: "fakegpt",
    num: "01",
    icon: "🧩",
    title: "FakeGPT Malware Analysis",
    desc: "Static analysis & behavioral investigation of a malicious Chrome extension that harvested Facebook credentials via base64 obfuscation and AES encryption.",
    category: "Malware Analysis",
    tactics: ["Credential Access", "Collection", "Exfiltration"],
    tools: ["ExtAnalysis", "CRX Viewer"],
    questions: 10,
  },
  {
    id: "oski",
    num: "02",
    icon: "🦠",
    title: "Oski Malware Analysis",
    desc: "Sandbox report analysis of an info-stealer distributed via a malicious PPT attachment. Investigated C2 communication, RC4 keys, and self-deletion behavior.",
    category: "Threat Intel",
    tactics: ["Initial Access", "Execution", "Defense Evasion", "Credential Access", "Exfiltration"],
    tools: ["VirusTotal", "ANY.RUN"],
    questions: 7,
  },
  {
    id: "poisoned-credentials",
    num: "03",
    icon: "☠️",
    title: "PoisonedCredentials",
    desc: "LLMNR/NBT-NS poisoning investigation via Wireshark. Identified the rogue machine, poisoned victims, captured NTLM hashes, and traced SMB access.",
    category: "Network Forensics",
    tactics: ["Credential Access", "Collection"],
    tools: ["Wireshark"],
    questions: 5,
  },
  {
    id: "webstrike",
    num: "04",
    icon: "🌐",
    title: "WebStrike Network Analysis",
    desc: "PCAP analysis of a web server compromise. Traced a file upload attack, identified a PHP web shell, found the upload directory, and tracked reverse shell port.",
    category: "Network Forensics",
    tactics: ["Initial Access", "Execution", "Persistence", "Command & Control", "Exfiltration"],
    tools: ["Wireshark"],
    questions: 6,
  },
  {
    id: "soc-brute-force",
    num: "05",
    icon: "🔑",
    title: "SOC Brute Force Investigation",
    desc: "Hands-on SOC workflow detecting and investigating a brute force attack — detection, Splunk queries, log analysis, evidence collection, and professional report.",
    category: "Incident Response",
    tactics: ["Brute Force", "Authentication Attack"],
    tools: ["Splunk", "Linux Auth Logs"],
    questions: null,
  },
  {
    id: "soc-phishing",
    num: "06",
    icon: "🎣",
    title: "SOC Phishing Investigation",
    desc: "Email & firewall log correlation for a phishing incident. Confirmed user interaction, classified the alert, executed containment, and documented IOCs.",
    category: "Incident Response",
    tactics: ["Phishing", "Credential Harvesting"],
    tools: ["SIEM", "Email Logs", "Firewall Logs"],
    questions: null,
  },
  {
    id: "health-hazard",
    num: "07",
    icon: "⚡",
    title: "Health Hazard – Supply Chain",
    desc: "Threat hunting investigation into a trojanized NPM package. Traced PowerShell execution, malware download, registry Run key persistence, and attack timeline.",
    category: "Threat Hunting",
    tactics: ["Initial Access", "Execution", "Persistence", "Defense Evasion"],
    tools: ["Splunk", "Sysmon"],
    questions: null,
  },
];

export default function BlueTeam() {
  return (
    <div className="proj-page">
      {/* TOP NAV */}
      <div className="proj-topbar">
        <Link to="/" className="proj-back">Back to Portfolio</Link>
        <span className="proj-topbar-title">&gt;_ Blue Team Labs</span>
        <span style={{ fontSize: 11, color: "var(--muted)", letterSpacing: 1 }}>7 Labs</span>
      </div>

      {/* HERO */}
      <div className="proj-hero">
        <div className="proj-hero-label">06 — PRACTICE / BLUE TEAM</div>
        <h1>🔐 Blue Team <span>Labs</span></h1>
        <p className="proj-hero-sub">
          CTF-style investigations and hands-on SOC practice covering malware analysis,
          network forensics, threat hunting, and incident response workflows.
        </p>
        <div className="proj-tag-row">
          {["Malware Analysis", "Network Forensics", "Threat Hunting", "SOC", "Incident Response", "Wireshark", "Splunk"].map((t) => (
            <span key={t} className="proj-tag">{t}</span>
          ))}
        </div>
      </div>

      <div className="proj-body">
        <div className="lab-hub-grid">
          {LABS.map((lab) => (
            <Link key={lab.id} to={`/practice/blue-team/${lab.id}`} className="lab-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <span className="lab-card-num">// {lab.num}</span>
                {lab.questions && (
                  <span style={{ fontSize: 10, color: "var(--muted)", border: "1px solid var(--border)", padding: "1px 7px", fontFamily: "Fira Code" }}>
                    {lab.questions} Q's
                  </span>
                )}
              </div>
              <span className="lab-card-icon">{lab.icon}</span>
              <div className="lab-card-title">{lab.title}</div>
              <p className="lab-card-desc">{lab.desc}</p>
              <div className="lab-card-tags">
                <span className="lab-card-tag cat">{lab.category}</span>
                {lab.tactics.slice(0, 2).map((t) => (
                  <span key={t} className="lab-card-tag tactic">{t}</span>
                ))}
                {lab.tools.slice(0, 2).map((t) => (
                  <span key={t} className="lab-card-tag tool">{t}</span>
                ))}
              </div>
              <span className="lab-card-open">Open Lab →</span>
            </Link>
          ))}
        </div>
      </div>

      <footer className="proj-footer">
        <span>Labs by <a href="https://www.linkedin.com/in/prit-gujarati-2a703b275/" target="_blank" rel="noopener noreferrer">Prit Gujarati</a></span>
        <span>[ BLUE TEAM ]</span>
      </footer>
    </div>
  );
}