import './style.css';
import { supabase } from './supabase.js';
import { products, fetchProducts } from './products.js';

// ==============================
// NAVBAR Component
// ==============================
function createNavbar() {
  const nav = document.createElement('nav');
  nav.className = 'navbar';
  nav.id = 'navbar';
  nav.innerHTML = `
    <!-- Top Tier: Logo + Contact Info -->
    <div class="navbar-top desktop-only">
      <div class="navbar-top__left">
        <div class="navbar__logo" id="logo-home">
          <img src="/icon.svg" alt="Justice Georgenes Solar Consults" class="navbar__logo-img" />
        </div>
      </div>
      <div class="navbar-top__right">
        <div class="contact-block">
          <div class="contact-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>
          <div class="contact-text"><span>Akure</span><small>Cash-hold Complex, Ondo Rd</small></div>
        </div>
        <div class="contact-block">
          <div class="contact-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></div>
          <div class="contact-text"><span>Call us anytime</span><small>07037971175</small></div>
        </div>
        <div class="contact-block">
          <div class="contact-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></div>
          <div class="contact-text"><span>Send us a mail</span><small>Justicegeorgenes2@gmail.com</small></div>
        </div>
      </div>
    </div>

    <!-- Bottom Tier: Nav Links -->
    <div class="navbar-bottom">
      <div class="navbar-bottom__left">
        <!-- Hamburger -->
        <div class="navbar__hamburger" id="hamburger" role="button" tabindex="0" aria-label="Open menu">
          <span></span><span></span><span></span>
        </div>
        <!-- Mobile Logo -->
        <div class="navbar__logo mobile-only" id="logo-home-mob">
          <img src="/icon.svg" alt="Justice Georgenes Solar Consults" class="navbar__logo-img" style="height:40px;" />
        </div>
        <!-- Desktop Nav Links -->
        <ul class="navbar__links">
          <li><a href="#home" id="nav-home">Home</a></li>
          <li class="company-menu">
            <a href="javascript:void(0)" style="display:flex;align-items:center;gap:4px;">Company <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></a>
            <ul class="company-dropdown">
              <li><a href="#about">About Us</a></li>
              <li><a href="#locations">Our Branches</a></li>
              <li><a href="#how-it-works">Why Choose Us</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
            </ul>
          </li>
          <li class="services-menu">
            <a href="/services" id="nav-services" style="display:flex;align-items:center;gap:4px;">Services <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></a>
            <ul class="services-dropdown">
              <li><a href="/services?service=product">Product</a></li>
              <li><a href="/services?service=residential">Residential solar solution</a></li>
              <li><a href="/services?service=industrial">Industrial solar solution</a></li>
              <li><a href="/services?service=installment">installment plan</a></li>
              <li><a href="/services?service=audits">Comprehensive Site Audits</a></li>
              <li><a href="/services?service=installation">Professional Installation</a></li>
              <li><a href="/services?service=maintenance">Maintenance &amp; Support</a></li>
              <li><a href="/services?service=training">Solar Training Program</a></li>
            </ul>
          </li>
          <li><a href="/projects" id="nav-projects">Projects</a></li>
          <li><a href="/shop" id="nav-shop">Shop</a></li>
          <li><a href="#contact" id="nav-contact">Contact</a></li>
        </ul>
      </div>
      <div class="navbar-bottom__right">
        <a href="/shop" class="navbar__cart" id="nav-cart" aria-label="Shopping cart">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          <span class="navbar__cart-badge" id="cart-badge">0</span>
        </a>
        <button class="btn-cta-full desktop-only" id="nav-get-started">Get Started</button>
      </div>
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
    <a href="#home" id="mob-home">Home</a>
    
    <!-- Company Collapsible -->
    <div class="mobile-sections-menu">
      <button class="mobile-menu-toggle" data-menu="company">
        Company <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 6px; transition: transform 0.3s;"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </button>
      <div class="mobile-submenu" id="mobile-company-submenu">
        <a href="#about" class="mobile-submenu-link">About Us</a>
        <a href="#locations" class="mobile-submenu-link">Our Branches</a>
        <a href="#how-it-works" class="mobile-submenu-link">Why Choose Us</a>
        <a href="#testimonials" class="mobile-submenu-link">Testimonials</a>
      </div>
    </div>

    <!-- Services Collapsible -->
    <div class="mobile-sections-menu">
      <button class="mobile-menu-toggle" data-menu="services">
        Services <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 6px; transition: transform 0.3s;"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </button>
      <div class="mobile-submenu" id="mobile-services-submenu">
        <a href="/services?service=product" class="mobile-submenu-link">Product</a>
        <a href="/services?service=residential" class="mobile-submenu-link">Residential Solar Solution</a>
        <a href="/services?service=industrial" class="mobile-submenu-link">Industrial Solar Solution</a>
        <a href="/services?service=installment" class="mobile-submenu-link">installment plan</a>
        <a href="/services?service=audits" class="mobile-submenu-link">Comprehensive Site Audits</a>
        <a href="/services?service=installation" class="mobile-submenu-link">Professional Installation</a>
        <a href="/services?service=maintenance" class="mobile-submenu-link">Maintenance &amp; Support</a>
        <a href="/services?service=training" class="mobile-submenu-link">Solar Training Program</a>
      </div>
    </div>

    <a href="/projects" id="mob-projects">Projects</a>
    <a href="/shop" id="mob-shop">Shop</a>
    <a href="#contact" id="mob-contact">Contact</a>
    <button class="btn-cta" id="mob-cta" style="margin-top:0.5rem;width:fit-content">Get Started</button>
  `;
  return menu;
}

