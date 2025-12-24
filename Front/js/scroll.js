/**
 * LPWinners - Scroll Effects
 * Smooth scrolling and scroll-based animations
 */

// Scroll reveal observer
let scrollObserver = null;

export function initScrollReveal() {
    // Get all elements with reveal classes
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    if (!revealElements.length) return;

    // Create intersection observer
    scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add stagger delay based on position
                const staggerDelay = entry.target.classList.contains('stagger-1') ? 50 :
                    entry.target.classList.contains('stagger-2') ? 100 :
                        entry.target.classList.contains('stagger-3') ? 150 :
                            entry.target.classList.contains('stagger-4') ? 200 :
                                entry.target.classList.contains('stagger-5') ? 250 : 0;

                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, staggerDelay);

                // Optionally unobserve after reveal
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all reveal elements
    revealElements.forEach(el => {
        scrollObserver.observe(el);
    });

    console.log('👁️ Scroll reveal initialized');
}

// Parallax effect for elements with data-parallax attribute
export function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    if (!parallaxElements.length) return;

    const handleParallax = () => {
        const scrollY = window.scrollY;

        parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.parallax) || 0.5;
            const yOffset = scrollY * speed;
            el.style.transform = `translateY(${yOffset}px)`;
        });
    };

    window.addEventListener('scroll', handleParallax, { passive: true });

    console.log('🎭 Parallax initialized');
}

// Smooth scroll using native CSS scroll-behavior
// This is a lightweight alternative to Lenis
export function initSmoothScroll() {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';

    // Handle anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');

            if (targetId === '#') return;

            const target = document.querySelector(targetId);

            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    console.log('🌊 Smooth scroll initialized');
}

// Scroll progress indicator
export function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progressBar);

    const bar = progressBar.querySelector('.scroll-progress-bar');

    const updateProgress = () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (window.scrollY / scrollHeight) * 100;
        bar.style.width = `${scrollProgress}%`;
    };

    window.addEventListener('scroll', updateProgress, { passive: true });

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
    .scroll-progress {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: var(--bg-secondary);
      z-index: 9999;
    }
    .scroll-progress-bar {
      height: 100%;
      background: linear-gradient(90deg, var(--accent-primary), var(--accent-cyan));
      width: 0%;
      transition: width 0.1s ease;
    }
  `;
    document.head.appendChild(style);
}

// Header hide/show on scroll
export function initScrollHeader() {
    const header = document.querySelector('.header');

    if (!header) return;

    let lastScrollY = 0;
    let ticking = false;

    const updateHeader = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down
            header.classList.add('header-hidden');
        } else {
            // Scrolling up
            header.classList.remove('header-hidden');
        }

        lastScrollY = currentScrollY;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }, { passive: true });

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
    .header {
      transition: transform var(--transition-base);
    }
    .header-hidden {
      transform: translateY(-100%);
    }
  `;
    document.head.appendChild(style);
}

// Cleanup function
export function destroyScrollEffects() {
    if (scrollObserver) {
        scrollObserver.disconnect();
        scrollObserver = null;
    }
}
