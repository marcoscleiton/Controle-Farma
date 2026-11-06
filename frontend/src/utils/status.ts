import type { StatusRecompra } from '../types'

export function calcularStatus(dias: number): StatusRecompra {
  if (dias < 0) return 'atrasado'
  if (dias <= 3) return 'iminente'
  if (dias <= 10) return 'proximo'
  return 'futuro'
}

export const infoStatus: Record<
  StatusRecompra,
  { rotulo: string; classes: string; ponto: string }
> = {
  atrasado: {
    rotulo: 'Atrasado',
    classes: 'bg-status-danger-soft text-status-danger',
    ponto: 'bg-status-danger',
  },
  iminente: {
    rotulo: 'Até 3 dias',
    classes: 'bg-status-ok-soft text-status-ok',
    ponto: 'bg-status-ok',
  },
  proximo: {
    rotulo: 'Até 10 dias',
    classes: 'bg-status-warn-soft text-status-warn',
    ponto: 'bg-status-warn',
  },
  futuro: {
    rotulo: 'Futuro',
    classes: 'bg-status-info-soft text-status-info',
    ponto: 'bg-status-info',
  },
}