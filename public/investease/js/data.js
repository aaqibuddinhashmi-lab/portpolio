/* ===== MOCK DATA ===== */

const APP_DATA = {
  user: {
    name: 'Pragya',
    avatar: 'P',
    netWorth: 360000,
    netWorthChange: 10,
    totalInvestment: 340000,
    investmentChange: 12,
    totalBankBalance: 20000,
  },

  assets: [
    { name: 'Bank Balance', value: 20000, icon: '🏦', type: 'bank' },
    { name: 'Stocks', value: 50000, icon: '📈', type: 'stocks' },
    { name: 'Mutual Funds', value: 40000, icon: '📊', type: 'mf' },
    { name: 'Provident Fund', value: 0, icon: '🏛️', type: 'pf' },
  ],

  marketIndices: {
    nifty: {
      name: 'Nifty 50',
      value: 19676,
      change: 109.6,
      changePct: 12.67,
      data: [18200, 18500, 18100, 18800, 19100, 18900, 19300, 19500, 19200, 19676],
    },
    bankNifty: {
      name: 'Bank Nifty',
      value: 12376,
      change: 96.5,
      changePct: 2.5,
      data: [11800, 11900, 12100, 11700, 12000, 12200, 12100, 12300, 12250, 12376],
    },
  },

  trendingStocks: {
    'most-invested': [
      { name: 'Reliance Industries', sector: 'Oil & Gas · NSE', price: 2456.80, change: 2.3, color: '#1976D2' },
      { name: 'TCS', sector: 'IT · NSE', price: 3421.50, change: -0.8, color: '#7B1FA2' },
      { name: 'Infosys', sector: 'IT · NSE', price: 1523.40, change: 1.5, color: '#00796B' },
      { name: 'HDFC Bank', sector: 'Banking · NSE', price: 1654.20, change: 0.9, color: '#D32F2F' },
    ],
    'high-dividend': [
      { name: 'Coal India', sector: 'Mining · NSE', price: 236.50, change: 1.2, color: '#424242' },
      { name: 'ONGC', sector: 'Oil & Gas · NSE', price: 178.90, change: 3.1, color: '#1565C0' },
      { name: 'Power Grid', sector: 'Power · NSE', price: 245.60, change: 0.7, color: '#2E7D32' },
      { name: 'ITC', sector: 'FMCG · NSE', price: 432.10, change: -0.3, color: '#E65100' },
    ],
  },

  whatIfCards: [
    { company: 'Apple Inc.', invested: '₹1,00,000', years: 10, currentValue: '₹18,50,000', returnPct: '+1750%', color: '#3B6BF5' },
    { company: 'Bitcoin', invested: '₹50,000', years: 5, currentValue: '₹12,00,000', returnPct: '+2300%', color: '#FF8C42' },
    { company: 'HDFC Bank', invested: '₹1,00,000', years: 15, currentValue: '₹8,40,000', returnPct: '+740%', color: '#00C48C' },
  ],

  learnCards: [
    { title: 'What is SIP?', desc: 'Learn how systematic investment plans can help you build wealth over time.', time: '3 min read' },
    { title: 'Stock Market Basics', desc: 'Understand the fundamentals of stock markets and how to start investing.', time: '5 min read' },
    { title: 'Mutual Fund Types', desc: 'Explore different types of mutual funds and which ones suit your goals.', time: '4 min read' },
    { title: 'Tax Saving Tips', desc: 'Maximize your tax savings through smart investment strategies.', time: '6 min read' },
  ],

  recommendations: [
    { icon: '💡', title: 'Start a SIP', desc: 'Begin with ₹500/month in a diversified equity fund.' },
    { icon: '📊', title: 'Diversify Portfolio', desc: 'Consider adding international stocks to reduce risk.' },
    { icon: '🎯', title: 'Set Financial Goals', desc: 'Define clear goals for retirement, emergency, and education.' },
    { icon: '📰', title: 'Market Update', desc: 'Nifty 50 hits all-time high. Read the analysis.' },
  ],

  stockHoldings: [
    { name: 'Reliance Industries', type: 'Large Cap', invested: 15000, current: 17250, color: '#1976D2' },
    { name: 'TCS', type: 'Large Cap', invested: 12000, current: 13800, color: '#7B1FA2' },
    { name: 'Infosys', type: 'Large Cap', invested: 10000, current: 9200, color: '#00796B' },
    { name: 'HDFC Bank', type: 'Large Cap', invested: 8000, current: 9100, color: '#D32F2F' },
    { name: 'Wipro', type: 'Mid Cap', invested: 5000, current: 4700, color: '#00838F' },
  ],

  mfHoldings: [
    { name: 'Axis Bluechip Fund', type: 'Large Cap · Equity', invested: 15000, current: 17800, color: '#1565C0' },
    { name: 'SBI Small Cap Fund', type: 'Small Cap · Equity', invested: 10000, current: 12500, color: '#388E3C' },
    { name: 'ICICI Pru Value', type: 'Value · Equity', invested: 8000, current: 8650, color: '#F57C00' },
    { name: 'Kotak Emerging Equity', type: 'Mid Cap · Equity', invested: 7000, current: 8200, color: '#7B1FA2' },
  ],

  recommendedFunds: [
    { name: 'Parag Parikh FlexiCap', returns: '+18.5% p.a.', badge: 'Top Pick', desc: 'Diversified across India & global' },
    { name: 'Mirae Asset Large Cap', returns: '+15.2% p.a.', badge: 'Consistent', desc: 'Stable large-cap returns' },
    { name: 'Quant Small Cap', returns: '+32.1% p.a.', badge: 'High Growth', desc: 'Small cap outperformer' },
  ],

  collections: [
    { icon: '🌟', name: 'Blue Chips', desc: 'Top 50 companies' },
    { icon: '🚀', name: 'High Growth', desc: 'Fast growing stocks' },
    { icon: '💰', name: 'Dividend Kings', desc: 'High yield stocks' },
    { icon: '🔄', name: 'SIP Stars', desc: 'Best for SIP' },
  ],

  categories: [
    { emoji: '🏭', name: 'Sectoral' },
    { emoji: '📊', name: 'Multi-cap' },
    { emoji: '🏢', name: 'Large Cap' },
    { emoji: '🏪', name: 'Mid Cap' },
    { emoji: '🛒', name: 'Small Cap' },
    { emoji: '💰', name: 'Debt' },
    { emoji: '⚖️', name: 'Hybrid' },
    { emoji: '🌍', name: 'International' },
    { emoji: '🏦', name: 'Tax Saver' },
  ],

  banks: [
    {
      name: 'Citi Bank',
      type: 'Savings Account',
      balance: 20000,
      accNo: '****4521',
      ifsc: 'CITI0000123',
      branch: 'Koramangala, Bangalore',
      color: '#1976D2',
      icon: '🏦',
      transactions: [
        { name: 'Salary Credit', date: 'Nov 1, 2023', amount: 50000, type: 'credit' },
        { name: 'Rent Payment', date: 'Nov 3, 2023', amount: -15000, type: 'debit' },
        { name: 'Amazon Purchase', date: 'Nov 5, 2023', amount: -2499, type: 'debit' },
        { name: 'UPI - PhonePe', date: 'Nov 7, 2023', amount: -850, type: 'debit' },
        { name: 'Dividend Credit', date: 'Nov 10, 2023', amount: 1200, type: 'credit' },
        { name: 'Netflix', date: 'Nov 12, 2023', amount: -649, type: 'debit' },
        { name: 'Freelance Payment', date: 'Nov 15, 2023', amount: 8000, type: 'credit' },
        { name: 'Grocery - BigBasket', date: 'Nov 17, 2023', amount: -3200, type: 'debit' },
      ],
    },
  ],

  netWorthHistory: [280000, 295000, 310000, 305000, 320000, 335000, 330000, 345000, 350000, 360000],
  investmentHistory: [260000, 275000, 290000, 285000, 300000, 315000, 310000, 325000, 330000, 340000],
};
