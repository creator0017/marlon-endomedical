import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';

const categories = [
  { key: '', label: 'All Devices' },
  { key: 'spine-surgery', label: 'Spine Surgery' },
  { key: 'surgical-tools', label: 'Surgical Tools' },
  { key: 'imaging-systems', label: 'Imaging Systems' },
  { key: 'diagnostics', label: 'Diagnostics' },
  { key: 'monitoring', label: 'Monitoring' },
  { key: 'sterilization', label: 'Sterilization' },
];

// Shared placeholder for spine surgery products until real images are uploaded to /products/
const SPINE_IMG = '/products/spine-placeholder.jpg';

const fallbackProducts = [
  { _id: '1', slug: 'hd-endoscopy-unit', name: 'HD Endoscopy Unit', subtitle: 'Precision 4K Visualization', category: 'imaging-systems', price: 'POA', inStock: true, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAK9ZMPKWDLAIwRlqlD4pZ-LlBD3kVzi1Qb8NR2QRk7Yk9S5WodKDHJAGxWXFrjcpX95sGoxg1_6f_OempfxYioPo5LjPei8P6gYANZ2SivYW1E0f2Z8N8b68USgg_bR8PyhUailHrIiOi9tRdsBZknawYPBr684hTQmLSlLNpXOIm39FDVLRzZ4ZjsZtxAOLLSsohHUlpakCjMGpm_SHz0O4T_3o183sypDd0uZBRzrBRxZd9GPtvM6ptE6wZVMfpuqMCBvGzTa7s' },
  { _id: '2', slug: 'titanium-forceps-set', name: 'Titanium Forceps Set', subtitle: 'Ultra-Lightweight Grade 5', category: 'surgical-tools', price: 'POA', inStock: true, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcz6Zza1kV_1xkHX27N4w0-ADI690N9CXe2lMOF7wLNpdy7lr6Nn0BTP8xKJ9U_JXT15KJzMLL9IJZjan9tKOXMP4mzb49mQ_nPt65AXXoOdzQAV4QSK3mi0zTM243Hwf3yiqiQLxMSbAOYfB0_xLw8PyWSSIAj_UThIeC7UqhxR6rBJ6NXwB3b3E4wFE1WRojGDUQxxdMVw4vcgsNLEQkCJMBXOxxmrYUgMys155CCQnKWxL2B073tc0dOnl4WdDFB5U5pKkMX_4' },
  { _id: '3', slug: 'digital-autoclave', name: 'Digital Autoclave', subtitle: 'Class B Vacuum Cycle', category: 'sterilization', price: 'POA', inStock: true, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC63WRyBtDtGNZA-Tpi7W_iJLHsNKRgh-_aWwtpOGuF3krieJdpk-7VGuzXVB2V_9Rq96XlqU224Z4j2dcnjSz2whuEBeDqXR7J3yA-GMmwwwJMAnlJljuIXEMbvhR_DhQc9f93XXw6jsvfgiD3EK0a8_jYd_jOsSNS-gonZME5YwV9z6PTZbW6k7n5Gfkk7RciwOs_BQwxzSh0pXUcjj1mHQkX_7rO6hA5hxTgYtZ4gObqHEF-6uGy5X7BDnsqLK5qd2Imgp2Ifik' },
  { _id: '4', slug: 'cardiac-monitor-s7', name: 'Cardiac Monitor S7', subtitle: 'Multi-Parameter Tracking', category: 'monitoring', price: 'POA', inStock: true, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaFZ1pnQw5Pxe483aIjiCFcCBceh3k0VjX7QlLJsuvWLAQFRvx6i7V3diFM7ca1qCEAIdir-ffzzdVPnHPhlGkH5B6ovu5TWjSQcj2jI_OTDapf2a2XW97NFRizRqN58Mt1JdTYtj3tdtqiGpqzwV7CRDYo32BObd8RDT8sjS3iQC1wgeViXZcvxQ_RugmkyS2OqwKZRgEy2g-_Mlmoh4O0gExgeTUWnxavaRna_Zb5uhh1Ww47MXWT5lnodbwwp39n4MxaBXNOPI' },
  { _id: '5', slug: 'laparoscopic-camera-system', name: 'Laparoscopic Camera System', subtitle: 'Full HD 1080p Surgical Vision', category: 'imaging-systems', price: 'POA', inStock: true, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhL9JEg8RNSg-uSLPMNeIOePxJpuNtp9FEMr6G1U4u2P8fKI1O40vgmKILqjNkAq2_SmA3hH5s3u1mDNd99crWD0VGeXBRFob7Wi9S18YIf5H5vYYl1Mqsr_GAlsHZ-2Gu_6UVtUgZpDyPR-307x8N4auvGptjWoV5FUmbXCqUeJ71hJfWVStnU3zuvJAzy6Vn-pnYUfhIxqoWOz-VWkap1Mu_AtSP6iV-3UdhnXxt0u3N2i70TbmCPcTnI_BRgwdRlRSWrstb5y0' },
  { _id: '6', slug: 'surgical-scalpel-kit', name: 'Surgical Scalpel Kit', subtitle: 'Carbon Steel Precision Blades', category: 'surgical-tools', price: 'POA', inStock: true, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzDmOciNw-T_lq5ei30TBkZJYef9lJoSCYSD4Qs0m-qBcftzXBYugIzy4gsR6p_Uofapn657hUPqEydftt7On9S9-fYGMud1RD9RmZtfDvGo3JefTZXoPS4XsgfOO5QglDJPQVVmiK0vNGvVtwBB9kyRxMGf_1VI8611VphYtNApa3YchPu--Y7jewQSKQSm9LGBrJr9QepvlZwViVHJDGZrS5GHubgChH9bBbxpkMNxthetEoHRE_kKxZZTBbD-XeIiRUTbZBkl0' },
  { _id: '7', slug: 'pulse-oximeter-pro', name: 'Pulse Oximeter Pro', subtitle: 'Clinical-Grade SpO2 Monitoring', category: 'diagnostics', price: 'POA', inStock: true, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKY8m_2TN6EfCD1fief0R5ABF7yoHZWzp6nNgv0G_yy10naGiobzRWH2SG2J3atVu3vTHgUuau-KP-j9HPNSL3G9vo5TYIcVCjgP4sqWE0lWkWmCuG0D462TM83f16oxaUD9I1mkDEYeTNGJXBXLvpyS04WF8nJWv8wVFyuxRmLJdkkYwiO6o5fr2j7Z65f5P_sEAo04EvB3XJIBkVSLPK9oVPjcrxJKIX5sRi15-UczFp8zU8fV1D2BQA-iUQySyEzLAPtDXJSUs' },
  // ── Spine Surgery Products ──────────────────────────────────────────────
  { _id: 'sp1', slug: 'transforaminal-endoscope',      name: 'Transforaminal Endoscope',         subtitle: '30° View · 4.3mm Channel · 181mm Length',           category: 'spine-surgery', price: 'POA', inStock: true,  image: '/products/transforaminal-endoscope.jpg' },
  { _id: 'sp3', slug: 'telescope-10mm',                name: 'Telescope',                        subtitle: 'OD: 10.0 mm, ID: 7.1 mm, Length: 139mm',            category: 'spine-surgery', price: 'POA', inStock: true,  image: '/products/telescope.jpg' },
  { _id: 'sp4', slug: 'ube-spine-surgery-set',         name: 'UBE Spine Surgery Set',            subtitle: '12-Piece Biportal Endoscopy Instrument Set',        category: 'spine-surgery', price: 'POA', inStock: true,  image: '/products/ube-spine-surgery-set.jpg' },
];

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const activeCategory = searchParams.get('category') || '';

  useEffect(() => {
    document.title = 'Products | Marlon Endomedical';
    loadProducts();
  }, [activeCategory, search]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const params = {};
      if (activeCategory) params.category = activeCategory;
      if (search) params.search = search;
      const { data } = await getProducts(params);
      setProducts(data.data);
    } catch {
      // Use fallback and filter locally
      let filtered = fallbackProducts;
      if (activeCategory) filtered = filtered.filter(p => p.category === activeCategory);
      if (search) filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
      setProducts(filtered);
    } finally {
      setLoading(false);
    }
  };

  const setCategory = (cat) => {
    if (cat) {
      setSearchParams({ category: cat });
    } else {
      setSearchParams({});
    }
  };

  return (
    <>
      {/* Page Hero */}
      <section className="page-hero" id="products-hero">
        <div className="container">
          <h1 className="display-lg page-hero__title animate-in">Medical Device Catalog</h1>
          <p className="page-hero__desc animate-in animate-delay-1">
            Browse our comprehensive range of ISO-certified surgical instruments,
            imaging systems, and diagnostic equipment.
          </p>

          {/* Filter Chips */}
          <div className="filter-bar animate-in animate-delay-2" id="category-filters">
            {categories.map(cat => (
              <button
                key={cat.key}
                className={`filter-chip ${activeCategory === cat.key ? 'filter-chip--active' : ''}`}
                onClick={() => setCategory(cat.key)}
                id={`filter-${cat.key || 'all'}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="search-box animate-in animate-delay-3" id="product-search">
            <span className="material-symbols-outlined">search</span>
            <input
              type="text"
              className="input input--glass"
              placeholder="Search devices..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              id="search-input"
              style={{ paddingLeft: '3rem' }}
            />
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="section" style={{ padding: '4rem 0 6rem' }} id="products-grid-section">
        <div className="container">
          {loading ? (
            <div className="product-grid">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
                  <div className="skeleton" style={{ height: 250 }}></div>
                  <div style={{ padding: '1rem' }}>
                    <div className="skeleton" style={{ height: 20, marginBottom: 8 }}></div>
                    <div className="skeleton" style={{ height: 14, width: '60%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '4rem', color: 'var(--outline)', marginBottom: '1rem', display: 'block' }}>inventory_2</span>
              <h3 className="headline-md" style={{ marginBottom: '0.5rem' }}>No devices found</h3>
              <p className="body-md" style={{ color: 'var(--on-surface-variant)' }}>
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : (
            <div className="product-grid">
              {products.map((product, i) => (
                <div key={product._id} className={`animate-in animate-delay-${(i % 4) + 1}`}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
