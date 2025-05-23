/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Use prefix to avoid conflicts with Bootstrap
  prefix: 'tw-',
  theme: {
    extend: {},
  },
  // Set important to true to override Bootstrap styles when needed
  important: true,
  // Disable Tailwind's base styles to avoid conflicts with Bootstrap
  corePlugins: {
    preflight: false,
  },
  plugins: [],
} 