// Infinite logo carousel
const initCarousel = () => {
    const track = document.querySelector('.carousel-track');
    if (!track) return;

    const slides = Array.from(track.children);
    let position = 0;
    let scrollSpeed = 0.5;
    let paused = false;

    // Clone slides for seamless loop
    slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
    });

    // ---- Pause on hover (comment to disable) ----
    track.addEventListener('mouseenter', () => paused = true);
    track.addEventListener('mouseleave', () => paused = false);
    // --------------------------------------------

    // ---- Touch drag support (comment to disable) ----
    let isDragging = false;
    let startX = 0;

    track.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
    });

    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const currentX = e.touches[0].clientX;
        const deltaX = currentX - startX;
        position += deltaX;
        startX = currentX;
        track.style.transform = `translateX(${position}px)`;
    });

    track.addEventListener('touchend', () => {
        isDragging = false;
    });
    // --------------------------------------------------

    // Animation loop
    const animate = () => {
        if (!paused && !isDragging) {
            position -= scrollSpeed;
            if (Math.abs(position) >= track.scrollWidth / 2) {
                position = 0;
            }
            track.style.transform = `translateX(${position}px)`;
        }
        requestAnimationFrame(animate);
    };

    animate();
};

// Navigation state
const initNav = () => {
    const aside = document.querySelector('aside');
    const navLinks = document.querySelectorAll('header nav a, aside nav a');
    const clearActive = () => navLinks.forEach(l => l.classList.remove('active'));

    navLinks.forEach(link => link.addEventListener('click', () => {
        clearActive();
        link.classList.add('active');
        if (aside.contains(link)) aside.classList.remove('open');
    }));

    document.querySelector('.hero-text a')?.addEventListener('click', () => {
        clearActive();
        document.querySelector('header nav a[href="#contact"]')?.classList.add('active');
    });

    document.querySelectorAll('header .logo, header .chat').forEach(el =>
        el.addEventListener('click', clearActive)
    );
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

// Menu toggle
const initMenu = () => {
    const menu = document.querySelector('aside');
    const openMenu = document.querySelector('header button');
    const closeMenu = document.querySelector('aside button');

    if (!menu || !openMenu || !closeMenu) return console.warn('Menu toggle elements not found in DOM');

    openMenu.addEventListener('click', () => menu.classList.add('open'));
    closeMenu.addEventListener('click', () => menu.classList.remove('open'));
};

// Image overlay
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

// Init everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initMenu();
    initVideo();
    initCarousel();
    initObservers();
    ImageOverlay.init();
});