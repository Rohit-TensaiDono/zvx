import HeroSection     from '@/components/sections/HeroSection';
import ProductsSection from '@/components/sections/ProductsSection';
import AboutSection    from '@/components/sections/AboutSection';
import ContactSection  from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProductsSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
