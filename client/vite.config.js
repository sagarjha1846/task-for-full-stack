import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  output: {
    // other output options...
    build: {
      chunkSizeWarningLimit: 50000000, // Adjust the chunk size warning limit to 500 kBs
    },
  },

  plugins: [react()],
});
