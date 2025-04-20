
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="navbar-logo flex items-center gap-2">
      <div className="size-8 bg-logistics-blue rounded-md text-white flex items-center justify-center text-sm font-bold">
        BA
      </div>
      <span className="tracking-tight font-semibold">BlockAudit</span>
    </Link>
  );
};

export default Logo;
