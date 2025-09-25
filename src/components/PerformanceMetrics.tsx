import React from 'react'
import {
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'

interface Portfolio {
  total_value: number
  cash_available: number
  invested_amount: number
  total_pnl: number
  day_pnl: number
  positions: Record<string, any>
}

interface PerformanceMetricsProps {
  portfolio: Portfolio
  detailed?: boolean
}

// Demo data for charts
const performanceData = [
  { date: '2024-01', value: 100000, pnl: 0 },
  { date: '2024-02', value: 102000, pnl: 2000 },
  { date: '2024-03', value: 98000, pnl: -2000 },
  { date: '2024-04', value: 105000, pnl: 5000 },
  { date: '2024-05', value: 108000, pnl: 8000 },
  { date: '2024-06', value: 112000, pnl: 12000 },
]

const monthlyReturns = [
  { month: 'Jan', return: 2.1 },
  { month: 'Feb', return: -1.8 },
  { month: 'Mar', return: 4.2 },
  { month: 'Apr', return: 3.1 },
  { month: 'May', return: 2.8 },
  { month: 'Jun', return: 1.9 },
]

const drawdownData = [
  { date: '2024-01', drawdown: 0 },
  { date: '2024-02', drawdown: -2.1 },
  { date: '2024-03', drawdown: -5.8 },
  { date: '2024-04', drawdown: -1.2 },
  { date: '2024-05', drawdown: 0 },
  { date: '2024-06', drawdown: 0 },
]

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ portfolio, detailed = false }) => {
  const calculateSharpeRatio = () => {
    // Simplified Sharpe ratio calculation
    return 1.85
  }

  const calculateMaxDrawdown = () => {
    return -5.8
  }

  const calculateWinRate = () => {
    return 68.2
  }

  const metrics = [
    { label: 'Total Return', value: `${((portfolio.total_pnl / portfolio.invested_amount) * 100).toFixed(2)}%`, color: portfolio.total_pnl >= 0 ? '#00ff88' : '#ff4444' },
    { label: 'Sharpe Ratio', value: calculateSharpeRatio().toFixed(2), color: '#00bcd4' },
    { label: 'Max Drawdown', value: `${calculateMaxDrawdown()}%`, color: '#ff9800' },
    { label: 'Win Rate', value: `${calculateWinRate()}%`, color: '#9c27b0' },
  ]

  if (!detailed) {
    return (
      <Paper sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, height: '100%' }}>
        <Typography variant="h6" sx={{ color: 'primary.main', mb: 2 }}>
          📊 Performance Metrics
        </Typography>
        
        {metrics.map((metric, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {metric.label}
              </Typography>
              <Typography variant="body2" sx={{ color: metric.color, fontWeight: 'bold' }}>
                {metric.value}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={Math.abs(parseFloat(metric.value)) * 2} // Simplified for demo
              sx={{
                height: 4,
                borderRadius: 2,
                bgcolor: 'rgba(255,255,255,0.1)',
                '& .MuiLinearProgress-bar': {
                  bgcolor: metric.color,
                },
              }}
            />
          </Box>
        ))}
      </Paper>
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Key Metrics Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
        {metrics.map((metric, index) => (
          <Card key={index} sx={{ bgcolor: 'background.paper' }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom variant="body2">
                {metric.label}
              </Typography>
              <Typography variant="h4" sx={{ color: metric.color, fontWeight: 'bold' }}>
                {metric.value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Portfolio Value Chart */}
      <Paper sx={{ p: 2, bgcolor: 'background.paper' }}>
        <Typography variant="h6" sx={{ color: 'primary.main', mb: 2 }}>
          Portfolio Value Over Time
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="date" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1a1a',
                border: '1px solid #333',
                borderRadius: '8px',
                color: '#fff',
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#00ff88"
              fill="url(#colorValue)"
              strokeWidth={2}
            />
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00ff88" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00ff88" stopOpacity={0} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </Paper>

      {/* Monthly Returns */}
      <Paper sx={{ p: 2, bgcolor: 'background.paper' }}>
        <Typography variant="h6" sx={{ color: 'primary.main', mb: 2 }}>
          Monthly Returns
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyReturns}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="month" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1a1a',
                border: '1px solid #333',
                borderRadius: '8px',
                color: '#fff',
              }}
            />
            <Bar
              dataKey="return"
              fill="#00ff88"
            />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      {/* Drawdown Chart */}
      <Paper sx={{ p: 2, bgcolor: 'background.paper' }}>
        <Typography variant="h6" sx={{ color: 'primary.main', mb: 2 }}>
          Drawdown Analysis
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={drawdownData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="date" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1a1a',
                border: '1px solid #333',
                borderRadius: '8px',
                color: '#fff',
              }}
            />
            <Area
              type="monotone"
              dataKey="drawdown"
              stroke="#ff4444"
              fill="url(#colorDrawdown)"
              strokeWidth={2}
            />
            <defs>
              <linearGradient id="colorDrawdown" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ff4444" stopOpacity={0} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  )
}

export default PerformanceMetrics