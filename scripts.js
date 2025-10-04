// CTF Arena - Main JavaScript Functions

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = document.querySelectorAll('.mobile-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
});

// Modal Functions
function openModal(challenge) {
    const modal = document.getElementById('challengeModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalTags = document.getElementById('modalTags');
    const modalDescription = document.getElementById('modalDescription');
    const modalFiles = document.getElementById('modalFiles');
    const hintsContent = document.getElementById('hintsContent');
    
    if (modal && challenge) {
        modalTitle.textContent = challenge.title;
        
        // Clear and populate tags
        modalTags.innerHTML = '';
        challenge.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = `challenge-tag ${tag.toLowerCase()}`;
            tagElement.textContent = tag;
            modalTags.appendChild(tagElement);
        });
        
        // Add difficulty tag
        const difficultyTag = document.createElement('span');
        difficultyTag.className = `challenge-difficulty ${challenge.difficulty}`;
        difficultyTag.textContent = challenge.difficulty.toUpperCase();
        modalTags.appendChild(difficultyTag);
        
        modalDescription.textContent = challenge.description;
        
        // Handle files if any
        if (challenge.files && challenge.files.length > 0) {
            modalFiles.innerHTML = '<h4>Files:</h4>';
            challenge.files.forEach(file => {
                const fileLink = document.createElement('a');
                fileLink.href = file.url;
                fileLink.textContent = file.name;
                fileLink.className = 'file-link glass';
                fileLink.style.display = 'inline-block';
                fileLink.style.margin = '0.5rem 0.5rem 0 0';
                fileLink.style.padding = '0.5rem 1rem';
                fileLink.style.textDecoration = 'none';
                fileLink.style.borderRadius = 'var(--radius)';
                modalFiles.appendChild(fileLink);
            });
        } else {
            modalFiles.innerHTML = '';
        }
        
        // Handle hints
        if (challenge.hints && challenge.hints.length > 0) {
            hintsContent.innerHTML = '';
            challenge.hints.forEach(hint => {
                const hintElement = document.createElement('p');
                hintElement.textContent = hint;
                hintElement.style.marginBottom = '0.5rem';
                hintsContent.appendChild(hintElement);
            });
        }
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('challengeModal');
    const flagInput = document.getElementById('flagInput');
    
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Clear flag input
        if (flagInput) {
            flagInput.value = '';
        }
        
        // Hide hints
        const hintsContent = document.getElementById('hintsContent');
        if (hintsContent) {
            hintsContent.style.display = 'none';
        }
    }
}

function toggleHints() {
    const hintsContent = document.getElementById('hintsContent');
    const hintsToggle = document.querySelector('.hints-toggle');
    
    if (hintsContent && hintsToggle) {
        if (hintsContent.style.display === 'none') {
            hintsContent.style.display = 'block';
            hintsToggle.textContent = '💡 Hide Hints';
        } else {
            hintsContent.style.display = 'none';
            hintsToggle.textContent = '💡 Show Hints';
        }
    }
}

// Flag Submission
function submitFlag() {
    const flagInput = document.getElementById('flagInput');
    const flag = flagInput.value.trim();
    
    if (!flag) {
        showToast('Please enter a flag', 'error');
        return;
    }
    
    if (!flag.startsWith('flag{') || !flag.endsWith('}')) {
        showToast('Invalid flag format. Use flag{...}', 'error');
        return;
    }
    
    // Simulate flag validation (in real app, this would be an API call)
    const isCorrect = Math.random() > 0.7; // 30% chance of correct flag for demo
    
    setTimeout(() => {
        if (isCorrect) {
            showToast('Correct flag! Points awarded.', 'success');
            flagInput.value = '';
            setTimeout(() => {
                closeModal();
            }, 1500);
        } else {
            showToast('Incorrect flag. Try again!', 'error');
        }
    }, 500);
}

// Toast Notifications
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer') || createToastContainer();
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
}

// Close modal on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Close modal on backdrop click
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        closeModal();
    }
});

// Smooth scroll for anchor links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const navHeight = 80;
            const elementPosition = targetElement.offsetTop - navHeight;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    }
});

// Update active navigation link based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add loading states and animations
function addLoadingState(element) {
    element.classList.add('loading');
    element.style.opacity = '0.6';
    element.style.pointerEvents = 'none';
}

function removeLoadingState(element) {
    element.classList.remove('loading');
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
}

// Utility function to animate numbers
function animateNumber(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current).toLocaleString();
        
        if (current >= end) {
            clearInterval(timer);
            element.textContent = end.toLocaleString();
        }
    }, 16);
}

// Initialize animations when elements come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Animate numbers in stat cards
            if (entry.target.classList.contains('stat-number')) {
                const finalValue = parseInt(entry.target.textContent.replace(/,/g, ''));
                if (!isNaN(finalValue)) {
                    animateNumber(entry.target, 0, finalValue, 1000);
                }
            }
        }
    });
}, observerOptions);

// Observe elements for animations
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.stat-card, .challenge-card, .rules-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});