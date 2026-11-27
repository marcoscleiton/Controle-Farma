import type { Compra, Medicamento, StatusRecompra } from '../types'
import { diasAte, somarDias } from './datas'
import { calcularStatus } from './status'

// Usado quando o medicamento não tem prazo do fornecedor informado
export const PRAZO_FORNECEDOR_PADRAO = 3

export type Previsao = {
  clienteId: string
  medicamentoId: string
  ultimaCompra: string
  dataPrevista: string // quando o cliente deve voltar a comprar
  dias: number // dias até a data prevista (negativo = atrasado)
  status: StatusRecompra
  dataReposicao: string // quando o proprietário deve pedir ao fornecedor
  diasReposicao: number // dias até a data de reposição (negativo = já passou)
}

export function calcularPrevisoes(
  compras: Compra[],
  medicamentos: Medicamento[],
): Previsao[] {
  const prazoPorMedicamento = new Map(
    medicamentos.map((m) => [m.id, m.prazoFornecedorDias]),
  )
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
      const prazo = prazoPorMedicamento.get(c.medicamentoId) ?? PRAZO_FORNECEDOR_PADRAO
      const dataReposicao = somarDias(dataPrevista, -prazo)
      return {
        clienteId: c.clienteId,
        medicamentoId: c.medicamentoId,
        ultimaCompra: c.dataCompra,
        dataPrevista,
        dias,
        status: calcularStatus(dias),
        dataReposicao,
        diasReposicao: diasAte(dataReposicao),
      }
    })
    .sort((a, b) => a.dias - b.dias)
}
