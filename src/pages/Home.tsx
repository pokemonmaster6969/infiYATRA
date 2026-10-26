import React, { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import HeroSection from "../components/home/HeroSection";

const StatsSection = lazy(() => import('../components/home/StatsSection'))
const FeaturedPackages = lazy(() => import('../components/home/FeaturedPackages'))
const WhyChooseUs = lazy(() => import('../components/home/WhyChooseUs'))
const TrendingDestinations = lazy(() => import('../components/home/TrendingDestinations'))
const TestimonialsSection = lazy(() => import('../components/home/TestimonialsSection'))
const NewsletterSection = lazy(() => import('../components/home/NewsletterSection'))

const HomeSection = ({
  Component,
  placeholderClassName,
}: {
  Component: React.LazyExoticComponent<React.ComponentType>
  placeholderClassName: string
}) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isNearViewport, setIsNearViewport] = useState(false)

  useEffect(() => {
    if (!sectionRef.current || isNearViewport) return
    const element = sectionRef.current
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsNearViewport(true)
        observer.disconnect()
      }
    }, { rootMargin: '0px' })

    observer.observe(element)
    return () => observer.disconnect()
  }, [isNearViewport])

  return (
    <div ref={sectionRef} className="relative">
      {isNearViewport ? (
        <Suspense fallback={<div className={`animate-pulse bg-white/[0.025] ${placeholderClassName}`} aria-hidden="true" />}>
          <Component />
        </Suspense>
      ) : (
        <div className={`bg-white/[0.015] ${placeholderClassName}`} aria-hidden="true" />
      )}
    </div>
  )
}

export default function Home() {
  return (
    <div className="bg-charcoal">
      <Helmet>
        <title>INFIYATRA — Ahmedabad's Premier Travel Community</title>
        <meta name="description" content="Discover meaningful travel experiences with Ahmedabad's most authentic travel community. Curated domestic and international trips led by verified local captains." />
        <meta property="og:title" content="INFIYATRA — The Art of Meaningful Travel" />
        <meta property="og:description" content="Curated adventures from the Himalayas to Bali. Join 100K+ travelers." />
        <meta property="og:type" content="website" />
      </Helmet>
      <HeroSection />
      <HomeSection Component={StatsSection} placeholderClassName="min-h-[280px] lg:min-h-[220px]" />
      <HomeSection Component={FeaturedPackages} placeholderClassName="min-h-[700px] lg:min-h-[580px]" />
      <HomeSection Component={WhyChooseUs} placeholderClassName="min-h-[620px] md:min-h-[340px]" />
      <HomeSection Component={TrendingDestinations} placeholderClassName="min-h-[1050px] md:min-h-[600px]" />
      <HomeSection Component={TestimonialsSection} placeholderClassName="min-h-[560px] md:min-h-[390px]" />
      <HomeSection Component={NewsletterSection} placeholderClassName="min-h-[300px]" />
    </div>
  );
}
