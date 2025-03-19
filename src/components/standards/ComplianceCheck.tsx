
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { 
  INTERNATIONAL_STANDARDS, 
  verifyCompliance, 
  ComplianceResult,
  ComplianceStatus
} from '@/utils/internationalStandards';
import { CheckCircle, XCircle, AlertCircle, Loader2, FileCheck } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface ComplianceCheckProps {
  className?: string;
}

const ComplianceCheck = ({ className }: ComplianceCheckProps) => {
  const [selectedStandard, setSelectedStandard] = useState(INTERNATIONAL_STANDARDS[0].code);
  const [documentId, setDocumentId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ComplianceResult | null>(null);
  
  const handleVerify = async () => {
    if (!documentId) {
      toast({
        title: "Missing Information",
        description: "Please enter a document ID to verify",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const complianceResult = await verifyCompliance(selectedStandard, documentId);
      setResult(complianceResult);
      
      toast({
        title: "Compliance Check Complete",
        description: `Document ${documentId} is ${complianceResult.status} with ${selectedStandard}`
      });
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Could not complete compliance verification",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  const getStatusIcon = (status: ComplianceStatus) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="h-5 w-5 text-logistics-success" />;
      case 'non-compliant':
        return <XCircle className="h-5 w-5 text-logistics-error" />;
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-logistics-warning" />;
      default:
        return null;
    }
  };
  
  const getStandardDescription = (code: string) => {
    const standard = INTERNATIONAL_STANDARDS.find(s => s.code === code);
    return standard ? standard.description : '';
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileCheck className="h-5 w-5 text-logistics-blue" />
          International Standards Compliance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Standard</label>
            <Select
              value={selectedStandard}
              onValueChange={setSelectedStandard}
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a standard" />
              </SelectTrigger>
              <SelectContent>
                {INTERNATIONAL_STANDARDS.map((standard) => (
                  <SelectItem key={standard.code} value={standard.code}>
                    {standard.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-logistics-gray">{getStandardDescription(selectedStandard)}</p>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Document ID</label>
            <Input
              placeholder="Enter document ID (e.g., BOL12345)"
              value={documentId}
              onChange={(e) => setDocumentId(e.target.value)}
              disabled={loading}
            />
          </div>
          
          <Button 
            onClick={handleVerify} 
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify Compliance'
            )}
          </Button>
          
          {result && (
            <div className="mt-4 border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">Verification Result</h4>
                {getStatusIcon(result.status)}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-logistics-gray">Status</span>
                  <span className="capitalize font-medium">
                    {result.status.replace('-', ' ')}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-logistics-gray">Timestamp</span>
                  <span>{new Date(result.timestamp).toLocaleString()}</span>
                </div>
                
                {result.authority && (
                  <div className="flex justify-between text-sm">
                    <span className="text-logistics-gray">Verified By</span>
                    <span>{result.authority}</span>
                  </div>
                )}
                
                <div className="mt-3">
                  <span className="text-sm text-logistics-gray block mb-2">Details</span>
                  <ul className="text-xs list-disc list-inside space-y-1">
                    {result.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplianceCheck;
