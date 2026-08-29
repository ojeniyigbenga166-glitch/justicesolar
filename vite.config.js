import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [
    {
      name: 'clean-urls',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
          const pathname = url.pathname;

          if (
            pathname !== '/' &&
            !pathname.includes('.') &&
            !pathname.startsWith('/@') &&
            !pathname.startsWith('/src') &&
            !pathname.startsWith('/node_modules')
          ) {
            const possibleHtmlFile = pathname + '.html';
            const filePath = path.join(server.config.root, possibleHtmlFile);

            if (fs.existsSync(filePath)) {
              req.url = possibleHtmlFile + url.search;
            }
          }
          next();
        });
      }
    }
  ],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        services: 'services.html',
        projects: 'projects.html',
        shop: 'shop.html',
        product: 'shop/product.html',
        cart: 'shop/cart.html',
        checkout: 'shop/checkout.html',
        'order-success': 'shop/order-success.html'
      }
    }
  }
})
