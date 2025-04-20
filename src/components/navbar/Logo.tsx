
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="navbar-logo">
      <span className="tracking-tight">BlockAudit</span>
    </Link>
  );
};

export default Logo;
