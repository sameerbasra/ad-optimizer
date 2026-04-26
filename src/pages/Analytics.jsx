import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const WEEKLY = [
  { week: "Week 1", google: 1200, meta: 800, tiktok: 400, roas: 3.8 },
  { week: "Week 2", google: 1400, meta: 900, tiktok: 500, roas: 4.1 },
  { week: "Week 3", google: 1100, meta: 750, tiktok: 450, roas: 3.6 },
  { week: "Week 4", google: 1600, meta: 1000, tiktok: 600, roas: 4.4 },
]

const PLATFORM_SPLIT = [
  { name: "Google", value: 4280, color: "#6366f1" },
  { name: "Meta",   value: 1180, color: "#8b5cf6" },
  { name: "TikTok", value: 650,  color: "#ec4899" },
]

const DAILY_ROAS = [
  { day: "Mon", roas: 4.1 },
  { day: "Tue", roas: 3.8 },
  { day: "Wed", roas: 4.5 },
  { day: "Thu", roas: 3.9 },
  { day: "Fri", roas: 4.8 },
  { day: "Sat", roas: 3.2 },
  { day: "Sun", roas: 2.9 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="card text-xs space-y-1 shadow-xl">
      <p className="font-medium text-slate-300">{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color }}>{p.name}: <span className="font-semibold">{p.value}</span></p>
      ))}
    </div>
  )
}

export default function Analytics() {
  const totalSpend = PLATFORM_SPLIT.reduce((s, p) => s + p.value, 0)

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-semibold text-white">Analytics</h1>
        <p className="text-sm text-slate-400 mt-0.5">Performance breakdown — Apr 2026</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card lg:col-span-2 space-y-4">
          <h2 className="text-sm font-medium text-white">Weekly spend by platform</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={WEEKLY} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: "11px", color: "#64748b" }} />
              <Bar dataKey="google" name="Google" fill="#6366f1" radius={[4,4,0,0]} />
              <Bar dataKey="meta"   name="Meta"   fill="#8b5cf6" radius={[4,4,0,0]} />
              <Bar dataKey="tiktok" name="TikTok" fill="#ec4899" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card space-y-4">
          <h2 className="text-sm font-medium text-white">Spend distribution</h2>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={PLATFORM_SPLIT} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                {PLATFORM_SPLIT.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2">
            {PLATFORM_SPLIT.map(p => (
              <div key={p.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                  <span className="text-xs text-slate-400">{p.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-300 font-medium">${p.value.toLocaleString()}</span>
                  <span className="text-xs text-slate-500 ml-1">{Math.round((p.value / totalSpend) * 100)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card space-y-4">
          <h2 className="text-sm font-medium text-white">ROAS by day of week</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={DAILY_ROAS} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="roas" name="ROAS" fill="#6366f1" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-slate-500">Friday is your best performing day. Consider increasing budget on Fri-Thu.</p>
        </div>

        <div className="card space-y-4">
          <h2 className="text-sm font-medium text-white">Key insights</h2>
          <div className="space-y-3">
            {[
              { title: "Best platform", value: "Google", desc: "67% of total spend, highest ROAS", color: "text-emerald-400" },
              { title: "Best day", value: "Friday", desc: "4.8x ROAS — 23% above average", color: "text-emerald-400" },
              { title: "Worst day", value: "Sunday", desc: "2.9x ROAS — consider pausing", color: "text-red-400" },
              { title: "Budget utilization", value: "72%", desc: "Room to scale winning campaigns", color: "text-amber-400" },
              { title: "Top campaign", value: "Brand Search", desc: "6.1x ROAS — increase budget", color: "text-emerald-400" },
            ].map(insight => (
              <div key={insight.title} className="flex items-start justify-between gap-4 py-2 border-b border-[#1e293b] last:border-0">
                <div>
                  <p className="text-xs text-slate-500">{insight.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{insight.desc}</p>
                </div>
                <span className={`text-sm font-medium flex-shrink-0 ${insight.color}`}>{insight.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
