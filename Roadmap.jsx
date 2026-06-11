import { useState } from "react";

const roadmap = [
  {
    phase: "PHASE 1",
    title: "Data Foundations",
    subtitle: "Build the language of data",
    months: "Months 1–3",
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.08)",
    border: "rgba(6,182,212,0.25)",
    icon: "◈",
    income: "₦0–₦500K",
    incomeNote: "Still in investment mode — focus on skills",
    milestones: [
      "Complete Google Data Analytics Certificate (Coursera)",
      "Master Excel/Google Sheets pivot tables & health dashboards",
      "Learn Tableau Public — build 3 sample health dashboards",
      "Understand basic statistics: mean, median, correlation, regression",
      "Study 10 real-world health datasets (WHO, NCDC, Nigeria health data)",
    ],
    resources: [
      { name: "Google Data Analytics Certificate", platform: "Coursera", cost: "Free (audit)", url: "https://coursera.org" },
      { name: "Tableau Public", platform: "Tableau", cost: "Free", url: "https://public.tableau.com" },
      { name: "Statistics for Data Science", platform: "Khan Academy", cost: "Free", url: "https://khanacademy.org" },
      { name: "Nigeria Health Data Portal", platform: "NCDC", cost: "Free", url: "https://ncdc.gov.ng" },
    ],
    pharmacistEdge: "Your pharmacovigilance and drug outcome reporting experience is already structured data thinking. You've been doing data analysis — just not calling it that.",
    clientService: "Start offering: Basic health data dashboards for clinics using Excel/Google Sheets. Charge ₦50,000–₦150,000 per dashboard.",
    weeklyHours: 6,
  },
  {
    phase: "PHASE 2",
    title: "Health Analytics",
    subtitle: "Specialise in health data contexts",
    months: "Months 4–6",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.08)",
    border: "rgba(139,92,246,0.25)",
    icon: "◉",
    income: "₦300K–₦1.5M",
    incomeNote: "First data service clients — combine with agency work",
    milestones: [
      "Complete AI in Healthcare — Stanford (Coursera, audit free)",
      "Learn Epidemiology & Biostatistics basics — Johns Hopkins",
      "Learn Python fundamentals with Pandas for health data",
      "Build a Nigerian disease burden analysis project (portfolio piece)",
      "Learn Power BI — Microsoft's free health analytics tool",
      "Understand Electronic Health Records (EHR) data structures",
    ],
    resources: [
      { name: "AI in Healthcare (Stanford)", platform: "Coursera", cost: "Free (audit)", url: "https://coursera.org" },
      { name: "Epidemiology: The Basic Science of Public Health", platform: "Coursera/JHU", cost: "Free (audit)", url: "https://coursera.org" },
      { name: "Python for Data Science", platform: "DataCamp", cost: "$25/mo", url: "https://datacamp.com" },
      { name: "Power BI Desktop", platform: "Microsoft", cost: "Free", url: "https://powerbi.microsoft.com" },
    ],
    pharmacistEdge: "EHR data structures mirror what you know from prescription records, dispensing logs, and patient medication histories. Your clinical vocabulary gives you immediate advantage in health data interpretation.",
    clientService: "Offer: Pharma sales analytics reports + disease trend reports for NGOs. Charge $300–$800 per report. Target 2 clients.",
    weeklyHours: 8,
  },
  {
    phase: "PHASE 3",
    title: "Applied Data Science",
    subtitle: "Build real products & services",
    months: "Months 7–9",
    color: "#10b981",
    bg: "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.25)",
    icon: "◎",
    income: "₦1.5M–₦3.5M",
    incomeNote: "Data services now a meaningful revenue stream",
    milestones: [
      "Learn R or deepen Python — statistical modelling for health outcomes",
      "Complete IBM Data Science Professional Certificate",
      "Build a predictive health model (e.g. diabetes risk from Nigerian data)",
      "Learn CDISC standards — used by global pharma clinical data teams",
      "Create a patient outcome tracking template/tool for clinics",
      "Publish a health data insight on LinkedIn monthly (thought leadership)",
    ],
    resources: [
      { name: "IBM Data Science Professional Certificate", platform: "Coursera", cost: "Free (audit)", url: "https://coursera.org" },
      { name: "R for Data Science", platform: "Book (free online)", cost: "Free", url: "https://r4ds.had.co.nz" },
      { name: "CDISC Standards Training", platform: "CDISC", cost: "Paid (~$150)", url: "https://cdisc.org" },
      { name: "Fast.ai — Practical Deep Learning", platform: "Fast.ai", cost: "Free", url: "https://fast.ai" },
    ],
    pharmacistEdge: "CDISC (Clinical Data Interchange Standards) governs how clinical trial data is structured globally. Your pharma background means you already understand the clinical context — you just need to learn the data format.",
    clientService: "Offer: Patient outcome tracking systems + clinical trial data support for CROs. Charge $500–$2,000 per project. Target international clients.",
    weeklyHours: 10,
  },
  {
    phase: "PHASE 4",
    title: "AI Health Consulting",
    subtitle: "Premium positioning — be the expert",
    months: "Months 10–12",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.25)",
    icon: "★",
    income: "₦3M–₦7M+",
    incomeNote: "Premium consulting unlocks highest income tier",
    milestones: [
      "Complete Google Advanced Data Analytics Certificate",
      "Study AI/ML in clinical settings — practical case studies",
      "Build a Health AI Readiness Assessment tool for hospitals",
      "Develop your own Health Data Audit framework (proprietary methodology)",
      "Submit one article/abstract to a health informatics journal or conference",
      "Launch your Pharmacist-Data Scientist personal brand fully on LinkedIn",
    ],
    resources: [
      { name: "Google Advanced Data Analytics", platform: "Coursera", cost: "Free (audit)", url: "https://coursera.org" },
      { name: "Health Informatics on FHIR (HL7)", platform: "Coursera/JHU", cost: "Free (audit)", url: "https://coursera.org" },
      { name: "Machine Learning for Healthcare (MIT)", platform: "MIT OpenCourseWare", cost: "Free", url: "https://ocw.mit.edu" },
      { name: "Towards Data Science (Health)", platform: "Medium/TDS", cost: "Free", url: "https://towardsdatascience.com" },
    ],
    pharmacistEdge: "By Month 12, you have something no pure data scientist has: pharmacist-level clinical understanding PLUS data science skills. This is worth $5,000–$15,000 per consulting engagement to the right client.",
    clientService: "Offer: AI adoption consulting for hospitals + Health Data Audits + AI strategy for health startups. Charge $2,000–$8,000 per engagement.",
    weeklyHours: 10,
  },
];

