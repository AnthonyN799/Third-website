/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // brand
        bg:        '#F5EFE6',  // warm cream paper
        bone:      '#FBF8F2',  // elevated surface
        linen:     '#EDE5D6',  // subtle depth
        sand:      '#E5DCCB',  // dividers / wash
        ink:       '#1B1B1A',  // warm near-black
        'ink-soft':'#3A3733',  // body text
        'ink-mute':'#7E7A74',  // captions / muted
        cypress:   '#2C3D33',  // brand deep green
        'cypress-soft':'#4F6A57',
        clay:      '#B8553D',  // single energy accent
        'clay-deep':'#9A4530',
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans:    ['"Outfit"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.045em',
        editorial: '-0.025em',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      boxShadow: {
        soft:  '0 1px 2px rgba(27,27,26,0.04), 0 4px 16px rgba(27,27,26,0.04)',
        card:  '0 2px 4px rgba(27,27,26,0.04), 0 12px 32px rgba(27,27,26,0.06)',
        deep:  '0 8px 32px rgba(27,27,26,0.08), 0 32px 80px rgba(27,27,26,0.12)',
      },
      animation: {
        'fade-up': 'fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'marquee': 'marquee 40s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: 0, transform: 'translateY(28px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
