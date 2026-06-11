import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";

const EXCHANGE_RATE = 1650;
const months = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const defaultClients = {
  clinics:    [0, 1, 2, 3, 4, 4, 5],
  pharma:     [0, 0, 1, 1, 2, 3, 3],
  ngos:       [0, 0, 0, 1, 1, 2, 2],
  healthtech: [0, 0, 1, 1, 2, 2, 3],
};
const defaultRates = { clinics: 400, pharma: 900, ngos: 700, healthtech: 600 };

const clientColors = {
  clinics:    "#2dd4bf",
  pharma:     "#818cf8",
  ngos:       "#fb923c",
  healthtech: "#34d399",
};
const clientLabels = {
  clinics:    "Clinics & Hospitals",
  pharma:     "Pharma Companies",
  ngos:       "Health NGOs",
  healthtech: "Health Tech Startups",
};

const NET_MARGIN  = 0.75;
const OVERHEAD    = 96; // USD/month

function fN(n) {
  if (n >= 1_000_000) return `₦${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000)     return `₦${(n / 1_000).toFixed(0)}K`;
  return `₦${n.toFixed(0)}`;
}
function fU(n) { return `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`; }

const card = (extra = {}) => ({
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 12,
  ...extra,
});

export default function Financials() {
  const [clients, setClients] = useState(defaultClients);
  const [rates,   setRates]   = useState(defaultRates);
  const [subTab,  setSubTab]  = useState("overview");

  const data = months.map((month, i) => {
    const gross = Object.keys(clients).reduce((s, k) => s + clients[k][i] * rates[k], 0);
    const net   = Math.max(0, gross * NET_MARGIN - OVERHEAD);
    return {
      month,
      grossUSD:      gross,
      netUSD:        net,
      netNaira:      net * EXCHANGE_RATE,
      clinicsRev:    clients.clinics[i]    * rates.clinics,
      pharmaRev:     clients.pharma[i]     * rates.pharma,
      ngosRev:       clients.ngos[i]       * rates.ngos,
      healthtechRev: clients.healthtech[i] * rates.healthtech,
      totalClients:  Object.values(clients).reduce((s, arr) => s + arr[i], 0),
    };
  });

  const totalNaira = data.reduce((s, d) => s + d.netNaira, 0);
  const totalUSD   = data.reduce((s, d) => s + d.netUSD, 0);
  const targetMet  = totalNaira >= 15_000_000;
  const shortfall  = Math.max(0, 15_000_000 - totalNaira);

  const decPie = Object.keys(clients)
    .map(k => ({ name: clientLabels[k], value: clients[k][6] * rates[k] }))
    .filter(d => d.value > 0);
  const pieColors = ["#2dd4bf", "#818cf8", "#fb923c", "#34d399"];

  const updClient = (type, idx, val) => {
    const arr = [...clients[type]];
    arr[idx] = Math.max(0, Number(val));
    setClients({ ...clients, [type]: arr });
  };

  const sub = (id, label) => (
    <button onClick={() => setSubTab(id)} style={{
      flex: 1, padding: "8px 4px", borderRadius: 8, border: "none", cursor: "pointer",
      fontSize: 11, fontWeight: subTab === id ? 700 : 400,
      background: subTab === id ? "rgba(45,212,191,0.15)" : "transparent",
      color: subTab === id ? "#2dd4bf" : "#475569",
      fontFamily: "monospace", textTransform: "uppercase", letterSpacing: 1,
      transition: "all 0.2s",
    }}>{label}</button>
  );

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "22px 14px 16px" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{
          display: "inline-block", fontFamily: "monospace", fontSize: 9,
          letterSpacing: 3, textTransform: "uppercase", color: "#2dd4bf",
          background: "rgba(45,212,191,0.08)", border: "1px solid rgba(45,212,191,0.18)",
          borderRadius: 20, padding: "4px 14px", marginBottom: 10,
        }}>Financial Projections · Jun–Dec 2026</div>
        <h2 style={{
          fontSize: "clamp(20px,5vw,30px)", fontWeight: 700, margin: "0 0 4px",
          background: "linear-gradient(135deg,#e2e8f0,#64748b)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>₦15M Income Model</h2>
        <p style={{ color: "#475569", fontSize: 12, margin: 0 }}>
          Adjust clients and rates — projections update in real time
        </p>
      </div>

      {/* Target banner */}
      <div style={{
        background: targetMet ? "rgba(45,212,191,0.07)" : "rgba(251,146,60,0.07)",
        border: `1px solid ${targetMet ? "rgba(45,212,191,0.25)" : "rgba(251,146,60,0.25)"}`,
        borderRadius: 12, padding: "14px 18px", marginBottom: 16,
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10,
      }}>
        <div>
          <div style={{ fontSize: 10, fontFamily: "monospace", color: "#475569", marginBottom: 2, letterSpacing: 1 }}>PROJECTED NET INCOME</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: targetMet ? "#2dd4bf" : "#fb923c", fontFamily: "monospace" }}>{fN(totalNaira)}</div>
          <div style={{ fontSize: 12, color: "#64748b" }}>{fU(totalUSD)} USD equivalent</div>
        </div>
        <div>
          <div style={{
            fontSize: 13, fontWeight: 700, padding: "8px 16px", borderRadius: 8,
            color: targetMet ? "#34d399" : "#f87171",
            background: targetMet ? "rgba(52,211,153,0.1)" : "rgba(248,113,113,0.1)",
            border: `1px solid ${targetMet ? "rgba(52,211,153,0.25)" : "rgba(248,113,113,0.25)"}`,
          }}>
            {targetMet ? "✅ ₦15M TARGET MET" : `⚠️ ${fN(shortfall)} short`}
          </div>
          <div style={{ fontSize: 10, color: "#334155", marginTop: 4, textAlign: "right", fontFamily: "monospace" }}>
            Dec run-rate: {fN(data[6].netNaira)}/mo
          </div>
        </div>
      </div>

      {/* KPI row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10, marginBottom: 16 }}>
        {[
          { label: "Peak Monthly", value: fN(Math.max(...data.map(d => d.netNaira))), color: "#2dd4bf" },
          { label: "Avg Monthly",  value: fN(totalNaira / 7), color: "#818cf8" },
          { label: "Dec Clients",  value: data[6].totalClients + " clients", color: "#34d399" },
          { label: "Ann. Run Rate", value: fN(data[6].netNaira * 12), color: "#fb923c" },
        ].map((k, i) => (
          <div key={i} style={{ ...card(), padding: "12px 14px" }}>
            <div style={{ fontSize: 10, fontFamily: "monospace", color: "#475569", marginBottom: 4, letterSpacing: 1, textTransform: "uppercase" }}>{k.label}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: k.color, fontFamily: "monospace" }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Sub-tabs */}
      <div style={{ display: "flex", gap: 4, background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 4, marginBottom: 16 }}>
        {sub("overview", "📊 Overview")}
        {sub("clients",  "👥 Clients")}
        {sub("rates",    "💰 Rates")}
        {sub("mix",      "🥧 Mix")}
      </div>

      {/* Overview */}
      {subTab === "overview" && (
        <div>
          <div style={{ ...card(), padding: "16px", marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontFamily: "monospace", color: "#94a3b8", marginBottom: 12, letterSpacing: 1 }}>NET INCOME PER MONTH (₦)</div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="ng" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#2dd4bf" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)"/>
                <XAxis dataKey="month" tick={{fill:"#64748b",fontSize:11}} axisLine={false} tickLine={false}/>
                <YAxis tickFormatter={v=>fN(v)} tick={{fill:"#64748b",fontSize:9}} axisLine={false} tickLine={false} width={68}/>
                <Tooltip contentStyle={{background:"#0d1b2a",border:"1px solid #2dd4bf44",borderRadius:8,fontSize:12}} formatter={v=>[fN(v),"Net"]}/>
                <Area type="monotone" dataKey="netNaira" stroke="#2dd4bf" strokeWidth={2} fill="url(#ng)" dot={{fill:"#2dd4bf",r:4}}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div style={{ ...card({ overflow: "hidden" }) }}>
            <div style={{ padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", fontSize: 10, fontFamily: "monospace", color: "#475569", letterSpacing: 1, textTransform: "uppercase" }}>Month-by-Month Breakdown</div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    {["Month","Clients","Gross $","Net $","Net ₦"].map(h=>(
                      <th key={h} style={{padding:"8px 12px",textAlign:"left",color:"#475569",fontSize:10,fontFamily:"monospace",whiteSpace:"nowrap"}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, i) => (
                    <tr key={i} style={{borderTop:"1px solid rgba(255,255,255,0.05)",background:i%2?"rgba(255,255,255,0.015)":"transparent"}}>
                      <td style={{padding:"8px 12px",fontWeight:600,color:"#e2e8f0"}}>{row.month}</td>
                      <td style={{padding:"8px 12px",color:"#94a3b8"}}>{row.totalClients}</td>
                      <td style={{padding:"8px 12px",color:"#94a3b8"}}>{fU(row.grossUSD)}</td>
                      <td style={{padding:"8px 12px",color:row.netUSD>0?"#34d399":"#f87171"}}>{fU(row.netUSD)}</td>
                      <td style={{padding:"8px 12px",fontWeight:700,color:"#2dd4bf"}}>{fN(row.netNaira)}</td>
                    </tr>
                  ))}
                  <tr style={{borderTop:"2px solid rgba(45,212,191,0.3)",background:"rgba(45,212,191,0.05)"}}>
                    <td style={{padding:"10px 12px",fontWeight:700,color:"#2dd4bf"}} colSpan={2}>TOTAL</td>
                    <td style={{padding:"10px 12px",fontWeight:700,color:"#e2e8f0"}}>{fU(data.reduce((s,d)=>s+d.grossUSD,0))}</td>
                    <td style={{padding:"10px 12px",fontWeight:700,color:"#34d399"}}>{fU(totalUSD)}</td>
                    <td style={{padding:"10px 12px",fontWeight:700,color:"#2dd4bf",fontSize:15}}>{fN(totalNaira)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Clients */}
      {subTab === "clients" && (
        <div>
          <div style={{fontSize:12,color:"#64748b",marginBottom:12,lineHeight:1.6}}>
            Tap the numbers to adjust clients per month. The model updates instantly.
          </div>
          {Object.keys(clients).map(type => (
            <div key={type} style={{...card({border:`1px solid ${clientColors[type]}22`,marginBottom:12}),padding:14}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                <div style={{width:10,height:10,borderRadius:"50%",background:clientColors[type]}}/>
                <div style={{fontSize:13,fontWeight:700,color:"#e2e8f0",flex:1}}>{clientLabels[type]}</div>
                <div style={{fontSize:10,color:"#475569",fontFamily:"monospace"}}>${rates[type]}/mo each</div>
              </div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {months.map((m,i)=>(
                  <div key={i} style={{textAlign:"center"}}>
                    <div style={{fontSize:9,color:"#334155",marginBottom:3,fontFamily:"monospace"}}>{m}</div>
                    <input type="number" min="0" max="20" value={clients[type][i]}
                      onChange={e=>updClient(type,i,e.target.value)}
                      style={{
                        width:40,textAlign:"center",
                        background:"rgba(255,255,255,0.06)",
                        border:`1px solid ${clientColors[type]}44`,
                        borderRadius:6,color:clientColors[type],
                        fontSize:16,fontWeight:700,padding:"6px 0",
                        outline:"none",fontFamily:"monospace",
                      }}/>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Rates */}
      {subTab === "rates" && (
        <div>
          <div style={{fontSize:12,color:"#64748b",marginBottom:12,lineHeight:1.6}}>
            Adjust your monthly retainer rate per client type (USD). Higher rates = more income with fewer clients.
          </div>
          {Object.keys(rates).map(type=>(
            <div key={type} style={{...card({border:`1px solid ${clientColors[type]}22`,marginBottom:12}),padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                  <div style={{width:10,height:10,borderRadius:"50%",background:clientColors[type]}}/>
                  <div style={{fontSize:14,fontWeight:700,color:"#e2e8f0"}}>{clientLabels[type]}</div>
                </div>
                <div style={{fontSize:11,color:"#475569"}}>= {fN(rates[type]*EXCHANGE_RATE)}/mo per client</div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <span style={{color:"#64748b",fontSize:14}}>$</span>
                <input type="number" min="100" max="5000" step="50" value={rates[type]}
                  onChange={e=>setRates({...rates,[type]:Number(e.target.value)})}
                  style={{
                    width:84,background:"rgba(255,255,255,0.06)",
                    border:`1px solid ${clientColors[type]}44`,
                    borderRadius:8,color:clientColors[type],
                    fontSize:20,fontWeight:700,padding:"7px 8px",
                    outline:"none",fontFamily:"monospace",textAlign:"center",
                  }}/>
                <span style={{color:"#64748b",fontSize:11}}>/mo</span>
              </div>
            </div>
          ))}
          <div style={{...card(),padding:"12px 16px",marginTop:4}}>
            <div style={{fontSize:11,color:"#475569",marginBottom:6,fontFamily:"monospace"}}>📌 MARKET RATE BENCHMARKS (USD/month)</div>
            <div style={{fontSize:12,color:"#64748b",lineHeight:1.8}}>
              Clinics: $300–$800 &nbsp;·&nbsp; Pharma: $600–$1,500 &nbsp;·&nbsp; NGOs: $500–$1,200 &nbsp;·&nbsp; HealthTech: $500–$1,000
            </div>
          </div>
        </div>
      )}

      {/* Mix */}
      {subTab === "mix" && (
        <div>
          <div style={{...card(),padding:"16px",marginBottom:14}}>
            <div style={{fontSize:11,fontFamily:"monospace",color:"#94a3b8",marginBottom:12,letterSpacing:1}}>REVENUE BY CLIENT TYPE (USD) — STACKED</div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)"/>
                <XAxis dataKey="month" tick={{fill:"#64748b",fontSize:11}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fill:"#64748b",fontSize:9}} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{background:"#0d1b2a",border:"1px solid #2dd4bf33",borderRadius:8,fontSize:12}}/>
                <Legend wrapperStyle={{fontSize:10}}/>
                <Bar dataKey="clinicsRev"    name="Clinics"    stackId="a" fill="#2dd4bf"/>
                <Bar dataKey="pharmaRev"     name="Pharma"     stackId="a" fill="#818cf8"/>
                <Bar dataKey="ngosRev"       name="NGOs"       stackId="a" fill="#fb923c"/>
                <Bar dataKey="healthtechRev" name="HealthTech" stackId="a" fill="#34d399" radius={[4,4,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{...card(),padding:"16px"}}>
            <div style={{fontSize:11,fontFamily:"monospace",color:"#94a3b8",marginBottom:4,letterSpacing:1}}>DECEMBER REVENUE MIX</div>
            <div style={{fontSize:10,color:"#334155",marginBottom:12}}>Gross USD distribution at end of sprint</div>
            {decPie.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={decPie} cx="50%" cy="50%" innerRadius={48} outerRadius={76}
                    paddingAngle={3} dataKey="value"
                    label={({name,percent})=>`${name.split(" ")[0]} ${(percent*100).toFixed(0)}%`}
                    labelLine={false} fontSize={10}>
                    {decPie.map((_,i)=><Cell key={i} fill={pieColors[i%4]}/>)}
                  </Pie>
                  <Tooltip contentStyle={{background:"#0d1b2a",border:"1px solid #2dd4bf33",borderRadius:8,fontSize:12}} formatter={v=>[fU(v)]}/>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div style={{textAlign:"center",color:"#334155",padding:"40px 0",fontSize:13}}>Add clients in the Clients tab to see mix</div>
            )}
          </div>
        </div>
      )}

      <div style={{textAlign:"center",marginTop:20,fontSize:10,fontFamily:"monospace",color:"#1e293b",letterSpacing:1}}>
        {NET_MARGIN*100}% NET MARGIN · ₦{EXCHANGE_RATE}/$1 · ${OVERHEAD} OVERHEAD/MO
      </div>
    </div>
  );
}
