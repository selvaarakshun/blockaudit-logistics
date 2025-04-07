
import { 
  verifyDocumentOnChain, 
  registerDocumentOnChain, 
  getDocumentHistory,
  SmartContractDocument
} from '../documentUtils';

// Mock the console.log to prevent noise in test output
global.console.log = jest.fn();

describe('Document Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('verifyDocumentOnChain', () => {
    it('should resolve to true when verification is successful', async () => {
      const result = await verifyDocumentOnChain('validDocHash');
      expect(result).toBe(true);
      expect(console.log).toHaveBeenCalledWith('Verifying document with hash: validDocHash');
    });

    it('should take approximately 1.5 seconds to verify', async () => {
      const start = Date.now();
      await verifyDocumentOnChain('validDocHash');
      const end = Date.now();
      const duration = end - start;
      
      // The function should take at least 1.5 seconds due to the setTimeout
      expect(duration).toBeGreaterThanOrEqual(1500);
      // Allow for some small variation in timing
      expect(duration).toBeLessThan(1700);
    });
  });

  describe('registerDocumentOnChain', () => {
    it('should register a document and return a hash', async () => {
      const mockDocument: Omit<SmartContractDocument, 'hash'> = {
        docId: 'DOC-123',
        docType: 'billOfLading',
        issuer: 'Test Issuer',
        issuedAt: new Date().toISOString(),
        signers: [{ 
          name: 'Test Signer', 
          signature: 'test_signature', 
          timestamp: new Date().toISOString() 
        }]
      };

      const hash = await registerDocumentOnChain(mockDocument);
      
      expect(typeof hash).toBe('string');
      expect(hash).toMatch(/^0x[a-f0-9]{16}$/); // Should match the mock hash format
      expect(console.log).toHaveBeenCalledWith(`Registering document on blockchain: DOC-123`);
    });

    it('should take approximately 2 seconds to register', async () => {
      const mockDocument: Omit<SmartContractDocument, 'hash'> = {
        docId: 'DOC-123',
        docType: 'billOfLading',
        issuer: 'Test Issuer',
        issuedAt: new Date().toISOString(),
        signers: [{ 
          name: 'Test Issuer', 
          signature: 'test_signature', 
          timestamp: new Date().toISOString() 
        }]
      };
      
      const start = Date.now();
      await registerDocumentOnChain(mockDocument);
      const end = Date.now();
      const duration = end - start;
      
      // The function should take at least 2 seconds due to the setTimeout
      expect(duration).toBeGreaterThanOrEqual(2000);
      // Allow for some small variation in timing
      expect(duration).toBeLessThan(2200);
    });
  });

  describe('getDocumentHistory', () => {
    it('should return an array of history events for a given document ID', async () => {
      const history = await getDocumentHistory('DOC-123');
      
      expect(Array.isArray(history)).toBe(true);
      expect(history.length).toBe(3); // Default mock returns 3 events
      
      // Check structure of history items
      history.forEach(item => {
        expect(item).toHaveProperty('action');
        expect(item).toHaveProperty('timestamp');
        expect(item).toHaveProperty('actor');
      });
      
      expect(console.log).toHaveBeenCalledWith('Getting history for document: DOC-123');
    });

    it('should take approximately 1 second to retrieve history', async () => {
      const start = Date.now();
      await getDocumentHistory('DOC-123');
      const end = Date.now();
      const duration = end - start;
      
      // The function should take at least 1 second due to the setTimeout
      expect(duration).toBeGreaterThanOrEqual(1000);
      // Allow for some small variation in timing
      expect(duration).toBeLessThan(1200);
    });
  });
});
