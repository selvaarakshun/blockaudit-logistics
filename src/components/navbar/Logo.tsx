
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="navbar-logo flex items-center gap-2" aria-label="GuudzChain">
      <div className="size-8 bg-logistics-blue rounded-md text-white flex items-center justify-center text-sm font-bold">
        GC
      </div>
      <span className="tracking-tight font-semibold">GuudzChain</span>
    </Link>
  );
};

export default Logo;
