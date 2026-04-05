import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const certifications = [
  {
    id: 'iso-13485',
    badge: 'ISO 13485:2016',
    category: 'Quality Management',
    icon: 'workspace_premium',
    accentColor: 'var(--primary-container)',
    glowColor: 'rgba(0, 74, 153, 0.35)',
    issuer: 'International Organization for Standardization',
    scope: 'Design, development, production, installation and servicing of medical devices and accessories',
    certNumber: 'QMS-2015-3847',
    validUntil: 'March 2027',
    status: 'Active',
    description: 'ISO 13485:2016 is the internationally recognized standard for quality management systems specific to medical devices. It demonstrates our commitment to consistently providing medical devices that meet customer and applicable regulatory requirements.',
    highlights: [
      'Full quality management system covering procurement, storage, and distribution',
      'Documented procedures for supplier qualification and product traceability',
      'Internal audit program with annual management reviews',
      'Post-market surveillance and complaint handling processes',
    ],
  },
  {
    id: 'ce-marking',
    badge: 'CE Marking',
    category: 'EU Regulatory Compliance',
    icon: 'verified',
    accentColor: '#005eb8',
    glowColor: 'rgba(0, 94, 184, 0.3)',
    issuer: 'European Union — Medical Devices Regulation (MDR 2017/745)',
    scope: 'Medical devices and accessories distributed within European Economic Area member states',
    certNumber: 'NB-0344-CE-2021',
    validUntil: 'Continuous (MDR-compliant)',
    status: 'Active',
    description: 'CE marking confirms that products distributed by Marlon Endomedical for the European market conform to EU health, safety, and environmental protection standards under the Medical Devices Regulation (MDR 2017/745). Each CE-marked device is assessed by an EU Notified Body.',
    highlights: [
      'Covers Class I, IIa, and IIb medical devices in our portfolio',
      'Technical documentation maintained per Annex II & III of MDR',
      'Notified Body involvement for higher-risk device classes',
      'Post-market clinical follow-up (PMCF) procedures in place',
    ],
  },
  {
    id: 'cdsco',
    badge: 'CDSCO Licensed',
    category: 'Indian Regulatory Authority',
    icon: 'policy',
    accentColor: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.25)',
    issuer: 'Central Drugs Standard Control Organisation, Government of India',
    scope: 'Import, storage, and distribution of medical devices under Medical Devices Rules, 2017',
    certNumber: 'MD-IMP-CH-2018-0092',
    validUntil: 'Annual renewal — current to Dec 2026',
    status: 'Active',
    description: 'Our CDSCO registration authorizes Marlon Endomedical to import and distribute regulated medical devices within India under the Medical Devices Rules, 2017. This covers devices listed under Schedule I of the rules that require mandatory registration and licensing.',
    highlights: [
      'Import License for Schedule I notified medical devices',
      'Authorized distributor registration with SUGAM portal',
      'Compliance with labeling requirements under MDR 2017',
      'Adverse Event Reporting (AER) system in place per CDSCO guidelines',
    ],
  },
  {
    id: 'who-gmp',
    badge: 'WHO-GMP',
    category: 'Good Manufacturing Practice',
    icon: 'science',
    accentColor: 'var(--secondary)',
    glowColor: 'rgba(0, 106, 102, 0.3)',
    issuer: 'World Health Organization — Good Manufacturing Practices',
    scope: 'Supply chain quality assurance for medical devices sourced from WHO-GMP certified manufacturers',
    certNumber: 'Supplier Qualification Program',
    validUntil: 'Continuous (supplier audits)',
    status: 'Active',
    description: 'All manufacturing partners in our supply chain are required to hold or operate under WHO Good Manufacturing Practice guidelines. We conduct annual supplier audits and require GMP certificates as a condition of our supplier qualification program under ISO 13485.',
    highlights: [
      'Mandatory GMP certification for all Tier-1 suppliers',
      'Annual factory audits for high-volume supply partners',
      'Batch record review and certificate of conformance for each shipment',
      'Non-conformance tracking and corrective action requirements',
    ],
  },
  {
    id: 'bis',
    badge: 'BIS Compliant',
    category: 'Bureau of Indian Standards',
    icon: 'verified_user',
    accentColor: '#7c3aed',
    glowColor: 'rgba(124, 58, 237, 0.25)',
    issuer: 'Bureau of Indian Standards, Ministry of Consumer Affairs',
    scope: 'Medical devices and equipment subject to mandatory BIS certification under Quality Control Orders',
    certNumber: 'BIS-QCO-2023-REF',
    validUntil: 'Per device — current certifications to 2026',
    status: 'Active',
    description: 'For medical devices subject to BIS Quality Control Orders (QCOs) issued by the Ministry of Commerce, we ensure all supplied products carry the ISI mark or the required BIS certification. This is mandatory for certain device categories sold in India under recent QCO mandates.',
    highlights: [
      'Compliance with applicable BIS Quality Control Orders',
      'Coordination with manufacturers for ISI marking where required',
      'Documentation support for BIS registration of imported devices',
      'Regular regulatory monitoring for new QCO notifications',
    ],
  },
  {
    id: 'hsn',
    badge: 'HSN 9018 Classified',
    category: 'Customs & Trade Compliance',
    icon: 'receipt_long',
    accentColor: '#0891b2',
    glowColor: 'rgba(8, 145, 178, 0.25)',
    issuer: 'Harmonized System of Nomenclature — World Customs Organization',
    scope: 'All medical instruments and equipment exported/imported under HS Chapter 90',
    certNumber: 'HSN 9018 / 901814',
    validUntil: 'Ongoing',
    status: 'Active',
    description: 'Our products are correctly classified under HSN Chapter 90 — specifically HSN 9018 (instruments and appliances for medical, surgical, dental, or veterinary use) and subheading 901814. Accurate HSN classification ensures correct duty rates, GST treatment, and smooth customs clearance across all markets.',
    highlights: [
      'All products pre-classified by our compliance team for major destination markets',
      'Commercial invoices include full HSN / HTS codes',
      'GST documentation aligned with HSN classification for Indian domestic supply',
      'Export documentation compliance for DGFT / ECGC requirements',
    ],
  },
];

