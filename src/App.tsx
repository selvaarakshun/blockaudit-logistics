
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuditTrailPage from "./pages/AuditTrail";
import Dashboard from "./pages/Dashboard";
import BlockchainExplorer from "./pages/BlockchainExplorer";
import BlockchainDashboard from "./pages/BlockchainDashboard";
import About from "./pages/About";
import Settings from "./pages/Settings";
import TaxCompliance from "./pages/TaxCompliance";
import IcegatePage from "./pages/IcegatePage";
import ChatbotDialog from "./components/chat/ChatbotDialog";

const queryClient = new QueryClient();

// Scroll to top component that triggers on route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/audit-trail" element={<AuditTrailPage />} />
          <Route path="/blockchain-explorer" element={<BlockchainExplorer />} />
          <Route path="/blockchain-dashboard" element={<BlockchainDashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* Tax Compliance Routes */}
          <Route path="/tax-compliance" element={<TaxCompliance />} />
          <Route path="/tax-compliance/icegate" element={<IcegatePage />} />
          <Route path="/tax-compliance/duties" element={<TaxCompliance />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        {/* Global chatbot that appears on all pages */}
        <ChatbotDialog />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
