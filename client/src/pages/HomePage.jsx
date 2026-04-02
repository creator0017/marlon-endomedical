import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Toast, { useToast } from '../components/Toast';
import { getProducts, subscribeNewsletter } from '../services/api';

// Fallback product data when API is unavailable
const fallbackProducts = [
  {
    _id: '1', slug: 'hd-endoscopy-unit', name: 'HD Endoscopy Unit', subtitle: 'Precision 4K Visualization',
    category: 'imaging-systems', price: 'POA', inStock: true, featured: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAK9ZMPKWDLAIwRlqlD4pZ-LlBD3kVzi1Qb8NR2QRk7Yk9S5WodKDHJAGxWXFrjcpX95sGoxg1_6f_OempfxYioPo5LjPei8P6gYANZ2SivYW1E0f2Z8N8b68USgg_bR8PyhUailHrIiOi9tRdsBZknawYPBr684hTQmLSlLNpXOIm39FDVLRzZ4ZjsZtxAOLLSsohHUlpakCjMGpm_SHz0O4T_3o183sypDd0uZBRzrBRxZd9GPtvM6ptE6wZVMfpuqMCBvGzTa7s'
  },
  {
    _id: '2', slug: 'titanium-forceps-set', name: 'Titanium Forceps Set', subtitle: 'Ultra-Lightweight Grade 5',
    category: 'surgical-tools', price: 'POA', inStock: true, featured: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcz6Zza1kV_1xkHX27N4w0-ADI690N9CXe2lMOF7wLNpdy7lr6Nn0BTP8xKJ9U_JXT15KJzMLL9IJZjan9tKOXMP4mzb49mQ_nPt65AXXoOdzQAV4QSK3mi0zTM243Hwf3yiqiQLxMSbAOYfB0_xLw8PyWSSIAj_UThIeC7UqhxR6rBJ6NXwB3b3E4wFE1WRojGDUQxxdMVw4vcgsNLEQkCJMBXOxxmrYUgMys155CCQnKWxL2B073tc0dOnl4WdDFB5U5pKkMX_4'
  },
  {
    _id: '3', slug: 'digital-autoclave', name: 'Digital Autoclave', subtitle: 'Class B Vacuum Cycle',
    category: 'sterilization', price: 'POA', inStock: true, featured: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC63WRyBtDtGNZA-Tpi7W_iJLHsNKRgh-_aWwtpOGuF3krieJdpk-7VGuzXVB2V_9Rq96XlqU224Z4j2dcnjSz2whuEBeDqXR7J3yA-GMmwwwJMAnlJljuIXEMbvhR_DhQc9f93XXw6jsvfgiD3EK0a8_jYd_jOsSNS-gonZME5YwV9z6PTZbW6k7n5Gfkk7RciwOs_BQwxzSh0pXUcjj1mHQkX_7rO6hA5hxTgYtZ4gObqHEF-6uGy5X7BDnsqLK5qd2Imgp2Ifik'
  },
  {
    _id: '4', slug: 'cardiac-monitor-s7', name: 'Cardiac Monitor S7', subtitle: 'Multi-Parameter Tracking',
    category: 'monitoring', price: 'POA', inStock: true, featured: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaFZ1pnQw5Pxe483aIjiCFcCBceh3k0VjX7QlLJsuvWLAQFRvx6i7V3diFM7ca1qCEAIdir-ffzzdVPnHPhlGkH5B6ovu5TWjSQcj2jI_OTDapf2a2XW97NFRizRqN58Mt1JdTYtj3tdtqiGpqzwV7CRDYo32BObd8RDT8sjS3iQC1wgeViXZcvxQ_RugmkyS2OqwKZRgEy2g-_Mlmoh4O0gExgeTUWnxavaRna_Zb5uhh1Ww47MXWT5lnodbwwp39n4MxaBXNOPI'
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
            {/* HSN 901814 — Electro-Diagnostic */}
            <div className="bento-card bento-card--span2 glass-panel animate-in">
              <div className="bento-card__bg-icon">
                <span className="material-symbols-outlined">biotech</span>
              </div>
              <div style={{ position: 'relative', zIndex: 10 }}>
                <div className="bento-card__label">Category HSN 901814</div>
                <h3 className="headline-md" style={{ marginBottom: '1.5rem' }}>Electro-Diagnostic Apparatus</h3>
                <div className="bento-card__features">
                  <div>
                    <div className="bento-card__feature">
                      <span className="material-symbols-outlined">check_circle</span>
                      Ultrasonic Scanning
                    </div>
                    <div className="bento-card__feature" style={{ marginTop: '0.75rem' }}>
                      <span className="material-symbols-outlined">check_circle</span>
                      MRI Support Systems
                    </div>
                  </div>
                  <div>
                    <div className="bento-card__feature">
                      <span className="material-symbols-outlined">check_circle</span>
                      Scintigraphic Devices
                    </div>
                    <div className="bento-card__feature" style={{ marginTop: '0.75rem' }}>
                      <span className="material-symbols-outlined">check_circle</span>
                      Patient Monitoring
                    </div>
                  </div>
                </div>
              </div>
            </div>

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

            {/* HSN 9018 — Surgical Instruments */}
            <div className="bento-card bento-card--span2 bento-card--horizontal glass-panel animate-in animate-delay-3">
              <div className="bento-card__img-wrap">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzDmOciNw-T_lq5ei30TBkZJYef9lJoSCYSD4Qs0m-qBcftzXBYugIzy4gsR6p_Uofapn657hUPqEydftt7On9S9-fYGMud1RD9RmZtfDvGo3JefTZXoPS4XsgfOO5QglDJPQVVmiK0vNGvVtwBB9kyRxMGf_1VI8611VphYtNApa3YchPu--Y7jewQSKQSm9LGBrJr9QepvlZwViVHJDGZrS5GHubgChH9bBbxpkMNxthetEoHRE_kKxZZTBbD-XeIiRUTbZBkl0"
                  alt="Medical instrument detail"
                  loading="lazy"
                />
              </div>
              <div className="bento-card__content">
                <div className="bento-card__label">Category HSN 9018</div>
                <h3 className="headline-md" style={{ marginBottom: '1rem' }}>Surgical Instruments</h3>
                <p className="body-sm" style={{ color: 'var(--on-surface-variant)' }}>
                  Global standard instrumentation for general surgery, dental, and ophthalmic procedures.
                </p>
                <Link to="/products?category=surgical-tools" className="bento-card__link">
                  Download Specs <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </div>
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
