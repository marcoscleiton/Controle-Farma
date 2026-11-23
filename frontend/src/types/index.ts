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