import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [onboarded, setOnboarded] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) checkOnboarded(session.user.id)
      else setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) await checkOnboarded(session.user.id)
        else setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const checkOnboarded = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("user_profiles")
      .select("onboarded")
      .eq("id", userId)
      .single()

    if (error) {
      setOnboarded(false)
    } else {
      setOnboarded(data?.onboarded || false)
    }
  } catch (e) {
    setOnboarded(false)
  } finally {
    setLoading(false)
  }
}
  const completeOnboarding = async () => {
    if (!user) return
    await supabase
      .from("user_profiles")
      .upsert({ id: user.id, onboarded: true, updated_at: new Date() })
    setOnboarded(true)
  }

  const signInWithGoogle = () =>
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/onboarding`,
        queryParams: {
          prompt: "select_account",
        },
      },
    })

  const signOut = async () => {
    await supabase.auth.signOut()
    setOnboarded(false)
  }

  return (
    <AuthContext.Provider value={{ user, loading, onboarded, signInWithGoogle, signOut, completeOnboarding }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider")
  return ctx
}