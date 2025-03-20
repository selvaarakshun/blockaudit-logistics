
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Database, Clock, FileText, Link as LinkIcon, CheckCircle } from 'lucide-react';
import BlockchainVerification from '@/components/blockchain/verification';

interface Block {
  number: number;
  hash: string;
  previousHash: string;
  timestamp: string;
  transactions: number;
  miner: string;
  size: string;
  gasUsed: string;
  gasLimit: string;
}

const blockData: Block = {
  number: 4832672,
  hash: '0x7f9a82a53b1a4372765c4463c3cc1de7b4c5e6c17799fbca3fb48f04b343f9c1',
  previousHash: '0x8f6b9c3d15e72a1b6f97cc325d9ae6210f89d2f6eb7c85df416b11f0fae49c38',
  timestamp: '2023-05-14T09:23:45Z',
  transactions: 156,
  miner: '0x3a821deB21d86A60A3e487D43eF8305E582B203f',
  size: '42.3 KB',
  gasUsed: '8,453,621',
  gasLimit: '30,000,000'
};

const BlockDetails = () => {
  const truncateHash = (hash: string) => {
    return `${hash.substring(0, 10)}...${hash.substring(hash.length - 8)}`;
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-logistics-blue" />
            Block #{blockData.number}
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-logistics-gray">
            <Clock className="h-4 w-4" />
            {formatTimestamp(blockData.timestamp)}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-logistics-gray mb-1">Hash</h3>
                <p className="font-mono text-sm bg-logistics-light-gray dark:bg-white/5 p-2 rounded-md overflow-x-auto">
                  {blockData.hash}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-logistics-gray mb-1">Previous Block Hash</h3>
                <p className="font-mono text-sm bg-logistics-light-gray dark:bg-white/5 p-2 rounded-md overflow-x-auto">
                  {blockData.previousHash}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-logistics-gray mb-1">Miner</h3>
                <p className="font-mono text-sm">{blockData.miner}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-logistics-gray mb-1">Transactions</h3>
                  <p className="text-lg font-semibold">{blockData.transactions}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-logistics-gray mb-1">Size</h3>
                  <p className="text-lg font-semibold">{blockData.size}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-logistics-gray mb-1">Gas Used</h3>
                  <p className="text-lg font-semibold">{blockData.gasUsed}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-logistics-gray mb-1">Gas Limit</h3>
                  <p className="text-lg font-semibold">{blockData.gasLimit}</p>
                </div>
              </div>
              
              <BlockchainVerification 
                txHash={blockData.hash}
                timestamp={blockData.timestamp}
                status="verified"
                className="mt-4"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Block Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tx Hash</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3, 4, 5].map((i) => (
                <TableRow key={i}>
                  <TableCell className="font-mono text-xs md:text-sm">
                    {truncateHash(`0x${i}f9a82a53b1a4372765c4463c3cc1de7b4c5e6c17799fbca3fb48f04b343f9c1`)}
                  </TableCell>
                  <TableCell className="font-mono text-xs md:text-sm">
                    {truncateHash(`0x${i}a821deB21d86A60A3e487D43eF8305E582B203f`)}
                  </TableCell>
                  <TableCell className="font-mono text-xs md:text-sm">
                    {truncateHash(`0x${i}c4F8539628cF54A3cB5A9640488e9C7957A3402`)}
                  </TableCell>
                  <TableCell>{i * 0.5} ETH</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlockDetails;
