import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const timeline = [
  { year: '2012', title: 'Foundation', desc: 'Marlon Endomedical Devices Pvt Ltd was established as a medical device distribution company serving regional hospitals.' },
  { year: '2015', title: 'ISO 13485 Certification', desc: 'Achieved ISO 13485:2016 quality management certification, marking our commitment to international standards.' },
  { year: '2018', title: 'Strategic Partnership with Mannat Hospital', desc: 'Became the exclusive surgical instrument supplier for Mannat Hospital, expanding into tier-1 institutional partnerships.' },
  { year: '2020', title: 'Global Logistics Network', desc: 'Launched 24-hour global response logistics with distribution centers supporting hospitals across multiple countries.' },
  { year: '2024', title: 'Digital Transformation', desc: 'Introduced our digital wholesale portal and AI-powered inventory management for faster procurement cycles.' },
];

const values = [
  { icon: 'precision_manufacturing', title: 'Precision Engineering', desc: 'Every instrument we distribute meets the highest standards of surgical precision and reliability.' },
  { icon: 'verified_user', title: 'Quality Assurance', desc: 'ISO 13485:2016 certified processes ensure consistent quality across our entire product range.' },
  { icon: 'local_shipping', title: 'Rapid Logistics', desc: '24-hour average response time with specialized cold-chain and sensitive-device logistics.' },
  { icon: 'handshake', title: 'Partnership Focus', desc: 'We\'re more than a supplier — we\'re a long-term strategic partner for your medical facility.' },
  { icon: 'support_agent', title: 'Expert Support', desc: 'Our team of biomedical engineers provides technical consultation and after-sales support.' },
  { icon: 'public', title: 'Global Reach', desc: 'Distribution network spanning multiple continents with regulatory compliance in each market.' },
];

const stats = [
  { value: '12+', label: 'Years of Excellence' },
  { value: '500+', label: 'Hospital Partners' },
  { value: '10K+', label: 'Devices Delivered' },
  { value: '24H', label: 'Avg. Response Time' },
];

export default function AboutPage() {
  useEffect(() => {
    document.title = 'About Us | Marlon Endomedical';
  }, []);

  return (
    <>
      {/* Page Hero */}
      <section className="page-hero" id="about-hero">
        <div className="container">
          <h1 className="display-lg page-hero__title animate-in">
            Precision Engineering<br />for Life
          </h1>
          <p className="page-hero__desc animate-in animate-delay-1">
            Since 2012, Marlon Endomedical has been the trusted bridge between
            world-class surgical instrumentation and the hospitals that save lives.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ background: 'var(--surface-container-low)', padding: '3rem 0' }} id="about-stats">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            {stats.map((stat, i) => (
              <div key={i} className={`animate-in animate-delay-${i + 1}`}>
                <div style={{ fontFamily: 'var(--font-headline)', fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary-fixed-dim)' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, opacity: 0.6, marginTop: '0.25rem' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Story */}
      <section className="section" style={{ padding: '6rem 0' }} id="about-mission">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem' }}>
            <div style={{ maxWidth: '720px' }}>
              <div className="label-sm" style={{ color: 'var(--primary-fixed-dim)', marginBottom: '1rem' }}>Our Mission</div>
              <h2 className="headline-lg" style={{ marginBottom: '1.5rem' }}>
                Bridging the gap between precision engineering and clinical excellence
              </h2>
              <p className="body-lg" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                Marlon Endomedical Devices Pvt Ltd serves as the strategic partner for Mannat Hospital
                and tier-1 medical facilities worldwide. As a subsidiary of the Marlon Endomedical &amp; Mannat Hospital
                group, we specialize in bulk procurement and rapid global logistics for high-stakes medical environments.
              </p>
              <p className="body-md" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8 }}>
                Our compliance-first approach ensures every instrument and device we distribute meets
                international regulatory standards including HSN 901814 and 9018 medical instrument
                categories, with full ISO 13485:2016 quality management certification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section" style={{ background: 'var(--surface-container-low)', padding: '6rem 0' }} id="about-values">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="label-sm" style={{ color: 'var(--primary-fixed-dim)', marginBottom: '1rem' }}>Core Values</div>
            <h2 className="headline-lg">What Drives Us</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {values.map((val, i) => (
              <div key={i} className={`value-card animate-in animate-delay-${(i % 4) + 1}`}>
                <div className="value-card__icon">
                  <span className="material-symbols-outlined">{val.icon}</span>
                </div>
                <h3 className="headline-sm" style={{ marginBottom: '0.75rem' }}>{val.title}</h3>
                <p className="body-sm" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.7 }}>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section" style={{ padding: '6rem 0' }} id="about-timeline">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="label-sm" style={{ color: 'var(--primary-fixed-dim)', marginBottom: '1rem' }}>Our Journey</div>
            <h2 className="headline-lg">A Decade of Excellence</h2>
          </div>
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <div className="about-timeline">
              {timeline.map((item, i) => (
                <div key={i} className={`timeline-item animate-in animate-delay-${(i % 4) + 1}`}>
                  <div className="timeline-item__dot"></div>
                  <div className="timeline-item__year">{item.year}</div>
                  <div className="timeline-item__title">{item.title}</div>
                  <p className="timeline-item__desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="about-cta">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="headline-lg" style={{ color: 'var(--on-primary)', marginBottom: '1rem' }}>
            Ready to Partner with Us?
          </h2>
          <p style={{ color: 'var(--primary-fixed)', fontSize: '1.125rem', marginBottom: '2rem' }}>
            Join 500+ hospitals worldwide who trust Marlon Endomedical for their surgical instrumentation needs.
          </p>
          <Link to="/contact" className="btn btn--cta btn--lg" id="about-cta-btn">
            Get in Touch
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </section>
    </>
  );
}
