import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">

      <div className="logo">
        Skin & Strand 🌸
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/category">Advisor</Link>
        <Link to="/login">Login</Link>
        <button className="logout">Logout</button>
      </div>

    </nav>
  );
};

export default Navbar;