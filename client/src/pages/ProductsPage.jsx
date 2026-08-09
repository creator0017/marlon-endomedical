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
  { _id: 'e1', slug: 'endoscopic-spine-equipment-01', name: 'Endoscopic Spine Telescope System', subtitle: 'Rigid endoscope & rod lens optics for surgical spine visualization', category: 'endoscopic-spine-equipments', price: 'POA', inStock: true, image: '/products/endoscopic-01.jpg' },
  { _id: 'e2', slug: 'endoscopic-spine-equipment-02', name: 'Percutaneous Endoscopic Spine Set 2', subtitle: 'Transforaminal endoscopic spine surgical system', category: 'endoscopic-spine-equipments', price: 'POA', inStock: true, image: '/products/endoscopic-02.jpg' },
  { _id: 'e3', slug: 'endoscopic-spine-equipment-03', name: 'Endoscopic Spine Instrument Set 3', subtitle: 'Full spine endoscopy instrument kit', category: 'endoscopic-spine-equipments', price: 'POA', inStock: true, image: '/products/endoscopic-03.jpg' },
  { _id: 'e4', slug: 'endoscopic-spine-equipment-04', name: 'Spinal Endoscope Working Set 4', subtitle: 'Endoscope working channel set with scope & tools', category: 'endoscopic-spine-equipments', price: 'POA', inStock: true, image: '/products/endoscopic-04.jpg' },
  { _id: 'e5', slug: 'endoscopic-spine-equipment-05', name: 'Interlaminar Endoscopy Unit 5', subtitle: 'Interlaminar approach endoscopic equipment', category: 'endoscopic-spine-equipments', price: 'POA', inStock: true, image: '/products/endoscopic-05.jpg' },
  { _id: 'e6', slug: 'endoscopic-spine-equipment-06', name: 'Endoscopic Spine Instrument Kit 6', subtitle: 'Specialized endoscopic spine instruments', category: 'endoscopic-spine-equipments', price: 'POA', inStock: true, image: '/products/endoscopic-06.jpg' },
  { _id: 'e7', slug: 'endoscopic-spine-equipment-07', name: 'Full-HD Spine Endoscopy Console 7', subtitle: 'High-definition endoscopic visualization console', category: 'endoscopic-spine-equipments', price: 'POA', inStock: true, image: '/products/endoscopic-07.jpg' },
  { _id: 'e8', slug: 'endoscopic-spine-equipment-08', name: 'Endoscopic Spine Scope & Trocar Set 8', subtitle: 'Endoscope with trocar and introducer system', category: 'endoscopic-spine-equipments', price: 'POA', inStock: true, image: '/products/endoscopic-08.jpg' },
  { _id: 'e9', slug: 'endoscopic-spine-equipment-09', name: 'Percutaneous Endoscopic System 9', subtitle: 'Instruments and optics for percutaneous endoscopy', category: 'endoscopic-spine-equipments', price: 'POA', inStock: true, image: '/products/endoscopic-09.jpg' },
  { _id: 'e10', slug: 'endoscopic-spine-equipment-10', name: 'Endoscopic Spine Surgical Tray 10', subtitle: 'Complete surgical tray with endoscopic instruments', category: 'endoscopic-spine-equipments', price: 'POA', inStock: true, image: '/products/endoscopic-10.jpg' },
  { _id: 'e11', slug: 'endoscopic-spine-equipment-11', name: 'Spine Endoscopy Equipment 11', subtitle: 'Compact endoscopic spine surgery equipment', category: 'endoscopic-spine-equipments', price: 'POA', inStock: true, image: '/products/endoscopic-11.jpg' },
  { _id: 'e12', slug: 'endoscopic-spine-equipment-12', name: 'Transforamal Endoscopic Set 12', subtitle: 'Transforamal endoscopic spine surgical instruments', category: 'endoscopic-spine-equipments', price: 'POA', inStock: true, image: '/products/endoscopic-12.jpg' },
  { _id: 'e13', slug: 'endoscopic-spine-equipment-13', name: 'Endoscopic Spine Optics System 13', subtitle: 'Rod-lens endoscope optics with light cable', category: 'endoscopic-spine-equipments', price: 'POA', inStock: true, image: '/products/endoscopic-13.jpg' },
  { _id: 'e14', slug: 'endoscopic-spine-equipment-14', name: 'Endoscopic Spine Procedure Kit 14', subtitle: 'Complete kit for endoscopic spine procedures', category: 'endoscopic-spine-equipments', price: 'POA', inStock: true, image: '/products/endoscopic-14.jpg' },
  { _id: 'e15', slug: 'endoscopic-spine-equipment-15', name: 'Spinal Endoscope Console 15', subtitle: 'Spinal endoscope with camera coupling', category: 'endoscopic-spine-equipments', price: 'POA', inStock: true, image: '/products/endoscopic-15.jpg' },
  { _id: 'e16', slug: 'endoscopic-spine-equipment-16', name: 'Endoscopic Spine Revolution Set 16', subtitle: 'Revolver-type endoscopic spine working instruments', category: 'endoscopic-spine-equipments', price: 'POA', inStock: true, image: '/products/endoscopic-16.jpg' },
  { _id: 'e17', slug: 'endoscopic-spine-equipment-17', name: 'Endoscopic Radiofrequency System 17', subtitle: 'RF generator and probes for endoscopic spine surgery', category: 'endoscopic-spine-equipments', price: 'POA', inStock: true, image: '/products/endoscopic-17.jpg' },
  { _id: 'e18', slug: 'endoscopic-spine-equipment-18', name: 'Endoscopic Spine Bipolar Set 18', subtitle: 'Bipolar endoscopic instruments for coagulation', category: 'endoscopic-spine-equipments', price: 'POA', inStock: true, image: '/products/endoscopic-18.jpg' },
  { _id: 'e19', slug: 'endoscopic-spine-equipment-19', name: 'Endoscopic Cutting Systems 19', subtitle: 'Powered cutting and burr systems for endoscopy', category: 'endoscopic-spine-equipments', price: 'POA', inStock: true, image: '/products/endoscopic-19.jpg' },
  { _id: 'e20', slug: 'endoscopic-spine-equipment-20', name: 'Spine Endoscopy Full Set 20', subtitle: 'Complete endoscopic spine equipment set', category: 'endoscopic-spine-equipments', price: 'POA', inStock: true, image: '/products/endoscopic-20.jpg' },
  { _id: 'e21', slug: 'endoscopic-spine-equipment-21', name: 'Endoscopic Spine Instrumentation 21', subtitle: 'Endoscopic instruments for spine decompression', category: 'endoscopic-spine-equipments', price: 'POA', inStock: true, image: '/products/endoscopic-21.jpg' },
  { _id: 'e22', slug: 'endoscopic-spine-equipment-22', name: 'Percutaneous Endoscopy Unit 22', subtitle: 'Percutaneous endoscopic spine surgery set', category: 'endoscopic-spine-equipments', price: 'POA', inStock: true, image: '/products/endoscopic-22.jpg' },
  { _id: 'e23', slug: 'endoscopic-spine-equipment-23', name: 'Endoscopic Spine Brochure Kit 23', subtitle: 'Endoscopic spine surgical product line', category: 'endoscopic-spine-equipments', price: 'POA', inStock: true, image: '/products/endoscopic-23.jpg' },
  { _id: 'e24', slug: 'endoscopic-spine-equipment-24', name: 'Spine Endoscopy Catalog Set 24', subtitle: 'Full catalog range of endoscopic spine equipment', category: 'endoscopic-spine-equipments', price: 'POA', inStock: true, image: '/products/endoscopic-24.jpg' },
  { _id: 'j1', slug: 'acetabular-cup-system-type-a-obturator-type-b-ischial', name: 'Acetabular Cup System (Type-A Obturator & Type-B Ischial)', subtitle: '46 Acetabulum with uniform rough surface', category: 'joint-replacement-implants', price: 'POA', inStock: true, image: '/products/joint-acet-main.png' },
  { _id: 'j2', slug: 'rough-surface-160-femoral-stem', name: 'Rough Surface 160 Femoral Stem', subtitle: 'Titanium femoral stem - straight & curved (L/R) options', category: 'joint-replacement-implants', price: 'POA', inStock: true, image: '/products/joint-stem-main.png' },
  { _id: 'j3', slug: 'cementless-finger-metacarpophalangeal-mcp-knuckle-prosthesis', name: 'Cementless Finger Metacarpophalangeal (MCP) Knuckle Prosthesis', subtitle: 'Cementless, unconstrained finger joint prosthesis - MCP joint', category: 'joint-replacement-implants', price: 'POA', inStock: true, image: '/products/finger-mcp-main.jpg' },
  { _id: 'j4', slug: 'cementless-proximal-interphalangeal-pip-knuckle-prosthesis', name: 'Cementless Proximal Interphalangeal (PIP) Knuckle Prosthesis', subtitle: 'Cementless, unconstrained finger joint prosthesis - PIP joint', category: 'joint-replacement-implants', price: 'POA', inStock: true, image: '/products/finger-pip-main.jpg' },
  { _id: 'j5', slug: 'custom-modular-tumor-hip-prosthesis-proximal-femur', name: 'Custom (Modular) Tumor Hip Prosthesis - Proximal Femur', subtitle: 'Proximal femur tumor replacement with suturing holes & bulky trochanter design', category: 'joint-replacement-implants', price: 'POA', inStock: true, image: '/products/tumor-hip-proximal-femur.jpg' },
  { _id: 'j6', slug: 'gearing-type-hemi-pelvic-tumor-prosthesis', name: 'Gearing Type Hemi-Pelvic Tumor Prosthesis', subtitle: '360° rotating gearing hemi-pelvic prosthesis with Ti+HA double coating', category: 'joint-replacement-implants', price: 'POA', inStock: true, image: '/products/tumor-hemipelvic-gearing.jpg' },
  { _id: 'j7', slug: 'dual-mobility-hemi-pelvis-tumor-prosthesis', name: 'Dual Mobility Hemi-Pelvis Prosthesis', subtitle: '58° dual-mobility hemi-pelvis with 3D printed trabecular structure', category: 'joint-replacement-implants', price: 'POA', inStock: true, image: '/products/tumor-hemipelvis-dual-mobility.jpg' },
  { _id: 'j8', slug: 'custom-modular-tumor-knee-prosthesis-distal-femoral', name: 'Custom (Modular) Tumor Knee - Distal Femoral', subtitle: 'Distal femoral tumor knee with cemented/cementless stems', category: 'joint-replacement-implants', price: 'POA', inStock: true, image: '/products/tumor-knee-femoral-custom.jpg' },
  { _id: 'j9', slug: 'femoral-tibial-lengthening-tumor-knee-prosthesis', name: 'Femoral-Tibial Lengthening Tumor Knee Prosthesis', subtitle: 'Extendable combined femur & tibia tumor knee system', category: 'joint-replacement-implants', price: 'POA', inStock: true, image: '/products/tumor-knee-femorotibial.jpg' },
  { _id: 'j10', slug: 'bionic-trabecular-tibia-tumor-prosthesis', name: 'Bionic Trabecular Tibia Tumor Prosthesis', subtitle: 'Patellar ligament trabecular structure, length-adjustable tibia', category: 'joint-replacement-implants', price: 'POA', inStock: true, image: '/products/tumor-tibia-trabecular.jpg' },
  { _id: 'j11', slug: 'reverse-tumor-shoulder-prosthesis', name: 'Reverse Tumor Shoulder Prosthesis', subtitle: 'Limb-salvage reverse shoulder with 3D printed trabecular structure', category: 'joint-replacement-implants', price: 'POA', inStock: true, image: '/products/tumor-shoulder-reverse.jpg' },
  { _id: 'j12', slug: 'custom-tumor-elbow-prosthesis-system', name: 'Custom Artificial Elbow Prosthesis System', subtitle: 'Anatomic elbow joint with carrying angle & anti-rotation groove', category: 'joint-replacement-implants', price: 'POA', inStock: true, image: '/products/tumor-elbow.jpg' },
  { _id: 'j13', slug: 'standard-cemented-elbow-joint-prosthesis', name: 'Standard Cemented Elbow Joint Prosthesis', subtitle: 'Anatomic elbow with carrying angle, hinge structure & anti-rotation groove', category: 'joint-replacement-implants', price: 'POA', inStock: true, image: '/products/elbow-standard-cemented.jpg' },
  { _id: 'j14', slug: 'unilateral-tumor-elbow-prosthesis-customized', name: 'Unilateral Tumor Elbow Prosthesis (Customized)', subtitle: 'Patient-specific osteotomy elbow with custom humerus & ulnar medullary needles', category: 'joint-replacement-implants', price: 'POA', inStock: true, image: '/products/elbow-unilateral-tumor.png' },
  { _id: 'j15', slug: 'xa-ps-total-knee-system-squatting-knee', name: 'XA-PS Total Knee System (Squatting Knee)', subtitle: 'Asian-fit PS knee with deep-squat flexion & gradient radius design', category: 'joint-replacement-implants', price: 'POA', inStock: true, image: '/products/xa-ps-knee-system-main.png' },
  { _id: 'j16', slug: 'xn-rhk-rotating-hinged-knee-system', name: 'XN-RHK Rotating Hinged Knee System', subtitle: 'Revision total knee with 40mm jump hinge, straight/eccentric stems', category: 'joint-replacement-implants', price: 'POA', inStock: true, image: '/products/rotating-hinged-knee-main.jpg' },
  { _id: 'j17', slug: 'be-stem-femoral-stem-ti6al4v-ti-ha', name: 'BE Stem Femoral Stem (Ti6Al4V / Ti+HA)', subtitle: 'Double-taper cementless hip stem, 12/14 taper, Corail-style design', category: 'joint-replacement-implants', price: 'POA', inStock: true, image: '/products/be-stem-main.png' },
  { _id: 'j18', slug: 'xm-knee-with-tin-coating-t-free', name: 'XM Knee with TiN Coating (T-Free)', subtitle: 'TiNbN PVD-coated CoCrMo total knee - reduced metal-ion release & high wear resistance', category: 'joint-replacement-implants', price: 'POA', inStock: true, image: '/products/xm-knee-tin-main.png' },
  { _id: 'j19', slug: 't-free-xm-knee-system-ps-cr', name: 'T-Free XM Knee System (PS / CR)', subtitle: 'Primary total knee with PS & CR variants - anatomical fit, tri-fin tibial plateau', category: 'joint-replacement-implants', price: 'POA', inStock: true, image: '/products/xm-knee-system-main.png' },
  { _id: 'j20', slug: 'g20-trabecular-structured-cup', name: 'G20 Trabecular Structured Cup', subtitle: '3D-printed trabecular metal acetabular cup with highly cross-linked UHMWPE liner', category: 'joint-replacement-implants', price: 'POA', inStock: true, image: '/products/g20-trabecular-cup-main.png' },
  { _id: 'j21', slug: 'osteopathia-shoulder-prosthesis', name: 'Osteopathia Shoulder Prosthesis', subtitle: 'Anatomical humeral stem & head with biological fixation - biomechanical design', category: 'joint-replacement-implants', price: 'POA', inStock: true, image: '/products/shoulder-osteopathia-main.png' },
  { _id: 'j22', slug: 'reverse-shoulder-prosthesis', name: 'Reverse Shoulder Prosthesis', subtitle: 'Reverse total shoulder with 145° neck angle glenoid & Ti-coated stem', category: 'joint-replacement-implants', price: 'POA', inStock: true, image: '/products/shoulder-reverse-main.png' },
  { _id: 'j23', slug: 'tumoral-shoulder-prosthesis', name: 'Tumoral Shoulder Prosthesis', subtitle: 'Proximal humeral bone tumor replacement - Ti-coated tumoral stem', category: 'joint-replacement-implants', price: 'POA', inStock: true, image: '/products/shoulder-tumoral-main.png' },
];

