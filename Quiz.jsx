import { useState, useEffect, useRef } from "react";

/* ─── QUIZ DATA ──────────────────────────────────────────────────────────── */

const DOMAINS = [
  {
    id: "stats",
    label: "Mathematics & Statistics",
    icon: "∑",
    color: "#06b6d4",
    glow: "rgba(6,182,212,0.3)",
    description: "Probability, distributions, hypothesis testing, statistical inference",
    questions: [
      "I can calculate and interpret standard deviation from a dataset.",
      "I understand what a p-value means and when a result is statistically significant.",
      "I can explain the difference between correlation and causation using a health example.",
      "I have used statistical analysis in a professional or academic context.",
      "I understand basic probability and can describe a normal distribution.",
    ],
    pharmacistNote: "Your pharmacokinetics training (Cmax, AUC, half-life) is applied statistics. You are not starting from zero here.",
  },
  {
    id: "coding",
    label: "Programming",
    icon: "</>",
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.3)",
    description: "Python, R, SQL — the languages data scientists use daily",
    questions: [
      "I have written code in Python, R, or SQL at least once.",
      "I can load a dataset (CSV or spreadsheet) and filter it by a condition in code.",
      "I understand basic programming concepts: variables, loops, functions.",
      "I can read and roughly understand code written by someone else.",
      "I have used a Jupyter Notebook or RStudio environment.",
    ],
    pharmacistNote: "Most pharmacists start here at zero. That is completely fine — this is the most learnable domain and there are excellent health-focused courses.",
  },
  {
    id: "engineering",
    label: "Data Engineering",
    icon: "⚙",
    color: "#10b981",
    glow: "rgba(16,185,129,0.3)",
    description: "Databases, APIs, pipelines — how data is collected, stored, and moved",
    questions: [
      "I have connected to a database and queried data using SQL.",
      "I understand what an API is and have retrieved data from one.",
      "I have cleaned a messy dataset — handled missing values, duplicates, or inconsistencies.",
      "I am familiar with cloud storage platforms (Google Drive, AWS, BigQuery).",
      "I understand the concept of a data pipeline (moving data from source to destination).",
    ],
    pharmacistNote: "Hospital dispensing systems, EHR exports, and drug inventory databases are data engineering problems in disguise. Your exposure to clinical systems counts.",
  },
  {
    id: "ml",
    label: "Machine Learning & AI",
    icon: "◈",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.3)",
    description: "Predictive models, classification, deep learning, AI tools",
    questions: [
      "I can explain what a machine learning model does in plain, non-technical terms.",
      "I understand the difference between supervised and unsupervised learning.",
      "I have trained or evaluated a machine learning model — even in a tutorial.",
      "I use AI tools (Claude, ChatGPT, Gemini) regularly and intentionally in my work.",
      "I understand what overfitting means and why it matters in health models.",
    ],
    pharmacistNote: "AI-assisted drug interaction checks and clinical decision support systems are ML in practice. Your daily work already intersects with this domain.",
  },
  {
    id: "viz",
    label: "Visualisation & Communication",
    icon: "◉",
    color: "#ec4899",
    glow: "rgba(236,72,153,0.3)",
    description: "Dashboards, charts, data storytelling, translating findings for decision-makers",
    questions: [
      "I have built charts or dashboards in Excel, Google Sheets, Tableau, or Power BI.",
      "I can explain complex findings to a non-technical audience clearly.",
      "I have written reports where data supported and illustrated my conclusions.",
      "I have presented data-driven findings in a professional or academic setting.",
      "I know when to use a bar chart vs a line chart vs a scatter plot.",
    ],
    pharmacistNote: "Patient counselling, drug interaction explanations, and prescription notes are all data communication. This is likely your strongest domain already.",
  },
  {
    id: "health",
    label: "Health Domain Knowledge",
    icon: "✚",
    color: "#34d399",
    glow: "rgba(52,211,153,0.3)",
    description: "Clinical knowledge, epidemiology, pharma regulations, health systems",
    questions: [
      "I understand clinical trial phases (I–IV) and common trial endpoints.",
      "I can interpret epidemiological metrics: incidence, prevalence, NNT, NNH.",
      "I am familiar with pharmacokinetic parameters: Cmax, AUC, half-life, bioavailability.",
      "I understand Nigerian and international health regulatory frameworks (NAFDAC, WHO, ICH).",
      "I can read and critically evaluate a clinical research paper.",
    ],
    pharmacistNote: "This is your most powerful domain. Years ahead of most data scientists. Your B.Pharm is doing serious work here.",
  },
];

