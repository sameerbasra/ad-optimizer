import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { User, Bell, Shield, CreditCard, LogOut, Check } from "lucide-react"

export default function Profile() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [saved, setSaved] = useState(false)
  const [notifications, setNotifications] = useState({
    lowRoas: true,
    highSpend: true,
    weeklyReport: false,
    budgetAlert: true,
  })

  const handleSignOut = async () => {
    await signOut()
    navigate("/")
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-xl font-semibold text-white">Profile & Settings</h1>
        <p className="text-sm text-slate-400 mt-0.5">Manage your account and preferences</p>
      </div>

      <div className="card space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <User size={15} className="text-brand-400" />
          <h2 className="text-sm font-medium text-white">Account</h2>
        </div>
        <div className="flex items-center gap-4">
          <img
            src={user?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${user?.email}&background=4f46e5&color=fff&size=80`}
            alt="avatar"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <p className="text-white font-medium">{user?.user_metadata?.full_name || "User"}</p>
            <p className="text-sm text-slate-400">{user?.email}</p>
            <span className="inline-block mt-1 text-xs bg-brand-600/20 text-brand-400 px-2 py-0.5 rounded-full">Pro plan</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div>
            <label className="text-xs text-slate-500 block mb-1">Full name</label>
            <input
              defaultValue={user?.user_metadata?.full_name || ""}
              className="w-full bg-[#0f172a] border border-[#334155] text-slate-200 text-sm rounded-lg px-3 py-2 outline-none focus:border-brand-500"
            />
          </div>
          <div>
            <label className="text-xs text-slate-500 block mb-1">Email</label>
            <input
              defaultValue={user?.email || ""}
              disabled
              className="w-full bg-[#0f172a] border border-[#334155] text-slate-500 text-sm rounded-lg px-3 py-2 outline-none cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      <div className="card space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <Bell size={15} className="text-brand-400" />
          <h2 className="text-sm font-medium text-white">Notifications</h2>
        </div>
        {[
          { key: "lowRoas", label: "Low ROAS alert", desc: "Alert when campaign ROAS drops below 3x" },
          { key: "highSpend", label: "High spend warning", desc: "Alert when spend exceeds budget threshold" },
          { key: "weeklyReport", label: "Weekly report", desc: "Receive weekly performance summary via email" },
          { key: "budgetAlert", label: "Budget pacing alert", desc: "Alert when budget is 90% utilized" },
        ].map(item => (
          <div key={item.key} className="flex items-center justify-between py-2 border-b border-[#1e293b] last:border-0">
            <div>
              <p className="text-sm text-slate-200">{item.label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
            </div>
            <button
              onClick={() => setNotifications(n => ({ ...n, [item.key]: !n[item.key] }))}
              className={`w-10 h-5 rounded-full transition-colors duration-200 relative flex-shrink-0 ${notifications[item.key] ? "bg-brand-600" : "bg-[#334155]"}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform duration-200 ${notifications[item.key] ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>
        ))}
      </div>

      <div className="card space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <CreditCard size={15} className="text-brand-400" />
          <h2 className="text-sm font-medium text-white">Plan</h2>
        </div>
        <div className="flex items-center justify-between p-3 bg-brand-600/10 border border-brand-600/20 rounded-lg">
          <div>
            <p className="text-sm font-medium text-white">Pro plan</p>
            <p className="text-xs text-slate-400 mt-0.5">$299/month — renews May 26, 2026</p>
          </div>
          <button className="text-xs text-brand-400 hover:text-brand-300 transition-colors">Manage</button>
        </div>
      </div>

      <div className="card space-y-3">
        <div className="flex items-center gap-3 mb-2">
          <Shield size={15} className="text-brand-400" />
          <h2 className="text-sm font-medium text-white">Security</h2>
        </div>
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-sm text-slate-200">Connected account</p>
            <p className="text-xs text-slate-500 mt-0.5">Signed in with Google</p>
          </div>
          <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">Connected</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors"
        >
          <LogOut size={15} />
          Sign out
        </button>
        <button
          onClick={handleSave}
          className="btn-primary text-sm flex items-center gap-2"
        >
          {saved ? <><Check size={14} /> Saved</> : "Save changes"}
        </button>
      </div>
    </div>
  )
}
