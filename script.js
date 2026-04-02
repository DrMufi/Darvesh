/**
 * Growing Talk - Interactive JavaScript
 * Multi-Page Educational Website
 *
 * Features:
 * - Mobile hamburger menu
 * - Scroll progress indicator
 * - Scroll-to-top button
 * - Scroll animations
 * - Navbar scroll effect
 */

// ============================================
// DOM Elements
// ============================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const scrollProgress = document.getElementById('scrollProgress');
const scrollToTopBtn = document.getElementById('scrollToTop');

// ============================================
// Scroll Progress Indicator
// ============================================
function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = scrollPercent + '%';
}

// ============================================
// Navbar Scroll Effect
// ============================================
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ============================================
// Mobile Navigation Toggle
// ============================================
function toggleMobileMenu() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================
// Scroll to Top Button
// ============================================
function handleScrollToTopVisibility() {
    if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ============================================
// Scroll Animations (Intersection Observer)
// ============================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (animatedElements.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ============================================
// Keyboard Navigation Support
// ============================================
function initKeyboardNavigation() {
    navToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMobileMenu();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

// ============================================
// Debounce Function for Performance
// ============================================
function debounce(func, wait = 10) {
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

// ============================================
// Combined Scroll Handler
// ============================================
const handleScroll = debounce(() => {
    updateScrollProgress();
    handleNavbarScroll();
    handleScrollToTopVisibility();
}, 10);

// ============================================
// Event Listeners
// ============================================
function initEventListeners() {
    window.addEventListener('scroll', handleScroll);

    navToggle.addEventListener('click', toggleMobileMenu);

    scrollToTopBtn.addEventListener('click', scrollToTop);

    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') &&
            !navMenu.contains(e.target) &&
            !navToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });

    window.addEventListener('resize', debounce(() => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    }, 250));
}

// ============================================
// Initialize Everything
// ============================================
function init() {
    initEventListeners();
    initScrollAnimations();
    initKeyboardNavigation();

    updateScrollProgress();
    handleNavbarScroll();
    handleScrollToTopVisibility();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
