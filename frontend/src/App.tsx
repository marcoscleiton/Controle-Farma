function App() {
  return (
    <main className="min-h-screen grid place-items-center">
      <div className="bg-card border border-line rounded-xl p-8 shadow-sm space-y-5">
        <h1 className="text-3xl font-bold text-brand-900">Controle Farma</h1>
        <p className="text-ink-soft">Teste dos tokens de design</p>

        <div className="flex gap-2">
          <span className="rounded-full bg-status-ok-soft text-status-ok px-3 py-1 text-sm font-semibold">Em dia</span>
          <span className="rounded-full bg-status-warn-soft text-status-warn px-3 py-1 text-sm font-semibold">Próximo</span>
          <span className="rounded-full bg-status-info-soft text-status-info px-3 py-1 text-sm font-semibold">Futuro</span>
          <span className="rounded-full bg-status-danger-soft text-status-danger px-3 py-1 text-sm font-semibold">Atrasado</span>
        </div>

        <button className="bg-brand-600 hover:bg-brand-700 text-white rounded-lg px-4 py-2 font-semibold">
          Botão de teste
        </button>
      </div>
    </main>
  )
}

export default App