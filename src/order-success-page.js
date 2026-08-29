// =============================================
// JUSTICE GEORGENES SOLAR ENERGY
// Order Success Page — /shop/order-success.html
// =============================================
import './style.css';
import { createNavbar, createMobileMenu, createFooter, initNavbar } from './layout.js';

function createSuccessSection() {
  const ref = sessionStorage.getItem('jg_order_ref') || 'JGS-' + Date.now().toString(36).toUpperCase();
  const name = sessionStorage.getItem('jg_order_name') || 'Valued Customer';
  sessionStorage.removeItem('jg_order_ref');
  sessionStorage.removeItem('jg_order_name');
  sessionStorage.removeItem('jg_delivery');

  const main = document.createElement('main');
  main.className = 'order-success-page';
  main.innerHTML = `
    <div class="order-success__container">
      <a href="/shop" class="page-back-btn" style="margin-bottom: 1.5rem;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        <span>Back to Shop</span>
      </a>
      <div class="order-success__card">

        <!-- Animated checkmark -->
        <div class="success-icon">
          <svg class="success-icon__circle" viewBox="0 0 52 52">
            <circle class="success-icon__circle-bg" cx="26" cy="26" r="25" fill="none"/>
            <path class="success-icon__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
        </div>

        <h1 class="order-success__title">Order Sent!</h1>
        <p class="order-success__subtitle">Thank you, <strong>${name}</strong>! Your order has been sent to our team via WhatsApp.</p>

        <div class="order-success__ref">
          <p>Your Order Reference</p>
          <strong id="order-ref">${ref}</strong>
          <button class="copy-ref-btn" id="copy-ref-btn" aria-label="Copy order reference">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            Copy
          </button>
        </div>

        <div class="order-success__steps">
          <div class="order-step">
            <div class="order-step__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <div>
              <h4>We'll confirm your order</h4>
              <p>Our team will respond on WhatsApp within 30 minutes during business hours.</p>
            </div>
          </div>
          <div class="order-step">
            <div class="order-step__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <div>
              <h4>Payment arrangement</h4>
              <p>Bank transfer details will be provided after order confirmation.</p>
            </div>
          </div>
          <div class="order-step">
            <div class="order-step__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            </div>
            <div>
              <h4>Delivery or Pickup</h4>
              <p>Your equipment will be dispatched or ready for pickup after payment is confirmed.</p>
            </div>
          </div>
        </div>

        <div class="order-success__actions">
          <a href="/shop" class="btn-primary" id="continue-shopping-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
            Continue Shopping
          </a>
          <a href="/#contact" class="btn-outline-sm">Contact Us</a>
        </div>

        <p class="order-success__contact">
          Questions? Call us at <a href="tel:07037971175"><strong>07037971175</strong></a> or
          <a href="mailto:Justicegeorgenes2@gmail.com">email us</a>.
        </p>
      </div>
    </div>
  `;
  return main;
}

function initConfetti() {
  // Simple CSS-based confetti burst (no library needed)
  const colors = ['#FDB813', '#22C55E', '#071B3B', '#ffffff', '#e5a40a'];
  const container = document.createElement('div');
  container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;overflow:hidden';
  document.body.appendChild(container);

  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('div');
    const size = Math.random() * 10 + 6;
    piece.style.cssText = `
      position:absolute;
      width:${size}px;height:${size}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
      left:${Math.random()*100}%;top:-20px;
      opacity:1;
      transform:rotate(${Math.random()*360}deg);
      animation:confetti-fall ${1.5+Math.random()*2}s ease-in ${Math.random()*1}s forwards;
    `;
    container.appendChild(piece);
  }

  // Inject animation keyframes once
  if (!document.getElementById('confetti-style')) {
    const style = document.createElement('style');
    style.id = 'confetti-style';
    style.textContent = `
      @keyframes confetti-fall {
        0%   { top: -20px; opacity:1; transform: rotate(0deg) scale(1); }
        80%  { opacity: 0.9; }
        100% { top: 110vh; opacity: 0; transform: rotate(720deg) scale(0.5); }
      }
    `;
    document.head.appendChild(style);
  }

  // Clean up after animation
  setTimeout(() => container.remove(), 4000);
}

function init() {
  const app = document.getElementById('app');
  app.appendChild(createNavbar('shop'));
  app.appendChild(createMobileMenu());
  app.appendChild(createSuccessSection());
  app.appendChild(createFooter());

  // Confetti celebration
  initConfetti();

  // Copy reference button
  document.getElementById('copy-ref-btn')?.addEventListener('click', () => {
    const ref = document.getElementById('order-ref').textContent;
    navigator.clipboard.writeText(ref).then(() => {
      const btn = document.getElementById('copy-ref-btn');
      btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Copied!`;
      btn.style.color = 'var(--color-accent)';
      setTimeout(() => {
        btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy`;
        btn.style.color = '';
      }, 2500);
    }).catch(() => {});
  });

  initNavbar(null);
}

// Run on DOM ready — handle case where DOM is already parsed (ES module defer)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
