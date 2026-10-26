import type { Trip } from './trips'
import { heroSlides } from './data'

export interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
}

export type LeadType = 'custom_trip' | 'corporate' | 'cruise' | 'package';
export type LeadStatus = 'New' | 'Contacted' | 'Quote Sent' | 'Confirmed' | 'Lost';

export interface Lead {
  id: number;
  type: LeadType;
  status: LeadStatus;
  createdAt: string;
  fullName: string;
  email: string;
  phone: string;
  destination: string;
  travelDate?: string;
  duration?: string;
  travelers?: number | string;
  groupType?: string;
  budget?: string;
  hotelTier?: string;
  interests?: string[];
  notes?: string;
  companyName?: string;
  designation?: string;
  preferredContactMethod?: string;
  preferredContactTime?: string;
  assignedTo?: string;
  internalNotes?: string;
  followUpDate?: string;
}

export interface CustomTripInquiry {
  id?: number;
  destination: string;
  startDate: string;
  duration: string;
  travelers: number;
  groupType: string;
  budget: string;
  hotelTier: string;
  flightsNeeded: boolean;
  fullName: string;
  email: string;
  phone: string;
  specialRequests?: string;
  createdAt?: string;
}

export interface CorporateTestimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  teamSize: string;
  photo?: string;
}

export interface CorporatePhoto {
  id: string;
  url: string;
  title: string;
  caption?: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
}

export interface MediaAsset {
  id: string;
  url: string;
  title: string;
  altText: string;
  caption?: string;
  createdAt: string;
}

