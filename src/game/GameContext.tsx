import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

interface GameState {
  /** Moedas ganhas ao bater nos blocos do cenário. */
  coins: number
  addCoin: () => void
}

const GameContext = createContext<GameState>({ coins: 0, addCoin: () => {} })

export function GameProvider({ children }: { children: ReactNode }) {
  const [coins, setCoins] = useState(0)
  const addCoin = useCallback(() => setCoins((value) => value + 1), [])
  const value = useMemo(() => ({ coins, addCoin }), [coins, addCoin])

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame() {
  return useContext(GameContext)
}
