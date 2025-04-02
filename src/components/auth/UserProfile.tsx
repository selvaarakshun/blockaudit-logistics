
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  if (!user) return null;
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <motion.div 
      className="flex items-center gap-2 md:gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2">
        <motion.div 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`h-8 w-8 rounded-full ${user.isTestAccount ? 'bg-amber-100 dark:bg-amber-900/30' : 'bg-logistics-blue/20'} flex items-center justify-center`}
        >
          {user.isTestAccount ? (
            <ShieldCheck className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          ) : (
            <User className="h-4 w-4 text-logistics-blue" />
          )}
        </motion.div>
        <div className="hidden md:block">
          <div className="flex items-center gap-1">
            <p className="text-sm font-medium text-logistics-dark dark:text-white">{user.username}</p>
            {user.isTestAccount && (
              <span className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 text-xs px-1.5 py-0.5 rounded-full">Test</span>
            )}
          </div>
          <p className="text-xs text-logistics-gray truncate max-w-[120px]">{user.email}</p>
        </div>
      </div>
      <Button
        variant="ghost"
        size={isMobile ? "icon" : "sm"}
        onClick={handleLogout}
        className="h-8"
      >
        <LogOut className="h-4 w-4" />
        {!isMobile && <span className="ml-1">Logout</span>}
      </Button>
    </motion.div>
  );
};

export default UserProfile;
