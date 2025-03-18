
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { ArrowLeftRight, Clock, CheckCircle } from 'lucide-react';

interface Transaction {
  id: string;
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: string;
  status: 'confirmed' | 'pending';
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    hash: '0x7f9a82a53b1a4372765c4463c3cc1de7b4c5e6c17799fbca3fb48f04b343f9c1',
    from: '0x3a821deB21d86A60A3e487D43eF8305E582B203f',
    to: '0x9c4F8539628cF54A3cB5A9640488e9C7957A3402',
    value: '1.25 ETH',
    timestamp: '2023-05-14T09:23:45Z',
    status: 'confirmed'
  },
  {
    id: '2',
    hash: '0x8f6b9c3d15e72a1b6f97cc325d9ae6210f89d2f6eb7c85df416b11f0fae49c38',
    from: '0x5a791e698a2f4c2f8f96d9a1eb1c997d45c442c5',
    to: '0x3a821deB21d86A60A3e487D43eF8305E582B203f',
    value: '0.5 ETH',
    timestamp: '2023-05-14T09:20:12Z',
    status: 'confirmed'
  },
  {
    id: '3',
    hash: '0x6b345c728a761d9f983ed6c2104d4561ad057f97a67a284ff1b493b1f4f6ed91',
    from: '0x7c8bcC36854D0A845B06e0e4d8e4f2b8B3D3Bf6C',
    to: '0x5a791e698a2f4c2f8f96d9a1eb1c997d45c442c5',
    value: '3.75 ETH',
    timestamp: '2023-05-14T09:15:30Z',
    status: 'confirmed'
  },
  {
    id: '4',
    hash: '0x3e72a1b6f97cc325d9ae6210f89d2f6eb7c85df416b11f0fae49c38a5d9b7f1e',
    from: '0x1f493b1f4f6ed918bcC36854D0A845B06e0e4d8e',
    to: '0x4f2b8B3D3Bf6C7c8bcC36854D0A845B06e0e4d8e',
    value: '0.1 ETH',
    timestamp: '2023-05-14T09:10:22Z',
    status: 'pending'
  },
  {
    id: '5',
    hash: '0x2f6eb7c85df416b11f0fae49c38a5d9b7f1e3e72a1b6f97cc325d9ae6210f89d',
    from: '0x8e4f2b8B3D3Bf6C7c8bcC36854D0A845B06e0e4d',
    to: '0xd91f493b1f4f6ed918bcC36854D0A845B06e0e4d',
    value: '2.0 ETH',
    timestamp: '2023-05-14T09:05:11Z',
    status: 'confirmed'
  }
];

const TransactionsList = () => {
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
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Hash</TableHead>
              <TableHead>From / To</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTransactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell className="font-mono text-xs md:text-sm">
                  {truncateHash(tx.hash)}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col text-xs md:text-sm">
                    <div className="flex items-center gap-1 font-mono">
                      <span>From:</span> 
                      <span className="font-mono">{truncateHash(tx.from)}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <ArrowLeftRight className="h-3 w-3" />
                      <span>To:</span> 
                      <span className="font-mono">{truncateHash(tx.to)}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-semibold">{tx.value}</TableCell>
                <TableCell className="text-logistics-gray text-xs md:text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatTimestamp(tx.timestamp)}
                  </div>
                </TableCell>
                <TableCell>
                  {tx.status === 'confirmed' ? (
                    <div className="flex items-center gap-1 text-logistics-success">
                      <CheckCircle className="h-4 w-4" />
                      <span>Confirmed</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-logistics-warning">
                      <Clock className="h-4 w-4" />
                      <span>Pending</span>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionsList;
