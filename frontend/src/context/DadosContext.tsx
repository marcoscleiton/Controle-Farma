import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { Cliente, Compra, Medicamento } from '../types'

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

type DadosContextValue = {
  clientes: Cliente[]
  medicamentos: Medicamento[]
  compras: Compra[]
  adicionarCliente: (dados: Omit<Cliente, 'id' | 'ativo'>) => void
  alternarAtivoCliente: (id: string) => void
  adicionarMedicamento: (dados: Omit<Medicamento, 'id'>) => void
  removerMedicamento: (id: string) => boolean
  adicionarCompra: (dados: Omit<Compra, 'id'>) => void
  removerCompra: (id: string) => void
}

const DadosContext = createContext<DadosContextValue | null>(null)

export function DadosProvider({ children }: { children: ReactNode }) {
  const [clientes, setClientes] = useState<Cliente[]>(() =>
    carregar<Cliente>(CHAVES.clientes),
  )
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>(() =>
    carregar<Medicamento>(CHAVES.medicamentos),
  )
  const [compras, setCompras] = useState<Compra[]>(() =>
    carregar<Compra>(CHAVES.compras),
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

  function adicionarCliente(dados: Omit<Cliente, 'id' | 'ativo'>) {
    setClientes((atual) => [
      ...atual,
      { id: crypto.randomUUID(), ativo: true, ...dados },
    ])
  }

  function alternarAtivoCliente(id: string) {
    setClientes((atual) =>
      atual.map((c) => (c.id === id ? { ...c, ativo: !c.ativo } : c)),
    )
  }

  function adicionarMedicamento(dados: Omit<Medicamento, 'id'>) {
    setMedicamentos((atual) => [...atual, { id: crypto.randomUUID(), ...dados }])
  }

  function removerMedicamento(id: string): boolean {
    if (compras.some((c) => c.medicamentoId === id)) return false
    setMedicamentos((atual) => atual.filter((m) => m.id !== id))
    return true
  }

  function adicionarCompra(dados: Omit<Compra, 'id'>) {
    setCompras((atual) => [...atual, { id: crypto.randomUUID(), ...dados }])
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
        alternarAtivoCliente,
        adicionarMedicamento,
        removerMedicamento,
        adicionarCompra,
        removerCompra,
      }}
    >
      {children}
    </DadosContext.Provider>
  )
}

export function useDados(): DadosContextValue {
  const contexto = useContext(DadosContext)
  if (!contexto) throw new Error('useDados precisa estar dentro de DadosProvider')
  return contexto
}