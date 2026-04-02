import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Toast, { useToast } from '../components/Toast';
import { getProductBySlug, submitInquiry } from '../services/api';

const fallbackProduct = {
  name: 'HD Endoscopy Unit', slug: 'hd-endoscopy-unit', category: 'imaging-systems',
  hsnCode: '901814', subtitle: 'Precision 4K Visualization',
  description: 'Professional high-definition endoscope unit with 4K resolution for next-generation minimally invasive surgical procedures. Features advanced CMOS sensor technology with superior color reproduction and 160° wide-angle optics.',
  specifications: [
    { label: 'Resolution', value: '4K Ultra HD (3840×2160)' },
    { label: 'Field of View', value: '160° Wide Angle' },
    { label: 'Light Source', value: 'LED Cold Light' },
    { label: 'Working Length', value: '310mm / 450mm' },
    { label: 'Channel Diameter', value: '2.8mm' }
  ],
  features: ['4K Ultra HD Imaging', 'LED Cold Light Source', 'Autoclavable Design', 'Ergonomic Handle', 'Wide-Angle Optics'],
  certifications: ['ISO 13485:2016', 'CE Marked', 'FDA 510(k)'],
  price: 'POA', inStock: true,
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAK9ZMPKWDLAIwRlqlD4pZ-LlBD3kVzi1Qb8NR2QRk7Yk9S5WodKDHJAGxWXFrjcpX95sGoxg1_6f_OempfxYioPo5LjPei8P6gYANZ2SivYW1E0f2Z8N8b68USgg_bR8PyhUailHrIiOi9tRdsBZknawYPBr684hTQmLSlLNpXOIm39FDVLRzZ4ZjsZtxAOLLSsohHUlpakCjMGpm_SHz0O4T_3o183sypDd0uZBRzrBRxZd9GPtvM6ptE6wZVMfpuqMCBvGzTa7s'
};

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', organization: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  useEffect(() => {
    loadProduct();
  }, [slug]);

  const loadProduct = async () => {
    setLoading(true);
    try {
      const { data } = await getProductBySlug(slug);
      setProduct(data.data);
      document.title = `${data.data.name} | Marlon Endomedical`;
    } catch {
      setProduct(fallbackProduct);
      document.title = `${fallbackProduct.name} | Marlon Endomedical`;
    } finally {
      setLoading(false);
    }
  };

  const handleInquiry = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitInquiry({
        ...formData,
        type: 'product-inquiry',
        productId: product?._id
      });
      showToast('Inquiry submitted! Our team will respond within 24 hours.', 'success');
      setFormData({ name: '', email: '', organization: '', message: '' });
    } catch (err) {
      showToast(err.response?.data?.message || 'Could not submit inquiry. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="product-detail">
        <div className="container section">
          <div className="product-detail__grid">
            <div className="skeleton" style={{ aspectRatio: '1', borderRadius: 'var(--radius-xl)' }}></div>
            <div>
              <div className="skeleton" style={{ height: 20, width: '30%', marginBottom: 16 }}></div>
              <div className="skeleton" style={{ height: 40, width: '80%', marginBottom: 16 }}></div>
              <div className="skeleton" style={{ height: 100, marginBottom: 24 }}></div>
              <div className="skeleton" style={{ height: 200 }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail" style={{ textAlign: 'center', padding: '12rem 0 6rem' }}>
        <span className="material-symbols-outlined" style={{ fontSize: '4rem', color: 'var(--outline)' }}>error_outline</span>
        <h2 className="headline-lg" style={{ margin: '1rem 0' }}>Product not found</h2>
        <Link to="/products" className="btn btn--primary">Back to Catalog</Link>
      </div>
    );
  }

  const categoryLabel = product.category?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="product-detail" id="product-detail-page">
      <div className="container section" style={{ paddingTop: '2rem' }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: '2rem', display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--on-surface-variant)', fontSize: '0.8125rem' }}>
          <Link to="/" style={{ color: 'var(--on-surface-variant)' }}>Home</Link>
          <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>chevron_right</span>
          <Link to="/products" style={{ color: 'var(--on-surface-variant)' }}>Products</Link>
          <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>chevron_right</span>
          <span style={{ color: 'var(--on-surface)' }}>{product.name}</span>
        </div>

        <div className="product-detail__grid">
          {/* Image */}
          <div className="product-detail__image animate-in">
            <img src={product.image} alt={product.name} />
            {product.inStock && (
              <div style={{
                position: 'absolute', top: '1rem', right: '1rem',
                background: 'var(--secondary)', color: 'var(--on-secondary)',
                padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)',
                fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase'
              }}>
                In Stock
              </div>
            )}
          </div>

          {/* Info */}
          <div className="product-detail__info animate-in animate-delay-1">
            <div>
              <div className="product-detail__category">{categoryLabel} · HSN {product.hsnCode}</div>
              <h1 className="headline-lg" style={{ margin: '0.5rem 0' }}>{product.name}</h1>
              <p className="body-md" style={{ color: 'var(--on-surface-variant)', marginBottom: '0.5rem' }}>
                {product.subtitle}
              </p>
            </div>

            <p className="body-md" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8 }}>
              {product.description}
            </p>

            {/* Specifications */}
            {product.specifications && product.specifications.length > 0 && (
              <div>
                <h3 className="headline-sm" style={{ marginBottom: '1rem' }}>Specifications</h3>
                <div className="product-detail__specs">
                  {product.specifications.map((spec, i) => (
                    <div key={i} className="spec-item">
                      <div className="spec-item__label">{spec.label}</div>
                      <div className="spec-item__value">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="headline-sm" style={{ marginBottom: '1rem' }}>Key Features</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {product.features.map((feat, i) => (
                    <span key={i} style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                      background: 'var(--surface-container)', padding: '0.5rem 0.75rem',
                      borderRadius: 'var(--radius-md)', fontSize: '0.8125rem', fontWeight: 600
                    }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--primary)' }}>check_circle</span>
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {product.certifications && product.certifications.length > 0 && (
              <div>
                <h3 className="headline-sm" style={{ marginBottom: '1rem' }}>Certifications</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {product.certifications.map((cert, i) => (
                    <span key={i} className="cert-badge">
                      <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>verified</span>
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Inquiry Form */}
        <div style={{ marginTop: '5rem', maxWidth: '640px', margin: '5rem auto 0' }} id="product-inquiry-section">
          <h2 className="headline-md" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
            Request Product Inquiry
          </h2>
          <p className="body-md" style={{ textAlign: 'center', color: 'var(--on-surface-variant)', marginBottom: '2rem' }}>
            Interested in the {product.name}? Fill out the form below and our specialists will get back to you.
          </p>

          <form className="contact-form" onSubmit={handleInquiry} id="product-inquiry-form">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input
                type="text" className="input" placeholder="Your Name"
                value={formData.name} onChange={e => setFormData(p => ({...p, name: e.target.value}))}
                required id="inquiry-name"
              />
              <input
                type="email" className="input" placeholder="Email Address"
                value={formData.email} onChange={e => setFormData(p => ({...p, email: e.target.value}))}
                required id="inquiry-email"
              />
            </div>
            <input
              type="text" className="input" placeholder="Organization Name"
              value={formData.organization} onChange={e => setFormData(p => ({...p, organization: e.target.value}))}
              id="inquiry-org"
            />
            <textarea
              className="input" placeholder="Tell us about your requirements (quantity, delivery timeline, etc.)"
              value={formData.message} onChange={e => setFormData(p => ({...p, message: e.target.value}))}
              id="inquiry-message"
            />
            <button type="submit" className="btn btn--primary btn--lg" disabled={submitting} id="inquiry-submit" style={{ width: '100%' }}>
              {submitting ? 'Submitting...' : 'Submit Inquiry'}
            </button>
          </form>
        </div>
      </div>
      <Toast message={toast.message} type={toast.type} visible={toast.visible} onClose={hideToast} />
    </div>
  );
}
