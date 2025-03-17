import { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import AuditTrailComponent from '@/components/AuditTrail';
import TimeframeSelector from './TimeframeSelector';
import AuditToolbar from './AuditToolbar';
import { AuditEvent } from '@/types/audit';

const AuditContent = () => {
  const [timeframe, setTimeframe] = useState('all');
  
  const auditEvents: AuditEvent[] = [
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

  return (
    <div className="lg:col-span-8">
      <AuditToolbar />
      <TimeframeSelector timeframe={timeframe} setTimeframe={setTimeframe} />
      <AuditTrailComponent events={auditEvents} />
      
      <div className="mt-8 flex items-center justify-center">
        <button className="btn-secondary flex items-center gap-1">
          <RefreshCw className="size-4" />
          <span>Load More Events</span>
        </button>
      </div>
    </div>
  );
};

export default AuditContent;
