import { useState } from "react"
import { Search, Filter, TrendingUp, TrendingDown, AlertTriangle, Play, Pause, MoreHorizontal } from "lucide-react"
import { detectAnomalies } from "../lib/anomaly"

const ALL_CAMPAIGNS = [
  { id: 1, name: "Brand Search", platform: "Google", status: "Active", budget: 2000, spend: 1240, roas: 6.1, ctr: 4.2, clicks: 3200, impressions: 76190, conversions: 87 },
  { id: 2, name: "Competitor Keywords", platform: "Google", status: "Active", budget: 1500, spend: 880, roas: 2.8, ctr: 2.1, clicks: 1800, impressions: 85714, conversions: 28 },
  { id: 3, name: "Remarketing All", platform: "Meta", status: "Active", budget: 1000, spend: 760, roas: 5.4, ctr: 3.8, clicks: 2100, impressions: 55263, conversions: 54 },
  { id: 4, name: "Broad Discovery", platform: "Google", status: "Paused", budget: 800, spend: 0, roas: 0, ctr: 0, clicks: 0, impressions: 0, conversions: 0 },
  { id: 5, name: "Shopping Electronics", platform: "Google", status: "Active", budget: 2500, spend: 1400, roas: 3.9, ctr: 1.2, clicks: 980, impressions: 81666, conversions: 42 },
  { id: 6, name: "Instagram Stories", platform: "Meta", status: "Active", budget: 600, spend: 420, roas: 4.8, ctr: 3.1, clicks: 1560, impressions: 50322, conversions: 31 },
  { id: 7, name: "TikTok Awareness", platform: "TikTok", status: "Active", budget: 800, spend: 650, roas: 3.2, ctr: 2.8, clicks: 2100, impressions: 75000, conversions: 24 },
]

const PLATFORM_COLORS = {
  Google:  "bg-blue-400/10 text-blue-400",
  Meta:    "bg-indigo-400/10 text-indigo-400",
  TikTok:  "bg-pink-400/10 text-pink-400",
}

const STATUS_COLORS = {
  Active: "bg-emerald-400/10 text-emerald-400",
  Paused: "bg-slate-400/10 text-slate-400",
}

