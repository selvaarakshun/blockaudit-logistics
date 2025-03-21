
import { ChevronRight, TrendingUp, Shield, FileText, Star, Award, Zap, ArrowRight } from 'lucide-react';
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
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance bg-gradient-to-r from-logistics-blue to-logistics-indigo bg-clip-text text-transparent dark:from-white dark:to-logistics-blue">
            Transparent Logistics & <br className="hidden sm:block" />
            Compliance with GuudzChain
          </h1>
          
          <p className="text-lg md:text-xl text-logistics-gray max-w-2xl mx-auto mb-8 text-balance">
            Revolutionize your supply chain with immutable records, real-time tracking, tax compliance, and complete transparency using our blockchain-based platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard" className="btn-primary text-base h-12 px-6 shadow-medium hover:shadow-strong transition-all">
              Get Started
            </Link>
            <Link to="/tax-compliance" className="btn-secondary text-base h-12 px-6 flex items-center justify-center gap-1">
              Tax Compliance <ChevronRight className="size-4" />
            </Link>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
          <div className="bg-white dark:bg-logistics-dark/50 border border-border rounded-xl p-6 shadow-subtle transition-all hover:shadow-medium animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="size-12 bg-logistics-light-blue dark:bg-logistics-blue/10 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="size-6 text-logistics-blue" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Real-time Tracking</h3>
            <p className="text-logistics-gray">Monitor your shipments in real-time with immutable blockchain records</p>
          </div>
          
          <div className="bg-white dark:bg-logistics-dark/50 border border-border rounded-xl p-6 shadow-subtle transition-all hover:shadow-medium animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="size-12 bg-logistics-light-blue dark:bg-logistics-blue/10 rounded-lg flex items-center justify-center mb-4">
              <Shield className="size-6 text-logistics-blue" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Tax Compliance</h3>
            <p className="text-logistics-gray">Automated customs duty calculation and compliance documentation</p>
          </div>
          
          <div className="bg-white dark:bg-logistics-dark/50 border border-border rounded-xl p-6 shadow-subtle transition-all hover:shadow-medium animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="size-12 bg-logistics-light-blue dark:bg-logistics-blue/10 rounded-lg flex items-center justify-center mb-4">
              <FileText className="size-6 text-logistics-blue" />
            </div>
            <h3 className="text-lg font-semibold mb-2">ICEGATE Integration</h3>
            <p className="text-logistics-gray">Seamless integration with Indian Customs EDI Gateway for documentation</p>
          </div>
        </div>

        {/* Enhanced blockchain visualization */}
        <div className="relative mt-16 max-w-4xl mx-auto animate-fade-in">
          <div className="aspect-[16/9] bg-white dark:bg-logistics-dark/90 backdrop-blur-md border border-border overflow-hidden rounded-xl shadow-strong relative">
            <div className="absolute inset-0 bg-gradient-to-bl from-logistics-light-blue/20 to-transparent dark:from-logistics-blue/10"></div>
            
            {/* Enhanced blockchain node visualizations */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-4 sm:gap-8 lg:gap-12 px-6 py-8 w-full h-full">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="relative">
                    <div className={`absolute size-3 sm:size-4 lg:size-5 bg-logistics-blue rounded-full ${i % 2 === 0 ? 'animate-pulse' : ''}`} style={{
                      top: `${20 + Math.random() * 60}%`,
                      left: `${20 + Math.random() * 60}%`,
                    }}></div>
                    
                    {/* Connection lines with animation */}
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
            
            {/* Credit Scores & Insurance panel */}
            <div className="absolute top-4 left-4 right-4 bg-white/80 dark:bg-logistics-dark/80 backdrop-blur-sm rounded-lg border border-border p-3 flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="size-8 bg-logistics-light-blue/30 dark:bg-logistics-blue/20 rounded-full flex items-center justify-center">
                  <Star className="size-4 text-logistics-blue" />
                </div>
                <div>
                  <div className="text-xs text-logistics-gray">Credit Score</div>
                  <div className="text-sm font-semibold">85 / 100</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="size-8 bg-logistics-light-blue/30 dark:bg-logistics-blue/20 rounded-full flex items-center justify-center">
                  <Shield className="size-4 text-logistics-blue" />
                </div>
                <div>
                  <div className="text-xs text-logistics-gray">Insurance</div>
                  <div className="text-sm font-semibold">Available</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="size-8 bg-logistics-light-blue/30 dark:bg-logistics-blue/20 rounded-full flex items-center justify-center">
                  <Zap className="size-4 text-logistics-blue" />
                </div>
                <div>
                  <div className="text-xs text-logistics-gray">Transactions</div>
                  <div className="text-sm font-semibold">128 Verified</div>
                </div>
              </div>
            </div>
            
            {/* Animated blocks */}
            <div className="absolute bottom-16 left-4 right-4 h-16 flex gap-2 overflow-hidden">
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
            
            {/* Redesigned GuudzChain Technology box */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
              <div className="bg-logistics-blue/90 text-white px-4 py-2 rounded-lg shadow-strong flex items-center gap-2 backdrop-blur-sm">
                <Award className="size-5" />
                <span className="font-medium">Powered by GuudzChain Technology</span>
              </div>
              
              <Link to="/blockchain-explorer" className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg shadow-medium flex items-center gap-1 transition-colors">
                Explorer
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
