import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const faqCategories = [
  {
    id: 'ordering',
    icon: 'shopping_bag',
    label: 'Ordering & Quotes',
    faqs: [
      {
        q: 'What is the minimum order quantity (MOQ)?',
        a: 'Our standard MOQ is 10 units per SKU for most product lines. For high-value imaging systems and specialized endoscopy equipment, single-unit orders are accepted for institutional buyers. Contact our sales team to discuss your specific requirements — we regularly accommodate smaller pilot orders for new hospital partnerships.',
      },
      {
        q: 'How do I get a formal price quote?',
        a: 'You can submit a quote request directly through our Request a Quote page. Provide your product category, estimated quantity, and delivery timeline. Our B2B procurement specialists will respond with a detailed commercial offer within 24 business hours, including unit pricing, volume discounts, and applicable taxes.',
      },
      {
        q: 'Do you offer volume discounts?',
        a: 'Yes. Our tiered pricing structure offers discounts starting from 10 units. Institutional contracts (50+ units or annual supply agreements) qualify for our best pricing, priority logistics, and dedicated account management. Multi-category orders are also eligible for bundled pricing.',
      },
      {
        q: 'Can I request a product sample before placing a bulk order?',
        a: 'Sample units are available for select product lines for qualified institutional buyers. Sample requests are evaluated case-by-case based on order intent and buyer profile. Contact our sales team at sales@marlonendomedical.com to request a sample evaluation.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept bank wire transfers (SWIFT/RTGS/NEFT), letters of credit (LC) for large international orders, and purchase orders from registered government and private hospitals. We do not accept credit card payments for wholesale orders at this time.',
      },
    ],
  },
  {
    id: 'products',
    icon: 'vaccines',
    label: 'Products & Specifications',
    faqs: [
      {
        q: 'What product categories does Marlon Endomedical carry?',
        a: 'We distribute across five major categories: Surgical Tools (laparoscopic, endoscopic, and open surgery instruments), Imaging Systems (ultrasound, X-ray, endoscopy cameras), Diagnostics Equipment (lab analyzers, point-of-care devices), Patient Monitoring Systems (vital sign monitors, ICU equipment), and Sterilization Systems (autoclaves, UV sterilizers).',
      },
      {
        q: 'Are your products OEM or branded?',
        a: 'We distribute both branded products from internationally recognized manufacturers and OEM/private-label instruments manufactured under our quality specifications. All products — branded or OEM — must pass our ISO 13485:2016 quality checks before shipment.',
      },
      {
        q: 'Can I request a specific brand or manufacturer?',
        a: 'Yes. If your hospital has a preferred brand or manufacturer, specify this in your quote request. We work with an extensive supplier network and can often source specific brands. If we cannot source a requested brand, we will suggest certified equivalents with full specification comparisons.',
      },
      {
        q: 'Do your products comply with international standards?',
        a: 'All products we distribute comply with relevant international standards and regulations including ISO 13485:2016, CE marking (for EU-bound shipments), BIS/CDSCO approvals (for Indian market), and HSN classification 9018/901814 for customs purposes. Country-specific documentation is provided with each shipment.',
      },
    ],
  },
  {
    id: 'shipping',
    icon: 'local_shipping',
    label: 'Shipping & Logistics',
    faqs: [
      {
        q: 'What countries do you ship to?',
        a: 'We ship globally. Our primary markets include India, Southeast Asia, the Middle East, Africa, and select European markets. For countries with specific medical device import regulations, we assist with required documentation including import permits, certificates of origin, and regulatory submissions.',
      },
      {
        q: 'What are typical lead times?',
        a: 'Standard stock items ship within 3–7 business days. Custom or made-to-order products typically require 3–6 weeks. Emergency procurement for critical care equipment can be expedited within 24–48 hours subject to stock availability. All lead times are stated in your formal quotation.',
      },
      {
        q: 'Do you offer cold-chain or specialized packaging?',
        a: 'Yes. We provide temperature-controlled cold-chain logistics for reagents, biologicals, and temperature-sensitive diagnostic equipment. Fragile imaging systems and sensitive instruments are shipped in custom-engineered protective packaging with shock and humidity indicators.',
      },
      {
        q: 'Who is responsible for import duties and customs clearance?',
        a: 'Shipments are typically made on EXW, FOB, or CIF Incoterms as agreed in your purchase order. For CIF shipments, we handle freight and insurance to the destination port. Import duties, customs clearance, and last-mile delivery are the buyer\'s responsibility unless otherwise specified in your contract.',
      },
    ],
  },
  {
    id: 'support',
    icon: 'support_agent',
    label: 'Support & Compliance',
    faqs: [
      {
        q: 'Do you provide after-sales technical support?',
        a: 'Yes. Our team of biomedical engineers provides installation support, operator training, and first-line technical troubleshooting for major equipment purchases. For ongoing maintenance, we can arrange service agreements with authorized service partners in your region.',
      },
      {
        q: 'What warranty is provided on your products?',
        a: 'Warranty terms vary by product and manufacturer. Standard warranty is 12 months from the date of shipment for most equipment. Capital equipment (imaging systems, large monitors) typically carries 24 months. Consumable instruments and single-use items do not carry a warranty beyond quality conformity at time of delivery.',
      },
      {
        q: 'How do I report a product defect or quality issue?',
        a: 'Contact support@marlonendomedical.com with your order number, product details, batch/lot number (if applicable), and a description of the issue. Our quality team will initiate a formal product complaint process within 2 business days, in accordance with ISO 13485 post-market surveillance requirements.',
      },
      {
        q: 'Are you registered with CDSCO (India)?',
        a: 'Yes. Marlon Endomedical Devices Pvt Ltd operates in compliance with the Medical Devices Rules, 2017 under the Central Drugs Standard Control Organisation (CDSCO). We hold appropriate import and distribution licenses for regulated medical device categories. Compliance certificates are available upon request.',
      },
    ],
  },
];

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div
      className="glass-panel"
      style={{
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        transition: 'var(--transition-med)',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-headline)',
            fontWeight: 600,
            fontSize: '0.9375rem',
            color: isOpen ? 'var(--primary-fixed-dim)' : 'var(--on-surface)',
            lineHeight: 1.5,
            transition: 'var(--transition-fast)',
          }}
        >
          {faq.q}
        </span>
        <span
          className="material-symbols-outlined"
          style={{
            fontSize: '1.25rem',
            color: 'var(--primary-fixed-dim)',
            flexShrink: 0,
            transition: 'transform var(--transition-med)',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          expand_more
        </span>
      </button>

      <div
        style={{
          maxHeight: isOpen ? '600px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div style={{ padding: '0 1.5rem 1.25rem' }}>
          <div style={{ height: '1px', background: 'var(--outline-variant)', marginBottom: '1rem' }} />
          <p className="body-md" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8 }}>
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [activeCategory, setActiveCategory] = useState('ordering');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.title = 'FAQ | Marlon Endomedical';
  }, []);

  const toggleFAQ = (key) => setOpenFAQ(openFAQ === key ? null : key);

  const filteredCategories = searchQuery.trim()
    ? faqCategories.map((cat) => ({
        ...cat,
        faqs: cat.faqs.filter(
          (f) =>
            f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            f.a.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter((cat) => cat.faqs.length > 0)
    : faqCategories;

  const totalResults = filteredCategories.reduce((sum, c) => sum + c.faqs.length, 0);

  return (
    <>
      {/* Hero */}
      <section className="page-hero" id="faq-hero">
        <div className="container">
          <div className="glass-panel animate-in" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 1rem', borderRadius: 'var(--radius-full)', marginBottom: '1.25rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--primary-fixed-dim)' }}>help</span>
            <span className="label-sm" style={{ color: 'var(--primary-fixed-dim)' }}>Frequently Asked Questions</span>
          </div>
          <h1 className="display-lg page-hero__title animate-in">How can we help?</h1>
          <p className="page-hero__desc animate-in animate-delay-1" style={{ marginBottom: '2rem' }}>
            Answers to the most common questions from hospital procurement teams,
            biomedical engineers, and logistics managers.
          </p>

          {/* Search */}
          <div className="animate-in animate-delay-2" style={{ maxWidth: '520px', margin: '0 auto', position: 'relative' }}>
            <span
              className="material-symbols-outlined"
              style={{
                position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
                color: 'var(--on-surface-variant)', fontSize: '1.25rem', pointerEvents: 'none',
              }}
            >
              search
            </span>
            <input
              type="search"
              className="input"
              placeholder="Search questions…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="faq-search"
              style={{ paddingLeft: '3rem', borderRadius: 'var(--radius-full)' }}
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section" style={{ padding: '5rem 0' }} id="faq-content">
        <div className="container">
          {searchQuery.trim() ? (
            /* Search results */
            <div>
              <p className="body-md" style={{ color: 'var(--on-surface-variant)', marginBottom: '2rem' }}>
                <strong style={{ color: 'var(--on-surface)' }}>{totalResults}</strong> result{totalResults !== 1 ? 's' : ''} for "{searchQuery}"
              </p>
              {filteredCategories.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: 'var(--on-surface-variant)', display: 'block', marginBottom: '1rem' }}>search_off</span>
                  <h3 className="headline-sm" style={{ marginBottom: '0.5rem' }}>No results found</h3>
                  <p className="body-md" style={{ color: 'var(--on-surface-variant)', marginBottom: '1.5rem' }}>
                    Try different keywords, or contact us directly.
                  </p>
                  <Link to="/contact" className="btn btn--primary">Contact Us</Link>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '3rem' }}>
                  {filteredCategories.map((cat) => (
                    <div key={cat.id}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                        <span className="material-symbols-outlined" style={{ color: 'var(--primary-fixed-dim)' }}>{cat.icon}</span>
                        <h2 className="headline-sm">{cat.label}</h2>
                      </div>
                      <div style={{ display: 'grid', gap: '0.75rem' }}>
                        {cat.faqs.map((faq, j) => {
                          const key = `${cat.id}-${j}`;
                          return (
                            <FAQItem
                              key={key}
                              faq={faq}
                              isOpen={openFAQ === key}
                              onToggle={() => toggleFAQ(key)}
                            />
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Category tabs + content */
            <div style={{ display: 'grid', gridTemplateColumns: '220px minmax(0, 1fr)', gap: '3rem', alignItems: 'start' }}>
              {/* Category Nav */}
              <div className="glass-panel animate-in" style={{ padding: '1rem', borderRadius: 'var(--radius-xl)', position: 'sticky', top: '6rem' }}>
                {faqCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      document.getElementById(`cat-${cat.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: 'none',
                      background: activeCategory === cat.id ? 'var(--surface-container-high)' : 'transparent',
                      cursor: 'pointer',
                      textAlign: 'left',
                      color: activeCategory === cat.id ? 'var(--primary-fixed-dim)' : 'var(--on-surface-variant)',
                      fontWeight: activeCategory === cat.id ? 700 : 400,
                      fontSize: '0.875rem',
                      transition: 'var(--transition-fast)',
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '1.1rem', flexShrink: 0 }}>{cat.icon}</span>
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* FAQ Sections */}
              <div className="animate-in animate-delay-1" style={{ display: 'grid', gap: '3.5rem' }}>
                {faqCategories.map((cat) => (
                  <div
                    key={cat.id}
                    id={`cat-${cat.id}`}
                    style={{ scrollMarginTop: '7rem' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1.5rem' }}>
                      <div style={{
                        width: '2.5rem', height: '2.5rem', borderRadius: 'var(--radius-md)', flexShrink: 0,
                        background: 'var(--surface-container-high)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '1.25rem', color: 'var(--primary-fixed-dim)' }}>{cat.icon}</span>
                      </div>
                      <div>
                        <h2 className="headline-md">{cat.label}</h2>
                        <span className="label-sm" style={{ color: 'var(--on-surface-variant)' }}>{cat.faqs.length} questions</span>
                      </div>
                    </div>
                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                      {cat.faqs.map((faq, j) => {
                        const key = `${cat.id}-${j}`;
                        return (
                          <FAQItem
                            key={key}
                            faq={faq}
                            isOpen={openFAQ === key}
                            onToggle={() => toggleFAQ(key)}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Still have questions CTA */}
      <section style={{ background: 'var(--surface-container-low)', padding: '5rem 0' }} id="faq-cta">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '2.5rem', color: 'var(--primary-fixed-dim)', display: 'block', marginBottom: '1rem' }}>contact_support</span>
          <h2 className="headline-lg" style={{ marginBottom: '0.75rem' }}>Still have questions?</h2>
          <p className="body-lg" style={{ color: 'var(--on-surface-variant)', marginBottom: '2rem', maxWidth: '480px', margin: '0 auto 2rem' }}>
            Our procurement specialists are available Mon–Fri, 9am–6pm IST.
            Typical response time is under 4 hours.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn--primary btn--lg">
              <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>mail</span>
              Send Us a Message
            </Link>
            <Link to="/quote" className="btn btn--lg glass-panel">
              <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>request_quote</span>
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
