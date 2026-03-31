/* ===== BANKS SCREEN LOGIC ===== */

const BanksScreen = {
  init() {
    this.renderBankAccounts();
    this.setupModal();
  },

  renderBankAccounts() {
    const container = document.getElementById('bank-accounts-list');
    container.innerHTML = APP_DATA.banks.map((bank, i) => `
      <div class="bank-card animate-in delay-${i + 1}" data-bank-index="${i}">
        <div class="bank-info">
          <div class="bank-icon" style="background:${bank.color}">${bank.icon}</div>
          <div class="bank-details">
            <div class="bank-name">${bank.name}</div>
            <div class="bank-account-number">${bank.accNo}</div>
          </div>
        </div>
        <div class="bank-balance-value">₹${bank.balance.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
      </div>
    `).join('');

    // Click handler for bank cards
    container.querySelectorAll('.bank-card').forEach(card => {
      card.addEventListener('click', () => {
        const index = parseInt(card.dataset.bankIndex);
        this.openBankDetail(index);
      });
    });
  },

  openBankDetail(index) {
    const bank = APP_DATA.banks[index];
    if (!bank) return;

    const modal = document.getElementById('bank-detail-modal');
    const body = document.getElementById('modal-body');

    body.innerHTML = `
      <div class="bank-detail-summary">
        <div class="bank-detail-row">
          <span class="label">Bank</span>
          <span class="value">${bank.name}</span>
        </div>
        <div class="bank-detail-row">
          <span class="label">Account Type</span>
          <span class="value">${bank.type}</span>
        </div>
        <div class="bank-detail-row">
          <span class="label">Account Number</span>
          <span class="value">${bank.accNo}</span>
        </div>
        <div class="bank-detail-row">
          <span class="label">IFSC Code</span>
          <span class="value">${bank.ifsc}</span>
        </div>
        <div class="bank-detail-row">
          <span class="label">Branch</span>
          <span class="value">${bank.branch}</span>
        </div>
        <div class="bank-detail-row">
          <span class="label">Balance</span>
          <span class="value" style="font-size:16px;color:var(--primary);">₹${bank.balance.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
        </div>
      </div>

      <div class="transaction-header">
        <h3>Recent Transactions</h3>
        <button class="txn-filter-btn">All ▾</button>
      </div>

      <div class="transaction-list">
        ${bank.transactions.map(txn => `
          <div class="transaction-row">
            <div class="txn-info">
              <div class="txn-icon ${txn.type}">
                ${txn.type === 'credit' ? '↓' : '↑'}
              </div>
              <div>
                <div class="txn-name">${txn.name}</div>
                <div class="txn-date">${txn.date}</div>
              </div>
            </div>
            <div class="txn-amount ${txn.type === 'credit' ? 'positive' : 'negative'}">
              ${txn.type === 'credit' ? '+' : ''}₹${Math.abs(txn.amount).toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
            </div>
          </div>
        `).join('')}
      </div>
    `;

    modal.classList.add('open');
  },

  closeBankDetail() {
    document.getElementById('bank-detail-modal').classList.remove('open');
  },

  setupModal() {
    document.getElementById('modal-backdrop').addEventListener('click', () => this.closeBankDetail());
    document.getElementById('modal-back').addEventListener('click', () => this.closeBankDetail());
  },
};
