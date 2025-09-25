// API Service for Backend Integration
const API_BASE_URL = 'http://localhost:5000'

// Types based on your backend structure
export interface Position {
  symbol: string
  quantity: number
  average_price: number
  current_price: number
  pnl: number
  pnl_percentage: number
  market_value: number
  invested_value: number
}

export interface Portfolio {
  total_value: number
  cash_available: number
  invested_amount: number
  total_pnl: number
  day_pnl: number
  positions: Record<string, Position>
  trade_history?: TradeRecord[]
}

export interface TradeRecord {
  id: string
  symbol: string
  side: 'BUY' | 'SELL'
  quantity: number
  price: number
  timestamp: string
  pnl?: number
  status: 'FILLED' | 'PENDING' | 'CANCELLED'
}

export interface StrategyStatus {
  is_running: boolean
  strategy_name: string
  last_update: string
  total_trades: number
  win_rate: number
  performance: {
    total_return: number
    sharpe_ratio: number
    max_drawdown: number
  }
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  timestamp: string
}

class ApiService {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  private async makeRequest<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error)
      throw error
    }
  }

  // Get portfolio data
  async getPortfolio(): Promise<Portfolio> {
    return this.makeRequest<Portfolio>('/api/portfolio')
  }

  // Get strategy status
  async getStrategyStatus(): Promise<StrategyStatus> {
    return this.makeRequest<StrategyStatus>('/api/strategy/status')
  }

  // Get health check
  async getHealth(): Promise<{ status: string; timestamp: string }> {
    return this.makeRequest<{ status: string; timestamp: string }>('/api/health')
  }

  // Get trade history
  async getTradeHistory(): Promise<TradeRecord[]> {
    return this.makeRequest<TradeRecord[]>('/api/trades')
  }

  // Get market data for charts
  async getMarketData(symbol: string, timeframe: string = '1D'): Promise<any[]> {
    return this.makeRequest<any[]>(`/api/market-data/${symbol}?timeframe=${timeframe}`)
  }

  // Get positions
  async getPositions(): Promise<Record<string, Position>> {
    return this.makeRequest<Record<string, Position>>('/api/positions')
  }

  // Start/Stop strategy
  async controlStrategy(action: 'start' | 'stop'): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/api/strategy/${action}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`Strategy ${action} error:`, error)
      throw error
    }
  }

  // Test connection
  async testConnection(): Promise<boolean> {
    try {
      await this.getHealth()
      return true
    } catch (error) {
      return false
    }
  }
}

export const apiService = new ApiService()
export default apiService