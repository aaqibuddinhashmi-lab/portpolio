document.addEventListener("DOMContentLoaded", () => {
    
    // --- Custom Cursor ---
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");
    const interactiveElements = document.querySelectorAll("a, button, .mockup-img, .glass-card, .tilt-card");

    window.addEventListener("mousemove", (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Use requestAnimationFrame for smoother performance
        requestAnimationFrame(() => {
            if(cursorDot) {
                cursorDot.style.left = `${posX}px`;
                cursorDot.style.top = `${posY}px`;
            }
            if(cursorOutline) {
                // slight delay effect for the outline
                cursorOutline.animate({
                    left: `${posX}px`,
                    top: `${posY}px`
                }, { duration: 500, fill: "forwards" });
            }
        });
    });

    interactiveElements.forEach(el => {
        el.addEventListener("mouseenter", () => document.body.classList.add("interactive-hover"));
        el.addEventListener("mouseleave", () => document.body.classList.remove("interactive-hover"));
    });

    // --- Read Progress Bar ---
    const progressBar = document.getElementById("progressBar");
    
    window.addEventListener("scroll", () => {
        let scrollTop = window.scrollY;
        let docHeight = document.body.clientHeight - window.innerHeight;
        let scrollPercent = (scrollTop / docHeight) * 100;
        
        if(progressBar) {
            progressBar.style.width = scrollPercent + "%";
        }

        // --- Glass Nav Effect ---
        const nav = document.querySelector(".glass-nav");
        if(nav) {
            if (scrollTop > 50) {
                nav.classList.add("scrolled");
            } else {
                nav.classList.remove("scrolled");
            }
        }
    });

    // --- Scroll Reveal Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .fade-in-up');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // On load animations for hero elements
    setTimeout(() => {
        document.querySelectorAll('.hero .fade-in-up').forEach(el => {
            el.classList.add('active');
        });
    }, 100);

    // --- Smooth Scrolling for Hash Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- 3D Tilt Effect on Showcase Images ---
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            const image = card.querySelector('.app-screenshot');
            if (image) {
                image.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                image.style.transition = 'none';
            }
        });

        card.addEventListener('mouseleave', () => {
            const image = card.querySelector('.app-screenshot');
            if (image) {
                image.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
                image.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            }
        });
    });
});
