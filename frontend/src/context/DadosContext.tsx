import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { Cliente, Compra, Medicamento } from '../types'
import { PRAZO_FORNECEDOR_PADRAO } from '../utils/previsoes'
import { DadosContext } from './contexto'
import type { DadosCliente, DadosCompra, DadosMedicamento } from './contexto'

const CHAVES = {
  clientes: 'controle-farma:clientes',
  medicamentos: 'controle-farma:medicamentos',
  compras: 'controle-farma:compras',
}

function carregar<T>(chave: string): T[] {
  try {
    const bruto = localStorage.getItem(chave)
    return bruto ? (JSON.parse(bruto) as T[]) : []
  } catch {
    return []
  }
}

export function DadosProvider({ children }: { children: ReactNode }) {
  const [clientes, setClientes] = useState<Cliente[]>(() =>
    carregar<Cliente>(CHAVES.clientes),
  )
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>(() =>
    // Medicamentos salvos antes do campo "prazoFornecedorDias" existir recebem o padrão
    carregar<Medicamento>(CHAVES.medicamentos).map((m) => ({
      ...m,
      prazoFornecedorDias: m.prazoFornecedorDias ?? PRAZO_FORNECEDOR_PADRAO,
    })),
  )
  const [compras, setCompras] = useState<Compra[]>(() =>
    carregar<Compra>(CHAVES.compras).map((c) => ({
      ...c,
      valorCentavos: c.valorCentavos ?? 0,
      formaPagamento: c.formaPagamento ?? 'outro',
    })),
  )
  useEffect(() => {
    localStorage.setItem(CHAVES.clientes, JSON.stringify(clientes))
  }, [clientes])

  useEffect(() => {
    localStorage.setItem(CHAVES.medicamentos, JSON.stringify(medicamentos))
  }, [medicamentos])

  useEffect(() => {
    localStorage.setItem(CHAVES.compras, JSON.stringify(compras))
  }, [compras])

  function adicionarCliente(dados: DadosCliente) {
    setClientes((atual) => [
      ...atual,
      { id: crypto.randomUUID(), ativo: true, ...dados },
    ])
  }

  function atualizarCliente(id: string, dados: DadosCliente) {
    setClientes((atual) => atual.map((c) => (c.id === id ? { ...c, ...dados } : c)))
  }

  function alternarAtivoCliente(id: string) {
    setClientes((atual) =>
      atual.map((c) => (c.id === id ? { ...c, ativo: !c.ativo } : c)),
    )
  }

  function adicionarMedicamento(dados: DadosMedicamento) {
    setMedicamentos((atual) => [...atual, { id: crypto.randomUUID(), ...dados }])
  }

  function atualizarMedicamento(id: string, dados: DadosMedicamento) {
    setMedicamentos((atual) => atual.map((m) => (m.id === id ? { ...m, ...dados } : m)))
  }

  function removerMedicamento(id: string): boolean {
    if (compras.some((c) => c.medicamentoId === id)) return false
    setMedicamentos((atual) => atual.filter((m) => m.id !== id))
    return true
  }

  function adicionarCompra(dados: DadosCompra) {
    setCompras((atual) => [...atual, { id: crypto.randomUUID(), ...dados }])
  }

  function atualizarCompra(id: string, dados: DadosCompra) {
    setCompras((atual) => atual.map((c) => (c.id === id ? { ...c, ...dados } : c)))
  }

  function removerCompra(id: string) {
    setCompras((atual) => atual.filter((c) => c.id !== id))
  }

  return (
    <DadosContext.Provider
      value={{
        clientes,
        medicamentos,
        compras,
        adicionarCliente,
        atualizarCliente,
        alternarAtivoCliente,
        adicionarMedicamento,
        atualizarMedicamento,
        removerMedicamento,
        adicionarCompra,
        atualizarCompra,
        removerCompra,
      }}
    >
      {children}
    </DadosContext.Provider>
  )
}
