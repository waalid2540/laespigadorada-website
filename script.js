/* ========================================
   LA ESPIGA DORADA - INTERACTIVE FEATURES
   Authentic Mexican Bakery
   ======================================== */

// ========================================
// FLOATING HEARTS ON CLICK
// ========================================
document.addEventListener('click', function(event) {
    // Don't create hearts when clicking buttons or links
    if (event.target.closest('button, a, input, textarea, select')) return;
    createFloatingHeart(event.clientX, event.clientY);
});

function createFloatingHeart(x, y) {
    const heart = document.createElement('span');
    heart.classList.add('floating-heart');

    const hearts = ['🎂', '🧁', '🍰', '🥐', '🍞', '🥧'];
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

    heart.style.left = x + 'px';
    heart.style.top = y + 'px';

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 1000);
}


// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================
function revealOnScroll() {
    const reveals = document.querySelectorAll('.section-header, .cake-card, .feature-card, .menu-card, .review-card, .gallery-item, .info-card');

    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 100;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('revealed');
            element.style.opacity = '1';
            element.style.transform = element.classList.contains('review-card') && element.classList.contains('featured')
                ? 'scale(1.05)'
                : 'translateY(0)';
        }
    });
}

// Set initial state for reveal elements
document.addEventListener('DOMContentLoaded', function() {
    const reveals = document.querySelectorAll('.section-header, .cake-card, .feature-card, .menu-card, .review-card, .gallery-item, .info-card');

    reveals.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `all 0.6s ease ${index * 0.1}s`;
    });

    // Trigger initial check
    setTimeout(revealOnScroll, 100);
});

window.addEventListener('scroll', revealOnScroll);

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 30px rgba(62, 39, 35, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.9)';
        navbar.style.boxShadow = '0 4px 20px rgba(62, 39, 35, 0.06)';
    }

    lastScroll = currentScroll;
});

// ========================================
// MOBILE HAMBURGER MENU
// ========================================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navCta = document.querySelector('.nav-cta');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('open');
        if (navCta) navCta.classList.toggle('open');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
            if (navCta) navCta.classList.remove('open');
        });
    });
}

// ========================================
// SMOOTH SCROLL FOR NAV LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// MENU TABS (placeholder functionality)
// ========================================
const menuTabs = document.querySelectorAll('.menu-tab');

menuTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        // Remove active from all tabs
        menuTabs.forEach(t => t.classList.remove('active'));
        // Add active to clicked tab
        this.classList.add('active');

        // Add a cute bounce effect
        this.style.transform = 'translateY(-5px) scale(1.05)';
        setTimeout(() => {
            this.style.transform = 'translateY(-2px)';
        }, 200);
    });
});

// ========================================
// CAKE CARD HOVER SPARKLE EFFECT
// ========================================
document.querySelectorAll('.cake-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        // Create sparkles around the card
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('span');
                sparkle.textContent = '✨';
                sparkle.style.cssText = `
                    position: absolute;
                    font-size: 1.5rem;
                    pointer-events: none;
                    z-index: 100;
                    animation: sparkle-pop 0.6s ease-out forwards;
                `;

                const rect = card.getBoundingClientRect();
                sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
                sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';

                document.body.appendChild(sparkle);
                setTimeout(() => sparkle.remove(), 600);
            }, i * 100);
        }
    });
});

// Add sparkle animation to stylesheet
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkle-pop {
        0% { transform: scale(0) rotate(0deg); opacity: 1; }
        50% { transform: scale(1.5) rotate(180deg); opacity: 1; }
        100% { transform: scale(0) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(sparkleStyle);

// ========================================
// FORM SUBMISSION (placeholder)
// ========================================
const orderForm = document.querySelector('.order-form');
if (orderForm) {
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Create success message
        const btn = this.querySelector('button');
        const originalText = btn.textContent;

        btn.textContent = currentLang === 'en' ? '✨ Sent! ✨' : '✨ Enviado! ✨';
        btn.style.background = 'linear-gradient(135deg, #a8e6cf 0%, #88d4ab 100%)';

        // Create celebration hearts
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                createFloatingHeart(
                    window.innerWidth / 2 + (Math.random() - 0.5) * 200,
                    window.innerHeight / 2
                );
            }, i * 100);
        }

        // Reset after 3 seconds
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            this.reset();
        }, 3000);
    });
}

