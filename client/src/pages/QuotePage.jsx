import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Toast, { useToast } from '../components/Toast';
import { submitInquiry } from '../services/api';

const productCategories = [
  'Surgical Tools',
  'Imaging Systems',
  'Diagnostics Equipment',
  'Patient Monitoring',
  'Sterilization Systems',
  'Endoscopy Instruments',
  'Other / Multiple Categories',
];

const deliveryTimelines = [
  'ASAP — Emergency procurement',
  'Within 2 weeks',
  'Within 1 month',
  'Within 3 months',
  'Flexible / No deadline',
];

const steps = [
  { num: 1, label: 'Contact Info', icon: 'person' },
  { num: 2, label: 'Order Details', icon: 'inventory_2' },
  { num: 3, label: 'Review & Submit', icon: 'task_alt' },
];

const whyItems = [
  { icon: 'verified', title: 'ISO 13485 Certified', desc: 'Every instrument meets international quality management standards.' },
  { icon: 'local_shipping', title: '24H Response', desc: 'Dedicated B2B procurement team responds within one business day.' },
  { icon: 'percent', title: 'Bulk Pricing', desc: 'Volume discounts from 10+ units. Custom pricing for institutional contracts.' },
  { icon: 'support_agent', title: 'Expert Consultation', desc: 'Biomedical engineers help you specify the right product.' },
];