// Utility to optimize Unsplash images for performance
export const optimizeImageUrl = (url: string, width = 1200, quality = 80) => {
  if (url.includes('images.unsplash.com')) {
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?auto=format&fit=crop&q=${quality}&w=${width}`;
  }
  return url;
};

const STORAGE_KEY = 'infi_yatra_trips'
const HERO_STORAGE_KEY = 'infi_yatra_hero'
const CUSTOM_TRIPS_STORAGE_KEY = 'infi_yatra_custom_trips'
const LEADS_STORAGE_KEY = 'infi_yatra_leads'
const CORP_TESTIMONIALS_KEY = 'infi_yatra_corp_testimonials'
const CORP_PHOTOS_KEY = 'infi_yatra_corp_photos'
const AUDIT_LOGS_KEY = 'infi_yatra_audit_logs'
const MEDIA_ASSETS_KEY = 'infi_yatra_media_assets'
const VERSION_KEY = 'infi_yatra_version'
const CURRENT_VERSION = 8.0; // Bumped to sync 5 cruises and rich models

const DEFAULT_CORPORATE_TESTIMONIALS: CorporateTestimonial[] = [
  {
    id: 'ct-1',
    quote: "Infi Yatra planned our annual executive retreat to Himachal for 45 leaders. Flawless execution, high-altitude strategy sessions, and unbelievable team bonding.",
    author: "Rajesh Varma",
    role: "VP of People & Culture",
    company: "TechCorp India",
    rating: 5,
    teamSize: "45 Members"
  },
  {
    id: 'ct-2',
    quote: "The Goa Coastal Cruise retreat for our engineering squad was the best corporate offsite in 8 years. Everything from private deck banquet to team rafting was curated to perfection.",
    author: "Ananya Mehta",
    role: "HR Director",
    company: "CloudScale Systems",
    rating: 5,
    teamSize: "80 Members"
  },
  {
    id: 'ct-3',
    quote: "Professionalism at its finest! Captain Rohan and the Infi Yatra team handled our 120-person MICE trip to Bali seamlessly. 100% recommended for company retreats.",
    author: "Karan Patel",
    role: "Chief Operating Officer",
    company: "Apex Global Labs",
    rating: 5,
    teamSize: "120 Members"
  }
];

const DEFAULT_CORPORATE_PHOTOS: CorporatePhoto[] = [
  { id: 'cp-1', url: '/assets/group2.jpeg', title: 'Mountain Summit Team Expedition', caption: 'Executive offsite in Solang Valley' },
  { id: 'cp-2', url: '/assets/group.jpeg', title: 'Bonfire & Acoustic Evening', caption: 'Campfire storytelling and musical networking' },
  { id: 'cp-3', url: '/assets/PFC.jpeg', title: 'Leadership Strategy Retreat', caption: 'Pine forest breakout workshop' },
  { id: 'cp-4', url: '/assets/himal.jpg', title: 'Solang Valley River Rafting', caption: 'White-water team challenge' },
  { id: 'cp-5', url: '/assets/beaut.jpg', title: 'Executive Sunrise Keynotes', caption: 'Dawn alignment session' },
  { id: 'cp-6', url: '/assets/goa.jpg', title: 'Goa Coastal Cruise Banquet', caption: 'Private deck regatta party' }
];

const DEFAULT_MEDIA_ASSETS: MediaAsset[] = [
  { id: 'm-1', url: '/assets/spiti.jpg', title: 'Spiti Valley Monasteries', altText: 'Ancient Buddhist monastery perched on Spiti cliffs', createdAt: new Date().toISOString() },
  { id: 'm-2', url: '/assets/goa.jpg', title: 'Goa Golden Shore', altText: 'Tropical palm-fringed coast of Goa', createdAt: new Date().toISOString() },
  { id: 'm-3', url: '/assets/dubai.jpg', title: 'Arabian Cruise Liner', altText: 'Luxury mega cruise sailing in Arabian waters', createdAt: new Date().toISOString() },
  { id: 'm-4', url: '/assets/bali.jpg', title: 'Bali Sacred Temples', altText: 'Balinese pagoda temple nestled in lush tropical flora', createdAt: new Date().toISOString() },
  { id: 'm-5', url: '/assets/group2.jpeg', title: 'Corporate Expedition Group', altText: 'Team celebrating summit achievement in the Himalayas', createdAt: new Date().toISOString() }
];

const DEFAULT_INITIAL_LEADS: Lead[] = [
  {
    id: 1730000001,
    type: 'custom_trip',
    status: 'New',
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    fullName: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    destination: 'Spiti Valley & Chandratal Lake',
    travelDate: 'May 18, 2026',
    duration: '8 Nights',
    travelers: 2,
    groupType: 'Couple',
    budget: '₹40,000 - ₹60,000 / person',
    hotelTier: '4-Star Premium',
    interests: ['Adventure', 'Nature', 'Culture'],
    notes: 'Looking for a private stargazing camp at Chandratal.',
    preferredContactMethod: 'WhatsApp',
    preferredContactTime: 'Evening'
  },
  {
    id: 1730000002,
    type: 'corporate',
    status: 'Contacted',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    fullName: 'Pooja Kulkarni',
    email: 'pooja@fintechinnovations.in',
    phone: '+91 98234 56789',
    companyName: 'Fintech Innovations India',
    designation: 'Head of Operations',
    destination: 'Goa Coastal Retreat',
    travelDate: 'Nov 12, 2026',
    duration: '4 Days / 3 Nights',
    travelers: 65,
    groupType: 'Corporate Squad',
    budget: '₹25,000 / person',
    hotelTier: '5-Star Beach Resort',
    notes: 'Need conference hall for 65 pax on Day 2 morning, plus sunset catamaran charter.',
    preferredContactMethod: 'Phone Call',
    preferredContactTime: 'Morning'
  },
  {
    id: 1730000003,
    type: 'cruise',
    status: 'Quote Sent',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    fullName: 'Vikram & Priya Singhania',
    email: 'singhania.v@gmail.com',
    phone: '+91 99100 23456',
    destination: 'Singapore, Penang & Phuket Discovery Cruise',
    travelDate: 'Dec 05, 2026',
    duration: '7 Days',
    travelers: 4,
    groupType: 'Family',
    budget: '₹80,000 / person',
    hotelTier: 'Balcony Stateroom',
    notes: 'Inquiring for 2 connecting Balcony staterooms.',
    preferredContactMethod: 'WhatsApp'
  }
];

const getFallbackTrips = async (): Promise<Trip[]> => {
  const savedVersion = localStorage.getItem(VERSION_KEY);
  const isCustomEdited = localStorage.getItem('infi_hero_custom_edited');

  if (!savedVersion || parseFloat(savedVersion) < CURRENT_VERSION) {
    console.log("Syncing fresh seed data into client cache (v" + CURRENT_VERSION + ")...");
    const { ALL_TRIPS } = await import('./trips');
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ALL_TRIPS));
    if (!isCustomEdited) {
      localStorage.setItem(HERO_STORAGE_KEY, JSON.stringify(heroSlides));
    }
    localStorage.setItem(VERSION_KEY, CURRENT_VERSION.toString());
    return ALL_TRIPS;
  }

  const localData = localStorage.getItem(STORAGE_KEY);
  if (localData) return JSON.parse(localData) as Trip[];

  const { ALL_TRIPS } = await import('./trips');
  return ALL_TRIPS;
}

export const resetHeroSlides = () => {
  localStorage.removeItem('infi_hero_custom_edited');
  localStorage.setItem(HERO_STORAGE_KEY, JSON.stringify(heroSlides));
  localStorage.setItem(VERSION_KEY, CURRENT_VERSION.toString());
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('hero_slides_updated'));
  }
}

export const getTrips = async (): Promise<Trip[]> => {
  try {
    const res = await fetch('/api/trips');
    const isJson = res.headers.get('content-type')?.includes('application/json');
    if (res.ok && isJson) {
      const data = await res.json();
      if (data && data.length > 0) return data;
    }
  } catch (e) {
    console.warn("Backend not running. Using local storage/codebase.");
  }
  
  return getFallbackTrips();
}

export const getTripById = async (id: number): Promise<Trip | undefined> => {
  const trips = await getTrips();
  return trips.find(t => t.id === id);
}

export const updateTrip = async (updatedTrip: Trip) => {
  try {
    await fetch(`/api/trips/${updatedTrip.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTrip),
    });
  } catch (e) {
    console.error(e);
  }
  const trips = await getTrips();
  const index = trips.findIndex(t => t.id === updatedTrip.id);
  if (index !== -1) {
    trips[index] = updatedTrip;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
  }
  await addAuditLog({
    user: 'Admin',
    action: 'Package Updated',
    details: `Updated package "${updatedTrip.title}" (#${updatedTrip.id})`
  });
}

