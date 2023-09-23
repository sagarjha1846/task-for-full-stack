import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createFilter } from '@rollup/pluginutils';
import * as XLSX from "xlsx"

// https://vitejs.dev/config/
export default defineConfig({
  output: {
    // other output options...
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString();
            }
          },
        },
      },
    },
    manualChunks(id) {
      // Specify how modules should be grouped into chunks
      if (id.includes('node_modules')) {
        return 'vendor'; // Group all modules from node_modules into a 'vendor' chunk
      } else {
        return 'main'; // Group all other modules into a 'main' chunk
      }
    },
  },
  plugins: [
    react(),
    {
      name: 'xlsx-plugin',
      transform(code, id) {
        const filter = createFilter(['**/*.xlsx']);

        if (filter(id)) {
          const workbook = XLSX.readFile(id);
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          const transformedCode = `export default ${JSON.stringify(jsonData)};`;
          return transformedCode;
        }
      },
    },
  ],
});
