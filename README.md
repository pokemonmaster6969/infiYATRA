# InfiLand - Travel Discovery Platform

A modern, interactive travel discovery platform built with React, TypeScript, and Three.js. InfiLand offers immersive trip planning experiences with AI-powered search, stunning 3D visualizations, and seamless user interactions.

## 🌟 Features

- **AI-Powered Trip Search**: Smart search functionality for finding personalized travel experiences
- **3D Interactive Elements**: Immersive visualizations using Three.js and React Three Fiber
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Fluid Animations**: Smooth transitions using Framer Motion
- **Multi-Page Navigation**: Complete routing system with React Router
- **Destination Discovery**: Explore curated trips to destinations like Himachal and Bali
- **User Dashboard**: Personalized trip management and wishlist functionality

## 🛠️ Tech Stack

### Frontend Framework
- **React 18.3.1** - Modern React with hooks and concurrent features
- **TypeScript 5.6.2** - Type-safe development experience

### Build Tools & Development
- **Vite 6.0.1** - Fast development server and build tool
- **@vitejs/plugin-react** - React plugin for Vite

### Styling & UI
- **Tailwind CSS 3.4.15** - Utility-first CSS framework
- **PostCSS** - CSS transformation tool
- **Autoprefixer** - CSS vendor prefixing

### Routing & Navigation
- **React Router DOM 7.13.2** - Client-side routing

### Animations & Interactions
- **Framer Motion 11.0.0** - Production-ready motion library
- **React Three Fiber 8.18.0** - React renderer for Three.js
- **React Three Drei 9.0.0** - Useful helpers for React Three Fiber
- **Three.js 0.183.2** - 3D graphics library

### UI Components & Icons
- **Lucide React 0.460.0** - Beautiful icon library
- **Maath 0.10.8** - Math utilities for React Three Fiber

## 🎨 Design System

### Color Palette
- **Primary Teal**: `#0D7377` (Main brand color)
- **Secondary Orange**: `#FF6B35` (Accent and CTAs)
- **Accent Gold**: `#FFD700` (Highlights and premium features)
- **Charcoal**: `#333333` (Text and backgrounds)

### Typography
- **Primary Font**: Inter (Clean, modern sans-serif)
- **Display Font**: Poppins (Headings and hero text)

### Custom Animations
- **Fade In**: Smooth opacity transitions
- **Slide Up**: Content reveal animations
- **Float**: Subtle floating effects for interactive elements

## 📁 Project Structure

```
infi/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── home/          # Home page specific components
│   │   ├── Navbar.tsx     # Main navigation component
│   │   ├── Footer.tsx     # Footer component
│   │   └── WhatsAppButton.tsx # WhatsApp integration
│   ├── pages/             # Page components
│   │   ├── Home.tsx       # Landing page
│   │   ├── Discover.tsx   # Trip discovery page
│   │   ├── TripDetails.tsx # Individual trip details
│   │   ├── HimachalPage.tsx # Himachal destination
│   │   ├── BaliPage.tsx   # Bali destination
│   │   └── StaticPages.tsx # About, Community, etc.
│   ├── lib/               # Utility libraries
│   ├── index.css          # Global styles
│   ├── main.tsx           # Application entry point
│   └── vite-env.d.ts      # Vite type definitions
├── infiland.tsx           # Main App component with routing
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite build configuration
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd infi
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🌐 Application Routes

- `/` - Home page with hero section and featured trips
- `/discover` - Trip discovery with filters and search
- `/trip/:id` - Detailed trip information and booking
- `/himachal` - Himachal destination page
- `/bali` - Bali destination page
- `/dashboard` - User dashboard (placeholder)
- `/about` - About page
- `/community` - Community page
- `/wishlist` - User wishlist

## 🎯 Key Components

### Home Page
- **HeroSection**: Dynamic hero with AI-powered search
- **StatsSection**: Real-time travel statistics
- **FeaturedPackages**: Curated trip selections
- **TrendingDestinations**: Popular destinations
- **TestimonialsSection**: User reviews and ratings

### Navigation
- **Navbar**: Sticky navigation with mobile responsiveness
- **Footer**: Comprehensive footer with links and newsletter

### Interactive Features
- **WhatsAppButton**: Direct WhatsApp integration
- **3D Elements**: Immersive visual experiences
- **Smooth Animations**: Fluid transitions throughout

## 🔧 Development Notes

### TypeScript Configuration
- Strict type checking enabled
- Path aliases configured for cleaner imports
- React types properly configured

### Tailwind CSS Setup
- Custom color palette defined
- Extended font families
- Custom animations and transitions
- Responsive design utilities

### Vite Configuration
- React plugin configured
- HMR (Hot Module Replacement) enabled
- Development server optimized for performance

## 📱 Responsive Design

The application is built with a mobile-first approach:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+

All components are fully responsive and optimized for different screen sizes.

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The build output will be in the `dist/` directory, ready for deployment to any static hosting service.

### Environment Variables
Currently no environment variables are required, but the configuration supports:
- API endpoints for trip data
- Analytics integration
- Third-party service keys

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 📞 Contact

For any questions or support regarding InfiLand, please reach out through the project maintainers.

---

**Built with ❤️ for travelers seeking extraordinary experiences**
