
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuditTrailComponent from '@/components/AuditTrail';
import { Search, Filter, Calendar, Download, FileDown, FileText, User, Settings, RefreshCw } from 'lucide-react';

const AuditTrailPage = () => {
  const [timeframe, setTimeframe] = useState('all');
  
  const auditEvents = [
    {
      id: '1',
      type: 'document' as const,
      action: 'document uploaded',
      timestamp: '2023-05-14T15:30:45Z',
      user: 'John Doe',
      details: 'Bill of Lading #BOL-12345 uploaded and verified on blockchain',
      verified: true,
      hash: '0x7f9a82a53b1a4372765c4463c3cc1de7b4c5e6c17799fbca3fb48f04b343f9c1'
    },
    {
      id: '2',
      type: 'user' as const,
      action: 'access granted',
      timestamp: '2023-05-14T12:15:22Z',
      user: 'Jane Smith',
      details: 'Access granted to Shipment SHP-87654321 for auditor review',
      verified: true,
      hash: '0x3a5b7c9d0f2e4a6c8b0d2f4e6a8c0d2f4e6a8c0d2f4e6a8c0d2f4e6a8c0d2f4'
    },
    {
      id: '3',
      type: 'system' as const,
      action: 'compliance check completed',
      timestamp: '2023-05-13T09:42:18Z',
      user: 'System',
      details: 'Automated compliance check passed for Shipment SHP-12345678',
      verified: true,
      hash: '0x1d3f5b7c9e1f3d5b7c9e1f3d5b7c9e1f3d5b7c9e1f3d5b7c9e1f3d5b7c9e1f3'
    },
    {
      id: '4',
      type: 'document' as const,
      action: 'document signed',
      timestamp: '2023-05-13T08:12:55Z',
      user: 'Robert Johnson',
      details: 'Customs Declaration Form #CDF-98765 digitally signed',
      verified: false
    },
    {
      id: '5',
      type: 'system' as const,
      action: 'blockchain verification',
      timestamp: '2023-05-12T14:25:33Z',
      user: 'System',
      details: 'Package location verified via IoT sensor data for Shipment SHP-34567890',
      verified: true,
      hash: '0x9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d'
    }
  ];

  const categories = [
    { name: 'Documents', icon: <FileText className="size-4" />, count: 24 },
    { name: 'User Actions', icon: <User className="size-4" />, count: 18 },
    { name: 'System Events', icon: <Settings className="size-4" />, count: 32 },
    { name: 'Verifications', icon: <FileCheck className="size-4" />, count: 45 }
  ];

  const recentDocuments = [
    { name: 'Bill of Lading', id: 'BOL-12345', date: '2023-05-14' },
    { name: 'Customs Declaration', id: 'CDF-98765', date: '2023-05-13' },
    { name: 'Certificate of Origin', id: 'COO-54321', date: '2023-05-12' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 pt-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main content */}
            <div className="lg:col-span-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h1 className="text-2xl md:text-3xl font-bold">Audit Trail</h1>
                
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-logistics-gray" />
                    <input 
                      type="text" 
                      placeholder="Search audit events..."
                      className="pl-9 pr-4 py-2 rounded-md border border-border bg-white dark:bg-logistics-dark/80 shadow-subtle focus:outline-none focus:ring-2 focus:ring-logistics-blue focus:border-transparent w-full sm:w-auto"
                    />
                  </div>
                  
                  <button className="btn-ghost flex items-center gap-1 h-9">
                    <Filter className="size-4" />
                  </button>
                  
                  <button className="btn-ghost flex items-center gap-1 h-9">
                    <Calendar className="size-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center overflow-x-auto whitespace-nowrap gap-2 mb-6 pb-2">
                {['all', 'today', 'this week', 'this month'].map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      timeframe === tab 
                        ? 'bg-logistics-blue text-white' 
                        : 'bg-white dark:bg-logistics-dark/80 border border-border hover:bg-logistics-light-gray dark:hover:bg-white/5'
                    }`}
                    onClick={() => setTimeframe(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              
              <AuditTrailComponent events={auditEvents} />
              
              <div className="mt-8 flex items-center justify-center">
                <button className="btn-secondary flex items-center gap-1">
                  <RefreshCw className="size-4" />
                  <span>Load More Events</span>
                </button>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Categories */}
              <div className="bg-white dark:bg-logistics-dark/50 rounded-xl border border-border overflow-hidden">
                <div className="px-4 py-3 border-b border-border">
                  <h3 className="font-medium">Event Categories</h3>
                </div>
                <div className="p-4">
                  <div className="space-y-2">
                    {categories.map((category, index) => (
                      <div 
                        key={index}
                        className="flex justify-between items-center p-2 rounded-md hover:bg-logistics-light-gray dark:hover:bg-white/5 cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <div className="size-8 rounded-md bg-logistics-light-blue dark:bg-logistics-blue/10 flex items-center justify-center text-logistics-blue">
                            {category.icon}
                          </div>
                          <span>{category.name}</span>
                        </div>
                        <span className="text-sm text-logistics-gray">{category.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Recent Documents */}
              <div className="bg-white dark:bg-logistics-dark/50 rounded-xl border border-border overflow-hidden">
                <div className="px-4 py-3 border-b border-border">
                  <h3 className="font-medium">Recent Documents</h3>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    {recentDocuments.map((doc, index) => (
                      <div 
                        key={index}
                        className="p-3 rounded-md border border-border bg-white dark:bg-logistics-dark hover:shadow-subtle transition-all"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <FileText className="size-4 text-logistics-blue" />
                            <span className="font-medium">{doc.name}</span>
                          </div>
                          <span className="text-xs text-logistics-gray">{doc.date}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-logistics-gray">{doc.id}</span>
                          <button className="text-logistics-blue hover:text-logistics-blue/80">
                            <FileDown className="size-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Export Section */}
              <div className="bg-white dark:bg-logistics-dark/50 rounded-xl border border-border p-4">
                <h3 className="font-medium mb-3">Export Audit Trail</h3>
                <p className="text-sm text-logistics-gray mb-4">
                  Download a blockchain-verified report of all audit events for your records.
                </p>
                <button className="btn-primary w-full flex items-center justify-center gap-1">
                  <Download className="size-4" />
                  <span>Export Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AuditTrailPage;
