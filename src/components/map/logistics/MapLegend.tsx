
const MapLegend = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white/80 dark:bg-black/60 backdrop-blur-sm p-2 z-10 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="flex items-center gap-1">
          <div className="size-2 rounded-full bg-green-500"></div>
          <span className="text-xs">Delivered</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="size-2 rounded-full bg-blue-500"></div>
          <span className="text-xs">In Transit</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="size-2 rounded-full bg-yellow-500"></div>
          <span className="text-xs">Pending</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="size-2 rounded-full bg-red-500"></div>
          <span className="text-xs">Delayed</span>
        </div>
      </div>
      <div className="flex items-center text-xs text-gray-600 dark:text-gray-300">
        <span>Click on any tracking point for details</span>
      </div>
    </div>
  );
};

export default MapLegend;
