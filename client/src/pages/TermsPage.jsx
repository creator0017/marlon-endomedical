import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const sections = [
  {
    id: 'acceptance',
    icon: 'gavel',
    title: '1. Acceptance of Terms',
    content: [
      {
        text: 'By accessing or using the Marlon Endomedical website (www.marlonendomedical.com) or submitting any inquiry, quote request, or purchase order to Marlon Endomedical Devices Pvt Ltd ("Company", "we", "us"), you ("Buyer", "you") confirm that you have read, understood, and agree to be bound by these Terms and Conditions and all applicable laws. If you are acting on behalf of an organisation, you represent that you have authority to bind that organisation to these Terms.',
      },
      {
        text: 'These Terms govern all B2B transactions, website use, and communications between Marlon Endomedical and institutional buyers including hospitals, clinics, distributors, and procurement agencies. Consumer transactions are not within scope.',
      },
    ],
  },
  {
    id: 'products-services',
    icon: 'inventory_2',
    title: '2. Products & Services',
    content: [
      {
        subtitle: '2.1 Product Descriptions',
        text: 'Marlon Endomedical makes reasonable efforts to ensure that product descriptions, specifications, images, and compliance information on this website are accurate. However, we do not warrant that descriptions are error-free, complete, or current. Specifications are subject to change by manufacturers without notice. Always verify final specifications with our sales team before placing an order.',
      },
      {
        subtitle: '2.2 Medical Device Classification',
        text: 'Products distributed by Marlon Endomedical are medical devices intended for use by qualified healthcare professionals and trained biomedical personnel. They are not intended for personal, consumer, or domestic use. Buyers are solely responsible for ensuring that purchased devices are appropriate for the intended clinical application and that end-users are properly trained.',
      },
      {
        subtitle: '2.3 Regulatory Compliance by Destination',
        text: 'It is the Buyer\'s responsibility to verify that products are approved for import and use in the destination country. Marlon Endomedical provides available regulatory documentation (CE, CDSCO, etc.) but does not guarantee that any product meets the specific regulatory requirements of every jurisdiction.',
      },
    ],
  },
  {
    id: 'ordering-payment',
    icon: 'receipt_long',
    title: '3. Ordering & Payment',
    content: [
      {
        subtitle: '3.1 Quote Requests',
        text: 'All quote requests submitted through this website are non-binding inquiries. A binding purchase contract is formed only upon the Buyer\'s acceptance of a formal commercial offer (proforma invoice) issued by Marlon Endomedical, and the receipt of an agreed deposit or confirmed Letter of Credit.',
      },
      {
        subtitle: '3.2 Pricing',
        text: 'All prices are quoted in Indian Rupees (INR) or US Dollars (USD) as specified in the proforma invoice. Prices are exclusive of applicable taxes (GST, customs duties, import levies) unless explicitly stated otherwise. Prices are valid for the period stated in the formal quotation, typically 30 days.',
      },
      {
        subtitle: '3.3 Payment Terms',
        text: 'Standard payment terms are 100% advance by bank transfer for first-time buyers. Established institutional accounts may qualify for 30–60 day credit terms subject to credit assessment. Letters of Credit are accepted for international orders exceeding USD 50,000. We do not accept cash payments.',
      },
      {
        subtitle: '3.4 Taxes',
        text: 'Buyer is responsible for all applicable taxes, duties, and levies at the destination. For domestic Indian transactions, applicable GST will be charged at the prevailing rate and shown separately on the tax invoice.',
      },
    ],
  },
  {
    id: 'delivery',
    icon: 'local_shipping',
    title: '4. Delivery & Logistics',
    content: [
      {
        subtitle: '4.1 Incoterms',
        text: 'Unless otherwise agreed in writing, all shipments are made on EXW (Ex Works) basis. Risk of loss and damage transfers to the Buyer at the point of collection. CIF and other Incoterms are available upon request and will be stated in the proforma invoice.',
      },
      {
        subtitle: '4.2 Delivery Timelines',
        text: 'Delivery timelines stated in quotations are estimates only and not guaranteed. Marlon Endomedical shall not be liable for delays caused by manufacturer production schedules, customs clearance, carrier delays, force majeure events, or any circumstance beyond our reasonable control.',
      },
      {
        subtitle: '4.3 Inspection & Acceptance',
        text: 'Buyer must inspect all shipments upon receipt and notify Marlon Endomedical in writing of any visible damage, shortage, or non-conformity within 5 business days of receipt. Failure to notify within this period constitutes acceptance of the shipment as delivered.',
      },
    ],
  },
  {
    id: 'returns-warranty',
    icon: 'replay',
    title: '5. Returns & Warranty',
    content: [
      {
        subtitle: '5.1 Return Policy',
        text: 'Returns are accepted only for products that are demonstrably defective, non-conforming to agreed specifications, or damaged in transit (with documented carrier claim). Returns must be authorised in writing by Marlon Endomedical prior to shipment back. Unauthorised returns will not be accepted. Products that have been opened, used, or sterilised are not eligible for return.',
      },
      {
        subtitle: '5.2 Warranty',
        text: 'Products carry the manufacturer\'s warranty as specified in the product documentation. Marlon Endomedical passes through manufacturer warranties to the extent permissible. Marlon Endomedical makes no additional warranties beyond those provided by manufacturers. Warranty claims must be submitted to support@marlonendomedical.com with full order documentation.',
      },
      {
        subtitle: '5.3 Limitation of Liability',
        text: 'To the maximum extent permitted by applicable law, Marlon Endomedical\'s total liability for any claim arising from a transaction shall not exceed the invoice value of the specific product(s) in question. We are not liable for indirect, consequential, incidental, or special damages including lost profits, clinical downtime, or third-party claims.',
      },
    ],
  },
  {
    id: 'intellectual-property',
    icon: 'copyright',
    title: '6. Intellectual Property',
    content: [
      {
        text: 'All content on this website including text, images, product descriptions, logos, design elements, and compiled data is the intellectual property of Marlon Endomedical Devices Pvt Ltd or its licensors. You may not reproduce, distribute, or use any content for commercial purposes without our prior written consent. You may print or download content for personal, non-commercial reference only.',
      },
    ],
  },
  {
    id: 'confidentiality',
    icon: 'lock',
    title: '7. Confidentiality',
    content: [
      {
        text: 'All pricing, discount structures, and commercial terms communicated in quotations or negotiations are confidential. Buyers agree not to disclose such information to third parties, competitors, or public channels. This obligation survives the termination of any commercial relationship between the parties.',
      },
    ],
  },
  {
    id: 'governing-law',
    icon: 'account_balance',
    title: '8. Governing Law & Disputes',
    content: [
      {
        subtitle: 'Governing Law',
        text: 'These Terms and Conditions are governed by the laws of India. All disputes shall be subject to the exclusive jurisdiction of the courts of Chandigarh, India.',
      },
      {
        subtitle: 'Dispute Resolution',
        text: 'In the event of a dispute, parties agree to first attempt resolution through good-faith negotiation for a period of 30 days. If unresolved, disputes shall be referred to arbitration under the Arbitration and Conciliation Act, 1996, with a sole arbitrator appointed by mutual consent. The seat of arbitration shall be Chandigarh, India.',
      },
    ],
  },
  {
    id: 'amendments',
    icon: 'edit_note',
    title: '9. Amendments',
    content: [
      {
        text: 'Marlon Endomedical reserves the right to update these Terms and Conditions at any time. Updated terms will be posted on this page with a revised "Last Updated" date. Continued use of our website or placement of orders after changes are posted constitutes acceptance of the revised Terms. For significant changes affecting existing contracts, we will provide written notice.',
      },
    ],
  },
];

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    document.title = 'Terms & Conditions | Marlon Endomedical';
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveSection(e.target.id)),
      { rootMargin: '-30% 0px -60% 0px' }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <>
      {/* Hero */}
      <section className="page-hero" id="terms-hero">
        <div className="container">
          <div className="glass-panel animate-in" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 1rem', borderRadius: 'var(--radius-full)', marginBottom: '1.25rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--primary-fixed-dim)' }}>gavel</span>
            <span className="label-sm" style={{ color: 'var(--primary-fixed-dim)' }}>Last Updated: April 5, 2026</span>
          </div>
          <h1 className="display-lg page-hero__title animate-in">Terms &amp; Conditions</h1>
          <p className="page-hero__desc animate-in animate-delay-1">
            These Terms govern all transactions and interactions between Marlon Endomedical
            Devices Pvt Ltd and institutional buyers. Please read them carefully before
            placing any order or submitting a quote request.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section" style={{ padding: '5rem 0' }} id="terms-content">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '240px minmax(0, 1fr)', gap: '3.5rem', alignItems: 'start' }}>

            {/* Sticky TOC */}
            <div className="glass-panel animate-in" style={{ padding: '1.5rem', borderRadius: 'var(--radius-xl)', position: 'sticky', top: '6rem' }}>
              <h3 className="label-sm" style={{ textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--on-surface-variant)', marginBottom: '1rem' }}>Contents</h3>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    style={{
                      background: activeSection === s.id ? 'var(--surface-container-high)' : 'transparent',
                      border: 'none', borderRadius: 'var(--radius-md)',
                      padding: '0.5rem 0.75rem', textAlign: 'left', cursor: 'pointer',
                      color: activeSection === s.id ? 'var(--primary-fixed-dim)' : 'var(--on-surface-variant)',
                      fontSize: '0.8rem', fontWeight: activeSection === s.id ? 700 : 400,
                      lineHeight: 1.4, transition: 'var(--transition-fast)',
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '0.875rem', flexShrink: 0 }}>{s.icon}</span>
                    {s.title.replace(/^\d+\.\s/, '')}
                  </button>
                ))}
              </nav>
            </div>

            {/* Terms text */}
            <div className="animate-in animate-delay-1" style={{ display: 'grid', gap: '3rem' }}>
              {sections.map((section) => (
                <div key={section.id} id={section.id} style={{ scrollMarginTop: '7rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1.5rem' }}>
                    <div style={{
                      width: '2.5rem', height: '2.5rem', borderRadius: 'var(--radius-md)', flexShrink: 0,
                      background: 'var(--surface-container-high)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '1.25rem', color: 'var(--primary-fixed-dim)' }}>{section.icon}</span>
                    </div>
                    <h2 className="headline-md">{section.title}</h2>
                  </div>
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {section.content.map((block, i) => (
                      <div key={i} className="glass-panel" style={{ padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-lg)' }}>
                        {block.subtitle && (
                          <h4 style={{ fontWeight: 700, fontSize: '0.9375rem', marginBottom: '0.5rem' }}>{block.subtitle}</h4>
                        )}
                        <p className="body-md" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8 }}>{block.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-xl)', borderLeft: '3px solid var(--primary-container)' }}>
                <p className="body-sm" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8 }}>
                  For questions regarding these Terms, contact{' '}
                  <a href="mailto:legal@marlonendomedical.com" style={{ color: 'var(--primary-fixed-dim)' }}>legal@marlonendomedical.com</a>.
                  {' '}Also refer to our{' '}
                  <Link to="/privacy-policy" style={{ color: 'var(--primary-fixed-dim)' }}>Privacy Policy</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="headline-lg" style={{ color: 'var(--on-primary)', marginBottom: '1rem' }}>Ready to Start a Partnership?</h2>
          <p style={{ color: 'var(--primary-fixed)', fontSize: '1.125rem', marginBottom: '2rem' }}>
            Request a formal quote and our team will handle all commercial documentation.
          </p>
          <Link to="/quote" className="btn btn--cta btn--lg">
            Request a Quote
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </section>
    </>
  );
}
