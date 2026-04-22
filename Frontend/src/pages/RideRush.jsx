import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/projects.css";

const SLIDES = [
  { src: "../assets/images/projects/riderush/login.png", alt: "Login Page" },
  { src: "../assets/images/projects/riderush/signup.png", alt: "Signup" },
  { src: "../assets/images/projects/riderush/home.png", alt: "Home" },
  { src: "../assets/images/projects/riderush/about.png", alt: "About" },
  { src: "../assets/images/projects/riderush/contact.png", alt: "Contact" },
  { src: "../assets/images/projects/riderush/cap-dash.png", alt: "Captain Dashboard" },
  { src: "../assets/images/projects/riderush/cap-rides.png", alt: "Captain Rides" },
  { src: "../assets/images/projects/riderush/user-rides (1).png", alt: "User Rides" },
  { src: "../assets/images/projects/riderush/password.png", alt: "Password" },
  { src: "../assets/images/projects/riderush/address.png", alt: "Address" },
  { src: "../assets/images/projects/riderush/profile.png", alt: "Profile" },
  { src: "../assets/images/projects/riderush/notification.png", alt: "Notification" },
  { src: "../assets/images/projects/riderush/payment.png", alt: "Payment" },
  { src: "../assets/images/projects/riderush/admin-dash.png", alt: "Admin Dashboard" },
  { src: "../assets/images/projects/riderush/admin-cap-noti.png", alt: "Admin Captain Notification" },
  { src: "../assets/images/projects/riderush/admin-cap.png", alt: "Admin Captain" },
  { src: "../assets/images/projects/riderush/admin-user.png", alt: "Admin User" },
  { src: "../assets/images/projects/riderush/admin-ride.png", alt: "Admin Ride" },
  { src: "../assets/images/projects/riderush/admin-liveride.png", alt: "Admin Live Ride" },
  { src: "../assets/images/projects/riderush/admin-search.png", alt: "Admin Search" },
  { src: "../assets/images/projects/riderush/admin-subadmin.png", alt: "Sub Admin" },
  { src: "../assets/images/projects/riderush/admin-pass.png", alt: "Admin Password" },
  { src: "../assets/images/projects/riderush/admin-noti.png", alt: "Admin Notification" },
  { src: "../assets/images/projects/riderush/admin-res.png", alt: "Admin Resources" },
];

const TECH = [
  { label: "React.js", desc: "Fast, responsive UI for real-time updates and ride tracking." },
  { label: "Node.js + Express", desc: "Scalable backend with REST API and Socket.IO real-time communication." },
  { label: "MongoDB", desc: "Flexible NoSQL database for users, rides, drivers, and transactions." },
  { label: "Socket.IO", desc: "Real-time ride notifications & live driver location updates." },
  { label: "Google Maps API", desc: "Interactive and accurate GPS tracking." },
  { label: "Razorpay / Stripe", desc: "Secure, seamless digital payments." },
];

const FEATURES = [
  "Passenger registration, secure login, and profile management.",
  "Real-time ride booking, driver assignment, and GPS tracking with notifications.",
  "Driver verification, ride request handling, earnings dashboard, and navigation support.",
  "Admin panel for user/driver management, ride monitoring, fare & commission control.",
  "Emergency SOS feature for passenger safety and secure digital transactions.",
];

