import './style.css';
import { supabase } from './supabase.js';
import {
  createNavbar,
  createMobileMenu,
  createFooter,
  initNavbar,
  openGetStartedModal,
  createCartDrawer,
  openCartDrawer,
  updateCartBadge
} from './layout.js';
import { getCartCount } from './cart.js';

// ==============================
// Services Data (8 Services)
// ==============================
const servicesData = [
  {
    id: 1,
    slug: 'product',
    title: 'Product (Solar Products)',
    meta: 'Premium Hardware',
    description: 'Premium solar panels, hybrid inverters, deep cycle/lithium batteries, and mounting kits from leading global manufacturers with solid warranty coverage. Sourced and tested to handle rigorous weather and deliver peak power output.',
    features: ['Top-Tier Tier-1 Panels', 'Smart Hybrid Inverters', 'High-capacity LiFePO4 storage', 'Accessories & mounting kits'],
    image: '/product 1.png'
  },
  {
    id: 2,
    slug: 'residential',
    title: 'Residential Solar Solution',
    meta: 'For Homeowners',
    description: 'Tailored home solar systems configured to power your lighting, TV, refrigerator, AC, and other household appliances reliably. Features smart grid/battery backup so you never experience a blackout.',
    features: ['Custom residential designs', 'Uninterrupted power transitions', 'Smart load management guidance', 'Substantial grid savings'],
    image: '/product 3.png'
  },
  {
    id: 3,
    slug: 'industrial',
    title: 'Industrial Solar Solution',
    meta: 'For Businesses',
    description: 'Scalable commercial and industrial solar power plants designed for businesses, factories, schools, and hospitals to minimize utility costs and grid dependency. Perfect for large-scale operations requiring stable 3-phase power.',
    features: ['Megawatt-scale PV designs', 'Grid-tie & hybrid industrial systems', 'Detailed ROI analysis', 'Zero disruption during deployment'],
    image: '/product 2.png'
  },
  {
    id: 4,
    slug: 'installment',
    title: 'Installment Plan',
    meta: 'Flexible Financing',
    description: 'Flexible and structured financing models designed to help homeowners and businesses deploy solar installations without high upfront costs. Spread your energy investment over comfortable monthly plans.',
    features: ['Low initial down payment', 'Structured monthly installments', 'Transparent interest rates', 'Path to 100% system ownership'],
    image: '/project 8.jpg'
  },
  {
    id: 5,
    slug: 'audits',
    title: 'Comprehensive Site Audits',
    meta: 'Analysis & Sizing',
    description: 'Professional roof assessment, structural inspection, shading analysis, and energy consumption audits. We build a precise energy profile to design the most efficient solar layout for your exact needs.',
    features: ['Structural integrity checks', 'Advanced shading simulations', 'Detailed load consumption profiles', 'Custom system sizing report'],
    image: '/project 9.jpg'
  },
  {
    id: 6,
    slug: 'installation',
    title: 'Professional Installation',
    meta: 'Expert Construction',
    description: 'Precision installation by certified solar engineers adhering strictly to international electrical standards and safety codes. We handle wiring, mounting, grounding, and inverter configuration.',
    features: ['Certified engineering crew', 'Rapid and clean installation', 'Comprehensive safety compliance', 'Post-install testing & commission'],
    image: '/project 1.jpg'
  },
  {
    id: 7,
    slug: 'maintenance',
    title: 'Maintenance & Support',
    meta: 'Ongoing Reliability',
    description: 'Routine checks, panel cleaning, battery management optimization, and rapid-response technical support to maintain maximum yield. We ensure your solar investment remains productive for decades.',
    features: ['Scheduled site checkups', 'Automated system monitoring', 'Prompt troubleshooting response', 'Warranty management support'],
    image: '/project 7.jpg'
  },
  {
    id: 8,
    slug: 'training',
    title: 'Solar Training Program',
    meta: 'Skills Development',
    description: 'Practical, hands-on academy training for aspiring solar installers, technicians, and renewable energy entrepreneurs. Learn system design, safety protocols, solar arithmetic, and practical troubleshooting.',
    features: ['Live installation practice', 'Recognized certifications', 'Experienced field facilitators', 'Job placement opportunities'],
    image: '/solar training.jpg'
  }
];

// Active State
let currentActiveIndex = 0;

