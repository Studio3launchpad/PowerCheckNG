import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/backup')({
  component: BackupSystemsPage,
})

function BackupSystemsPage() {
  return (
    <div className="p-8 min-h-screen text-white bg-slate-950">
      <h1 className="text-2xl font-bold text-[#00C853]">Backup Systems</h1>
      <p className="mt-4 text-slate-400">Inverter metrics and battery runtime health trackers coming soon...</p>
    </div>
  )
}