export default function Campaigns() {
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")
  const [filterPlatform, setFilterPlatform] = useState("All")
  const [sortBy, setSortBy] = useState("spend")
  const [sortDir, setSortDir] = useState("desc")

  const alerts = detectAnomalies(ALL_CAMPAIGNS)

  const filtered = ALL_CAMPAIGNS
    .filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    .filter(c => filterStatus === "All" || c.status === filterStatus)
    .filter(c => filterPlatform === "All" || c.platform === filterPlatform)
    .sort((a, b) => {
      const mult = sortDir === "desc" ? -1 : 1
      return (a[sortBy] - b[sortBy]) * mult
    })

  const handleSort = (col) => {
    if (sortBy === col) setSortDir(d => d === "desc" ? "asc" : "desc")
    else { setSortBy(col); setSortDir("desc") }
  }

  const SortIcon = ({ col }) => {
    if (sortBy !== col) return <span className="text-slate-600 ml-1">↕</span>
    return <span className="text-brand-400 ml-1">{sortDir === "desc" ? "↓" : "↑"}</span>
  }

  const totalSpend = filtered.reduce((s, c) => s + c.spend, 0)
  const totalConversions = filtered.reduce((s, c) => s + c.conversions, 0)
  const avgROAS = filtered.filter(c => c.roas > 0).reduce((s, c) => s + c.roas, 0) / filtered.filter(c => c.roas > 0).length || 0

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Campaigns</h1>
          <p className="text-sm text-slate-400 mt-0.5">{ALL_CAMPAIGNS.length} campaigns across 3 platforms</p>
        </div>
        <button className="btn-primary text-sm flex items-center gap-2">
          + New Campaign
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total spend", value: `$${totalSpend.toLocaleString()}` },
          { label: "Total conversions", value: totalConversions },
          { label: "Avg ROAS", value: `${avgROAS.toFixed(1)}x` },
        ].map(s => (
          <div key={s.label} className="card">
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">{s.label}</p>
            <p className="text-2xl font-semibold text-white">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="card space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-[#0f172a] border border-[#334155] rounded-lg px-3 py-2 flex-1 min-w-48">
            <Search size={14} className="text-slate-500" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search campaigns..."
              className="bg-transparent text-sm text-slate-200 placeholder-slate-500 outline-none flex-1"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-slate-500" />
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="bg-[#0f172a] border border-[#334155] text-slate-300 text-sm rounded-lg px-3 py-2 outline-none"
            >
              <option>All</option>
              <option>Active</option>
              <option>Paused</option>
            </select>
            <select
              value={filterPlatform}
              onChange={e => setFilterPlatform(e.target.value)}
              className="bg-[#0f172a] border border-[#334155] text-slate-300 text-sm rounded-lg px-3 py-2 outline-none"
            >
              <option>All</option>
              <option>Google</option>
              <option>Meta</option>
              <option>TikTok</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-500 uppercase tracking-wider border-b border-[#334155]">
                <th className="pb-3 font-medium">Campaign</th>
                <th className="pb-3 font-medium">Platform</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right cursor-pointer hover:text-slate-300" onClick={() => handleSort("spend")}>
                  Spend <SortIcon col="spend" />
                </th>
                <th className="pb-3 font-medium text-right cursor-pointer hover:text-slate-300" onClick={() => handleSort("roas")}>
                  ROAS <SortIcon col="roas" />
                </th>
                <th className="pb-3 font-medium text-right cursor-pointer hover:text-slate-300" onClick={() => handleSort("ctr")}>
                  CTR <SortIcon col="ctr" />
                </th>
                <th className="pb-3 font-medium text-right cursor-pointer hover:text-slate-300" onClick={() => handleSort("conversions")}>
                  Conv <SortIcon col="conversions" />
                </th>
                <th className="pb-3 font-medium text-right">Budget</th>
                <th className="pb-3 font-medium text-right">Issues</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b]">
              {filtered.map(c => {
                const issues = alerts.filter(a => a.campaign === c.name)
                const budgetPct = c.budget > 0 ? Math.round((c.spend / c.budget) * 100) : 0
                return (
                  <tr key={c.id} className="hover:bg-[#1e293b]/50 transition-colors duration-100">
                    <td className="py-3">
                      <p className="text-slate-200 font-medium">{c.name}</p>
                      <p className="text-xs text-slate-500">{c.impressions.toLocaleString()} impressions</p>
                    </td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${PLATFORM_COLORS[c.platform]}`}>
                        {c.platform}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_COLORS[c.status]}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <p className="text-slate-300">{c.spend > 0 ? `$${c.spend.toLocaleString()}` : "—"}</p>
                      {c.budget > 0 && (
                        <div className="flex items-center justify-end gap-1 mt-1">
                          <div className="w-16 h-1 bg-[#334155] rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${budgetPct > 90 ? "bg-red-400" : budgetPct > 70 ? "bg-amber-400" : "bg-brand-500"}`}
                              style={{ width: `${Math.min(budgetPct, 100)}%` }}
                            />
                          </div>
                          <span className="text-xs text-slate-500">{budgetPct}%</span>
                        </div>
                      )}
                    </td>
                    <td className={`py-3 text-right font-medium ${c.roas >= 4 ? "text-emerald-400" : c.roas >= 3 ? "text-amber-400" : c.roas === 0 ? "text-slate-500" : "text-red-400"}`}>
                      {c.roas > 0 ? `${c.roas}x` : "—"}
                    </td>
                    <td className={`py-3 text-right ${c.ctr >= 2 ? "text-slate-300" : c.ctr === 0 ? "text-slate-500" : "text-amber-400"}`}>
                      {c.ctr > 0 ? `${c.ctr}%` : "—"}
                    </td>
                    <td className="py-3 text-right text-slate-300">
                      {c.conversions > 0 ? c.conversions : "—"}
                    </td>
                    <td className="py-3 text-right text-slate-400 text-xs">
                      ${c.budget.toLocaleString()}
                    </td>
                    <td className="py-3 text-right">
                      {issues.length > 0 ? (
                        <span className="flex items-center justify-end gap-1 text-xs text-amber-400">
                          <AlertTriangle size={11} />
                          {issues.length}
                        </span>
                      ) : (
                        <span className="text-emerald-400 text-xs">✓</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-8 text-slate-500 text-sm">
            No campaigns match your filters.
          </div>
        )}
      </div>
    </div>
  )
}
