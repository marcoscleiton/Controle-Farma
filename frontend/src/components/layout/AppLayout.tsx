import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export function AppLayout() {
  const [menuAberto, setMenuAberto] = useState(false)

  return (
    <div className="min-h-screen">
      <Sidebar aberto={menuAberto} onFechar={() => setMenuAberto(false)} />
      <div className="lg:pl-64">
        <Header onAbrirMenu={() => setMenuAberto(true)} />
        <main className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}