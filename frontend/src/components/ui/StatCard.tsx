import type { LucideIcon } from 'lucide-react'

type Props = {
  rotulo: string
  valor: number
  icone: LucideIcon
  perigo?: boolean
}

export function StatCard({ rotulo, valor, icone: Icone, perigo = false }: Props) {
  return (
    <div className="rounded-xl border border-line bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-ink-soft">{rotulo}</p>
        <span
          className={`grid h-9 w-9 place-items-center rounded-lg ${
            perigo
              ? 'bg-status-danger-soft text-status-danger'
              : 'bg-brand-50 text-brand-600'
          }`}
        >
          <Icone size={18} />
        </span>
      </div>
      <p className="mt-3 text-3xl font-bold text-ink">{valor}</p>
    </div>
  )
}