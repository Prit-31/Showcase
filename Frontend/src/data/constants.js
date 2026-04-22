export const SKILLS = [
  { name: "Web Development", icon: "https://img.icons8.com/color/48/web.png" },
  { name: "Python", icon: "https://img.icons8.com/color/48/python--v1.png" },
  { name: "Nmap", icon: "https://img.icons8.com/?size=100&id=9b5wowKIlo9d&format=png&color=40C057" },
  { name: "Wireshark", icon: "https://img.icons8.com/?size=100&id=rOHcpTUtCTjr&format=png&color=40C057" },
  { name: "Kali Linux", icon: "https://www.kali.org/images/kali-dragon-icon.svg" },
  { name: "Splunk", icon: "https://images.seeklogo.com/logo-png/33/1/splunk-logo-png_seeklogo-333673.png" },
  { name: "SIEM", icon: "https://img.icons8.com/fluency/48/security-checked.png" },
  { name: "Log Analysis", icon: "https://img.icons8.com/color/48/document--v1.png" },
  { name: "Incident Response", icon: "https://img.icons8.com/color/48/warranty.png" },
  { name: "Vulnerability Assessment", icon: "https://img.icons8.com/color/48/security-configuration.png" },
  { name: "Threat Detection", icon: "https://img.icons8.com/color/48/bug.png" },
  { name: "Networking", icon: "https://img.icons8.com/color/48/network.png" },
  { name: "OWASP Top 10", icon: "https://images.seeklogo.com/logo-png/40/1/open-web-application-security-project-owasp-logo-png_seeklogo-408771.png" },
  { name: "Burp Suite", icon: "https://cdn.shopaccino.com/igmguru/products/untitled-design-1-477741749258147_m.jpg?v=546" },
  { name: "Cryptography", icon: "https://img.icons8.com/color/48/lock.png" },
  { name: "Ettercap", icon: "https://avatars.githubusercontent.com/u/1973147?v=4" },
];

export const PROJECTS = [
  {
    id: "sentinelshield",
    name: "SentinelShield",
    emoji: "🛡️",
    tag: "IDS / WAF",
    desc: "Advanced Intrusion Detection & Web Protection System. Combines Snort IPS + ModSecurity + Python automation engine. Blocks SQLi, XSS, DoS, port scans with real-time UFW IP blacklisting.",
    tags: ["Python", "Snort", "ModSecurity", "Splunk", "Linux/UFW"],
    img: "/assets/images/projects/SentinelShield/dash.png",
  },
  {
    id: "ip-scanner",
    name: "Network Port Scanner",
    emoji: "🔍",
    tag: "Security Tool",
    desc: "Full-stack cybersecurity application. FastAPI backend + React frontend. IP scanning, OS detection, geolocation, TCP/UDP port analysis for security researchers and pentesters.",
    tags: ["Python", "FastAPI", "React.js", "Nmap", "IP-API"],
    img: "/assets/images/projects/ip-scanner/dash.png",
  },
  {
    id: "riderush",
    name: "Ride Rush",
    emoji: "🚗",
    tag: "Full-Stack",
    desc: "Cab booking management system with real-time GPS tracking, Socket.IO notifications, Razorpay payments, driver management and comprehensive admin panel.",
    tags: ["React.js", "Node.js", "MongoDB", "Socket.IO", "Google Maps"],
    img: "/assets/images/projects/riderush/home.png",
  },
  {
    id: "pyedr",
    name: "PyEDR",
    emoji: "🖥️",
    tag: "EDR / Blue Team",
    desc: "Full Python Endpoint Detection & Response platform inspired by CrowdStrike Falcon. Real-time telemetry collection, MITRE ATT&CK-mapped detection, live SOC dashboard, and one-click endpoint isolation — all open-source.",
    tags: ["Python", "Flask", "psutil", "Socket.IO", "MITRE ATT&CK"],
    img: "/assets/images/projects/pyedr/dash.png",
  },
];

export const CERTS = [
  { name: "Tata Cybersecurity", img: "/assets/images/cert/tata.png", link: null },
  { name: "Google Certificate", img: "/assets/images/cert/google.jpeg", link: "https://www.linkedin.com/in/prit-gujarati-2a703b275/details/certifications/" },
  { name: "CEH", img: "/assets/images/cert/ceh.jpg", link: "https://www.linkedin.com/posts/prit-gujarati-2a703b275_certifiedethicalhacker-ceh-cybersecurity-activity-7372469681779093504-BruQ" },
  { name: "Network+", img: "/assets/images/cert/network+.jpg", link: "https://www.linkedin.com/posts/prit-gujarati-2a703b275_certificate-of-completion-activity-7354702115912531968-tv6V" },
  { name: "Security+", img: "/assets/images/cert/security+.jpg", link: "https://www.linkedin.com/posts/prit-gujarati-2a703b275_certificate-of-completion-activity-7351139150261059585-A_fg" },
];

export const PRACTICES = [
  {
    name: "Linux UFW Firewall",
    desc: "Corporate-style host firewall using UFW. Default-deny policy, SSH rate limiting, ICMP restrictions, stealth scan blocking, anti-spoofing rules.",
    link: "/practice/firewall",
    icon: "🔥",
    count: "Practice",
  },
  {
    name: "Blue Team Labs",
    desc: "CTF-style investigations covering malware analysis, network forensics, SOC incident response, threat hunting, and phishing triage.",
    link: "/practice/blue-team",
    icon: "🔐",
    count: "7 Labs",
  },
];

export const NAV_ITEMS = ["home", "about", "skills", "education", "work", "contact"];

export const TYPING_STRINGS = ["Cybersecurity Student", "SOC Analyst Intern Aspirant", "Blue Team Enthusiast"];