import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="site-footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <Link to="/" className="footer__brand" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none' }}>
              <img src="/logo.png" alt="Marlon Endomedical" className="footer__logo-img" />
              <span className="header__logo-text">Marlon <span style={{ display: 'block', fontSize: '0.55em', fontWeight: 600, letterSpacing: '0.15em', opacity: 0.85 }}>Endomedical</span></span>
            </Link>
            <p className="footer__desc">
              A subsidiary of Marlon Endomedical &amp; Mannat Hospital.
              Precision Engineering for Life. Global distributors of high-precision
              surgical tools and diagnostic systems.
            </p>
            <div className="footer__social">
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="footer__social-link glass-panel" aria-label="Instagram" id="footer-social-instagram">
                <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>share</span>
              </a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="footer__social-link glass-panel" aria-label="WhatsApp" id="footer-social-whatsapp">
                <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>chat</span>
              </a>
              <a href="mailto:sales@marlonendomedical.com" className="footer__social-link glass-panel" aria-label="Email" id="footer-social-email">
                <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>mail</span>
              </a>
            </div>
          </div>

          <div className="footer__links-grid">
            <div>
              <h5 className="footer__links-title">Quick Links</h5>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li><Link to="/" className="footer__link">Home</Link></li>
                <li><Link to="/products" className="footer__link">Products</Link></li>
                <li><Link to="/about" className="footer__link">About Us</Link></li>
                <li><Link to="/quote" className="footer__link">Request a Quote</Link></li>
                <li><Link to="/cart" className="footer__link">Quote Basket</Link></li>
                <li><Link to="/certifications" className="footer__link">Certifications</Link></li>
                <li><Link to="/faq" className="footer__link">FAQ</Link></li>
                <li><Link to="/blog" className="footer__link">Insights &amp; News</Link></li>
                <li><Link to="/partners" className="footer__link">Partners</Link></li>
                <li><Link to="/contact" className="footer__link">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="footer__links-title">Categories</h5>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li><Link to="/categories/spine-surgery" className="footer__link">Spine Surgery</Link></li>
                <li><Link to="/categories/surgical-tools" className="footer__link">Surgical Tools</Link></li>
                <li><Link to="/categories/imaging-systems" className="footer__link">Imaging Systems</Link></li>
                <li><Link to="/categories/diagnostics" className="footer__link">Diagnostics</Link></li>
                <li><Link to="/categories/monitoring" className="footer__link">Monitoring</Link></li>
                <li><Link to="/categories/sterilization" className="footer__link">Sterilization</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer__bottom" style={{ borderTop: '1px solid rgba(194, 198, 211, 0.1)' }}>
          <div className="footer__copyright">
            © {currentYear} Marlon Endomedical &amp; Mannat Hospital. All rights reserved.
            <span style={{ margin: '0 0.5rem', opacity: 0.4 }}>·</span>
            <Link to="/privacy-policy" className="footer__link" style={{ fontSize: 'inherit', opacity: 0.7 }}>Privacy Policy</Link>
            <span style={{ margin: '0 0.5rem', opacity: 0.4 }}>·</span>
            <Link to="/terms" className="footer__link" style={{ fontSize: 'inherit', opacity: 0.7 }}>Terms &amp; Conditions</Link>
          </div>
          <div className="footer__status">
            <span className="footer__status-dot"></span>
            <span className="footer__status-text">System Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
