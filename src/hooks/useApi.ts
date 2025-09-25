import { useState, useEffect, useCallback } from 'react'
import { apiService } from '../services/api'
import type { Portfolio, StrategyStatus, TradeRecord, Position } from '../services/api'

// Hook for portfolio data with real-time updates
export const usePortfolio = (refreshInterval: number = 10000) => {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchPortfolio = useCallback(async () => {
    try {
      setError(null)
      const data = await apiService.getPortfolio()
      setPortfolio(data)
      setLastUpdated(new Date())
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch portfolio'
      setError(errorMessage)
      console.error('Portfolio fetch error:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // Initial fetch
    fetchPortfolio()

    // Set up interval for real-time updates
    const interval = setInterval(fetchPortfolio, refreshInterval)

    return () => clearInterval(interval)
  }, [fetchPortfolio, refreshInterval])

  return {
    portfolio,
    loading,
    error,
    lastUpdated,
    refetch: fetchPortfolio,
  }
}

// Hook for strategy status
export const useStrategyStatus = (refreshInterval: number = 30000) => {
  const [status, setStatus] = useState<StrategyStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStatus = useCallback(async () => {
    try {
      setError(null)
      const data = await apiService.getStrategyStatus()
      setStatus(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch strategy status'
      setError(errorMessage)
      console.error('Strategy status fetch error:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStatus()
    const interval = setInterval(fetchStatus, refreshInterval)
    return () => clearInterval(interval)
  }, [fetchStatus, refreshInterval])

  const startStrategy = useCallback(async () => {
    try {
      await apiService.controlStrategy('start')
      await fetchStatus() // Refresh status after starting
    } catch (err) {
      console.error('Failed to start strategy:', err)
    }
  }, [fetchStatus])

  const stopStrategy = useCallback(async () => {
    try {
      await apiService.controlStrategy('stop')
      await fetchStatus() // Refresh status after stopping
    } catch (err) {
      console.error('Failed to stop strategy:', err)
    }
  }, [fetchStatus])

  return {
    status,
    loading,
    error,
    refetch: fetchStatus,
    startStrategy,
    stopStrategy,
  }
}

// Hook for backend health check
export const useBackendHealth = (checkInterval: number = 30000) => {
  const [isOnline, setIsOnline] = useState(false)
  const [lastCheck, setLastCheck] = useState<Date | null>(null)
  const [checkingHealth, setCheckingHealth] = useState(true)

  const checkHealth = useCallback(async () => {
    try {
      setCheckingHealth(true)
      const isConnected = await apiService.testConnection()
      setIsOnline(isConnected)
      setLastCheck(new Date())
    } catch (err) {
      setIsOnline(false)
      console.error('Health check failed:', err)
    } finally {
      setCheckingHealth(false)
    }
  }, [])

  useEffect(() => {
    checkHealth()
    const interval = setInterval(checkHealth, checkInterval)
    return () => clearInterval(interval)
  }, [checkHealth, checkInterval])

  return {
    isOnline,
    lastCheck,
    checkingHealth,
    checkHealth,
  }
}

// Hook for trade history
export const useTradeHistory = () => {
  const [trades, setTrades] = useState<TradeRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTrades = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await apiService.getTradeHistory()
      setTrades(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch trade history'
      setError(errorMessage)
      console.error('Trade history fetch error:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTrades()
  }, [fetchTrades])

  return {
    trades,
    loading,
    error,
    refetch: fetchTrades,
  }
}

// Hook for positions
export const usePositions = (refreshInterval: number = 15000) => {
  const [positions, setPositions] = useState<Record<string, Position>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPositions = useCallback(async () => {
    try {
      setError(null)
      const data = await apiService.getPositions()
      setPositions(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch positions'
      setError(errorMessage)
      console.error('Positions fetch error:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPositions()
    const interval = setInterval(fetchPositions, refreshInterval)
    return () => clearInterval(interval)
  }, [fetchPositions, refreshInterval])

  return {
    positions,
    loading,
    error,
    refetch: fetchPositions,
  }
}

// Hook for market data (for charts)
export const useMarketData = (symbol: string, timeframe: string = '1D') => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMarketData = useCallback(async () => {
    if (!symbol) return

    try {
      setLoading(true)
      setError(null)
      const marketData = await apiService.getMarketData(symbol, timeframe)
      setData(marketData)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch market data'
      setError(errorMessage)
      console.error('Market data fetch error:', err)
    } finally {
      setLoading(false)
    }
  }, [symbol, timeframe])

  useEffect(() => {
    fetchMarketData()
  }, [fetchMarketData])

  return {
    data,
    loading,
    error,
    refetch: fetchMarketData,
  }
}