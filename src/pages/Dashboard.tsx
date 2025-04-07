
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShipmentProvider } from '@/context/ShipmentContext';
import DashboardContent from '@/components/dashboard/DashboardContent';

const Dashboard = () => {
  return (
    <ShipmentProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <Navbar />
        
        <main className="flex-grow py-8 pt-24">
          <div className="container">
            <DashboardContent />
          </div>
        </main>
        
        <Footer />
      </div>
    </ShipmentProvider>
  );
};

export default Dashboard;
