// =============================================
// JUSTICE GEORGENES SOLAR ENERGY
// Shop Page — Main product listing with filters, search & sorting
// =============================================
import './style.css';
import { products, fetchProducts } from './products.js';
import {
  addToCart, getCartCount, getCartItems, removeFromCart,
  updateQuantity, getCartTotal, formatPrice
} from './cart.js';
import {
  createNavbar, createMobileMenu, createFooter,
  createCartDrawer, openCartDrawer, closeCartDrawer,
  initNavbar, updateCartBadge
} from './layout.js';

// ─── CART DRAWER RENDERER ────────────────────────────────────────────────────
function renderCartDrawer() {
  const body = document.getElementById('cart-drawer-body');
  const footer = document.getElementById('cart-drawer-footer');
  if (!body || !footer) return;

  const items = getCartItems();

  if (items.length === 0) {
    body.innerHTML = `
      <div class="cart-drawer__empty">
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.3"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        <p>Your cart is empty</p>
        <a href="/shop.html" class="btn-primary" style="margin-top:1rem;display:inline-block;text-align:center">Browse Products</a>
      </div>`;
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
          <button class="qty-btn" data-action="dec" data-id="${item.id}" aria-label="Decrease quantity">−</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" data-action="inc" data-id="${item.id}" data-stock="${item.stock}" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <button class="cart-item__remove" data-id="${item.id}" aria-label="Remove item">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
  `).join('');

  const subtotal = getCartTotal();
  footer.innerHTML = `
    <div class="cart-drawer__subtotal">
      <span>Subtotal</span>
      <strong>${formatPrice(subtotal)}</strong>
    </div>
    <p class="cart-drawer__note">Shipping and delivery fees calculated at checkout</p>
    <a href="/shop/cart.html" class="btn-outline-dark" style="display:block;text-align:center;margin-bottom:0.75rem">View Cart</a>
    <a href="/shop/checkout.html" class="btn-primary" style="display:block;text-align:center">Proceed to Checkout</a>
  `;

  // Quantity & remove handlers
  body.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const item = getCartItems().find(i => String(i.id) === id);
      if (!item) return;
      if (btn.dataset.action === 'inc') {
        updateQuantity(id, item.quantity + 1);
      } else {
        if (item.quantity <= 1) {
          removeFromCart(id);
        } else {
          updateQuantity(id, item.quantity - 1);
        }
      }
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

// ─── SHOP SECTION ────────────────────────────────────────────────────────────
function createShopSection() {
  const section = document.createElement('section');
  section.className = 'shop-page';
  section.id = 'shop';
  section.innerHTML = `
    <div class="shop__container">
      <div class="shop__header">
        <p class="section-label" style="text-align:center;margin-bottom:0.5rem">STORE</p>
        <h1 class="shop__title">Our Products</h1>
        <p class="shop__subtitle">Premium solar equipment for your energy needs</p>
      </div>

      <!-- Search + Sort Bar -->
      <div class="shop__controls">
        <div class="shop__search-wrap">
          <svg class="shop__search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="search" id="shop-search" class="shop__search" placeholder="Search products, brands, categories…" aria-label="Search products" />
          <button class="shop__search-clear" id="search-clear" aria-label="Clear search" style="display:none">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <select id="shop-sort" class="shop__sort" aria-label="Sort products">
          <option value="default">Sort: Featured</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="newest">Newest First</option>
          <option value="name-asc">Name: A → Z</option>
        </select>
      </div>

      <!-- Filter Bar — populated dynamically after products are fetched -->
      <div class="shop__filter-bar" id="shop-filters" role="group" aria-label="Filter by category">
        <button class="filter-btn active" data-filter="all">All Products</button>
      </div>

      <!-- Results Info -->
      <p class="shop__results-info" id="shop-results-info"></p>

      <!-- Product Grid -->
      <div class="shop__grid" id="shop-grid"></div>
    </div>
  `;
  return section;
}

// ─── PRODUCT CARD BUILDER ────────────────────────────────────────────────────
function buildCard(product) {
  const card = document.createElement('article');
  card.className = 'shop-card';
  card.setAttribute('data-category', product.category);
  card.setAttribute('data-id', product.id);

  const inStock = product.stock > 0;
  const stockLabel = product.stock === 0
    ? `<span class="stock-badge out">Out of Stock</span>`
    : product.stock <= 5
      ? `<span class="stock-badge low">Only ${product.stock} left</span>`
      : `<span class="stock-badge in">In Stock</span>`;

  card.innerHTML = `
    <div class="shop-card__image-wrap">
      <img src="${product.image}" alt="${product.name}" class="shop-card__img" loading="lazy"
        onerror="this.src='https://placehold.co/400x300/e2e8f0/475569?text=${encodeURIComponent(product.name)}'" />
      ${stockLabel}
      <span class="shop-card__category-badge">${product.category}</span>
    </div>
    <div class="shop-card__content">
      <p class="shop-card__brand">${product.brand}</p>
      <h3 class="shop-card__title">${product.name}</h3>
      <p class="shop-card__desc">${product.shortDescription}</p>
      <div class="shop-card__footer">
        <span class="shop-card__price">${formatPrice(product.price)}</span>
        <div class="shop-card__actions">
          <a href="/shop/product.html?slug=${product.slug}" class="btn-outline-sm" aria-label="View details for ${product.name}">Details</a>
          <button
            class="btn-primary shop-card__add-btn"
            data-id="${product.id}"
            ${!inStock ? 'disabled' : ''}
            aria-label="Add ${product.name} to cart"
          >${inStock ? 'Add to Cart' : 'Out of Stock'}</button>
        </div>
      </div>
    </div>
  `;
  return card;
}

// ─── RENDER LOGIC ─────────────────────────────────────────────────────────────
let activeFilter = 'all';
let activeSort = 'default';
let searchQuery = '';

function getFilteredSortedProducts() {
  let list = [...products];

  // Filter
  if (activeFilter !== 'all') {
    list = list.filter(p => p.category === activeFilter);
  }

  // Search
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q)
    );
  }

  // Sort
  switch (activeSort) {
    case 'price-asc':  list.sort((a, b) => a.price - b.price); break;
    case 'price-desc': list.sort((a, b) => b.price - a.price); break;
    case 'newest':     list.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)); break;
    case 'name-asc':   list.sort((a, b) => a.name.localeCompare(b.name)); break;
    default: break; // featured order = as-defined
  }

  return list;
}

function renderProducts() {
  const grid = document.getElementById('shop-grid');
  const info = document.getElementById('shop-results-info');
  if (!grid) return;

  const list = getFilteredSortedProducts();
  grid.innerHTML = '';

  if (list.length === 0) {
    grid.innerHTML = `
      <div class="shop__empty">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.3"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <p>No products match your search.</p>
        <button class="btn-outline-sm" id="clear-all-filters" style="margin-top:1rem">Clear Filters</button>
      </div>`;
    document.getElementById('clear-all-filters')?.addEventListener('click', resetFilters);
    if (info) info.textContent = '0 products found';
    return;
  }

  if (info) info.textContent = `${list.length} product${list.length !== 1 ? 's' : ''} found`;

  list.forEach(product => {
    const card = buildCard(product);
    // Animate in
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    grid.appendChild(card);
    requestAnimationFrame(() => {
      card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    });
  });
}

function resetFilters() {
  activeFilter = 'all';
  searchQuery = '';
  activeSort = 'default';
  document.getElementById('shop-search').value = '';
  document.getElementById('shop-sort').value = 'default';
  document.getElementById('search-clear').style.display = 'none';
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
  renderProducts();
}

// ─── ADD TO CART HANDLER ─────────────────────────────────────────────────────
function handleAddToCart(btn) {
  const id = btn.dataset.id;
  const product = products.find(p => String(p.id) === id);
  if (!product) return;

  addToCart(product, 1);
  updateCartBadge(getCartCount());
  renderCartDrawer();
  openCartDrawer();

  // Visual feedback on button
  const orig = btn.textContent;
  btn.textContent = 'Added ✓';
  btn.classList.add('btn--added');
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = orig;
    btn.classList.remove('btn--added');
    btn.disabled = false;
  }, 1800);
}

// ─── DYNAMIC FILTER BUILDER ──────────────────────────────────────────────────
/**
 * Reads the current products array, extracts unique categories,
 * and rebuilds the filter bar. Called after fetchProducts() so that
 * any new category added via the admin dashboard appears automatically.
 */
function buildFilterButtons() {
  const filterBar = document.getElementById('shop-filters');
  if (!filterBar) return;

  // Extract unique categories in the order they first appear
  const seen = new Set();
  const categories = [];
  products.forEach(p => {
    if (p.category && !seen.has(p.category)) {
      seen.add(p.category);
      categories.push(p.category);
    }
  });

  // Rebuild — keep the "All Products" button then append one per category
  filterBar.innerHTML = `<button class="filter-btn active" data-filter="all">All Products</button>`;
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.dataset.filter = cat;
    btn.textContent = cat;
    filterBar.appendChild(btn);
  });

  // Wire up click handlers for all buttons
  filterBar.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      renderProducts();
    });
  });
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
async function init() {
  const app = document.getElementById('app');

  app.appendChild(createNavbar('shop'));
  app.appendChild(createMobileMenu());
  app.appendChild(createShopSection());
  app.appendChild(createFooter());

  // Fetch dynamic products from Supabase
  await fetchProducts();

  // Build category filter buttons from whatever categories exist in the data
  buildFilterButtons();

  // Cart drawer
  createCartDrawer();
  renderCartDrawer();
  updateCartBadge(getCartCount());

  // Render initial grid
  renderProducts();

  // Search
  const searchInput = document.getElementById('shop-search');
  const clearBtn = document.getElementById('search-clear');
  searchInput.addEventListener('input', () => {
    searchQuery = searchInput.value;
    clearBtn.style.display = searchQuery ? 'flex' : 'none';
    renderProducts();
  });
  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    clearBtn.style.display = 'none';
    renderProducts();
    searchInput.focus();
  });

  // Sort
  document.getElementById('shop-sort').addEventListener('change', e => {
    activeSort = e.target.value;
    renderProducts();
  });

  // Add to cart (event delegation on grid)
  document.getElementById('shop-grid').addEventListener('click', e => {
    const btn = e.target.closest('.shop-card__add-btn');
    if (btn && !btn.disabled) handleAddToCart(btn);
  });

  // Cart updated event (from other tabs)
  window.addEventListener('cartUpdated', () => {
    updateCartBadge(getCartCount());
    renderCartDrawer();
  });

  // Navbar init
  initNavbar(openCartDrawer);
}

// Initialize immediately if DOM is ready, or wait for DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
