
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { ChevronDown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export type MobileMenuProps = {
  isOpen?: boolean;
  navLinks?: Array<{ name: string; path: string }>;
  isActive?: (path: string) => boolean;
};

const MobileMenu = ({ 
  isOpen = false, 
  navLinks = [], 
  isActive = () => false 
}: MobileMenuProps) => {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  if (!isOpen) return null;

  return (
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
  );
};

export default MobileMenu;
