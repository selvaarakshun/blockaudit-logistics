
import { Satellite } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const LoadingOverlay = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 bg-gray-50 dark:bg-gray-900 text-center">
      <Satellite className="size-16 text-gray-400 animate-pulse mb-2" />
      <h3 className="text-xl font-medium">Loading Global Tracking Network</h3>
      <p className="text-gray-500 max-w-md mb-4">
        Connecting to satellite network and loading tracking data...
      </p>
      <div className="w-64">
        <Progress value={65} className="h-2" />
      </div>
    </div>
  );
};

export default LoadingOverlay;
