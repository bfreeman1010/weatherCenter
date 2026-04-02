/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'threat-none': '#10b981',
        'threat-marginal': '#84cc16',
        'threat-slight': '#eab308',
        'threat-enhanced': '#f97316',
        'threat-moderate': '#ef4444',
        'threat-high': '#dc2626',
      },
    },
  },
  plugins: [],
};
