import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/projects.css";

// ─── DATA ────────────────────────────────────────────────────────────────────

const STACK = [
    { label: "Python", desc: "Core engine & automation" },
    { label: "OpenCV", desc: "Face recognition (biometric)" },
    { label: "Flask", desc: "Remote web dashboard" },
    { label: "Socket.IO", desc: "Live AV streaming" },
    { label: "smtplib", desc: "Automated email alerts" },
    { label: "Firebase / Cloud", desc: "Session sync & storage" },
];

const CAPABILITIES = [
    {
        layer: "Face Recognition Engine",
        items: [
            { label: "Admin biometric verification at login", badge: "active" },
            { label: "Unknown user detection", badge: "block" },
            { label: "Verification photo capture", badge: "active" },
        ],
    },
    {
        layer: "AV Recording Pipeline",
        items: [
            { label: "Webcam video (webcam.avi)", badge: "active" },
            { label: "Screen capture (video.avi)", badge: "active" },
            { label: "Microphone audio (audio.wav)", badge: "active" },
            { label: "Still photo snapshot (photo.jpg)", badge: "active" },
        ],
    },
    {
        layer: "Automated Alert System",
        items: [
            { label: "Instant email with attacker photo", badge: "block" },
            { label: "Device metadata & event timestamp", badge: "active" },
            { label: "Live stream link in email body", badge: "active" },
        ],
    },
    {
        layer: "Mobile Remote Dashboard",
        items: [
            { label: "Live screen stream", badge: "active" },
            { label: "Live webcam feed", badge: "active" },
            { label: "Live audio stream", badge: "active" },
            { label: "keyboard Lock / Shutdown / Blackout controls ", badge: "block" },
            { label: "Keyboard input & Hold-to-Talk / Overlay Pic", badge: "active" },
        ],
    },
    {
        layer: "Remote Filesystem",
        items: [
            { label: "Browse All drives", badge: "active" },
            { label: "Remote file download", badge: "active" },
            { label: "Remote file delete", badge: "block" },
        ],
    },
    {
        layer: "Cloud Synchronization",
        items: [
            { label: "Offline-first local recording", badge: "active" },
            { label: "Batch upload on reconnection", badge: "active" },
        ],
    },
];

// ─── BADGE PILL ───────────────────────────────────────────────────────────────

