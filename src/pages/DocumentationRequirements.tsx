
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { FileText, Download, Check, ExternalLink, Info, ChevronRight } from 'lucide-react';

const DocumentationRequirements = () => {
  const [activeTab, setActiveTab] = useState('general');

  const requiredDocuments = [
    {
      id: 'bill-of-lading',
      name: 'Bill of Lading',
      description: 'A legal document issued by a carrier to a shipper that details the type, quantity, and destination of goods.',
      required: true,
      countries: ['All Countries']
    },
    {
      id: 'commercial-invoice',
      name: 'Commercial Invoice',
      description: 'A document that contains details about the transaction between buyer and seller.',
      required: true,
      countries: ['All Countries']
    },
    {
      id: 'packing-list',
      name: 'Packing List',
      description: 'A document that itemizes the contents of a package or shipment.',
      required: true,
      countries: ['All Countries']
    },
    {
      id: 'certificate-of-origin',
      name: 'Certificate of Origin',
      description: 'A document declaring in which country a product was manufactured.',
      required: true,
      countries: ['USA', 'EU', 'UK', 'China', 'Japan', 'Australia']
    },
    {
      id: 'phytosanitary-certificate',
      name: 'Phytosanitary Certificate',
      description: 'A document required for agricultural and plant-based shipments.',
      required: false,
      countries: ['USA', 'EU', 'Australia', 'New Zealand', 'Japan']
    },
    {
      id: 'dangerous-goods-declaration',
      name: 'Dangerous Goods Declaration',
      description: 'Required for shipping hazardous materials.',
      required: false,
      countries: ['All Countries']
    }
  ];

  const countrySpecificRequirements = [
    {
      region: 'United States',
      requirements: ['ISF Filing', 'FDA Prior Notice (for food)', 'FCC Declaration (for electronics)'],
      timeframe: '24-48 hours before vessel departure'
    },
    {
      region: 'European Union',
      requirements: ['Entry Summary Declaration (ENS)', 'REACH Compliance (for chemicals)', 'CE Marking (for regulated products)'],
      timeframe: '24 hours before vessel loading'
    },
    {
      region: 'China',
      requirements: ['CCC Certificate (for certain products)', 'Import License', 'Chinese Labels'],
      timeframe: '24 hours before arrival'
    },
    {
      region: 'Australia',
      requirements: ['Import Declaration', 'BMSB Treatment (seasonal)', 'ISPM-15 Compliance for wooden packaging'],
      timeframe: '48 hours before arrival'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container pt-20 pb-10 space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Documentation Requirements</h1>
          <p className="text-muted-foreground mb-6">
            Essential documents needed for international shipping and customs clearance
          </p>
        </div>
        
        <Alert className="border-logistics-blue/20 bg-logistics-blue/10">
          <Info className="h-4 w-4 text-logistics-blue" />
          <AlertTitle>Document Preparation</AlertTitle>
          <AlertDescription>
            Properly prepared documentation can speed up customs clearance by up to 80%. 
            <Link to="/tax-compliance" className="ml-2 text-logistics-blue hover:underline inline-flex items-center">
              Learn more about compliance <ChevronRight className="h-4 w-4" />
            </Link>
          </AlertDescription>
        </Alert>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="general">General Requirements</TabsTrigger>
            <TabsTrigger value="country">Country Specific</TabsTrigger>
            <TabsTrigger value="templates">Document Templates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Required Documents for International Shipping</CardTitle>
                <CardDescription>
                  These documents are typically required for most international shipments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {requiredDocuments.map((doc) => (
                    <div key={doc.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{doc.name}</h3>
                        {doc.required ? (
                          <span className="text-xs bg-logistics-blue/10 text-logistics-blue px-2 py-1 rounded-full">Required</span>
                        ) : (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Optional</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{doc.description}</p>
                      <div className="mt-3">
                        <span className="text-xs font-medium">Required for:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {doc.countries.map((country, idx) => (
                            <span key={idx} className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                              {country}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Document Verification Process</CardTitle>
                <CardDescription>
                  How the GuudzChain platform handles documentation verification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { step: 1, title: "Document Upload", desc: "Upload required documents to the platform" },
                    { step: 2, title: "AI Verification", desc: "AI checks document formatting and completeness" },
                    { step: 3, title: "Blockchain Record", desc: "Document hashes are recorded on blockchain" },
                    { step: 4, title: "Customs Approval", desc: "Pre-approved documents speed up customs clearance" }
                  ].map((step) => (
                    <div key={step.step} className="border rounded-lg p-4 relative">
                      <div className="size-8 flex items-center justify-center bg-logistics-blue rounded-full text-white font-medium absolute -top-3 -left-3">
                        {step.step}
                      </div>
                      <h3 className="font-medium mt-2">{step.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{step.desc}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <Button variant="outline" className="w-full">
                    <Link to="/audit-trail" className="flex items-center justify-center gap-2 w-full">
                      <FileText className="h-4 w-4" />
                      Go to Document Management
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="country" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Country-Specific Requirements</CardTitle>
                <CardDescription>
                  Additional documentation required for specific countries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {countrySpecificRequirements.map((region, idx) => (
                    <div key={idx} className="border rounded-lg p-4">
                      <h3 className="font-medium text-lg">{region.region}</h3>
                      <div className="mt-2 space-y-2">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Timeframe:</span> {region.timeframe}
                        </p>
                        <div>
                          <p className="text-sm font-medium">Required Documents:</p>
                          <ul className="mt-1 space-y-1">
                            {region.requirements.map((req, reqIdx) => (
                              <li key={reqIdx} className="text-sm flex items-start gap-2">
                                <Check className="h-4 w-4 text-logistics-blue shrink-0 mt-0.5" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Customs Authority Links</CardTitle>
                <CardDescription>
                  Direct links to official customs websites
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: "U.S. Customs and Border Protection", url: "https://www.cbp.gov" },
                    { name: "European Union Customs", url: "https://taxation-customs.ec.europa.eu" },
                    { name: "China Customs", url: "http://english.customs.gov.cn" },
                    { name: "UK HMRC", url: "https://www.gov.uk/government/organisations/hm-revenue-customs" },
                    { name: "Japanese Customs", url: "https://www.customs.go.jp/english" },
                    { name: "Australian Border Force", url: "https://www.abf.gov.au" }
                  ].map((authority, idx) => (
                    <a 
                      key={idx}
                      href={authority.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors flex justify-between items-center"
                    >
                      <span className="font-medium text-sm">{authority.name}</span>
                      <ExternalLink className="h-4 w-4 text-logistics-blue" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Document Templates</CardTitle>
                <CardDescription>
                  Downloadable templates for common shipping documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "Commercial Invoice Template", format: "XLSX", size: "24KB" },
                    { name: "Packing List Template", format: "XLSX", size: "18KB" },
                    { name: "Bill of Lading Template", format: "DOCX", size: "35KB" },
                    { name: "Certificate of Origin Template", format: "DOCX", size: "28KB" },
                    { name: "Dangerous Goods Declaration", format: "PDF", size: "215KB" },
                    { name: "Shipper's Letter of Instruction", format: "DOCX", size: "42KB" }
                  ].map((template, idx) => (
                    <div key={idx} className="border rounded-lg p-4 flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{template.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                            {template.format}
                          </span>
                          <span className="text-xs text-gray-500">{template.size}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="text-logistics-blue">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 border rounded-lg bg-logistics-light-blue/10">
                  <h3 className="font-medium flex items-center gap-2">
                    <Info className="h-4 w-4 text-logistics-blue" />
                    Need Custom Templates?
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Our team can create custom document templates specific to your business needs and destination countries.
                  </p>
                  <Button className="mt-3 bg-logistics-blue hover:bg-logistics-blue/90 text-white">
                    Request Custom Templates
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default DocumentationRequirements;
