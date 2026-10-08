import { getWhatsAppLink } from './data';

export interface Trip {
  id: number;
  title: string;
  location: string;
  price: string;
  rating: number;
  reviews: number;
  duration: string;
  category: string;
  type: 'Domestic' | 'International';
  image: string;
  link: string;
  description: string;
  images: string[];
  videoThumbnail?: string;
  groupSize: string;
  nextBatch: string;
  featured?: boolean;
  highlights: string[];
  captain: {
    name: string;
    role: string;
    bio: string;
    avatar: string;
    rating: number;
    trips: number;
  };
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
}

const DEFAULT_CAPTAIN = {
  name: 'Captain Rohan Shah',
  role: 'Lead Expedition Specialist',
  bio: 'Expert in high-altitude trekking and local storytelling.',
  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
  rating: 5.0,
  trips: 45
};

export const ALL_TRIPS: Trip[] = [
  // ─── DOMESTIC ADVENTURES ────────────────────────────────────────
  {
    id: 1,
    title: 'Spiti Valley Expedition',
    location: 'Shimla, Kaza, Manali',
    price: '19,999',
    rating: 4.8,
    reviews: 245,
    duration: '8 Days / 7 Nights',
    category: 'Adventure',
    type: 'Domestic',
    featured: true,
    image: '/assets/spiti.jpg',
    link: '/spiti-valley',
    description: 'Journey through the rugged landscapes of Spiti Valley. Drive along the Indo-Tibetan highway, visit ancient monasteries, and camp under the starry sky at Chandratal Lake.',
    images: ['/assets/spiti.jpg'],
    groupSize: '12-15 Persons',
    nextBatch: 'May 15, 2026',
    highlights: ['Key Monastery Visit', 'Chandratal Lake Camping', 'Kibber Village', 'Kunzum Pass', 'Highest Post Office Hikkim'],
    captain: DEFAULT_CAPTAIN,
    itinerary: [
      { day: 1, title: 'Arrival in Shimla & Drive to Narkanda', description: 'Meet your group and start the beautiful drive through pine forests to Narkanda.' },
      { day: 2, title: 'Narkanda to Chitkul', description: 'Drive to the last Indian village before the Tibet border, breathing in the fresh mountain air.' },
      { day: 3, title: 'Chitkul to Kalpa', description: 'Witness the majestic Kinnaur Kailash range from the beautiful village of Kalpa.' },
      { day: 4, title: 'Kalpa to Kaza via Nako & Tabo', description: 'Cross into the barren landscapes of Spiti, visiting the Nako Lake and Tabo Monastery en route.' },
      { day: 5, title: 'Kaza — Key, Kibber, Hikkim, Komic', description: 'Visit Key Monastery, the high-altitude villages of Kibber, Hikkim (highest post office), and Komic.' },
      { day: 6, title: 'Kaza to Chandratal Lake', description: 'Drive over the mighty Kunzum Pass and camp near the crescent-shaped Chandratal Lake.' },
      { day: 7, title: 'Chandratal to Manali via Rohtang', description: 'Off-roading experience over the Rohtang Pass down into the lush Kullu Valley.' },
      { day: 8, title: 'Departure from Manali', description: 'Trip ends with a lifetime of memories. Drop at Manali bus stand/airport.' }
    ]
  },
  {
    id: 2,
    title: 'Leh Ladakh Road Trip',
    location: 'Leh, Nubra, Pangong, Turtuk',
    price: '24,999',
    rating: 4.9,
    reviews: 412,
    duration: '7 Days / 6 Nights',
    category: 'Adventure',
    type: 'Domestic',
    featured: true,
    image: '/assets/himalayas-bg.jpg',
    link: '/leh-ladakh',
    description: 'Experience the ultimate road trip to the Land of High Passes. Marvel at the changing colors of Pangong Tso, ride double-humped camels in Nubra Valley, and conquer Khardung La.',
    images: ['/assets/Ladakh2.jpg'],
    groupSize: '10-15 Persons',
    nextBatch: 'Jun 10, 2026',
    highlights: ['Khardung La Pass 18,380 ft', 'Pangong Tso Lake', 'Double-Humped Camel Ride', 'Turtuk Village', 'Magnetic Hill'],
    captain: DEFAULT_CAPTAIN,
    itinerary: [
      { day: 1, title: 'Arrival in Leh — Acclimatization', description: 'Acclimatize to the high altitude. Visit Shanti Stupa and Leh Palace in the evening.' },
      { day: 2, title: 'Leh to Nubra Valley via Khardung La', description: 'Drive over Khardung La, one of the highest motorable roads. Enjoy the sand dunes in Hunder.' },
      { day: 3, title: 'Turtuk Village Excursion', description: 'Day trip to the breathtaking Turtuk village near the LoC, experiencing Balti culture.' },
      { day: 4, title: 'Nubra to Pangong Tso via Shyok', description: 'Drive alongside the Shyok river to reach the magnificent blue waters of Pangong Lake.' },
      { day: 5, title: 'Pangong to Leh via Chang La', description: 'Sunrise at the lake, then drive back to Leh via Chang La pass.' },
      { day: 6, title: 'Leh Local Sightseeing', description: 'Explore Magnetic Hill, Pathar Sahib Gurudwara, Hall of Fame, and Sangam point.' },
      { day: 7, title: 'Departure from Leh', description: 'Fly out of Leh with incredible Himalayan memories.' }
    ]
  },
  {
    id: 3,
    title: 'Kashmir Paradise',
    location: 'Srinagar, Gulmarg, Pahalgam, Sonmarg',
    price: '19,499',
    rating: 4.9,
    reviews: 320,
    duration: '6 Days / 5 Nights',
    category: 'Nature',
    type: 'Domestic',
    featured: true,
    image: '/assets/kashmir.jpg',
    link: '/kashmir',
    description: 'Step into paradise on earth. Stay on a traditional houseboat on Dal Lake, ride the Gulmarg Gondola to 14,000 ft, and wander through the pine-scented valleys of Pahalgam and Sonmarg.',
    images: ['/assets/kashmir.jpg'],
    groupSize: '10-12 Persons',
    nextBatch: 'Dec 20, 2026',
    highlights: ['Houseboat Stay on Dal Lake', 'Gulmarg Gondola Phase 1 & 2', 'Betaab Valley', 'Sonmarg Thajiwas Glacier', 'Mughal Gardens'],
    captain: DEFAULT_CAPTAIN,
    itinerary: [
      { day: 1, title: 'Arrival in Srinagar', description: 'Check into a traditional houseboat on Dal Lake. Evening Shikara ride past floating gardens.' },
      { day: 2, title: 'Srinagar to Gulmarg', description: 'Drive to the meadow of flowers. Take the famous Gondola cable car to Apharwat Peak at 14,000 ft.' },
      { day: 3, title: 'Gulmarg to Pahalgam', description: 'Drive through saffron fields and apple orchards to the Valley of Shepherds.' },
      { day: 4, title: 'Pahalgam — Betaab, Aru, Chandanwari', description: 'Full day exploring the stunning Betaab Valley, Aru Valley, and Chandanwari.' },
      { day: 5, title: 'Pahalgam to Sonmarg', description: 'Drive to Sonmarg. Visit Thajiwas Glacier and enjoy the dramatic Zoji La views.' },
      { day: 6, title: 'Sonmarg to Srinagar & Departure', description: 'Return to Srinagar. Visit Mughal Gardens and depart from the heavenly valley.' }
    ]
  },
  {
    id: 4,
    title: 'Backpacking Meghalaya',
    location: 'Shillong, Cherrapunji, Dawki',
    price: '17,999',
    rating: 4.7,
    reviews: 189,
    duration: '6 Days / 5 Nights',
    category: 'Backpacking',
    type: 'Domestic',
    image: '/assets/meghaa.jpg',
    link: '/meghalaya',
    description: 'Dive into the Abode of Clouds. Trek to the magical double-decker living root bridges, explore ancient limestone caves, and boat on the crystal-clear waters of the Umngot River at Dawki.',
    images: ['/assets/meghaa.jpg'],
    groupSize: '10-15 Persons',
    nextBatch: 'Sep 10, 2026',
    highlights: ['Double Decker Living Root Bridge', 'Dawki River Boating', 'Mawsmai Caves', 'Nohkalikai Falls', 'Krang Suri Waterfalls'],
    captain: DEFAULT_CAPTAIN,
    itinerary: [
      { day: 1, title: 'Guwahati to Shillong', description: 'Arrive in Guwahati and drive to the Scotland of the East. Visit Umiam Lake en route.' },
      { day: 2, title: 'Shillong to Cherrapunji', description: 'Visit Nohkalikai Falls, Seven Sisters Falls, and explore the Mawsmai limestone caves.' },
      { day: 3, title: 'Nongriat Trek — Living Root Bridges', description: 'Hike down 3,500 steps to witness the bio-engineering marvel of the Double Decker Living Root Bridge.' },
      { day: 4, title: 'Cherrapunji to Dawki', description: 'Drive to the Bangladesh border. Enjoy boating on the crystal clear waters of the Umngot River.' },
      { day: 5, title: 'Dawki to Shillong via Krang Suri', description: 'Visit the magical blue waters of Krang Suri waterfalls before heading back to Shillong.' },
      { day: 6, title: 'Departure via Guwahati', description: 'Drive back to Guwahati for your onward journey.' }
    ]
  },
  {
    id: 5,
    title: 'Kerala Backwaters & Hills',
    location: 'Munnar, Thekkady, Alleppey, Kochi',
    price: '18,499',
    rating: 4.8,
    reviews: 210,
    duration: '6 Days / 5 Nights',
    category: 'Nature',
    type: 'Domestic',
    image: '/assets/kerelabeach.jpg',
    link: '/kerala',
    description: 'God\'s Own Country at its finest. Wander through emerald tea gardens of Munnar, spot wild elephants at Periyar, cruise through palm-fringed backwaters of Alleppey on a luxury houseboat.',
    images: ['/assets/kerelabeach.jpg'],
    groupSize: '10-12 Persons',
    nextBatch: 'Nov 05, 2026',
    highlights: ['Alleppey Houseboat Stay', 'Munnar Tea Plantations', 'Periyar Wildlife Sanctuary', 'Kathakali Dance Show', 'Spice Plantation Tour'],
    captain: DEFAULT_CAPTAIN,
    itinerary: [
      { day: 1, title: 'Kochi to Munnar', description: 'Drive through winding roads to the tea hills of Munnar. En route visit Cheeyappara Waterfalls and spice gardens.' },
      { day: 2, title: 'Munnar Sightseeing', description: 'Explore Eravikulam National Park (Nilgiri Tahr habitat), Mattupetty Dam, Tea Museum, and Top Station.' },
      { day: 3, title: 'Munnar to Thekkady', description: 'Travel to Periyar Tiger Reserve. Enjoy bamboo rafting and an authentic spice plantation tour.' },
      { day: 4, title: 'Thekkady to Alleppey', description: 'Board a luxury houseboat. Cruise through palm-fringed backwaters with fresh Kerala cuisine on board.' },
      { day: 5, title: 'Alleppey to Kochi', description: 'Morning cruise continuation. Drive to Kochi. Visit Fort Kochi, Chinese fishing nets, and attend a Kathakali show.' },
      { day: 6, title: 'Departure from Kochi', description: 'Transfer to Kochi airport for your departure flight.' }
    ]
  },
  {
    id: 6,
    title: 'Andaman Island Escape',
    location: 'Port Blair, Havelock, Neil Island',
    price: '34,999',
    rating: 5.0,
    reviews: 145,
    duration: '7 Days / 6 Nights',
    category: 'Beach',
    type: 'Domestic',
    image: '/assets/andaman.jpg',
    link: '/andaman',
    description: 'Unwind on Asia\'s best beaches with crystal-clear turquoise waters. Dive into vibrant coral reefs at Havelock, witness history at Cellular Jail, and chase sunsets at Radhanagar Beach.',
    images: ['/assets/andaman.jpg'],
    groupSize: '8-12 Persons',
    nextBatch: 'Jan 12, 2027',
    highlights: ['Scuba Diving at Elephant Beach', 'Radhanagar Beach — Asia\'s Best', 'Cellular Jail Light & Sound Show', 'Glass-Bottom Boat Ride', 'Neil Island Natural Bridge'],
    captain: DEFAULT_CAPTAIN,
    itinerary: [
      { day: 1, title: 'Arrival at Port Blair', description: 'Visit the historic Cellular Jail and attend the spectacular Light & Sound show.' },
      { day: 2, title: 'Port Blair to Havelock Island', description: 'Ferry to Havelock. Relax at the world-famous Radhanagar Beach (voted Asia\'s best beach).' },
      { day: 3, title: 'Elephant Beach — Diving & Snorkeling', description: 'Enjoy scuba diving or snorkeling to witness vibrant coral reefs and tropical marine life.' },
      { day: 4, title: 'Havelock to Neil Island', description: 'Ferry to serene Neil Island. Visit Bharatpur Beach and watch sunset at Laxmanpur Beach.' },
      { day: 5, title: 'Neil Island — Natural Bridge', description: 'Visit the Natural Bridge rock formation and relax at the pristine Sitapur Beach.' },
      { day: 6, title: 'Neil to Port Blair — Ross Island', description: 'Return to Port Blair. Visit Ross Island (Netaji Subhas Chandra Bose Island) and North Bay.' },
      { day: 7, title: 'Departure', description: 'Transfer to Port Blair airport. Depart with sun-kissed memories.' }
    ]
  },
  // ─── RAJASTHAN & HERITAGE ───────────────────────────────────────
  {
    id: 13,
    title: 'Royal Rajasthan Heritage',
    location: 'Jaipur, Jodhpur, Udaipur, Jaisalmer',
    price: '22,999',
    rating: 4.8,
    reviews: 356,
    duration: '8 Days / 7 Nights',
    category: 'Heritage',
    type: 'Domestic',
    featured: true,
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=1200',
    link: '#',
    description: 'Experience the grandeur of Rajasthan\'s forts, palaces, and endless desert dunes. From the Pink City to the Golden City, discover India\'s royal heritage with desert camping under the stars.',
    images: ['https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=1200'],
    groupSize: '10-15 Persons',
    nextBatch: 'Oct 15, 2026',
    highlights: ['Amber Fort Elephant Ride', 'Mehrangarh Fort Jodhpur', 'Sam Sand Dunes Camping', 'City Palace Udaipur', 'Lake Pichola Boat Ride'],
    captain: DEFAULT_CAPTAIN,
    itinerary: [
      { day: 1, title: 'Arrival in Jaipur — Pink City', description: 'Check in to heritage hotel. Evening walk through Johari Bazaar and Hawa Mahal photo stop.' },
      { day: 2, title: 'Jaipur — Amber Fort, City Palace, Jantar Mantar', description: 'Full day exploring Amber Fort, City Palace, Jantar Mantar, and Nahargarh Fort sunset.' },
      { day: 3, title: 'Jaipur to Jodhpur via Ajmer & Pushkar', description: 'Visit Ajmer Sharif Dargah and sacred Pushkar Lake. Continue to the Blue City Jodhpur.' },
      { day: 4, title: 'Jodhpur — Mehrangarh Fort & Old City', description: 'Explore the mighty Mehrangarh Fort, Jaswant Thada, and the blue-painted old city lanes.' },
      { day: 5, title: 'Jodhpur to Jaisalmer — Golden City', description: 'Drive through the Thar Desert to Jaisalmer. Visit Patwon Ki Haveli and Gadisar Lake.' },
      { day: 6, title: 'Sam Sand Dunes — Desert Safari & Camping', description: 'Camel safari at sunset. Traditional Rajasthani dinner under the stars with folk music and dance.' },
      { day: 7, title: 'Jaisalmer to Udaipur — City of Lakes', description: 'Drive to romantic Udaipur. Evening boat ride on Lake Pichola with City Palace views.' },
      { day: 8, title: 'Udaipur Sightseeing & Departure', description: 'Visit City Palace, Saheliyon Ki Bari, and depart with royal memories.' }
    ]
  },
  {
    id: 14,
    title: 'Uttarakhand Hill Escape',
    location: 'Nainital, Mussoorie, Rishikesh, Haridwar',
    price: '15,999',
    rating: 4.6,
    reviews: 278,
    duration: '6 Days / 5 Nights',
    category: 'Nature',
    type: 'Domestic',
    image: '/assets/mussoorie.jpeg',
    link: '#',
    description: 'Escape to the queen of hills and spiritual heartland of India. From the serene lakes of Nainital to the colonial charm of Mussoorie, and the sacred ghats of Haridwar & Rishikesh.',
    images: ['/assets/mussoorie.jpeg'],
    groupSize: '10-12 Persons',
    nextBatch: 'Oct 01, 2026',
    highlights: ['Naini Lake Boating', 'Mussoorie Mall Road', 'Rishikesh River Rafting', 'Haridwar Ganga Aarti', 'Kempty Falls'],
    captain: DEFAULT_CAPTAIN,
    itinerary: [
      { day: 1, title: 'Delhi to Nainital', description: 'Drive to Nainital. Evening boating on the scenic Naini Lake surrounded by hills.' },
      { day: 2, title: 'Nainital Sightseeing', description: 'Visit Snow View Point, Tiffin Top, Bhimtal Lake, and explore the Mall Road.' },
      { day: 3, title: 'Nainital to Mussoorie', description: 'Drive to the Queen of Hills. Visit Kempty Falls and enjoy sunset at Gun Hill Point.' },
      { day: 4, title: 'Mussoorie to Rishikesh', description: 'Drive down to the Yoga Capital. White-water rafting on the Ganges (16 km stretch).' },
      { day: 5, title: 'Rishikesh & Haridwar', description: 'Visit Laxman Jhula, Ram Jhula, Beatles Ashram. Evening Ganga Aarti at Haridwar.' },
      { day: 6, title: 'Departure to Delhi', description: 'Morning free time. Drive back to Delhi for departure.' }
    ]
  },
  {
    id: 15,
    title: 'Himachal Grand Circuit',
    location: 'Shimla, Manali, Dharamshala, Dalhousie',
    price: '21,499',
    rating: 4.7,
    reviews: 198,
    duration: '8 Days / 7 Nights',
    category: 'Adventure',
    type: 'Domestic',
    image: '/assets/shimla.jpg',
    link: '#',
    description: 'The complete Himachal experience — from the colonial streets of Shimla to the snow-capped vistas of Manali, the Tibetan charm of Dharamshala, and the untouched beauty of Dalhousie.',
    images: ['/assets/shimla.jpg', '/assets/hadimba.jpg', '/assets/manali.jpg'],
    groupSize: '10-15 Persons',
    nextBatch: 'May 01, 2026',
    highlights: ['Solang Valley Adventure Sports', 'Hadimba Temple', 'McLeod Ganj & Dalai Lama Temple', 'Khajjiar Mini-Switzerland', 'Mall Road Shimla'],
    captain: DEFAULT_CAPTAIN,
    itinerary: [
      { day: 1, title: 'Delhi to Shimla', description: 'Drive to Shimla. Walk along the iconic Mall Road and Ridge. Visit Christ Church.' },
      { day: 2, title: 'Shimla — Kufri & Local Sightseeing', description: 'Visit Kufri, Jakhoo Temple, and explore the heritage architecture of the British-era town.' },
      { day: 3, title: 'Shimla to Manali', description: 'Scenic drive along the Beas River valley. Check in and explore Old Manali cafes.' },
      { day: 4, title: 'Manali — Solang, Hadimba, Jogini Falls', description: 'Adventure sports at Solang Valley (paragliding, zorbing). Visit Hadimba Temple and Jogini Falls.' },
      { day: 5, title: 'Manali to Dharamshala', description: 'Drive to the home of the Dalai Lama. Evening walk around McLeod Ganj market.' },
      { day: 6, title: 'Dharamshala — Bhagsunag, Triund Base', description: 'Visit Bhagsunag waterfall, Namgyal Monastery, and trek to Triund base for panoramic views.' },
      { day: 7, title: 'Dharamshala to Dalhousie & Khajjiar', description: 'Drive to Dalhousie. Visit Khajjiar — the Mini Switzerland of India.' },
      { day: 8, title: 'Departure', description: 'Morning free time. Drive to Pathankot for onward journey.' }
    ]
  },
  {
    id: 16,
    title: 'Goa Beach Carnival',
    location: 'North Goa, South Goa, Old Goa',
    price: '12,999',
    rating: 4.5,
    reviews: 456,
    duration: '4 Days / 3 Nights',
    category: 'Beach',
    type: 'Domestic',
    image: '/assets/goa.jpg',
    link: '#',
    description: 'Sun, sand, and soul — the ultimate Goan experience. Party at North Goa beaches, find peace at South Goa coves, explore 16th-century Portuguese churches, and feast on seafood.',
    images: ['/assets/goa.jpg'],
    groupSize: '8-15 Persons',
    nextBatch: 'Nov 10, 2026',
    highlights: ['Baga & Calangute Beach', 'Dudhsagar Falls Jeep Safari', 'Old Goa Churches (UNESCO)', 'South Goa — Palolem Beach', 'Spice Plantation Tour'],
    captain: DEFAULT_CAPTAIN,
    itinerary: [
      { day: 1, title: 'Arrival in Goa — North Goa Beaches', description: 'Check in. Explore Calangute, Baga, and Anjuna beaches. Evening at Tito\'s Lane.' },
      { day: 2, title: 'Old Goa Heritage & Dudhsagar Falls', description: 'Visit Basilica of Bom Jesus, Se Cathedral. Jeep safari to the stunning Dudhsagar Waterfall.' },
      { day: 3, title: 'South Goa — Palolem & Spice Plantation', description: 'Relax at Palolem Beach. Visit a traditional spice plantation with lunch. Sunset cruise on Mandovi.' },
      { day: 4, title: 'Departure', description: 'Morning free for last-minute shopping at Mapusa Market. Transfer to airport.' }
    ]
  },
  {
    id: 17,
    title: 'Sikkim & Darjeeling Explorer',
    location: 'Gangtok, Lachen, Lachung, Darjeeling',
    price: '25,999',
    rating: 4.8,
    reviews: 167,
    duration: '8 Days / 7 Nights',
    category: 'Adventure',
    type: 'Domestic',
    image: 'https://images.unsplash.com/photo-1622308644420-f7ad43908c35?auto=format&fit=crop&q=80&w=1200',
    link: '#',
    description: 'Explore the mystical land of Sikkim with breathtaking views of Kanchenjunga. Visit the sacred Gurudongmar Lake, ride the Darjeeling toy train, and witness sunrise at Tiger Hill.',
    images: ['https://images.unsplash.com/photo-1622308644420-f7ad43908c35?auto=format&fit=crop&q=80&w=1200'],
    groupSize: '10-12 Persons',
    nextBatch: 'Mar 15, 2027',
    highlights: ['Gurudongmar Lake 17,800 ft', 'Yumthang Valley — Valley of Flowers', 'Tiger Hill Sunrise — Darjeeling', 'Toy Train Heritage Ride', 'Nathula Pass (Indo-China Border)'],
    captain: DEFAULT_CAPTAIN,
    itinerary: [
      { day: 1, title: 'Arrival in Bagdogra — Transfer to Gangtok', description: 'Drive to Gangtok. Evening free to explore MG Marg, the vibrant pedestrian market.' },
      { day: 2, title: 'Gangtok — Tsomgo Lake & Nathula Pass', description: 'Visit Tsomgo Lake and drive to Nathula Pass at the Indo-China border (permit required).' },
      { day: 3, title: 'Gangtok to Lachen', description: 'Drive through stunning mountain roads to the charming hamlet of Lachen.' },
      { day: 4, title: 'Gurudongmar Lake & Transfer to Lachung', description: 'Early morning drive to the sacred Gurudongmar Lake at 17,800 ft. Continue to Lachung.' },
      { day: 5, title: 'Yumthang Valley — Valley of Flowers', description: 'Visit the spectacular Yumthang Valley in full bloom and Zero Point at 15,300 ft.' },
      { day: 6, title: 'Lachung to Darjeeling', description: 'Drive to the Queen of Hills — Darjeeling. Evening walk on the Mall and visit tea gardens.' },
      { day: 7, title: 'Darjeeling — Tiger Hill, Batasia Loop, Monastery', description: 'Pre-dawn visit to Tiger Hill for Kanchenjunga sunrise. Visit Batasia Loop and Peace Pagoda.' },
      { day: 8, title: 'Departure from Bagdogra', description: 'Morning toy train ride. Drive to Bagdogra airport for departure.' }
    ]
  },
  {
    id: 18,
    title: 'Varanasi & Prayagraj Spiritual',
    location: 'Varanasi, Prayagraj, Sarnath',
    price: '11,499',
    rating: 4.6,
    reviews: 234,
    duration: '4 Days / 3 Nights',
    category: 'Heritage',
    type: 'Domestic',
    image: 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&q=80&w=1200',
    link: '#',
    description: 'Witness the oldest living city in the world. Experience the mystical Ganga Aarti at Dashashwamedh Ghat, explore ancient temples, and find spiritual peace at the Triveni Sangam in Prayagraj.',
    images: ['https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&q=80&w=1200'],
    groupSize: '10-20 Persons',
    nextBatch: 'Nov 01, 2026',
    highlights: ['Ganga Aarti at Dashashwamedh Ghat', 'Sunrise Boat Ride on Ganges', 'Kashi Vishwanath Temple', 'Sarnath — Buddha\'s First Sermon', 'Triveni Sangam Prayagraj'],
    captain: DEFAULT_CAPTAIN,
    itinerary: [
      { day: 1, title: 'Arrival in Varanasi', description: 'Check in. Evening Ganga Aarti at Dashashwamedh Ghat — a deeply spiritual fire ceremony.' },
      { day: 2, title: 'Varanasi Heritage Walk & Sarnath', description: 'Early morning boat ride on the Ganges. Visit Kashi Vishwanath Temple. Afternoon visit to Sarnath.' },
      { day: 3, title: 'Varanasi to Prayagraj', description: 'Drive to Prayagraj. Visit the sacred Triveni Sangam (confluence of 3 rivers) and Anand Bhawan.' },
      { day: 4, title: 'Departure', description: 'Morning free. Transfer to Varanasi/Prayagraj for departure.' }
    ]
  },
  {
    id: 19,
    title: 'Rann of Kutch & Gujarat',
    location: 'Ahmedabad, Kutch, Rann Utsav',
    price: '16,999',
    rating: 4.7,
    reviews: 312,
    duration: '5 Days / 4 Nights',
    category: 'Heritage',
    type: 'Domestic',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=1200',
    link: '#',
    description: 'Discover the White Desert of India during the famous Rann Utsav. Experience the surreal moonlit landscape of the Great Rann, vibrant Kutchi handicrafts, and Ahmedabad\'s UNESCO heritage.',
    images: ['https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=1200'],
    groupSize: '10-15 Persons',
    nextBatch: 'Nov 15, 2026',
    highlights: ['White Rann Full Moon Experience', 'Rann Utsav Cultural Festival', 'Kutchi Handicraft Villages', 'Ahmedabad Heritage Walk (UNESCO)', 'Aina Mahal & Prag Mahal'],
    captain: DEFAULT_CAPTAIN,
    itinerary: [
      { day: 1, title: 'Arrival in Ahmedabad', description: 'Heritage walk through the walled city (UNESCO). Visit Sabarmati Ashram and Adalaj Stepwell.' },
      { day: 2, title: 'Ahmedabad to Bhuj', description: 'Drive/fly to Bhuj. Visit Aina Mahal, Prag Mahal Palace, and the local Kutchi market.' },
      { day: 3, title: 'Kutch Villages — Art & Handicraft Trail', description: 'Visit Bhujodi weaving village, Hodka mud art village, and the wild-ass sanctuary.' },
      { day: 4, title: 'Great Rann of Kutch & Rann Utsav', description: 'Full day at the White Rann. Sunset and full-moon experience on the salt desert. Evening cultural show.' },
      { day: 5, title: 'Departure from Bhuj', description: 'Morning free for souvenir shopping. Transfer to airport.' }
    ]
  },
  {
    id: 20,
    title: 'Coorg & Hampi Karnataka',
    location: 'Bangalore, Coorg, Hampi, Mysore',
    price: '19,499',
    rating: 4.6,
    reviews: 143,
    duration: '7 Days / 6 Nights',
    category: 'Nature',
    type: 'Domestic',
    image: 'https://images.unsplash.com/photo-1600100397608-e4e3e9b1fb24?auto=format&fit=crop&q=80&w=1200',
    link: '#',
    description: 'Coffee plantations, ancient ruins, and royal palaces — Karnataka\'s finest. Trek through the misty hills of Coorg, explore the UNESCO ruins of Hampi, and witness the grandeur of Mysore Palace.',
    images: ['https://images.unsplash.com/photo-1600100397608-e4e3e9b1fb24?auto=format&fit=crop&q=80&w=1200'],
    groupSize: '8-12 Persons',
    nextBatch: 'Oct 20, 2026',
    highlights: ['Abbey Falls & Raja\'s Seat', 'Hampi UNESCO World Heritage Ruins', 'Mysore Palace Night Illumination', 'Coffee Plantation Stay', 'Dubare Elephant Camp'],
    captain: DEFAULT_CAPTAIN,
    itinerary: [
      { day: 1, title: 'Bangalore to Coorg', description: 'Drive to Scotland of India. Check into a coffee plantation homestay.' },
      { day: 2, title: 'Coorg — Abbey Falls, Raja\'s Seat, Dubare', description: 'Visit Abbey Falls, Raja\'s Seat for sunset, and Dubare Elephant Camp on the Cauvery River.' },
      { day: 3, title: 'Coorg to Mysore', description: 'Drive to the City of Palaces. Visit Chamundi Hills and Brindavan Gardens musical fountain.' },
      { day: 4, title: 'Mysore — Palace, St. Philomena\'s', description: 'Explore Mysore Palace (illuminated on Sundays), Devaraja Market, and St. Philomena\'s Church.' },
      { day: 5, title: 'Mysore to Hampi', description: 'Drive to the ruins of the Vijayanagara Empire. Evening at the Tungabhadra riverbank.' },
      { day: 6, title: 'Hampi — Full Day Exploration', description: 'Explore Virupaksha Temple, Vittala Temple (stone chariot), Lotus Mahal, and elephant stables.' },
      { day: 7, title: 'Departure from Hampi/Hospet', description: 'Transfer to Hospet/Hubli for onward journey.' }
    ]
  },
  // ─── INTERNATIONAL ──────────────────────────────────────────────
  {
    id: 7,
    title: 'Bali Essence Escape',
    location: 'Ubud, Seminyak, Nusa Penida',
    price: '54,999',
    rating: 4.9,
    reviews: 350,
    duration: '7 Days / 6 Nights',
    category: 'Honeymoon',
    type: 'International',
    featured: true,
    image: '/assets/bali.jpg',
    link: '/bali',
    description: 'A romantic getaway to the Island of Gods. From Ubud\'s terraced rice paddies and sacred temples to Seminyak\'s sunset beach clubs and the dramatic cliffs of Nusa Penida.',
    images: ['/assets/bali.jpg'],
    groupSize: '2-6 Persons',
    nextBatch: 'Sept 10, 2026',
    highlights: ['Tegallalang Rice Terraces', 'Uluwatu Temple Sunset Kecak Dance', 'Nusa Penida Island Day Trip', 'Ubud Sacred Monkey Forest', 'Beachfront Candlelight Dinner'],
    captain: DEFAULT_CAPTAIN,
    itinerary: [
      { day: 1, title: 'Arrival in Bali — Seminyak', description: 'Welcome to Bali. Check into beachfront resort. Sunset dinner at Seminyak Beach.' },
      { day: 2, title: 'Ubud — Rice Terraces, Monkey Forest', description: 'Visit Tegallalang Rice Terraces, Sacred Monkey Forest, and Ubud Art Market.' },
      { day: 3, title: 'Ubud — Waterfalls & Coffee Plantation', description: 'Visit Tegenungan Waterfall, Luwak coffee plantation, and Tirta Empul water temple.' },
      { day: 4, title: 'Nusa Penida Day Trip', description: 'Speed boat to Nusa Penida. Visit Kelingking Beach, Broken Beach, and Angel\'s Billabong.' },
      { day: 5, title: 'South Bali — Uluwatu & Tanah Lot', description: 'Visit Uluwatu Temple with Kecak fire dance at sunset. Morning at Tanah Lot sea temple.' },
      { day: 6, title: 'Beach Club & Spa Day', description: 'Full day of relaxation. Balinese spa treatment and private candlelight beach dinner.' },
      { day: 7, title: 'Departure', description: 'Morning free. Transfer to Ngurah Rai Airport.' }
    ]
  },
  {
    id: 8,
    title: 'Thailand Island Hopping',
    location: 'Bangkok, Phuket, Krabi, Phi Phi',
    price: '48,999',
    rating: 4.8,
    reviews: 156,
    duration: '7 Days / 6 Nights',
    category: 'Beach',
    type: 'International',
    image: '/assets/thai.jpg',
    link: '#',
    description: 'From Bangkok\'s gleaming temples and night markets to Phuket\'s nightlife and the dramatic limestone karsts of Krabi. Island-hop to Phi Phi and James Bond Island.',
    images: ['/assets/thai.jpg'],
    groupSize: '8-12 Persons',
    nextBatch: 'Dec 12, 2026',
    highlights: ['Grand Palace & Wat Pho', 'Phi Phi Island Snorkeling', 'James Bond Island', 'Krabi Four Islands Tour', 'Phuket Fantasea Show'],
    captain: DEFAULT_CAPTAIN,
    itinerary: [
      { day: 1, title: 'Arrival in Bangkok', description: 'Check in. Evening visit to Asiatique Riverfront night market.' },
      { day: 2, title: 'Bangkok — Grand Palace, Wat Pho, Wat Arun', description: 'Full day exploring Bangkok\'s iconic temples and floating markets.' },
      { day: 3, title: 'Bangkok to Phuket', description: 'Fly to Phuket. Afternoon at Patong Beach. Evening Phuket Fantasea show.' },
      { day: 4, title: 'Phi Phi Island Day Tour', description: 'Speed boat to Phi Phi Islands. Snorkeling, Maya Bay visit, and lunch on the island.' },
      { day: 5, title: 'Phuket to Krabi', description: 'Ferry to Krabi. Afternoon at Railay Beach — accessible only by boat.' },
      { day: 6, title: 'Krabi — Four Islands & James Bond Island', description: 'Four Islands boat tour including Chicken Island. Visit Phang Nga Bay and James Bond Island.' },
      { day: 7, title: 'Departure from Krabi', description: 'Morning free. Transfer to Krabi airport.' }
    ]
  },
  {
    id: 9,
    title: 'Dubai & Abu Dhabi Luxury',
    location: 'Dubai, Abu Dhabi',
    price: '59,999',
    rating: 5.0,
    reviews: 198,
    duration: '6 Days / 5 Nights',
    category: 'Luxury',
    type: 'International',
    featured: true,
    image: '/assets/dubai.jpg',
    link: '#',
    description: 'The ultimate Middle Eastern luxury experience. From the world\'s tallest building to desert safaris, gold souks, and the architectural masterpiece of Sheikh Zayed Grand Mosque.',
    images: ['/assets/dubai.jpg'],
    groupSize: '4-8 Persons',
    nextBatch: 'Jan 15, 2027',
    highlights: ['Burj Khalifa 124th Floor', 'Desert Safari with BBQ Dinner', 'Dubai Mall & Fountain Show', 'Sheikh Zayed Grand Mosque', 'Dhow Cruise Dinner'],
    captain: DEFAULT_CAPTAIN,
    itinerary: [
      { day: 1, title: 'Arrival in Dubai', description: 'Check in to luxury hotel. Evening Dhow Cruise dinner on Dubai Creek.' },
      { day: 2, title: 'Dubai City Tour — Burj Khalifa & Old Dubai', description: 'Visit Burj Khalifa observation deck, Dubai Mall, Gold Souk, and Spice Souk.' },
      { day: 3, title: 'Desert Safari & Dune Bashing', description: 'Afternoon desert safari with dune bashing, sandboarding, camel ride, and BBQ dinner under the stars.' },
      { day: 4, title: 'Abu Dhabi Day Tour', description: 'Visit Sheikh Zayed Grand Mosque, Yas Island, and Ferrari World. Return to Dubai.' },
      { day: 5, title: 'Dubai — Miracle Garden, Frame & Marina', description: 'Visit Dubai Miracle Garden, Dubai Frame, and sunset at JBR Beach & Marina Walk.' },
      { day: 6, title: 'Departure', description: 'Morning free for duty-free shopping. Transfer to Dubai International Airport.' }
    ]
  },
  // ─── CRUISE ─────────────────────────────────────────────────────
  {
    id: 10,
    title: 'Goa & Lakshadweep Cruise',
    location: 'Goa, Agatti Island, Kadmat',
    price: '29,999',
    rating: 4.9,
    reviews: 188,
    duration: '5 Days / 4 Nights',
    category: 'Cruise',
    type: 'Domestic',
    featured: true,
    image: '/assets/goa.jpg',
    link: '/cruise',
    description: 'Sail across the turquoise Arabian Sea on a 5-star luxury cruise liner. Unlimited deck dining, coral island shore excursions, and ocean-view luxury suites.',
    images: ['/assets/goa.jpg', '/assets/andaman.jpg'],
    groupSize: '2-6 Persons',
    nextBatch: 'Nov 18, 2026',
    highlights: ['Oceanview Balcony Stateroom', 'Lakshadweep Coral Snorkeling', 'All-Inclusive Deck Dining', 'Live Broadway Night Show'],
    captain: DEFAULT_CAPTAIN,
    itinerary: [
      { day: 1, title: 'Embarkation at Mormugao Port Goa', description: 'Welcome drinks on the top deck and sunset sailing away party.' },
      { day: 2, title: 'At Sea — Deck Parties & Spa', description: 'Enjoy infinity pool deck, spa treatment, and live gala dinner.' },
      { day: 3, title: 'Lakshadweep Agatti Island Excursion', description: 'Tender boat landing on pristine coral sands, glass-bottom kayaking, and seafood feast.' },
      { day: 4, title: 'Kadmat Island & Water Sports', description: 'Scuba diving with sea turtles and evening captain cocktail gala.' },
      { day: 5, title: 'Return to Goa Port', description: 'Disembarkation with lifelong ocean memories.' }
    ]
  },
  {
    id: 11,
    title: 'Singapore & Phuket Cruise',
    location: 'Singapore, Penang, Phuket',
    price: '64,999',
    rating: 5.0,
    reviews: 215,
    duration: '7 Days / 6 Nights',
    category: 'Cruise',
    type: 'International',
    featured: true,
    image: '/assets/dubai.jpg',
    link: '/cruise',
    description: 'Sail the Malacca Strait on a world-class mega cruise ship. Asian culinary masterclasses, water parks on sea, and vibrant tropical port landings.',
    images: ['/assets/dubai.jpg', '/assets/thai.jpg'],
    groupSize: '2-8 Persons',
    nextBatch: 'Dec 05, 2026',
    highlights: ['Royal Ocean Promenade', 'Penang Heritage Trail', 'Phuket Island Hopping', 'Symphony Lounge Show'],
    captain: DEFAULT_CAPTAIN,
    itinerary: [
      { day: 1, title: 'Boarding Marina Bay Cruise Centre', description: 'Check-in and evening departure past Singapore skyline.' },
      { day: 2, title: 'Penang Cultural Port Stop', description: 'Explore George Town street art and hawker delicacies.' },
      { day: 3, title: 'Phuket Shore Excursion', description: 'Patong beach excursion and traditional Thai massage.' },
      { day: 4, title: 'Full Sea Day — AquaPark & Shows', description: 'Enjoy zip-lining over ocean, surf simulator, and theater shows.' },
      { day: 5, title: 'Captain Gala Dinner', description: 'Formal black-tie dinner with executive cruise commanders.' },
      { day: 6, title: 'Singapore Disembarkation', description: 'Arrival back at Marina Bay.' }
    ]
  },
  // ─── CORPORATE ──────────────────────────────────────────────────
  {
    id: 12,
    title: 'Corporate Leadership Offsite',
    location: 'Manali & Solang Valley',
    price: '22,500',
    rating: 4.9,
    reviews: 94,
    duration: '4 Days / 3 Nights',
    category: 'Corporate',
    type: 'Domestic',
    featured: true,
    image: '/assets/group2.jpeg',
    link: '/corporate',
    description: 'Custom team building summit for forward-thinking organizations. High-altitude leadership workshops, bonfire networking, and white-water rafting.',
    images: ['/assets/group2.jpeg', '/assets/group.jpeg', '/assets/PFC.jpeg'],
    groupSize: '15-100+ Persons',
    nextBatch: 'Available Year Round',
    highlights: ['Executive Strategy Keynotes', 'Team River Rafting Challenge', '5-Star Resort Conference & Banquet', 'Pine Forest Gala Dinner'],
    captain: DEFAULT_CAPTAIN,
    itinerary: [
      { day: 1, title: 'Team Arrival & Welcome Banquet', description: 'Check-in to luxury mountain resort followed by team icebreakers and welcome dinner.' },
      { day: 2, title: 'Solang Valley Rafting & Team Challenges', description: 'Outdoor strategy games, white-water raft challenge, and adventure activities.' },
      { day: 3, title: 'Leadership Summit & Gala Evening', description: 'Interactive workshop sessions, awards ceremony, and acoustic live music night.' },
      { day: 4, title: 'Closing Keynote & Departure', description: 'Breakfast keynote and group departure.' }
    ]
  }
];

export const CATEGORIES = ['Adventure', 'Beach', 'Luxury', 'Nature', 'Heritage', 'Honeymoon', 'Backpacking', 'Cruise', 'Corporate'];

export const getTripWhatsAppLink = (tripTitle: string) =>
  getWhatsAppLink(`Hi Infi Yatra! I'm interested in the ${tripTitle} package.`);
