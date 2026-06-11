// =============================================
// JUSTICE GEORGENES SOLAR ENERGY
// Project Data Source — Fetches from Supabase
// =============================================
import { supabase } from './supabase.js';

// Hardcoded fallback projects in case database is empty or offline
export const fallbackProjects = [
  {
    id: 1,
    name: 'Modern Home Solar Installation',
    category: 'Residential Solar',
    image_url: '/project 1.jpg',
    description: 'Complete 6kW solar system installed on a beautiful suburban home, reducing energy bills by 85%.'
  },
  {
    id: 5,
    name: 'Corporate Office Solar System',
    category: 'Commercial Solar',
    image_url: '/project 5.jpg',
    description: '50kW commercial solar installation for a Fortune 500 office building in downtown Lagos.'
  },
  {
    id: 9,
    name: 'Residential Battery System',
    category: 'Battery Storage',
    image_url: '/project 9.jpg',
    description: '15kWh lithium battery storage system ensuring uninterrupted power during outages.'
  },
  {
    id: 13,
    name: 'Panel Cleaning & Maintenance',
    category: 'Maintenance & Repair',
    image_url: '/project 13.jpg',
    description: 'Professional solar panel cleaning service maintaining optimal efficiency year-round.'
  },
  {
    id: 17,
    name: 'Residential Energy Audit',
    category: 'Solar Consultation',
    image_url: '/project 7.jpg',
    description: 'Comprehensive home energy assessment determining optimal solar system size for maximum ROI.'
  }
];

// Mutable exported projects list
export let projects = [...fallbackProjects];

/**
 * Fetch projects from Supabase and update the projects array.
 * Falls back to local/hardcoded array if database is offline or empty.
 */
export async function fetchProjects() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[Supabase Sync] RLS Policy or Fetch Error:', error.message);
      throw error;
    }

    if (data && data.length > 0) {
      // Clear and repopulate with live data
      projects.length = 0;
      projects.push(...data);
      console.log(`[Supabase Sync] Successfully loaded ${projects.length} projects.`);
    } else {
      console.log('[Supabase Sync] No projects found. Using fallback data.');
    }
  } catch (err) {
    console.error('[Supabase Sync Failed] Loading fallback projects.', err);
  }
  return projects;
}

export default projects;