function BadgePill({ type }) {
    const map = {
        block: ["b-block", "Active"],
        detect: ["b-detect", "Flagged"],
        active: ["b-active", "Enabled"],
    };
    const [cls, text] = map[type] ?? ["b-active", "On"];
    return <span className={`b ${cls}`}>{text}</span>;
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function SecureEye() {
    const [lightbox, setLightbox] = useState(null);

    const openLightbox = (src) => setLightbox(src);
    const closeLightbox = () => setLightbox(null);

    /** Reusable clickable screenshot */
    const Img = ({ src, alt }) => (
        <div className="p-media" onClick={() => openLightbox(src)}>
            <img src={src} alt={alt} />
        </div>
    );
    const PhoneImg = ({ src, alt }) => (
        <div className="p-phone" onClick={() => openLightbox(src)}>
            <img src={src} alt={alt} />
        </div>
    );
    return (
        <div className="proj-page">

            {/* ── TOP NAV ── */}
            <div className="proj-topbar">
                <Link to="/" className="proj-back">Back to Portfolio</Link>
                <span className="proj-topbar-title">&gt;_ SecureEye</span>
            </div>

            {/* ── HERO ── */}
            <div className="proj-hero">
                <div className="proj-hero-label">05 — PROJECT DETAIL</div>
                <h1>👁️ Secure<span>Eye </span></h1>
                <p className="proj-hero-sub">

                    Unauthorized Access Detection &amp; Remote Monitoring Suite. Detects intruders via
                    face recognition, silently records webcam, screen &amp; audio, dispatches instant
                    email alerts with attacker photo, and gives full mobile remote control.
                </p>
                <div className="proj-tag-row">
                    {["Python", "OpenCV", "Flask", "Socket.IO", "Firebase", "Face Recognition"].map((t) => (
                        <span key={t} className="proj-tag">{t}</span>
                    ))}
                </div>
            </div>

            {/* ── BODY ── */}
            <div className="proj-body">

                {/* ── PROJECT STRATEGY ── */}
                <div className="p-card">
                    <div className="p-card-head">
                        <span className="p-card-icon">⚙</span>
                        <h2>Project Strategy</h2>
                    </div>
                    <div className="p-card-body">
                        <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.8, marginBottom: 24 }}>
                            SecureEye operates as a silent, always-on security layer for any Windows workstation.
                            The moment an{" "}
                            <strong style={{ color: "var(--g)" }}>unknown face</strong> is detected at login,
                            the system automatically records all AV streams, fires an{" "}
                            <strong style={{ color: "var(--g)" }}>email alert</strong>, and exposes a{" "}
                            <strong style={{ color: "var(--g)" }}>mobile-accessible dashboard</strong> for
                            real-time remote control — all without any manual intervention.
                        </p>
                        <div className="tool-grid">
                            {STACK.map((s) => (
                                <div key={s.label} className="tool-row">
                                    <strong>{s.label}</strong>
                                    <span>{s.desc}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── CAPABILITIES TABLE ── */}
                <div className="p-card">
                    <div className="p-card-head">
                        <span className="p-card-icon">🛡</span>
                        <h2>System Capabilities</h2>
                    </div>
                    <div className="p-card-body" style={{ padding: 0 }}>
                        <table className="p-table">
                            <thead>
                                <tr>
                                    <th>Module</th>
                                    <th>Features &amp; Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {CAPABILITIES.map((row) => (
                                    <tr key={row.layer}>
                                        <td><strong>{row.layer}</strong></td>
                                        <td>
                                            {row.items.map((item) => (
                                                <div key={item.label}>
                                                    {item.label}
                                                    <BadgePill type={item.badge} />
                                                </div>
                                            ))}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>

                {/* ── STEP 1: DASHBOARD ── */}
                <div className="p-card">
                    <div className="p-card-head">
                        <span className="p-card-icon">📊</span>
                        <h2>Admin Dashboard</h2>
                    </div>
                    <div className="p-card-body">
                        <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.8, marginBottom: 20 }}>
                            The main dashboard surfaces four critical metrics — Total Logs, Unknown Sessions, Face Matched,
                            and Unique Devices. Below that, a live <strong style={{ color: "var(--g)" }}>Recent Activity</strong>{" "}
                            table shows every event (INFO / ALERT) with timestamp, category, and action name.
                            Sessions are split into <strong style={{ color: "var(--g)" }}>Unknown User</strong> and{" "}
                            <strong style={{ color: "var(--g)" }}>Face Matched</strong> tabs on the right panel.
                        </p>
                        <Img
                            src="/assets/images/projects/secureeye/dash.png"
                            alt="SecureEye Main Dashboard"
                        />
                        <p className="p-caption">
                            Security Metrics row: 20 total logs · 7 unknown sessions · 0 face matched · 1 unique device.
                        </p>
                    </div>
                </div>

                {/* ── STEP 2: ADMIN SETUP & PROFILE ── */}
                <div className="p-card">
                    <div className="p-card-head">
                        <span className="p-card-icon">🔐</span>
                        <h2>Setup: Admin Configuration</h2>
                    </div>
                    <div className="p-card-body">
                        <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.8, marginBottom: 20 }}>
                            Before monitoring begins, the admin configures their identity in two panels.{" "}
                            <strong style={{ color: "var(--g)" }}>Update Profile</strong> sets the display name and
                            notification email.{" "}
                            <strong style={{ color: "var(--g)" }}>Update Admin</strong> captures the biometric reference
                            photo via webcam — the face OpenCV will compare against every login attempt.
                        </p>

                        <div className="state-label state-before">Profile Settings — Name, Email & Password</div>
                        <Img
                            src="/assets/images/projects/secureeye/profile-update.png"
                            alt="Profile Settings"
                        />

                        <div className="state-label state-after">Admin Setup — Biometric Capture & Credentials</div>
                        <div className="p-terminal">
                            <span className="t-green"># Admin config saved → biometric_synced logged</span><br />
                            Admin Email: admin@gmail.com<br />
                            Admin Password: **********<br />

                            Admin Photo: <span className="t-cyan">webcam_capture → face_encoded ✓</span>
                        </div>
                        <Img
                            src="../assets/images/projects/secureeye/admin.png"
                            alt="Admin Setup Panel"
                        />
                    </div>
                </div>

                {/* ── STEP 3: DETECTION & SESSION VIEWER ── */}
                <div className="p-card">
                    <div className="p-card-head">
                        <span className="p-card-icon">⚡</span>
                        <h2>Intrusion Detection & Session Review</h2>
                    </div>
                    <div className="p-card-body">
                        <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.8, marginBottom: 20 }}>
                            When an unknown user attempts to access the system, SecureEye silently captures
                            all monitoring streams. The administrator must pass a{" "}
                            <strong style={{ color: "var(--g)" }}>two-factor authentication check</strong>{" "}
                            — entering the secure password and completing{" "}
                            <strong style={{ color: "var(--g)" }}>face blink verification</strong>.
                            Once verified, the Session Viewer unlocks, allowing full review of captured
                            files and playback of audio/video evidence.
                        </p>

                        <div className="state-label state-before">Authorization Gate — Password Required to Open Sessions</div>
                        <Img
                            src="../assets/images/projects/secureeye/data-view.png"
                            alt="Admin Authorization Dialog"
                        />

                        <div className="state-label state-after">Session Viewer — All Captured Evidence Files</div>
                        <div className="p-terminal">
                            <span className="t-red">[ALERT]</span> unknown_user_detected · 2026-05-08 05:17:53<br />
                            <span className="t-green">[RECORD]</span> webcam.avi · video.avi · audio.wav · photo.jpg saved<br />
                            <span className="t-cyan">[SESSION]</span> 08-05-2026-10-49-29 → ready for review
                        </div>
                        <Img
                            src="../assets/images/projects/secureeye/data.png"
                            alt="Session Viewer with Evidence Files"
                        />
                        <p className="p-caption">
                            Clicking any file (audio.wav, photo.jpg, video.avi, webcam.avi) previews it. "Play Media"
                            launches full playback of video and audio recordings.
                        </p>
                    </div>
                </div>

                {/* ── STEP 4: EMAIL ALERT ── */}
                <div className="p-card">
                    <div className="p-card-head">
                        <span className="p-card-icon">📧</span>
                        <h2>Automated Email Alert</h2>
                    </div>
                    <div className="p-card-body">
                        <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.8, marginBottom: 20 }}>
                            Immediately after detection, a structured{" "}
                            <strong style={{ color: "var(--g)" }}>System Activity Notice</strong> email is dispatched
                            to the admin. It includes the event timestamp, device hostname, OS info, a summary of
                            recorded data, a live stream link button, and the attacker's captured photo as an attachment.
                        </p>

                        <div className="state-label state-after">Email Dispatched — System Activity Notice</div>
                        <div className="p-terminal">
                            <span className="t-red">[08-05-2026 10:49:29] ALERT:</span> unknown_user_detected<br />
                            <span className="t-green">[SYSTEM]</span> Verification photo captured successfully.<br />
                            <span className="t-green">[SYSTEM]</span> Live screen stream initiated for remote audit.<br />
                            <span className="t-cyan">[EMAIL]</span> Alert dispatched → prit31@gmail.com
                        </div>
                        <Img
                            src="../assets/images/projects/secureeye/email.png"
                            alt="System Activity Notice Email"
                        />
                        <p className="p-caption">
                            The email arrives with one attachment (attacker photo), scanned by Gmail, and includes a
                            "VIEW LIVE SCREEN NOW" button linking to the remote stream.
                        </p>
                    </div>
                </div>

                {/* ── STEP 5: MOBILE REMOTE ACCESS ── */}
                <div className="p-card">
                    <div className="p-card-head">
                        <span className="p-card-icon">📱</span>
                        <h2>Mobile Remote Control</h2>
                    </div>
                    <div className="p-card-body">
                        <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.8, marginBottom: 20 }}>
                            A Flask web app served over the local network gives full remote control from any phone.
                            After authenticating at the login page, the admin sees live screen and webcam streams
                            alongside a control grid — and can browse the remote filesystem to download or delete files.
                        </p>

                        <div className="state-label state-before">Step 1 — Authorize Access on Mobile</div>
                        <div className="p-media-phone">
                            <PhoneImg src="../assets/images/projects/secureeye/remote-login.jpeg" alt="Mobile Login Page" />
                        </div>

                        <div className="state-label state-after">Step 2 — Live Streams + System Controls</div>
                        <div className="p-terminal">
                            <span className="t-green">[STREAM]</span> Screen + Webcam + audio streams active<br />
                            Controls: AUDIO · BLACKOUT · LOCK · SHUTDOWN · KEYS LOCK · HOLD-TO-TALK · OVERLAY IMG
                        </div>
                        <div className="p-media-phone">
                            <PhoneImg src="../assets/images/projects/secureeye/remote-dash.jpeg" alt="Remote Dashboard — Control Panel" />
                            <PhoneImg src="../assets/images/projects/secureeye/remote-dash2.jpeg" alt="Remote Dashboard — Live Streams" />
                        </div>

                        <div className="state-label state-after">Step 3 — Remote Filesystem Explorer</div>
                        <div className="p-media-phone">
                            <PhoneImg src="../assets/images/projects/secureeye/remote-file.jpeg" alt="Remote Filesystem Root" />
                        </div>

                        <p className="p-caption">
                            Live screen, webcam and audio are monitored in real-time from your phone.
                        </p>

                        <div className="p-terminal">
                            <span className="t-green">// Remote Control Features</span><br />
                            <span className="t-cyan">Audio</span>        — Listen to the room remotely<br />
                            <span className="t-cyan">Blackout</span>     — Turn the screen black instantly<br />
                            <span className="t-cyan">Lock</span>         — Lock the computer instantly<br />
                            <span className="t-cyan">Shutdown</span>     — Power off the system remotely<br />
                            <span className="t-cyan">Keys Lock</span>    — Disable keyboard input<br />
                            <span className="t-cyan">Remote Typing</span>— Type on the computer from your phone<br />
                            <span className="t-cyan">File Manager</span> — Browse drives, upload / download / delete files<br />
                            <span className="t-cyan">Hold-to-Talk</span> — Speak through the system microphone<br />
                            <span className="t-cyan">Overlay Image</span>— Display a warning or message on screen<br />
                        </div>

                    </div>
                </div>

                {/* ── STEP 6: SYNC CENTER ── */}
                <div className="p-card">
                    <div className="p-card-head">
                        <span className="p-card-icon">☁️</span>
                        <h2>Synchronization Center</h2>
                    </div>
                    <div className="p-card-body">
                        <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.8, marginBottom: 20 }}>
                            If the machine has no internet during an intrusion, all recordings are saved locally.
                            The{" "}
                            <strong style={{ color: "var(--g)" }}>Synchronization Center</strong> detects pending
                            sessions and presents them in a tree view. One click on{" "}
                            <strong style={{ color: "var(--g)" }}>Start Upload</strong> pushes all audio, video,
                            webcam, and photo files to cloud storage.
                        </p>

                        <Img
                            src="../assets/images/projects/secureeye/sync.png"
                            alt="Synchronization Center"
                        />
                        <p className="p-caption">
                            Four offline sessions queued: 12-04-2026-09-53-30, 12-04-2026-09-56-55,
                            26-04-2026-16-09-36, 26-04-2026-17-09-05 — all ready for upload.
                        </p>
                    </div>
                </div>

            </div>

            {/* ── FOOTER ── */}
            <footer className="proj-footer">
                <span>
                    Project by{" "}
                    <a
                        href="https://www.linkedin.com/in/prit-gujarati-2a703b275/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Prit Gujarati
                    </a>
                </span>
                <span>[ SECUREEYE ]</span>
            </footer>

            {/* ── LIGHTBOX ── */}
            {lightbox && (
                <div className="lightbox" onClick={closeLightbox}>
                    <button className="lightbox-close" onClick={closeLightbox}>×</button>
                    <img src={lightbox} alt="Zoomed" onClick={(e) => e.stopPropagation()} />
                </div>
            )}

        </div>
    );
}