const clientServices = [
  {
    title: "Health Data Dashboard",
    icon: "📊",
    tools: "Excel / Google Sheets / Tableau",
    skillsNeeded: "Month 1–2 skills",
    clients: "Private clinics, labs, pharmacies",
    price: "₦80K–₦250K/project",
    description: "Visual monthly reports showing patient volumes, revenue trends, drug utilisation, and KPIs. Clinics pay well for this — they currently do it manually.",
    difficulty: 1,
    color: "#06b6d4",
  },
  {
    title: "Pharma Sales Analytics Report",
    icon: "💊",
    tools: "Excel / Power BI",
    skillsNeeded: "Month 2–3 skills",
    clients: "Pharmaceutical companies, drug distributors",
    price: "$300–$900/report",
    description: "Market share analysis, territory performance, product trend reports. Your pharmacist background makes you uniquely credible for this — you understand the products.",
    difficulty: 2,
    color: "#8b5cf6",
  },
  {
    title: "Disease Burden Research Report",
    icon: "🌍",
    tools: "Public health data + Tableau/Excel",
    skillsNeeded: "Month 3–5 skills",
    clients: "Health NGOs, international orgs, government agencies",
    price: "$500–$2,000/report",
    description: "Using publicly available WHO, NCDC, and global datasets to produce country- or region-specific disease burden analysis for program planning and donor reporting.",
    difficulty: 2,
    color: "#10b981",
  },
  {
    title: "Patient Outcome Tracking System",
    icon: "🏥",
    tools: "Google Sheets + Looker Studio",
    skillsNeeded: "Month 4–6 skills",
    clients: "Specialist clinics, HMOs, NGO programs",
    price: "$400–$1,200 setup + $200/mo retainer",
    description: "Build a simple but powerful system for tracking patient outcomes, treatment adherence, and clinical indicators over time. Ongoing retainer = recurring income.",
    difficulty: 3,
    color: "#f59e0b",
  },
  {
    title: "Clinical Trial Data Support",
    icon: "🧪",
    tools: "Excel / R / CDISC standards",
    skillsNeeded: "Month 7–9 skills",
    clients: "CROs, pharmaceutical companies (global)",
    price: "$800–$3,000/project",
    description: "Assisting in data cleaning, structuring, and reporting for clinical trials. Your pharmacist credential + CDISC knowledge opens doors that most data scientists cannot access.",
    difficulty: 4,
    color: "#ec4899",
  },
  {
    title: "Health AI Readiness Consulting",
    icon: "🤖",
    tools: "Frameworks + AI knowledge",
    skillsNeeded: "Month 10–12 skills",
    clients: "Hospitals, health startups, pharma companies",
    price: "$2,000–$8,000/engagement",
    description: "Audit an organisation's data infrastructure, recommend AI tools, and guide implementation. By Month 12, you are one of very few pharmacist-data scientists in Nigeria who can do this credibly.",
    difficulty: 5,
    color: "#f43f5e",
  },
];

