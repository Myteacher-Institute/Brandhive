// Overlay functionality for project images
const openOverlay = (imageSrc) => {
    let image = document.getElementById('overlayImage');
    const overlay = document.getElementById('imageOverlay');

    // Create image element if it doesn't exist yet
    if (!image) {
        image = document.createElement('img');
        image.id = 'overlayImage';
        const content = overlay.querySelector('.overlay-content');
        if (content) content.appendChild(image);
    }

    image.src = imageSrc;
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Close overlay and restore scrolling
const closeOverlay = () => {
    const overlay = document.getElementById('imageOverlay');
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto'; // Enable scrolling again
}

// Close overlay when clicking outside the image
document.getElementById('imageOverlay').addEventListener('click', e => {
    if (e.target === this) { closeOverlay() }
});

// Video play/pause toggle for "Why choose us" section
document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('playPauseBtn');
    const video = document.getElementById('video');
    const icon = btn.querySelector('i');

    const togglePlayPause = () => {
        if (video.paused) {
            video.play();
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
        } else {
            video.pause();
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
        }
    }

    btn.addEventListener('click', togglePlayPause);
});

// Navigation active state management
document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('header .logo');
    const chatLink = document.querySelector('header .chat');
    const navLinks = document.querySelectorAll('header nav a');

    // Utility: Remove 'active' class from all nav links
    const clearNavActive = () => navLinks.forEach(link => link.classList.remove('active'));

    // Remove any default active class on page load
    clearNavActive();

    // Add 'active' to clicked nav link, remove from others
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            clearNavActive();
            link.classList.add('active'); // Use the link parameter
        });
    });

    // Remove 'active' from nav links when logo or chat link is clicked
    [logo, chatLink].forEach(el => {
        if (el) { el.addEventListener('click', clearNavActive) }
    });

    // If you want to add more links that clear nav active, add them to the array above
});

// Intersection Observer for revealing elements on scroll (paragraphs)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing after first reveal
        }
    });
}, {
    threshold: 0.1
});

// Observe all <p> elements for fade-in effect
document.querySelectorAll('p').forEach(p => observer.observe(p));

// Intersection Observer for fade-in-up animation
const observerFadeIn = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observerFadeIn.unobserve(entry.target); // Stop observing after first reveal
        }
    });
}, {
    threshold: 0.1
});

// Observe all section .title h1, hero .hero-text h1 and .footer-tagline h2 elements for fade-in effect
document.querySelectorAll('section .title h1, .hero .hero-text h1, .footer-tagline h2').forEach(el => observerFadeIn.observe(el));