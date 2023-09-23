import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createFilter } from '@rollup/pluginutils';
import * as XLSX from "xlsx"

// https://vitejs.dev/config/
export default defineConfig({
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
