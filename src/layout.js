// =============================================
// JUSTICE GEORGENES SOLAR ENERGY
// Shared Layout Components (Navbar + Footer + Modal)
// Used by all shop sub-pages
// =============================================
import { getCartCount } from './cart.js';
import { supabase } from './supabase.js';

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
export function createNavbar(activePage = '') {
  const nav = document.createElement('nav');
  nav.className = 'navbar';
  nav.id = 'navbar';
  nav.innerHTML = `
    <!-- Top Tier -->
    <div class="navbar-top desktop-only">
      <div class="navbar-top__left">
        <div class="navbar__logo" id="logo-home">
          <a href="/index.html"><img src="/icon.svg" alt="Justice Georgenes Solar Consults" class="navbar__logo-img" /></a>
        </div>
      </div>
      <div class="navbar-top__right">
        <div class="contact-block">
          <div class="contact-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>
          <div class="contact-text"><span>Akure</span><small>Cash-hold Complex, Ondo Rd</small></div>
        </div>
        <div class="contact-block">
          <div class="contact-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></div>
          <div class="contact-text"><span>Call us anytime</span><small>08147574404</small></div>
        </div>
        <div class="contact-block">
          <div class="contact-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></div>
          <div class="contact-text"><span>Send us a mail</span><small>Justicegeorgenes2@gmail.com</small></div>
        </div>
      </div>
    </div>

    <!-- Bottom Tier -->
    <div class="navbar-bottom">
      <div class="navbar-bottom__left">
        <!-- Hamburger -->
        <div class="navbar__hamburger" id="hamburger" role="button" tabindex="0" aria-label="Open menu">
          <span></span><span></span><span></span>
        </div>
        
        <!-- Mobile Logo -->
        <div class="navbar__logo mobile-only">
          <a href="/index.html"><img src="/icon.svg" alt="Justice Georgenes Solar Consults" class="navbar__logo-img" style="height:40px;" /></a>
        </div>

        <!-- Desktop Nav Links -->
        <ul class="navbar__links">
          <li><a href="/index.html#home">Home</a></li>
          <li class="company-menu">
            <a href="javascript:void(0)" style="display:flex;align-items:center;gap:4px;">Company <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></a>
            <ul class="company-dropdown">
              <li><a href="/index.html#about">About Us</a></li>
              <li><a href="/index.html#locations">Our Branches</a></li>
              <li><a href="/index.html#how-it-works">Why Choose Us</a></li>
              <li><a href="/index.html#testimonials">Testimonials</a></li>
            </ul>
          </li>
          <li class="services-menu">
            <a href="/services.html" style="display:flex;align-items:center;gap:4px;color:\${activePage==='services'?'var(--color-accent)':'var(--color-white)'}">Services <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></a>
            <ul class="services-dropdown">
              <li><a href="/services.html?service=product">Product</a></li>
              <li><a href="/services.html?service=residential">Residential solar solution</a></li>
              <li><a href="/services.html?service=industrial">Industrial solar solution</a></li>
              <li><a href="/services.html?service=installment">installment plan</a></li>
              <li><a href="/services.html?service=audits">Comprehensive Site Audits</a></li>
              <li><a href="/services.html?service=installation">Professional Installation</a></li>
              <li><a href="/services.html?service=maintenance">Maintenance &amp; Support</a></li>
              <li><a href="/services.html?service=training">Solar Training Program</a></li>
            </ul>
          </li>
          <li><a href="/projects.html" \${activePage==='projects'?'style="color:var(--color-accent)"':''}>Projects</a></li>
          <li><a href="/shop.html" style="color:\${activePage==='shop'?'var(--color-accent)':'var(--color-white)'}">Shop</a></li>
          <li><a href="/index.html#contact">Contact</a></li>
        </ul>
      </div>

      <div class="navbar-bottom__right">
        <!-- Cart Icon -->
        <button class="navbar__cart-btn" id="nav-cart-btn" aria-label="Open cart">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          <span class="navbar__cart-badge" id="cart-badge" style="display:none">0</span>
        </button>

        <!-- CTA -->
        <button class="btn-cta-full desktop-only" id="nav-get-started">Get Started</button>
      </div>
    </div>
  `;
  return nav;
}

