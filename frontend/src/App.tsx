import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { Clientes } from './pages/Clientes'
import { Compras } from './pages/Compras'
import { Dashboard } from './pages/Dashboard'
import { Medicamentos } from './pages/Medicamentos'
import { Financeiro } from './pages/Financeiro'


function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="clientes" element={<Clientes />} />
        <Route path="medicamentos" element={<Medicamentos />} />
        <Route path="compras" element={<Compras />} />
        <Route path="financeiro" element={<Financeiro />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App