
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import FeatureHighlight from '@/components/FeatureHighlight';
import { ChevronRight, Users, TrendingUp, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <FeatureHighlight />
        
        {/* Testimonials Section */}
        <section className="py-16 md:py-24 bg-logistics-light-gray dark:bg-logistics-dark">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Trusted by Industry Leaders
              </h2>
              <p className="text-lg text-logistics-gray">
                See how our blockchain solution is transforming logistics operations around the world.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "GuudzChain has revolutionized our supply chain management. The transparency and security it provides are unmatched.",
                  author: "Sarah Johnson",
                  role: "Supply Chain Director, Global Logistics Inc."
                },
                {
                  quote: "Implementing GuudzChain has reduced our audit times by 75% while increasing accuracy. It's been transformative.",
                  author: "Michael Chen",
                  role: "Chief Operating Officer, FastTrack Shipping"
                },
                {
                  quote: "The immutable audit trail has been a game-changer for our compliance processes. We can verify every step in seconds.",
                  author: "Elena Rodriguez",
                  role: "Compliance Manager, EuroTrans Ltd."
                }
              ].map((testimonial, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-white/5 rounded-xl border border-border p-6 shadow-subtle"
                >
                  <div className="mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-logistics-warning">★</span>
                    ))}
                  </div>
                  <p className="text-lg mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 size-10 rounded-full bg-logistics-light-blue dark:bg-logistics-blue/10 flex items-center justify-center">
                      <span className="text-logistics-blue text-lg font-medium">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-logistics-gray">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Users className="size-8 text-logistics-blue" />,
                  number: "250+",
                  label: "Global Companies"
                },
                {
                  icon: <TrendingUp className="size-8 text-logistics-blue" />,
                  number: "3.5M+",
                  label: "Shipments Tracked"
                },
                {
                  icon: <Heart className="size-8 text-logistics-blue" />,
                  number: "99.8%",
                  label: "Customer Satisfaction"
                }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="text-center p-6 rounded-xl border border-border bg-white dark:bg-logistics-dark/50"
                >
                  <div className="flex-shrink-0 size-16 mx-auto rounded-full bg-logistics-light-blue dark:bg-logistics-blue/10 flex items-center justify-center mb-4">
                    {stat.icon}
                  </div>
                  <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
                  <p className="text-logistics-gray">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 border-t border-border">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Ready to Transform Your Logistics Operations?
              </h2>
              <p className="text-lg text-logistics-gray mb-8 max-w-2xl mx-auto">
                Join the hundreds of companies already benefiting from our blockchain-powered logistics and audit platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/dashboard" className="btn-primary text-base h-12 px-6">
                  Get Started Now
                </Link>
                <Link to="/about" className="btn-secondary text-base h-12 px-6 flex items-center justify-center gap-1">
                  Learn More <ChevronRight className="size-4" />
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

export default Index;
