// Gallery filtering functionality
const filterButtons = document.querySelectorAll('.filter-button');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Full image modal functionality
function showFullImage(card) {
    const modal = document.getElementById('full-image-modal');
    const fullImage = document.getElementById('full-image');
    const imageCaption = document.querySelector('.image-caption');
    const image = card.querySelector('img');
    const caption = card.querySelector('.gallery-caption h3').textContent;
    
    if (image) {
        fullImage.src = image.src;
        imageCaption.textContent = caption;
        modal.style.display = 'flex';
    }
}

// Close modal when clicking the close button or outside the image
document.querySelector('.close-modal').addEventListener('click', () => {
    document.getElementById('full-image-modal').style.display = 'none';
});

document.getElementById('full-image-modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        e.currentTarget.style.display = 'none';
    }
});

// Add click event to gallery cards
document.querySelectorAll('.gallery-card').forEach(card => {
    card.addEventListener('click', () => showFullImage(card));
});

// Cursor Followers
let cursorX = 0;
let cursorY = 0;
let followers = [];
const followerCount = 5;

// Track cursor position
document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX + window.scrollX;
    cursorY = e.clientY + window.scrollY;
    
    // Create new butterfly
    if (Math.random() < 0.1) { // 10% chance to create a new butterfly
        createButterfly();
    }
});

// Create a new butterfly
function createButterfly() {
    const butterfly = document.createElement('div');
    butterfly.className = 'cursor-follower butterfly';
    document.body.appendChild(butterfly);
    
    // Set initial position
    butterfly.style.left = `${cursorX}px`;
    butterfly.style.top = `${cursorY}px`;
    
    // Add to followers array
    followers.push({
        element: butterfly,
        x: cursorX,
        y: cursorY
    });
    
    // Remove after animation
    setTimeout(() => {
        butterfly.remove();
        followers = followers.filter(f => f.element !== butterfly);
    }, 3000);
}

// Update butterflies position
function updateFollowers() {
    followers.forEach((follower) => {
        const dx = cursorX - follower.x;
        const dy = cursorY - follower.y;
        
        // Update position with easing
        follower.x += dx * 0.1;
        follower.y += dy * 0.1;
        
        // Apply new position
        follower.element.style.left = `${follower.x}px`;
        follower.element.style.top = `${follower.y}px`;
        
        // Add rotation based on movement direction
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        follower.element.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
    });
    
    requestAnimationFrame(updateFollowers);
}

// Start animation loop
updateFollowers();

// Create footer butterflies
function createFooterHearts() {
    const container = document.querySelector('.footer-hearts');
    const butterfly = document.createElement('div');
    butterfly.innerHTML = '🦋';
    butterfly.style.position = 'absolute';
    butterfly.style.left = Math.random() * 100 + '%';
    butterfly.style.animation = `floatUp ${Math.random() * 2 + 1}s linear forwards`;
    container.appendChild(butterfly);

    setTimeout(() => {
        butterfly.remove();
    }, 3000);
}

// Add floating up animation to CSS
const footerStyle = document.createElement('style');
footerStyle.textContent = `
    @keyframes floatUp {
        0% { transform: translateY(0) scale(0); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: translateY(-50px) scale(1); opacity: 0; }
    }
`;
document.head.appendChild(footerStyle); 