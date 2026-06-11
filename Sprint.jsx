import { useState, useEffect } from "react";

const WEEKS = [
  {
    week: 1,
    theme: "Launch & Foundations",
    subtitle: "Start earning with what you have. Start learning what you need.",
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.08)",
    border: "rgba(6,182,212,0.2)",
    incomeTarget: "₦0 — Pipeline building week",
    incomeNote: "Anyone who responds becomes a Week 2–3 conversation",
    days: [
      {
        day: 1,
        learn: { label: "Khan Academy Stats", task: "Work through Displaying & Comparing Quantitative Data", duration: "60 min", url: "khanacademy.org" },
        income: { label: "Update LinkedIn Headline", task: "Pharmacist | Health Data & Content Strategist | Helping Clinics & Pharma Brands Make Sense of Their Data" },
      },
      {
        day: 2,
        learn: { label: "Khan Academy Stats", task: "Summarising Quantitative Data — mean, median, standard deviation", duration: "60 min" },
        income: { label: "Publish LinkedIn Post #1", task: "Topic: One thing most Nigerian clinics get wrong about their patient data — write from pharmacy experience" },
      },
      {
        day: 3,
        learn: { label: "Khan Academy Stats", task: "Continue — Basic Probability concepts", duration: "45 min" },
        income: { label: "Prospect Research", task: "Identify 10 private clinics in your city on Google Maps. Find their Instagram or WhatsApp contact" },
      },
      {
        day: 4,
        learn: { label: "Tableau Public Setup", task: "Create free account. Watch official Getting Started video series", duration: "60 min", url: "public.tableau.com" },
        income: { label: "Send Cold Pitches", task: "Draft and send 3 cold pitches using Template A from your pitch pack" },
      },
      {
        day: 5,
        learn: { label: "Tableau Public", task: "Continue Getting Started series — build your first basic chart", duration: "60 min" },
        income: { label: "CAC Registration", task: "Register your business name on the CAC portal if not already done" },
      },
      {
        day: 6,
        learn: { label: "First Health Dashboard", task: "Build your first Tableau viz using free Nigerian data from ncdc.gov.ng or WHO", duration: "75 min", url: "ncdc.gov.ng" },
        income: { label: "Open Payoneer Account", task: "Sign up at payoneer.com for receiving international payments" },
      },
      {
        day: 7,
        learn: { label: "Refine Dashboard", task: "Polish your Week 1 Tableau dashboard. Export as PDF portfolio piece", duration: "60 min" },
        income: { label: "Follow Up + New Pitches", task: "Follow up Day 4 pitches via WhatsApp voice note. Send 3 more cold pitches" },
      },
    ],
  },
  {
    week: 2,
    theme: "First Data Service Offer",
    subtitle: "Turn your Tableau skill into a product. Make your first offer.",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.08)",
    border: "rgba(139,92,246,0.2)",
    incomeTarget: "First discovery call booked",
    incomeNote: "First small project discussed — even ₦30K–₦80K counts",
    days: [
      {
        day: 8,
        learn: { label: "Khan Academy Probability", task: "Basic Probability module — focus on understanding, not memorising formulas", duration: "45 min" },
        income: { label: "Create Portfolio PDF", task: "Turn your Week 1 Tableau dashboard into a PDF sample. This is now your portfolio piece" },
      },
      {
        day: 9,
        learn: { label: "Normal Distributions", task: "Khan Academy — Normal distributions and z-scores", duration: "45 min" },
        income: { label: "Send Dashboard to Clinics", task: "Email/WhatsApp your sample to 10 clinic prospects: I built this using public health data. I can tailor it to your clinic in 5 days." },
      },
      {
        day: 10,
        learn: { label: "Tableau Filters", task: "Learn calculated fields and filters in Tableau. Build a second, more polished dashboard", duration: "60 min" },
        income: { label: "Pharma Prospect Research", task: "Research 5 Nigerian pharma companies (Emzor, Fidson, May & Baker, Healtheon, Swipha). Find marketing contacts on LinkedIn" },
      },
      {
        day: 11,
        learn: { label: "Tableau Calculated Fields", task: "Continue Tableau — interactive filters, colour coding, dashboard layout", duration: "60 min" },
        income: { label: "LinkedIn Outreach — Pharma", task: "Send 3 LinkedIn connection requests to pharma marketing managers with personalised note referencing your pharmacy background" },
      },
      {
        day: 12,
        learn: { label: "Google Sheets Pivot Tables", task: "Master pivot tables in Google Sheets — this is what clients will send you their data in", duration: "45 min" },
        income: { label: "Publish LinkedIn Post #2", task: "Topic: Why most pharma companies in Nigeria are sitting on data they are not using" },
      },
      {
        day: 13,
        learn: { label: "Google Sheets Charts", task: "Build a health data summary report entirely in Google Sheets — charts, pivot tables, summary stats", duration: "60 min" },
        income: { label: "Follow Up All Pitches", task: "Follow up all outstanding pitches from Weeks 1–2. Aim to book at least one discovery call this week" },
      },
      {
        day: 14,
        learn: { label: "Review & Consolidate", task: "Review all stats and Tableau learning. Identify and fill any gaps from Weeks 1–2", duration: "45 min" },
        income: { label: "Discovery Call Prep", task: "Prepare 5 smart questions to ask on a discovery call. Practice your 2-minute intro out loud" },
      },
    ],
  },
  {
    week: 3,
    theme: "Deepen Skills. Close First Client.",
    subtitle: "Statistics deepens. Pipeline converts.",
    color: "#10b981",
    bg: "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.2)",
    incomeTarget: "First paid engagement agreed",
    incomeNote: "Even if payment arrives in Week 4",
    days: [
      {
        day: 15,
        learn: { label: "Google Data Analytics", task: "Begin Coursera Google Data Analytics Certificate — Module 1 (free audit). Data types and data thinking", duration: "60 min", url: "coursera.org" },
        income: { label: "Build Health Data Audit Tool", task: "Create a 1-page checklist: what data does the clinic collect, how is it stored, what decisions do they wish they could make" },
      },
      {
        day: 16,
        learn: { label: "Google Data Analytics", task: "Module 1 continued — structured thinking, asking the right questions with data", duration: "60 min" },
        income: { label: "Send Audit Tool to Clinics", task: "Send Health Data Audit template to all 10 clinic contacts as a free resource. Positions you as expert, not salesperson" },
      },
      {
        day: 17,
        learn: { label: "Google Data Analytics", task: "Module 2 — Data-driven decisions, spreadsheet basics reinforcement", duration: "60 min" },
        income: { label: "Pitch Health NGOs", task: "Send 5 new cold pitches targeting health NGOs or public health organisations. Use Template C from your pitch pack" },
      },
      {
        day: 18,
        learn: { label: "Data Cleaning Concepts", task: "Google Data Analytics Module 2 — data cleaning, dirty data, null values, duplicates", duration: "60 min" },
        income: { label: "Conduct Discovery Calls", task: "Use your Health Data Audit template to guide the conversation. Listen 70%, talk 30%" },
      },
      {
        day: 19,
        learn: { label: "Real Dashboard Study", task: "Study 3 real health dashboards: WHO, NCDC, any NGO annual report. Reverse-engineer what they show and why", duration: "45 min" },
        income: { label: "Conduct Discovery Calls", task: "Continue any booked calls. Take detailed notes. Identify the single biggest pain point per prospect" },
      },
      {
        day: 20,
        learn: { label: "Google Data Analytics", task: "Module 3 — spreadsheet functions, data validation, conditional formatting for health data", duration: "60 min" },
        income: { label: "Write Proposals", task: "Prepare a 1-page proposal for any interested prospect. Price: ₦80K–₦150K for a monthly data dashboard" },
      },
      {
        day: 21,
        learn: { label: "Visualisation Best Practices", task: "Study chart selection: when to use bar vs line vs scatter vs heatmap. Read Storytelling with Data summary (free online)", duration: "45 min" },
        income: { label: "Send Proposals + Follow Up", task: "Send proposals. Follow up by WhatsApp voice note — converts significantly better than text in Nigeria" },
      },
    ],
  },
  {
    week: 4,
    theme: "Deliver. Learn Python. Systematise.",
    subtitle: "Deliver first service. Start the skill that unlocks the next income tier.",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.2)",
    incomeTarget: "₦80K–₦300K",
    incomeNote: "First client delivered + testimonial secured",
    days: [
      {
        day: 22,
        learn: { label: "Python — Anaconda Install", task: "Install Anaconda (free). Complete Python beginner tutorial at python.org — variables, data types, print statements", duration: "60 min", url: "python.org" },
        income: { label: "Deliver Client Project", task: "Deliver your first dashboard with a 1-page written interpretation in medically accurate clinical language" },
      },
      {
        day: 23,
        learn: { label: "Python Basics", task: "Lists, loops (for/while), and conditional statements (if/else). Write 5 small health-themed practice scripts", duration: "60 min" },
        income: { label: "Deliver Client Project", task: "Finesse and present your dashboard. Walk the client through every chart — explain the story behind the numbers" },
      },
      {
        day: 24,
        learn: { label: "Python Functions", task: "Functions and basic file handling. Write a function that reads a CSV and prints summary statistics", duration: "60 min" },
        income: { label: "Deliver Client Project", task: "Final delivery. Send a clean PDF version + the live dashboard link. Include brief usage instructions" },
      },
      {
        day: 25,
        learn: { label: "Pandas — Week 1", task: "Corey Schafer Pandas Tutorial on YouTube — Part 1. Load a CSV, view data, check data types", duration: "75 min", url: "youtube.com" },
        income: { label: "Request Testimonial", task: "Request a written testimonial or LinkedIn recommendation from your first client immediately on delivery. Make it easy — send a template" },
      },
      {
        day: 26,
        learn: { label: "Pandas — Week 1", task: "Corey Schafer Pandas Part 2 — filtering, sorting, groupby. Use a real health dataset from Kaggle", duration: "75 min" },
        income: { label: "Publish LinkedIn Post #3", task: "Case study (anonymised): How a clinic in [your city] went from guessing to knowing — a data story" },
      },
      {
        day: 27,
        learn: { label: "DataCamp Python Track", task: "Begin DataCamp Introduction to Python (first module free). This is your ongoing Python learning track", duration: "60 min", url: "datacamp.com" },
        income: { label: "New Prospects — Social Proof", task: "Pitch 5 new prospects using momentum from Post 3. Lead with your case study as social proof" },
      },
      {
        day: 28,
        learn: { label: "Month Review", task: "Review all learning. Write down 3 things you now understand that you did not on Day 1. Plan Month 2 focus areas", duration: "45 min" },
        income: { label: "Month Review", task: "Count: pitches sent, responses, calls booked, proposals sent, projects closed, income generated. Set Month 2 targets" },
      },
    ],
  },
];

