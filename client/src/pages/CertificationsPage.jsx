import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const certifications = [
  {
    id: 'form-20b-wholesale-license',
    badge: 'Form 20B Wholesale Drug License',
    category: 'Government of Himachal Pradesh — Drugs Control Administration',
    icon: 'medication',
    accentColor: '#059669',
    glowColor: 'rgba(5, 150, 105, 0.35)',
    issuer: 'Drugs Control Administration, HQ Mandi (H.P.)',
    licensingAuthority: 'Anoop Sharma, Assistant Drugs Controller / Drugs Licensing Authority',
    entityName: 'MARLON ENDOMEDICAL DEVICES PVT. LTD.',
    certNumber: 'HP-MND-WL01-24-179',
    form20bNo: 'HP-MND-WL01-24-179',
    dateOfGrant: '08/04/2024 (Signed 18/04/2024)',
    validUntil: '07/04/2029 (Perpetual)',
    status: 'Active',
    competentPerson: 'Mr. PRITHI PAL SINGH (Authorized Partner / Qualified Competent Person)',
    registeredAddress: 'Shop No. L-3/2 Paddal, Tehsil Sadar, Distt. Mandi, H.P. - 175001',
    officeLocation: 'Zonal Hospital Complex, Mandi, H.P. - 175001',
    contactEmail: 'FDA BAM-di@yahoo.com / Anoop dik@yahoo.com',
    contactPhone: '01905-222577',
    scope: 'Wholesale sale, stocking, exhibition, or distribution of drugs other than those specified in Schedules C, C(1), and X under the Drugs and Cosmetics Rules, 1945.',
    fileUrl: '/certifications/iec-certificate.pdf',
    imagePages: ['/certifications/iec-certificate-p1.png', '/certifications/iec-certificate-p2.png'],
    description: 'Issued by the Office of the Assistant Drugs Controller & Licensing Authority, Mandi Zone, Drugs Control Administration, Himachal Pradesh. Form 20B Licence HP-MND-WL01-24-179 authorizes MARLON ENDOMEDICAL DEVICES PVT. LTD. for wholesale distribution of non-Schedule C, C1, and X pharmaceutical products.',
    highlights: [
      'Licence No (Form 20B): HP-MND-WL01-24-179',
      'Governing Law: Granted under Drugs and Cosmetics Act, 1940 & Drugs Rules, 1945',
      'Licensing Authority: Anoop Sharma, Assistant Drugs Controller, HQ Mandi (H.P.)',
      'Qualified Competent Person: Mr. PRITHI PAL SINGH (Authorized Partner)',
      'Premises Address: Shop No. L-3/2 Paddal, Tehsil Sadar, Distt. Mandi, H.P. - 175001',
      'Date of Grant: 08/04/2024 | Validity: 07/04/2029 (Perpetual License)',
      'Mandatory Display: Prominently displayed on premises open to the public',
      'Authorized Trade: Procurement from licensed manufacturers & distribution to registered healthcare entities',
    ],
  },
  {
    id: 'iec-certificate-marlon',
    badge: 'Importer Exporter Code (IEC)',
    category: 'Government of India — Directorate General of Foreign Trade (DGFT)',
    icon: 'public',
    accentColor: '#2563eb',
    glowColor: 'rgba(37, 99, 235, 0.35)',
    issuer: 'Directorate General of Foreign Trade (DGFT), Ministry of Commerce & Industry',
    licensingAuthority: 'Directorate General of Foreign Trade, Government of India',
    entityName: 'MARLON ENDOMEDICAL DEVICES PVT. LTD.',
    certNumber: 'IEC Certificate — Marlon Endomedical',
    dateOfGrant: '13/05/2024',
    validUntil: 'Permanent (Valid for lifetime unless cancelled / suspended)',
    status: 'Active',
    competentPerson: 'Authorized Signatory — Marlon Endomedical Devices Pvt. Ltd.',
    registeredAddress: 'Shop No. L-3/2 Paddal, Tehsil Sadar, Distt. Mandi, H.P. - 175001',
    officeLocation: 'Mandi, Himachal Pradesh, India',
    contactEmail: 'marlonendomedicaldevices@gmail.com',
    contactPhone: '',
    scope: 'Importer Exporter Code (IEC) issued under the Foreign Trade (Development & Regulation) Act, 1992, authorizing MARLON ENDOMEDICAL DEVICES PVT. LTD. to engage in import and export of medical devices and related pharmaceutical products in international trade.',
    fileUrl: '/certifications/IEC Certificate Marlon.pdf',
    description: 'The Importer Exporter Code (IEC) is a mandatory business identification number issued by the Directorate General of Foreign Trade (DGFT), Ministry of Commerce & Industry, Government of India. This certificate authorizes MARLON ENDOMEDICAL DEVICES PVT. LTD. to engage in international trade — importing and exporting medical devices and pharmaceutical products. The IEC is a lifetime registration and forms the foundational credential for all cross-border trade activities undertaken by the company.',
    highlights: [
      'Issuing Authority: Directorate General of Foreign Trade (DGFT), Govt. of India',
      'Governing Law: Foreign Trade (Development & Regulation) Act, 1992',
      'Nature: Permanent lifetime registration — no renewal required',
      'Purpose: Mandatory credential for import/export of medical devices & pharmaceuticals',
      'Issued To: MARLON ENDOMEDICAL DEVICES PVT. LTD.',
      'Date of Issue: 13/05/2024',
      'Scope: Enables international procurement from global medical device manufacturers',
      'Ministry: Ministry of Commerce & Industry, Government of India',
    ],
  },
  {
    id: 'gst-registration-certificate',
    badge: 'GST Registration Certificate (Form GST REG-06)',
    category: 'Government of India & Govt. of Himachal Pradesh — State Taxes & Excise',
    icon: 'receipt_long',
    accentColor: '#8b5cf6',
    glowColor: 'rgba(139, 92, 246, 0.35)',
    issuer: 'Department of State Taxes and Excise, Himachal Pradesh (Mandi-I)',
    licensingAuthority: 'Anil Kumar, Assistant Commissioner State Taxes & Excise',
    entityName: 'MARLON ENDOMEDICAL DEVICES PRIVATE LIMITED',
    certNumber: '02AARCM8304M1Z5',
    gstinNo: '02AARCM8304M1Z5',
    dateOfGrant: '01/05/2024',
    validUntil: 'Regular — Permanent (From 01/05/2024)',
    status: 'Active',
    competentPerson: 'Directors: MOLVI ABDUL BASIT, PRITHI PAL SINGH, GULREJ MOHD',
    registeredAddress: 'Shop No. L-3/2, Paddal Stadium, Paddal, Mandi, Himachal Pradesh - 175001',
    officeLocation: 'Jurisdictional Office: Mandi-I, Himachal Pradesh',
    contactEmail: 'marlonendomedicaldevices@gmail.com',
    contactPhone: '',
    scope: 'Statutory GST Registration under Form GST REG-06 [Rule 10(1)] authorizing MARLON ENDOMEDICAL DEVICES PRIVATE LIMITED for regular taxable business operations, medical device distribution, and commercial supply under GSTIN 02AARCM8304M1Z5.',
    fileUrl: '/certifications/GST CERTIFICATE - MARLON ENDOMEDICAL DEVICES PRIVATE LIMITED.pdf',
    description: 'Official Goods and Services Tax (GST) Registration Certificate issued under Form GST REG-06 [See Rule 10(1)] by the Assistant Commissioner of State Taxes and Excise, Mandi-I, Himachal Pradesh. It certifies MARLON ENDOMEDICAL DEVICES PRIVATE LIMITED as a registered Private Limited Company under GSTIN 02AARCM8304M1Z5 for conducting business and commercial transactions.',
    highlights: [
      'GSTIN / Registration No: 02AARCM8304M1Z5',
      'Form: GST REG-06 [Rule 10(1)] Registration Certificate',
      'Constitution of Business: Private Limited Company',
      'Date of Issue / Liability: 01/05/2024',
      'Period of Validity: Regular (Permanent Registration)',
      'Jurisdictional Office: Mandi-I, Himachal Pradesh',
      'Approving Authority: Anil Kumar, Assistant Commissioner State Taxes & Excise',
      'Directors / Key Personnel: Molvi Abdul Basit, Prithi Pal Singh, Gulrej Mohd',
    ],
  },
];

