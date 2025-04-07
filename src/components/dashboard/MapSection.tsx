
import WorldMap3D from '@/components/map/WorldMap3D';
import { useShipments } from '@/context/ShipmentContext';

const MapSection = () => {
  const { shipments } = useShipments();
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
        3D Global Shipment Tracking
      </h2>
      <WorldMap3D shipments={shipments} />
    </div>
  );
};

export default MapSection;
