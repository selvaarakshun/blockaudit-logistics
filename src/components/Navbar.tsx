
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown } from 'lucide-react';
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
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Audit Trail', path: '/audit-trail' },
    { name: 'Blockchain Explorer', path: '/blockchain-explorer' },
    { name: 'Customs & Tax', path: '/tax-compliance' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "glass shadow-subtle py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 font-semibold text-lg text-logistics-dark dark:text-white"
        >
          <div className="flex items-center justify-center size-8 bg-gradient-to-r from-logistics-blue to-logistics-indigo rounded-md text-white shadow-subtle">
            GC
          </div>
          <span className="tracking-tight">GuudzChain</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <NavigationMenu>
            <NavigationMenuList>
              {navLinks.map((link) => (
                link.path === '/tax-compliance' ? (
                  <NavigationMenuItem key={link.path}>
                    <NavigationMenuTrigger 
                      className={cn(
                        "text-sm font-medium transition-all",
                        isActive(link.path)
                          ? "text-logistics-blue"
                          : "text-logistics-gray hover:text-logistics-dark dark:hover:text-white"
                      )}
                    >
                      {link.name}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-white dark:bg-logistics-dark p-4 rounded-md shadow-medium min-w-[320px]">
                      <ul className="grid gap-2">
                        <li>
                          <Link 
                            to="/tax-compliance/duties" 
                            className="block p-2 rounded-md hover:bg-logistics-light-gray dark:hover:bg-white/5"
                          >
                            Customs Duties
                          </Link>
                        </li>
                        <li>
                          <Link 
                            to="/tax-compliance/icegate" 
                            className="block p-2 rounded-md hover:bg-logistics-light-gray dark:hover:bg-white/5"
                          >
                            ICEGATE Portal
                          </Link>
                        </li>
                        <li>
                          <Link 
                            to="/tax-compliance/documentation" 
                            className="block p-2 rounded-md hover:bg-logistics-light-gray dark:hover:bg-white/5"
                          >
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
                        "px-4 py-2 rounded-md text-sm font-medium transition-all inline-block",
                        isActive(link.path)
                          ? "text-logistics-blue"
                          : "text-logistics-gray hover:text-logistics-dark dark:hover:text-white"
                      )}
                    >
                      {link.name}
                    </Link>
                  </NavigationMenuItem>
                )
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <Link to="/dashboard" className="btn-primary">
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-logistics-dark dark:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="size-6" />
          ) : (
            <Menu className="size-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-logistics-dark shadow-medium animate-slide-down">
          <div className="container py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              link.path === '/tax-compliance' ? (
                <div key={link.path} className="flex flex-col">
                  <button
                    className="flex items-center justify-between px-4 py-3 rounded-md text-sm font-medium bg-logistics-light-gray dark:bg-white/5"
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
                    "px-4 py-3 rounded-md text-sm font-medium",
                    isActive(link.path)
                      ? "bg-logistics-light-blue text-logistics-blue dark:bg-logistics-blue/10"
                      : "text-logistics-gray hover:bg-logistics-light-gray dark:hover:bg-white/5"
                  )}
                >
                  {link.name}
                </Link>
              )
            ))}
            <Link 
              to="/dashboard" 
              className="mt-2 text-center btn-primary"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
