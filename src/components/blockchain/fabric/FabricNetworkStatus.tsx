
import { Server, Database, Activity, Users, CheckCircle } from 'lucide-react';

interface FabricNetworkStatusProps {
  network: {
    id: string;
    name: string;
    channelCount: number;
    peerCount: number;
  } | null;
}

const FabricNetworkStatus = ({ network }: FabricNetworkStatusProps) => {
  if (!network) return null;

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span className="font-medium text-sm">Connected to {network.name}</span>
        </div>
        <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-2 py-0.5 rounded-full">
          Active
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2">
          <Server className="h-4 w-4 text-blue-500" />
          <div>
            <div className="text-xs text-gray-500">Peers</div>
            <div className="font-medium">{network.peerCount}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4 text-blue-500" />
          <div>
            <div className="text-xs text-gray-500">Channels</div>
            <div className="font-medium">{network.channelCount}</div>
          </div>
        </div>
      </div>
      
      <div className="text-xs text-gray-500 pt-1 border-t">
        Last block time: {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
};

export default FabricNetworkStatus;