// ==============================
// HERO Section Component
// ==============================
function createHero() {
  const section = document.createElement('section');
  section.className = 'hero';
  section.id = 'home';

  section.innerHTML = `
    <!-- Background -->
    <div class="hero__bg" id="hero-bg"></div>

    <!-- Main Content -->
    <div class="hero__content">
      <p class="hero__label">Welcome to Justice Georgenes</p>

      <h1 class="hero__heading">
        <span class="line line-1">WHERE THE SUN</span>
        <span class="line line-2">MEETS</span>
        <span class="line line-3">SUSTAINABILITY</span>
      </h1>

      <p class="hero__subtext">
        Powering your future with quality, affordable and lasting solar brilliance.
        We deliver cutting-edge solar energy solutions across Nigeria — from residential
        to commercial and industrial installations.
      </p>

      <div class="hero__actions">
        <button class="btn-primary" id="hero-get-started">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          Get Started
        </button>
        <button class="btn-outline" id="hero-learn-more" onclick="document.getElementById('about').scrollIntoView({behavior: 'smooth'})">
          Learn More
        </button>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="hero__scroll">
      <div class="scroll-line"></div>
      <span>Scroll</span>
    </div>

    <!-- Stats Bar (bottom left) -->
    <div class="hero__stats">
      <div class="hero__stat-item">
        <span class="stat-num" data-target="500">0</span>
        <p class="stat-label">Projects Done</p>
      </div>
      <div class="hero__stat-item">
        <span class="stat-num" data-target="12">0</span>
        <p class="stat-label">Years Experience</p>
      </div>
      <div class="hero__stat-item">
        <span class="stat-num" data-target="98">0</span>
        <p class="stat-label">% Satisfaction</p>
      </div>
    </div>


  `;

  return section;
}

// ==============================
// ABOUT US Section Component
// ==============================
function createAboutUs() {
  const section = document.createElement('section');
  section.className = 'about-us';
  section.id = 'about';

  section.innerHTML = `
    <div class="about__container">
      <div class="about__image-wrap">
        <img src="/about-us.jpg" alt="Justice Georgenes Team" class="about__image" onerror="this.src='https://via.placeholder.com/800x600?text=Please+add+about-us.jpg+in+public+folder'" />
        <div class="about__image-badge">
          <span class="badge-num">12+</span>
          <span class="badge-text">Years<br/>Experience</span>
        </div>
      </div>
      <div class="about__content">
        <p class="section-label" style="text-align: left; margin-bottom: 1rem;">ABOUT US</p>
        <h2 class="about__title">Pioneering Sustainable Energy in Nigeria</h2>
        <p class="about__desc">
          Justice Georgenes Nig Limited is at the forefront of the renewable energy revolution. We are a team of passionate professionals dedicated to delivering top-tier solar solutions that empower homes and businesses. 
        </p>
        <p class="about__desc">
          With over a decade of hands-on experience, we pride ourselves on our meticulous approach—from comprehensive site audits to professional installation and ongoing maintenance. Our goal is to make clean, affordable energy accessible to everyone, ensuring a greener, more sustainable future.
        </p>
        
        <button class="btn-primary about__btn" onclick="window.location.href='/services'">Our Services</button>
      </div>
    </div>
  `;

  return section;
}

// ==============================
// SERVICES Section Component
// ==============================
function createServices() {
  const section = document.createElement('section');
  section.className = 'services';
  section.id = 'services';

  section.innerHTML = `
    <div class="services__container">
      <div class="section-header">
        <p class="section-label">OUR SERVICES</p>
        <h2 class="section-title">Smart Solar Solutions for Every Need</h2>
        <div class="section-line"></div>
      </div>

      <div class="services__grid">
        <!-- Service 1 -->
        <div class="service-card">
          <div class="service-card__icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </div>
          <h3 class="service-card__title">Comprehensive Site Audits</h3>
          <p class="service-card__desc">Detailed energy consumption analysis and professional site assessment to design your perfect solar architecture.</p>
          <a href="#contact" class="service-card__link">Learn More <span>&rarr;</span></a>
        </div>

        <!-- Service 2 -->
        <div class="service-card">
          <div class="service-card__icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
          </div>
          <h3 class="service-card__title">Solar Product Sales</h3>
          <p class="service-card__desc">Premium, high-efficiency solar panels, robust batteries, and reliable inverters sourced from top global manufacturers.</p>
          <a href="#contact" class="service-card__link">Learn More <span>&rarr;</span></a>
        </div>

        <!-- Service 3 -->
        <div class="service-card">
          <div class="service-card__icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
          </div>
          <h3 class="service-card__title">Professional Installation</h3>
          <p class="service-card__desc">Seamless, code-compliant deployment by our dedicated team of certified solar engineers and technicians.</p>
          <a href="#contact" class="service-card__link">Learn More <span>&rarr;</span></a>
        </div>

        <!-- Service 4 -->
        <div class="service-card">
          <div class="service-card__icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
          </div>
          <h3 class="service-card__title">Maintenance & Support</h3>
          <p class="service-card__desc">Ongoing system monitoring, routine servicing, and rapid-response repairs to ensure peak performance.</p>
          <a href="#contact" class="service-card__link">Learn More <span>&rarr;</span></a>
        </div>

        <!-- Service 5 -->
        <div class="service-card">
          <div class="service-card__icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
          </div>
          <h3 class="service-card__title">Solar Training Program</h3>
          <p class="service-card__desc">Comprehensive, hands-on technical training for aspiring professionals to build a thriving career in the rapidly growing renewable energy industry.</p>
          <a href="#contact" class="service-card__link">Learn More <span>&rarr;</span></a>
        </div>
      </div>
    </div>
  `;

  return section;
}