export function createMobileMenu() {
  const menu = document.createElement('div');
  menu.className = 'navbar__mobile';
  menu.id = 'mobile-menu';
  menu.innerHTML = `
    <a href="/index.html#home">Home</a>
    
    <!-- Company Collapsible -->
    <div class="mobile-sections-menu">
      <button class="mobile-menu-toggle" data-menu="company">
        Company <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 6px; transition: transform 0.3s;"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </button>
      <div class="mobile-submenu" id="mobile-company-submenu">
        <a href="/index.html#about" class="mobile-submenu-link">About Us</a>
        <a href="/index.html#locations" class="mobile-submenu-link">Our Branches</a>
        <a href="/index.html#how-it-works" class="mobile-submenu-link">Why Choose Us</a>
        <a href="/index.html#testimonials" class="mobile-submenu-link">Testimonials</a>
      </div>
    </div>

    <!-- Services Collapsible -->
    <div class="mobile-sections-menu">
      <button class="mobile-menu-toggle" data-menu="services">
        Services <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 6px; transition: transform 0.3s;"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </button>
      <div class="mobile-submenu" id="mobile-services-submenu">
        <a href="/services.html?service=product" class="mobile-submenu-link">Product</a>
        <a href="/services.html?service=residential" class="mobile-submenu-link">Residential Solar Solution</a>
        <a href="/services.html?service=industrial" class="mobile-submenu-link">Industrial Solar Solution</a>
        <a href="/services.html?service=installment" class="mobile-submenu-link">installment plan</a>
        <a href="/services.html?service=audits" class="mobile-submenu-link">Comprehensive Site Audits</a>
        <a href="/services.html?service=installation" class="mobile-submenu-link">Professional Installation</a>
        <a href="/services.html?service=maintenance" class="mobile-submenu-link">Maintenance &amp; Support</a>
        <a href="/services.html?service=training" class="mobile-submenu-link">Solar Training Program</a>
      </div>
    </div>

    <a href="/projects.html">Projects</a>
    <a href="/shop.html">Shop</a>
    <a href="/index.html#contact">Contact</a>
    <button class="btn-cta" id="mob-cta" style="margin-top:0.5rem;width:fit-content">Get Started</button>
  `;
  return menu;
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
export function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer-section';
  footer.id = 'footer';
  footer.innerHTML = `
    <div class="footer-cta">
      <div class="footer-cta__bg"></div>
      <div class="footer-cta__overlay"></div>
      <div class="footer-cta__content">
        <div class="footer-cta__text">
          <h2>Start Saving With Solar Today</h2>
          <p>Join thousands of happy customers and take the first step towards a brighter, cleaner future.</p>
        </div>
        <div class="footer-cta__actions">
          <button class="btn-cta-yellow" id="footer-get-quote">Get Free Quote</button>
          <button class="btn-cta-outline" id="footer-speak-expert">Speak With Expert
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          </button>
        </div>
      </div>
    </div>

    <div class="footer-main">
      <div class="footer__container">
        <div class="footer__col brand-col">
          <div class="footer__logo">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="var(--color-primary)"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            <div class="footer__logo-text">
              <h3>Justice Georgenes</h3>
              <span>Powering a Brighter Tomorrow</span>
            </div>
          </div>
          <p class="footer__desc">We provide smart solar solutions for homes and businesses to save money and protect the planet.</p>
          <div class="footer__socials">
            <span><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></span>
            <span><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></span>
            <span><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></span>
            <span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></span>
          </div>
        </div>

        <div class="footer__col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/index.html#home">Home</a></li>
            <li><a href="/index.html#about">About Us</a></li>
            <li><a href="/services.html">Services</a></li>
            <li><a href="/projects.html">Projects</a></li>
            <li><a href="/shop.html">Shop</a></li>
            <li><a href="/index.html#contact">Contact Us</a></li>
          </ul>
        </div>

        <div class="footer__col">
          <h4>Solar Solutions</h4>
          <ul>
            <li>Residential Solar</li>
            <li>Commercial Solar</li>
            <li>Battery Storage</li>
            <li>Maintenance &amp; Repair</li>
            <li>Solar Consultation</li>
          </ul>
        </div>

        <div class="footer__col">
          <h4>Support</h4>
          <ul>
            <li>FAQ</li>
            <li>About us</li>
            <li>Warranty</li>
            <li>Terms &amp; Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div class="footer__col contact-col">
          <h4>Contact Us</h4>
          <ul>
            <li>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--color-accent)"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              <span>08147574404</span>
            </li>
            <li>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--color-accent)"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              <span>Justicegeorgenes2@gmail.com</span>
            </li>
            <li>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--color-accent);flex-shrink:0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span>SUITES 162 CASHHOLD ARAKALE ROAD,<br/>AKURE ONDO STATE</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="footer__bottom">
      <p>&copy; ${new Date().getFullYear()} Justice Georgenes Nig Limited. All rights reserved.</p>
    </div>
  `;
  return footer;
}

