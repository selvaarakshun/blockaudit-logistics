
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Blocks, Database, Network, Server, Shield, Zap } from 'lucide-react';
import BlockchainAnimation from './BlockchainAnimation';

const BlockchainHero = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);
  
  const features = [
    {
      icon: <Blocks className="h-8 w-8 text-blue-500" />,
      title: "Decentralized Ledger",
      description: "Secure and transparent record-keeping across distributed nodes"
    },
    {
      icon: <Network className="h-8 w-8 text-purple-500" />,
      title: "Cross-Chain Interoperability",
      description: "Seamlessly connect and transfer assets between different blockchain networks"
    },
    {
      icon: <Database className="h-8 w-8 text-green-500" />,
      title: "Smart Contracts",
      description: "Self-executing contracts with terms directly written in code"
    },
    {
      icon: <Shield className="h-8 w-8 text-red-500" />,
      title: "Enhanced Security",
      description: "Immutable records protected by advanced cryptographic techniques"
    },
    {
      icon: <Server className="h-8 w-8 text-yellow-500" />,
      title: "Hyperledger Fabric",
      description: "Enterprise-grade permissioned blockchain for business applications"
    },
  ];

  useEffect(() => {
    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="relative w-full min-h-[500px] bg-gray-900 overflow-hidden rounded-xl shadow-2xl">
      {/* Background animation */}
      <div className="absolute inset-0">
        <BlockchainAnimation />
      </div>
      
      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 py-12 text-white z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-blue-400">Guudz</span>Chain
            <span className="ml-2 inline-flex items-center bg-blue-500 px-2 py-1 rounded-md text-lg">
              <Zap className="h-4 w-4 mr-1" /> 
              Powered
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Next-generation blockchain platform for supply chain, logistics, and cross-chain interoperability
          </p>
        </motion.div>
        
        {/* Feature highlights */}
        <div className="w-full max-w-3xl mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg"
            >
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="bg-gray-800/80 rounded-full p-4">
                  {features[activeFeature].icon}
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-2xl font-bold mb-2">{features[activeFeature].title}</h3>
                  <p className="text-gray-300">{features[activeFeature].description}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Feature indicators */}
          <div className="flex justify-center mt-4 gap-2">
            {features.map((_, idx) => (
              <button
                key={idx}
                className={`h-2 rounded-full transition-all ${
                  idx === activeFeature ? "w-8 bg-blue-500" : "w-2 bg-gray-500"
                }`}
                onClick={() => setActiveFeature(idx)}
              />
            ))}
          </div>
        </div>
        
        {/* CTA buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            size="lg" 
            onClick={() => navigate('/blockchain-dashboard')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Explore Dashboard
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={() => navigate('/blockchain-explorer')}
            className="text-white border-white hover:bg-white/10"
          >
            Try Explorer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlockchainHero;