const SCALE = [
  { value: 1, label: "Not at all", short: "None" },
  { value: 2, label: "Slightly familiar", short: "Slight" },
  { value: 3, label: "Moderate understanding", short: "Moderate" },
  { value: 4, label: "Comfortable", short: "Comfortable" },
  { value: 5, label: "Confident / Expert", short: "Expert" },
];

const PRIORITY_PLAN = {
  stats: {
    quick: "Khan Academy Statistics (free) → 2 weeks",
    course: "Biostatistics for Public Health — Johns Hopkins on Coursera",
    project: "Analyse a Nigerian disease dataset and report 5 key statistics",
    income: "Offer statistical analysis support to health researchers — $200–$800/project",
  },
  coding: {
    quick: "Python.org beginner tutorial → 1 week",
    course: "Python for Data Science — DataCamp Health Track ($25/mo)",
    project: "Write a Python script that loads and filters a clinic patient CSV",
    income: "Automate a clinic's monthly report with Python — charge ₦50K–₦150K",
  },
  engineering: {
    quick: "Mode Analytics SQL Tutorial (free) → 1 week",
    course: "Google Data Analytics Certificate — covers SQL, data cleaning",
    project: "Connect to a public health database and extract a dataset via API",
    income: "Set up a clinic data pipeline from EHR to dashboard — $300–$1,000",
  },
  ml: {
    quick: "Fast.ai Practical Deep Learning Lesson 1 (free) → weekend",
    course: "AI in Healthcare — Stanford on Coursera (audit free)",
    project: "Build a diabetes risk prediction model on Kaggle health dataset",
    income: "Deliver an AI readiness assessment for a clinic — $500–$2,000",
  },
  viz: {
    quick: "Tableau Public 'Getting Started' tutorial (free) → 3 days",
    course: "Google Data Studio / Looker Studio crash course (YouTube, free)",
    project: "Build a live health dashboard for a sample clinic (share on LinkedIn)",
    income: "Sell a monthly KPI dashboard to a private clinic — ₦80K–₦200K/project",
  },
  health: {
    quick: "Review your pharmacology notes — you already have this",
    course: "Global Health Masterclass — Harvard on edX (audit free)",
    project: "Write a health data article citing Nigerian epidemiological data",
    income: "This domain is your credibility anchor — lead every pitch with it",
  },
};

/* ─── RADAR CHART (SVG, no library) ─────────────────────────────────────── */

