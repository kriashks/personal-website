document.addEventListener('DOMContentLoaded', () => {
    // Set up navigation
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const sectionId = link.getAttribute('data-section');
            showSection(sectionId);
        });
    });

    // Show the "About" section by default when the page loads
    showSection('about');

    // Initialize the gallery slideshow
    initGallery();
});

function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('main section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });

    // Show the selected section
    const sectionToShow = document.getElementById(sectionId);
    if (sectionToShow) {
        sectionToShow.classList.remove('hidden');
    }
}

function initGallery() {
    // Assuming you have multiple images in the folder images/about/
    const images = [
        'images/about/image1.jpg',
        'images/about/image2.jpg',
        'images/about/image3.jpg',
        // Add more images as needed
    ];
    
    let currentIndex = 0;
    const galleryContainer = document.querySelector('.gallery');

    // Clear the gallery container if any previous images were added
    galleryContainer.innerHTML = '';

    // Create img elements for each image
    images.forEach((imageSrc, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = imageSrc;
        imgElement.alt = `Gallery Image ${index + 1}`;
        imgElement.classList.add('gallery-image');
        imgElement.style.display = index === 0 ? 'block' : 'none'; // Show only the first image
        galleryContainer.appendChild(imgElement);
    });

    const galleryImages = document.querySelectorAll('.gallery-image');

    function showNextImage() {
        galleryImages[currentIndex].style.display = 'none'; // Hide current image
        currentIndex = (currentIndex + 1) % images.length; // Move to the next image
        galleryImages[currentIndex].style.display = 'block'; // Show the next image
    }

    // Change the image every 3 seconds
    setInterval(showNextImage, 3000);
}
