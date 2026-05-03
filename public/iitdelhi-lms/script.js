/* ===========================
   LMS Presentation — Single Page Script
   =========================== */

(function () {
    'use strict';

    // --- State & DOM Refs ---
    const slides = document.querySelectorAll('.slide');
    const navDots = document.getElementById('navDots');
    const currentSlideEl = document.getElementById('currentSlide');
    const totalSlidesEl = document.getElementById('totalSlides');
    const progressFill = document.getElementById('progressFill');
    const totalSlides = slides.length;
    let globalCurrentIdx = 0;

    // --- Init ---
    function init() {
        if (totalSlidesEl) totalSlidesEl.textContent = String(totalSlides).padStart(2, '0');
        // createNavDots(); // Removed as per request to remove dot scrolling progress from header
        initScrollObservers();
        initAnimationObserver();
        updateProgressBar();
        window.addEventListener('scroll', updateProgressBar, { passive: true });
        initKeyboardNavigation();
    }

    function initKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                const nextIdx = Math.min(totalSlides - 1, globalCurrentIdx + 1);
                slides[nextIdx].scrollIntoView({ behavior: 'smooth' });
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                const prevIdx = Math.max(0, globalCurrentIdx - 1);
                slides[prevIdx].scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // --- Navigation Dots ---
    function createNavDots() {
        slides.forEach((slide, index) => {
            const i = index + 1;
            const dot = document.createElement('button');
            dot.className = 'nav-dot' + (i === 1 ? ' active' : '');
            dot.setAttribute('aria-label', `Go to slide ${i}`);
            dot.dataset.slide = i;
            dot.addEventListener('click', () => {
                slide.scrollIntoView({ behavior: 'smooth' });
            });
            if (navDots) navDots.appendChild(dot);
        });
    }

    // --- Update UI based on active slide ---
    function setActiveSlide(index) {
        globalCurrentIdx = index - 1;
        // Slide counter
        // if (currentSlideEl) currentSlideEl.textContent = String(index).padStart(2, '0');

        // Nav dots
        if (navDots) navDots.querySelectorAll('.nav-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i + 1 === index);
        });
    }

    // --- Scroll Progress Bar ---
    function updateProgressBar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (!progressFill) return;
        if (scrollTop === 0) {
            progressFill.style.width = '0%';
            return;
        }
        
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        progressFill.style.width = scrollPercentage + '%';
    }

    // --- Intersection Observers ---
    function initScrollObservers() {
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px', // Trigger when section hits middle of screen
            threshold: 0
        };

        const slideObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = parseInt(entry.target.dataset.slide, 10);
                    setActiveSlide(index);
                }
            });
        }, observerOptions);

        slides.forEach(slide => slideObserver.observe(slide));
    }

    function initAnimationObserver() {
        const animObserverOptions = {
            root: null,
            rootMargin: '0px 0px -15% 0px', // Trigger when slide is 15% from bottom
            threshold: 0
        };

        const animObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const slide = entry.target;
                    // Add visible class to all animate-in elements inside this slide
                    slide.querySelectorAll('.animate-in').forEach(el => {
                        el.classList.add('visible');
                    });
                    // Stop observing once animated in
                    animObserver.unobserve(slide);
                }
            });
        }, animObserverOptions);

        slides.forEach(slide => animObserver.observe(slide));
    }


    // --- Prototype Explorer Logic ---
    const PROTOTYPE_DATA = {
        student: {
            flows: {
                "Dashboard": [
                    { src: "IIT UI Work/Student/dashboard/student dashboard.jpg", title: "Global Dashboard", desc: "Aggregated view of academic progress, upcoming classes, and progress metrics." }
                ],
                "Grades": [
                    { src: "IIT UI Work/Student/student wants to check his report card:  grades/student wants to check his report card/my courses.png", title: "Course Selection", desc: "Choosing a particular course to view specific grade breakdowns." },
                    { src: "IIT UI Work/Student/student wants to check his report card:  grades/student wants to check his report card/grades-table.jpg", title: "Grade Ledger", desc: "Detailed tabular view of assignments, quiz scores, and final projections." },
                    { src: "IIT UI Work/Student/student wants to check his report card:  grades/student wants to check his report card/grades-table-1.jpg", title: "GPA Tracking", desc: "Cumulative grade point average and credit accumulation." }
                ],
                "Assignments": [
                    { src: "IIT UI Work/Student/student has to Upload an assignment/select a particular ongoing course - assignments.jpg", title: "Assignment List", desc: "Viewing all pending and submitted tasks for a module." },
                    { src: "IIT UI Work/Student/student has to Upload an assignment/assignments-upload submissions 1st time.jpg", title: "Submission Portal", desc: "Drag-and-drop file upload for academic tasks." },
                    { src: "IIT UI Work/Student/student has to Upload an assignment/assignments-upload submissions replace 1st screen.jpg", title: "File Replacement", desc: "Updating an existing submission before the deadline." },
                    { src: "IIT UI Work/Student/student has to Upload an assignment/assignment score.png", title: "Submission Feedback", desc: "Viewing scores and faculty commentary on submitted work." }
                ],
                "Resources": [
                    { src: "IIT UI Work/Student/student wants to check their course resources/select category.jpg", title: "Library", desc: "Accessing digital course material, handouts, and reading lists." },
                    { src: "IIT UI Work/Student/student wants to check their course resources/opening pdf.jpg", title: "PDF Viewer", desc: "In-browser document previewing for study materials." },
                    { src: "IIT UI Work/Student/student wants to check their course resources/video preview.jpg", title: "Video Lectures", desc: "Integrated video player for recorded content." }
                ],
                "Live Classes": [
                    { src: "IIT UI Work/Student/The student has to attend the live session/student screen.jpg", title: "Lobby", desc: "Pre-session verification and hardware checks." },
                    { src: "IIT UI Work/Student/The student has to attend the live session/student screen-2.jpg", title: "Interactive Hub", desc: "Polls, chat, and collaborative tools during a live lecture." },
                    { src: "IIT UI Work/Student/The student has to attend the live session/student screen-3.jpg", title: "Mobile View", desc: "Responsive class experience for students on the go." }
                ],
                "Attendance": [
                    { src: "IIT UI Work/Student/student has to check their attendence/attendance.jpg", title: "Attendance Heatmap", desc: "Visual tracking of lecture participation over the semester." }
                ]
            }
        },
        faculty: {
            flows: {
                "Auth Flow": [
                    { src: "IIT UI Work/Faculty/Login & Forget Password/login.jpg", title: "Faculty Portal", desc: "Secure gateway for authorized academic staff." },
                    { src: "IIT UI Work/Faculty/Login & Forget Password/login-3.jpg", title: "2FA Verification", desc: "Multi-factor authentication for data integrity." }
                ],
                "Grading": [
                    { src: "IIT UI Work/Faculty/faculty grading students assignments course wise/ongoing course-cybersecurity option 37.jpg", title: "Grading Master", desc: "Centralized view of student submissions for evaluation." },
                    { src: "IIT UI Work/Faculty/faculty grading students assignments course wise/assignment score.png", title: "Grade Entry", desc: "Direct score input and rubrics-based assessment." }
                ],
                "Announcements": [
                    { src: "IIT UI Work/Faculty/faculty sending an announcement messege to student/create announcement.png", title: "Broadcast", desc: "Drafting critical updates for entire student cohorts." },
                    { src: "IIT UI Work/Faculty/faculty sending an announcement messege to student/announcement.png", title: "Sent Box", desc: "Managing previously broadcasted messages." }
                ],
                "Calendar": [
                    { src: "IIT UI Work/Faculty/faculty wants to check the calender/teacher dashboard 30.jpg", title: "Weekly Sched", desc: "Managing lecture hours and office sessions." },
                    { src: "IIT UI Work/Faculty/faculty wants to check the calender/teacher dashboard 26.jpg", title: "Conflict Check", desc: "Ensuring no overlap between different teaching assignments." }
                ]
            }
        },
        admin: {
            flows: {
                "User DB": [
                    { src: "IIT UI Work/Admin/student database to Registration/student database.jpg", title: "Student DB", desc: "Comprehensive registry for student life-cycle management." },
                    { src: "IIT UI Work/Admin/Faculty database to Registration/faculty database.jpg", title: "Faculty DB", desc: "Registry of academic and administrative staff." },
                    { src: "IIT UI Work/Admin/student database to Registration/enroling student manually.jpg", title: "Enrolment", desc: "Manual student registration interface." }
                ],
                "Course Engine": [
                    { src: "IIT UI Work/Admin/Admin has to create a course/admin dashboard.jpg", title: "Course Master", desc: "Configuration of entire university course catalogs." },
                    { src: "IIT UI Work/Admin/Admin has to create a course/add participants.jpg", title: "Batch Management", desc: "Assigning groups of students to specific course modules." }
                ],
                "Exam Master": [
                    { src: "IIT UI Work/Admin/exam/create event.jpg", title: "Event Creation", desc: "Setting up institutional exam windows and proctoring rules." },
                    { src: "IIT UI Work/Admin/exam/schedule details.jpg", title: "Audit Trail", desc: "Tracking all scheduled academic audits and assessments." }
                ],
                "Settings": [
                    { src: "IIT UI Work/Admin/settings/Server.jpg", title: "Architecture", desc: "LMS infrastructure and database monitoring." },
                    { src: "IIT UI Work/Admin/settings/Appearance.jpg", title: "Branding", desc: "UI theme and institutional standard management." },
                    { src: "IIT UI Work/Admin/settings/erp settings.jpg", title: "ERP Sync", desc: "Global data synchronization with enterprise systems." }
                ]
            }
        }
    };

    class PrototypeExplorer {
        constructor(el) {
            this.container = el;
            this.role = el.dataset.prototype;
            this.flows = PROTOTYPE_DATA[this.role].flows;
            this.activeFlow = Object.keys(this.flows)[0];
            this.activeIndex = 0;

            console.log(`Initializing PrototypeExplorer for: ${this.role}`);

            // DOM Refs - Standard Gallery
            this.flowSelector = el.querySelector('.flow-selector');
            this.sidebar = el.querySelector('.screens-sidebar');
            this.preview = el.querySelector('.mainPreview');
            this.title = el.querySelector('.screenTitle');
            this.desc = el.querySelector('.screenDesc');
            this.prevBtn = el.querySelector('.prevScreen');
            this.nextBtn = el.querySelector('.nextScreen');

            // DOM Refs - Working UI App Shell
            this.appShell = el.querySelector('.prototype-app-shell');
            this.appContent = el.querySelector('.app-page-content');
            this.imageViewer = el.querySelector('.prototype-image-viewer');
            this.navItems = el.querySelectorAll('.nav-item');

            this.init();
        }

        init() {
            this.updateFlows();
            this.updateScreens();
            
            if (this.prevBtn) this.prevBtn.onclick = () => this.navigate(-1);
            if (this.nextBtn) this.nextBtn.onclick = () => this.navigate(1);

            // Wire up App Shell Sidebar
            if (this.navItems.length > 0) {
                this.navItems.forEach(item => {
                    item.addEventListener('click', (e) => {
                        e.preventDefault();
                        const view = item.getAttribute('data-view');
                        console.log(`Sidebar clicked: ${view} for ${this.role}`);
                        this.switchAppView(view, item);
                    });
                });
            }
        }

        switchAppView(view, clickedItem) {
            if (!this.imageViewer) return;

            // Update UI Sidebar active states
            this.navItems.forEach(nav => nav.classList.remove('active'));
            if (clickedItem) clickedItem.classList.add('active');

            // Logic: Dashboard/Overview -> Show HTML App Shell. Everything else -> Show Image.
            const isDashboard = ['dashboard', 'overview', 'health'].includes(view.toLowerCase());
            
            if (isDashboard) {
                // Show the app shell, hide the image viewer
                if (this.appShell) this.appShell.classList.remove('hidden-ui');
                this.imageViewer.classList.add('hidden-ui');
                this.activeFlow = Object.keys(this.flows)[0];
                this.activeIndex = 0;
                this.updateScreens();
            } else {
                // Hide the app shell, show the image viewer
                if (this.appShell) this.appShell.classList.add('hidden-ui');
                this.imageViewer.classList.remove('hidden-ui');
                
                // Find matching flow for the clicked nav item
                const flowKey = Object.keys(this.flows).find(k => 
                    k.toLowerCase().includes(view.toLowerCase()) || 
                    view.toLowerCase().includes(k.toLowerCase())
                );

                if (flowKey) {
                    this.activeFlow = flowKey;
                    this.activeIndex = 0;
                    this.updateScreens();
                } else {
                    console.warn(`No flow found matching view: ${view}`);
                }
            }
        }

        updateFlows() {
            if (!this.flowSelector) return;
            this.flowSelector.innerHTML = '';
            Object.keys(this.flows).forEach(flow => {
                const chip = document.createElement('div');
                chip.className = `flow-chip ${flow === this.activeFlow ? 'active' : ''}`;
                chip.textContent = flow;
                chip.onclick = () => {
                    this.activeFlow = flow;
                    this.activeIndex = 0;
                    this.updateScreens();
                    this.updateFlows();

                    // Force image viewer on chip click
                    if (this.appShell) this.appShell.classList.add('hidden-ui');
                    if (this.imageViewer) this.imageViewer.classList.remove('hidden-ui');
                };
                this.flowSelector.appendChild(chip);
            });
        }

        updateScreens() {
            if (!this.sidebar) return;
            this.sidebar.innerHTML = '';
            const screens = this.flows[this.activeFlow];
            if (!screens) return;

            screens.forEach((screen, index) => {
                const thumb = document.createElement('div');
                thumb.className = `thumb-item ${index === this.activeIndex ? 'active' : ''}`;
                thumb.innerHTML = `<img src="${screen.src}" loading="lazy">`;
                thumb.onclick = () => {
                    this.activeIndex = index;
                    this.render();
                    
                    if (this.appShell) this.appShell.classList.add('hidden-ui');
                    if (this.imageViewer) this.imageViewer.classList.remove('hidden-ui');
                };
                this.sidebar.appendChild(thumb);
            });
            this.render();
        }

        render() {
            if (!this.preview) return;
            const screens = this.flows[this.activeFlow];
            if (!screens || !screens[this.activeIndex]) return;

            const screen = screens[this.activeIndex];
            this.preview.style.opacity = '0';
            
            setTimeout(() => {
                this.preview.src = screen.src;
                if (this.title) this.title.textContent = screen.title;
                if (this.desc) this.desc.textContent = screen.desc;
                this.preview.style.opacity = '1';
                
                if (this.sidebar) {
                    this.sidebar.querySelectorAll('.thumb-item').forEach((t, i) => {
                        t.classList.toggle('active', i === this.activeIndex);
                    });
                }
            }, 100);
        }

        navigate(dir) {
            const len = this.flows[this.activeFlow].length;
            this.activeIndex = (this.activeIndex + dir + len) % len;
            this.render();

            if (this.appShell) this.appShell.classList.add('hidden-ui');
            if (this.imageViewer) this.imageViewer.classList.remove('hidden-ui');
        }
    }

    function initAllPrototypes() {
        const explorers = document.querySelectorAll('.prototype-explorer');
        console.log(`Found ${explorers.length} prototype explorers.`);
        explorers.forEach(el => {
            new PrototypeExplorer(el);
        });
    }

    // --- Safe Initialization ---
    function safeInit() {
        console.log('Running safe initialization (v6)...');
        init(); // Core presentation init
        
        // Brief delay to ensure CSS transitions and DOM ready
        setTimeout(() => {
            initAllPrototypes();
        }, 100);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', safeInit);
    } else {
        safeInit();
    }
})();
