
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { useAuth } from '@/context/AuthContext';
import UserProfile from '../auth/UserProfile';
import { Wallet } from 'lucide-react';

const DesktopNav = () => {
  const { user } = useAuth();
  
  return (
    <div className="flex items-center gap-10">
      <Link to="/" className="flex-shrink-0">
        <Logo />
      </Link>
      
      {user && (
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link to="/blockchain-explorer" className="text-sm font-medium hover:text-primary transition-colors">
            Blockchain
          </Link>
          <Link to="/payments" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
            <Wallet className="h-4 w-4" />
            Payments
          </Link>
          <Link to="/audit-trail" className="text-sm font-medium hover:text-primary transition-colors">
            Audit Trail
          </Link>
          <Link to="/tax-compliance" className="text-sm font-medium hover:text-primary transition-colors">
            Compliance
          </Link>
          <UserProfile />
        </nav>
      )}
    </div>
  );
};

export default DesktopNav;
