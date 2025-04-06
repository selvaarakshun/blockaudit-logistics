
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuditContent from '@/components/audit/AuditContent';
import AuditSidebar from '@/components/audit/AuditSidebar';
import { pageVariants } from '@/utils/animationVariants';

const AuditTrailPage = () => {
  return (
    <motion.div 
      className="min-h-screen flex flex-col w-full"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <Navbar />
      
      <main className="flex-grow py-8 pt-24 w-full">
        <div className="container">
          <header className="mb-8">
            <h1 className="text-3xl font-bold section-title">Audit Trail</h1>
            <p className="text-logistics-gray max-w-2xl">
              Track every action and document across your supply chain with immutable records secured by blockchain technology.
            </p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <AuditContent />
            <AuditSidebar />
          </div>
        </div>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default AuditTrailPage;