// ==============================
// HOW IT WORKS Section
// ==============================
function createHowItWorks() {
  const section = document.createElement('section');
  section.className = 'how-it-works';
  section.id = 'process';

  section.innerHTML = `
    <div class="hiw__container">
      
      <!-- Left side: Text -->
      <div class="hiw__content">
        <p class="section-label" style="color: var(--color-primary);">HOW IT WORKS</p>
        <h2 class="hiw__title">Simple Steps to Solar Savings</h2>
        <p class="hiw__desc">We make going solar easy from start to finish.</p>
        <button class="btn-primary hiw__btn" id="hiw-get-started">Get Started</button>
      </div>

      <!-- Right side: Steps -->
      <div class="hiw__steps">
        
        <!-- Step 1 -->
        <div class="hiw__step">
          <div class="hiw__icon-wrap">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><path d="M8 10h.01"></path><path d="M12 10h.01"></path><path d="M16 10h.01"></path></svg>
            <div class="hiw__badge">1</div>
          </div>
          <h3 class="hiw__step-title">Free Consultation</h3>
          <p class="hiw__step-desc">We discuss your energy needs and goals.</p>
        </div>

        <div class="hiw__connector"></div>

        <!-- Step 2 -->
        <div class="hiw__step">
          <div class="hiw__icon-wrap">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><circle cx="10" cy="13" r="2"></circle><path d="m14 17-2.5-2.5"></path></svg>
            <div class="hiw__badge">2</div>
          </div>
          <h3 class="hiw__step-title">Site Inspection</h3>
          <p class="hiw__step-desc">We analyze your roof and design the best system.</p>
        </div>

        <div class="hiw__connector"></div>

        <!-- Step 3 -->
        <div class="hiw__step">
          <div class="hiw__icon-wrap">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><line x1="3" x2="21" y1="9" y2="9"></line><line x1="3" x2="21" y1="15" y2="15"></line><line x1="9" x2="9" y1="3" y2="21"></line><line x1="15" x2="15" y1="3" y2="21"></line></svg>
            <div class="hiw__badge">3</div>
          </div>
          <h3 class="hiw__step-title">Professional Installation</h3>
          <p class="hiw__step-desc">Our experts install your system with care.</p>
        </div>

        <div class="hiw__connector"></div>

        <!-- Step 4 -->
        <div class="hiw__step">
          <div class="hiw__icon-wrap">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
            <div class="hiw__badge">4</div>
          </div>
          <h3 class="hiw__step-title">Start Saving</h3>
          <p class="hiw__step-desc">Generate clean energy and save on bills.</p>
        </div>

      </div>
    </div>
  `;

  return section;
}

// ==============================
// PRODUCTS Section Component
// ==============================
function createProducts() {
  const section = document.createElement('section');
  section.className = 'products';
  section.id = 'products';

  section.innerHTML = `
    <div class="products__container">
      <div class="section-header">
        <p class="section-label">OUR PRODUCTS</p>
        <h2 class="section-title">Premium Solar Solutions</h2>
        <p class="section-subtitle">High-quality products sourced from top global manufacturers</p>
        <div class="section-line"></div>
      </div>

      <div class="products__carousel-wrapper">
        <button class="carousel-btn prev-btn" id="carousel-prev" aria-label="Previous products">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div class="products__carousel-track-container">
          <div class="products__carousel-track" id="products-carousel-track">
            <div style="width: 100%; text-align: center; padding: 2rem; color: var(--color-primary);">Loading Products...</div>
          </div>
        </div>
        <button class="carousel-btn next-btn" id="carousel-next" aria-label="Next products">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      <!-- Browse All CTA Button -->
      <div class="products__actions">
        <a href="/shop" class="btn-primary">
          Browse All Products
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 6px;"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </div>
  `;

  return section;
}