export const addTrip = async (newTrip: Omit<Trip, 'id'>) => {
  try {
    const res = await fetch('/api/trips', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTrip),
    });
    const isJson = res.headers.get('content-type')?.includes('application/json');
    if (res.ok && isJson) {
      const addedTrip = await res.json();
      const trips = await getTrips();
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...trips, addedTrip]));
      await addAuditLog({
        user: 'Admin',
        action: 'Package Created',
        details: `Created package "${addedTrip.title}" (#${addedTrip.id})`
      });
      return addedTrip;
    }
  } catch (e) {
    console.error(e);
  }
  
  const trips = await getTrips();
  const id = Math.max(...trips.map(t => t.id), 0) + 1;
  const trip = { ...newTrip, id } as Trip;
  trips.push(trip);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
  await addAuditLog({
    user: 'Admin',
    action: 'Package Created',
    details: `Created package "${trip.title}" (#${trip.id})`
  });
  return trip;
}

export const deleteTrip = async (id: number) => {
  const trips = await getTrips();
  const existing = trips.find(t => t.id === id);
  try {
    await fetch(`/api/trips/${id}`, { method: 'DELETE' });
  } catch (e) {
    console.error(e);
  }
  const newTrips = trips.filter(t => t.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newTrips));
  await addAuditLog({
    user: 'Admin',
    action: 'Package Deleted',
    details: `Deleted package "${existing?.title || id}" (#${id})`
  });
}

export const getHeroSlides = async (): Promise<HeroSlide[]> => {
  try {
    const res = await fetch('/api/heroSlides');
    const isJson = res.headers.get('content-type')?.includes('application/json');
    if (res.ok && isJson) {
      const data = await res.json();
      if (data && data.length > 0) return data;
    }
  } catch (e) {
    console.warn("Backend not running. Using local storage/codebase.");
  }
  const localData = localStorage.getItem(HERO_STORAGE_KEY);
  return localData ? JSON.parse(localData) : heroSlides;
}

export const updateHeroSlides = async (slides: HeroSlide[]) => {
  try {
    await fetch('/api/heroSlides', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(slides),
    });
  } catch(e) { console.error(e); }
  localStorage.setItem(HERO_STORAGE_KEY, JSON.stringify(slides));
  localStorage.setItem('infi_hero_custom_edited', 'true');
  localStorage.setItem(VERSION_KEY, CURRENT_VERSION.toString());
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('hero_slides_updated'));
  }
  await addAuditLog({
    user: 'Admin',
    action: 'Hero Slides Updated',
    details: `Updated ${slides.length} homepage carousel slides`
  });
}

// ─── LEADS & INQUIRIES MANAGEMENT ──────────────────────────────
export const getLeads = async (): Promise<Lead[]> => {
  try {
    const res = await fetch('/api/leads');
    const isJson = res.headers.get('content-type')?.includes('application/json');
    if (res.ok && isJson) {
      const data = await res.json();
      if (data && data.length > 0) return data;
    }
  } catch (e) {
    console.warn("Backend leads endpoint not available.");
  }

  const local = localStorage.getItem(LEADS_STORAGE_KEY);
  if (local) return JSON.parse(local);

  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(DEFAULT_INITIAL_LEADS));
  return DEFAULT_INITIAL_LEADS;
}

