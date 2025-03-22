
import { Shield, Link as LinkIcon, Share2, Clock, CheckCircle2 } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

const TechnologySection = () => {
  const features = [
    { 
      icon: <Shield className="size-6" />, 
      title: 'Immutable Records', 
      description: 'All data stored on the GuudzChain is tamper-proof and permanent, ensuring complete data integrity.' 
    },
    { 
      icon: <LinkIcon className="size-6" />, 
      title: 'Blockchain Security', 
      description: 'Our distributed ledger technology provides unmatched security through cryptographic verification.' 
    },
    { 
      icon: <Share2 className="size-6" />, 
      title: 'Transparent Sharing', 
      description: 'Authorized stakeholders can access the same verified data in real-time across the supply chain.' 
    },
    { 
      icon: <Clock className="size-6" />, 
      title: 'Real-time Updates', 
      description: 'Track changes and shipments as they happen with immediate blockchain verification.' 
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-logistics-light-gray dark:bg-logistics-dark/50">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Technology</h2>
          <p className="text-lg text-logistics-gray">
            GuudzChain combines private and public blockchain technologies to create a flexible, scalable solution for supply chain management.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-logistics-dark shadow-medium rounded-xl p-6 border border-border transition-transform hover:scale-105"
            >
              <div className="size-14 rounded-md bg-logistics-light-blue dark:bg-logistics-blue/10 flex items-center justify-center mb-5 text-logistics-blue">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-logistics-gray">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4">How GuudzChain Works</h3>
            <p className="text-logistics-gray mb-6">
              Our platform uses a distributed ledger to create an immutable record of all transactions and movements in your supply chain.
            </p>
            
            <ul className="space-y-4">
              {[
                'Smart contracts automate verification',
                'Cryptographic security protects all data',
                'Consensus algorithms ensure agreement',
                'API integrations connect with existing systems',
                'Real-time synchronization across nodes'
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="size-5 rounded-full bg-logistics-success/10 flex items-center justify-center">
                      <CheckCircle2 className="size-3 text-logistics-success" />
                    </div>
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="lg:col-span-2 rounded-xl overflow-hidden shadow-medium border border-border">
            <div className="h-full bg-white dark:bg-logistics-dark p-8 relative">
              <h4 className="text-xl font-semibold mb-4">Blockchain Architecture</h4>
              
              <div className="pt-6 space-y-6">
                <div className="flex items-center gap-4 overflow-x-auto pb-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center flex-shrink-0">
                      <div className="size-16 md:size-20 border border-border bg-logistics-light-blue/20 dark:bg-logistics-blue/10 rounded-md flex flex-col items-center justify-center p-2">
                        <div className="text-xs text-logistics-gray mb-1">Block {7582 + i}</div>
                        <div className="text-xs font-mono text-logistics-blue overflow-hidden text-ellipsis">
                          {`0x${Math.random().toString(16).substring(2, 10)}...`}
                        </div>
                      </div>
                      {i < 4 && <ArrowRight className="size-5 text-logistics-gray mx-1" />}
                    </div>
                  ))}
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <div className="rounded-md border border-border p-4 bg-logistics-light-gray/50 dark:bg-white/5">
                      <h5 className="text-sm font-medium mb-2">Smart Contract Example</h5>
                      <pre className="text-xs font-mono overflow-x-auto p-2 bg-white/80 dark:bg-black/20 rounded">
                        <code>{`contract ShipmentVerification {
  address public shipper;
  address public receiver;
  bytes32 public shipmentHash;
  
  function verifyDelivery(
    bytes32 _hash
  ) public returns (bool) {
    require(msg.sender == receiver);
    require(_hash == shipmentHash);
    // Verification logic
    return true;
  }
}`}</code>
                      </pre>
                    </div>
                  </div>
                  
                  <div>
                    <div className="h-full rounded-md border border-border p-4 bg-logistics-light-gray/50 dark:bg-white/5">
                      <h5 className="text-sm font-medium mb-2">Verification Process</h5>
                      <ol className="text-sm space-y-2 list-decimal pl-5">
                        <li>Shipment data is hashed</li>
                        <li>Hash stored on blockchain</li>
                        <li>Smart contract created</li>
                        <li>Parties sign digitally</li>
                        <li>Automatic execution</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
