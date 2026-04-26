export function detectAnomalies(campaigns) {
  const alerts = []
  campaigns.forEach(campaign => {
    if (campaign.status !== "Active") return
    if (campaign.roas > 0 && campaign.roas < 3) {
      alerts.push({
        id: `${campaign.name}-low-roas`,
        campaign: campaign.name,
        type: "critical",
        title: "Low ROAS detected",
        message: `${campaign.name} is returning ${campaign.roas}x ROAS below the 3x minimum threshold.`,
        recommendation: "Pause this campaign or reduce budget by 50% until creative is improved.",
        metric: `${campaign.roas}x ROAS`,
      })
    }
    if (campaign.ctr > 0 && campaign.ctr < 1.5) {
      alerts.push({
        id: `${campaign.name}-low-ctr`,
        campaign: campaign.name,
        type: "warning",
        title: "Low CTR detected",
        message: `${campaign.name} has a ${campaign.ctr}% CTR. Users are not clicking your ad.`,
        recommendation: "Test a new headline or creative. Current ad is not resonating with the audience.",
        metric: `${campaign.ctr}% CTR`,
      })
    }
    if (campaign.spend > 1000 && campaign.roas < 4) {
      alerts.push({
        id: `${campaign.name}-high-spend`,
        campaign: campaign.name,
        type: "warning",
        title: "High spend, low return",
        message: `${campaign.name} is spending $${campaign.spend.toLocaleString()} but only returning ${campaign.roas}x ROAS.`,
        recommendation: "Cap daily budget at 50% until ROAS improves above 4x.",
        metric: `$${campaign.spend.toLocaleString()} spent`,
      })
    }
  })
  return alerts
}
