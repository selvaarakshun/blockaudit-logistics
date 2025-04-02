
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureHighlight from "@/components/FeatureHighlight";
import Footer from "@/components/Footer";
import BlockchainHero from "@/components/blockchain/BlockchainHero";
import { useAnimateInView } from "@/hooks/use-animation";

export default function Index() {
  const heroAnim = useAnimateInView();
  const featureAnim = useAnimateInView();
  const blockchainAnim = useAnimateInView();
  
  return (
    <div className="full-screen flex flex-col">
      <Navbar />
      <main className="flex-grow w-full mt-16">
        <div className="container-responsive">
          <div className="py-6 md:py-12" ref={heroAnim.ref}>
            <div className={heroAnim.isInView ? "animate-fade-in" : "opacity-0"}>
              <Hero />
            </div>
          </div>
          
          <div className="py-8" ref={blockchainAnim.ref}>
            <div className={blockchainAnim.isInView ? "animate-fade-in" : "opacity-0"}>
              <h2 className="text-3xl font-bold text-center mb-8">Blockchain Powered Platform</h2>
              <BlockchainHero />
            </div>
          </div>
          
          <div className="py-8 md:py-12" ref={featureAnim.ref}>
            <div className={featureAnim.isInView ? "animate-fade-in" : "opacity-0"}>
              <FeatureHighlight />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
