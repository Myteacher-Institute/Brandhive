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