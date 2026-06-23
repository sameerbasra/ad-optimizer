import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Check, Zap, ArrowLeft } from "lucide-react"

const PLANS = [
  {
    name: "Starter",
    price: 99,
    priceId: "price_starter",
    desc: "Perfect for small businesses",
    features: [
      "1 ad platform (Google Ads)",
      "ROAS and CPC tracking",
      "Anomaly detection alerts",
      "7-day data history",
      "Email support",
    ],
    highlight: false,
    cta: "Start free trial",
  },
  {
    name: "Pro",
    price: 299,
    priceId: "price_pro",
    desc: "For serious advertisers",
    features: [
      "3 platforms (Google, Meta, TikTok)",
      "AI bid suggestions",
      "Advanced anomaly detection",
      "90-day data history",
      "Cross-platform attribution",
      "Priority support",
    ],
    highlight: true,
    cta: "Start free trial",
  },
  {
    name: "Agency",
    price: 999,
    priceId: "price_agency",
    desc: "For agencies and teams",
    features: [
      "Unlimited platforms",
      "Unlimited client accounts",
      "White-label reports",
      "API access",
      "Custom integrations",
      "Dedicated support",
    ],
    highlight: false,
    cta: "Contact us",
  },
]

export default function Pricing() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(null)
  const [annual, setAnnual] = useState(false)

  const getPrice = (price) => {
    if (annual) return Math.round(price * 0.8)
    return price
  }

  const handlePlan = async (plan) => {
    if (plan.name === "Agency") {
      window.open("mailto:saimbasra939@gmail.com?subject=Agency Plan Inquiry", "_blank")
      return
    }
    if (!user) {
      navigate("/login")
      return
    }
    setLoading(plan.name)
    setTimeout(() => {
      alert(`Stripe checkout coming soon for ${plan.name} plan. Contact us at saimbasra939@gmail.com to get started.`)
      setLoading(null)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100">
      <nav className="border-b border-[#1e293b] px-6 h-16 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
          <span className="font-semibold text-white">AdOptimizer</span>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <button onClick={() => navigate("/dashboard")} className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2">
              <ArrowLeft size={14} />
              Back to dashboard
            </button>
          ) : (
            <button onClick={() => navigate("/login")} className="btn-primary text-sm">
              Sign in
            </button>
          )}
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-white mb-3">
            Simple, honest pricing
          </h1>
          <p className="text-slate-400 text-sm mb-6">
            No hidden fees. Cancel anytime. 14-day free trial on all plans.
          </p>
          <div className="inline-flex items-center gap-3 bg-[#1e293b] border border-[#334155] rounded-full px-4 py-2">
            <button
              onClick={() => setAnnual(false)}
              className={`text-sm px-3 py-1 rounded-full transition-colors duration-150 ${!annual ? "bg-brand-600 text-white" : "text-slate-400"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`text-sm px-3 py-1 rounded-full transition-colors duration-150 ${annual ? "bg-brand-600 text-white" : "text-slate-400"}`}
            >
              Annual
              <span className="ml-1.5 text-xs text-emerald-400">-20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PLANS.map(plan => (
            <div
              key={plan.name}
              className={`card flex flex-col relative ${plan.highlight ? "border-brand-600 ring-1 ring-brand-600/50" : ""}`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                  Most popular
                </div>
              )}
              <div className="mb-6">
                <h2 className="font-semibold text-white text-lg mb-1">{plan.name}</h2>
                <p className="text-xs text-slate-500 mb-4">{plan.desc}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-semibold text-white">${getPrice(plan.price)}</span>
                  <span className="text-slate-500 text-sm">/month</span>
                </div>
                {annual && (
                  <p className="text-xs text-emerald-400 mt-1">
                    Save ${(plan.price - getPrice(plan.price)) * 12}/year
                  </p>
                )}
              </div>

              <ul className="space-y-3 flex-1 mb-6">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                    <Check size={14} className="text-brand-400 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePlan(plan)}
                disabled={loading === plan.name}
                className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  plan.highlight
                    ? "btn-primary"
                    : "border border-[#334155] text-slate-300 hover:border-[#475569] hover:text-white"
                } ${loading === plan.name ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {loading === plan.name ? "Loading..." : plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm">
            Questions? Email us at{" "}
            <a href="mailto:saimbasra939@gmail.com" className="text-brand-400 hover:text-brand-300">
              saimbasra939@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
