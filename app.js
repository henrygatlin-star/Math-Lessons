// DOM Elements
const gamesGrid = document.getElementById('gamesGrid');
const categoryBtns = document.querySelectorAll('.category-btn');
const gameModal = document.getElementById('gameModal');
const gameFrame = document.getElementById('gameFrame');
const gameTitle = document.getElementById('gameTitle');
const closeBtn = document.querySelector('.close');

let currentCategory = 'all';

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderGames(games);
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentCategory = e.target.dataset.category;
            filterAndRenderGames(currentCategory);
        });
    });

    closeBtn.addEventListener('click', closeGameModal);
    gameModal.addEventListener('click', (e) => {
        if (e.target === gameModal) {
            closeGameModal();
        }
    });
}

// Render games to the grid
function renderGames(gamesToRender) {
    gamesGrid.innerHTML = '';
    
    gamesToRender.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.innerHTML = `
            <div class="game-thumbnail">${game.thumbnail}</div>
            <h3>${game.title}</h3>
            <p>${game.description}</p>
            <button class="play-btn" onclick="playGame('${game.id}', '${game.title}', '${game.url}')">Play Now</button>
        `;
        gamesGrid.appendChild(gameCard);
    });
}

// Filter and render games by category
function filterAndRenderGames(category) {
    let filtered = games;
    
    if (category !== 'all') {
        filtered = games.filter(game => game.category === category);
    }
    
    renderGames(filtered);
}

// Play a game
function playGame(gameId, title, url) {
    gameTitle.textContent = title;
    gameFrame.src = url;
    gameModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Remove fullscreen class on new game
    const modalContent = document.querySelector('.modal-content');
    modalContent.classList.remove('fullscreen');
    
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (fullscreenBtn) {
        fullscreenBtn.textContent = 'Fullscreen';
    }
}

// Toggle fullscreen mode
function toggleFullscreen() {
    const modalContent = document.querySelector('.modal-content');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    
    modalContent.classList.toggle('fullscreen');
    
    if (modalContent.classList.contains('fullscreen')) {
        fullscreenBtn.textContent = 'Exit Fullscreen';
    } else {
        fullscreenBtn.textContent = 'Fullscreen';
    }
}

// Close game modal
function closeGameModal() {
    gameModal.style.display = 'none';
    gameFrame.src = '';
    document.body.style.overflow = 'auto';
    
    const modalContent = document.querySelector('.modal-content');
    modalContent.classList.remove('fullscreen');
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && gameModal.style.display === 'block') {
        closeGameModal();
    }
});
