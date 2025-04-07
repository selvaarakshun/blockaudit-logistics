
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DesktopNav from './DesktopNav';
import MobileMenu from './MobileMenu';
import WalletConnection from '../web3/WalletConnection';

const NavbarContainer = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Blockchain', path: '/blockchain-explorer' },
    { name: 'Payments', path: '/payments' },
    { name: 'Audit Trail', path: '/audit-trail' },
    { name: 'Compliance', path: '/tax-compliance' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };
  
  return (
    <header className={`fixed top-0 w-full z-40 transition-all ${isScrolled ? 'bg-white/90 dark:bg-gray-900/90 shadow-sm backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="container flex items-center justify-between h-16 md:h-20">
        <DesktopNav />
        <div className="flex items-center gap-3">
          <WalletConnection />
          <MobileMenu 
            isOpen={isMobileMenuOpen} 
            navLinks={navLinks}
            isActive={isActive}
          />
        </div>
      </div>
    </header>
  );
};

export default NavbarContainer;
