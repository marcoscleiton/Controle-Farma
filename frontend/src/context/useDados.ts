import { useContext } from 'react'
import { DadosContext } from './contexto'
import type { DadosContextValue } from './contexto'

export function useDados(): DadosContextValue {
  const contexto = useContext(DadosContext)
  if (!contexto) throw new Error('useDados precisa estar dentro de DadosProvider')
  return contexto
}
