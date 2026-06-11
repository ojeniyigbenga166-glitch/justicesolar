// =============================================
// JUSTICE GEORGENES SOLAR ENERGY
// Product Data Source — Fetches from Supabase
// =============================================
import { supabase } from './supabase.js';

// Hardcoded fallback products in case database is empty or offline
export const fallbackProducts = [
  {
    id: 1,
    slug: "5kva-hybrid-inverter",
    name: "5kVA Hybrid Inverter",
    category: "Inverters",
    brand: "Felicity Solar",
    price: 550000,
    stock: 12,
    image: "/product 1.png",
    gallery: ["/product 1.png", "/product 3.png", "/product 2.png"],
    shortDescription: "Smart hybrid inverter with MPPT charge controller and grid-tie features.",
    description: "The Felicity 5kVA Hybrid Inverter is a high-performance, all-in-one solar power solution designed for both residential and commercial applications. It combines a solar inverter, MPPT solar charge controller, and battery management system into a single, compact unit. Its intelligent power management system automatically switches between solar, battery, and grid power to ensure uninterrupted power supply while maximizing energy savings.",
    specifications: {
      "Rated Power": "5000W",
      "Input Voltage (DC)": "48V",
      "Output Voltage (AC)": "220V / 50Hz",
      "MPPT Voltage Range": "60–115V",
      "Max Solar Input": "6000W",
      "Battery Type": "Lithium / AGM / Gel",
      "Efficiency": "≥93%",
      "Weight": "12kg",
      "Warranty": "2 Years",
      "Certification": "CE, RoHS"
    },
    dateAdded: "2025-01-15"
  },
  {
    id: 2,
    slug: "5kwh-lithium-ion-battery",
    name: "5kWh Lithium-Ion Battery",
    category: "Batteries",
    brand: "HRESYS",
    price: 850000,
    stock: 8,
    image: "/product 2.png",
    gallery: ["/product 2.png", "/product 1.png", "/product 4.png"],
    shortDescription: "Long-lasting LiFePO4 energy storage with deep cycle capabilities.",
    description: "The HRESYS 5kWh LiFePO4 Battery is engineered for demanding solar energy storage applications. With its built-in Battery Management System (BMS), it offers superior protection against overcharge, over-discharge, and short circuits. The lithium iron phosphate chemistry provides over 4,000 charge cycles at 80% depth of discharge — dramatically outlasting traditional lead-acid alternatives.",
    specifications: {
      "Capacity": "5kWh / 100Ah @ 48V",
      "Battery Type": "LiFePO4 (Lithium Iron Phosphate)",
      "Nominal Voltage": "48V",
      "Cycle Life": "≥4,000 cycles (80% DoD)",
      "Max Charge Current": "50A",
      "Max Discharge Current": "100A",
      "Operating Temperature": "-10°C to 50°C",
      "Weight": "45kg",
      "Warranty": "3 Years",
      "Certification": "UN38.3, CE, IEC"
    },
    dateAdded: "2025-02-10"
  },
  {
    id: 3,
    slug: "450w-monocrystalline-panel",
    name: "450W Monocrystalline Panel",
    category: "Solar Panels",
    brand: "Jinko Solar",
    price: 120000,
    stock: 45,
    image: "/product 4.png",
    gallery: ["/product 4.png", "/product 3.png", "/product 1.png"],
    shortDescription: "High-efficiency mono panel for residential and commercial applications.",
    description: "The Jinko Solar 450W Monocrystalline Solar Panel uses premium-grade silicon cells with passivated emitter rear contact (PERC) technology to deliver industry-leading conversion efficiency. The half-cut cell design reduces resistive losses and improves performance under partial shading conditions, making it ideal for rooftop installations with complex shading environments.",
    specifications: {
      "Peak Power (Pmax)": "450Wp",
      "Panel Type": "Monocrystalline PERC",
      "Cell Efficiency": "21.3%",
      "Open Circuit Voltage (Voc)": "49.5V",
      "Short Circuit Current (Isc)": "11.6A",
      "Dimensions": "2094 × 1038 × 35mm",
      "Weight": "21.5kg",
      "Frame": "Anodized Aluminium Alloy",
      "Warranty": "25 Years (product), 30 Years (performance)",
      "Certification": "IEC 61215, IEC 61730"
    },
    dateAdded: "2025-01-05"
  },
  {
    id: 4,
    slug: "complete-5kva-solar-system",
    name: "Complete 5kVA Solar System",
    category: "Full Systems",
    brand: "Justice Georgenes",
    price: 3200000,
    stock: 4,
    image: "/product 3.png",
    gallery: ["/product 3.png", "/product 1.png", "/product 2.png", "/product 4.png"],
    shortDescription: "End-to-end home solar solution: panels, battery, inverter & installation.",
    description: "Our flagship Complete 5kVA Solar Home System is a turnkey solution designed and configured by our expert engineers. It includes a Felicity 5kVA hybrid inverter, a 5kWh LiFePO4 battery bank, 6 × 450W monocrystalline solar panels, all mounting hardware, cables, circuit breakers, and professional installation by our certified team. This system is designed to power a standard Nigerian home entirely off-grid.",
    specifications: {
      "System Capacity": "5kVA / 5kWh",
      "Inverter": "5kVA Felicity Hybrid",
      "Battery Bank": "5kWh LiFePO4 (48V)",
      "Solar Array": "6 × 450W = 2,700Wp",
      "Daily Output": "~10–12 kWh (5–6 sun hours)",
      "Includes": "All cables, breakers, mounting, monitoring",
      "Installation": "Included (Akure & environs)",
      "System Warranty": "2 Years full system",
      "Panel Warranty": "25 Years",
      "Lead Time": "5–7 business days"
    },
    dateAdded: "2025-03-01"
  },
  {
    id: 5,
    slug: "550w-half-cell-solar-panel",
    name: "550W Half-Cell Solar Panel",
    category: "Solar Panels",
    brand: "Canadian Solar",
    price: 145000,
    stock: 30,
    image: "/product 4.png",
    gallery: ["/product 4.png", "/product 2.png", "/product 3.png"],
    shortDescription: "Premium half-cell technology for superior performance in partial shading.",
    description: "The Canadian Solar 550W Half-Cut Cell panel employs advanced half-cell technology, splitting each cell in half to reduce internal resistance and heat generation. This design delivers up to 3% more power output compared to conventional full-cell panels, and is significantly more tolerant of partial shading — making it the premium choice for complex Nigerian rooftop installations.",
    specifications: {
      "Peak Power (Pmax)": "550Wp",
      "Panel Type": "Mono PERC Half-Cut",
      "Cell Configuration": "144 half-cells (6×24)",
      "Open Circuit Voltage (Voc)": "52.1V",
      "Short Circuit Current (Isc)": "13.5A",
      "Dimensions": "2278 × 1134 × 35mm",
      "Weight": "28kg",
      "Frame": "Anodized Silver Aluminium",
      "Warranty": "25 Years (product), 30 Years (performance)",
      "Certification": "IEC, MCS, UL"
    },
    dateAdded: "2025-02-20"
  },
  {
    id: 6,
    slug: "10kwh-lifepo4-wall-battery",
    name: "10kWh LifePO4 Wall Battery",
    category: "Batteries",
    brand: "Pylontech",
    price: 1600000,
    stock: 5,
    image: "/product 2.png",
    gallery: ["/product 2.png", "/product 1.png", "/product 4.png"],
    shortDescription: "Sleek wall-mounted lithium pack for modern homes and businesses.",
    description: "The Pylontech 10kWh LiFePO4 Wall-Mount Battery is the premium home storage solution for demanding loads. Its modular, stackable design allows capacity to be expanded in the future. The integrated RS485 and CAN bus communication ports enable seamless integration with leading hybrid inverters for intelligent energy management. Built to handle over 6,000 full charge cycles at 95% depth of discharge.",
    specifications: {
      "Capacity": "10kWh / 200Ah @ 48V",
      "Battery Type": "LiFePO4 (Lithium Iron Phosphate)",
      "Nominal Voltage": "48V",
      "Cycle Life": "≥6,000 cycles (95% DoD)",
      "Max Charge Current": "74A",
      "Max Discharge Current": "74A",
      "Communication": "RS485, CAN bus",
      "Weight": "93kg",
      "Warranty": "5 Years",
      "Certification": "UN38.3, CE, IEC, UL"
    },
    dateAdded: "2025-03-10"
  },
  {
    id: 7,
    slug: "solar-charge-controller-60a",
    name: "60A MPPT Charge Controller",
    category: "Accessories",
    brand: "Epever",
    price: 85000,
    stock: 20,
    image: "/product 1.png",
    gallery: ["/product 1.png", "/product 3.png"],
    shortDescription: "High-efficiency MPPT controller for optimized solar charging.",
    description: "The Epever 60A MPPT Charge Controller uses Maximum Power Point Tracking technology to extract up to 30% more energy from your solar panels compared to conventional PWM controllers. The large backlit LCD display provides real-time monitoring of PV input, battery status, and load output. Compatible with 12V, 24V, and 48V battery systems.",
    specifications: {
      "Rated Charge Current": "60A",
      "Max PV Open Circuit Voltage": "150V",
      "MPPT Voltage Range": "12–108V",
      "System Voltage": "12V / 24V / 36V / 48V (auto)",
      "Max PV Input Power": "2880W (48V system)",
      "Battery Types": "Sealed, Gel, Flooded, Lithium",
      "Display": "LCD backlit",
      "Weight": "1.95kg",
      "Warranty": "1 Year",
      "Certification": "CE, RoHS"
    },
    dateAdded: "2025-01-28"
  },
  {
    id: 8,
    slug: "solar-installation-kit",
    name: "Solar Installation Cable Kit",
    category: "Accessories",
    brand: "Justice Georgenes",
    price: 35000,
    stock: 0,
    image: "/product 3.png",
    gallery: ["/product 3.png", "/product 4.png"],
    shortDescription: "Complete cabling kit for a standard 5kVA solar installation.",
    description: "Our pre-assembled solar installation cable kit includes all the cables, connectors, and protection components needed for a standard 5kVA system installation. Everything is pre-cut to standard lengths, colour-coded, and supplied with MC4 connectors, cable ties, and mounting clips to make the installation clean and efficient.",
    specifications: {
      "PV Cable": "20m × 6mm² (UV resistant, red & black)",
      "Battery Cable": "3m × 70mm² (with lugs)",
      "AC Cable": "10m × 6mm²",
      "Includes": "MC4 connectors, cable ties, clips, ferrules",
      "PV Cable Rating": "1500VDC, 70°C",
      "Breakers": "2 × DC breaker, 1 × AC breaker",
      "Weight": "4.2kg",
      "Warranty": "1 Year on components"
    },
    dateAdded: "2025-04-01"
  }
];

