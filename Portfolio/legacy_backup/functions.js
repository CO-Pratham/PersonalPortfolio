// Initialize Floating Action Button
function initFloatingActionButton() {
    const fabMain = document.querySelector('.fab-main');

    if (fabMain) {
        // Add click event
        fabMain.addEventListener('click', () => {
            fabMain.classList.toggle('active');
        });

        // Add hover animation
        fabMain.addEventListener('mousemove', (e) => {
            const rect = fabMain.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate the position for the shine effect
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const angleX = (x - centerX) / 10;
            const angleY = (y - centerY) / 10;

            fabMain.style.transform = `perspective(300px) rotateX(${-angleY}deg) rotateY(${angleX}deg) scale(1.1)`;
        });

        // Reset on mouse leave
        fabMain.addEventListener('mouseleave', () => {
            fabMain.style.transform = 'perspective(300px) rotateX(0) rotateY(0) scale(1)';
        });

        // Add animation to fab options
        const fabOptions = document.querySelectorAll('.fab-option');
        fabOptions.forEach((option, index) => {
            option.style.transitionDelay = `${index * 0.05}s`;
        });
    }
}

// Intro screen functionality is now in intro-screen.js
