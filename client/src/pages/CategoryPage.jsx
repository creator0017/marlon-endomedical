import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';

const categoryMeta = {
  'surgical-tools': {
    label: 'Surgical Tools',
    icon: 'vaccines',
    accentColor: 'var(--primary-container)',
    glowColor: 'rgba(0,74,153,0.35)',
    tagline: 'Precision instruments trusted in operating theatres worldwide',
    description: 'Our surgical tools portfolio covers the full spectrum of open and minimally invasive procedures — from laparoscopic graspers and electrosurgical generators to specialty scissors, retractors, and needle drivers. Every instrument is manufactured to exacting tolerances and distributed under our ISO 13485:2016 quality program.',
    highlights: [
      { icon: 'precision_manufacturing', label: 'Grade 5 Titanium & 316L Stainless Steel' },
      { icon: 'verified', label: 'ISO 13485 & CE Certified' },
      { icon: 'autorenew', label: 'Reusable & Single-Use Options' },
      { icon: 'local_shipping', label: 'Sterilisation-ready Packaging' },
    ],
    useCases: ['General Surgery', 'Laparoscopic Surgery', 'Orthopaedics', 'Gynaecology', 'ENT', 'Urology'],
    hsnCode: '9018',
  },
  'imaging-systems': {
    label: 'Imaging Systems',
    icon: 'radiology',
    accentColor: 'var(--secondary)',
    glowColor: 'rgba(0,106,102,0.35)',
    tagline: 'See more, treat better — advanced visualisation for clinical excellence',
    description: 'From 4K endoscopy cameras and flexible bronchoscopes to digital X-ray and portable ultrasound, our imaging systems bring next-generation clinical visualisation to surgical suites and diagnostic departments. All systems are sourced from globally certified OEM manufacturers with full CE and CDSCO compliance.',
    highlights: [
      { icon: 'hd', label: '4K Ultra HD & Full HD Options' },
      { icon: 'bolt', label: 'LED Cold-Light Technology' },
      { icon: 'settings_input_composite', label: 'DICOM & HIS/RIS Compatible' },
      { icon: 'support_agent', label: 'Installation & Training Included' },
    ],
    useCases: ['Endoscopy', 'Laparoscopy', 'Radiology', 'Bronchoscopy', 'Cystoscopy', 'ERCP'],
    hsnCode: '9018 / 9022',
  },
  diagnostics: {
    label: 'Diagnostics Equipment',
    icon: 'biotech',
    accentColor: '#0891b2',
    glowColor: 'rgba(8,145,178,0.3)',
    tagline: 'Accurate diagnostics at the point of care and in the laboratory',
    description: 'Our diagnostics range spans point-of-care analysers, haematology and biochemistry systems, pulse oximeters, spirometers, and rapid test platforms. Designed for hospital labs, emergency departments, and outpatient clinics, these instruments deliver clinical-grade accuracy with minimal maintenance requirements.',
    highlights: [
      { icon: 'speed', label: 'Rapid Result Turnaround' },
      { icon: 'network_check', label: 'LIS Connectivity' },
      { icon: 'science', label: 'WHO Pre-qualified Reagents' },
      { icon: 'straighten', label: 'Wide Measurement Range' },
    ],
    useCases: ['Pathology Labs', 'Emergency Medicine', 'ICU', 'OPD', 'Blood Banks', 'Point-of-Care'],
    hsnCode: '9027 / 9018',
  },
  monitoring: {
    label: 'Patient Monitoring',
    icon: 'monitor_heart',
    accentColor: '#7c3aed',
    glowColor: 'rgba(124,58,237,0.25)',
    tagline: 'Continuous, reliable monitoring for critical and general care',
    description: 'Multi-parameter patient monitors, bedside telemetry, central monitoring stations, waveform capnographs, and foetal monitors — our monitoring portfolio covers ICU, CCU, NICU, OT, and general ward applications. Systems integrate with major HIS platforms and support standard communication protocols.',
    highlights: [
      { icon: 'favorite', label: 'ECG, SpO2, NIBP, EtCO2 Parameters' },
      { icon: 'wifi', label: 'Wireless & Wired Connectivity' },
      { icon: 'screenshot_monitor', label: 'Central Station Compatible' },
      { icon: 'battery_charging_full', label: 'Extended Battery Backup' },
    ],
    useCases: ['ICU / CCU', 'Operating Theatre', 'NICU / PICU', 'Step-Down Units', 'Emergency', 'Wards'],
    hsnCode: '9018 / 9019',
  },
  sterilization: {
    label: 'Sterilization Systems',
    icon: 'sanitizer',
    accentColor: '#059669',
    glowColor: 'rgba(5,150,105,0.3)',
    tagline: 'Infection control solutions that protect patients and staff',
    description: 'Our sterilisation portfolio includes Class B pre-vacuum and gravity autoclaves, ETO sterilisers, low-temperature plasma systems, UV disinfection units, and washer-disinfectors. Compliant with EN 13060, ISO 11135, and ISO 15883 standards, these systems are engineered for hospital CSSD and operating theatre use.',
    highlights: [
      { icon: 'check_circle', label: 'EN 13060 & ISO 11135 Compliant' },
      { icon: 'data_usage', label: 'Digital Cycle Documentation' },
      { icon: 'thermostat', label: 'Multiple Cycle Programs' },
      { icon: 'timer', label: 'Rapid Cycle Options Available' },
    ],
    useCases: ['CSSD', 'Operating Theatre', 'Dental Clinics', 'Endoscopy Units', 'Laboratory', 'Day Surgery'],
    hsnCode: '8419 / 9018',
  },
  'spine-surgery': {
    label: 'Spine Surgery',
    icon: 'orthopedics',
    accentColor: '#c2410c',
    glowColor: 'rgba(194,65,12,0.3)',
    tagline: 'Precision endoscopic instruments for minimally invasive spine surgery',
    description: 'Marlon Endomedical\'s spine surgery portfolio includes transforaminal and interlaminar endoscopes, interlaminar stenoscopes, complete UBE (Unilateral Biportal Endoscopy) instrument sets, and bipolar RF probes — all engineered specifically for percutaneous endoscopic spine procedures. Every instrument is manufactured from 316L stainless steel with autoclave-grade build quality and is compatible with the Marlon HD Camera and LED Light Source tower.',
    highlights: [
      { icon: 'precision_manufacturing', label: 'Transforaminal & Interlaminar Endoscopes' },
      { icon: 'inventory_2', label: 'Complete 12-Piece UBE Instrument Set' },
      { icon: 'bolt', label: 'Bipolar RF Probes for Haemostasis' },
      { icon: 'hd', label: 'Compatible with Marlon HD Camera Tower' },
    ],
    useCases: ['Lumbar Discectomy (PELD)', 'Spinal Stenosis Decompression', 'UBE Procedures', 'Cervical Endoscopy', 'Annuloplasty', 'Facet Denervation'],
    hsnCode: '901814',
  },
};

