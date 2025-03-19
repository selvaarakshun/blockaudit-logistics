
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, FileText, Clock, Upload, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";

const IcegatePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 md:pt-32">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">ICEGATE Portal</h1>
            <p className="text-lg text-logistics-gray">
              Indian Customs Electronic Data Interchange Gateway Integration
            </p>
          </div>

          <Card className="max-w-4xl mx-auto mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="size-5 text-logistics-blue" />
                ICEGATE Connection Status
              </CardTitle>
              <CardDescription>
                Connect your ICEGATE credentials to enable seamless document submission
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-logistics-light-gray dark:bg-logistics-dark/50 p-6 rounded-lg text-center">
                <p className="text-logistics-gray mb-4">Not connected to ICEGATE</p>
                <Button className="btn-primary gap-2">
                  <Globe className="size-4" />
                  Connect ICEGATE Account
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="documents" className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="documents">Document Filing</TabsTrigger>
              <TabsTrigger value="status">Clearance Status</TabsTrigger>
              <TabsTrigger value="payments">Duty Payments</TabsTrigger>
            </TabsList>
            
            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="size-5 text-logistics-blue" />
                    Electronic Document Filing
                  </CardTitle>
                  <CardDescription>
                    Submit customs documents electronically through ICEGATE
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="border border-border">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Bill of Entry</CardTitle>
                          <CardDescription>For import consignments</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-logistics-gray mb-4">
                            File your import documents electronically for customs clearance
                          </p>
                          <Button className="w-full flex items-center justify-center gap-2">
                            <Upload className="size-4" />
                            Create New
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card className="border border-border">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Shipping Bill</CardTitle>
                          <CardDescription>For export consignments</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-logistics-gray mb-4">
                            Submit export documentation for customs approval
                          </p>
                          <Button className="w-full flex items-center justify-center gap-2">
                            <Upload className="size-4" />
                            Create New
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="border border-border rounded-lg p-4 mt-4">
                      <h3 className="font-medium mb-4">Recent Submissions</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-border">
                          <thead>
                            <tr>
                              <th className="px-4 py-2 text-left text-sm font-medium text-logistics-gray">Document Type</th>
                              <th className="px-4 py-2 text-left text-sm font-medium text-logistics-gray">Reference No.</th>
                              <th className="px-4 py-2 text-left text-sm font-medium text-logistics-gray">Submission Date</th>
                              <th className="px-4 py-2 text-left text-sm font-medium text-logistics-gray">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            <tr>
                              <td className="px-4 py-3 text-sm">Bill of Entry</td>
                              <td className="px-4 py-3 text-sm">BE123456789</td>
                              <td className="px-4 py-3 text-sm">2023-09-15</td>
                              <td className="px-4 py-3">
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Approved
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 text-sm">Shipping Bill</td>
                              <td className="px-4 py-3 text-sm">SB987654321</td>
                              <td className="px-4 py-3 text-sm">2023-08-28</td>
                              <td className="px-4 py-3">
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                  In Review
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="status" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="size-5 text-logistics-blue" />
                    Clearance Status Tracking
                  </CardTitle>
                  <CardDescription>
                    Monitor the status of your shipments in real-time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 mb-6">
                    <div className="flex-grow">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-logistics-gray" />
                        <input 
                          type="text" 
                          placeholder="Enter document number or shipment ID"
                          className="w-full pl-10 pr-4 py-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-logistics-blue"
                        />
                      </div>
                    </div>
                    <Button className="btn-primary">
                      Track Status
                    </Button>
                  </div>
                  
                  <div className="border border-border rounded-lg p-6">
                    <h3 className="font-medium mb-4 text-center">Status Timeline</h3>
                    
                    <div className="relative pb-12">
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-logistics-light-gray dark:bg-white/10 ml-6"></div>
                      {[
                        { 
                          title: "Document Filed", 
                          desc: "Bill of Entry BE123456789 submitted", 
                          date: "2023-09-15 09:23", 
                          status: "complete" 
                        },
                        { 
                          title: "Initial Assessment", 
                          desc: "Document verified by system", 
                          date: "2023-09-15 10:45", 
                          status: "complete" 
                        },
                        { 
                          title: "Duty Payment", 
                          desc: "Customs duty paid via e-payment", 
                          date: "2023-09-15 14:30", 
                          status: "complete" 
                        },
                        { 
                          title: "Officer Assessment", 
                          desc: "Under review by customs officer", 
                          date: "2023-09-16 11:20", 
                          status: "current" 
                        },
                        { 
                          title: "Goods Clearance", 
                          desc: "Final approval for release", 
                          date: "", 
                          status: "pending" 
                        }
                      ].map((step, index) => (
                        <div key={index} className="relative pl-16 pb-8">
                          <div className={`absolute left-0 size-12 rounded-full flex items-center justify-center ${
                            step.status === 'complete' 
                              ? 'bg-logistics-success/20 border-2 border-logistics-success' 
                              : step.status === 'current'
                                ? 'bg-logistics-blue/20 border-2 border-logistics-blue animate-pulse'
                                : 'bg-white dark:bg-logistics-dark border-2 border-logistics-gray'
                          }`}>
                            <div className={`size-4 rounded-full ${
                              step.status === 'complete' 
                                ? 'bg-logistics-success' 
                                : step.status === 'current'
                                  ? 'bg-logistics-blue'
                                  : 'bg-logistics-gray'
                            }`}></div>
                          </div>
                          <div>
                            <h4 className="font-medium">{step.title}</h4>
                            <p className="text-sm text-logistics-gray">{step.desc}</p>
                            {step.date && (
                              <p className="text-xs text-logistics-gray mt-1">{step.date}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="payments" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="size-5 text-logistics-blue" />
                    Duty & Tax Payments
                  </CardTitle>
                  <CardDescription>
                    Pay customs duties and taxes electronically through the ICEGATE system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="border border-border rounded-lg p-4">
                      <h3 className="font-medium mb-2">Pending Payments</h3>
                      <div className="space-y-4">
                        <div className="bg-logistics-light-gray dark:bg-logistics-dark/50 p-3 rounded-md">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">Bill of Entry #BE987654</span>
                            <span className="text-logistics-blue">₹24,580</span>
                          </div>
                          <p className="text-xs text-logistics-gray mb-2">Due date: 23 Sep 2023</p>
                          <Button size="sm" className="w-full">Pay Now</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-border rounded-lg p-4">
                      <h3 className="font-medium mb-2">Payment Methods</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 p-2 border border-border rounded-md">
                          <input type="radio" name="payment" id="netbanking" className="size-4" />
                          <label htmlFor="netbanking" className="flex-grow">Net Banking</label>
                        </div>
                        <div className="flex items-center gap-3 p-2 border border-border rounded-md">
                          <input type="radio" name="payment" id="upi" className="size-4" />
                          <label htmlFor="upi" className="flex-grow">UPI</label>
                        </div>
                        <div className="flex items-center gap-3 p-2 border border-border rounded-md">
                          <input type="radio" name="payment" id="card" className="size-4" />
                          <label htmlFor="card" className="flex-grow">Debit/Credit Card</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-border rounded-lg p-4">
                    <h3 className="font-medium mb-4">Payment History</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-border">
                        <thead>
                          <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-logistics-gray">Document Ref.</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-logistics-gray">Payment Date</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-logistics-gray">Amount</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-logistics-gray">TR6 Challan</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          <tr>
                            <td className="px-4 py-3 text-sm">BE123456789</td>
                            <td className="px-4 py-3 text-sm">2023-09-15</td>
                            <td className="px-4 py-3 text-sm">₹32,450</td>
                            <td className="px-4 py-3 text-sm">
                              <Button variant="outline" size="sm" className="text-xs">
                                Download
                              </Button>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm">BE987612345</td>
                            <td className="px-4 py-3 text-sm">2023-08-28</td>
                            <td className="px-4 py-3 text-sm">₹18,720</td>
                            <td className="px-4 py-3 text-sm">
                              <Button variant="outline" size="sm" className="text-xs">
                                Download
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
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

export default IcegatePage;
