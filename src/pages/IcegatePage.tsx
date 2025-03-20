
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { 
  FileCheck, AlertTriangle, ArrowRight, 
  CheckCircle, Clock, Upload, Download, 
  Search, Truck, FileText, CheckSquare, 
  Loader2, Info
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlockchainVerification from '@/components/blockchain/verification';
import { Link } from 'react-router-dom';

const IcegatePage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [declarationStatus, setDeclarationStatus] = useState<'pending' | 'submitted' | 'approved' | 'rejected' | null>(null);
  
  const handleDeclarationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setDeclarationStatus('submitted');
      
      toast({
        title: "Declaration Submitted",
        description: "Your customs declaration has been submitted successfully and is pending approval."
      });
    }, 2000);
  };
  
  const handleBENumberSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "BE Number Found",
      description: "Bill of Entry details retrieved successfully."
    });
  };
  
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="flex items-center gap-1 text-xs px-2 py-0.5 bg-logistics-success/10 text-logistics-success rounded-full">
            <CheckCircle className="h-3 w-3" />
            Completed
          </span>
        );
      case 'in progress':
        return (
          <span className="flex items-center gap-1 text-xs px-2 py-0.5 bg-logistics-warning/10 text-logistics-warning rounded-full">
            <Clock className="h-3 w-3" />
            In Progress
          </span>
        );
      case 'pending':
        return (
          <span className="flex items-center gap-1 text-xs px-2 py-0.5 bg-logistics-blue/10 text-logistics-blue rounded-full">
            <Clock className="h-3 w-3" />
            Pending
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container pt-20 pb-10 space-y-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">ICEGATE Portal</h1>
            <img 
              src="https://www.icegate.gov.in/images/logo.jpg" 
              alt="ICEGATE" 
              className="h-10 object-contain" 
            />
          </div>
          <p className="text-muted-foreground mb-4">
            Indian Customs Electronic Commerce/Electronic Data Interchange Gateway
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="declaration">Declaration</TabsTrigger>
            <TabsTrigger value="tracking">Tracking</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-6 mt-6">
            <Alert className="border-logistics-blue/20 bg-logistics-blue/5">
              <Info className="h-4 w-4" />
              <AlertTitle>Welcome to the ICEGATE Integration</AlertTitle>
              <AlertDescription>
                Manage your customs declarations, track shipments, and submit trade documents through the integrated ICEGATE portal.
              </AlertDescription>
            </Alert>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Declarations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">12</div>
                    <div className="text-right">
                      <span className="text-sm text-logistics-success">+3 this month</span>
                    </div>
                  </div>
                  <div className="flex justify-between mt-4 text-sm">
                    <span className="text-logistics-gray">Pending: 2</span>
                    <span className="text-logistics-gray">Approved: 10</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Bill of Entry</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">8</div>
                    <div className="text-right">
                      <span className="text-sm text-logistics-success">+2 this month</span>
                    </div>
                  </div>
                  <div className="flex justify-between mt-4 text-sm">
                    <span className="text-logistics-gray">Pending Duty: $1,240</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Shipping Bills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">15</div>
                    <div className="text-right">
                      <span className="text-sm text-logistics-success">+5 this month</span>
                    </div>
                  </div>
                  <div className="flex justify-between mt-4 text-sm">
                    <span className="text-logistics-gray">Processed: 13</span>
                    <span className="text-logistics-gray">Pending: 2</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { id: 'BE123456', desc: 'Bill of Entry filed', date: '2023-05-14', status: 'completed' },
                      { id: 'SB789012', desc: 'Shipping Bill processed', date: '2023-05-12', status: 'completed' },
                      { id: 'BE123457', desc: 'Duty payment initiated', date: '2023-05-10', status: 'in progress' },
                      { id: 'SB789013', desc: 'Document verification', date: '2023-05-08', status: 'pending' }
                    ].map((activity, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{activity.id}</h4>
                            {renderStatusBadge(activity.status)}
                          </div>
                          <p className="text-sm text-logistics-gray mt-1">{activity.desc}</p>
                          <p className="text-xs text-logistics-gray">{activity.date}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          View <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" onClick={() => setActiveTab('declaration')}>
                      <FileText className="mr-2 h-4 w-4" />
                      File New Declaration
                    </Button>
                    <Button className="w-full justify-start" variant="outline" onClick={() => setActiveTab('tracking')}>
                      <Search className="mr-2 h-4 w-4" />
                      Track BE/SB Status
                    </Button>
                    <Button className="w-full justify-start" variant="outline" onClick={() => setActiveTab('documents')}>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Documents
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download Challan
                    </Button>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Need Assistance?</h4>
                      <p className="text-xs text-logistics-gray">
                        Contact ICEGATE helpdesk for any technical issues or queries related to customs procedures.
                      </p>
                      <Button className="w-full mt-2 text-xs h-8">
                        Contact Support
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="declaration" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>New Customs Declaration</CardTitle>
                <CardDescription>
                  Submit a new customs declaration for your import/export shipment
                </CardDescription>
              </CardHeader>
              <CardContent>
                {declarationStatus === 'submitted' ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="size-16 rounded-full bg-logistics-success/10 flex items-center justify-center mb-4">
                      <CheckCircle className="h-8 w-8 text-logistics-success" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Declaration Submitted</h3>
                    <p className="text-center text-logistics-gray mb-6 max-w-md">
                      Your customs declaration has been successfully submitted and is now pending approval.
                      You will receive notifications when the status changes.
                    </p>
                    <div className="space-y-4 w-full max-w-sm">
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-logistics-gray">Declaration ID</span>
                          <span className="font-medium">DEC-123456789</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm text-logistics-gray">Submission Date</span>
                          <span>{new Date().toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm text-logistics-gray">Status</span>
                          <span className="text-logistics-blue">Pending Approval</span>
                        </div>
                      </div>
                      
                      <BlockchainVerification 
                        status="verified"
                        timestamp={new Date().toISOString()}
                        txHash={`0x${Math.random().toString(16).substring(2, 34)}`}
                      />
                      
                      <div className="flex gap-4">
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => setDeclarationStatus(null)}
                        >
                          New Declaration
                        </Button>
                        <Button className="w-full">
                          Track Status
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleDeclarationSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Declaration Type</label>
                        <Select defaultValue="import">
                          <SelectTrigger>
                            <SelectValue placeholder="Select declaration type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="import">Import (Bill of Entry)</SelectItem>
                            <SelectItem value="export">Export (Shipping Bill)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Port of Entry/Exit</label>
                        <Select defaultValue="mumbai">
                          <SelectTrigger>
                            <SelectValue placeholder="Select port" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mumbai">Mumbai Sea</SelectItem>
                            <SelectItem value="delhi">Delhi Air</SelectItem>
                            <SelectItem value="chennai">Chennai Sea</SelectItem>
                            <SelectItem value="bangalore">Bangalore Air</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Importer/Exporter Code (IEC)</label>
                        <Input placeholder="Enter 10-digit IEC" defaultValue="1234567890" />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">GSTIN</label>
                        <Input placeholder="Enter GSTIN" defaultValue="07AABCU9603R1ZP" />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Invoice Number</label>
                        <Input placeholder="Enter invoice number" defaultValue="INV-2023-05-123" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Invoice Value</label>
                        <Input type="number" placeholder="Enter value" defaultValue="5000" />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Currency</label>
                        <Select defaultValue="usd">
                          <SelectTrigger>
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="usd">USD</SelectItem>
                            <SelectItem value="eur">EUR</SelectItem>
                            <SelectItem value="gbp">GBP</SelectItem>
                            <SelectItem value="inr">INR</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description of Goods</label>
                      <Textarea 
                        placeholder="Enter detailed description of goods"
                        defaultValue="Electronic components for manufacturing - Capacitors, Resistors, and Integrated Circuits"
                        rows={3}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">HS Code</label>
                      <Input placeholder="Enter HS Code" defaultValue="8542.31.00" />
                      <p className="text-xs text-logistics-gray mt-1">
                        Harmonized System Code for classifying goods
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox id="declaration" defaultChecked />
                      <label htmlFor="declaration" className="text-sm">
                        I declare that the information provided is true and correct
                      </label>
                    </div>
                    
                    <div className="flex justify-end gap-3">
                      <Button type="button" variant="outline">
                        Save as Draft
                      </Button>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            Submit Declaration
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tracking" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Track BE/SB Status</CardTitle>
                <CardDescription>
                  Check the status of your Bill of Entry or Shipping Bill
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBENumberSearch} className="space-y-4">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Enter BE/SB Number" 
                      className="flex-1"
                      defaultValue="BE1234567"
                    />
                    <Button type="submit">
                      <Search className="mr-2 h-4 w-4" />
                      Track
                    </Button>
                  </div>
                </form>
                
                <div className="mt-6 border rounded-lg p-4">
                  <h3 className="font-medium mb-4">BE1234567 Details</h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs text-logistics-gray block">Status</span>
                        <span className="text-sm font-medium text-logistics-success flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Assessment Complete
                        </span>
                      </div>
                      <div>
                        <span className="text-xs text-logistics-gray block">Date of Filing</span>
                        <span className="text-sm">May 10, 2023</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs text-logistics-gray block">Port</span>
                        <span className="text-sm">Mumbai Sea</span>
                      </div>
                      <div>
                        <span className="text-xs text-logistics-gray block">Importer</span>
                        <span className="text-sm">Tech Imports Pvt Ltd</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs text-logistics-gray block">Duty Amount</span>
                        <span className="text-sm font-medium">₹ 28,450</span>
                      </div>
                      <div>
                        <span className="text-xs text-logistics-gray block">Payment Status</span>
                        <span className="text-sm text-logistics-success">Paid</span>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Shipment Status Timeline</h4>
                    
                    <div className="space-y-3">
                      {[
                        { status: 'BE Filed', date: 'May 10, 2023 09:15 AM', completed: true },
                        { status: 'Assessment Complete', date: 'May 11, 2023 02:30 PM', completed: true },
                        { status: 'Duty Payment', date: 'May 12, 2023 11:45 AM', completed: true },
                        { status: 'Goods Registration', date: 'May 13, 2023 03:00 PM', completed: true },
                        { status: 'Examination Ordered', date: 'May 14, 2023 10:30 AM', completed: false },
                        { status: 'Out of Charge', date: 'Pending', completed: false }
                      ].map((step, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className={`size-5 rounded-full flex items-center justify-center mt-0.5 ${
                            step.completed 
                              ? 'bg-logistics-success text-white' 
                              : 'bg-logistics-gray/20 text-logistics-gray'
                          }`}>
                            {step.completed ? (
                              <CheckSquare className="h-3 w-3" />
                            ) : (
                              <Clock className="h-3 w-3" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <span className={`text-sm font-medium ${step.completed ? '' : 'text-logistics-gray'}`}>
                                {step.status}
                              </span>
                              <span className="text-xs text-logistics-gray">
                                {step.date}
                              </span>
                            </div>
                            {index < 5 && (
                              <div className={`w-px h-3 ml-2 mt-1 ${
                                step.completed ? 'bg-logistics-success' : 'bg-logistics-gray/20'
                              }`}></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-6 gap-2">
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download Receipt
                    </Button>
                    <Button>
                      <Truck className="mr-2 h-4 w-4" />
                      Track Shipment
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Document Repository</CardTitle>
                <CardDescription>
                  Upload and manage your customs and shipping documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center mb-6">
                  <Upload className="h-10 w-10 text-logistics-gray mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Drop files here or click to upload</h3>
                  <p className="text-sm text-logistics-gray mb-4">
                    Support for PDF, JPEG, PNG, and DOCX files up to 10MB each
                  </p>
                  <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Select Files
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Recent Documents</h4>
                  
                  <div className="space-y-3">
                    {[
                      { name: 'Bill of Entry - BE1234567.pdf', date: 'May 14, 2023', size: '2.4 MB', status: 'verified' },
                      { name: 'Invoice - INV-2023-05-123.pdf', date: 'May 12, 2023', size: '1.1 MB', status: 'verified' },
                      { name: 'Packing List - PL-2023-05-123.pdf', date: 'May 12, 2023', size: '980 KB', status: 'pending' }
                    ].map((doc, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                        <div className="flex items-start gap-3">
                          <FileText className="h-5 w-5 text-logistics-blue mt-1" />
                          <div>
                            <h5 className="font-medium">{doc.name}</h5>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-xs text-logistics-gray">{doc.date}</span>
                              <span className="text-xs text-logistics-gray">{doc.size}</span>
                              {doc.status === 'verified' ? (
                                <span className="flex items-center gap-1 text-xs text-logistics-success">
                                  <CheckCircle className="h-3 w-3" />
                                  Verified
                                </span>
                              ) : (
                                <span className="flex items-center gap-1 text-xs text-logistics-warning">
                                  <Clock className="h-3 w-3" />
                                  Pending
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <FileCheck className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium mb-3">Required Documents</h4>
                    
                    <Alert className="border-logistics-warning/20 bg-logistics-warning/10">
                      <AlertTriangle className="h-4 w-4 text-logistics-warning" />
                      <AlertTitle>Missing Required Documents</AlertTitle>
                      <AlertDescription>
                        The following documents are still required for your shipment:
                        <ul className="list-disc list-inside mt-2 text-sm">
                          <li>Certificate of Origin</li>
                          <li>Insurance Certificate</li>
                        </ul>
                      </AlertDescription>
                    </Alert>
                  </div>
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

export default IcegatePage;