// ==============================
// Services Section Component
// ==============================
function createServicesSection() {
  const section = document.createElement('section');
  section.className = 'services-page subpage-container';
  section.id = 'services-page';

  // Build Desktop Sidebar buttons
  const sidebarButtonsHTML = servicesData.map((service, idx) => `
    <button class="services-sidebar__btn ${idx === currentActiveIndex ? 'active' : ''}" data-index="${idx}">
      ${service.title}
    </button>
  `).join('');

  // Build Mobile Select Options
  const mobileOptionsHTML = servicesData.map((service, idx) => `
    <option value="${idx}" ${idx === currentActiveIndex ? 'selected' : ''}>
      ${service.title}
    </option>
  `).join('');

  section.innerHTML = `
    <div class="services-page__header">
      <p class="section-label">OUR EXPERTISE</p>
      <h1 class="services-page__title">Our Services &amp; Solutions</h1>
      <p class="services-page__desc">Explore our comprehensive solar energy services tailored for every scale.</p>
    </div>

    <!-- Mobile Dropdown Menu -->
    <div class="services-mobile-select-wrap">
      <label for="services-mobile-menu" style="display:block; margin-bottom: 0.5rem; font-weight:700; font-size:0.9rem; color:var(--color-text-heading);">SELECT A SERVICE</label>
      <select id="services-mobile-menu" class="services-mobile-select">
        ${mobileOptionsHTML}
      </select>
    </div>

    <!-- Two-Column Blog-style Layout -->
    <div class="services-layout">
      <!-- Left Sidebar (Desktop only) -->
      <aside class="services-sidebar">
        <h3 class="services-sidebar__title">All Services</h3>
        <div class="services-sidebar__list">
          ${sidebarButtonsHTML}
        </div>
      </aside>

      <!-- Right Main Concept panel -->
      <div class="services-main-concept" id="services-concept-panel">
        <!-- Content will be injected dynamically -->
      </div>
    </div>
  `;

  return section;
}

// Update the Concept panel HTML based on selection
function updateConceptPanel() {
  const panel = document.getElementById('services-concept-panel');
  if (!panel) return;

  const service = servicesData[currentActiveIndex];

  // Transition effect
  panel.style.opacity = '0';
  panel.style.transform = 'translateY(15px)';

  setTimeout(() => {
    const featuresHTML = service.features.map(feat => `
      <div class="services-concept__feature-item">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>${feat}</span>
      </div>
    `).join('');

    panel.innerHTML = `
      <div class="services-concept__meta">${service.meta}</div>
      <h2 class="services-concept__title">${service.title}</h2>

      <div class="services-concept__img-wrap">
        <img class="services-concept__img" src="${service.image}" alt="${service.title}" onerror="this.src='https://via.placeholder.com/800x450?text=${encodeURIComponent(service.title)}'" />
      </div>

      <p class="services-concept__desc">${service.description}</p>

      <h3 class="services-concept__features-title">What is included:</h3>
      <div class="services-concept__features-grid">
        ${featuresHTML}
      </div>

      <div class="services-concept__cta">
        <button class="btn-primary" id="btn-service-inquiry">
          Inquire About This Service
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-left:6px;"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    `;

    // Rebind get started click
    document.getElementById('btn-service-inquiry')?.addEventListener('click', openGetStartedModal);

    panel.style.opacity = '1';
    panel.style.transform = 'translateY(0)';
  }, 200);
}

// Handle Service Selection changes
function switchService(index, updateURL = true) {
  currentActiveIndex = parseInt(index);

  // Update URL param without reloading
  if (updateURL) {
    const service = servicesData[currentActiveIndex];
    const url = new URL(window.location.href);
    url.searchParams.set('service', service.slug);
    window.history.pushState({}, '', url);
  }

  // Update active state in Desktop Sidebar buttons
  const sidebarBtns = document.querySelectorAll('.services-sidebar__btn');
  sidebarBtns.forEach((btn, idx) => {
    btn.classList.toggle('active', idx === currentActiveIndex);
  });

  // Update Mobile Dropdown value
  const mobileSelect = document.getElementById('services-mobile-menu');
  if (mobileSelect) {
    mobileSelect.value = currentActiveIndex;
  }

  // Render content
  updateConceptPanel();
}

// ==============================
// App Init
// ==============================
function init() {
  const app = document.getElementById('app');

  // Build shared layout elements
  const navbar = createNavbar('services');
  const mobileMenu = createMobileMenu();
  const servicesSection = createServicesSection();
  const footer = createFooter();

  app.appendChild(navbar);
  app.appendChild(mobileMenu);
  app.appendChild(servicesSection);
  app.appendChild(footer);

  // Initialize shared navbar interactive logic
  initNavbar(() => {
    createCartDrawer();
    openCartDrawer();
  });

  // Setup cart badge
  updateCartBadge(getCartCount());

  // Check URL query parameters to set initial active service
  const params = new URLSearchParams(window.location.search);
  const serviceSlug = params.get('service');
  if (serviceSlug) {
    const activeIdx = servicesData.findIndex(s => s.slug === serviceSlug);
    if (activeIdx !== -1) {
      currentActiveIndex = activeIdx;
    }
  }

  // Initial render of panel content
  switchService(currentActiveIndex, false);

  // Wire up sidebar click handlers
  document.querySelector('.services-sidebar')?.addEventListener('click', e => {
    const btn = e.target.closest('.services-sidebar__btn');
    if (btn) {
      const idx = btn.dataset.index;
      switchService(idx);
    }
  });

  // Wire up mobile select change handler
  document.getElementById('services-mobile-menu')?.addEventListener('change', e => {
    switchService(e.target.value);
  });

  // Listen for history popstates (back/forward or external nav links)
  window.addEventListener('popstate', () => {
    const freshParams = new URLSearchParams(window.location.search);
    const freshSlug = freshParams.get('service');
    if (freshSlug) {
      const activeIdx = servicesData.findIndex(s => s.slug === freshSlug);
      if (activeIdx !== -1) {
        switchService(activeIdx, false);
      }
    } else {
      switchService(0, false);
    }
  });
}

// Run immediately or defer
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
