
import { CrossChainTransaction } from './interoperabilityUtils';

// Generate mock blockchain transactions
export const generateMockTransactions = (count: number = 10): CrossChainTransaction[] => {
  const transactions: CrossChainTransaction[] = [];
  const blockchains = ['Ethereum', 'Hyperledger Fabric', 'Polkadot', 'Solana', 'Corda', 'Stellar'];
  const assetTypes = ['Document', 'Token', 'NFT', 'Certificate', 'Credit', 'Insurance'];
  const statuses = ['completed', 'pending', 'failed'] as const;
  
  for (let i = 0; i < count; i++) {
    const sourceIndex = Math.floor(Math.random() * blockchains.length);
    let targetIndex = Math.floor(Math.random() * blockchains.length);
    
    // Ensure source and target are different
    while (targetIndex === sourceIndex) {
      targetIndex = Math.floor(Math.random() * blockchains.length);
    }
    
    const transaction: CrossChainTransaction = {
      id: `tx-${Math.random().toString(36).substring(2, 10)}`,
      sourceChain: blockchains[sourceIndex],
      targetChain: blockchains[targetIndex],
      assetType: assetTypes[Math.floor(Math.random() * assetTypes.length)],
      amount: Math.floor(Math.random() * 1000) / 100,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 86400000 * 7)).toISOString(),
      hash: `0x${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`
    };
    
    transactions.push(transaction);
  }
  
  // Sort by timestamp, newest first
  return transactions.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
};

// Local storage for persistent data
const TRANSACTIONS_STORAGE_KEY = 'blockchain-transactions';

// Save transactions to local storage
export const saveTransactions = (transactions: CrossChainTransaction[]): void => {
  try {
    localStorage.setItem(TRANSACTIONS_STORAGE_KEY, JSON.stringify(transactions));
  } catch (error) {
    console.error('Error saving transactions to localStorage:', error);
  }
};

// Get transactions from local storage
export const getStoredTransactions = (): CrossChainTransaction[] => {
  try {
    const storedData = localStorage.getItem(TRANSACTIONS_STORAGE_KEY);
    if (storedData) {
      return JSON.parse(storedData);
    }
  } catch (error) {
    console.error('Error retrieving transactions from localStorage:', error);
  }
  
  // If no stored data or error, generate mock data and save it
  const mockTransactions = generateMockTransactions();
  saveTransactions(mockTransactions);
  return mockTransactions;
};

// Add a new transaction and save to storage
export const addTransaction = (transaction: CrossChainTransaction): CrossChainTransaction[] => {
  const currentTransactions = getStoredTransactions();
  const updatedTransactions = [transaction, ...currentTransactions];
  saveTransactions(updatedTransactions);
  return updatedTransactions;
};
