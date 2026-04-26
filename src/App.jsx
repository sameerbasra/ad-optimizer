import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/layout/ProtectedRoute"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Campaigns from "./pages/Campaigns"
import Analytics from "./pages/Analytics"
import Profile from "./pages/Profile"

function ProtectedLayout({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
          <Route path="/dashboard/campaigns" element={<ProtectedLayout><Campaigns /></ProtectedLayout>} />
          <Route path="/dashboard/analytics" element={<ProtectedLayout><Analytics /></ProtectedLayout>} />
          <Route path="/dashboard/profile" element={<ProtectedLayout><Profile /></ProtectedLayout>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
