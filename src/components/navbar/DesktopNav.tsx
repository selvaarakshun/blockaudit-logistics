
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { useAuth } from '@/context/AuthContext';
import UserProfile from '@/components/auth/UserProfile';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";

type DesktopNavProps = {
  navLinks: Array<{ name: string; path: string }>;
  isActive: (path: string) => boolean;
};

const DesktopNav = ({ navLinks, isActive }: DesktopNavProps) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex items-center gap-4">
      <NavigationMenu>
        <NavigationMenuList>
          {navLinks.map((link) => (
            link.path === '/tax-compliance' ? (
              <NavigationMenuItem key={link.path}>
                <NavigationMenuTrigger 
                  className={cn(
                    isActive(link.path) ? "navbar-menu-item-active" : "navbar-menu-item-inactive"
                  )}
                >
                  {link.name}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="navbar-dropdown">
                  <ul className="grid gap-2">
                    <li>
                      <Link to="/tax-compliance/duties" className="navbar-dropdown-item">
                        Customs Duties
                      </Link>
                    </li>
                    <li>
                      <Link to="/tax-compliance/icegate" className="navbar-dropdown-item">
                        ICEGATE Portal
                      </Link>
                    </li>
                    <li>
                      <Link to="/tax-compliance/documentation" className="navbar-dropdown-item">
                        Documentation Requirements
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem key={link.path}>
                <Link
                  to={link.path}
                  className={cn(
                    "navbar-menu-item",
                    isActive(link.path) ? "navbar-menu-item-active" : "navbar-menu-item-inactive"
                  )}
                >
                  {link.name}
                </Link>
              </NavigationMenuItem>
            )
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {isAuthenticated ? (
        <UserProfile />
      ) : (
        <div className="flex items-center gap-2">
          <Link to="/login" className="btn-secondary text-sm">
            Login
          </Link>
          <Link to="/register" className="btn-primary text-sm">
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default DesktopNav;
