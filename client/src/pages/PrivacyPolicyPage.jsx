import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const sections = [
  {
    id: 'information-we-collect',
    icon: 'dataset',
    title: '1. Information We Collect',
    content: [
      {
        subtitle: '1.1 Information You Provide Directly',
        text: 'When you submit a quote request, contact form, product inquiry, or newsletter signup on our website, we collect: full name, email address, phone number, organization/hospital name, designation, and the content of your message or requirements.',
      },
      {
        subtitle: '1.2 Information Collected Automatically',
        text: 'When you visit our website, we may automatically collect certain technical data including your IP address, browser type and version, operating system, referring URLs, pages visited, and time spent on pages. This data is collected through standard server logs and, where applicable, cookies.',
      },
      {
        subtitle: '1.3 Information from Third Parties',
        text: 'We do not purchase or acquire personal data from third-party data brokers. Any information received from third parties (such as referral partners) is handled under the same standards described in this Policy.',
      },
    ],
  },
  {
    id: 'how-we-use',
    icon: 'manage_search',
    title: '2. How We Use Your Information',
    content: [
      {
        subtitle: 'Primary Business Purposes',
        text: 'We use the personal data you provide to: respond to your inquiries and quote requests; prepare and send commercial proposals; process and fulfil orders; send order confirmations, invoices, and logistics updates; and provide after-sales technical support.',
      },
      {
        subtitle: 'Communication and Marketing',
        text: 'With your explicit consent (newsletter signup), we may send you product updates, industry news, regulatory bulletins, and promotional materials. You may withdraw consent at any time by clicking "Unsubscribe" in any email or by contacting us directly.',
      },
      {
        subtitle: 'Legal and Compliance',
        text: 'We may process your data to comply with applicable laws and regulations, respond to legal requests from government authorities, enforce our contractual rights, and protect the safety and security of our business and users.',
      },
    ],
  },
  {
    id: 'data-sharing',
    icon: 'share',
    title: '3. Data Sharing & Disclosure',
    content: [
      {
        subtitle: 'We Do Not Sell Your Data',
        text: 'Marlon Endomedical does not sell, rent, or trade your personal information to any third party for marketing or commercial purposes.',
      },
      {
        subtitle: 'Service Providers',
        text: 'We share data with vetted third-party service providers who assist us in operating our website and business — including cloud hosting providers, email service providers, and logistics partners. These parties are contractually bound to use your data solely to provide services to us and in accordance with this Policy.',
      },
      {
        subtitle: 'Business Partners',
        text: 'As a subsidiary of the Marlon Endomedical & Mannat Hospital group, certain data may be shared internally with affiliated entities for operational and compliance purposes.',
      },
      {
        subtitle: 'Legal Requirements',
        text: 'We may disclose your information if required by law, court order, or government regulation, or when we believe disclosure is necessary to protect our rights, prevent fraud, or ensure the safety of others.',
      },
    ],
  },
  {
    id: 'data-security',
    icon: 'security',
    title: '4. Data Security',
    content: [
      {
        subtitle: 'Technical Safeguards',
        text: 'We implement industry-standard security measures including HTTPS/TLS encryption for all data in transit, access controls limiting who can view personal data, regular security reviews, and secure server infrastructure. Our systems are monitored for unauthorized access.',
      },
      {
        subtitle: 'Limitations',
        text: 'While we apply reasonable security practices, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security of your data. In the event of a data breach that affects your rights, we will notify you as required by applicable law.',
      },
    ],
  },
  {
    id: 'data-retention',
    icon: 'history',
    title: '5. Data Retention',
    content: [
      {
        text: 'We retain personal data for as long as necessary to fulfil the purposes for which it was collected, including maintaining business records, complying with legal obligations (typically 7 years for commercial documents under Indian law), resolving disputes, and enforcing agreements. Inquiry data from non-converted leads is typically retained for 2 years. Newsletter subscriber data is retained until you unsubscribe.',
      },
    ],
  },
  {
    id: 'your-rights',
    icon: 'gavel',
    title: '6. Your Rights',
    content: [
      {
        subtitle: 'Access and Portability',
        text: 'You have the right to request a copy of the personal data we hold about you and to receive it in a structured, machine-readable format.',
      },
      {
        subtitle: 'Rectification',
        text: 'You may request correction of any inaccurate or incomplete personal data we hold about you.',
      },
      {
        subtitle: 'Erasure',
        text: 'You may request deletion of your personal data where there is no legitimate reason for us to continue processing it, subject to legal retention requirements.',
      },
      {
        subtitle: 'Withdrawal of Consent',
        text: 'Where processing is based on your consent (e.g., newsletter), you may withdraw consent at any time without affecting the lawfulness of prior processing.',
      },
      {
        subtitle: 'How to Exercise Your Rights',
        text: 'To exercise any of the above rights, contact our Data Protection Officer at privacy@marlonendomedical.com. We will respond within 30 days.',
      },
    ],
  },
  {
    id: 'cookies',
    icon: 'cookie',
    title: '7. Cookies',
    content: [
      {
        text: 'Our website uses essential cookies necessary for core functionality such as session management and security. We do not currently use tracking cookies, advertising cookies, or third-party analytics cookies that collect personal data without disclosure. You may configure your browser to refuse all cookies; however, some website features may not function correctly as a result.',
      },
    ],
  },
  {
    id: 'childrens-privacy',
    icon: 'child_care',
    title: '8. Children\'s Privacy',
    content: [
      {
        text: 'Our website and services are directed exclusively at business professionals and medical institutions. We do not knowingly collect personal data from individuals under 18 years of age. If we become aware that a minor has submitted personal data without parental consent, we will promptly delete that data.',
      },
    ],
  },
  {
    id: 'contact',
    icon: 'contact_mail',
    title: '9. Contact & Updates',
    content: [
      {
        subtitle: 'Data Protection Officer',
        text: 'For privacy-related inquiries, please contact: privacy@marlonendomedical.com | Marlon Endomedical Devices Pvt Ltd, Industrial Area, Phase-II, Chandigarh, India 160002',
      },
      {
        subtitle: 'Policy Updates',
        text: 'We may update this Privacy Policy from time to time. When we make material changes, we will update the "Last Updated" date at the top of this page. We encourage you to review this Policy periodically. Continued use of our website after changes are posted constitutes acceptance of the revised Policy.',
      },
    ],
  },
];

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    document.title = 'Privacy Policy | Marlon Endomedical';
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* Hero */}
      <section className="page-hero" id="privacy-hero">
        <div className="container">
          <div className="glass-panel animate-in" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 1rem', borderRadius: 'var(--radius-full)', marginBottom: '1.25rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--primary-fixed-dim)' }}>privacy_tip</span>
            <span className="label-sm" style={{ color: 'var(--primary-fixed-dim)' }}>Last Updated: April 5, 2026</span>
          </div>
          <h1 className="display-lg page-hero__title animate-in">Privacy Policy</h1>
          <p className="page-hero__desc animate-in animate-delay-1">
            Marlon Endomedical Devices Pvt Ltd is committed to protecting the personal data of our
            clients, partners, and website visitors. This Policy explains what data we collect,
            why we collect it, and how we keep it secure.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section" style={{ padding: '5rem 0' }} id="privacy-content">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '240px minmax(0, 1fr)', gap: '3.5rem', alignItems: 'start' }}>

            {/* Sticky Table of Contents */}
            <div className="glass-panel animate-in" style={{ padding: '1.5rem', borderRadius: 'var(--radius-xl)', position: 'sticky', top: '6rem' }}>
              <h3 className="label-sm" style={{ textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--on-surface-variant)', marginBottom: '1rem' }}>Contents</h3>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    style={{
                      background: activeSection === s.id ? 'var(--surface-container-high)' : 'transparent',
                      border: 'none',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.5rem 0.75rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      color: activeSection === s.id ? 'var(--primary-fixed-dim)' : 'var(--on-surface-variant)',
                      fontSize: '0.8rem',
                      fontWeight: activeSection === s.id ? 700 : 400,
                      lineHeight: 1.4,
                      transition: 'var(--transition-fast)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '0.875rem', flexShrink: 0 }}>{s.icon}</span>
                    {s.title.replace(/^\d+\.\s/, '')}
                  </button>
                ))}
              </nav>
            </div>

            {/* Policy Text */}
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

                  <div style={{ display: 'grid', gap: '1.25rem' }}>
                    {section.content.map((block, i) => (
                      <div key={i} className="glass-panel" style={{ padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-lg)' }}>
                        {block.subtitle && (
                          <h4 style={{ fontWeight: 700, fontSize: '0.9375rem', marginBottom: '0.5rem', color: 'var(--on-surface)' }}>
                            {block.subtitle}
                          </h4>
                        )}
                        <p className="body-md" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8 }}>
                          {block.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Footer note */}
              <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-xl)', borderLeft: '3px solid var(--primary-container)' }}>
                <p className="body-sm" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8 }}>
                  This Privacy Policy applies to data collected through{' '}
                  <strong style={{ color: 'var(--on-surface)' }}>www.marlonendomedical.com</strong> and
                  any direct business communications with Marlon Endomedical Devices Pvt Ltd.
                  It does not apply to third-party websites linked from our site.
                  For questions, contact{' '}
                  <a href="mailto:privacy@marlonendomedical.com" style={{ color: 'var(--primary-fixed-dim)' }}>
                    privacy@marlonendomedical.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="headline-lg" style={{ color: 'var(--on-primary)', marginBottom: '1rem' }}>
            Questions About Your Data?
          </h2>
          <p style={{ color: 'var(--primary-fixed)', fontSize: '1.125rem', marginBottom: '2rem' }}>
            Contact our Data Protection Officer — we'll respond within 30 days.
          </p>
          <Link to="/contact" className="btn btn--cta btn--lg">
            Contact Us
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </section>
    </>
  );
}
