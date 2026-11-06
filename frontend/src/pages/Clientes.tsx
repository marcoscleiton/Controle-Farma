import { useState } from 'react'
import type { FormEvent } from 'react'
import { Card } from '../components/ui/Card'
import { botaoPrimario, botaoSecundario, campo, rotuloCampo } from '../components/ui/estilos'
import { useDados } from '../context/DadosContext'

export function Clientes() {
  const { clientes, adicionarCliente, alternarAtivoCliente } = useDados()
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [observacoes, setObservacoes] = useState('')

  function salvar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!nome.trim()) return
    adicionarCliente({
      nome: nome.trim(),
      telefone: telefone.trim(),
      observacoes: observacoes.trim(),
    })
    setNome('')
    setTelefone('')
    setObservacoes('')
  }

  const ordenados = [...clientes].sort((a, b) => a.nome.localeCompare(b.nome))

  return (
    <div className="space-y-6">
      <Card titulo="Novo cliente">
        <form onSubmit={salvar} className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={rotuloCampo} htmlFor="nome">Nome *</label>
            <input id="nome" className={campo} value={nome} onChange={(e) => setNome(e.target.value)} required />
          </div>
          <div>
            <label className={rotuloCampo} htmlFor="telefone">Telefone</label>
            <input id="telefone" className={campo} value={telefone} onChange={(e) => setTelefone(e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <label className={rotuloCampo} htmlFor="observacoes">Observações</label>
            <input id="observacoes" className={campo} value={observacoes} onChange={(e) => setObservacoes(e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className={botaoPrimario}>Cadastrar cliente</button>
          </div>
        </form>
      </Card>

      <Card titulo={`Clientes (${clientes.length})`}>
        {ordenados.length === 0 ? (
          <p className="text-sm text-ink-soft">Nenhum cliente cadastrado ainda.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-ink-soft">
                <tr className="border-b border-line">
                  <th className="py-2 pr-4 font-medium">Nome</th>
                  <th className="py-2 pr-4 font-medium">Telefone</th>
                  <th className="py-2 pr-4 font-medium">Observações</th>
                  <th className="py-2 pr-4 font-medium">Situação</th>
                  <th className="py-2 font-medium" />
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {ordenados.map((c) => (
                  <tr key={c.id} className={c.ativo ? '' : 'opacity-60'}>
                    <td className="py-3 pr-4 font-medium text-ink">{c.nome}</td>
                    <td className="py-3 pr-4 text-ink-soft">{c.telefone || '—'}</td>
                    <td className="py-3 pr-4 text-ink-soft">{c.observacoes || '—'}</td>
                    <td className="py-3 pr-4 text-ink-soft">{c.ativo ? 'Ativo' : 'Inativo'}</td>
                    <td className="py-3 text-right">
                      <button type="button" className={botaoSecundario} onClick={() => alternarAtivoCliente(c.id)}>
                        {c.ativo ? 'Inativar' : 'Reativar'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}