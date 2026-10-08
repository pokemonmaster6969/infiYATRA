export const heroSlides = [
  {
    image: '/assets/beaut.jpg',
    title: 'Discover the Art of Meaningful Travel',
    subtitle: 'Ahmedabad\'s most authentic travel community crafting memories that stay with you forever.'
  },
  {
    image: '/assets/ERELA.jpg',
    title: 'Explore God\'s Own Country',
    subtitle: 'Journey through the tranquil backwaters and misty hills of Kerala.'
  },
  {
    image: '/assets/meghaa.jpg',
    title: 'SERENE MEGHALAYA',
    subtitle: 'Soak into the beauty and serenity of meghalaya.'
  },
  {
    image: '/assets/tains.jpg',
    title: 'Himachal Mystique',
    subtitle: 'Venture into the rugged heart of the Himalayas with our local captain experts.'
  },
  {
    image: '/assets/kashmir.jpg',
    title: 'Kashmir Beauty',
    subtitle: 'Luxury villa stays and spiritual awakenings in the heart of Kashmir valley.'
  },
  {
    image: '/assets/udai.jpg',
    title: 'Royal Rajasthan',
    subtitle: 'Experience the grandeur of forts, palaces, and endless desert dunes.'
  },
  {
    image: '/assets/goa.jpg',
    title: 'Sun-Kissed Goa',
    subtitle: 'Relax on pristine beaches and explore vibrant Portuguese heritage.'
  },
  {
    image: '/assets/Ladakh2.jpg',
    title: 'Majestic Ladakh',
    subtitle: 'Ride through high altitude passes and witness breathtaking azure lakes.'
  },
  {
    image: '/assets/andaman.jpg',
    title: 'Andaman Escape',
    subtitle: 'Dive into crystal clear waters and discover vibrant marine life.'
  }
];

export const getWhatsAppLink = (message = "Hi Infi Yatra! I'd like to plan a trip.") => {
  const phoneNumber = '919601793485';
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
};
