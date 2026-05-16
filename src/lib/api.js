const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000"

export async function checkBackendHealth() {
  try {
    const res = await fetch(`${BACKEND_URL}/health`)
    return res.ok
  } catch {
    return false
  }
}

export async function getCustomers() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/google-ads/customers`)
    if (!res.ok) throw new Error("Failed to fetch customers")
    return await res.json()
  } catch (e) {
    console.error("getCustomers error:", e)
    return { customer_ids: [] }
  }
}

export async function getCampaigns(customerId) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/google-ads/campaigns?customer_id=${customerId}`)
    if (!res.ok) throw new Error("Failed to fetch campaigns")
    return await res.json()
  } catch (e) {
    console.error("getCampaigns error:", e)
    return { campaigns: [], total: 0 }
  }
}

export async function getMetrics(customerId) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/google-ads/metrics?customer_id=${customerId}`)
    if (!res.ok) throw new Error("Failed to fetch metrics")
    return await res.json()
  } catch (e) {
    console.error("getMetrics error:", e)
    return null
  }
}
