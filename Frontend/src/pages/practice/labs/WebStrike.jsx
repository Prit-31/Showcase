import { useState } from "react";
import { Link } from "react-router-dom";
import "../../../styles/projects.css";
import { LabStep, LabMedia, LabMeta, LabMethod } from "../../../components/practice/LabWrapper.jsx";

export default function WebStrike() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <div className="proj-page">
      <div className="proj-topbar">
        <Link to="/practice/blue-team" className="proj-back">Back to Labs</Link>
        <span className="proj-topbar-title">&gt;_ WebStrike</span>
        <span style={{ fontSize: 11, color: "var(--muted)", letterSpacing: 1 }}>Network Forensics</span>
      </div>

      <div className="proj-hero">
        <div className="proj-hero-label">06 — BLUE TEAM / LAB 04</div>
        <h1>🌐 Web<span>Strike</span></h1>
        <p className="proj-hero-sub">
          PCAP analysis of a web server compromise — traced a file upload attack, identified a PHP web shell,
          found the upload directory, and tracked the reverse shell port and data exfiltration.
        </p>
        <div className="proj-tag-row">
          {["Network Forensics", "Web Shell", "File Upload", "Wireshark", "PCAP"].map((t) => (
            <span key={t} className="proj-tag">{t}</span>
          ))}
        </div>
      </div>

      <div className="proj-body">
        <div className="p-card">
          <div className="p-card-head"><span className="p-card-icon">📋</span><h2>Scenario</h2></div>
          <div className="p-card-body">
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.8 }}>
              A suspicious file was identified on a company web server, raising alarms within the intranet.
              The Development team flagged the anomaly, suspecting potential malicious activity. The network
              team captured critical network traffic and prepared a PCAP file for review. Your task is to
              analyze the PCAP to uncover how the file appeared and determine the extent of unauthorized activity.
            </p>
            <LabMeta
              category="Network Forensics"
              tactics={["Initial Access", "Execution", "Persistence", "Command & Control", "Exfiltration"]}
              tools={["Wireshark"]}
              proofLink="https://cyberdefenders.org/blueteam-ctf-challenges/achievements/Prit_Gujarati/webstrike/"
            />
            <div className="lab-media" style={{ marginTop: 20 }} onClick={() => setLightbox("../../assets/images/practical//Threat Hunting/WebStrike/main.png")}>
              <img src="../../assets/images/practical//Threat Hunting/WebStrike/main.png" alt="WebStrike Main" />
            </div>
          </div>
        </div>

        {/* Q1 */}
        <LabStep num={1} icon="📍" title="Geo-Location Origin" question="From which city did the attack originate?" answer="Tianjin">
          <LabMethod title="Analysis Methodology">
            Identified the attacker's source IP address from the network traffic in Wireshark.
            Checked this IP using an external IP Geolocation service, which revealed the city name.
          </LabMethod>
        </LabStep>

        {/* Q2 */}
        <LabStep num={2} icon="🕵" title="Attacker User-Agent" question="What is the attacker's Full User-Agent?" answer="Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0">
          <LabMedia src="../../assets/images/practical/Threat Hunting/WebStrike/s-1.png" alt="Q2" caption="HTTP header analysis identifying the user agent string" onZoom={setLightbox} />
        </LabStep>

        {/* Q3 */}
        <LabStep num={3} icon="🐛" title="Malicious Web Shell" question="What is the name of the malicious web shell that was successfully uploaded?" answer="image.jpg.php">
          <LabMedia src="../../assets/images/practical/Threat Hunting/WebStrike/s-2.png" alt="Q3" caption="HTTP POST request analysis showing the file upload payload" onZoom={setLightbox} />
        </LabStep>

        {/* Q4 */}
        <LabStep num={4} icon="📁" title="Upload Directory" question="Which directory is used by the website to store the uploaded files?" answer="/reviews/uploads/">
          <LabMedia src="../../assets/images/practical/Threat Hunting/WebStrike/s-3.png" alt="Q4" caption="File path in the HTTP response confirming the upload directory" onZoom={setLightbox} />
        </LabStep>

        {/* Q5 */}
        <LabStep num={5} icon="🚪" title="Reverse Shell Port" question="Which port, opened on the attacker's machine, was targeted by the malicious web shell?" answer="8080">
          <LabMethod
            title="Analysis Methodology"
            filter="ip.dst == attacker_ip && tcp.flags.syn == 1"
          >
            Filtered traffic to view TCP connections initiated by the compromised web server towards the
            attacker's IP. Observed a SYN packet sent to a specific destination port on the attacker's machine,
            indicating an attempt to establish a reverse connection.
          </LabMethod>
        </LabStep>

        {/* Q6 */}
        <LabStep num={6} icon="📤" title="Data Exfiltration" question="Which file was the attacker attempting to exfiltrate?" answer="passwd">
          <LabMedia src="../../assets/images/practical/Threat Hunting/WebStrike/s-4.png" alt="Q6" caption="Command execution traffic revealing the cat /etc/passwd command" onZoom={setLightbox} />
        </LabStep>
      </div>

      <footer className="proj-footer">
        <span>Lab by <a href="https://www.linkedin.com/in/prit-gujarati-2a703b275/" target="_blank" rel="noopener noreferrer">Prit Gujarati</a></span>
        <span>[ WEBSTRIKE ]</span>
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