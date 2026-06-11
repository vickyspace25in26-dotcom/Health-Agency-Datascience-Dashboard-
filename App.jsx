import { useState } from "react";
import Roadmap    from "./pages/Roadmap.jsx";
import Sprint     from "./pages/Sprint.jsx";
import Quiz       from "./pages/Quiz.jsx";
import Financials from "./pages/Financials.jsx";

const NAV = [
  { id: "roadmap",    label: "Roadmap", icon: "🗺" },
  { id: "sprint",     label: "Sprint",  icon: "⚡" },
  { id: "quiz",       label: "Assess",  icon: "🔬" },
  { id: "financials", label: "Income",  icon: "📊" },
];

const stars = Array.from({ length: 55 }, () => ({
  x: Math.random() * 100, y: Math.random() * 100,
  s: Math.random() * 1.4 + 0.3, o: Math.random() * 0.3 + 0.05,
}));

export default function App() {
  const [page, setPage] = useState("roadmap");

  return (
    <div style={{
      background: "linear-gradient(160deg,#040c18 0%,#070d1a 60%,#050b15 100%)",
      minHeight: "100vh", minHeight: "100dvh",
      color: "#dde4f0", position: "relative", overflowX: "hidden",
      fontFamily: "'Palatino Linotype','Book Antiqua',Georgia,serif",
      paddingBottom: 70,
    }}>
      <style>{`
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes scanline{0%{top:0%}100%{top:100%}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.25}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:rgba(6,182,212,0.25);border-radius:2px}
        input[type=number]{-moz-appearance:textfield}
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none}
      `}</style>

      {/* Stars */}
      <svg style={{position:"fixed",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0}}>
        {stars.map((s,i)=><circle key={i} cx={`${s.x}%`} cy={`${s.y}%`} r={s.s} fill="white" opacity={s.o}/>)}
      </svg>
      {/* Scanline */}
      <div style={{position:"fixed",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(6,182,212,0.3),transparent)",animation:"scanline 5s linear infinite",zIndex:1,pointerEvents:"none"}}/>

      {/* Page content */}
      <div style={{position:"relative",zIndex:2,animation:"fadeIn 0.3s ease"}}>
        {page === "roadmap"    && <Roadmap />}
        {page === "sprint"     && <Sprint />}
        {page === "quiz"       && <Quiz />}
        {page === "financials" && <Financials />}
      </div>

      {/* Bottom nav */}
      <nav style={{
        position:"fixed", bottom:0, left:0, right:0, zIndex:100,
        background:"rgba(4,12,24,0.95)",
        borderTop:"1px solid rgba(6,182,212,0.15)",
        backdropFilter:"blur(16px)",
        WebkitBackdropFilter:"blur(16px)",
        display:"flex", height:64,
        paddingBottom:"env(safe-area-inset-bottom)",
      }}>
        {NAV.map(n=>(
          <button key={n.id} onClick={()=>setPage(n.id)} style={{
            flex:1, display:"flex", flexDirection:"column", alignItems:"center",
            justifyContent:"center", gap:3, border:"none", background:"transparent",
            cursor:"pointer", padding:"8px 4px", transition:"all 0.2s",
            position:"relative",
          }}>
            <span style={{fontSize:20,filter:page===n.id?"none":"grayscale(1) opacity(0.4)",transition:"all 0.2s"}}>{n.icon}</span>
            <span style={{
              fontSize:9, fontFamily:"monospace", letterSpacing:1,
              textTransform:"uppercase", fontWeight:page===n.id?700:400,
              color:page===n.id?"#06b6d4":"#334155", transition:"all 0.2s",
            }}>{n.label}</span>
            {page===n.id && <div style={{width:4,height:4,borderRadius:"50%",background:"#06b6d4",position:"absolute",bottom:6}}/>}
          </button>
        ))}
      </nav>
    </div>
  );
}
