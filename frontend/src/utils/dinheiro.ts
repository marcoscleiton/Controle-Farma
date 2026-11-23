import type { FormaPagamento } from '../types'

export const formasPagamento: { valor: FormaPagamento; rotulo: string }[] = [
  { valor: 'dinheiro', rotulo: 'Dinheiro' },
  { valor: 'pix', rotulo: 'Pix' },
  { valor: 'debito', rotulo: 'Cartão de débito' },
  { valor: 'credito', rotulo: 'Cartão de crédito' },
  { valor: 'outro', rotulo: 'Outro' },
]

export function rotuloPagamento(forma: FormaPagamento): string {
  return formasPagamento.find((f) => f.valor === forma)?.rotulo ?? 'Outro'
}

export function formatarMoeda(centavos: number): string {
  return (centavos / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

// Converte "25,90" ou "1.250,50" ou "25.90" em centavos. Retorna NaN se inválido.
export function paraCentavos(texto: string): number {
  const t = texto.trim()
  const normalizado = t.includes(',') ? t.replace(/\./g, '').replace(',', '.') : t
  const numero = Number(normalizado)
  if (t === '' || !Number.isFinite(numero) || numero < 0) return NaN
  return Math.round(numero * 100)
}