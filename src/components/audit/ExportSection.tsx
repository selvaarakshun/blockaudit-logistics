
import { Download } from 'lucide-react';
import { useState } from 'react';
import { toast } from "@/components/ui/use-toast";

const ExportSection = () => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Audit trail report has been exported successfully.",
      });
      setIsExporting(false);
    }, 2000);
  };

  return (
    <div className="bg-white dark:bg-logistics-dark/50 rounded-xl border border-border p-4">
      <h3 className="font-medium mb-3">Export Audit Trail</h3>
      <p className="text-sm text-logistics-gray mb-4">
        Download a blockchain-verified report of all audit events for your records.
      </p>
      <div className="space-y-2">
        <button 
          className={`btn-primary w-full flex items-center justify-center gap-1 ${isExporting ? 'opacity-80 cursor-not-allowed' : ''}`}
          onClick={handleExport}
          disabled={isExporting}
        >
          <Download className={`size-4 ${isExporting ? 'animate-bounce' : ''}`} />
          <span>{isExporting ? 'Exporting...' : 'Export Report'}</span>
        </button>
        <select className="w-full p-2 text-sm rounded-md border border-border bg-white dark:bg-logistics-dark/50">
          <option value="pdf">PDF Format</option>
          <option value="csv">CSV Format</option>
          <option value="json">JSON Format</option>
        </select>
      </div>
    </div>
  );
};

export default ExportSection;
