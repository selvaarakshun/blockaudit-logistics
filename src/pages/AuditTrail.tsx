
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuditContent from '@/components/audit/AuditContent';
import AuditSidebar from '@/components/audit/AuditSidebar';

const AuditTrailPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 pt-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <AuditContent />
            <AuditSidebar />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AuditTrailPage;
