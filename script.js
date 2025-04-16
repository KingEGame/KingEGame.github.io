// Mobile Navigation
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        return;
    }
    
    if (currentScroll > lastScroll) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with animation classes
document.querySelectorAll('.section-title, .about-content, .skills-grid, .projects-grid, .contact-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Add animation class when element is in view
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.animate').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
});

// Typing Effect for Hero Section
const heroText = document.querySelector('.hero h1');
const text = heroText.textContent;
heroText.textContent = '';

let i = 0;
function typeWriter() {
    if (i < text.length) {
        heroText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect when page loads
window.addEventListener('load', typeWriter);

// Skills Progress Animation
const skills = [
    { name: 'JavaScript', level: 90 },
    { name: 'HTML/CSS', level: 95 },
    { name: 'React', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'Python', level: 75 }
];

const skillsGrid = document.querySelector('.skills-grid');

skills.forEach(skill => {
    const skillElement = document.createElement('div');
    skillElement.className = 'skill-item';
    skillElement.innerHTML = `
        <div class="skill-info">
            <span class="skill-name">${skill.name}</span>
            <span class="skill-percentage">${skill.level}%</span>
        </div>
        <div class="skill-bar">
            <div class="skill-progress" style="width: 0%"></div>
        </div>
    `;
    skillsGrid.appendChild(skillElement);
});

// Animate skill bars when in view
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.skill-progress');
            const percentage = entry.target.querySelector('.skill-percentage').textContent;
            progressBar.style.width = percentage;
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-item').forEach(skill => {
    skillObserver.observe(skill);
});

// Add CSS for skill bars
const style = document.createElement('style');
style.textContent = `
    .skill-item {
        background: white;
        padding: 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .skill-info {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
    }

    .skill-bar {
        height: 8px;
        background: #e5e7eb;
        border-radius: 4px;
        overflow: hidden;
    }

    .skill-progress {
        height: 100%;
        background: var(--primary-color);
        transition: width 1s ease-out;
    }
`;
document.head.appendChild(style); 