
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { ShieldCheck, CreditCard, PieChart, FileText, Loader2, ArrowDownCircle } from 'lucide-react';
import { 
  getCreditScore, 
  getCreditFacilities, 
  getAvailablePolicies,
  createInsurancePolicy,
  submitInsuranceClaim,
  InsurancePolicy,
  CreditScore,
  CreditFacility
} from '@/utils/insuranceCreditUtils';

const InsuranceCreditDashboard = () => {
  const [activeTab, setActiveTab] = useState('insurance');
  
  // Insurance state
  const [policies, setPolicies] = useState<InsurancePolicy[]>([]);
  const [selectedPolicy, setSelectedPolicy] = useState<string>('');
  const [coverageType, setCoverageType] = useState<'cargo' | 'liability' | 'delay' | 'cyber'>('cargo');
  const [coverage, setCoverage] = useState('1000000');
  const [deductible, setDeductible] = useState('10000');
  const [policyTerm, setPolicyTerm] = useState('365');
  const [isCreatingPolicy, setIsCreatingPolicy] = useState(false);
  
  // Claim state
  const [claimAmount, setClaimAmount] = useState('');
  const [claimDescription, setClaimDescription] = useState('');
  const [isSubmittingClaim, setIsSubmittingClaim] = useState(false);
  
  // Credit state
  const [entityId, setEntityId] = useState('entity1');
  const [creditScore, setCreditScore] = useState<CreditScore | null>(null);
  const [creditFacilities, setCreditFacilities] = useState<CreditFacility[]>([]);
  const [isLoadingCredit, setIsLoadingCredit] = useState(false);
  
  const handleLoadInsurancePolicies = () => {
    const availablePolicies = getAvailablePolicies();
    setPolicies(availablePolicies);
    
    if (availablePolicies.length > 0) {
      setSelectedPolicy(availablePolicies[0].id);
    }
    
    toast({
      title: "Policies Loaded",
      description: `Loaded ${availablePolicies.length} insurance policies`,
    });
  };
  
  const handleCreatePolicy = async () => {
    if (!coverage || !deductible || !policyTerm) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsCreatingPolicy(true);
    
    try {
      const newPolicy = await createInsurancePolicy(
        coverageType,
        Number(coverage),
        Number(deductible),
        Number(policyTerm)
      );
      
      setPolicies(prev => [...prev, newPolicy]);
      setSelectedPolicy(newPolicy.id);
      
      toast({
        title: "Policy Created",
        description: `Created ${coverageType} insurance policy with $${coverage} coverage`,
      });
      
      // Reset form
      setCoverage('1000000');
      setDeductible('10000');
    } catch (error) {
      toast({
        title: "Policy Creation Failed",
        description: "Failed to create insurance policy",
        variant: "destructive"
      });
    } finally {
      setIsCreatingPolicy(false);
    }
  };
  
  const handleSubmitClaim = async () => {
    if (!selectedPolicy || !claimAmount || !claimDescription) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmittingClaim(true);
    
    try {
      const result = await submitInsuranceClaim(
        selectedPolicy,
        Number(claimAmount),
        claimDescription,
        [] // No documents for this demo
      );
      
      if (result.success) {
        toast({
          title: "Claim Submitted",
          description: `Claim ${result.claimId} submitted successfully`,
        });
        
        // Reset form
        setClaimAmount('');
        setClaimDescription('');
      } else {
        toast({
          title: "Claim Submission Failed",
          description: result.error || "Unknown error occurred",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Claim Submission Failed",
        description: "Failed to submit insurance claim",
        variant: "destructive"
      });
    } finally {
      setIsSubmittingClaim(false);
    }
  };
  
  const handleLoadCreditInfo = async () => {
    if (!entityId) {
      toast({
        title: "Missing Entity ID",
        description: "Please select an entity",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoadingCredit(true);
    
    try {
      const [score, facilities] = await Promise.all([
        getCreditScore(entityId),
        getCreditFacilities(entityId)
      ]);
      
      setCreditScore(score);
      setCreditFacilities(facilities);
      
      toast({
        title: "Credit Information Loaded",
        description: `Loaded credit information for ${score.entityName}`,
      });
    } catch (error) {
      toast({
        title: "Loading Failed",
        description: "Failed to load credit information",
        variant: "destructive"
      });
    } finally {
      setIsLoadingCredit(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-logistics-blue" />
          Insurance & Credit Dashboard
        </CardTitle>
        <CardDescription>
          Manage blockchain-based insurance policies and credit facilities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="insurance">Insurance</TabsTrigger>
            <TabsTrigger value="credit">Credit Scoring</TabsTrigger>
          </TabsList>
          
          <TabsContent value="insurance" className="space-y-4 mt-4">
            <Tabs defaultValue="policies" className="w-full">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="policies">Policies</TabsTrigger>
                <TabsTrigger value="new">New Policy</TabsTrigger>
                <TabsTrigger value="claim">Submit Claim</TabsTrigger>
              </TabsList>
              
              <TabsContent value="policies" className="space-y-4 mt-4">
                {policies.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-logistics-gray mb-4">No insurance policies loaded</p>
                    <Button onClick={handleLoadInsurancePolicies}>
                      <ArrowDownCircle className="mr-2 h-4 w-4" />
                      Load Policies
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {policies.map(policy => (
                      <div 
                        key={policy.id} 
                        className={`border rounded-lg p-4 cursor-pointer ${
                          selectedPolicy === policy.id ? 'border-logistics-blue bg-logistics-blue/5' : ''
                        }`}
                        onClick={() => setSelectedPolicy(policy.id)}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium capitalize">{policy.coverageType} Insurance</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            policy.status === 'active' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                              : policy.status === 'expired'
                                ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                          }`}>
                            {policy.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <div>
                            <p className="text-xs text-logistics-gray">Coverage</p>
                            <p className="text-sm font-medium">${policy.coverage.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-logistics-gray">Premium</p>
                            <p className="text-sm font-medium">${policy.premium.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-logistics-gray">Start Date</p>
                            <p className="text-sm">{new Date(policy.startDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-logistics-gray">End Date</p>
                            <p className="text-sm">{new Date(policy.endDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <p className="text-xs text-logistics-gray">Policy ID: {policy.id}</p>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="new" className="space-y-4 mt-4">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <label htmlFor="coverageType" className="text-sm font-medium">Coverage Type</label>
                    <Select 
                      value={coverageType} 
                      onValueChange={(value: 'cargo' | 'liability' | 'delay' | 'cyber') => setCoverageType(value)}
                    >
                      <SelectTrigger id="coverageType">
                        <SelectValue placeholder="Select coverage type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cargo">Cargo Insurance</SelectItem>
                        <SelectItem value="liability">Liability Insurance</SelectItem>
                        <SelectItem value="delay">Delay Insurance</SelectItem>
                        <SelectItem value="cyber">Cyber Insurance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="coverage" className="text-sm font-medium">Coverage Amount ($)</label>
                    <Input
                      id="coverage"
                      type="number"
                      value={coverage}
                      onChange={(e) => setCoverage(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="deductible" className="text-sm font-medium">Deductible ($)</label>
                    <Input
                      id="deductible"
                      type="number"
                      value={deductible}
                      onChange={(e) => setDeductible(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="policyTerm" className="text-sm font-medium">Policy Term (days)</label>
                    <Input
                      id="policyTerm"
                      type="number"
                      value={policyTerm}
                      onChange={(e) => setPolicyTerm(e.target.value)}
                    />
                  </div>
                  
                  <Button 
                    onClick={handleCreatePolicy} 
                    className="w-full" 
                    disabled={isCreatingPolicy}
                  >
                    {isCreatingPolicy ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Policy...
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="mr-2 h-4 w-4" />
                        Create Policy
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="claim" className="space-y-4 mt-4">
                {policies.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-logistics-gray">No policies available for claims. Please load or create policies first.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <label htmlFor="policySelect" className="text-sm font-medium">Select Policy</label>
                      <Select value={selectedPolicy} onValueChange={setSelectedPolicy}>
                        <SelectTrigger id="policySelect">
                          <SelectValue placeholder="Select policy" />
                        </SelectTrigger>
                        <SelectContent>
                          {policies.filter(p => p.status === 'active').map(policy => (
                            <SelectItem key={policy.id} value={policy.id}>
                              {policy.coverageType} - ${policy.coverage.toLocaleString()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="claimAmount" className="text-sm font-medium">Claim Amount ($)</label>
                      <Input
                        id="claimAmount"
                        type="number"
                        value={claimAmount}
                        onChange={(e) => setClaimAmount(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="claimDescription" className="text-sm font-medium">Claim Description</label>
                      <Input
                        id="claimDescription"
                        value={claimDescription}
                        onChange={(e) => setClaimDescription(e.target.value)}
                        placeholder="Describe the incident or reason for claim"
                      />
                    </div>
                    
                    <Button 
                      onClick={handleSubmitClaim} 
                      className="w-full" 
                      disabled={isSubmittingClaim || !selectedPolicy}
                    >
                      {isSubmittingClaim ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting Claim...
                        </>
                      ) : (
                        <>
                          <FileText className="mr-2 h-4 w-4" />
                          Submit Claim
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </TabsContent>
          
          <TabsContent value="credit" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="entitySelect" className="text-sm font-medium">Select Entity</label>
                <Select value={entityId} onValueChange={setEntityId}>
                  <SelectTrigger id="entitySelect">
                    <SelectValue placeholder="Select entity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entity1">Global Shipping Co.</SelectItem>
                    <SelectItem value="entity2">Fast Logistics Ltd.</SelectItem>
                    <SelectItem value="entity3">New Venture Cargo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={handleLoadCreditInfo} 
                className="w-full" 
                disabled={isLoadingCredit}
              >
                {isLoadingCredit ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading Credit Info...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Load Credit Information
                  </>
                )}
              </Button>
              
              {creditScore && (
                <div className="mt-4 border rounded-lg p-4">
                  <h3 className="font-medium mb-4">{creditScore.entityName}</h3>
                  
                  <div className="flex justify-center mb-4">
                    <div className="relative size-32">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold">{creditScore.score}</span>
                      </div>
                      <svg viewBox="0 0 100 100" className="transform -rotate-90 size-full">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#e2e8f0"
                          strokeWidth="10"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke={creditScore.riskLevel === 'low' ? '#10b981' : creditScore.riskLevel === 'medium' ? '#f59e0b' : '#ef4444'}
                          strokeWidth="10"
                          strokeDasharray={`${creditScore.score * 2.83} 283`}
                        />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-logistics-gray">Risk Level</p>
                      <p className={`text-sm font-medium ${
                        creditScore.riskLevel === 'low' 
                          ? 'text-green-600 dark:text-green-400' 
                          : creditScore.riskLevel === 'medium'
                            ? 'text-yellow-600 dark:text-yellow-400'
                            : 'text-red-600 dark:text-red-400'
                      }`}>
                        {creditScore.riskLevel.charAt(0).toUpperCase() + creditScore.riskLevel.slice(1)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-logistics-gray">Transactions</p>
                      <p className="text-sm font-medium">{creditScore.transactionCount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-logistics-gray">Avg. Transaction</p>
                      <p className="text-sm font-medium">${creditScore.averageTransactionValue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-logistics-gray">Last Updated</p>
                      <p className="text-sm font-medium">{new Date(creditScore.lastUpdated).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {creditFacilities && creditFacilities.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Credit Facilities</h3>
                  <div className="space-y-3">
                    {creditFacilities.map(facility => (
                      <div key={facility.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">
                            {facility.facilityType === 'letter_of_credit' 
                              ? 'Letter of Credit' 
                              : facility.facilityType === 'trade_finance'
                                ? 'Trade Finance'
                                : 'Invoice Factoring'}
                          </h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            facility.status === 'active' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                          }`}>
                            {facility.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <div>
                            <p className="text-xs text-logistics-gray">Amount</p>
                            <p className="text-sm font-medium">${facility.amount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-logistics-gray">Remaining</p>
                            <p className="text-sm font-medium">${facility.remainingAmount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-logistics-gray">Interest Rate</p>
                            <p className="text-sm font-medium">{facility.interestRate}%</p>
                          </div>
                          <div>
                            <p className="text-xs text-logistics-gray">Term</p>
                            <p className="text-sm font-medium">{facility.terms} days</p>
                          </div>
                        </div>
                        
                        <div className="mt-2 pt-2 border-t">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-logistics-gray">Utilization</span>
                            <span className="font-medium">
                              {Math.round((1 - facility.remainingAmount / facility.amount) * 100)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-1 overflow-hidden">
                            <div 
                              className="bg-logistics-blue h-full rounded-full" 
                              style={{ width: `${Math.round((1 - facility.remainingAmount / facility.amount) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default InsuranceCreditDashboard;
