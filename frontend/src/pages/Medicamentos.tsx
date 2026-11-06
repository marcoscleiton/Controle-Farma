import { useState } from 'react'
import type { FormEvent } from 'react'
import { Card } from '../components/ui/Card'
import { botaoPrimario, botaoSecundario, campo, rotuloCampo } from '../components/ui/estilos'
import { useDados } from '../context/DadosContext'

export function Medicamentos() {
  const { medicamentos, adicionarMedicamento, removerMedicamento } = useDados()
  const [nome, setNome] = useState('')
  const [apresentacao, setApresentacao] = useState('')

  function salvar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!nome.trim()) return
    adicionarMedicamento({ nome: nome.trim(), apresentacao: apresentacao.trim() })
    setNome('')
    setApresentacao('')
  }

  function remover(id: string) {
    if (!window.confirm('Remover este medicamento?')) return
    if (!removerMedicamento(id)) {
      window.alert('Este medicamento tem compras registradas e não pode ser removido.')
    }
  }

  const ordenados = [...medicamentos].sort((a, b) => a.nome.localeCompare(b.nome))

  return (
    <div className="space-y-6">
      <Card titulo="Novo medicamento">
        <form onSubmit={salvar} className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={rotuloCampo} htmlFor="nome">Nome *</label>
            <input id="nome" className={campo} value={nome} onChange={(e) => setNome(e.target.value)} required />
          </div>
          <div>
            <label className={rotuloCampo} htmlFor="apresentacao">Apresentação (ex.: 50 mg, 30 comprimidos)</label>
            <input id="apresentacao" className={campo} value={apresentacao} onChange={(e) => setApresentacao(e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className={botaoPrimario}>Cadastrar medicamento</button>
          </div>
        </form>
      </Card>

      <Card titulo={`Medicamentos (${medicamentos.length})`}>
        {ordenados.length === 0 ? (
          <p className="text-sm text-ink-soft">Nenhum medicamento cadastrado ainda.</p>
        ) : (
          <ul className="divide-y divide-line">
            {ordenados.map((m) => (
              <li key={m.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate font-medium text-ink">{m.nome}</p>
                  <p className="truncate text-sm text-ink-soft">{m.apresentacao || '—'}</p>
                </div>
                <button type="button" className={botaoSecundario} onClick={() => remover(m.id)}>
                  Remover
                </button>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}