// ─── GET STARTED MODAL ───────────────────────────────────────────────────────
export function createGetStartedModal() {
  let modal = document.getElementById('get-started-modal');
  if (!modal) {
    document.body.insertAdjacentHTML('beforeend', `
      <div class="modal-overlay" id="get-started-modal">
        <div class="modal-content">
          <button class="modal-close" id="modal-close-btn">&times;</button>
          <h2 class="modal-title">Get Started With Solar Energy</h2>
          <p class="modal-subtitle">Fill in your details and we'll get back to you</p>
          <form id="get-started-form" class="modal-form">
            <div class="form-group">
              <label for="gs-name">Full Name</label>
              <input type="text" id="gs-name" name="name" placeholder="Your full name" required>
            </div>
            <div class="form-group">
              <label for="gs-email">Email Address</label>
              <input type="email" id="gs-email" name="email" placeholder="your.email@gmail.com" required>
            </div>
            <div class="form-group">
              <label for="gs-address">Address</label>
              <input type="text" id="gs-address" name="address" placeholder="Your address" required>
            </div>
            <div class="form-group">
              <label for="gs-message">What Do You Want?</label>
              <textarea id="gs-message" name="message" placeholder="Describe your solar energy needs..." rows="2" required></textarea>
            </div>
            <button type="submit" class="btn-primary modal-submit">Submit Request</button>
          </form>
        </div>
      </div>
    `);
    modal = document.getElementById('get-started-modal');

    document.getElementById('get-started-form').addEventListener('submit', async e => {
      e.preventDefault();
      const name = document.getElementById('gs-name').value;
      const email = document.getElementById('gs-email').value;
      const address = document.getElementById('gs-address').value;
      const message = document.getElementById('gs-message').value;

      const form = document.getElementById('get-started-form');
      const submitBtn = form.querySelector('.modal-submit');
      
      // Save lead to Supabase
      try {
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        await supabase
          .from('leads')
          .insert([{
            name: name,
            email: email,
            message: message,
            notes: `Address: ${address}`,
            source: 'Website Modal',
            status: 'new'
          }]);
          
        // Show success state
        form.innerHTML = `
          <div style="text-align: center; padding: 2rem 0;">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2" style="margin-bottom: 1rem;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            <h3 style="color: var(--color-text-heading); font-size: 1.25rem; margin-bottom: 0.5rem;">Request Sent!</h3>
            <p style="color: var(--color-text);">Thank you for reaching out. Our team will contact you shortly.</p>
          </div>
        `;
        
        setTimeout(() => {
          closeGetStartedModal();
        }, 3000);
        
      } catch (err) {
        console.error('Failed to save lead to database:', err);
        submitBtn.textContent = 'Submit Request';
        submitBtn.disabled = false;
        alert('Something went wrong. Please try again.');
      }
    });

    document.getElementById('modal-close-btn').addEventListener('click', closeGetStartedModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeGetStartedModal(); });
  }
  return modal;
}