const TARGETS = [
  { label: "LinkedIn posts published", target: "4", icon: "📝" },
  { label: "Cold pitches sent", target: "40+", icon: "📨" },
  { label: "Discovery calls booked", target: "3–5", icon: "📞" },
  { label: "Proposals sent", target: "2–3", icon: "📋" },
  { label: "Projects closed", target: "1–2", icon: "✅" },
  { label: "Income generated", target: "₦80K–₦300K", icon: "💰" },
  { label: "Portfolio pieces built", target: "3", icon: "🗂" },
  { label: "Domains improved", target: "2 (Stats + Viz)", icon: "📈" },
];

const KILLERS = [
  { title: "Waiting until skills feel ready", desc: "They will never feel good enough. Your health domain knowledge is already enough to pitch. Technical skills follow client relationships — not the other way around.", icon: "⏳" },
  { title: "Learning without building", desc: "Every skill learned this month must produce a visible output — a dashboard, a post, a sample report. Invisible learning does not build a business.", icon: "🔨" },
  { title: "Spreading across too many platforms", desc: "LinkedIn only for now. That is where clinic owners, pharma managers, and NGO directors actually are. WhatsApp is for follow-up only.", icon: "📱" },
];

const stars = Array.from({ length: 50 }, () => ({
  x: Math.random() * 100, y: Math.random() * 100,
  size: Math.random() * 1.5 + 0.4, opacity: Math.random() * 0.35 + 0.05,
}));

