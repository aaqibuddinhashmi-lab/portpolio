/* ===== HOME SCREEN LOGIC ===== */

const HomeScreen = {
  init() {
    this.renderAssets();
    this.renderTrendingStocks('most-invested');
    this.renderWhatIfCards();
    this.renderLearnCards();
    this.renderRecommendations();
    this.setupTabs();
    this.drawCharts();
  },

  drawCharts() {
    Charts.drawAreaChart('net-worth-chart', APP_DATA.netWorthHistory, {
      lineColor: '#FFFFFF',
      fillColor: 'rgba(255,255,255,0.12)',
      lineWidth: 2.5,
    });

    setTimeout(() => {
      Charts.drawMiniChart('nifty-chart', APP_DATA.marketIndices.nifty.data, {
        lineColor: '#00C48C',
        fillColor: 'rgba(0,196,140,0.08)',
      });
    }, 400);

    setTimeout(() => {
      Charts.drawMiniChart('banknifty-chart', APP_DATA.marketIndices.bankNifty.data, {
        lineColor: '#FF4D4F',
        fillColor: 'rgba(255,77,79,0.08)',
      });
    }, 600);
  },

  renderAssets() {
    const container = document.getElementById('asset-list');
    container.innerHTML = APP_DATA.assets.map((asset, i) => `
      <div class="asset-row animate-in delay-${i + 1}">
        <div class="asset-left">
          <div class="asset-icon ${asset.type}">${asset.icon}</div>
          <span class="asset-name">${asset.name}</span>
        </div>
        <span class="asset-value">₹${asset.value.toLocaleString('en-IN')}</span>
      </div>
    `).join('');
  },

  renderTrendingStocks(tab) {
    const container = document.getElementById('trending-list');
    const stocks = APP_DATA.trendingStocks[tab];
    container.innerHTML = stocks.map((stock, i) => `
      <div class="stock-row animate-in delay-${i + 1}">
        <div class="stock-info">
          <div class="stock-logo-name">
            <div class="stock-logo" style="background:${stock.color}">${stock.name.charAt(0)}</div>
            <span class="stock-name">${stock.name}</span>
          </div>
          <span class="stock-sector">${stock.sector}</span>
        </div>
        <div class="stock-price-info">
          <span class="stock-price">₹${stock.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          <span class="stock-change ${stock.change >= 0 ? 'positive' : 'negative'}">${stock.change >= 0 ? '+' : ''}${stock.change}%</span>
        </div>
      </div>
    `).join('');
  },

  renderWhatIfCards() {
    const container = document.getElementById('whatif-cards');
    container.innerHTML = APP_DATA.whatIfCards.map(card => `
      <div class="whatif-card">
        <p class="whatif-title">If you invested ${card.invested} in</p>
        <h3 class="whatif-company">${card.company}</h3>
        <p class="whatif-amount">${card.years} years ago</p>
        <p class="whatif-return positive">${card.returnPct}</p>
        <p class="whatif-amount">You'd have ${card.currentValue}</p>
      </div>
    `).join('');
  },

  renderLearnCards() {
    const container = document.getElementById('learn-cards');
    container.innerHTML = APP_DATA.learnCards.map(card => `
      <div class="learn-card">
        <h3>${card.title}</h3>
        <p>${card.desc}</p>
        <span class="read-time">${card.time}</span>
      </div>
    `).join('');
  },

  renderRecommendations() {
    const container = document.getElementById('recommendation-list');
    container.innerHTML = APP_DATA.recommendations.map((rec, i) => `
      <div class="recommendation-card animate-in delay-${i + 1}">
        <div class="rec-icon">${rec.icon}</div>
        <div class="rec-content">
          <h3>${rec.title}</h3>
          <p>${rec.desc}</p>
        </div>
      </div>
    `).join('');
  },

  setupTabs() {
    document.querySelectorAll('.trending-tabs .tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.trending-tabs .tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.renderTrendingStocks(btn.dataset.tab);
      });
    });
  },
};
