import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Zap, BarChart3, ArrowRight, Check, ExternalLink } from "lucide-react"

const STEPS = ["Welcome", "Connect platform", "Done"]

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {STEPS.map((step, i) => (
        <div key={step} className="flex items-center gap-2">
          <div className={`flex items-center gap-2 text-xs font-medium transition-colors duration-200 ${i <= current ? "text-brand-400" : "text-slate-600"}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-colors duration-200 ${i < current ? "bg-brand-600 text-white" : i === current ? "bg-brand-600/20 text-brand-400 border border-brand-600/50" : "bg-[#1e293b] text-slate-600 border border-[#334155]"}`}>
              {i < current ? <Check size={12} /> : i + 1}
            </div>
            <span className="hidden sm:block">{step}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`w-8 h-px transition-colors duration-200 ${i < current ? "bg-brand-600" : "bg-[#334155]"}`} />
          )}
        </div>
      ))}
    </div>
  )
}

function StepWelcome({ onNext, user }) {
  return (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-brand-600/10 rounded-2xl flex items-center justify-center mx-auto">
        <Zap size={32} className="text-brand-400" />
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-white mb-2">
          Welcome, {user?.user_metadata?.full_name?.split(" ")[0] || "there"}
        </h2>
        <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
          AdOptimizer will analyze your ad campaigns and surface insights that save you money and improve ROAS. Setup takes under 2 minutes.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
        {[
          { value: "4.2x", label: "Avg ROAS" },
          { value: "32%", label: "Less waste" },
          { value: "2min", label: "Setup" },
        ].map(s => (
          <div key={s.label} className="bg-[#1e293b] rounded-lg p-3 border border-[#334155]">
            <div className="text-lg font-semibold text-white">{s.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
      <button onClick={onNext} className="btn-primary flex items-center gap-2 mx-auto">
        Get started
        <ArrowRight size={16} />
      </button>
    </div>
  )
}

function StepConnect({ onNext, onSkip }) {
  const [selected, setSelected] = useState(null)
  const [connecting, setConnecting] = useState(false)
  const [connected, setConnected] = useState([])

  const PLATFORMS = [
    { id: "google", name: "Google Ads", desc: "Search, Shopping, Display campaigns", color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20" },
    { id: "meta", name: "Meta Ads", desc: "Facebook and Instagram campaigns", color: "text-indigo-400", bg: "bg-indigo-400/10 border-indigo-400/20" },
    { id: "tiktok", name: "TikTok Ads", desc: "TikTok video campaigns", color: "text-pink-400", bg: "bg-pink-400/10 border-pink-400/20" },
  ]

  const handleConnect = (id) => {
    setSelected(id)
    setConnecting(true)
    setTimeout(() => {
      setConnecting(false)
      setConnected(prev => [...prev, id])
      setSelected(null)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-white mb-2">Connect your ad platforms</h2>
        <p className="text-slate-400 text-sm">Connect at least one platform to start seeing insights.</p>
      </div>

      <div className="space-y-3">
        {PLATFORMS.map(p => {
          const isConnected = connected.includes(p.id)
          const isConnecting = connecting && selected === p.id
          return (
            <div key={p.id} className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-150 ${isConnected ? "bg-emerald-400/5 border-emerald-400/20" : "bg-[#1e293b] border-[#334155] hover:border-[#475569]"}`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${p.bg}`}>
                  <BarChart3 size={18} className={p.color} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{p.name}</p>
                  <p className="text-xs text-slate-500">{p.desc}</p>
                </div>
              </div>
              {isConnected ? (
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full">
                  <Check size={12} />
                  Connected
                </span>
              ) : (
                <button
                  onClick={() => handleConnect(p.id)}
                  disabled={isConnecting}
                  className="text-xs btn-primary flex items-center gap-1.5 py-1.5 px-3"
                >
                  {isConnecting ? (
                    <><div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" /> Connecting</>
                  ) : (
                    <><ExternalLink size={12} /> Connect</>
                  )}
                </button>
              )}
            </div>
          )
        })}
      </div>

      <div className="flex items-center justify-between pt-2">
        <button onClick={onSkip} className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
          Skip for now
        </button>
        <button
          onClick={onNext}
          disabled={connected.length === 0}
          className={`btn-primary flex items-center gap-2 text-sm ${connected.length === 0 ? "opacity-40 cursor-not-allowed" : ""}`}
        >
          Continue
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}

function StepDone({ onFinish }) {
  return (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-emerald-400/10 rounded-2xl flex items-center justify-center mx-auto">
        <Check size={32} className="text-emerald-400" />
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-white mb-2">You are all set</h2>
        <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
          Your ad accounts are connected. AdOptimizer is now analyzing your campaigns and will surface insights within minutes.
        </p>
      </div>
      <div className="space-y-2 max-w-sm mx-auto text-left">
        {[
          "Scanning campaign performance",
          "Detecting anomalies and waste",
          "Generating optimization suggestions",
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
            <div className="w-5 h-5 rounded-full bg-emerald-400/10 flex items-center justify-center flex-shrink-0">
              <Check size={11} className="text-emerald-400" />
            </div>
            {item}
          </div>
        ))}
      </div>
      <button onClick={onFinish} className="btn-primary flex items-center gap-2 mx-auto">
        Go to dashboard
        <ArrowRight size={16} />
      </button>
    </div>
  )
}

export default function Onboarding() {
  const [step, setStep] = useState(0)
  const { user, completeOnboarding } = useAuth()
  const navigate = useNavigate()

  const finish = async () => {
    await completeOnboarding()
    navigate("/dashboard")
}

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
          <span className="font-semibold text-white">AdOptimizer</span>
        </div>

        <div className="card">
          <StepIndicator current={step} />
          {step === 0 && <StepWelcome onNext={() => setStep(1)} user={user} />}
          {step === 1 && <StepConnect onNext={() => setStep(2)} onSkip={() => setStep(2)} />}
          {step === 2 && <StepDone onFinish={finish} />}
        </div>
      </div>
    </div>
  )
}