function RadarChart({ scores }) {
  const size = 260;
  const cx = size / 2;
  const cy = size / 2;
  const r  = 95;
  const n  = DOMAINS.length;
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];

  const angle = (i) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const pt    = (i, frac) => ({
    x: cx + r * frac * Math.cos(angle(i)),
    y: cy + r * frac * Math.sin(angle(i)),
  });

  const polyPts = DOMAINS.map((d, i) => pt(i, (scores[d.id] || 0) / 100));
  const polyStr = polyPts.map(p => `${p.x},${p.y}`).join(" ");

  return (
    <svg viewBox={`0 0 ${size} ${size}`} style={{ width: "100%", maxWidth: 300, display: "block", margin: "0 auto" }}>
      {/* Grid levels */}
      {levels.map((lv, li) => {
        const pts = DOMAINS.map((_, i) => pt(i, lv));
        return (
          <polygon key={li}
            points={pts.map(p => `${p.x},${p.y}`).join(" ")}
            fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={1}
          />
        );
      })}
      {/* Spokes */}
      {DOMAINS.map((_, i) => {
        const end = pt(i, 1);
        return <line key={i} x1={cx} y1={cy} x2={end.x} y2={end.y} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />;
      })}
      {/* Score area */}
      <polygon points={polyStr} fill="rgba(6,182,212,0.15)" stroke="#06b6d4" strokeWidth={2} />
      {/* Score dots */}
      {polyPts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={4} fill={DOMAINS[i].color} />
      ))}
      {/* Labels */}
      {DOMAINS.map((d, i) => {
        const lp = pt(i, 1.28);
        return (
          <text key={i} x={lp.x} y={lp.y}
            textAnchor="middle" dominantBaseline="middle"
            fill={d.color} fontSize={9} fontFamily="monospace" fontWeight={700}
          >{d.icon}</text>
        );
      })}
    </svg>
  );
}

/* ─── SCORE BAR ──────────────────────────────────────────────────────────── */

