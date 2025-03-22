
import LogisticsMap from '@/components/map/LogisticsMap';

const GlobalCoverageSection = () => {
  return (
    <section className="py-16 md:py-24 bg-logistics-light-gray dark:bg-logistics-dark/50">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Global Coverage</h2>
          <p className="text-lg text-logistics-gray">
            Our blockchain network spans the globe, providing seamless tracking and verification across international boundaries.
          </p>
        </div>
        
        <div className="rounded-xl overflow-hidden shadow-strong border border-border">
          <LogisticsMap />
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
  );
};

export default GlobalCoverageSection;
