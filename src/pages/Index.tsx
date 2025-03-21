
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureHighlight from "@/components/FeatureHighlight";
import Footer from "@/components/Footer";
import BlockchainHero from "@/components/blockchain/BlockchainHero";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container px-4 lg:px-8 mx-auto flex-grow mt-16">
        <div className="py-6 md:py-12">
          <Hero />
        </div>
        
        <div className="py-8">
          <h2 className="text-3xl font-bold text-center mb-8">Blockchain Powered Platform</h2>
          <BlockchainHero />
        </div>
        
        <div className="py-8 md:py-12">
          <FeatureHighlight />
        </div>
      </main>
      <Footer />
    </div>
  );
}
