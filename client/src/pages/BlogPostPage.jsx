import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

// We import the same posts array used in BlogPage. If you move this to a backend later, fetch by slug.
const posts = [
  {
    id: 1,
    slug: 'iso-13485-what-hospitals-need-to-know',
    category: 'Regulatory',
    categoryIcon: 'policy',
    title: 'ISO 13485:2016 — What Hospital Procurement Teams Need to Know',
    content: "ISO 13485 is the quality management benchmark for medical device supply chains... \n\nWhen sourcing surgical tools or life-saving equipment, ensuring the supplier holds a valid ISO 13485 certification safeguards the hospital from procuring sub-standard or counterfeit devices. Procurement teams should mandate this certification in all their RFPs.",
    readTime: '6 min read',
    date: 'March 28, 2026',
    author: 'Dr. Ananya Sharma',
    authorRole: 'Head of Regulatory Affairs',
    featured: true,
    tags: ['ISO 13485', 'Compliance', 'Procurement'],
  },
  {
    id: 2,
    slug: '4k-endoscopy-clinical-advantages',
    category: 'Clinical Insights',
    categoryIcon: 'biotech',
    title: 'The Clinical Case for 4K Endoscopy — Is the Upgrade Worth It?',
    content: "With 4K endoscopy systems now accessible at near-HD price points, we examine the clinical outcomes data, workflow implications, and ROI considerations for hospitals considering an upgrade.\n\n4K resolution offers four times the pixel density of standard HD. For delicate procedures like neurosurgery or complex spine surgery, this extra clarity can mean the difference between cleanly dissecting a vital nerve or causing inadvertent damage. ROI depends on your caseload and procedural complexity.",
    readTime: '8 min read',
    date: 'March 14, 2026',
    author: 'Rohit Mehra',
    authorRole: 'Biomedical Applications Specialist',
    featured: false,
    tags: ['Endoscopy', 'Imaging', 'Clinical Outcomes'],
  },
  {
    id: 3,
    slug: 'bulk-procurement-guide-medical-devices',
    category: 'Procurement Guide',
    categoryIcon: 'shopping_bag',
    title: 'A Complete Guide to Bulk Medical Device Procurement for Hospitals',
    content: "From vendor qualification and compliance verification to contract structure and logistics planning — a step-by-step guide for hospital biomedical engineers and supply chain managers.\n\nDeveloping a tiered vendor system allows procurement departments to maintain steady supplies while optimizing costs. Always consider Total Cost of Ownership (TCO), which includes maintenance, rather than just the initial unit price.",
    readTime: '10 min read',
    date: 'February 27, 2026',
    author: 'Priya Kapoor',
    authorRole: 'B2B Procurement Lead',
    featured: false,
    tags: ['Procurement', 'Supply Chain', 'Hospital Management'],
  },
  {
    id: 4,
    slug: 'cssd-autoclave-selection-guide',
    category: 'Product Spotlight',
    categoryIcon: 'inventory_2',
    title: 'How to Choose the Right Autoclave for Your Hospital CSSD',
    content: "Class B, Class N, or Class S? Gravity vs pre-vacuum cycles? This guide covers the key specifications, load types, throughput requirements, and compliance standards to evaluate when procuring autoclave systems.\n\nClass B autoclaves are essential for any hospital processing hollow or porous instruments. They utilize a pre-vacuum cycle to remove ambient air entirely before steam sterilization, ensuring steam penetrates every crevice.",
    readTime: '7 min read',
    date: 'February 10, 2026',
    author: 'Vikram Singh',
    authorRole: 'Sterilisation Systems Consultant',
    featured: false,
    tags: ['Sterilization', 'CSSD', 'Equipment Selection'],
  },
  {
    id: 5,
    slug: 'cdsco-medical-device-rules-2017',
    category: 'Regulatory',
    categoryIcon: 'policy',
    title: 'Navigating India\'s Medical Device Rules 2017 — An Importer\'s Guide',
    content: "CDSCO registration, Schedule I notified devices, BIS quality control orders — India\'s medical device regulatory landscape has changed significantly. Here\'s what distributors and importers must know.\n\nThe Central Drugs Standard Control Organisation (CDSCO) now mandates stringent import licenses. Devices are classified into four classes (A to D). Ensure your manufacturer complies with the Medical Device Rules (MDR) 2017 to avoid supply chain disruptions at customs.",
    readTime: '9 min read',
    date: 'January 22, 2026',
    author: 'Dr. Ananya Sharma',
    authorRole: 'Head of Regulatory Affairs',
    featured: false,
    tags: ['CDSCO', 'India Regulations', 'Import Compliance'],
  },
  {
    id: 6,
    slug: 'patient-monitoring-icu-buying-guide',
    category: 'Product Spotlight',
    categoryIcon: 'inventory_2',
    title: 'Buying Guide: Multi-Parameter Patient Monitors for ICU & HDU',
    content: "SpO2, NIBP, ECG, EtCO2, IBP — not all patient monitors are equal. This guide helps biomedical procurement teams specify the right monitoring solution for intensive and high-dependency care units.\n\nWhen outfitting an ICU, prioritize monitors with EtCO2 (End-tidal CO2) capabilities, as capnography provides rapid feedback on patient ventilation status. Central station connectivity via HL7 is also critical for modern data workflows.",
    readTime: '8 min read',
    date: 'January 8, 2026',
    author: 'Rohit Mehra',
    authorRole: 'Biomedical Applications Specialist',
    featured: false,
    tags: ['Patient Monitoring', 'ICU', 'Equipment Guide'],
  },
];

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Simulate fetching from API
    const foundPost = posts.find(p => p.slug === slug);
    if (foundPost) {
      setPost(foundPost);
      document.title = `${foundPost.title} | Marlon Endomedical`;
    } else {
      document.title = 'Article Not Found | Marlon Endomedical';
    }
  }, [slug]);

  if (!post) {
    return (
      <section className="section" style={{ padding: '8rem 0', textAlign: 'center' }}>
        <div className="container">
          <h1 className="headline-lg">Article Not Found</h1>
          <p className="body-md">The article you are looking for does not exist or has been removed.</p>
          <Link to="/blog" className="btn btn--primary" style={{ marginTop: '2rem' }}>Back to Blog</Link>
        </div>
      </section>
    );
  }

  return (
    <article className="section" style={{ padding: '6rem 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--primary-fixed-dim)', textDecoration: 'none', fontWeight: 600 }}>
          <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>arrow_back</span>
          Back to Insights
        </Link>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1.5rem' }}>
          <span className="label-sm" style={{ backgroundColor: 'var(--primary-container)', color: '#fff', padding: '0.2rem 0.625rem', borderRadius: 'var(--radius-full)' }}>{post.category}</span>
          <span className="body-sm" style={{ color: 'var(--on-surface-variant)' }}>{post.readTime} · {post.date}</span>
        </div>
        <h1 className="display-md" style={{ marginBottom: '2rem', lineHeight: 1.2 }}>{post.title}</h1>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', paddingBottom: '2rem', borderBottom: '1px solid var(--outline-variant)', marginBottom: '3rem' }}>
          <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', backgroundColor: 'var(--primary-fixed-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: '1.5rem' }}>person</span>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1rem' }}>{post.author}</div>
            <div className="body-sm" style={{ color: 'var(--on-surface-variant)' }}>{post.authorRole}</div>
          </div>
        </div>

        <div className="body-lg" style={{ lineHeight: 1.8, color: 'var(--on-surface)', whiteSpace: 'pre-wrap' }}>
          {post.content}
        </div>

        <div style={{ marginTop: '4rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {post.tags.map(tag => (
            <span key={tag} style={{ backgroundColor: 'var(--surface-container-high)', padding: '0.3rem 0.8rem', borderRadius: 'var(--radius-full)', fontSize: '0.85rem', color: 'var(--on-surface-variant)' }}>
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
