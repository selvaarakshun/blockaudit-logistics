
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ShipmentCard from '@/components/ShipmentCard';
import { Search, Plus, Filter, SortAsc, Package, ArrowUpRight, ArrowDownRight, TrendingUp, Map, Clock } from 'lucide-react';

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

  const renderStats = () => {
    const stats = [
      {
        icon: <ArrowUpRight className="size-4 text-logistics-success" />,
        title: 'Outbound',
        value: '24',
        change: '+12.5%',
        changeType: 'positive'
      },
      {
        icon: <ArrowDownRight className="size-4 text-logistics-blue" />,
        title: 'Inbound',
        value: '18',
        change: '+5.3%',
        changeType: 'positive'
      },
      {
        icon: <TrendingUp className="size-4 text-logistics-indigo" />,
        title: 'Active',
        value: '32',
        change: '+8.7%',
        changeType: 'positive'
      },
      {
        icon: <Clock className="size-4 text-logistics-warning" />,
        title: 'Delayed',
        value: '7',
        change: '-2.1%',
        changeType: 'negative'
      }
    ];

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-logistics-dark/50 rounded-xl border border-border p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-1.5">
                <div className="size-7 rounded-md bg-logistics-light-gray dark:bg-white/5 flex items-center justify-center">
                  {stat.icon}
                </div>
                <span className="text-sm text-logistics-gray">{stat.title}</span>
              </div>
              <div className={`text-xs ${stat.changeType === 'positive' ? 'text-logistics-success' : 'text-logistics-error'}`}>
                {stat.change}
              </div>
            </div>
            <div className="text-2xl font-semibold">{stat.value}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 pt-24">
        <div className="container">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Shipment Dashboard</h1>
              <p className="text-logistics-gray">Track and manage your blockchain-verified shipments</p>
            </div>
            
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-logistics-gray" />
                <input 
                  type="text" 
                  placeholder="Search shipments..."
                  className="pl-9 pr-4 py-2 rounded-md border border-border bg-white dark:bg-logistics-dark shadow-subtle focus:outline-none focus:ring-2 focus:ring-logistics-blue focus:border-transparent w-full md:w-auto"
                />
              </div>
              
              <button className="btn-primary flex items-center gap-1">
                <Plus className="size-4" />
                <span>New Shipment</span>
              </button>
            </div>
          </div>
          
          {renderStats()}
          
          <div className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center overflow-x-auto whitespace-nowrap gap-2 pb-2 md:pb-0">
              {['all', 'in-transit', 'pending', 'delivered', 'delayed'].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === tab 
                      ? 'bg-logistics-blue text-white' 
                      : 'bg-white dark:bg-logistics-dark/80 border border-border hover:bg-logistics-light-gray dark:hover:bg-white/5'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <button className="btn-ghost flex items-center gap-1 text-sm h-9">
                <Filter className="size-4" />
                <span>Filter</span>
              </button>
              <button className="btn-ghost flex items-center gap-1 text-sm h-9">
                <SortAsc className="size-4" />
                <span>Sort</span>
              </button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {shipments
              .filter(shipment => activeTab === 'all' || shipment.status === activeTab)
              .map((shipment) => (
                <ShipmentCard key={shipment.id} shipment={shipment} />
              ))}
          </div>
          
          {/* Map Section */}
          <div className="mt-10 rounded-xl border border-border overflow-hidden">
            <div className="bg-white dark:bg-logistics-dark p-4 border-b border-border flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Map className="size-5 text-logistics-blue" />
                <h3 className="font-medium">Shipment Map</h3>
              </div>
              <button className="text-sm text-logistics-blue hover:underline">View Fullscreen</button>
            </div>
            
            <div className="aspect-[16/9] bg-logistics-light-gray dark:bg-white/5 flex items-center justify-center">
              <div className="text-center p-8">
                <Package className="size-12 text-logistics-gray mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Interactive Map</h3>
                <p className="text-logistics-gray max-w-md mb-4">
                  Track your shipments in real-time with our interactive map visualization.
                </p>
                <button className="btn-primary">Enable Map View</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
