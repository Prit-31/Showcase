export const SKILLS = [
  {
    category: "Programming",
    items: [
      { name: "Python", icon: "https://img.icons8.com/color/48/python--v1.png" },
      { name: "Bash", icon: "https://img.icons8.com/color/48/console.png" },
      { name: "SQL", icon: "https://img.icons8.com/color/48/sql.png" },
      { name: "Node.js", icon: "https://img.icons8.com/color/48/nodejs.png" },
      { name: "React", icon: "https://img.icons8.com/color/48/react-native.png" },
      { name: "MongoDB", icon: "https://img.icons8.com/color/48/mongodb.png" },
      { name: "REST APIs", icon: "https://img.icons8.com/color/48/api.png" },
    ],
  },
  {
    category: "Security Tools",
    items: [
      { name: "Splunk", icon: "https://images.seeklogo.com/logo-png/33/1/splunk-logo-png_seeklogo-333673.png" },
      { name: "Snort IDS/IPS", icon: "https://img.icons8.com/color/48/security-checked.png" },
      { name: "ModSecurity WAF", icon: "https://img.icons8.com/color/48/firewall.png" },
      { name: "Kali Linux", icon: "https://www.kali.org/images/kali-dragon-icon.svg" },
      { name: "Nmap", icon: "https://img.icons8.com/?size=100&id=9b5wowKIlo9d&format=png&color=40C057" },
      { name: "Wireshark", icon: "https://img.icons8.com/?size=100&id=rOHcpTUtCTjr&format=png&color=40C057" },
      { name: "Burp Suite", icon: "https://img.icons8.com/color/48/bug.png" },
      { name: "OWASP ZAP", icon: "https://img.icons8.com/color/48/security-configuration.png" },
      { name: "Metasploit", icon: "https://img.icons8.com/color/48/hacker.png" },
      { name: "UFW", icon: "https://img.icons8.com/color/48/firewall.png" },
      { name: "iptables", icon: "https://img.icons8.com/color/48/firewall.png" },
    ],
  },
  {
    category: "SOC & Blue Team",
    items: [
      { name: "SIEM Monitoring", icon: "https://img.icons8.com/fluency/48/security-checked.png" },
      { name: "Incident Response", icon: "https://img.icons8.com/color/48/warranty.png" },
      { name: "Threat Detection", icon: "https://img.icons8.com/color/48/bug.png" },
      { name: "Log Analysis", icon: "https://img.icons8.com/color/48/document--v1.png" },
      { name: "Network Security", icon: "https://img.icons8.com/color/48/network.png" },
      { name: "OWASP Top 10", icon: "https://images.seeklogo.com/logo-png/40/1/open-web-application-security-project-owasp-logo-png_seeklogo-408771.png" },
    ],
  },
];
export const PROJECTS = [
  {
    id: "secureeye",
    name: "SecureEye ",
    emoji: "🛡️",
    tag: "Cybersecurity",
    desc: "AI-powered intrusion detection & remote monitoring system using face recognition, live AV recording, mobile remote control, automated email alerts and cloud sync.",
    tags: [
      "Python",
      "OpenCV",
      "Flask",
      "Computer Vision",
      "Face Recognition",
      "Live Streaming",
      "Remote Access",
      "Automation",
      "Email Automation",
      "Cloud Sync"
    ],
    img: "/assets/images/projects/secureeye/dash.png",
  },
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
    img: "/assets/images/projects/secureeye/dash.png",
  },

  // {
  //   id: "pyedr",
  //   name: "PyEDR",
  //   emoji: "🖥️",
  //   tag: "EDR / Blue Team",
  //   desc: "Full Python Endpoint Detection & Response platform inspired by CrowdStrike Falcon. Real-time telemetry collection, MITRE ATT&CK-mapped detection, live SOC dashboard, and one-click endpoint isolation — all open-source.",
  //   tags: ["Python", "Flask", "psutil", "Socket.IO", "MITRE ATT&CK"],
  //   img: "/assets/images/projects/pyedr/dash.png",
  // },
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