// =============================================
// JUSTICE GEORGENES SOLAR ENERGY
// Checkout Page — /shop/checkout.html
// =============================================
import './style.css';
import {
  getCartItems, getCartTotal, clearCart,
  formatPrice, getCartCount
} from './cart.js';
import {
  createNavbar, createMobileMenu, createFooter,
  initNavbar, updateCartBadge
} from './layout.js';
import { supabase } from './supabase.js';

// Delivery options (kept in sync with cart-page)
const DELIVERY_OPTIONS = [
  { id: 'pickup', label: 'Store Pickup (Akure)', fee: 0 },
  { id: 'local', label: 'Local Delivery (Ondo State)', fee: 5000 },
  { id: 'nationwide', label: 'Nationwide Delivery', fee: 15000 },
];

// Nigerian states for dropdown
const NG_STATES = [
  'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno',
  'Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT - Abuja','Gombe',
  'Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos',
  'Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto',
  'Taraba','Yobe','Zamfara'
];

// ─── ORDER SUMMARY ────────────────────────────────────────────────────────────
function renderOrderSummary(deliveryFee) {
  const items = getCartItems();
  const subtotal = getCartTotal();
  const total = subtotal + deliveryFee;
  const container = document.getElementById('checkout-order-summary');
  if (!container) return;

  container.innerHTML = `
    <h3 class="checkout-summary__title">Order Summary</h3>
    <div class="checkout-summary__items">
      ${items.map(item => `
        <div class="checkout-summary__item">
          <img src="${item.image}" alt="${item.name}"
            onerror="this.src='https://placehold.co/52x42/e2e8f0/475569?text=P'" />
          <div class="checkout-summary__item-info">
            <p>${item.name}</p>
            <span>Qty: ${item.quantity}</span>
          </div>
          <strong>${formatPrice(item.price * item.quantity)}</strong>
        </div>
      `).join('')}
    </div>
    <div class="checkout-summary__breakdown">
      <div class="checkout-summary__row">
        <span>Subtotal</span><span>${formatPrice(subtotal)}</span>
      </div>
      <div class="checkout-summary__row">
        <span>Delivery</span><span>${deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}</span>
      </div>
      <div class="checkout-summary__row checkout-summary__row--total">
        <span>Total</span><strong>${formatPrice(total)}</strong>
      </div>
    </div>
  `;
}

// ─── FORM VALIDATION ─────────────────────────────────────────────────────────
function validateField(input, errorEl, message, testFn) {
  const val = input.value.trim();
  if (!testFn(val)) {
    input.classList.add('input--error');
    errorEl.textContent = message;
    errorEl.style.display = 'block';
    return false;
  }
  input.classList.remove('input--error');
  errorEl.style.display = 'none';
  return true;
}

function validateForm() {
  let valid = true;

  const fields = [
    {
      id: 'co-name', errId: 'err-name',
      msg: 'Please enter your full name (at least 3 characters)',
      test: v => v.length >= 3
    },
    {
      id: 'co-email', errId: 'err-email',
      msg: 'Please enter a valid email address',
      test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
    },
    {
      id: 'co-phone', errId: 'err-phone',
      msg: 'Please enter a valid Nigerian phone number (e.g. 0812 345 6789)',
      test: v => /^(\+234|0)[789][01]\d{8}$/.test(v.replace(/\s/g, ''))
    },
    {
      id: 'co-street', errId: 'err-street',
      msg: 'Please enter your street address',
      test: v => v.length >= 5
    },
    {
      id: 'co-city', errId: 'err-city',
      msg: 'Please enter your city',
      test: v => v.length >= 2
    },
    {
      id: 'co-state', errId: 'err-state',
      msg: 'Please select your state',
      test: v => v !== ''
    },
  ];

  fields.forEach(f => {
    const input = document.getElementById(f.id);
    const errEl = document.getElementById(f.errId);
    if (!validateField(input, errEl, f.msg, f.test)) valid = false;
  });

  return valid;
}

