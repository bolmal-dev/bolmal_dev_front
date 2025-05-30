// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                primary: {
                    bg: 'var(--color-primary-bg)', // #FF4869
                    DEFAULT: 'var(--color-primary)', // #FF3C60
                },
                secondary: 'var(--color-secondary)', // #FEC300
                bg: {
                    default: 'var(--color-bg-default)', // #FAFAFA
                    pink: 'var(--color-bg-pink)', // #FFE6EB
                    yellow: 'var(--color-bg-yellow)', // #FFF8E1
                },
            },
        },
    },
    plugins: [],
};
export default config;
