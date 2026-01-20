import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three", "@react-three/fiber", "@react-three/drei"],
          motion: ["framer-motion", "gsap"],
          particles: ["tsparticles-slim", "react-tsparticles"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