// ==============================
// CALCULATOR Section Component
// ==============================
function createCalculator() {
  const section = document.createElement('section');
  section.className = 'calculator';
  section.id = 'calculator';

  section.innerHTML = `
    <div class="calc__container">
      <!-- Left: Text -->
      <div class="calc__left">
        <p class="section-label" style="text-align: left; margin-bottom: 1rem;">CALCULATE YOUR SAVINGS</p>
        <h2 class="calc__title">See How Much You Can Save</h2>
        <p class="calc__desc">Get an instant estimate of your solar savings and ROI.</p>
      </div>

      <!-- Middle: Inputs -->
      <div class="calc__mid">
        <div class="calc__input-group">
          <label for="calc-bill">Monthly Electricity Bill</label>
          <div class="calc__input-wrapper">
            <span class="calc__currency">₦</span>
            <input type="number" id="calc-bill" value="50000" min="5000" step="5000" />
          </div>
        </div>

        <div class="calc__input-group">
          <label for="calc-sun">Average Sunlight Hours</label>
          <div class="calc__select-wrapper">
            <select id="calc-sun">
              <option value="4">4 Hours</option>
              <option value="5" selected>5 Hours</option>
              <option value="6">6 Hours</option>
              <option value="7">7 Hours</option>
            </select>
          </div>
        </div>

        <div class="calc__input-group">
          <label for="calc-size">System Size (kVA)</label>
          <div class="calc__select-wrapper">
            <select id="calc-size">
              <option value="3">3 kVA</option>
              <option value="5" selected>5 kVA</option>
              <option value="10">10 kVA</option>
              <option value="15">15 kVA</option>
              <option value="20">20 kVA</option>
            </select>
          </div>
        </div>

        <button class="btn-primary calc__btn" id="calc-action-btn">Calculate Savings</button>
      </div>

      <!-- Right: White Card Results -->
      <div class="calc__right">
        <div class="calc__stats">
          <p class="calc__stats-label">Estimated Annual Savings</p>
          <div class="calc__stats-value-wrap">
            <span class="calc__stats-value" id="calc-annual-save">₦510,000</span>
            <span class="calc__stats-period">Yearly</span>
          </div>

          <div class="calc__roi-wrap">
            <p class="calc__stats-label">Estimated ROI</p>
            <p class="calc__roi-value">4 - 6 Years</p>
          </div>

          <p class="calc__lifespan"><span style="color: var(--color-accent); font-weight: 700;">25+ Years</span> System Lifespan</p>
        </div>

        <div class="calc__chart">
          <div class="calc__chart-header">
            <p>Savings Over Time</p>
            <select class="calc__chart-select" aria-label="Savings Over Time">
              <option>25 Years</option>
            </select>
          </div>
          <div class="calc__chart-body">
            <!-- Y-axis labels -->
            <div class="calc__y-axis">
              <span>₦40M</span>
              <span>₦30M</span>
              <span>₦20M</span>
              <span>₦10M</span>
              <span>0</span>
            </div>
            <div class="calc__bars-wrap">
              <!-- Grid lines -->
              <div class="calc__grid-lines">
                <div></div><div></div><div></div><div></div><div></div>
              </div>
              <div class="calc__bars">
                <div class="calc__bar" style="height: 2%;"></div>
                <div class="calc__bar" style="height: 15%;"></div>
                <div class="calc__bar" style="height: 30%;"></div>
                <div class="calc__bar" style="height: 48%;"></div>
                <div class="calc__bar" style="height: 70%;"></div>
                <div class="calc__bar" style="height: 95%;"></div>
              </div>
              <div class="calc__chart-labels">
                <span>0</span>
                <span>5Yrs</span>
                <span>10Yrs</span>
                <span>15Yrs</span>
                <span>20Yrs</span>
                <span>25Yrs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Logic
  const billInput = section.querySelector('#calc-bill');
  const btn = section.querySelector('#calc-action-btn');
  const annualSave = section.querySelector('#calc-annual-save');
  const sunInput = section.querySelector('#calc-sun');
  const sizeInput = section.querySelector('#calc-size');
  const roiDiv = section.querySelector('.calc__roi-value');

  function calculate() {
    const monthlyBill = parseInt(billInput.value, 10) || 50000;
    const systemSizeKVA = parseInt(sizeInput.value, 10) || 5;
    const sunlightHours = parseInt(sunInput.value, 10) || 5;

    // Estimate price per kWh from monthly bill
    // Assuming average household uses about 150 kWh per month
    const estimatedMonthlyKWh = 150;
    const pricePerKWh = monthlyBill / estimatedMonthlyKWh;

    // Calculate annual generation
    // System generates: Size (kVA) × Sunlight Hours × 365 days × 0.95 (efficiency)
    const annualKWhGenerated = systemSizeKVA * sunlightHours * 365 * 0.95;

    // Annual savings = Annual generation × Price per kWh
    const annualSavings = annualKWhGenerated * pricePerKWh;

    // ROI calculation
    // Rough estimate: ₦700k per kVA
    const systemCostEstimate = systemSizeKVA * 700000;
    const roiYears = systemCostEstimate / annualSavings;

    // Display results
    const formatNaira = (num) => '₦' + num.toLocaleString('en-NG', { maximumFractionDigits: 0 });
    annualSave.textContent = formatNaira(annualSavings);

    // Update ROI display
    if (roiDiv) {
      const roiMin = Math.max(2, Math.floor(roiYears));
      const roiMax = roiMin + 2;
      roiDiv.textContent = `${roiMin} - ${roiMax} Years`;
    }

    // Trigger animation on bars
    const bars = section.querySelectorAll('.calc__bar');
    bars.forEach(bar => {
      const h = bar.style.height;
      bar.style.height = '0%';
      setTimeout(() => { bar.style.height = h; }, 50);
    });
  }

  btn.addEventListener('click', calculate);
  billInput.addEventListener('input', calculate);
  sunInput.addEventListener('change', calculate);
  sizeInput.addEventListener('change', calculate);

  // Trigger initial animation
  setTimeout(calculate, 100);

  return section;
}

// ==============================
// WHY CHOOSE US Section Component
// ==============================
function createWhyChooseUs() {
  const section = document.createElement('section');
  section.className = 'why-choose-us';
  section.id = 'why-choose-us';

  section.innerHTML = `
    <div class="wcu__container">
      <div class="section-header">
        <p class="section-label">WHY CHOOSE US</p>
        <h2 class="section-title">Experience You Can Rely On</h2>
        <div class="section-line"></div>
      </div>

      <div class="wcu__grid">
        <!-- Feature 1 -->
        <div class="wcu__feature">
          <div class="wcu__icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line></svg>
          </div>
          <h3 class="wcu__title">NAIDEV Certified Professionals</h3>
          <p class="wcu__desc">Highly skilled and certified solar experts.</p>
        </div>

        <!-- Feature 2 -->
        <div class="wcu__feature" style="display: none;">
          <div class="wcu__icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          </div>
          <h3 class="wcu__title">Long-term Performance & Protection</h3>
          <p class="wcu__desc">Durable systems built to last decades.</p>
        </div>

        <!-- Feature 3 -->
        <div class="wcu__feature" style="display: none;">
          <div class="wcu__icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M2 12h20"></path></svg>
          </div>
          <h3 class="wcu__title">Flexible Financing Options</h3>
          <p class="wcu__desc">Payment plans tailored to fit your budget.</p>
        </div>

        <!-- Feature 4 -->
        <div class="wcu__feature">
          <div class="wcu__icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9" y2="9"></line><line x1="15" y1="9" x2="15" y2="9"></line></svg>
          </div>
          <h3 class="wcu__title">Real-time Monitoring</h3>
          <p class="wcu__desc">Track performance in real-time.</p>
        </div>

        <!-- Feature 5 -->
        <div class="wcu__feature">
          <div class="wcu__icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
          </div>
          <h3 class="wcu__title">Fast Installation</h3>
          <p class="wcu__desc">Quick and hassle-free setup.</p>
        </div>

        <!-- Feature 6 -->
        <div class="wcu__feature">
          <div class="wcu__icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m3.08 3.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m3.08-3.08l4.24-4.24"></path></svg>
          </div>
          <h3 class="wcu__title">24/7 Support</h3>
          <p class="wcu__desc">We're here whenever you need us.</p>
        </div>
      </div>
    </div>
  `;

  return section;
}

// ==============================
// TESTIMONIALS Section Component
// ==============================
function createTestimonials() {
  const section = document.createElement('section');
  section.className = 'testimonials';
  section.id = 'testimonials';

  section.innerHTML = `
    <div class="testimonials__container">
      <div class="section-header">
        <p class="section-label">TESTIMONIALS</p>
        <h2 class="section-title">What Our Customers Say</h2>
        <div class="section-line"></div>
      </div>

      <div class="testimonials__grid">
        <!-- Testimonial 1 -->
        <div class="testimonial-card">
          <div class="testimonial-card__header">
            <img src="/flag.png" alt="James T." class="testimonial-card__avatar" />
            <div class="testimonial-card__info">
              <h3 class="testimonial-card__name">James T.</h3>
              <p class="testimonial-card__location">Lagos, USA</p>
            </div>
          </div>
          <div class="testimonial-card__rating">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 10.26 23.77 10.35 17.16 16.61 19.91 25.88 12 20.44 4.09 25.88 6.84 16.61 0.23 10.35 8.91 10.26 12 2"/></svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 10.26 23.77 10.35 17.16 16.61 19.91 25.88 12 20.44 4.09 25.88 6.84 16.61 0.23 10.35 8.91 10.26 12 2"/></svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 10.26 23.77 10.35 17.16 16.61 19.91 25.88 12 20.44 4.09 25.88 6.84 16.61 0.23 10.35 8.91 10.26 12 2"/></svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 10.26 23.77 10.35 17.16 16.61 19.91 25.88 12 20.44 4.09 25.88 6.84 16.61 0.23 10.35 8.91 10.26 12 2"/></svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 10.26 23.77 10.35 17.16 16.61 19.91 25.88 12 20.44 4.09 25.88 6.84 16.61 0.23 10.35 8.91 10.26 12 2"/></svg>
          </div>
          <p class="testimonial-card__text">"Installation was seamless. Our bills are lower and our home is powered by clean energy!"</p>
        </div>

        <!-- Testimonial 2 -->
        <div class="testimonial-card">
          <div class="testimonial-card__header">
            <img src="/flag.png" alt="Sarah M." class="testimonial-card__avatar" />
            <div class="testimonial-card__info">
              <h3 class="testimonial-card__name">Sarah M.</h3>
              <p class="testimonial-card__location">Texas, USA</p>
            </div>
          </div>
          <div class="testimonial-card__rating">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 10.26 23.77 10.35 17.16 16.61 19.91 25.88 12 20.44 4.09 25.88 6.84 16.61 0.23 10.35 8.91 10.26 12 2"/></svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 10.26 23.77 10.35 17.16 16.61 19.91 25.88 12 20.44 4.09 25.88 6.84 16.61 0.23 10.35 8.91 10.26 12 2"/></svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 10.26 23.77 10.35 17.16 16.61 19.91 25.88 12 20.44 4.09 25.88 6.84 16.61 0.23 10.35 8.91 10.26 12 2"/></svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 10.26 23.77 10.35 17.16 16.61 19.91 25.88 12 20.44 4.09 25.88 6.84 16.61 0.23 10.35 8.91 10.26 12 2"/></svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 10.26 23.77 10.35 17.16 16.61 19.91 25.88 12 20.44 4.09 25.88 6.84 16.61 0.23 10.35 8.91 10.26 12 2"/></svg>
          </div>
          <p class="testimonial-card__text">"Excellent service and great communication. Highly recommended!"</p>
        </div>

        <!-- Testimonial 3 -->
        <div class="testimonial-card">
          <div class="testimonial-card__header">
            <img src="/flag.png" alt="Michael R." class="testimonial-card__avatar" />
            <div class="testimonial-card__info">
              <h3 class="testimonial-card__name">Michael R.</h3>
              <p class="testimonial-card__location">Florida, USA</p>
            </div>
          </div>
          <div class="testimonial-card__rating">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 10.26 23.77 10.35 17.16 16.61 19.91 25.88 12 20.44 4.09 25.88 6.84 16.61 0.23 10.35 8.91 10.26 12 2"/></svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 10.26 23.77 10.35 17.16 16.61 19.91 25.88 12 20.44 4.09 25.88 6.84 16.61 0.23 10.35 8.91 10.26 12 2"/></svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 10.26 23.77 10.35 17.16 16.61 19.91 25.88 12 20.44 4.09 25.88 6.84 16.61 0.23 10.35 8.91 10.26 12 2"/></svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 10.26 23.77 10.35 17.16 16.61 19.91 25.88 12 20.44 4.09 25.88 6.84 16.61 0.23 10.35 8.91 10.26 12 2"/></svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 10.26 23.77 10.35 17.16 16.61 19.91 25.88 12 20.44 4.09 25.88 6.84 16.61 0.23 10.35 8.91 10.26 12 2"/></svg>
          </div>
          <p class="testimonial-card__text">"Professional and efficient. The installation was quick. Best investment we've made."</p>
        </div>
      </div>
    </div>
  `;

  return section;
}

// ==============================
// FAQ Section Component
// ==============================
function createFaq() {
  const section = document.createElement('section');
  section.className = 'faq';
  section.id = 'faq';

  section.innerHTML = `
    <div class="faq__container">
      <div class="faq__left">
        <p class="section-label" style="text-align: left; margin-bottom: 1rem;">FAQ</p>
        <h2 class="faq__title">Frequently Asked Questions</h2>
        <p class="faq__desc">Find answers to the most common questions about going solar with Justice Georgenes.</p>
      </div>
      <div class="faq__right">
        <!-- FAQ Item 1 -->
        <div class="faq__item">
          <button class="faq__question">
            <span>How much can I save by switching to solar?</span>
            <svg class="faq__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <div class="faq__answer">
            <div class="faq__answer-inner">
              <p>Your savings depend on your current energy usage and the system size. Many of our clients see their electricity bills drop by 50% to 80% immediately after installation.</p>
            </div>
          </div>
        </div>
        
        <!-- FAQ Item 2 -->
        <div class="faq__item">
          <button class="faq__question">
            <span>How long does a solar installation take?</span>
            <svg class="faq__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <div class="faq__answer">
            <div class="faq__answer-inner">
              <p>A typical residential installation takes 1 to 3 days. Commercial installations may take longer depending on the scale and complexity of the project.</p>
            </div>
          </div>
        </div>

        <!-- FAQ Item 3 -->
        <div class="faq__item">
          <button class="faq__question">
            <span>Do solar panels work during cloudy days or power outages?</span>
            <svg class="faq__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <div class="faq__answer">
            <div class="faq__answer-inner">
              <p>Yes! Solar panels still generate electricity on cloudy days, though at a reduced rate. To maintain power during grid outages, we include robust battery storage solutions with our installations.</p>
            </div>
          </div>
        </div>

        <!-- FAQ Item 4 -->
        <div class="faq__item">
          <button class="faq__question">
            <span>What maintenance is required?</span>
            <svg class="faq__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <div class="faq__answer">
            <div class="faq__answer-inner">
              <p>Solar panels require very little maintenance. Occasional cleaning to remove dust or debris is usually sufficient. We also offer ongoing maintenance and monitoring packages for optimal performance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Accordion Logic
  const questions = section.querySelectorAll('.faq__question');
  questions.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.parentElement;
      const isActive = parent.classList.contains('active');

      // Close all other items
      section.querySelectorAll('.faq__item').forEach(item => {
        item.classList.remove('active');
      });

      // Toggle current
      if (!isActive) {
        parent.classList.add('active');
      }
    });
  });

  return section;
}

