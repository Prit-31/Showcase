import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function VaultLogin() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);
  const canvasRef = useRef(null);
  const { login, authed } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authed) navigate("/vault", { replace: true });
  }, [authed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    const chars = "アイウ01KALI#@!{}[]SUDO<>?=NMAP";
    const fs = 13;
    const cols = Math.floor(canvas.width / fs);
    const drops = Array.from({ length: cols }, () => Math.random() * -100);
    const draw = () => {
      ctx.fillStyle = "rgba(6,13,6,0.055)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < drops.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const y = drops[i] * fs;
        const b = Math.random();
        ctx.fillStyle = b > 0.97 ? "#fff" : b > 0.9 ? "#00ff41" : "rgba(0,180,40,0.4)";
        ctx.font = `${fs}px 'Fira Code', monospace`;
        ctx.fillText(ch, i * fs, y);
        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.4;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  useEffect(() => {
    if (!locked) return;
    const interval = setInterval(() => {
      setLockTimer((t) => {
        if (t <= 1) { clearInterval(interval); setLocked(false); setAttempts(0); setErr(""); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [locked]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (locked) return;
    setLoading(true);
    setErr("");
    await new Promise((r) => setTimeout(r, 600));
    const ok = login(user.trim(), pass);
    if (ok) {
      navigate("/vault", { replace: true });
    } else {
      const na = attempts + 1;
      setAttempts(na);
      if (na >= 3) { setLocked(true); setLockTimer(30); setErr("Too many failed attempts. Locked for 30s."); }
      else setErr(`ACCESS DENIED — Invalid credentials (${3 - na} attempts left)`);
      setPass("");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight:"100vh", background:"var(--bg1)", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
      <canvas ref={canvasRef} style={{ position:"fixed", inset:0, opacity:0.3, zIndex:0 }} />
      <div style={{ position:"fixed", inset:0, zIndex:1, pointerEvents:"none", background:"repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.025) 2px, rgba(0,0,0,0.025) 4px)" }} />

      <div style={{ position:"relative", zIndex:2, width:"100%", maxWidth:420, background:"var(--card)", border:"1px solid var(--border)", margin:"0 16px" }}>
        {/* titlebar */}
        <div style={{ background:"#080f08", borderBottom:"1px solid var(--border)", padding:"10px 16px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", gap:6 }}>
            <div style={{ width:10, height:10, borderRadius:"50%", background:"#f85149" }} />
            <div style={{ width:10, height:10, borderRadius:"50%", background:"#e3b341" }} />
            <div style={{ width:10, height:10, borderRadius:"50%", background:"#3fb950" }} />
          </div>
          <span style={{ fontFamily:"'Fira Code', monospace", fontSize:11, color:"var(--muted)", letterSpacing:1 }}>vault_access.sh</span>
          <span />
        </div>

        {/* body */}
        <div style={{ padding:"36px 32px 28px" }}>
          <div style={{ fontSize:36, textAlign:"center", marginBottom:12 }}>🔐</div>
          <h1 style={{ fontFamily:"'Share Tech Mono', monospace", fontSize:"1.6rem", color:"#fff", textShadow:"0 0 20px var(--g)", textAlign:"center", margin:"0 0 6px" }}>
            &gt;_ VAULT<span style={{ color:"var(--c)" }}>.ACCESS</span>
          </h1>
          <p style={{ fontSize:11, color:"var(--muted)", textAlign:"center", marginBottom:28, letterSpacing:1 }}>
            // Restricted — authorised personnel only
          </p>

          <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              <label style={{ fontSize:10, color:"var(--muted)", letterSpacing:2, textTransform:"uppercase" }}>Username</label>
              <input
                style={{ background:"#010409", border:"1px solid var(--border)", color:"var(--text)", padding:"10px 14px", fontFamily:"'Fira Code', monospace", fontSize:13, outline:"none", width:"100%", boxSizing:"border-box" }}
                type="text" placeholder="enter_username" value={user}
                onChange={(e) => setUser(e.target.value)} disabled={locked} required
              />
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              <label style={{ fontSize:10, color:"var(--muted)", letterSpacing:2, textTransform:"uppercase" }}>Password</label>
              <input
                style={{ background:"#010409", border:"1px solid var(--border)", color:"var(--text)", padding:"10px 14px", fontFamily:"'Fira Code', monospace", fontSize:13, outline:"none", width:"100%", boxSizing:"border-box" }}
                type="password" placeholder="••••••••••" value={pass}
                onChange={(e) => setPass(e.target.value)} disabled={locked} required
              />
            </div>

            {err && (
              <div style={{ background:"rgba(248,81,73,.08)", border:"1px solid rgba(248,81,73,.3)", padding:"8px 12px", fontSize:11, fontFamily:"'Fira Code', monospace" }}>
                <span style={{ color:"#f85149" }}>⚠ {err}</span>
                {locked && <span style={{ color:"var(--muted)", marginLeft:8 }}>[{lockTimer}s]</span>}
              </div>
            )}

            <button
              type="submit"
              disabled={locked || loading}
              style={{ padding:"12px", background:"var(--g)", border:"none", color:"#000", fontFamily:"'Fira Code', monospace", fontSize:12, fontWeight:700, letterSpacing:2, textTransform:"uppercase", cursor: locked||loading?"not-allowed":"pointer", opacity: locked||loading?0.5:1, boxShadow:"0 0 12px rgba(0,255,65,.3)", transition:"all .25s" }}
            >
              {loading ? "AUTHENTICATING..." : locked ? `LOCKED [${lockTimer}s]` : "⚡ AUTHENTICATE"}
            </button>
          </form>

          <p style={{ marginTop:20, fontSize:11, textAlign:"center", color:"var(--muted)", lineHeight:1.8 }}>
            // This page is not publicly linked.
          </p>
        </div>
      </div>
    </div>
  );
}