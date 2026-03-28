export const heroSlides = [
  {
    image: '/assets/spiti.jpg',
    title: 'Discover the Art of Meaningful Travel',
    subtitle: 'Ahmedabad\'s most authentic travel community crafting memories that stay with you forever.'
  },
  {
    image: '/assets/ERELA.jpg',
    title: 'Explore God\'s Own Country',
    subtitle: 'Journey through the tranquil backwaters and misty hills of Kerala.'
  },
  {
    image: '/assets/thai.jpg',
    title: 'Thai Island Perfection',
    subtitle: 'Limestone cliffs and crystal clear waters await in Phuket and Krabi.'
  },
  {
    image: '/assets/goat.jpg',
    title: 'Himachal Mystique',
    subtitle: 'Venture into the rugged heart of the Himalayas with our local captain experts.'
  },
  {
    image: '/assets/bali.jpg',
    title: 'Bali Essence',
    subtitle: 'Luxury villa stays and spiritual awakenings in the heart of tropical paradise.'
  }
];

export const getWhatsAppLink = (message = "Hi Infi Yatra! I'd like to plan a trip.") => {
  const phoneNumber = '919601793485';
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
};
