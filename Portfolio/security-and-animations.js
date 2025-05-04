// Security and Enhanced Animations JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // Animated Logo Functionality
    const animateLogo = () => {
        const logoText = document.querySelector('.logo-text');
        if (!logoText) return;

        // Store the original text
        const text = logoText.textContent;

        // Create spans for each character while preserving the text
        let newHtml = '';
        for (let i = 0; i < text.length; i++) {
            // Add a non-breaking space for spaces to ensure they're visible
            const char = text[i] === ' ' ? '&nbsp;' : text[i];
            newHtml += `<span style="animation-delay: ${i * 0.05}s; display: inline-block; opacity: 1; visibility: visible;">${char}</span>`;
        }
        logoText.innerHTML = newHtml;

        // Create particles for the logo
        const logoParticles = document.querySelector('.logo-particles');
        if (logoParticles) {
            for (let i = 0; i < 15; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                particle.style.top = `${Math.random() * 100}%`;
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.animationDelay = `${Math.random() * 2}s`;
                logoParticles.appendChild(particle);
            }
        }

        // Ensure the logo text is visible
        logoText.style.opacity = '1';
        logoText.style.visibility = 'visible';
    };

    // Security Modal Functionality
    const initSecurityFeatures = () => {
        const securityModal = document.querySelector('.security-modal');
        const securityModalClose = document.querySelector('.security-modal-close');
        const securityModalBtn = document.querySelector('.security-modal-btn');

        if (securityModal) {
            // Close modal when clicking the close button
            if (securityModalClose) {
                securityModalClose.addEventListener('click', function () {
                    securityModal.classList.remove('show');
                    document.body.style.overflow = '';
                });
            }

            // Close modal when clicking the button
            if (securityModalBtn) {
                securityModalBtn.addEventListener('click', function () {
                    securityModal.classList.remove('show');
                    document.body.style.overflow = '';
                });
            }

            // Close modal when clicking outside the content
            securityModal.addEventListener('click', function (e) {
                if (e.target === securityModal) {
                    securityModal.classList.remove('show');
                    document.body.style.overflow = '';
                }
            });

            // Close modal with Escape key
            document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape' && securityModal.classList.contains('show')) {
                    securityModal.classList.remove('show');
                    document.body.style.overflow = '';
                }
            });
        }
    };

    // Creative Picture Functionality
    const initCreativePicture = () => {
        const creativePicture = document.querySelector('.creative-picture');
        if (!creativePicture) return;

        // Add 3D tilt effect to the creative picture
        if (typeof VanillaTilt !== 'undefined') {
            VanillaTilt.init(creativePicture, {
                max: 15,
                speed: 400,
                glare: true,
                'max-glare': 0.3,
                gyroscope: true
            });
        }
    };

    // Security Features
    const addSecurityFeatures = () => {
        // Content Security Policy
        const meta = document.createElement('meta');
        meta.setAttribute('http-equiv', 'Content-Security-Policy');
        meta.setAttribute('content', "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' https://images.unsplash.com data:; connect-src 'self';");
        document.head.appendChild(meta);

        // X-Content-Type-Options
        const metaContentType = document.createElement('meta');
        metaContentType.setAttribute('http-equiv', 'X-Content-Type-Options');
        metaContentType.setAttribute('content', 'nosniff');
        document.head.appendChild(metaContentType);

        // X-Frame-Options
        const metaFrame = document.createElement('meta');
        metaFrame.setAttribute('http-equiv', 'X-Frame-Options');
        metaFrame.setAttribute('content', 'DENY');
        document.head.appendChild(metaFrame);

        // Referrer-Policy
        const metaReferrer = document.createElement('meta');
        metaReferrer.setAttribute('name', 'referrer');
        metaReferrer.setAttribute('content', 'no-referrer-when-downgrade');
        document.head.appendChild(metaReferrer);

        // Add CSRF protection to forms
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            const csrfToken = generateCSRFToken();
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'csrf_token';
            input.value = csrfToken;
            form.appendChild(input);

            // Store token in session storage
            sessionStorage.setItem('csrf_token', csrfToken);
        });
    };

    // Generate CSRF Token
    const generateCSRFToken = () => {
        return Array(32).fill(0).map(() => Math.random().toString(36).charAt(2)).join('');
    };

    // Initialize all features
    animateLogo();
    initSecurityFeatures();
    initCreativePicture();
    addSecurityFeatures();
});
