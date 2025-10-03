/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        yes: '#10b981',
        no: '#ef4444',
        info: '#3b82f6',
        main: 'var(--text-main)',
        secondary: 'var(--text-secondary)',
        active: 'var(--bg-active)',
      },
      fontFamily: {
        sans: ['var(--font-heading)', 'var(--font-body)', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
        heading: ['var(--font-heading)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['[data-theme=light]'],
          primary: '#3b82f6',
          'base-100': '#ffffff',
          'base-200': '#fafafa',
          'base-300': '#f5f5f5',
          'base-content': '#1a1a1a',
          '--rounded-box': '6px',
          '--rounded-btn': '6px',
        },
      },
      {
        dark: {
          ...require('daisyui/src/theming/themes')['[data-theme=dark]'],
          primary: '#3b82f6',
          'base-100': '#1a1a1a',
          'base-200': '#242424',
          'base-300': '#2a2a2a',
          'base-content': '#e0e0e0',
          '--rounded-box': '6px',
          '--rounded-btn': '6px',
        },
      },
    ],
  },
};
