// client/vite.config.js

import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        item: resolve(__dirname, 'public/item.html'), // Corrected path
      },
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
    // Use configureServer instead of setup
    configureServer: (server) => {
      server.middlewares.use((req, res, next) => {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const pathname = url.pathname;

        // Regex to match /items/ followed by a number (e.g., /items/1)
        const itemRouteRegex = /^\/items\/\d+$/;

        if (itemRouteRegex.test(pathname)) {
          console.log(`Serving item.html for ${pathname}`); // Debugging log
          res.sendFile(resolve(__dirname, 'public/item.html'));
        } else {
          next();
        }
      });
    },
  },
});
