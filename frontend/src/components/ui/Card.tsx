import type { ReactNode } from 'react'

type Props = {
  titulo?: string
  acao?: ReactNode
  children: ReactNode
  className?: string
}

export function Card({ titulo, acao, children, className = '' }: Props) {
  return (
    <section className={`rounded-xl border border-line bg-card shadow-sm ${className}`}>
      {titulo && (
        <header className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-semibold text-ink">{titulo}</h2>
          {acao}
        </header>
      )}
      <div className="p-5">{children}</div>
    </section>
  )
}