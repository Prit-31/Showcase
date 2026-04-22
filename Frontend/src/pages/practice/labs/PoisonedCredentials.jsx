import { useState } from "react";
import { Link } from "react-router-dom";
import "../../../styles/projects.css";
import { LabStep, LabMedia, LabMeta, LabMethod } from "../../../components/practice/LabWrapper.jsx";

export default function PoisonedCredentials() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <div className="proj-page">
      <div className="proj-topbar">
        <Link to="/practice/blue-team" className="proj-back">Back to Labs</Link>
        <span className="proj-topbar-title">&gt;_ PoisonedCredentials</span>
        <span style={{ fontSize: 11, color: "var(--muted)", letterSpacing: 1 }}>Network Forensics</span>
      </div>

      <div className="proj-hero">
        <div className="proj-hero-label">06 — BLUE TEAM / LAB 03</div>
        <h1>☠️ Poisoned<span>Credentials</span></h1>
        <p className="proj-hero-sub">
          LLMNR/NBT-NS poisoning investigation via Wireshark. Identified the rogue machine,
          poisoned victims, captured NTLM hashes, and traced SMB lateral movement.
        </p>
        <div className="proj-tag-row">
          {["Network Forensics", "LLMNR Poisoning", "NBT-NS", "Wireshark", "NTLM"].map((t) => (
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
              Your organization's security team has detected a surge in suspicious network activity. There are
              concerns that LLMNR and NBT-NS poisoning attacks may be occurring within your network. These attacks
              are known for exploiting these protocols to intercept network traffic and potentially compromise
              user credentials. Your task is to investigate the network logs and examine captured network traffic.
            </p>
            <LabMeta
              category="Network Forensics"
              tactics={["Credential Access", "Collection"]}
              tools={["Wireshark"]}
              proofLink="https://cyberdefenders.org/blueteam-ctf-challenges/achievements/Prit_Gujarati/poisonedcredentials/"
            />
            <div className="lab-media" style={{ marginTop: 20 }} onClick={() => setLightbox("../../assets/images/practical/Threat Hunting/PoisonedCredentials/main.png")}>
              <img src="../../assets/images/practical/Threat Hunting/PoisonedCredentials/main.png" alt="Main evidence" />
            </div>
          </div>
        </div>

        {/* Q1 */}
        <LabStep num={1} icon="⌨" title="Mistyped Query" question="Identify the specific mistyped query made by the machine with the IP address 192.168.232.162." answer="fileshaare">
          <LabMedia src="../../assets/images/practical/Threat Hunting/PoisonedCredentials/q-1.png" alt="Q1" caption="DNS/LLMNR query traffic filtered by the victim's IP" onZoom={setLightbox} />
        </LabStep>

        {/* Q2 */}
        <LabStep num={2} icon="🖥" title="Rogue Machine IP" question="What is the IP address of the machine acting as the rogue entity?">
          <LabMethod
            title="Analysis Methodology"
            filter="(llmnr || nbns) && frame contains &quot;fileshaare&quot;"
          >
            To find the rogue machine, I looked for the device responding to the mistyped query "fileshaare".
            Legitimate DNS servers return a "No such name" error for typos, but a rogue machine running Responder
            sends a positive response claiming to host the service — to capture credentials.
          </LabMethod>
        </LabStep>

        {/* Q3 */}
        <LabStep num={3} icon="💻" title="Second Victim IP" question="What is the IP address of the second machine that received poisoned responses from the rogue machine?">
          <LabMethod
            title="Analysis Methodology"
            filter="ip.src == [rogue_ip] && (llmnr || nbns)"
          >
            After identifying the rogue machine's IP, I filtered traffic to see all LLMNR and NetBIOS responses
            originating from it. By excluding the known first victim, I observed the rogue machine sending
            poisoned responses to a second unique IP address.
          </LabMethod>
        </LabStep>

        {/* Q4 */}
        <LabStep num={4} icon="👤" title="Compromised Username" question="What is the username of the account that the attacker compromised?" answer="janesmith">
          <LabMedia src="../../assets/images/practical/Threat Hunting/PoisonedCredentials/q-2.png" alt="Q4" caption="NTLM authentication capture (NTLMSSP) revealing the username" onZoom={setLightbox} />
        </LabStep>

        {/* Q5 */}
        <LabStep num={5} icon="🖧" title="Attacked Hostname" question="What is the hostname of the machine that the attacker accessed via SMB?" answer="AccountingPC">
          <LabMedia src="../../assets/images/practical/Threat Hunting/PoisonedCredentials/q-4.png" alt="Q5" caption="SMB2 Tree Connect Request showing the target path/hostname" onZoom={setLightbox} />
        </LabStep>
      </div>

      <footer className="proj-footer">
        <span>Lab by <a href="https://www.linkedin.com/in/prit-gujarati-2a703b275/" target="_blank" rel="noopener noreferrer">Prit Gujarati</a></span>
        <span>[ POISONED CREDENTIALS ]</span>
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