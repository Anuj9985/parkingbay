/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#111827',
          sidebar: '#0f172a',
          yellow: '#f5b014',
          yellowHover: '#e09f0e',
          accent: '#facc15',
          card: '#ffffff',
          border: '#e2e8f0',
          textMuted: '#64748b',
          mapBg: '#e5e7eb',
        }
      }
    },
  },
  plugins: [],
}
