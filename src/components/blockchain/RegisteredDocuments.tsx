
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import BlockchainVerification from '@/components/BlockchainVerification';

const RegisteredDocuments = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Registered Logistics Documents</CardTitle>
        <CardDescription>
          View and verify logistics documents registered on the blockchain
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {['BOL-987654', 'INV-123456', 'COO-345678'].map((docId, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-medium">{docId}</h4>
                  <p className="text-sm text-logistics-gray">
                    {index === 0 ? 'Bill of Lading' : index === 1 ? 'Commercial Invoice' : 'Certificate of Origin'}
                  </p>
                </div>
                <span className="text-xs text-logistics-gray">
                  {new Date(Date.now() - 86400000 * (index + 1)).toLocaleDateString()}
                </span>
              </div>
              <BlockchainVerification 
                docId={docId}
                txHash={`0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`}
                timestamp={new Date(Date.now() - 86400000 * (index + 1)).toISOString()}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RegisteredDocuments;
