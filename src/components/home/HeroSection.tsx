import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ChevronLeft, ChevronRight, Compass, Sparkles, SlidersHorizontal, PhoneCall } from "lucide-react";
import { heroSlides as staticHeroSlides, getWhatsAppLink } from "../../lib/data";
import { getHeroSlides, optimizeImageUrl } from "../../lib/dataService";
import { haptics } from "../../lib/haptics";

export default function HeroSection() {
  const [heroSlides, setHeroSlides] = useState<any[]>(staticHeroSlides);
  const [index, setIndex] = useState(0);

  // Load slides and preload initial images
  useEffect(() => {
    getHeroSlides().then((slides) => {
      if (slides && slides.length > 0) {
        setHeroSlides(slides);
        slides.slice(0, 3).forEach((slide: any) => {
          const img = new Image();
          img.src = optimizeImageUrl(slide.image, 1920, 85);
        });
      }
    });
  }, []);

  // Auto-play timer
  useEffect(() => {
    if (heroSlides.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    const nextIndex = (index + 1) % heroSlides.length;
    if (heroSlides[nextIndex]) {
      const img = new Image();
      img.src = optimizeImageUrl(heroSlides[nextIndex].image, 1920, 85);
    }

    return () => clearInterval(timer);
  }, [heroSlides.length, index]);

  const goToPrev = () => {
    haptics.medium();
    setIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToNext = () => {
    haptics.medium();
    setIndex((prev) => (prev + 1) % heroSlides.length);
  };

  const goTo = (i: number) => {
    haptics.light();
    setIndex(i);
  };

  const slide = heroSlides[index] || {
    image: "/assets/beaut.jpg",
    title: "Discover Meaningful Travel",
    subtitle: "Crafting memories that stay with you forever."
  };

  return (
    <section className="relative w-full h-[100vh] min-h-[680px] max-h-[1080px] overflow-hidden bg-charcoal flex flex-col justify-center items-center select-none">
      <Helmet>
        {heroSlides.slice(0, 2).map((s, i) => (
          <link key={`preload-${i}`} rel="preload" as="image" href={optimizeImageUrl(s.image, 1920, 85)} />
        ))}
      </Helmet>

      {/* Background Images with smooth fade transition */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`bg-${index}`}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={optimizeImageUrl(slide.image, 1920, 85)}
              alt={slide.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-black/35 to-black/50 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.35)_100%)] z-10 pointer-events-none" />

      {/* Main Hero Content Box - Perfectly Centered */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-6 text-center space-y-6 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full liquid-glass border border-white/20 shadow-2xl backdrop-blur-xl"
        >
          <Sparkles size={13} className="text-secondary animate-pulse" />
          <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">
            AHMEDABAD'S PREMIER TRAVEL COMMUNITY
          </span>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${index}`}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-4"
          >
            <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tighter uppercase italic leading-[0.95] drop-shadow-2xl liquid-text">
              {slide.title}
            </h1>
            <p className="text-white/80 text-sm sm:text-lg lg:text-xl font-medium italic max-w-2xl mx-auto leading-relaxed drop-shadow-md">
              {slide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Clean CTA Buttons Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-3"
        >
          <Link
            to="/discover"
            onClick={() => haptics.medium()}
            className="px-8 py-4 bg-secondary text-white rounded-full font-black text-xs uppercase tracking-widest transition-all duration-300 hover:scale-105 hover:bg-white hover:text-charcoal shadow-2xl shadow-secondary/40 flex items-center gap-2"
          >
            <Compass size={15} />
            Explore Packages
          </Link>

          <Link
            to="/customize"
            onClick={() => haptics.medium()}
            className="px-8 py-4 bg-primary text-white rounded-full font-black text-xs uppercase tracking-widest transition-all duration-300 hover:scale-105 hover:bg-white hover:text-charcoal shadow-2xl shadow-primary/40 flex items-center gap-2"
          >
            <SlidersHorizontal size={15} />
            Customize Trip
          </Link>

          <a
            href={getWhatsAppLink("Hi Infi Yatra! I'd like to consult for a trip.")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => haptics.medium()}
            className="px-8 py-4 liquid-glass border border-white/30 text-white rounded-full font-black text-xs uppercase tracking-widest transition-all duration-300 hover:bg-white/20 backdrop-blur-md flex items-center gap-2"
          >
            <PhoneCall size={15} />
            Contact Us
          </a>
        </motion.div>
      </div>

      {/* Prev / Next Circular Navigation Arrows */}
      <button
        onClick={goToPrev}
        aria-label="Previous Slide"
        className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full liquid-glass border border-white/25 text-white hover:bg-white hover:text-charcoal transition-all shadow-2xl hover:scale-110 active:scale-95 hidden sm:flex items-center justify-center backdrop-blur-xl"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={goToNext}
        aria-label="Next Slide"
        className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full liquid-glass border border-white/25 text-white hover:bg-white hover:text-charcoal transition-all shadow-2xl hover:scale-110 active:scale-95 hidden sm:flex items-center justify-center backdrop-blur-xl"
      >
        <ChevronRight size={24} />
      </button>

      {/* Bottom Pagination Bar - Guaranteed Bottom Position */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4 liquid-glass px-5 py-2.5 rounded-full border border-white/20 shadow-2xl backdrop-blur-2xl">
        <span className="text-[10px] font-black text-white/80 uppercase tracking-widest">
          {String(index + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
        </span>
        <div className="h-3 w-px bg-white/20" />
        <div className="flex gap-2 items-center">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === index ? "w-7 bg-secondary shadow-lg shadow-secondary/50" : "w-2 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
