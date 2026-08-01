import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';

const fallbackProducts = [
  { _id: '1', slug: 'anterior-cervical-fixation-system-iiia-bone-plate', name: 'Anterior Cervical Fixation System (IIIA Bone Plate)', subtitle: 'Anterior Cervical Plate System for ACDF Procedures', category: 'spine-surgery', price: 'POA', inStock: true, image: '/products/anterior-cervical-fixation-system-iiia.png' },
  { _id: '2', slug: 'posterior-cervical-fixation-system-zj-plate-series', name: 'Posterior Cervical Fixation System (ZJ Plate Series)', subtitle: 'Posterior Cervical Plate & Screw Fixation System', category: 'spine-surgery', price: 'POA', inStock: true, image: '/products/posterior-cervical-fixation-system-zj.png' },
  { _id: '3', slug: 'cf-posterior-spinal-internal-fixator-u6-u7-series', name: 'CF Posterior Spinal Internal Fixator (U6 / U7 Series)', subtitle: 'Posterior Pedicle Screw Fixation System', category: 'spine-surgery', price: 'POA', inStock: true, image: '/products/cf-posterior-fixator-u6-u7.png' },
  { _id: '4', slug: 'cf-posterior-spinal-internal-fixator-u15-u16-u18-series', name: 'CF Posterior Spinal Internal Fixator (U15 / U16 / U18 Series)', subtitle: 'Advanced Pedicle Screw Fixation System', category: 'spine-surgery', price: 'POA', inStock: true, image: '/products/cf-posterior-fixator-u15-u16-u18.png' },
  { _id: '5', slug: 'cf-posterior-spinal-internal-fixator-u8-u9-series', name: 'CF Posterior Spinal Internal Fixator (U8 / U9 Series)', subtitle: 'Minimally Invasive Pedicle Screw System', category: 'spine-surgery', price: 'POA', inStock: true, image: '/products/cf-posterior-fixator-u8-u9.png' },
  { _id: '6', slug: 'cf-posterior-spinal-internal-fixator-u3-u4-series', name: 'CF Posterior Spinal Internal Fixator (U3 / U4 Series)', subtitle: 'Standard Pedicle Screw Fixation System', category: 'spine-surgery', price: 'POA', inStock: true, image: '/products/cf-posterior-fixator-u3-u4.png' },
  { _id: '7', slug: 'cs-anterior-cf-posterior-fixator-u-screw-10-11-17-19-series', name: 'CS Anterior / CF Posterior Fixator (U Screw 10, 11, 17, 19 Series)', subtitle: 'Combined Anterior & Posterior Fixation System', category: 'spine-surgery', price: 'POA', inStock: true, image: '/products/cs-anterior-cf-fixator-u10-11-17-19.png' },
  { _id: '8', slug: 'cf-posterior-spinal-internal-fixator-u-screw-21-series-sacroiliac-iliac', name: 'CF Posterior Spinal Internal Fixator (U Screw 21 Series - Sacroiliac & Iliac)', subtitle: 'Sacroiliac & Iliac Fixation Screw System', category: 'spine-surgery', price: 'POA', inStock: true, image: '/products/cf-posterior-fixator-u21-sacroiliac.png' },
  { _id: '9', slug: 'cf-posterior-spinal-internal-fixator-u-screw-14-series-fenestrated-bone-cement', name: 'CF Posterior Spinal Internal Fixator (U Screw 14 Series - Fenestrated Bone Cement)', subtitle: 'Fenestrated Pedicle Screw for Cement Augmentation', category: 'spine-surgery', price: 'POA', inStock: true, image: '/products/cf-posterior-fixator-u14-fenestrated.png' },
  { _id: '10', slug: 'rz-iic-peek-3d-printing-lumbar-cage', name: 'RZ-IIC PEEK and 3D Printing Lumbar Cage', subtitle: 'PEEK & 3D Printed Titanium Lumbar Interbody Cage', category: 'spine-surgery', price: 'POA', inStock: true, image: '/products/rz-iic-peek-3d-lumbar-cage.png' },
  { _id: '11', slug: 'rz-iiia-lumbar-cage-mis-tlif', name: 'RZ-IIIA Lumbar Cage (MIS-TLIF)', subtitle: 'MIS-TLIF Lumbar Interbody Fusion Cage', category: 'spine-surgery', price: 'POA', inStock: true, image: '/products/rz-iiia-lumbar-cage-mis-tlif.png' },
  { _id: '12', slug: 'rz-iib-lumbar-cage', name: 'RZ-IIB Lumbar Cage', subtitle: 'Open PLIF Lumbar Interbody Fusion Cage', category: 'spine-surgery', price: 'POA', inStock: true, image: '/products/rz-iib-lumbar-cage.png' },
  { _id: '13', slug: 'cervical-ib-fusion-cage', name: 'Cervical IB Fusion Cage', subtitle: 'Anterior Cervical Interbody Fusion Cage', category: 'spine-surgery', price: 'POA', inStock: true, image: '/products/cervical-ib-fusion-cage.png' },
  { _id: '14', slug: 'cs-anterior-spinal-internal-fixator-csb1-csb2-bone-plate-series', name: 'CS Anterior Spinal Internal Fixator (CSB1 / CSB2 Bone Plate Series)', subtitle: 'Anterior Thoracolumbar Bone Plate System', category: 'spine-surgery', price: 'POA', inStock: true, image: '' },
  { _id: '15', slug: 'cl-mis-cervical-fusion-cage-ivn-series', name: 'CL MIS Cervical Fusion Cage (IVN Series)', subtitle: '3D-Printed Porous Cervical Fusion Implant', category: 'spine-surgery', price: 'POA', inStock: true, image: '' },
  { _id: '16', slug: 'cl-shaped-thoracolumbar-fusion-apparatus-ivo-series', name: 'CL Shaped Thoracolumbar Fusion Apparatus (IVO Series)', subtitle: '3D-Printed Bulleted Lumbar Fusion Cage', category: 'spine-surgery', price: 'POA', inStock: true, image: '' },
  { _id: '17', slug: 'cl-large-fusion-cage-ivd-series', name: 'CL Large Fusion Cage (IVD Series)', subtitle: '3D-Printed ALIF / LLIF / OLIF Fusion System', category: 'spine-surgery', price: 'POA', inStock: true, image: '' },
  { _id: '18', slug: 'adjustable-artificial-vertebral-body-fixation-system', name: 'Adjustable Artificial Vertebral Body Fixation System', subtitle: 'Expandable Corpectomy Prosthesis System', category: 'spine-surgery', price: 'POA', inStock: true, image: '' },
  { _id: '19', slug: '3d-porous-vertebral-prosthesis-model-ia-cervical-model-ib-lumbar', name: '3D Porous Vertebral Prosthesis (Model I-A Cervical & Model I-B Lumbar)', subtitle: '3D-Printed Corpectomy Vertebral Replacement', category: 'spine-surgery', price: 'POA', inStock: true, image: '' },
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

          {/* Search */}
          <div className="search-box animate-in animate-delay-2" id="product-search">
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
