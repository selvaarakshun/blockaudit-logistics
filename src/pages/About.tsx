
import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutHero from '@/components/about/AboutHero';
import AboutOverview from '@/components/about/AboutOverview';
import TechnologySection from '@/components/about/TechnologySection';
import BenefitsSection from '@/components/about/BenefitsSection';
import GlobalCoverageSection from '@/components/about/GlobalCoverageSection';
import TeamSection from '@/components/about/TeamSection';
import CTASection from '@/components/about/CTASection';
import NavigationDots from '@/components/about/NavigationDots';

const About = () => {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  if (sectionRefs.current.length === 0) {
    sectionRefs.current = Array(5).fill(null);
  }
  
  useEffect(() => {
    const handleScroll = () => {
      const pageTop = window.scrollY + 200;
      let newActiveSection = 0;
      
      sectionRefs.current.forEach((section, index) => {
        if (section && pageTop >= section.offsetTop) {
          newActiveSection = index;
        }
      });
      
      setActiveSection(newActiveSection);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <AboutHero scrollToSection={scrollToSection} />
        
        <NavigationDots activeSection={activeSection} scrollToSection={scrollToSection} />
        
        <div ref={(el: HTMLDivElement | null) => sectionRefs.current[0] = el}>
          <AboutOverview />
        </div>
        
        <div ref={(el: HTMLDivElement | null) => sectionRefs.current[1] = el}>
          <TechnologySection />
        </div>
        
        <div ref={(el: HTMLDivElement | null) => sectionRefs.current[2] = el}>
          <BenefitsSection />
        </div>
        
        <div ref={(el: HTMLDivElement | null) => sectionRefs.current[3] = el}>
          <GlobalCoverageSection />
        </div>
        
        <div ref={(el: HTMLDivElement | null) => sectionRefs.current[4] = el}>
          <TeamSection />
        </div>
        
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
