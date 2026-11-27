import { useState } from 'react'
import type { FormEvent } from 'react'
import { Card } from '../components/ui/Card'
import { botaoPrimario, botaoSecundario, campo, rotuloCampo } from '../components/ui/estilos'
import { useDados } from '../context/useDados'
import type { Medicamento } from '../types'
import { PRAZO_FORNECEDOR_PADRAO } from '../utils/previsoes'

export function Medicamentos() {
  const { medicamentos, adicionarMedicamento, atualizarMedicamento, removerMedicamento } = useDados()
  // null = cadastrando um novo; com id = editando esse medicamento
  const [editandoId, setEditandoId] = useState<string | null>(null)
  const [nome, setNome] = useState('')
  const [apresentacao, setApresentacao] = useState('')
  const [prazo, setPrazo] = useState(String(PRAZO_FORNECEDOR_PADRAO))

  function salvar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const prazoDias = Number(prazo)
    if (!nome.trim() || !Number.isInteger(prazoDias) || prazoDias < 0) return
    const dados = {
      nome: nome.trim(),
      apresentacao: apresentacao.trim(),
      prazoFornecedorDias: prazoDias,
    }
    if (editandoId) atualizarMedicamento(editandoId, dados)
    else adicionarMedicamento(dados)
    limpar()
  }

  function limpar() {
    setEditandoId(null)
    setNome('')
    setApresentacao('')
    setPrazo(String(PRAZO_FORNECEDOR_PADRAO))
  }

  function editar(m: Medicamento) {
    setEditandoId(m.id)
    setNome(m.nome)
    setApresentacao(m.apresentacao)
    setPrazo(String(m.prazoFornecedorDias))
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
      <Card titulo={editandoId ? 'Editar medicamento' : 'Novo medicamento'}>
        <form onSubmit={salvar} className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={rotuloCampo} htmlFor="nome">Nome *</label>
            <input id="nome" className={campo} value={nome} onChange={(e) => setNome(e.target.value)} required />
          </div>
          <div>
            <label className={rotuloCampo} htmlFor="apresentacao">Apresentação (ex.: 50 mg, 30 comprimidos)</label>
            <input id="apresentacao" className={campo} value={apresentacao} onChange={(e) => setApresentacao(e.target.value)} />
          </div>
          <div>
            <label className={rotuloCampo} htmlFor="prazo">Prazo de entrega do fornecedor (dias) *</label>
            <input id="prazo" type="number" min="0" step="1" className={campo} value={prazo} onChange={(e) => setPrazo(e.target.value)} required />
          </div>
          <div className="flex gap-2 sm:col-span-2">
            <button type="submit" className={botaoPrimario}>
              {editandoId ? 'Salvar alterações' : 'Cadastrar medicamento'}
            </button>
            {editandoId && (
              <button type="button" className={botaoSecundario} onClick={limpar}>Cancelar</button>
            )}
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
                  <p className="truncate text-sm text-ink-soft">
                    {m.apresentacao || '—'} · fornecedor entrega em {m.prazoFornecedorDias} dia(s)
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button type="button" className={botaoSecundario} onClick={() => editar(m)}>
                    Editar
                  </button>
                  <button type="button" className={botaoSecundario} onClick={() => remover(m.id)}>
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}