import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000 // Set the chunk size warning limit to 1000 kB
  }
});