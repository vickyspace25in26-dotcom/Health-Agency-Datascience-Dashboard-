# Health Agency Master Dashboard v2.0
### Pharmacist → Health Data Scientist · Nigeria 2026

A complete personal web app with 4 tools in one:

| Tab | Tool |
|-----|------|
| 🗺 Roadmap | 12-Month Data Science learning roadmap with milestone tracking |
| ⚡ Sprint | 30-Day sprint dashboard with daily checkable actions |
| 🔬 Assess | Data Science self-assessment quiz with radar chart results |
| 📊 Income | Interactive ₦15M financial projection model |

---

## 🚀 Deploy to Vercel (Free, ~5 minutes)

### Step 1 — Upload to GitHub
1. Go to github.com → sign up free
2. Click + → New repository → name it `health-agency-dashboard`
3. Set Public → Create repository
4. Click "uploading an existing file"
5. Drag and drop ALL files from this folder (keep folder structure intact)
6. Click "Commit changes"

### Step 2 — Deploy on Vercel
1. Go to vercel.com → sign up with GitHub (free)
2. Click "Add New Project" → select your repository
3. Vite is auto-detected → click Deploy
4. Wait ~60 seconds → you get a live URL

### Step 3 — Add to Phone Home Screen

**iPhone (Safari):**
1. Open your Vercel URL in Safari
2. Tap the Share button (box with arrow pointing up)
3. Scroll down → tap "Add to Home Screen"
4. Name it "My Dashboard" → tap Add

**Android (Chrome):**
1. Open your Vercel URL in Chrome
2. Tap the 3-dot menu → "Add to Home screen"
3. Tap Add

You now have a one-tap home screen icon that opens your full dashboard!

---

## 🛠 Run Locally

```bash
# Requires Node.js (download from nodejs.org — LTS version)
npm install
npm run dev
# Open http://localhost:5173
```

---

## 📁 Project Structure

```
agency-app/
├── index.html
├── vite.config.js
├── vercel.json
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx          ← Navigation shell
    └── pages/
        ├── Roadmap.jsx  ← 12-month learning plan
        ├── Sprint.jsx   ← 30-day sprint tracker
        ├── Quiz.jsx     ← DS self-assessment
        └── Financials.jsx ← Income projections
```

---

## ✏️ Quick Customisations (in src/pages/)

- **Exchange rate:** Find `EXCHANGE_RATE = 1650` in Financials.jsx
- **₦15M target:** Find `15_000_000` in Financials.jsx
- **Sprint days:** Edit the `WEEKS` array in Sprint.jsx
- **Your name/branding:** Search "B.Pharm → Health Data Scientist" in any file

Built with React + Recharts + Vite. Deployed free on Vercel.