const categoryFilters = [
  { label: 'MIS Spine Implants', category: 'spine-surgery', icon: 'orthopedics' },
  { label: 'Endoscopic Spine Equipments', category: 'endoscopic-spine-equipments', icon: 'video_camera_front' },
  { label: 'Joint Replacement Implants', category: 'joint-replacement-implants', icon: 'accessibility_new' }
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

          {/* Category Filters */}
          <div className="product-filters animate-in animate-delay-3" id="product-filters" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', marginTop: '1.5rem' }}>
            {categoryFilters.map(f => {
              const isActive = activeCategory === f.category;
              return (
                <button
                  key={f.category}
                  onClick={() => {
                    const next = isActive ? '' : f.category;
                    if (next) setSearchParams({ category: next });
                    else setSearchParams({});
                  }}
                  className={isActive ? 'product-filter-chip product-filter-chip--active' : 'product-filter-chip'}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.625rem 1.25rem', borderRadius: 'var(--radius-full)',
                    border: '1px solid rgba(255,255,255,0.35)', cursor: 'pointer',
                    background: isActive ? 'var(--on-primary)' : 'rgba(255,255,255,0.12)',
                    color: isActive ? 'var(--primary)' : 'var(--on-primary)',
                    fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.02em',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>{f.icon}</span>
                  {f.label}
                </button>
              );
            })}
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
