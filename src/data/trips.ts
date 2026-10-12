export const trips = [
  {
    id: "himachal-mystique",
    title: "Himachal Mystique",
    location: "Manali, Kasol, Kheerganga",
    price: "14,999",
    rating: 4.9,
    reviews: 128,
    duration: "6 Days",
    category: "Mountains",
    type: "Domestic",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200",
    link: "/trip/himachal-mystique",
    description: "Join the Infi Yatra community as we venture into the rugged heart of the Himalayas. This isn't just a sightseeing tour; it's a soul-stirring journey through pine forests, snow-clad peaks, and the mystical Parvati Valley. Experience the authentic 'Old Manali' lifestyle curated specifically for the Ahmedabad explorer.",
    images: [
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200"
    ],
    groupSize: "10-15 Persons",
    nextBatch: "May 15, 2026",
    highlights: [
      "Rohtang Pass Expedition",
      "Riverside Camping in Kasol",
      "Kheerganga Hot Springs Trek",
      "Old Manali Cafe Crawl"
    ],
    captain: {
      name: "Captain Vikram",
      role: "Lead Mountain Guide",
      bio: "Born in the Himalayas, Vikram has been guiding trekkers for over a decade. He knows the hidden trails and the best local stories.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
      rating: 5,
      trips: 120
    },
    itinerary: [
      {
        day: 1,
        title: "Arrival in Manali",
        description: "Acclimatization and local café exploration in Old Manali. We'll have a welcome dinner and briefing for the trek."
      },
      {
        day: 2,
        title: "Rohtang Pass Expedition",
        description: "Breathtaking snow views and high-altitude photography. We'll spend the day playing in the snow and enjoying the panoramic views of the Himalayas."
      },
      {
        day: 3,
        title: "Kasol & Parvati Valley",
        description: "Travel to Kasol. Riverside camping and mystical vibes in the heart of the valley. Evening bonfire and stargazing."
      },
      {
        day: 4,
        title: "Trek to Kheerganga",
        description: "A spiritual journey through pine forests to reach natural hot springs. Relax your muscles in the hot water under the open sky."
      },
      {
        day: 5,
        title: "Kheerganga to Manali",
        description: "Descend from Kheerganga and travel back to Manali. Free evening for shopping and exploring Mall Road."
      },
      {
        day: 6,
        title: "The Return Journey",
        description: "Shopping for local artifacts and departure for Ahmedabad with memories of a lifetime."
      }
    ]
  },
  {
    id: "bali-essence",
    title: "Bali Essence Escape",
    location: "Ubud, Seminyak, Nusa Penida",
    price: "54,999",
    rating: 4.9,
    reviews: 350,
    duration: "8 Days",
    category: "Beach",
    type: "International",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1200",
    link: "/trip/bali-essence",
    description: "A romantic and adventurous getaway to the Island of Gods. Experience the perfect blend of vibrant culture, lush rice terraces in Ubud, thrilling water sports, and pristine beaches on Nusa Penida.",
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&q=80&w=1200"
    ],
    groupSize: "2-8 Persons",
    nextBatch: "Sept 10, 2026",
    highlights: [
      "Ubud Monkey Forest & Rice Terraces",
      "Nusa Penida Island Tour (Kelingking Beach)",
      "Uluwatu Temple Sunset Dance",
      "Seminyak Beach Clubs"
    ],
    captain: {
      name: "Captain Ayu",
      role: "Bali Experience Director",
      bio: "A true Balinese local who loves sharing the culture, hidden beaches, and culinary secrets of her beautiful island.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
      rating: 4.9,
      trips: 85
    },
    itinerary: [
      {
        day: 1,
        title: "Arrival in Bali (Ubud)",
        description: "Welcome to Bali! Transfer to your resort in Ubud. Spend the evening relaxing and enjoying a traditional Balinese welcome dinner."
      },
      {
        day: 2,
        title: "Ubud Cultural Tour",
        description: "Explore the Sacred Monkey Forest, walk through the Tegalalang Rice Terraces, and visit the Tirta Empul water temple."
      },
      {
        day: 3,
        title: "Mount Batur Sunrise Trek",
        description: "Early morning trek to Mount Batur to catch a breathtaking sunrise. Return to Ubud for a relaxing spa session."
      },
      {
        day: 4,
        title: "Ubud to Seminyak via Uluwatu",
        description: "Transfer to Seminyak. En route, visit Uluwatu Temple perched on a cliff and watch the traditional Kecak Fire Dance at sunset."
      },
      {
        day: 5,
        title: "Nusa Penida Day Trip",
        description: "Speedboat to Nusa Penida. Visit the iconic Kelingking Beach (T-Rex shape), Broken Beach, and Angel's Billabong. Return to Seminyak."
      },
      {
        day: 6,
        title: "Water Sports & Beach Club",
        description: "Morning water sports at Tanjung Benoa (Parasailing, Jet Ski). Afternoon relaxing at a famous Seminyak beach club like Potato Head."
      },
      {
        day: 7,
        title: "Leisure & Shopping",
        description: "A free day to explore local markets, shop for souvenirs, and enjoy the vibrant nightlife of Kuta or Seminyak."
      },
      {
        day: 8,
        title: "Departure",
        description: "After breakfast, transfer to the airport for your flight back home with beautiful memories of Bali."
      }
    ]
  },
  {
    id: "kerala-backwaters",
    title: "Kerala Backwaters & Hills",
    location: "Munnar, Thekkady, Alleppey",
    price: "18,499",
    rating: 4.8,
    reviews: 210,
    duration: "5 Days",
    category: "Nature",
    type: "Domestic",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=1200",
    link: "/trip/kerala-backwaters",
    description: "A perfect blend of serene backwaters, lush tea gardens, and rich wildlife. Witness the majestic Western Ghats and cruise through the tranquil waters of Alleppey.",
    images: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1574246604907-db69e30fdba6?auto=format&fit=crop&q=80&w=1200"
    ],
    groupSize: "10-12 Persons",
    nextBatch: "Nov 05, 2026",
    highlights: [
      "Alleppey Houseboat Stay",
      "Munnar Tea Gardens",
      "Periyar Wildlife Safari",
      "Kathakali Show"
    ],
    captain: {
      name: "Captain Rohan",
      role: "South India Specialist",
      bio: "Expert in local ecology and storytelling, making sure you experience the true essence of God's Own Country.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      rating: 4.8,
      trips: 60
    },
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kochi to Munnar",
        description: "Drive through winding roads to the beautiful tea hills of Munnar. En route visit Cheeyappara Waterfalls."
      },
      {
        day: 2,
        title: "Munnar Sightseeing",
        description: "Explore Eravikulam National Park, Mattupetty Dam, and the Tea Museum."
      },
      {
        day: 3,
        title: "Munnar to Thekkady",
        description: "Travel to Periyar. Enjoy an elephant safari and an authentic spice plantation tour."
      },
      {
        day: 4,
        title: "Thekkady to Alleppey",
        description: "Board a traditional house-boat. Sail through the palm-fringed backwaters and enjoy Kerala cuisine."
      },
      {
        day: 5,
        title: "Departure",
        description: "Drive back to Kochi for your departure flight."
      }
    ]
  }
];
