import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Portfolio components
import Toast from "./components/Toast";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates";
import Practice from "./components/Practice";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Project pages
import SentinelShield from "./pages/SentinelShield";
import RideRush from "./pages/RideRush";
import IpScanner from "./pages/IpScanner";
import PyEDRDetail from "./pages/PyEDRDetail";
import SecureEye from "./pages/SecureEye";
// Practice pages
import Firewall from "./pages/practice/Firewall";
import BlueTeam from "./pages/practice/BlueTeam";
import FakeGPT from "./pages/practice/labs/FakeGPT";
import Oski from "./pages/practice/labs/Oski";
import PoisonedCredentials from "./pages/practice/labs/PoisonedCredentials";
import WebStrike from "./pages/practice/labs/WebStrike";
import SOCBruteForce from "./pages/practice/labs/SOCBruteForce";
import SOCPhishing from "./pages/practice/labs/SOCPhishing";
import HealthHazard from "./pages/practice/labs/HealthHazard";

// Vault (private)
import { AuthProvider } from "./vault/AuthContext";
import ProtectedRoute from "./vault/ProtectedRoute";
import VaultLogin from "./vault/VaultLogin";
import VaultHub from "./vault/VaultHub";
import VaultRoom from "./vault/VaultRoom";


import { helloDev } from "./hooks/dev";
helloDev();


const SCROLL_SPY_IDS = ["home", "about", "skills", "education", "work", "cert", "practice", "contact"];

function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [toast, setToast] = useState({ msg: "", type: "", show: false });
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 300);
      for (const id of SCROLL_SPY_IDS) {
        const el = document.getElementById(id);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= 120 && r.bottom >= 120) { setActiveSection(id); break; }
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const showToast = (msg, type) => { setToast({ msg, type, show: true }); setTimeout(() => setToast((t) => ({ ...t, show: false })), 3000); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.phone && form.phone.length !== 10) { showToast("Phone must be 10 digits", "error"); return; }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    showToast("✓ Message transmitted successfully!", "success");
    setForm({ name: "", email: "", phone: "", message: "" });
    setSubmitting(false);
  };

  return (
    <>
      <Toast msg={toast.msg} type={toast.type} show={toast.show} />
      <Navbar activeSection={activeSection} menuOpen={menuOpen} setMenuOpen={setMenuOpen} scrollTo={scrollTo} />
      <Hero scrollTo={scrollTo} />
      <About /><Skills /><Education /><Projects /><Certificates /><Practice />
      <Contact form={form} setForm={setForm} submitting={submitting} handleSubmit={handleSubmit} />
      <Footer scrollTo={scrollTo} />
      <button className={`scroll-top ${showScrollTop ? "visible" : ""}`} onClick={() => scrollTo("home")}>↑</button>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ── Portfolio ── */}
          <Route path="/" element={<Home />} />

          {/* ── Projects ── */}
          <Route path="/projects/secureeye" element={<SecureEye />} />
          <Route path="/projects/sentinelshield" element={<SentinelShield />} />
          <Route path="/projects/riderush" element={<RideRush />} />
          <Route path="/projects/ip-scanner" element={<IpScanner />} />

          {/* ── Practice ── */}
          <Route path="/practice/firewall" element={<Firewall />} />
          <Route path="/practice/blue-team" element={<BlueTeam />} />
          <Route path="/practice/blue-team/fakegpt" element={<FakeGPT />} />
          <Route path="/practice/blue-team/oski" element={<Oski />} />
          <Route path="/practice/blue-team/poisoned-credentials" element={<PoisonedCredentials />} />
          <Route path="/practice/blue-team/webstrike" element={<WebStrike />} />
          <Route path="/practice/blue-team/soc-brute-force" element={<SOCBruteForce />} />
          <Route path="/practice/blue-team/soc-phishing" element={<SOCPhishing />} />
          <Route path="/practice/blue-team/health-hazard" element={<HealthHazard />} />
          {/* <Route path="/projects/pyedr" element={<PyEDRDetail />} /> */}
          {/* ── Vault (private — not linked anywhere) ── */}
          <Route path="/vault/login" element={<VaultLogin />} />
          <Route path="/vault" element={<ProtectedRoute><VaultHub /></ProtectedRoute>} />
          <Route path="/vault/:id" element={<ProtectedRoute><VaultRoom /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}