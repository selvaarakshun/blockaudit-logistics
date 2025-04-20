import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-logistics-light-gray dark:bg-logistics-dark border-t border-border">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="font-semibold text-lg tracking-tight">BlockAudit</span>
            </Link>
            <p className="text-sm text-logistics-gray mb-4 max-w-xs">
              Revolutionizing logistics and audit processes with blockchain technology for enhanced transparency and efficiency.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-logistics-gray hover:text-logistics-dark transition-colors" aria-label="GitHub">
                <Github className="size-5" />
              </a>
              <a href="#" className="text-logistics-gray hover:text-logistics-dark transition-colors" aria-label="Twitter">
                <Twitter className="size-5" />
              </a>
              <a href="#" className="text-logistics-gray hover:text-logistics-dark transition-colors" aria-label="LinkedIn">
                <Linkedin className="size-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-logistics-gray mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link to="/dashboard" className="text-sm hover:text-logistics-blue transition-colors">Dashboard</Link></li>
              <li><Link to="/audit-trail" className="text-sm hover:text-logistics-blue transition-colors">Audit Trail</Link></li>
              <li><Link to="/blockchain-explorer" className="text-sm hover:text-logistics-blue transition-colors">Blockchain Explorer</Link></li>
              <li><Link to="/about" className="text-sm hover:text-logistics-blue transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-logistics-gray mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm hover:text-logistics-blue transition-colors">Documentation</a></li>
              <li><a href="#" className="text-sm hover:text-logistics-blue transition-colors">API Reference</a></li>
              <li><a href="#" className="text-sm hover:text-logistics-blue transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm hover:text-logistics-blue transition-colors">Guides</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-logistics-gray mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm hover:text-logistics-blue transition-colors">About Us</Link></li>
              <li><a href="#" className="text-sm hover:text-logistics-blue transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm hover:text-logistics-blue transition-colors">Contact</a></li>
              <li><a href="#" className="text-sm hover:text-logistics-blue transition-colors">Legal</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-logistics-gray">
            &copy; {currentYear} GuudzChain. All rights reserved.
          </p>
          <div className="flex gap-5">
            <a href="#" className="text-sm text-logistics-gray hover:text-logistics-dark transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-logistics-gray hover:text-logistics-dark transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-logistics-gray hover:text-logistics-dark transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
