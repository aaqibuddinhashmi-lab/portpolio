class BuildIQ {
    constructor() {
        this.currentRole = BuildIQData.currentRole;
        this.currentModule = "overview";
        this.selectedProject = BuildIQData.projects[0];
        
        this.appShell = document.getElementById("app");
        this.loginShell = document.getElementById("login-screen");
        this.workspace = document.getElementById("workspace");
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderLogin();
        // Check for session/autologin if needed
        if (localStorage.getItem("buildiq_role")) {
            this.login(localStorage.getItem("buildiq_role"));
        }
    }

    setupEventListeners() {
        // Navigation delegation
        document.addEventListener("click", (e) => {
            const navItem = e.target.closest("[data-module]");
            if (navItem) {
                this.switchModule(navItem.dataset.module);
            }

            const loginBtn = e.target.closest("[data-login-role]");
            if (loginBtn) {
                this.login(loginBtn.dataset.loginRole);
            }

            const logoutBtn = e.target.closest("#logout-btn");
            if (logoutBtn) {
                this.logout();
            }

            const aiTrigger = e.target.closest("#ai-trigger");
            if (aiTrigger) {
                document.getElementById("ai-chat")?.classList.toggle("open");
            }
        });
    }

    login(role) {
        this.currentRole = role;
        localStorage.setItem("buildiq_role", role);
        this.loginShell.classList.add("hidden");
        this.appShell.classList.remove("hidden");
        this.renderApp();
        this.renderModule("overview");
    }

    logout() {
        localStorage.removeItem("buildiq_role");
        this.appShell.classList.add("hidden");
        this.loginShell.classList.remove("hidden");
        this.renderLogin();
    }

    renderLogin() {
        this.loginShell.innerHTML = `
            <div class="login-container">
                <div class="login-visual">
                    <img src="${BuildIQData.images.skyline}" alt="BuildIQ Background">
                    <div>
                        <span class="eyebrow">Enterprise Grade</span>
                        <h2>${BuildIQData.tagline}</h2>
                        <p>AI Powered Construction Intelligence Platform.</p>
                    </div>
                </div>
                <div class="login-form">
                    <div class="login-logo">
                        <div class="logo-mark"></div>
                        <div>
                            <span>BuildIQ</span>
                            <small>Smarter Construction</small>
                        </div>
                    </div>
                    <h3>Welcome back</h3>
                    <p class="sub">Choose your portal access</p>
                    <div class="role-selector">
                        <div class="role-option" data-login-role="admin">
                            <i data-lucide="shield"></i>
                            <span class="role-name">Admin</span>
                            <span class="role-desc">Full Control</span>
                        </div>
                        <div class="role-option" data-login-role="engineer">
                            <i data-lucide="hard-hat"></i>
                            <span class="role-name">Engineer</span>
                            <span class="role-desc">Site Command</span>
                        </div>
                        <div class="role-option" data-login-role="worker">
                            <i data-lucide="user"></i>
                            <span class="role-name">Worker</span>
                            <span class="role-desc">Field Actions</span>
                        </div>
                        <div class="role-option" data-login-role="client">
                            <i data-lucide="eye"></i>
                            <span class="role-name">Client</span>
                            <span class="role-desc">Transparency</span>
                        </div>
                    </div>
                    <div class="input-group">
                        <label>Company ID</label>
                        <input type="text" value="BIQ-ENTERPRISE-2026" readonly>
                    </div>
                    <button class="btn primary" style="width:100%; height:48px;" onclick="document.querySelector('.role-option.active')?.click() || alert('Select a role')">Access Dashboard</button>
                </div>
            </div>
        `;
        if (window.lucide) lucide.createIcons();
        
        // Simple active state for role options
        const options = this.loginShell.querySelectorAll(".role-option");
        options.forEach(opt => {
            opt.addEventListener("click", () => {
                options.forEach(o => o.classList.remove("active"));
                opt.classList.add("active");
            });
        });
    }

    renderApp() {
        const user = BuildIQData.users[this.currentRole];
        const roleConfig = BuildIQData.roles[this.currentRole];
        
        // Sidebar
        const sidebarNav = document.getElementById("sidebar-nav");
        sidebarNav.innerHTML = roleConfig.sidebar.map(item => `
            <div class="nav-item ${this.currentModule === item.id ? 'active' : ''}" data-module="${item.id}">
                <i data-lucide="${item.icon}"></i>
                <span>${item.label}</span>
            </div>
        `).join("");

        // Mobile Nav
        const mobileNav = document.getElementById("mobile-nav");
        if (mobileNav && roleConfig.mobileNav) {
            mobileNav.innerHTML = roleConfig.mobileNav.map(item => `
                <div class="mobile-nav-item ${this.currentModule === item.id ? 'active' : ''}" data-module="${item.id}">
                    <i data-lucide="${item.icon}"></i>
                    <span>${item.label}</span>
                </div>
            `).join("");
        }

        // Topbar
        document.getElementById("user-name").textContent = user.name;
        document.getElementById("user-role-label").textContent = user.role;
        document.getElementById("user-avatar").textContent = user.initials;
        document.getElementById("module-kicker").textContent = roleConfig.label;

        if (window.lucide) lucide.createIcons();
    }

    switchModule(moduleId) {
        this.currentModule = moduleId;
        document.querySelectorAll(".nav-item, .mobile-nav-item").forEach(item => {
            item.classList.toggle("active", item.dataset.module === moduleId);
        });
        document.getElementById("module-title").textContent = moduleId.charAt(0).toUpperCase() + moduleId.slice(1);
        
        this.workspace.innerHTML = `<div class="loading-state"><div class="spinner"></div><p>Syncing BuildIQ Intelligence...</p></div>`;
        
        setTimeout(() => this.renderModule(moduleId), 200);
    }

    renderModule(moduleId) {
        const r = {
            overview: () => this.renderOverview(),
            projects: () => this.renderProjects(),
            drone: () => this.renderDrone(),
            waste: () => this.renderWaste(),
            plans: () => this.renderPlans(),
            tasks: () => this.renderTasks(),
            teams: () => this.renderTeams(),
            budget: () => this.renderBudget(),
            reports: () => this.renderReports(),
            notifications: () => this.renderNotifications(),
            settings: () => this.renderSettings(),
            users: () => this.renderUsers(),
            analytics: () => this.renderAnalytics(),
            comms: () => this.renderComms(),
            attendance: () => this.renderAttendance(),
            safety: () => this.renderSafety(),
            requests: () => this.renderRequests(),
            progress: () => this.renderProgress(),
            documents: () => this.renderDocuments(),
            payments: () => this.renderPayments(),
        };
        (r[moduleId] || r.overview)();
        if (window.lucide) lucide.createIcons();
    }

    renderOverview() {
        const role = this.currentRole;

        if (role === 'worker') {
            this.renderWorkerDashboard();
            return;
        }
        if (role === 'client') {
            this.renderClientDashboard();
            return;
        }
        if (role === 'admin') {
            this.renderAdminOverview();
            return;
        }

        // Engineer / Default Overview (Single Project Focus)
        const data = BuildIQData.overview;
        this.workspace.innerHTML = `
            <div class="page-head">
                <div>
                    <span class="eyebrow">Project Command</span>
                    <h2>Skyline Tower - Mumbai</h2>
                </div>
                <div class="page-actions">
                    <button class="btn ghost"><i data-lucide="share-2"></i> Share Report</button>
                    <button class="btn primary"><i data-lucide="plus"></i> New Action</button>
                </div>
            </div>

            <div class="dashboard-grid">
                <div class="span-12 kpi-wrapper swipe-container">
                    <div class="card span-3 swipe-card">
                        <div class="card-top"><span>Project Progress</span><i data-lucide="activity"></i></div>
                        <div class="chart-shell">
                            <canvas id="progressChart"></canvas>
                            <div class="chart-center"><strong>${data.completion}%</strong><span>Finished</span></div>
                        </div>
                        <div class="progress-bar"><div class="progress-fill" style="width:${data.completion}%"></div></div>
                    </div>
                    <div class="card span-3 swipe-card">
                        <div class="card-top"><span>Delay Risk</span><i data-lucide="triangle-alert"></i></div>
                        <div class="chart-shell">
                            <canvas id="riskChart"></canvas>
                            <div class="chart-center"><strong>${data.delayRisk}%</strong><span>Elevated</span></div>
                        </div>
                        <p class="metric-row"><span>Status</span><strong class="warning-text">Medium Risk</strong></p>
                    </div>
                    <div class="card span-3 swipe-card">
                        <div class="card-top"><span>Budget Utilized</span><i data-lucide="wallet"></i></div>
                        <div class="chart-shell">
                            <canvas id="budgetChart"></canvas>
                            <div class="chart-center"><strong>${data.budgetUsed}%</strong><span>Spent</span></div>
                        </div>
                        <p class="metric-row"><span>Total</span><strong>₹200.0 Cr</strong></p>
                    </div>
                    <div class="card span-3 swipe-card">
                        <div class="card-top"><span>Waste Score</span><i data-lucide="recycle"></i></div>
                        <div class="chart-shell">
                            <canvas id="wasteChart"></canvas>
                            <div class="chart-center"><strong>72</strong><span>Good</span></div>
                        </div>
                        <p class="metric-row"><span>Impact</span><strong class="danger-text">+2.1% spike</strong></p>
                    </div>
                </div>

                <div class="card span-8">
                    <div class="card-top"><span>Drone Surveillance Live</span><div class="badge danger">REC</div></div>
                    <div class="drone-hero">
                        <img src="${BuildIQData.images.skyline}" alt="Drone View">
                        <div class="scanline"></div>
                        <div class="drone-hud">
                            <div class="hud-top"><span>ALT: 145m</span><span>BATT: 78%</span></div>
                            <div class="hud-bottom"><span>SKYVIEW_01</span><span>LIVE_4K</span></div>
                        </div>
                    </div>
                </div>

                <div class="card span-4">
                    <div class="card-top"><span>AI Alert Feed</span><i data-lucide="sparkles"></i></div>
                    <div class="feed-list" style="display:grid; gap:12px;">
                        ${data.aiAlerts.map(alert => `
                            <div class="ai-alert-item ${alert.severity}">
                                <i data-lucide="${alert.severity === 'success' ? 'check-circle' : 'alert-circle'}"></i>
                                <div>
                                    <strong style="font-size:13px; display:block;">${alert.title}</strong>
                                    <p style="font-size:12px; color:var(--text-muted);">${alert.detail}</p>
                                </div>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </div>
        `;
        this.initCharts();
    }

    renderAdminOverview() {
        const stats = BuildIQData.adminStats;
        this.workspace.innerHTML = `
            <div class="page-head">
                <div>
                    <span class="eyebrow">Enterprise Overview</span>
                    <h2>BuildIQ Global Command</h2>
                </div>
                <div class="page-actions">
                    <button class="btn ghost"><i data-lucide="download"></i> Export Data</button>
                    <button class="btn primary"><i data-lucide="building"></i> Add Site</button>
                </div>
            </div>

            <div class="dashboard-grid">
                <!-- Top KPI Cards -->
                <div class="span-12 kpi-wrapper swipe-container">
                    <div class="card span-3 swipe-card">
                        <div class="card-top"><span>Active Projects</span><i data-lucide="briefcase"></i></div>
                        <strong style="font-size:36px;">${stats.totalProjects}</strong>
                        <p style="color:var(--text-muted); font-size:12px; margin-top:8px;">Across 3 cities</p>
                    </div>
                    <div class="card span-3 swipe-card">
                        <div class="card-top"><span>Revenue Snapshot</span><i data-lucide="indian-rupee"></i></div>
                        <strong style="font-size:36px; color:var(--success);">${stats.revenue}</strong>
                        <p style="color:var(--success); font-size:12px; margin-top:8px;">+14% this quarter</p>
                    </div>
                    <div class="card span-3 swipe-card">
                        <div class="card-top"><span>Active Workers</span><i data-lucide="users"></i></div>
                        <strong style="font-size:36px;">${stats.activeWorkers}</strong>
                        <div class="progress-bar"><div class="progress-fill" style="width:85%"></div></div>
                        <p style="color:var(--text-muted); font-size:12px; margin-top:8px;">85% capacity utilized</p>
                    </div>
                    <div class="card span-3 swipe-card">
                        <div class="card-top"><span>Compliance Alerts</span><i data-lucide="shield-alert"></i></div>
                        <strong style="font-size:36px; color:var(--danger);">${stats.complianceAlerts}</strong>
                        <p style="color:var(--danger); font-size:12px; margin-top:8px;">Action required on 2 sites</p>
                    </div>
                </div>

                <!-- Main Charts Area -->
                <div class="card span-8">
                    <div class="card-top"><span>Profitability & Delay Trends</span><i data-lucide="trending-up"></i></div>
                    <div style="height: 280px; width: 100%; position: relative;">
                        <canvas id="adminTrendChart"></canvas>
                    </div>
                </div>

                <div class="card span-4">
                    <div class="card-top"><span>AI Recommendations</span><i data-lucide="sparkles"></i></div>
                    <div style="display:grid; gap:12px;">
                        <div class="ai-alert-item warning">
                            <i data-lucide="alert-circle"></i>
                            <div>
                                <strong style="font-size:13px; display:block;">Reallocate Resources</strong>
                                <p style="font-size:12px; color:var(--text-muted);">Move 15 workers from Residency to Metro Link to mitigate 12% delay risk.</p>
                            </div>
                        </div>
                        <div class="ai-alert-item danger">
                            <i data-lucide="recycle"></i>
                            <div>
                                <strong style="font-size:13px; display:block;">Waste Anomaly Detected</strong>
                                <p style="font-size:12px; color:var(--text-muted);">Skyline Tower cement waste is ${stats.wasteAcrossSites}, 4% above baseline.</p>
                            </div>
                        </div>
                        <div class="ai-alert-item success">
                            <i data-lucide="check-circle"></i>
                            <div>
                                <strong style="font-size:13px; display:block;">Budget Optimized</strong>
                                <p style="font-size:12px; color:var(--text-muted);">Vendor renegotiation saved ₹14.2L across 3 projects.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        this.initAdminCharts();
    }

    renderWorkerDashboard() {
        const d = BuildIQData.workerData;
        this.workspace.innerHTML = `
            <div class="page-head">
                <div><span class="eyebrow">Worker Home</span><h2>Namaste, Karan</h2></div>
            </div>
            <div class="dashboard-grid">
                <div class="card span-6 shift-card">
                    <div class="card-top"><span>Today's Shift</span><i data-lucide="clock"></i></div>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <div>
                            <strong style="font-size:32px; display:block;">${d.shift.hoursToday}</strong>
                            <p style="color:var(--success)">Shift Active</p>
                        </div>
                        <button class="btn primary">Check Out</button>
                    </div>
                </div>
                <div class="card span-6">
                    <div class="card-top"><span>Safety Status</span><i data-lucide="shield-check"></i></div>
                    <div style="display:flex; gap:20px;">
                        <div><span class="eyebrow">PPE</span><strong style="display:block;">${d.safety.ppeStatus}</strong></div>
                        <div><span class="eyebrow">Score</span><strong style="display:block;">${d.safety.score}%</strong></div>
                    </div>
                </div>
                <div class="card span-12">
                    <div class="card-top"><span>Assigned Tasks Today</span><i data-lucide="list-checks"></i></div>
                    <div class="task-list">
                        ${d.tasks.map(t => `
                            <div class="task-card-mini">
                                <i data-lucide="${t.status === 'Completed' ? 'check-circle' : 'circle'}"></i>
                                <div class="info">
                                    <h4>${t.title}</h4>
                                    <p>${t.location} | ${t.time}</p>
                                </div>
                                <div class="badge ${t.status === 'Completed' ? 'success' : t.status === 'Pending' ? 'warning' : 'info'}">${t.status}</div>
                            </div>
                        `).join("")}
                    </div>
                </div>
                <div class="card span-12">
                    <div class="card-top"><span>Quick Actions</span></div>
                    <div class="kpi-wrapper swipe-container" style="display: flex; gap: 10px;">
                        <button class="btn ghost swipe-card" style="flex-direction:column; height:80px; flex: 1; min-width: 100px;"><i data-lucide="camera"></i>Upload Work</button>
                        <button class="btn ghost swipe-card" style="flex-direction:column; height:80px; flex: 1; min-width: 100px;"><i data-lucide="package"></i>Request Material</button>
                        <button class="btn ghost swipe-card" style="flex-direction:column; height:80px; flex: 1; min-width: 100px;"><i data-lucide="alert-triangle"></i>Report Hazard</button>
                        <button class="btn ghost swipe-card" style="flex-direction:column; height:80px; flex: 1; min-width: 100px;"><i data-lucide="message-square"></i>Msg Engineer</button>
                    </div>
                </div>
            </div>
        `;
    }

    renderClientDashboard() {
        const d = BuildIQData.clientData;
        this.workspace.innerHTML = `
            <div class="page-head">
                <div><span class="eyebrow">Client Portal</span><h2>${d.project}</h2></div>
            </div>
            <div class="dashboard-grid">
                <div class="span-12 kpi-wrapper swipe-container">
                    <div class="card span-4 swipe-card">
                        <div class="card-top"><span>Completion</span><i data-lucide="trending-up"></i></div>
                        <strong style="font-size:36px;">${d.completion}%</strong>
                        <div class="progress-bar"><div class="progress-fill" style="width:${d.completion}%"></div></div>
                        <p style="margin-top:10px; font-size:12px; color:var(--text-muted);">Estimated Completion: <strong>${d.eta}</strong></p>
                    </div>
                    <div class="card span-8 swipe-card">
                        <div class="card-top"><span>Milestone Timeline</span><i data-lucide="calendar"></i></div>
                        <div style="display:flex; justify-content:space-between; position:relative; padding-top:20px;">
                            ${d.milestones.map(m => `
                                <div style="text-align:center; flex:1; position:relative; z-index:1;">
                                    <div style="width:12px; height:12px; border-radius:50%; background:${m.status === 'done' ? 'var(--success)' : m.status === 'active' ? 'var(--accent)' : 'var(--border)'}; margin:0 auto 10px;"></div>
                                    <strong style="font-size:12px; display:block;">${m.name}</strong>
                                    <span style="font-size:11px; color:var(--text-muted);">${m.date}</span>
                                </div>
                            `).join("")}
                            <div style="position:absolute; top:25px; left:12%; right:12%; height:2px; background:var(--border); z-index:0;"></div>
                        </div>
                    </div>
                </div>
                <div class="span-12 kpi-wrapper swipe-container">
                    <div class="card span-6 swipe-card">
                        <div class="card-top"><span>Payment Summary</span><i data-lucide="credit-card"></i></div>
                        <div class="metric-row"><span>Total Budget</span><strong>${d.budgetSummary.total}</strong></div>
                        <div class="metric-row"><span>Amount Paid</span><strong>${d.budgetSummary.spent}</strong></div>
                        <div class="metric-row"><span>Outstanding</span><strong class="warning-text">${d.budgetSummary.remaining}</strong></div>
                    </div>
                    <div class="card span-6 swipe-card">
                        <div class="card-top"><span>Latest Site Photos</span><i data-lucide="camera"></i></div>
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                            ${['skyline', 'droneSouth'].map((k) => `
                                <img src="${BuildIQData.images[k]}" style="width:100%; height:90px; object-fit:cover; border-radius:var(--radius-sm);" alt="Site Snapshot">
                            `).join("")}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderDrone() {
        const drone = BuildIQData.drone;
        const feeds = drone.feeds;
        const defaultFeed = feeds[0];

        this.workspace.innerHTML = `
            <div class="page-head">
                <div>
                    <span class="eyebrow">Surveillance</span>
                    <h2>Drone Control Center</h2>
                </div>
                <div class="page-actions">
                    <button class="btn ghost" id="drone-pointcloud-btn"><i data-lucide="crosshair"></i> Point Cloud</button>
                    <button class="btn primary" id="drone-patrol-btn"><i data-lucide="video"></i> Start Patrol</button>
                </div>
            </div>

            <div class="dashboard-grid drone-layout">
                <!-- MAIN LIVE FEED -->
                <div class="card span-9" style="padding: 0; border: none; background: transparent;">
                    <div class="card-top" style="padding: 16px;">
                        <span id="drone-feed-title">Live Feed — ${defaultFeed.name}</span>
                        <div style="display:flex; gap:8px; align-items:center;">
                            <div class="badge danger" id="drone-rec-badge" style="animation:pulse 1.5s infinite;">● REC</div>
                            <button class="btn ghost" style="height:28px; padding:0 8px;" id="drone-fullscreen-btn"><i data-lucide="maximize-2"></i></button>
                        </div>
                    </div>
                    <div class="drone-hero" id="drone-main-feed" style="height:480px; border-radius:var(--radius-lg); overflow:hidden; position:relative; cursor:crosshair;">
                        <img id="drone-main-img" src="${BuildIQData.images[defaultFeed.imageKey]}" style="width:100%; height:100%; object-fit:cover; transition:opacity 0.4s ease;" alt="Drone Live Feed">
                        <div class="scanline"></div>

                        <!-- AI Detection Overlay -->
                        <div id="drone-anomaly-box" style="position:absolute; top:22%; left:32%; width:90px; height:70px; border:2px dashed var(--danger); background:rgba(255,90,95,0.08); border-radius:4px; transition:all 0.3s;">
                            <span style="position:absolute; top:-18px; left:0; color:var(--danger); font-size:10px; font-family:'Inter',monospace; font-weight:700; background:rgba(255,90,95,0.9); color:#fff; padding:2px 6px; border-radius:3px; white-space:nowrap;">⚠ ANOMALY DETECTED</span>
                        </div>
                        <div style="position:absolute; top:55%; left:60%; width:60px; height:50px; border:1.5px solid var(--success); background:rgba(53,208,127,0.06); border-radius:4px;">
                            <span style="position:absolute; top:-18px; left:0; font-size:10px; font-weight:700; background:rgba(53,208,127,0.9); color:#fff; padding:2px 6px; border-radius:3px; white-space:nowrap;">✓ CLEARED</span>
                        </div>

                        <!-- HUD Overlay -->
                        <div class="drone-hud">
                            <div class="hud-top" style="display:flex; justify-content:space-between; width:100%;">
                                <span><i data-lucide="map-pin" style="width:14px; vertical-align:middle;"></i> 19.0760° N, 72.8777° E</span>
                                <span><i data-lucide="wifi" style="width:14px; vertical-align:middle;"></i> SIGNAL: 100%</span>
                            </div>
                            <div class="hud-bottom" style="display:flex; justify-content:space-between; width:100%;">
                                <span id="drone-target-label">TARGET: ${defaultFeed.name.toUpperCase().replace(/\s/g,'_')}</span>
                                <span style="color:var(--success)"><i data-lucide="cpu" style="width:14px; vertical-align:middle;"></i> AI_ASSIST: ON</span>
                            </div>
                        </div>
                    </div>

                    <!-- Drone Telemetry Bar -->
                    <div class="swipe-container" style="display:flex; gap:12px; margin-top:16px; margin-bottom: 0;">
                        <div class="swipe-card" style="flex: 0 0 auto; text-align:center; padding:12px 24px; background:var(--glass-bg); border-radius:var(--radius-md); border:1px solid var(--border);">
                            <span style="font-size:10px; color:var(--text-muted); text-transform:uppercase; font-weight:700; display:block; margin-bottom:4px;">Altitude</span>
                            <strong style="font-size:18px;" id="drone-altitude">${drone.altitude}</strong>
                        </div>
                        <div style="text-align:center; padding:12px; background:var(--glass-bg); border-radius:var(--radius-md); border:1px solid var(--border);">
                            <span style="font-size:10px; color:var(--text-muted); text-transform:uppercase; font-weight:700; display:block; margin-bottom:4px;">Battery</span>
                            <strong style="font-size:18px; color:var(--success);" id="drone-battery">${drone.battery}</strong>
                        </div>
                        <div style="text-align:center; padding:12px; background:var(--glass-bg); border-radius:var(--radius-md); border:1px solid var(--border);">
                            <span style="font-size:10px; color:var(--text-muted); text-transform:uppercase; font-weight:700; display:block; margin-bottom:4px;">Wind</span>
                            <strong style="font-size:18px;">${drone.wind}</strong>
                        </div>
                        <div style="text-align:center; padding:12px; background:var(--glass-bg); border-radius:var(--radius-md); border:1px solid var(--border);">
                            <span style="font-size:10px; color:var(--text-muted); text-transform:uppercase; font-weight:700; display:block; margin-bottom:4px;">Speed</span>
                            <strong style="font-size:18px;">8.4 m/s</strong>
                        </div>
                        <div style="text-align:center; padding:12px; background:var(--glass-bg); border-radius:var(--radius-md); border:1px solid var(--border);">
                            <span style="font-size:10px; color:var(--text-muted); text-transform:uppercase; font-weight:700; display:block; margin-bottom:4px;">Flight Time</span>
                            <strong style="font-size:18px;" id="drone-flight-time">00:14:32</strong>
                        </div>
                    </div>

                    <!-- Drone Control Buttons -->
                    <div class="mobile-column-actions" style="display:flex; gap:10px; margin-top:14px;">
                        <button class="btn ghost" id="drone-capture-btn" style="flex:1; height:40px;"><i data-lucide="camera"></i> Capture Snapshot</button>
                        <button class="btn ghost" id="drone-return-btn" style="flex:1; height:40px;"><i data-lucide="home"></i> Return to Base</button>
                        <button class="btn ghost" id="drone-ai-scan-btn" style="flex:1; height:40px;"><i data-lucide="scan"></i> AI Re-Scan</button>
                    </div>
                </div>

                <!-- FLEET STATUS SIDEBAR -->
                <div class="card span-3">
                    <div class="card-top"><span>Fleet Status (Swipe)</span><span style="font-size:11px; color:var(--text-muted); text-transform:none; font-weight:600;">${feeds.length} drones</span></div>
                    <div id="drone-feed-list" class="swipe-container" style="display:flex; gap:12px; margin-bottom:16px;">
                        ${feeds.map((f, i) => `
                            <div class="drone-feed-thumb swipe-card ${i === 0 ? 'active-feed' : ''}" data-feed-index="${i}" style="cursor:pointer; border-radius:var(--radius-md); overflow:hidden; border:2px solid ${i === 0 ? 'var(--accent)' : 'var(--border)'}; transition:all 0.25s; min-width: 140px;">
                                <div style="position:relative; height:90px; overflow:hidden;">
                                    <img src="${BuildIQData.images[f.imageKey] || BuildIQData.images.skyline}" style="width:100%; height:100%; object-fit:cover; opacity:0.75; transition:opacity 0.3s;" alt="${f.name}">
                                    <div style="position:absolute; top:6px; right:6px; display:flex; align-items:center; gap:4px; background:rgba(0,0,0,0.7); padding:2px 6px; border-radius:4px;">
                                        <div style="width:6px; height:6px; border-radius:50%; background:${f.status === 'Live' ? 'var(--success)' : f.status === 'Review' ? 'var(--warning)' : 'var(--text-dim)'}; ${f.status === 'Live' ? 'box-shadow:0 0 6px var(--success); animation:pulse 2s infinite;' : ''}"></div>
                                        <span style="font-size:9px; font-weight:700; color:#fff;">${f.status}</span>
                                    </div>
                                    <div style="position:absolute; bottom:0; left:0; right:0; padding:6px 8px; background:linear-gradient(transparent, rgba(0,0,0,0.8));">
                                        <span style="font-size:12px; font-weight:700; color:#fff;">${f.name}</span>
                                    </div>
                                </div>
                                <div style="padding:8px 10px; display:flex; justify-content:space-between; align-items:center; background:var(--glass-bg);">
                                    <span style="font-size:11px; color:var(--text-muted);">Progress: <strong style="color:var(--text-primary);">${f.progress}</strong></span>
                                    <span style="font-size:10px; color:var(--text-dim);">Batt: ${[84, 91, 67, 72][i]}%</span>
                                </div>
                            </div>
                        `).join("")}
                    </div>

                    <!-- Zone Progress -->
                    <div style="margin-bottom:16px;">
                        <div style="font-size:12px; font-weight:800; text-transform:uppercase; color:var(--text-secondary); letter-spacing:0.5px; margin-bottom:10px;">Zone Coverage</div>
                        ${drone.zones.map(z => `
                            <div style="margin-bottom:10px;">
                                <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                                    <span style="font-size:12px; color:var(--text-muted);">${z.name}</span>
                                    <strong style="font-size:12px; color:var(--${z.tone});">${z.value}%</strong>
                                </div>
                                <div class="progress-bar" style="margin:0;"><div class="progress-fill" style="width:${z.value}%; background:var(--${z.tone});"></div></div>
                            </div>
                        `).join("")}
                    </div>

                    <button class="btn ghost" id="drone-logs-btn" style="width:100%;"><i data-lucide="history"></i> Flight Logs</button>
                </div>

                <!-- AI ALERTS ROW -->
                <div class="card span-6">
                    <div class="card-top"><span>AI Detection Alerts</span><i data-lucide="sparkles"></i></div>
                    <div id="drone-alerts-list" style="display:grid; gap:10px;">
                        ${drone.alerts.map((a, i) => `
                            <div class="ai-alert-item ${a.tone}" id="drone-alert-${i}" style="transition:all 0.3s;">
                                <i data-lucide="${a.tone === 'success' ? 'check-circle' : a.tone === 'danger' ? 'alert-triangle' : 'alert-circle'}"></i>
                                <div style="flex:1;">
                                    <strong style="font-size:13px; display:block;">${a.label}</strong>
                                    <p style="font-size:12px; color:var(--text-muted);">${a.detail}</p>
                                </div>
                                <button class="btn ghost" style="height:24px; padding:0 6px; font-size:10px;" data-dismiss-alert="${i}">Dismiss</button>
                            </div>
                        `).join("")}
                    </div>
                </div>
                <div class="card span-6">
                    <div class="card-top"><span>Patrol Schedule</span><i data-lucide="clock"></i></div>
                    <div style="display:grid; gap:10px;">
                        ${[
                            { time: '06:00 AM', zone: 'Full Site Perimeter', status: 'Completed', tone: 'success' },
                            { time: '10:30 AM', zone: 'Tower B North Wing', status: 'In Progress', tone: 'info' },
                            { time: '02:00 PM', zone: 'Basement + Ramp Area', status: 'Scheduled', tone: 'warning' },
                            { time: '05:30 PM', zone: 'Evening Safety Sweep', status: 'Queued', tone: 'warning' }
                        ].map(p => `
                            <div style="display:flex; align-items:center; gap:12px; padding:10px 12px; border:1px solid var(--border); border-radius:var(--radius-md); background:var(--glass-bg);">
                                <strong style="font-size:13px; color:var(--accent-2); min-width:70px;">${p.time}</strong>
                                <span style="font-size:13px; flex:1;">${p.zone}</span>
                                <div class="badge ${p.tone}">${p.status}</div>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </div>
        `;

        this._initDroneInteractions(feeds);
    }

    _initDroneInteractions(feeds) {
        // Feed thumbnail switching
        const feedList = document.getElementById('drone-feed-list');
        const mainImg = document.getElementById('drone-main-img');
        const feedTitle = document.getElementById('drone-feed-title');
        const targetLabel = document.getElementById('drone-target-label');

        if (feedList) {
            feedList.addEventListener('click', (e) => {
                const thumb = e.target.closest('.drone-feed-thumb');
                if (!thumb) return;
                const idx = parseInt(thumb.dataset.feedIndex);
                const feed = feeds[idx];

                // Update active state
                feedList.querySelectorAll('.drone-feed-thumb').forEach(t => {
                    t.style.borderColor = 'var(--border)';
                    t.classList.remove('active-feed');
                });
                thumb.style.borderColor = 'var(--accent)';
                thumb.classList.add('active-feed');

                // Animate image switch
                mainImg.style.opacity = '0';
                setTimeout(() => {
                    mainImg.src = BuildIQData.images[feed.imageKey] || BuildIQData.images.skyline;
                    mainImg.style.opacity = '1';
                }, 300);

                feedTitle.textContent = `Live Feed — ${feed.name}`;
                targetLabel.textContent = `TARGET: ${feed.name.toUpperCase().replace(/\s/g, '_')}`;

                // Update REC badge
                const recBadge = document.getElementById('drone-rec-badge');
                if (recBadge) {
                    if (feed.status === 'Live') {
                        recBadge.className = 'badge danger';
                        recBadge.innerHTML = '● REC';
                        recBadge.style.animation = 'pulse 1.5s infinite';
                    } else if (feed.status === 'Review') {
                        recBadge.className = 'badge warning';
                        recBadge.innerHTML = '⏸ REVIEW';
                        recBadge.style.animation = 'none';
                    } else {
                        recBadge.className = 'badge info';
                        recBadge.innerHTML = '◼ ARCHIVED';
                        recBadge.style.animation = 'none';
                    }
                }
            });
        }

        // Capture Snapshot
        document.getElementById('drone-capture-btn')?.addEventListener('click', function() {
            const btn = this;
            btn.innerHTML = '<i data-lucide="check-circle"></i> Captured!';
            btn.style.borderColor = 'var(--success)';
            btn.style.color = 'var(--success)';
            if (window.lucide) lucide.createIcons();
            setTimeout(() => {
                btn.innerHTML = '<i data-lucide="camera"></i> Capture Snapshot';
                btn.style.borderColor = '';
                btn.style.color = '';
                if (window.lucide) lucide.createIcons();
            }, 2000);
        });

        // Return to Base
        document.getElementById('drone-return-btn')?.addEventListener('click', function() {
            const btn = this;
            btn.innerHTML = '<i data-lucide="loader"></i> Returning...';
            btn.style.borderColor = 'var(--warning)';
            btn.style.color = 'var(--warning)';
            if (window.lucide) lucide.createIcons();
            setTimeout(() => {
                btn.innerHTML = '<i data-lucide="check-circle"></i> Docked';
                btn.style.color = 'var(--success)';
                btn.style.borderColor = 'var(--success)';
                if (window.lucide) lucide.createIcons();
            }, 2500);
        });

        // AI Re-scan
        document.getElementById('drone-ai-scan-btn')?.addEventListener('click', function() {
            const btn = this;
            btn.innerHTML = '<i data-lucide="loader"></i> Scanning...';
            btn.style.borderColor = 'var(--accent)';
            btn.style.color = 'var(--accent)';
            if (window.lucide) lucide.createIcons();
            const anomaly = document.getElementById('drone-anomaly-box');
            if (anomaly) anomaly.style.opacity = '0.3';
            setTimeout(() => {
                btn.innerHTML = '<i data-lucide="check-circle"></i> Scan Complete — 2 items';
                btn.style.color = 'var(--success)';
                btn.style.borderColor = 'var(--success)';
                if (anomaly) anomaly.style.opacity = '1';
                if (window.lucide) lucide.createIcons();
            }, 3000);
        });

        // Start Patrol toggle
        document.getElementById('drone-patrol-btn')?.addEventListener('click', function() {
            const btn = this;
            if (btn.dataset.active === 'true') {
                btn.innerHTML = '<i data-lucide="video"></i> Start Patrol';
                btn.className = 'btn primary';
                btn.dataset.active = 'false';
            } else {
                btn.innerHTML = '<i data-lucide="video-off"></i> Stop Patrol';
                btn.style.background = 'linear-gradient(180deg, var(--danger), #c0392b)';
                btn.dataset.active = 'true';
            }
            if (window.lucide) lucide.createIcons();
        });

        // Point Cloud
        document.getElementById('drone-pointcloud-btn')?.addEventListener('click', function() {
            const btn = this;
            btn.innerHTML = '<i data-lucide="loader"></i> Generating...';
            if (window.lucide) lucide.createIcons();
            setTimeout(() => {
                btn.innerHTML = '<i data-lucide="check-circle"></i> Point Cloud Ready';
                btn.style.borderColor = 'var(--success)';
                btn.style.color = 'var(--success)';
                if (window.lucide) lucide.createIcons();
            }, 2000);
        });

        // Dismiss Alerts
        document.querySelectorAll('[data-dismiss-alert]').forEach(btn => {
            btn.addEventListener('click', () => {
                const alertEl = document.getElementById(`drone-alert-${btn.dataset.dismissAlert}`);
                if (alertEl) {
                    alertEl.style.opacity = '0';
                    alertEl.style.transform = 'translateX(20px)';
                    setTimeout(() => alertEl.remove(), 300);
                }
            });
        });

        // Flight Logs modal
        document.getElementById('drone-logs-btn')?.addEventListener('click', function() {
            const btn = this;
            btn.innerHTML = '<i data-lucide="check"></i> Logs Exported';
            btn.style.borderColor = 'var(--success)';
            btn.style.color = 'var(--success)';
            if (window.lucide) lucide.createIcons();
            setTimeout(() => {
                btn.innerHTML = '<i data-lucide="history"></i> Flight Logs';
                btn.style.borderColor = '';
                btn.style.color = '';
                if (window.lucide) lucide.createIcons();
            }, 2000);
        });

        // Fullscreen toggle
        document.getElementById('drone-fullscreen-btn')?.addEventListener('click', () => {
            const hero = document.getElementById('drone-main-feed');
            if (hero) {
                if (!document.fullscreenElement) {
                    hero.requestFullscreen?.();
                } else {
                    document.exitFullscreen?.();
                }
            }
        });

        // Live flight time counter
        let seconds = 872;
        this._droneTimer = setInterval(() => {
            seconds++;
            const el = document.getElementById('drone-flight-time');
            if (!el) { clearInterval(this._droneTimer); return; }
            const m = Math.floor(seconds / 60);
            const s = seconds % 60;
            el.textContent = `00:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
        }, 1000);
    }

    renderWaste() {
        this.workspace.innerHTML = `
            <div class="page-head">
                <div>
                    <span class="eyebrow">Sustainability</span>
                    <h2>Waste Analytics</h2>
                </div>
                <div class="page-actions">
                    <button class="btn ghost"><i data-lucide="file-bar-chart"></i> ESG Report</button>
                </div>
            </div>
            <div class="dashboard-grid">
                <div class="card span-12">
                    <div class="card-top"><span>Predictive AI Waste Models</span><i data-lucide="brain"></i></div>
                    <div class="swipe-container" style="display:flex; gap:20px;">
                        <div class="swipe-card" style="flex:1; padding:20px; background:rgba(255,255,255,0.02); border:1px solid var(--border); border-radius:var(--radius-md);">
                            <strong style="color:var(--danger); display:block; margin-bottom:8px;"><i data-lucide="alert-triangle" style="width:16px;"></i> High Risk: Concrete Waste</strong>
                            <p style="font-size:13px; color:var(--text-secondary); line-height:1.5;">Based on current forming techniques on Tower B, the AI predicts a 12% over-consumption of concrete in the next pour. Recommend switching to modular formworks.</p>
                            <button class="btn ghost" style="margin-top:12px; height:32px; font-size:12px; width: 100%;">Review Action Plan</button>
                        </div>
                        <div class="swipe-card" style="flex:1; padding:20px; background:rgba(255,255,255,0.02); border:1px solid var(--border); border-radius:var(--radius-md);">
                            <strong style="color:var(--success); display:block; margin-bottom:8px;"><i data-lucide="check-circle" style="width:16px;"></i> Optimal: Steel Rebar</strong>
                            <p style="font-size:13px; color:var(--text-secondary); line-height:1.5;">Cut-off waste is maintained below 2%. The automated cutting schedules generated last week have successfully reduced scrap by 1.4 tons.</p>
                        </div>
                    </div>
                </div>

                <div class="span-12 kpi-wrapper swipe-container">
                    ${BuildIQData.waste.dailyReport.map(w => `
                        <div class="card span-4 swipe-card">
                            <div class="card-top">
                                <span>${w.material} Loss</span>
                                <i data-lucide="${w.icon}"></i>
                            </div>
                            <div style="display:flex; align-items:baseline; gap:12px;">
                                <strong style="font-size:36px;">${w.value}</strong>
                            </div>
                            <div class="progress-bar" style="margin:12px 0;">
                                <div class="progress-fill" style="width:${w.trend.startsWith('+') ? '80%' : '30%'}; background:${w.trend.startsWith('+') ? 'var(--danger)' : 'var(--success)'};"></div>
                            </div>
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <p style="color:var(--text-muted); font-size:12px;">Daily Limit vs Actual</p>
                                <div class="badge ${w.trend.startsWith('+') ? 'danger' : 'success'}">${w.trend} vs baseline</div>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `;
    }

    renderPlans() {
        this.workspace.innerHTML = `
            <div class="page-head">
                <div>
                    <span class="eyebrow">IS Code Checking</span>
                    <h2>AI Plan Verification</h2>
                </div>
                <div class="page-actions">
                    <button class="btn ghost"><i data-lucide="upload-cloud"></i> Upload DWG/Revit</button>
                    <button class="btn primary"><i data-lucide="play"></i> Run Auto-Check</button>
                </div>
            </div>
            <div class="dashboard-grid">
                <div class="card span-8">
                    <div class="card-top">
                        <span>Model Viewer (LEVEL_18_STRUCTURAL_v2.dwg)</span>
                        <div style="display:flex; gap:8px;">
                            <button class="btn ghost" style="height:24px; padding:0 8px;"><i data-lucide="zoom-in"></i></button>
                            <button class="btn ghost" style="height:24px; padding:0 8px;"><i data-lucide="zoom-out"></i></button>
                        </div>
                    </div>
                    <div class="plan-blueprint" style="height:450px; background:#1e2025; border-radius:var(--radius-sm); border:1px solid var(--border); position:relative; overflow:hidden;">
                        <div style="position:absolute; inset:0; background-image: radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px); background-size:20px 20px;"></div>
                        <div class="blueprint-overlay" style="position:absolute; inset:0;">
                            <div class="check-marker fail" style="top:25%; left:35%; position:absolute; width:24px; height:24px; background:rgba(255,90,95,0.2); border:1px solid var(--danger); color:var(--danger); border-radius:50%; display:grid; place-items:center; font-size:12px; cursor:pointer; box-shadow:0 0 10px rgba(255,90,95,0.4);">!</div>
                            <div class="check-marker fail" style="top:60%; left:75%; position:absolute; width:24px; height:24px; background:rgba(255,90,95,0.2); border:1px solid var(--danger); color:var(--danger); border-radius:50%; display:grid; place-items:center; font-size:12px; cursor:pointer; box-shadow:0 0 10px rgba(255,90,95,0.4);">!</div>
                            <div class="check-marker pass" style="top:80%; left:20%; position:absolute; width:24px; height:24px; background:rgba(53,208,127,0.2); border:1px solid var(--success); color:var(--success); border-radius:50%; display:grid; place-items:center; font-size:12px; cursor:pointer;">✓</div>
                            <!-- Mock walls -->
                            <div style="position:absolute; top:20%; left:20%; width:60%; height:4px; background:var(--accent);"></div>
                            <div style="position:absolute; top:20%; left:80%; width:4px; height:50%; background:var(--accent);"></div>
                            <div style="position:absolute; top:70%; left:20%; width:60%; height:4px; background:var(--accent);"></div>
                            <div style="position:absolute; top:20%; left:20%; width:4px; height:50%; background:var(--accent);"></div>
                        </div>
                    </div>
                </div>
                <div class="card span-4">
                    <div class="card-top">
                        <span>Verification Results</span>
                        <div class="badge danger">2 Violations</div>
                    </div>
                    <div style="display:grid; gap:12px;">
                        ${BuildIQData.planVerification.checks.map(c => `
                            <div class="ai-alert-item ${c.tone}" style="padding:16px; border:1px solid ${c.tone === 'danger' ? 'rgba(255,90,95,0.3)' : 'var(--border)'}; background:${c.tone === 'danger' ? 'rgba(255,90,95,0.05)' : 'rgba(255,255,255,0.02)'}; border-radius:var(--radius-md);">
                                <i data-lucide="${c.tone === 'success' ? 'check-circle' : 'alert-triangle'}" style="color:var(--${c.tone});"></i>
                                <div>
                                    <strong style="display:block; font-size:14px; margin-bottom:6px;">${c.title}</strong>
                                    <p style="font-size:13px; color:var(--text-secondary); line-height:1.5;">${c.fix}</p>
                                </div>
                            </div>
                        `).join("")}
                    </div>
                    <button class="btn primary" style="width:100%; margin-top:20px;">Generate Audit Report</button>
                </div>
            </div>
        `;
    }

    renderTasks() {
        this.workspace.innerHTML = `
            <div class="page-head">
                <div>
                    <span class="eyebrow">Team Management</span>
                    <h2>Engineering Kanban</h2>
                </div>
                <div class="page-actions">
                    <div style="display:flex; align-items:center; margin-right:16px;">
                        <div class="avatar" style="width:28px; height:28px; font-size:10px; margin-right:-8px; border:2px solid var(--bg-card);">RS</div>
                        <div class="avatar" style="width:28px; height:28px; font-size:10px; margin-right:-8px; border:2px solid var(--bg-card);">VK</div>
                        <div class="avatar" style="width:28px; height:28px; font-size:10px; border:2px solid var(--bg-card); background:var(--accent); color:#000;">+3</div>
                    </div>
                    <button class="btn primary"><i data-lucide="plus"></i> Create Task</button>
                </div>
            </div>
            
            <!-- Kanban Board -->
            <div class="task-board" style="display:grid; grid-template-columns:repeat(4, 1fr); gap:20px; overflow-x:auto; padding-bottom:20px; min-height:600px;">
                ${['pending', 'inProgress', 'review', 'completed'].map(col => `
                    <div style="display:flex; flex-direction:column; gap:12px; background:rgba(255,255,255,0.02); padding:16px; border-radius:var(--radius-lg); border:1px solid var(--border);">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                            <h4 style="text-transform:uppercase; font-size:12px; font-weight:700; color:var(--text-secondary); letter-spacing:1px;">
                                ${col === 'pending' ? 'To Do' : col === 'inProgress' ? 'In Progress' : col === 'review' ? 'In Review' : 'Done'}
                            </h4>
                            <span style="font-size:11px; background:var(--glass-bg); padding:2px 8px; border-radius:10px; color:var(--text-muted);">${BuildIQData.tasks[col].length}</span>
                        </div>
                        
                        <div style="display:flex; flex-direction:column; gap:12px; min-height:100px;">
                            ${BuildIQData.tasks[col].map(t => `
                                <div class="card" style="padding:16px; cursor:grab; border-top:3px solid ${t.priority === 'high' ? 'var(--danger)' : t.priority === 'medium' ? 'var(--warning)' : 'var(--accent)'}; transition:all 0.2s;">
                                    <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                                        <div class="badge ${t.priority === 'high' ? 'danger' : t.priority === 'medium' ? 'warning' : 'info'}" style="font-size:10px; padding:2px 6px;">${t.priority}</div>
                                        <i data-lucide="more-horizontal" style="width:16px; color:var(--text-muted); cursor:pointer;"></i>
                                    </div>
                                    <strong style="font-size:14px; display:block; margin-bottom:12px; line-height:1.4;">${t.title}</strong>
                                    <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border); padding-top:12px;">
                                        <div style="display:flex; align-items:center; gap:6px;">
                                            <div class="avatar" style="width:20px; height:20px; font-size:9px;">${t.assignee.split(' ').map(n=>n[0]).join('')}</div>
                                            <span style="font-size:11px; color:var(--text-muted);">${t.assignee.split(' ')[0]}</span>
                                        </div>
                                        <span style="font-size:11px; color:var(--text-dim); display:flex; align-items:center; gap:4px;"><i data-lucide="paperclip" style="width:12px;"></i> 2</span>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                        <button class="btn ghost" style="width:100%; border:1px dashed var(--border); color:var(--text-muted); margin-top:auto;"><i data-lucide="plus"></i> Add card</button>
                    </div>
                `).join("")}
            </div>
        `;
    }

    renderProjects() {
        const p = BuildIQData.projects;
        this.workspace.innerHTML = `
            <div class="page-head">
                <div>
                    <span class="eyebrow">Portfolio</span>
                    <h2>All Projects</h2>
                </div>
                <div class="page-actions">
                    <button class="btn ghost"><i data-lucide="layout-template"></i> Templates</button>
                    <button class="btn primary"><i data-lucide="plus"></i> New Project</button>
                </div>
            </div>
            
            <div class="dashboard-grid">
                ${p.map(pr => `
                    <div class="card span-6">
                        <div class="card-top">
                            <span>${pr.name}</span>
                            <div class="badge ${pr.delayRisk > 40 ? 'danger' : pr.delayRisk > 20 ? 'warning' : 'success'}">${pr.delayRisk}% risk</div>
                        </div>
                        <div class="mobile-column project-details-grid" style="display:flex; gap:16px; align-items:center;">
                            <img src="${BuildIQData.images[pr.imageKey]}" class="project-thumb" style="width:140px; height:90px; object-fit:cover; border-radius:var(--radius-sm);" alt="${pr.name}">
                            <div style="flex:1; width: 100%;">
                                <strong style="font-size:22px; display:block; margin-bottom:4px;">${pr.completion}% Complete</strong>
                                <div class="progress-bar"><div class="progress-fill" style="width:${pr.completion}%"></div></div>
                                <p style="font-size:12px; color:var(--text-muted); margin-top:10px;">${pr.location} · ${pr.team} workers · ${pr.phase}</p>
                                <div style="display:flex; justify-content:space-between; margin-top:8px;">
                                    <span style="font-size:12px; color:var(--text-secondary)">Budget: <strong>${pr.budgetUsed} / ${pr.budgetTotal}</strong></span>
                                    <span style="font-size:12px; color:var(--text-secondary)">Deadline: <strong>${pr.deadline}</strong></span>
                                </div>
                            </div>
                        </div>
                        <div class="mobile-column-actions" style="display:flex; gap:8px; margin-top:16px; padding-top:16px; border-top:1px solid var(--border);">
                            <button class="btn ghost" style="flex:1; height:40px; font-size:13px;"><i data-lucide="eye"></i> View details</button>
                            <button class="btn ghost" style="flex:1; height:40px; font-size:13px;"><i data-lucide="archive"></i> Archive</button>
                        </div>
                    </div>
                `).join("")}
            </div>
        `;
    }

    renderTeams() {
        const t = BuildIQData.teams;
        this.workspace.innerHTML = `
            <div class="page-head">
                <div>
                    <span class="eyebrow">HR</span>
                    <h2>Team Management</h2>
                </div>
                <div class="page-actions">
                    <button class="btn primary"><i data-lucide="user-plus"></i> Add Member</button>
                </div>
            </div>
            <div class="dashboard-grid">
                ${t.slice(0, 3).map(tm => `
                    <div class="card span-4">
                        <div class="card-top">
                            <span>${tm.role}</span>
                            <div class="badge info">${tm.count} members</div>
                        </div>
                        <div class="metric-row"><span>Attendance</span><strong>${tm.attendance}%</strong></div>
                        <div class="progress-bar"><div class="progress-fill" style="width:${tm.attendance}%"></div></div>
                        <div class="metric-row"><span>Productivity</span><strong>${tm.productivity}%</strong></div>
                        <div class="metric-row"><span>Lead</span><strong>${tm.lead}</strong></div>
                    </div>
                `).join("")}
                <div class="card span-12">
                    <div class="card-top"><span>Active Teams</span></div>
                    <div style="overflow-x: auto;">
                        <table class="data-table" style="min-width: 600px;">
                        <thead>
                            <tr>
                                <th>Team</th><th>Count</th><th>Attendance</th><th>Productivity</th>
                                <th>Tasks</th><th>Shift</th><th>Safety</th><th>Lead</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${t.map(tm => `
                                <tr>
                                    <td><strong>${tm.role}</strong></td>
                                    <td>${tm.count}</td>
                                    <td>${tm.attendance}%</td>
                                    <td>${tm.productivity}%</td>
                                    <td>${tm.tasks}</td>
                                    <td>${tm.shift}</td>
                                    <td><div class="badge ${tm.safety > 95 ? 'success' : 'warning'}">${tm.safety}%</div></td>
                                    <td>${tm.lead}</td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    renderBudget() {
        const b = BuildIQData.budget;
        this.workspace.innerHTML = `
            <div class="page-head">
                <div>
                    <span class="eyebrow">Finance</span>
                    <h2>Budget Control Center</h2>
                </div>
                <div class="page-actions">
                    <button class="btn ghost"><i data-lucide="file-spreadsheet"></i> CSV Export</button>
                    <button class="btn primary"><i data-lucide="download"></i> Download Report</button>
                </div>
            </div>
            <div class="dashboard-grid">
                <div class="card span-3">
                    <div class="card-top"><span>Allocated</span><i data-lucide="briefcase"></i></div>
                    <strong style="font-size:32px">${b.allocated}</strong>
                    <p style="font-size:12px; color:var(--text-muted); margin-top:8px;">Total project budget</p>
                </div>
                <div class="card span-3">
                    <div class="card-top"><span>Used</span><i data-lucide="wallet"></i></div>
                    <strong style="font-size:32px">${b.used}</strong>
                    <div class="progress-bar"><div class="progress-fill" style="width:73%"></div></div>
                    <p style="font-size:12px; color:var(--text-muted); margin-top:8px;">73% utilization</p>
                </div>
                <div class="card span-3">
                    <div class="card-top"><span>Remaining</span><i data-lucide="landmark"></i></div>
                    <strong style="font-size:32px; color:var(--success)">${b.remaining}</strong>
                    <p style="font-size:12px; color:var(--text-muted); margin-top:8px;">Available funds</p>
                </div>
                <div class="card span-3">
                    <div class="card-top"><span>Forecast Overrun</span><i data-lucide="triangle-alert"></i></div>
                    <strong style="font-size:32px; color:var(--danger)">${b.overrunRisk}</strong>
                    <p style="font-size:12px; color:var(--text-muted); margin-top:8px;">Projected variance</p>
                </div>
                
                <div class="card span-8">
                    <div class="card-top"><span>Budget Consumption vs Timeline</span><i data-lucide="bar-chart-2"></i></div>
                    <div style="height: 250px; width: 100%; position: relative;">
                        <canvas id="budgetTimelineChart"></canvas>
                    </div>
                </div>

                <div class="card span-4">
                    <div class="card-top"><span>Cost Signals</span><i data-lucide="radar"></i></div>
                    <div style="display:grid; gap:12px;">
                        ${b.costSignals.map(s => `
                            <div class="metric-row">
                                <span>${s.label}</span>
                                <strong style="color:var(--${s.tone})">${s.value}</strong>
                            </div>
                        `).join("")}
                    </div>
                </div>

                <div class="card span-12">
                    <div class="card-top">
                        <span>Vendor Payments</span>
                        <div class="badge warning">${b.vendors.length} tracked</div>
                    </div>
                    <div style="overflow-x:auto;">
                        <table class="data-table" style="min-width:600px;">
                            <thead>
                                <tr>
                                    <th>Vendor</th><th>Service/Material</th><th>Status</th><th>Amount Due</th><th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${b.vendors.map(v => `
                                    <tr>
                                        <td><strong>${v.name}</strong></td>
                                        <td>${['Cement Supply', 'Steel Rebar', 'Heavy Equipment'][Math.floor(Math.random()*3)]}</td>
                                        <td><div class="badge ${v.status === 'Overdue' ? 'danger' : 'warning'}">${v.status}</div></td>
                                        <td><strong>${v.due}</strong></td>
                                        <td><button class="btn ghost" style="height:28px; font-size:12px;">Review</button></td>
                                    </tr>
                                `).join("")}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
        // Timeout to render chart after DOM update
        setTimeout(() => {
            if (typeof Chart === 'undefined') return;
            const ctx = document.getElementById('budgetTimelineChart');
            if(ctx) {
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Q1', 'Q2', 'Q3', 'Q4 (Proj)'],
                        datasets: [
                            { label: 'Planned', data: [40, 50, 60, 50], backgroundColor: '#2a2e35' },
                            { label: 'Actual', data: [42, 55, 68, 0], backgroundColor: '#f97316' }
                        ]
                    },
                    options: { maintainAspectRatio: false, scales: { y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' } }, x: { grid: { display: false } } } }
                });
            }
        }, 100);
    }

    renderReports() {
        const r = BuildIQData.reports;
        this.workspace.innerHTML = `
            <div class="page-head">
                <div>
                    <span class="eyebrow">Export</span>
                    <h2>Report Center</h2>
                </div>
                <div class="page-actions">
                    <button class="btn primary"><i data-lucide="file-output"></i> Generate Report</button>
                </div>
            </div>
            
            <div style="display:flex; gap:16px; margin-bottom:20px; border-bottom:1px solid var(--border); padding-bottom:16px;">
                <button class="badge info">All Reports</button>
                <button class="badge ghost" style="border-color:var(--border)">Finance</button>
                <button class="badge ghost" style="border-color:var(--border)">Site Progress</button>
                <button class="badge ghost" style="border-color:var(--border)">Waste Analytics</button>
                <button class="badge ghost" style="border-color:var(--border)">Compliance</button>
            </div>

            <div class="dashboard-grid">
                ${r.map(rp => `
                    <div class="card span-4">
                        <div class="card-top">
                            <span>${rp.title}</span>
                            <div class="badge ${rp.status === 'Ready' || rp.status === 'Approved' ? 'success' : 'warning'}">${rp.status}</div>
                        </div>
                        <p style="color:var(--text-muted); font-size:13px; margin-bottom:20px; line-height:1.5;">${rp.detail}</p>
                        <div style="display:flex; gap:8px;">
                            <button class="btn ghost" style="flex:1; height:36px;"><i data-lucide="download"></i> PDF</button>
                            <button class="btn ghost" style="flex:1; height:36px;"><i data-lucide="table"></i> Excel</button>
                            <button class="btn ghost" style="flex:1; height:36px;"><i data-lucide="share-2"></i> Share</button>
                        </div>
                    </div>
                `).join("")}
            </div>
        `;
    }

    renderNotifications(){const n=BuildIQData.notifications;this.workspace.innerHTML=`<div class="page-head"><div><span class="eyebrow">Alerts</span><h2>Notifications</h2></div><div class="page-actions"><button class="btn ghost"><i data-lucide="check-check"></i> Mark All Read</button></div></div><div class="dashboard-grid"><div class="card span-8"><div class="card-top"><span>Live Feed</span><div class="badge warning">${n.length} unread</div></div>${n.map(nt=>`<div class="ai-alert-item ${nt.tone}" style="margin-bottom:10px"><i data-lucide="${nt.tone==='success'?'check-circle':nt.tone==='danger'?'x-circle':'alert-circle'}"></i><div style="flex:1"><strong style="display:block;font-size:13px">${nt.title}</strong><p style="font-size:12px;color:var(--text-muted)">${nt.detail}</p></div><span style="font-size:11px;color:var(--text-dim);white-space:nowrap">${nt.time}</span></div>`).join("")}</div><div class="card span-4"><div class="card-top"><span>Alert Rules</span><i data-lucide="sliders-horizontal"></i></div>${['Delay risk > 40%','Waste spike > 10%','Budget needs approval','Drone safety issue','Client opens report'].map(rule=>`<div class="metric-row"><span>${rule}</span><input type="checkbox" checked style="accent-color:var(--accent);width:18px;height:18px"></div>`).join("")}</div></div>`;}

    renderSettings() {
        const u = BuildIQData.users[this.currentRole];
        this.workspace.innerHTML = `
            <div class="page-head">
                <div>
                    <span class="eyebrow">Account</span>
                    <h2>Platform Settings</h2>
                </div>
                <div class="page-actions">
                    <button class="btn primary"><i data-lucide="save"></i> Save Changes</button>
                </div>
            </div>
            
            <div style="display:flex; gap:16px; margin-bottom:20px; border-bottom:1px solid var(--border); padding-bottom:16px;">
                <button class="badge info">Profile & Branding</button>
                <button class="badge ghost" style="border-color:var(--border)">Notifications</button>
                <button class="badge ghost" style="border-color:var(--border)">Integrations</button>
                <button class="badge ghost" style="border-color:var(--border)">Security</button>
            </div>

            <div class="dashboard-grid">
                <div class="card span-6">
                    <div class="card-top"><span>Profile & Organization</span><i data-lucide="user"></i></div>
                    <div style="display:flex; gap:20px; align-items:center; margin-bottom:24px;">
                        <div class="avatar" style="width:80px; height:80px; font-size:24px;">${u.initials}</div>
                        <div>
                            <strong style="font-size:20px; display:block; margin-bottom:4px;">${u.name}</strong>
                            <p style="color:var(--text-muted);">${u.role} · ${u.company}</p>
                            <p style="color:var(--text-muted); font-size:12px;">${u.email}</p>
                        </div>
                    </div>
                    <div class="metric-row" style="padding:12px 0;"><span>Language</span><strong>English (US)</strong></div>
                    <div class="metric-row" style="padding:12px 0;"><span>Timezone</span><strong>Asia/Kolkata (IST)</strong></div>
                    <div class="metric-row" style="padding:12px 0;"><span>Branding Theme</span><div class="badge warning">Enterprise Dark</div></div>
                </div>
                
                <div class="card span-6">
                    <div class="card-top"><span>System Integrations</span><i data-lucide="puzzle"></i></div>
                    <div style="display:flex; flex-direction:column; gap:8px;">
                        <div class="metric-row" style="padding:10px 0;">
                            <span><i data-lucide="camera" style="width:14px; margin-right:8px; vertical-align:middle;"></i> Drone Surveillance API</span>
                            <div class="badge success">Connected</div>
                        </div>
                        <div class="metric-row" style="padding:10px 0;">
                            <span><i data-lucide="cloud" style="width:14px; margin-right:8px; vertical-align:middle;"></i> Weather Service</span>
                            <div class="badge success">Active</div>
                        </div>
                        <div class="metric-row" style="padding:10px 0;">
                            <span><i data-lucide="cpu" style="width:14px; margin-right:8px; vertical-align:middle;"></i> AI Plan Verification Engine</span>
                            <div class="badge success">Online</div>
                        </div>
                        <div class="metric-row" style="padding:10px 0;">
                            <span><i data-lucide="database" style="width:14px; margin-right:8px; vertical-align:middle;"></i> ERP Sync (SAP/Oracle)</span>
                            <div class="badge warning">Pending Setup</div>
                        </div>
                        <div class="metric-row" style="padding:10px 0;">
                            <span><i data-lucide="lock" style="width:14px; margin-right:8px; vertical-align:middle;"></i> SSO / SAML Login</span>
                            <div class="badge success">Active</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderUsers() {
        const c = BuildIQData.adminStats.userCounts;
        this.workspace.innerHTML = `
            <div class="page-head">
                <div>
                    <span class="eyebrow">Admin</span>
                    <h2>User Management</h2>
                </div>
                <div class="page-actions">
                    <button class="btn ghost"><i data-lucide="shield"></i> Permissions</button>
                    <button class="btn primary"><i data-lucide="user-plus"></i> Add User</button>
                </div>
            </div>
            
            <div class="dashboard-grid">
                <div class="card span-3">
                    <div class="card-top"><span>Workers</span><i data-lucide="hard-hat"></i></div>
                    <strong style="font-size:32px">${c.workers}</strong>
                    <p style="color:var(--text-muted);font-size:12px; margin-top:4px;">Active field workers</p>
                </div>
                <div class="card span-3">
                    <div class="card-top"><span>Engineers</span><i data-lucide="compass"></i></div>
                    <strong style="font-size:32px">${c.engineers}</strong>
                    <p style="color:var(--text-muted);font-size:12px; margin-top:4px;">Site & project engineers</p>
                </div>
                <div class="card span-3">
                    <div class="card-top"><span>Clients</span><i data-lucide="building"></i></div>
                    <strong style="font-size:32px">${c.clients}</strong>
                    <p style="color:var(--text-muted);font-size:12px; margin-top:4px;">Property owners</p>
                </div>
                <div class="card span-3">
                    <div class="card-top"><span>Vendors</span><i data-lucide="truck"></i></div>
                    <strong style="font-size:32px">${c.vendors}</strong>
                    <p style="color:var(--text-muted);font-size:12px; margin-top:4px;">Material suppliers</p>
                </div>
                
                <div class="card span-12">
                    <div class="card-top">
                        <span>Directory</span>
                        <div style="display:flex; gap:8px;">
                            <button class="badge info">All</button>
                            <button class="badge ghost" style="border-color:var(--border)">Engineers</button>
                            <button class="badge ghost" style="border-color:var(--border)">Workers</button>
                            <button class="badge ghost" style="border-color:var(--border)">Clients</button>
                        </div>
                    </div>
                    <div style="overflow-x: auto;">
                        <table class="data-table" style="min-width: 600px;">
                            <thead>
                                <tr>
                                    <th>Name</th><th>Role</th><th>Email</th><th>Status</th><th>Last Active</th><th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><div style="display:flex;align-items:center;gap:10px;"><div class="avatar" style="width:24px;height:24px;font-size:10px;">RS</div><strong>Riya Shah</strong></div></td>
                                    <td>Engineer</td><td>riya@buildiq.ai</td><td><div class="badge success">Active</div></td><td>2 min ago</td>
                                    <td><button class="btn ghost" style="height:28px;padding:0 8px;"><i data-lucide="more-horizontal"></i></button></td>
                                </tr>
                                <tr>
                                    <td><div style="display:flex;align-items:center;gap:10px;"><div class="avatar" style="width:24px;height:24px;font-size:10px;">KS</div><strong>Karan Singh</strong></div></td>
                                    <td>Worker</td><td>karan@buildiq.ai</td><td><div class="badge success">On Site</div></td><td>Now</td>
                                    <td><button class="btn ghost" style="height:28px;padding:0 8px;"><i data-lucide="more-horizontal"></i></button></td>
                                </tr>
                                <tr>
                                    <td><div style="display:flex;align-items:center;gap:10px;"><div class="avatar" style="width:24px;height:24px;font-size:10px;">VK</div><strong>Vikram Kapoor</strong></div></td>
                                    <td>Client</td><td>vikram@kapoor.com</td><td><div class="badge info">Viewing</div></td><td>1h ago</td>
                                    <td><button class="btn ghost" style="height:28px;padding:0 8px;"><i data-lucide="more-horizontal"></i></button></td>
                                </tr>
                                <tr>
                                    <td><div style="display:flex;align-items:center;gap:10px;"><div class="avatar" style="width:24px;height:24px;font-size:10px;">IA</div><strong>Imran Ali</strong></div></td>
                                    <td>Contractor</td><td>imran@build.co</td><td><div class="badge warning">Away</div></td><td>3h ago</td>
                                    <td><button class="btn ghost" style="height:28px;padding:0 8px;"><i data-lucide="more-horizontal"></i></button></td>
                                </tr>
                                <tr>
                                    <td><div style="display:flex;align-items:center;gap:10px;"><div class="avatar" style="width:24px;height:24px;font-size:10px;">MI</div><strong>Meera Iyer</strong></div></td>
                                    <td>Architect</td><td>meera@design.in</td><td><div class="badge success">Active</div></td><td>15 min ago</td>
                                    <td><button class="btn ghost" style="height:28px;padding:0 8px;"><i data-lucide="more-horizontal"></i></button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    renderAnalytics() {
        this.workspace.innerHTML = `
            <div class="page-head">
                <div>
                    <span class="eyebrow">Intelligence</span>
                    <h2>Analytics Center</h2>
                </div>
                <div class="page-actions">
                    <button class="btn ghost"><i data-lucide="calendar"></i> This Quarter</button>
                </div>
            </div>
            
            <div class="dashboard-grid">
                <div class="card span-4">
                    <div class="card-top"><span>Compare Projects (Completion)</span><i data-lucide="git-compare"></i></div>
                    <div style="display:flex; flex-direction:column; gap:16px;">
                        ${BuildIQData.projects.map(p => `
                            <div>
                                <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
                                    <span style="font-size:13px">${p.name}</span>
                                    <strong style="font-size:13px">${p.completion}%</strong>
                                </div>
                                <div class="progress-bar"><div class="progress-fill" style="width:${p.completion}%"></div></div>
                            </div>
                        `).join("")}
                    </div>
                </div>
                
                <div class="card span-4">
                    <div class="card-top"><span>Resource Efficiency</span><i data-lucide="gauge"></i></div>
                    <div style="display:flex; flex-direction:column; gap:12px;">
                        <div class="metric-row"><span>Labor Utilization</span><strong>84%</strong></div>
                        <div class="metric-row"><span>Equipment Usage</span><strong>72%</strong></div>
                        <div class="metric-row"><span>Material Efficiency</span><strong>91%</strong></div>
                        <div class="metric-row"><span>Cost per sqft</span><strong>₹2,840</strong></div>
                        <div class="metric-row"><span>Overtime Cost</span><strong class="warning-text">+4.2%</strong></div>
                    </div>
                </div>
                
                <div class="card span-4">
                    <div class="card-top"><span>Delay Trends</span><i data-lucide="trending-down"></i></div>
                    <div style="display:flex; flex-direction:column; gap:12px;">
                        ${BuildIQData.projects.map(p => `
                            <div class="metric-row">
                                <span>${p.name}</span>
                                <strong style="color:${p.delayRisk > 40 ? 'var(--danger)' : p.delayRisk > 20 ? 'var(--warning)' : 'var(--success)'}">${p.delayRisk}% risk</strong>
                            </div>
                        `).join("")}
                    </div>
                </div>
                
                <div class="card span-6">
                    <div class="card-top"><span>Cost Efficiency & Profitability</span><i data-lucide="indian-rupee"></i></div>
                    <div style="display:flex; flex-direction:column; gap:12px;">
                        <div class="metric-row"><span>Revenue YTD</span><strong>₹124 Cr</strong></div>
                        <div class="metric-row"><span>Costs YTD</span><strong>₹98.6 Cr</strong></div>
                        <div class="metric-row"><span>Margin</span><strong style="color:var(--success)">20.5%</strong></div>
                        <div class="metric-row"><span>Forecast EOY</span><strong>₹186 Cr</strong></div>
                    </div>
                </div>
                
                <div class="card span-6">
                    <div class="card-top"><span>Productivity Trends</span><i data-lucide="bar-chart-3"></i></div>
                    <div style="display:flex; flex-direction:column; gap:12px;">
                        <div class="metric-row"><span>This Week</span><strong>87% avg</strong></div>
                        <div class="metric-row"><span>Last Week</span><strong>82% avg</strong></div>
                        <div class="metric-row"><span>Monthly Best</span><strong style="color:var(--success)">Week 14 — 91%</strong></div>
                        <div class="metric-row"><span>Monthly Worst</span><strong style="color:var(--danger)">Week 11 — 74%</strong></div>
                    </div>
                </div>
            </div>
        `;
    }

    renderComms(){this.workspace.innerHTML=`<div class="page-head"><div><span class="eyebrow">Messages</span><h2>Communication Hub</h2></div><div class="page-actions"><button class="btn primary"><i data-lucide="megaphone"></i> Broadcast</button></div></div><div class="dashboard-grid"><div class="card span-4"><div class="card-top"><span>Channels</span></div>${['Site Alerts','Engineering Team','Admin Board','Client Updates','Safety Reports'].map((ch,i)=>`<div class="task-card-mini" style="cursor:pointer"><i data-lucide="${['alert-circle','compass','shield','eye','hard-hat'][i]}"></i><div class="info"><h4>${ch}</h4><p>${[3,7,2,1,4][i]} new messages</p></div></div>`).join("")}</div><div class="card span-8"><div class="card-top"><span>Site Alerts</span><div class="badge info">3 messages</div></div><div style="display:grid;gap:14px">${[{from:'Riya Shah',msg:'Tower B slab pour scheduled for tomorrow 6 AM. Please confirm crane availability.',time:'10:32 AM'},{from:'Safety Bot',msg:'PPE compliance check completed. 2 workers missing hard hats at Zone C.',time:'09:15 AM'},{from:'Aarav Mehta',msg:'Client visit confirmed for Thursday. Ensure site cleanup by Wednesday EOD.',time:'Yesterday'}].map(m=>`<div style="padding:14px;border:1px solid var(--border);border-radius:var(--radius-md);background:var(--glass-bg)"><div style="display:flex;justify-content:space-between;margin-bottom:6px"><strong style="font-size:13px">${m.from}</strong><span style="font-size:11px;color:var(--text-dim)">${m.time}</span></div><p style="font-size:13px;color:var(--text-secondary)">${m.msg}</p></div>`).join("")}</div><div style="display:flex;gap:8px;margin-top:16px"><input type="text" placeholder="Type a message..." style="flex:1;height:40px;padding:0 12px;border:1px solid var(--border);border-radius:var(--radius-md);background:rgba(255,255,255,0.05);color:var(--text-primary);outline:none"><button class="btn primary"><i data-lucide="send"></i></button></div></div></div>`;}

    renderAttendance() {
        const d = BuildIQData.workerData;
        this.workspace.innerHTML = `
            <div class="page-head">
                <div>
                    <span class="eyebrow">Tracking</span>
                    <h2>My Attendance</h2>
                </div>
            </div>
            
            <div class="dashboard-grid">
                <div class="card span-4 shift-card" style="display:flex; flex-direction:column; justify-content:center;">
                    <div class="card-top"><span>Today's Status</span><i data-lucide="clock"></i></div>
                    <div style="text-align:center; padding:20px 0;">
                        <strong style="font-size:36px; color:var(--success); display:block;">Checked In</strong>
                        <p style="color:var(--text-muted); margin-top:8px;">Since ${d.shift.start}</p>
                    </div>
                    <button class="btn primary" style="width:100%; margin-top:auto; height:48px; font-size:16px;">Slide to Check Out</button>
                </div>
                
                <div class="card span-4">
                    <div class="card-top"><span>This Month</span><i data-lucide="calendar"></i></div>
                    <div style="display:flex; flex-direction:column; gap:16px; padding-top:10px;">
                        <div class="metric-row"><span>Days Worked</span><strong style="font-size:18px;">${d.attendance.totalDays}</strong></div>
                        <div class="metric-row"><span>On Time</span><strong style="color:var(--success); font-size:18px;">${d.attendance.onTime}</strong></div>
                        <div class="metric-row"><span>Late Arrivals</span><strong style="color:var(--warning); font-size:18px;">${d.attendance.late}</strong></div>
                        <div class="metric-row"><span>Total Hours Logged</span><strong style="font-size:18px;">${d.attendance.hours}</strong></div>
                    </div>
                </div>
                
                <div class="card span-4">
                    <div class="card-top"><span>Weekly View</span><i data-lucide="calendar-days"></i></div>
                    <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:12px; margin-top:20px;">
                        ${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => `
                            <div style="text-align:center; padding:10px; background:${d.attendance.thisWeek[i] ? 'rgba(53, 208, 127, 0.1)' : 'rgba(255,255,255,0.02)'}; border:1px solid ${d.attendance.thisWeek[i] ? 'rgba(53, 208, 127, 0.3)' : 'var(--border)'}; border-radius:var(--radius-sm);">
                                <span style="display:block; font-size:11px; color:var(--text-muted); margin-bottom:4px;">${day}</span>
                                <i data-lucide="${d.attendance.thisWeek[i] ? 'check-circle' : 'minus'}" style="color:${d.attendance.thisWeek[i] ? 'var(--success)' : 'var(--text-dim)'}; width:18px; height:18px; margin:0 auto;"></i>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </div>
        `;
    }

    renderSafety() {
        const s = BuildIQData.workerData.safety;
        this.workspace.innerHTML = `
            <div class="page-head">
                <div>
                    <span class="eyebrow">Compliance</span>
                    <h2>Safety Center</h2>
                </div>
            </div>
            
            <div class="dashboard-grid">
                <div class="card span-4">
                    <div class="card-top"><span>My Safety Score</span><i data-lucide="shield-check"></i></div>
                    <div style="text-align:center; padding:20px 0;">
                        <strong style="font-size:56px; color:var(--success); display:block; line-height:1;">${s.score}%</strong>
                        <p style="color:var(--text-muted); margin-top:12px;">Last scanned: ${s.lastCheck}</p>
                    </div>
                </div>
                
                <div class="card span-4">
                    <div class="card-top"><span>PPE Checklist</span></div>
                    <div style="display:flex; flex-direction:column; gap:12px;">
                        ${['Hard Hat', 'Safety Vest', 'Steel Toe Boots', 'Gloves', 'Safety Goggles'].map(item => `
                            <div class="metric-row" style="padding:8px 0;">
                                <span style="font-size:15px;">${item}</span>
                                <div class="badge success"><i data-lucide="check" style="width:12px; margin-right:4px;"></i> Verified</div>
                            </div>
                        `).join("")}
                    </div>
                </div>
                
                <div class="card span-4">
                    <div class="card-top"><span>Emergency Contacts</span><i data-lucide="phone-call"></i></div>
                    <div style="display:flex; flex-direction:column; gap:16px;">
                        <div class="metric-row">
                            <div>
                                <span style="display:block; color:var(--text-muted); font-size:11px; margin-bottom:4px;">Site Safety Officer</span>
                                <strong>Imran Ali</strong>
                            </div>
                            <button class="btn ghost" style="height:32px; width:32px; padding:0;"><i data-lucide="phone"></i></button>
                        </div>
                        <div class="metric-row">
                            <div>
                                <span style="display:block; color:var(--text-muted); font-size:11px; margin-bottom:4px;">Medical Emergency</span>
                                <strong style="color:var(--danger)">+91 112</strong>
                            </div>
                            <button class="btn ghost" style="height:32px; width:32px; padding:0;"><i data-lucide="phone"></i></button>
                        </div>
                        
                        <button class="btn primary" style="width:100%; margin-top:auto; height:48px; font-size:16px; background:linear-gradient(180deg, var(--danger), #c0392b); border-color:#c0392b;">
                            <i data-lucide="alert-triangle"></i> Report Hazard
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderRequests() {
        this.workspace.innerHTML = `
            <div class="page-head">
                <div>
                    <span class="eyebrow">Supply & Tools</span>
                    <h2>Material Requests</h2>
                </div>
                <div class="page-actions">
                    <button class="btn primary" style="height:40px;"><i data-lucide="plus"></i> New Request</button>
                </div>
            </div>
            
            <div class="dashboard-grid">
                <div class="card span-12">
                    <div class="card-top">
                        <span>My Active Requests</span>
                        <div class="badge warning">3 pending</div>
                    </div>
                    <div class="task-list" style="margin-top:10px;">
                        ${[
                            { item: 'Cement Bags (OPC 43)', qty: '120 bags', loc: 'Tower A, Level 18', time: 'Today 8:30 AM', status: 'Pending', type: 'warning' },
                            { item: 'Steel Rebar 12mm', qty: '2.5 tons', loc: 'Tower B, Foundation', time: 'Yesterday', status: 'Approved', type: 'success' },
                            { item: 'Formwork Panels', qty: '40 units', loc: 'Basement Ramp', time: '25 Apr', status: 'In Transit', type: 'info' },
                            { item: 'Safety Helmets (Replacements)', qty: '15 units', loc: 'Site Store', time: '24 Apr', status: 'Delivered', type: 'success' }
                        ].map(r => `
                            <div class="task-card-mini" style="padding:16px;">
                                <i data-lucide="package" style="width:24px; height:24px; color:var(--text-secondary);"></i>
                                <div class="info" style="flex:1;">
                                    <h4 style="font-size:15px; margin-bottom:4px;">${r.item} <span style="color:var(--text-muted); font-weight:normal;">(${r.qty})</span></h4>
                                    <p style="font-size:12px;">Deliver to: ${r.loc} | Requested: ${r.time}</p>
                                </div>
                                <div class="badge ${r.type}" style="padding:6px 12px; font-size:12px;">${r.status}</div>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </div>
        `;
    }

    renderProgress() {
        const d = BuildIQData.clientData;
        this.workspace.innerHTML = `
            <div class="page-head">
                <div>
                    <span class="eyebrow">Updates</span>
                    <h2>Project Progress</h2>
                </div>
                <div class="page-actions">
                    <button class="btn ghost"><i data-lucide="video"></i> View Live Feed</button>
                    <button class="btn primary"><i data-lucide="download"></i> Download Full Report</button>
                </div>
            </div>
            
            <div class="dashboard-grid">
                <div class="card span-12">
                    <div class="card-top">
                        <span>Skyline Tower Construction Timeline</span>
                        <div class="badge success">${d.completion}% Complete</div>
                    </div>
                    <div style="display:flex; justify-content:space-between; position:relative; padding:40px 0 20px;">
                        ${d.milestones.map(m => `
                            <div style="text-align:center; flex:1; z-index:1;">
                                <div style="width:20px; height:20px; border-radius:50%; background:${m.status === 'done' ? 'var(--success)' : m.status === 'active' ? 'var(--accent)' : 'var(--border)'}; margin:0 auto 12px; box-shadow:${m.status === 'active' ? '0 0 12px var(--accent)' : 'none'}"></div>
                                <strong style="font-size:14px; display:block; margin-bottom:4px;">${m.name}</strong>
                                <span style="font-size:12px; color:var(--text-muted);">${m.date}</span>
                            </div>
                        `).join("")}
                        <div style="position:absolute; top:49px; left:10%; right:10%; height:2px; background:var(--border);"></div>
                    </div>
                </div>

                <div class="card span-6">
                    <div class="card-top"><span>Latest Site Photos</span><i data-lucide="camera"></i></div>
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                        ${['skyline', 'droneNorth', 'droneSouth', 'droneEast'].map((k, idx) => `
                            <div style="position:relative; border-radius:var(--radius-sm); overflow:hidden;">
                                <img src="${BuildIQData.images[k]}" style="width:100%; height:140px; object-fit:cover; display:block;" alt="Site Photo ${idx}">
                                <div style="position:absolute; bottom:8px; left:8px; background:rgba(0,0,0,0.6); padding:4px 8px; border-radius:4px; font-size:10px;">${['Tower A', 'North Elev', 'South Core', 'East Wing'][idx]}</div>
                            </div>
                        `).join("")}
                    </div>
                </div>

                <div class="card span-6">
                    <div class="card-top"><span>Weekly Executive Update</span><i data-lucide="file-text"></i></div>
                    <p style="color:var(--text-secondary); font-size:14px; line-height:1.6; margin-bottom:20px;">
                        Significant progress achieved this week on Tower B foundation work. Over 80% of the rebar has been tied and inspected. We are currently preparing for the massive continuous concrete pour scheduled for the upcoming weekend.
                    </p>
                    <div style="display:flex; flex-direction:column; gap:12px;">
                        <div class="metric-row"><span>Concrete Work</span><strong style="color:var(--success)">Ahead of Schedule</strong></div>
                        <div class="metric-row"><span>Electrical Conduits</span><strong>On Track</strong></div>
                        <div class="metric-row"><span>Plumbing Rough-in</span><strong style="color:var(--warning)">Minor Delay (Material)</strong></div>
                        <div class="metric-row"><span>Interior Fit-out (Mockup)</span><strong>In Progress</strong></div>
                    </div>
                </div>
            </div>
        `;
    }

    renderDocuments() {
        const d = BuildIQData.clientData.documents;
        this.workspace.innerHTML = `
            <div class="page-head">
                <div>
                    <span class="eyebrow">Files</span>
                    <h2>Document Center</h2>
                </div>
                <div class="page-actions">
                    <button class="btn primary"><i data-lucide="upload"></i> Upload File</button>
                </div>
            </div>
            
            <div style="display:flex; gap:16px; margin-bottom:20px; border-bottom:1px solid var(--border); padding-bottom:16px;">
                <button class="badge info">All Documents</button>
                <button class="badge ghost" style="border-color:var(--border)">Contracts</button>
                <button class="badge ghost" style="border-color:var(--border)">Clearances</button>
                <button class="badge ghost" style="border-color:var(--border)">Blueprints</button>
            </div>

            <div class="dashboard-grid">
                <div class="card span-12">
                    <div style="overflow-x:auto;">
                        <table class="data-table" style="min-width:600px;">
                            <thead>
                                <tr>
                                    <th>Document Name</th><th>Category</th><th>Upload Date</th><th>Status</th><th>Action</th>
                                </tr>
                            </thead>
                        <tbody>
                            ${d.map(doc => `
                                <tr>
                                    <td>
                                        <div style="display:flex; align-items:center; gap:12px;">
                                            <i data-lucide="file-text" style="color:var(--text-muted)"></i>
                                            <strong>${doc.name}</strong>
                                        </div>
                                    </td>
                                    <td><div class="badge info">${doc.type}</div></td>
                                    <td>${doc.date}</td>
                                    <td><div class="badge ${doc.type === 'Report' ? 'success' : 'warning'}">Verified</div></td>
                                    <td>
                                        <div style="display:flex; gap:8px;">
                                            <button class="btn ghost" style="height:32px; font-size:12px;"><i data-lucide="eye"></i></button>
                                            <button class="btn ghost" style="height:32px; font-size:12px;"><i data-lucide="download"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            `).join("")}
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    renderPayments() {
        const p = BuildIQData.clientData.payments;
        const b = BuildIQData.clientData.budgetSummary;
        this.workspace.innerHTML = `
            <div class="page-head">
                <div>
                    <span class="eyebrow">Finance</span>
                    <h2>Payments & Invoices</h2>
                </div>
                <div class="page-actions">
                    <button class="btn primary"><i data-lucide="credit-card"></i> Make Payment</button>
                </div>
            </div>
            
            <div class="dashboard-grid">
                <div class="card span-4">
                    <div class="card-top"><span>Total Project Budget</span><i data-lucide="briefcase"></i></div>
                    <strong style="font-size:36px">${b.total}</strong>
                    <p style="color:var(--text-muted); margin-top:8px;">Approved allocation</p>
                </div>
                <div class="card span-4">
                    <div class="card-top"><span>Amount Paid</span><i data-lucide="check-circle"></i></div>
                    <strong style="font-size:36px; color:var(--success)">${b.spent}</strong>
                    <div class="progress-bar"><div class="progress-fill" style="width:40%"></div></div>
                    <p style="color:var(--text-muted); margin-top:8px;">40% disbursed</p>
                </div>
                <div class="card span-4">
                    <div class="card-top"><span>Outstanding Balance</span><i data-lucide="clock"></i></div>
                    <strong style="font-size:36px; color:var(--warning)">${b.remaining}</strong>
                    <p style="color:var(--text-muted); margin-top:8px;">To be paid according to milestones</p>
                </div>
                
                <div class="card span-12">
                    <div class="card-top">
                        <span>Invoice History</span>
                        <button class="btn ghost" style="height:32px; font-size:12px;"><i data-lucide="filter"></i> Filter</button>
                    </div>
                    <div style="overflow-x:auto;">
                        <table class="data-table" style="min-width:600px;">
                            <thead>
                                <tr>
                                    <th>Invoice ID</th><th>Amount</th><th>Milestone / Description</th><th>Due Date</th><th>Status</th><th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${p.map(inv => `
                                    <tr>
                                        <td><strong>${inv.id}</strong></td>
                                        <td><strong>${inv.amount}</strong></td>
                                        <td>${inv.id === 'INV-004' ? 'Foundation completion milestone' : 'Monthly retainer & material cost'}</td>
                                        <td>${inv.date}</td>
                                        <td><div class="badge ${inv.status === 'Paid' ? 'success' : 'warning'}">${inv.status}</div></td>
                                        <td>
                                            ${inv.status === 'Paid' 
                                                ? `<button class="btn ghost" style="height:28px; font-size:12px;"><i data-lucide="download"></i> Receipt</button>` 
                                                : `<button class="btn primary" style="height:28px; font-size:12px;">Pay Now</button>`
                                            }
                                        </td>
                                    </tr>
                                `).join("")}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    initAdminCharts() {
        if (typeof Chart === 'undefined') return;
        
        const canvas = document.getElementById('adminTrendChart');
        if (!canvas) return;

        // Gradient for revenue
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 280);
        gradient.addColorStop(0, 'rgba(53, 208, 127, 0.4)');
        gradient.addColorStop(1, 'rgba(53, 208, 127, 0)');

        new Chart(canvas, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                    {
                        label: 'Profit Margin (%)',
                        data: [15, 16.5, 16, 18, 19.5, 20.5],
                        borderColor: '#35d07f',
                        backgroundColor: gradient,
                        fill: true,
                        tension: 0.4,
                        borderWidth: 3
                    },
                    {
                        label: 'Avg Delay Risk (%)',
                        data: [28, 26, 32, 29, 24, 21],
                        borderColor: '#ff5a5f',
                        backgroundColor: 'transparent',
                        borderDash: [5, 5],
                        tension: 0.4,
                        borderWidth: 2
                    }
                ]
            },
            options: {
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { color: '#b0b6bf', usePointStyle: true, boxWidth: 8 }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255,255,255,0.05)' },
                        ticks: { color: '#7c838e' }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#7c838e' }
                    }
                }
            }
        });
    }

    initCharts() {
        if (typeof Chart === 'undefined') return;
        
        const config = (color) => ({
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [73, 27],
                    backgroundColor: [color, 'rgba(255,255,255,0.05)'],
                    borderWidth: 0,
                    cutout: '80%'
                }]
            },
            options: { plugins: { legend: false, tooltip: false }, maintainAspectRatio: false }
        });

        new Chart(document.getElementById('progressChart'), config('#ff7a1a'));
        new Chart(document.getElementById('riskChart'), config('#ffd166'));
        new Chart(document.getElementById('budgetChart'), config('#39a7ff'));
        new Chart(document.getElementById('wasteChart'), config('#ff5a5f'));
    }
}

document.addEventListener("DOMContentLoaded", () => {
    window.app = new BuildIQ();
});
