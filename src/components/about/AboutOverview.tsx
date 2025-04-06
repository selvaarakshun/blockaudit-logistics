
import { Database, Search, CheckCircle2 } from 'lucide-react';
import AboutStatItem from './AboutStatItem';

const AboutOverview = () => {
  return (
    <section className="about-section">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="section-title">The GuudzChain Platform</h2>
            <p className="section-description">
              GuudzChain is a cutting-edge blockchain platform designed specifically for logistics and supply chain management. Our mission is to eliminate inefficiencies and create a new standard of transparency in global trade.
            </p>
            <p className="text-lg text-logistics-gray mb-8">
              Founded in 2023, we've rapidly grown to become the industry leader in blockchain-powered logistics solutions, serving clients across North America, Europe, and Asia.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <AboutStatItem value="250+" label="Global Clients" />
              <AboutStatItem value="36M+" label="Blockchain Transactions" />
              <AboutStatItem value="99.99%" label="Uptime Reliability" />
              <AboutStatItem value="45%" label="Cost Reduction" />
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-xl overflow-hidden shadow-strong">
              <div className="aspect-square bg-logistics-light-blue/20 dark:bg-logistics-blue/10 relative overflow-hidden">
                <div className="absolute inset-8 rounded-full border-4 border-dashed border-logistics-blue/30 animate-spin" style={{ animationDuration: '30s' }}></div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="size-40 rounded-full bg-white dark:bg-logistics-dark border border-border shadow-strong flex items-center justify-center">
                    <div className="size-16 rounded-full bg-logistics-blue flex items-center justify-center">
                      <Database className="size-8 text-white" />
                    </div>
                  </div>
                </div>
                
                {[...Array(6)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute size-10 rounded-lg bg-white dark:bg-logistics-dark border border-border shadow-medium flex items-center justify-center animate-float"
                    style={{
                      top: `${15 + Math.random() * 70}%`,
                      left: `${15 + Math.random() * 70}%`,
                      animationDelay: `${i * 0.5}s`,
                      transform: `rotate(${Math.random() * 30}deg)`
                    }}
                  >
                    {i % 3 === 0 && <CheckCircle2 className="size-5 text-logistics-blue" />}
                    {i % 3 === 1 && <Database className="size-5 text-logistics-blue" />}
                    {i % 3 === 2 && <Search className="size-5 text-logistics-blue" />}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 size-24 rounded-full bg-logistics-blue/10 -z-10"></div>
            <div className="absolute -top-6 -left-6 size-24 rounded-full bg-logistics-blue/10 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutOverview;
