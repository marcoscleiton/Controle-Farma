import { useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react'

const titulos: Record<string, string> = {
  '/': 'Painel',
  '/clientes': 'Clientes',
  '/medicamentos': 'Medicamentos',
  '/compras': 'Histórico de compras',
  '/financeiro': 'Financeiro',
}

export function Header({ onAbrirMenu }: { onAbrirMenu: () => void }) {
  const { pathname } = useLocation()
  const hoje = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-line bg-surface/90 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={onAbrirMenu}
        aria-label="Abrir menu"
        className="rounded-lg p-2 text-ink-soft hover:bg-brand-50 lg:hidden"
      >
        <Menu size={22} />
      </button>
      <h1 className="text-lg font-bold text-ink">
        {titulos[pathname] ?? 'Controle Farma'}
      </h1>
      <span className="ml-auto text-sm capitalize text-ink-soft">{hoje}</span>
    </header>
  )
}