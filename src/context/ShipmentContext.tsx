
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Shipment } from '@/types/shipment';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';

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

const STORAGE_KEY = 'logistics-shipments';

interface ShipmentContextProps {
  shipments: Shipment[];
  addShipment: (shipment: Omit<Shipment, 'id' | 'trackingNumber' | 'lastUpdated' | 'userId'>) => void;
}

const ShipmentContext = createContext<ShipmentContextProps | undefined>(undefined);

export const ShipmentProvider = ({ children }: { children: ReactNode }) => {
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
  
  const addShipment = (shipmentData: Omit<Shipment, 'id' | 'trackingNumber' | 'lastUpdated' | 'userId'>) => {
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
    <ShipmentContext.Provider value={{ shipments, addShipment }}>
      {children}
    </ShipmentContext.Provider>
  );
};

export const useShipments = () => {
  const context = useContext(ShipmentContext);
  if (context === undefined) {
    throw new Error('useShipments must be used within a ShipmentProvider');
  }
  return context;
};
