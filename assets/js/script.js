// Navigation state
const initNav = () => {
    const aside = document.querySelector('aside');
    const navLinks = document.querySelectorAll('header nav a, aside nav a');
    const clearActive = () => navLinks.forEach(l => l.classList.remove('active'));

    navLinks.forEach(link => link.addEventListener('click', () => {
        clearActive();
        link.classList.add('active');

        if (aside.contains(link)) { aside.classList.remove('open') }
    }));

    document.querySelector('.hero-text a')?.addEventListener('click', () => {
        clearActive();
        document.querySelector('header nav a[href="#contact"]')?.classList.add('active');
    });

    document.querySelectorAll('header .logo, header .chat').forEach(el =>
        el.addEventListener('click', clearActive)
    );
};


// Menu toggle
const initMenu = () => {
    const menu = document.querySelector('aside');
    const openMenu = document.querySelector('header button');
    const closeMenu = document.querySelector('aside button');

    if (!menu || !openMenu || !closeMenu) return console.warn('Menu toggle elements not found in DOM');

    openMenu.addEventListener('click', () => menu.classList.add('open'));
    closeMenu.addEventListener('click', () => menu.classList.remove('open'));
};

// Scroll animations
const initObservers = () => {
    const createObserver = (className, threshold) => new IntersectionObserver(entries =>
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                observer.unobserve(e.target);
            }
        }), { threshold });

    const observer = createObserver(0.1);
    document.querySelectorAll('p, .hero-text h1, section .title h2, .footer-tagline h2')
        .forEach(el => observer.observe(el));
};

// Video controls
const initVideo = () => {
    const [video, btn, icon] = ['#video', '#playPauseBtn', '#playPauseBtn i'].map(q => document.querySelector(q));
    if (!video || !btn || !icon) return;

    btn.addEventListener('click', () => {
        const action = video.paused ? 'play' : 'pause';
        video[action]();
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
        this.#overlay?.querySelector('.overlay-content')?.append(img);
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
        this.#overlay?.addEventListener('click', e => { if (e.target === this.#overlay) this.close() });
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initMenu();
    initVideo();
    initObservers();
    ImageOverlay.init();
});