// ==============================
// MAP Section Component
// ==============================
function createMapSection() {
  const section = document.createElement('section');
  section.className = 'locations-section';
  section.id = 'locations';

  const akureMap = "https://maps.google.com/maps?q=JUSTICE+GEORGENES+SOLAR+CONSULTS,+Akure,+Ondo+State&t=&z=16&ie=UTF8&iwloc=B&output=embed";
  const ondoMap = "https://maps.google.com/maps?q=SHOP+5%269,+POWA+SHOPPING+COMPLEX+BESIDE+YABA+POLICE+STATION+ONDO,+ONDO+STATE&t=&z=14&ie=UTF8&iwloc=&output=embed";
  const ekitiMap = "https://maps.google.com/maps?q=NO+2,+ODO-AREMU,+EREGURU+STREET,+ADO+EKITI,+EKITI+STATE.&t=&z=14&ie=UTF8&iwloc=&output=embed";

  section.innerHTML = `
    <div class="locations__container">
      <div class="section-header">
        <p class="section-label">OUR LOCATIONS</p>
        <h2 class="section-title">Visit Our Branches</h2>
        <div class="section-line"></div>
      </div>

      <div class="locations__content">
        <!-- Map Column -->
        <div class="locations__map-wrapper">
          <iframe id="branch-map-iframe" title="Google Maps Location of Justice Georgenes" src="${akureMap}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>

        <!-- Branches Column -->
        <div class="locations__branches">
          
          <div class="branch-card active" data-src="${akureMap}">
            <div class="branch-card__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
            <div class="branch-card__info">
              <h3 class="branch-card__title">Akure Branch (Head Office)</h3>
              <p class="branch-card__text"><strong>Address:</strong> Suite 1&2 Cash-hold Complex, Ondo Rd, off Arakale Road Akure 340106, Ondo.</p>
              <p class="branch-card__text"><strong>Support:</strong> 09023924127, 08145481214</p>
            </div>
          </div>

          <div class="branch-card" data-src="${ondoMap}">
            <div class="branch-card__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
            <div class="branch-card__info">
              <h3 class="branch-card__title">Ondo Town Branch</h3>
              <p class="branch-card__text"><strong>Address:</strong> SHOP 5&9, POWA SHOPPING COMPLEX BESIDE YABA POLICE STATION ONDO, ONDO STATE.</p>
              <p class="branch-card__text"><strong>Support:</strong> +234 800 123 4568</p>
            </div>
          </div>

          <div class="branch-card" data-src="${ekitiMap}">
            <div class="branch-card__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
            <div class="branch-card__info">
              <h3 class="branch-card__title">Ado Ekiti Branch</h3>
              <p class="branch-card__text"><strong>Address:</strong> NO 2, ODO-AREMU, EREGURU STREET, ADO EKITI, EKITI STATE.</p>
              <p class="branch-card__text"><strong>Support:</strong> +234 800 123 4569</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;

  // Add Interactivity
  const iframe = section.querySelector('#branch-map-iframe');
  const cards = section.querySelectorAll('.branch-card');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      // Remove active class from all
      cards.forEach(c => c.classList.remove('active'));
      // Add active class to clicked
      card.classList.add('active');
      // Update iframe map URL
      iframe.src = card.getAttribute('data-src');
    });
  });

  return section;
}

// ==============================
// FOOTER Section Component
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
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/projects">Projects</a></li>
            <li><a href="#contact">Contact Us</a></li>
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
            <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--color-accent)"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> <span>07037971175</span></li>
            <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--color-accent)"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> <span>Justicegeorgenes2@gmail.com</span></li>
            <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--color-accent); flex-shrink: 0;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> <span>Suite 1&2 Cash-hold Complex, Ondo Rd,<br/>off Arakale Road Akure 340106, Ondo.</span></li>
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
// Portfolio Data
// ==============================
const portfolioData = {
  'Residential Solar': [
    {
      id: 1,
      title: 'Modern Home Solar Installation',
      image: '/project 1.jpg',
      description: 'Complete 6kW solar system installed on a beautiful suburban home, reducing energy bills by 85%.'
    },
    {
      id: 2,
      title: 'Apartment Complex Solar Retrofit',
      image: '/project 2.jpg',
      description: 'Retrofitted 15 residential units with solar panels, providing sustainable energy to 45+ residents.'
    },
    {
      id: 3,
      title: 'Off-Grid Home Solution',
      image: '/project 3.jpg',
      description: 'Complete off-grid solar system with battery storage for a rural residential property.'
    },
    {
      id: 4,
      title: 'Rooftop Solar Farm',
      image: '/project 4.jpg',
      description: '8kW residential solar array with monitoring system for optimal energy generation.'
    }
  ],
  'Commercial Solar': [
    {
      id: 5,
      title: 'Corporate Office Solar System',
      image: '/project 5.jpg',
      description: '50kW commercial solar installation for a Fortune 500 office building in downtown Lagos.'
    },
    {
      id: 6,
      title: 'Manufacturing Plant Solar',
      image: '/project 6.jpg',
      description: 'Large-scale 100kW solar system powering industrial manufacturing operations 24/7.'
    },
    {
      id: 7,
      title: 'Retail Shopping Mall Install',
      image: '/project 7.jpg',
      description: 'Comprehensive 75kW solar canopy system for a major shopping center, reducing operational costs.'
    },
    {
      id: 8,
      title: 'Education Facility Solar',
      image: '/project 8.jpg',
      description: 'University campus solar installation providing green energy for academic buildings.'
    }
  ],
  'Battery Storage': [
    {
      id: 9,
      title: 'Residential Battery System',
      image: '/project 9.jpg',
      description: '15kWh lithium battery storage system ensuring uninterrupted power during outages.'
    },
    {
      id: 10,
      title: 'Commercial Energy Storage',
      image: '/project 10.jpg',
      description: '100kWh commercial battery backup system for continuous business operations.'
    },
    {
      id: 11,
      title: 'Hybrid Solar + Battery',
      image: '/project 11.jpg',
      description: 'Complete solar and battery storage solution maximizing energy independence and savings.'
    },
    {
      id: 12,
      title: 'Grid-Scale Storage System',
      image: '/project 12.jpg',
      description: '500kWh industrial battery system for grid-scale energy storage and load balancing.'
    }
  ],
  'Maintenance & Repair': [
    {
      id: 13,
      title: 'Panel Cleaning & Maintenance',
      image: '/project 13.jpg',
      description: 'Professional solar panel cleaning service maintaining optimal efficiency year-round.'
    },
    {
      id: 14,
      title: 'Inverter Replacement',
      image: '/project 14.jpg',
      description: 'Expert inverter diagnosis and replacement service restoring system performance.'
    },
    {
      id: 15,
      title: 'Electrical System Repair',
      image: '/project 5.jpg',
      description: 'Comprehensive electrical repairs and upgrades for solar systems of all sizes.'
    },
    {
      id: 16,
      title: 'Performance Optimization',
      image: '/project 6.jpg',
      description: 'System diagnostics and optimization increasing energy production efficiency by 20%+.'
    }
  ],
  'Solar Consultation': [
    {
      id: 17,
      title: 'Residential Energy Audit',
      image: '/project 7.jpg',
      description: 'Comprehensive home energy assessment determining optimal solar system size for maximum ROI.'
    },
    {
      id: 18,
      title: 'Commercial Solar Feasibility',
      image: '/project 8.jpg',
      description: 'Detailed feasibility study for businesses exploring solar energy solutions.'
    },
    {
      id: 19,
      title: 'System Design Consultation',
      image: '/project 9.jpg',
      description: 'Expert consultation on custom solar system design tailored to specific needs.'
    },
    {
      id: 20,
      title: 'Financing & Incentives Advisory',
      image: '/project 10.jpg',
      description: 'Guidance on available financing options, tax incentives, and government rebates.'
    }
  ]
};

// ==============================
// PROJECTS Section Component
// ==============================
function createProjects() {
  const section = document.createElement('section');
  section.className = 'projects';
  section.id = 'projects';

  const categories = Object.keys(portfolioData);

  let categoriesHTML = '';
  categories.forEach(category => {
    const projectCount = portfolioData[category].length;
    categoriesHTML += `
      <div class="project-category-card">
        <div class="project-category-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"/>
          </svg>
        </div>
        <h3 class="project-category-title">${category}</h3>
        <p class="project-category-count">${projectCount} Projects</p>
        <a href="#portfolio-${category.toLowerCase().replace(/\s+/g, '-')}" class="project-category-link" data-category="${category}">View Portfolio →</a>
      </div>
    `;
  });

  section.innerHTML = `
    <div class="projects__container">
      <div class="projects__header">
        <p class="section-label">OUR WORK</p>
        <h2 class="projects__title">Explore Our Portfolio</h2>
        <p class="projects__desc">Browse our diverse range of solar solutions across residential, commercial, and industrial sectors</p>
      </div>
      <div class="projects__grid">
        ${categoriesHTML}
      </div>
    </div>
  `;

  return section;
}

// ==============================
// Portfolio Page Component
// ==============================
function createPortfolioPage(category) {
  const section = document.createElement('section');
  section.className = 'portfolio-page';
  section.id = 'portfolio-page';

  const projects = portfolioData[category] || [];

  let projectsHTML = '';
  projects.forEach(project => {
    projectsHTML += `
      <div class="portfolio-card">
        <img src="${project.image}" alt="${project.title}" class="portfolio-card-image" onerror="this.src='https://via.placeholder.com/800x400?text=${encodeURIComponent(project.title)}'"/>
        <div class="portfolio-card-content">
          <h3 class="portfolio-card-title">${project.title}</h3>
          <p class="portfolio-card-desc">${project.description}</p>
          <button class="portfolio-card-btn">Learn More</button>
        </div>
      </div>
    `;
  });

  section.innerHTML = `
    <button class="portfolio-back-btn" id="portfolio-back">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
      Back to Projects
    </button>
    
    <div class="portfolio-header">
      <h1>${category}</h1>
      <p>Explore our portfolio of successful ${category.toLowerCase()} projects across Nigeria</p>
    </div>

    <div class="portfolio-grid">
      ${projectsHTML}
    </div>
  `;

  return section;
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
  const hero = createHero();
  const about = createAboutUs();
  // const services = createServices(); // Moved to services.html
  const howItWorks = createHowItWorks();
  const products = createProducts();
  const calculator = createCalculator();
  const whyChooseUs = createWhyChooseUs();
  const testimonials = createTestimonials();
  const faq = createFaq();
  const mapSection = createMapSection();
  const footer = createFooter();

  app.appendChild(navbar);
  app.appendChild(mobileMenu);
  app.appendChild(hero);
  // app.appendChild(services); // Moved to services.html
  app.appendChild(howItWorks);
  app.appendChild(products);
  app.appendChild(calculator);
  app.appendChild(whyChooseUs);
  app.appendChild(testimonials);
  app.appendChild(about);
  app.appendChild(faq);
  app.appendChild(mapSection);
  app.appendChild(footer);

  // --- Navbar scroll effect ---
  const navEl = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navEl.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // --- Hamburger toggle ---
  const hamburger = document.getElementById('hamburger');
  const mobileMenuEl = document.getElementById('mobile-menu');
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenuEl.classList.toggle('open');
  });

  // Close mobile menu on link click
  mobileMenuEl.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('click', (e) => {
      // Only close if not a sections menu toggle
      if (!el.classList.contains('mobile-menu-toggle')) {
        mobileMenuEl.classList.remove('open');
      }
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (mobileMenuEl.classList.contains('open')) {
      if (!mobileMenuEl.contains(e.target) && !hamburger.contains(e.target)) {
        mobileMenuEl.classList.remove('open');
      }
    }
  });

  // Collapsible submenus
  mobileMenuEl.querySelectorAll('.mobile-menu-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const menu = btn.getAttribute('data-menu');
      const submenu = mobileMenuEl.querySelector(`#mobile-${menu}-submenu`);
      const arrow = btn.querySelector('svg');
      
      const isOpen = submenu.classList.contains('open');
      
      mobileMenuEl.querySelectorAll('.mobile-submenu').forEach(sub => {
        sub.classList.remove('open');
        const otherArrow = sub.previousElementSibling.querySelector('svg');
        if (otherArrow) otherArrow.style.transform = 'rotate(0deg)';
      });
      
      if (!isOpen) {
        submenu.classList.add('open');
        if (arrow) arrow.style.transform = 'rotate(180deg)';
      }
    });
  });

  // Prevent default link behavior on Sections nav item
  const sectionsNavLink = document.getElementById('nav-sections');
  if (sectionsNavLink) {
    sectionsNavLink.addEventListener('click', (e) => {
      e.preventDefault();
    });
  }

  // --- Subtle parallax on hero bg ---
  const heroBg = document.getElementById('hero-bg');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    heroBg.style.transform = `translateY(${scrollY * 0.35}px)`;
  }, { passive: true });

  // --- Animated counters ---
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || (el.closest('.hero__stat-item').querySelector('.stat-label').textContent.includes('%') ? '+' : '+');
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + suffix;
    }, 16);
  }

  const statNums = document.querySelectorAll('.stat-num');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => observer.observe(el));

  // --- Get Started Modal ---
  const getStartedButtons = [
    document.getElementById('hero-get-started'),
    document.getElementById('nav-get-started'),
    document.getElementById('mob-cta'),
    document.getElementById('hiw-get-started'),
    document.getElementById('footer-get-quote'),
    document.getElementById('footer-speak-expert')
  ];
  
  getStartedButtons.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', openGetStartedModal);
    }
  });

  // --- Contact Us Links to Modal ---
  const contactLinks = document.querySelectorAll('a[href="#contact"]');
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
  initProductsCarousel();
}

