import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Toast, { useToast } from '../components/Toast';
import { submitInquiry } from '../services/api';

export default function CartPage() {
  const { items, updateQty, removeFromCart, clearCart, totalItems } = useCart();
  const navigate = useNavigate();
  const { toast, showToast, hideToast } = useToast();
  const [contactData, setContactData] = useState({ name: '', email: '', organization: '', phone: '', notes: '' });
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    document.title = `Quote Basket (${totalItems}) | Marlon Endomedical`;
  }, [totalItems]);

  const upd = (field) => (e) => setContactData((p) => ({ ...p, [field]: e.target.value }));

  const categoryLabel = (cat) =>
    cat?.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()) || 'Medical Device';

  const buildMessage = () => {
    const lines = items.map(
      (item) => `• ${item.name} (${categoryLabel(item.category)}) — Qty: ${item.qty}`
    );
    return `QUOTE BASKET REQUEST\n\nItems:\n${lines.join('\n')}\n\nTotal SKUs: ${items.length}\nTotal Units: ${items.reduce((s, i) => s + i.qty, 0)}\n\nAdditional Notes:\n${contactData.notes || 'None'}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitInquiry({
        name: contactData.name,
        email: contactData.email,
        organization: contactData.organization,
        phone: contactData.phone,
        message: buildMessage(),
        type: 'bulk-quote',
      });
      clearCart();
      navigate(`/thank-you?name=${encodeURIComponent(contactData.name)}&email=${encodeURIComponent(contactData.email)}&from=cart`);
    } catch (err) {
      showToast(err.response?.data?.message || 'Could not submit. Please try again.', 'error');
      setSubmitting(false);
    }
  };

  // Empty cart state
  if (items.length === 0) {
    return (
      <section className="page-hero" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }} id="cart-empty">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '4rem', color: 'var(--on-surface-variant)', display: 'block', marginBottom: '1rem' }}>
            shopping_cart
          </span>
          <h1 className="headline-lg animate-in" style={{ marginBottom: '0.75rem' }}>Your quote basket is empty</h1>
          <p className="body-md animate-in animate-delay-1" style={{ color: 'var(--on-surface-variant)', marginBottom: '2rem' }}>
            Browse our product catalog and add items to build your bulk quote request.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/products" className="btn btn--primary btn--lg">
              <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>inventory_2</span>
              Browse Catalog
            </Link>
            <Link to="/quote" className="btn btn--lg glass-panel">
              <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>request_quote</span>
              Manual Quote Form
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="page-hero" id="cart-hero">
        <div className="container">
          <div className="glass-panel animate-in" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 1rem', borderRadius: 'var(--radius-full)', marginBottom: '1.25rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--primary-fixed-dim)' }}>shopping_cart</span>
            <span className="label-sm" style={{ color: 'var(--primary-fixed-dim)' }}>{totalItems} item{totalItems !== 1 ? 's' : ''} in your basket</span>
          </div>
          <h1 className="display-lg page-hero__title animate-in">Quote Basket</h1>
          <p className="page-hero__desc animate-in animate-delay-1">
            Review your selected products, adjust quantities, then submit for a
            customized bulk pricing quote from our procurement team.
          </p>
        </div>
      </section>

      <section className="section" style={{ padding: '4rem 0' }} id="cart-content">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '2.5rem', alignItems: 'start' }}>

            {/* Items list */}
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h2 className="headline-md">{items.length} product{items.length !== 1 ? 's' : ''} selected</h2>
                <button
                  onClick={() => { if (window.confirm('Remove all items from your basket?')) clearCart(); }}
                  className="btn glass-panel"
                  style={{ fontSize: '0.8125rem', padding: '0.4rem 0.875rem' }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>delete_sweep</span>
                  Clear All
                </button>
              </div>

              {items.map((item) => (
                <div
                  key={item.slug}
                  className="glass-panel animate-in"
                  style={{ padding: '1.25rem', borderRadius: 'var(--radius-xl)', display: 'grid', gridTemplateColumns: '5rem 1fr auto', gap: '1.25rem', alignItems: 'center' }}
                >
                  {/* Thumbnail */}
                  <div style={{ width: '5rem', height: '5rem', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--surface-container-high)', flexShrink: 0 }}>
                    {item.image
                      ? <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <span className="material-symbols-outlined" style={{ fontSize: '2rem', color: 'var(--on-surface-variant)', display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>vaccines</span>
                    }
                  </div>

                  {/* Info */}
                  <div style={{ minWidth: 0 }}>
                    <div className="label-sm" style={{ color: 'var(--primary-fixed-dim)', marginBottom: '0.125rem' }}>{categoryLabel(item.category)}</div>
                    <Link to={`/products/${item.slug}`} style={{ color: 'var(--on-surface)', textDecoration: 'none', fontWeight: 700, fontSize: '0.9375rem', display: 'block', marginBottom: '0.25rem' }}>
                      {item.name}
                    </Link>
                    <div className="body-sm" style={{ color: 'var(--on-surface-variant)' }}>{item.subtitle}</div>
                    <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.875rem', alignItems: 'center' }}>
                      <span className="label-sm" style={{ color: 'var(--on-surface-variant)' }}>Qty:</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <button
                          onClick={() => updateQty(item.slug, item.qty - 1)}
                          disabled={item.qty <= 1}
                          style={{ width: '1.75rem', height: '1.75rem', borderRadius: '50%', border: '1px solid var(--outline-variant)', background: 'transparent', cursor: item.qty <= 1 ? 'not-allowed' : 'pointer', color: 'var(--on-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: item.qty <= 1 ? 0.4 : 1 }}
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>remove</span>
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.qty}
                          onChange={(e) => updateQty(item.slug, Math.max(1, parseInt(e.target.value) || 1))}
                          style={{ width: '3.5rem', textAlign: 'center', background: 'var(--surface-container)', border: '1px solid var(--outline-variant)', borderRadius: 'var(--radius-md)', padding: '0.25rem 0.5rem', color: 'var(--on-surface)', fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: '0.9rem' }}
                        />
                        <button
                          onClick={() => updateQty(item.slug, item.qty + 1)}
                          style={{ width: '1.75rem', height: '1.75rem', borderRadius: '50%', border: '1px solid var(--outline-variant)', background: 'transparent', cursor: 'pointer', color: 'var(--on-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>add</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                    <div style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: '0.9375rem', color: 'var(--primary-fixed-dim)' }}>
                      {item.price}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.slug)}
                      style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--on-surface-variant)', padding: '0.25rem', borderRadius: 'var(--radius-sm)' }}
                      title="Remove from basket"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>delete</span>
                    </button>
                  </div>
                </div>
              ))}

              <div style={{ textAlign: 'right', marginTop: '0.5rem' }}>
                <Link to="/products" style={{ color: 'var(--primary-fixed-dim)', fontSize: '0.875rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>add_circle</span>
                  Add more products
                </Link>
              </div>
            </div>

            {/* Right — Order Summary */}
            <div style={{ position: 'sticky', top: '6rem', display: 'grid', gap: '1.25rem' }}>
              <div className="glass-panel animate-in animate-delay-1" style={{ padding: '1.5rem', borderRadius: 'var(--radius-xl)' }}>
                <h3 className="headline-sm" style={{ marginBottom: '1.25rem' }}>Order Summary</h3>
                <div style={{ display: 'grid', gap: '0.625rem', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--on-surface-variant)' }}>Total SKUs</span>
                    <span style={{ fontWeight: 700 }}>{items.length}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--on-surface-variant)' }}>Total Units</span>
                    <span style={{ fontWeight: 700 }}>{items.reduce((s, i) => s + i.qty, 0)}</span>
                  </div>
                  <div style={{ height: '1px', background: 'var(--outline-variant)', margin: '0.25rem 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--on-surface-variant)' }}>Pricing</span>
                    <span style={{ fontWeight: 700, color: 'var(--primary-fixed-dim)' }}>Quote on Request</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/checkout')}
                  className="btn btn--primary btn--lg"
                  style={{ width: '100%' }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>shopping_cart_checkout</span>
                  Proceed to Checkout
                </button>
                <p className="body-sm" style={{ color: 'var(--on-surface-variant)', marginTop: '0.75rem', textAlign: 'center', lineHeight: 1.5 }}>
                  Response within 24 business hours.
                </p>
              </div>

              <div className="glass-panel animate-in animate-delay-2" style={{ padding: '1.25rem', borderRadius: 'var(--radius-xl)' }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '1.1rem', color: 'var(--secondary)' }}>verified</span>
                  <span className="label-sm" style={{ fontWeight: 700 }}>ISO 13485 Certified</span>
                </div>
                <p className="body-sm" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.6 }}>
                  All quoted products come with full regulatory documentation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact details modal/panel */}
      {showForm && (
        <div
          onClick={() => setShowForm(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(2, 4, 8, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass-panel"
            style={{ width: '100%', maxWidth: '520px', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}
          >
            <div style={{ padding: '1.5rem 1.75rem', borderBottom: '1px solid var(--outline-variant)', background: 'var(--surface-container)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 className="headline-md">Your Contact Details</h2>
                <p className="body-sm" style={{ color: 'var(--on-surface-variant)' }}>We'll send your quote to this email.</p>
              </div>
              <button onClick={() => setShowForm(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--on-surface-variant)' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.5rem' }}>close</span>
              </button>
            </div>
            <form onSubmit={handleSubmit} style={{ padding: '1.75rem', display: 'grid', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <input type="text" className="input" placeholder="Full Name *" value={contactData.name} onChange={upd('name')} required />
                <input type="email" className="input" placeholder="Email Address *" value={contactData.email} onChange={upd('email')} required />
              </div>
              <input type="text" className="input" placeholder="Organization / Hospital *" value={contactData.organization} onChange={upd('organization')} required />
              <input type="tel" className="input" placeholder="Phone Number" value={contactData.phone} onChange={upd('phone')} />
              <textarea className="input" placeholder="Additional notes (delivery address, urgency, compliance requirements…)" value={contactData.notes} onChange={upd('notes')} style={{ minHeight: '90px' }} />

              {/* Items summary */}
              <div style={{ background: 'var(--surface-container)', borderRadius: 'var(--radius-md)', padding: '0.875rem 1rem' }}>
                <div className="label-sm" style={{ color: 'var(--on-surface-variant)', marginBottom: '0.5rem' }}>Quoting {items.length} product{items.length !== 1 ? 's' : ''} · {items.reduce((s, i) => s + i.qty, 0)} total units</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                  {items.map((item) => (
                    <span key={item.slug} style={{ fontSize: '0.75rem', background: 'var(--surface-container-high)', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-full)', color: 'var(--on-surface-variant)' }}>
                      {item.name} ×{item.qty}
                    </span>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn btn--primary btn--lg" disabled={submitting} style={{ width: '100%' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>send</span>
                {submitting ? 'Submitting…' : 'Submit Quote Request'}
              </button>
            </form>
          </div>
        </div>
      )}

      <Toast message={toast.message} type={toast.type} visible={toast.visible} onClose={hideToast} />
    </>
  );
}
