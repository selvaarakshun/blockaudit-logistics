
import { useState } from 'react';
import { motion } from 'framer-motion';
import EventCategories from './EventCategories';
import RecentDocuments from './RecentDocuments';
import ExportSection from './ExportSection';
import DocumentUpload from './DocumentUpload';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AuditSidebar = () => {
  const [activeTab, setActiveTab] = useState("documents");
  
  return (
    <motion.div 
      className="lg:col-span-4 space-y-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="bg-white dark:bg-logistics-dark/60 rounded-2xl p-5 shadow-subtle border border-border">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-4 rounded-xl bg-logistics-light-gray dark:bg-logistics-dark p-1">
            <TabsTrigger 
              value="documents" 
              className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-logistics-dark/60"
            >
              Documents
            </TabsTrigger>
            <TabsTrigger 
              value="categories" 
              className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-logistics-dark/60"
            >
              Categories
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="documents" className="space-y-6">
            <DocumentUpload />
            <RecentDocuments />
          </TabsContent>
          
          <TabsContent value="categories" className="space-y-6">
            <EventCategories />
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="bg-white dark:bg-logistics-dark/60 rounded-2xl p-5 shadow-subtle border border-border">
        <ExportSection />
      </div>
    </motion.div>
  );
};

export default AuditSidebar;
