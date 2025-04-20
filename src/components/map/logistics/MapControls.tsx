
import { Radio } from 'lucide-react';

interface MapControlsProps {
  isRotating: boolean;
  onRotationToggle: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

const MapControls = ({ isRotating, onRotationToggle, onZoomIn, onZoomOut }: MapControlsProps) => {
  return (
    <div className="flex gap-2">
      <button 
        onClick={onRotationToggle}
        className={`p-2 rounded-full ${isRotating ? 'bg-primary/10 text-primary' : 'bg-gray-100 dark:bg-gray-800'}`}
        title={isRotating ? "Pause rotation" : "Resume rotation"}
      >
        <Radio className="h-4 w-4" />
      </button>
      <button 
        onClick={onZoomIn}
        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
        title="Zoom in"
      >
        <span className="text-lg font-bold">+</span>
      </button>
      <button 
        onClick={onZoomOut}
        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
        title="Zoom out"
      >
        <span className="text-lg font-bold">−</span>
      </button>
    </div>
  );
};

export default MapControls;
