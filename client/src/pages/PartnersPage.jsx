import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const partnerTypes = [
  {
    icon: 'local_hospital',
    title: 'Hospital & Health System Partners',
    desc: 'Tier-1 hospitals and multi-facility health systems that have established supply agreements with Marlon Endomedical for surgical instruments, imaging systems, and diagnostics. These partners receive priority pricing, dedicated account management, and guaranteed stock allocation.',
    benefits: ['Volume-based pricing tiers', 'Dedicated account manager', 'Priority stock allocation', 'On-site technical support'],
    accentColor: 'var(--primary-container)',
  },
  {
    icon: 'storefront',
    title: 'Authorised Regional Distributors',
    desc: 'Licensed distribution partners who represent Marlon Endomedical products in specific geographic territories. Authorised distributors gain access to our full product catalogue, co-marketing materials, training programs, and technical documentation packages.',
    benefits: ['Exclusive territory rights', 'Full product catalogue access', 'Co-marketing support', 'Certified training program'],
    accentColor: 'var(--secondary)',
  },
  {
    icon: 'precision_manufacturing',
    title: 'OEM Manufacturing Partners',
    desc: 'Our upstream manufacturing partners are ISO 13485-certified factories located primarily in Germany, Japan, USA, and India. All OEM partners undergo annual factory audits and must maintain GMP compliance to retain their supplier status.',
    benefits: ['Annual factory audit program', 'Quality performance KPIs', 'Regulatory documentation support', 'Long-term supply agreements'],
    accentColor: '#0891b2',
  },
  {
    icon: 'science',
    title: 'Medical Research Institutions',
    desc: 'Universities, research hospitals, and biomedical R&D organisations that collaborate with Marlon Endomedical on product evaluation, clinical validation studies, and new application development. Research partners receive evaluation unit access and technical consultation.',
    benefits: ['Evaluation unit program', 'Clinical study support', 'Technical consultation', 'Co-publication opportunities'],
    accentColor: '#7c3aed',
  },
];

const regions = [
  { region: 'North India', flag: '🇮🇳', cities: 'Delhi, Chandigarh, Lucknow, Jaipur, Amritsar' },
  { region: 'South India', flag: '🇮🇳', cities: 'Bangalore, Chennai, Hyderabad, Kochi, Mysore' },
  { region: 'West India', flag: '🇮🇳', cities: 'Mumbai, Pune, Ahmedabad, Surat, Nagpur' },
  { region: 'East India', flag: '🇮🇳', cities: 'Kolkata, Bhubaneswar, Patna, Guwahati' },
  { region: 'Southeast Asia', flag: '🌏', cities: 'Singapore, Bangkok, Kuala Lumpur, Jakarta, Manila' },
  { region: 'Middle East', flag: '🌍', cities: 'Dubai, Riyadh, Abu Dhabi, Kuwait City, Doha' },
  { region: 'East Africa', flag: '🌍', cities: 'Nairobi, Dar es Salaam, Kampala, Addis Ababa' },
  { region: 'Europe', flag: '🌍', cities: 'Select markets — contact for availability' },
];

const becomeSteps = [
  { step: '01', icon: 'description', title: 'Submit Application', desc: 'Fill out the partner inquiry form below with your organisation details, target territory, and intended product categories.' },
  { step: '02', icon: 'manage_search', title: 'Due Diligence Review', desc: 'Our partnership team reviews your application, verifies regulatory licences, and assesses market fit. Typical review time is 5–7 business days.' },
  { step: '03', icon: 'handshake', title: 'Agreement & Onboarding', desc: 'Successful applicants receive a partnership agreement, product training, and access to our partner portal with full technical documentation.' },
  { step: '04', icon: 'trending_up', title: 'Grow Together', desc: 'Benefit from co-marketing support, dedicated account management, and regular product training as you build your business with Marlon Endomedical.' },
];

const stats = [
  { value: '500+', label: 'Hospital Partners', icon: 'local_hospital' },
  { value: '28', label: 'Countries Served', icon: 'public' },
  { value: '12+', label: 'Years in Market', icon: 'history' },
  { value: '40+', label: 'Regional Distributors', icon: 'storefront' },
];

