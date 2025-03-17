
import { Download } from 'lucide-react';

const ExportSection = () => {
  return (
    <div className="bg-white dark:bg-logistics-dark/50 rounded-xl border border-border p-4">
      <h3 className="font-medium mb-3">Export Audit Trail</h3>
      <p className="text-sm text-logistics-gray mb-4">
        Download a blockchain-verified report of all audit events for your records.
      </p>
      <button className="btn-primary w-full flex items-center justify-center gap-1">
        <Download className="size-4" />
        <span>Export Report</span>
      </button>
    </div>
  );
};

export default ExportSection;
