function toggleResume() {
    const resumeSection = document.getElementById('resume');
    const contentElement = document.getElementById('content');
    
    if (resumeSection.classList.contains('hidden')) {
        // Hide all other sections
        hideAllSections();
        // Show the resume section
        resumeSection.classList.remove('hidden');
    } else {
        // Hide the resume section
        resumeSection.classList.add('hidden');
    }
}

function hideAllSections() {
    const sections = document.querySelectorAll('#content section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });
}

function loadExternalContent() {
    const contentElement = document.getElementById('content');
    if (contentElement) {
        fetch('about.html')
            .then(response => response.text())
            .then(data => {
                contentElement.innerHTML += data;
                document.querySelector('#about').classList.add('slide-up');
            })
            .catch(error => console.error('Error loading about.html:', error));

        fetch('portfolio.html')
            .then(response => response.text())
            .then(data => {
                contentElement.innerHTML += data;
                document.querySelector('#portfolio').classList.add('slide-up');
            })
            .catch(error => console.error('Error loading portfolio.html:', error));

        fetch('contact.html')
            .then(response => response.text())
            .then(data => {
                contentElement.innerHTML += data;
                document.querySelector('#contact').classList.add('slide-up');
            })
            .catch(error => console.error('Error loading contact.html:', error));
    } else {
        console.error('Error: #content element not found');
    }
}

window.addEventListener('DOMContentLoaded', loadExternalContent);
