import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, BookOpen, CheckCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { ISO28000Compliance, WCOCompliance } from '@/utils/complianceUtils';

const StandardsComplianceCard = () => {
  const [showStandards, setShowStandards] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  
  const handleVerifyStandards = async () => {
    setIsChecking(true);
    
    try {
      const [isoResult, wcoResult] = await Promise.all([
        ISO28000Compliance.verifySecurityManagement("SHP-12345"),
        WCOCompliance.verifySAFEFramework({})
      ]);
      
      setShowStandards(true);
      
      toast({
        title: "Standards Verification Complete",
        description: "Your shipment complies with international standards.",
      });
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Could not verify compliance with international standards.",
        variant: "destructive"
      });
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-logistics-blue" />
          International Standards
        </CardTitle>
        <CardDescription>
          Verify compliance with international logistics standards
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={handleVerifyStandards} 
          className="w-full mb-4"
          disabled={isChecking}
        >
          {isChecking ? 'Verifying...' : 'Verify Standards Compliance'}
        </Button>
        
        {showStandards && (
          <div className="space-y-4 mt-2">
            <div className="border rounded-lg p-3">
              <div className="flex items-center mb-2">
                <BookOpen className="h-4 w-4 text-logistics-success mr-2" />
                <h4 className="font-medium">ISO 28000</h4>
              </div>
              <p className="text-xs text-logistics-gray mb-2">
                Supply Chain Security Management Systems
              </p>
              <div className="flex items-center text-xs text-logistics-success">
                <CheckCircle className="h-3 w-3 mr-1" />
                <span>Compliant</span>
              </div>
            </div>
            
            <div className="border rounded-lg p-3">
              <div className="flex items-center mb-2">
                <BookOpen className="h-4 w-4 text-logistics-success mr-2" />
                <h4 className="font-medium">WCO SAFE Framework</h4>
              </div>
              <p className="text-xs text-logistics-gray mb-2">
                World Customs Organization Standards
              </p>
              <div className="flex items-center text-xs text-logistics-success">
                <CheckCircle className="h-3 w-3 mr-1" />
                <span>Compliant</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StandardsComplianceCard;