// ========================================
// GALLERY ITEM INTERACTION
// ========================================
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        // Create burst of hearts
        const rect = this.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createFloatingHeart(
                    centerX + (Math.random() - 0.5) * 100,
                    centerY + (Math.random() - 0.5) * 100
                );
            }, i * 50);
        }
    });
});

// ========================================
// REVIEW CARD HOVER EFFECT
// ========================================
document.querySelectorAll('.review-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const stars = this.querySelector('.review-stars');
        if (stars) {
            stars.style.transform = 'scale(1.1)';
            stars.style.transition = 'transform 0.3s ease';
        }
    });

    card.addEventListener('mouseleave', function() {
        const stars = this.querySelector('.review-stars');
        if (stars) {
            stars.style.transform = 'scale(1)';
        }
    });
});

// ========================================
// EASTER EGG: LOGO CLICK
// ========================================
let logoClicks = 0;
const logo = document.querySelector('.logo');

if (logo) {
    logo.addEventListener('click', function() {
        logoClicks++;

        // Wiggle effect
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'wiggle 0.5s ease';
        }, 10);

        // Easter egg at 5 clicks
        if (logoClicks === 5) {
            // Rainbow mode!
            document.body.style.transition = 'filter 0.5s ease';
            document.body.style.filter = 'hue-rotate(360deg)';

            // Create lots of sparkles
            for (let i = 0; i < 30; i++) {
                setTimeout(() => {
                    createFloatingHeart(
                        Math.random() * window.innerWidth,
                        Math.random() * window.innerHeight
                    );
                }, i * 50);
            }

            // Reset
            setTimeout(() => {
                document.body.style.filter = '';
                logoClicks = 0;
            }, 2000);
        }
    });
}

// Add wiggle animation
const wiggleStyle = document.createElement('style');
wiggleStyle.textContent = `
    @keyframes wiggle {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-5deg); }
        75% { transform: rotate(5deg); }
    }
`;
document.head.appendChild(wiggleStyle);

// ========================================
// PARALLAX EFFECT ON HERO
// ========================================
const heroImage = document.querySelector('.hero-image-wrapper');

window.addEventListener('scroll', function() {
    if (heroImage) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;

        if (scrolled < window.innerHeight) {
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    }
});

// ========================================
// LANGUAGE TOGGLE (EN / ES)
// ========================================
let currentLang = 'es';

function setLanguage(lang) {
    currentLang = lang;

    // Update all elements with data-en / data-es attributes
    document.querySelectorAll('[data-en][data-es]').forEach(el => {
        el.textContent = el.getAttribute('data-' + lang);
    });

    // Update placeholders on inputs/textareas
    document.querySelectorAll('[data-en-placeholder][data-es-placeholder]').forEach(el => {
        el.placeholder = el.getAttribute('data-' + lang + '-placeholder');
    });

    // Update active state on buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
}

// Set up click handlers
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        setLanguage(this.getAttribute('data-lang'));
    });
});

// Set default language to Spanish
setLanguage('es');

// ========================================
// FORCE HERO VIDEO TO LOOP CONTINUOUSLY
// ========================================
const heroVideo = document.querySelector('.hero-image-wrapper video');
if (heroVideo) {
    heroVideo.loop = true;
    heroVideo.muted = true;
    heroVideo.playsInline = true;

    // Force play on load
    heroVideo.play().catch(() => {});

    // If it ever pauses or ends, restart it
    heroVideo.addEventListener('pause', () => heroVideo.play().catch(() => {}));
    heroVideo.addEventListener('ended', () => { heroVideo.currentTime = 0; heroVideo.play().catch(() => {}); });

    // Also retry on user interaction (mobile Safari needs this)
    document.addEventListener('touchstart', function startVideo() {
        heroVideo.play().catch(() => {});
        document.removeEventListener('touchstart', startVideo);
    }, { once: true });
}

// ========================================
// CONSOLE MESSAGE
// ========================================
console.log('%c🌾 Bienvenidos a La Espiga Dorada! 🌾',
    'font-size: 24px; color: #C8952E; font-family: cursive; text-shadow: 2px 2px #FFF8E7;');
console.log('%cHaz clic en el logo 5 veces para una sorpresa! ✨',
    'font-size: 14px; color: #6D4C41;');
