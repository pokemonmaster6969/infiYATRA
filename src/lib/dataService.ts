import { ALL_TRIPS, Trip } from './trips'
import { heroSlides } from './data'

export interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
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
const VERSION_KEY = 'infi_yatra_version'
const CURRENT_VERSION = 5.0; // Increment this when making hardcoded data changes

// Sync logic: Clear stale cache if version mismatch
const syncData = () => {
  const savedVersion = localStorage.getItem(VERSION_KEY);
  if (!savedVersion || parseFloat(savedVersion) < CURRENT_VERSION) {
    console.log("Stale data detected. Syncing with fresh codebase...");
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ALL_TRIPS));
    localStorage.setItem(HERO_STORAGE_KEY, JSON.stringify(heroSlides));
    localStorage.setItem(VERSION_KEY, CURRENT_VERSION.toString());
  }
}

syncData();

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
  
  const localData = localStorage.getItem(STORAGE_KEY);
  return localData ? JSON.parse(localData) : ALL_TRIPS;
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
  // Also update localStorage so it's not lost
  const trips = await getTrips();
  const index = trips.findIndex(t => t.id === updatedTrip.id);
  if (index !== -1) {
    trips[index] = updatedTrip;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
  }
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
      // sync local
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...trips, addedTrip]));
      return addedTrip;
    }
  } catch (e) {
    console.error(e);
  }
  
  // Fallback local addition
  const trips = await getTrips();
  const id = Math.max(...trips.map(t => t.id), 0) + 1;
  const trip = { ...newTrip, id } as Trip;
  trips.push(trip);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
  return trip;
}

export const deleteTrip = async (id: number) => {
  try {
    await fetch(`/api/trips/${id}`, { method: 'DELETE' });
  } catch (e) {
    console.error(e);
  }
  const trips = await getTrips();
  const newTrips = trips.filter(t => t.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newTrips));
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
  localStorage.setItem(VERSION_KEY, CURRENT_VERSION.toString());
}

export const getCustomTrips = async (): Promise<CustomTripInquiry[]> => {
  try {
    const res = await fetch('/api/custom-trips');
    const isJson = res.headers.get('content-type')?.includes('application/json');
    if (res.ok && isJson) {
      const data = await res.json();
      if (data) return data;
    }
  } catch (e) {
    console.warn("Backend not running for custom trips.");
  }
  const localData = localStorage.getItem(CUSTOM_TRIPS_STORAGE_KEY);
  return localData ? JSON.parse(localData) : [];
}

export const addCustomTrip = async (inquiry: Omit<CustomTripInquiry, 'id' | 'createdAt'>): Promise<CustomTripInquiry> => {
  const newInquiry: CustomTripInquiry = {
    ...inquiry,
    createdAt: new Date().toISOString()
  };
  try {
    const res = await fetch('/api/custom-trips', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newInquiry)
    });
    if (res.ok) {
      const saved = await res.json();
      const items = await getCustomTrips();
      localStorage.setItem(CUSTOM_TRIPS_STORAGE_KEY, JSON.stringify([saved, ...items]));
      return saved;
    }
  } catch (e) {
    console.error(e);
  }
  const items = await getCustomTrips();
  const id = Date.now();
  const item = { ...newInquiry, id };
  const updated = [item, ...items];
  localStorage.setItem(CUSTOM_TRIPS_STORAGE_KEY, JSON.stringify(updated));
  return item;
}

export const deleteCustomTrip = async (id: number) => {
  try {
    await fetch(`/api/custom-trips/${id}`, { method: 'DELETE' });
  } catch (e) {
    console.error(e);
  }
  const items = await getCustomTrips();
  const filtered = items.filter(i => i.id !== id);
  localStorage.setItem(CUSTOM_TRIPS_STORAGE_KEY, JSON.stringify(filtered));
}