export default function PartnersPage() {
  useEffect(() => {
    document.title = 'Partners & Distributors | Marlon Endomedical';
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="page-hero" id="partners-hero">
        <div className="container">
          <div className="glass-panel animate-in" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 1rem', borderRadius: 'var(--radius-full)', marginBottom: '1.25rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--primary-fixed-dim)' }}>handshake</span>
            <span className="label-sm" style={{ color: 'var(--primary-fixed-dim)' }}>Global Partner Network</span>
          </div>
          <h1 className="display-lg page-hero__title animate-in">Partners &amp; Distributors</h1>
          <p className="page-hero__desc animate-in animate-delay-1">
            Marlon Endomedical operates through a carefully selected network of hospital partners,
            regional distributors, and manufacturing alliances spanning 28 countries.
            We grow together with partners who share our commitment to clinical quality.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: 'var(--surface-container-low)', padding: '3rem 0' }} id="partners-stats">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
            {stats.map((stat, i) => (
              <div key={i} className={`animate-in animate-delay-${i + 1}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.75rem', color: 'var(--primary-fixed-dim)' }}>{stat.icon}</span>
                <div style={{ fontFamily: 'var(--font-headline)', fontSize: '2.25rem', fontWeight: 800, color: 'var(--primary-fixed-dim)' }}>{stat.value}</div>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, opacity: 0.6 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="section" style={{ padding: '5rem 0' }} id="partners-types">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="label-sm" style={{ color: 'var(--primary-fixed-dim)', marginBottom: '0.75rem' }}>Partnership Models</div>
            <h2 className="headline-lg">How We Partner</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {partnerTypes.map((pt, i) => (
              <div key={i} className={`glass-panel animate-in animate-delay-${(i % 4) + 1}`} style={{ padding: '1.75rem', borderRadius: 'var(--radius-xl)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: pt.accentColor }} />
                <div style={{ width: '3rem', height: '3rem', borderRadius: 'var(--radius-md)', background: 'var(--surface-container-high)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '1.5rem', color: pt.accentColor }}>{pt.icon}</span>
                </div>
                <h3 className="headline-sm" style={{ marginBottom: '0.75rem' }}>{pt.title}</h3>
                <p className="body-sm" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.7, marginBottom: '1.25rem' }}>{pt.desc}</p>
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  {pt.benefits.map((b, j) => (
                    <div key={j} style={{ display: 'flex', gap: '0.625rem', alignItems: 'center' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '0.875rem', color: pt.accentColor, flexShrink: 0 }}>check_circle</span>
                      <span className="body-sm" style={{ color: 'var(--on-surface-variant)', fontSize: '0.8125rem' }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Distribution Map */}
      <section style={{ background: 'var(--surface-container-low)', padding: '5rem 0' }} id="partners-regions">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="label-sm" style={{ color: 'var(--primary-fixed-dim)', marginBottom: '0.75rem' }}>Coverage</div>
            <h2 className="headline-lg">Regional Distribution Network</h2>
            <p className="body-md" style={{ color: 'var(--on-surface-variant)', marginTop: '0.75rem', maxWidth: '540px', margin: '0.75rem auto 0' }}>
              We currently service these regions with established distribution partners.
              Enquire about availability in your territory.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {regions.map((r, i) => (
              <div key={i} className={`glass-panel animate-in animate-delay-${(i % 4) + 1}`} style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.75rem', flexShrink: 0, lineHeight: 1 }}>{r.flag}</span>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{r.region}</div>
                  <div className="body-sm" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.5 }}>{r.cities}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Partner — Process */}
      <section className="section" style={{ padding: '5rem 0' }} id="partners-process">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="label-sm" style={{ color: 'var(--primary-fixed-dim)', marginBottom: '0.75rem' }}>Join the Network</div>
            <h2 className="headline-lg">Become a Partner</h2>
            <p className="body-md" style={{ color: 'var(--on-surface-variant)', marginTop: '0.75rem', maxWidth: '520px', margin: '0.75rem auto 0' }}>
              Our partnership programme is open to qualified distributors, hospitals, and institutions. Here's how it works.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            {becomeSteps.map((s, i) => (
              <div key={i} className={`glass-panel animate-in animate-delay-${i + 1}`} style={{ padding: '1.75rem', borderRadius: 'var(--radius-xl)', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-headline)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--outline)', lineHeight: 1, marginBottom: '1rem' }}>{s.step}</div>
                <span className="material-symbols-outlined" style={{ fontSize: '1.75rem', color: 'var(--primary-fixed-dim)', display: 'block', marginBottom: '0.75rem' }}>{s.icon}</span>
                <h3 className="headline-sm" style={{ marginBottom: '0.625rem' }}>{s.title}</h3>
                <p className="body-sm" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/contact" className="btn btn--primary btn--lg">
              <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>handshake</span>
              Apply to Become a Partner
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="partners-cta">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="headline-lg" style={{ color: 'var(--on-primary)', marginBottom: '1rem' }}>Interested in a Distribution Partnership?</h2>
          <p style={{ color: 'var(--primary-fixed)', fontSize: '1.125rem', marginBottom: '2rem' }}>
            Reach out to our partnership team to discuss territory availability and programme details.
          </p>
          <Link to="/contact" className="btn btn--cta btn--lg">
            Contact Partnership Team
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </section>
    </>
  );
}
