import path from 'path'; // Ensure you have this import
import { defineConfig } from 'vite'; // Import defineConfig from 'vite'
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      // Remove the external configuration if it’s not needed
      // Otherwise, ensure the path is correct and only includes external assets
      external: ['/AI_Trip_Planner_App/assets/index-cAHmw311.js'],
    },
  },
});
