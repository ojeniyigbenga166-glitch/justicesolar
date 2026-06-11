// =============================================
// JUSTICE GEORGENES SOLAR ENERGY
// Product Detail Page — /shop/product.html?slug=...
// =============================================
import './style.css';
import { products, fetchProducts } from './products.js';
import { addToCart, getCartCount, getCartItems, removeFromCart, updateQuantity, getCartTotal, formatPrice } from './cart.js';
import {
  createNavbar, createMobileMenu, createFooter,
  createCartDrawer, openCartDrawer,
  initNavbar, updateCartBadge
} from './layout.js';

// ─── CART DRAWER ─────────────────────────────────────────────────────────────
function renderCartDrawer() {
  const body = document.getElementById('cart-drawer-body');
  const footer = document.getElementById('cart-drawer-footer');
  if (!body || !footer) return;
  const items = getCartItems();

  if (items.length === 0) {
    body.innerHTML = `<div class="cart-drawer__empty"><svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.3"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg><p>Your cart is empty</p><a href="/shop.html" class="btn-primary" style="margin-top:1rem;display:inline-block;text-align:center">Browse Products</a></div>`;
    footer.innerHTML = '';
    return;
  }

  body.innerHTML = items.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <img src="${item.image}" alt="${item.name}" class="cart-item__img" onerror="this.src='https://placehold.co/80x60/e2e8f0/475569?text=Product'"/>
      <div class="cart-item__info">
        <p class="cart-item__name">${item.name}</p>
        <p class="cart-item__price">${formatPrice(item.price)}</p>
        <div class="cart-item__qty">
          <button class="qty-btn" data-action="dec" data-id="${item.id}">−</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" data-action="inc" data-id="${item.id}" data-stock="${item.stock}">+</button>
        </div>
      </div>
      <button class="cart-item__remove" data-id="${item.id}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
  `).join('');

  footer.innerHTML = `
    <div class="cart-drawer__subtotal"><span>Subtotal</span><strong>${formatPrice(getCartTotal())}</strong></div>
    <p class="cart-drawer__note">Shipping calculated at checkout</p>
    <a href="/shop/cart.html" class="btn-outline-dark" style="display:block;text-align:center;margin-bottom:0.75rem">View Cart</a>
    <a href="/shop/checkout.html" class="btn-primary" style="display:block;text-align:center">Proceed to Checkout</a>
  `;

  body.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const item = getCartItems().find(i => String(i.id) === id);
      if (!item) return;
      btn.dataset.action === 'inc' ? updateQuantity(id, item.quantity + 1) : (item.quantity <= 1 ? removeFromCart(id) : updateQuantity(id, item.quantity - 1));
      renderCartDrawer();
      updateCartBadge(getCartCount());
    });
  });

  body.querySelectorAll('.cart-item__remove').forEach(btn => {
    btn.addEventListener('click', () => {
      removeFromCart(btn.dataset.id);
      renderCartDrawer();
      updateCartBadge(getCartCount());
    });
  });
}

// ─── PRODUCT PAGE BUILDER ────────────────────────────────────────────────────
function buildProductPage(product) {
  const main = document.createElement('main');
  main.className = 'product-detail-page';

  const inStock = product.stock > 0;
  const stockLabel = product.stock === 0
    ? `<span class="stock-badge out">Out of Stock</span>`
    : product.stock <= 5
      ? `<span class="stock-badge low">Only ${product.stock} left</span>`
      : `<span class="stock-badge in">In Stock (${product.stock} available)</span>`;

  const specsRows = Object.entries(product.specifications)
    .map(([key, val]) => `<tr><th>${key}</th><td>${val}</td></tr>`)
    .join('');

  const thumbs = product.gallery.map((src, i) => `
    <button class="product-thumb ${i === 0 ? 'active' : ''}" data-src="${src}" data-index="${i}" aria-label="View image ${i+1}">
      <img src="${src}" alt="${product.name} view ${i+1}" loading="lazy"
        onerror="this.src='https://placehold.co/100x80/e2e8f0/475569?text=View+${i+1}'" />
    </button>
  `).join('');

  main.innerHTML = `
    <div class="product-detail__container">

      <!-- Breadcrumb -->
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="javascript:history.back()" class="page-back-btn" style="margin-bottom:0; margin-right: 1rem;" aria-label="Go back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </a>
        <a href="/shop.html">Shop</a>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        <a href="/shop.html?category=${encodeURIComponent(product.category)}">${product.category}</a>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        <span>${product.name}</span>
      </nav>

      <div class="product-detail__layout">

        <!-- Gallery -->
        <div class="product-gallery">
          <div class="product-gallery__main">
            <img id="gallery-main-img" src="${product.gallery[0]}" alt="${product.name}"
              onerror="this.src='https://placehold.co/600x480/e2e8f0/475569?text=${encodeURIComponent(product.name)}'" />
            ${product.gallery.length > 1 ? `
              <button class="gallery-nav gallery-nav--prev" id="gallery-prev" aria-label="Previous image">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button class="gallery-nav gallery-nav--next" id="gallery-next" aria-label="Next image">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            ` : ''}
          </div>
          ${product.gallery.length > 1 ? `<div class="product-gallery__thumbs">${thumbs}</div>` : ''}
        </div>

        <!-- Info -->
        <div class="product-info">
          <p class="product-info__category">${product.category}</p>
          <h1 class="product-info__name">${product.name}</h1>
          <p class="product-info__brand">by <strong>${product.brand}</strong></p>
          <div class="product-info__price">${formatPrice(product.price)}</div>
          <div class="product-info__stock">${stockLabel}</div>
          <p class="product-info__desc">${product.description}</p>

          <!-- Quantity -->
          ${inStock ? `
          <div class="product-info__qty-wrap">
            <label class="product-info__qty-label">Quantity</label>
            <div class="product-qty">
              <button class="qty-btn" id="qty-dec" aria-label="Decrease quantity">−</button>
              <input type="number" id="qty-input" value="1" min="1" max="${product.stock}" aria-label="Quantity" />
              <button class="qty-btn" id="qty-inc" aria-label="Increase quantity">+</button>
            </div>
            <span class="product-info__qty-max">Max ${product.stock}</span>
          </div>
          ` : ''}

          <div class="product-info__actions">
            <button class="btn-primary product-info__add-btn" id="product-add-btn" data-id="${product.id}"
              ${!inStock ? 'disabled' : ''}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              ${inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <a href="/shop/checkout.html" class="btn-cta-yellow product-info__buy-btn" ${!inStock ? 'style="pointer-events:none;opacity:0.5"' : ''}>
              Buy Now
            </a>
          </div>

          <!-- Key info pills -->
          <div class="product-info__pills">
            ${product.specifications['Warranty'] ? `<span class="info-pill"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>${product.specifications['Warranty']} Warranty</span>` : ''}
            ${product.specifications['Weight'] ? `<span class="info-pill"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>${product.specifications['Weight']}</span>` : ''}
            <span class="info-pill"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>Ships from Akure</span>
          </div>
        </div>
      </div>

      <!-- Specs Table -->
      <section class="product-specs" id="product-specs">
        <h2 class="product-specs__title">Technical Specifications</h2>
        <div class="product-specs__table-wrap">
          <table class="product-specs__table">
            <tbody>${specsRows}</tbody>
          </table>
        </div>
      </section>

      <!-- Related products -->
      <section class="related-products">
        <h2 class="related-products__title">Related Products</h2>
        <div class="related-products__grid" id="related-grid"></div>
      </section>
    </div>
  `;

  return main;
}

// ─── GALLERY LOGIC ────────────────────────────────────────────────────────────
function initGallery(product) {
  let current = 0;
  const mainImg = document.getElementById('gallery-main-img');
  const thumbs = document.querySelectorAll('.product-thumb');

  function setImage(index) {
    current = (index + product.gallery.length) % product.gallery.length;
    mainImg.style.opacity = '0';
    setTimeout(() => {
      mainImg.src = product.gallery[current];
      mainImg.style.opacity = '1';
    }, 180);
    thumbs.forEach((t, i) => t.classList.toggle('active', i === current));
  }

  thumbs.forEach(t => t.addEventListener('click', () => setImage(parseInt(t.dataset.index))));
  document.getElementById('gallery-prev')?.addEventListener('click', () => setImage(current - 1));
  document.getElementById('gallery-next')?.addEventListener('click', () => setImage(current + 1));

  mainImg.style.transition = 'opacity 0.18s ease';
}

// ─── QTY LOGIC ────────────────────────────────────────────────────────────────
function initQtySelector(maxStock) {
  const input = document.getElementById('qty-input');
  const dec = document.getElementById('qty-dec');
  const inc = document.getElementById('qty-inc');
  if (!input) return;

  dec?.addEventListener('click', () => {
    const v = parseInt(input.value);
    if (v > 1) input.value = v - 1;
  });
  inc?.addEventListener('click', () => {
    const v = parseInt(input.value);
    if (v < maxStock) input.value = v + 1;
  });
  input.addEventListener('change', () => {
    let v = parseInt(input.value);
    if (isNaN(v) || v < 1) v = 1;
    if (v > maxStock) v = maxStock;
    input.value = v;
  });
}

// ─── RELATED PRODUCTS ────────────────────────────────────────────────────────
function renderRelated(product) {
  const grid = document.getElementById('related-grid');
  if (!grid) return;

  const related = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  if (related.length === 0) {
    const others = products.filter(p => p.id !== product.id).slice(0, 3);
    related.push(...others);
  }

  grid.innerHTML = related.map(p => `
    <a href="/shop/product.html?slug=${p.slug}" class="related-card">
      <div class="related-card__img-wrap">
        <img src="${p.image}" alt="${p.name}" loading="lazy"
          onerror="this.src='https://placehold.co/300x200/e2e8f0/475569?text=Product'" />
      </div>
      <div class="related-card__info">
        <p class="related-card__cat">${p.category}</p>
        <h4 class="related-card__name">${p.name}</h4>
        <p class="related-card__price">${formatPrice(p.price)}</p>
      </div>
    </a>
  `).join('');
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
async function init() {
  const app = document.getElementById('app');
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');

  app.appendChild(createNavbar('shop'));
  app.appendChild(createMobileMenu());

  // Fetch dynamic products from Supabase
  await fetchProducts();

  const product = products.find(p => p.slug === slug);

  if (!product) {
    const notFound = document.createElement('main');
    notFound.className = 'product-detail-page';
    notFound.innerHTML = `
      <div class="product-detail__container" style="text-align:center;padding:6rem 1rem">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.25" style="margin:0 auto 1.5rem"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <h1 style="font-family:var(--font-heading);font-size:2rem;color:var(--color-text-heading);margin-bottom:1rem">Product Not Found</h1>
        <p style="margin-bottom:2rem">The product you're looking for doesn't exist or may have been removed.</p>
        <a href="/shop.html" class="btn-primary" style="display:inline-block">Back to Shop</a>
      </div>
    `;
    app.appendChild(notFound);
    app.appendChild(createFooter());
    initNavbar(null);
    return;
  }

  // Update page title & meta
  document.title = `${product.name} | Justice Georgenes Solar`;
  document.querySelector('meta[name="description"]').content = product.shortDescription;

  const productPage = buildProductPage(product);
  app.appendChild(productPage);
  app.appendChild(createFooter());

  // Cart drawer
  createCartDrawer();
  renderCartDrawer();
  updateCartBadge(getCartCount());

  // Gallery
  initGallery(product);

  // Qty selector
  initQtySelector(product.stock);

  // Related
  renderRelated(product);

  // Add to cart
  document.getElementById('product-add-btn')?.addEventListener('click', btn => {
    const qty = parseInt(document.getElementById('qty-input')?.value || '1');
    addToCart(product, qty);
    updateCartBadge(getCartCount());
    renderCartDrawer();
    openCartDrawer();

    const el = document.getElementById('product-add-btn');
    el.textContent = 'Added ✓';
    el.classList.add('btn--added');
    el.disabled = true;
    setTimeout(() => {
      el.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> Add to Cart`;
      el.classList.remove('btn--added');
      el.disabled = false;
    }, 2000);
  });

  // Buy Now — add to cart then go to checkout
  document.querySelector('.product-info__buy-btn')?.addEventListener('click', e => {
    if (product.stock === 0) { e.preventDefault(); return; }
    const qty = parseInt(document.getElementById('qty-input')?.value || '1');
    addToCart(product, qty);
  });

  // Cart events
  window.addEventListener('cartUpdated', () => {
    updateCartBadge(getCartCount());
    renderCartDrawer();
  });

  initNavbar(openCartDrawer);
}

// Run on DOM ready — handle case where DOM is already parsed (ES module defer)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
