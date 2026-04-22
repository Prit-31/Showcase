import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { VAULT_ROOMS } from "./vaultData.js";

const BASE_FONT = "'JetBrains Mono', 'Space Mono', monospace";

const DIFF_META = {
  Easy:   { color: "#4ade80", bg: "rgba(74,222,128,0.08)",   border: "rgba(74,222,128,0.25)" },
  Medium: { color: "#fbbf24", bg: "rgba(251,191,36,0.08)",   border: "rgba(251,191,36,0.25)" },
  Hard:   { color: "#f87171", bg: "rgba(248,113,113,0.08)",  border: "rgba(248,113,113,0.25)" },
};

export default function VaultRoom() {
  const { id } = useParams();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [openTasks, setOpenTasks] = useState({});
  const [lightbox, setLightbox] = useState(null);
  const [copied, setCopied] = useState(null);

  const room = VAULT_ROOMS.find((r) => r.id === id);

  if (!room) {
    return (
      <div style={{ ...styles.page, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 64, color: "#1f2937", fontFamily: BASE_FONT }}>404</div>
          <p style={{ color: "#4b5563", fontFamily: BASE_FONT, fontSize: 13 }}>Room not found in vault.</p>
          <Link to="/vault" style={{ color: "#4ade80", fontFamily: BASE_FONT, fontSize: 12 }}>
            ← back to vault
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/vault/login", { replace: true });
  };

  const toggleTask = (num) =>
    setOpenTasks((prev) => ({ ...prev, [num]: !prev[num] }));

  const copyCmd = (cmd, idx) => {
    if (cmd.startsWith("//")) return;
    navigator.clipboard.writeText(cmd).then(() => {
      setCopied(idx);
      setTimeout(() => setCopied(null), 1500);
    });
  };

  const diffMeta = DIFF_META[room.difficulty] || DIFF_META.Easy;

  return (
    <div style={styles.page}>
      <div style={styles.scanlines} aria-hidden />

      {/* TOP BAR */}
      <header style={styles.topbar}>
        <div style={styles.topbarLeft}>
          <Link to="/vault" style={styles.backLink}>
            ← All Rooms
          </Link>
          <span style={styles.topbarSep}>|</span>
          <span style={styles.breadcrumb}>{room.category}</span>
          <span style={styles.topbarSep}>/</span>
          <span style={{ ...styles.breadcrumb, color: "#9ca3af" }}>{room.title}</span>
        </div>
        <div style={styles.topbarRight}>
          <span style={styles.logo}>&gt;_ VAULT<span style={{ color: "#4ade80" }}>.SH</span></span>
          <button style={styles.logoutBtn} onClick={handleLogout}>LOGOUT →</button>
        </div>
      </header>

      {/* HERO */}
      <div style={styles.hero}>
        <div style={styles.heroBadgeRow}>
          <span style={{ ...styles.diffBadge, color: diffMeta.color, background: diffMeta.bg, borderColor: diffMeta.border }}>
            {room.difficulty}
          </span>
          {room.completed && (
            <span style={styles.doneBadge}>✓ Completed</span>
          )}
          <span style={styles.platformBadge}>{room.platform}</span>
        </div>

        <h1 style={styles.heroTitle}>
          <span style={{ fontSize: 32, marginRight: 12 }}>{room.icon}</span>
          {room.title.split(" ").slice(0, -1).join(" ")}{" "}
          <span style={styles.heroAccent}>{room.title.split(" ").slice(-1)[0]}</span>
        </h1>

        <p style={styles.heroOverview}>{room.overview}</p>

        <div style={styles.tagRow}>
          {room.tags?.map((t) => (
            <span key={t} style={styles.tag}>{t}</span>
          ))}
        </div>
      </div>

      {/* BODY */}
      <div style={styles.body}>
        {/* TASKS COLUMN */}
        <div style={styles.tasksCol}>
          <div style={styles.colHeader}>
            <span style={styles.colHeaderDot} />
            // Tasks &amp; Notes
          </div>

          {room.tasks?.map((task) => (
            <TaskBlock
              key={task.num}
              task={task}
              isOpen={!!openTasks[task.num]}
              onToggle={() => toggleTask(task.num)}
              copied={copied}
              onCopy={copyCmd}
              onLightbox={setLightbox}
            />
          ))}
        </div>

        {/* SIDEBAR */}
        <aside style={styles.sidebar}>
          {/* Key Learnings */}
          {room.keyLearnings?.length > 0 && (
            <InfoCard title="// Key Learnings" accent="#4ade80">
              <ul style={styles.learningList}>
                {room.keyLearnings.map((k, i) => (
                  <li key={i} style={styles.learningItem}>
                    <span style={styles.learningDot}>→</span>
                    <span>{k}</span>
                  </li>
                ))}
              </ul>
            </InfoCard>
          )}

          {/* Tools */}
          {room.tools?.length > 0 && (
            <InfoCard title="// Tools Used" accent="#22d3ee">
              <div style={styles.toolsWrap}>
                {room.tools.map((t) => (
                  <span key={t} style={styles.toolChip}>{t}</span>
                ))}
              </div>
            </InfoCard>
          )}

          {/* MITRE */}
          {room.mitre?.length > 0 && (
            <InfoCard title="// MITRE ATT&amp;CK" accent="#f87171">
              {room.mitre.map((m) => (
                <div key={m} style={styles.mitreItem}>{m}</div>
              ))}
            </InfoCard>
          )}

          {/* Personal Notes */}
          {room.personalNotes && (
            <InfoCard title="// Personal Notes" accent="#a78bfa">
              <p style={styles.personalNote}>{room.personalNotes}</p>
            </InfoCard>
          )}

          {/* Stats */}
          <InfoCard title="// Room Stats" accent="#4b5563">
            <div style={styles.statsGrid}>
              <StatCell label="Tasks" value={room.tasks?.length || 0} />
              <StatCell label="Tools" value={room.tools?.length || 0} />
              <StatCell label="MITRE" value={room.mitre?.length || 0} />
              <StatCell
                label="Commands"
                value={room.tasks?.reduce((n, t) => n + (t.commands?.filter(c => !c.startsWith("//")).length || 0), 0) || 0}
              />
            </div>
          </InfoCard>
        </aside>
      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <div style={styles.lightboxOverlay} onClick={() => setLightbox(null)}>
          <button style={styles.lightboxClose} onClick={() => setLightbox(null)}>✕</button>
          <img
            src={lightbox}
            alt="zoomed"
            style={styles.lightboxImg}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0d0d0d; }
        ::-webkit-scrollbar-thumb { background: #1f2937; border-radius: 2px; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }
        .task-head-hover:hover { background: rgba(74,222,128,0.04) !important; }
        .cmd-line:hover { background: rgba(255,255,255,0.04) !important; }
        .copy-btn-hover { opacity: 0; transition: opacity .15s; }
        .cmd-line:hover .copy-btn-hover { opacity: 1; }
        .back-link-hover:hover { color: #4ade80 !important; }
        .logout-btn-hover:hover { border-color: rgba(255,255,255,0.15) !important; color: #9ca3af !important; }
        .info-card-hover { transition: border-color .2s; }
        .info-card-hover:hover { border-color: rgba(255,255,255,0.1) !important; }
      `}</style>
    </div>
  );
}

/* ── Task Block ── */
function TaskBlock({ task, isOpen, onToggle, copied, onCopy, onLightbox }) {
  const cmds = task.commands || [];
  const hasCmds = cmds.length > 0;
  const hasNotes = !!task.notes;

  return (
    <div style={styles.taskWrap}>
      <div
        className="task-head-hover"
        style={styles.taskHead}
        onClick={onToggle}
      >
        <span style={styles.taskNum}>T{String(task.num).padStart(2, "0")}</span>
        <span style={styles.taskTitle}>{task.title}</span>
        <div style={styles.taskMeta}>
          {hasCmds && (
            <span style={styles.taskMetaChip}>
              {cmds.filter(c => !c.startsWith("//")).length} cmd{cmds.filter(c => !c.startsWith("//")).length !== 1 ? "s" : ""}
            </span>
          )}
          <span style={{ ...styles.chevron, transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}>
            ▶
          </span>
        </div>
      </div>

      {isOpen && (
        <div style={styles.taskBody}>
          {/* Notes */}
          {hasNotes && (
            <div style={styles.notesBlock}>
              <div style={styles.notesLabel}>// notes</div>
              <NoteRenderer text={task.notes} />
            </div>
          )}

          {/* Commands */}
          {hasCmds && (
            <div style={styles.cmdsBlock}>
              <div style={styles.cmdsHeader}>
                <span style={styles.cmdsLabel}>// commands</span>
                <span style={styles.cmdsCount}>{cmds.filter(c => !c.startsWith("//")).length} executable</span>
              </div>
              <div style={styles.cmdsList}>
                {cmds.map((cmd, i) => {
                  const isComment = cmd.startsWith("//");
                  const globalIdx = `${task.num}-${i}`;
                  return (
                    <div
                      key={i}
                      className={isComment ? "" : "cmd-line"}
                      style={{
                        ...styles.cmdLine,
                        ...(isComment ? styles.cmdComment : styles.cmdCode),
                      }}
                    >
                      {!isComment && (
                        <span style={styles.cmdPrompt}>$</span>
                      )}
                      <span style={{ flex: 1 }}>{cmd}</span>
                      {!isComment && (
                        <button
                          className="copy-btn-hover"
                          style={styles.copyBtn}
                          onClick={() => onCopy(cmd, globalIdx)}
                          title="Copy command"
                        >
                          {copied === globalIdx ? "✓" : "⎘"}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Answer */}
          {task.answer && (
            <div style={styles.answerBlock}>
              <span style={styles.answerLabel}>Flag / Answer</span>
              <code style={styles.answerVal}>{task.answer}</code>
            </div>
          )}

          {/* Image */}
          {task.img && (
            <div style={styles.imgWrap} onClick={() => onLightbox(task.img)}>
              <img src={task.img} alt={task.title} style={styles.taskImg} />
              <div style={styles.imgOverlay}>Click to zoom</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Note Renderer — highlights section headers ── */
function NoteRenderer({ text }) {
  if (!text) return null;
  const lines = text.split("\n");
  return (
    <div style={styles.noteText}>
      {lines.map((line, i) => {
        const isHeader = /^[A-Z─]{2,}/.test(line.trim()) && line.trim().length > 0 && !line.trim().startsWith("•");
        const isBullet = line.trim().startsWith("•");
        const isArrow = line.trim().startsWith("→") || line.trim().startsWith("->");

        return (
          <div key={i} style={{
            ...styles.noteLine,
            ...(isHeader ? styles.noteHeader : {}),
            ...(isBullet ? styles.noteBullet : {}),
            ...(isArrow ? styles.noteArrow : {}),
            ...(line.trim() === "" ? { marginBottom: 6 } : {}),
          }}>
            {line || "\u00A0"}
          </div>
        );
      })}
    </div>
  );
}

/* ── Info Card ── */
function InfoCard({ title, accent, children }) {
  return (
    <div
      className="info-card-hover"
      style={{ ...styles.infoCard, borderColor: `${accent}20` }}
    >
      <div style={{ ...styles.infoCardTitle, color: accent }}>{title}</div>
      {children}
    </div>
  );
}

/* ── Stat Cell ── */
function StatCell({ label, value }) {
  return (
    <div style={styles.statCell}>
      <div style={styles.statValue}>{value}</div>
      <div style={styles.statLabel}>{label}</div>
    </div>
  );
}

/* ── Styles ── */
const styles = {
  page: {
    minHeight: "100vh",
    background: "#080b0f",
    fontFamily: BASE_FONT,
    color: "#e5e7eb",
    position: "relative",
  },
  scanlines: {
    position: "fixed",
    inset: 0,
    background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.025) 2px, rgba(0,0,0,0.025) 4px)",
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
    padding: "0 28px",
    height: 52,
    background: "rgba(8,11,15,0.96)",
    borderBottom: "1px solid rgba(74,222,128,0.1)",
    backdropFilter: "blur(12px)",
  },
  topbarLeft: { display: "flex", alignItems: "center", gap: 10, minWidth: 0, overflow: "hidden" },
  backLink: {
    color: "#6b7280",
    textDecoration: "none",
    fontSize: 11,
    letterSpacing: 1,
    whiteSpace: "nowrap",
    transition: "color .15s",
  },
  topbarSep: { color: "#1f2937", fontSize: 12 },
  breadcrumb: { fontSize: 11, color: "#4b5563", letterSpacing: 0.5, whiteSpace: "nowrap" },
  topbarRight: { display: "flex", alignItems: "center", gap: 14, flexShrink: 0 },
  logo: { fontSize: 13, fontWeight: 700, color: "#e5e7eb", letterSpacing: 2 },
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
  hero: {
    position: "relative",
    zIndex: 1,
    padding: "40px 36px 32px",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
    background: "linear-gradient(180deg, rgba(74,222,128,0.02) 0%, transparent 100%)",
    animation: "fadeUp .35s ease",
  },
  heroBadgeRow: { display: "flex", gap: 8, alignItems: "center", marginBottom: 14 },
  diffBadge: {
    fontSize: 10,
    padding: "3px 10px",
    borderRadius: 3,
    border: "1px solid",
    fontWeight: 700,
    letterSpacing: 1,
  },
  doneBadge: {
    fontSize: 10,
    color: "#4ade80",
    background: "rgba(74,222,128,0.08)",
    border: "1px solid rgba(74,222,128,0.2)",
    borderRadius: 3,
    padding: "3px 10px",
    letterSpacing: 0.5,
  },
  platformBadge: {
    fontSize: 10,
    color: "#4b5563",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 3,
    padding: "3px 10px",
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 700,
    color: "#f9fafb",
    margin: "0 0 14px",
    lineHeight: 1.2,
  },
  heroAccent: {
    color: "#4ade80",
    textShadow: "0 0 40px rgba(74,222,128,0.25)",
  },
  heroOverview: {
    fontSize: 13,
    color: "#6b7280",
    lineHeight: 1.7,
    margin: "0 0 16px",
    maxWidth: 700,
  },
  tagRow: { display: "flex", gap: 6, flexWrap: "wrap" },
  tag: {
    fontSize: 10,
    padding: "3px 9px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 3,
    color: "#4b5563",
    letterSpacing: 0.3,
  },
  body: {
    display: "flex",
    gap: 0,
    position: "relative",
    zIndex: 1,
    alignItems: "flex-start",
  },
  tasksCol: {
    flex: 1,
    minWidth: 0,
    borderRight: "1px solid rgba(255,255,255,0.04)",
  },
  colHeader: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "14px 28px",
    fontSize: 10,
    color: "#374151",
    letterSpacing: 2,
    borderBottom: "1px solid rgba(255,255,255,0.04)",
    background: "rgba(255,255,255,0.01)",
    textTransform: "uppercase",
  },
  colHeaderDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#4ade80",
    boxShadow: "0 0 6px #4ade80",
    display: "inline-block",
  },
  taskWrap: {
    borderBottom: "1px solid rgba(255,255,255,0.04)",
  },
  taskHead: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "14px 28px",
    cursor: "pointer",
    transition: "background .12s",
  },
  taskNum: {
    fontSize: 10,
    color: "#374151",
    fontWeight: 700,
    letterSpacing: 1,
    minWidth: 28,
    flexShrink: 0,
  },
  taskTitle: { fontSize: 13, color: "#d1d5db", flex: 1, fontWeight: 500 },
  taskMeta: { display: "flex", alignItems: "center", gap: 10 },
  taskMetaChip: {
    fontSize: 9,
    color: "#374151",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 3,
    padding: "2px 7px",
    letterSpacing: 0.5,
  },
  chevron: {
    fontSize: 9,
    color: "#374151",
    transition: "transform .2s ease",
  },
  taskBody: {
    padding: "0 28px 20px",
    animation: "slideDown .2s ease",
  },

  /* Notes */
  notesBlock: { marginBottom: 16 },
  notesLabel: {
    fontSize: 9,
    color: "#374151",
    letterSpacing: 2,
    marginBottom: 8,
    marginTop: 12,
    textTransform: "uppercase",
  },
  noteText: {
    background: "rgba(0,0,0,0.3)",
    border: "1px solid rgba(255,255,255,0.05)",
    borderRadius: 6,
    padding: "14px 16px",
  },
  noteLine: {
    fontSize: 12,
    color: "#6b7280",
    lineHeight: 1.8,
    whiteSpace: "pre-wrap",
    fontFamily: BASE_FONT,
  },
  noteHeader: {
    color: "#22d3ee",
    fontWeight: 700,
    marginTop: 8,
    marginBottom: 2,
    fontSize: 11,
    letterSpacing: 0.5,
  },
  noteBullet: { color: "#9ca3af", paddingLeft: 4 },
  noteArrow: { color: "#6b7280", paddingLeft: 4 },

  /* Commands */
  cmdsBlock: { marginBottom: 12 },
  cmdsHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  cmdsLabel: { fontSize: 9, color: "#374151", letterSpacing: 2, textTransform: "uppercase" },
  cmdsCount: { fontSize: 9, color: "#1f2937", letterSpacing: 1 },
  cmdsList: {
    background: "#0a0f15",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 6,
    overflow: "hidden",
  },
  cmdLine: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "7px 14px",
    borderBottom: "1px solid rgba(255,255,255,0.03)",
    cursor: "default",
    transition: "background .1s",
  },
  cmdCode: { color: "#4ade80" },
  cmdComment: { color: "#374151", fontStyle: "italic" },
  cmdPrompt: { color: "#1f6b3e", fontSize: 12, flexShrink: 0, userSelect: "none" },
  copyBtn: {
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 3,
    color: "#4b5563",
    cursor: "pointer",
    fontSize: 12,
    padding: "2px 6px",
    fontFamily: BASE_FONT,
    flexShrink: 0,
    transition: "all .15s",
  },

  /* Answer */
  answerBlock: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    background: "rgba(74,222,128,0.05)",
    border: "1px solid rgba(74,222,128,0.15)",
    borderRadius: 6,
    padding: "10px 14px",
    marginTop: 10,
  },
  answerLabel: { fontSize: 10, color: "#4ade80", letterSpacing: 1, flexShrink: 0 },
  answerVal: {
    fontSize: 12,
    color: "#86efac",
    fontFamily: BASE_FONT,
    background: "rgba(74,222,128,0.08)",
    padding: "3px 8px",
    borderRadius: 3,
  },

  /* Image */
  imgWrap: {
    position: "relative",
    cursor: "zoom-in",
    borderRadius: 6,
    overflow: "hidden",
    marginTop: 12,
    border: "1px solid rgba(255,255,255,0.07)",
  },
  taskImg: { width: "100%", display: "block" },
  imgOverlay: {
    position: "absolute",
    bottom: 8,
    right: 8,
    fontSize: 10,
    color: "#4b5563",
    background: "rgba(0,0,0,0.7)",
    padding: "3px 8px",
    borderRadius: 3,
    fontFamily: BASE_FONT,
    letterSpacing: 0.5,
  },

  /* Sidebar */
  sidebar: {
    width: 300,
    flexShrink: 0,
    padding: "24px 20px",
    display: "flex",
    flexDirection: "column",
    gap: 14,
    alignSelf: "flex-start",
    position: "sticky",
    top: 52,
    maxHeight: "calc(100vh - 52px)",
    overflowY: "auto",
  },
  infoCard: {
    background: "rgba(255,255,255,0.015)",
    border: "1px solid",
    borderRadius: 8,
    padding: "14px 16px",
    transition: "border-color .2s",
  },
  infoCardTitle: {
    fontSize: 9,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 12,
    fontWeight: 700,
  },
  learningList: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 },
  learningItem: {
    display: "flex",
    gap: 8,
    fontSize: 11,
    color: "#6b7280",
    lineHeight: 1.6,
    borderBottom: "1px solid rgba(255,255,255,0.04)",
    paddingBottom: 7,
  },
  learningDot: { color: "#374151", flexShrink: 0, marginTop: 1, fontFamily: BASE_FONT },
  toolsWrap: { display: "flex", gap: 6, flexWrap: "wrap" },
  toolChip: {
    fontSize: 10,
    padding: "3px 9px",
    background: "rgba(34,211,238,0.07)",
    border: "1px solid rgba(34,211,238,0.2)",
    borderRadius: 3,
    color: "#22d3ee",
    fontFamily: BASE_FONT,
    letterSpacing: 0.3,
  },
  mitreItem: {
    fontSize: 10,
    color: "#f87171",
    fontFamily: BASE_FONT,
    padding: "4px 0",
    borderBottom: "1px solid rgba(248,113,113,0.08)",
    lineHeight: 1.5,
  },
  personalNote: {
    fontSize: 11,
    color: "#6b7280",
    lineHeight: 1.75,
    margin: 0,
    fontStyle: "italic",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 8,
  },
  statCell: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 5,
    padding: "10px 12px",
    textAlign: "center",
  },
  statValue: { fontSize: 20, fontWeight: 700, color: "#4ade80", lineHeight: 1 },
  statLabel: { fontSize: 10, color: "#374151", marginTop: 4, letterSpacing: 0.5 },

  /* Lightbox */
  lightboxOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.92)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  lightboxClose: {
    position: "absolute",
    top: 20,
    right: 24,
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "#9ca3af",
    fontSize: 18,
    cursor: "pointer",
    borderRadius: 4,
    width: 36,
    height: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: BASE_FONT,
  },
  lightboxImg: {
    maxWidth: "90vw",
    maxHeight: "85vh",
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.1)",
  },
};