import React from 'react'
import HeroSection from "../components/home/HeroSection";
import StatsSection from "../components/home/StatsSection";
import FeaturedPackages from "../components/home/FeaturedPackages";
import WhyChooseUs from "../components/home/WhyChooseUs";
import TrendingDestinations from "../components/home/TrendingDestinations";
import TestimonialsSection from "../components/home/TestimonialsSection";
import NewsletterSection from "../components/home/NewsletterSection";

export default function Home() {
  return (
    <div className="bg-charcoal">
      <HeroSection />
      <StatsSection />
      <FeaturedPackages />
      <WhyChooseUs />
      <TrendingDestinations />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
}