// ─── PAGE BUILDER ─────────────────────────────────────────────────────────────
function createCheckoutSection() {
  const items = getCartItems();

  const main = document.createElement('main');
  main.className = 'checkout-page';
  main.innerHTML = `
    <div class="subpage-container">
      <div class="subpage-header">
        <div style="display: flex; justify-content: flex-start; margin-bottom: 1.5rem;">
          <a href="javascript:history.back()" class="page-back-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span>Back</span>
          </a>
        </div>
        <h1 class="subpage-title">Checkout</h1>
        <p class="subpage-subtitle">Complete your order below</p>
      </div>

      ${items.length === 0 ? `
        <div class="cart-empty-state">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.25"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <h2>Your cart is empty</h2>
          <p>Add some products before checking out.</p>
          <a href="/shop.html" class="btn-primary" style="display:inline-block;margin-top:1.5rem">Browse Products</a>
        </div>
      ` : `
        <div class="checkout-layout">

          <!-- Form -->
          <form class="checkout-form" id="checkout-form" novalidate>

            <!-- Customer Info -->
            <fieldset class="checkout-fieldset">
              <legend>Customer Information</legend>
              <div class="form-row">
                <div class="form-group">
                  <label for="co-name">Full Name *</label>
                  <input type="text" id="co-name" name="name" placeholder="e.g. Adebayo Okafor" autocomplete="name" required />
                  <span class="field-error" id="err-name"></span>
                </div>
              </div>
              <div class="form-row form-row--2col">
                <div class="form-group">
                  <label for="co-email">Email Address *</label>
                  <input type="email" id="co-email" name="email" placeholder="you@email.com" autocomplete="email" required />
                  <span class="field-error" id="err-email"></span>
                </div>
                <div class="form-group">
                  <label for="co-phone">Phone Number *</label>
                  <input type="tel" id="co-phone" name="phone" placeholder="08012345678" autocomplete="tel" required />
                  <span class="field-error" id="err-phone"></span>
                </div>
              </div>
            </fieldset>

            <!-- Delivery Address -->
            <fieldset class="checkout-fieldset">
              <legend>Delivery Address</legend>
              <div class="form-row">
                <div class="form-group">
                  <label for="co-street">Street Address *</label>
                  <input type="text" id="co-street" name="street" placeholder="e.g. 12 Arakale Road" autocomplete="street-address" required />
                  <span class="field-error" id="err-street"></span>
                </div>
              </div>
              <div class="form-row form-row--2col">
                <div class="form-group">
                  <label for="co-city">City *</label>
                  <input type="text" id="co-city" name="city" placeholder="e.g. Akure" autocomplete="address-level2" required />
                  <span class="field-error" id="err-city"></span>
                </div>
                <div class="form-group">
                  <label for="co-state">State *</label>
                  <select id="co-state" name="state" autocomplete="address-level1" required>
                    <option value="">Select a state…</option>
                    ${NG_STATES.map(s => `<option value="${s}"${s==='Ondo'?' selected':''}>${s}</option>`).join('')}
                  </select>
                  <span class="field-error" id="err-state"></span>
                </div>
              </div>
            </fieldset>

            <!-- Delivery Method -->
            <fieldset class="checkout-fieldset">
              <legend>Delivery Method</legend>
              <div class="delivery-options" id="delivery-options">
                ${DELIVERY_OPTIONS.map((opt, i) => `
                  <label class="delivery-option ${i===0?'selected':''}">
                    <input type="radio" name="delivery-method" value="${opt.id}" ${i===0?'checked':''} />
                    <div class="delivery-option__info">
                      <span>${opt.label}</span>
                      ${opt.id === 'pickup' ? '<small>Suites 162 Cashhold Arakale Road, Akure</small>' : ''}
                      ${opt.id === 'local' ? '<small>2–3 business days within Ondo State</small>' : ''}
                      ${opt.id === 'nationwide' ? '<small>5–7 business days across Nigeria</small>' : ''}
                    </div>
                    <strong>${opt.fee === 0 ? 'FREE' : formatPrice(opt.fee)}</strong>
                  </label>
                `).join('')}
              </div>
            </fieldset>

            <!-- Notes -->
            <fieldset class="checkout-fieldset">
              <legend>Additional Notes <span style="font-weight:400;font-size:0.85rem">(Optional)</span></legend>
              <div class="form-group">
                <textarea id="co-notes" name="notes" rows="3" placeholder="Any special delivery instructions or questions about your order…"></textarea>
              </div>
            </fieldset>

            <button type="submit" class="btn-primary checkout-submit-btn" id="checkout-submit">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              Place Order via WhatsApp
            </button>
            <p class="checkout-whatsapp-note">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              Your order details will be sent directly to our WhatsApp. Payment is arranged after confirmation.
            </p>
          </form>

          <!-- Order Summary -->
          <aside class="checkout-summary" id="checkout-order-summary"></aside>
        </div>
      `}
    </div>
  `;
  return main;
}

