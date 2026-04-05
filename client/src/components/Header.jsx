import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';


const navLinks = [
  { label: 'Surgical Tools', path: '/products?category=surgical-tools' },
  { label: 'Certifications', path: '/certifications' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

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

          <div className="header__actions" style={{ alignItems: 'center' }}>
            <form className="hidden-mobile" onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', background: 'var(--surface-container)', borderRadius: 'var(--radius-full)', padding: '0.2rem 0.5rem', marginRight: '0.5rem' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '1.2rem', color: 'var(--on-surface-variant)', marginLeft: '0.5rem' }}>search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                style={{
                  background: 'transparent', border: 'none', outline: 'none', color: 'var(--on-surface)',
                  padding: '0.4rem 0.5rem', fontSize: '0.85rem', width: '120px'
                }}
              />
            </form>
            {/* Cart icon with badge */}
            <Link
              to="/cart"
              id="header-cart-btn"
              aria-label="Quote basket"
              style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '2.25rem', height: '2.25rem', borderRadius: 'var(--radius-md)', color: 'var(--on-surface)', textDecoration: 'none', transition: 'var(--transition-fast)' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '1.5rem' }}>shopping_cart</span>
              {totalItems > 0 && (
                <span style={{
                  position: 'absolute', top: '-4px', right: '-4px',
                  minWidth: '1.1rem', height: '1.1rem', borderRadius: 'var(--radius-full)',
                  background: 'var(--primary-container)', color: '#fff',
                  fontSize: '0.625rem', fontWeight: 800, fontFamily: 'var(--font-headline)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '0 0.2rem',
                  boxShadow: 'var(--shadow-glow-primary)',
                }}>
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>
            {/* Login / Dashboard icon */}
            <Link
              to={user ? "/dashboard" : "/login"}
              aria-label="User Account"
              className="hidden-mobile"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '2.25rem', height: '2.25rem', borderRadius: 'var(--radius-md)', color: 'var(--on-surface)', textDecoration: 'none', transition: 'var(--transition-fast)' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '1.5rem', color: user ? 'var(--primary-fixed-dim)' : 'inherit' }}>person</span>
            </Link>

            <Link to="/quote" className="btn btn--primary hidden-mobile" id="header-quote-btn" style={{ fontSize: '0.8125rem', padding: '0.5rem 1.25rem' }}>
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
        <Link to={user ? "/dashboard" : "/login"} className="mobile-nav__link">
          {user ? "Dashboard" : "Login"}
        </Link>
        {navLinks.map((link) => (
          <Link key={link.label} to={link.path} className="mobile-nav__link">
            {link.label}
          </Link>
        ))}
        <Link to="/quote" className="btn btn--primary btn--lg" style={{ marginTop: '1rem' }}>
          Request Quote
        </Link>
      </div>
    </>
  );
}
