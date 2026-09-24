import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

import {defineConfig} from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],

  // base property is needed for vite config
  // note it needs to have the trailing slash
  base: '/~juhatau/wsk-s26/',
});
