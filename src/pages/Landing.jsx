import { useState } from "react"
import { ArrowRight, BarChart3, Zap, Shield, TrendingUp, ChevronDown, CheckCircle } from "lucide-react"

const FEATURES = [
  { icon: TrendingUp, title: "Real-time ROAS tracking", desc: "Monitor your return on ad spend across all campaigns instantly." },
  { icon: Zap, title: "AI bid optimization", desc: "Our AI analyzes thousands of signals to suggest the perfect bid for every keyword." },
  { icon: BarChart3, title: "Cross-platform analytics", desc: "Google, Meta, TikTok unified in one dashboard. See the full picture." },
  { icon: Shield, title: "Anomaly detection", desc: "Get alerted the moment your spend spikes or ROAS drops." },
]

const PLANS = [
  { name: "Starter", price: "$99", desc: "Perfect for small businesses", features: ["1 ad platform", "ROAS and CPC tracking", "Email alerts", "7-day data history"], cta: "Start free trial", highlight: false },
  { name: "Pro", price: "$299", desc: "For serious advertisers", features: ["3 ad platforms", "AI bid suggestions", "Anomaly detection", "90-day data history", "Priority support"], cta: "Start free trial", highlight: true },
  { name: "Agency", price: "$999", desc: "For agencies and teams", features: ["Unlimited platforms", "White-label reports", "Client management", "API access", "Dedicated support"], cta: "Contact us", highlight: false },
]

const FAQS = [
  { q: "How is this different from Google's native dashboard?", a: "AdOptimizer unifies Google, Meta, and TikTok in one place and adds AI-powered suggestions that native tools do not offer." },
  { q: "Do I need technical knowledge to use it?", a: "No. If you can use Google Ads or Meta Ads Manager, you can use AdOptimizer. Setup takes under 10 minutes." },
  { q: "Is my ad account data safe?", a: "Yes. We use read-only API access so we can never make changes without your approval." },
  { q: "Can I cancel anytime?", a: "Absolutely. No contracts, no lock-in. Cancel from your dashboard in one click." },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-[#334155] last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4 text-left gap-4">
        <span className="text-sm font-medium text-slate-200">{q}</span>
        <ChevronDown size={16} className={`text-slate-400 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="text-sm text-slate-400 pb-4 leading-relaxed">{a}</p>}
    </div>
  )
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100">
      <nav className="border-b border-[#1e293b] sticky top-0 z-50 bg-[#0f172a]/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-semibold text-white">AdOptimizer</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-slate-400 hover:text-white transition-colors">Features</a>
            <a href="/pricing" className="text-sm text-slate-400 hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="text-sm text-slate-400 hover:text-white transition-colors">FAQ</a>
           
          </div>
          <div className="flex items-center gap-3">
            <a href="/login" className="text-sm text-slate-400 hover:text-white transition-colors">Sign in</a>
            <a href="/login" className="btn-primary text-sm">Get started</a>
          </div>
        </div>
      </nav>
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-brand-600/10 border border-brand-600/20 text-brand-400 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 bg-brand-400 rounded-full"></span>
          AI-powered ad optimization
        </div>
        <h1 className="text-4xl md:text-6xl font-semibold text-white leading-tight mb-6">
          Stop guessing.<br />
          <span className="text-brand-400">Start optimizing.</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          AdOptimizer uses AI to maximize your ROAS across Google, Meta, and TikTok from one dashboard.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/login" className="btn-primary flex items-center gap-2 text-sm">
            Start free trial
            <ArrowRight size={16} />
          </a>
          <a href="#features" className="text-sm text-slate-400 hover:text-white transition-colors">See how it works</a>
        </div>
        <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
          {[{ value: "4.2x", label: "Average ROAS" }, { value: "32%", label: "Lower CPC" }, { value: "10min", label: "Setup time" }].map(s => (
            <div key={s.label}>
              <div className="text-2xl font-semibold text-white">{s.value}</div>
              <div className="text-xs text-slate-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
      <section id="features" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-white mb-3">Everything you need to dominate ad performance</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">Built for performance marketers tired of switching between platforms.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card hover:border-[#475569] transition-colors duration-200">
              <div className="w-10 h-10 bg-brand-600/10 rounded-lg flex items-center justify-center mb-4">
                <Icon size={20} className="text-brand-400" />
              </div>
              <h3 className="font-medium text-white mb-2">{title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-white mb-3">Simple, honest pricing</h2>
          <p className="text-slate-400 text-sm">No hidden fees. Cancel anytime.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PLANS.map(plan => (
            <div key={plan.name} className={`card flex flex-col ${plan.highlight ? "border-brand-600 ring-1 ring-brand-600/50 relative" : ""}`}>
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-medium px-3 py-1 rounded-full">Most popular</div>
              )}
              <div className="mb-5">
                <h3 className="font-medium text-white mb-1">{plan.name}</h3>
                <p className="text-xs text-slate-500 mb-3">{plan.desc}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-semibold text-white">{plan.price}</span>
                  <span className="text-slate-500 text-sm">/month</span>
                </div>
              </div>
              <ul className="space-y-2.5 flex-1 mb-6">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle size={14} className="text-brand-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="/login" className={`text-center text-sm py-2.5 rounded-lg font-medium transition-colors duration-150 ${plan.highlight ? "btn-primary" : "border border-[#334155] text-slate-300 hover:border-[#475569] hover:text-white"}`}>
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </section>
      <section id="faq" className="max-w-2xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-semibold text-white text-center mb-10">Frequently asked questions</h2>
        <div className="card">
          {FAQS.map(faq => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>
      <footer className="border-t border-[#1e293b] py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-brand-600 rounded-md flex items-center justify-center">
              <Zap size={12} className="text-white" />
            </div>
            <span className="text-sm font-medium text-slate-400">AdOptimizer</span>
          </div>
          <p className="text-xs text-slate-600">2026 AdOptimizer. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">Privacy</a>
            <a href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
