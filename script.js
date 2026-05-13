// Dark Mode Only - No Theme Switching Needed
console.log("Portfolio loaded in dark mode");

// Typing Animation for Hero Subtitle
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing');
    const phrases = [
        'Aspiring AI Engineer',
        'Full Stack Developer',
        'Research Enthusiast'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 2000;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (!isDeleting) {
            // Typing forward
            if (charIndex < currentPhrase.length) {
                typingElement.textContent += currentPhrase.charAt(charIndex);
                charIndex++;
                setTimeout(type, typingSpeed);
            } else {
                // Pause before deleting
                isDeleting = true;
                setTimeout(type, pauseTime);
            }
        } else {
            // Deleting backwards
            if (charIndex > 0) {
                typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(type, deletingSpeed);
            } else {
                // Move to next phrase
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(type, 500);
            }
        }
    }
    
    type();
}

// Mouse tracking for project cards
document.addEventListener('DOMContentLoaded', function() {
    // Initialize typing animation
    initTypingAnimation();
    
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--mouse-x', '50%');
            card.style.setProperty('--mouse-y', '50%');
        });
    });

    // Smooth scrolling
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.education-card, .timeline-item, .project-card, .contact-icon, .tool-item, .skill-category, .achievement-card, .research-card, .interest-tag, .certification-card, .leetcode-widget');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Add glow effect to avatar on hover
    const avatar = document.querySelector('.avatar');
    const avatarGlow = document.querySelector('.avatar-glow');
    
    if (avatar && avatarGlow) {
        avatar.addEventListener('mouseenter', function() {
            avatarGlow.style.background = 'radial-gradient(circle, rgba(248, 200, 220, 0.5) 0%, rgba(248, 200, 220, 0) 70%)';
            avatarGlow.style.transform = 'translate(-50%, -50%) scale(1.1)';
        });
        
        avatar.addEventListener('mouseleave', function() {
            avatarGlow.style.background = 'radial-gradient(circle, var(--hover-shadow) 0%, transparent 70%)';
            avatarGlow.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    }

    // Add ripple effect to contact links
    const contactLinks = document.querySelectorAll('.contact-link');
    
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .contact-link {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .fade-in-up {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});
