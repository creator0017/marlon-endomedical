import { useState, useEffect } from 'react';
import Toast, { useToast } from '../components/Toast';
import { submitInquiry } from '../services/api';

const contactInfo = [
  {
    icon: 'location_on',
    title: 'Headquarters',
    lines: ['Marlon Endomedical Devices Pvt Ltd', 'Industrial Area, Phase-II', 'Chandigarh, India 160002']
  },
  {
    icon: 'call',
    title: 'Phone',
    lines: ['+91 98765 43210', '+91 172 456 7890']
  },
  {
    icon: 'mail',
    title: 'Email',
    lines: ['sales@marlonendomedical.com', 'support@marlonendomedical.com']
  },
  {
    icon: 'schedule',
    title: 'Business Hours',
    lines: ['Monday – Friday: 9:00 AM – 6:00 PM', 'Saturday: 10:00 AM – 2:00 PM']
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', organization: '', phone: '', message: '', type: 'general-contact'
  });
  const [submitting, setSubmitting] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  useEffect(() => {
    document.title = 'Contact Us | Marlon Endomedical';
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitInquiry(formData);
      showToast('Message sent successfully! Our team will respond within 24 hours.', 'success');
      setFormData({ name: '', email: '', organization: '', phone: '', message: '', type: 'general-contact' });
    } catch (err) {
      showToast(err.response?.data?.message || 'Could not send message. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const update = (field) => (e) => setFormData(p => ({ ...p, [field]: e.target.value }));

  return (
    <>
      {/* Page Hero */}
      <section className="page-hero" id="contact-hero">
        <div className="container">
          <h1 className="display-lg page-hero__title animate-in">Contact Us</h1>
          <p className="page-hero__desc animate-in animate-delay-1">
            Have questions about our products, pricing, or logistics? Our specialist team
            is ready to help you find the right solutions for your facility.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section" style={{ padding: '5rem 0' }} id="contact-content">
        <div className="container">
          <div className="contact-grid">
            {/* Form */}
            <div className="animate-in">
              <h2 className="headline-md" style={{ marginBottom: '0.5rem' }}>Send us a Message</h2>
              <p className="body-md" style={{ color: 'var(--on-surface-variant)', marginBottom: '2rem' }}>
                Fill out the form and our team will get back to you within 24 hours.
              </p>

              <form className="contact-form" onSubmit={handleSubmit} id="contact-form">
                {/* Inquiry Type */}
                <div>
                  <label className="label-sm" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--on-surface-variant)' }}>
                    Inquiry Type
                  </label>
                  <select
                    className="input"
                    value={formData.type}
                    onChange={update('type')}
                    id="contact-type"
                    style={{ appearance: 'auto' }}
                  >
                    <option value="general-contact">General Inquiry</option>
                    <option value="bulk-quote">Bulk Quote Request</option>
                    <option value="product-inquiry">Product Inquiry</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <input
                    type="text" className="input" placeholder="Full Name *"
                    value={formData.name} onChange={update('name')}
                    required id="contact-name"
                  />
                  <input
                    type="email" className="input" placeholder="Email Address *"
                    value={formData.email} onChange={update('email')}
                    required id="contact-email"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <input
                    type="text" className="input" placeholder="Organization"
                    value={formData.organization} onChange={update('organization')}
                    id="contact-org"
                  />
                  <input
                    type="tel" className="input" placeholder="Phone Number"
                    value={formData.phone} onChange={update('phone')}
                    id="contact-phone"
                  />
                </div>

                <textarea
                  className="input" placeholder="How can we help you? *"
                  value={formData.message} onChange={update('message')}
                  required id="contact-message"
                />

                <button type="submit" className="btn btn--primary btn--lg" disabled={submitting} id="contact-submit" style={{ width: '100%' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>send</span>
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="animate-in animate-delay-2">
              <h2 className="headline-md" style={{ marginBottom: '0.5rem' }}>Get in Touch</h2>
              <p className="body-md" style={{ color: 'var(--on-surface-variant)', marginBottom: '2rem' }}>
                Reach out through any of the following channels.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {contactInfo.map((info, i) => (
                  <div key={i} className="contact-info-card">
                    <div className="contact-info-card__icon">
                      <span className="material-symbols-outlined">{info.icon}</span>
                    </div>
                    <div>
                      <h4 style={{ fontWeight: 700, marginBottom: '0.375rem' }}>{info.title}</h4>
                      {info.lines.map((line, j) => (
                        <div key={j} className="body-sm" style={{ color: 'var(--on-surface-variant)' }}>
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Google Maps Embed */}
              <div className="map-embed">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13718.657369925877!2d76.7607!3d30.7046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fee5e6c00002b%3A0x7694c94d00d511bb!2sIndustrial%20Area%20Phase%20II%2C%20Chandigarh!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Marlon Endomedical Office Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Toast message={toast.message} type={toast.type} visible={toast.visible} onClose={hideToast} />
    </>
  );
}