// Mutatable exported product list
export let products = [...fallbackProducts];

/**
 * Fetch published products from Supabase and update the products array.
 * Falls back to local/hardcoded array if database is offline or empty.
 */
export async function fetchProducts() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (data && data.length > 0) {
      const fetched = data.map(p => {
        // Map database columns to storefront JS property keys
        return {
          id: p.id, // Keep UUID as string ID
          slug: p.slug || p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
          name: p.name,
          category: p.category || 'Accessories',
          brand: 'Justice Solar', // Default brand
          price: Number(p.price) || 0,
          stock: p.stock || 0,
          image: p.image_url || 'https://placehold.co/400x300/e2e8f0/475569?text=Product',
          gallery: p.image_url ? [p.image_url] : ['https://placehold.co/400x300/e2e8f0/475569?text=Product'],
          shortDescription: p.description ? p.description.split('.')[0] + '.' : 'High efficiency solar equipment.',
          description: p.description || 'No description provided.',
          specifications: {
            "Warranty": "2 Years",
            "Includes": "Standard Installation Support"
          },
          dateAdded: p.created_at || new Date().toISOString()
        };
      });

      // Clear the array and push new items in place
      products.length = 0;
      products.push(...fetched);
      console.log(`[Supabase Sync] Successfully loaded ${products.length} products.`);
    } else {
      console.log('[Supabase Sync] No published products found in database. Using fallbacks.');
    }
  } catch (err) {
    console.error('[Supabase Sync Failed] Loading fallback products list.', err);
  }
  return products;
}

export default products;
