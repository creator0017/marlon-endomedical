import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Surgical Tools', path: '/products?category=surgical-tools' },
  { label: 'Imaging Systems', path: '/products?category=imaging-systems' },
  { label: 'Diagnostics', path: '/products?category=diagnostics' },
  { label: 'Support', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname, location.search]);

  // Better active link detection — check both pathname and search
  const isActive = (linkPath) => {
    const [linkPathname, linkSearch] = linkPath.split('?');
    if (linkSearch) {
      return location.pathname === linkPathname && location.search === `?${linkSearch}`;
    }
    return location.pathname === linkPathname;
  };

  return (
    <>
      <header className={`header header--glass ${scrolled ? 'header--scrolled' : ''}`} id="global-header">
        <div className="header__inner">
          <Link to="/" className="header__logo" id="header-logo">
            <img src="/logo.png" alt="Marlon Endomedical" className="header__logo-img" />
            <span className="header__logo-text">Marlon <span style={{ display: 'block', fontSize: '0.55em', fontWeight: 600, letterSpacing: '0.15em', opacity: 0.85 }}>Endomedical</span></span>
          </Link>

          <nav className="header__nav" id="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`header__nav-link ${isActive(link.path) ? 'header__nav-link--active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="header__actions">
            <Link to="/contact" className="btn btn--primary" id="header-quote-btn" style={{ fontSize: '0.8125rem', padding: '0.5rem 1.25rem' }}>
              Request Quote
            </Link>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              id="mobile-menu-open"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '1.75rem' }}>menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${mobileOpen ? 'mobile-nav--open' : ''}`} id="mobile-nav-overlay">
        <button
          className="mobile-nav__close"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
          id="mobile-menu-close"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '2rem' }}>close</span>
        </button>
        <img src="/logo.png" alt="Marlon Endomedical" style={{ height: '98px', marginBottom: '1.5rem' }} />
        <Link to="/" className="mobile-nav__link">Home</Link>
        {navLinks.map((link) => (
          <Link key={link.label} to={link.path} className="mobile-nav__link">
            {link.label}
          </Link>
        ))}
        <Link to="/contact" className="btn btn--primary btn--lg" style={{ marginTop: '1rem' }}>
          Request Quote
        </Link>
      </div>
    </>
  );
}
