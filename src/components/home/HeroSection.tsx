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
          linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.25) 100%),
          radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)
        `
      }} />

      {/* Main Hero Content — pushed towards bottom for cinematic feel */}
      <div className="relative z-20 mx-auto w-full max-w-[1320px] px-5 pb-28 text-left sm:px-8 sm:pb-32 lg:px-12 lg:pb-36">


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
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg liquid-glass px-5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/20 sm:px-6"
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

      {/* Bottom Center Pagination */}
      <div className="absolute bottom-4 left-1/2 z-30 flex max-w-[calc(100%-2rem)] -translate-x-1/2 items-center gap-2 rounded-full liquid-glass-dark px-3 py-2 sm:bottom-6 sm:gap-4 sm:px-5 sm:py-2.5">
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
              className="flex h-9 w-9 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white"
            >
              <span className={`block h-2 rounded-full transition-all duration-300 ${i === index ? 'w-5 bg-secondary' : 'w-2 bg-white/60'}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
