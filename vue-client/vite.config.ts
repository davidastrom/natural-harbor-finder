import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
import { readFileSync } from 'fs';

const isProd = process.env.NODE_ENV === 'production';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      types: fileURLToPath(new URL('./types', import.meta.url)),
    },
  },
  server: {
    https: !isProd ? {
      key: readFileSync('./.cert/key.pem'),
      cert: readFileSync('./.cert/cert.pem')
    } : undefined,
  }
});
