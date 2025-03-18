
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MongoDBConfig from '@/components/settings/MongoDBConfig';

const Settings = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 pt-24">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Settings</h1>
            <p className="text-logistics-gray">Configure your logistics platform settings and integrations</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8 space-y-8">
              <MongoDBConfig />
              
              {/* Add more configuration sections here as needed */}
            </div>
            
            <div className="md:col-span-4">
              <div className="bg-white dark:bg-logistics-dark/50 rounded-xl border border-border overflow-hidden sticky top-24">
                <div className="px-4 py-3 border-b border-border">
                  <h3 className="font-medium">Help & Resources</h3>
                </div>
                <div className="p-4">
                  <ul className="space-y-3 text-sm">
                    <li>
                      <a href="#" className="text-logistics-blue hover:underline">MongoDB Integration Guide</a>
                    </li>
                    <li>
                      <a href="#" className="text-logistics-blue hover:underline">Security Best Practices</a>
                    </li>
                    <li>
                      <a href="#" className="text-logistics-blue hover:underline">API Documentation</a>
                    </li>
                    <li>
                      <a href="#" className="text-logistics-blue hover:underline">Contact Support</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
