// CTF Arena - Scoreboard Page JavaScript

// Sample leaderboard data
const sampleLeaderboard = [
    {
        rank: 1,
        team: "CyberNinjas",
        score: 15750,
        avatar: "🥷",
        solved: 18,
        lastSolve: "2 minutes ago"
    },
    {
        rank: 2,
        team: "HackTheBox",
        score: 14200,
        avatar: "📦",
        solved: 16,
        lastSolve: "15 minutes ago"
    },
    {
        rank: 3,
        team: "Binary Bandits",
        score: 12900,
        avatar: "🏴‍☠️",
        solved: 15,
        lastSolve: "28 minutes ago"
    },
    {
        rank: 4,
        team: "Root Access",
        score: 11500,
        avatar: "🔓",
        solved: 14,
        lastSolve: "45 minutes ago"
    },
    {
        rank: 5,
        team: "Script Kiddies",
        score: 10200,
        avatar: "👶",
        solved: 12,
        lastSolve: "1 hour ago"
    },
    {
        rank: 6,
        team: "Null Pointer",
        score: 9800,
        avatar: "🎯",
        solved: 11,
        lastSolve: "1 hour ago"
    },
    {
        rank: 7,
        team: "Buffer Overflow",
        score: 8900,
        avatar: "💥",
        solved: 10,
        lastSolve: "2 hours ago"
    },
    {
        rank: 8,
        team: "Social Engineers",
        score: 7600,
        avatar: "🎭",
        solved: 9,
        lastSolve: "2 hours ago"
    },
    {
        rank: 9,
        team: "Crypto Crackers",
        score: 6800,
        avatar: "🔐",
        solved: 8,
        lastSolve: "3 hours ago"
    },
    {
        rank: 10,
        team: "Web Warriors",
        score: 5900,
        avatar: "🌐",
        solved: 7,
        lastSolve: "3 hours ago"
    }
];

// Friends leaderboard (subset of global for demo)
const friendsLeaderboard = [
    {
        rank: 1,
        team: "My Team",
        score: 8500,
        avatar: "⭐",
        solved: 9,
        lastSolve: "30 minutes ago"
    },
    {
        rank: 2,
        team: "Buddy Hackers",
        score: 6200,
        avatar: "👯",
        solved: 7,
        lastSolve: "1 hour ago"
    },
    {
        rank: 3,
        team: "College Crew",
        score: 4800,
        avatar: "🎓",
        solved: 6,
        lastSolve: "2 hours ago"
    }
];

let currentView = 'global';
let currentLeaderboard = sampleLeaderboard;

// Initialize scoreboard
document.addEventListener('DOMContentLoaded', function() {
    renderLeaderboard();
    setupViewToggle();
    updateStats();
    
    // Auto-refresh leaderboard every 30 seconds
    setInterval(refreshLeaderboard, 30000);
});

// Render leaderboard
function renderLeaderboard(leaderboard = currentLeaderboard) {
    const tbody = document.getElementById('leaderboardBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    leaderboard.forEach((entry, index) => {
        const row = createLeaderboardRow(entry, index);
        tbody.appendChild(row);
    });
}

// Create leaderboard row
function createLeaderboardRow(entry, index) {
    const row = document.createElement('div');
    row.className = `leaderboard-entry ${entry.rank <= 3 ? 'top-3' : ''}`;
    
    row.innerHTML = `
        <div class="rank-display">
            ${getRankIcon(entry.rank)}
        </div>
        
        <div class="team-info">
            <div class="team-avatar">${entry.avatar}</div>
            <div>
                <div class="team-name ${entry.rank <= 3 ? 'top-3' : ''}">${entry.team}</div>
                <div class="team-subtitle">Last solve: ${entry.lastSolve}</div>
            </div>
        </div>
        
        <div class="solved-count">
            <div class="solved-number">${entry.solved}</div>
            <div class="solved-label">challenges</div>
        </div>
        
        <div class="score-display">
            <div class="score-number ${entry.rank === 1 ? 'top-score' : ''}">${entry.score.toLocaleString()}</div>
            <div class="score-label">points</div>
        </div>
    `;
    
    return row;
}

// Get rank icon
function getRankIcon(rank) {
    switch (rank) {
        case 1: return '<span class="rank-icon">🥇</span>';
        case 2: return '<span class="rank-icon">🥈</span>';
        case 3: return '<span class="rank-icon">🥉</span>';
        default: return `<span class="rank-number">#${rank}</span>`;
    }
}

// Setup view toggle functionality
function setupViewToggle() {
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active from all buttons
            toggleBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked button
            this.classList.add('active');
            
            const view = this.dataset.view;
            switchView(view);
        });
    });
}

// Switch between global and friends view
function switchView(view) {
    currentView = view;
    
    if (view === 'global') {
        currentLeaderboard = sampleLeaderboard;
    } else {
        currentLeaderboard = friendsLeaderboard;
    }
    
    renderLeaderboard();
    updateStats();
    
    // Add visual feedback
    const container = document.querySelector('.leaderboard-container');
    if (container) {
        container.style.opacity = '0.7';
        setTimeout(() => {
            container.style.opacity = '1';
        }, 200);
    }
}

