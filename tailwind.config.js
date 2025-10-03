/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        yes: '#10b981',
        no: '#ef4444',
        info: '#8b5cf6',
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
          primary: '#8b5cf6',
          'base-100': '#ffffff',
          'base-200': '#fafafa',
          'base-300': '#f4f4f5',
          'base-content': '#18181b',
          '--rounded-box': '8px',
          '--rounded-btn': '8px',
        },
      },
      {
        dark: {
          ...require('daisyui/src/theming/themes')['[data-theme=dark]'],
          primary: '#a78bfa',
          'base-100': '#18181b',
          'base-200': '#1f1f23',
          'base-300': '#27272a',
          'base-content': '#fafafa',
          '--rounded-box': '8px',
          '--rounded-btn': '8px',
        },
      },
    ],
  },
};
