
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import UserProfile from '@/components/auth/UserProfile';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { useAnimateInView } from '@/hooks/use-animation';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const isAboveMd = useBreakpoint('md');
  const { ref, isInView } = useAnimateInView();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    ...(isAuthenticated ? [
      { name: 'Dashboard', path: '/dashboard' },
      { name: 'Audit Trail', path: '/audit-trail' },
      { name: 'Blockchain Explorer', path: '/blockchain-explorer' },
      { name: 'Customs & Tax', path: '/tax-compliance' },
      { name: 'User Management', path: '/users' }
    ] : []),
    { name: 'About', path: '/about' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav
      ref={ref}
      className={cn(
        "navbar",
        isScrolled ? "navbar-scrolled" : "navbar-transparent",
        isInView ? "animate-fade-in" : ""
      )}
    >
      <div className="container-responsive flex items-center justify-between">
        <Link to="/" className="navbar-logo">
          <div className="navbar-logo-icon">
            GC
          </div>
          <span className="tracking-tight">GuudzChain</span>
        </Link>

        {/* Desktop Navigation */}
        {isAboveMd && (
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
        )}

        {/* Mobile Menu Toggle */}
        {!isAboveMd && (
          <button
            className="p-2 text-logistics-dark dark:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="size-6" />
            ) : (
              <Menu className="size-6" />
            )}
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {!isAboveMd && isMobileMenuOpen && (
        <div className="navbar-mobile-menu">
          <div className="container py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              link.path === '/tax-compliance' ? (
                <div key={link.path} className="flex flex-col">
                  <button
                    className="navbar-mobile-dropdown"
                    onClick={(e) => {
                      e.preventDefault();
                      const content = document.getElementById(`dropdown-${link.path}`);
                      if (content) {
                        content.classList.toggle('hidden');
                      }
                    }}
                  >
                    <span>{link.name}</span>
                    <ChevronDown className="size-4" />
                  </button>
                  <div id={`dropdown-${link.path}`} className="pl-4 mt-2 hidden">
                    <Link 
                      to="/tax-compliance/duties" 
                      className="block px-4 py-2 rounded-md text-sm hover:bg-logistics-light-gray dark:hover:bg-white/5"
                    >
                      Customs Duties
                    </Link>
                    <Link 
                      to="/tax-compliance/icegate" 
                      className="block px-4 py-2 rounded-md text-sm hover:bg-logistics-light-gray dark:hover:bg-white/5"
                    >
                      ICEGATE Portal
                    </Link>
                    <Link 
                      to="/tax-compliance/documentation" 
                      className="block px-4 py-2 rounded-md text-sm hover:bg-logistics-light-gray dark:hover:bg-white/5"
                    >
                      Documentation Requirements
                    </Link>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "navbar-mobile-item",
                    isActive(link.path) ? "navbar-mobile-item-active" : "navbar-mobile-item-inactive"
                  )}
                >
                  {link.name}
                </Link>
              )
            ))}
            
            {isAuthenticated ? (
              <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                <Link 
                  to="/settings" 
                  className="block px-4 py-3 rounded-md text-sm font-medium text-logistics-gray hover:bg-logistics-light-gray dark:hover:bg-white/5"
                >
                  Settings
                </Link>
                <button 
                  onClick={() => {
                    const { logout } = require('@/context/AuthContext').useAuth();
                    logout();
                    window.location.href = '/';
                  }}
                  className="w-full text-left px-4 py-3 rounded-md text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Link 
                  to="/login" 
                  className="text-center px-4 py-3 rounded-md text-sm font-medium border border-logistics-gray text-logistics-dark dark:text-white"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="text-center btn-primary"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
