// Project Modal Functionality
document.addEventListener('DOMContentLoaded', function () {
    // Project data
    const projectData = {
        'ai-chatbot': {
            title: 'AI Chatbot',
            image: 'https://images.unsplash.com/photo-1677442135136-760c813a7942',
            description: 'An intelligent chatbot built with Python and Natural Language Processing that can understand and respond to user queries in a conversational manner. The chatbot uses advanced machine learning algorithms to improve its responses over time.',
            technologies: ['Python', 'TensorFlow', 'NLP', 'NLTK', 'Flask'],
            features: [
                'Natural language understanding and processing',
                'Context-aware responses',
                'Integration with various APIs for real-time data',
                'Self-learning capabilities to improve over time',
                'Multi-language support'
            ],
            challenges: 'One of the main challenges was training the model to understand context in conversations. I solved this by implementing a context memory system that keeps track of previous exchanges and uses them to inform future responses.',
            github: '#',
            demo: '#'
        },
        'codevault': {
            title: 'CodeVault',
            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
            description: 'A secure platform for developers to store and share their coding profiles and portfolios. CodeVault allows users to create a digital locker of their coding identities across various platforms and share them with a single link.',
            technologies: ['HTML', 'CSS', 'JavaScript', 'Firebase', 'OAuth'],
            features: [
                'Secure authentication with multiple providers',
                'Real-time synchronization across devices',
                'Custom profile sharing with access controls',
                'Integration with GitHub, LeetCode, and other coding platforms',
                'Analytics dashboard for profile views'
            ],
            challenges: 'Implementing secure authentication while maintaining a seamless user experience was challenging. I used Firebase Authentication with custom security rules to ensure data protection without compromising on usability.',
            github: '#',
            demo: 'https://codevaultweb.xyz'
        },
        'rapidhelp': {
            title: 'rapidHELP',
            image: 'https://images.unsplash.com/photo-1581267852726-6a5e13c1e7f6',
            description: 'An emergency assistance web application designed to connect users with emergency services quickly. The app uses geolocation to find nearby help and provides step-by-step guidance for various emergency situations.',
            technologies: ['HTML', 'CSS', 'JavaScript', 'Geolocation API', 'PWA'],
            features: [
                'One-tap emergency service calling',
                'Real-time location sharing with emergency contacts',
                'Offline functionality for areas with poor connectivity',
                'Step-by-step first aid guides',
                'Emergency contact management'
            ],
            challenges: 'Ensuring the app works reliably in offline mode was crucial for emergency situations. I implemented a Progressive Web App architecture with service workers to cache essential content and functionality for offline use.',
            github: '#',
            demo: '#'
        },
        'motomania': {
            title: 'MOTOMANiA',
            image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39',
            description: 'A comprehensive platform for motorcycle enthusiasts featuring interactive content, community forums, and detailed guides. The website serves as a hub for bikers to connect, share experiences, and learn about motorcycle maintenance and riding techniques.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Socket.io'],
            features: [
                'Real-time community chat and forums',
                'Interactive motorcycle part identification tool',
                'User-generated content with moderation system',
                'Personalized ride route recommendations',
                'Maintenance tracking and reminders'
            ],
            challenges: 'Building a responsive and interactive community platform that works well on both desktop and mobile devices was challenging. I used React with a mobile-first approach and implemented lazy loading to ensure fast performance across all devices.',
            github: '#',
            demo: '#'
        },
        'portfolio': {
            title: 'Portfolio Website',
            image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8',
            description: 'A modern, responsive personal portfolio website built to showcase my skills, projects, and achievements. The website features smooth animations, interactive elements, and a clean, professional design.',
            technologies: ['HTML', 'CSS', 'JavaScript', 'GSAP', 'AOS', 'Particles.js'],
            features: [
                'Responsive design that works on all devices',
                'Interactive project showcases with detailed information',
                'Smooth scrolling and page transitions',
                'Dark/light mode toggle',
                'Performance optimized loading and animations'
            ],
            challenges: 'Creating a website that stands out while maintaining excellent performance was a key challenge. I focused on optimizing asset loading, implementing efficient animations with GSAP, and ensuring accessibility standards were met throughout the site.',
            github: '#',
            demo: 'https://prathamgupta.xyz'
        }
    };

    // Get all project detail buttons
    const projectDetailBtns = document.querySelectorAll('.project-details-btn');
    const projectModal = document.querySelector('.project-modal');
    const projectModalClose = document.querySelector('.project-modal-close');

    // Add click event to all project detail buttons
    projectDetailBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const projectId = this.getAttribute('data-project');
            const project = projectData[projectId];

            if (project) {
                // Fill modal with project data
                document.getElementById('project-modal-title').textContent = project.title;
                document.getElementById('project-modal-img').src = project.image;
                document.getElementById('project-modal-img').alt = project.title;
                document.getElementById('project-modal-description').textContent = project.description;

                // Fill technologies
                const techList = document.getElementById('project-modal-tech');
                techList.innerHTML = '';
                project.technologies.forEach(tech => {
                    const span = document.createElement('span');
                    span.textContent = tech;
                    techList.appendChild(span);
                });

                // Fill features
                const featuresList = document.getElementById('project-modal-features');
                featuresList.innerHTML = '';
                project.features.forEach(feature => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    featuresList.appendChild(li);
                });

                // Fill challenges
                document.getElementById('project-modal-challenges').textContent = project.challenges;

                // Set links
                document.getElementById('project-modal-github').href = project.github;
                document.getElementById('project-modal-demo').href = project.demo;

                // Show modal with animation
                projectModal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Prevent scrolling

                // Add 3D tilt effect to project image
                if (typeof VanillaTilt !== 'undefined') {
                    VanillaTilt.init(document.querySelector('.project-modal-image'), {
                        max: 5,
                        speed: 400,
                        glare: true,
                        'max-glare': 0.2,
                    });
                }
            }
        });
    });

    // Close modal when clicking the close button
    if (projectModalClose) {
        projectModalClose.addEventListener('click', function () {
            projectModal.classList.remove('show');
            document.body.style.overflow = ''; // Re-enable scrolling
        });
    }

    // Close modal when clicking outside the content
    if (projectModal) {
        projectModal.addEventListener('click', function (e) {
            if (e.target === projectModal) {
                projectModal.classList.remove('show');
                document.body.style.overflow = ''; // Re-enable scrolling
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && projectModal.classList.contains('show')) {
            projectModal.classList.remove('show');
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    });
});
