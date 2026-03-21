import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand */}
        <div className="footer-section">
          <h2 className="footer-logo">Skin & Strand</h2>
          <p>Your AI powered skin & hair care assistant.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>Advisor</li>
            <li>Products</li>
            <li>About Us</li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-section">
          <h3>Categories</h3>
          <ul>
            <li>Skin Care</li>
            <li>Hair Care</li>
            <li>Natural Remedies</li>
            <li>Beauty Tips</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@skinstrand.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Mumbai, India</p>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Skin & Strand | All Rights Reserved
      </div>

    </footer>
  );
};

export default Footer;