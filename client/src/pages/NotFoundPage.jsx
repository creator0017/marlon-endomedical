import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = '404 — Page Not Found | Marlon Endomedical';
  }, []);

  return (
    <>
      <section
        className="page-hero"
        id="notfound-hero"
        style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}
      >
        <div className="container" style={{ textAlign: 'center' }}>
          {/* Large 404 */}
          <div
            style={{
              fontFamily: 'var(--font-headline)',
              fontSize: 'clamp(6rem, 20vw, 12rem)',
              fontWeight: 900,
              lineHeight: 1,
              background: 'linear-gradient(135deg, var(--primary-container), var(--secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1.5rem',
              letterSpacing: '-0.04em',
            }}
          >
            404
          </div>

          <div
            className="glass-panel animate-in"
            style={{
              display: 'inline-block',
              padding: '0.375rem 1rem',
              borderRadius: 'var(--radius-full)',
              marginBottom: '1.5rem',
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: '1rem', verticalAlign: 'middle', marginRight: '0.375rem', color: 'var(--primary-fixed-dim)' }}
            >
              search_off
            </span>
            <span className="label-sm" style={{ color: 'var(--primary-fixed-dim)' }}>Page Not Found</span>
          </div>

          <h1
            className="display-lg page-hero__title animate-in animate-delay-1"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', marginBottom: '1rem' }}
          >
            This page doesn't exist
          </h1>

          <p
            className="page-hero__desc animate-in animate-delay-2"
            style={{ maxWidth: '520px', margin: '0 auto 2.5rem' }}
          >
            The URL you entered may be misspelled, outdated, or the page may have been moved.
            Let us help you find what you're looking for.
          </p>

          {/* Action buttons */}
          <div
            className="animate-in animate-delay-3"
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link to="/" className="btn btn--primary btn--lg">
              <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>home</span>
              Back to Home
            </Link>
            <Link to="/products" className="btn btn--lg glass-panel">
              <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>inventory_2</span>
              Browse Products
            </Link>
            <button
              onClick={() => navigate(-1)}
              className="btn btn--lg glass-panel"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>arrow_back</span>
              Go Back
            </button>
          </div>

          {/* Quick links */}
          <div
            className="animate-in animate-delay-4"
            style={{ marginTop: '4rem' }}
          >
            <p
              className="label-sm"
              style={{ color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem' }}
            >
              Popular Pages
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {[
                { label: 'Surgical Tools', path: '/products?category=surgical-tools', icon: 'vaccines' },
                { label: 'Imaging Systems', path: '/products?category=imaging-systems', icon: 'radiology' },
                { label: 'Request a Quote', path: '/quote', icon: 'request_quote' },
                { label: 'Certifications', path: '/certifications', icon: 'verified' },
                { label: 'Contact Us', path: '/contact', icon: 'mail' },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="glass-panel"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    textDecoration: 'none',
                    color: 'var(--on-surface)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    transition: 'var(--transition-fast)',
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--primary-fixed-dim)' }}>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
