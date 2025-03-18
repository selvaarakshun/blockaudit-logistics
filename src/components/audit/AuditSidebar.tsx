
import { useState } from 'react';
import EventCategories from './EventCategories';
import RecentDocuments from './RecentDocuments';
import ExportSection from './ExportSection';
import DocumentUpload from './DocumentUpload';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AuditSidebar = () => {
  const [activeTab, setActiveTab] = useState("documents");
  
  return (
    <div className="lg:col-span-4 space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-2 mb-4">
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        
        <TabsContent value="documents" className="space-y-6">
          <DocumentUpload />
          <RecentDocuments />
        </TabsContent>
        
        <TabsContent value="categories" className="space-y-6">
          <EventCategories />
        </TabsContent>
      </Tabs>
      
      <ExportSection />
    </div>
  );
};

export default AuditSidebar;
