
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
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
  );
};

export default CTASection;
