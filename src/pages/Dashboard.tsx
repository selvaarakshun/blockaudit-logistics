
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ShipmentCard from '@/components/ShipmentCard';
import ShipmentHeader from '@/components/dashboard/ShipmentHeader';
import DashboardStats from '@/components/dashboard/DashboardStats';
import ShipmentFilter from '@/components/dashboard/ShipmentFilter';
import ShipmentMap from '@/components/dashboard/ShipmentMap';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const shipments = [
    {
      id: '1',
      trackingNumber: 'SHP-12345678',
      status: 'in-transit' as const,
      origin: 'New York, NY',
      destination: 'Los Angeles, CA',
      estimatedDelivery: '2023-05-18T00:00:00Z',
      lastUpdated: '2023-05-14T09:23:45Z',
      items: 3
    },
    {
      id: '2',
      trackingNumber: 'SHP-87654321',
      status: 'delivered' as const,
      origin: 'San Francisco, CA',
      destination: 'Seattle, WA',
      estimatedDelivery: '2023-05-12T00:00:00Z',
      lastUpdated: '2023-05-12T14:35:22Z',
      items: 1
    },
    {
      id: '3',
      trackingNumber: 'SHP-23456789',
      status: 'pending' as const,
      origin: 'Chicago, IL',
      destination: 'Miami, FL',
      estimatedDelivery: '2023-05-20T00:00:00Z',
      lastUpdated: '2023-05-13T11:45:30Z',
      items: 2
    },
    {
      id: '4',
      trackingNumber: 'SHP-34567890',
      status: 'delayed' as const,
      origin: 'Boston, MA',
      destination: 'Austin, TX',
      estimatedDelivery: '2023-05-19T00:00:00Z',
      lastUpdated: '2023-05-14T16:10:15Z',
      items: 5
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 pt-24">
        <div className="container">
          <ShipmentHeader />
          
          <DashboardStats />
          
          <ShipmentFilter activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <div className="grid md:grid-cols-2 gap-6">
            {shipments
              .filter(shipment => activeTab === 'all' || shipment.status === activeTab)
              .map((shipment) => (
                <ShipmentCard key={shipment.id} shipment={shipment} />
              ))}
          </div>
          
          <ShipmentMap />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
