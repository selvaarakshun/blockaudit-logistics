
// International Trade Standards for Logistics

export type ComplianceStatus = 'compliant' | 'non-compliant' | 'pending';

export interface ComplianceResult {
  status: ComplianceStatus;
  details: string[];
  timestamp: string;
  authority?: string;
}

export interface InternationalStandard {
  code: string;
  name: string;
  description: string;
  organization: string;
  website: string;
}

// Common international standards in logistics and trade
export const INTERNATIONAL_STANDARDS: InternationalStandard[] = [
  {
    code: 'ISO28000',
    name: 'ISO 28000',
    description: 'Supply Chain Security Management Systems',
    organization: 'International Organization for Standardization',
    website: 'https://www.iso.org/standard/84161.html'
  },
  {
    code: 'WCOSAFE',
    name: 'WCO SAFE Framework',
    description: 'Framework of Standards to Secure and Facilitate Global Trade',
    organization: 'World Customs Organization',
    website: 'http://www.wcoomd.org/en/topics/facilitation/instrument-and-tools/frameworks-of-standards/safe_package.aspx'
  },
  {
    code: 'ISPM15',
    name: 'ISPM 15',
    description: 'International Standards for Phytosanitary Measures (Wood Packaging)',
    organization: 'International Plant Protection Convention',
    website: 'https://www.ippc.int/en/core-activities/standards-setting/ispms/'
  },
  {
    code: 'CITES',
    name: 'CITES',
    description: 'Convention on International Trade in Endangered Species',
    organization: 'United Nations',
    website: 'https://cites.org/'
  },
  {
    code: 'AEO',
    name: 'Authorized Economic Operator',
    description: 'Certification indicating secure role in international supply chain',
    organization: 'World Customs Organization',
    website: 'http://www.wcoomd.org/en/topics/facilitation/instrument-and-tools/tools/aeo-compendium.aspx'
  }
];

// Function to verify compliance with a specific standard
export const verifyCompliance = async (
  standardCode: string, 
  documentId: string
): Promise<ComplianceResult> => {
  // In a real app, this would call an API or blockchain to verify
  console.log(`Verifying compliance with ${standardCode} for document ${documentId}`);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 'compliant',
        details: [
          'All requirements met',
          'Documentation verified',
          'Digital signatures validated'
        ],
        timestamp: new Date().toISOString(),
        authority: 'Global Standards Authority'
      });
    }, 1200);
  });
};

// Additional international trade guidance
export const INCOTERMS = [
  { code: 'EXW', name: 'Ex Works', risk_transfer: 'At seller\'s premises' },
  { code: 'FCA', name: 'Free Carrier', risk_transfer: 'When delivered to carrier' },
  { code: 'CPT', name: 'Carriage Paid To', risk_transfer: 'When delivered to carrier' },
  { code: 'CIP', name: 'Carriage and Insurance Paid To', risk_transfer: 'When delivered to carrier' },
  { code: 'DAP', name: 'Delivered at Place', risk_transfer: 'At named destination' },
  { code: 'DPU', name: 'Delivered at Place Unloaded', risk_transfer: 'When unloaded at destination' },
  { code: 'DDP', name: 'Delivered Duty Paid', risk_transfer: 'At named destination with duties paid' },
  { code: 'FAS', name: 'Free Alongside Ship', risk_transfer: 'When delivered alongside ship' },
  { code: 'FOB', name: 'Free on Board', risk_transfer: 'When placed on vessel' },
  { code: 'CFR', name: 'Cost and Freight', risk_transfer: 'When placed on vessel' },
  { code: 'CIF', name: 'Cost, Insurance and Freight', risk_transfer: 'When placed on vessel' }
];
