const BuildIQCharts = {
    instances: [],
    colors: {
        orange: "#ff7a1a",
        orangeSoft: "rgba(255, 122, 26, 0.18)",
        yellow: "#ffd166",
        green: "#35d07f",
        red: "#ff5a5f",
        blue: "#39a7ff",
        white: "#f7f8fa",
        muted: "#8d949f",
        grid: "rgba(255, 255, 255, 0.07)",
        panel: "#15171b"
    },

    reset() {
        this.instances.forEach((chart) => chart.destroy());
        this.instances = [];
    },

    register(chart) {
        this.instances.push(chart);
        return chart;
    },

    baseOptions(extra = {}) {
        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: this.colors.muted,
                        boxWidth: 10,
                        boxHeight: 10,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: "#101114",
                    borderColor: "rgba(255,255,255,0.12)",
                    borderWidth: 1,
                    titleColor: this.colors.white,
                    bodyColor: this.colors.muted,
                    displayColors: true
                }
            },
            ...extra
        };
    },

    renderDoughnut(id, values, colors, cutout = "78%", options = {}) {
        const canvas = document.getElementById(id);
        if (!canvas || typeof Chart === "undefined") return;

        this.register(new Chart(canvas, {
            type: "doughnut",
            data: {
                datasets: [{
                    data: values,
                    backgroundColor: colors,
                    borderWidth: 0,
                    borderRadius: 6,
                    spacing: 2
                }]
            },
            options: this.baseOptions({
                cutout,
                plugins: { legend: { display: false }, tooltip: { enabled: false } },
                animation: { duration: 1200, easing: "easeOutQuart" },
                ...options
            })
        }));
    },

    renderLine(id, labels, datasets, fill = false) {
        const canvas = document.getElementById(id);
        if (!canvas || typeof Chart === "undefined") return;

        this.register(new Chart(canvas, {
            type: "line",
            data: { labels, datasets },
            options: this.baseOptions({
                elements: {
                    point: { radius: 2, hoverRadius: 5 },
                    line: { tension: 0.42, borderWidth: 2 }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { color: this.colors.muted }
                    },
                    y: {
                        beginAtZero: true,
                        grid: { color: this.colors.grid },
                        ticks: { color: this.colors.muted }
                    }
                },
                plugins: {
                    legend: { labels: { color: this.colors.muted, boxWidth: 10, usePointStyle: true } }
                },
                fill
            })
        }));
    },

    renderBar(id, labels, datasets, stacked = false) {
        const canvas = document.getElementById(id);
        if (!canvas || typeof Chart === "undefined") return;

        this.register(new Chart(canvas, {
            type: "bar",
            data: { labels, datasets },
            options: this.baseOptions({
                borderRadius: 6,
                scales: {
                    x: {
                        stacked,
                        grid: { display: false },
                        ticks: { color: this.colors.muted }
                    },
                    y: {
                        stacked,
                        beginAtZero: true,
                        grid: { color: this.colors.grid },
                        ticks: { color: this.colors.muted }
                    }
                }
            })
        }));
    },

    overview() {
        this.reset();
        this.renderDoughnut("completionChart", [73, 27], [this.colors.orange, "rgba(255,255,255,0.06)"], "82%");
        this.renderDoughnut("riskChart", [48, 52], [this.colors.yellow, "rgba(255,255,255,0.06)"], "80%", {
            circumference: 180,
            rotation: 270
        });
        this.renderDoughnut("materialChart", [35, 28, 18, 19], [this.colors.orange, this.colors.yellow, this.colors.blue, "#555a62"], "68%");
        this.renderLine("weeklyProgressChart",
            ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            [
                {
                    label: "Planned",
                    data: [62, 65, 68, 70, 72, 75, 78],
                    borderColor: "#696f78",
                    backgroundColor: "transparent",
                    borderDash: [4, 4]
                },
                {
                    label: "Actual",
                    data: [60, 64, 65, 69, 71, 72, 73],
                    borderColor: this.colors.orange,
                    backgroundColor: this.colors.orangeSoft,
                    fill: true
                }
            ],
            true
        );
        this.renderLine("attendanceChart",
            ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            [{
                label: "Workers",
                data: [132, 140, 138, 151, 148, 156],
                borderColor: this.colors.yellow,
                backgroundColor: "rgba(255, 209, 102, 0.14)",
                fill: true
            }],
            true
        );
    },

    drone() {
        this.reset();
        this.renderLine("droneProgressChart",
            ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"],
            [
                {
                    label: "Progress Capture",
                    data: [64, 66, 68, 70, 72, 73],
                    borderColor: this.colors.orange,
                    backgroundColor: this.colors.orangeSoft,
                    fill: true
                },
                {
                    label: "Inactive Zones",
                    data: [8, 7, 11, 9, 6, 5],
                    borderColor: this.colors.red,
                    backgroundColor: "rgba(255, 90, 95, 0.12)",
                    fill: true
                }
            ],
            true
        );
    },

    waste() {
        this.reset();
        this.renderLine("wasteTrendChart",
            ["Apr 12", "Apr 13", "Apr 14", "Apr 15", "Apr 16", "Apr 17", "Apr 18"],
            [
                { label: "Cement", data: [5, 10, 7, 11, 10, 12, 14], borderColor: this.colors.orange },
                { label: "Steel", data: [3, 4, 5, 4, 6, 5, 4], borderColor: this.colors.blue },
                { label: "Sand", data: [2, 5, 4, 6, 7, 5, 8], borderColor: this.colors.green }
            ]
        );
        this.renderDoughnut("wasteCompositionChart", [38, 30, 20, 12], [this.colors.yellow, this.colors.orange, this.colors.blue, this.colors.red], "62%");
        this.renderDoughnut("sustainabilityChart", [72, 28], [this.colors.green, "rgba(255,255,255,0.06)"], "82%", {
            circumference: 240,
            rotation: 240
        });
    },

    teams() {
        this.reset();
        this.renderBar("teamProductivityChart",
            ["Eng", "Cont", "Labor", "Arch", "Vend"],
            [{
                label: "Productivity",
                data: [94, 82, 78, 98, 84],
                backgroundColor: [this.colors.green, this.colors.orange, this.colors.yellow, this.colors.blue, "#9aa1aa"],
                borderWidth: 0
            }]
        );
    },

    budget() {
        this.reset();
        this.renderLine("budgetFlowChart",
            ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
            [
                {
                    label: "Allocated",
                    data: [28, 52, 77, 103, 132, 164, 200],
                    borderColor: "#777d86",
                    backgroundColor: "transparent",
                    borderDash: [5, 5]
                },
                {
                    label: "Used",
                    data: [25, 49, 81, 98, 126, 146, 161],
                    borderColor: this.colors.orange,
                    backgroundColor: this.colors.orangeSoft,
                    fill: true
                }
            ],
            true
        );
        this.renderDoughnut("budgetDonutChart", [58, 24, 11, 7], [this.colors.orange, this.colors.yellow, this.colors.blue, "#5f646c"], "66%");
        this.renderBar("costTrendChart",
            ["Concrete", "Steel", "Labor", "Equipment"],
            [
                { label: "Planned", data: [44, 35, 52, 19], backgroundColor: "rgba(255,255,255,0.12)" },
                { label: "Actual", data: [48, 39, 49, 21], backgroundColor: this.colors.orange }
            ]
        );
    },

    reports() {
        this.reset();
        this.renderBar("reportActivityChart",
            ["Daily", "Waste", "Delay", "Budget", "Drone", "Client"],
            [{
                label: "Generated",
                data: [18, 7, 4, 6, 14, 11],
                backgroundColor: [this.colors.orange, this.colors.green, this.colors.red, this.colors.yellow, this.colors.blue, "#9aa1aa"],
                borderWidth: 0
            }]
        );
    }
};
