import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const posts = [
  {
    id: 1,
    slug: 'iso-13485-what-hospitals-need-to-know',
    category: 'Regulatory',
    categoryIcon: 'policy',
    title: 'ISO 13485:2016 — What Hospital Procurement Teams Need to Know',
    excerpt: 'ISO 13485 is the quality management benchmark for medical device supply chains. We explain what it means in practice for hospital procurement and why it should be a non-negotiable supplier requirement.',
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
    excerpt: 'With 4K endoscopy systems now accessible at near-HD price points, we examine the clinical outcomes data, workflow implications, and ROI considerations for hospitals considering an upgrade.',
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
    excerpt: 'From vendor qualification and compliance verification to contract structure and logistics planning — a step-by-step guide for hospital biomedical engineers and supply chain managers.',
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
    excerpt: 'Class B, Class N, or Class S? Gravity vs pre-vacuum cycles? This guide covers the key specifications, load types, throughput requirements, and compliance standards to evaluate when procuring autoclave systems.',
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
    excerpt: 'CDSCO registration, Schedule I notified devices, BIS quality control orders — India\'s medical device regulatory landscape has changed significantly. Here\'s what distributors and importers must know.',
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
    excerpt: 'SpO2, NIBP, ECG, EtCO2, IBP — not all patient monitors are equal. This guide helps biomedical procurement teams specify the right monitoring solution for intensive and high-dependency care units.',
    readTime: '8 min read',
    date: 'January 8, 2026',
    author: 'Rohit Mehra',
    authorRole: 'Biomedical Applications Specialist',
    featured: false,
    tags: ['Patient Monitoring', 'ICU', 'Equipment Guide'],
  },
];

const allTags = [...new Set(posts.flatMap((p) => p.tags))];
const allCategories = [...new Set(posts.map((p) => p.category))];

