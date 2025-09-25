import React, { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  AppBar,
  Toolbar,
  Container,
  Tab,
  Tabs,
  Alert,
  Chip,
  CircularProgress,
  Button,
} from '@mui/material'
import {
  PlayArrow,
  Stop,
  Refresh,
} from '@mui/icons-material'
import TradingViewChart from './TradingViewChart'
import PortfolioOverview from './PortfolioOverview'
import PerformanceMetrics from './PerformanceMetrics'
import TradeHistory from './TradeHistory'
import PositionsTable from './PositionsTable'
import { usePortfolio, useStrategyStatus, useBackendHealth } from '../hooks/useApi'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

const Dashboard: React.FC = () => {
  const [tabValue, setTabValue] = useState(0)
  const [selectedSymbol, setSelectedSymbol] = useState('RELIANCE')

  // Use custom hooks for backend integration
  const { portfolio, loading: portfolioLoading, error: portfolioError, refetch: refetchPortfolio } = usePortfolio()
  const { status: strategyStatus, startStrategy, stopStrategy } = useStrategyStatus()
  const { isOnline, lastCheck } = useBackendHealth()

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleStrategyToggle = async () => {
    if (strategyStatus?.is_running) {
      await stopStrategy()
    } else {
      await startStrategy()
    }
  }

  // Show loading screen while initial data loads
  if (portfolioLoading && !portfolio) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh',
          bgcolor: 'background.default'
        }}
      >
        <CircularProgress size={60} sx={{ color: 'primary.main' }} />
        <Typography variant="h6" sx={{ mt: 2, color: 'text.primary' }}>
          Connecting to AlgoTrader Backend...
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
          Loading portfolio data and strategy status
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ bgcolor: '#1a1a1a' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#00ff88' }}>
            📊 AlgoTrader Pro Dashboard
          </Typography>
          
          {/* Backend Status */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip
              label={isOnline ? 'Backend Online' : 'Backend Offline'}
              color={isOnline ? 'success' : 'error'}
              size="small"
              variant="outlined"
            />
            
            {/* Strategy Status & Controls */}
            {strategyStatus && (
              <>
                <Chip
                  label={strategyStatus.is_running ? 'Strategy Running' : 'Strategy Stopped'}
                  color={strategyStatus.is_running ? 'primary' : 'default'}
                  size="small"
                  variant="outlined"
                />
                <Button
                  size="small"
                  variant="outlined"
                  color={strategyStatus.is_running ? 'error' : 'success'}
                  startIcon={strategyStatus.is_running ? <Stop /> : <PlayArrow />}
                  onClick={handleStrategyToggle}
                  disabled={!isOnline}
                >
                  {strategyStatus.is_running ? 'Stop' : 'Start'}
                </Button>
              </>
            )}
            
            <Button
              size="small"
              variant="outlined"
              startIcon={<Refresh />}
              onClick={refetchPortfolio}
              disabled={portfolioLoading}
            >
              Refresh
            </Button>
            
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {lastCheck ? `Updated: ${lastCheck.toLocaleTimeString()}` : 'Connecting...'}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 2 }}>
        {/* Error Alerts */}
        {portfolioError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Portfolio Error: {portfolioError}
          </Alert>
        )}
        
        {!isOnline && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            Backend connection lost. Displaying last known data.
          </Alert>
        )}

        {/* Portfolio Overview Cards */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <PortfolioOverview portfolio={portfolio} />
        </Box>

        {/* Main Dashboard Tabs */}
        <Paper sx={{ bgcolor: 'background.paper', borderRadius: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="dashboard tabs"
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': { color: 'text.secondary' },
              '& .Mui-selected': { color: 'primary.main' },
            }}
          >
            <Tab label="📈 Charts" />
            <Tab label="💼 Positions" />
            <Tab label="📊 Performance" />
            <Tab label="📋 Trade History" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
              <Box sx={{ flex: 2 }}>
                <TradingViewChart 
                  symbol={selectedSymbol} 
                  onSymbolChange={setSelectedSymbol}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <PerformanceMetrics portfolio={portfolio} />
              </Box>
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <PositionsTable 
              positions={portfolio?.positions || {}} 
              onSymbolSelect={setSelectedSymbol}
            />
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <PerformanceMetrics portfolio={portfolio} detailed={true} />
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <TradeHistory trades={portfolio?.trade_history || []} />
          </TabPanel>
        </Paper>
      </Container>
    </Box>
  )
}

export default Dashboard