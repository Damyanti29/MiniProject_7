import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">

      <div className="logo">
        Skin & Strand 🌸
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/category">Advisor</Link>

        {user ? (
          <div className="auth-section">
            <Link to="/profile" className="user-greeting" style={{ textDecoration: 'none' }}>
              Hi, {user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0]} ✨
            </Link>
            <button className="logout" onClick={logout}>Logout</button>
          </div>
        ) : (
          <Link to="/login" className="login-btn-nav">Login</Link>
        )}
      </div>

    </nav>
  );
};

export default Navbar;