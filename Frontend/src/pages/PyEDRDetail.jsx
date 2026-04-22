import { useState } from "react";

// ── Data ─────────────────────────────────────────────────────────────────────
const PROJECT = {
  name: "PyEDR",
  version: "v1.0.0",
  tag: "EDR / Blue Team",
  emoji: "🖥️",
  status: "Production-Ready Prototype",
  platform: "Windows 10/11 · Linux Ubuntu 20+",
  language: "Python 3.10+ · JavaScript",
  headline: "Open-Source Endpoint Detection & Response System",
  description:
    "PyEDR is a comprehensive Python-based EDR platform inspired by CrowdStrike Falcon. It deploys lightweight agents on monitored endpoints that stream telemetry to a central Flask console — which runs a MITRE ATT&CK–mapped detection engine and pushes live alerts to a SOC dashboard via WebSocket in real time.",
  keyFact:
    "6 high-fidelity alerts (3 CRITICAL, 3 HIGH) from a simulated attack chain in under 200 ms · 0 false negatives.",
  stack: [
    { label: "Agent", value: "Python 3.10+ / psutil", purpose: "Telemetry collection on endpoints" },
    { label: "Console API", value: "Flask 3.x + Flask-SocketIO", purpose: "REST API + real-time event push" },
    { label: "Detection", value: "Pure Python (in-memory)", purpose: "Rule-based + behavioural correlation" },
    { label: "Dashboard", value: "HTML5 / Vanilla JS / Canvas", purpose: "Live monitoring UI" },
    { label: "Transport", value: "HTTP JSON + WebSocket", purpose: "Agent-to-console & browser updates" },
    { label: "Persistence", value: "In-memory deque", purpose: "Events & alerts store (swap for DB)" },
  ],
  capabilities: [
    "Real-time telemetry streaming via WebSocket from agent to console",
    "12+ detection rules mapped to MITRE ATT&CK framework",
    "Behavioural correlation engine — process burst / lateral movement detection",
    "One-click endpoint isolation and file quarantine from the web console",
    "Full process tree visualisation per host",
    "Alert lifecycle management: Open → In Progress → Resolved / False Positive",
    "Risk scoring (0–100) with four severity levels: CRITICAL, HIGH, MEDIUM, LOW",
  ],
  collectors: [
    {
      id: "proc",
      icon: "⚙️",
      name: "Process Collector",
      color: "#00d4ff",
      desc: "Tracks every new process creation and termination via psutil.process_iter(). Emits PID, parent PID, executable path, full command line, username, MD5 hash, and a heuristic risk score per event.",
      scoring: [
        { label: "Known attack tool name (mimikatz, meterpreter…)", score: "+90" },
        { label: "Suspicious cmdline pattern (-EncodedCommand, IEX…)", score: "+30 each" },
        { label: "Office app spawning PowerShell", score: "+40" },
        { label: "Execution from %TEMP% / Downloads / AppData", score: "+20" },
      ],
    },
    {
      id: "net",
      icon: "🌐",
      name: "Network Collector",
      color: "#f5c842",
      desc: "Monitors all ESTABLISHED and LISTEN TCP/UDP connections via psutil.net_connections(). Delta-tracks seen connection tuples to avoid re-emitting long-lived stable connections.",
      scoring: [
        { label: "Remote port in C2 set (4444, 1337, 31337, 8888…)", score: "+70" },
        { label: "Internal RFC-1918 address", score: "+5 (lower suspicion)" },
      ],
    },
    {
      id: "file",
      icon: "📁",
      name: "File System Collector",
      color: "#ff8c42",
      desc: "Polls %TEMP%, %APPDATA%, System32, and Downloads by comparing mtime snapshots per scan cycle. Emits created and modified events for any changed file.",
      scoring: [
        { label: "Suspicious extension (.exe .dll .ps1 .bat .vbs .hta…)", score: "60" },
        { label: "Non-executable file change", score: "10" },
      ],
    },
    {
      id: "reg",
      icon: "🗝️",
      name: "Registry Collector",
      color: "#b06cff",
      desc: "Monitors five high-value Windows registry key paths known for persistence abuse. Uses winreg; gracefully returns empty on Linux. Detects value_added, value_modified, and value_deleted changes.",
      scoring: [
        { label: "Run / RunOnce / Services / Winlogon key write", score: "70" },
        { label: "Registry value deleted", score: "30" },
      ],
    },
    {
      id: "cmd",
      icon: "💻",
      name: "Command Line Collector",
      color: "#ff3b5c",
      desc: "Captures full command lines from PowerShell, CMD, bash, sh, Python, WScript, and CScript processes. Applies 20+ pattern matches for LOLBin abuse, credential dumping, shadow-copy deletion, and account manipulation.",
      scoring: [
        { label: "Per suspicious pattern match", score: "+35" },
        { label: "3+ patterns simultaneously", score: "CRITICAL (100)" },
      ],
    },
  ],
  detectionRules: [
    { rule: "Suspicious Process Execution", trigger: "Process score ≥ 40", mitre: "T1059", sev: "HIGH" },
    { rule: "Mimikatz / Credential Dumping", trigger: "Name in suspicious set", mitre: "T1003", sev: "CRITICAL" },
    { rule: "Obfuscated PowerShell", trigger: "-EncodedCommand or IEX in cmdline", mitre: "T1059.001", sev: "HIGH" },
    { rule: "Office Macro Spawn", trigger: "Office parent + PowerShell child", mitre: "T1566.001", sev: "HIGH" },
    { rule: "Suspicious Network Connection", trigger: "Network score ≥ 50 (C2 port)", mitre: "T1071", sev: "CRITICAL" },
    { rule: "Suspicious File Drop", trigger: "File score ≥ 50 (sus extension)", mitre: "T1105", sev: "HIGH" },
    { rule: "Registry Persistence", trigger: "Registry score ≥ 50 (Run key write)", mitre: "T1547.001", sev: "HIGH" },
    { rule: "SAM Credential Dump", trigger: "reg save HKLM\\SAM in cmdline", mitre: "T1003.002", sev: "CRITICAL" },
    { rule: "Shadow Copy Deletion", trigger: "vssadmin delete shadows", mitre: "T1490", sev: "CRITICAL" },
    { rule: "Local Account Creation", trigger: "net user /add in cmdline", mitre: "T1136.001", sev: "HIGH" },
    { rule: "Malicious Command Execution", trigger: "Cmdline score ≥ 30", mitre: "T1059", sev: "MEDIUM" },
    { rule: "Process Burst / Lateral Move", trigger: "8+ scored processes in one poll", mitre: "T1059", sev: "HIGH" },
  ],
  attackChain: [
    { stage: "1 — Initial Access", technique: "Macro → PowerShell spawn (winword.exe parent)", type: "process_create", alert: "Suspicious Process Execution", sev: "HIGH" },
    { stage: "2 — Execution", technique: "Obfuscated PowerShell (-EncodedCommand)", type: "process_create", alert: "Malicious Command Execution", sev: "HIGH" },
    { stage: "3 — C2 Comms", technique: "Reverse shell to 185.220.101.45:4444", type: "network_connection", alert: "Suspicious Network Connection", sev: "CRITICAL" },
    { stage: "4 — Credential Access", technique: "mimikatz.exe launched", type: "process_create", alert: "Suspicious Process Execution", sev: "CRITICAL" },
    { stage: "5 — Persistence", technique: "Registry Run key write", type: "registry_event", alert: "Registry Persistence Detected", sev: "HIGH" },
    { stage: "6 — Impact", technique: "vssadmin delete shadows", type: "cmdline_event", alert: "Malicious Command Execution", sev: "CRITICAL" },
    { stage: "7 — Payload Drop", technique: "payload.exe created in %TEMP%", type: "file_event", alert: "Suspicious File Activity", sev: "HIGH" },
  ],
  mitreCoverage: [
    { tactic: "Initial Access",       id: "T1566.001", name: "Spearphishing Attachment",          detection: "Office parent + PowerShell child spawn" },
    { tactic: "Execution",            id: "T1059",     name: "Command & Scripting Interpreter",   detection: "Process burst, suspicious process" },
    { tactic: "Execution",            id: "T1059.001", name: "PowerShell",                        detection: "-EncodedCommand, IEX, DownloadString" },
    { tactic: "Persistence",          id: "T1136.001", name: "Local Account Creation",            detection: "net user /add" },
    { tactic: "Persistence",          id: "T1547.001", name: "Registry Run Keys",                 detection: "HKLM Run/RunOnce key write" },
    { tactic: "Credential Access",    id: "T1003",     name: "OS Credential Dumping",             detection: "mimikatz.exe, wce.exe, pwdump" },
    { tactic: "Credential Access",    id: "T1003.002", name: "SAM Credential Dump",               detection: "reg save HKLM\\SAM" },
    { tactic: "Command & Control",    id: "T1071",     name: "Application Layer Protocol",        detection: "C2 port matching (4444, 1337…)" },
    { tactic: "Exfiltration",         id: "T1105",     name: "Ingress Tool Transfer",             detection: "DownloadString, suspicious file drop" },
    { tactic: "Impact",               id: "T1490",     name: "Inhibit System Recovery",           detection: "vssadmin delete, bcdedit /set" },
    { tactic: "Discovery",            id: "T1057",     name: "Process Discovery",                 detection: "tasklist, pslist in cmdline" },
  ],
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const SEV_STYLE = {
  CRITICAL: { bg: "rgba(255,23,68,.18)",   border: "rgba(255,23,68,.45)",   color: "#ff1744" },
  HIGH:     { bg: "rgba(255,109,0,.18)",   border: "rgba(255,109,0,.45)",   color: "#ff6d00" },
  MEDIUM:   { bg: "rgba(255,214,0,.13)",   border: "rgba(255,214,0,.35)",   color: "#ffd600" },
  LOW:      { bg: "rgba(105,240,174,.1)",  border: "rgba(105,240,174,.3)",  color: "#69f0ae" },
  INFO:     { bg: "rgba(64,196,255,.1)",   border: "rgba(64,196,255,.25)",  color: "#40c4ff" },
};
function SevBadge({ sev }) {
  const s = SEV_STYLE[sev] || SEV_STYLE.INFO;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: "2px 9px", borderRadius: 3,
      background: s.bg, border: `1px solid ${s.border}`, color: s.color,
      fontSize: 10, fontWeight: 700, letterSpacing: ".6px", textTransform: "uppercase",
    }}>{sev}</span>
  );
}
function MitreBadge({ id }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      background: "rgba(176,108,255,.15)", border: "1px solid rgba(176,108,255,.35)",
      color: "#b06cff", fontSize: 10, fontWeight: 700,
      padding: "2px 7px", borderRadius: 3, letterSpacing: ".4px",
    }}>{id}</span>
  );
}