function ScoreBar({ score, color, label }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 12, color: "#94a3b8" }}>{label}</span>
        <span style={{ fontSize: 12, fontFamily: "monospace", fontWeight: 700, color }}>{score}%</span>
      </div>
      <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 99, height: 6, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${score}%`, borderRadius: 99,
          background: color, transition: "width 1s ease",
          boxShadow: `0 0 8px ${color}`,
        }} />
      </div>
    </div>
  );
}

/* ─── SCAN LINE ANIMATION ────────────────────────────────────────────────── */

function ScanLine() {
  return (
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0,
      height: 2, background: "linear-gradient(90deg, transparent, #06b6d4, transparent)",
      animation: "scan 2s ease-in-out infinite",
      opacity: 0.6,
      pointerEvents: "none",
    }}>
      <style>{`
        @keyframes scan { 0%{top:0} 100%{top:100%} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes glow { 0%,100%{box-shadow:0 0 8px rgba(6,182,212,0.3)} 50%{box-shadow:0 0 20px rgba(6,182,212,0.7)} }
      `}</style>
    </div>
  );
}

/* ─── MAIN APP ───────────────────────────────────────────────────────────── */

export default function Quiz() {
  const [screen, setScreen]     = useState("intro");   // intro | quiz | results
  const [domainIdx, setDomainIdx] = useState(0);
  const [qIdx, setQIdx]         = useState(0);
  const [answers, setAnswers]   = useState({});        // "domainId-qIdx": value
  const [selected, setSelected] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const containerRef = useRef(null);

  const domain   = DOMAINS[domainIdx];
  const question = domain?.questions[qIdx];
  const totalQ   = DOMAINS.reduce((s, d) => s + d.questions.length, 0);
  const answeredQ = Object.keys(answers).length;
  const progress  = answeredQ / totalQ;

  /* scores: 0-100 per domain */
  const scores = {};
  DOMAINS.forEach(d => {
    const qs = d.questions.map((_, qi) => answers[`${d.id}-${qi}`] || 0);
    const avg = qs.reduce((s, v) => s + v, 0) / qs.length;
    scores[d.id] = Math.round((avg / 5) * 100);
  });

  /* priority order: lowest score first */
  const prioritised = [...DOMAINS].sort((a, b) => scores[a.id] - scores[b.id]);

  const next = () => {
    if (selected === null) return;
    setAnimating(true);
    setTimeout(() => {
      const key = `${domain.id}-${qIdx}`;
      setAnswers(prev => ({ ...prev, [key]: selected }));
      setSelected(null);
      setShowNote(false);

      const nextQ = qIdx + 1;
      if (nextQ < domain.questions.length) {
        setQIdx(nextQ);
      } else {
        const nextD = domainIdx + 1;
        if (nextD < DOMAINS.length) {
          setDomainIdx(nextD);
          setQIdx(0);
          setShowNote(true);
        } else {
          setScreen("results");
        }
      }
      setAnimating(false);
    }, 250);
  };

  const getLevel = (score) => {
    if (score >= 80) return { label: "Advanced", color: "#34d399" };
    if (score >= 60) return { label: "Proficient", color: "#06b6d4" };
    if (score >= 40) return { label: "Developing", color: "#f59e0b" };
    if (score >= 20) return { label: "Beginner", color: "#fb923c" };
    return { label: "Foundation needed", color: "#f87171" };
  };

  const bg = {
    background: "linear-gradient(160deg, #040c18 0%, #070d1a 50%, #050b15 100%)",
    minHeight: "100vh", color: "#dde4f0", position: "relative", overflow: "hidden",
  };

  /* ── INTRO SCREEN ── */
  if (screen === "intro") return (
    <div style={bg}>
      <ScanLine />
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "40px 20px", textAlign: "center", animation: "fadeIn 0.6s ease" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          fontFamily: "monospace", fontSize: 10, letterSpacing: 3,
          textTransform: "uppercase", color: "#06b6d4",
          background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.2)",
          borderRadius: 20, padding: "5px 16px", marginBottom: 24,
        }}>
          <span style={{ animation: "blink 1.2s infinite" }}>●</span> DIAGNOSTIC SYSTEM ACTIVE
        </div>

        <h1 style={{
          fontSize: "clamp(26px,6vw,42px)", fontWeight: 700, lineHeight: 1.15,
          margin: "0 0 10px",
          fontFamily: "'Palatino Linotype', Georgia, serif",
          background: "linear-gradient(135deg, #e2e8f0, #64748b)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>Data Science<br/>Self-Assessment</h1>

        <p style={{ color: "#475569", fontSize: 14, lineHeight: 1.7, margin: "0 0 32px", maxWidth: 420, marginInline: "auto" }}>
          A diagnostic scan across the 6 core data science domains. Your results will be mapped against your pharmacist background and generate a personalised, priority-ordered learning plan.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 32 }}>
          {DOMAINS.map((d, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.03)", border: `1px solid ${d.color}22`,
              borderRadius: 10, padding: "12px 8px", textAlign: "center",
            }}>
              <div style={{ fontSize: 20, color: d.color, fontFamily: "monospace", marginBottom: 4 }}>{d.icon}</div>
              <div style={{ fontSize: 10, color: "#475569", lineHeight: 1.4 }}>{d.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 32, fontSize: 12, color: "#475569" }}>
          <span>📋 30 questions</span>
          <span>⏱ ~5 minutes</span>
          <span>🎯 6 domains</span>
          <span>📊 Radar chart result</span>
        </div>

        <button onClick={() => { setScreen("quiz"); setShowNote(true); }} style={{
          background: "linear-gradient(90deg, #06b6d4, #8b5cf6)",
          border: "none", borderRadius: 12, color: "#fff",
          fontSize: 15, fontWeight: 700, padding: "14px 40px",
          cursor: "pointer", letterSpacing: 1,
          boxShadow: "0 0 24px rgba(6,182,212,0.3)",
          fontFamily: "monospace", textTransform: "uppercase",
          transition: "transform 0.15s",
        }}>Begin Diagnostic →</button>
      </div>
    </div>
  );

  /* ── RESULTS SCREEN ── */
  if (screen === "results") return (
    <div style={bg}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "24px 16px 48px", animation: "fadeIn 0.5s ease" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{
            fontFamily: "monospace", fontSize: 10, letterSpacing: 3, textTransform: "uppercase",
            color: "#34d399", background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)",
            borderRadius: 20, padding: "5px 16px", display: "inline-block", marginBottom: 12,
          }}>✓ Diagnostic Complete</div>
          <h1 style={{
            fontSize: "clamp(22px,5vw,34px)", fontWeight: 700, margin: "0 0 6px",
            fontFamily: "'Palatino Linotype', Georgia, serif",
            background: "linear-gradient(135deg,#e2e8f0,#94a3b8)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>Your Data Science Profile</h1>
          <p style={{ color: "#475569", fontSize: 13 }}>Calibrated for a Pharmacist building a Health Digital Agency</p>
        </div>

        {/* Radar + Bars */}
        <div style={{
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 14, padding: "20px 18px", marginBottom: 16,
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "center",
        }}>
          <RadarChart scores={scores} />
          <div>
            {DOMAINS.map(d => (
              <ScoreBar key={d.id} score={scores[d.id]} color={d.color} label={d.icon + " " + d.label.split(" ")[0]} />
            ))}
          </div>
        </div>

        {/* Domain Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10, marginBottom: 20 }}>
          {DOMAINS.map(d => {
            const lv = getLevel(scores[d.id]);
            return (
              <div key={d.id} style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${d.color}22`,
                borderRadius: 10, padding: "12px 14px",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <span style={{ fontSize: 18, color: d.color, fontFamily: "monospace" }}>{d.icon}</span>
                  <span style={{ fontSize: 18, fontWeight: 700, color: d.color, fontFamily: "monospace" }}>{scores[d.id]}%</span>
                </div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 3 }}>{d.label}</div>
                <div style={{
                  fontSize: 10, fontFamily: "monospace", fontWeight: 700,
                  color: lv.color, background: `${lv.color}15`,
                  border: `1px solid ${lv.color}30`, borderRadius: 4, padding: "2px 8px",
                  display: "inline-block",
                }}>{lv.label}</div>
              </div>
            );
          })}
        </div>

        {/* Priority Learning Plan */}
        <div style={{
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 14, overflow: "hidden", marginBottom: 16,
        }}>
          <div style={{
            padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(6,182,212,0.06)",
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#06b6d4", marginBottom: 2 }}>🎯 Your Priority-Ordered Learning Plan</div>
            <div style={{ fontSize: 11, color: "#475569" }}>Ranked from your lowest score (tackle first) to highest. Tailored to your pharmacist background.</div>
          </div>

          {prioritised.map((d, rank) => {
            const plan  = PRIORITY_PLAN[d.id];
            const score = scores[d.id];
            const lv    = getLevel(score);
            const isTop = rank < 2;
            return (
              <div key={d.id} style={{
                padding: "16px 18px",
                borderBottom: rank < prioritised.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                background: isTop ? `${d.color}08` : "transparent",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
                    background: isTop ? d.color : "rgba(255,255,255,0.06)",
                    border: `2px solid ${isTop ? d.color : "rgba(255,255,255,0.1)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 700, color: isTop ? "#070d1a" : "#475569",
                    fontFamily: "monospace",
                  }}>{rank + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: "#e2e8f0" }}>{d.label}</span>
                      {isTop && <span style={{ fontSize: 10, fontFamily: "monospace", color: d.color, background: `${d.color}18`, border: `1px solid ${d.color}30`, borderRadius: 4, padding: "1px 7px" }}>PRIORITY</span>}
                    </div>
                    <div style={{ fontSize: 11, color: "#475569" }}>Current score: <span style={{ color: lv.color, fontWeight: 700 }}>{score}% — {lv.label}</span></div>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
                  <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "9px 12px" }}>
                    <div style={{ fontSize: 9, fontFamily: "monospace", color: "#475569", letterSpacing: 1, marginBottom: 4, textTransform: "uppercase" }}>⚡ Quick Start</div>
                    <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.5 }}>{plan.quick}</div>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "9px 12px" }}>
                    <div style={{ fontSize: 9, fontFamily: "monospace", color: "#475569", letterSpacing: 1, marginBottom: 4, textTransform: "uppercase" }}>📚 Best Course</div>
                    <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.5 }}>{plan.course}</div>
                  </div>
                </div>

                <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "9px 12px", marginBottom: 8 }}>
                  <div style={{ fontSize: 9, fontFamily: "monospace", color: "#475569", letterSpacing: 1, marginBottom: 4, textTransform: "uppercase" }}>🏗 Portfolio Project</div>
                  <div style={{ fontSize: 12, color: "#94a3b8" }}>{plan.project}</div>
                </div>

                <div style={{ background: `${d.color}0d`, border: `1px solid ${d.color}20`, borderRadius: 8, padding: "9px 12px" }}>
                  <div style={{ fontSize: 9, fontFamily: "monospace", color: d.color, letterSpacing: 1, marginBottom: 4, textTransform: "uppercase" }}>💼 Monetise This Domain</div>
                  <div style={{ fontSize: 12, color: "#dde4f0" }}>{plan.income}</div>
                </div>

                <div style={{ marginTop: 8, background: "rgba(255,255,255,0.02)", borderRadius: 6, padding: "7px 10px" }}>
                  <div style={{ fontSize: 9, fontFamily: "monospace", color: "#334155", letterSpacing: 1, marginBottom: 3, textTransform: "uppercase" }}>💊 Pharmacist Edge</div>
                  <div style={{ fontSize: 11, color: "#475569", fontStyle: "italic", lineHeight: 1.5 }}>{d.pharmacistNote}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary insight */}
        <div style={{
          background: "rgba(6,182,212,0.06)", border: "1px solid rgba(6,182,212,0.15)",
          borderRadius: 12, padding: "16px 18px", textAlign: "center",
        }}>
          <div style={{ fontSize: 11, fontFamily: "monospace", color: "#06b6d4", letterSpacing: 2, marginBottom: 8, textTransform: "uppercase" }}>Your Strategic Summary</div>
          <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.8 }}>
            Your strongest domain — <strong style={{ color: DOMAINS.find(d => scores[d.id] === Math.max(...DOMAINS.map(x => scores[x.id])))?.color }}>
              {DOMAINS.find(d => scores[d.id] === Math.max(...DOMAINS.map(x => scores[x.id])))?.label}
            </strong> — is your credibility anchor. Lead every client pitch with it. Your biggest growth opportunity is{" "}
            <strong style={{ color: prioritised[0].color }}>{prioritised[0].label}</strong>.{" "}
            Spend your first 30 days there. Start billing before you feel ready.
          </div>
        </div>

        <button onClick={() => { setScreen("intro"); setDomainIdx(0); setQIdx(0); setAnswers({}); setSelected(null); }} style={{
          display: "block", margin: "20px auto 0",
          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 10, color: "#64748b", fontSize: 12, fontFamily: "monospace",
          padding: "10px 24px", cursor: "pointer", textTransform: "uppercase", letterSpacing: 1,
        }}>Retake Diagnostic</button>
      </div>
    </div>
  );

  /* ── QUIZ SCREEN ── */
  return (
    <div style={bg} ref={containerRef}>
      <div style={{ maxWidth: 580, margin: "0 auto", padding: "24px 16px 48px" }}>

        {/* Progress bar */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 10, fontFamily: "monospace", color: "#334155", letterSpacing: 1 }}>
              DOMAIN {domainIdx + 1}/{DOMAINS.length} · Q{qIdx + 1}/{domain.questions.length}
            </span>
            <span style={{ fontSize: 10, fontFamily: "monospace", color: "#06b6d4" }}>
              {answeredQ}/{totalQ} complete
            </span>
          </div>
          <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 99, height: 4, overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 99,
              width: `${progress * 100}%`,
              background: `linear-gradient(90deg, ${domain.color}, #8b5cf6)`,
              transition: "width 0.4s ease",
            }} />
          </div>
        </div>

        {/* Domain header */}
        {showNote && (
          <div style={{
            background: `${domain.color}10`, border: `1px solid ${domain.color}30`,
            borderRadius: 12, padding: "14px 16px", marginBottom: 16,
            animation: "fadeIn 0.4s ease",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <span style={{ fontSize: 24, color: domain.color, fontFamily: "monospace" }}>{domain.icon}</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#e2e8f0" }}>{domain.label}</div>
                <div style={{ fontSize: 11, color: "#475569" }}>{domain.description}</div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: "#64748b", fontStyle: "italic", lineHeight: 1.5 }}>
              💊 {domain.pharmacistNote}
            </div>
          </div>
        )}

        {/* Question card */}
        <div style={{
          background: "rgba(255,255,255,0.04)", border: `1px solid ${domain.color}30`,
          borderRadius: 14, padding: "22px 20px", marginBottom: 16,
          position: "relative", overflow: "hidden",
          opacity: animating ? 0 : 1, transition: "opacity 0.25s",
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 3,
            background: `linear-gradient(90deg, ${domain.color}, transparent)`,
            width: `${((qIdx + 1) / domain.questions.length) * 100}%`,
          }} />
          <div style={{ fontSize: 10, fontFamily: "monospace", color: domain.color, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>
            Question {qIdx + 1} of {domain.questions.length}
          </div>
          <div style={{ fontSize: 16, color: "#e2e8f0", lineHeight: 1.65, fontFamily: "'Palatino Linotype', Georgia, serif" }}>
            {question}
          </div>
        </div>

        {/* Scale options */}
        <div style={{ marginBottom: 20 }}>
          {SCALE.map(opt => (
            <div key={opt.value} onClick={() => setSelected(opt.value)} style={{
              padding: "12px 16px", borderRadius: 10, marginBottom: 8,
              border: `1px solid ${selected === opt.value ? domain.color : "rgba(255,255,255,0.07)"}`,
              background: selected === opt.value ? `${domain.color}15` : "rgba(255,255,255,0.03)",
              cursor: "pointer", display: "flex", alignItems: "center", gap: 12,
              transition: "all 0.18s",
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                border: `2px solid ${selected === opt.value ? domain.color : "#334155"}`,
                background: selected === opt.value ? domain.color : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, fontWeight: 700, color: "#070d1a",
              }}>{selected === opt.value ? "✓" : ""}</div>
              <div>
                <div style={{ fontSize: 13, color: selected === opt.value ? "#e2e8f0" : "#94a3b8", fontWeight: selected === opt.value ? 600 : 400 }}>{opt.label}</div>
                <div style={{ display: "flex", gap: 3, marginTop: 2 }}>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <div key={j} style={{
                      width: 8, height: 3, borderRadius: 99,
                      background: j < opt.value ? domain.color : "rgba(255,255,255,0.1)",
                    }} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Next button */}
        <button onClick={next} disabled={selected === null} style={{
          width: "100%", padding: "14px", borderRadius: 12, border: "none",
          background: selected !== null
            ? `linear-gradient(90deg, ${domain.color}, #8b5cf6)`
            : "rgba(255,255,255,0.06)",
          color: selected !== null ? "#fff" : "#334155",
          fontSize: 14, fontWeight: 700, cursor: selected !== null ? "pointer" : "not-allowed",
          fontFamily: "monospace", textTransform: "uppercase", letterSpacing: 1,
          transition: "all 0.2s",
          boxShadow: selected !== null ? `0 0 20px ${domain.glow}` : "none",
        }}>
          {domainIdx === DOMAINS.length - 1 && qIdx === domain.questions.length - 1
            ? "Generate My Profile →"
            : "Next Question →"}
        </button>

        {/* Domain dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 20 }}>
          {DOMAINS.map((d, i) => (
            <div key={i} style={{
              width: 8, height: 8, borderRadius: "50%",
              background: i < domainIdx ? d.color : i === domainIdx ? d.color : "rgba(255,255,255,0.1)",
              opacity: i === domainIdx ? 1 : i < domainIdx ? 0.5 : 0.2,
              boxShadow: i === domainIdx ? `0 0 6px ${d.color}` : "none",
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}
