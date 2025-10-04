// CTF Arena - Dashboard/Challenges Page JavaScript

// Sample challenges data
const sampleChallenges = [
    {
        id: 1,
        title: "Baby's First Hash",
        category: "crypto",
        difficulty: "easy",
        points: 150,
        description: "Can you crack this simple hash?\n\nHash: 5d41402abc4b2a76b9719d911017c592\n\nHint: It's a common English word.",
        tags: ["crypto", "hash", "beginner"],
        files: [
            { name: "hash.txt", url: "#" }
        ],
        hints: [
            "Try looking up MD5 hash crackers online",
            "The word is 5 letters long"
        ]
    },
    {
        id: 2,
        title: "Buffer Overflow 101",
        category: "pwn",
        difficulty: "medium",
        points: 300,
        description: "Classic buffer overflow challenge. Can you get a shell?\n\nConnect to: nc ctf.arena 1337",
        tags: ["pwn", "buffer-overflow", "binary"],
        files: [
            { name: "vuln.c", url: "#" },
            { name: "vuln", url: "#" }
        ],
        hints: [
            "Check the buffer size carefully",
            "You'll need to overwrite the return address"
        ]
    },
    {
        id: 3,
        title: "SQL Injection Paradise",
        category: "web",
        difficulty: "easy",
        points: 200,
        description: "A classic SQL injection vulnerability. Can you extract the admin password?\n\nURL: https://ctf.arena/login",
        tags: ["web", "sql-injection", "database"],
        files: [],
        hints: [
            "Try basic SQL injection payloads",
            "Look for ways to bypass the login"
        ]
    },
    {
        id: 4,
        title: "Reverse Me Please",
        category: "reverse",
        difficulty: "hard",
        points: 500,
        description: "A simple reverse engineering challenge. Find the hidden flag in this binary.",
        tags: ["reverse", "binary", "analysis"],
        files: [
            { name: "mystery.exe", url: "#" }
        ],
        hints: [
            "Use a disassembler like IDA or Ghidra",
            "The flag is XOR encoded"
        ]
    },
    {
        id: 5,
        title: "Hidden in Plain Sight",
        category: "forensics",
        difficulty: "medium",
        points: 250,
        description: "Something is hidden in this image. Can you find it?",
        tags: ["forensics", "steganography", "image"],
        files: [
            { name: "image.png", url: "#" }
        ],
        hints: [
            "Try examining the image metadata",
            "Steganography tools might be helpful"
        ]
    },
    {
        id: 6,
        title: "Caesar's Secret",
        category: "crypto",
        difficulty: "easy",
        points: 100,
        description: "Julius Caesar had a secret message. Can you decode it?\n\nMessage: WKH TXLFN EURZQ IRA MXPSV RYHU WKH ODCB GRJ",
        tags: ["crypto", "classical", "caesar"],
        files: [],
        hints: [
            "It's a Caesar cipher",
            "Try different shift values"
        ]
    }
];

let currentChallenges = [...sampleChallenges];
let currentFilter = 'all';
let currentDifficulty = 'all';

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    renderChallenges();
    setupFilters();
    setupSearch();
});

// Render challenges grid
function renderChallenges(challenges = currentChallenges) {
    const grid = document.getElementById('challengesGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    challenges.forEach(challenge => {
        const card = createChallengeCard(challenge);
        grid.appendChild(card);
    });
    
    if (challenges.length === 0) {
        grid.innerHTML = '<div class="no-challenges glass"><p>No challenges found matching your filters.</p></div>';
    }
}

// Create challenge card element
function createChallengeCard(challenge) {
    const card = document.createElement('div');
    card.className = 'challenge-card glass hover-lift';
    card.onclick = () => openModal(challenge);
    
    card.innerHTML = `
        <div class="challenge-header">
            <h3 class="challenge-title">${challenge.title}</h3>
            <span class="challenge-points">${challenge.points} pts</span>
        </div>
        
        <div class="challenge-tags">
            ${challenge.tags.map(tag => 
                `<span class="challenge-tag ${tag}">${tag}</span>`
            ).join('')}
        </div>
        
        <p class="challenge-description">
            ${challenge.description.split('\n')[0]}...
        </p>
        
        <div class="challenge-footer">
            <span class="challenge-difficulty ${challenge.difficulty}">
                ${challenge.difficulty.toUpperCase()}
            </span>
            <button class="challenge-open-btn" onclick="event.stopPropagation(); openModal(challenge)">
                Open Challenge
            </button>
        </div>
    `;
    
    return card;
}

