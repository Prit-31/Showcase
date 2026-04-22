import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { VAULT_ROOMS, VAULT_CATEGORIES } from "./vaultData.js";

const DIFF_META = {
  Easy:   { color: "#4ade80", bg: "rgba(74,222,128,0.08)", border: "rgba(74,222,128,0.25)" },
  Medium: { color: "#fbbf24", bg: "rgba(251,191,36,0.08)",  border: "rgba(251,191,36,0.25)" },
  Hard:   { color: "#f87171", bg: "rgba(248,113,113,0.08)", border: "rgba(248,113,113,0.25)" },
};

const CAT_ICONS = {
  "Web Security": "◈",
  "Incident Response": "◎",
  "OSINT": "◉",
  "Linux": "▣",
  "Network Forensics": "◐",
  "Malware Analysis": "◆",
  "Threat Hunting": "◇",
  "Privilege Escalation": "△",
  "Enumeration": "▷",
  "Cryptography": "◑",
};

export default function VaultHub() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [diff, setDiff] = useState("All");

  const handleLogout = () => {
    logout();
    navigate("/vault/login", { replace: true });
  };

  const filtered = useMemo(() => {
    return VAULT_ROOMS.filter((r) => {
      const matchCat = cat === "All" || r.category === cat;
      const matchDiff = diff === "All" || r.difficulty === diff;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q)) ||
        r.category.toLowerCase().includes(q);
      return matchCat && matchDiff && matchSearch;
    });
  }, [search, cat, diff]);

  const completed = VAULT_ROOMS.filter((r) => r.completed).length;
  const total = VAULT_ROOMS.length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div style={styles.page}>
      {/* scan-line overlay */}
      <div style={styles.scanlines} aria-hidden />

      {/* TOP BAR */}
      <header style={styles.topbar}>
        <div style={styles.topbarLeft}>
          <span style={styles.logo}>&gt;_</span>
          <span style={styles.logoText}>VAULT</span>
          <span style={styles.logoDot}>.SH</span>
        </div>
        <div style={styles.topbarCenter}>
          <span style={styles.statusDot} />
          <span style={styles.statusText}>SECURE SESSION ACTIVE</span>
        </div>
        <div style={styles.topbarRight}>
          <span style={styles.statChip}>
            {completed}/{total} rooms
          </span>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            LOGOUT →
          </button>
        </div>
      </header>

      <div style={styles.layout}>
        {/* SIDEBAR */}
        <aside style={styles.sidebar}>
          {/* Progress */}
          <div style={styles.sideSection}>
            <div style={styles.sideLabel}>// PROGRESS</div>
            <div style={styles.progressBar}>
              <div style={{ ...styles.progressFill, width: `${pct}%` }} />
            </div>
            <div style={styles.progressText}>
              <span style={{ color: "#4ade80" }}>{pct}%</span>
              <span style={{ color: "#4b5563" }}> complete</span>
            </div>
          </div>

          {/* Search */}
          <div style={styles.sideSection}>
            <div style={styles.sideLabel}>// SEARCH</div>
            <div style={styles.searchWrap}>
              <span style={styles.searchIcon}>⌕</span>
              <input
                style={styles.searchInput}
                type="text"
                placeholder="room, tool, tag..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                spellCheck={false}
              />
              {search && (
                <button style={styles.clearBtn} onClick={() => setSearch("")}>
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category */}
          <div style={styles.sideSection}>
            <div style={styles.sideLabel}>// CATEGORY</div>
            {VAULT_CATEGORIES.map((c) => (
              <button
                key={c}
                style={{
                  ...styles.filterBtn,
                  ...(cat === c ? styles.filterBtnActive : {}),
                }}
                onClick={() => setCat(c)}
              >
                <span style={styles.filterIcon}>
                  {c === "All" ? "◈" : CAT_ICONS[c] || "▸"}
                </span>
                {c}
                {c !== "All" && (
                  <span style={styles.filterCount}>
                    {VAULT_ROOMS.filter((r) => r.category === c).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Difficulty */}
          <div style={styles.sideSection}>
            <div style={styles.sideLabel}>// DIFFICULTY</div>
            {["All", "Easy", "Medium", "Hard"].map((d) => {
              const meta = DIFF_META[d];
              return (
                <button
                  key={d}
                  style={{
                    ...styles.filterBtn,
                    ...(diff === d ? styles.filterBtnActive : {}),
                    ...(diff === d && meta
                      ? { color: meta.color, borderColor: meta.border, background: meta.bg }
                      : {}),
                  }}
                  onClick={() => setDiff(d)}
                >
                  <span style={styles.filterIcon}>
                    {d === "All" ? "◈" : "●"}
                  </span>
                  {d}
                  {d !== "All" && (
                    <span style={styles.filterCount}>
                      {VAULT_ROOMS.filter((r) => r.difficulty === d).length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: "auto" }}>
            <Link
              to="/"
              style={{ ...styles.filterBtn, display: "block", textDecoration: "none", textAlign: "center" }}
            >
              ← Portfolio
            </Link>
          </div>
        </aside>

        {/* MAIN */}
        <main style={styles.main}>
          {/* Hero */}
          <div style={styles.hero}>
            <div style={styles.heroLabel}>
              <span style={styles.blinkCursor}>█</span> PRIVATE VAULT — TryHackMe Lab Notes
            </div>
            <h1 style={styles.heroTitle}>
              Lab <span style={styles.heroAccent}>Revision</span>
            </h1>
            <p style={styles.heroSub}>
              {filtered.length} room{filtered.length !== 1 ? "s" : ""} found
              {search && <> matching <span style={{ color: "#4ade80" }}>"{search}"</span></>}
            </p>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div style={styles.empty}>
              <div style={styles.emptyIcon}>🔒</div>
              <p style={{ color: "#4b5563", fontSize: 14, marginTop: 12 }}>
                {total === 0
                  ? "No rooms added yet."
                  : "No rooms match your filters."}
              </p>
              {(cat !== "All" || diff !== "All" || search) && (
                <button
                  style={{ ...styles.logoutBtn, marginTop: 16 }}
                  onClick={() => { setCat("All"); setDiff("All"); setSearch(""); }}
                >
                  CLEAR FILTERS
                </button>
              )}
            </div>
          ) : (
            <div style={styles.grid}>
              {filtered.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          )}
        </main>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0d0d0d; }
        ::-webkit-scrollbar-thumb { background: #1f2937; border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: #374151; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        .vault-room-card-hover:hover { transform: translateY(-3px) !important; border-color: rgba(74,222,128,0.35) !important; background: rgba(74,222,128,0.03) !important; }
        .vault-room-card-hover:hover .card-arrow { opacity: 1 !important; transform: translateX(4px) !important; }
        .filter-btn-hover:hover { background: rgba(255,255,255,0.04) !important; color: #e5e7eb !important; }
        .search-input:focus { border-color: rgba(74,222,128,0.5) !important; outline: none; box-shadow: 0 0 0 2px rgba(74,222,128,0.1); }
      `}</style>
    </div>
  );
}

function RoomCard({ room }) {
  const meta = DIFF_META[room.difficulty] || DIFF_META.Easy;
  return (
    <Link
      to={`/vault/${room.id}`}
      className="vault-room-card-hover"
      style={styles.card}
    >
      {/* Card top */}
      <div style={styles.cardTop}>
        <span style={styles.cardIcon}>{room.icon}</span>
        <div style={styles.cardBadges}>
          <span style={{ ...styles.diffBadge, color: meta.color, background: meta.bg, borderColor: meta.border }}>
            {room.difficulty}
          </span>
          {room.completed && (
            <span style={styles.doneBadge}>✓</span>
          )}
        </div>
      </div>

      <div style={styles.cardTitle}>{room.title}</div>
      <div style={styles.cardCat}>
        {CAT_ICONS[room.category] || "▸"} {room.category}
      </div>
      <p style={styles.cardOverview}>
        {room.overview?.slice(0, 90)}...
      </p>

      <div style={styles.cardTags}>
        {room.tags?.slice(0, 3).map((t) => (
          <span key={t} style={styles.tag}>{t}</span>
        ))}
      </div>

      <div style={styles.cardFooter}>
        <span style={{ color: "#4b5563", fontSize: 11 }}>
          {room.tasks?.length || 0} tasks
        </span>
        <span
          className="card-arrow"
          style={{ color: "#4ade80", fontSize: 13, opacity: 0, transition: "all .2s" }}
        >
          ENTER →
        </span>
      </div>
    </Link>
  );
}

const BASE_FONT = "'JetBrains Mono', 'Space Mono', monospace";

const styles = {
  page: {
    minHeight: "100vh",
    background: "#080b0f",
    fontFamily: BASE_FONT,
    color: "#e5e7eb",
    position: "relative",
    overflow: "hidden",
  },
  scanlines: {
    position: "fixed",
    inset: 0,
    background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
    pointerEvents: "none",
    zIndex: 0,
  },
  topbar: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
    height: 52,
    background: "rgba(8,11,15,0.95)",
    borderBottom: "1px solid rgba(74,222,128,0.12)",
    backdropFilter: "blur(12px)",
  },
  topbarLeft: { display: "flex", alignItems: "center", gap: 4 },
  logo: { fontSize: 18, color: "#4ade80", fontWeight: 700 },
  logoText: { fontSize: 14, fontWeight: 700, color: "#e5e7eb", letterSpacing: 3 },
  logoDot: { fontSize: 14, color: "#4ade80", letterSpacing: 2 },
  topbarCenter: { display: "flex", alignItems: "center", gap: 8 },
  statusDot: {
    width: 6, height: 6, borderRadius: "50%", background: "#4ade80",
    boxShadow: "0 0 8px #4ade80",
    animation: "blink 2s infinite",
    display: "inline-block",
  },
  statusText: { fontSize: 10, color: "#4b5563", letterSpacing: 2 },
  topbarRight: { display: "flex", alignItems: "center", gap: 12 },
  statChip: { fontSize: 11, color: "#4b5563", fontFamily: BASE_FONT },
  logoutBtn: {
    fontFamily: BASE_FONT,
    fontSize: 11,
    color: "#6b7280",
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 4,
    padding: "5px 12px",
    cursor: "pointer",
    letterSpacing: 1,
    transition: "all .15s",
  },
  layout: {
    display: "flex",
    position: "relative",
    zIndex: 1,
    minHeight: "calc(100vh - 52px)",
  },
  sidebar: {
    width: 220,
    flexShrink: 0,
    borderRight: "1px solid rgba(255,255,255,0.05)",
    padding: "24px 16px",
    display: "flex",
    flexDirection: "column",
    gap: 24,
    position: "sticky",
    top: 52,
    height: "calc(100vh - 52px)",
    overflowY: "auto",
  },
  sideSection: { display: "flex", flexDirection: "column", gap: 6 },
  sideLabel: {
    fontSize: 9,
    color: "#374151",
    letterSpacing: 2,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  progressBar: {
    height: 3,
    background: "rgba(255,255,255,0.05)",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #4ade80, #22d3ee)",
    borderRadius: 2,
    transition: "width .5s ease",
  },
  progressText: { fontSize: 11, color: "#6b7280", marginTop: 4 },
  searchWrap: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 6,
    padding: "0 10px",
    transition: "border-color .15s",
  },
  searchIcon: { color: "#4b5563", fontSize: 16, lineHeight: 1 },
  searchInput: {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    fontFamily: BASE_FONT,
    fontSize: 12,
    color: "#e5e7eb",
    padding: "8px 0",
  },
  clearBtn: {
    background: "transparent",
    border: "none",
    color: "#4b5563",
    cursor: "pointer",
    fontSize: 11,
    padding: 0,
  },
  filterBtn: {
    display: "flex",
    alignItems: "center",
    gap: 7,
    width: "100%",
    background: "transparent",
    border: "1px solid transparent",
    borderRadius: 5,
    padding: "6px 8px",
    fontFamily: BASE_FONT,
    fontSize: 11,
    color: "#6b7280",
    cursor: "pointer",
    textAlign: "left",
    transition: "all .12s",
    letterSpacing: 0.3,
  },
  filterBtnActive: {
    background: "rgba(74,222,128,0.07)",
    border: "1px solid rgba(74,222,128,0.2)",
    color: "#4ade80",
  },
  filterIcon: { fontSize: 10, opacity: 0.7, flexShrink: 0 },
  filterCount: {
    marginLeft: "auto",
    fontSize: 10,
    color: "#374151",
    background: "rgba(255,255,255,0.04)",
    borderRadius: 3,
    padding: "1px 5px",
  },
  main: { flex: 1, padding: "32px 36px", minWidth: 0 },
  hero: { marginBottom: 32, animation: "fadeUp .4s ease" },
  heroLabel: {
    fontSize: 10,
    color: "#374151",
    letterSpacing: 3,
    textTransform: "uppercase",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  blinkCursor: {
    color: "#4ade80",
    animation: "blink 1s infinite",
    fontSize: 12,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 700,
    color: "#f9fafb",
    margin: "0 0 8px",
    letterSpacing: -0.5,
  },
  heroAccent: {
    color: "#4ade80",
    textShadow: "0 0 30px rgba(74,222,128,0.3)",
  },
  heroSub: { fontSize: 12, color: "#4b5563", margin: 0 },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 16,
  },
  card: {
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 10,
    padding: "20px",
    textDecoration: "none",
    color: "inherit",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    transition: "all .2s ease",
    cursor: "pointer",
    animation: "fadeUp .4s ease",
  },
  cardTop: { display: "flex", alignItems: "flex-start", justifyContent: "space-between" },
  cardIcon: { fontSize: 22 },
  cardBadges: { display: "flex", gap: 6, alignItems: "center" },
  diffBadge: {
    fontSize: 10,
    padding: "2px 8px",
    borderRadius: 3,
    border: "1px solid",
    fontWeight: 500,
    letterSpacing: 0.5,
  },
  doneBadge: {
    fontSize: 11,
    color: "#4ade80",
    background: "rgba(74,222,128,0.1)",
    border: "1px solid rgba(74,222,128,0.2)",
    borderRadius: 3,
    padding: "2px 6px",
  },
  cardTitle: { fontSize: 14, fontWeight: 700, color: "#f3f4f6", lineHeight: 1.3 },
  cardCat: { fontSize: 10, color: "#4b5563", letterSpacing: 1 },
  cardOverview: { fontSize: 11, color: "#374151", lineHeight: 1.6, margin: 0 },
  cardTags: { display: "flex", gap: 5, flexWrap: "wrap" },
  tag: {
    fontSize: 10,
    padding: "2px 7px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 3,
    color: "#4b5563",
    letterSpacing: 0.3,
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
    paddingTop: 10,
    borderTop: "1px solid rgba(255,255,255,0.05)",
  },
  empty: {
    textAlign: "center",
    padding: "80px 0",
    color: "#374151",
  },
  emptyIcon: { fontSize: 48 },
};