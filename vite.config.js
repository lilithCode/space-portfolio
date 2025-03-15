import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
<<<<<<< HEAD
import tailwindcss from "@tailwindcss/vite";
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  plugins: [react(), tailwindcss(), createHtmlPlugin()],
  server: {
    historyApiFallback: true,
  },
  build: {
    base: '/Portfolio/',  
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
=======
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react() ,tailwindcss()],
})
>>>>>>> f2d5575 (Initial commit)
