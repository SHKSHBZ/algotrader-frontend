import React, { useEffect, useRef, useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  ButtonGroup,
} from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'

interface TradingViewChartProps {
  symbol: string
  onSymbolChange: (symbol: string) => void
}

const popularSymbols = [
  'RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'HINDUNILVR',
  'ICICIBANK', 'SBIN', 'BHARTIARTL', 'ITC', 'KOTAKBANK'
]

const timeframes = [
  { label: '1m', value: '1minute' },
  { label: '5m', value: '5minute' },
  { label: '15m', value: '15minute' },
  { label: '1h', value: '60minute' },
  { label: '1D', value: 'day' },
]

const TradingViewChart: React.FC<TradingViewChartProps> = ({ symbol, onSymbolChange }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const [timeframe, setTimeframe] = useState('15minute')
  const [chartLoaded, setChartLoaded] = useState(false)

  useEffect(() => {
    if (!chartContainerRef.current) return

    // Initialize lightweight-charts (simplified version)
    const initChart = async () => {
      try {
        const { createChart } = await import('lightweight-charts')
        
        const chart = createChart(chartContainerRef.current!, {
          width: chartContainerRef.current!.clientWidth,
          height: 500,
          layout: {
            background: { color: '#1a1a1a' },
            textColor: '#d1d4dc',
          },
          grid: {
            vertLines: { color: '#2B2B43' },
            horzLines: { color: '#2B2B43' },
          },
          rightPriceScale: {
            borderColor: '#485c7b',
          },
          timeScale: {
            borderColor: '#485c7b',
            timeVisible: true,
            secondsVisible: false,
          },
        })

        // Create a simple line series for now
        const lineSeries = chart.addLineSeries({
          color: '#00ff88',
          lineWidth: 2,
        })

        // Demo data
        const demoData = []
        for (let i = 0; i < 100; i++) {
          const time = Math.floor(Date.now() / 1000) - (100 - i) * 60
          const price = 2500 + Math.sin(i / 10) * 100 + Math.random() * 50
          demoData.push({ time: time as any, value: price })
        }

        lineSeries.setData(demoData)
        setChartLoaded(true)

        // Handle resize
        const handleResize = () => {
          if (chartContainerRef.current && chart) {
            chart.applyOptions({ width: chartContainerRef.current.clientWidth })
          }
        }

        window.addEventListener('resize', handleResize)

        return () => {
          window.removeEventListener('resize', handleResize)
          chart.remove()
        }
      } catch (error) {
        console.error('Failed to load chart:', error)
      }
    }

    initChart()
  }, [symbol, timeframe])

  const handleSymbolChange = (event: SelectChangeEvent) => {
    onSymbolChange(event.target.value)
  }

  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe)
  }

  return (
    <Paper sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ color: 'primary.main' }}>
          📈 {symbol} Chart
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <ButtonGroup size="small" variant="outlined">
            {timeframes.map((tf) => (
              <Button
                key={tf.value}
                onClick={() => handleTimeframeChange(tf.value)}
                variant={timeframe === tf.value ? 'contained' : 'outlined'}
                sx={{ minWidth: '40px' }}
              >
                {tf.label}
              </Button>
            ))}
          </ButtonGroup>
          
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Symbol</InputLabel>
            <Select
              value={symbol}
              label="Symbol"
              onChange={handleSymbolChange}
            >
              {popularSymbols.map((sym) => (
                <MenuItem key={sym} value={sym}>
                  {sym}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box
        ref={chartContainerRef}
        sx={{
          width: '100%',
          height: 500,
          bgcolor: '#1a1a1a',
          borderRadius: 1,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {!chartLoaded && (
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            Loading Chart...
          </Typography>
        )}
      </Box>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Last updated: {new Date().toLocaleTimeString()}
        </Typography>
        <Typography variant="body2" sx={{ color: 'primary.main' }}>
          Demo data • {timeframe} timeframe
        </Typography>
      </Box>
    </Paper>
  )
}

export default TradingViewChart