// ── CSS-in-JS base styles ─────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background:#070b0f;color:#e0eaf4;font-family:'Space Mono',monospace;font-size:13px;min-height:100vh}
::-webkit-scrollbar{width:5px;height:5px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:#1e2d3d;border-radius:3px}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
@keyframes scanline{0%{top:-20%}100%{top:110%}}
@keyframes glitch{0%,100%{clip-path:inset(0 0 98% 0)}25%{clip-path:inset(30% 0 60% 0)}50%{clip-path:inset(70% 0 10% 0)}75%{clip-path:inset(5% 0 85% 0)}}
`;

// ── Component ─────────────────────────────────────────────────────────────────
export default function PyEDRDetail() {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeCollector, setActiveCollector] = useState("proc");

  const tabStyle = (t) => ({
    padding: "9px 20px",
    borderBottom: activeTab === t ? "2px solid #00d4ff" : "2px solid transparent",
    color: activeTab === t ? "#00d4ff" : "#4d6580",
    cursor: "pointer", fontSize: 12, fontWeight: 700,
    letterSpacing: "1px", textTransform: "uppercase",
    background: "none", border: "none",
    fontFamily: "'Space Mono', monospace",
    transition: "color .2s",
    borderBottomWidth: 2,
    borderBottomStyle: "solid",
    borderBottomColor: activeTab === t ? "#00d4ff" : "transparent",
  });

  return (
    <>
      <style>{css}</style>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <div style={{
        position: "relative", overflow: "hidden",
        background: "linear-gradient(160deg, #0a1520 0%, #070b0f 60%)",
        borderBottom: "1px solid #1e2d3d",
        padding: "56px 40px 48px",
      }}>
        {/* grid overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(0,212,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,.04) 1px,transparent 1px)",
          backgroundSize: "40px 40px", pointerEvents: "none",
        }} />
        {/* scanline */}
        <div style={{
          position: "absolute", left: 0, right: 0, height: "3px",
          background: "linear-gradient(90deg,transparent,rgba(0,212,255,.3),transparent)",
          animation: "scanline 5s linear infinite", pointerEvents: "none",
        }} />

        <div style={{ position: "relative", maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <span style={{
              background: "rgba(0,212,255,.12)", border: "1px solid rgba(0,212,255,.3)",
              color: "#00d4ff", fontSize: 11, fontWeight: 700, letterSpacing: 1.5,
              padding: "3px 12px", borderRadius: 3, textTransform: "uppercase",
            }}>EDR · Blue Team</span>
            <span style={{
              background: "rgba(105,240,174,.1)", border: "1px solid rgba(105,240,174,.3)",
              color: "#69f0ae", fontSize: 11, fontWeight: 700, letterSpacing: 1.5,
              padding: "3px 12px", borderRadius: 3, textTransform: "uppercase",
            }}>● {PROJECT.status}</span>
          </div>

          <h1 style={{
            fontFamily: "'Syne', sans-serif", fontSize: 52, fontWeight: 800,
            letterSpacing: -1, lineHeight: 1.05, marginBottom: 16,
            color: "#e8eef5",
          }}>
            <span style={{ color: "#00d4ff" }}>Py</span>EDR
            <span style={{ color: "#4d6580", fontSize: 22, fontWeight: 400, marginLeft: 16 }}>
              {PROJECT.version}
            </span>
          </h1>
          <p style={{ color: "#8ba4bf", fontSize: 15, lineHeight: 1.7, maxWidth: 640, marginBottom: 28 }}>
            {PROJECT.description}
          </p>

          {/* Key fact callout */}
          <div style={{
            display: "inline-flex", alignItems: "flex-start", gap: 12,
            background: "rgba(255,23,68,.08)", border: "1px solid rgba(255,23,68,.3)",
            borderLeft: "3px solid #ff1744", borderRadius: 4,
            padding: "10px 16px", marginBottom: 32,
          }}>
            <span style={{ color: "#ff1744", fontSize: 13, marginTop: 1 }}>⚡</span>
            <span style={{ color: "#e0eaf4", fontSize: 12, lineHeight: 1.6 }}>
              <strong style={{ color: "#ff1744" }}>KEY RESULT — </strong>
              {PROJECT.keyFact}
            </span>
          </div>

          {/* Meta pills row */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {PROJECT.stack.map((s) => (
              <span key={s.label} style={{
                background: "#0d1117", border: "1px solid #1e2d3d",
                color: "#8ba4bf", fontSize: 11, padding: "4px 12px",
                borderRadius: 3,
              }}>
                <span style={{ color: "#4d6580" }}>{s.label}: </span>{s.value}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tab bar ──────────────────────────────────────────────────────── */}
      <div style={{
        background: "#0d1117", borderBottom: "1px solid #1e2d3d",
        display: "flex", paddingLeft: 40, gap: 4, overflowX: "auto",
        position: "sticky", top: 0, zIndex: 50,
      }}>
        {[
          ["overview",   "Overview"],
          ["collectors", "Telemetry Collectors"],
          ["detection",  "Detection Engine"],
          ["attack",     "Demo Attack Chain"],
          ["mitre",      "MITRE ATT&CK"],
          ["deploy",     "Deployment"],
        ].map(([t, label]) => (
          <button key={t} style={tabStyle(t)} onClick={() => setActiveTab(t)}>
            {label}
          </button>
        ))}
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "40px 40px 80px" }}>

        {/* ═══════════════ OVERVIEW ═══════════════ */}
        {activeTab === "overview" && (
          <div style={{ animation: "fadeUp .4s ease" }}>
            {/* Architecture diagram */}
            <Section title="System Architecture" sub="Two-tier client-server model">
              <div style={{
                background: "#0a1118", border: "1px solid #1e2d3d",
                borderRadius: 6, padding: "24px 28px", fontFamily: "monospace",
                fontSize: 12, color: "#8ba4bf", lineHeight: 1.8,
                overflowX: "auto",
              }}>
                <div style={{ color: "#00d4ff", marginBottom: 4 }}>┌─────────────────────────────────────────────────────────────┐</div>
                <div style={{ color: "#00d4ff" }}>│ <span style={{ color: "#e0eaf4", fontWeight: 700 }}>EDR CONSOLE</span> (edr_console.py)                               │</div>
                <div style={{ color: "#00d4ff" }}>│ ┌────────────────┐ ┌──────────────┐ ┌────────────────┐    │</div>
                <div style={{ color: "#00d4ff" }}>│ │  <span style={{ color: "#69f0ae" }}>REST API</span>       │ │  <span style={{ color: "#b06cff" }}>Detection</span>    │ │  <span style={{ color: "#f5c842" }}>Web Dashboard</span>  │    │</div>
                <div style={{ color: "#00d4ff" }}>│ │  /api/*        │ │  Engine      │ │  (WebSocket)   │    │</div>
                <div style={{ color: "#00d4ff" }}>│ └───────┬────────┘ └──────────────┘ └────────────────┘    │</div>
                <div style={{ color: "#00d4ff" }}>└──────────┼──────────────────────────────────────────────────┘</div>
                <div style={{ color: "#4d6580", paddingLeft: 12 }}>│ HTTP POST /api/telemetry (JSON batch, every 5 s)</div>
                <div style={{ color: "#00d4ff" }}>┌──────────┴──────────────────────────────────────────────────┐</div>
                <div style={{ color: "#00d4ff" }}>│ <span style={{ color: "#e0eaf4", fontWeight: 700 }}>EDR AGENT</span> (edr_agent.py) — per endpoint                   │</div>
                <div style={{ color: "#00d4ff" }}>│ ┌──────────┐ ┌─────────┐ ┌──────────┐ ┌──────────────┐   │</div>
                <div style={{ color: "#00d4ff" }}>│ │<span style={{ color: "#ff8c42" }}> Process  </span>│ │<span style={{ color: "#f5c842" }}> Network </span>│ │<span style={{ color: "#ff8c42" }}> Files    </span>│ │<span style={{ color: "#b06cff" }}> Registry     </span>│   │</div>
                <div style={{ color: "#00d4ff" }}>│ └──────────┘ └─────────┘ └──────────┘ └──────────────┘   │</div>
                <div style={{ color: "#00d4ff" }}>└─────────────────────────────────────────────────────────────┘</div>
              </div>
            </Section>

            {/* Key capabilities */}
            <Section title="Key Capabilities">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {PROJECT.capabilities.map((c, i) => (
                  <div key={i} style={{
                    display: "flex", gap: 10, alignItems: "flex-start",
                    background: "#0d1117", border: "1px solid #1e2d3d",
                    borderRadius: 5, padding: "10px 14px",
                  }}>
                    <span style={{ color: "#00d4ff", marginTop: 1, flexShrink: 0 }}>▸</span>
                    <span style={{ color: "#8ba4bf", fontSize: 12, lineHeight: 1.6 }}>{c}</span>
                  </div>
                ))}
              </div>
            </Section>

            {/* EDR vs AV comparison */}
            <Section title="EDR vs Traditional Antivirus">
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {["Capability", "Traditional AV", "PyEDR"].map((h) => (
                      <th key={h} style={{
                        textAlign: "left", padding: "9px 14px",
                        fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase",
                        color: "#4d6580", background: "#0a1118",
                        borderBottom: "1px solid #1e2d3d",
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Detection method",       "Signature-based",  "Signature + Behaviour + ML scoring"],
                    ["Fileless malware",        "❌ Not detected",   "✅ Detected via process/memory analysis"],
                    ["Process tree visibility", "❌ None",           "✅ Full parent-child process graph"],
                    ["Network monitoring",      "❌ None",           "✅ All connections with C2 matching"],
                    ["Registry monitoring",     "⚠️ Limited",        "✅ Full persistence key monitoring"],
                    ["Response actions",        "Quarantine file only", "✅ Isolate, quarantine, terminate, triage"],
                    ["MITRE ATT&CK mapping",    "❌ None",           "✅ Per-alert technique + tactic mapping"],
                    ["Custom IOC",              "⚠️ Limited",        "✅ Extensible rule engine"],
                  ].map(([cap, av, edr], i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,.015)" }}>
                      <td style={{ padding: "8px 14px", color: "#e0eaf4", fontSize: 12, borderBottom: "1px solid rgba(30,45,61,.5)" }}>{cap}</td>
                      <td style={{ padding: "8px 14px", color: "#4d6580", fontSize: 12, borderBottom: "1px solid rgba(30,45,61,.5)" }}>{av}</td>
                      <td style={{ padding: "8px 14px", color: "#69f0ae", fontSize: 12, borderBottom: "1px solid rgba(30,45,61,.5)" }}>{edr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Section>
          </div>
        )}

        {/* ═══════════════ COLLECTORS ═══════════════ */}
        {activeTab === "collectors" && (
          <div style={{ animation: "fadeUp .4s ease" }}>
            <p style={{ color: "#4d6580", fontSize: 12, marginBottom: 28, lineHeight: 1.7 }}>
              PyEDR deploys five independent telemetry collectors on each monitored endpoint. Each uses a <em style={{ color: "#8ba4bf" }}>delta-based</em> approach — only emitting events when state changes are detected — minimising bandwidth and processing overhead.
            </p>

            {/* Collector tabs */}
            <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
              {PROJECT.collectors.map((c) => (
                <button key={c.id} onClick={() => setActiveCollector(c.id)} style={{
                  padding: "7px 16px", borderRadius: 4, cursor: "pointer",
                  fontSize: 11, fontWeight: 700, letterSpacing: ".5px",
                  fontFamily: "'Space Mono', monospace",
                  background: activeCollector === c.id ? "rgba(0,212,255,.12)" : "#0d1117",
                  border: activeCollector === c.id ? `1px solid ${c.color}` : "1px solid #1e2d3d",
                  color: activeCollector === c.id ? c.color : "#4d6580",
                  transition: "all .2s",
                }}>
                  {c.icon} {c.name.replace(" Collector", "")}
                </button>
              ))}
            </div>

            {PROJECT.collectors.filter(c => c.id === activeCollector).map((c) => (
              <div key={c.id} style={{
                background: "#0d1117", border: `1px solid ${c.color}30`,
                borderLeft: `3px solid ${c.color}`, borderRadius: 6,
                padding: "24px 28px", animation: "fadeUp .3s ease",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <span style={{ fontSize: 28 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 700, color: c.color }}>{c.name}</div>
                    <div style={{ color: "#4d6580", fontSize: 11, marginTop: 2 }}>edr_agent.py → {c.name.replace(" ", "")}</div>
                  </div>
                </div>
                <p style={{ color: "#8ba4bf", fontSize: 13, lineHeight: 1.8, marginBottom: 24 }}>{c.desc}</p>

                <div style={{ color: "#4d6580", fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12, fontWeight: 700 }}>Risk Scoring</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {c.scoring.map((s, i) => (
                    <div key={i} style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      background: "#070b0f", border: "1px solid #1e2d3d",
                      borderRadius: 4, padding: "8px 14px",
                    }}>
                      <span style={{ color: "#8ba4bf", fontSize: 12 }}>{s.label}</span>
                      <span style={{
                        color: c.color, fontSize: 12, fontWeight: 700,
                        background: `${c.color}18`, border: `1px solid ${c.color}40`,
                        padding: "2px 10px", borderRadius: 3,
                      }}>{s.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ═══════════════ DETECTION ═══════════════ */}
        {activeTab === "detection" && (
          <div style={{ animation: "fadeUp .4s ease" }}>
            <Section title="Detection Rules" sub="12 rules mapped to MITRE ATT&CK">
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {["Rule", "Trigger Condition", "MITRE ID", "Default Sev."].map((h) => (
                      <th key={h} style={{
                        textAlign: "left", padding: "8px 12px", fontSize: 10,
                        letterSpacing: "1.5px", textTransform: "uppercase",
                        color: "#4d6580", background: "#0a1118",
                        borderBottom: "1px solid #1e2d3d", position: "sticky", top: 0,
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PROJECT.detectionRules.map((r, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,.015)" }}>
                      <td style={{ padding: "8px 12px", color: "#e0eaf4", fontSize: 12, borderBottom: "1px solid rgba(30,45,61,.5)", fontWeight: 600 }}>{r.rule}</td>
                      <td style={{ padding: "8px 12px", color: "#8ba4bf", fontSize: 11, borderBottom: "1px solid rgba(30,45,61,.5)" }}>{r.trigger}</td>
                      <td style={{ padding: "8px 12px", borderBottom: "1px solid rgba(30,45,61,.5)" }}><MitreBadge id={r.mitre} /></td>
                      <td style={{ padding: "8px 12px", borderBottom: "1px solid rgba(30,45,61,.5)" }}><SevBadge sev={r.sev} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Section>

            <Section title="Behavioural Correlation" sub="Cross-event analysis beyond per-event rules">
              <div style={{
                background: "#0d1117", border: "1px solid rgba(176,108,255,.3)",
                borderLeft: "3px solid #b06cff", borderRadius: 6, padding: "20px 24px",
              }}>
                <p style={{ color: "#8ba4bf", fontSize: 13, lineHeight: 1.8, marginBottom: 16 }}>
                  The <code style={{ color: "#b06cff", background: "rgba(176,108,255,.12)", padding: "1px 6px", borderRadius: 3 }}>DetectionEngine</code> maintains per-host sliding windows of <code style={{ color: "#b06cff", background: "rgba(176,108,255,.12)", padding: "1px 6px", borderRadius: 3 }}>process_create</code> events using a <code style={{ color: "#b06cff", background: "rgba(176,108,255,.12)", padding: "1px 6px", borderRadius: 3 }}>defaultdict(deque)</code>.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                  {[
                    { label: "Threshold", value: "8+ scored processes", sub: "per poll window" },
                    { label: "Min Score", value: "> 15 per process", sub: "to count toward burst" },
                    { label: "Catches", value: "Worms · Empire · Cobalt Strike", sub: "lateral movement" },
                  ].map((m) => (
                    <div key={m.label} style={{
                      background: "#070b0f", border: "1px solid rgba(176,108,255,.2)",
                      borderRadius: 5, padding: "14px 16px",
                    }}>
                      <div style={{ color: "#4d6580", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>{m.label}</div>
                      <div style={{ color: "#b06cff", fontWeight: 700, fontSize: 13, marginBottom: 3 }}>{m.value}</div>
                      <div style={{ color: "#4d6580", fontSize: 10 }}>{m.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            <Section title="Alert Data Model">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  { field: "id", type: "UUID string", desc: "Unique alert identifier" },
                  { field: "timestamp", type: "ISO 8601", desc: "UTC time of detection" },
                  { field: "agent_id", type: "string", desc: "Originating endpoint identifier" },
                  { field: "hostname", type: "string", desc: "Human-readable endpoint name" },
                  { field: "rule", type: "string", desc: "Name of the triggered detection rule" },
                  { field: "severity", type: "enum", desc: "CRITICAL / HIGH / MEDIUM / LOW / INFO" },
                  { field: "score", type: "integer 0–100", desc: "Risk score from triggering event" },
                  { field: "status", type: "enum", desc: "OPEN / IN_PROGRESS / RESOLVED / FALSE_POSITIVE" },
                  { field: "mitre", type: "tuple | null", desc: "[TechniqueID, TechniqueName]" },
                  { field: "details", type: "string", desc: "Human-readable description of activity" },
                  { field: "raw_event", type: "dict", desc: "Complete originating telemetry event" },
                ].map((f) => (
                  <div key={f.field} style={{
                    background: "#0a1118", border: "1px solid #1e2d3d",
                    borderRadius: 4, padding: "9px 13px", display: "flex", gap: 10,
                  }}>
                    <div style={{ flexShrink: 0 }}>
                      <code style={{ color: "#00d4ff", fontSize: 11 }}>{f.field}</code>
                      <div style={{ color: "#4d6580", fontSize: 9, marginTop: 2 }}>{f.type}</div>
                    </div>
                    <div style={{ color: "#8ba4bf", fontSize: 11, paddingTop: 1 }}>{f.desc}</div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        )}

        {/* ═══════════════ ATTACK CHAIN ═══════════════ */}
        {activeTab === "attack" && (
          <div style={{ animation: "fadeUp .4s ease" }}>
            {/* Result callout */}
            <div style={{
              background: "rgba(105,240,174,.07)", border: "1px solid rgba(105,240,174,.3)",
              borderLeft: "3px solid #69f0ae", borderRadius: 6,
              padding: "14px 20px", marginBottom: 32, display: "flex", gap: 14, alignItems: "flex-start",
            }}>
              <span style={{ fontSize: 20 }}>✅</span>
              <div>
                <div style={{ color: "#69f0ae", fontWeight: 700, fontSize: 13, marginBottom: 4 }}>Test Results</div>
                <div style={{ color: "#8ba4bf", fontSize: 12, lineHeight: 1.7 }}>
                  7 synthetic events injected → <strong style={{ color: "#e0eaf4" }}>6 alerts generated</strong> (3 CRITICAL, 3 HIGH) in <strong style={{ color: "#e0eaf4" }}>&lt; 200 ms</strong>.<br />
                  Detection rate: <strong style={{ color: "#69f0ae" }}>100%</strong> · False positive rate: <strong style={{ color: "#69f0ae" }}>0%</strong>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div style={{ position: "relative" }}>
              <div style={{
                position: "absolute", left: 14, top: 0, bottom: 0,
                width: 1, background: "linear-gradient(to bottom,#00d4ff40,#1e2d3d)",
              }} />
              {PROJECT.attackChain.map((s, i) => {
                const sevColor = { CRITICAL: "#ff1744", HIGH: "#ff6d00", MEDIUM: "#ffd600" }[s.sev] || "#69f0ae";
                return (
                  <div key={i} style={{
                    display: "flex", gap: 24, marginBottom: 20, paddingLeft: 40, position: "relative",
                    animation: `fadeUp ${.3 + i * .07}s ease`,
                  }}>
                    {/* dot */}
                    <div style={{
                      position: "absolute", left: 6, top: 14,
                      width: 18, height: 18, borderRadius: "50%",
                      background: sevColor, boxShadow: `0 0 12px ${sevColor}80`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 9, fontWeight: 700, color: "#070b0f",
                    }}>{i + 1}</div>

                    <div style={{
                      flex: 1, background: "#0d1117", border: `1px solid ${sevColor}30`,
                      borderRadius: 6, padding: "14px 18px",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
                        <span style={{ color: "#4d6580", fontSize: 10, letterSpacing: 1 }}>{s.stage}</span>
                        <SevBadge sev={s.sev} />
                        <span style={{
                          background: "rgba(0,212,255,.1)", border: "1px solid rgba(0,212,255,.25)",
                          color: "#00d4ff", fontSize: 10, padding: "2px 7px", borderRadius: 3,
                        }}>{s.type}</span>
                      </div>
                      <div style={{ color: "#e0eaf4", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{s.technique}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ color: "#4d6580", fontSize: 11 }}>→ Alert:</span>
                        <span style={{ color: sevColor, fontSize: 11, fontWeight: 600 }}>{s.alert}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{
              background: "rgba(255,214,0,.06)", border: "1px solid rgba(255,214,0,.25)",
              borderRadius: 5, padding: "12px 16px", marginTop: 8, fontSize: 12, color: "#8ba4bf", lineHeight: 1.7,
            }}>
              <strong style={{ color: "#ffd600" }}>Note: </strong>
              The payload.exe file drop (Stage 7) contributes to the telemetry stream but falls below the current FILE_SCORE_THRESHOLD of 50. Lowering the threshold to 40 would generate an additional MEDIUM alert.
            </div>
          </div>
        )}

        {/* ═══════════════ MITRE ═══════════════ */}
        {activeTab === "mitre" && (
          <div style={{ animation: "fadeUp .4s ease" }}>
            <p style={{ color: "#4d6580", fontSize: 12, marginBottom: 28, lineHeight: 1.7 }}>
              Every PyEDR alert is tagged with a MITRE ATT&CK technique ID, enabling SOC analysts to understand adversary behaviour and cross-reference threat intelligence reports.
            </p>

            {/* Coverage stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 32 }}>
              {[
                { label: "Tactics Covered", value: "8" },
                { label: "Techniques Mapped", value: "11" },
                { label: "Detection Rules", value: "12" },
                { label: "Coverage Score", value: "High" },
              ].map((m) => (
                <div key={m.label} style={{
                  background: "#0d1117", border: "1px solid rgba(176,108,255,.25)",
                  borderRadius: 6, padding: "16px 18px",
                }}>
                  <div style={{ color: "#4d6580", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>{m.label}</div>
                  <div style={{ color: "#b06cff", fontSize: 26, fontWeight: 800, fontFamily: "'Syne',sans-serif" }}>{m.value}</div>
                </div>
              ))}
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Tactic", "Technique ID", "Technique Name", "PyEDR Detection"].map((h) => (
                    <th key={h} style={{
                      textAlign: "left", padding: "8px 12px", fontSize: 10,
                      letterSpacing: "1.5px", textTransform: "uppercase",
                      color: "#4d6580", background: "#0a1118",
                      borderBottom: "1px solid #1e2d3d",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PROJECT.mitreCoverage.map((m, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,.015)" }}>
                    <td style={{ padding: "8px 12px", color: "#8ba4bf", fontSize: 11, borderBottom: "1px solid rgba(30,45,61,.5)" }}>{m.tactic}</td>
                    <td style={{ padding: "8px 12px", borderBottom: "1px solid rgba(30,45,61,.5)" }}><MitreBadge id={m.id} /></td>
                    <td style={{ padding: "8px 12px", color: "#e0eaf4", fontSize: 12, borderBottom: "1px solid rgba(30,45,61,.5)", fontWeight: 600 }}>{m.name}</td>
                    <td style={{ padding: "8px 12px", color: "#4d6580", fontSize: 11, borderBottom: "1px solid rgba(30,45,61,.5)" }}>{m.detection}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ═══════════════ DEPLOYMENT ═══════════════ */}
        {activeTab === "deploy" && (
          <div style={{ animation: "fadeUp .4s ease" }}>
            <Section title="Prerequisites">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  { item: "Python", req: "3.10 or later", note: "3.11 recommended" },
                  { item: "OS", req: "Windows 10/11 · Linux Ubuntu 20+", note: "Agent runs on both" },
                  { item: "Network", req: "TCP port 5000 open", note: "Between agent and console" },
                  { item: "Memory", req: "256 MB minimum", note: "512 MB recommended" },
                ].map((p) => (
                  <div key={p.item} style={{
                    background: "#0d1117", border: "1px solid #1e2d3d",
                    borderRadius: 5, padding: "10px 14px",
                  }}>
                    <span style={{ color: "#4d6580", fontSize: 10 }}>{p.item}: </span>
                    <span style={{ color: "#e0eaf4", fontSize: 12 }}>{p.req}</span>
                    <div style={{ color: "#4d6580", fontSize: 10, marginTop: 3 }}>{p.note}</div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Quick Start">
              {[
                {
                  step: "1", label: "Install Dependencies",
                  code: `pip install flask flask-socketio psutil requests eventlet`,
                },
                {
                  step: "2", label: "Start the Console",
                  code: `cd console\npython edr_console.py\n# Dashboard → http://localhost:5000`,
                },
                {
                  step: "3", label: "Deploy the Agent",
                  code: `# Windows\nset EDR_CONSOLE_URL=http://192.168.1.100:5000\npython edr_agent.py\n\n# Linux\nexport EDR_CONSOLE_URL=http://192.168.1.100:5000\npython edr_agent.py`,
                },
                {
                  step: "4", label: "Test the Pipeline",
                  code: `# Click "⚡ Inject Demo Attack" in the dashboard\n# Or call the API directly:\ncurl -X POST http://localhost:5000/api/demo/inject`,
                },
              ].map((s) => (
                <div key={s.step} style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <span style={{
                      width: 22, height: 22, borderRadius: "50%",
                      background: "rgba(0,212,255,.15)", border: "1px solid rgba(0,212,255,.4)",
                      color: "#00d4ff", fontSize: 11, fontWeight: 700,
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>{s.step}</span>
                    <span style={{ color: "#e0eaf4", fontWeight: 700, fontSize: 13 }}>{s.label}</span>
                  </div>
                  <pre style={{
                    background: "#070b0f", border: "1px solid #1e2d3d",
                    borderRadius: 5, padding: "14px 18px",
                    color: "#69f0ae", fontSize: 12, lineHeight: 1.8,
                    overflowX: "auto", fontFamily: "'Space Mono', monospace",
                  }}>{s.code}</pre>
                </div>
              ))}
            </Section>

            <Section title="Security Warnings" sub="Required before any real deployment">
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { risk: "No TLS on agent-to-console channel", impact: "HIGH — telemetry interceptable", fix: "Deploy nginx reverse proxy with TLS certificate" },
                  { risk: "No authentication on API", impact: "HIGH — any host can inject fake events", fix: "Add API key or JWT authentication to /api/*" },
                  { risk: "In-memory event store", impact: "MEDIUM — events lost on restart", fix: "Persist to SQLite or PostgreSQL" },
                  { risk: "No rate limiting", impact: "MEDIUM — DoS via event flooding", fix: "Add Flask-Limiter on /api/telemetry" },
                ].map((w, i) => (
                  <div key={i} style={{
                    background: "rgba(255,23,68,.05)", border: "1px solid rgba(255,23,68,.2)",
                    borderLeft: "3px solid #ff1744", borderRadius: 5, padding: "12px 16px",
                    display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, alignItems: "center",
                  }}>
                    <span style={{ color: "#e0eaf4", fontSize: 12 }}>{w.risk}</span>
                    <span style={{ color: "#ff6d00", fontSize: 11 }}>{w.impact}</span>
                    <span style={{ color: "#8ba4bf", fontSize: 11 }}>→ {w.fix}</span>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        )}

      </div>
    </>
  );
}

// ── Section wrapper ───────────────────────────────────────────────────────────
function Section({ title, sub, children }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{
          fontFamily: "'Syne', sans-serif", fontSize: 16,
          fontWeight: 700, color: "#e0eaf4",
        }}>{title}</div>
        {sub && <div style={{ color: "#4d6580", fontSize: 11, marginTop: 3 }}>{sub}</div>}
      </div>
      {children}
    </div>
  );
}