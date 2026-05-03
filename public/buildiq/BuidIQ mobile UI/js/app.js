/* ═══════════════════════════════════════════
   BuildIQ Mobile — App Logic
   ═══════════════════════════════════════════ */

// Current App State
let currentRole = null;
let currentScreen = null;

// Navigation Configurations per Role
const navConfigs = {
  worker: [
    { id: 'home', icon: '🏠', label: 'Home', screen: 'screen-worker-home' },
    { id: 'tasks', icon: '✅', label: 'Tasks', screen: 'screen-worker-tasks' },
    { id: 'profile', icon: '👤', label: 'Profile', screen: 'screen-worker-profile' }
  ],
  engineer: [
    { id: 'home', icon: '📊', label: 'Dashboard', screen: 'screen-engineer-home' },
    { id: 'drone', icon: '🚁', label: 'Drone', screen: 'screen-engineer-drone' },
    { id: 'plan', icon: '📋', label: 'Plans', screen: 'screen-engineer-plan' },
    { id: 'team', icon: '👥', label: 'Team', screen: 'screen-engineer-team' }
  ],
  client: [
    { id: 'home', icon: '🏠', label: 'Updates', screen: 'screen-client-home' },
    { id: 'budget', icon: '💳', label: 'Budget', screen: 'screen-client-budget' },
    { id: 'chat', icon: '💬', label: 'Chat', screen: 'screen-client-chat' }
  ],
  admin: [
    { id: 'home', icon: '🌍', label: 'Global', screen: 'screen-admin-home' },
    { id: 'projects', icon: '🏗️', label: 'Projects', screen: 'screen-admin-projects' },
    { id: 'reports', icon: '📈', label: 'Reports', screen: 'screen-admin-reports' }
  ]
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  updateTime();
  setInterval(updateTime, 60000);
});

// Update Status Bar Time
function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('status-time').textContent = `${hours}:${minutes}`;
}

// Switch Role Flow
function switchRole(role) {
  currentRole = role;
  
  // Hide all screens
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  
  // Build Bottom Nav
  buildBottomNav(role);
  
  // Show Nav and FABs
  document.getElementById('bottom-nav').style.display = 'flex';
  
  // Engineer & Admin get AI Fab
  if(role === 'engineer' || role === 'admin') {
    document.getElementById('global-ai-fab').style.display = 'flex';
  } else {
    document.getElementById('global-ai-fab').style.display = 'none';
  }
  
  // Worker & Engineer get regular Action Fab
  if(role === 'worker' || role === 'engineer') {
    document.getElementById('global-fab').style.display = 'flex';
    document.getElementById('global-fab').textContent = role === 'worker' ? '📸' : '+';
  } else {
    document.getElementById('global-fab').style.display = 'none';
  }

  // Navigate to default screen for role
  navTo(`screen-${role}-home`);
}

// Build Bottom Navigation dynamically
function buildBottomNav(role) {
  const navBar = document.getElementById('bottom-nav');
  navBar.innerHTML = '';
  
  const config = navConfigs[role];
  config.forEach((item, index) => {
    const btn = document.createElement('button');
    btn.className = `bottom-nav__item ${index === 0 ? 'active' : ''}`;
    btn.onclick = () => {
      // Update active state
      navBar.querySelectorAll('.bottom-nav__item').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      navTo(item.screen);
    };
    
    btn.innerHTML = `
      <span class="bottom-nav__icon">${item.icon}</span>
      <span class="bottom-nav__label">${item.label}</span>
    `;
    navBar.appendChild(btn);
  });
}

// Navigate between screens
function navTo(screenId) {
  if (currentScreen === screenId) return;
  
  // Hide current
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  
  // Show new
  const screen = document.getElementById(screenId);
  if (screen) {
    screen.classList.add('active');
    currentScreen = screenId;
    window.scrollTo(0, 0);
  } else {
    // Fallback if screen isn't built yet but nav button exists
    console.warn(`Screen ${screenId} not fully implemented in this demo.`);
    document.getElementById(`screen-${currentRole}-home`).classList.add('active');
  }
}

// Bottom Sheets
function toggleSheet(sheetId) {
  const sheet = document.getElementById(`sheet-${sheetId}`);
  const overlay = document.getElementById('sheet-overlay');
  
  if (sheet.classList.contains('active')) {
    closeSheets();
  } else {
    sheet.classList.add('active');
    overlay.classList.add('active');
  }
}

function closeSheets() {
  document.querySelectorAll('.bottom-sheet').forEach(s => s.classList.remove('active'));
  document.getElementById('sheet-overlay').classList.remove('active');
}

// FAB Action Simulator
function triggerFabAction() {
  if (currentRole === 'worker') {
    alert('Camera opened: Capture work progress');
  } else if (currentRole === 'engineer') {
    toggleSheet('notifications'); // Reuse sheet logic or open task modal
    alert('Action Menu: Create Task, Raise Issue, or Request Material');
  }
}

// AI Chat Simulation
function sendChat() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;
  
  const chatContainer = document.getElementById('chat-messages');
  
  // User Message
  const userMsg = document.createElement('div');
  userMsg.className = 'ai-msg ai-msg--user';
  userMsg.textContent = text;
  chatContainer.appendChild(userMsg);
  
  input.value = '';
  chatContainer.scrollTop = chatContainer.scrollHeight;
  
  // Bot Reply Simulation
  setTimeout(() => {
    const botMsg = document.createElement('div');
    botMsg.className = 'ai-msg ai-msg--bot';
    botMsg.innerHTML = `Analyzing <b>${text}</b>...<br><br>Based on current site data, everything is on track. Let me know if you need specific waste metrics or delay predictions.`;
    chatContainer.appendChild(botMsg);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, 1000);
}

// Quick Prompt Clicks
document.querySelectorAll('.ai-prompt-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.getElementById('chat-input').value = chip.textContent;
    sendChat();
    document.getElementById('chat-prompts').style.display = 'none';
  });
});
