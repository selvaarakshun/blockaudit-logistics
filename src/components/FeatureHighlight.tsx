
import { Check, Truck, ShieldCheck, Search, BarChart } from 'lucide-react';

const FeatureHighlight = () => {
  const features = [
    {
      icon: <Truck className="size-6" />,
      title: 'Real-Time Tracking',
      description: 'Monitor your shipments in real-time with precise location data verified by blockchain technology.'
    },
    {
      icon: <ShieldCheck className="size-6" />,
      title: 'Tamper-Proof Records',
      description: 'All logistics data is secured on the blockchain, making it immutable and impossible to falsify.'
    },
    {
      icon: <Search className="size-6" />,
      title: 'Complete Audit Trail',
      description: 'Access a comprehensive history of all actions, changes, and verifications throughout the supply chain.'
    },
    {
      icon: <BarChart className="size-6" />,
      title: 'Advanced Analytics',
      description: 'Gain valuable insights into your supply chain performance with data-driven analytics tools.'
    }
  ];

  const benefits = [
    'Enhanced transparency across your supply chain',
    'Reduced fraud and counterfeit products',
    'Increased stakeholder trust and confidence',
    'Streamlined compliance and regulatory reporting',
    'Accelerated dispute resolution',
    'Improved operational efficiency'
  ];

  return (
    <div id="features" className="py-16 md:py-24">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Transforming Logistics & Auditing
          </h2>
          <p className="text-lg text-logistics-gray">
            Our platform combines blockchain technology with intuitive design to create a seamless logistics and auditing experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-logistics-dark/50 rounded-xl border border-border p-6 transition-all hover:shadow-medium"
            >
              <div className="size-12 rounded-md bg-logistics-light-blue dark:bg-logistics-blue/10 flex items-center justify-center mb-4 text-logistics-blue">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-logistics-gray">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Experience the Blockchain Advantage</h2>
            <p className="text-lg text-logistics-gray mb-8">
              Our blockchain-based solution provides unmatched security, transparency, and efficiency for your supply chain operations.
            </p>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="size-5 rounded-full bg-logistics-success/10 flex items-center justify-center">
                      <Check className="size-3 text-logistics-success" />
                    </div>
                  </div>
                  <p>{benefit}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            {/* Abstract visualization of blockchain and logistics */}
            <div className="aspect-square max-w-md mx-auto relative">
              <div className="absolute inset-0 rounded-full bg-logistics-light-blue dark:bg-logistics-blue/5 animate-pulse"></div>
              
              <div className="absolute inset-8 size-full rounded-full border-4 border-dashed border-logistics-blue/30 animate-spin" style={{ animationDuration: '30s' }}></div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-32 md:size-40 rounded-full bg-white dark:bg-logistics-dark border border-border shadow-medium flex items-center justify-center">
                  <div className="size-14 md:size-16 rounded-full bg-logistics-blue flex items-center justify-center">
                    <Truck className="size-8 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Orbital nodes */}
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute size-8 md:size-10 rounded-full bg-white dark:bg-logistics-dark border border-border shadow-medium flex items-center justify-center animate-float"
                  style={{
                    top: `${15 + Math.random() * 70}%`,
                    left: `${15 + Math.random() * 70}%`,
                    animationDelay: `${i * 0.5}s`
                  }}
                >
                  <div className="size-4 md:size-5 rounded-full bg-logistics-light-blue dark:bg-logistics-blue/20"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureHighlight;
