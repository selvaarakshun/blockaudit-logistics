
// Insurance and credit-based approach utilities
// This is a simplified mock implementation for demonstration purposes

export interface InsurancePolicy {
  id: string;
  coverageType: 'cargo' | 'liability' | 'delay' | 'cyber';
  premium: number;
  coverage: number;
  deductible: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'claimed';
  documents: string[];
}

export interface CreditScore {
  entityId: string;
  entityName: string;
  score: number; // 0-100
  riskLevel: 'low' | 'medium' | 'high';
  lastUpdated: string;
  transactionCount: number;
  averageTransactionValue: number;
}

export interface CreditFacility {
  id: string;
  entityId: string;
  facilityType: 'letter_of_credit' | 'trade_finance' | 'invoice_factoring';
  amount: number;
  remainingAmount: number;
  interestRate: number;
  terms: number; // In days
  startDate: string;
  status: 'active' | 'pending' | 'closed';
}

// Mock insurance policies
export const getAvailablePolicies = (): InsurancePolicy[] => {
  return [
    {
      id: 'pol_cargo123',
      coverageType: 'cargo',
      premium: 5000,
      coverage: 1000000,
      deductible: 10000,
      startDate: new Date(Date.now() - 30 * 86400000).toISOString(),
      endDate: new Date(Date.now() + 335 * 86400000).toISOString(),
      status: 'active',
      documents: ['doc_cargo_terms', 'doc_cargo_inventory']
    },
    {
      id: 'pol_liability456',
      coverageType: 'liability',
      premium: 3000,
      coverage: 500000,
      deductible: 5000,
      startDate: new Date(Date.now() - 60 * 86400000).toISOString(),
      endDate: new Date(Date.now() + 305 * 86400000).toISOString(),
      status: 'active',
      documents: ['doc_liability_terms']
    },
    {
      id: 'pol_delay789',
      coverageType: 'delay',
      premium: 2000,
      coverage: 200000,
      deductible: 2000,
      startDate: new Date(Date.now() - 90 * 86400000).toISOString(),
      endDate: new Date(Date.now() - 5 * 86400000).toISOString(),
      status: 'expired',
      documents: ['doc_delay_terms']
    }
  ];
};

// Get credit score for an entity
export const getCreditScore = async (entityId: string): Promise<CreditScore> => {
  console.log(`Getting credit score for entity: ${entityId}`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // In a real implementation, this would fetch the score from a blockchain-based credit system
  const mockScores: Record<string, Omit<CreditScore, 'entityId'>> = {
    'entity1': {
      entityName: 'Global Shipping Co.',
      score: 85,
      riskLevel: 'low',
      lastUpdated: new Date(Date.now() - 7 * 86400000).toISOString(),
      transactionCount: 128,
      averageTransactionValue: 45000
    },
    'entity2': {
      entityName: 'Fast Logistics Ltd.',
      score: 72,
      riskLevel: 'medium',
      lastUpdated: new Date(Date.now() - 14 * 86400000).toISOString(),
      transactionCount: 64,
      averageTransactionValue: 28000
    },
    'entity3': {
      entityName: 'New Venture Cargo',
      score: 45,
      riskLevel: 'high',
      lastUpdated: new Date(Date.now() - 2 * 86400000).toISOString(),
      transactionCount: 12,
      averageTransactionValue: 15000
    }
  };
  
  // Return the requested score or a default one
  return {
    entityId,
    ...(mockScores[entityId] || {
      entityName: 'Unknown Entity',
      score: 50,
      riskLevel: 'medium',
      lastUpdated: new Date().toISOString(),
      transactionCount: 0,
      averageTransactionValue: 0
    })
  };
};

// Get active credit facilities
export const getCreditFacilities = async (entityId: string): Promise<CreditFacility[]> => {
  console.log(`Getting credit facilities for entity: ${entityId}`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // Mock credit facilities
  return [
    {
      id: 'cf_letter123',
      entityId,
      facilityType: 'letter_of_credit',
      amount: 250000,
      remainingAmount: 150000,
      interestRate: 3.5,
      terms: 90,
      startDate: new Date(Date.now() - 30 * 86400000).toISOString(),
      status: 'active'
    },
    {
      id: 'cf_invoice456',
      entityId,
      facilityType: 'invoice_factoring',
      amount: 100000,
      remainingAmount: 75000,
      interestRate: 2.8,
      terms: 60,
      startDate: new Date(Date.now() - 15 * 86400000).toISOString(),
      status: 'active'
    }
  ];
};

// Create an insurance policy
export const createInsurancePolicy = async (
  coverageType: InsurancePolicy['coverageType'],
  coverage: number,
  deductible: number,
  termDays: number
): Promise<InsurancePolicy> => {
  console.log(`Creating insurance policy: ${coverageType} with $${coverage} coverage`);
  
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const premium = coverage * 0.005; // Simplified premium calculation
  
  return {
    id: `pol_${coverageType}_${Math.random().toString(36).substring(2, 10)}`,
    coverageType,
    premium,
    coverage,
    deductible,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + termDays * 86400000).toISOString(),
    status: 'active',
    documents: [`doc_${coverageType}_terms`]
  };
};

// Submit insurance claim
export const submitInsuranceClaim = async (
  policyId: string,
  claimAmount: number,
  description: string,
  evidenceDocuments: string[]
): Promise<{ success: boolean; claimId?: string; error?: string }> => {
  console.log(`Submitting claim on policy ${policyId} for $${claimAmount}`);
  
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // In a real implementation, this would create a claim on the blockchain
  return {
    success: true,
    claimId: `claim_${Math.random().toString(36).substring(2, 10)}`
  };
};
