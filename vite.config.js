import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
export default defineConfig({ base: '/app-house-site/', plugins: [preact()] })
