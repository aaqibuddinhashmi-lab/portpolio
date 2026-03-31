/* ===== INVESTMENTS SCREEN LOGIC ===== */

const InvestmentsScreen = {
  init() {
    this.renderStocks();
    this.renderMutualFunds();
    this.renderRecommended();
    this.renderCollections();
    this.renderCategories();
    this.setupFilterTabs();
  },

  drawChart() {
    Charts.drawAreaChart('investment-chart', APP_DATA.investmentHistory, {
      lineColor: '#FFFFFF',
      fillColor: 'rgba(255,255,255,0.12)',
      lineWidth: 2.5,
    });
  },

  renderStocks() {
    const container = document.getElementById('stocks-list');
    container.innerHTML = APP_DATA.stockHoldings.map((stock, i) => {
      const pl = stock.current - stock.invested;
      const plPct = ((pl / stock.invested) * 100).toFixed(1);
      const isPositive = pl >= 0;
      return `
        <div class="holding-card animate-in delay-${i + 1}">
          <div class="holding-top">
            <div class="holding-name-section">
              <div class="holding-logo" style="background:${stock.color}">${stock.name.charAt(0)}</div>
              <div>
                <div class="holding-name">${stock.name}</div>
                <div class="holding-type">${stock.type}</div>
              </div>
            </div>
            <div class="holding-pl">
              <div class="holding-pl-value ${isPositive ? 'positive' : 'negative'}">${isPositive ? '+' : ''}₹${Math.abs(pl).toLocaleString('en-IN')}</div>
              <div class="holding-pl-pct ${isPositive ? 'positive' : 'negative'}">${isPositive ? '+' : ''}${plPct}%</div>
            </div>
          </div>
          <div class="holding-bottom">
            <div class="holding-stat">
              <div class="holding-stat-label">Invested</div>
              <div class="holding-stat-value">₹${stock.invested.toLocaleString('en-IN')}</div>
            </div>
            <div class="holding-stat">
              <div class="holding-stat-label">Current</div>
              <div class="holding-stat-value">₹${stock.current.toLocaleString('en-IN')}</div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  renderMutualFunds() {
    const container = document.getElementById('mf-list');
    container.innerHTML = APP_DATA.mfHoldings.map((mf, i) => {
      const pl = mf.current - mf.invested;
      const plPct = ((pl / mf.invested) * 100).toFixed(1);
      const isPositive = pl >= 0;
      return `
        <div class="holding-card animate-in delay-${i + 1}">
          <div class="holding-top">
            <div class="holding-name-section">
              <div class="holding-logo" style="background:${mf.color}">${mf.name.charAt(0)}</div>
              <div>
                <div class="holding-name">${mf.name}</div>
                <div class="holding-type">${mf.type}</div>
              </div>
            </div>
            <div class="holding-pl">
              <div class="holding-pl-value ${isPositive ? 'positive' : 'negative'}">${isPositive ? '+' : ''}₹${Math.abs(pl).toLocaleString('en-IN')}</div>
              <div class="holding-pl-pct ${isPositive ? 'positive' : 'negative'}">${isPositive ? '+' : ''}${plPct}%</div>
            </div>
          </div>
          <div class="holding-bottom">
            <div class="holding-stat">
              <div class="holding-stat-label">Invested</div>
              <div class="holding-stat-value">₹${mf.invested.toLocaleString('en-IN')}</div>
            </div>
            <div class="holding-stat">
              <div class="holding-stat-label">Current</div>
              <div class="holding-stat-value">₹${mf.current.toLocaleString('en-IN')}</div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  renderRecommended() {
    const container = document.getElementById('recommended-list');
    container.innerHTML = APP_DATA.recommendedFunds.map(fund => `
      <div class="recommended-card">
        <span class="rec-badge">${fund.badge}</span>
        <h3>${fund.name}</h3>
        <div class="rec-returns">${fund.returns}</div>
        <p class="rec-desc">${fund.desc}</p>
      </div>
    `).join('');
  },

  renderCollections() {
    const container = document.getElementById('collections-grid');
    container.innerHTML = APP_DATA.collections.map(col => `
      <div class="collection-card">
        <div class="collection-icon">${col.icon}</div>
        <h3>${col.name}</h3>
        <p>${col.desc}</p>
      </div>
    `).join('');
  },

  renderCategories() {
    const container = document.getElementById('category-grid');
    container.innerHTML = APP_DATA.categories.map(cat => `
      <div class="category-chip">
        <span class="category-emoji">${cat.emoji}</span>
        ${cat.name}
      </div>
    `).join('');
  },

  setupFilterTabs() {
    document.querySelectorAll('.filter-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.dataset.filter;
        document.querySelectorAll('.holdings-section').forEach(s => s.classList.add('hidden'));
        document.getElementById(`holdings-${filter}`).classList.remove('hidden');
      });
    });
  },
};