export default function RideRush() {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(null);

  /* auto-advance slider */
  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), 2800);
    return () => clearInterval(t);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setCurrent((c) => (c + 1) % SLIDES.length);

  return (
    <div className="proj-page">
      {/* TOP NAV */}
      <div className="proj-topbar">
        <Link to="/" className="proj-back">Back to Portfolio</Link>
        <span className="proj-topbar-title">&gt;_ RideRush</span>
        <span style={{ fontSize: 11, color: "var(--muted)", letterSpacing: 1 }}>Full-Stack</span>
      </div>

      {/* HERO */}
      <div className="proj-hero">
        <div className="proj-hero-label">04 — PROJECT DETAIL</div>
        <h1>🚗 Ride<span>Rush</span></h1>
        <p className="proj-hero-sub">
          Cab booking management system with real-time GPS tracking, Socket.IO notifications,
          Razorpay payments, driver management and comprehensive admin panel.
        </p>
        <div className="proj-tag-row">
          {["React.js", "Node.js", "MongoDB", "Socket.IO", "Google Maps"].map((t) => (
            <span key={t} className="proj-tag">{t}</span>
          ))}
        </div>
      </div>

      {/* BODY */}
      <div className="proj-body">

        {/* SCREENSHOT SLIDER */}
        <div className="p-card">
          <div className="p-card-head">
            <span className="p-card-icon">🖼</span>
            <h2>Screenshots</h2>
          </div>
          <div className="p-card-body" style={{ padding: "28px 28px 16px" }}>
            <div style={{ position: "relative", overflow: "hidden", border: "1px solid var(--border)" }}>
              <img
                src={SLIDES[current].src}
                alt={SLIDES[current].alt}
                style={{ width: "100%", height: 380, objectFit: "contain", background: "#07100707", display: "block", cursor: "zoom-in" }}
                onClick={() => setLightbox(SLIDES[current].src)}
              />
              {/* nav arrows */}
              <button onClick={prev} style={arrowStyle("left")}>‹</button>
              <button onClick={next} style={arrowStyle("right")}>›</button>
              {/* slide counter */}
              <span style={{
                position: "absolute", bottom: 12, right: 16,
                fontSize: 10, color: "var(--muted)", letterSpacing: 1,
                fontFamily: "'Fira Code', monospace",
              }}>
                {current + 1} / {SLIDES.length}
              </span>
            </div>
            {/* dot strip */}
            <div style={{ display: "flex", gap: 4, justifyContent: "center", marginTop: 14, flexWrap: "wrap" }}>
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  style={{
                    width: i === current ? 20 : 6, height: 6,
                    background: i === current ? "var(--g)" : "var(--border)",
                    border: "none", cursor: "pointer", padding: 0,
                    transition: "all .3s",
                    boxShadow: i === current ? "0 0 6px var(--g)" : "none",
                  }}
                />
              ))}
            </div>
            <p className="p-caption" style={{ marginTop: 12 }}>{SLIDES[current].alt}</p>
          </div>
        </div>

        {/* PROJECT DOC */}
        <div className="p-card">
          <div className="p-card-head">
            <span className="p-card-icon">📄</span>
            <h2>Project Document</h2>
          </div>
          <div className="p-card-body" style={{ padding: 0 }}>
            <iframe
              src="../assets/images/projects/riderush/Page.pdf"
              style={{ width: "100%", height: 560, border: "none", display: "block" }}
              title="Ride Rush PDF"
            />
          </div>
        </div>

        {/* OVERVIEW */}
        <div className="p-card">
          <div className="p-card-head">
            <span className="p-card-icon">ℹ</span>
            <h2>Project Overview</h2>
          </div>
          <div className="p-card-body">
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.9, marginBottom: 0 }}>
              Ride Rush is a cutting-edge, web-based platform that simplifies and secures cab bookings
              for riders, drivers, and admins. Using modern technologies like React.js, Node.js, MongoDB,
              Socket.IO, and Google Maps API, it delivers real-time ride tracking, instant notifications,
              fare management, and comprehensive admin controls.
            </p>
          </div>
        </div>

        {/* KEY TECHNOLOGIES */}
        <div className="p-card">
          <div className="p-card-head">
            <span className="p-card-icon">⚡</span>
            <h2>Key Technologies</h2>
          </div>
          <div className="p-card-body">
            <ul className="feat-list">
              {TECH.map((t) => (
                <li key={t.label}><strong>{t.label}:</strong>&nbsp;{t.desc}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* CORE FEATURES */}
        <div className="p-card">
          <div className="p-card-head">
            <span className="p-card-icon">✦</span>
            <h2>Core Features</h2>
          </div>
          <div className="p-card-body">
            <ul className="feat-list">
              {FEATURES.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* ARCHITECTURE */}
        <div className="p-card">
          <div className="p-card-head">
            <span className="p-card-icon">🔧</span>
            <h2>Architecture &amp; Flow</h2>
          </div>
          <div className="p-card-body">
            <div className="p-terminal">
              <span className="t-green"># System Architecture</span><br />
              React Frontend  →  Node.js REST API  →  MongoDB<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↕ WebSocket (Socket.IO)<br />
              <span className="t-cyan">Google Maps</span> → Geo-location Tracking<br />
              <span className="t-cyan">JWT Auth</span>    → Role-based Access Control<br />
              <span className="t-cyan">Razorpay</span>    → Secure Payment Gateway
            </div>
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.8 }}>
              React frontend communicates with Node.js REST API and uses WebSocket (Socket.IO) for
              real-time features. MongoDB stores dynamic ride, user, and driver data. JWT secures
              authentication, ensuring role-based access for passengers, drivers, and admins.
            </p>
          </div>
        </div>

        {/* FUTURE SCOPE */}
        <div className="p-card">
          <div className="p-card-head">
            <span className="p-card-icon">🚀</span>
            <h2>Testing &amp; Future Scope</h2>
          </div>
          <div className="p-card-body">
            <ul className="feat-list">
              <li>Comprehensive test cases validate login, registration, booking, payment, and notification flows.</li>
              <li>Future plans include ride-sharing, AI fare estimation, multi-payment options, and live customer support integration.</li>
            </ul>
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="proj-footer">
        <span>Project by <a href="https://www.linkedin.com/in/prit-gujarati-2a703b275/" target="_blank" rel="noopener noreferrer">Prit Gujarati</a></span>
        <span>[ RIDE RUSH ]</span>
      </footer>

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>×</button>
          <img src={lightbox} alt="Zoomed" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}

function arrowStyle(side) {
  return {
    position: "absolute",
    top: "50%", [side]: 10,
    transform: "translateY(-50%)",
    background: "rgba(6,13,6,0.85)",
    border: "1px solid var(--border)",
    color: "var(--g)", fontSize: 22,
    width: 36, height: 36,
    cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    transition: "all .2s",
  };
}