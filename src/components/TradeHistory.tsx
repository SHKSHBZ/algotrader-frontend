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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TablePagination,
} from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'

interface Trade {
  id: string
  symbol: string
  side: 'BUY' | 'SELL'
  quantity: number
  price: number
  timestamp: string
  pnl?: number
  status: 'FILLED' | 'PENDING' | 'CANCELLED'
}

interface TradeHistoryProps {
  trades: Trade[]
}

// Demo trade data
const demoTrades: Trade[] = [
  {
    id: 'TXN001',
    symbol: 'RELIANCE',
    side: 'BUY',
    quantity: 10,
    price: 2450.50,
    timestamp: '2024-06-15T09:30:00Z',
    pnl: 120.50,
    status: 'FILLED',
  },
  {
    id: 'TXN002',
    symbol: 'TCS',
    side: 'SELL',
    quantity: 5,
    price: 3650.75,
    timestamp: '2024-06-15T10:15:00Z',
    pnl: -45.25,
    status: 'FILLED',
  },
  {
    id: 'TXN003',
    symbol: 'HDFCBANK',
    side: 'BUY',
    quantity: 8,
    price: 1580.25,
    timestamp: '2024-06-15T11:00:00Z',
    pnl: 89.75,
    status: 'FILLED',
  },
  {
    id: 'TXN004',
    symbol: 'INFY',
    side: 'SELL',
    quantity: 15,
    price: 1420.80,
    timestamp: '2024-06-15T14:30:00Z',
    pnl: 0,
    status: 'PENDING',
  },
  {
    id: 'TXN005',
    symbol: 'ITC',
    side: 'BUY',
    quantity: 20,
    price: 485.60,
    timestamp: '2024-06-15T15:45:00Z',
    pnl: 34.20,
    status: 'FILLED',
  },
]

const TradeHistory: React.FC<TradeHistoryProps> = ({ trades = demoTrades }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [sideFilter, setSideFilter] = useState('ALL')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleStatusFilterChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value)
  }

  const handleSideFilterChange = (event: SelectChangeEvent) => {
    setSideFilter(event.target.value)
  }

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const filteredTrades = trades.filter((trade) => {
    const matchesSearch = trade.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trade.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'ALL' || trade.status === statusFilter
    const matchesSide = sideFilter === 'ALL' || trade.side === sideFilter
    
    return matchesSearch && matchesStatus && matchesSide
  })

  const paginatedTrades = filteredTrades.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount) + ' INR'
  }

  const formatDateTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getSideColor = (side: string) => {
    return side === 'BUY' ? 'success' : 'error'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'FILLED': return 'success'
      case 'PENDING': return 'warning'
      case 'CANCELLED': return 'error'
      default: return 'default'
    }
  }

  const getPnlColor = (pnl: number) => {
    if (pnl > 0) return '#00ff88'
    if (pnl < 0) return '#ff4444'
    return '#888'
  }

  return (
    <Paper sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
      <Typography variant="h6" sx={{ color: 'primary.main', mb: 2 }}>
        📋 Trade History
      </Typography>

      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField
          label="Search Symbol or ID"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ minWidth: 200 }}
        />
        
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select value={statusFilter} label="Status" onChange={handleStatusFilterChange}>
            <MenuItem value="ALL">All Status</MenuItem>
            <MenuItem value="FILLED">Filled</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="CANCELLED">Cancelled</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Side</InputLabel>
          <Select value={sideFilter} label="Side" onChange={handleSideFilterChange}>
            <MenuItem value="ALL">All Sides</MenuItem>
            <MenuItem value="BUY">Buy</MenuItem>
            <MenuItem value="SELL">Sell</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>Trade ID</TableCell>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>Symbol</TableCell>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>Side</TableCell>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>Quantity</TableCell>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>Price</TableCell>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>Value</TableCell>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>P&L</TableCell>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTrades.map((trade) => (
              <TableRow
                key={trade.id}
                sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }}
              >
                <TableCell sx={{ color: 'text.primary', fontFamily: 'monospace' }}>
                  {trade.id}
                </TableCell>
                <TableCell sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                  {trade.symbol}
                </TableCell>
                <TableCell>
                  <Chip
                    label={trade.side}
                    color={getSideColor(trade.side) as any}
                    size="small"
                    sx={{ fontWeight: 'bold' }}
                  />
                </TableCell>
                <TableCell sx={{ color: 'text.primary' }}>
                  {trade.quantity.toLocaleString()}
                </TableCell>
                <TableCell sx={{ color: 'text.primary', fontFamily: 'monospace' }}>
                  {formatCurrency(trade.price)}
                </TableCell>
                <TableCell sx={{ color: 'text.primary', fontFamily: 'monospace' }}>
                  {formatCurrency(trade.quantity * trade.price)}
                </TableCell>
                <TableCell
                  sx={{
                    color: getPnlColor(trade.pnl || 0),
                    fontWeight: 'bold',
                    fontFamily: 'monospace',
                  }}
                >
                  {trade.pnl ? formatCurrency(trade.pnl) : '-'}
                </TableCell>
                <TableCell>
                  <Chip
                    label={trade.status}
                    color={getStatusColor(trade.status) as any}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                  {formatDateTime(trade.timestamp)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredTrades.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ color: 'text.secondary' }}
      />
    </Paper>
  )
}

export default TradeHistory