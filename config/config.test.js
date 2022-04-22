// https://umijs.org/config/
import { defineConfig } from 'umi';
export default defineConfig({
  define: {
    'process.env.UMI_ENV': 'http://localhost:8009/',
  },
});
