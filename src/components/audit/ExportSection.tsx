
import { Download, CreditCard, FileText } from 'lucide-react';
import { useState } from 'react';
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ExportFormat = 'pdf' | 'csv' | 'json';

const ExportSection = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState<ExportFormat>('pdf');
  const [isGeneratingInvoice, setIsGeneratingInvoice] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      // Create a sample export file
      const exportContent = exportFormat === 'json' 
        ? JSON.stringify({ events: [{ id: 1, action: "document uploaded", timestamp: new Date().toISOString() }] }) 
        : exportFormat === 'csv'
          ? "id,action,timestamp\n1,document uploaded," + new Date().toISOString()
          : "Sample Audit Trail Export";
      
      const blob = new Blob([exportContent], { type: `application/${exportFormat}` });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `audit-trail-export.${exportFormat}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Export Complete",
        description: `Audit trail report has been exported successfully as ${exportFormat.toUpperCase()}.`,
      });
      setIsExporting(false);
    }, 2000);
  };
  
  const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setExportFormat(e.target.value as ExportFormat);
  };
  
  const handleGenerateInvoice = () => {
    setIsGeneratingInvoice(true);
    
    // Simulate invoice generation
    setTimeout(() => {
      const invoiceContent = `
        INVOICE #INV-${Math.floor(Math.random() * 10000)}
        Date: ${new Date().toLocaleDateString()}
        
        Blockchain Verification Services
        
        Item             Quantity    Price      Total
        ----------------------------------------------
        Audit Trail         1       $29.99     $29.99
        Verifications      10        $1.99     $19.90
        ----------------------------------------------
        Total                                  $49.89
      `;
      
      const blob = new Blob([invoiceContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'logistics-invoice.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Invoice Generated",
        description: "The invoice has been generated and downloaded.",
      });
      setIsGeneratingInvoice(false);
    }, 1500);
  };
  
  const handleProcessPayment = () => {
    toast({
      title: "Processing Payment",
      description: "Please wait while we process your payment...",
    });
    
    // Simulate payment processing
    setTimeout(() => {
      setShowPaymentSuccess(true);
      
      toast({
        title: "Payment Successful",
        description: "Your payment has been processed successfully!",
      });
      
      // Reset after a while
      setTimeout(() => {
        setShowPaymentSuccess(false);
      }, 3000);
    }, 2000);
  };

  return (
    <div className="bg-white dark:bg-logistics-dark/50 rounded-xl border border-border p-4">
      <Tabs defaultValue="export">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="export" className="flex-1">Export</TabsTrigger>
          <TabsTrigger value="invoice" className="flex-1">Invoice</TabsTrigger>
        </TabsList>
        
        <TabsContent value="export">
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
            <select 
              className="w-full p-2 text-sm rounded-md border border-border bg-white dark:bg-logistics-dark/50"
              value={exportFormat}
              onChange={handleFormatChange}
            >
              <option value="pdf">PDF Format</option>
              <option value="csv">CSV Format</option>
              <option value="json">JSON Format</option>
            </select>
          </div>
        </TabsContent>
        
        <TabsContent value="invoice">
          <h3 className="font-medium mb-3">Generate Invoice</h3>
          <p className="text-sm text-logistics-gray mb-4">
            Create and download an invoice for verification services.
          </p>
          
          {showPaymentSuccess ? (
            <div className="border border-green-300 bg-green-50 dark:bg-green-900/20 p-3 rounded-md text-center mb-4">
              <p className="text-green-700 dark:text-green-400 font-medium">Payment Successful!</p>
              <p className="text-sm text-green-600 dark:text-green-500">Thank you for your payment.</p>
            </div>
          ) : (
            <div className="border border-border p-3 rounded-md mb-4">
              <p className="font-medium">Invoice Summary</p>
              <div className="flex justify-between text-sm py-1">
                <span>Audit Trail Export</span>
                <span>$29.99</span>
              </div>
              <div className="flex justify-between text-sm py-1">
                <span>Verifications (10)</span>
                <span>$19.90</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t border-border mt-2">
                <span>Total</span>
                <span>$49.89</span>
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <button 
              className={`btn-primary w-full flex items-center justify-center gap-1 ${isGeneratingInvoice ? 'opacity-80 cursor-not-allowed' : ''}`}
              onClick={handleGenerateInvoice}
              disabled={isGeneratingInvoice}
            >
              <FileText className={`size-4 ${isGeneratingInvoice ? 'animate-pulse' : ''}`} />
              <span>{isGeneratingInvoice ? 'Generating...' : 'Generate Invoice'}</span>
            </button>
            
            <button 
              className="btn-secondary w-full flex items-center justify-center gap-1"
              onClick={handleProcessPayment}
              disabled={showPaymentSuccess}
            >
              <CreditCard className="size-4" />
              <span>Process Payment</span>
            </button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExportSection;
