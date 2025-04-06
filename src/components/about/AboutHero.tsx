
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import BlockchainAnimation from '@/components/blockchain/BlockchainAnimation';

interface AboutHeroProps {
  scrollToSection: (index: number) => void;
}

const AboutHero = ({ scrollToSection }: AboutHeroProps) => {
  return (
    <section className="about-hero">
      <div className="absolute inset-0 -z-10">
        <BlockchainAnimation />
        <div className="absolute inset-0 bg-white/90 dark:bg-logistics-dark/90"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            About <span className="text-logistics-blue">GuudzChain</span>
          </h1>
          
          <p className="text-xl text-logistics-gray mb-8 max-w-2xl">
            We're revolutionizing the logistics industry with blockchain technology that brings transparency, security and efficiency to global supply chains.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => scrollToSection(1)} 
              className="btn-primary flex items-center gap-1"
            >
              Our Technology <ChevronRight className="size-4" />
            </button>
            <Link to="/blockchain-explorer" className="btn-secondary">
              Explore GuudzChain
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
