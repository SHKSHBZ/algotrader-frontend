import React, { useState } from 'react'
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  Box,
  Button,
  IconButton,
} from '@mui/material'
import {
  TrendingUp,
  TrendingDown,
  ShowChart,
  Close,
} from '@mui/icons-material'

interface Position {
  symbol: string
  quantity: number
  average_price: number
  current_price: number
  pnl: number
  pnl_percentage: number
  market_value: number
  invested_value: number
}

interface PositionsTableProps {
  positions: Record<string, Position>
  onSymbolSelect?: (symbol: string) => void
}

// Demo positions data
const demoPositions: Record<string, Position> = {
  RELIANCE: {
    symbol: 'RELIANCE',
    quantity: 50,
    average_price: 2420.50,
    current_price: 2465.75,
    pnl: 2262.50,
    pnl_percentage: 1.87,
    market_value: 123287.50,
    invested_value: 121025.00,
  },
  TCS: {
    symbol: 'TCS',
    quantity: 30,
    average_price: 3625.80,
    current_price: 3598.20,
    pnl: -828.00,
    pnl_percentage: -0.76,
    market_value: 107946.00,
    invested_value: 108774.00,
  },
  HDFCBANK: {
    symbol: 'HDFCBANK',
    quantity: 75,
    average_price: 1575.25,
    current_price: 1589.40,
    pnl: 1061.25,
    pnl_percentage: 0.90,
    market_value: 119205.00,
    invested_value: 118143.75,
  },
  INFY: {
    symbol: 'INFY',
    quantity: 40,
    average_price: 1435.60,
    current_price: 1421.30,
    pnl: -572.00,
    pnl_percentage: -1.00,
    market_value: 56852.00,
    invested_value: 57424.00,
  },
}

const PositionsTable: React.FC<PositionsTableProps> = ({ 
  positions = demoPositions, 
  onSymbolSelect 
}) => {
  const [searchTerm, setSearchTerm] = useState('')

  const positionsArray = Object.values(positions)
  
  const filteredPositions = positionsArray.filter((position) =>
    position.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount) + ' INR'
  }

  const formatPercentage = (percentage: number) => {
    return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`
  }

  const getPnlColor = (pnl: number) => {
    if (pnl > 0) return '#00ff88'
    if (pnl < 0) return '#ff4444'
    return '#888'
  }

  const getTotalPnl = () => {
    return filteredPositions.reduce((total, position) => total + position.pnl, 0)
  }

  const getTotalInvestedValue = () => {
    return filteredPositions.reduce((total, position) => total + position.invested_value, 0)
  }

  const getTotalMarketValue = () => {
    return filteredPositions.reduce((total, position) => total + position.market_value, 0)
  }

  const totalPnl = getTotalPnl()
  const totalInvested = getTotalInvestedValue()
  const totalPnlPercentage = totalInvested > 0 ? (totalPnl / totalInvested) * 100 : 0

  return (
    <Paper sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ color: 'primary.main' }}>
          💼 Current Positions ({filteredPositions.length})
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Total P&L
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: getPnlColor(totalPnl),
                fontWeight: 'bold',
                fontFamily: 'monospace',
              }}
            >
              {formatCurrency(totalPnl)} ({formatPercentage(totalPnlPercentage)})
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Search */}
      <Box sx={{ mb: 3 }}>
        <TextField
          label="Search Positions"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ minWidth: 250 }}
        />
      </Box>

      {/* Summary Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mb: 3 }}>
        <Box sx={{ p: 2, bgcolor: 'rgba(0,255,136,0.1)', borderRadius: 1, border: '1px solid #00ff88' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Total Market Value
          </Typography>
          <Typography variant="h6" sx={{ color: '#00ff88', fontWeight: 'bold' }}>
            {formatCurrency(getTotalMarketValue())}
          </Typography>
        </Box>
        
        <Box sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 1, border: '1px solid #333' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Total Invested
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 'bold' }}>
            {formatCurrency(totalInvested)}
          </Typography>
        </Box>
      </Box>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>Symbol</TableCell>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>Quantity</TableCell>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>Avg Price</TableCell>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>Current Price</TableCell>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>Market Value</TableCell>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>P&L</TableCell>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>P&L %</TableCell>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPositions.map((position) => (
              <TableRow
                key={position.symbol}
                sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                      {position.symbol}
                    </Typography>
                    {position.pnl > 0 ? (
                      <TrendingUp sx={{ color: '#00ff88', fontSize: 16 }} />
                    ) : position.pnl < 0 ? (
                      <TrendingDown sx={{ color: '#ff4444', fontSize: 16 }} />
                    ) : null}
                  </Box>
                </TableCell>
                <TableCell sx={{ color: 'text.primary' }}>
                  {position.quantity.toLocaleString()}
                </TableCell>
                <TableCell sx={{ color: 'text.primary', fontFamily: 'monospace' }}>
                  {formatCurrency(position.average_price)}
                </TableCell>
                <TableCell sx={{ color: 'text.primary', fontFamily: 'monospace' }}>
                  {formatCurrency(position.current_price)}
                </TableCell>
                <TableCell sx={{ color: 'text.primary', fontFamily: 'monospace' }}>
                  {formatCurrency(position.market_value)}
                </TableCell>
                <TableCell
                  sx={{
                    color: getPnlColor(position.pnl),
                    fontWeight: 'bold',
                    fontFamily: 'monospace',
                  }}
                >
                  {formatCurrency(position.pnl)}
                </TableCell>
                <TableCell>
                  <Chip
                    label={formatPercentage(position.pnl_percentage)}
                    color={position.pnl_percentage >= 0 ? 'success' : 'error'}
                    size="small"
                    sx={{ fontWeight: 'bold' }}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => onSymbolSelect?.(position.symbol)}
                      sx={{ color: 'primary.main' }}
                      title="View Chart"
                    >
                      <ShowChart fontSize="small" />
                    </IconButton>
                    <Button
                      size="small"
                      color="error"
                      variant="outlined"
                      startIcon={<Close />}
                      sx={{ fontSize: '0.75rem' }}
                    >
                      Close
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {filteredPositions.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            No positions found
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            {searchTerm ? 'Try adjusting your search term' : 'Start trading to see your positions here'}
          </Typography>
        </Box>
      )}
    </Paper>
  )
}

export default PositionsTable