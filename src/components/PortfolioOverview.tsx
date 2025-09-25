import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
} from '@mui/material'
import {
  TrendingUp,
  TrendingDown,
  AccountBalance,
  Paid,
  ShowChart,
} from '@mui/icons-material'
import type { Portfolio } from '../services/api'

interface PortfolioOverviewProps {
  portfolio: Portfolio | null
}

interface StatsCardProps {
  title: string
  value: string
  change?: string
  icon: React.ReactNode
  color: 'primary' | 'success' | 'error' | 'warning' | 'info'
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, icon, color }) => {
  const isPositive = change && parseFloat(change.replace(/[^\d.-]/g, '')) >= 0

  return (
    <Card sx={{ height: '100%', bgcolor: 'background.paper' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="text.secondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h5" component="div" sx={{ color: `${color}.main`, fontWeight: 'bold' }}>
              {value}
            </Typography>
            {change && (
              <Chip
                icon={isPositive ? <TrendingUp /> : <TrendingDown />}
                label={change}
                size="small"
                color={isPositive ? 'success' : 'error'}
                sx={{ mt: 1 }}
              />
            )}
          </Box>
          <Box sx={{ color: `${color}.main`, opacity: 0.7 }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

const PortfolioOverview: React.FC<PortfolioOverviewProps> = ({ portfolio }) => {
  // Handle null portfolio
  if (!portfolio) {
    return (
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
        {[...Array(5)].map((_, index) => (
          <Card key={index} sx={{ height: '100%', bgcolor: 'background.paper' }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Loading...
              </Typography>
              <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                --
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount) + ' INR'
  }

  const formatPercentage = (amount: number, base: number) => {
    if (base === 0) return '0%'
    const percentage = ((amount / base) * 100).toFixed(2)
    return `${percentage}%`
  }

  const returnPercentage = formatPercentage(portfolio.total_pnl, portfolio.invested_amount)
  const dayReturnPercentage = formatPercentage(portfolio.day_pnl, portfolio.total_value)

  const stats = [
    {
      title: 'Total Portfolio Value',
      value: formatCurrency(portfolio.total_value),
      change: `${returnPercentage} overall`,
      icon: <AccountBalance sx={{ fontSize: 40 }} />,
      color: 'primary' as const,
    },
    {
      title: 'Cash Available',
      value: formatCurrency(portfolio.cash_available),
      icon: <Paid sx={{ fontSize: 40 }} />,
      color: 'info' as const,
    },
    {
      title: 'Invested Amount',
      value: formatCurrency(portfolio.invested_amount),
      icon: <ShowChart sx={{ fontSize: 40 }} />,
      color: 'warning' as const,
    },
    {
      title: 'Total P&L',
      value: formatCurrency(portfolio.total_pnl),
      change: returnPercentage,
      icon: portfolio.total_pnl >= 0 ? <TrendingUp sx={{ fontSize: 40 }} /> : <TrendingDown sx={{ fontSize: 40 }} />,
      color: portfolio.total_pnl >= 0 ? 'success' as const : 'error' as const,
    },
    {
      title: "Today's P&L",
      value: formatCurrency(portfolio.day_pnl),
      change: dayReturnPercentage,
      icon: portfolio.day_pnl >= 0 ? <TrendingUp sx={{ fontSize: 40 }} /> : <TrendingDown sx={{ fontSize: 40 }} />,
      color: portfolio.day_pnl >= 0 ? 'success' as const : 'error' as const,
    },
  ]

  return (
    <>
      {stats.map((stat, index) => (
        <Box key={index} sx={{ xs: 12, sm: 6, md: 2.4 }}>
          <StatsCard {...stat} />
        </Box>
      ))}
    </>
  )
}

export default PortfolioOverview