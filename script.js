// Header scroll behavior
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove background color based on scroll position
        if (currentScroll > 50) {
            header.style.backgroundColor = 'rgba(40, 21, 73, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.backgroundColor = 'rgba(40, 21, 73, 0.9)';
            header.style.boxShadow = 'none';
        }

        // Hide/show header based on scroll direction
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const fadeElements = document.querySelectorAll('.product-card, .plan-card, .faq-item');

const fadeOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, fadeOptions);

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    fadeOnScroll.observe(element);
});

// Form handling
const waitlistForm = document.querySelector('.contact-form form');
if (waitlistForm) {
    waitlistForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(waitlistForm);
        const submitButton = waitlistForm.querySelector('button[type="submit"]');
        
        try {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Replace with your actual form endpoint
            const response = await fetch(waitlistForm.action, {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                showMessage('Thank you for joining the waitlist!', 'success');
                waitlistForm.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            showMessage('Something went wrong. Please try again.', 'error');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Join Waitlist';
        }
    });
}

// Message display utility
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    // Trigger animation
    setTimeout(() => messageDiv.classList.add('show'), 10);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        messageDiv.classList.remove('show');
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}

// Add CSS for messages
const messageStyles = document.createElement('style');
messageStyles.textContent = `
    .message {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.3s ease, transform 0.3s ease;
        z-index: 1000;
    }
    
    .message.show {
        opacity: 1;
        transform: translateY(0);
    }
    
    .message-success {
        background: linear-gradient(90deg, #832eff, #fe4ff2);
    }
    
    .message-error {
        background: linear-gradient(90deg, #ff3333, #ff6666);
    }
`;
document.head.appendChild(messageStyles);

// Initialize parallax effect for hero section
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.4}px)`;
    });
}

// Add neon flicker effect to titles
document.querySelectorAll('.title').forEach(title => {
    setInterval(() => {
        if (Math.random() < 0.01) { // 1% chance each interval
            title.style.textShadow = 'none';
            setTimeout(() => {
                title.style.textShadow = '';
            }, 50);
        }
    }, 100);
});

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

// Apply debouncing to heavy scroll operations
const debouncedScroll = debounce(() => {
    // Heavy scroll operations here
}, 16);

window.addEventListener('scroll', debouncedScroll);

// Add loading state for images
document.querySelectorAll('img').forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease-in';
    
    img.addEventListener('load', () => {
        img.style.opacity = '1';
    });
});