// Setup filter functionality
function setupFilters() {
    // Category filters
    const categoryTabs = document.querySelectorAll('.filter-tab');
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active from all tabs
            categoryTabs.forEach(t => t.classList.remove('active'));
            // Add active to clicked tab
            this.classList.add('active');
            
            currentFilter = this.dataset.category;
            filterChallenges();
        });
    });
    
    // Difficulty filters
    const difficultyFilters = document.querySelectorAll('.difficulty-filter');
    difficultyFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active from all filters
            difficultyFilters.forEach(f => f.classList.remove('active'));
            // Add active to clicked filter
            this.classList.add('active');
            
            currentDifficulty = this.dataset.difficulty;
            filterChallenges();
        });
    });
}

// Setup search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterChallenges();
        });
    }
}

// Filter challenges based on current filters
function filterChallenges() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    
    let filtered = sampleChallenges.filter(challenge => {
        // Category filter
        const categoryMatch = currentFilter === 'all' || challenge.category === currentFilter;
        
        // Difficulty filter
        const difficultyMatch = currentDifficulty === 'all' || challenge.difficulty === currentDifficulty;
        
        // Search filter
        const searchMatch = searchTerm === '' || 
            challenge.title.toLowerCase().includes(searchTerm) ||
            challenge.description.toLowerCase().includes(searchTerm) ||
            challenge.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        
        return categoryMatch && difficultyMatch && searchMatch;
    });
    
    currentChallenges = filtered;
    renderChallenges(filtered);
}

// Enhanced modal opening for challenges
window.originalOpenModal = window.openModal;
window.openModal = function(challenge) {
    if (typeof challenge === 'object' && challenge.id) {
        window.originalOpenModal(challenge);
    }
};

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + F to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
            searchInput.select();
        }
    }
    
    // Arrow keys for challenge navigation in modal
    if (document.getElementById('challengeModal').classList.contains('active')) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            // Navigate to previous/next challenge
            const currentId = getCurrentChallengeId();
            const direction = e.key === 'ArrowLeft' ? -1 : 1;
            navigateChallenge(currentId, direction);
        }
    }
});

function getCurrentChallengeId() {
    // This would need to be tracked when modal opens
    // For now, return first challenge id
    return currentChallenges.length > 0 ? currentChallenges[0].id : null;
}

function navigateChallenge(currentId, direction) {
    const currentIndex = currentChallenges.findIndex(c => c.id === currentId);
    if (currentIndex === -1) return;
    
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < currentChallenges.length) {
        openModal(currentChallenges[newIndex]);
    }
}

// Add challenge completion tracking
const completedChallenges = new Set();

function markChallengeCompleted(challengeId) {
    completedChallenges.add(challengeId);
    updateChallengeDisplay(challengeId);
    updateStats();
}

function updateChallengeDisplay(challengeId) {
    const cards = document.querySelectorAll('.challenge-card');
    cards.forEach(card => {
        const challenge = currentChallenges.find(c => c.id === challengeId);
        if (challenge && card.innerHTML.includes(challenge.title)) {
            card.classList.add('completed');
            card.style.opacity = '0.7';
            card.style.border = '2px solid #22c55e';
        }
    });
}

function updateStats() {
    // Update completion stats if there's a stats section
    const totalChallenges = sampleChallenges.length;
    const completedCount = completedChallenges.size;
    const totalPoints = Array.from(completedChallenges).reduce((sum, id) => {
        const challenge = sampleChallenges.find(c => c.id === id);
        return sum + (challenge ? challenge.points : 0);
    }, 0);
    
    console.log(`Completed: ${completedCount}/${totalChallenges} challenges, ${totalPoints} points`);
}

// Enhanced flag submission with challenge tracking
window.originalSubmitFlag = window.submitFlag;
window.submitFlag = function() {
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
    
    // Simulate flag validation
    const isCorrect = Math.random() > 0.6; // 40% chance for demo
    
    setTimeout(() => {
        if (isCorrect) {
            showToast('Correct flag! Points awarded.', 'success');
            
            // Mark challenge as completed
            const modalTitle = document.getElementById('modalTitle').textContent;
            const challenge = currentChallenges.find(c => c.title === modalTitle);
            if (challenge) {
                markChallengeCompleted(challenge.id);
            }
            
            flagInput.value = '';
            setTimeout(() => {
                closeModal();
            }, 1500);
        } else {
            showToast('Incorrect flag. Try again!', 'error');
        }
    }, 500);
};