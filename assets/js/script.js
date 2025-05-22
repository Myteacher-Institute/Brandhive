


function openOverlay(imageSrc) {
    const overlay = document.getElementById('imageOverlay');
    const image = document.getElementById('overlayImage');

    image.src = imageSrc;
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeOverlay() {
    const overlay = document.getElementById('imageOverlay');
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto'; // Enable scrolling again
}

// Close overlay when clicking outside the image
document.getElementById('imageOverlay').addEventListener('click', function (e) {
    if (e.target === this) {
        closeOverlay();
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('video');
    const btn = document.getElementById('playPauseBtn');
    const icon = btn.querySelector('i');

    function togglePlayPause() {
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


document.addEventListener('DOMContentLoaded', function () {

    // Navigation active state
    const navLinks = document.querySelectorAll('header nav a');
    // Remove any default active class
    navLinks.forEach(link => link.classList.remove('active'));

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Remove active from all
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            // Add active to clicked
            this.classList.add('active');
        });
    });
});


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Optional: Stop observing once it has appeared
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('p').forEach(p => observer.observe(p));

const observerFadein = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.fade-in-up').forEach(el => observerFadein.observe(el));