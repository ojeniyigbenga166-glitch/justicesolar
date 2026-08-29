import './style.css';
import { supabase } from './supabase.js';
import { fetchProjects, projects as dbProjects } from './projects.js';
import {
  createNavbar, createMobileMenu, createFooter,
  initNavbar, updateCartBadge
} from './layout.js';
import { getCartCount } from './cart.js';

// Shared Layout Navbar/Mobile Menu imported from layout.js

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
// Shared Layout Footer/Modal imported from layout.js

// ==============================
// App Init
// ==============================
// ==============================
// App Init
// ==============================
async function init() {
  const app = document.getElementById('app');
  if (!app) { console.error('[Init] #app element not found'); return; }

  const navbar = createNavbar('projects');
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

  // Initialize navbar behaviors (mobile submenus, scroll effect, modal bindings)
  initNavbar(() => {
    window.location.href = '/shop/cart';
  });

  // --- Portfolio Navigation ---
  const projectCategoryLinks = document.querySelectorAll('.project-category-link');
  const mobileMenuEl = document.getElementById('mobile-menu');

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
      if (mobileMenuEl) {
        mobileMenuEl.classList.remove('open');
      }
    });
  });

  // --- Contact Links to Modal ---
  const contactLinks = document.querySelectorAll('a[href*="#contact"]');
  contactLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = document.getElementById('get-started-modal');
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // --- Update Cart Badge ---
  updateCartBadge(getCartCount());
}

// Run on DOM ready — handle case where DOM is already parsed (ES module defer)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
