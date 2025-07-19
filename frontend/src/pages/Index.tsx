import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ExploreSection from '@/components/ExploreSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import ScrollToTop from '@/components/ScrollToTop';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ExploreSection />
      <AboutSection />
      <ContactSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
