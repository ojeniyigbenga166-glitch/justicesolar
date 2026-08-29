// =============================================
// JUSTICE GEORGENES SOLAR ENERGY
// Cart Page — /shop/cart.html
// =============================================
import './style.css';
import {
  getCartItems, removeFromCart, updateQuantity,
  getCartTotal, clearCart, formatPrice, getCartCount
} from './cart.js';
import {
  createNavbar, createMobileMenu, createFooter,
  initNavbar, updateCartBadge, openGetStartedModal
} from './layout.js';

// Delivery fee logic
const DELIVERY_OPTIONS = [
  { id: 'pickup', label: 'Store Pickup (Akure)', fee: 0 },
  { id: 'local', label: 'Local Delivery (Ondo State)', fee: 5000 },
  { id: 'nationwide', label: 'Nationwide Delivery', fee: 15000 },
];

let selectedDelivery = DELIVERY_OPTIONS[0];

// ─── RENDER CART TABLE ────────────────────────────────────────────────────────
function renderCart() {
  const items = getCartItems();
  const wrapper = document.getElementById('cart-page-content');
  if (!wrapper) return;

  if (items.length === 0) {
    wrapper.innerHTML = `
      <div class="cart-empty-state">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.25"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <a href="/shop" class="btn-primary" style="display:inline-block;margin-top:1.5rem">Browse Products</a>
      </div>
    `;
    return;
  }

  const subtotal = getCartTotal();
  const total = subtotal + selectedDelivery.fee;

  wrapper.innerHTML = `
    <div class="cart-page__layout">
      <!-- Items Table -->
      <div class="cart-page__items">
        <div class="cart-page__items-header">
          <span>Product</span>
          <span>Price</span>
          <span>Qty</span>
          <span>Total</span>
          <span></span>
        </div>

        ${items.map(item => `
          <div class="cart-row" data-id="${item.id}">
            <div class="cart-row__product">
              <img src="${item.image}" alt="${item.name}"
                onerror="this.src='https://placehold.co/80x64/e2e8f0/475569?text=Product'" />
              <div>
                <a href="/shop/product?slug=${item.slug}" class="cart-row__name">${item.name}</a>
                <p class="cart-row__cat">${item.category}</p>
              </div>
            </div>
            <div class="cart-row__price">${formatPrice(item.price)}</div>
            <div class="cart-row__qty">
              <button class="qty-btn" data-action="dec" data-id="${item.id}">−</button>
              <span>${item.quantity}</span>
              <button class="qty-btn" data-action="inc" data-id="${item.id}" data-stock="${item.stock}">+</button>
            </div>
            <div class="cart-row__total">${formatPrice(item.price * item.quantity)}</div>
            <button class="cart-row__remove" data-id="${item.id}" aria-label="Remove ${item.name}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
            </button>
          </div>
        `).join('')}

        <div class="cart-page__actions-row">
          <a href="/shop" class="btn-outline-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
            Continue Shopping
          </a>
          <button class="btn-outline-sm btn--danger" id="clear-cart-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
            Clear Cart
          </button>
        </div>
      </div>

      <!-- Order Summary -->
      <aside class="cart-page__summary">
        <h2 class="cart-summary__title">Order Summary</h2>

        <div class="cart-summary__row">
          <span>Subtotal (${items.reduce((s,i)=>s+i.quantity,0)} items)</span>
          <strong>${formatPrice(subtotal)}</strong>
        </div>

        <div class="cart-summary__delivery">
          <p class="cart-summary__delivery-label">Delivery Method</p>
          ${DELIVERY_OPTIONS.map(opt => `
            <label class="delivery-option ${selectedDelivery.id === opt.id ? 'selected' : ''}">
              <input type="radio" name="delivery" value="${opt.id}" ${selectedDelivery.id === opt.id ? 'checked' : ''} />
              <span>${opt.label}</span>
              <strong>${opt.fee === 0 ? 'FREE' : formatPrice(opt.fee)}</strong>
            </label>
          `).join('')}
        </div>

        <div class="cart-summary__row">
          <span>Delivery</span>
          <strong>${selectedDelivery.fee === 0 ? 'FREE' : formatPrice(selectedDelivery.fee)}</strong>
        </div>
        <div class="cart-summary__row cart-summary__row--total">
          <span>Total</span>
          <strong>${formatPrice(total)}</strong>
        </div>

        <a href="/shop/checkout" class="btn-primary" style="display:block;text-align:center;margin-top:1.5rem">
          Proceed to Checkout
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </a>
        <p class="cart-summary__secure">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          Secure & trusted checkout
        </p>
      </aside>
    </div>
  `;

  // Qty controls
  wrapper.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const item = getCartItems().find(i => i.id === id);
      if (!item) return;
      btn.dataset.action === 'inc'
        ? updateQuantity(id, item.quantity + 1)
        : (item.quantity <= 1 ? removeFromCart(id) : updateQuantity(id, item.quantity - 1));
      renderCart();
      updateCartBadge(getCartCount());
    });
  });

  // Remove
  wrapper.querySelectorAll('.cart-row__remove').forEach(btn => {
    btn.addEventListener('click', () => {
      removeFromCart(parseInt(btn.dataset.id));
      renderCart();
      updateCartBadge(getCartCount());
    });
  });

  // Clear cart
  document.getElementById('clear-cart-btn')?.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      clearCart();
      renderCart();
      updateCartBadge(0);
    }
  });

  // Delivery options
  wrapper.querySelectorAll('input[name="delivery"]').forEach(radio => {
    radio.addEventListener('change', () => {
      selectedDelivery = DELIVERY_OPTIONS.find(o => o.id === radio.value) || DELIVERY_OPTIONS[0];
      // Save to session for checkout page
      sessionStorage.setItem('jg_delivery', JSON.stringify(selectedDelivery));
      renderCart();
    });
  });
}

// ─── PAGE SECTION BUILDER ─────────────────────────────────────────────────────
function createCartPageSection() {
  const main = document.createElement('main');
  main.className = 'cart-page';
  main.innerHTML = `
    <div class="subpage-container">
      <div class="subpage-header">
        <div style="display: flex; justify-content: flex-start; margin-bottom: 1.5rem;">
          <a href="javascript:history.back()" class="page-back-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span>Back</span>
          </a>
        </div>
        <h1 class="subpage-title">Shopping Cart</h1>
        <p class="subpage-subtitle" id="cart-count-label"></p>
      </div>
      <div id="cart-page-content"></div>
    </div>
  `;
  return main;
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
function init() {
  const app = document.getElementById('app');
  app.appendChild(createNavbar('shop'));
  app.appendChild(createMobileMenu());
  app.appendChild(createCartPageSection());
  app.appendChild(createFooter());

  updateCartBadge(getCartCount());

  const label = document.getElementById('cart-count-label');
  const count = getCartCount();
  if (label) label.textContent = count > 0 ? `${count} item${count !== 1 ? 's' : ''} in your cart` : '';

  renderCart();

  window.addEventListener('cartUpdated', () => {
    updateCartBadge(getCartCount());
  });

  initNavbar(null);
}

// Run on DOM ready — handle case where DOM is already parsed (ES module defer)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
