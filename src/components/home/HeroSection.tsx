import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";

import { heroSlides as staticHeroSlides, getWhatsAppLink } from "../../lib/data";
import { getHeroSlides, optimizeImageUrl } from "../../lib/dataService";
import { haptics } from "../../lib/haptics";

const textVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.8, ease: "easeOut" }
    },
    exit: {
        opacity: 0,
        y: -20,
        filter: "blur(10px)",
        transition: { duration: 0.5, ease: "easeIn" }
    }
};

export default function HeroSection() {
    // Seed with static slides immediately - never render an empty hero.
    const [heroSlides, setHeroSlides] = useState<any[]>(staticHeroSlides || []);
    const [index, setIndex] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const mountedRef = useRef(true);

    useEffect(() => {
        mountedRef.current = true;
        getHeroSlides()
            .then((slides) => {
                if (!mountedRef.current) return;
                if (Array.isArray(slides) && slides.length > 0) {
                    setHeroSlides(slides);
                    slides.slice(0, 2).forEach((slide: any) => {
                        if (!slide?.image) return;
                        const img = new Image();
                        img.src = optimizeImageUrl(slide.image, 1920, 85);
                    });
                }
            })
            .catch((err) => {
                console.error("HeroSection: getHeroSlides failed, using static fallback", err);
            });

        return () => {
            mountedRef.current = false;
        };
    }, []);

    const startTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        if (heroSlides.length <= 1) return;
        timerRef.current = setInterval(() => {
            setIndex((prev) => (prev + 1) % heroSlides.length);
        }, 6000);
    }, [heroSlides.length]);

    useEffect(() => {
        if (heroSlides.length === 0) return;
        startTimer();

        const nextIndex = (index + 1) % heroSlides.length;
        const nextSlide = heroSlides[nextIndex];
        if (nextSlide?.image) {
            const img = new Image();
            img.src = optimizeImageUrl(nextSlide.image, 1920, 85);
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [heroSlides.length, index, startTimer]);

    const goTo = (i: number) => {
        setIndex(i);
        startTimer();
    };

    const safeIndex = index < heroSlides.length ? index : 0;
    const slide = heroSlides[safeIndex] || {
        image: "/images/hero-fallback.jpg",
        title: "Travel, the way it should feel",
        subtitle: "Curated adventures from the Himalayas to Bali"
    };

    return (
        <section className="relative h-screen min-h-[600px] overflow-hidden bg-charcoal">
            <Helmet>
                {heroSlides.slice(0, 2).map((s, i) =>
                    s?.image ? (
                        <link key={`preload-${i}`} rel="preload" as="image" href={s.image} />
                    ) : null
                )}
            </Helmet>

            <AnimatePresence initial={false}>
                <motion.div
                    key={`bg-${safeIndex}`}
                    initial={{ opacity: 0, scale: 1.15 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        opacity: { duration: 1.5, ease: "easeInOut" },
                        scale: { duration: 10, ease: "easeOut" }
                    }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={optimizeImageUrl(slide.image, 1920, 85)}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                        loading="eager"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = "/images/hero-fallback.jpg";
                        }}
                    />
                </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80 z-10" />

            <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center px-4 max-w-4xl w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`content-${safeIndex}`}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
                            className="flex flex-col items-center"
                        >
                            <motion.h1
                                variants={textVariants}
                                className="font-display font-black text-4xl sm:text-5xl lg:text-7xl text-white mb-6 leading-[1.1] uppercase tracking-tighter drop-shadow-2xl"
                            >
                                {slide.title}
                            </motion.h1>

                            <motion.p
                                variants={textVariants}
                                className="text-white/90 text-lg sm:text-xl lg:text-2xl mb-10 font-medium italic drop-shadow-md max-w-2xl"
                            >
                                {slide.subtitle}
                            </motion.p>

                            <motion.div
                                variants={textVariants}
                                className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
                            >
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        to="/discover"
                                        onClick={() => haptics.medium()}
                                        className="flex items-center justify-center px-10 py-4 bg-secondary text-white rounded-full font-black text-xs uppercase tracking-widest transition-colors duration-300 hover:bg-white hover:text-charcoal shadow-[0_0_40px_rgba(255,107,53,0.3)] w-full sm:min-w-[220px]"
                                    >
                                        Explore Packages
                                    </Link>
                                </motion.div>

                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    
                                        href={getWhatsAppLink()}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => haptics.medium()}
                                        className="flex items-center justify-center px-10 py-4 backdrop-blur-md bg-white/10 border border-white/20 text-white rounded-full font-black text-xs uppercase tracking-widest transition-all duration-300 hover:bg-white/20 hover:border-white/40 w-full sm:min-w-[220px]"
                                    >
                                        Contact Us
                                    </a>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
                {heroSlides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            haptics.light();
                            goTo(i);
                        }}
                        className="relative h-2 w-10 flex items-center justify-center group"
                        aria-label={`Go to slide ${i + 1}`}
                    >
                        <div className="absolute inset-0 bg-white/20 rounded-full group-hover:bg-white/40 transition-colors" />
                        {i === safeIndex && (
                            <motion.div
                                layoutId="activeDot"
                                className="absolute inset-0 bg-secondary rounded-full shadow-[0_0_15px_rgba(255,107,53,0.5)]"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                    </button>
                ))}
            </div>

            <motion.div
                animate={{ y: [0, 15, 0], opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30"
                aria-hidden="true"
            >
                <div className="w-px h-16 bg-gradient-to-b from-white/80 via-white/40 to-transparent"></div>
            </motion.div>
        </section>
    );
}
