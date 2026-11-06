import type { Compra, StatusRecompra } from '../types'
import { diasAte, somarDias } from './datas'
import { calcularStatus } from './status'

export type Previsao = {
  clienteId: string
  medicamentoId: string
  ultimaCompra: string
  dataPrevista: string
  dias: number
  status: StatusRecompra
}

export function calcularPrevisoes(compras: Compra[]): Previsao[] {
  const maisRecentes = new Map<string, Compra>()

  for (const compra of compras) {
    const chave = `${compra.clienteId}|${compra.medicamentoId}`
    const atual = maisRecentes.get(chave)
    if (!atual || compra.dataCompra > atual.dataCompra) {
      maisRecentes.set(chave, compra)
    }
  }

  return [...maisRecentes.values()]
    .map((c) => {
      const dataPrevista = somarDias(c.dataCompra, c.diasDeUso)
      const dias = diasAte(dataPrevista)
      return {
        clienteId: c.clienteId,
        medicamentoId: c.medicamentoId,
        ultimaCompra: c.dataCompra,
        dataPrevista,
        dias,
        status: calcularStatus(dias),
      }
    })
    .sort((a, b) => a.dias - b.dias)
}