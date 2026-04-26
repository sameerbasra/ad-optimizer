import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { BarChart3, Zap, TrendingUp, TrendingDown, AlertTriangle, LogOut } from "lucide-react"
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const METRICS = [
  { title: "ROAS", value: "4.2x", change: 12, up: true, desc: "vs 3.7x last period" },
  { title: "CPC", value: "$0.84", change: 5, up: false, desc: "avg cost per click" },
  { title: "CTR", value: "3.6%", change: 8, up: true, desc: "click-through rate" },
  { title: "Ad Spend", value: "$4,280", change: 2, up: false, desc: "this month" },
]

const TREND = [
  { date: "Apr 1", roas: 3.2, spend: 580 },
  { date: "Apr 5", roas: 3.6, spend: 620 },
  { date: "Apr 9", roas: 3.1, spend: 590 },
  { date: "Apr 13", roas: 3.9, spend: 710 },
  { date: "Apr 17", roas: 4.1, spend: 680 },
  { date: "Apr 21", roas: 3.8, spend: 640 },
  { date: "Apr 25", roas: 4.2, spend: 460 },
]

const CAMPAIGNS = [
  { name: "Brand Search", status: "Active", spend: 1240, roas: 6.1, ctr: 4.2, alert: null },
  { name: "Competitor Keywords", status: "Active", spend: 880, roas: 2.8, ctr: 2.1, alert: "Low ROAS" },
  { name: "Remarketing All", status: "Active", spend: 760, roas: 5.4, ctr: 3.8, alert: null },
  { name: "Broad Discovery", status: "Paused", spend: 0, roas: 0, ctr: 0, alert: null },
  { name: "Shopping Electronics", status: "Active", spend: 1400, roas: 3.9, ctr: 2.9, alert: null },
]

function MetricCard({ title, value, change, up, desc }) {
  return (
    <div className="card hover:border-[#475569] transition-colors duration-150">
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</p>
        <span className={`flex items-center gap-1 text-xs font-medium ${up ? "text-emerald-400" : "text-red-400"}`}>
          {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {change}%
        </span>
      </div>
      <p className="text-2xl font-semibold text-white mb-1">{value}</p>
      <p className="text-xs text-slate-500">{desc}</p>
    </div>
  )
}

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

export default function Dashboard() {
  const { user, signOut, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) navigate("/login")
  }, [user, loading, navigate])

  const handleSignOut = async () => {
    await signOut()
    navigate("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-[#0f172a]">
      <aside className="w-56 min-h-screen bg-[#1e293b] border-r border-[#334155] flex flex-col fixed left-0 top-0">
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-[#334155]">
          <div className="w-7 h-7 bg-brand-600 rounded-lg flex items-center justify-center">
            <Zap size={14} className="text-white" />
          </div>
          <span className="font-semibold text-white text-sm">AdOptimizer</span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {[
            { label: "Overview", icon: BarChart3, active: true },
            { label: "Campaigns", icon: TrendingUp, active: false },
            { label: "Analytics", icon: BarChart3, active: false },
          ].map(({ label, icon: Icon, active }) => (
            <div key={label} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer transition-colors duration-150 ${active ? "bg-brand-600/20 text-brand-400 font-medium" : "text-slate-400 hover:bg-[#334155] hover:text-slate-100"}`}>
              <Icon size={15} />
              {label}
            </div>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-[#334155]">
          <div className="flex items-center gap-2.5 px-3 py-2 mb-1">
            <img
              src={user?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${user?.email}&background=4f46e5&color=fff`}
              alt="avatar"
              className="w-7 h-7 rounded-full"
            />
            <span className="text-xs text-slate-400 truncate flex-1">
              {user?.user_metadata?.full_name || user?.email}
            </span>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:bg-[#334155] hover:text-red-400 transition-colors duration-150"
          >
            <LogOut size={15} />
            Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-56 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-white">Overview</h1>
            <p className="text-sm text-slate-400 mt-0.5">Apr 1 – Apr 26, 2026</p>
          </div>
          <span className="flex items-center gap-2 text-xs text-amber-400 bg-amber-400/10 px-3 py-1.5 rounded-full">
            <AlertTriangle size={12} />
            1 campaign needs attention
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {METRICS.map(m => <MetricCard key={m.title} {...m} />)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="card lg:col-span-2 space-y-4">
            <h2 className="text-sm font-medium text-white">ROAS Trend</h2>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={TREND} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="roasGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="roas" name="ROAS" stroke="#6366f1" fill="url(#roasGrad)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="card space-y-4">
            <h2 className="text-sm font-medium text-white">Spend by Campaign</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={CAMPAIGNS.filter(c => c.spend > 0)} layout="vertical" margin={{ top: 0, right: 4, left: 4, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 9, fill: "#64748b" }} axisLine={false} tickLine={false} width={90} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="spend" name="Spend" fill="#6366f1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-white">Campaigns</h2>
            <span className="text-xs text-slate-500">{CAMPAIGNS.length} campaigns</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-500 uppercase tracking-wider">
                  <th className="pb-3 font-medium">Campaign</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Spend</th>
                  <th className="pb-3 font-medium text-right">ROAS</th>
                  <th className="pb-3 font-medium text-right">CTR</th>
                  <th className="pb-3 font-medium text-right">Alert</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e293b]">
                {CAMPAIGNS.map(c => (
                  <tr key={c.name} className="hover:bg-[#1e293b]/50 transition-colors duration-100">
                    <td className="py-3 text-slate-200 font-medium">{c.name}</td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${c.status === "Active" ? "bg-emerald-400/10 text-emerald-400" : "bg-slate-400/10 text-slate-400"}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3 text-right text-slate-300">{c.spend > 0 ? `$${c.spend.toLocaleString()}` : "—"}</td>
                    <td className={`py-3 text-right font-medium ${c.roas >= 4 ? "text-emerald-400" : c.roas >= 3 ? "text-amber-400" : c.roas === 0 ? "text-slate-500" : "text-red-400"}`}>
                      {c.roas > 0 ? `${c.roas}x` : "—"}
                    </td>
                    <td className="py-3 text-right text-slate-300">{c.ctr > 0 ? `${c.ctr}%` : "—"}</td>
                    <td className="py-3 text-right">
                      {c.alert
                        ? <span className="flex items-center justify-end gap-1 text-xs text-amber-400"><AlertTriangle size={11} />{c.alert}</span>
                        : <span className="text-slate-600 text-xs">—</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
