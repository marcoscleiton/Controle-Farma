export type Cliente = {
  id: string
  nome: string
  telefone: string
  observacoes: string
  ativo: boolean
}

export type Medicamento = {
  id: string
  nome: string
  apresentacao: string
}

export type Compra = {
  id: string
  clienteId: string
  medicamentoId: string
  dataCompra: string // AAAA-MM-DD
  quantidade: number
  diasDeUso: number
}

export type StatusRecompra = 'atrasado' | 'iminente' | 'proximo' | 'futuro'