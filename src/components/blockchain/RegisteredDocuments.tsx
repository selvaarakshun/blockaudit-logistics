
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import BlockchainVerification from '@/components/blockchain/verification';
import { useEffect, useState } from 'react';

interface RegisteredDocumentsProps {
  filteredDocId?: string;
}

interface Document {
  id: string;
  type: string;
  title: string;
  timestamp: string;
  hash: string;
}

const RegisteredDocuments = ({ filteredDocId }: RegisteredDocumentsProps) => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 'BOL-987654',
      type: 'Bill of Lading',
      title: 'BOL-987654',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      hash: `0x7f9a82a53b1a4372765c4463c3cc1de7b4c5e6c17799fbca3fb48f04b343f9c1`
    },
    {
      id: 'INV-123456',
      type: 'Commercial Invoice',
      title: 'INV-123456',
      timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
      hash: `0x8f6b9c3d15e72a1b6f97cc325d9ae6210f89d2f6eb7c85df416b11f0fae49c38`
    },
    {
      id: 'COO-345678',
      type: 'Certificate of Origin',
      title: 'COO-345678',
      timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
      hash: `0x9a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b`
    }
  ]);

  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>(documents);

  useEffect(() => {
    if (filteredDocId) {
      setFilteredDocuments(documents.filter(doc => 
        doc.id.toLowerCase().includes(filteredDocId.toLowerCase())
      ));
    } else {
      setFilteredDocuments(documents);
    }
  }, [filteredDocId, documents]);

  return (
    <>
      {filteredDocId && filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No Document Found</h3>
          <p className="text-logistics-gray">
            No document with ID "{filteredDocId}" was found in the blockchain
          </p>
        </div>
      )}

      {filteredDocId && filteredDocuments.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-medium">Search Results</h3>
          <p className="text-sm text-logistics-gray">
            Found {filteredDocuments.length} document(s) matching "{filteredDocId}"
          </p>
        </div>
      )}

      <div className="space-y-4">
        {filteredDocuments.map((doc, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-medium">{doc.title}</h4>
                <p className="text-sm text-logistics-gray">{doc.type}</p>
              </div>
              <span className="text-xs text-logistics-gray">
                {new Date(doc.timestamp).toLocaleDateString()}
              </span>
            </div>
            <BlockchainVerification 
              docId={doc.id}
              txHash={doc.hash}
              timestamp={doc.timestamp}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default RegisteredDocuments;