export function openGetStartedModal() {
  const modal = createGetStartedModal();
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

export function closeGetStartedModal() {
  const modal = document.getElementById('get-started-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ─── CART DRAWER ─────────────────────────────────────────────────────────────
export function createCartDrawer() {
  if (document.getElementById('cart-drawer')) return;
  document.body.insertAdjacentHTML('beforeend', `
    <div class="cart-drawer-overlay" id="cart-drawer-overlay"></div>
    <aside class="cart-drawer" id="cart-drawer" aria-label="Shopping cart">
      <div class="cart-drawer__header">
        <h3>Your Cart</h3>
        <button class="cart-drawer__close" id="cart-drawer-close" aria-label="Close cart">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="cart-drawer__body" id="cart-drawer-body"></div>
      <div class="cart-drawer__footer" id="cart-drawer-footer"></div>
    </aside>
  `);

  document.getElementById('cart-drawer-close').addEventListener('click', closeCartDrawer);
  document.getElementById('cart-drawer-overlay').addEventListener('click', closeCartDrawer);
}

export function openCartDrawer() {
  document.getElementById('cart-drawer')?.classList.add('open');
  document.getElementById('cart-drawer-overlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

export function closeCartDrawer() {
  document.getElementById('cart-drawer')?.classList.remove('open');
  document.getElementById('cart-drawer-overlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

// ─── NAVBAR INIT ─────────────────────────────────────────────────────────────
export function initNavbar(openCartFn) {
  const navEl = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenuEl = document.getElementById('mobile-menu');

  // Scroll effect
  window.addEventListener('scroll', () => {
    navEl?.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // Hamburger
  hamburger?.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenuEl?.classList.toggle('open');
  });
  mobileMenuEl?.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('click', (e) => {
      if (!el.classList.contains('mobile-menu-toggle')) {
        mobileMenuEl.classList.remove('open');
      }
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (mobileMenuEl?.classList.contains('open')) {
      if (!mobileMenuEl.contains(e.target) && !hamburger?.contains(e.target)) {
        mobileMenuEl.classList.remove('open');
      }
    }
  });

  // Submenu toggle
  mobileMenuEl?.querySelectorAll('.mobile-menu-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const menu = btn.getAttribute('data-menu');
      const submenu = mobileMenuEl.querySelector(`#mobile-${menu}-submenu`);
      const arrow = btn.querySelector('svg');
      
      const isOpen = submenu?.classList.contains('open');
      
      mobileMenuEl.querySelectorAll('.mobile-submenu').forEach(sub => {
        sub.classList.remove('open');
        const otherArrow = sub.previousElementSibling.querySelector('svg');
        if (otherArrow) otherArrow.style.transform = 'rotate(0deg)';
      });
      
      if (!isOpen) {
        submenu?.classList.add('open');
        if (arrow) arrow.style.transform = 'rotate(180deg)';
      }
    });
  });

  // Get Started buttons
  ['nav-get-started', 'mob-cta', 'footer-get-quote', 'footer-speak-expert'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', openGetStartedModal);
  });

  // Cart button → open drawer
  document.getElementById('nav-cart-btn')?.addEventListener('click', () => {
    if (openCartFn) openCartFn();
  });
}

// ─── CART BADGE UPDATE ────────────────────────────────────────────────────────
export function updateCartBadge(count) {
  const badge = document.getElementById('cart-badge');
  if (!badge) return;
  badge.textContent = count;
  badge.style.display = count > 0 ? 'flex' : 'none';
}
