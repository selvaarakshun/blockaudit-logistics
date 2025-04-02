
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ShipmentCard from '@/components/ShipmentCard';
import ShipmentHeader from '@/components/dashboard/ShipmentHeader';
import DashboardStats from '@/components/dashboard/DashboardStats';
import ShipmentFilter from '@/components/dashboard/ShipmentFilter';
import { toast } from "@/components/ui/use-toast";
import { ShipmentFormValues } from '@/components/dashboard/shipment-schema';
import WorldMap3D from '@/components/map/WorldMap3D';
import { useAuth } from '@/context/AuthContext';

export interface Shipment {
  id: string;
  trackingNumber: string;
  status: 'pending' | 'in-transit' | 'delivered' | 'delayed';
  origin: string;
  destination: string;
  estimatedDelivery: string;
  lastUpdated: string;
  items: number;
  shipmentName?: string;
  userId?: string;
}

const STORAGE_KEY = 'logistics-shipments';

// Default shipments for test accounts
const defaultShipments: Shipment[] = [
  {
    id: '1',
    trackingNumber: 'SHP-12345678',
    status: 'in-transit',
    origin: 'New York, NY',
    destination: 'Los Angeles, CA',
    estimatedDelivery: '2023-05-18T00:00:00Z',
    lastUpdated: '2023-05-14T09:23:45Z',
    items: 3
  },
  {
    id: '2',
    trackingNumber: 'SHP-87654321',
    status: 'delivered',
    origin: 'San Francisco, CA',
    destination: 'Seattle, WA',
    estimatedDelivery: '2023-05-12T00:00:00Z',
    lastUpdated: '2023-05-12T14:35:22Z',
    items: 1
  },
  {
    id: '3',
    trackingNumber: 'SHP-23456789',
    status: 'pending',
    origin: 'Chicago, IL',
    destination: 'Miami, FL',
    estimatedDelivery: '2023-05-20T00:00:00Z',
    lastUpdated: '2023-05-13T11:45:30Z',
    items: 2
  },
  {
    id: '4',
    trackingNumber: 'SHP-34567890',
    status: 'delayed',
    origin: 'Boston, MA',
    destination: 'Austin, TX',
    estimatedDelivery: '2023-05-19T00:00:00Z',
    lastUpdated: '2023-05-14T16:10:15Z',
    items: 5
  }
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const { user } = useAuth();
  
  // Load shipments from local storage on initial render
  useEffect(() => {
    if (!user) return;
    
    const storedShipments = localStorage.getItem(STORAGE_KEY);
    
    if (storedShipments) {
      try {
        const allShipments = JSON.parse(storedShipments) as Shipment[];
        
        // Filter shipments for the current user or show demo data for test account
        if (user.isTestAccount) {
          // For test accounts, show demo data if no shipments for that user yet
          const userShipments = allShipments.filter(s => s.userId === user.id);
          if (userShipments.length === 0) {
            // Add userId to default shipments and add them to storage
            const testShipments = defaultShipments.map(s => ({
              ...s,
              userId: user.id
            }));
            
            localStorage.setItem(STORAGE_KEY, JSON.stringify([
              ...allShipments,
              ...testShipments
            ]));
            
            setShipments(testShipments);
          } else {
            setShipments(userShipments);
          }
        } else {
          // For regular users, just show their shipments
          setShipments(allShipments.filter(s => s.userId === user.id));
        }
      } catch (error) {
        console.error('Error parsing stored shipments:', error);
        loadDefaultShipmentsForUser();
      }
    } else {
      loadDefaultShipmentsForUser();
    }
  }, [user]);
  
  const loadDefaultShipmentsForUser = () => {
    if (!user) return;
    
    if (user.isTestAccount) {
      // For test accounts, show demo data with user ID
      const testShipments = defaultShipments.map(s => ({
        ...s,
        userId: user.id
      }));
      
      setShipments(testShipments);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(testShipments));
    } else {
      // For regular users, initialize with empty array
      setShipments([]);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    }
  };
  
  const handleNewShipment = (shipmentData: ShipmentFormValues) => {
    if (!user) return;
    
    const newShipment: Shipment = {
      id: `${Date.now()}`,
      trackingNumber: `SHP-${Math.floor(Math.random() * 10000000)}`,
      status: 'pending',
      origin: shipmentData.origin,
      destination: shipmentData.destination,
      estimatedDelivery: shipmentData.estimatedDelivery,
      lastUpdated: new Date().toISOString(),
      items: shipmentData.items,
      shipmentName: shipmentData.shipmentName,
      userId: user.id
    };
    
    // Get all shipments from storage
    const storedShipments = localStorage.getItem(STORAGE_KEY);
    const allShipments = storedShipments ? JSON.parse(storedShipments) : [];
    
    // Add new shipment
    const updatedAllShipments = [...allShipments, newShipment];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAllShipments));
    
    // Update state with user's shipments
    const updatedUserShipments = [...shipments, newShipment];
    setShipments(updatedUserShipments);
    
    toast({
      title: "Shipment Created",
      description: `Shipment ${newShipment.shipmentName || newShipment.trackingNumber} has been created.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <main className="flex-grow py-8 pt-24">
        <div className="container">
          <ShipmentHeader onNewShipment={handleNewShipment} />
          
          <DashboardStats shipments={shipments} />
          
          {/* 3D World Map */}
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
          
          <ShipmentFilter activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <div className="grid md:grid-cols-2 gap-6">
            {shipments.length > 0 ? (
              shipments
                .filter(shipment => activeTab === 'all' || shipment.status === activeTab)
                .map((shipment) => (
                  <ShipmentCard key={shipment.id} shipment={shipment} />
                ))
            ) : (
              <div className="col-span-2 text-center py-10 border border-dashed rounded-lg border-gray-300 bg-white dark:bg-gray-800/50">
                <div className="mb-3">
                  <span className="bg-blue-100 text-blue-800 p-2 rounded-full inline-block">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package-open">
                      <path d="M20.91 8.84 8.56 2.23a1.93 1.93 0 0 0-1.81 0L3.1 4.13a2.12 2.12 0 0 0-.05 3.69l12.22 6.93a2 2 0 0 0 1.94 0L21 12.51a2.12 2.12 0 0 0-.09-3.67Z"/>
                      <path d="m3.09 8.84 12.35-6.61a1.93 1.93 0 0 1 1.81 0l3.65 1.9a2.12 2.12 0 0 1 .1 3.69L8.73 14.75a2 2 0 0 1-1.94 0L3 12.51a2.12 2.12 0 0 1 .09-3.67Z"/>
                      <line x1="12" y1="22" x2="12" y2="13"/>
                      <path d="M20 13.5v3.37a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13.5"/>
                    </svg>
                  </span>
                </div>
                <h3 className="text-lg font-medium mb-1">No Shipments Found</h3>
                <p className="text-gray-500 mb-4">Create your first shipment to get started</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
