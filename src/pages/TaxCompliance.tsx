
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Globe, Calculator, Shield } from 'lucide-react';

const TaxCompliance = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 md:pt-32">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Customs & Tax Compliance</h1>
            <p className="text-lg text-logistics-gray">
              Streamline your customs clearance process with built-in compliance tools and documentation management
            </p>
          </div>

          <Tabs defaultValue="overview" className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="duties">Duties & Taxes</TabsTrigger>
              <TabsTrigger value="documentation">Documentation</TabsTrigger>
              <TabsTrigger value="icegate">ICEGATE</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="size-5 text-logistics-blue" />
                    Comprehensive Compliance Solutions
                  </CardTitle>
                  <CardDescription>
                    Our platform provides end-to-end compliance management for international logistics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    GuudzChain integrates all necessary compliance tools to streamline customs clearance, tax calculations, and documentation management. Our blockchain technology ensures every step is verified, auditable, and secure.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-logistics-light-gray dark:bg-logistics-dark/50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Automated Duty Calculation</h3>
                      <p className="text-sm text-logistics-gray">Accurately calculate duties and taxes based on HS codes and trade agreements</p>
                    </div>
                    <div className="bg-logistics-light-gray dark:bg-logistics-dark/50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Real-time Regulatory Updates</h3>
                      <p className="text-sm text-logistics-gray">Stay current with changing trade regulations and tariff schedules</p>
                    </div>
                    <div className="bg-logistics-light-gray dark:bg-logistics-dark/50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Digital Documentation</h3>
                      <p className="text-sm text-logistics-gray">Generate and manage all required customs documents on the platform</p>
                    </div>
                    <div className="bg-logistics-light-gray dark:bg-logistics-dark/50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">ICEGATE Integration</h3>
                      <p className="text-sm text-logistics-gray">Seamless connection with Indian Customs EDI Gateway for electronic filing</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="duties" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="size-5 text-logistics-blue" />
                    Duties & Taxes Calculator
                  </CardTitle>
                  <CardDescription>
                    Accurately calculate customs duties, GST, and other applicable taxes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Our intelligent duty calculator helps you estimate all applicable charges based on product classification, country of origin, and destination.
                  </p>
                  
                  <div className="border border-border rounded-lg p-4 mb-6">
                    <h3 className="font-medium mb-2">HS Code Lookup</h3>
                    <p className="text-sm text-logistics-gray mb-4">
                      Find the correct Harmonized System (HS) code for your products to ensure accurate duty calculation.
                    </p>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Search by product description" 
                        className="flex-grow px-3 py-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-logistics-blue"
                      />
                      <button className="btn-primary">Search</button>
                    </div>
                  </div>
                  
                  <div className="border border-border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Duty Calculator</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Country of Origin</label>
                        <select className="w-full px-3 py-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-logistics-blue">
                          <option>Select country</option>
                          <option>China</option>
                          <option>United States</option>
                          <option>Germany</option>
                          <option>Japan</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Destination Country</label>
                        <select className="w-full px-3 py-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-logistics-blue">
                          <option>Select country</option>
                          <option>India</option>
                          <option>United States</option>
                          <option>European Union</option>
                          <option>United Kingdom</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">HS Code</label>
                        <input
                          type="text"
                          placeholder="e.g., 8517.12.00"
                          className="w-full px-3 py-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-logistics-blue"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Product Value (USD)</label>
                        <input
                          type="number"
                          placeholder="Enter value"
                          className="w-full px-3 py-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-logistics-blue"
                        />
                      </div>
                    </div>
                    <button className="btn-primary w-full">Calculate Duties</button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="documentation" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="size-5 text-logistics-blue" />
                    Required Documentation
                  </CardTitle>
                  <CardDescription>
                    Generate and manage all required customs documentation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border border-border rounded-lg p-4">
                      <h3 className="font-medium mb-2">Commercial Documents</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <div className="size-5 rounded-full bg-logistics-light-blue flex items-center justify-center">
                            <div className="size-2 rounded-full bg-logistics-blue"></div>
                          </div>
                          <span>Commercial Invoice</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="size-5 rounded-full bg-logistics-light-blue flex items-center justify-center">
                            <div className="size-2 rounded-full bg-logistics-blue"></div>
                          </div>
                          <span>Packing List</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="size-5 rounded-full bg-logistics-light-blue flex items-center justify-center">
                            <div className="size-2 rounded-full bg-logistics-blue"></div>
                          </div>
                          <span>Bill of Lading / Airway Bill</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="size-5 rounded-full bg-logistics-light-blue flex items-center justify-center">
                            <div className="size-2 rounded-full bg-logistics-blue"></div>
                          </div>
                          <span>Shipping Bill / Bill of Export</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="border border-border rounded-lg p-4">
                      <h3 className="font-medium mb-2">Regulatory Documents</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <div className="size-5 rounded-full bg-logistics-light-blue flex items-center justify-center">
                            <div className="size-2 rounded-full bg-logistics-blue"></div>
                          </div>
                          <span>Certificate of Origin</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="size-5 rounded-full bg-logistics-light-blue flex items-center justify-center">
                            <div className="size-2 rounded-full bg-logistics-blue"></div>
                          </div>
                          <span>Import License</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="size-5 rounded-full bg-logistics-light-blue flex items-center justify-center">
                            <div className="size-2 rounded-full bg-logistics-blue"></div>
                          </div>
                          <span>Phytosanitary Certificate</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="size-5 rounded-full bg-logistics-light-blue flex items-center justify-center">
                            <div className="size-2 rounded-full bg-logistics-blue"></div>
                          </div>
                          <span>Dangerous Goods Declaration</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="border border-border rounded-lg p-4">
                      <h3 className="font-medium mb-2">Tax & Duty Documents</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <div className="size-5 rounded-full bg-logistics-light-blue flex items-center justify-center">
                            <div className="size-2 rounded-full bg-logistics-blue"></div>
                          </div>
                          <span>Bill of Entry</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="size-5 rounded-full bg-logistics-light-blue flex items-center justify-center">
                            <div className="size-2 rounded-full bg-logistics-blue"></div>
                          </div>
                          <span>Duty Payment Receipt</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="size-5 rounded-full bg-logistics-light-blue flex items-center justify-center">
                            <div className="size-2 rounded-full bg-logistics-blue"></div>
                          </div>
                          <span>GST Declaration Form</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="icegate" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="size-5 text-logistics-blue" />
                    ICEGATE Integration
                  </CardTitle>
                  <CardDescription>
                    Seamless integration with Indian Customs Electronic Data Interchange
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <p>
                      GuudzChain offers seamless integration with ICEGATE (Indian Customs EDI Gateway), allowing you to:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-logistics-light-gray dark:bg-logistics-dark/50 p-4 rounded-lg">
                        <h3 className="font-medium mb-2">Electronic Filing</h3>
                        <p className="text-sm text-logistics-gray">Submit Bills of Entry and Shipping Bills electronically</p>
                      </div>
                      <div className="bg-logistics-light-gray dark:bg-logistics-dark/50 p-4 rounded-lg">
                        <h3 className="font-medium mb-2">e-Payment</h3>
                        <p className="text-sm text-logistics-gray">Pay customs duties and taxes online through secure gateways</p>
                      </div>
                      <div className="bg-logistics-light-gray dark:bg-logistics-dark/50 p-4 rounded-lg">
                        <h3 className="font-medium mb-2">Automated Status Updates</h3>
                        <p className="text-sm text-logistics-gray">Receive real-time updates on document processing and clearance</p>
                      </div>
                      <div className="bg-logistics-light-gray dark:bg-logistics-dark/50 p-4 rounded-lg">
                        <h3 className="font-medium mb-2">Documentation Repository</h3>
                        <p className="text-sm text-logistics-gray">Store and retrieve all filed documents securely on the blockchain</p>
                      </div>
                    </div>
                    
                    <div className="border border-border rounded-lg p-6 mt-6">
                      <h3 className="font-medium mb-4 text-center">ICEGATE Portal Connection</h3>
                      <div className="flex items-center justify-center gap-8 mb-6">
                        <div className="flex flex-col items-center">
                          <div className="size-16 rounded-full bg-logistics-light-blue dark:bg-logistics-blue/10 flex items-center justify-center mb-2">
                            <div className="text-logistics-blue font-semibold">GC</div>
                          </div>
                          <span className="text-sm">GuudzChain</span>
                        </div>
                        <div className="flex-grow max-w-24 h-0.5 bg-gradient-to-r from-logistics-blue to-logistics-indigo"></div>
                        <div className="flex flex-col items-center">
                          <div className="size-16 rounded-full border-2 border-logistics-blue flex items-center justify-center mb-2">
                            <div className="text-logistics-blue font-semibold">IC</div>
                          </div>
                          <span className="text-sm">ICEGATE</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <button className="btn-primary mb-2">Connect ICEGATE Account</button>
                        <p className="text-xs text-logistics-gray">Connect your ICEGATE login to enable automatic document submission</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TaxCompliance;
