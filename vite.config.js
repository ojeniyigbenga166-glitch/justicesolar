import { defineConfig } from 'vite'

export default defineConfig({
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
