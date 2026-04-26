import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, BarChart3, Target,
  Settings, LogOut, Zap
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const NAV = [
  { to: "/dashboard",          icon: LayoutDashboard, label: "Overview"   },
  { to: "/dashboard/campaigns",icon: Target,           label: "Campaigns"  },
  { to: "/dashboard/analytics",icon: BarChart3,        label: "Analytics"  },
  { to: "/dashboard/settings", icon: Settings,         label: "Settings"   },
];

export default function Sidebar() {
  const { user, signOut } = useAuth();

  return (
    <aside className="w-60 min-h-screen bg-surface-900 border-r border-surface-800 flex flex-col">

      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-surface-800">
        <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
          <Zap size={16} className="text-white" />
        </div>
        <span className="font-semibold text-white text-sm">AdOptimizer</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-150 ${
                isActive
                  ? "bg-brand-600/20 text-brand-400 font-medium"
                  : "text-slate-400 hover:bg-surface-800 hover:text-slate-100"
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="px-3 py-4 border-t border-surface-800 space-y-1">
        <div className="flex items-center gap-3 px-3 py-2">
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
          onClick={signOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:bg-surface-800 hover:text-red-400 transition-colors duration-150"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </aside>
  );
}