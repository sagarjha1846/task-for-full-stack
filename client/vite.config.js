import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  output: {
    manualChunks(id) {
      // Specify how modules should be grouped into chunks
      if (id.includes('node_modules')) {
        return 'vendor'; // Group all modules from node_modules into a 'vendor' chunk
      } else {
        return 'main'; // Group all other modules into a 'main' chunk
      }
    },
    // other output options...
    build: {
      chunkSizeWarningLimit: 50000000, // Adjust the chunk size warning limit to 500 kBs
    },
  },

  plugins: [react()],
});
