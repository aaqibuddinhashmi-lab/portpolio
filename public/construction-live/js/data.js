const BuildIQData = {
    tagline: "Build Smarter. Waste Less. Deliver Faster.",
    currentProjectId: "skyline",
    currentRole: "admin",
    images: {
        skyline: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1400",
        metro: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1400",
        residency: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1400",
        heights: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&q=80&w=1400",
        droneNorth: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&q=80&w=1200",
        droneSouth: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=900",
        droneEast: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=900",
        droneBasement: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=900",
        clientHome: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=900"
    },
    users: {
        admin: { name: "Aarav Mehta", initials: "AM", role: "Admin", company: "BuildIQ Enterprise", email: "aarav@buildiq.ai" },
        engineer: { name: "Riya Shah", initials: "RS", role: "Engineer", company: "BuildIQ Enterprise", email: "riya@buildiq.ai" },
        worker: { name: "Karan Singh", initials: "KS", role: "Worker", company: "BuildIQ Enterprise", email: "karan@buildiq.ai" },
        client: { name: "Vikram Kapoor", initials: "VK", role: "Client", company: "Kapoor Constructions", email: "vikram@kapoor.com" }
    },
    roles: {
        admin: {
            label: "Admin Portal", icon: "shield", color: "#ff5a5f",
            sidebar: [
                { id: "overview", icon: "layout-dashboard", label: "Overview" },
                { id: "projects", icon: "building-2", label: "Projects" },
                { id: "users", icon: "users-round", label: "User Management" },
                { id: "drone", icon: "video", label: "Drone Center" },
                { id: "waste", icon: "recycle", label: "Waste Analytics" },
                { id: "plans", icon: "file-check-2", label: "Plan Checker" },
                { id: "tasks", icon: "square-check-big", label: "Tasks" },
                { id: "teams", icon: "users", label: "Teams" },
                { id: "budget", icon: "wallet-cards", label: "Budget" },
                { id: "reports", icon: "bar-chart-3", label: "Reports" },
                { id: "analytics", icon: "trending-up", label: "Analytics" },
                { id: "comms", icon: "message-square", label: "Communication" },
                { id: "notifications", icon: "bell", label: "Notifications" },
                { id: "settings", icon: "settings", label: "Settings" }
            ],
            mobileNav: [
                { id: "overview", icon: "layout-dashboard", label: "Overview" },
                { id: "projects", icon: "building-2", label: "Projects" },
                { id: "users", icon: "users-round", label: "Users" },
                { id: "reports", icon: "bar-chart-3", label: "Reports" },
                { id: "settings", icon: "settings", label: "Settings" }
            ]
        },
        engineer: {
            label: "Engineer Portal", icon: "hard-hat", color: "#39a7ff",
            sidebar: [
                { id: "overview", icon: "layout-dashboard", label: "Dashboard" },
                { id: "drone", icon: "video", label: "Drone Monitor" },
                { id: "waste", icon: "recycle", label: "Waste Analytics" },
                { id: "plans", icon: "file-check-2", label: "Plan Checker" },
                { id: "tasks", icon: "square-check-big", label: "Tasks" },
                { id: "teams", icon: "users", label: "Teams" },
                { id: "comms", icon: "message-square", label: "Communication" },
                { id: "notifications", icon: "bell", label: "Notifications" },
                { id: "settings", icon: "settings", label: "Settings" }
            ],
            mobileNav: [
                { id: "overview", icon: "layout-dashboard", label: "Dashboard" },
                { id: "projects", icon: "building-2", label: "Projects" },
                { id: "drone", icon: "video", label: "Drone" },
                { id: "reports", icon: "bar-chart-3", label: "Reports" },
                { id: "settings", icon: "user", label: "Profile" }
            ]
        },
        worker: {
            label: "Worker Portal", icon: "hard-hat", color: "#35d07f",
            sidebar: [
                { id: "overview", icon: "home", label: "Home" },
                { id: "tasks", icon: "square-check-big", label: "My Tasks" },
                { id: "attendance", icon: "clock", label: "Attendance" },
                { id: "safety", icon: "shield-check", label: "Safety" },
                { id: "requests", icon: "package-plus", label: "Requests" },
                { id: "notifications", icon: "bell", label: "Alerts" },
                { id: "settings", icon: "user", label: "Profile" }
            ],
            mobileNav: [
                { id: "overview", icon: "home", label: "Home" },
                { id: "tasks", icon: "square-check-big", label: "Tasks" },
                { id: "attendance", icon: "clock", label: "Attend" },
                { id: "notifications", icon: "bell", label: "Alerts" },
                { id: "settings", icon: "user", label: "Profile" }
            ]
        },
        client: {
            label: "Client Portal", icon: "eye", color: "#ffd166",
            sidebar: [
                { id: "overview", icon: "home", label: "Home" },
                { id: "progress", icon: "trending-up", label: "Progress" },
                { id: "documents", icon: "folder-open", label: "Documents" },
                { id: "payments", icon: "credit-card", label: "Payments" },
                { id: "comms", icon: "message-square", label: "Messages" },
                { id: "notifications", icon: "bell", label: "Notifications" },
                { id: "settings", icon: "user", label: "Profile" }
            ],
            mobileNav: [
                { id: "overview", icon: "home", label: "Home" },
                { id: "progress", icon: "trending-up", label: "Progress" },
                { id: "documents", icon: "folder-open", label: "Docs" },
                { id: "payments", icon: "credit-card", label: "Payments" },
                { id: "settings", icon: "user", label: "Profile" }
            ]
        }
    },
    projects: [
        { id: "skyline", name: "Skyline Tower", location: "Mumbai, Maharashtra", completion: 73, delayRisk: 42, budgetStatus: "On plan", budgetUsed: "₹146.2 Cr", budgetTotal: "₹200 Cr", team: 176, deadline: "18 Dec 2026", imageKey: "skyline", manager: "Aarav Mehta", health: 86, phase: "Interior fit-out" },
        { id: "metro", name: "Metro Link Project", location: "Hyderabad, Telangana", completion: 45, delayRisk: 68, budgetStatus: "Overrun watch", budgetUsed: "₹312.7 Cr", budgetTotal: "₹400 Cr", team: 248, deadline: "04 Mar 2027", imageKey: "metro", manager: "Sarah Joseph", health: 62, phase: "Pier segment" },
        { id: "residency", name: "Smart Residency", location: "Bengaluru, Karnataka", completion: 92, delayRisk: 12, budgetStatus: "Under budget", budgetUsed: "₹84.5 Cr", budgetTotal: "₹100 Cr", team: 96, deadline: "07 Jun 2026", imageKey: "residency", manager: "Nikhil Rao", health: 94, phase: "Snagging" },
        { id: "heights", name: "Green Heights", location: "Pune, Maharashtra", completion: 31, delayRisk: 18, budgetStatus: "On plan", budgetUsed: "₹49.8 Cr", budgetTotal: "₹160 Cr", team: 118, deadline: "22 Aug 2027", imageKey: "heights", manager: "Fatima Khan", health: 82, phase: "Structure rising" }
    ],
    overview: {
        completion: 73, delayRisk: 42, budgetUsed: 73, materialUsage: 84,
        attendance: { onSite: 148, planned: 176, late: 11, absent: 17 },
        weather: { temp: "34°C", condition: "Partly Cloudy", wind: "12 km/h", humidity: "62%" },
        quickStats: [
            { label: "Pending Tasks", value: "27", detail: "9 due today", tone: "warning", icon: "list-checks" },
            { label: "Drone Flights", value: "4", detail: "2 auto-captures left", tone: "info", icon: "radio-tower" },
            { label: "Safety Score", value: "96", detail: "No incidents 14d", tone: "success", icon: "shield-check" },
            { label: "Client ETA", value: "18 Dec", detail: "4 days buffer", tone: "accent", icon: "timer" }
        ],
        aiAlerts: [
            { title: "Steel shipment lag", detail: "Tower B slab pour may slip by 22 hours.", severity: "warning" },
            { title: "Cement waste spike", detail: "Batch M-32 is 2.1% above target since 11:30.", severity: "danger" },
            { title: "North safety zone clear", detail: "Drone confirms barricades restored near lift core.", severity: "success" }
        ],
        pendingTasks: [
            { task: "Approve MEP clash report", owner: "Riya Shah", due: "Today 4:00 PM", status: "Blocked" },
            { task: "Upload west elevation images", owner: "Site Team A", due: "Today 6:30 PM", status: "Open" },
            { task: "Vendor invoice verification", owner: "Finance", due: "Tomorrow", status: "Review" }
        ]
    },
    drone: {
        site: "Skyline Tower", activeDrone: "Skyview Drone 01", altitude: "145m", battery: "78%", wind: "12 km/h",
        feeds: [
            { name: "North Wing", imageKey: "droneNorth", progress: "86%", status: "Live" },
            { name: "West Elevation", imageKey: "skyline", progress: "73%", status: "Live" },
            { name: "Basement Ramp", imageKey: "droneBasement", progress: "64%", status: "Review" },
            { name: "Client View", imageKey: "droneEast", progress: "91%", status: "Archived" }
        ],
        alerts: [
            { label: "Inactive zone", detail: "Lift lobby B idle for 3h 12m", tone: "warning" },
            { label: "Safety zone", detail: "Barricade restored near tower crane", tone: "success" },
            { label: "Delay risk", detail: "Facade crew 17% below planned pace", tone: "danger" }
        ],
        zones: [
            { name: "Foundation A", value: 95, tone: "success" },
            { name: "Tower Section B", value: 64, tone: "warning" },
            { name: "Interior Works", value: 41, tone: "danger" },
            { name: "Site Services", value: 55, tone: "warning" }
        ]
    },
    waste: {
        date: "28 Apr 2026",
        dailyReport: [
            { material: "Cement Waste", value: "12%", trend: "+2.1%", tons: "0.42t", color: "#ff7a1a", icon: "package-open" },
            { material: "Steel Waste", value: "8%", trend: "-1.2%", tons: "0.21t", color: "#35d07f", icon: "component" },
            { material: "Sand Waste", value: "15%", trend: "+3.4%", tons: "0.34t", color: "#ffd166", icon: "triangle-alert" },
            { material: "Tile Breakage", value: "5%", trend: "+0.5%", tons: "0.13t", color: "#ff5a5f", icon: "grid-3x3" }
        ],
        totalWasteToday: "1.10 Tons", sustainabilityScore: 72, costOfWaste: "₹1,03,420",
        corrections: [
            { title: "Reduce cement overmixing", detail: "Batch by lift core exceeding demand by 8%.", saving: "₹19,500/day" },
            { title: "Optimize steel cutting", detail: "Rebar cut list can recover 1.5 tons this week.", saving: "1.5 tons/week" },
            { title: "Use sand containment", detail: "Temporary covers reduce wind spill during evening.", saving: "10% reduction" }
        ]
    },
    planVerification: {
        uploadTypes: ["PDF", "CAD", "Blueprint", "Image"],
        standards: ["IS 456", "NBC 2016", "IS 875", "IS 1893", "Local setback"],
        checks: [
            { title: "Fire exit missing", result: "Fail", fix: "Add 1 secondary exit on east side.", tone: "danger" },
            { title: "Stair width below code", result: "Fail", fix: "Increase by 150mm to meet NBC.", tone: "danger" },
            { title: "Ventilation compliant", result: "Pass", fix: "No change required.", tone: "success" },
            { title: "Accessibility ramp", result: "Review", fix: "Slope near limit; verify landing.", tone: "warning" },
            { title: "Parking norms", result: "Pass", fix: "Meets required bay count.", tone: "success" },
            { title: "Setback rule", result: "Fail", fix: "Move service block 0.8m from west.", tone: "danger" }
        ]
    },
    teams: [
        { role: "Engineers", count: 12, attendance: 100, productivity: 94, tasks: 31, shift: "08:00-18:00", safety: 98, lead: "Riya Shah" },
        { role: "Contractors", count: 45, attendance: 88, productivity: 82, tasks: 74, shift: "07:30-19:00", safety: 91, lead: "Imran Ali" },
        { role: "Labor Teams", count: 120, attendance: 82, productivity: 78, tasks: 112, shift: "08:00-17:30", safety: 89, lead: "Karan Singh" },
        { role: "Architects", count: 5, attendance: 100, productivity: 98, tasks: 11, shift: "10:00-18:00", safety: 100, lead: "Meera Iyer" },
        { role: "Vendors", count: 18, attendance: 76, productivity: 84, tasks: 26, shift: "On call", safety: 93, lead: "Dev Patel" }
    ],
    schedule: {
        milestones: [
            { task: "Tower B slab pour", owner: "Civil Team", start: 1, span: 3, status: "On track" },
            { task: "MEP clash closure", owner: "Design Office", start: 2, span: 2, status: "Delayed" },
            { task: "Facade panels L16-L18", owner: "Contractor", start: 4, span: 4, status: "At risk" },
            { task: "Client mock apartment", owner: "Interiors", start: 6, span: 3, status: "On track" }
        ]
    },
    budget: {
        allocated: "₹200.0 Cr", used: "₹146.2 Cr", remaining: "₹53.8 Cr", overrunRisk: "18%",
        vendors: [
            { name: "Tata Steel Supply", due: "₹1.8 Cr", status: "Due in 3 days" },
            { name: "UltraTech Concrete", due: "₹92.4 L", status: "Awaiting approval" },
            { name: "LiftCore Systems", due: "₹2.1 Cr", status: "Paid" }
        ],
        costSignals: [
            { label: "Material Cost", value: "+4.2%", tone: "warning" },
            { label: "Labor Cost", value: "-1.4%", tone: "success" },
            { label: "Equipment Burn", value: "72%", tone: "accent" }
        ]
    },
    reports: [
        { title: "Daily Site Report", detail: "Attendance, photos, safety, tasks", status: "Ready", icon: "clipboard-list" },
        { title: "Weekly Waste Report", detail: "Material loss, cost, sustainability", status: "Draft", icon: "recycle" },
        { title: "Delay Analysis", detail: "Critical path, root cause, recovery", status: "Requested", icon: "clock" },
        { title: "Budget Report", detail: "Spend, commitments, vendors", status: "Ready", icon: "wallet" },
        { title: "Drone Summary", detail: "Progress captures, safety alerts", status: "Ready", icon: "video" },
        { title: "Client PDF", detail: "Progress photos, ETA, budget", status: "Approved", icon: "share-2" }
    ],
    tasks: {
        pending: [
            { title: "Mark Tower B slab pour complete", assignee: "Civil Supervisor", due: "Today 3:00 PM", priority: "high" },
            { title: "Fix fire exit annotation", assignee: "Architect", due: "Tomorrow", priority: "high" }
        ],
        inProgress: [
            { title: "Request 120 bags cement L18", assignee: "Site Engineer", due: "Today 5:00 PM", priority: "medium" },
            { title: "MEP routing verification", assignee: "Riya Shah", due: "Today 6:00 PM", priority: "medium" }
        ],
        review: [
            { title: "West barricade inspection", assignee: "Safety Officer", due: "Today", priority: "low" }
        ],
        completed: [
            { title: "Foundation A waterproofing", assignee: "Civil Team", due: "Yesterday", priority: "medium" },
            { title: "Crane inspection certificate", assignee: "Admin", due: "Yesterday", priority: "low" }
        ]
    },
    notifications: [
        { title: "Drone capture complete", detail: "West elevation comparison ready.", time: "2m ago", tone: "success" },
        { title: "Budget approval needed", detail: "UltraTech invoice exceeds limit.", time: "18m ago", tone: "warning" },
        { title: "Plan check failed", detail: "Fire exit missing in upload.", time: "42m ago", tone: "danger" },
        { title: "Client report opened", detail: "Mr. Kapoor viewed weekly PDF.", time: "1h ago", tone: "info" },
        { title: "Worker absent alert", detail: "3 labor team members no-show.", time: "2h ago", tone: "warning" }
    ],
    workerData: {
        shift: { start: "08:00 AM", end: "05:30 PM", status: "Active", hoursToday: "4h 32m" },
        tasks: [
            { title: "Pour concrete Level 12 East", status: "In Progress", location: "Tower A", time: "08:30 AM" },
            { title: "Install rebar cage Section C", status: "Pending", location: "Tower B", time: "01:00 PM" },
            { title: "Clean formwork panels", status: "Completed", location: "Basement", time: "Yesterday" }
        ],
        attendance: { thisWeek: [1,1,1,1,0,0,0], totalDays: 22, onTime: 20, late: 2, hours: "176h" },
        safety: { ppeStatus: "Complete", lastCheck: "Today 08:15", score: 96, incidents: 0 },
        performance: { score: 87, tasksCompleted: 142, rating: "Good", earnings: "₹28,400" }
    },
    clientData: {
        project: "Skyline Tower",
        completion: 73,
        eta: "18 Dec 2026",
        budgetSummary: { total: "₹200 Cr", spent: "₹146.2 Cr", remaining: "₹53.8 Cr" },
        milestones: [
            { name: "Foundation Complete", status: "done", date: "Mar 2025" },
            { name: "Structure Complete", status: "done", date: "Jan 2026" },
            { name: "Interior Fit-out", status: "active", date: "In Progress" },
            { name: "Handover", status: "upcoming", date: "Dec 2026" }
        ],
        payments: [
            { id: "INV-001", amount: "₹25.0 Cr", date: "15 Jan 2026", status: "Paid" },
            { id: "INV-002", amount: "₹18.5 Cr", date: "15 Mar 2026", status: "Paid" },
            { id: "INV-003", amount: "₹12.0 Cr", date: "30 Apr 2026", status: "Due" }
        ],
        documents: [
            { name: "Project Contract", type: "PDF", date: "Jan 2025" },
            { name: "Architectural Drawings", type: "CAD", date: "Feb 2025" },
            { name: "Weekly Progress #42", type: "PDF", date: "25 Apr 2026" },
            { name: "Budget Summary Q1", type: "XLSX", date: "Apr 2026" }
        ]
    },
    adminStats: {
        totalProjects: 4, activeWorkers: 638, totalBudget: "₹860 Cr", revenue: "₹124 Cr",
        complianceAlerts: 3, wasteAcrossSites: "4.8 Tons/day",
        userCounts: { workers: 520, engineers: 42, clients: 18, vendors: 36 }
    }
};
