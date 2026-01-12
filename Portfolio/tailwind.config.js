/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'cyber-black': '#0a0a0a',
                'neon-blue': '#00f3ff',
                'neon-green': '#00ff9d',
                'glass': 'rgba(255, 255, 255, 0.05)',
            },
            fontFamily: {
                mono: ['"Fira Code"', 'monospace'],
                sans: ['Inter', 'sans-serif'],
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }
        },
    },
    plugins: [],
}
