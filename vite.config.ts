import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        allowedHosts: ['mailto-registrar-dominant-mothers.trycloudflare.com'],
        hmr: {
            clientPort: 443,
        },
    },
})
