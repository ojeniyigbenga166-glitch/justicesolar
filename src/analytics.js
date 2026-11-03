/**
 * Google Analytics 4 (GA4) Integration & Event Tracking Module
 * Justice Georgenes Solar Consults
 */

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-W0DZ43QGVN';
let isInitialized = false;

/**
 * Initialize Google Analytics 4
 * Automatically ensures gtag is initialized and avoids duplicate scripts.
 */
export function initAnalytics() {
  if (isInitialized) return;

  if (typeof window === 'undefined') return;

  // Setup dataLayer regardless of whether ID is present yet
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
  }

  const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`);
  if (!existingScript && GA_ID && GA_ID.startsWith('G-')) {
    // Inject gtag.js script asynchronously if not already present in HTML
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    window.gtag('js', new Date());
    window.gtag('config', GA_ID, {
      send_page_view: true,
      cookie_flags: 'SameSite=None;Secure',
    });

    console.info(`[Google Analytics] GA4 initialized with ID: ${GA_ID}`);
  }

  isInitialized = true;
}

/**
 * Track Page Views (useful for SPA navigation and clean URL transitions)
 * @param {string} pagePath - URL path (e.g. /services, /shop, /projects)
 * @param {string} pageTitle - Title of the page
 */
export function trackPageView(pagePath = window.location.pathname, pageTitle = document.title) {
  if (window.gtag && GA_ID) {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: pageTitle,
      page_location: window.location.href,
    });
  } else {
    console.debug('[GA4 PageView]', { pagePath, pageTitle });
  }
}

/**
 * Generic Custom Event Tracker
 * @param {string} eventName - Name of the event (e.g. 'generate_lead', 'click')
 * @param {object} eventParams - Optional parameters
 */
export function trackEvent(eventName, eventParams = {}) {
  if (window.gtag && GA_ID) {
    window.gtag('event', eventName, eventParams);
  } else {
    console.debug(`[GA4 Event: ${eventName}]`, eventParams);
  }
}

/**
 * Track WhatsApp Contact Clicks (Key High-Intent Conversion)
 * @param {string} source - Where the click originated (e.g. 'floating_btn', 'checkout', 'navbar', 'contact_section')
 * @param {string} [details] - Optional contextual details
 */
export function trackWhatsAppClick(source = 'general', details = '') {
  trackEvent('whatsapp_click', {
    event_category: 'engagement',
    event_label: source,
    source: source,
    details: details,
  });
}

/**
 * Track Phone Call Inquiries
 * @param {string} source - Placement of the phone number clicked
 */
export function trackPhoneCall(source = 'header') {
  trackEvent('phone_call_click', {
    event_category: 'contact',
    event_label: source,
    source: source,
  });
}

/**
 * Track Lead Generation (Quote Request / Contact Form)
 * @param {string} formName - Form type (e.g. 'consultation_form', 'solar_quote_modal', 'quick_contact')
 * @param {object} [extraData] - Additional non-sensitive lead info (e.g. package chosen, estimated load)
 */
export function trackLead(formName, extraData = {}) {
  trackEvent('generate_lead', {
    event_category: 'lead',
    form_name: formName,
    ...extraData,
  });
}

/**
 * Track Solar Package Selection
 * @param {string} packageName - Name of the chosen package
 * @param {string} [capacity] - System capacity (e.g. '1.5kVA', '5kVA')
 */
export function trackPackageSelect(packageName, capacity = '') {
  trackEvent('select_solar_package', {
    event_category: 'solar_packages',
    package_name: packageName,
    package_capacity: capacity,
  });
}

/**
 * Track E-Commerce Add To Cart
 * @param {object} product - Product item added
 */
export function trackAddToCart(product) {
  trackEvent('add_to_cart', {
    currency: 'NGN',
    value: Number(product.price || 0),
    items: [
      {
        item_id: String(product.id),
        item_name: product.name,
        item_category: product.category,
        price: Number(product.price || 0),
        quantity: Number(product.quantity || 1),
      },
    ],
  });
}

/**
 * Track E-Commerce Begin Checkout
 * @param {Array} items - Items in cart
 * @param {number} totalValue - Order total
 */
export function trackBeginCheckout(items = [], totalValue = 0) {
  trackEvent('begin_checkout', {
    currency: 'NGN',
    value: Number(totalValue),
    items: items.map((item) => ({
      item_id: String(item.id),
      item_name: item.name,
      item_category: item.category,
      price: Number(item.price || 0),
      quantity: Number(item.quantity || 1),
    })),
  });
}

/**
 * Track Completed Purchase / Order Placed
 * @param {string} orderId - Unique order number
 * @param {number} totalValue - Total order amount
 * @param {Array} items - List of ordered items
 */
export function trackPurchase(orderId, totalValue = 0, items = []) {
  trackEvent('purchase', {
    transaction_id: orderId,
    currency: 'NGN',
    value: Number(totalValue),
    items: items.map((item) => ({
      item_id: String(item.id),
      item_name: item.name,
      item_category: item.category,
      price: Number(item.price || 0),
      quantity: Number(item.quantity || 1),
    })),
  });
}
