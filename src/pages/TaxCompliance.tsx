
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DutiesCalculator from '@/components/tax/DutiesCalculator';
import ComplianceCheck from '@/components/standards/ComplianceCheck';
import { INCOTERMS } from '@/utils/internationalStandards';
import { Info, AlertTriangle, ChevronRight, ExternalLink, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const TaxCompliance = () => {
  const [activeTab, setActiveTab] = useState('duties');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container pt-20 pb-10 space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Tax & Compliance</h1>
          <p className="text-muted-foreground mb-6">
            Manage customs duties, tax compliance, and international trade standards
          </p>
        </div>
        
        <Alert className="border-logistics-warning/20 bg-logistics-warning/10">
          <AlertTriangle className="h-4 w-4 text-logistics-warning" />
          <AlertTitle>Customs Declaration Required</AlertTitle>
          <AlertDescription>
            Your recent shipment to Australia requires customs declaration. 
            <Link to="/tax-compliance/icegate" className="ml-2 text-logistics-blue hover:underline inline-flex items-center">
              Complete now <ChevronRight className="h-4 w-4" />
            </Link>
          </AlertDescription>
        </Alert>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="duties">Duties & Taxes</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="duties" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <DutiesCalculator />
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Recent Shipments</CardTitle>
                    <CardDescription>
                      Duties and taxes for your recent international shipments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { id: 'SHP-12345', desc: 'Electronics to Germany', date: '2023-05-14', amount: 245.60, status: 'paid' },
                        { id: 'SHP-12346', desc: 'Clothing to UK', date: '2023-05-12', amount: 120.75, status: 'pending' },
                        { id: 'SHP-12347', desc: 'Automotive parts to Japan', date: '2023-05-10', amount: 498.32, status: 'paid' }
                      ].map((shipment, index) => (
                        <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{shipment.id}</h4>
                            <p className="text-sm text-logistics-gray">{shipment.desc}</p>
                            <p className="text-xs text-logistics-gray">{shipment.date}</p>
                          </div>
                          <div className="text-right">
                            <span className="font-medium">${shipment.amount.toFixed(2)}</span>
                            <span className={`text-xs block ${shipment.status === 'paid' ? 'text-logistics-success' : 'text-logistics-warning'} capitalize`}>
                              {shipment.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Incoterms Reference</CardTitle>
                    <CardDescription>
                      International commercial terms defining responsibilities
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-xs text-logistics-gray">
                      <span className="font-medium text-sm text-foreground">What are Incoterms?</span>
                      <p className="mt-1">
                        Incoterms are a set of rules which define the responsibilities of sellers and buyers for the delivery of goods under sales contracts.
                      </p>
                    </div>
                    
                    <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                      {INCOTERMS.map((term, index) => (
                        <div key={index} className="border rounded-md p-2">
                          <span className="font-bold text-sm">{term.code}</span> - {term.name}
                          <div className="text-xs text-logistics-gray mt-1">
                            Risk transfer: {term.risk_transfer}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Button variant="outline" className="w-full text-xs">
                      <Info className="mr-2 h-3 w-3" />
                      View Full Incoterms Guide
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Upcoming Tax Deadlines</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { name: 'Quarterly VAT Return', date: '2023-06-15', days: 30 },
                        { name: 'Import Duty Payment', date: '2023-05-28', days: 12 },
                        { name: 'Annual Customs Report', date: '2023-07-31', days: 76 }
                      ].map((deadline, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-logistics-blue" />
                            <span className="text-sm">{deadline.name}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs block text-logistics-gray">{deadline.date}</span>
                            <span className="text-xs block font-medium">In {deadline.days} days</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="compliance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ComplianceCheck />
              
              <Card>
                <CardHeader>
                  <CardTitle>Your Compliance Status</CardTitle>
                  <CardDescription>
                    Overview of your current compliance with international standards
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'ISO 28000', status: 'Compliant', expires: '2024-05-15' },
                      { name: 'WCO SAFE Framework', status: 'Compliant', expires: 'N/A' },
                      { name: 'AEO Certification', status: 'Pending Review', expires: 'N/A' },
                      { name: 'ISPM 15', status: 'Non-Compliant', expires: 'Expired' }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="font-medium">{item.name}</span>
                        <div className="text-right">
                          <span className={`text-sm ${
                            item.status === 'Compliant' ? 'text-logistics-success' : 
                            item.status === 'Non-Compliant' ? 'text-logistics-error' : 'text-logistics-warning'
                          }`}>
                            {item.status}
                          </span>
                          {item.expires !== 'N/A' && (
                            <span className="text-xs block text-logistics-gray">
                              {item.status === 'Non-Compliant' ? 'Expired' : `Expires: ${item.expires}`}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full mt-6">
                    Request Compliance Review
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Required Documents</CardTitle>
                <CardDescription>
                  Documents needed for international trade compliance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: 'Certificate of Origin', required: true, status: 'Submitted' },
                    { name: 'Commercial Invoice', required: true, status: 'Submitted' },
                    { name: 'Packing List', required: true, status: 'Submitted' },
                    { name: 'Bill of Lading', required: true, status: 'Pending' },
                    { name: 'Customs Declaration', required: true, status: 'Not Started' },
                    { name: 'Insurance Certificate', required: false, status: 'Optional' }
                  ].map((doc, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <h4 className="font-medium">{doc.name}</h4>
                      <div className="flex justify-between mt-2">
                        <span className="text-xs text-logistics-gray">
                          {doc.required ? 'Required' : 'Optional'}
                        </span>
                        <span className={`text-xs ${
                          doc.status === 'Submitted' ? 'text-logistics-success' : 
                          doc.status === 'Pending' ? 'text-logistics-warning' :
                          doc.status === 'Optional' ? 'text-logistics-gray' : 'text-logistics-error'
                        }`}>
                          {doc.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Helpdesk & Support</CardTitle>
                  <CardDescription>
                    Get assistance with customs and tax compliance issues
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 border-b pb-3">
                    <div className="w-10 h-10 rounded-full bg-logistics-light-blue flex items-center justify-center">
                      <span className="text-logistics-blue font-medium">SA</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Sarah Adams</h4>
                      <p className="text-xs text-logistics-gray">Tax Compliance Specialist</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button className="w-full">Schedule Consultation</Button>
                    <Button variant="outline" className="w-full">Send Message</Button>
                  </div>
                  
                  <div className="text-xs text-logistics-gray pt-2">
                    <p className="font-medium text-sm text-foreground">Support Hours</p>
                    <p className="mt-1">Monday to Friday: 9:00 AM - 5:00 PM (EST)</p>
                    <p>Response time: 1-2 business days</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Resources & Guides</CardTitle>
                  <CardDescription>
                    Useful information for international trade compliance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: 'Customs Declaration Guide', type: 'PDF', size: '2.4 MB' },
                      { name: 'HS Code Classification Manual', type: 'PDF', size: '3.7 MB' },
                      { name: 'Import Duties Calculator Guide', type: 'PDF', size: '1.2 MB' },
                      { name: 'ICEGATE Registration Process', type: 'VIDEO', size: '15:24' }
                    ].map((resource, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <h4 className="text-sm font-medium">{resource.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs px-2 py-0.5 bg-logistics-light-gray dark:bg-logistics-dark rounded">
                              {resource.type}
                            </span>
                            <span className="text-xs text-logistics-gray">{resource.size}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Official Government Resources</CardTitle>
                <CardDescription>
                  Links to official customs and tax authorities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: 'U.S. Customs and Border Protection', url: 'https://www.cbp.gov/' },
                    { name: 'European Union Customs', url: 'https://ec.europa.eu/taxation_customs/' },
                    { name: 'China Customs', url: 'https://english.customs.gov.cn/' },
                    { name: 'UK HMRC', url: 'https://www.gov.uk/government/organisations/hm-revenue-customs' },
                    { name: 'Australian Border Force', url: 'https://www.abf.gov.au/' },
                    { name: 'Indian Customs (CBIC)', url: 'https://www.cbic.gov.in/' }
                  ].map((agency, index) => (
                    <a 
                      key={index} 
                      href={agency.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="border rounded-lg p-3 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">{agency.name}</h4>
                        <ExternalLink className="h-4 w-4 text-logistics-blue" />
                      </div>
                    </a>
                  ))}
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

export default TaxCompliance;
