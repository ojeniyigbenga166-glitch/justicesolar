// =============================================
// JUSTICE GEORGENES SOLAR ENERGY
// Cart State Manager — localStorage-backed global cart
// =============================================

const CART_KEY = 'jg_solar_cart';

// --- Internal helpers ---
function readCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  } catch {
    return [];
  }
}

function writeCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  // Dispatch a custom event so any open page element can react
  window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { items } }));
}

// --- Public API ---

/** Add a product to cart or increment its quantity */
export function addToCart(product, quantity = 1) {
  const items = readCart();
  const existing = items.find(i => String(i.id) === String(product.id));
  if (existing) {
    existing.quantity = Math.min(existing.quantity + quantity, product.stock || 99);
  } else {
    items.push({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      stock: product.stock,
      quantity: Math.min(quantity, product.stock || 99),
    });
  }
  writeCart(items);
  return items;
}

/** Remove a product from cart entirely */
export function removeFromCart(productId) {
  const items = readCart().filter(i => String(i.id) !== String(productId));
  writeCart(items);
  return items;
}

/** Update the quantity of a specific product */
export function updateQuantity(productId, quantity) {
  const items = readCart().map(i => {
    if (String(i.id) === String(productId)) {
      return { ...i, quantity: Math.max(1, Math.min(quantity, i.stock || 99)) };
    }
    return i;
  });
  writeCart(items);
  return items;
}

/** Clear the entire cart */
export function clearCart() {
  writeCart([]);
  return [];
}

/** Get all cart items */
export function getCartItems() {
  return readCart();
}

/** Get total number of individual items (sum of quantities) */
export function getCartCount() {
  return readCart().reduce((sum, i) => sum + i.quantity, 0);
}

/** Get cart subtotal in naira (number) */
export function getCartTotal() {
  return readCart().reduce((sum, i) => sum + i.price * i.quantity, 0);
}

/** Format a number as Nigerian Naira */
export function formatPrice(amount) {
  return '₦' + amount.toLocaleString('en-NG');
}
