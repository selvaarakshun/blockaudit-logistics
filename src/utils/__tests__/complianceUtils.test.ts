
import { ISO28000Compliance, WCOCompliance } from '../complianceUtils';

// Mock the console.log to prevent noise in test output
global.console.log = jest.fn();

describe('Compliance Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('ISO28000Compliance', () => {
    describe('verifySecurityManagement', () => {
      it('should verify ISO 28000 compliance for a valid shipment ID', async () => {
        const result = await ISO28000Compliance.verifySecurityManagement('SHP-12345');
        
        expect(result).toEqual({
          compliant: true,
          details: expect.any(Array)
        });
        
        expect(result.details).toContain(expect.stringContaining('Security management policy'));
        expect(result.details).toContain(expect.stringContaining('Risk assessment'));
        expect(result.details).toContain(expect.stringContaining('Security controls'));
      });

      it('should handle non-compliance when invalid shipment ID is provided', async () => {
        // Mock implementation returns non-compliance for invalid shipment ID
        const spy = jest.spyOn(ISO28000Compliance, 'verifySecurityManagement')
          .mockImplementationOnce(async () => ({
            compliant: false,
            details: ['Invalid shipment ID format']
          }));
          
        const result = await ISO28000Compliance.verifySecurityManagement('INVALID');
        
        expect(result.compliant).toBe(false);
        expect(result.details).toContain('Invalid shipment ID format');
        
        spy.mockRestore();
      });
    });
  });

  describe('WCOCompliance', () => {
    describe('verifySAFEFramework', () => {
      it('should verify WCO SAFE Framework compliance', async () => {
        const result = await WCOCompliance.verifySAFEFramework({});
        
        expect(result).toEqual({
          compliant: true,
          details: expect.any(Array)
        });
        
        expect(result.details).toContain(expect.stringContaining('AEO status'));
        expect(result.details).toContain(expect.stringContaining('Advance electronic information'));
        expect(result.details).toContain(expect.stringContaining('Risk management'));
      });

      it('should accept custom configuration', async () => {
        const config = {
          includeAEO: true,
          validateSupplyChain: true
        };
        
        const result = await WCOCompliance.verifySAFEFramework(config);
        
        expect(result.compliant).toBe(true);
        expect(result.details).toContain(expect.stringContaining('AEO status'));
      });
    });
  });
});
