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

// Create sparkles
function createSparkles() {
    const container = document.querySelector('.sparkle-container');
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.top = Math.random() * 100 + 'vh';
    container.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 1500);
}

setInterval(createSparkles, 300);

// Create Floating Elements
function createFloatingElements() {
    const footer = document.querySelector('.footer-hearts');
    const element = document.createElement('div');
    element.innerHTML = '🦋';
    element.style.position = 'absolute';
    element.style.left = Math.random() * 100 + 'vw';
    element.style.animationDuration = Math.random() * 3 + 2 + 's';
    element.style.opacity = Math.random();
    element.style.fontSize = Math.random() * 20 + 10 + 'px';
    element.style.animation = `float ${Math.random() * 3 + 2}s linear`;
    footer.appendChild(element);

    setTimeout(() => {
        element.remove();
    }, 5000);
}

// Create floating elements periodically
setInterval(createFloatingElements, 300);

// Add floating animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(100vh) scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) scale(1) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Special message functionality
function showSpecialMessage() {
    const message = document.getElementById('special-message');
    message.style.display = 'flex';
    
    // Create confetti effect
    createConfetti();
    
    // Add floating hearts animation
    const messageAnimation = document.querySelector('.message-animation');
    messageAnimation.style.display = 'block';
}

function closeSpecialMessage() {
    const message = document.getElementById('special-message');
    message.style.display = 'none';
}

// Confetti effect
function createConfetti() {
    const colors = ['#ff4b4b', '#ffd700', '#ff69b4', '#87ceeb'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Full image modal functionality
function showFullImage(card) {
    const modal = document.getElementById('full-image-modal');
    const fullImage = document.getElementById('full-image');
    const image = card.querySelector('img');
    
    if (image) {
        fullImage.src = image.src;
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

// Timeline animation
const timelineItems = document.querySelectorAll('.timeline-item');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, { threshold: 0.5 });

timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-50px)';
    item.style.transition = 'all 0.5s ease-out';
    observer.observe(item);
});

// Love meter animation
const meterText = document.querySelector('.meter-text');
const messages = [
    'Loading our amazing friendship...',
    'Calculating our special moments...',
    'Measuring our bond...',
    'Our friendship is infinite! ❤️'
];

let messageIndex = 0;
setInterval(() => {
    meterText.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
}, 2000);

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add hover effect to memory cards
document.querySelectorAll('.memory-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'rotateY(10deg) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateY(0) scale(1)';
    });
});

// Create footer hearts
function createFooterHearts() {
    const container = document.querySelector('.footer-hearts');
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'absolute';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animation = `floatUp ${Math.random() * 2 + 1}s linear forwards`;
    container.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 3000);
}

setInterval(createFooterHearts, 1000);

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

// Music player functionality
let isPlaying = false;
const audio = document.getElementById('friendship-song');
const playButton = document.querySelector('.play-button');
const albumCover = document.querySelector('.album-cover');
const lyrics = document.querySelectorAll('.lyric-line');

function toggleMusic() {
    if (isPlaying) {
        audio.pause();
        playButton.innerHTML = '<i class="fas fa-play"></i>';
        albumCover.classList.remove('playing');
        stopLyricsAnimation();
    } else {
        audio.play();
        playButton.innerHTML = '<i class="fas fa-pause"></i>';
        albumCover.classList.add('playing');
        startLyricsAnimation();
    }
    isPlaying = !isPlaying;
}

function startLyricsAnimation() {
    lyrics.forEach((line, index) => {
        setTimeout(() => {
            line.classList.add('active');
        }, index * 3000);
    });
}

function stopLyricsAnimation() {
    lyrics.forEach(line => {
        line.classList.remove('active');
    });
} 