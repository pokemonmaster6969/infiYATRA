import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { heroSlides, getWhatsAppLink } from "../../lib/data";

export default function HeroSection() {
  // imageIndex transitions first, textIndex follows 1s later
  const [imageIndex, setImageIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      // Step 1: advance the image immediately
      setImageIndex((prev) => {
        const next = (prev + 1) % heroSlides.length;
        // Step 2: update text 1 second after the image starts loading
        setTimeout(() => {
          setTextIndex(next);
        }, 1000);
        return next;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Allow dot-navigation to keep the stagger
  const goTo = (i: number) => {
    setImageIndex(i);
    setTimeout(() => setTextIndex(i), 1000);
  };

  const imageSlide = heroSlides[imageIndex];
  const textSlide = heroSlides[textIndex];

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background Image — transitions first */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`img-${imageIndex}`}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={imageSlide.image}
            alt={imageSlide.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

      {/* Text Content — transitions 1s after image */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-4 max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${textIndex}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="font-display font-black text-4xl sm:text-5xl lg:text-7xl text-white mb-4 leading-tight uppercase tracking-tighter liquid-text"
            >
              {textSlide.title}
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={`sub-${textIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-white/80 text-lg sm:text-xl lg:text-2xl mb-8 font-medium italic"
            >
              {textSlide.subtitle}
            </motion.p>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/discover"
              className="px-10 py-4 bg-secondary text-white rounded-full font-black text-xs uppercase tracking-widest transition-all duration-300 hover:scale-105 hover:bg-white hover:text-charcoal shadow-2xl shadow-secondary/30 min-w-[220px]"
            >
              Explore Packages
            </Link>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 liquid-glass text-white rounded-full font-black text-xs uppercase tracking-widest transition-all duration-300 hover:scale-105 border border-white/30 min-w-[220px]"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </div>

      {/* Dot Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === imageIndex ? "w-10 bg-secondary" : "w-1.5 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-white via-white/40 to-transparent"></div>
      </motion.div>
    </section>
  );
}