export const addLead = async (leadData: Omit<Lead, 'id' | 'createdAt' | 'status'> & { status?: LeadStatus }): Promise<Lead> => {
  const newLead: Lead = {
    ...leadData,
    id: Date.now(),
    status: leadData.status || 'New',
    createdAt: new Date().toISOString()
  };

  try {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLead)
    });
    if (res.ok) {
      const saved = await res.json();
      const current = await getLeads();
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify([saved, ...current]));
      await addAuditLog({
        user: 'System',
        action: 'New Lead Inbound',
        details: `${newLead.type.toUpperCase()}: ${newLead.fullName} for ${newLead.destination}`
      });
      return saved;
    }
  } catch (e) {
    console.error(e);
  }

  const current = await getLeads();
  const updated = [newLead, ...current];
  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
  await addAuditLog({
    user: 'System',
    action: 'New Lead Inbound',
    details: `${newLead.type.toUpperCase()}: ${newLead.fullName} for ${newLead.destination}`
  });
  return newLead;
}

export const updateLead = async (lead: Lead): Promise<Lead> => {
  try {
    await fetch(`/api/leads/${lead.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead)
    });
  } catch (e) {
    console.error(e);
  }
  const list = await getLeads();
  const idx = list.findIndex(l => l.id === lead.id);
  if (idx !== -1) {
    list[idx] = lead;
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(list));
  }
  await addAuditLog({
    user: 'Admin',
    action: 'Lead Status Changed',
    details: `Updated Lead #${lead.id} (${lead.fullName}) -> ${lead.status}`
  });
  return lead;
}

export const deleteLead = async (id: number): Promise<void> => {
  try {
    await fetch(`/api/leads/${id}`, { method: 'DELETE' });
  } catch (e) {
    console.error(e);
  }
  const list = await getLeads();
  const filtered = list.filter(l => l.id !== id);
  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(filtered));
  await addAuditLog({
    user: 'Admin',
    action: 'Lead Removed',
    details: `Removed Lead #${id}`
  });
}

// Backward compatibility for existing custom trips
export const getCustomTrips = async (): Promise<CustomTripInquiry[]> => {
  const leads = await getLeads();
  return leads.filter(l => l.type === 'custom_trip').map(l => ({
    id: l.id,
    destination: l.destination,
    startDate: l.travelDate || 'Flexible',
    duration: l.duration || '5-7 Days',
    travelers: typeof l.travelers === 'number' ? l.travelers : 2,
    groupType: l.groupType || 'Travelers',
    budget: l.budget || '',
    hotelTier: l.hotelTier || '',
    flightsNeeded: true,
    fullName: l.fullName,
    email: l.email,
    phone: l.phone,
    specialRequests: l.notes,
    createdAt: l.createdAt
  }));
}

export const addCustomTrip = async (inquiry: Omit<CustomTripInquiry, 'id' | 'createdAt'>): Promise<CustomTripInquiry> => {
  const lead = await addLead({
    type: inquiry.destination.startsWith('[CORPORATE]') ? 'corporate' : 'custom_trip',
    fullName: inquiry.fullName,
    email: inquiry.email,
    phone: inquiry.phone,
    destination: inquiry.destination,
    travelDate: inquiry.startDate,
    duration: inquiry.duration,
    travelers: inquiry.travelers,
    groupType: inquiry.groupType,
    budget: inquiry.budget,
    hotelTier: inquiry.hotelTier,
    notes: inquiry.specialRequests
  });

  return {
    ...inquiry,
    id: lead.id,
    createdAt: lead.createdAt
  };
}

export const deleteCustomTrip = async (id: number) => {
  return deleteLead(id);
}

// ─── CORPORATE CONTENT ─────────────────────────────────────────
export const getCorporateTestimonials = async (): Promise<CorporateTestimonial[]> => {
  try {
    const res = await fetch('/api/corporate/testimonials');
    if (res.ok) {
      const data = await res.json();
      if (data && data.length > 0) return data;
    }
  } catch (e) {}

  const local = localStorage.getItem(CORP_TESTIMONIALS_KEY);
  if (local) return JSON.parse(local);
  localStorage.setItem(CORP_TESTIMONIALS_KEY, JSON.stringify(DEFAULT_CORPORATE_TESTIMONIALS));
  return DEFAULT_CORPORATE_TESTIMONIALS;
}

export const saveCorporateTestimonials = async (testimonials: CorporateTestimonial[]) => {
  try {
    await fetch('/api/corporate/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testimonials)
    });
  } catch (e) {}
  localStorage.setItem(CORP_TESTIMONIALS_KEY, JSON.stringify(testimonials));
  await addAuditLog({
    user: 'Admin',
    action: 'Corporate Testimonials Updated',
    details: `Updated ${testimonials.length} corporate testimonials`
  });
}

