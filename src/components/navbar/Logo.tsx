
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="navbar-logo">
      <div className="navbar-logo-icon">
        GC
      </div>
      <span className="tracking-tight">GuudzChain</span>
    </Link>
  );
};

export default Logo;
