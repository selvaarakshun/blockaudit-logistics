
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { useAnimateInView } from '@/hooks/use-animation';
import Logo from './navbar/Logo';
import DesktopNav from './navbar/DesktopNav';
import MobileMenu from './navbar/MobileMenu';

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
        <Logo />

        {/* Desktop Navigation */}
        {isAboveMd && <DesktopNav />}

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
      {!isAboveMd && (
        <MobileMenu 
          isOpen={isMobileMenuOpen} 
          navLinks={navLinks} 
          isActive={isActive} 
        />
      )}
    </nav>
  );
};

export default Navbar;
