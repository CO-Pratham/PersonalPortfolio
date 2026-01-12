// Main JavaScript file for professional portfolio functionality

// Dark/Light Mode Toggle
const body = document.querySelector('body');
const modeToggle = document.getElementById('mode-toggle');

function toggleMode() {
    body.classList.toggle('light-mode');

    const mode = body.classList.contains('light-mode') ? 'Light' : 'Dark';

    // Update icon
    if (modeToggle) {
        const icon = modeToggle.querySelector('i');
        if (icon) {
            if (mode === 'Light') {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        }
    }

    // Save user preference to localStorage
    localStorage.setItem('mode', mode);

    // Update particles color if particles.js is initialized
    if (window.pJSDom && window.pJSDom.length > 0) {
        const particlesColor = mode === 'Light' ? '#4361ee' : '#4cc9f0';
        window.pJSDom[0].pJS.particles.color.value = particlesColor;
        window.pJSDom[0].pJS.particles.line_linked.color = particlesColor;
        window.pJSDom[0].pJS.fn.particlesRefresh();
    }
}



// Initialize Particles.js
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 1000
                    }
                },
                color: {
                    value: body.classList.contains('light-mode') ? '#4361ee' : '#4cc9f0'
                },
                shape: {
                    type: ['circle', 'triangle', 'polygon'],
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 6
                    }
                },
                opacity: {
                    value: 0.6,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 4,
                        size_min: 0.5,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: body.classList.contains('light-mode') ? '#4361ee' : '#4cc9f0',
                    opacity: 0.4,
                    width: 1.5
                },
                move: {
                    enable: true,
                    speed: 3,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'bounce',
                    bounce: true,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'bubble'
                    },
                    onclick: {
                        enable: true,
                        mode: 'repulse'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 200,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 200,
                        size: 8,
                        duration: 2,
                        opacity: 0.8,
                        speed: 3
                    },
                    repulse: {
                        distance: 250,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });


    }
}





// Initialize Vanilla Tilt
function initTilt() {
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
        });
    }
}

// Check for saved user preference and initialize features
document.addEventListener('DOMContentLoaded', () => {
    // Check for thank you message parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('thankyou')) {
        // Remove the query parameter
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    const savedMode = localStorage.getItem('mode');

    if (savedMode === 'Light') {
        body.classList.add('light-mode');
        if (modeToggle) {
            const icon = modeToggle.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-sun';
            }
        }
    }

    // Add click event to mode toggle button
    if (modeToggle) {
        modeToggle.addEventListener('click', toggleMode);
    }

    // Initialize AOS (Animate On Scroll) if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: false,
            mirror: false,
            offset: 50,
            delay: 0,
            disable: false
        });
    }

    // Initialize the typing animation
    setTimeout(type, 1000);

    // Initialize the project filter
    initProjectFilter();

    // Initialize modern features
    initParticles();
    initFloatingActionButton();
    initTilt();

    // Initialize GSAP animations if available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Animate skill cards
        gsap.utils.toArray('.skill-card').forEach((card, i) => {
            gsap.from(card, {
                y: 100,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                delay: i * 0.1
            });
        });

        // Animate project boxes
        gsap.utils.toArray('.project-box').forEach((box, i) => {
            gsap.from(box, {
                y: 100,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: box,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                delay: i * 0.1
            });
        });

        // Animate contact cards
        gsap.utils.toArray('.contact-card').forEach((card, i) => {
            gsap.from(card, {
                y: 100,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                delay: i * 0.1
            });
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });

            // Update active state for mobile navbar
            if (this.classList.contains('mobile-nav-item')) {
                document.querySelectorAll('.mobile-nav-item').forEach(item => {
                    item.classList.remove('active');
                });
                this.classList.add('active');
            }
        }
    });
});

// Project filtering functionality
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-box');

    // Make sure all projects are visible by default
    projectItems.forEach(item => {
        item.style.display = 'block';
    });

    if (filterBtns.length > 0 && projectItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));

                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');
                console.log('Filter clicked:', filterValue);

                projectItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                    } else if (item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}

// Enhanced typing animation
const typingText = document.getElementById("typing");
const words = ["Web Developer", "Software Developer", "AI Developer", "ML Enthusiast", "Problem Solver"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const type = () => {
    if (!typingText) return;

    const currentWord = words[wordIndex];

    if (!isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(type, 1000);
        } else {
            setTimeout(type, 150);
        }
    } else {
        // Deleting logic
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, 100);
        }
    }
};

// Scroll progress indicator and back to top button
window.addEventListener('scroll', () => {
    const progressBar = document.querySelector('.scroll-progress');
    const backToTopBtn = document.querySelector('.back-to-top');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

    // Update scroll progress bar
    if (progressBar) {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;

        progressBar.style.width = scrollPercentage + '%';
    }

    // Show/hide back to top button
    if (backToTopBtn) {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    }

    // Update active state in mobile navbar based on scroll position
    if (mobileNavItems.length > 0) {
        const scrollPosition = window.scrollY;

        // Get all sections
        const sections = ['home', 'skills', 'education', 'experience', 'projects', 'contact'];

        // Find the current section
        let currentSection = sections[0];

        sections.forEach(section => {
            const element = document.getElementById(section);
            if (element && scrollPosition >= element.offsetTop - 200) {
                currentSection = section;
            }
        });

        // Update active class
        mobileNavItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    }
});

// Back to top button click event
document.addEventListener('DOMContentLoaded', () => {
    const backToTopBtn = document.querySelector('.back-to-top');

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax');

    parallaxElements.forEach(element => {
        const speed = parseFloat(element.getAttribute('data-speed') || 0.1);
        const yPos = -(window.scrollY * speed);

        // Apply the transform directly to the element
        element.style.transform = `translateY(${yPos}px)`;

        // Log for debugging
        console.log('Parallax applied:', element, 'Speed:', speed, 'Y Position:', yPos);
    });
});

// Reveal elements on scroll
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');

    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        } else {
            element.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
