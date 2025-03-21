
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { Shield, FileText, Loader2, CheckCircle } from 'lucide-react';

interface InsurancePolicy {
  id: string;
  shipmentId: string;
  coverage: string;
  premium: string;
  riskLevel: 'low' | 'medium' | 'high';
  insurer: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'claimed';
}

const mockPolicies: InsurancePolicy[] = [
  {
    id: "INS-1234",
    shipmentId: "SHIP-5678",
    coverage: "100000",
    premium: "5000",
    riskLevel: "medium",
    insurer: "Global Insurance Co.",
    startDate: "2023-06-01",
    endDate: "2023-12-31",
    status: "active"
  },
  {
    id: "INS-5678",
    shipmentId: "SHIP-9012",
    coverage: "250000",
    premium: "12500",
    riskLevel: "high",
    insurer: "Maritime Protect Ltd.",
    startDate: "2023-03-15",
    endDate: "2023-09-15",
    status: "expired"
  }
];

const InsuranceSmartContract = () => {
  const [shipmentId, setShipmentId] = useState('');
  const [coverage, setCoverage] = useState('');
  const [premium, setPremium] = useState('');
  const [riskLevel, setRiskLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [insurer, setInsurer] = useState('Global Insurance Co.');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const [isCreating, setIsCreating] = useState(false);
  const [policies, setPolicies] = useState<InsurancePolicy[]>(mockPolicies);

  const handleCreatePolicy = async () => {
    if (!shipmentId || !coverage || !premium || !insurer || !startDate || !endDate) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsCreating(true);
    
    try {
      // Simulate blockchain interaction delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newPolicy: InsurancePolicy = {
        id: `INS-${Math.floor(Math.random() * 10000)}`,
        shipmentId,
        coverage,
        premium,
        riskLevel,
        insurer,
        startDate,
        endDate,
        status: 'active'
      };
      
      setPolicies([newPolicy, ...policies]);
      
      toast({
        title: "Policy Created",
        description: `Insurance policy ${newPolicy.id} has been created on blockchain`,
      });
      
      // Reset form
      setShipmentId('');
      setCoverage('');
      setPremium('');
      setRiskLevel('medium');
      setStartDate('');
      setEndDate('');
    } catch (error) {
      toast({
        title: "Policy Creation Failed",
        description: "Failed to create insurance policy on blockchain",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="bg-gray-50 dark:bg-gray-900 rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Shield className="h-5 w-5 text-blue-500" />
          Insurance Smart Contracts
        </CardTitle>
        <CardDescription>
          Create and manage blockchain-backed insurance policies
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="font-medium">Create New Insurance Policy</h3>
            
            <div>
              <label className="text-sm font-medium">Shipment ID</label>
              <Input
                value={shipmentId}
                onChange={(e) => setShipmentId(e.target.value)}
                placeholder="Enter shipment ID to insure"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">Coverage Amount</label>
                <Input
                  type="number"
                  value={coverage}
                  onChange={(e) => setCoverage(e.target.value)}
                  placeholder="USD"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Premium</label>
                <Input
                  type="number"
                  value={premium}
                  onChange={(e) => setPremium(e.target.value)}
                  placeholder="USD"
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Risk Level</label>
              <Select value={riskLevel} onValueChange={(value: 'low' | 'medium' | 'high') => setRiskLevel(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select risk level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Insurer</label>
              <Input
                value={insurer}
                onChange={(e) => setInsurer(e.target.value)}
                placeholder="Insurance company name"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">Start Date</label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">End Date</label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
            
            <Button 
              onClick={handleCreatePolicy} 
              className="w-full" 
              disabled={isCreating}
            >
              {isCreating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-4 w-4" />
                  Create Policy
                </>
              )}
            </Button>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium">Active Policies</h3>
            {policies.map(policy => (
              <div key={policy.id} className="border rounded-lg p-3">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-medium">{policy.id}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    policy.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : policy.status === 'expired'
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-blue-100 text-blue-800'
                  }`}>
                    {policy.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                  <div className="text-gray-500">Shipment:</div>
                  <div>{policy.shipmentId}</div>
                  
                  <div className="text-gray-500">Coverage:</div>
                  <div>${parseInt(policy.coverage).toLocaleString()}</div>
                  
                  <div className="text-gray-500">Premium:</div>
                  <div>${parseInt(policy.premium).toLocaleString()}</div>
                  
                  <div className="text-gray-500">Risk Level:</div>
                  <div className="capitalize">{policy.riskLevel}</div>
                  
                  <div className="text-gray-500">Valid Until:</div>
                  <div>{new Date(policy.endDate).toLocaleDateString()}</div>
                </div>
                
                <div className="mt-2 flex gap-2">
                  <Button size="sm" variant="outline" className="w-full">
                    <FileText className="mr-1 h-3 w-3" />
                    View Details
                  </Button>
                  
                  {policy.status === 'active' && (
                    <Button size="sm" variant="outline" className="w-full">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      File Claim
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsuranceSmartContract;