export default function CertificationsPage() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [activePageIndex, setActivePageIndex] = useState(0);

  const closeModal = () => {
    setSelectedCert(null);
    setShowPdfPreview(false);
    setActivePageIndex(0);
  };

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
            Every medical device and pharmaceutical product we distribute meets rigorous national and international regulatory standards.
            Our licenses ensure hospitals and clinical care centers receive fully authorized, high-grade medical supplies.
          </p>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="section" style={{ padding: '5rem 0' }} id="cert-grid">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="label-sm" style={{ color: 'var(--primary-fixed-dim)', marginBottom: '0.75rem' }}>Government Licensing Authority</div>
            <h2 className="headline-lg">Licenses &amp; Certificates</h2>
            <p className="body-md" style={{ color: 'var(--on-surface-variant)', marginTop: '0.75rem', maxWidth: '600px', margin: '0.75rem auto 0' }}>
              Issued by Government of India authorities including Drugs Control Administration, Himachal Pradesh and the Directorate General of Foreign Trade (DGFT).
              Select any certificate below to open full details and document preview.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1.5rem' }}>
            {certifications.map((cert, i) => (
              <button
                key={cert.id}
                onClick={() => {
                  setSelectedCert(cert.id);
                  setActivePageIndex(0);
                }}
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
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between',
                }}
              >
                {/* Accent bar */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                  background: cert.accentColor,
                  boxShadow: `0 0 12px ${cert.glowColor}`,
                }} />

                <div>
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
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--outline-variant)' }}>
                  <div className="body-sm" style={{ color: 'var(--on-surface-variant)' }}>
                    Licence No: <span style={{ color: 'var(--on-surface)', fontWeight: 600 }}>{cert.certNumber}</span>
                  </div>
                  <span className="material-symbols-outlined" style={{ fontSize: '1.1rem', color: 'var(--primary-fixed-dim)' }}>arrow_forward</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* POPUP MODAL */}
      {openCert && (
        <div
          onClick={closeModal}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(2, 4, 8, 0.85)',
            backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass-panel"
            style={{
              width: '100%', maxWidth: '820px', maxHeight: '90vh',
              borderRadius: 'var(--radius-xl)', overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
              position: 'relative',
              boxShadow: `0 20px 50px rgba(0,0,0,0.6)`,
            }}
          >
            {/* Modal Header */}
            <div style={{
              padding: '1.25rem 1.75rem',
              borderBottom: '1px solid var(--outline-variant)',
              background: 'var(--surface-container)',
              flexShrink: 0,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                    <h2 className="headline-md" style={{ margin: 0 }}>{openCert.badge}</h2>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.5rem', color: 'var(--on-surface-variant)', borderRadius: 'var(--radius-full)' }}
                  title="Close popup"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '1.5rem' }}>close</span>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            {showPdfPreview && openCert.fileUrl ? (
              <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', background: 'rgba(15, 23, 42, 0.6)', minHeight: '580px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', padding: '0 0.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--on-surface)', fontSize: '0.9rem', fontWeight: 600 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '1.25rem', color: openCert.accentColor }}>picture_as_pdf</span>
                    <span>{openCert.badge} — Official Document</span>
                  </div>
                  <a
                    href={openCert.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn glass-panel"
                    style={{ padding: '0.35rem 0.85rem', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>open_in_new</span>
                    Open PDF in New Tab
                  </a>
                </div>
                <div style={{ flex: 1, minHeight: '520px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--outline-variant)' }}>
                  <iframe
                    src={openCert.fileUrl}
                    title={openCert.badge}
                    style={{ width: '100%', height: '100%', minHeight: '520px', border: 'none', background: '#ffffff' }}
                  />
                </div>
              </div>
            ) : (
              <div style={{ padding: '1.75rem', overflowY: 'auto', flex: 1 }}>
                <p className="body-md" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                  {openCert.description}
                </p>

                {/* Document Thumbnail Banner */}
                {openCert.fileUrl && (
                  <div
                    onClick={() => setShowPdfPreview(true)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1rem 1.25rem',
                      borderRadius: 'var(--radius-lg)', background: 'var(--surface-container-high)',
                      marginBottom: '1.5rem', cursor: 'pointer', border: '1px solid var(--outline-variant)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{
                      width: '3.25rem', height: '3.75rem', borderRadius: 'var(--radius-sm)',
                      background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                    }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '2rem', color: '#ef4444' }}>picture_as_pdf</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: 'var(--on-surface)', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>Official License PDF Document</span>
                        <span className="label-sm" style={{ padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)', background: 'var(--primary-container)', color: 'var(--on-primary-container)' }}>
                          Verified PDF
                        </span>
                      </div>
                      <p className="body-sm" style={{ color: 'var(--on-surface-variant)', margin: 0 }}>
                        Click to view full original license document PDF in interactive viewer.
                      </p>
                    </div>
                    <span className="material-symbols-outlined" style={{ color: openCert.accentColor }}>visibility</span>
                  </div>
                )}

                {/* Topics / Meta Grid */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div className="label-sm" style={{ color: 'var(--on-surface-variant)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    License Information Topics
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                    {[
                      { label: 'Issuing Body', value: openCert.issuer, icon: 'account_balance' },
                      { label: 'Licensing Authority', value: openCert.licensingAuthority, icon: 'policy' },
                      openCert.form20bNo ? { label: 'Form 20B Licence No.', value: openCert.form20bNo, icon: 'numbers' } : null,
                      openCert.form21bNo ? { label: 'Form 21B Licence No.', value: openCert.form21bNo, icon: 'numbers' } : null,
                      openCert.gstinNo ? { label: 'GSTIN Registration No.', value: openCert.gstinNo, icon: 'receipt_long' } : null,
                      { label: 'Entity Name', value: openCert.entityName, icon: 'domain' },
                      { label: 'Authorized Partner / Competent Person', value: openCert.competentPerson, icon: 'badge' },
                      { label: 'Date of Grant', value: openCert.dateOfGrant, icon: 'calendar_today' },
                      { label: 'Valid Upto', value: openCert.validUntil, icon: 'event' },
                      { label: 'Premises Address', value: openCert.registeredAddress, icon: 'location_on' },
                      { label: 'Office Location', value: openCert.officeLocation, icon: 'local_hospital' },
                      { label: 'Contact Email', value: openCert.contactEmail, icon: 'mail' },
                      { label: 'Phone', value: openCert.contactPhone, icon: 'call' },
                    ].filter(Boolean).map((row) => (
                      <div key={row.label} style={{ padding: '0.875rem', borderRadius: 'var(--radius-md)', background: 'var(--surface-container)', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.375rem' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '0.875rem', color: openCert.accentColor }}>{row.icon}</span>
                          <span className="label-sm" style={{ color: 'var(--on-surface-variant)' }}>{row.label}</span>
                        </div>
                        <div className="body-sm" style={{ fontWeight: 600, wordBreak: 'break-word' }}>{row.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scope */}
                <div style={{ padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', background: 'var(--surface-container)', marginBottom: '1.5rem', borderLeft: `3px solid ${openCert.accentColor}` }}>
                  <div className="label-sm" style={{ color: 'var(--on-surface-variant)', marginBottom: '0.375rem' }}>License Scope &amp; Statutory Authorization</div>
                  <p className="body-sm" style={{ color: 'var(--on-surface)', lineHeight: 1.7, margin: 0 }}>{openCert.scope}</p>
                </div>

                {/* Highlights */}
                <div>
                  <div className="label-sm" style={{ color: 'var(--on-surface-variant)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Key Compliance Highlights</div>
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
            )}

            {/* Modal Footer */}
            <div style={{
              padding: '1.25rem 1.75rem',
              borderTop: '1px solid var(--outline-variant)',
              background: 'var(--surface-container)',
              display: 'flex', gap: '1rem', flexShrink: 0,
            }}>
              {openCert.imagePages || openCert.fileUrl ? (
                showPdfPreview ? (
                  <button
                    className="btn btn--primary"
                    style={{ flex: 1, justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    onClick={() => setShowPdfPreview(false)}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>arrow_back</span>
                    Back to License Topics
                  </button>
                ) : (
                  <button
                    className="btn btn--primary"
                    style={{ flex: 1, justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    onClick={() => setShowPdfPreview(true)}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>visibility</span>
                    View License Document Scan
                  </button>
                )
              ) : (
                <Link
                  to="/contact"
                  className="btn btn--primary"
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={closeModal}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>description</span>
                  Request License Copy
                </Link>
              )}
              <button
                onClick={closeModal}
                className="btn glass-panel"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