export const getCorporatePhotos = async (): Promise<CorporatePhoto[]> => {
  try {
    const res = await fetch('/api/corporate/photos');
    if (res.ok) {
      const data = await res.json();
      if (data && data.length > 0) return data;
    }
  } catch (e) {}

  const local = localStorage.getItem(CORP_PHOTOS_KEY);
  if (local) return JSON.parse(local);
  localStorage.setItem(CORP_PHOTOS_KEY, JSON.stringify(DEFAULT_CORPORATE_PHOTOS));
  return DEFAULT_CORPORATE_PHOTOS;
}

export const saveCorporatePhotos = async (photos: CorporatePhoto[]) => {
  try {
    await fetch('/api/corporate/photos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(photos)
    });
  } catch (e) {}
  localStorage.setItem(CORP_PHOTOS_KEY, JSON.stringify(photos));
  await addAuditLog({
    user: 'Admin',
    action: 'Corporate Photos Updated',
    details: `Updated ${photos.length} corporate gallery photos`
  });
}

// ─── AUDIT LOGGING ─────────────────────────────────────────────
export const getAuditLogs = async (): Promise<AuditLogItem[]> => {
  try {
    const res = await fetch('/api/audit-logs');
    if (res.ok) {
      const data = await res.json();
      if (data && data.length > 0) return data;
    }
  } catch (e) {}

  const local = localStorage.getItem(AUDIT_LOGS_KEY);
  return local ? JSON.parse(local) : [
    {
      id: 'log-seed-1',
      timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
      user: 'Super Admin',
      action: 'System Initialized',
      details: 'Audit log subsystem activated with data-driven models'
    }
  ];
}

export const addAuditLog = async (logItem: Omit<AuditLogItem, 'id' | 'timestamp'>): Promise<void> => {
  const item: AuditLogItem = {
    ...logItem,
    id: 'log-' + Date.now(),
    timestamp: new Date().toISOString()
  };

  try {
    await fetch('/api/audit-logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
  } catch (e) {}

  const local = localStorage.getItem(AUDIT_LOGS_KEY);
  const list: AuditLogItem[] = local ? JSON.parse(local) : [];
  list.unshift(item);
  if (list.length > 100) list.pop();
  localStorage.setItem(AUDIT_LOGS_KEY, JSON.stringify(list));
}

// ─── MEDIA ASSETS MANAGER ──────────────────────────────────────
export const getMediaAssets = async (): Promise<MediaAsset[]> => {
  try {
    const res = await fetch('/api/media');
    if (res.ok) {
      const data = await res.json();
      if (data && data.length > 0) return data;
    }
  } catch (e) {}

  const local = localStorage.getItem(MEDIA_ASSETS_KEY);
  if (local) return JSON.parse(local);
  localStorage.setItem(MEDIA_ASSETS_KEY, JSON.stringify(DEFAULT_MEDIA_ASSETS));
  return DEFAULT_MEDIA_ASSETS;
}

export const addMediaAsset = async (asset: Omit<MediaAsset, 'id' | 'createdAt'>): Promise<MediaAsset> => {
  const newAsset: MediaAsset = {
    ...asset,
    id: 'media-' + Date.now(),
    createdAt: new Date().toISOString()
  };

  try {
    const res = await fetch('/api/media', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAsset)
    });
    if (res.ok) {
      const saved = await res.json();
      const list = await getMediaAssets();
      localStorage.setItem(MEDIA_ASSETS_KEY, JSON.stringify([saved, ...list]));
      return saved;
    }
  } catch (e) {}

  const list = await getMediaAssets();
  const updated = [newAsset, ...list];
  localStorage.setItem(MEDIA_ASSETS_KEY, JSON.stringify(updated));
  await addAuditLog({
    user: 'Admin',
    action: 'Media Uploaded',
    details: `Added media asset "${newAsset.title}"`
  });
  return newAsset;
}

export const deleteMediaAsset = async (id: string): Promise<void> => {
  try {
    await fetch(`/api/media/${id}`, { method: 'DELETE' });
  } catch (e) {}
  const list = await getMediaAssets();
  const filtered = list.filter(m => m.id !== id);
  localStorage.setItem(MEDIA_ASSETS_KEY, JSON.stringify(filtered));
  await addAuditLog({
    user: 'Admin',
    action: 'Media Deleted',
    details: `Removed media asset #${id}`
  });
}
