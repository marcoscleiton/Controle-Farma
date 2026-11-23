import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { botaoPrimario, botaoSecundario, campo, rotuloCampo } from '../components/ui/estilos'
import { useDados } from '../context/DadosContext'
import type { FormaPagamento } from '../types'
import { formatarData, hojeISO, somarDias } from '../utils/datas'
import { formasPagamento, formatarMoeda, paraCentavos, rotuloPagamento } from '../utils/dinheiro'

export function Compras() {
  const { clientes, medicamentos, compras, adicionarCompra, removerCompra } = useDados()
  const [clienteId, setClienteId] = useState('')
  const [medicamentoId, setMedicamentoId] = useState('')
  const [dataCompra, setDataCompra] = useState(hojeISO())
  const [quantidade, setQuantidade] = useState('1')
  const [diasDeUso, setDiasDeUso] = useState('')
  const [valor, setValor] = useState('')
  const [formaPagamento, setFormaPagamento] = useState<FormaPagamento>('pix')

  const clientesAtivos = clientes.filter((c) => c.ativo)
  const podeRegistrar = clientesAtivos.length > 0 && medicamentos.length > 0

  function salvar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const qtd = Number(quantidade)
    const dias = Number(diasDeUso)
    const centavos = paraCentavos(valor)
    if (!clienteId || !medicamentoId || !dataCompra || qtd <= 0 || dias <= 0) return
    if (Number.isNaN(centavos)) {
      window.alert('Valor inválido. Use o formato 25,90')
      return
    }
    adicionarCompra({
      clienteId,
      medicamentoId,
      dataCompra,
      quantidade: qtd,
      diasDeUso: dias,
      valorCentavos: centavos,
      formaPagamento,
    })
    setQuantidade('1')
    setDiasDeUso('')
    setValor('')
    setDataCompra(hojeISO())
  }

  function remover(id: string) {
    if (window.confirm('Remover esta compra do histórico?')) removerCompra(id)
  }

  const nomeCliente = (id: string) => clientes.find((c) => c.id === id)?.nome ?? '—'
  const nomeMedicamento = (id: string) => medicamentos.find((m) => m.id === id)?.nome ?? '—'

  const ordenadas = [...compras].sort((a, b) => b.dataCompra.localeCompare(a.dataCompra))

  return (
    <div className="space-y-6">
      <Card titulo="Registrar compra">
        {!podeRegistrar ? (
          <p className="text-sm text-ink-soft">
            Para registrar uma compra, cadastre antes pelo menos um{' '}
            <Link to="/clientes" className="font-medium text-brand-600 hover:text-brand-800">cliente</Link>{' '}
            e um{' '}
            <Link to="/medicamentos" className="font-medium text-brand-600 hover:text-brand-800">medicamento</Link>.
          </p>
        ) : (
          <form onSubmit={salvar} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className={rotuloCampo} htmlFor="cliente">Cliente *</label>
              <select id="cliente" className={campo} value={clienteId} onChange={(e) => setClienteId(e.target.value)} required>
                <option value="">Selecione…</option>
                {clientesAtivos.map((c) => (
                  <option key={c.id} value={c.id}>{c.nome}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={rotuloCampo} htmlFor="medicamento">Medicamento *</label>
              <select id="medicamento" className={campo} value={medicamentoId} onChange={(e) => setMedicamentoId(e.target.value)} required>
                <option value="">Selecione…</option>
                {medicamentos.map((m) => (
                  <option key={m.id} value={m.id}>{m.nome}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={rotuloCampo} htmlFor="data">Data da compra *</label>
              <input id="data" type="date" className={campo} value={dataCompra} onChange={(e) => setDataCompra(e.target.value)} required />
            </div>
            <div>
              <label className={rotuloCampo} htmlFor="quantidade">Quantidade *</label>
              <input id="quantidade" type="number" min="1" className={campo} value={quantidade} onChange={(e) => setQuantidade(e.target.value)} required />
            </div>
            <div>
              <label className={rotuloCampo} htmlFor="dias">Duração em dias *</label>
              <input id="dias" type="number" min="1" className={campo} value={diasDeUso} onChange={(e) => setDiasDeUso(e.target.value)} required />
            </div>
            <div>
              <label className={rotuloCampo} htmlFor="valor">Valor pago (R$) *</label>
              <input id="valor" inputMode="decimal" placeholder="25,90" className={campo} value={valor} onChange={(e) => setValor(e.target.value)} required />
            </div>
            <div>
              <label className={rotuloCampo} htmlFor="pagamento">Forma de pagamento *</label>
              <select id="pagamento" className={campo} value={formaPagamento} onChange={(e) => setFormaPagamento(e.target.value as FormaPagamento)}>
                {formasPagamento.map((f) => (
                  <option key={f.valor} value={f.valor}>{f.rotulo}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button type="submit" className={botaoPrimario}>Registrar compra</button>
            </div>
          </form>
        )}
      </Card>

      <Card titulo={`Histórico (${compras.length})`}>
        {ordenadas.length === 0 ? (
          <p className="text-sm text-ink-soft">Nenhuma compra registrada ainda.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-ink-soft">
                <tr className="border-b border-line">
                  <th className="py-2 pr-4 font-medium">Data</th>
                  <th className="py-2 pr-4 font-medium">Cliente</th>
                  <th className="py-2 pr-4 font-medium">Medicamento</th>
                  <th className="py-2 pr-4 font-medium">Qtd.</th>
                  <th className="py-2 pr-4 font-medium">Valor</th>
                  <th className="py-2 pr-4 font-medium">Pagamento</th>
                  <th className="py-2 pr-4 font-medium">Recompra prevista</th>
                  <th className="py-2 font-medium" />
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {ordenadas.map((c) => (
                  <tr key={c.id}>
                    <td className="py-3 pr-4 text-ink">{formatarData(c.dataCompra)}</td>
                    <td className="py-3 pr-4 font-medium text-ink">{nomeCliente(c.clienteId)}</td>
                    <td className="py-3 pr-4 text-ink-soft">{nomeMedicamento(c.medicamentoId)}</td>
                    <td className="py-3 pr-4 text-ink-soft">{c.quantidade}</td>
                    <td className="py-3 pr-4 text-ink">{formatarMoeda(c.valorCentavos)}</td>
                    <td className="py-3 pr-4 text-ink-soft">{rotuloPagamento(c.formaPagamento)}</td>
                    <td className="py-3 pr-4 text-ink">{formatarData(somarDias(c.dataCompra, c.diasDeUso))}</td>
                    <td className="py-3 text-right">
                      <button type="button" className={botaoSecundario} onClick={() => remover(c.id)}>
                        Remover
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