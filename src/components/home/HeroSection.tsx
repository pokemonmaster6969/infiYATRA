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
    <section className="relative w-full h-[100vh] min-h-[680px] max-h-[1080px] overflow-hidden bg-black flex flex-col justify-end items-center select-none">
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
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
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

      {/* Subtle dark overlay — lets the image show through */}
      <div className="absolute inset-0 z-10 pointer-events-none" style={{
        background: `
          linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.25) 100%),
          radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)
        `
      }} />

      {/* Main Hero Content — pushed towards bottom for cinematic feel */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-6 text-center pb-32 md:pb-36">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/15 shadow-lg backdrop-blur-md mb-6"
        >
          <Sparkles size={13} className="text-secondary animate-pulse" />
          <span className="text-[10px] font-black text-white/90 uppercase tracking-[0.3em]">
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

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-8"
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
            className="px-8 py-4 bg-white/10 border border-white/25 text-white rounded-full font-black text-xs uppercase tracking-widest transition-all duration-300 hover:bg-white/20 backdrop-blur-md flex items-center gap-2"
          >
            <PhoneCall size={15} />
            Contact Us
          </a>
        </motion.div>
      </div>

      {/* Prev / Next Arrows */}
      <button
        onClick={goToPrev}
        aria-label="Previous Slide"
        className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/30 border border-white/15 text-white hover:bg-white hover:text-black transition-all shadow-xl hover:scale-110 active:scale-95 hidden sm:flex items-center justify-center backdrop-blur-sm"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={goToNext}
        aria-label="Next Slide"
        className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/30 border border-white/15 text-white hover:bg-white hover:text-black transition-all shadow-xl hover:scale-110 active:scale-95 hidden sm:flex items-center justify-center backdrop-blur-sm"
      >
        <ChevronRight size={24} />
      </button>

      {/* Bottom Center Pagination */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4 bg-black/40 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 shadow-xl">
        <span className="text-[10px] font-black text-white/70 uppercase tracking-widest">
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
