
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  if (!user) return null;
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <div className={`h-8 w-8 rounded-full ${user.isTestAccount ? 'bg-amber-100' : 'bg-logistics-blue/20'} flex items-center justify-center`}>
          {user.isTestAccount ? (
            <ShieldCheck className="h-4 w-4 text-amber-600" />
          ) : (
            <User className="h-4 w-4 text-logistics-blue" />
          )}
        </div>
        <div className="hidden lg:block">
          <div className="flex items-center gap-1">
            <p className="text-sm font-medium text-logistics-dark dark:text-white">{user.username}</p>
            {user.isTestAccount && (
              <span className="bg-amber-100 text-amber-800 text-xs px-1.5 py-0.5 rounded-full">Test</span>
            )}
          </div>
          <p className="text-xs text-logistics-gray truncate max-w-[120px]">{user.email}</p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLogout}
        className="h-8 px-2 lg:px-3"
      >
        <LogOut className="h-4 w-4" />
        <span className="ml-1 hidden lg:inline">Logout</span>
      </Button>
    </div>
  );
};

export default UserProfile;
