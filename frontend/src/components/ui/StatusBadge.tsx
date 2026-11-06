import { calcularStatus, infoStatus } from '../../utils/status'

export function StatusBadge({ dias }: { dias: number }) {
  const info = infoStatus[calcularStatus(dias)]
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${info.classes}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${info.ponto}`} />
      {info.rotulo}
    </span>
  )
}