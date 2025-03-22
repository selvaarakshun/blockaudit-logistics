
import { useState, useEffect } from 'react';
import { Star, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { getCreditScore, getAvailablePolicies } from '@/utils/insuranceCreditUtils';

const CreditInsuranceMetrics = () => {
  const [creditScore, setCreditScore] = useState<{ score: number; riskLevel: string } | null>(null);
  const [hasInsurance, setHasInsurance] = useState<boolean | null>(null);
  const [isLoadingMetrics, setIsLoadingMetrics] = useState(false);

  useEffect(() => {
    // Load credit score and insurance availability on component mount
    const loadEntityMetrics = async () => {
      setIsLoadingMetrics(true);
      try {
        // Get credit score for the entity
        const score = await getCreditScore('entity1');
        setCreditScore({ 
          score: score.score,
          riskLevel: score.riskLevel
        });
        
        // Check if there are active insurance policies
        const policies = getAvailablePolicies();
        const activePolicies = policies.filter(policy => policy.status === 'active');
        setHasInsurance(activePolicies.length > 0);
      } catch (error) {
        console.error('Error loading entity metrics:', error);
      } finally {
        setIsLoadingMetrics(false);
      }
    };
    
    loadEntityMetrics();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
      <Card className="bg-white/50 dark:bg-logistics-dark/50 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-logistics-light-blue/30 dark:bg-logistics-blue/20 rounded-full flex items-center justify-center">
              <Star className="size-5 text-logistics-blue" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Credit Score</h4>
              {isLoadingMetrics ? (
                <div className="text-sm text-gray-400">Loading...</div>
              ) : creditScore ? (
                <div className="flex items-center gap-2">
                  <span className="text-xl font-semibold">{creditScore.score}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    creditScore.riskLevel === 'low' ? 'bg-green-100 text-green-600' : 
                    creditScore.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-600' : 
                    'bg-red-100 text-red-600'
                  }`}>
                    {creditScore.riskLevel.toUpperCase()}
                  </span>
                </div>
              ) : (
                <div className="text-sm text-gray-400">Not available</div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/50 dark:bg-logistics-dark/50 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-logistics-light-blue/30 dark:bg-logistics-blue/20 rounded-full flex items-center justify-center">
              <Shield className="size-5 text-logistics-blue" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Insurance Status</h4>
              {isLoadingMetrics ? (
                <div className="text-sm text-gray-400">Loading...</div>
              ) : hasInsurance !== null ? (
                <div className="flex items-center gap-2">
                  <span className={`text-sm px-2 py-0.5 rounded-full ${
                    hasInsurance ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {hasInsurance ? 'ACTIVE COVERAGE' : 'NO COVERAGE'}
                  </span>
                </div>
              ) : (
                <div className="text-sm text-gray-400">Not available</div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreditInsuranceMetrics;