async function initProductsCarousel() {
  const track = document.getElementById('products-carousel-track');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  if (!track) return;

  let allProducts = [];
  try {
    allProducts = await fetchProducts();
  } catch (err) {
    console.error('Error fetching products for carousel:', err);
  }

  // Slice first 10 products
  const topProducts = allProducts.slice(0, 10);

  track.innerHTML = topProducts.map(p => `
    <div class="carousel-product-card" data-id="${p.id}">
      <div class="carousel-product-image-wrap">
        <img src="${p.image}" alt="${p.name}" class="carousel-product-img" loading="lazy" />
        <span class="carousel-product-category">${p.category}</span>
      </div>
      <div class="carousel-product-info">
        <span class="carousel-product-brand">${p.brand}</span>
        <h3 class="carousel-product-title">${p.name}</h3>
        <p class="carousel-product-desc">${p.shortDescription || ''}</p>
        <div class="carousel-product-footer">
          <span class="carousel-product-price">₦${p.price.toLocaleString()}</span>
          <a href="/shop/product?slug=${p.slug}" class="carousel-product-link">
            View Details
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </div>
  `).join('');

  let currentIndex = 0;
  let autoPlayTimer = null;

  function getCardsPerView() {
    const w = window.innerWidth;
    if (w <= 480) return 1;
    if (w <= 768) return 2;
    if (w <= 1200) return 3;
    return 4;
  }

  function updateSlide() {
    const cardsPerView = getCardsPerView();
    const maxIndex = Math.max(0, topProducts.length - cardsPerView);
    
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;

    const cards = track.querySelectorAll('.carousel-product-card');
    if (cards[currentIndex]) {
      const offsetLeft = cards[currentIndex].offsetLeft;
      track.style.transform = `translateX(-${offsetLeft}px)`;
    }
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayTimer = setInterval(() => {
      const cardsPerView = getCardsPerView();
      const maxIndex = Math.max(0, topProducts.length - cardsPerView);
      if (currentIndex >= maxIndex) {
        currentIndex = 0;
      } else {
        currentIndex++;
      }
      updateSlide();
    }, 4000);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  }

  prevBtn?.addEventListener('click', () => {
    stopAutoPlay();
    currentIndex--;
    updateSlide();
    startAutoPlay();
  });

  nextBtn?.addEventListener('click', () => {
    stopAutoPlay();
    currentIndex++;
    updateSlide();
    startAutoPlay();
  });

  const wrapper = track.closest('.products__carousel-wrapper');
  wrapper?.addEventListener('mouseenter', stopAutoPlay);
  wrapper?.addEventListener('mouseleave', startAutoPlay);

  window.addEventListener('resize', () => {
    updateSlide();
  });

  // Initial offset calculation delay to ensure layout is fully rendered
  setTimeout(() => {
    updateSlide();
    startAutoPlay();
  }, 300);
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', init);
