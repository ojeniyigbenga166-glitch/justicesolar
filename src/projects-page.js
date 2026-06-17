import './style.css';
import { supabase } from './supabase.js';
import { fetchProjects, projects as dbProjects } from './projects.js';

// ==============================
// NAVBAR Component (Projects Page)
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
      <li><a href="/services.html" id="nav-services">Services</a></li>
      <li><a href="/projects.html" style="color: var(--color-primary);">Projects</a></li>
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
    <a href="/services.html" id="mob-services">Services</a>
    <a href="/projects.html" style="color: var(--color-primary);">Projects</a>
    <a href="/shop.html" id="mob-shop">Shop</a>
    <a href="/index.html#contact">Contact</a>
    <button class="btn-cta" id="mob-cta" style="margin-top:0.5rem;width:fit-content">Get Started</button>
  `;
  return menu;
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

  const categories = [
    { id: 'recent', name: 'Recent Projects', desc: 'Our latest real-time installations' },
    { id: 'residential', name: 'Residential Solar', desc: 'Home energy solutions' },
    { id: 'commercial', name: 'Commercial Solar', desc: 'Business & industrial' },
    { id: 'battery', name: 'Battery Storage', desc: 'Backup power systems' },
    { id: 'maintenance', name: 'Maintenance & Repair', desc: 'System optimization' },
    { id: 'consultation', name: 'Solar Consultation', desc: 'Expert energy audits' }
  ];

  let categoryHTML = categories.map((cat, i) => {
    let imgPath = `/project ${i + 1}.jpg`;

    if (cat.id === 'recent') {
      if (dbProjects && dbProjects.length > 0 && dbProjects[0].image_url) {
        imgPath = dbProjects[0].image_url;
      } else {
        imgPath = 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80';
      }
    } else {
      const dbCatProj = dbProjects.find(p => p.category === cat.name);
      if (dbCatProj && dbCatProj.image_url) {
        imgPath = dbCatProj.image_url;
      } else if (portfolioData[cat.name] && portfolioData[cat.name][0]) {
        imgPath = portfolioData[cat.name][0].image;
      }
    }

    return `
    <div class="category-card project-category-link" data-category="${cat.id === 'recent' ? 'Recent Projects' : cat.name}" style="cursor: pointer; position: relative; overflow: hidden; border-radius: 12px; aspect-ratio: 4/3; display: block; box-shadow: 0 4px 16px rgba(0,0,0,0.12);">
      <img src="${imgPath}" alt="${cat.name}" style="width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s ease;" onerror="this.src='https://via.placeholder.com/800x600?text=${encodeURIComponent(cat.name)}'" />
      <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(7, 27, 59, 0.95), transparent); padding: 2.5rem 1.5rem 1.5rem; color: white; display: flex; flex-direction: column; justify-content: flex-end;">
        <h3 style="margin: 0 0 0.4rem 0; font-size: 1.35rem; font-weight: 700;">${cat.name}</h3>
        <p style="margin: 0; font-size: 0.9rem; color: rgba(255,255,255,0.85);">${cat.desc}</p>
      </div>
      <div class="category-hover-overlay" style="position: absolute; inset: 0; background: rgba(253, 184, 19, 0.15); opacity: 0; transition: opacity 0.3s ease;"></div>
    </div>
    `;
  }).join('');

  section.innerHTML = `
    <style>
      .category-card:hover img { transform: scale(1.05); }
      .category-card:hover .category-hover-overlay { opacity: 1 !important; }
    </style>
    <div style="max-width: 1180px; margin: 0 auto; padding: calc(80px + 2rem) 2rem 3rem;">
      <div style="text-align: center; margin-bottom: 2.5rem;">
        <p style="color: #FDB813; font-weight: 700; font-size: 0.85rem; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 0.5rem;">OUR PORTFOLIO</p>
        <h2 style="font-family: 'Outfit', sans-serif; font-size: clamp(1.8rem, 3.5vw, 2.5rem); font-weight: 900; color: #071B3B; margin-bottom: 0.8rem;">Explore Our Work</h2>
        <p style="font-size: 1rem; color: #475569; max-width: 600px; margin: 0 auto;">Select a category below to see our successful installations and energy solutions</p>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem;">
        ${categoryHTML}
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

  let projects = [];

  const dbCategoryProjects = dbProjects
    .filter(p => p.category === category)
    .map(p => ({
      title: p.name,
      image: p.image_url || 'https://via.placeholder.com/900x500?text=' + encodeURIComponent(p.name),
      description: p.description || ''
    }));

  if (category === 'Recent Projects') {
    projects = dbProjects.map(p => ({
      title: p.name,
      image: p.image_url || 'https://via.placeholder.com/900x500?text=' + encodeURIComponent(p.name),
      description: p.description || ''
    }));
  } else {
    projects = [...dbCategoryProjects];
    const fallbackProjectsForCat = portfolioData[category] || [];
    fallbackProjectsForCat.forEach(fallback => {
      if (!projects.some(p => p.title.toLowerCase() === fallback.title.toLowerCase())) {
        projects.push(fallback);
      }
    });
  }

  // Handle case where category is empty
  if (!projects || projects.length === 0) {
    projects = [{
      title: 'More Projects Coming Soon',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
      description: 'We are currently updating our portfolio. Check back soon for new case studies.'
    }];
  }

  let slidesHTML = '';
  projects.forEach((project, index) => {
    slidesHTML += `
      <div class="carousel-slide" data-index="${index}">
        <img src="${project.image}" alt="${project.title}" onerror="this.src='https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=900&q=80'"/>
        <div class="carousel-slide-content">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
        </div>
      </div>
    `;
  });

  let thumbsHTML = '';
  projects.forEach((project, index) => {
    thumbsHTML += `
      <div class="carousel-thumb" data-index="${index}">
        <img src="${project.image}" alt="${project.title}" onerror="this.src='https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=100&q=80'"/>
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

    <!-- Carousel Slider -->
    <div class="carousel-container">
      <button class="carousel-nav carousel-prev" id="carousel-prev">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>

      <div class="carousel-main">
        <div class="carousel-slides">
          ${slidesHTML}
        </div>
      </div>

      <button class="carousel-nav carousel-next" id="carousel-next">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    </div>

    <!-- Carousel Indicators/Thumbnails -->
    <div class="carousel-thumbs-container">
      <div class="carousel-thumbs">
        ${thumbsHTML}
      </div>
    </div>
  `;

  // Carousel Logic
  let currentIndex = 0;
  let autoPlayInterval;

  const slides = section.querySelectorAll('.carousel-slide');
  const thumbs = section.querySelectorAll('.carousel-thumb');
  const prevBtn = section.querySelector('#carousel-prev');
  const nextBtn = section.querySelector('#carousel-next');
  const mainCarousel = section.querySelector('.carousel-slides');
  const thumbsContainer = section.querySelector('.carousel-thumbs');

  function updateCarousel(index) {
    currentIndex = (index + slides.length) % slides.length;
    const offset = -currentIndex * 100;
    mainCarousel.style.transform = `translateX(${offset}%)`;

    // Update thumbnails
    thumbs.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === currentIndex);
    });

    // Auto-scroll thumbnails to keep active one visible
    const thumbsInView = Math.floor(thumbsContainer.clientWidth / 110);
    const thumbOffset = Math.max(0, currentIndex - Math.floor(thumbsInView / 2));
    thumbsContainer.scrollLeft = thumbOffset * 110;
  }

  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      updateCarousel(currentIndex + 1);
    }, 5000);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  prevBtn.addEventListener('click', () => {
    stopAutoPlay();
    updateCarousel(currentIndex - 1);
    startAutoPlay();
  });

  nextBtn.addEventListener('click', () => {
    stopAutoPlay();
    updateCarousel(currentIndex + 1);
    startAutoPlay();
  });

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      stopAutoPlay();
      updateCarousel(index);
      startAutoPlay();
    });
  });

  // Initialize
  updateCarousel(0);
  startAutoPlay();

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
          <div id="thank-you-message" class="thank-you-container" style="display: none; text-align: center;">
            <div class="thank-you-icon">✓</div>
            <h2 class="thank-you-title">Thank You!</h2>
            <p class="thank-you-text">Your inquiry has been received successfully.</p>
            <p class="thank-you-subtext">We'll review your request and get back to you shortly at the email address provided.</p>
          </div>
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

      // Show thank you message
      const form = document.getElementById('get-started-form');
      const subtitle = document.querySelector('.modal-subtitle');
      const thankYouMsg = document.getElementById('thank-you-message');
      
      form.style.display = 'none';
      if (subtitle) subtitle.style.display = 'none';
      thankYouMsg.style.display = 'block';
      thankYouMsg.classList.add('fade-in');
      
      // Auto-close modal after 3 seconds
      setTimeout(() => {
        closeGetStartedModal();
        // Reset form for next time
        form.style.display = 'flex';
        if (subtitle) subtitle.style.display = 'block';
        thankYouMsg.style.display = 'none';
        thankYouMsg.classList.remove('fade-in');
        form.reset();
      }, 3000);
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
async function init() {
  const app = document.getElementById('app');
  if (!app) { console.error('[Init] #app element not found'); return; }

  const navbar = createNavbar();
  const mobileMenu = createMobileMenu();

  // Fetch dynamic projects from Supabase via imported module
  try {
    await fetchProjects();
    console.log('[Init] Fetched projects:', dbProjects.length, 'items');
  } catch (err) {
    console.error('[Init] fetchProjects failed, using fallbacks:', err);
  }

  // ===== DEBUG: Test direct Supabase query (REMOVE THIS BLOCK WHEN DONE) =====
  const { data, error } = await supabase
    .from('projects')
    .select('*');

  console.log('PROJECTS:', data);
  console.log('ERROR:', error);
  // ===== END DEBUG BLOCK =====

  const projects = createProjects();
  const footer = createFooter();

  app.appendChild(navbar);
  app.appendChild(mobileMenu);
  app.appendChild(projects);
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

  // --- Portfolio Navigation ---
  const projectCategoryLinks = document.querySelectorAll('.project-category-link');

  function showPortfolioPage(category) {
    // Remove all sections except navbar and mobile menu
    const mainContent = app.querySelectorAll('section, footer');
    mainContent.forEach(el => el.remove());

    // Create and append portfolio page
    const portfolioPage = createPortfolioPage(category);
    app.appendChild(portfolioPage);

    // Scroll to top
    window.scrollTo(0, 0);

    // Add back button functionality
    const backBtn = document.getElementById('portfolio-back');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        location.reload(); // Reload page to go back to projects layout
      });
    }
  }

  projectCategoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const category = link.getAttribute('data-category');
      showPortfolioPage(category);

      // Close mobile menu if open
      mobileMenuEl.classList.remove('open');
    });
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
