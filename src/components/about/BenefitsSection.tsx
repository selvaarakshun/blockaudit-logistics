
import { Search, Database, Shield, Clock } from 'lucide-react';

const BenefitsSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Benefits for Your Business</h2>
          <p className="text-lg text-logistics-gray">
            GuudzChain delivers tangible results for logistics companies, manufacturers, and retailers through blockchain-powered transparency.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="space-y-8">
              {[
                {
                  title: 'Enhanced Transparency',
                  description: 'Complete visibility into your supply chain with an immutable record of all movements and transactions.',
                  icon: <Search className="size-6" />
                },
                {
                  title: 'Reduced Costs',
                  description: 'Eliminate intermediaries, paperwork, and manual verification processes through automation.',
                  icon: <Database className="size-6" />
                },
                {
                  title: 'Improved Security',
                  description: 'Cryptographic security ensures your data cannot be tampered with or falsified.',
                  icon: <Shield className="size-6" />
                },
                {
                  title: 'Faster Settlements',
                  description: 'Smart contracts automatically trigger payments when predefined conditions are met.',
                  icon: <Clock className="size-6" />
                }
              ].map((benefit, index) => (
                <div key={index} className="flex gap-5">
                  <div className="flex-shrink-0 size-12 rounded-full bg-logistics-light-blue dark:bg-logistics-blue/10 flex items-center justify-center text-logistics-blue">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-logistics-gray">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="rounded-xl overflow-hidden shadow-strong border border-border">
              <img 
                src="https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&q=80&w=900&h=900" 
                alt="Logistics operations with blockchain" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="absolute top-6 right-6 size-36 rounded-xl bg-white dark:bg-logistics-dark shadow-strong border border-border p-4 flex flex-col justify-center">
              <div className="text-3xl font-bold text-logistics-blue mb-1">42%</div>
              <p className="text-sm text-logistics-gray">Reduction in processing time</p>
            </div>
            
            <div className="absolute -bottom-8 -left-8 size-32 rounded-xl bg-white dark:bg-logistics-dark shadow-strong border border-border p-4 flex flex-col justify-center">
              <div className="text-3xl font-bold text-logistics-blue mb-1">65%</div>
              <p className="text-sm text-logistics-gray">Improved data accuracy</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
