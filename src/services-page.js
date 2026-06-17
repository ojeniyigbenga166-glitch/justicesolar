import './style.css';
import { supabase } from './supabase.js';

// ==============================
// NAVBAR Component (Services Page)
// ==============================
function createNavbar() {
  const nav = document.createElement('nav');
  nav.className = 'navbar';
  nav.id = 'navbar';
  nav.innerHTML = `
    <!-- Logo -->
    <div class="navbar__logo" id="logo-home">
      <a href="/index.html" style="display: flex; align-items: center;">
        <img src="/icon.svg" alt="Justice Georgenes Solar Consults" class="navbar__logo-img" />
      </a>
    </div>

    <!-- Desktop Nav Links -->
    <ul class="navbar__links">
      <li><a href="/index.html#home">Home</a></li>
      <li><a href="/index.html#about">About</a></li>
      <li><a href="/services.html" id="nav-services" style="color: var(--color-primary);">Services</a></li>
      <li><a href="/projects.html">Projects</a></li>
      <li><a href="/shop.html" id="nav-shop">Shop</a></li>
      <li><a href="/index.html#contact">Contact</a></li>
    </ul>

    <!-- CTA -->
    <button class="btn-cta desktop-only" id="nav-get-started">Get Started</button>

    <!-- Cart Icon -->
    <a href="/shop.html" class="navbar__cart" id="nav-cart" aria-label="Shopping cart">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
      <span class="navbar__cart-badge" id="cart-badge">0</span>
    </a>

    <!-- Hamburger -->
    <div class="navbar__hamburger" id="hamburger" aria-label="Open menu">
      <span></span><span></span><span></span>
    </div>
  `;
  return nav;
}

// Mobile menu
function createMobileMenu() {
  const menu = document.createElement('div');
  menu.className = 'navbar__mobile';
  menu.id = 'mobile-menu';
  menu.innerHTML = `
    <a href="/index.html#home">Home</a>
    <a href="/index.html#about">About</a>
    <a href="/services.html" style="color: var(--color-primary);">Services</a>
    <a href="/projects.html">Projects</a>
    <a href="/shop.html" id="mob-shop">Shop</a>
    <a href="/index.html#contact">Contact</a>
    <button class="btn-cta" id="mob-cta" style="margin-top:0.5rem;width:fit-content">Get Started</button>
  `;
  return menu;
}

// ==============================
// Services Data
// ==============================
const servicesData = [
   {
    id: 1,
    title: 'Comprehensive Site Audits',
    description: 'Professional roof inspection and energy consumption analysis to design optimal solar solutions for your property.',
    features: ['Professional roof inspection', 'Energy consumption analysis', 'Shading assessment', 'Detailed audit report'],
    image: '/project 9.jpg'
  },
  {
    id: 2,
    title: 'Solar Product Sales',
    description: 'Premium solar panels, inverters, batteries, and mounting systems from leading manufacturers with warranty coverage.',
    features: ['Top-tier solar panels', 'Advanced inverter technology', 'Battery storage solutions', 'Professional installation included'],
    image: '/product 1.png'
  },
  {
    id: 3,
    title: 'Professional Installation',
    description: 'Certified technicians handle complete solar system installation with precision, safety, and peak efficiency.',
    features: ['Certified installer team', 'Full system integration', 'Safety compliance', 'System testing & optimization'],
    image: '/project 1.jpg'
  },
  {
    id: 4,
    title: 'Maintenance & Support',
    description: 'Comprehensive maintenance plans and 24/7 technical assistance to keep your system operating at peak performance.',
    features: ['Regular maintenance visits', 'System monitoring', 'Emergency repairs', 'Performance optimization'],
    image: '/project 7.jpg'
  },
  {
    id: 5,
    title: 'Solar Training Program',
    description: 'Hands-on technical training for aspiring professionals in the renewable energy industry with industry certification.',
    features: ['Hands-on practical sessions', 'Certification upon completion', 'Expert industry instructors', 'Career guidance & support'],
    image: '/solar training.jpg'
  }
];

// ==============================
// Services Section Component
// ==============================
function createServicesSection() {
  const section = document.createElement('section');
  section.className = 'services-page';
  section.id = 'services-page';

  let servicesHTML = '';
  servicesData.forEach((service, index) => {
    const isEven = index % 2 === 0;
    const featuresHTML = service.features.map(feature => `<li>${feature}</li>`).join('');

    servicesHTML += `
      <div class="service-section ${isEven ? 'text-first' : 'image-first'}">
        <div class="service-content">
          <div class="service-text">
            <h2 class="service-title">${service.title}</h2>
            <p class="service-description">${service.description}</p>
            <ul class="service-features">
              ${featuresHTML}
            </ul>
          </div>
          <div class="service-image">
            <img src="${service.image}" alt="${service.title}" onerror="this.src='https://via.placeholder.com/500x400?text=${encodeURIComponent(service.title)}'"/>
          </div>
        </div>
      </div>
    `;
  });

  section.innerHTML = `
    <div class="services-page__container">
      <div class="services-page__header">
        <p class="section-label">OUR EXPERTISE</p>
        <h1 class="services-page__title">Our Services</h1>
        <p class="services-page__desc">Comprehensive solar solutions from assessment to ongoing support</p>
      </div>
      ${servicesHTML}
    </div>
  `;

  return section;
}

