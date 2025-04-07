
import { useState } from 'react';
import NavbarContainer from '@/components/navbar/NavbarContainer';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PaymentForm from '@/components/web3/PaymentForm';
import TransactionHistory from '@/components/web3/TransactionHistory';
import MilestoneTracker from '@/components/web3/MilestoneTracker';
import TreasuryDashboard from '@/components/web3/TreasuryDashboard';
import AuditCompliance from '@/components/web3/AuditCompliance';

const PaymentsDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <NavbarContainer />
      
      <main className="flex-grow py-8 pt-24">
        <div className="container">
          <h1 className="text-3xl font-bold mb-6">Blockchain Payments</h1>
          
          <Tabs defaultValue="pay" className="w-full">
            <TabsList className="grid grid-cols-5 mb-8">
              <TabsTrigger value="pay">Send & Receive</TabsTrigger>
              <TabsTrigger value="history">Transactions</TabsTrigger>
              <TabsTrigger value="milestones">Milestones</TabsTrigger>
              <TabsTrigger value="treasury">Treasury</TabsTrigger>
              <TabsTrigger value="audit">Audit & Compliance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="pay" className="space-y-6">
              <PaymentForm />
            </TabsContent>
            
            <TabsContent value="history">
              <TransactionHistory />
            </TabsContent>
            
            <TabsContent value="milestones">
              <MilestoneTracker />
            </TabsContent>
            
            <TabsContent value="treasury">
              <TreasuryDashboard />
            </TabsContent>
            
            <TabsContent value="audit">
              <AuditCompliance />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PaymentsDashboard;
