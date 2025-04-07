
import { useEffect, useState } from 'react';
import DesktopNav from './DesktopNav';
import MobileMenu from './MobileMenu';
import WalletConnection from '../web3/WalletConnection';

const NavbarContainer = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={`fixed top-0 w-full z-40 transition-all ${isScrolled ? 'bg-white/90 dark:bg-gray-900/90 shadow-sm backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="container flex items-center justify-between h-16 md:h-20">
        <DesktopNav />
        <div className="flex items-center gap-3">
          <WalletConnection />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};

export default NavbarContainer;
