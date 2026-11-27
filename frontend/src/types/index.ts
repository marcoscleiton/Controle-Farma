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
  // Quantos dias o fornecedor leva para entregar. Define com quanta antecedência
  // o proprietário deve fazer o pedido antes da recompra prevista do cliente.
  prazoFornecedorDias: number
}

export type FormaPagamento = 'dinheiro' | 'pix' | 'debito' | 'credito' | 'outro'

export type Compra = {
  id: string
  clienteId: string
  medicamentoId: string
  dataCompra: string // AAAA-MM-DD
  quantidade: number
  diasDeUso: number
  valorCentavos: number
  formaPagamento: FormaPagamento
}

export type StatusRecompra = 'atrasado' | 'iminente' | 'proximo' | 'futuro'