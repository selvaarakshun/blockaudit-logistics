
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
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
        <div className="h-8 w-8 rounded-full bg-logistics-blue/20 flex items-center justify-center">
          <User className="h-4 w-4 text-logistics-blue" />
        </div>
        <div className="hidden lg:block">
          <p className="text-sm font-medium text-logistics-dark dark:text-white">{user.username}</p>
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
