import {
    FaUserAstronaut,
    FaCode,
    FaServer,
    FaBrain,
    FaDatabase,
    FaTools,
    FaProjectDiagram,
    FaHistory,
    FaEnvelope,
    FaTerminal,
    FaHtml5,
    FaCss3,
    FaJs,
    FaReact,
    FaNodeJs,
    FaPython,
    FaDocker,
    FaAws,
    FaGitAlt,
    FaGlobe,
    FaBriefcase,
    FaGraduationCap,
    FaLaptopCode,
    FaFire,
    FaCommentDots
} from 'react-icons/fa';

export const portfolioData = {
    personal: {
        name: "Pratham Gupta",
        role: "Full Stack & AI Engineer",
        location: "Greater Noida, India",
        email: "prathamguptabtech22-26@liet.in",
        phone: "+91 7042857253",
        socials: {
            github: "https://github.com/CO-Pratham",
            linkedin: "https://www.linkedin.com/feed/",
            twitter: "https://x.com/PrathamGup68084"
        },
        bio: "I'm a passionate and dedicated developer with expertise in web development, software engineering, and AI technologies. I love solving complex problems and creating innovative solutions that make a difference."
    },
    experience: [
        {
            year: "Oct 2025 - Present",
            title: "React Developer Intern | AppVersal",
            desc: "Built production React features used by real users. Improved UI performance and load times. Collaborated closely with backend and product teams. Delivered components aligned with a design system.",
            type: "work",
            tags: ["React", "TypeScript", "Tailwind", "TanStack Query", "REST APIs"]
        },
        {
            year: "2024",
            title: "Open Source Contributor",
            desc: "Contributed bug fixes and feature enhancements to various GitHub repositories. Active participant in Hacktoberfest.",
            type: "work",
            tags: ["GitHub", "Collaboration", "Code Review", "Bug Fixes"]
        },
        {
            year: "2024",
            title: "Hackathon Achiever",
            desc: "Participated in 3x 24h Hackathons & 2x Codeathons. Developed innovative solutions under pressure and solved complex algorithmic challenges.",
            type: "achievement",
            tags: ["Innovation", "Rapid Prototyping", "Teamwork", "Problem Solving"]
        },
        {
            year: "2022-2026",
            title: "B.Tech Computer Science",
            desc: "Lloyd Institute of Engineering and Technology. Focusing on AI, Machine Learning, and Web Development.",
            type: "education",
            tags: ["Computer Science", "AI/ML", "Web Dev", "Data Structures"]
        },
        {
            year: "2020-2021",
            title: "Higher Secondary (12th)",
            desc: "MRL Sr Sec School. Science Stream with Computer Science.",
            type: "education",
            tags: ["Science", "Maths", "Computer Science"]
        }
    ],
    projects: [
        {
            id: "ai-chatbot",
            label: "AI Chatbot",
            category: "AI/ML",
            tech: ["Python", "TensorFlow", "NLP", "Flask"],
            desc: "An intelligent chatbot using NLP to understand context and provide human-like responses.",
            details: {
                problem: "Traditional functional chatbots lack context awareness and fail in conversational nuances.",
                solution: "Implemented a context-memory system using LSTM networks to track conversation history.",
                metrics: [
                    { label: "Accuracy", value: "92%" },
                    { label: "Response Time", value: "<200ms" }
                ]
            },
            color: "#ff0055"
        },
        {
            id: "codevault",
            label: "CodeVault",
            category: "Web",
            tech: ["React", "Firebase", "OAuth", "Tailwind"],
            desc: "A secure digital locker for developers to store and share coding identities.",
            details: {
                problem: "Developers struggle to showcase dispersed profiles (LeetCode, GitHub) in one unified links.",
                solution: "Built a centralized identity hub with OAuth integration and real-time syncing.",
                metrics: [
                    { label: "Users", value: "500+" },
                    { label: "Uptime", value: "99.9%" }
                ]
            },
            link: "https://codevaultweb.xyz",
            color: "#00f3ff"
        },
        {
            id: "motomania",
            label: "MOTOMANiA",
            category: "Full Stack",
            tech: ["React", "Node.js", "MongoDB", "Socket.io"],
            desc: "A comprehensive platform for motorcycle enthusiasts with real-time forums.",
            details: {
                problem: "Lack of dedicated, real-time community platforms for niche motorcycle groups.",
                solution: "Developed a MERN stack app with Socket.io for live chat and geolocation routing.",
                metrics: [
                    { label: "Engagement", value: "High" }
                ]
            },
            color: "#00ff9d"
        },
        {
            id: "rapidhelp",
            label: "rapidHELP",
            category: "App",
            tech: ["PWA", "Geolocation API", "HTML/JS"],
            desc: "Emergency assistance PWA connecting users to nearby help with one tap.",
            details: {
                problem: "Emergency apps often require heavy downloads and fail in low connectivity.",
                solution: "Created an offline-first PWA that caches essential first-aid data and uses SMS fallbacks.",
                metrics: []
            },
            color: "#ffee00"
        }
    ],

    // HIERARCHICAL NODE MAP FOR 3D NEURAL INTERFACE
    nodes: [
        // --- LEVEL 0: CORE ---
        { id: 'about', label: 'PRATHAM.CORE', pos: [0, 0, 0], color: '#ffffff', type: 'core', icon: FaUserAstronaut },

        // --- LEVEL 1: SECTIONS ---
        { id: 'skills', label: 'SKILLS_MATRIX', pos: [-4, 2, 0], color: '#61dafb', type: 'section', parent: 'about', icon: FaTools },
        { id: 'projects', label: 'PROJECT_VAULT', pos: [4, 2, 0], color: '#00f3ff', type: 'section', parent: 'about', icon: FaProjectDiagram },
        { id: 'experience', label: 'TIMELINE', pos: [0, -4, 0], color: '#ff9900', type: 'section', parent: 'about', icon: FaHistory },
        { id: 'contact', label: 'UPLINK', pos: [0, 5, -2], color: '#00ff00', type: 'section', parent: 'about', icon: FaEnvelope },

        // --- LEVEL 2: SKILL CATEGORIES ---
        { id: 'frontend', label: 'FRONTEND', pos: [-7, 4, 1], color: '#61dafb', type: 'category', parent: 'skills', icon: FaLaptopCode },
        { id: 'backend', label: 'BACKEND', pos: [-7, 0, 1], color: '#00ff9d', type: 'category', parent: 'skills', icon: FaServer },
        { id: 'ai', label: 'AI / ML', pos: [-5, 6, -1], color: '#ff0055', type: 'category', parent: 'skills', icon: FaBrain },

        { id: 'tools', label: 'DEV_OPS', pos: [-5, -2, -1], color: '#ff9900', type: 'category', parent: 'skills', icon: FaTools },

        // --- LEVEL 3: SPECIFIC SKILLS (Satellites) ---
        // Frontend Cluster
        { id: 'react', label: 'React', pos: [-8.5, 5.5, 2], color: '#61dafb', type: 'item', parent: 'frontend', icon: FaReact },
        { id: 'html', label: 'HTML5', pos: [-9.5, 4, 2], color: '#e34c26', type: 'item', parent: 'frontend', icon: FaHtml5 },
        { id: 'css', label: 'CSS3', pos: [-8.5, 2.5, 2], color: '#264de4', type: 'item', parent: 'frontend', icon: FaCss3 },
        { id: 'js', label: 'JavaScript', pos: [-6, 5, 2], color: '#f7df1e', type: 'item', parent: 'frontend', icon: FaJs },

        // Backend Cluster
        { id: 'node', label: 'Node.js', pos: [-8.5, -1, 2], color: '#68a063', type: 'item', parent: 'backend', icon: FaNodeJs },
        { id: 'db', label: 'SQL', pos: [-9.5, 1, 2], color: '#4db33d', type: 'item', parent: 'backend', icon: FaDatabase },
        { id: 'mongo', label: 'MongoDB', pos: [-7.5, -2, 2], color: '#47A248', type: 'item', parent: 'backend', icon: FaServer },

        // AI Cluster
        { id: 'python', label: 'Python', pos: [-4, 7.5, 0], color: '#3776ab', type: 'item', parent: 'ai', icon: FaPython },
        { id: 'tf', label: 'TensorFlow', pos: [-6, 7.5, 0], color: '#ff6f00', type: 'item', parent: 'ai', icon: FaBrain },
        { id: 'pytorch', label: 'PyTorch', pos: [-3, 6.5, 1], color: '#EE4C2C', type: 'item', parent: 'ai', icon: FaFire },
        { id: 'nlp', label: 'NLP', pos: [-5, 8.5, -1], color: '#9C27B0', type: 'item', parent: 'ai', icon: FaCommentDots },

        // DevOps / Tools Cluster
        { id: 'docker', label: 'Docker', pos: [-4, -3, 2], color: '#2496ed', type: 'item', parent: 'tools', icon: FaDocker },
        { id: 'git', label: 'Git', pos: [-5, -4.5, 2], color: '#F05032', type: 'item', parent: 'tools', icon: FaGitAlt },
        { id: 'aws', label: 'AWS', pos: [-6, -3, 2], color: '#FF9900', type: 'item', parent: 'tools', icon: FaAws },

        // --- LEVEL 2: PROJECTS (Satellites around Projects Node) ---
        { id: 'p-codevault', label: 'CodeVault', pos: [6, 4, 2], color: '#00f3ff', type: 'item', parent: 'projects', icon: FaGlobe, projectId: 'codevault' },
        { id: 'p-chatbot', label: 'AI Chatbot', pos: [7.5, 2, 2], color: '#ff0055', type: 'item', parent: 'projects', icon: FaJs, projectId: 'ai-chatbot' },
        { id: 'p-moto', label: 'MotoMania', pos: [6, 0, 2], color: '#00ff9d', type: 'item', parent: 'projects', icon: FaGlobe, projectId: 'motomania' },
        { id: 'p-rapid', label: 'RapidHelp', pos: [3.5, 1, 2], color: '#ffee00', type: 'item', parent: 'projects', icon: FaGlobe, projectId: 'rapidhelp' },

        // --- LEVEL 2: EXPERIENCE (Timeline) ---
        // New Experience Node (AppVersal) - Added to 3D Map
        { id: 'exp-appversal', label: '2025: AppVersal', pos: [-4, -7, 3], color: '#00ff9d', type: 'item', parent: 'experience', icon: FaBriefcase },

        { id: 'exp-2024', label: '2024: Open Source', pos: [-2, -6, 2], color: '#ff9900', type: 'item', parent: 'experience', icon: FaGitAlt },
        { id: 'exp-btech', label: '2022: B.Tech', pos: [2, -6, 2], color: '#007acc', type: 'item', parent: 'experience', icon: FaGraduationCap },
        { id: 'exp-hack', label: 'Hackathons', pos: [0, -7.5, 2], color: '#ff0055', type: 'item', parent: 'experience', icon: FaBriefcase },
    ]
};
