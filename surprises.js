// Music Player Variables
let isPlaying = false;
const audio = document.getElementById('friendship-song');
const playButton = document.querySelector('.play-button');
const albumCover = document.querySelector('.album-cover');

// Cursor Followers
let cursorX = 0;
let cursorY = 0;
let followers = [];
const followerCount = 5;

// Toggle Music Function
function toggleMusic() {
    if (isPlaying) {
        audio.pause();
        playButton.innerHTML = '<i class="fas fa-play"></i>';
        albumCover.classList.remove('playing');
    } else {
        audio.play();
        playButton.innerHTML = '<i class="fas fa-pause"></i>';
        albumCover.classList.add('playing');
    }
    isPlaying = !isPlaying;
}

// Reveal Surprise Function
function revealSurprise(type) {
    const content = document.querySelector(`#${type}-surprise .card-content`);
    const button = document.querySelector(`#${type}-surprise .reveal-button`);
    
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        button.textContent = 'Hide Surprise';
        
        // Special effects for each surprise type
        switch(type) {
            case 'music':
                startLyricsAnimation();
                break;
            case 'message':
                animateMessage();
                break;
            case 'memory':
                animateTimeline();
                break;
            case 'love-meter':
                animateLoveMeter();
                break;
            case 'letter':
                animateLetter();
                break;
        }
    } else {
        content.classList.add('hidden');
        button.textContent = 'Reveal Surprise';
        
        // Stop animations when hiding
        if (type === 'music' && isPlaying) {
            toggleMusic();
        }
        if (type === 'letter') {
            const envelope = document.querySelector('.envelope');
            if (envelope) {
                envelope.classList.remove('open');
            }
        }
    }
}

// Lyrics Animation
function startLyricsAnimation() {
    const lyrics = document.querySelectorAll('.lyric-line');
    lyrics.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
        }, index * 2000);
    });
}

// Message Animation
function animateMessage() {
    const messageBox = document.querySelector('.message-box');
    messageBox.style.animation = 'fadeIn 1s ease-out';
}

// Timeline Animation
function animateTimeline() {
    const items = document.querySelectorAll('.timeline-item');
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 500);
    });
}

// Love Meter Animation
function animateLoveMeter() {
    const meter = document.querySelector('.meter-fill');
    const text = document.querySelector('.meter-text');
    
    setTimeout(() => {
        text.textContent = 'Our friendship is infinite! ❤️';
    }, 2000);
}

// Letter Surprise Animation
function animateLetter() {
    const envelope = document.querySelector('.envelope');
    if (envelope) {
        envelope.classList.add('open');
    }
}

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

// Create Floating Butterflies
function createFloatingHearts() {
    const footer = document.querySelector('.footer-hearts');
    const butterfly = document.createElement('div');
    butterfly.innerHTML = '🦋';
    butterfly.style.position = 'absolute';
    butterfly.style.left = Math.random() * 100 + '%';
    butterfly.style.animation = `floatUp ${Math.random() * 2 + 1}s linear forwards`;
    footer.appendChild(butterfly);
    
    setTimeout(() => {
        butterfly.remove();
    }, 3000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set initial states
    document.querySelectorAll('.lyric-line').forEach(line => {
        line.style.opacity = '0';
        line.style.transform = 'translateY(20px)';
    });
    
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
    });
    
    // Start floating butterflies
    setInterval(createFloatingHearts, 300);
}); 