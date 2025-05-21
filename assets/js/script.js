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


(function () {
    // Get all navigation links
    const navLinks = document.querySelectorAll('header nav a');

    // Set Home as active by default
    navLinks[0].classList.add('active');

    // Add click event listeners to each link
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Prevent default anchor behavior
            e.preventDefault();

            // Remove active class from all links
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });

            // Add active class to the clicked link
            this.classList.add('active');

            // If you want to actually navigate to the page:
            window.location.href = this.getAttribute('href');
        });
    });
})();