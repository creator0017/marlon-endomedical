import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Toast, { useToast } from '../components/Toast';
import { getProducts, subscribeNewsletter } from '../services/api';

// Fallback product data when API is unavailable
const fallbackProducts = [
  {
    _id: '1', slug: 'anterior-cervical-fixation-system-iiia-bone-plate', name: 'Anterior Cervical Fixation System (IIIA Bone Plate)', subtitle: 'Anterior Cervical Plate System for ACDF Procedures',
    category: 'spine-surgery', price: 'POA', inStock: true, featured: true,
    image: '/products/anterior-cervical-fixation-system-iiia.png'
  },
  {
    _id: '2', slug: 'posterior-cervical-fixation-system-zj-plate-series', name: 'Posterior Cervical Fixation System (ZJ Plate Series)', subtitle: 'Posterior Cervical Plate & Screw Fixation System',
    category: 'spine-surgery', price: 'POA', inStock: true, featured: true,
    image: '/products/posterior-cervical-fixation-system-zj.png'
  },
  {
    _id: '3', slug: 'cf-posterior-spinal-internal-fixator-u6-u7-series', name: 'CF Posterior Spinal Internal Fixator (U6 / U7 Series)', subtitle: 'Posterior Pedicle Screw Fixation System',
    category: 'spine-surgery', price: 'POA', inStock: true, featured: true,
    image: '/products/cf-posterior-fixator-u6-u7.png'
  },
  {
    _id: '4', slug: 'rz-iic-peek-3d-printing-lumbar-cage', name: 'RZ-IIC PEEK and 3D Printing Lumbar Cage', subtitle: 'PEEK & 3D Printed Titanium Lumbar Interbody Cage',
    category: 'spine-surgery', price: 'POA', inStock: true, featured: true,
    image: '/products/rz-iic-peek-3d-lumbar-cage.png'
  }
];

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  useEffect(() => {
    document.title = 'Marlon Endomedical | Precision Surgical Solutions';
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await getProducts({ limit: 4, featured: true });
      setProducts(data.data);
    } catch {
      setProducts(fallbackProducts);
    } finally {
      setLoading(false);
    }
  };

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      const { data } = await subscribeNewsletter({ email });
      showToast(data.message, 'success');
      setEmail('');
    } catch (err) {
      showToast(err.response?.data?.message || 'Could not subscribe. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* ═══ HERO SECTION ═══ */}
      <section className="hero" id="hero-section">
        <div className="hero__bg">
          <div className="hero__bg-radial"></div>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhL9JEg8RNSg-uSLPMNeIOePxJpuNtp9FEMr6G1U4u2P8fKI1O40vgmKILqjNkAq2_SmA3hH5s3u1mDNd99crWD0VGeXBRFob7Wi9S18YIf5H5vYYl1Mqsr_GAlsHZ-2Gu_6UVtUgZpDyPR-307x8N4auvGptjWoV5FUmbXCqUeJ71hJfWVStnU3zuvJAzy6Vn-pnYUfhIxqoWOz-VWkap1Mu_AtSP6iV-3UdhnXxt0u3N2i70TbmCPcTnI_BRgwdRlRSWrstb5y0"
            alt="Surgical instrumentation background"
          />
        </div>

        <div className="hero__content">
          <div className="hero__text animate-in">
            <div className="hero__badge">
              <span className="hero__badge-dot"></span>
              Precision Engineering
            </div>

            <h1 className="hero__title text-glow">
              Advanced Endomedical <span>Precision</span>
            </h1>

            <p className="hero__desc">
              Wholesale Surgical Solutions for the next generation of operating theaters.
              Marlon Endomedical delivers hospital-grade instrumentation with surgical-level accuracy.
            </p>

            <div className="hero__cta">
              <Link to="/contact" className="btn btn--primary btn--lg" id="hero-cta-quote">
                Request Bulk Quote
              </Link>
              <Link to="/products" className="btn btn--secondary btn--lg" id="hero-cta-catalog">
                View Catalog
              </Link>
            </div>
          </div>

          <div className="hero__visual animate-in animate-delay-2">
            <div className="hero__visual-glow"></div>
            <div className="hero__visual-frame glass-panel">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKY8m_2TN6EfCD1fief0R5ABF7yoHZWzp6nNgv0G_yy10naGiobzRWH2SG2J3atVu3vTHgUuau-KP-j9HPNSL3G9vo5TYIcVCjgP4sqWE0lWkWmCuG0D462TM83f16oxaUD9I1mkDEYeTNGJXBXLvpyS04WF8nJWv8wVFyuxRmLJdkkYwiO6o5fr2j7Z65f5P_sEAo04EvB3XJIBkVSLPK9oVPjcrxJKIX5sRi15-UczFp8zU8fV1D2BQA-iUQySyEzLAPtDXJSUs"
                alt="Surgical laparoscope device"
              />
              <div className="hero__model-badge glass-panel">
                <div className="hero__model-label">Model Series</div>
                <div className="hero__model-name">MAR-L900 X</div>
                <div className="hero__stars">
                  {[1,2,3,4,5].map(i => (
                    <span key={i} className="material-symbols-outlined icon-filled">star</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ REGULATORY EXCELLENCE (Bento Grid) ═══ */}
      <section className="section" style={{ background: 'var(--surface-container-low)', padding: '6rem 0' }} id="regulatory-section">
        <div className="container">
          <div style={{ marginBottom: '4rem' }}>
            <h2 className="headline-lg animate-in" style={{ marginBottom: '1rem' }}>Regulatory Excellence</h2>
            <p className="body-md" style={{ color: 'var(--on-surface-variant)', maxWidth: '600px' }}>
              Compliance-first logistics for HSN 901814 and 9018 medical instrument categories.
            </p>
          </div>

          <div className="bento-grid">
            {/* ISO Certification */}
            <div className="bento-card bento-card--iso glass-panel animate-in animate-delay-1">
              <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: 'var(--primary-fixed-dim)' }}>verified_user</span>
              <div>
                <h3 className="headline-md" style={{ marginBottom: '0.5rem' }}>ISO 13485:2016</h3>
                <p className="body-sm" style={{ color: 'var(--on-surface-variant)' }}>
                  International standards for medical device quality management systems.
                </p>
              </div>
            </div>

            {/* Stat */}
            <div className="bento-card bento-stat glass-panel animate-in animate-delay-2">
              <div className="bento-stat__number">12+</div>
              <div className="bento-stat__label">Years Excellence</div>
            </div>

            </div>
        </div>
      </section>

      {/* ═══ PRODUCTS SECTION ═══ */}
      <section className="section" style={{ padding: '6rem 0' }} id="products-section">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '4rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem' }}>
              <div style={{ maxWidth: '640px' }}>
                <h2 className="headline-lg" style={{ marginBottom: '1.5rem' }}>
                  Wholesaler &amp; Distributor of Medical/Surgical Devices
                </h2>
                <p className="body-md" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.7 }}>
                  Marlon Endomedical Devices Pvt Ltd serves as the strategic partner for Mannat Hospital
                  and tier-1 medical facilities worldwide. We specialize in bulk procurement and rapid
                  global logistics for high-stakes medical environments.
                </p>
              </div>
              <div className="stats-row">
                <div className="stat-chip glass-panel">
                  <div className="stat-chip__value">5.0</div>
                  <div className="stat-chip__label">Global Rating</div>
                </div>
                <div className="stat-chip glass-panel">
                  <div className="stat-chip__value stat-chip__value--accent">24H</div>
                  <div className="stat-chip__label">Avg. Response</div>
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="product-grid">
              {[1,2,3,4].map(i => (
                <div key={i} style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
                  <div className="skeleton" style={{ height: 250 }}></div>
                  <div style={{ padding: '1rem' }}>
                    <div className="skeleton" style={{ height: 20, marginBottom: 8 }}></div>
                    <div className="skeleton" style={{ height: 14, width: '60%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="product-grid">
              {products.map((product, i) => (
                <div key={product._id} className={`animate-in animate-delay-${i + 1}`}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/products" className="btn btn--secondary" id="view-all-products">
              View All Products
              <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ CTA / NEWSLETTER ═══ */}
      <section className="cta-section" id="newsletter-section">
        <div className="container">
          <h2 className="headline-lg cta-section__title" style={{ marginBottom: '1.5rem' }}>
            Partner with Marlon Endomedical
          </h2>
          <p className="cta-section__desc">
            Connect with our wholesale experts for bulk pricing and specialized logistics for your medical facility.
          </p>
          <form className="cta-section__form" onSubmit={handleNewsletter} id="newsletter-form">
            <input
              type="email"
              className="input input--glass"
              placeholder="Organization Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              id="newsletter-email"
            />
            <button type="submit" className="btn btn--cta" disabled={submitting} id="newsletter-submit">
              {submitting ? 'Connecting...' : 'Connect with Sales'}
            </button>
          </form>
        </div>
      </section>

      <Toast message={toast.message} type={toast.type} visible={toast.visible} onClose={hideToast} />
    </>
  );
}
