
import ShipmentHeader from '@/components/dashboard/ShipmentHeader';
import DashboardStats from '@/components/dashboard/DashboardStats';
import MapSection from '@/components/dashboard/MapSection';
import ShipmentList from '@/components/dashboard/ShipmentList';
import { useShipments } from '@/context/ShipmentContext';
import { ShipmentFormValues } from '@/components/dashboard/shipment-schema';

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

export default DashboardContent;
