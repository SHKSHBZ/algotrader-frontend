# 📊 AlgoTrader Pro Dashboard

A professional React TypeScript trading dashboard with TradingView-style charts, portfolio analytics, and real-time market data integration.

## 🚀 Features

### 📈 TradingView-Style Charts
- **Interactive Price Charts**: Lightweight-charts integration for professional candlestick charts
- **Technical Indicators**: Support for SMA, EMA, and volume overlays
- **Multiple Timeframes**: 1m, 5m, 15m, 1h, 1D chart intervals
- **Symbol Selection**: Easy switching between popular Indian stocks
- **Real-time Updates**: Live price data with automatic refresh

### 💼 Portfolio Management
- **Portfolio Overview**: Real-time portfolio value, P&L, and cash available
- **Position Tracking**: Detailed positions table with live P&L calculations
- **Performance Metrics**: Sharpe ratio, max drawdown, win rate analysis
- **Trade History**: Complete trade log with filtering and search capabilities

### 📊 Analytics & Reporting
- **Performance Charts**: Portfolio value progression over time
- **Drawdown Analysis**: Visual representation of portfolio drawdowns
- **Monthly Returns**: Bar charts showing monthly performance
- **Key Metrics Cards**: Quick overview of important statistics

### 🎨 Modern UI/UX
- **Dark Theme**: Professional trading-focused dark theme
- **Responsive Design**: Mobile-friendly responsive layout
- **Material-UI Components**: Consistent and polished UI components
- **Interactive Elements**: Hover effects, animations, and smooth transitions

## 🛠 Tech Stack

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development with full TypeScript support
- **Vite** - Fast build tool and development server
- **Material-UI v6** - Comprehensive React component library
- **Lightweight Charts** - TradingView-quality financial charts
- **Recharts** - Additional charting capabilities for analytics
- **Axios** - HTTP client for API integration

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Setup Instructions
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd algo-trader-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:5173`

## 🏗 Project Structure

```
src/
├── components/           # React components
│   ├── Dashboard.tsx    # Main dashboard layout
│   ├── TradingViewChart.tsx    # Interactive price charts
│   ├── PortfolioOverview.tsx   # Portfolio summary cards
│   ├── PerformanceMetrics.tsx  # Analytics and metrics
│   ├── PositionsTable.tsx      # Current positions table
│   └── TradeHistory.tsx        # Trade history with filters
├── App.tsx              # Main app component with theme
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🎯 Core Components

### Dashboard
- **Navigation**: Tabbed interface for different views
- **Live Clock**: Real-time timestamp display
- **API Integration**: Connects to backend trading API

### TradingViewChart
- **Price Display**: Professional candlestick charts
- **Timeframe Selection**: Multiple chart intervals
- **Symbol Picker**: Quick symbol switching
- **Volume Overlay**: Trading volume visualization

### PortfolioOverview
- **Summary Cards**: Total value, P&L, cash available
- **Color Coding**: Green/red for gains/losses
- **Live Updates**: Real-time portfolio metrics

### PerformanceMetrics
- **Key Ratios**: Sharpe ratio, max drawdown, win rate
- **Performance Charts**: Portfolio growth visualization
- **Monthly Analysis**: Month-by-month returns

### PositionsTable
- **Live Positions**: Current holdings with real-time P&L
- **Search & Filter**: Find specific positions quickly
- **Action Buttons**: Quick access to charts and position management

### TradeHistory
- **Complete Log**: All executed trades with details
- **Advanced Filtering**: Filter by status, side, symbol
- **Pagination**: Efficient handling of large trade datasets

## 🔧 Configuration

### Theme Customization
The dashboard uses a custom Material-UI dark theme optimized for trading:

- **Primary Color**: `#00ff88` (Trading green)
- **Secondary Color**: `#ff4444` (Trading red)
- **Background**: Dark theme with multiple shade levels
- **Typography**: Roboto font family with trading-specific weights

### API Integration
Configure backend API endpoint in `Dashboard.tsx`:

```typescript
const response = await axios.get('http://localhost:5000/api/portfolio')
```

### Demo Data
All components include demo data for development and testing:
- Sample portfolio positions
- Mock trade history
- Synthetic price data
- Performance metrics

## 🚀 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Setup
1. Install recommended VS Code extensions:
   - ES7+ React/Redux/React-Native snippets
   - TypeScript Importer
   - Prettier - Code formatter
   - Material-UI Snippets

2. Configure TypeScript settings in `tsconfig.json`
3. Customize Vite configuration in `vite.config.ts`

## 🔗 Backend Integration

### API Endpoints Expected
- `GET /api/portfolio` - Portfolio summary and positions
- `GET /api/trades` - Trade history
- `GET /api/market-data/:symbol` - Real-time price data

### Data Formats
The dashboard expects specific data structures from the backend API. See component interfaces for detailed type definitions.

## 🎨 Customization

### Adding New Components
1. Create component in `src/components/`
2. Import and use in `Dashboard.tsx`
3. Add to navigation tabs if needed

### Modifying Theme
Update theme configuration in `App.tsx`:

```typescript
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#00ff88' },
    secondary: { main: '#ff4444' },
    // ... other theme options
  }
})
```

### Chart Customization
Modify chart appearance in `TradingViewChart.tsx`:
- Colors, timeframes, indicators
- Chart types and overlays
- Interactive features

## 📱 Responsive Design

The dashboard is fully responsive and optimized for:
- **Desktop**: Full feature set with multi-column layouts
- **Tablet**: Optimized grid layout with collapsible panels
- **Mobile**: Stacked layout with touch-friendly controls

## 🔐 Security Notes

- All API calls include proper error handling
- No sensitive data stored in local storage
- HTTPS recommended for production deployment
- Input validation on all user inputs

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Deployment Options
- **Vercel**: Zero-config deployment with Git integration
- **Netlify**: Easy deployment with continuous integration
- **AWS S3 + CloudFront**: Scalable static hosting
- **Docker**: Containerized deployment

### Environment Variables
Configure for production:
- `VITE_API_URL` - Backend API endpoint
- `VITE_WS_URL` - WebSocket connection for real-time data

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check existing documentation
- Review component code for implementation details

---

**Built with ❤️ for algorithmic trading**

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
