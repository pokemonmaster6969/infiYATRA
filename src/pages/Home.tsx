import React, { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import HeroSection from "../components/home/HeroSection";
import StatsSection from "../components/home/StatsSection";
import FeaturedPackages from "../components/home/FeaturedPackages";
import WhyChooseUs from "../components/home/WhyChooseUs";
import TrendingDestinations from "../components/home/TrendingDestinations";
import TestimonialsSection from "../components/home/TestimonialsSection";
import NewsletterSection from "../components/home/NewsletterSection";
import SectionErrorBoundary from "../components/common/SectionErrorBoundary";

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

      <SectionErrorBoundary name="Hero"><HeroSection /></SectionErrorBoundary>
      <SectionErrorBoundary name="Stats"><StatsSection /></SectionErrorBoundary>
      <SectionErrorBoundary name="FeaturedPackages"><FeaturedPackages /></SectionErrorBoundary>
      <SectionErrorBoundary name="WhyChooseUs"><WhyChooseUs /></SectionErrorBoundary>
      <SectionErrorBoundary name="TrendingDestinations"><TrendingDestinations /></SectionErrorBoundary>
      <SectionErrorBoundary name="Testimonials"><TestimonialsSection /></SectionErrorBoundary>
      <SectionErrorBoundary name="Newsletter"><NewsletterSection /></SectionErrorBoundary>
    </div>
  );
}