const complianceStats = [
  { value: '6', label: 'Active Certifications', icon: 'workspace_premium' },
  { value: '2016', label: 'ISO 13485 Since', icon: 'history' },
  { value: '100%', label: 'Supplier GMP Compliance', icon: 'verified' },
  { value: '0', label: 'Regulatory Violations', icon: 'shield' },
];

export default function CertificationsPage() {
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    document.title = 'Certifications & Compliance | Marlon Endomedical';
  }, []);

  const openCert = certifications.find((c) => c.id === selectedCert);

  return (
    <>
      {/* Hero */}
      <section className="page-hero" id="cert-hero">
        <div className="container">
          <div className="glass-panel animate-in" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 1rem', borderRadius: 'var(--radius-full)', marginBottom: '1.25rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--primary-fixed-dim)' }}>workspace_premium</span>
            <span className="label-sm" style={{ color: 'var(--primary-fixed-dim)' }}>Regulatory Compliance</span>
          </div>
          <h1 className="display-lg page-hero__title animate-in">Certifications &amp; Compliance</h1>
          <p className="page-hero__desc animate-in animate-delay-1">
            Every device we distribute meets rigorous international regulatory standards.
            Our compliance framework ensures hospitals worldwide receive instruments that
            are safe, traceable, and fully authorized for clinical use.
          </p>
        </div>
      </section>

      {/* Compliance Stats */}
      <section style={{ background: 'var(--surface-container-low)', padding: '3rem 0' }} id="cert-stats">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
            {complianceStats.map((stat, i) => (
              <div key={i} className={`animate-in animate-delay-${i + 1}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.75rem', color: 'var(--primary-fixed-dim)' }}>{stat.icon}</span>
                <div style={{ fontFamily: 'var(--font-headline)', fontSize: '2.25rem', fontWeight: 800, color: 'var(--primary-fixed-dim)' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, opacity: 0.6 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="section" style={{ padding: '5rem 0' }} id="cert-grid">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="label-sm" style={{ color: 'var(--primary-fixed-dim)', marginBottom: '0.75rem' }}>Our Credentials</div>
            <h2 className="headline-lg">Active Certifications</h2>
            <p className="body-md" style={{ color: 'var(--on-surface-variant)', marginTop: '0.75rem', maxWidth: '560px', margin: '0.75rem auto 0' }}>
              Click any certification to view full details, scope, and documentation availability.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {certifications.map((cert, i) => (
              <button
                key={cert.id}
                onClick={() => setSelectedCert(cert.id)}
                className={`glass-panel animate-in animate-delay-${(i % 4) + 1}`}
                style={{
                  padding: '1.75rem',
                  borderRadius: 'var(--radius-xl)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  border: 'none',
                  background: undefined,
                  transition: 'var(--transition-med)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Accent bar */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                  background: cert.accentColor,
                  boxShadow: `0 0 12px ${cert.glowColor}`,
                }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                  <div style={{
                    width: '3rem', height: '3rem', borderRadius: 'var(--radius-md)',
                    background: 'var(--surface-container-high)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 0 16px ${cert.glowColor}`,
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '1.5rem', color: cert.accentColor }}>{cert.icon}</span>
                  </div>
                  <span style={{
                    fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
                    padding: '0.25rem 0.625rem', borderRadius: 'var(--radius-full)',
                    background: 'rgba(0, 200, 150, 0.12)', color: '#4ade80',
                    border: '1px solid rgba(74, 222, 128, 0.2)',
                  }}>
                    {cert.status}
                  </span>
                </div>

                <div style={{ marginBottom: '0.5rem' }}>
                  <div className="label-sm" style={{ color: 'var(--on-surface-variant)', marginBottom: '0.25rem' }}>{cert.category}</div>
                  <h3 className="headline-sm" style={{ color: 'var(--on-surface)' }}>{cert.badge}</h3>
                </div>

                <p className="body-sm" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {cert.description.substring(0, 120)}…
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="body-sm" style={{ color: 'var(--on-surface-variant)' }}>
                    Valid: <span style={{ color: 'var(--on-surface)', fontWeight: 600 }}>{cert.validUntil}</span>
                  </div>
                  <span className="material-symbols-outlined" style={{ fontSize: '1.1rem', color: 'var(--primary-fixed-dim)' }}>arrow_forward</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Modal overlay for cert detail */}
      {openCert && (
        <div
          onClick={() => setSelectedCert(null)}
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
            style={{
              width: '100%', maxWidth: '680px', maxHeight: '85vh',
              borderRadius: 'var(--radius-xl)', overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
              position: 'relative',
            }}
          >
            {/* Modal Header */}
            <div style={{
              padding: '1.5rem 1.75rem',
              borderBottom: '1px solid var(--outline-variant)',
              background: 'var(--surface-container)',
              flexShrink: 0,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{
                    width: '2.75rem', height: '2.75rem', borderRadius: 'var(--radius-md)',
                    background: 'var(--surface-container-high)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 0 16px ${openCert.glowColor}`,
                    flexShrink: 0,
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '1.375rem', color: openCert.accentColor }}>{openCert.icon}</span>
                  </div>
                  <div>
                    <div className="label-sm" style={{ color: 'var(--on-surface-variant)' }}>{openCert.category}</div>
                    <h2 className="headline-md">{openCert.badge}</h2>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.25rem', color: 'var(--on-surface-variant)' }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '1.5rem' }}>close</span>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '1.75rem', overflowY: 'auto', flex: 1 }}>
              <p className="body-md" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                {openCert.description}
              </p>

              {/* Meta grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                {[
                  { label: 'Issuing Body', value: openCert.issuer, icon: 'account_balance' },
                  { label: 'Certificate / Ref No.', value: openCert.certNumber, icon: 'numbers' },
                  { label: 'Valid Until', value: openCert.validUntil, icon: 'event' },
                  { label: 'Status', value: openCert.status, icon: 'check_circle' },
                ].map((row) => (
                  <div key={row.label} style={{ padding: '0.875rem', borderRadius: 'var(--radius-md)', background: 'var(--surface-container)' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.375rem' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '0.875rem', color: 'var(--primary-fixed-dim)' }}>{row.icon}</span>
                      <span className="label-sm" style={{ color: 'var(--on-surface-variant)' }}>{row.label}</span>
                    </div>
                    <div className="body-sm" style={{ fontWeight: 600 }}>{row.value}</div>
                  </div>
                ))}
              </div>

              {/* Scope */}
              <div style={{ padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', background: 'var(--surface-container)', marginBottom: '1.5rem', borderLeft: `3px solid ${openCert.accentColor}` }}>
                <div className="label-sm" style={{ color: 'var(--on-surface-variant)', marginBottom: '0.375rem' }}>Certification Scope</div>
                <p className="body-sm" style={{ color: 'var(--on-surface)', lineHeight: 1.7 }}>{openCert.scope}</p>
              </div>

              {/* Highlights */}
              <div>
                <div className="label-sm" style={{ color: 'var(--on-surface-variant)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Key Compliance Points</div>
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  {openCert.highlights.map((h, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: openCert.accentColor, marginTop: '2px', flexShrink: 0 }}>check_circle</span>
                      <span className="body-sm" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.6 }}>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: '1.25rem 1.75rem',
              borderTop: '1px solid var(--outline-variant)',
              background: 'var(--surface-container)',
              display: 'flex', gap: '1rem', flexShrink: 0,
            }}>
              <Link
                to="/contact"
                className="btn btn--primary"
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => setSelectedCert(null)}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>description</span>
                Request Certificate Copy
              </Link>
              <button
                onClick={() => setSelectedCert(null)}
                className="btn glass-panel"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Compliance Statement */}
      <section style={{ background: 'var(--surface-container-low)', padding: '5rem 0' }} id="cert-statement">
        <div className="container">
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div className="label-sm" style={{ color: 'var(--primary-fixed-dim)', marginBottom: '0.75rem' }}>Compliance Statement</div>
              <h2 className="headline-lg">Our Regulatory Commitment</h2>
            </div>
            <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-xl)', marginBottom: '1.5rem' }}>
              <p className="body-lg" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.9, marginBottom: '1rem' }}>
                Marlon Endomedical Devices Pvt Ltd maintains a compliance-first procurement policy.
                No product is added to our catalog without verification of applicable regulatory
                approvals for its intended market. We believe regulatory compliance is not a
                checkbox — it is a clinical and ethical obligation.
              </p>
              <p className="body-md" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8 }}>
                Hospitals and procurement managers can request copies of certificates, technical
                documentation, and compliance declarations for any product in our portfolio.
                All documentation is provided at no charge as part of our standard service.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              {[
                { icon: 'description', label: 'Certificate copies available on request' },
                { icon: 'update', label: 'Certifications reviewed annually' },
                { icon: 'verified_user', label: 'Supplier audits every 12 months' },
              ].map((item, i) => (
                <div key={i} className="glass-panel" style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '1.5rem', color: 'var(--primary-fixed-dim)', display: 'block', marginBottom: '0.5rem' }}>{item.icon}</span>
                  <p className="body-sm" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.5 }}>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="cert-cta">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="headline-lg" style={{ color: 'var(--on-primary)', marginBottom: '1rem' }}>
            Need Compliance Documentation?
          </h2>
          <p style={{ color: 'var(--primary-fixed)', fontSize: '1.125rem', marginBottom: '2rem' }}>
            Contact our compliance team to request certificates, technical files, or
            regulatory declarations for any product in our portfolio.
          </p>
          <Link to="/contact" className="btn btn--cta btn--lg" id="cert-cta-btn">
            Request Documents
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </section>
    </>
  );
}
