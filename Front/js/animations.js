/**
 * LPWinners - Animations
 * Enhanced animations and micro-interactions
 */

// Animation utilities
export function initAnimations() {
    initHoverEffects();
    initButtonAnimations();
    initCardAnimations();
    initCounterAnimations();

    console.log('🎬 Animations initialized');
}

// Enhanced hover effects
function initHoverEffects() {
    // Magnetic buttons
    document.querySelectorAll('.btn-primary, .btn-magnetic').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    // Tilt effect on cards
    document.querySelectorAll('.glass-card-accent, .hero-card, .champion-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            const tiltX = (y - 0.5) * 10;
            const tiltY = (x - 0.5) * -10;

            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// Button loading and success states
function initButtonAnimations() {
    document.querySelectorAll('.btn[data-loading]').forEach(btn => {
        btn.addEventListener('click', async function () {
            if (btn.classList.contains('loading')) return;

            const originalText = btn.innerHTML;
            btn.classList.add('loading');
            btn.innerHTML = '<span class="loading-spinner loading-spinner-sm"></span>';
            btn.disabled = true;

            // Simulate async action
            await new Promise(resolve => setTimeout(resolve, 2000));

            btn.classList.remove('loading');
            btn.classList.add('success');
            btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 6 9 17l-5-5"/>
        </svg>
      `;

            setTimeout(() => {
                btn.classList.remove('success');
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 1500);
        });
    });
}

// Card entrance animations
function initCardAnimations() {
    const cards = document.querySelectorAll('.post-card, .quick-link-card, .meta-champion-card');

    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + index * 50);
    });
}

// Animated counters for stats
function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-counter]');

    const animateCounter = (element) => {
        const target = parseInt(element.dataset.counter);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    };

    // Observe counters and animate when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// Staggered list animation
export function animateList(container, itemSelector, delay = 50) {
    const items = container.querySelectorAll(itemSelector);

    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(10px)';

        setTimeout(() => {
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * delay);
    });
}

// Typing animation for text
export function typeText(element, text, speed = 50) {
    return new Promise(resolve => {
        let index = 0;
        element.textContent = '';

        const type = () => {
            if (index < text.length) {
                element.textContent += text[index];
                index++;
                setTimeout(type, speed);
            } else {
                resolve();
            }
        };

        type();
    });
}

// Shake animation for errors
export function shake(element) {
    element.classList.add('shake');
    setTimeout(() => element.classList.remove('shake'), 500);
}

// Add shake animation styles
const shakeStyles = document.createElement('style');
shakeStyles.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
  .shake {
    animation: shake 0.5s ease-in-out;
  }
`;
document.head.appendChild(shakeStyles);

// Number morphing animation
export function morphNumber(element, from, to, duration = 1000) {
    const startTime = performance.now();

    const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);

        const current = from + (to - from) * easeOutQuart;
        element.textContent = Math.round(current);

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    };

    requestAnimationFrame(update);
}

// Slide transition between elements
export function slideTransition(outElement, inElement, direction = 'left') {
    const translateOut = direction === 'left' ? '-100%' : '100%';
    const translateIn = direction === 'left' ? '100%' : '-100%';

    outElement.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
    outElement.style.transform = `translateX(${translateOut})`;
    outElement.style.opacity = '0';

    inElement.style.transform = `translateX(${translateIn})`;
    inElement.style.opacity = '0';
    inElement.style.display = 'block';

    requestAnimationFrame(() => {
        inElement.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
        inElement.style.transform = 'translateX(0)';
        inElement.style.opacity = '1';
    });

    setTimeout(() => {
        outElement.style.display = 'none';
    }, 400);
}

// Glow pulse effect
export function glowPulse(element, color = 'var(--accent-primary)', duration = 1000) {
    const originalBoxShadow = element.style.boxShadow;

    element.style.transition = `box-shadow ${duration / 2}ms ease`;
    element.style.boxShadow = `0 0 30px ${color}`;

    setTimeout(() => {
        element.style.boxShadow = originalBoxShadow;
    }, duration / 2);
}
