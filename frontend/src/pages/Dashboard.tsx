import { Link } from 'react-router-dom'
import { AlertTriangle, CalendarClock, Pill, Users } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { StatCard } from '../components/ui/StatCard'
import { StatusBadge } from '../components/ui/StatusBadge'
import { useDados } from '../context/DadosContext'
import { formatarData, somarDias, textoDias } from '../utils/datas'
import { calcularPrevisoes } from '../utils/previsoes'

export function Dashboard() {
  const { clientes, medicamentos, compras } = useDados()

  const ativos = clientes.filter((c) => c.ativo)
  const idsAtivos = new Set(ativos.map((c) => c.id))
  const previsoes = calcularPrevisoes(compras).filter((p) =>
    idsAtivos.has(p.clienteId),
  )
  const atrasadas = previsoes.filter((p) => p.status === 'atrasado')
  const proximas = previsoes.filter(
    (p) => p.status === 'iminente' || p.status === 'proximo',
  )
  const alertas = previsoes.filter((p) => p.status !== 'futuro')
  const clientesComAlerta = new Set(alertas.map((p) => p.clienteId)).size

  const recentes = [...compras]
    .sort((a, b) => b.dataCompra.localeCompare(a.dataCompra))
    .slice(0, 5)

  const nomeCliente = (id: string) =>
    clientes.find((c) => c.id === id)?.nome ?? '—'
  const nomeMedicamento = (id: string) =>
    medicamentos.find((m) => m.id === id)?.nome ?? '—'

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard rotulo="Clientes ativos" valor={ativos.length} icone={Users} />
        <StatCard rotulo="Medicamentos" valor={medicamentos.length} icone={Pill} />
        <StatCard
          rotulo="Recompras em até 10 dias"
          valor={proximas.length}
          icone={CalendarClock}
        />
        <StatCard
          rotulo="Recompras atrasadas"
          valor={atrasadas.length}
          icone={AlertTriangle}
          perigo={atrasadas.length > 0}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card titulo="Alertas de reposição" className="lg:col-span-2">
          {alertas.length === 0 ? (
            <p className="text-sm text-ink-soft">
              Nenhum alerta no momento. Cadastre clientes, medicamentos e
              compras para acompanhar as recompras.
            </p>
          ) : (
            <ul className="divide-y divide-line">
              {alertas.map((p) => (
                <li
                  key={`${p.clienteId}-${p.medicamentoId}`}
                  className="flex items-center justify-between gap-3 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-ink">
                      {nomeCliente(p.clienteId)}
                    </p>
                    <p className="truncate text-sm text-ink-soft">
                      {nomeMedicamento(p.medicamentoId)} ·{' '}
                      {formatarData(p.dataPrevista)} ({textoDias(p.dias)})
                    </p>
                  </div>
                  <StatusBadge dias={p.dias} />
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card
          titulo="Resumo de clientes"
          acao={
            <Link to="/clientes" className="text-sm font-medium text-brand-600 hover:text-brand-800">
              Ver todos
            </Link>
          }
        >
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-soft">Ativos</dt>
              <dd className="font-semibold text-ink">{ativos.length}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-soft">Inativos</dt>
              <dd className="font-semibold text-ink">
                {clientes.length - ativos.length}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-soft">Com recompra pendente</dt>
              <dd className="font-semibold text-ink">{clientesComAlerta}</dd>
            </div>
          </dl>
        </Card>
      </div>

      <Card
        titulo="Histórico recente"
        acao={
          <Link to="/compras" className="text-sm font-medium text-brand-600 hover:text-brand-800">
            Ver histórico
          </Link>
        }
      >
        {recentes.length === 0 ? (
          <p className="text-sm text-ink-soft">Nenhuma compra registrada ainda.</p>
        ) : (
          <ul className="divide-y divide-line">
            {recentes.map((c) => (
              <li key={c.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate font-medium text-ink">
                    {nomeCliente(c.clienteId)}
                  </p>
                  <p className="truncate text-sm text-ink-soft">
                    {nomeMedicamento(c.medicamentoId)} · {c.quantidade} un.
                  </p>
                </div>
                <div className="shrink-0 text-right text-sm">
                  <p className="text-ink">{formatarData(c.dataCompra)}</p>
                  <p className="text-ink-soft">
                    recompra {formatarData(somarDias(c.dataCompra, c.diasDeUso))}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}