export default function QuotePage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    phone: '',
    designation: '',
    category: '',
    productName: '',
    quantity: '',
    deliveryTimeline: '',
    deliveryAddress: '',
    additionalRequirements: '',
    type: 'bulk-quote',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  useEffect(() => {
    document.title = 'Request a Quote | Marlon Endomedical';
  }, []);

  const update = (field) => (e) => setFormData(p => ({ ...p, [field]: e.target.value }));

  const step1Valid = formData.name && formData.email && formData.organization;
  const step2Valid = formData.category && formData.quantity && formData.deliveryTimeline;

  const buildMessage = () =>
    `BULK QUOTE REQUEST\n\nProduct Category: ${formData.category}\nProduct / Device Name: ${formData.productName || 'Not specified'}\nQuantity Required: ${formData.quantity}\nDelivery Timeline: ${formData.deliveryTimeline}\nDelivery Address: ${formData.deliveryAddress || 'Not specified'}\nDesignation: ${formData.designation || 'Not specified'}\n\nAdditional Requirements:\n${formData.additionalRequirements || 'None'}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitInquiry({
        name: formData.name,
        email: formData.email,
        organization: formData.organization,
        phone: formData.phone,
        message: buildMessage(),
        type: 'bulk-quote',
      });
      setSubmitted(true);
    } catch (err) {
      showToast(err.response?.data?.message || 'Could not submit quote. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="page-hero" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }} id="quote-success">
        <div className="container" style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '5rem', height: '5rem', borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--secondary), var(--primary-container))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.5rem',
              boxShadow: 'var(--shadow-glow-secondary)',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '2.5rem', color: '#fff' }}>check_circle</span>
          </div>
          <h1 className="display-lg page-hero__title animate-in" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: '1rem' }}>
            Quote Request Received
          </h1>
          <p className="page-hero__desc animate-in animate-delay-1" style={{ maxWidth: '520px', margin: '0 auto 2rem' }}>
            Thank you, <strong>{formData.name}</strong>. Our procurement specialists will review your
            requirements and respond to <strong>{formData.email}</strong> within 24 hours.
          </p>
          <div className="glass-panel animate-in animate-delay-2" style={{ display: 'inline-block', padding: '1.25rem 2rem', borderRadius: 'var(--radius-xl)', marginBottom: '2rem', textAlign: 'left' }}>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <div className="body-sm" style={{ color: 'var(--on-surface-variant)' }}>
                <strong style={{ color: 'var(--on-surface)' }}>Category:</strong> {formData.category}
              </div>
              <div className="body-sm" style={{ color: 'var(--on-surface-variant)' }}>
                <strong style={{ color: 'var(--on-surface)' }}>Quantity:</strong> {formData.quantity} units
              </div>
              <div className="body-sm" style={{ color: 'var(--on-surface-variant)' }}>
                <strong style={{ color: 'var(--on-surface)' }}>Timeline:</strong> {formData.deliveryTimeline}
              </div>
            </div>
          </div>
          <div className="animate-in animate-delay-3" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/products" className="btn btn--primary btn--lg">
              <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>inventory_2</span>
              Browse Products
            </Link>
            <Link to="/" className="btn btn--lg glass-panel">
              <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>home</span>
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="page-hero" id="quote-hero">
        <div className="container">
          <div className="glass-panel animate-in" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 1rem', borderRadius: 'var(--radius-full)', marginBottom: '1.25rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--primary-fixed-dim)' }}>request_quote</span>
            <span className="label-sm" style={{ color: 'var(--primary-fixed-dim)' }}>B2B Wholesale Procurement</span>
          </div>
          <h1 className="display-lg page-hero__title animate-in">Request a Bulk Quote</h1>
          <p className="page-hero__desc animate-in animate-delay-1">
            Fill out the form below and our specialist team will provide a customized quote
            with volume pricing, logistics, and compliance documentation within 24 hours.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section" style={{ padding: '5rem 0' }} id="quote-content">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '3rem', alignItems: 'start' }}>

            {/* Form Card */}
            <div>
              {/* Step Indicator */}
              <div style={{ display: 'flex', gap: '0', marginBottom: '2.5rem', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '1.25rem', left: '1.5rem', right: '1.5rem', height: '2px', background: 'var(--outline-variant)', zIndex: 0 }} />
                {steps.map((s) => (
                  <div
                    key={s.num}
                    style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', position: 'relative', zIndex: 1, cursor: step > s.num ? 'pointer' : 'default' }}
                    onClick={() => step > s.num && setStep(s.num)}
                  >
                    <div style={{
                      width: '2.5rem', height: '2.5rem', borderRadius: '50%',
                      background: step >= s.num ? 'linear-gradient(135deg, var(--primary-container), var(--secondary))' : 'var(--surface-container-high)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: step >= s.num ? 'var(--shadow-glow-primary)' : 'none',
                      transition: 'var(--transition-med)',
                    }}>
                      {step > s.num
                        ? <span className="material-symbols-outlined" style={{ fontSize: '1.1rem', color: '#fff' }}>check</span>
                        : <span className="material-symbols-outlined" style={{ fontSize: '1.1rem', color: step === s.num ? '#fff' : 'var(--on-surface-variant)' }}>{s.icon}</span>
                      }
                    </div>
                    <span className="label-sm" style={{ color: step >= s.num ? 'var(--primary-fixed-dim)' : 'var(--on-surface-variant)', fontWeight: step === s.num ? 700 : 400 }}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} id="quote-form">
                {/* Step 1 — Contact Info */}
                {step === 1 && (
                  <div className="glass-panel animate-in" style={{ padding: '2rem', borderRadius: 'var(--radius-xl)', display: 'grid', gap: '1.25rem' }}>
                    <div>
                      <h2 className="headline-md" style={{ marginBottom: '0.375rem' }}>Your Contact Details</h2>
                      <p className="body-sm" style={{ color: 'var(--on-surface-variant)' }}>We'll use this to send your quote and follow up.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <input type="text" className="input" placeholder="Full Name *" value={formData.name} onChange={update('name')} required id="quote-name" />
                      <input type="email" className="input" placeholder="Email Address *" value={formData.email} onChange={update('email')} required id="quote-email" />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <input type="text" className="input" placeholder="Organization / Hospital *" value={formData.organization} onChange={update('organization')} required id="quote-org" />
                      <input type="tel" className="input" placeholder="Phone Number" value={formData.phone} onChange={update('phone')} id="quote-phone" />
                    </div>
                    <input type="text" className="input" placeholder="Your Designation (e.g. Biomedical Engineer, Procurement Head)" value={formData.designation} onChange={update('designation')} id="quote-designation" />

                    <button
                      type="button"
                      className="btn btn--primary btn--lg"
                      onClick={() => setStep(2)}
                      disabled={!step1Valid}
                      style={{ width: '100%', marginTop: '0.5rem' }}
                    >
                      Continue to Order Details
                      <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>arrow_forward</span>
                    </button>
                  </div>
                )}

                {/* Step 2 — Order Details */}
                {step === 2 && (
                  <div className="glass-panel animate-in" style={{ padding: '2rem', borderRadius: 'var(--radius-xl)', display: 'grid', gap: '1.25rem' }}>
                    <div>
                      <h2 className="headline-md" style={{ marginBottom: '0.375rem' }}>Order Requirements</h2>
                      <p className="body-sm" style={{ color: 'var(--on-surface-variant)' }}>Tell us what you need and we'll configure the best offer.</p>
                    </div>

                    <div>
                      <label className="label-sm" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--on-surface-variant)' }}>Product Category *</label>
                      <select className="input" value={formData.category} onChange={update('category')} required id="quote-category" style={{ appearance: 'auto' }}>
                        <option value="">Select a category…</option>
                        {productCategories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>

                    <input type="text" className="input" placeholder="Specific Product / Device Name (optional)" value={formData.productName} onChange={update('productName')} id="quote-product" />

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <input type="number" className="input" placeholder="Quantity Required *" min="1" value={formData.quantity} onChange={update('quantity')} required id="quote-quantity" />
                      <div>
                        <select className="input" value={formData.deliveryTimeline} onChange={update('deliveryTimeline')} required id="quote-timeline" style={{ appearance: 'auto' }}>
                          <option value="">Delivery Timeline *</option>
                          {deliveryTimelines.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>

                    <input type="text" className="input" placeholder="Delivery Address / Destination Country" value={formData.deliveryAddress} onChange={update('deliveryAddress')} id="quote-address" />

                    <textarea
                      className="input"
                      placeholder="Additional requirements: compliance certifications needed, specific brand preferences, regulatory requirements, packaging, etc."
                      value={formData.additionalRequirements}
                      onChange={update('additionalRequirements')}
                      id="quote-requirements"
                      style={{ minHeight: '120px' }}
                    />

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <button type="button" className="btn btn--lg glass-panel" onClick={() => setStep(1)}>
                        <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>arrow_back</span>
                        Back
                      </button>
                      <button
                        type="button"
                        className="btn btn--primary btn--lg"
                        onClick={() => setStep(3)}
                        disabled={!step2Valid}
                      >
                        Review Quote
                        <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>arrow_forward</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3 — Review & Submit */}
                {step === 3 && (
                  <div className="animate-in" style={{ display: 'grid', gap: '1.25rem' }}>
                    <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-xl)' }}>
                      <h2 className="headline-md" style={{ marginBottom: '1.5rem' }}>Review Your Quote Request</h2>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                        {[
                          { label: 'Name', value: formData.name, icon: 'person' },
                          { label: 'Email', value: formData.email, icon: 'mail' },
                          { label: 'Organization', value: formData.organization, icon: 'business' },
                          { label: 'Phone', value: formData.phone || '—', icon: 'call' },
                          { label: 'Category', value: formData.category, icon: 'category' },
                          { label: 'Quantity', value: `${formData.quantity} units`, icon: 'numbers' },
                          { label: 'Timeline', value: formData.deliveryTimeline, icon: 'schedule' },
                          { label: 'Product', value: formData.productName || 'Not specified', icon: 'vaccines' },
                        ].map((row) => (
                          <div key={row.label} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--primary-fixed-dim)', marginTop: '2px', flexShrink: 0 }}>{row.icon}</span>
                            <div>
                              <div className="label-sm" style={{ color: 'var(--on-surface-variant)', marginBottom: '0.125rem' }}>{row.label}</div>
                              <div className="body-sm" style={{ fontWeight: 600 }}>{row.value}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {formData.additionalRequirements && (
                        <div style={{ borderTop: '1px solid var(--outline-variant)', paddingTop: '1rem' }}>
                          <div className="label-sm" style={{ color: 'var(--on-surface-variant)', marginBottom: '0.5rem' }}>Additional Requirements</div>
                          <p className="body-sm" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.7 }}>{formData.additionalRequirements}</p>
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <button type="button" className="btn btn--lg glass-panel" onClick={() => setStep(2)}>
                        <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>edit</span>
                        Edit Details
                      </button>
                      <button
                        type="submit"
                        className="btn btn--primary btn--lg"
                        disabled={submitting}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>send</span>
                        {submitting ? 'Submitting…' : 'Submit Quote Request'}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Right Sidebar */}
            <div style={{ display: 'grid', gap: '1.5rem', position: 'sticky', top: '6rem' }}>
              <div className="glass-panel animate-in animate-delay-1" style={{ padding: '1.5rem', borderRadius: 'var(--radius-xl)' }}>
                <h3 className="headline-sm" style={{ marginBottom: '1.25rem' }}>Why Quote with Us?</h3>
                <div style={{ display: 'grid', gap: '1.25rem' }}>
                  {whyItems.map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
                      <div style={{
                        width: '2rem', height: '2rem', borderRadius: '50%', flexShrink: 0,
                        background: 'var(--surface-container-high)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--primary-fixed-dim)' }}>{item.icon}</span>
                      </div>
                      <div>
                        <div className="label-sm" style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{item.title}</div>
                        <p className="body-sm" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.6 }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-panel animate-in animate-delay-2" style={{ padding: '1.5rem', borderRadius: 'var(--radius-xl)' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--secondary)', fontSize: '1.25rem' }}>headset_mic</span>
                  <h3 className="headline-sm">Need Help?</h3>
                </div>
                <p className="body-sm" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.6, marginBottom: '1rem' }}>
                  Our B2B specialists are available Mon–Fri, 9am–6pm IST.
                </p>
                <Link to="/contact" className="btn btn--lg glass-panel" style={{ width: '100%', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>mail</span>
                  Contact Sales Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Toast message={toast.message} type={toast.type} visible={toast.visible} onClose={hideToast} />
    </>
  );
}
