import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CheckoutPage() {
  const { cart, totalItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    hospitalName: '',
    contactName: '',
    email: '',
    phone: '',
    shippingAddress: '',
    billingAddress: '',
    paymentMethod: 'invoice'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate transaction delay
    setTimeout(() => {
      clearCart();
      setLoading(false);
      navigate('/thank-you');
    }, 2000);
  };

  if (totalItems === 0) {
    return (
      <section className="section" style={{ padding: '8rem 0', textAlign: 'center' }}>
        <div className="container">
          <span className="material-symbols-outlined" style={{ fontSize: '4rem', color: 'var(--outline)', marginBottom: '1rem' }}>shopping_cart</span>
          <h1 className="headline-lg">Your Cart is Empty</h1>
          <p className="body-md">You need items in your cart to checkout.</p>
          <Link to="/products" className="btn btn--primary" style={{ marginTop: '2rem' }}>Browse Products</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section" style={{ padding: '4rem 0' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <h1 className="display-sm" style={{ marginBottom: '2rem' }}>Checkout & Finalize Order</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '2rem' }}>
          {/* Form Side */}
          <div className="glass-panel animate-in" style={{ padding: '2rem', borderRadius: 'var(--radius-xl)' }}>
            <h2 className="headline-sm" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--outline-variant)', paddingBottom: '0.75rem' }}>Billing & Shipping</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label className="label-sm" style={{ marginBottom: '0.5rem', display: 'block' }}>Hospital / Clinic Name *</label>
                  <input required name="hospitalName" className="input input--glass" value={formData.hospitalName} onChange={handleChange} />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="label-sm" style={{ marginBottom: '0.5rem', display: 'block' }}>Contact Person *</label>
                  <input required name="contactName" className="input input--glass" value={formData.contactName} onChange={handleChange} />
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label className="label-sm" style={{ marginBottom: '0.5rem', display: 'block' }}>Email Address *</label>
                  <input required type="email" name="email" className="input input--glass" value={formData.email} onChange={handleChange} />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="label-sm" style={{ marginBottom: '0.5rem', display: 'block' }}>Phone Number *</label>
                  <input required type="tel" name="phone" className="input input--glass" value={formData.phone} onChange={handleChange} />
                </div>
              </div>

              <div>
                <label className="label-sm" style={{ marginBottom: '0.5rem', display: 'block' }}>Shipping Address *</label>
                <textarea required name="shippingAddress" className="input input--glass" style={{ minHeight: '80px' }} value={formData.shippingAddress} onChange={handleChange}></textarea>
              </div>

              <h2 className="headline-sm" style={{ marginTop: '1rem', marginBottom: '1rem', borderBottom: '1px solid var(--outline-variant)', paddingBottom: '0.75rem' }}>Payment Method</h2>
              <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="radio" name="paymentMethod" value="invoice" checked={formData.paymentMethod === 'invoice'} onChange={handleChange} />
                  <span>Purchase Order / Invoice (Net 30)</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="radio" name="paymentMethod" value="credit_card" checked={formData.paymentMethod === 'credit_card'} onChange={handleChange} />
                  <span>Credit Card (Stripe Gateway Mock)</span>
                </label>
              </div>

              {formData.paymentMethod === 'credit_card' && (
                <div style={{ background: 'var(--surface-container-highest)', padding: '1rem', borderRadius: 'var(--radius-md)', marginTop: '0.5rem', border: '1px dashed var(--outline)' }}>
                  <p className="body-sm" style={{ color: 'var(--on-surface-variant)', marginBottom: '1rem' }}>Please enter your credit card details.</p>
                  <input type="text" placeholder="Card Number (0000 0000 0000 0000)" className="input input--glass" style={{ marginBottom: '0.5rem' }} />
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input type="text" placeholder="MM/YY" className="input input--glass" />
                    <input type="text" placeholder="CVC" className="input input--glass" />
                  </div>
                </div>
              )}

              <button type="submit" className="btn btn--primary btn--lg" style={{ marginTop: '2rem' }} disabled={loading}>
                {loading ? 'Processing Transaction...' : 'Place Order'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="glass-panel animate-in animate-delay-1" style={{ padding: '2rem', height: 'fit-content', borderRadius: 'var(--radius-xl)' }}>
            <h2 className="headline-sm" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--outline-variant)', paddingBottom: '0.75rem' }}>Order Summary</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              {cart.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{item.product.name}</div>
                    <div className="body-sm" style={{ color: 'var(--on-surface-variant)', fontSize: '0.75rem' }}>Qty: {item.quantity}</div>
                  </div>
                  <div style={{ fontWeight: 600 }}>TBD</div>
                </div>
              ))}
            </div>
            <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--outline-variant)', display: 'flex', justifyContent: 'space-between', fontWeight: 800 }}>
              <span>Total Priority:</span>
              <span style={{ color: 'var(--primary-fixed-dim)' }}>High</span>
            </div>
            <p className="body-sm" style={{ color: 'var(--on-surface-variant)', marginTop: '1rem', lineHeight: 1.5, fontSize: '0.75rem' }}>
              Since medical equipment prices require regional quoting, an invoice will be generated directly linking to this procurement request.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
