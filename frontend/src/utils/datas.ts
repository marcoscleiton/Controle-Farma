function paraISO(d: Date): string {
  const mes = String(d.getMonth() + 1).padStart(2, '0')
  const dia = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mes}-${dia}`
}

function paraData(iso: string): Date {
  const [ano, mes, dia] = iso.split('-').map(Number)
  return new Date(ano, mes - 1, dia)
}

export function hojeISO(): string {
  return paraISO(new Date())
}

export function somarDias(iso: string, dias: number): string {
  const data = paraData(iso)
  data.setDate(data.getDate() + dias)
  return paraISO(data)
}

export function diasAte(iso: string): number {
  const hoje = paraData(hojeISO())
  return Math.round((paraData(iso).getTime() - hoje.getTime()) / 86400000)
}

export function formatarData(iso: string): string {
  const [ano, mes, dia] = iso.split('-')
  return `${dia}/${mes}/${ano}`
}

export function textoDias(dias: number): string {
  if (dias < 0) return `${Math.abs(dias)} dia(s) de atraso`
  if (dias === 0) return 'hoje'
  if (dias === 1) return 'amanhã'
  return `em ${dias} dias`
}