// ─── SUBMIT HANDLER ──────────────────────────────────────────────────────────
async function handleSubmit(e) {
  e.preventDefault();
  if (!validateForm()) {
    // Scroll to first error
    document.querySelector('.input--error')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  const submitBtn = document.getElementById('checkout-submit');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Processing...';
  }

  const items = getCartItems();
  const deliveryId = document.querySelector('input[name="delivery-method"]:checked')?.value || 'pickup';
  const delivery = DELIVERY_OPTIONS.find(o => o.id === deliveryId) || DELIVERY_OPTIONS[0];
  const subtotal = getCartTotal();
  const total = subtotal + delivery.fee;

  const name = document.getElementById('co-name').value.trim();
  const email = document.getElementById('co-email').value.trim();
  const phone = document.getElementById('co-phone').value.trim();
  const street = document.getElementById('co-street').value.trim();
  const city = document.getElementById('co-city').value.trim();
  const state = document.getElementById('co-state').value;
  const notes = document.getElementById('co-notes').value.trim();

  // Save order reference to session (default fallback)
  let ref = 'JGS-' + Date.now().toString(36).toUpperCase();

  // Save order to Supabase
  try {
    const { data: dbOrder, error } = await supabase
      .from('orders')
      .insert([{
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        items: items,
        total_amount: total,
        status: 'pending',
        notes: notes,
        shipping_address: { street, city, state, delivery_method: delivery.label }
      }])
      .select('id')
      .single();

    if (error) {
      console.error('Error saving order to Supabase:', error);
    } else if (dbOrder) {
      ref = 'JGS-' + dbOrder.id.substring(0, 8).toUpperCase();
    }
  } catch (err) {
    console.error('Failed to submit order to database:', err);
  }

  sessionStorage.setItem('jg_order_ref', ref);
  sessionStorage.setItem('jg_order_name', name);

  // Build WhatsApp message
  const orderLines = items.map(i => `  • ${i.name} × ${i.quantity} = ${formatPrice(i.price * i.quantity)}`).join('\n');
  const msg = [
    `*New Solar Order — Justice Georgenes Solar*`,
    ``,
    `*Order Reference: ${ref}*`,
    ``,
    `*Customer Details*`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    ``,
    `*Delivery Address*`,
    `${street}, ${city}, ${state}`,
    `Method: ${delivery.label}`,
    ``,
    `*Order Items*`,
    orderLines,
    ``,
    `Subtotal: ${formatPrice(subtotal)}`,
    `Delivery: ${delivery.fee === 0 ? 'FREE' : formatPrice(delivery.fee)}`,
    `*TOTAL: ${formatPrice(total)}*`,
    notes ? `\nNotes: ${notes}` : '',
  ].filter(Boolean).join('\n');

  // WhatsApp redirect
  const waNumber = '2348147574404'; // 08147574404 in international format
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;

  // Clear cart then redirect to success page
  clearCart();
  window.open(waUrl, '_blank');
  window.location.href = '/shop/order-success.html';
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
function init() {
  const app = document.getElementById('app');
  app.appendChild(createNavbar('shop'));
  app.appendChild(createMobileMenu());

  const section = createCheckoutSection();
  app.appendChild(section);
  app.appendChild(createFooter());

  updateCartBadge(getCartCount());

  // Load pre-selected delivery from cart page
  try {
    const saved = JSON.parse(sessionStorage.getItem('jg_delivery') || 'null');
    if (saved) {
      const radio = document.querySelector(`input[name="delivery-method"][value="${saved.id}"]`);
      if (radio) {
        radio.checked = true;
        radio.closest('.delivery-option')?.classList.add('selected');
      }
    }
  } catch {}

  // Render order summary
  const getSelectedFee = () => {
    const id = document.querySelector('input[name="delivery-method"]:checked')?.value || 'pickup';
    return DELIVERY_OPTIONS.find(o => o.id === id)?.fee || 0;
  };
  renderOrderSummary(getSelectedFee());

  // Delivery option change
  document.querySelectorAll('input[name="delivery-method"]').forEach(radio => {
    radio.addEventListener('change', () => {
      document.querySelectorAll('.delivery-option').forEach(el => el.classList.remove('selected'));
      radio.closest('.delivery-option')?.classList.add('selected');
      renderOrderSummary(getSelectedFee());
    });
  });

  // Inline validation on blur
  ['co-name','co-email','co-phone','co-street','co-city','co-state'].forEach(id => {
    const el = document.getElementById(id);
    el?.addEventListener('blur', () => {
      el.classList.remove('input--error');
      document.getElementById('err-' + id.replace('co-', ''))?.style && (document.getElementById('err-' + id.replace('co-', '')).style.display = 'none');
    });
  });

  // Form submit
  document.getElementById('checkout-form')?.addEventListener('submit', handleSubmit);

  initNavbar(null);
}

// Run on DOM ready — handle case where DOM is already parsed (ES module defer)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