function PostCard({ post, size = 'normal' }) {
  if (size === 'featured') {
    return (
      <div className="glass-panel animate-in" style={{ padding: '2rem', borderRadius: 'var(--radius-xl)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, var(--primary-container), var(--secondary))' }} />
        <div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ background: 'var(--primary-container)', color: '#fff', fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.625rem', borderRadius: 'var(--radius-full)' }}>Featured</span>
            <span className="label-sm" style={{ color: 'var(--primary-fixed-dim)' }}>{post.category}</span>
          </div>
          <h2 className="headline-lg" style={{ marginBottom: '1rem', lineHeight: 1.3 }}>{post.title}</h2>
          <p className="body-md" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.7, marginBottom: '1.5rem' }}>{post.excerpt}</p>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link to={`/blog/${post.slug}`} className="btn btn--primary">
              Read Article
              <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>arrow_forward</span>
            </Link>
            <span className="body-sm" style={{ color: 'var(--on-surface-variant)' }}>{post.readTime} · {post.date}</span>
          </div>
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            {post.tags.map((tag) => (
              <span key={tag} style={{ fontSize: '0.75rem', background: 'var(--surface-container-high)', padding: '0.2rem 0.625rem', borderRadius: 'var(--radius-full)', color: 'var(--on-surface-variant)' }}>{tag}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginTop: '1rem' }}>
            <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'var(--primary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span className="material-symbols-outlined" style={{ fontSize: '1.25rem', color: '#fff' }}>person</span>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{post.author}</div>
              <div className="body-sm" style={{ color: 'var(--on-surface-variant)', fontSize: '0.8125rem' }}>{post.authorRole}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel animate-in" style={{ padding: '1.5rem', borderRadius: 'var(--radius-xl)', display: 'flex', flexDirection: 'column', gap: '0.875rem', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '0.875rem', color: 'var(--primary-fixed-dim)' }}>{post.categoryIcon}</span>
          <span className="label-sm" style={{ color: 'var(--primary-fixed-dim)' }}>{post.category}</span>
        </div>
        <span className="body-sm" style={{ color: 'var(--on-surface-variant)', fontSize: '0.75rem' }}>{post.readTime}</span>
      </div>
      <h3 className="headline-sm" style={{ lineHeight: 1.4 }}>{post.title}</h3>
      <p className="body-sm" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.7, flex: 1 }}>{post.excerpt}</p>
      <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
        {post.tags.map((tag) => (
          <span key={tag} style={{ fontSize: '0.7rem', background: 'var(--surface-container-high)', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)', color: 'var(--on-surface-variant)' }}>{tag}</span>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px solid var(--outline-variant)' }}>
        <div>
          <div style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{post.author}</div>
          <div className="body-sm" style={{ color: 'var(--on-surface-variant)', fontSize: '0.75rem' }}>{post.date}</div>
        </div>
        <Link to={`/blog/${post.slug}`} style={{ color: 'var(--primary-fixed-dim)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8125rem', fontWeight: 600, textDecoration: 'none' }}>
          Read
          <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('');
  const [activeTag, setActiveTag]         = useState('');
  const [search, setSearch]               = useState('');

  useEffect(() => {
    document.title = 'Insights & News | Marlon Endomedical';
  }, []);

  const featured = posts.find((p) => p.featured);
  const filtered = posts.filter((p) => {
    if (p.featured && !activeCategory && !activeTag && !search) return false; // shown separately
    const matchCat = !activeCategory || p.category === activeCategory;
    const matchTag = !activeTag || p.tags.includes(activeTag);
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchTag && matchSearch;
  });

  // When filtering, include featured post in results too
  const showingFiltered = activeCategory || activeTag || search;
  const filteredWithFeatured = showingFiltered
    ? posts.filter((p) => {
        const matchCat = !activeCategory || p.category === activeCategory;
        const matchTag = !activeTag || p.tags.includes(activeTag);
        const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchTag && matchSearch;
      })
    : filtered;

  return (
    <>
      {/* Hero */}
      <section className="page-hero" id="blog-hero">
        <div className="container">
          <div className="glass-panel animate-in" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 1rem', borderRadius: 'var(--radius-full)', marginBottom: '1.25rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--primary-fixed-dim)' }}>article</span>
            <span className="label-sm" style={{ color: 'var(--primary-fixed-dim)' }}>Insights &amp; Industry News</span>
          </div>
          <h1 className="display-lg page-hero__title animate-in">Knowledge Hub</h1>
          <p className="page-hero__desc animate-in animate-delay-1" style={{ marginBottom: '2rem' }}>
            Regulatory updates, clinical insights, procurement guides, and product spotlights
            from the Marlon Endomedical team of biomedical specialists.
          </p>
          {/* Search */}
          <div className="animate-in animate-delay-2" style={{ maxWidth: '480px', margin: '0 auto', position: 'relative' }}>
            <span className="material-symbols-outlined" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--on-surface-variant)', fontSize: '1.25rem', pointerEvents: 'none' }}>search</span>
            <input type="search" className="input" placeholder="Search articles…" value={search} onChange={(e) => { setSearch(e.target.value); setActiveCategory(''); setActiveTag(''); }} style={{ paddingLeft: '3rem', borderRadius: 'var(--radius-full)' }} />
          </div>
        </div>
      </section>

      <section className="section" style={{ padding: '5rem 0' }} id="blog-content">
        <div className="container">
          {/* Filters */}
          <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap', marginBottom: '2.5rem', alignItems: 'center' }}>
            <span className="label-sm" style={{ color: 'var(--on-surface-variant)', marginRight: '0.25rem' }}>Filter:</span>
            <button onClick={() => { setActiveCategory(''); setActiveTag(''); setSearch(''); }} className={activeCategory || activeTag || search ? 'btn glass-panel' : 'btn btn--primary'} style={{ fontSize: '0.8125rem', padding: '0.35rem 0.875rem' }}>All</button>
            {allCategories.map((cat) => (
              <button key={cat} onClick={() => { setActiveCategory(cat); setActiveTag(''); setSearch(''); }}
                className={activeCategory === cat ? 'btn btn--primary' : 'btn glass-panel'}
                style={{ fontSize: '0.8125rem', padding: '0.35rem 0.875rem' }}>
                {cat}
              </button>
            ))}
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {allTags.map((tag) => (
              <button key={tag} onClick={() => { setActiveTag(activeTag === tag ? '' : tag); setSearch(''); }}
                style={{ fontSize: '0.75rem', padding: '0.2rem 0.625rem', borderRadius: 'var(--radius-full)', border: `1px solid ${activeTag === tag ? 'var(--primary-fixed-dim)' : 'var(--outline-variant)'}`, background: activeTag === tag ? 'var(--surface-container-high)' : 'transparent', color: activeTag === tag ? 'var(--primary-fixed-dim)' : 'var(--on-surface-variant)', cursor: 'pointer', transition: 'var(--transition-fast)' }}>
                #{tag}
              </button>
            ))}
          </div>

          {/* Featured post */}
          {!showingFiltered && featured && (
            <div style={{ marginBottom: '3rem' }}>
              <PostCard post={featured} size="featured" />
            </div>
          )}

          {/* Posts grid */}
          {filteredWithFeatured.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: 'var(--on-surface-variant)', display: 'block', marginBottom: '1rem' }}>search_off</span>
              <h3 className="headline-sm" style={{ marginBottom: '0.5rem' }}>No articles found</h3>
              <p className="body-md" style={{ color: 'var(--on-surface-variant)' }}>Try a different search term or filter.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {filteredWithFeatured.map((post, i) => (
                <div key={post.id} className={`animate-in animate-delay-${(i % 4) + 1}`} style={{ display: 'flex', flexDirection: 'column' }}>
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          )}

          {/* Newsletter CTA */}
          <div className="glass-panel animate-in" style={{ padding: '2rem', borderRadius: 'var(--radius-xl)', marginTop: '4rem', display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'center' }}>
            <div>
              <h3 className="headline-md" style={{ marginBottom: '0.5rem' }}>Stay ahead of medical device regulations</h3>
              <p className="body-md" style={{ color: 'var(--on-surface-variant)' }}>Get our monthly digest of regulatory updates, procurement guides, and product news.</p>
            </div>
            <Link to="/contact" className="btn btn--primary btn--lg" style={{ whiteSpace: 'nowrap' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>mail</span>
              Subscribe
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
