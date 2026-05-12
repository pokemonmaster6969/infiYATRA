import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
<<<<<<< HEAD
        allowedHosts: true,
        proxy: {
            '/api': 'http://localhost:3001'
        },
=======
        allowedHosts: ['mailto-registrar-dominant-mothers.trycloudflare.com'],
>>>>>>> 2c9a9e5 (initial commit with large files)
        hmr: {
            clientPort: 443,
        },
    },
})
