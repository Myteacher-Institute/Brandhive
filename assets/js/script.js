function openOverlay(imageSrc) {
    const overlay = document.getElementById('imageOverlay');
    const image = document.getElementById('overlayImage');

    image.src = imageSrc;
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
} 8

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

const video = document.getElementById('video');
const btn = document.getElementById('playPauseBtn');
const icon = btn.querySelector('i');

btn.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    } else {
        video.pause();
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    }
});