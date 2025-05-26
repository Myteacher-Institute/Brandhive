// Navigation state
const initNav = () => {
    const navLinks = [...document.querySelectorAll('header nav a')];
    const clearActive = () => navLinks.forEach(l => l.classList.remove('active'));
    
    navLinks.forEach(link => link.addEventListener('click', () => {
        clearActive();
        link.classList.add('active');
    }));

    document.querySelector('.hero-text a')?.addEventListener('click', () => {
        clearActive();
        document.querySelector('header nav a[href="#contact"]')?.classList.add('active');
    });

    [...document.querySelectorAll('header .logo, header .chat')]
        .forEach(el => el?.addEventListener('click', clearActive));
};

// Scroll animations
const initObservers = () => {
    const observer = (className, threshold = 0.1) =>
        new IntersectionObserver((entries) =>
            entries.forEach(e => e.isIntersecting &&
                (e.target.classList.add('visible'), observer.unobserve(e.target))
            ), { threshold });

    const fadeObserver = observer('visible');
    document.querySelectorAll('p').forEach(p => fadeObserver.observe(p));

    const titleObserver = observer('visible');
    document.querySelectorAll('section .title h2, .hero-text h1, .footer-tagline h2')
        .forEach(el => titleObserver.observe(el));
};

// Video controls
const initVideo = () => {
    const [video, btn, icon] = [
        '#video',
        '#playPauseBtn',
        '#playPauseBtn i'
    ].map(q => document.querySelector(q));

    btn?.addEventListener('click', () => {
        video[video.paused ? 'play' : 'pause']();
        icon.className = `fas fa-${video.paused ? 'play' : 'pause'}`;
    });
};

// Overlay Control
class ImageOverlay {
    static #overlay = document.getElementById('imageOverlay');
    static #img = document.getElementById('overlayImage') || this.#createImage();

    static #createImage() {
        const img = document.createElement('img');
        img.id = 'overlayImage';
        img.alt = 'Enlarged project image';
        this.#overlay.querySelector('.overlay-content').append(img);
        return img;
    }

    static open(src) {
        this.#img.src = src;
        this.#overlay.style.display = 'grid';
        document.body.style.overflow = 'hidden';
    }

    static close() {
        this.#overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    static init() {
        this.#overlay?.addEventListener('click', (e) => e.target === this.#overlay && this.close());
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initVideo();
    initObservers();
    ImageOverlay.init();
});