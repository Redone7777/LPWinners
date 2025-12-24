/**
 * LPWinners - Main Application
 * Initializes all modules and handles global functionality
 */

import { initParticles } from './particles.js';
import { initScrollReveal, initSmoothScroll } from './scroll.js';
import { initAnimations } from './animations.js';
import { auth } from './auth.js';

class App {
  constructor() {
    this.sidebar = document.getElementById('sidebar');
    this.sidebarOverlay = document.getElementById('sidebar-overlay');
    this.mobileMenuBtn = document.getElementById('mobile-menu-btn');

    this.init();
  }

  init() {
    // Wait for DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    // Initialize modules
    this.initSidebar();
    this.initNavigation();
    this.initSearch();
    this.initRippleEffect();

    // Initialize visual modules
    initParticles();
    initSmoothScroll();
    initScrollReveal();
    initAnimations();

    // Initialize auth (update sidebar icon)
    auth.updateUI();

    // Mark app as ready
    document.body.classList.add('app-ready');

    console.log('🎮 LPWinners initialized');
  }

  // Sidebar functionality
  initSidebar() {
    // Mobile menu toggle
    if (this.mobileMenuBtn) {
      this.mobileMenuBtn.addEventListener('click', () => this.toggleMobileSidebar());
    }

    // Overlay click to close
    if (this.sidebarOverlay) {
      this.sidebarOverlay.addEventListener('click', () => this.closeMobileSidebar());
    }

    // Sidebar hover expand (desktop)
    if (this.sidebar && window.innerWidth > 768) {
      this.sidebar.addEventListener('mouseenter', () => {
        this.sidebar.classList.add('expanded');
        document.querySelector('.app')?.classList.add('sidebar-expanded');
      });

      this.sidebar.addEventListener('mouseleave', () => {
        this.sidebar.classList.remove('expanded');
        document.querySelector('.app')?.classList.remove('sidebar-expanded');
      });
    }
  }

  toggleMobileSidebar() {
    this.sidebar?.classList.toggle('mobile-open');
    this.sidebarOverlay?.classList.toggle('active');
    document.body.classList.toggle('sidebar-open');
  }

  closeMobileSidebar() {
    this.sidebar?.classList.remove('mobile-open');
    this.sidebarOverlay?.classList.remove('active');
    document.body.classList.remove('sidebar-open');
  }

  // Navigation active state
  initNavigation() {
    const navItems = document.querySelectorAll('.sidebar-nav-item');
    const currentPage = window.location.pathname;

    navItems.forEach(item => {
      const href = item.getAttribute('href');
      if (href && currentPage.includes(item.dataset.page)) {
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      }
    });
  }

  // Search functionality
  initSearch() {
    const searchInput = document.querySelector('.header-search input');

    if (searchInput) {
      searchInput.addEventListener('focus', () => {
        searchInput.parentElement.classList.add('focused');
      });

      searchInput.addEventListener('blur', () => {
        searchInput.parentElement.classList.remove('focused');
      });

      // Search on Enter
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const query = searchInput.value.trim();
          if (query) {
            console.log('Searching for:', query);
            // Implement search navigation
          }
        }
      });
    }
  }

  // Ripple effect for buttons
  initRippleEffect() {
    document.addEventListener('click', (e) => {
      const button = e.target.closest('.btn, .ripple');

      if (button) {
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
        ripple.classList.add('ripple-effect');

        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
      }
    });
  }
}

// Utility functions
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function throttle(func, limit) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Initialize app
const app = new App();

export default app;
