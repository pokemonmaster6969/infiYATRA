import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Compass, Sparkles, SlidersHorizontal, PhoneCall } from "lucide-react";
import ResponsiveImage from "../ResponsiveImage";
import { heroSlides as staticHeroSlides, getWhatsAppLink } from "../../lib/data";
import { getHeroSlides, optimizeImageUrl } from "../../lib/dataService";
import { haptics } from "../../lib/haptics";

export default function HeroSection() {
  const [heroSlides, setHeroSlides] = useState<any[]>(staticHeroSlides);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchSlides = () => {
      getHeroSlides().then((slides) => {
        if (slides && slides.length > 0) {
          setHeroSlides(slides);
        }
      });
    };

    fetchSlides();
    window.addEventListener('hero_slides_updated', fetchSlides);
    return () => window.removeEventListener('hero_slides_updated', fetchSlides);
  }, []);

  useEffect(() => {
    if (!heroSlides || heroSlides.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const goToPrev = () => {
    haptics.medium();
    setIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToNext = () => {
    haptics.medium();
    setIndex((prev) => (prev + 1) % heroSlides.length);
  };

  const slide = heroSlides[index] || {
    image: "/assets/beaut.jpg",
    title: "Discover Meaningful Travel",
    subtitle: "Crafting memories that stay with you forever."
  };

  return (
    <section className="relative flex h-[100svh] min-h-[660px] max-h-[1080px] w-full select-none flex-col items-center justify-end overflow-hidden bg-black">
      {/* Background Images with smooth fade transition */}
      <div className="absolute inset-0 z-0">
        <div key={`bg-${index}`} className="absolute inset-0 h-full w-full animate-fade-in">
          <ResponsiveImage
            src={slide.image}
            alt={slide.title}
            sizes="100vw"
            fetchPriority="high"
            className="h-full w-full object-cover"
            loading="eager"
          />
        </div>
      </div>

      {/* Subtle dark overlay — lets the image show through */}
      <div className="absolute inset-0 z-10 pointer-events-none" style={{
        background: `
          linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 45%, rgba(0,0,0,0.3) 100%),
          radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)
        `
      }} />

      {/* Main Hero Content — pushed towards bottom for cinematic feel */}
      <div className="relative z-20 mx-auto w-full max-w-[1320px] px-5 pb-20 text-left sm:px-8 sm:pb-24 lg:px-12 lg:pb-28">
        <div key={`content-${index}`} className="max-w-4xl animate-fade-in space-y-3">
          <h1 className="font-display text-4xl font-black uppercase italic leading-[0.96] tracking-tight text-white drop-shadow-2xl sm:text-6xl md:text-7xl lg:text-8xl">
            {slide.title}
          </h1>
          <p className="max-w-xl text-sm font-medium leading-relaxed text-white/80 drop-shadow-md sm:text-base lg:text-lg">
            {slide.subtitle}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="mt-6 flex animate-fade-in flex-col items-stretch gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 [animation-delay:180ms]">
          <Link
            to="/discover"
            onClick={() => haptics.medium()}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-secondary px-6 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-secondary/30 transition-all hover:bg-secondary-light sm:px-7"
          >
            <Compass size={15} />
            Explore Packages
          </Link>

          <Link
            to="/customize"
            onClick={() => haptics.medium()}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg liquid-glass px-5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/20 sm:px-6"
          >
            <SlidersHorizontal size={15} />
            Customize Trip
          </Link>

          <a
            href={getWhatsAppLink("Hi Infi Yatra! I'd like to consult for a trip.")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => haptics.medium()}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg liquid-glass px-5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/20 sm:px-6"
          >
            <PhoneCall size={15} />
            Contact Us
          </a>
        </div>
      </div>

      {/* Prev / Next Arrows */}
      <button
        onClick={goToPrev}
        aria-label="Previous Slide"
        className="absolute left-4 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full liquid-glass text-white shadow-xl transition-colors hover:bg-white/20 sm:flex lg:left-8"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={goToNext}
        aria-label="Next Slide"
        className="absolute right-4 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full liquid-glass text-white shadow-xl transition-colors hover:bg-white/20 sm:flex lg:right-8"
      >
        <ChevronRight size={24} />
      </button>
    </section>
  );
}
