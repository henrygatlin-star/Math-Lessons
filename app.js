// DOM Elements
const itemsGrid = document.getElementById('itemsGrid');
const categoryBtns = document.querySelectorAll('.category-btn');
const itemModal = document.getElementById('itemModal');
const itemFrame = document.getElementById('itemFrame');
const itemTitle = document.getElementById('itemTitle');
const closeBtn = document.querySelector('.close');

let currentCategory = 'all';

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderItems(items);
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentCategory = e.target.dataset.category;
            filterAndRenderItems(currentCategory);
        });
    });

    closeBtn.addEventListener('click', closeItemModal);
    itemModal.addEventListener('click', (e) => {
        if (e.target === itemModal) {
            closeItemModal();
        }
    });
}

// Render games to the grid
function renderItems(itemsToRender) {
    itemsGrid.innerHTML = '';

    itemsToRender.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'item-card';
        itemCard.innerHTML = `
            <div class="item-thumbnail">${item.thumbnail}</div>
            <h3>${item.title}</h3>
            <button class="play-btn" onclick="playItem('${item.id}', '${item.title}', '${item.url}')">Play Now</button>
        `;
        itemsGrid.appendChild(itemCard);
    });
}

// Filter and render games by category
function filterAndRenderItems(category) {
    let filtered = items;

    if (category !== 'all') {
        filtered = items.filter(item => item.category === category);
    }

    renderItems(filtered);
}

// Play an item
function playItem(itemId, title, url) {
    itemTitle.textContent = title;
    itemFrame.src = url;
    itemModal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Remove fullscreen class on new item
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

// Close item modal
function closeItemModal() {
    itemModal.style.display = 'none';
    itemFrame.src = '';
    document.body.style.overflow = 'auto';

    const modalContent = document.querySelector('.modal-content');
    modalContent.classList.remove('fullscreen');
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && itemModal.style.display === 'block') {
        closeItemModal();
    }
});
