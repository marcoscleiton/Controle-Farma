import { createContext } from 'react'
import type { Cliente, Compra, Medicamento } from '../types'

// Dados que podem ser digitados num formulário (sem o id, que é gerado pelo sistema)
export type DadosCliente = Omit<Cliente, 'id' | 'ativo'>
export type DadosMedicamento = Omit<Medicamento, 'id'>
export type DadosCompra = Omit<Compra, 'id'>

export type DadosContextValue = {
  clientes: Cliente[]
  medicamentos: Medicamento[]
  compras: Compra[]
  adicionarCliente: (dados: DadosCliente) => void
  atualizarCliente: (id: string, dados: DadosCliente) => void
  alternarAtivoCliente: (id: string) => void
  adicionarMedicamento: (dados: DadosMedicamento) => void
  atualizarMedicamento: (id: string, dados: DadosMedicamento) => void
  removerMedicamento: (id: string) => boolean
  adicionarCompra: (dados: DadosCompra) => void
  atualizarCompra: (id: string, dados: DadosCompra) => void
  removerCompra: (id: string) => void
}

// O contexto fica num arquivo .ts separado porque o Fast Refresh do Vite
// só funciona quando um arquivo .tsx exporta apenas componentes.
export const DadosContext = createContext<DadosContextValue | null>(null)
