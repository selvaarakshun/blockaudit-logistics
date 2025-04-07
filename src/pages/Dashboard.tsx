
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ShipmentHeader from '@/components/dashboard/ShipmentHeader';
import DashboardStats from '@/components/dashboard/DashboardStats';
import MapSection from '@/components/dashboard/MapSection';
import ShipmentList from '@/components/dashboard/ShipmentList';
import { ShipmentProvider, useShipments } from '@/context/ShipmentContext';
import { ShipmentFormValues } from '@/components/dashboard/shipment-schema';

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

// Separating the content component to use the shipment context
const DashboardContent = () => {
  const { addShipment } = useShipments();

  const handleNewShipment = (shipmentData: ShipmentFormValues) => {
    // Ensure all required fields are present and with default values if needed
    addShipment({
      shipmentName: shipmentData.shipmentName,
      origin: shipmentData.origin,
      destination: shipmentData.destination,
      items: shipmentData.items,
      estimatedDelivery: shipmentData.estimatedDelivery,
      status: shipmentData.status || 'pending'
    });
  };

  return (
    <>
      <ShipmentHeader onNewShipment={handleNewShipment} />
      <DashboardStatsSection />
      <MapSection />
      <ShipmentList />
    </>
  );
};

// Stats section component
const DashboardStatsSection = () => {
  const { shipments } = useShipments();
  
  return (
    <DashboardStats shipments={shipments} />
  );
};

export default Dashboard;