// ==============================
// FOOTER Component
// ==============================
function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer-section';
  footer.id = 'footer';
  footer.innerHTML = `
    <!-- CTA Banner -->
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
          <button class="btn-cta-outline" id="footer-speak-expert">Speak With Expert <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></button>
        </div>
      </div>
    </div>

    <!-- Main Footer -->
    <div class="footer-main">
      <div class="footer__container">
        <!-- Brand Column -->
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

        <!-- Links Columns -->
        <div class="footer__col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/index.html#home">Home</a></li>
            <li><a href="/index.html#about">About Us</a></li>
            <li><a href="/services.html">Services</a></li>
            <li><a href="/projects.html">Projects</a></li>
            <li><a href="/index.html#contact">Contact Us</a></li>
          </ul>
        </div>

        <div class="footer__col">
          <h4>Solar Solutions</h4>
          <ul>
            <li>Residential Solar</li>
            <li>Commercial Solar</li>
            <li>Battery Storage</li>
            <li>Maintenance & Repair</li>
            <li>Solar Consultation</li>
          </ul>
        </div>

        <div class="footer__col">
          <h4>Support</h4>
          <ul>
            <li>FAQ</li>
            <li>About us</li>
            <li>Warranty</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div class="footer__col contact-col">
          <h4>Contact Us</h4>
          <ul>
            <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--color-accent)"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> <span>08147574404</span></li>
            <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--color-accent)"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> <span>Justicegeorgenes2@gmail.com</span></li>
            <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--color-accent); flex-shrink: 0;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> <span>SUITES 162 CASHHOLD ARAKALE ROAD,<br/>AKURE ONDO STATE</span></li>
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

// ==============================
// GET STARTED MODAL
// ==============================
function createGetStartedModal() {
  let modal = document.getElementById('get-started-modal');
  if (!modal) {
    const modalHTML = `
      <div class="modal-overlay" id="get-started-modal">
        <div class="modal-content">
          <button class="modal-close" id="modal-close-btn">&times;</button>
          <h2 class="modal-title">Get Started With Solar Energy</h2>
          <p class="modal-subtitle">Fill in your details and we'll get back to you</p>
          <form id="get-started-form" class="modal-form">
            <div class="form-group">
              <label for="name">Full Name</label>
              <input type="text" id="name" name="name" placeholder="Your full name" required>
            </div>
            
            <div class="form-group">
              <label for="email">Email Address</label>
              <input type="email" id="email" name="email" placeholder="your.email@gmail.com" required>
            </div>
            
            <div class="form-group">
              <label for="address">Address</label>
              <input type="text" id="address" name="address" placeholder="Your address" required>
            </div>
            
            <div class="form-group">
              <label for="message">What Do You Want?</label>
              <textarea id="message" name="message" placeholder="Describe your solar energy needs..." rows="2" required></textarea>
            </div>
            
            <button type="submit" class="btn-primary modal-submit">Submit Request</button>
          </form>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    modal = document.getElementById('get-started-modal');
    
    // Handle form submission
    document.getElementById('get-started-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const address = document.getElementById('address').value;
      const message = document.getElementById('message').value;

      // Save lead to Supabase
      try {
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
      } catch (err) {
        console.error('Failed to save lead to database:', err);
      }
      
      const subject = encodeURIComponent(`New Inquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nAddress: ${address}\n\nMessage:\n${message}`);
      window.location.href = `mailto:Justicegeorgenes2@gmail.com?subject=${subject}&body=${body}`;
      
      closeGetStartedModal();
      document.getElementById('get-started-form').reset();
    });
    
    // Close modal on click
    document.getElementById('modal-close-btn').addEventListener('click', closeGetStartedModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeGetStartedModal();
    });
  }
  return modal;
}

function openGetStartedModal() {
  const modal = createGetStartedModal();
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeGetStartedModal() {
  const modal = document.getElementById('get-started-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ==============================
// App Init
// ==============================
function init() {
  const app = document.getElementById('app');

  const navbar = createNavbar();
  const mobileMenu = createMobileMenu();
  const services = createServicesSection();
  const footer = createFooter();

  app.appendChild(navbar);
  app.appendChild(mobileMenu);
  app.appendChild(services);
  app.appendChild(footer);

  // --- Navbar scroll effect ---
  const navEl = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navEl.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // --- Hamburger toggle ---
  const hamburger = document.getElementById('hamburger');
  const mobileMenuEl = document.getElementById('mobile-menu');
  hamburger.addEventListener('click', () => {
    mobileMenuEl.classList.toggle('open');
  });

  // Close mobile menu on link click
  mobileMenuEl.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('click', () => mobileMenuEl.classList.remove('open'));
  });

  // --- Get Started Modal ---
  const getStartedButtons = [
    document.getElementById('nav-get-started'),
    document.getElementById('mob-cta'),
    document.getElementById('footer-get-quote'),
    document.getElementById('footer-speak-expert')
  ];
  
  getStartedButtons.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', openGetStartedModal);
    }
  });

  // --- Contact Links to Modal ---
  const contactLinks = document.querySelectorAll('a[href*="#contact"]');
  contactLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openGetStartedModal();
    });
  });

  // --- Update Cart Badge ---
  function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    if (badge) {
      const cartItems = JSON.parse(localStorage.getItem('solarCart') || '[]');
      const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }
  updateCartBadge();
}

// Run on DOM ready — handle case where DOM is already parsed (ES module defer)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
