import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const isLaravelEmbed = mode === 'laravel';

    return {
        plugins: [react()],
        base: isLaravelEmbed ? '/landing-assets/' : '/',
        build: {
            outDir: isLaravelEmbed ? '../public/landing-assets' : 'dist',
            emptyOutDir: true,
        },
        server: {
            port: 5173,
        }
    };
})
