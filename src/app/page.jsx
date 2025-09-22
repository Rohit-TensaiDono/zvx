"use client";
import React, { useState, useEffect } from 'react';
import HeroSection from '@/components/landing/HeroSection';
import ProductsSection from '@/components/landing/ProductsSection';
import AboutSection from '@/components/landing/AboutSection';
import ContactSection from '@/components/landing/ContactSection';
import Footer from '@/components/landing/Footer';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white overflow-x-hidden">
      <HeroSection />
      <ProductsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}