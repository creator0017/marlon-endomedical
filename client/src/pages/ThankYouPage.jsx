import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export default function ThankYouPage() {
  const [searchParams] = useSearchParams();
  const name  = searchParams.get('name')  || 'there';
  const email = searchParams.get('email') || null;
  const from  = searchParams.get('from')  || 'form'; // 'cart' | 'quote' | 'contact' | 'form'

  useEffect(() => {
    document.title = 'Thank You | Marlon Endomedical';
  }, []);

  const titles = {
    cart:    'Quote request submitted!',
    quote:   'Quote request submitted!',
    contact: 'Message received!',
    form:    'Submission received!',
  };

  const subtitles = {
    cart:    'Our procurement specialists will review your basket and respond with volume pricing.',
    quote:   'Our procurement specialists will prepare a customised offer for your requirements.',
    contact: 'Our team will review your message and get back to you shortly.',
    form:    'We have received your submission and will follow up soon.',
  };

  const nextLinks = [
    { label: 'Browse Products',    path: '/products',        icon: 'inventory_2' },
    { label: 'View Certifications',path: '/certifications',  icon: 'workspace_premium' },
    { label: 'Read FAQ',           path: '/faq',             icon: 'help' },
    { label: 'Back to Home',       path: '/',                icon: 'home' },
  ];

  return (
    <section
      className="page-hero"
      id="thankyou-hero"
      style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}
    >
      <div className="container" style={{ textAlign: 'center' }}>

        {/* Animated checkmark */}
        <div
          className="animate-in"
          style={{
            width: '5.5rem', height: '5.5rem', borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--secondary), var(--primary-container))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.75rem',
            boxShadow: '0 0 40px rgba(0, 106, 102, 0.45)',
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '2.75rem', color: '#fff' }}>
            check_circle
          </span>
        </div>

        {/* Badge */}
        <div className="glass-panel animate-in animate-delay-1" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 1rem', borderRadius: 'var(--radius-full)', marginBottom: '1.25rem' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--primary-fixed-dim)' }}>schedule</span>
          <span className="label-sm" style={{ color: 'var(--primary-fixed-dim)' }}>Response within 24 business hours</span>
        </div>

        <h1 className="display-lg page-hero__title animate-in animate-delay-1" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', marginBottom: '0.75rem' }}>
          Thank you, {name}!
        </h1>

        <p className="page-hero__desc animate-in animate-delay-2" style={{ maxWidth: '540px', margin: '0 auto 1.25rem' }}>
          {subtitles[from] || subtitles.form}
        </p>

        {/* Confirmation info card */}
        {email && (
          <div className="glass-panel animate-in animate-delay-2" style={{ display: 'inline-grid', gap: '0.5rem', padding: '1.125rem 2rem', borderRadius: 'var(--radius-xl)', marginBottom: '2.5rem', textAlign: 'left' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '1.1rem', color: 'var(--primary-fixed-dim)' }}>mail</span>
              <div>
                <div className="label-sm" style={{ color: 'var(--on-surface-variant)' }}>Confirmation sent to</div>
                <div className="body-sm" style={{ fontWeight: 700 }}>{email}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '1.1rem', color: 'var(--primary-fixed-dim)' }}>support_agent</span>
              <div>
                <div className="label-sm" style={{ color: 'var(--on-surface-variant)' }}>Handled by</div>
                <div className="body-sm" style={{ fontWeight: 700 }}>Marlon Endomedical Procurement Team</div>
              </div>
            </div>
          </div>
        )}

        {/* What happens next */}
        <div className="animate-in animate-delay-3" style={{ maxWidth: '600px', margin: '0 auto 2.5rem' }}>
          <p className="label-sm" style={{ color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>
            What happens next
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {[
              { icon: 'mark_email_read', step: '1', label: 'Acknowledgement email within 2 hours' },
              { icon: 'manage_search',   step: '2', label: 'Our team reviews your requirements' },
              { icon: 'request_quote',   step: '3', label: 'Formal quote sent within 24 hours' },
            ].map((item) => (
              <div key={item.step} className="glass-panel" style={{ padding: '1.125rem', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
                <div style={{ width: '1.75rem', height: '1.75rem', borderRadius: '50%', background: 'var(--primary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.625rem', fontSize: '0.7rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-headline)' }}>
                  {item.step}
                </div>
                <span className="material-symbols-outlined" style={{ fontSize: '1.375rem', color: 'var(--primary-fixed-dim)', display: 'block', marginBottom: '0.375rem' }}>{item.icon}</span>
                <p className="body-sm" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.5, fontSize: '0.8125rem' }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation links */}
        <div className="animate-in animate-delay-4">
          <p className="label-sm" style={{ color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
            Continue exploring
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {nextLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={link.path === '/products' ? 'btn btn--primary' : 'btn glass-panel'}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
