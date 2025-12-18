/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 可爱的粉色系
        pink: {
          50: '#fff5f7',
          100: '#ffe4e9',
          200: '#ffc2d1',
          300: '#ff9ab4',
          400: '#ff6b9d',
          500: '#ff4081',
          600: '#e91e63',
        },
        // 温暖的橙色
        peach: {
          50: '#fff8f5',
          100: '#ffede4',
          200: '#ffd4c2',
          300: '#ffb599',
          400: '#ffa07a',
          500: '#ff8c5a',
        },
        // 活泼的黄色
        sunny: {
          50: '#fffdf5',
          100: '#fff9e6',
          200: '#fff3c4',
          300: '#ffd93d',
          400: '#ffc107',
          500: '#ffb300',
        },
        // 清新的蓝色
        sky: {
          50: '#f0f9ff',
          100: '#e0f4ff',
          200: '#b9e6ff',
          300: '#87ceeb',
          400: '#74b9ff',
          500: '#4dabf7',
        },
        // 柔和的绿色
        mint: {
          50: '#f0fff4',
          100: '#dcffe4',
          200: '#b8f5cd',
          300: '#81ecb0',
          400: '#55efc4',
          500: '#00d084',
        },
        // 紫色梦幻
        lavender: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
        },
      },
      fontFamily: {
        sans: ['LXGW WenKai', 'Noto Sans SC', 'system-ui', 'sans-serif'],
        display: ['Ma Shan Zheng', 'LXGW WenKai', 'cursive'],
      },
      borderRadius: {
        'cute': '24px',
        'super': '32px',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.7, transform: 'scale(0.9)' },
        },
      },
      boxShadow: {
        'cute': '0 8px 30px rgba(255, 107, 157, 0.2)',
        'cute-lg': '0 15px 50px rgba(255, 107, 157, 0.25)',
        'sunny': '0 8px 30px rgba(255, 193, 7, 0.3)',
      }
    },
  },
  plugins: [],
}
