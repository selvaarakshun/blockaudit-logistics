
import { Dispatch, SetStateAction } from 'react';
import { toast } from "@/components/ui/use-toast";

interface TimeframeSelectorProps {
  timeframe: string;
  setTimeframe: Dispatch<SetStateAction<string>>;
}

const TimeframeSelector = ({ timeframe, setTimeframe }: TimeframeSelectorProps) => {
  const timeframes = ['all', 'today', 'this week', 'this month'];
  
  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe);
    toast({
      description: `Viewing audit events from ${newTimeframe === 'all' ? 'all time' : newTimeframe}`,
    });
  };
  
  return (
    <div className="flex items-center overflow-x-auto whitespace-nowrap gap-2 mb-6 pb-2">
      {timeframes.map((tab) => (
        <button
          key={tab}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            timeframe === tab 
              ? 'bg-logistics-blue text-white' 
              : 'bg-white dark:bg-logistics-dark/80 border border-border hover:bg-logistics-light-gray dark:hover:bg-white/5'
          }`}
          onClick={() => handleTimeframeChange(tab)}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default TimeframeSelector;
