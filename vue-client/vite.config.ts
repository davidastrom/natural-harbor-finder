import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';

import basicSsl from '@vitejs/plugin-basic-ssl';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), basicSsl()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      types: fileURLToPath(new URL('./types', import.meta.url)),
    },
  },
  server: {
    https: true,
  },
});
