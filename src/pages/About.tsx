import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlockchainAnimation from '@/components/blockchain/BlockchainAnimation';
import { 
  ChevronRight, 
  Shield, 
  Link as LinkIcon, 
  Share2, 
  Clock, 
  CheckCircle2,
  Database,
  Search,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import InteractiveMap from '@/components/map/InteractiveMap';

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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <section className="relative py-20 border-b border-border overflow-hidden">
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
        
        <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col gap-4 z-40">
          {['Overview', 'Technology', 'Benefits', 'Map', 'Team'].map((label, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(index)}
              className="group flex items-center gap-2"
            >
              <div 
                className={`size-3 rounded-full transition-all duration-300 ${
                  activeSection === index 
                    ? 'bg-logistics-blue size-4' 
                    : 'bg-logistics-gray/50 group-hover:bg-logistics-gray'
                }`}
              ></div>
              <span 
                className={`text-sm opacity-0 group-hover:opacity-100 transition-opacity ${
                  activeSection === index ? 'text-logistics-blue font-medium' : 'text-logistics-gray'
                }`}
              >
                {label}
              </span>
            </button>
          ))}
        </div>
        
        <section 
          ref={(el: HTMLDivElement | null) => sectionRefs.current[0] = el} 
          className="py-16 md:py-24"
        >
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">The GuudzChain Platform</h2>
                <p className="text-lg text-logistics-gray mb-6">
                  GuudzChain is a cutting-edge blockchain platform designed specifically for logistics and supply chain management. Our mission is to eliminate inefficiencies and create a new standard of transparency in global trade.
                </p>
                <p className="text-lg text-logistics-gray mb-8">
                  Founded in 2023, we've rapidly grown to become the industry leader in blockchain-powered logistics solutions, serving clients across North America, Europe, and Asia.
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-logistics-blue mb-2">250+</div>
                    <p className="text-logistics-gray">Global Clients</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-logistics-blue mb-2">36M+</div>
                    <p className="text-logistics-gray">Blockchain Transactions</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-logistics-blue mb-2">99.99%</div>
                    <p className="text-logistics-gray">Uptime Reliability</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-logistics-blue mb-2">45%</div>
                    <p className="text-logistics-gray">Cost Reduction</p>
                  </div>
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
        
        <section 
          ref={(el: HTMLDivElement | null) => sectionRefs.current[1] = el}
          className="py-16 md:py-24 bg-logistics-light-gray dark:bg-logistics-dark/50"
        >
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
        
        <section 
          ref={(el: HTMLDivElement | null) => sectionRefs.current[2] = el}
          className="py-16 md:py-24"
        >
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
        
        <section 
          ref={(el: HTMLDivElement | null) => sectionRefs.current[3] = el}
          className="py-16 md:py-24 bg-logistics-light-gray dark:bg-logistics-dark/50"
        >
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Global Coverage</h2>
              <p className="text-lg text-logistics-gray">
                Our blockchain network spans the globe, providing seamless tracking and verification across international boundaries.
              </p>
            </div>
            
            <div className="rounded-xl overflow-hidden shadow-strong border border-border">
              <InteractiveMap />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              {[
                { region: 'North America', nodes: 247 },
                { region: 'Europe', nodes: 183 },
                { region: 'Asia Pacific', nodes: 156 },
                { region: 'Rest of World', nodes: 98 }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-logistics-blue mb-2">{item.nodes}</div>
                  <p className="text-logistics-gray">{item.region} Nodes</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section 
          ref={(el: HTMLDivElement | null) => sectionRefs.current[4] = el}
          className="py-16 md:py-24"
        >
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Team</h2>
              <p className="text-lg text-logistics-gray">
                Led by experts in blockchain, logistics, and enterprise software with a passion for innovation.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: 'Sarah Johnson',
                  role: 'CEO & Founder',
                  bio: 'Former logistics executive with 15+ years of experience in global supply chains',
                  image: 'https://randomuser.me/api/portraits/women/32.jpg'
                },
                {
                  name: 'Michael Chang',
                  role: 'CTO',
                  bio: 'Blockchain pioneer and architect with experience at major tech companies',
                  image: 'https://randomuser.me/api/portraits/men/45.jpg'
                },
                {
                  name: 'Elena Rodriguez',
                  role: 'Head of Operations',
                  bio: 'Supply chain optimization specialist with focus on emerging markets',
                  image: 'https://randomuser.me/api/portraits/women/63.jpg'
                },
                {
                  name: 'James Wilson',
                  role: 'Chief Revenue Officer',
                  bio: 'Sales leader specializing in enterprise blockchain adoption',
                  image: 'https://randomuser.me/api/portraits/men/22.jpg'
                }
              ].map((member, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-logistics-dark rounded-xl p-6 border border-border shadow-subtle"
                >
                  <div className="size-24 rounded-full overflow-hidden mx-auto mb-4">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-logistics-blue text-sm mb-3">{member.role}</p>
                    <p className="text-logistics-gray text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16 md:py-24 bg-logistics-blue text-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Supply Chain?
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Join the blockchain revolution with GuudzChain and bring unprecedented transparency to your logistics operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/dashboard" className="bg-white text-logistics-blue hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors">
                  Get Started
                </Link>
                <Link to="/blockchain-explorer" className="border border-white/30 hover:bg-white/10 px-6 py-3 rounded-md font-medium transition-colors">
                  Explore the Chain
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
