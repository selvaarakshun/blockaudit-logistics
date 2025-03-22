
import { CrossChainTransaction } from '@/utils/interoperabilityUtils';
import CreditInsuranceMetrics from './CreditInsuranceMetrics';
import TransferForm from './TransferForm';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CircleDollarSign, Shield, Cpu, ArrowUpDown, Landmark, LineChart, AlertTriangle } from 'lucide-react';

interface AssetTransferProps {
  onTransactionCreated?: (transaction: CrossChainTransaction) => void;
}

const AssetTransfer = ({ onTransactionCreated }: AssetTransferProps) => {
  const [showAdvancedFeatures, setShowAdvancedFeatures] = useState(false);
  
  // Simulated credit score data
  const creditScore = {
    score: 87,
    trend: 'up',
    transactions: 124,
    verified: true,
    lastChecked: new Date().toLocaleDateString()
  };
  
  // Simulated insurance metrics
  const insuranceData = {
    premium: 0.25, // 0.25% premium rate
    coverage: 980000, // $980,000 in coverage
    history: 17, // 17 previous successful claims
    status: 'active',
    provider: 'ChainShield Insurance'
  };
  
  return (
    <div className="space-y-6">
      {/* Credit and Insurance Metrics */}
      <CreditInsuranceMetrics />
      
      {/* Enhanced Credit Score Card */}
      <Card className="bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm">
        <CardHeader className="pb-3 border-b border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <CircleDollarSign className="h-5 w-5 text-primary" />
                Blockchain Credit Score
              </CardTitle>
              <CardDescription>Based on on-chain transaction history and verification</CardDescription>
            </div>
            <Badge variant={creditScore.score > 80 ? "success" : creditScore.score > 60 ? "warning" : "destructive"} className="text-xs px-2.5 py-0.5 rounded-full">
              {creditScore.score}/100
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <div className="text-sm text-gray-500 dark:text-gray-400">Verified Transactions</div>
              <div className="font-semibold flex items-center">
                {creditScore.transactions}
                <span className="ml-1.5 text-xs text-green-500 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                  12%
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-gray-500 dark:text-gray-400">Verification Status</div>
              <div className="font-semibold flex items-center gap-1 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                Fully Verified
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-gray-500 dark:text-gray-400">Last Updated</div>
              <div className="font-semibold">{creditScore.lastChecked}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Smart Insurance Card */}
      <Card className="bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm">
        <CardHeader className="pb-3 border-b border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Smart Insurance Policy
              </CardTitle>
              <CardDescription>Automated blockchain-based insurance coverage</CardDescription>
            </div>
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
              {insuranceData.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <div className="text-sm text-gray-500 dark:text-gray-400">Coverage Amount</div>
              <div className="font-semibold">${(insuranceData.coverage/1000).toFixed(0)}k</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-gray-500 dark:text-gray-400">Premium Rate</div>
              <div className="font-semibold">{insuranceData.premium}%</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-gray-500 dark:text-gray-400">Successful Claims</div>
              <div className="font-semibold">{insuranceData.history}</div>
            </div>
          </div>
          
          <div className="mt-4 text-sm flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <span>Smart contracts will auto-execute claims based on verified tracking data</span>
          </div>
        </CardContent>
      </Card>
      
      {/* Advanced Features Toggle */}
      <div className="flex justify-end">
        <button 
          onClick={() => setShowAdvancedFeatures(!showAdvancedFeatures)}
          className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1.5"
        >
          <Cpu className="h-4 w-4" />
          {showAdvancedFeatures ? 'Hide Advanced Features' : 'Show Advanced Features'}
        </button>
      </div>
      
      {/* Advanced Features */}
      {showAdvancedFeatures && (
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-base flex items-center gap-1.5">
                <ArrowUpDown className="h-4 w-4 text-primary" />
                Cross-Chain Liquidity
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              Automated liquidity provisioning across Ethereum, Polygon, and Arbitrum networks with 0.1% slippage protection.
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-base flex items-center gap-1.5">
                <Landmark className="h-4 w-4 text-primary" />
                DeFi Collateralization
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              Use your logistics assets as collateral in DeFi protocols to access instant liquidity while goods are in transit.
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-base flex items-center gap-1.5">
                <LineChart className="h-4 w-4 text-primary" />
                Predictive Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              AI-powered predictions for optimal routing, timing, and cost efficiency based on historical blockchain data.
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-base flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-primary" />
                Zero-Knowledge Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              Prove regulatory compliance without revealing sensitive shipment details using zero-knowledge proofs.
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Transfer Form */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Initiate Asset Transfer</h3>
        <TransferForm onTransactionCreated={onTransactionCreated} />
      </div>
    </div>
  );
};

export default AssetTransfer;
