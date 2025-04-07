import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Page imports
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuditTrailPage from "./pages/AuditTrail";
import Dashboard from "./pages/Dashboard";
import BlockchainExplorer from "./pages/BlockchainExplorer";
import BlockchainDashboard from "./pages/BlockchainDashboard";
import About from "./pages/About";
import Settings from "./pages/Settings";
import TaxCompliance from "./pages/TaxCompliance";
import IcegatePage from "./pages/IcegatePage";
import DocumentationRequirements from "./pages/DocumentationRequirements";
import UserManagement from "./pages/UserManagement";
import ChatbotDialog from "./components/chat/ChatbotDialog";
import PaymentsDashboard from "./pages/PaymentsDashboard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Enhanced ScrollToTop component that scrolls before the page transitions
const ScrollToTop = () => {
  const { pathname } = useLocation();

  // Use useLayoutEffect to execute scroll before paint
  useLayoutEffect(() => {
    // Scroll to top of page on route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Use 'instant' instead of 'smooth' to prevent janky transitions
    });
    
    // Focus on the main content for accessibility
    document.getElementById('main-content')?.focus();
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <ScrollToTop />
        <main id="main-content" tabIndex={-1} style={{ outline: 'none' }}>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/audit-trail" element={
              <ProtectedRoute>
                <AuditTrailPage />
              </ProtectedRoute>
            } />
            <Route path="/blockchain-explorer" element={
              <ProtectedRoute>
                <BlockchainExplorer />
              </ProtectedRoute>
            } />
            <Route path="/blockchain-dashboard" element={
              <ProtectedRoute>
                <BlockchainDashboard />
              </ProtectedRoute>
            } />
            <Route path="/payments" element={
              <ProtectedRoute>
                <PaymentsDashboard />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
            <Route path="/users" element={
              <ProtectedRoute>
                <UserManagement />
              </ProtectedRoute>
            } />
            
            {/* Tax Compliance Routes - Protected */}
            <Route path="/tax-compliance" element={
              <ProtectedRoute>
                <TaxCompliance />
              </ProtectedRoute>
            } />
            <Route path="/tax-compliance/icegate" element={
              <ProtectedRoute>
                <IcegatePage />
              </ProtectedRoute>
            } />
            <Route path="/tax-compliance/duties" element={
              <ProtectedRoute>
                <TaxCompliance />
              </ProtectedRoute>
            } />
            <Route path="/tax-compliance/documentation" element={
              <ProtectedRoute>
                <DocumentationRequirements />
              </ProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        {/* Global chatbot that appears on all pages */}
        <ChatbotDialog />
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
