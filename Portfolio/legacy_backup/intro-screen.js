// Intro Screen Functionality
document.addEventListener('DOMContentLoaded', function () {
    const introScreen = document.getElementById('intro-screen');

    if (introScreen) {
        // Get the last letter's animation delay plus animation duration
        // Last letter is the 'A' in 'GUPTA' with 1.2s delay + 3s animation = 4.2s
        const totalAnimationTime = 4200; // 4.2 seconds in milliseconds

        // Auto-hide intro screen after animation completes
        setTimeout(() => {
            introScreen.classList.add('hide');

            // Remove from DOM after fade-out animation completes
            setTimeout(() => {
                introScreen.remove();
            }, 800);

            // Display message in console
            console.log('Welcome to Pratham Gupta\'s portfolio');
        }, totalAnimationTime);
    }
});