const stars = Array.from({ length: 60 }, (_, i) => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 1.5 + 0.5,
  opacity: Math.random() * 0.4 + 0.1,
}));

export default function Roadmap() {
  const [activePhase, setActivePhase] = useState(0);
  const [completedMilestones, setCompletedMilestones] = useState({});
  const [activeTab, setActiveTab] = useState("roadmap");

  const toggleMilestone = (phaseIdx, milestoneIdx) => {
    const key = `${phaseIdx}-${milestoneIdx}`;
    setCompletedMilestones(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const totalMilestones = roadmap.reduce((s, p) => s + p.milestones.length, 0);
  const completedCount = Object.values(completedMilestones).filter(Boolean).length;
  const progressPct = Math.round((completedCount / totalMilestones) * 100);

  const phase = roadmap[activePhase];

  return (
    <div style={{
      fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif",
      background: "#070d1a",
      minHeight: "100vh",
      color: "#dde4f0",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Star field background */}
      <svg style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}>
        {stars.map((s, i) => (
          <circle key={i} cx={`${s.x}%`} cy={`${s.y}%`} r={s.size} fill="white" opacity={s.opacity} />
        ))}
      </svg>

      <div style={{ position: "relative", zIndex: 1, padding: "24px 16px", maxWidth: 700, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{
            display: "inline-block",
            fontFamily: "monospace",
            fontSize: 10,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#06b6d4",
            background: "rgba(6,182,212,0.1)",
            border: "1px solid rgba(6,182,212,0.2)",
            borderRadius: 20,
            padding: "5px 16px",
            marginBottom: 14,
          }}>B.Pharm → Health Data Scientist</div>
          <h1 style={{
            fontSize: "clamp(24px, 6vw, 38px)",
            fontWeight: 700,
            margin: "0 0 6px",
            lineHeight: 1.15,
            background: "linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>12-Month Data Science Roadmap</h1>
          <p style={{ color: "#475569", fontSize: 14, margin: 0 }}>
            Personalised for a Pharmacist building a Health Digital Agency · Nigeria 2026
          </p>
        </div>

        {/* Progress Bar */}
        <div style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 12,
          padding: "14px 18px",
          marginBottom: 20,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: "#64748b", fontFamily: "monospace" }}>OVERALL PROGRESS</span>
              <span style={{ fontSize: 12, color: "#06b6d4", fontFamily: "monospace", fontWeight: 700 }}>{completedCount}/{totalMilestones} milestones</span>
            </div>
            <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 99, height: 6, overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: `${progressPct}%`,
                background: "linear-gradient(90deg, #06b6d4, #8b5cf6)",
                borderRadius: 99,
                transition: "width 0.4s ease",
              }} />
            </div>
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: progressPct > 0 ? "#06b6d4" : "#334155", minWidth: 44, textAlign: "right", fontFamily: "monospace" }}>{progressPct}%</div>
        </div>

        {/* Tabs */}
        <div style={{
          display: "flex",
          gap: 4,
          background: "rgba(255,255,255,0.03)",
          borderRadius: 10,
          padding: 4,
          marginBottom: 20,
        }}>
          {["roadmap", "services", "toolkit"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              flex: 1,
              padding: "9px 8px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: activeTab === tab ? 700 : 400,
              background: activeTab === tab ? "rgba(6,182,212,0.15)" : "transparent",
              color: activeTab === tab ? "#06b6d4" : "#475569",
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: 1,
              transition: "all 0.2s",
            }}>{tab}</button>
          ))}
        </div>

        {/* ROADMAP TAB */}
        {activeTab === "roadmap" && (
          <div>
            {/* Phase Selector */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 20 }}>
              {roadmap.map((p, i) => (
                <button key={i} onClick={() => setActivePhase(i)} style={{
                  padding: "10px 6px",
                  borderRadius: 10,
                  border: `1px solid ${activePhase === i ? p.color : "rgba(255,255,255,0.07)"}`,
                  background: activePhase === i ? p.bg : "rgba(255,255,255,0.03)",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all 0.2s",
                }}>
                  <div style={{ fontSize: 18, marginBottom: 3 }}>{p.icon}</div>
                  <div style={{ fontSize: 9, fontFamily: "monospace", color: activePhase === i ? p.color : "#334155", letterSpacing: 1, textTransform: "uppercase" }}>{p.phase}</div>
                  <div style={{ fontSize: 10, color: activePhase === i ? "#94a3b8" : "#1e293b", marginTop: 2 }}>{p.months}</div>
                </button>
              ))}
            </div>

            {/* Phase Detail */}
            <div style={{
              background: phase.bg,
              border: `1px solid ${phase.border}`,
              borderRadius: 14,
              padding: "20px 18px",
              marginBottom: 16,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 11, fontFamily: "monospace", color: phase.color, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>{phase.phase} · {phase.months}</div>
                  <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#e2e8f0" }}>{phase.title}</h2>
                  <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>{phase.subtitle}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 10, fontFamily: "monospace", color: "#475569", marginBottom: 2 }}>INCOME TARGET</div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: phase.color }}>{phase.income}</div>
                  <div style={{ fontSize: 10, color: "#334155", marginTop: 2 }}>{phase.incomeNote}</div>
                </div>
              </div>

              {/* Milestones */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontFamily: "monospace", color: "#475569", letterSpacing: 1, marginBottom: 10, textTransform: "uppercase" }}>Milestones — tap to mark complete</div>
                {phase.milestones.map((m, i) => {
                  const key = `${activePhase}-${i}`;
                  const done = completedMilestones[key];
                  return (
                    <div key={i} onClick={() => toggleMilestone(activePhase, i)} style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      padding: "9px 12px",
                      borderRadius: 8,
                      marginBottom: 6,
                      background: done ? `rgba(${phase.color === "#06b6d4" ? "6,182,212" : phase.color === "#8b5cf6" ? "139,92,246" : phase.color === "#10b981" ? "16,185,129" : "245,158,11"},0.12)` : "rgba(255,255,255,0.03)",
                      border: `1px solid ${done ? phase.border : "rgba(255,255,255,0.05)"}`,
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}>
                      <div style={{
                        width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
                        border: `2px solid ${done ? phase.color : "#334155"}`,
                        background: done ? phase.color : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 10, color: "#070d1a", fontWeight: 700, marginTop: 1,
                      }}>{done ? "✓" : ""}</div>
                      <div style={{ fontSize: 13, color: done ? "#94a3b8" : "#dde4f0", textDecoration: done ? "line-through" : "none", lineHeight: 1.5 }}>{m}</div>
                    </div>
                  );
                })}
              </div>

              {/* Weekly hours */}
              <div style={{
                display: "flex", gap: 8, alignItems: "center",
                background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "8px 12px", marginBottom: 14,
              }}>
                <span style={{ fontSize: 12, color: "#475569" }}>⏱ Recommended weekly study time:</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: phase.color, fontFamily: "monospace" }}>{phase.weeklyHours} hours/week</span>
              </div>

              {/* Pharmacist Edge */}
              <div style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 10,
                padding: "12px 14px",
                marginBottom: 12,
              }}>
                <div style={{ fontSize: 10, fontFamily: "monospace", color: "#475569", letterSpacing: 1, marginBottom: 6, textTransform: "uppercase" }}>💡 Your Pharmacist Edge</div>
                <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.65 }}>{phase.pharmacistEdge}</div>
              </div>

              {/* Client Service */}
              <div style={{
                background: `rgba(${phase.color === "#06b6d4" ? "6,182,212" : phase.color === "#8b5cf6" ? "139,92,246" : phase.color === "#10b981" ? "16,185,129" : "245,158,11"},0.08)`,
                border: `1px solid ${phase.border}`,
                borderRadius: 10,
                padding: "12px 14px",
              }}>
                <div style={{ fontSize: 10, fontFamily: "monospace", color: phase.color, letterSpacing: 1, marginBottom: 6, textTransform: "uppercase" }}>💼 Monetise Now</div>
                <div style={{ fontSize: 13, color: "#dde4f0", lineHeight: 1.65 }}>{phase.clientService}</div>
              </div>
            </div>

            {/* Resources */}
            <div style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 12,
              overflow: "hidden",
            }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", fontSize: 11, fontFamily: "monospace", color: "#475569", letterSpacing: 1, textTransform: "uppercase" }}>Learning Resources</div>
              {phase.resources.map((r, i) => (
                <div key={i} style={{
                  padding: "11px 16px",
                  borderBottom: i < phase.resources.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6,
                }}>
                  <div>
                    <div style={{ fontSize: 13, color: "#dde4f0", fontWeight: 600 }}>{r.name}</div>
                    <div style={{ fontSize: 11, color: "#475569" }}>{r.platform}</div>
                  </div>
                  <div style={{
                    fontSize: 11,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    color: r.cost.includes("Free") ? "#10b981" : "#f59e0b",
                    background: r.cost.includes("Free") ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)",
                    border: `1px solid ${r.cost.includes("Free") ? "rgba(16,185,129,0.2)" : "rgba(245,158,11,0.2)"}`,
                    borderRadius: 6,
                    padding: "3px 10px",
                    whiteSpace: "nowrap",
                  }}>{r.cost}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SERVICES TAB */}
        {activeTab === "services" && (
          <div>
            <div style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 12,
              padding: "14px 16px",
              marginBottom: 16,
              fontSize: 13,
              color: "#64748b",
              lineHeight: 1.6,
            }}>
              You do <strong style={{ color: "#dde4f0" }}>not</strong> need a data science degree to start earning from health data services. Each service below is unlocked by a specific phase of learning — and priced to reflect the value you deliver, not just the hours you work.
            </div>

            {clientServices.map((s, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid rgba(255,255,255,0.07)`,
                borderRadius: 12,
                padding: "16px",
                marginBottom: 12,
                borderLeft: `3px solid ${s.color}`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 22 }}>{s.icon}</span>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "#e2e8f0" }}>{s.title}</div>
                      <div style={{ fontSize: 11, color: "#475569", fontFamily: "monospace" }}>{s.skillsNeeded}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: s.color }}>{s.price}</div>
                    <div style={{ fontSize: 10, color: "#334155", marginTop: 2 }}>{s.clients}</div>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6, marginBottom: 10 }}>{s.description}</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, color: "#475569" }}>Tools:</span>
                  {s.tools.split(" / ").map((t, j) => (
                    <span key={j} style={{
                      fontSize: 10, fontFamily: "monospace",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 4, padding: "2px 8px", color: "#94a3b8",
                    }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <div key={j} style={{
                      height: 4, flex: 1, borderRadius: 99,
                      background: j < s.difficulty ? s.color : "rgba(255,255,255,0.08)",
                    }} />
                  ))}
                  <span style={{ fontSize: 10, color: "#334155", fontFamily: "monospace", marginLeft: 4 }}>
                    {["", "Beginner", "Easy", "Intermediate", "Advanced", "Expert"][s.difficulty]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TOOLKIT TAB */}
        {activeTab === "toolkit" && (
          <div>
            {[
              {
                category: "🆓 Free Tools — Start Today",
                color: "#10b981",
                tools: [
                  { name: "Google Sheets", use: "Health dashboards, data cleaning, client reports" },
                  { name: "Tableau Public", use: "Free data visualisation — publish health charts" },
                  { name: "Power BI Desktop", use: "Microsoft's powerful free analytics tool" },
                  { name: "Looker Studio (Google)", use: "Free, connects to Sheets — build live dashboards" },
                  { name: "Python (Anaconda)", use: "Free data science environment with Jupyter notebooks" },
                  { name: "R + RStudio", use: "Statistical analysis — widely used in health research" },
                  { name: "NCDC Data Portal", use: "Nigeria disease surveillance data (free)" },
                  { name: "WHO Global Health Observatory", use: "Free global health datasets" },
                  { name: "Kaggle", use: "Free datasets + courses + competitions" },
                  { name: "Claude / ChatGPT", use: "AI assistant for data interpretation & report writing" },
                ],
              },
              {
                category: "📚 Free Courses — Audit These",
                color: "#8b5cf6",
                tools: [
                  { name: "Google Data Analytics (Coursera)", use: "Foundational — start here, Month 1" },
                  { name: "AI in Healthcare — Stanford (Coursera)", use: "Critical for Phase 2 credibility" },
                  { name: "Epidemiology — Johns Hopkins (Coursera)", use: "Public health data foundations" },
                  { name: "IBM Data Science Certificate (Coursera)", use: "Python + data science fundamentals" },
                  { name: "MIT OpenCourseWare — ML for Health", use: "Advanced — Phase 3 onwards" },
                  { name: "Fast.ai Practical Deep Learning", use: "Practical AI — free, world-class" },
                  { name: "Khan Academy Statistics", use: "Foundational stats — start in Month 1" },
                ],
              },
              {
                category: "💰 Paid Tools Worth Investing In",
                color: "#f59e0b",
                tools: [
                  { name: "DataCamp ($25/mo)", use: "Python/R tracks specifically for health data" },
                  { name: "CDISC Training (~$150)", use: "Clinical data standards — opens pharma doors globally" },
                  { name: "LinkedIn Premium (~$40/mo)", use: "Client prospecting — ROI positive from first client" },
                  { name: "Canva Pro ($13/mo)", use: "Professional data report design" },
                ],
              },
              {
                category: "🌍 Data Sources for Your Health Portfolio",
                color: "#06b6d4",
                tools: [
                  { name: "NCDC Nigeria", use: "ncdc.gov.ng — disease surveillance data" },
                  { name: "WHO Global Health Observatory", use: "who.int/data — global datasets" },
                  { name: "World Bank Health Data", use: "data.worldbank.org — economic + health" },
                  { name: "DHS Program", use: "dhsprogram.com — Africa demographic & health surveys" },
                  { name: "Nigeria LHIMS", use: "Hospital information system data (request access)" },
                  { name: "Kaggle Health Datasets", use: "kaggle.com/datasets — practice on real health data" },
                ],
              },
            ].map((section, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid rgba(255,255,255,0.07)`,
                borderRadius: 12,
                overflow: "hidden",
                marginBottom: 14,
              }}>
                <div style={{
                  padding: "11px 16px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  fontSize: 13,
                  fontWeight: 700,
                  color: section.color,
                }}>{section.category}</div>
                {section.tools.map((t, j) => (
                  <div key={j} style={{
                    padding: "9px 16px",
                    borderBottom: j < section.tools.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#dde4f0" }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "#475569" }}>{t.use}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div style={{
          textAlign: "center",
          marginTop: 24,
          padding: "16px",
          background: "rgba(6,182,212,0.05)",
          border: "1px solid rgba(6,182,212,0.1)",
          borderRadius: 12,
        }}>
          <div style={{ fontSize: 12, color: "#06b6d4", fontFamily: "monospace", marginBottom: 6, letterSpacing: 1 }}>YOUR UNFAIR ADVANTAGE</div>
          <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7 }}>
            By Month 12, you will be one of a handful of people in Nigeria — and perhaps West Africa — with the combination of a pharmacy license, data science skills, and business acumen. That combination is worth far more than any single skill alone.
          </div>
        </div>
      </div>
    </div>
  );
}
