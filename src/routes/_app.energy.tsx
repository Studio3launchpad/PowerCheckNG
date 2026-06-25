import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/energy')({
  component: EnergyInsightsPage,
})

function EnergyInsightsPage() {
  return (
    <div className="p-8 min-h-screen text-white bg-slate-950">
      <h1 className="text-2xl font-bold text-[#00C853]">Energy Insights</h1>
      <p className="mt-4 text-slate-400">AI analysis pipeline active on port 8080.</p>
    </div>
  )
}

export default EnergyInsightsPage
