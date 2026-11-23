import { useState } from 'react'
import { Banknote, Receipt, ShoppingBag } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { StatCard } from '../components/ui/StatCard'
import { botaoSecundario, campo, rotuloCampo } from '../components/ui/estilos'
import { useDados } from '../context/DadosContext'
import { formatarData, hojeISO } from '../utils/datas'
import { formasPagamento, formatarMoeda, rotuloPagamento } from '../utils/dinheiro'

export function Financeiro() {
  const { clientes, medicamentos, compras } = useDados()
  const [mes, setMes] = useState(hojeISO().slice(0, 7))

  const filtradas = compras
    .filter((c) => !mes || c.dataCompra.startsWith(mes))
    .sort((a, b) => b.dataCompra.localeCompare(a.dataCompra))

  const total = filtradas.reduce((soma, c) => soma + c.valorCentavos, 0)
  const ticketMedio = filtradas.length > 0 ? Math.round(total / filtradas.length) : 0

  const porForma = formasPagamento
    .map((f) => {
      const itens = filtradas.filter((c) => c.formaPagamento === f.valor)
      const subtotal = itens.reduce((soma, c) => soma + c.valorCentavos, 0)
      return {
        ...f,
        quantidade: itens.length,
        subtotal,
        percentual: total > 0 ? Math.round((subtotal / total) * 100) : 0,
      }
    })
    .filter((f) => f.quantidade > 0)

  const nomeCliente = (id: string) => clientes.find((c) => c.id === id)?.nome ?? '—'
  const nomeMedicamento = (id: string) => medicamentos.find((m) => m.id === id)?.nome ?? '—'

  return (
    <div className="space-y-6">
      <Card titulo="Período">
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label className={rotuloCampo} htmlFor="mes">Mês</label>
            <input id="mes" type="month" className={campo} value={mes} onChange={(e) => setMes(e.target.value)} />
          </div>
          <button type="button" className={botaoSecundario} onClick={() => setMes('')}>
            Todo o período
          </button>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard rotulo="Total vendido" valor={formatarMoeda(total)} icone={Banknote} />
        <StatCard rotulo="Compras no período" valor={filtradas.length} icone={ShoppingBag} />
        <StatCard rotulo="Ticket médio" valor={formatarMoeda(ticketMedio)} icone={Receipt} />
      </div>

      <Card titulo="Por forma de pagamento">
        {porForma.length === 0 ? (
          <p className="text-sm text-ink-soft">Nenhuma compra neste período.</p>
        ) : (
          <ul className="space-y-4">
            {porForma.map((f) => (
              <li key={f.valor}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-ink">
                    {f.rotulo} <span className="text-ink-soft">· {f.quantidade} compra(s)</span>
                  </span>
                  <span className="font-semibold text-ink">
                    {formatarMoeda(f.subtotal)} <span className="font-normal text-ink-soft">({f.percentual}%)</span>
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-brand-100">
                  <div className="h-full rounded-full bg-brand-600" style={{ width: `${f.percentual}%` }} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card titulo="Detalhamento">
        {filtradas.length === 0 ? (
          <p className="text-sm text-ink-soft">Nenhuma compra neste período.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-ink-soft">
                <tr className="border-b border-line">
                  <th className="py-2 pr-4 font-medium">Data</th>
                  <th className="py-2 pr-4 font-medium">Cliente</th>
                  <th className="py-2 pr-4 font-medium">Medicamento</th>
                  <th className="py-2 pr-4 font-medium">Pagamento</th>
                  <th className="py-2 text-right font-medium">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filtradas.map((c) => (
                  <tr key={c.id}>
                    <td className="py-3 pr-4 text-ink">{formatarData(c.dataCompra)}</td>
                    <td className="py-3 pr-4 font-medium text-ink">{nomeCliente(c.clienteId)}</td>
                    <td className="py-3 pr-4 text-ink-soft">{nomeMedicamento(c.medicamentoId)}</td>
                    <td className="py-3 pr-4 text-ink-soft">{rotuloPagamento(c.formaPagamento)}</td>
                    <td className="py-3 text-right font-semibold text-ink">{formatarMoeda(c.valorCentavos)}</td>
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