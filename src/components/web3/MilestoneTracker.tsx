
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, CircleDollarSign, Truck, Package, Warehouse, ShieldCheck, FileText } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Mock milestone data
const milestones = [
  {
    id: 1,
    title: 'Order Placed',
    description: 'Payment for order placed in escrow',
    date: '2023-04-01',
    amount: '1,000.00',
    token: 'USDC',
    status: 'complete',
    paymentReleased: true,
  },
  {
    id: 2,
    title: 'Goods Manufactured',
    description: 'Products manufactured and ready for shipping',
    date: '2023-04-05',
    amount: '2,000.00',
    token: 'USDC',
    status: 'complete',
    paymentReleased: true,
  },
  {
    id: 3,
    title: 'Shipment in Transit',
    description: 'Goods on the way to destination',
    date: '2023-04-10',
    amount: '1,500.00',
    token: 'USDC',
    status: 'active',
    paymentReleased: false,
  },
  {
    id: 4,
    title: 'Customs Clearance',
    description: 'Shipment cleared customs',
    date: '',
    amount: '500.00',
    token: 'USDC',
    status: 'pending',
    paymentReleased: false,
  },
  {
    id: 5,
    title: 'Delivery Complete',
    description: 'Shipment delivered to destination',
    date: '',
    amount: '1,000.00',
    token: 'USDC',
    status: 'pending',
    paymentReleased: false,
  },
];

const MilestoneTracker = () => {
  const totalMilestones = milestones.length;
  const completedMilestones = milestones.filter(m => m.status === 'complete').length;
  const progressPercentage = (completedMilestones / totalMilestones) * 100;
  
  const totalAmount = milestones.reduce((sum, milestone) => {
    return sum + parseFloat(milestone.amount.replace(/,/g, ''));
  }, 0);
  
  const releasedAmount = milestones
    .filter(m => m.paymentReleased)
    .reduce((sum, milestone) => {
      return sum + parseFloat(milestone.amount.replace(/,/g, ''));
    }, 0);
  
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card className="bg-white dark:bg-logistics-dark/80 shadow-sm hover:shadow-md transition-shadow border-border rounded-xl h-full">
          <CardHeader>
            <CardTitle>Milestone Payment Tracker</CardTitle>
            <CardDescription>Smart contract payment milestones for shipment #SHP-12345678</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Progress</span>
                <span className="text-sm font-medium">{completedMilestones} of {totalMilestones} milestones</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
            
            <div className="space-y-1">
              {milestones.map((milestone, index) => (
                <div 
                  key={milestone.id} 
                  className={`
                    milestone-item 
                    ${milestone.status === 'complete' ? 'milestone-complete' : ''}
                    ${milestone.status === 'active' ? 'milestone-active' : ''}
                    ${milestone.status === 'pending' ? 'milestone-pending' : ''}
                  `}
                >
                  {index < milestones.length - 1 && <div className="milestone-line" />}
                  
                  <div className="flex gap-4">
                    <div className="milestone-circle">
                      {milestone.status === 'complete' ? <CheckCircle className="h-4 w-4" /> : null}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h4 className="font-medium">{milestone.title}</h4>
                          <p className="text-sm text-muted-foreground">{milestone.description}</p>
                        </div>
                        <Badge
                          variant={
                            milestone.status === 'complete' ? 'success' :
                            milestone.status === 'active' ? 'outline' : 'secondary'
                          }
                        >
                          {milestone.status === 'complete' ? 'Completed' : 
                           milestone.status === 'active' ? 'In Progress' : 'Upcoming'}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between mt-2 text-sm">
                        <div>
                          {milestone.date ? (
                            <span>Completed: {new Date(milestone.date).toLocaleDateString()}</span>
                          ) : (
                            <span className="text-muted-foreground">Not yet completed</span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <CircleDollarSign className="h-4 w-4 text-primary" />
                          <span className="font-medium">{milestone.amount} {milestone.token}</span>
                          {milestone.paymentReleased && (
                            <span className="text-green-500 text-xs">Released</span>
                          )}
                        </div>
                      </div>
                      
                      {milestone.status === 'active' && !milestone.paymentReleased && (
                        <div className="mt-3">
                          <Button size="sm" variant="outline">Release Payment</Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        <Card className="bg-white dark:bg-logistics-dark/80 shadow-sm hover:shadow-md transition-shadow border-border rounded-xl">
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
              <span>Total Contract Value</span>
              <span className="font-medium">{totalAmount.toLocaleString()} USDC</span>
            </div>
            
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
              <span>Released Payments</span>
              <span className="font-medium">{releasedAmount.toLocaleString()} USDC</span>
            </div>
            
            <div className="flex justify-between items-center p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
              <span>Remaining in Escrow</span>
              <span className="font-medium">{(totalAmount - releasedAmount).toLocaleString()} USDC</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-logistics-dark/80 shadow-sm hover:shadow-md transition-shadow border-border rounded-xl">
          <CardHeader>
            <CardTitle>Smart Contract Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Contract Address</div>
              <code className="text-xs p-2 bg-muted rounded block break-all font-mono">
                0x1234567890abcdef1234567890abcdef12345678
              </code>
            </div>
            
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Contract Type</div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>Escrow Milestone Payment</span>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Associated Documents</div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <a href="#" className="text-primary hover:underline">View Bill of Lading</a>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              Verify on Etherscan
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MilestoneTracker;
