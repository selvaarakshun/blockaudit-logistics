
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-24 md:pt-32 pb-16 md:pb-24 border-b border-border">
      {/* Background gradient effects */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-logistics-light-blue/20 to-transparent dark:from-logistics-blue/5 -z-10"></div>
      <div className="absolute -top-40 -right-40 size-[500px] rounded-full bg-logistics-blue/5 blur-3xl -z-10"></div>
      <div className="absolute -bottom-40 -left-40 size-[500px] rounded-full bg-logistics-indigo/5 blur-3xl -z-10"></div>

      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-white/50 dark:bg-white/5 backdrop-blur-sm mb-6 animate-fade-in">
            <span className="size-2 bg-logistics-success rounded-full animate-pulse"></span>
            <span className="text-sm text-logistics-gray">Blockchain Powered Logistics</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
            Transparent Logistics & Auditing 
            <span className="text-logistics-blue dark:text-logistics-blue"> with GuudzChain</span>
          </h1>
          
          <p className="text-lg md:text-xl text-logistics-gray max-w-2xl mx-auto mb-8 text-balance">
            Revolutionize your supply chain with immutable records, real-time tracking, and complete transparency using our blockchain-based platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard" className="btn-primary text-base h-12 px-6">
              Get Started
            </Link>
            <Link to="/about" className="btn-secondary text-base h-12 px-6 flex items-center justify-center gap-1">
              Learn More <ChevronRight className="size-4" />
            </Link>
          </div>
        </div>

        {/* Abstract blockchain visualization */}
        <div className="relative mt-12 lg:mt-16 max-w-4xl mx-auto animate-fade-in">
          <div className="aspect-[16/9] bg-white dark:bg-logistics-dark backdrop-blur-md border border-border overflow-hidden rounded-xl shadow-strong relative">
            <div className="absolute inset-0 bg-gradient-to-bl from-logistics-light-blue/20 to-transparent dark:from-logistics-blue/10"></div>
            
            {/* Blockchain node visualizations */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-4 sm:gap-8 lg:gap-12 px-6 py-8 w-full h-full">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="relative">
                    <div className={`absolute size-3 sm:size-4 lg:size-5 bg-logistics-blue rounded-full ${i % 2 === 0 ? 'animate-pulse' : ''}`} style={{
                      top: `${20 + Math.random() * 60}%`,
                      left: `${20 + Math.random() * 60}%`,
                    }}></div>
                    
                    {/* Connection lines */}
                    {i < 5 && (
                      <div className="absolute h-0.5 bg-logistics-blue/20 transform rotate-45" style={{
                        width: '100%',
                        top: '50%',
                        left: '50%',
                      }}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Animated blocks */}
            <div className="absolute bottom-4 left-4 right-4 h-16 flex gap-2 overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i}
                  className="flex-shrink-0 h-full aspect-square bg-white dark:bg-white/10 rounded-md border border-logistics-blue/20 flex items-center justify-center animate-float"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  <div className="size-6 rounded-full bg-logistics-blue/10 flex items-center justify-center">
                    <div className="size-2 rounded-full bg-logistics-blue"></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent dark:from-black/50"></div>
            
            <div className="absolute bottom-0 left-0 right-0 text-center p-4">
              <span className="inline-block px-3 py-1 bg-logistics-blue text-white text-xs font-medium rounded-full">
                Powered by GuudzChain Technology
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