const fallbackProducts = {
  'surgical-tools': [
    { _id: 's1', slug: 'titanium-forceps-set', name: 'Titanium Forceps Set', subtitle: 'Ultra-Lightweight Grade 5', category: 'surgical-tools', price: 'POA', inStock: true, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcz6Zza1kV_1xkHX27N4w0-ADI690N9CXe2lMOF7wLNpdy7lr6Nn0BTP8xKJ9U_JXT15KJzMLL9IJZjan9tKOXMP4mzb49mQ_nPt65AXXoOdzQAV4QSK3mi0zTM243Hwf3yiqiQLxMSbAOYfB0_xLw8PyWSSIAj_UThIeC7UqhxR6rBJ6NXwB3b3E4wFE1WRojGDUQxxdMVw4vcgsNLEQkCJMBXOxxmrYUgMys155CCQnKWxL2B073tc0dOnl4WdDFB5U5pKkMX_4' },
    { _id: 's2', slug: 'surgical-scalpel-kit', name: 'Surgical Scalpel Kit', subtitle: 'Carbon Steel Precision Blades', category: 'surgical-tools', price: 'POA', inStock: true, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzDmOciNw-T_lq5ei30TBkZJYef9lJoSCYSD4Qs0m-qBcftzXBYugIzy4gsR6p_Uofapn657hUPqEydftt7On9S9-fYGMud1RD9RmZtfDvGo3JefTZXoPS4XsgfOO5QglDJPQVVmiK0vNGvVtwBB9kyRxMGf_1VI8611VphYtNApa3YchPu--Y7jewQSKQSm9LGBrJr9QepvlZwViVHJDGZrS5GHubgChH9bBbxpkMNxthetEoHRE_kKxZZTBbD-XeIiRUTbZBkl0' },
    { _id: 's3', slug: 'electrosurgical-generator', name: 'Electrosurgical Generator', subtitle: 'Advanced Bipolar/Monopolar ESU', category: 'surgical-tools', price: 'POA', inStock: false, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhL9JEg8RNSg-uSLPMNeIOePxJpuNtp9FEMr6G1U4u2P8fKI1O40vgmKILqjNkAq2_SmA3hH5s3u1mDNd99crWD0VGeXBRFob7Wi9S18YIf5H5vYYl1Mqsr_GAlsHZ-2Gu_6UVtUgZpDyPR-307x8N4auvGptjWoV5FUmbXCqUeJ71hJfWVStnU3zuvJAzy6Vn-pnYUfhIxqoWOz-VWkap1Mu_AtSP6iV-3UdhnXxt0u3N2i70TbmCPcTnI_BRgwdRlRSWrstb5y0' },
  ],
  'imaging-systems': [
    { _id: 'i1', slug: 'hd-endoscopy-unit', name: 'HD Endoscopy Unit', subtitle: 'Precision 4K Visualization', category: 'imaging-systems', price: 'POA', inStock: true, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAK9ZMPKWDLAIwRlqlD4pZ-LlBD3kVzi1Qb8NR2QRk7Yk9S5WodKDHJAGxWXFrjcpX95sGoxg1_6f_OempfxYioPo5LjPei8P6gYANZ2SivYW1E0f2Z8N8b68USgg_bR8PyhUailHrIiOi9tRdsBZknawYPBr684hTQmLSlLNpXOIm39FDVLRzZ4ZjsZtxAOLLSsohHUlpakCjMGpm_SHz0O4T_3o183sypDd0uZBRzrBRxZd9GPtvM6ptE6wZVMfpuqMCBvGzTa7s' },
    { _id: 'i2', slug: 'laparoscopic-camera-system', name: 'Laparoscopic Camera System', subtitle: 'Full HD 1080p Surgical Vision', category: 'imaging-systems', price: 'POA', inStock: true, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhL9JEg8RNSg-uSLPMNeIOePxJpuNtp9FEMr6G1U4u2P8fKI1O40vgmKILqjNkAq2_SmA3hH5s3u1mDNd99crWD0VGeXBRFob7Wi9S18YIf5H5vYYl1Mqsr_GAlsHZ-2Gu_6UVtUgZpDyPR-307x8N4auvGptjWoV5FUmbXCqUeJ71hJfWVStnU3zuvJAzy6Vn-pnYUfhIxqoWOz-VWkap1Mu_AtSP6iV-3UdhnXxt0u3N2i70TbmCPcTnI_BRgwdRlRSWrstb5y0' },
  ],
  diagnostics: [
    { _id: 'd1', slug: 'pulse-oximeter-pro', name: 'Pulse Oximeter Pro', subtitle: 'Clinical-Grade SpO2 Monitoring', category: 'diagnostics', price: 'POA', inStock: true, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKY8m_2TN6EfCD1fief0R5ABF7yoHZWzp6nNgv0G_yy10naGiobzRWH2SG2J3atVu3vTHgUuau-KP-j9HPNSL3G9vo5TYIcVCjgP4sqWE0lWkWmCuG0D462TM83f16oxaUD9I1mkDEYeTNGJXBXLvpyS04WF8nJWv8wVFyuxRmLJdkkYwiO6o5fr2j7Z65f5P_sEAo04EvB3XJIBkVSLPK9oVPjcrxJKIX5sRi15-UczFp8zU8fV1D2BQA-iUQySyEzLAPtDXJSUs' },
  ],
  monitoring: [
    { _id: 'm1', slug: 'cardiac-monitor-s7', name: 'Cardiac Monitor S7', subtitle: 'Multi-Parameter Tracking', category: 'monitoring', price: 'POA', inStock: true, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaFZ1pnQw5Pxe483aIjiCFcCBceh3k0VjX7QlLJsuvWLAQFRvx6i7V3diFM7ca1qCEAIdir-ffzzdVPnHPhlGkH5B6ovu5TWjSQcj2jI_OTDapf2a2XW97NFRizRqN58Mt1JdTYtj3tdtqiGpqzwV7CRDYo32BObd8RDT8sjS3iQC1wgeViXZcvxQ_RugmkyS2OqwKZRgEy2g-_Mlmoh4O0gExgeTUWnxavaRna_Zb5uhh1Ww47MXWT5lnodbwwp39n4MxaBXNOPI' },
  ],
  sterilization: [
    { _id: 'st1', slug: 'digital-autoclave', name: 'Digital Autoclave', subtitle: 'Class B Vacuum Cycle', category: 'sterilization', price: 'POA', inStock: true, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC63WRyBtDtGNZA-Tpi7W_iJLHsNKRgh-_aWwtpOGuF3krieJdpk-7VGuzXVB2V_9Rq96XlqU224Z4j2dcnjSz2whuEBeDqXR7J3yA-GMmwwwJMAnlJljuIXEMbvhR_DhQc9f93XXw6jsvfgiD3EK0a8_jYd_jOsSNS-gonZME5YwV9z6PTZbW6k7n5Gfkk7RciwOs_BQwxzSh0pXUcjj1mHQkX_7rO6hA5hxTgYtZ4gObqHEF-6uGy5X7BDnsqLK5qd2Imgp2Ifik' },
  ],
};

export default function CategoryPage() {
  const { category } = useParams();
  const meta = categoryMeta[category];
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (meta) document.title = `${meta.label} | Marlon Endomedical`;
    loadProducts();
  }, [category]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const { data } = await getProducts({ category, limit: 6 });
      setProducts(data.data);
    } catch {
      setProducts(fallbackProducts[category] || []);
    } finally {
      setLoading(false);
    }
  };

  // Unknown category
  if (!meta) {
    return (
      <section className="page-hero" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="headline-lg" style={{ marginBottom: '1rem' }}>Category not found</h1>
          <Link to="/products" className="btn btn--primary">Browse All Products</Link>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="page-hero" id={`cat-hero-${category}`}>
        <div className="container">
          {/* Breadcrumb */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.8125rem', color: 'var(--on-surface-variant)' }}>
            <Link to="/" style={{ color: 'var(--on-surface-variant)' }}>Home</Link>
            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>chevron_right</span>
            <Link to="/products" style={{ color: 'var(--on-surface-variant)' }}>Products</Link>
            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>chevron_right</span>
            <span style={{ color: 'var(--on-surface)' }}>{meta.label}</span>
          </div>

          <div className="glass-panel animate-in" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.625rem', padding: '0.375rem 1rem', borderRadius: 'var(--radius-full)', marginBottom: '1.25rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--primary-fixed-dim)' }}>{meta.icon}</span>
            <span className="label-sm" style={{ color: 'var(--primary-fixed-dim)' }}>HSN {meta.hsnCode}</span>
          </div>
          <h1 className="display-lg page-hero__title animate-in">{meta.label}</h1>
          <p className="page-hero__desc animate-in animate-delay-1" style={{ maxWidth: '640px' }}>
            {meta.tagline}
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="section" style={{ padding: '5rem 0' }} id={`cat-overview-${category}`}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
            <div className="animate-in">
              <div className="label-sm" style={{ color: 'var(--primary-fixed-dim)', marginBottom: '0.75rem' }}>Category Overview</div>
              <h2 className="headline-lg" style={{ marginBottom: '1.25rem' }}>{meta.label}</h2>
              <p className="body-lg" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.85, marginBottom: '1.5rem' }}>
                {meta.description}
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to={`/products?category=${category}`} className="btn btn--primary">
                  <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>grid_view</span>
                  View All {meta.label}
                </Link>
                <Link to="/quote" className="btn glass-panel">
                  <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>request_quote</span>
                  Get a Quote
                </Link>
              </div>
            </div>

            <div className="animate-in animate-delay-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {meta.highlights.map((h, i) => (
                <div key={i} className="glass-panel" style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '1.5rem', color: meta.accentColor, display: 'block', marginBottom: '0.5rem' }}>{h.icon}</span>
                  <span className="body-sm" style={{ fontWeight: 600, lineHeight: 1.5 }}>{h.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section style={{ background: 'var(--surface-container-low)', padding: '3.5rem 0' }} id={`cat-usecases-${category}`}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div className="label-sm" style={{ color: 'var(--primary-fixed-dim)', marginBottom: '0.5rem' }}>Applications</div>
            <h3 className="headline-md">Common Clinical Use Cases</h3>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
            {meta.useCases.map((uc, i) => (
              <span key={i} className="glass-panel" style={{ padding: '0.5rem 1.125rem', borderRadius: 'var(--radius-full)', fontSize: '0.875rem', fontWeight: 600 }}>
                {uc}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section" style={{ padding: '5rem 0' }} id={`cat-products-${category}`}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div className="label-sm" style={{ color: 'var(--primary-fixed-dim)', marginBottom: '0.5rem' }}>Featured</div>
              <h2 className="headline-lg">Popular {meta.label}</h2>
            </div>
            <Link to={`/products?category=${category}`} style={{ color: 'var(--primary-fixed-dim)', fontSize: '0.875rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
              View full catalog
              <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>arrow_forward</span>
            </Link>
          </div>

          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {[1, 2, 3].map((n) => (
                <div key={n} className="skeleton" style={{ height: '380px', borderRadius: 'var(--radius-xl)' }} />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {products.map((p, i) => (
                <div key={p._id || p.slug} className={`animate-in animate-delay-${(i % 4) + 1}`}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: 'var(--on-surface-variant)', display: 'block', marginBottom: '1rem' }}>inventory_2</span>
              <p className="body-md" style={{ color: 'var(--on-surface-variant)', marginBottom: '1.5rem' }}>Products coming soon. Contact us for availability.</p>
              <Link to="/contact" className="btn btn--primary">Contact Sales</Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id={`cat-cta-${category}`}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="headline-lg" style={{ color: 'var(--on-primary)', marginBottom: '1rem' }}>
            Need {meta.label} for Your Facility?
          </h2>
          <p style={{ color: 'var(--primary-fixed)', fontSize: '1.125rem', marginBottom: '2rem' }}>
            Get customised volume pricing and full compliance documentation within 24 hours.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/quote" className="btn btn--cta btn--lg">
              Request a Quote
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <Link to="/certifications" className="btn btn--lg" style={{ background: 'rgba(255,255,255,0.15)', color: 'var(--on-primary)', border: '1px solid rgba(255,255,255,0.3)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>workspace_premium</span>
              View Certifications
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
