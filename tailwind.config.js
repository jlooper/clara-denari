/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontSize: {
        'responsive-xs': 'clamp(0.75rem, 2vw, 0.875rem)',
        'responsive-sm': 'clamp(0.875rem, 2.5vw, 1rem)',
        'responsive-base': 'clamp(1rem, 3vw, 1.125rem)',
        'responsive-lg': 'clamp(1.125rem, 3.5vw, 1.25rem)',
        'responsive-xl': 'clamp(1.25rem, 4vw, 1.5rem)',
        'responsive-2xl': 'clamp(1.5rem, 5vw, 2rem)',
        'responsive-3xl': 'clamp(1.875rem, 6vw, 2.5rem)',
        'responsive-4xl': 'clamp(2.25rem, 7vw, 3rem)',
        'responsive-5xl': 'clamp(3rem, 8vw, 4rem)',
        'responsive-6xl': 'clamp(3.75rem, 10vw, 5rem)',
      },
      spacing: {
        'responsive-xs': 'clamp(0.25rem, 1vw, 0.5rem)',
        'responsive-sm': 'clamp(0.5rem, 1.5vw, 0.75rem)',
        'responsive-md': 'clamp(0.75rem, 2vw, 1rem)',
        'responsive-lg': 'clamp(1rem, 3vw, 1.5rem)',
        'responsive-xl': 'clamp(1.5rem, 4vw, 2rem)',
        'responsive-2xl': 'clamp(2rem, 5vw, 3rem)',
      }
    },
  },
  plugins: [],
}