// Update statistics
function updateStats() {
    const activeTeams = document.getElementById('activeTeams');
    const topScore = document.getElementById('topScore');
    const maxSolved = document.getElementById('maxSolved');
    
    if (activeTeams) {
        const teamCount = currentLeaderboard.length;
        animateNumber(activeTeams, parseInt(activeTeams.textContent) || 0, teamCount, 800);
    }
    
    if (topScore) {
        const highest = Math.max(...currentLeaderboard.map(e => e.score));
        animateNumber(topScore, parseInt(topScore.textContent.replace(/,/g, '')) || 0, highest, 800);
    }
    
    if (maxSolved) {
        const maxChallenges = Math.max(...currentLeaderboard.map(e => e.solved));
        animateNumber(maxSolved, parseInt(maxSolved.textContent) || 0, maxChallenges, 800);
    }
}

// Simulate real-time updates
function refreshLeaderboard() {
    // Simulate score changes
    currentLeaderboard.forEach(entry => {
        // Small chance of score increase
        if (Math.random() < 0.1) {
            const increase = Math.floor(Math.random() * 500) + 100;
            entry.score += increase;
            
            // Update last solve time
            entry.lastSolve = 'Just now';
            
            // Show notification
            showScoreUpdate(entry.team, increase);
        }
    });
    
    // Re-sort by score
    currentLeaderboard.sort((a, b) => b.score - a.score);
    
    // Update ranks
    currentLeaderboard.forEach((entry, index) => {
        entry.rank = index + 1;
    });
    
    renderLeaderboard();
    updateStats();
}

// Show score update notification
function showScoreUpdate(teamName, points) {
    showToast(`${teamName} scored ${points} points!`, 'success');
}

// Add team search functionality
function setupTeamSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search teams...';
    searchInput.className = 'team-search glass';
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const filtered = currentLeaderboard.filter(entry =>
            entry.team.toLowerCase().includes(searchTerm)
        );
        renderLeaderboard(filtered);
    });
    
    // Add search input to the page
    const viewToggle = document.querySelector('.view-toggle');
    if (viewToggle) {
        viewToggle.appendChild(searchInput);
    }
}

// Add export functionality
function exportLeaderboard() {
    const data = currentLeaderboard.map(entry => ({
        Rank: entry.rank,
        Team: entry.team,
        Score: entry.score,
        Solved: entry.solved,
        'Last Solve': entry.lastSolve
    }));
    
    const csv = convertToCSV(data);
    downloadCSV(csv, `ctf-leaderboard-${currentView}.csv`);
}

function convertToCSV(data) {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvHeaders = headers.join(',');
    
    const csvRows = data.map(row =>
        headers.map(header => {
            const value = row[header];
            return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
        }).join(',')
    );
    
    return [csvHeaders, ...csvRows].join('\n');
}

function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Add team highlighting
function highlightTeam(teamName) {
    const entries = document.querySelectorAll('.leaderboard-entry');
    entries.forEach(entry => {
        const nameElement = entry.querySelector('.team-name');
        if (nameElement && nameElement.textContent === teamName) {
            entry.style.background = 'rgba(255, 43, 43, 0.2)';
            entry.style.border = '2px solid var(--neon-red)';
            entry.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // G for Global, F for Friends
    if (e.key.toLowerCase() === 'g' && !e.ctrlKey && !e.metaKey) {
        const globalBtn = document.querySelector('.toggle-btn[data-view="global"]');
        if (globalBtn) globalBtn.click();
    }
    
    if (e.key.toLowerCase() === 'f' && !e.ctrlKey && !e.metaKey) {
        const friendsBtn = document.querySelector('.toggle-btn[data-view="friends"]');
        if (friendsBtn) friendsBtn.click();
    }
    
    // R for refresh
    if (e.key.toLowerCase() === 'r' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        refreshLeaderboard();
        showToast('Leaderboard refreshed', 'success');
    }
});

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    // Add export button
    const viewToggle = document.querySelector('.view-toggle');
    if (viewToggle) {
        const exportBtn = document.createElement('button');
        exportBtn.textContent = '📊 Export';
        exportBtn.className = 'btn-secondary';
        exportBtn.style.marginLeft = '1rem';
        exportBtn.onclick = exportLeaderboard;
        viewToggle.appendChild(exportBtn);
    }
    
    // Add refresh indicator
    const refreshIndicator = document.createElement('div');
    refreshIndicator.id = 'refreshIndicator';
    refreshIndicator.textContent = 'Auto-refresh: ON';
    refreshIndicator.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--glass-bg);
        padding: 0.5rem 1rem;
        border-radius: var(--radius);
        font-size: 0.8rem;
        opacity: 0.7;
    `;
    document.body.appendChild(refreshIndicator);
});

// Utility function for number animation (reuse from main scripts)
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