import { NavLink } from 'react-router-dom'
import { ClipboardList, LayoutDashboard, Pill, Users, X } from 'lucide-react'

const itens = [
  { para: '/', rotulo: 'Painel', icone: LayoutDashboard },
  { para: '/clientes', rotulo: 'Clientes', icone: Users },
  { para: '/medicamentos', rotulo: 'Medicamentos', icone: Pill },
  { para: '/compras', rotulo: 'Histórico de compras', icone: ClipboardList },
]

type Props = { aberto: boolean; onFechar: () => void }

export function Sidebar({ aberto, onFechar }: Props) {
  return (
    <>
      {aberto && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={onFechar}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-brand-950 text-brand-100 transition-transform lg:translate-x-0 ${
          aberto ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-500 text-white">
              <Pill size={20} />
            </span>
            <span className="text-lg font-bold text-white">Controle Farma</span>
          </div>
          <button
            type="button"
            onClick={onFechar}
            aria-label="Fechar menu"
            className="rounded-lg p-1 text-brand-200 hover:bg-brand-800 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-2">
          {itens.map(({ para, rotulo, icone: Icone }) => (
            <NavLink
              key={para}
              to={para}
              end={para === '/'}
              onClick={onFechar}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-700 text-white'
                    : 'text-brand-200 hover:bg-brand-900 hover:text-white'
                }`
              }
            >
              <Icone size={18} />
              {rotulo}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}