export default function Sprint() {
  const [activeWeek, setActiveWeek] = useState(0);
  const [activeTab, setActiveTab] = useState("sprint");
  const [checked, setChecked] = useState({});
  const [activeType, setActiveType] = useState("both");
  const [expandedDay, setExpandedDay] = useState(null);

  const week = WEEKS[activeWeek];

  const toggle = (key) => setChecked(prev => ({ ...prev, [key]: !prev[key] }));

  const totalItems = WEEKS.reduce((s, w) => s + w.days.length * 2, 0);
  const doneItems  = Object.values(checked).filter(Boolean).length;
  const pct        = Math.round((doneItems / totalItems) * 100);

  const weekDone = (w) => {
    const keys = w.days.flatMap(d => [`${d.day}-learn`, `${d.day}-income`]);
    return keys.filter(k => checked[k]).length;
  };
  const weekTotal = (w) => w.days.length * 2;

  const tabBtn = (id, label) => (
    <button onClick={() => setActiveTab(id)} style={{
      flex: 1, padding: "9px 6px", borderRadius: 8, border: "none", cursor: "pointer",
      fontSize: 11, fontWeight: activeTab === id ? 700 : 400,
      background: activeTab === id ? "rgba(6,182,212,0.15)" : "transparent",
      color: activeTab === id ? "#06b6d4" : "#475569",
      fontFamily: "monospace", textTransform: "uppercase", letterSpacing: 1,
      transition: "all 0.2s", whiteSpace: "nowrap",
    }}>{label}</button>
  );

  return (
    <div style={{
      fontFamily: "'Palatino Linotype', 'Book Antiqua', Georgia, serif",
      background: "linear-gradient(160deg, #040c18 0%, #070d1a 60%, #050b15 100%)",
      minHeight: "100vh", color: "#dde4f0", position: "relative", overflowX: "hidden",
    }}>
      <style>{`
        @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scanline { 0%{top:0%} 100%{top:100%} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        * { box-sizing: border-box; }
        input[type=checkbox] { accent-color: #06b6d4; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(6,182,212,0.3); border-radius: 2px; }
      `}</style>

      {/* Star field */}
      <svg style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}>
        {stars.map((s, i) => <circle key={i} cx={`${s.x}%`} cy={`${s.y}%`} r={s.size} fill="white" opacity={s.opacity} />)}
      </svg>
      {/* Scan line */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(6,182,212,0.4),transparent)", animation: "scanline 4s linear infinite", zIndex: 1, pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 720, margin: "0 auto", padding: "22px 14px 52px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontFamily: "monospace", fontSize: 9, letterSpacing: 3, textTransform: "uppercase",
            color: "#06b6d4", background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.18)",
            borderRadius: 20, padding: "4px 14px", marginBottom: 12,
          }}>
            <span style={{ animation: "pulse 1.5s infinite" }}>●</span> B.Pharm → Health Data Scientist
          </div>
          <h1 style={{
            fontSize: "clamp(22px,5vw,34px)", fontWeight: 700, margin: "0 0 5px", lineHeight: 1.15,
            fontFamily: "'Palatino Linotype', Georgia, serif",
            background: "linear-gradient(135deg,#e2e8f0,#64748b)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>30-Day Sprint Dashboard</h1>
          <p style={{ color: "#475569", fontSize: 13, margin: 0 }}>
            Nigeria 2026 · 1 Learning Block + 1 Income Action per day
          </p>
        </div>

        {/* Global Progress */}
        <div style={{
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 12, padding: "14px 18px", marginBottom: 18,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div>
              <div style={{ fontSize: 11, fontFamily: "monospace", color: "#475569", letterSpacing: 1, marginBottom: 2 }}>OVERALL SPRINT PROGRESS</div>
              <div style={{ fontSize: 11, color: "#64748b" }}>{doneItems} of {totalItems} daily actions completed</div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "monospace", color: pct > 50 ? "#10b981" : pct > 25 ? "#f59e0b" : "#06b6d4" }}>
              {pct}%
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 99, height: 6, overflow: "hidden" }}>
            <div style={{
              height: "100%", width: `${pct}%`, borderRadius: 99,
              background: "linear-gradient(90deg,#06b6d4,#8b5cf6,#10b981,#f59e0b)",
              transition: "width 0.5s ease", boxShadow: "0 0 8px rgba(6,182,212,0.4)",
            }} />
          </div>
          {/* Week progress mini */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginTop: 12 }}>
            {WEEKS.map((w, i) => {
              const wd = weekDone(w); const wt = weekTotal(w);
              const wp = Math.round((wd / wt) * 100);
              return (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, fontFamily: "monospace", color: w.color, marginBottom: 3, opacity: 0.7 }}>WK {i + 1}</div>
                  <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 99, height: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${wp}%`, background: w.color, borderRadius: 99, transition: "width 0.4s" }} />
                  </div>
                  <div style={{ fontSize: 9, fontFamily: "monospace", color: "#334155", marginTop: 2 }}>{wd}/{wt}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 4, marginBottom: 18 }}>
          {tabBtn("sprint", "🗓 Sprint")}
          {tabBtn("targets", "🎯 Targets")}
          {tabBtn("warnings", "⚠️ Warnings")}
        </div>

        {/* ── SPRINT TAB ── */}
        {activeTab === "sprint" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            {/* Week selector */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8, marginBottom: 16 }}>
              {WEEKS.map((w, i) => {
                const wd = weekDone(w); const wt = weekTotal(w);
                return (
                  <button key={i} onClick={() => { setActiveWeek(i); setExpandedDay(null); }} style={{
                    padding: "12px 14px", borderRadius: 11, cursor: "pointer", textAlign: "left",
                    border: `1px solid ${activeWeek === i ? w.color : "rgba(255,255,255,0.07)"}`,
                    background: activeWeek === i ? w.bg : "rgba(255,255,255,0.02)",
                    transition: "all 0.2s",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ fontSize: 9, fontFamily: "monospace", color: w.color, letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 }}>Week {w.week} · Days {(i * 7) + 1}–{(i * 7) + 7}</div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0", lineHeight: 1.3 }}>{w.theme}</div>
                      </div>
                      <div style={{ fontSize: 11, fontFamily: "monospace", fontWeight: 700, color: w.color, flexShrink: 0, marginLeft: 8 }}>{wd}/{wt}</div>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 99, height: 3, marginTop: 8, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${Math.round((wd / wt) * 100)}%`, background: w.color, borderRadius: 99, transition: "width 0.4s" }} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Week header */}
            <div style={{ background: week.bg, border: `1px solid ${week.border}`, borderRadius: 12, padding: "14px 16px", marginBottom: 14 }}>
              <div style={{ fontSize: 9, fontFamily: "monospace", color: week.color, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>Week {week.week} Theme</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#e2e8f0", marginBottom: 3 }}>{week.theme}</div>
              <div style={{ fontSize: 12, color: "#64748b", marginBottom: 10 }}>{week.subtitle}</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <div style={{ background: `${week.color}15`, border: `1px solid ${week.color}25`, borderRadius: 6, padding: "5px 12px", fontSize: 11, color: week.color, fontWeight: 700 }}>💰 {week.incomeTarget}</div>
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 6, padding: "5px 12px", fontSize: 11, color: "#64748b" }}>{week.incomeNote}</div>
              </div>
            </div>

            {/* Type filter */}
            <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
              {[["both", "All Actions"], ["learn", "📚 Learning"], ["income", "💼 Income"]].map(([val, lbl]) => (
                <button key={val} onClick={() => setActiveType(val)} style={{
                  padding: "6px 14px", borderRadius: 8, border: `1px solid ${activeType === val ? week.color : "rgba(255,255,255,0.08)"}`,
                  background: activeType === val ? week.bg : "transparent",
                  color: activeType === val ? week.color : "#475569",
                  fontSize: 11, fontFamily: "monospace", cursor: "pointer", transition: "all 0.15s",
                }}>{lbl}</button>
              ))}
            </div>

            {/* Daily cards */}
            {week.days.map((day) => {
              const learnKey  = `${day.day}-learn`;
              const incomeKey = `${day.day}-income`;
              const learnDone  = !!checked[learnKey];
              const incomeDone = !!checked[incomeKey];
              const allDone    = learnDone && incomeDone;
              const isExpanded = expandedDay === day.day;

              return (
                <div key={day.day} style={{
                  background: allDone ? "rgba(16,185,129,0.05)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${allDone ? "rgba(16,185,129,0.2)" : "rgba(255,255,255,0.07)"}`,
                  borderRadius: 11, marginBottom: 8, overflow: "hidden",
                  transition: "all 0.2s",
                }}>
                  {/* Day header */}
                  <div onClick={() => setExpandedDay(isExpanded ? null : day.day)} style={{
                    padding: "11px 14px", display: "flex", alignItems: "center",
                    gap: 10, cursor: "pointer",
                  }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
                      background: allDone ? "#10b981" : `${week.color}15`,
                      border: `2px solid ${allDone ? "#10b981" : week.color}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, fontWeight: 700, fontFamily: "monospace",
                      color: allDone ? "#070d1a" : week.color,
                    }}>{allDone ? "✓" : `D${day.day}`}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>Day {day.day}</span>
                        <div style={{ display: "flex", gap: 4 }}>
                          <span style={{
                            fontSize: 9, fontFamily: "monospace", padding: "1px 6px", borderRadius: 4,
                            background: learnDone ? "rgba(6,182,212,0.2)" : "rgba(255,255,255,0.05)",
                            color: learnDone ? "#06b6d4" : "#334155", border: `1px solid ${learnDone ? "rgba(6,182,212,0.3)" : "rgba(255,255,255,0.06)"}`,
                          }}>📚 {learnDone ? "✓" : "·"}</span>
                          <span style={{
                            fontSize: 9, fontFamily: "monospace", padding: "1px 6px", borderRadius: 4,
                            background: incomeDone ? "rgba(16,185,129,0.2)" : "rgba(255,255,255,0.05)",
                            color: incomeDone ? "#10b981" : "#334155", border: `1px solid ${incomeDone ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.06)"}`,
                          }}>💼 {incomeDone ? "✓" : "·"}</span>
                        </div>
                      </div>
                      <div style={{ fontSize: 11, color: "#475569", marginTop: 1 }}>
                        {day.learn.label} · {day.income.label}
                      </div>
                    </div>
                    <span style={{ fontSize: 12, color: "#334155", transition: "transform 0.2s", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
                  </div>

                  {/* Expanded detail */}
                  {isExpanded && (
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "12px 14px", animation: "fadeIn 0.2s ease" }}>
                      {(activeType === "both" || activeType === "learn") && (
                        <div style={{
                          background: "rgba(6,182,212,0.06)", border: "1px solid rgba(6,182,212,0.15)",
                          borderRadius: 8, padding: "11px 13px", marginBottom: 8,
                          opacity: learnDone ? 0.6 : 1,
                        }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 9, fontFamily: "monospace", color: "#06b6d4", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>📚 Learning Block {day.learn.duration && `· ${day.learn.duration}`}</div>
                              <div style={{ fontSize: 13, fontWeight: 600, color: "#dde4f0", marginBottom: 3 }}>{day.learn.label}</div>
                              <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.5 }}>{day.learn.task}</div>
                              {day.learn.url && <div style={{ fontSize: 10, fontFamily: "monospace", color: "#06b6d4", marginTop: 4, opacity: 0.7 }}>→ {day.learn.url}</div>}
                            </div>
                            <button onClick={() => toggle(learnKey)} style={{
                              flexShrink: 0, width: 28, height: 28, borderRadius: "50%",
                              border: `2px solid ${learnDone ? "#06b6d4" : "rgba(6,182,212,0.3)"}`,
                              background: learnDone ? "#06b6d4" : "transparent",
                              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: 12, color: learnDone ? "#070d1a" : "#475569", fontWeight: 700,
                              transition: "all 0.15s",
                            }}>{learnDone ? "✓" : ""}</button>
                          </div>
                        </div>
                      )}

                      {(activeType === "both" || activeType === "income") && (
                        <div style={{
                          background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)",
                          borderRadius: 8, padding: "11px 13px",
                          opacity: incomeDone ? 0.6 : 1,
                        }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 9, fontFamily: "monospace", color: "#10b981", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>💼 Income Action</div>
                              <div style={{ fontSize: 13, fontWeight: 600, color: "#dde4f0", marginBottom: 3 }}>{day.income.label}</div>
                              <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.5 }}>{day.income.task}</div>
                            </div>
                            <button onClick={() => toggle(incomeKey)} style={{
                              flexShrink: 0, width: 28, height: 28, borderRadius: "50%",
                              border: `2px solid ${incomeDone ? "#10b981" : "rgba(16,185,129,0.3)"}`,
                              background: incomeDone ? "#10b981" : "transparent",
                              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: 12, color: incomeDone ? "#070d1a" : "#475569", fontWeight: 700,
                              transition: "all 0.15s",
                            }}>{incomeDone ? "✓" : ""}</button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── TARGETS TAB ── */}
        {activeTab === "targets" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <div style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 12, padding: "14px 16px", marginBottom: 14, fontSize: 13, color: "#64748b", lineHeight: 1.6,
            }}>
              These are your 30-day targets. They are not aspirational — they are the minimum required to validate that your agency is real and not just planned.
            </div>

            {TARGETS.map((t, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 10, padding: "14px 18px", marginBottom: 10,
                display: "flex", alignItems: "center", gap: 14,
              }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{t.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: "#94a3b8" }}>{t.label}</div>
                </div>
                <div style={{
                  fontSize: 16, fontWeight: 700, fontFamily: "monospace",
                  color: "#06b6d4", background: "rgba(6,182,212,0.08)",
                  border: "1px solid rgba(6,182,212,0.2)",
                  borderRadius: 8, padding: "5px 14px", whiteSpace: "nowrap",
                }}>{t.target}</div>
              </div>
            ))}

            {/* Month 2 preview */}
            <div style={{
              background: "rgba(6,182,212,0.06)", border: "1px solid rgba(6,182,212,0.15)",
              borderRadius: 12, padding: "16px 18px", marginTop: 6,
            }}>
              <div style={{ fontSize: 11, fontFamily: "monospace", color: "#06b6d4", letterSpacing: 2, marginBottom: 10, textTransform: "uppercase" }}>🔭 Month 2 Preview</div>
              {[
                { label: "Statistics", from: "Beginner", to: "Developing", color: "#06b6d4" },
                { label: "Visualisation", from: "Beginner", to: "Developing / Proficient", color: "#ec4899" },
                { label: "Programming", from: "Beginner", to: "Beginner+ (Python underway)", color: "#8b5cf6" },
              ].map((d, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: d.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: "#94a3b8", flex: 1 }}>{d.label}</span>
                  <span style={{ fontSize: 11, color: "#475569", fontFamily: "monospace" }}>{d.from}</span>
                  <span style={{ fontSize: 11, color: "#334155" }}>→</span>
                  <span style={{ fontSize: 11, color: d.color, fontFamily: "monospace", fontWeight: 700 }}>{d.to}</span>
                </div>
              ))}
              <div style={{ fontSize: 12, color: "#475569", marginTop: 8, fontStyle: "italic" }}>
                Month 2 shifts focus to: deeper Python, Power BI for sophisticated dashboards, and targeting your first international dollar-paying client.
              </div>
            </div>
          </div>
        )}

        {/* ── WARNINGS TAB ── */}
        {activeTab === "warnings" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <div style={{
              background: "rgba(248,113,113,0.06)", border: "1px solid rgba(248,113,113,0.15)",
              borderRadius: 12, padding: "13px 16px", marginBottom: 14, fontSize: 13, color: "#64748b", lineHeight: 1.6,
            }}>
              These three patterns kill more promising agencies than lack of skill, lack of time, or lack of money combined. Read them once a week.
            </div>

            {KILLERS.map((k, i) => (
              <div key={i} style={{
                background: "rgba(248,113,113,0.04)",
                border: "1px solid rgba(248,113,113,0.15)",
                borderLeft: "3px solid #f87171",
                borderRadius: 12, padding: "16px 18px", marginBottom: 12,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 22 }}>{k.icon}</span>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#fca5a5" }}>{k.title}</div>
                </div>
                <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7 }}>{k.desc}</div>
              </div>
            ))}

            {/* The rule */}
            <div style={{
              background: "rgba(6,182,212,0.06)", border: "1px solid rgba(6,182,212,0.15)",
              borderRadius: 12, padding: "16px 18px", marginTop: 4, textAlign: "center",
            }}>
              <div style={{ fontSize: 11, fontFamily: "monospace", color: "#06b6d4", letterSpacing: 2, marginBottom: 8, textTransform: "uppercase" }}>The Governing Rule</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#e2e8f0", fontStyle: "italic", lineHeight: 1.6 }}>
                "One income action every day.<br />One learning block every day.<br />No exceptions."
              </div>
              <div style={{ fontSize: 12, color: "#475569", marginTop: 10, lineHeight: 1.6 }}>
                Your Proficient health knowledge is the engine. The technical skills are the fuel. You do not need a full tank to start driving — you just need enough to reach the next station.
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 24, fontSize: 10, fontFamily: "monospace", color: "#1e293b", letterSpacing: 1 }}>
          HEALTH DIGITAL AGENCY · SPRINT 1 OF 12 · NIGERIA 2026
        </div>
      </div>
    </div>
  );
}
