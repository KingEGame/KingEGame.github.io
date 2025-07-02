// Theme Management
const themeToggle = document.querySelector('.theme-toggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', currentTheme);

// Only update theme if elements exist
if (themeToggle) {
    const themeIcon = themeToggle.querySelector('i');
    updateThemeIcon(currentTheme);

    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add smooth transition effect
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });

    function updateThemeIcon(theme) {
        if (themeIcon) {
            if (theme === 'dark') {
                themeIcon.className = 'fas fa-sun';
            } else {
                themeIcon.className = 'fas fa-moon';
            }
        }
    }
}

// Mobile Navigation
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
        const isVisible = navLinks.classList.contains('show');
        
        if (isVisible) {
            navLinks.classList.remove('show');
        } else {
            navLinks.classList.add('show');
        }
        
        // Update menu icon
        const icon = menuBtn.querySelector('i');
        if (icon) {
            icon.className = isVisible ? 'fas fa-bars' : 'fas fa-times';
        }
    });

    // Close mobile menu when clicking on nav links
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('show');
                const icon = menuBtn.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !menuBtn.contains(e.target) && 
            !navLinks.contains(e.target)) {
            navLinks.classList.remove('show');
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-bars';
            }
        }
    });
}

// Smooth Scrolling with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced Navbar Scroll Effects
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add blur and shadow when scrolling
    if (currentScroll > 0) {
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.borderBottomColor = 'var(--border-color)';
    } else {
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.borderBottomColor = 'transparent';
    }
    
    // Hide/show navbar based on scroll direction
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Enhanced Intersection Observer for Animations
const observerOptions = {
    root: null,
    rootMargin: '-100px 0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Special animations for different elements
            if (entry.target.classList.contains('stat-item')) {
                animateCounter(entry.target);
            }
            
            if (entry.target.classList.contains('skill-tag')) {
                animateSkillTags(entry.target.parentElement);
            }
            
            if (entry.target.classList.contains('timeline-item')) {
                animateTimelineItem(entry.target);
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation (only if elements exist)
const elementsToObserve = [
    'section',
    '.stat-item',
    '.timeline-item',
    '.skill-category',
    '.project-card',
    '.education-card',
    '.competency-item'
];

// Only add animations if page is fully loaded and elements exist
setTimeout(() => {
    elementsToObserve.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            if (element) {
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(element);
            }
        });
    });
}, 100);

// Counter Animation for Stats
function animateCounter(element) {
    const counter = element.querySelector('.stat-number');
    const target = parseInt(counter.textContent.replace(/\D/g, ''));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Preserve the + or original formatting
        const originalText = counter.textContent;
        const hasPlus = originalText.includes('+');
        counter.textContent = Math.floor(current) + (hasPlus ? '+' : '');
    }, 16);
}

// Animate Skill Tags
function animateSkillTags(container) {
    const tags = container.querySelectorAll('.skill-tag');
    tags.forEach((tag, index) => {
        setTimeout(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0) scale(1)';
        }, index * 100);
    });
}

// Animate Timeline Items
function animateTimelineItem(item) {
    const content = item.querySelector('.timeline-content');
    const isEven = Array.from(item.parentNode.children).indexOf(item) % 2 === 1;
    
    content.style.transform = `translateX(${isEven ? '50px' : '-50px'}) translateY(30px)`;
    
    setTimeout(() => {
        content.style.transform = 'translateX(0) translateY(0)';
    }, 100);
}

// Enhanced Scroll Progress Indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

createScrollProgress();

// Typing Effect for Hero Section
function createTypingEffect() {
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero .animate-text-delay');
    
    if (heroTitle && heroSubtitle) {
        const titleText = heroTitle.textContent;
        const subtitleText = heroSubtitle.textContent;
        
        heroTitle.textContent = '';
        heroSubtitle.textContent = '';
        
        let titleIndex = 0;
        let subtitleIndex = 0;
        
        function typeTitle() {
            if (titleIndex < titleText.length) {
                heroTitle.textContent += titleText.charAt(titleIndex);
                titleIndex++;
                setTimeout(typeTitle, 80);
            } else {
                setTimeout(typeSubtitle, 500);
            }
        }
        
        function typeSubtitle() {
            if (subtitleIndex < subtitleText.length) {
                heroSubtitle.textContent += subtitleText.charAt(subtitleIndex);
                subtitleIndex++;
                setTimeout(typeSubtitle, 60);
            }
        }
        
        // Start typing effect when page loads
        setTimeout(typeTitle, 1000);
    }
}

// Particle Background Effect for Hero Section
function createParticleBackground() {
    const hero = document.querySelector('.hero');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        opacity: 0.1;
    `;
    
    hero.appendChild(canvas);
    
    let particles = [];
    const particleCount = 50;
    
    function resizeCanvas() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }
    
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            dx: (Math.random() - 0.5) * 2,
            dy: (Math.random() - 0.5) * 2,
            size: Math.random() * 3 + 1
        };
    }
    
    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }
    }
    
    function updateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.dx;
            particle.y += particle.dy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.fill();
        });
        
        requestAnimationFrame(updateParticles);
    }
    
    resizeCanvas();
    initParticles();
    updateParticles();
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.querySelector('.contact-form-element');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelector('input[type="text"]:nth-of-type(2)').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Create mailto link
            const mailtoLink = `mailto:damirov.ilian@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            showNotification('Email client opened successfully!', 'success');
            
            // Reset form
            this.reset();
        });
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    `;
    
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6'
    };
    
    notification.style.background = colors[type] || colors.info;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .animate {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(notificationStyles);

// Download Resume Functionality
function initResumeDownload() {
    const downloadBtn = document.getElementById('download-resume');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // You can replace this with actual resume file
            const resumeUrl = './Damirov ilian (1).pdf'; // Reference to your PDF file
            
            // Create temporary link
            const link = document.createElement('a');
            link.href = resumeUrl;
            link.download = 'Ilian_Damirov_Resume.pdf';
            link.style.display = 'none';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            showNotification('Resume download started!', 'success');
        });
    }
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Simple and safe initialization
    try {
        initContactForm();
        initResumeDownload();
        
        // Add enhanced effects only if everything is working
        setTimeout(() => {
            createTypingEffect();
            createParticleBackground();
        }, 500);
        
    } catch (error) {
        console.log('Some features failed to load, but the site will work normally');
    }
});

// Add enhanced styles for better UX
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
    body {
        opacity: 1;
        transition: opacity 0.3s ease;
    }
    
    .skill-tag {
        transition: all 0.3s ease;
    }
    
    .skill-tag:hover {
        transform: translateY(-2px) scale(1.05);
        background: var(--primary-color);
        color: white;
    }
    
    .animate {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(enhancedStyles);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Any additional scroll handling can go here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add smooth reveal animation for elements
function addRevealAnimation() {
    const reveals = document.querySelectorAll('.timeline-content, .project-card, .education-card');
    
    reveals.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });
}

// Initialize reveal animations
setTimeout(addRevealAnimation, 1000);

// Enhanced hover effects for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add dynamic year update for footer
function updateFooterYear() {
    const footer = document.querySelector('.footer p');
    if (footer) {
        const currentYear = new Date().getFullYear();
        footer.innerHTML = footer.innerHTML.replace('2024', currentYear);
    }
}

updateFooterYear(); 