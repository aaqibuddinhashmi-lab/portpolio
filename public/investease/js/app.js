/* ===== APP CONTROLLER ===== */

const App = {
  currentScreen: 'home',

  init() {
    this.setupNavigation();
    this.updateStatusTime();
    setInterval(() => this.updateStatusTime(), 60000);

    // Initialize all screens
    HomeScreen.init();
    InvestmentsScreen.init();
    BanksScreen.init();

    // Add slight body reveal animation
    document.body.style.opacity = '0';
    requestAnimationFrame(() => {
      document.body.style.transition = 'opacity 0.5s ease';
      document.body.style.opacity = '1';
    });
  },

  setupNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        const screen = item.dataset.screen;
        if (screen === this.currentScreen) return;
        this.switchScreen(screen);
      });
    });
  },

  switchScreen(screenId) {
    // Update nav
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelector(`[data-screen="${screenId}"]`).classList.add('active');

    // Update screens
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const newScreen = document.getElementById(`screen-${screenId}`);
    newScreen.classList.add('active');
    newScreen.scrollTop = 0;

    this.currentScreen = screenId;

    // Redraw charts when entering specific screens
    if (screenId === 'home') {
      HomeScreen.drawCharts();
    } else if (screenId === 'investments') {
      InvestmentsScreen.drawChart();
    }

    // Haptic feedback (if available)
    if (navigator.vibrate) navigator.vibrate(10);
  },

  updateStatusTime() {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('status-time').textContent = `${h}:${m}`;
  },
};

// Boot
document.addEventListener('DOMContentLoaded', () => App.init());
