import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Toast, { useToast } from '../components/Toast';
import { getProductBySlug, submitInquiry } from '../services/api';

const fallbackProducts = [
  {
    name: 'Anterior Cervical Fixation System (IIIA Bone Plate)',
    slug: 'anterior-cervical-fixation-system-iiia-bone-plate',
    category: 'spine-surgery',
    hsnCode: '9018',
    subtitle: 'Anterior Cervical Plate System for ACDF Procedures',
    description: 'The Anterior Cervical Fixation System (IIIA Bone Plate) is a titanium alloy anterior cervical plate designed for anterior cervical discectomy and fusion (ACDF) procedures. Features low-profile design with variable-angle screw locking mechanism to minimize plate profile and reduce soft tissue irritation. The system includes single-level and multi-level plate configurations with self-tapping and self-drilling screw options for surgical flexibility.',
    specifications: [
      { label: 'Material', value: 'Ti-6Al-4V ELI (Grade 5 Titanium)' },
      { label: 'Plate Thickness', value: '2.0mm - 2.5mm' },
      { label: 'Plate Configurations', value: 'Single-level, Two-level, Three-level' },
      { label: 'Screw Diameter', value: '3.5mm, 4.0mm' },
      { label: 'Screw Lengths', value: '12mm - 18mm' },
      { label: 'Screw Type', value: 'Self-tapping, Self-drilling, Fixed-angle, Variable-angle' },
      { label: 'Locking Mechanism', value: 'Dual-locking cap design' },
      { label: 'Lordotic Angles', value: '0°, 4°, 8°, 12°' }
    ],
    features: ['Low-Profile Titanium Alloy Plate Design', 'Variable-Angle Screw Placement (0°-15°)', 'Dual-Locking Screw Mechanism', 'Self-Tapping & Self-Drilling Screw Options', 'Single-Level to Multi-Level Configurations', 'Radiographic Visibility with Marker Pins', 'Colour-Coded Instrument Tray', 'Compatible with Standard ACDF Surgical Approaches'],
    image: '/products/anterior-cervical-fixation-system-iiia.png',
    inStock: true,
    featured: true,
    certifications: ['ISO 13485:2016', 'CE Marked', 'CDSCO Licensed'],
    price: 'POA'
  },
  {
    name: 'Posterior Cervical Fixation System (ZJ Plate Series)',
    slug: 'posterior-cervical-fixation-system-zj-plate-series',
    category: 'spine-surgery',
    hsnCode: '9018',
    subtitle: 'Posterior Cervical Plate & Screw Fixation System',
    description: 'The Posterior Cervical Fixation System (ZJ Plate Series) is designed for posterior cervical stabilization including lateral mass fixation and cervical pedicle screw placement. The system features precision-engineered plates and screws manufactured from high-strength titanium alloy, providing immediate rigid fixation for occipitocervical and cervicothoracic reconstruction procedures.',
    specifications: [
      { label: 'Material', value: 'Ti-6Al-4V ELI (Grade 5 Titanium)' },
      { label: 'Screw Diameter', value: '3.5mm, 4.0mm' },
      { label: 'Screw Lengths', value: '10mm - 28mm' },
      { label: 'Rod Diameter', value: '3.5mm' },
      { label: 'Plate Configurations', value: 'Lateral mass, Occipitocervical, Cervicothoracic' },
      { label: 'Connector Types', value: 'Occipital plate, Cross-connector, Rod-to-rod connector' },
      { label: 'Locking Cap', value: 'Integrated set-screw locking' },
      { label: 'Instrumentation', value: 'Complete trial & insertion set' }
    ],
    features: ['High-Strength Titanium Alloy Construction', 'Lateral Mass & Pedicle Screw Compatibility', 'Occipitocervical & Cervicothoracic Configurations', '3.5mm Rod System with Cross-Connectors', 'Self-Tapping Screw Design', 'Low-Profile Screw Head Profile', 'Comprehensive Instrument Tray Included', 'Intraoperative Flexibility with Multi-Axial Screws'],
    image: '/products/posterior-cervical-fixation-system-zj.png',
    inStock: true,
    featured: true,
    certifications: ['ISO 13485:2016', 'CE Marked', 'CDSCO Licensed'],
    price: 'POA'
  },
  {
    name: 'CF Posterior Spinal Internal Fixator (U6 / U7 Series)',
    slug: 'cf-posterior-spinal-internal-fixator-u6-u7-series',
    category: 'spine-surgery',
    hsnCode: '9018',
    subtitle: 'Posterior Pedicle Screw Fixation System — U6/U7 Screw Series',
    description: 'The CF Posterior Spinal Internal Fixator (U6 / U7 Series) is a comprehensive pedicle screw-based spinal fixation system designed for posterior stabilization of the thoracolumbar spine. The U6 and U7 series screws feature advanced thread geometry for optimal bone purchase and pull-out resistance, with polyaxial and monoaxial configurations for versatile construct assembly.',
    specifications: [
      { label: 'Material', value: 'Ti-6Al-4V ELI (Grade 5 Titanium)' },
      { label: 'Screw Diameters', value: '4.5mm, 5.5mm, 6.5mm, 7.5mm' },
      { label: 'Screw Lengths', value: '30mm - 65mm' },
      { label: 'Rod Diameter', value: '5.5mm' },
      { label: 'Screw Head Type', value: 'Polyaxial (U6), Monoaxial (U7)' },
      { label: 'Thread Design', value: 'Dual-lead, self-tapping' },
      { label: 'Set Screw', value: 'Anti-cross threading square thread' },
      { label: 'Reduction Capability', value: 'Gradual reduction screw option' }
    ],
    features: ['Polyaxial (U6) & Monoaxial (U7) Screw Options', 'Dual-Lead Self-Tapping Thread Design', 'High Pull-Out Resistance', '5.5mm Rod System Compatibility', 'Gradual Reduction Screws Available', 'Cannulated & Non-Cannulated Options', 'Complete Sterilization Tray Included', 'Thoracolumbar & Lumbar Applications'],
    image: '/products/cf-posterior-fixator-u6-u7.png',
    inStock: true,
    featured: true,
    certifications: ['ISO 13485:2016', 'CE Marked', 'CDSCO Licensed'],
    price: 'POA'
  },
  {
    name: 'CF Posterior Spinal Internal Fixator (U15 / U16 / U18 Series)',
    slug: 'cf-posterior-spinal-internal-fixator-u15-u16-u18-series',
    category: 'spine-surgery',
    hsnCode: '9018',
    subtitle: 'Advanced Pedicle Screw Fixation — U15/U16/U18 Screw Series',
    description: 'The CF Posterior Spinal Internal Fixator (U15 / U16 / U18 Series) represents the next generation of pedicle screw fixation technology with enhanced thread profiles and advanced screw head designs. The U15 series offers extended length options for severe deformity correction, U16 provides enhanced cortical fixation, and U18 features a low-profile head design for reduced soft tissue prominence.',
    specifications: [
      { label: 'Material', value: 'Ti-6Al-4V ELI (Grade 5 Titanium)' },
      { label: 'Screw Diameters', value: '4.5mm - 8.5mm (depending on series)' },
      { label: 'Screw Lengths', value: '25mm - 80mm' },
      { label: 'Rod Diameter', value: '5.5mm, 6.0mm' },
      { label: 'U15 Series', value: 'Extended length, deformity correction' },
      { label: 'U16 Series', value: 'Enhanced cortical fixation thread' },
      { label: 'U18 Series', value: 'Low-profile head design' },
      { label: 'Head Mobility', value: '60° polyaxial cone' }
    ],
    features: ['Three Specialized Screw Series (U15/U16/U18)', 'Extended Range 4.5mm-8.5mm Diameters', '60° Polyaxial Screw Head Cone', 'Low-Profile U18 Head Design', 'Enhanced Cortical Fixation (U16)', 'Deformity Correction Lengths (U15)', 'Dual Lead Thread for Faster Insertion', 'Modular Instrument Set in Sterile Tray'],
    image: '/products/cf-posterior-fixator-u15-u16-u18.png',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked', 'CDSCO Licensed'],
    price: 'POA'
  },
  {
    name: 'CF Posterior Spinal Internal Fixator (U8 / U9 Series)',
    slug: 'cf-posterior-spinal-internal-fixator-u8-u9-series',
    category: 'spine-surgery',
    hsnCode: '9018',
    subtitle: 'Minimally Invasive Pedicle Screw System — U8/U9 Series',
    description: 'The CF Posterior Spinal Internal Fixator (U8 / U9 Series) is specifically designed for minimally invasive spine surgery (MISS) approaches. The U8 series features percutaneous cannulated screws with extended tower guides for muscle-sparing insertion, while the U9 series offers a streamlined reduction screw design for percutaneous correction of spondylolisthesis.',
    specifications: [
      { label: 'Material', value: 'Ti-6Al-4V ELI (Grade 5 Titanium)' },
      { label: 'Screw Diameters', value: '5.5mm, 6.5mm, 7.5mm' },
      { label: 'Screw Lengths', value: '35mm - 60mm' },
      { label: 'Rod Diameter', value: '5.5mm' },
      { label: 'U8 Series', value: 'Percutaneous cannulated with extended tower' },
      { label: 'U9 Series', value: 'Percutaneous reduction screw' },
      { label: 'Insertion Technique', value: 'Percutaneous / MISS' },
      { label: 'Tower Design', value: 'Radiolucent extended tower' }
    ],
    features: ['Percutaneous MISS Insertion Technique', 'Cannulated Screw Design (U8)', 'Percutaneous Reduction Capability (U9)', 'Radiolucent Extended Insertion Towers', 'Muscle-Sparing Approach', 'Self-Tapping Thread Design', 'Compatible with 5.5mm Rod System', 'Complete Percutaneous Instrument Set'],
    image: '/products/cf-posterior-fixator-u8-u9.png',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked', 'CDSCO Licensed'],
    price: 'POA'
  },
  {
    name: 'CF Posterior Spinal Internal Fixator (U3 / U4 Series)',
    slug: 'cf-posterior-spinal-internal-fixator-u3-u4-series',
    category: 'spine-surgery',
    hsnCode: '9018',
    subtitle: 'Standard Pedicle Screw Fixation — U3/U4 Screw Series',
    description: 'The CF Posterior Spinal Internal Fixator (U3 / U4 Series) is a reliable and versatile pedicle screw fixation system for open posterior spinal fusion procedures. The U3 series provides standard polyaxial screws for routine thoracolumbar fixation, while U4 offers a cost-optimized solution without compromising on biomechanical performance and safety.',
    specifications: [
      { label: 'Material', value: 'Ti-6Al-4V ELI (Grade 5 Titanium)' },
      { label: 'Screw Diameters', value: '4.5mm, 5.5mm, 6.5mm, 7.5mm' },
      { label: 'Screw Lengths', value: '30mm - 60mm' },
      { label: 'Rod Diameter', value: '5.5mm' },
      { label: 'U3 Series', value: 'Standard polyaxial screw' },
      { label: 'U4 Series', value: 'Cost-optimized polyaxial screw' },
      { label: 'Head Mobility', value: '55° polyaxial cone' },
      { label: 'Thread Type', value: 'Self-tapping, dual-start' }
    ],
    features: ['Cost-Effective Fixation Solution', 'Polyaxial Screw with 55° Cone', 'Self-Tapping Dual-Start Thread', 'Open Posterior Approach Design', 'Compatible with 5.5mm Rod System', 'Comprehensive Sizing Matrix', 'Color-Coded Screw Identification', 'Full Instrument Tray Included'],
    image: '/products/cf-posterior-fixator-u3-u4.png',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked', 'CDSCO Licensed'],
    price: 'POA'
  },
  {
    name: 'CS Anterior / CF Posterior Fixator (U Screw 10, 11, 17, 19 Series)',
    slug: 'cs-anterior-cf-posterior-fixator-u-screw-10-11-17-19-series',
    category: 'spine-surgery',
    hsnCode: '9018',
    subtitle: 'Combined Anterior & Posterior Fixation — Multi-Series Screw System',
    description: 'The CS Anterior / CF Posterior Fixator system provides a comprehensive solution for combined anterior and posterior spinal fixation. This multi-series screw system includes the U10 and U11 series for anterior fixation applications and the U17 and U19 series for posterior fixation, allowing surgeons to use a single integrated system for circumferential spinal reconstruction procedures.',
    specifications: [
      { label: 'Material', value: 'Ti-6Al-4V ELI (Grade 5 Titanium)' },
      { label: 'U10 Screw', value: 'Anterior vertebral body screw, 4.5mm-6.5mm' },
      { label: 'U11 Screw', value: 'Anterior cervical screw, 3.5mm-4.5mm' },
      { label: 'U17 Screw', value: 'Posterior polyaxial screw, 5.5mm-7.5mm' },
      { label: 'U19 Screw', value: 'Posterior monoaxial screw, 5.5mm-7.5mm' },
      { label: 'Rod Diameter', value: '3.5mm (anterior), 5.5mm (posterior)' },
      { label: 'Anterior Plate', value: 'Low-profile titanium alloy' },
      { label: 'Locking Mechanism', value: 'Self-locking set screw' }
    ],
    features: ['Combined Anterior/Posterior Fixation System', 'Four Specialized Screw Series (U10/U11/U17/U19)', 'Anterior Vertebral Body & Cervical Screws', 'Posterior Polyaxial & Monoaxial Screws', 'Dual Rod Diameter Compatibility', 'Integrated Anterior Plate Options', 'Circumferential Reconstruction Capability', 'Comprehensive Dual-Tray Instrument Set'],
    image: '/products/cs-anterior-cf-fixator-u10-11-17-19.png',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked', 'CDSCO Licensed'],
    price: 'POA'
  },
  {
    name: 'CF Posterior Spinal Internal Fixator (U Screw 21 Series - Sacroiliac & Iliac)',
    slug: 'cf-posterior-spinal-internal-fixator-u-screw-21-series-sacroiliac-iliac',
    category: 'spine-surgery',
    hsnCode: '9018',
    subtitle: 'Sacroiliac & Iliac Fixation Screw System — U21 Series',
    description: 'The CF Posterior Spinal Internal Fixator (U Screw 21 Series) is specifically designed for sacroiliac joint fixation and iliac bolt placement in complex lumbopelvic reconstruction procedures. The U21 series features larger diameter screws with specialized thread patterns optimized for the dense cortical bone of the ilium and sacrum, providing secure anchor points for long-construct spinal fixation.',
    specifications: [
      { label: 'Material', value: 'Ti-6Al-4V ELI (Grade 5 Titanium)' },
      { label: 'Screw Diameters', value: '7.5mm, 8.5mm, 9.5mm' },
      { label: 'Screw Lengths', value: '40mm - 90mm' },
      { label: 'Rod Diameter', value: '5.5mm, 6.0mm' },
      { label: 'Iliac Bolt Design', value: 'Cannulated with offset connector' },
      { label: 'Sacroiliac Screw', value: 'Fully-threaded, self-tapping' },
      { label: 'Connector Type', value: 'Iliac offset connector, SI joint bolt' },
      { label: 'Application', value: 'Lumbopelvic fixation, SI joint fusion' }
    ],
    features: ['Large Diameter Iliac & Sacral Screws (7.5-9.5mm)', 'Cannulated Iliac Bolt with Offset Connector', 'Sacroiliac Joint Fixation Option', 'Long Length Options up to 90mm', 'High Pull-Out Resistance Thread Design', 'Lumbopelvic Reconstruction Compatibility', '5.5mm/6.0mm Rod Adaptable', 'Specialized Pelvic Instrument Set'],
    image: '/products/cf-posterior-fixator-u21-sacroiliac.png',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked', 'CDSCO Licensed'],
    price: 'POA'
  },
  {
    name: 'CF Posterior Spinal Internal Fixator (U Screw 14 Series - Fenestrated Bone Cement)',
    slug: 'cf-posterior-spinal-internal-fixator-u-screw-14-series-fenestrated-bone-cement',
    category: 'spine-surgery',
    hsnCode: '9018',
    subtitle: 'Fenestrated Pedicle Screw for Cement Augmentation — U14 Series',
    description: 'The CF Posterior Spinal Internal Fixator (U Screw 14 Series) features fenestrated pedicle screws designed for cement augmentation in osteoporotic bone. The cannulated screw body with multiple fenestration ports allows controlled polymethylmethacrylate (PMMA) cement delivery through the screw, significantly enhancing screw pull-out strength and fixation stability in compromised bone quality.',
    specifications: [
      { label: 'Material', value: 'Ti-6Al-4V ELI (Grade 5 Titanium)' },
      { label: 'Screw Diameters', value: '5.5mm, 6.5mm, 7.5mm' },
      { label: 'Screw Lengths', value: '35mm - 60mm' },
      { label: 'Fenestration Ports', value: '4 distal ports, 2 proximal ports' },
      { label: 'Cement Volume', value: '1.5ml - 3.0ml per screw' },
      { label: 'Cement Type', value: 'PMMA bone cement' },
      { label: 'Cannulation', value: 'Full cannulation for cement injection' },
      { label: 'Cement Delivery', value: 'Custom cement injector system included' }
    ],
    features: ['Fenestrated Screw with Cement Augmentation Ports', 'Full Cannulation for Controlled Cement Delivery', 'Enhanced Pull-Out Strength in Osteoporotic Bone', 'Custom Cement Injection System Included', 'Compatible with 5.5mm Rod System', 'Self-Tapping Thread Design', 'Radiopaque for Cement Flow Visualization', 'Osteoporosis & Revision Surgery Indications'],
    image: '/products/cf-posterior-fixator-u14-fenestrated.png',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked', 'CDSCO Licensed'],
    price: 'POA'
  },
  {
    name: 'RZ-IIC PEEK and 3D Printing Lumbar Cage',
    slug: 'rz-iic-peek-3d-printing-lumbar-cage',
    category: 'spine-surgery',
    hsnCode: '9018',
    subtitle: 'PEEK-OPTIMA & 3D Printed Titanium Lumbar Interbody Cage',
    description: 'The RZ-IIC Lumbar Cage combines advanced PEEK-OPTIMA polymer technology with 3D-printed titanium endplate interfaces for optimal lumbar interbody fusion. The PEEK core provides radiolucency for radiographic assessment of fusion, while the 3D-printed titanium endplates feature a porous lattice structure that promotes bony ingrowth and provides immediate fixation with anti-migration teeth.',
    specifications: [
      { label: 'Core Material', value: 'PEEK-OPTIMA (biocompatible polymer)' },
      { label: 'Endplate Material', value: '3D-printed Ti-6Al-4V ELI (porous lattice)' },
      { label: 'Pore Size', value: '300-500 µm (optimized for osseointegration)' },
      { label: 'Porosity', value: '65-80% interconnected porosity' },
      { label: 'Cage Dimensions', value: 'Length 22-30mm, Width 10-14mm' },
      { label: 'Cage Heights', value: '8mm, 10mm, 12mm, 14mm, 16mm' },
      { label: 'Lordotic Angles', value: '0°, 4°, 8°, 12°' },
      { label: 'Markers', value: 'Tantalum radio-opaque markers' }
    ],
    features: ['PEEK-OPTIMA Radiolucent Core', '3D-Printed Titanium Porous Endplates', 'Optimized 300-500µm Pore Size for Osseointegration', 'Anti-Migration Teeth for Immediate Fixation', 'Tantalum Radiographic Markers', 'Multiple Lordosis Options (0°-12°)', 'Large Graft Chamber for Bone Graft', 'PLIF/TLIF/OLIF Application Compatible'],
    image: '/products/rz-iic-peek-3d-lumbar-cage.png',
    inStock: true,
    featured: true,
    certifications: ['ISO 13485:2016', 'CE Marked', 'CDSCO Licensed'],
    price: 'POA'
  },
  {
    name: 'RZ-IIIA Lumbar Cage (MIS-TLIF)',
    slug: 'rz-iiia-lumbar-cage-mis-tlif',
    category: 'spine-surgery',
    hsnCode: '9018',
    subtitle: 'MIS-TLIF Lumbar Interbody Fusion Cage — RZ-IIIA Series',
    description: 'The RZ-IIIA Lumbar Cage is specifically designed for Minimally Invasive Transforaminal Lumbar Interbody Fusion (MIS-TLIF) procedures. The kidney-shaped implant profile allows single-sided insertion through a Kambin\'s triangle approach, maximizing endplate coverage while minimizing neural retraction. The bullet-shaped nose and serrated surface facilitate smooth insertion with anti-migration stability.',
    specifications: [
      { label: 'Material', value: 'PEEK-OPTIMA / Ti-6Al-4V ELI' },
      { label: 'Design Shape', value: 'Kidney-shaped, bullet-nose' },
      { label: 'Cage Dimensions', value: 'Length 22-30mm, Width 10-12mm' },
      { label: 'Cage Heights', value: '8mm, 10mm, 12mm, 14mm' },
      { label: 'Lordotic Angles', value: '0°, 4°, 8°' },
      { label: 'Insertion Technique', value: 'MIS-TLIF via Kambin\'s triangle' },
      { label: 'Endplate Contact', value: 'Serrated anti-migration surface' },
      { label: 'Graft Window', value: 'Central graft chamber with cap' }
    ],
    features: ['MIS-TLIF Optimized Kidney Shape', 'Bullet-Nose Design for Ease of Insertion', 'Serrated Anti-Migration Endplate Surface', 'Maximized Endplate Coverage', 'Single-Sided Insertion Technique', 'Central Bone Graft Chamber', 'Tantalum Radiographic Markers', 'Compatible with MIS-TLIF Instrument Set'],
    image: '/products/rz-iiia-lumbar-cage-mis-tlif.png',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked', 'CDSCO Licensed'],
    price: 'POA'
  },
  {
    name: 'RZ-IIB Lumbar Cage',
    slug: 'rz-iib-lumbar-cage',
    category: 'spine-surgery',
    hsnCode: '9018',
    subtitle: 'Open PLIF Lumbar Interbody Fusion Cage — RZ-IIB Series',
    description: 'The RZ-IIB Lumbar Cage is a traditional open PLIF (Posterior Lumbar Interbody Fusion) cage designed for posterior approach interbody fusion. The rectangular profile with rounded corners allows bilateral insertion through a posterior laminectomy window. The large central graft chamber accommodates maximum autograft or bone graft substitute volume for optimal fusion environment.',
    specifications: [
      { label: 'Material', value: 'PEEK-OPTIMA (biocompatible polymer)' },
      { label: 'Design Shape', value: 'Rectangular with rounded corners' },
      { label: 'Cage Dimensions', value: 'Length 20-26mm, Width 8-12mm' },
      { label: 'Cage Heights', value: '8mm, 10mm, 12mm, 14mm' },
      { label: 'Lordotic Angles', value: '0°, 4°, 8°' },
      { label: 'Insertion Technique', value: 'Open PLIF (bilateral approach)' },
      { label: 'Graft Window', value: 'Large central chamber' },
      { label: 'Markers', value: 'Tantalum radio-opaque markers' }
    ],
    features: ['Open PLIF Optimized Rectangular Design', 'Large Central Bone Graft Chamber', 'Bilateral Insertion Technique', 'Rounded Corners for Safe Insertion', 'Grooved Anti-Migration Surface', 'Multiple Height & Lordosis Options', 'Radiolucent PEEK for Fusion Assessment', 'Tantalum Markers for Radiographic Localization'],
    image: '/products/rz-iib-lumbar-cage.png',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked', 'CDSCO Licensed'],
    price: 'POA'
  },
  {
    name: 'Cervical IB Fusion Cage',
    slug: 'cervical-ib-fusion-cage',
    category: 'spine-surgery',
    hsnCode: '9018',
    subtitle: 'Anterior Cervical Interbody Fusion Cage — IB Series',
    description: 'The Cervical IB Fusion Cage is an anterior cervical interbody fusion device for ACDF (Anterior Cervical Discectomy and Fusion) procedures. The anatomically contoured oval shape matches cervical endplate geometry for optimal load distribution and fusion surface area. The hollow interior allows for bone graft packing, while the serrated superior and inferior surfaces provide immediate fixation and resist migration.',
    specifications: [
      { label: 'Material', value: 'PEEK-OPTIMA / Ti-6Al-4V ELI' },
      { label: 'Design Shape', value: 'Anatomically contoured oval' },
      { label: 'Cage Dimensions', value: 'Length 12-16mm, Width 12-14mm' },
      { label: 'Cage Heights', value: '5mm, 6mm, 7mm, 8mm, 9mm, 10mm' },
      { label: 'Lordotic Angles', value: '0°, 4°, 6°, 8°' },
      { label: 'Endplate Contact', value: 'Dual serrated anti-migration teeth' },
      { label: 'Graft Window', value: 'Full interior graft chamber' },
      { label: 'Markers', value: 'Tantalum radio-opaque marker pins' }
    ],
    features: ['Anatomically Contoured Oval Shape', 'Cervical Endplate Geometry Match', 'Serrated Anti-Migration Superior & Inferior Surfaces', 'Full Interior Bone Graft Chamber', 'Multiple Heights from 5mm to 10mm', 'Lordosis Options (0°-8°)', 'Radiolucent PEEK for Fusion Assessment', 'Tantalum Marker Pins for Localization'],
    image: '/products/cervical-ib-fusion-cage.png',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked', 'CDSCO Licensed'],
    price: 'POA'
  },
  {
    name: 'CS Anterior Spinal Internal Fixator (CSB1 / CSB2 Bone Plate Series)',
    slug: 'cs-anterior-spinal-internal-fixator-csb1-csb2-bone-plate-series',
    category: 'spine-surgery',
    hsnCode: '902110',
    subtitle: 'Anterior Thoracolumbar Bone Plate System',
    description: 'Anodized titanium alloy anterior bone plate system with pre-contoured anatomical profiles designed for stable anterior thoracolumbar reconstruction following trauma, burst fractures, deformity, or tumor resection.',
    specifications: [
      { label: 'Plate Models', value: 'CSB1 and CSB2 Series' },
      { label: 'Plate Lengths', value: '60mm to 145mm' },
      { label: 'Fixation Screws', value: '3.5mm (Lengths: 30-50mm)' },
      { label: 'Material', value: 'Anodized Titanium Alloy (TC4)' },
      { label: 'Indications', value: 'Thoracic and lumbar anterior stabilization' }
    ],
    features: ['Pre-contoured anatomical fit for the anterolateral surface of vertebrae', 'Hook-lock anti-backout screw mechanism preventing post-op screw loosening', 'Rigid angular fixation for early patient mobilization', 'Low-profile design to avoid adjacent soft-tissue and vascular irritation'],
    image: '/products/cs-anterior-csb1-csb2.jpg',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked', 'FDA 510(k)'],
    price: 'POA'
  },
  {
    name: 'CL MIS Cervical Fusion Cage (IVN Series)',
    slug: 'cl-mis-cervical-fusion-cage-ivn-series',
    category: 'spine-surgery',
    hsnCode: '902110',
    subtitle: '3D-Printed Porous Cervical Fusion Implant',
    description: '3D-printed porous titanium ACDF fusion cage with biomimetic trabecular bone structure engineered for minimally invasive surgical procedures.',
    specifications: [
      { label: 'Surgical Approach', value: 'MIS Anterior Cervical Discectomy and Fusion (ACDF)' },
      { label: 'Material', value: '3D-Printed Titanium Alloy (Ti-6Al-4V)' },
      { label: 'Porous Structure', value: 'Biomimetic trabecular bone lattice' },
      { label: 'Profile', value: 'Slim body footprint for small speculum channels' }
    ],
    features: ['Biomimetic trabecular lattice promoting full-thickness bone ingrowth', 'Slim profile optimized for insertion through MIS retractor tubes', 'Anatomical surface serrations for immediate press-fit stability', 'High structural strength resisting post-operative cage migration'],
    image: '/products/cl-mis-cervical-ivn.jpg',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked', 'FDA 510(k)'],
    price: 'POA'
  },
  {
    name: 'CL Shaped Thoracolumbar Fusion Apparatus (IVO Series)',
    slug: 'cl-shaped-thoracolumbar-fusion-apparatus-ivo-series',
    category: 'spine-surgery',
    hsnCode: '902110',
    subtitle: '3D-Printed Bulleted Lumbar Fusion Cage',
    description: 'Additive-manufactured 3D porous titanium cage with bulleted insertion profile designed for posterior and transforaminal lumbar fusion.',
    specifications: [
      { label: 'Surgical Approach', value: 'PLIF / TLIF' },
      { label: 'Material', value: '3D-Printed Titanium Alloy (Ti-6Al-4V)' },
      { label: 'Design Profile', value: 'Bullet-nosed anatomical entry' },
      { label: 'Graft Cavity', value: 'Preserved central graft lumen' }
    ],
    features: ['Bullet-nosed tip for smooth distraction with minimal nerve retraction', 'High-friction 3D porous surface finish for primary stability without endplate damage', 'Interconnected porous matrix encouraging osteoblast attachment', 'Integrated graft cavity allowing optional supplementary bone graft packing'],
    image: '/products/cl-shaped-thoracolumbar-ivo.jpg',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked', 'FDA 510(k)'],
    price: 'POA'
  },
  {
    name: 'CL Large Fusion Cage (IVD Series)',
    slug: 'cl-large-fusion-cage-ivd-series',
    category: 'spine-surgery',
    hsnCode: '902110',
    subtitle: '3D-Printed ALIF / LLIF / OLIF Fusion System',
    description: 'Large-footprint 3D-printed porous titanium fusion implant designed to span the dense peripheral cortical rim for anterior and lateral lumbar fusion.',
    specifications: [
      { label: 'Surgical Approach', value: 'ALIF / LLIF / OLIF' },
      { label: 'Lordosis Angles', value: '8°, 12°, 15° options' },
      { label: 'Material', value: '3D-Printed Titanium Alloy (Ti-6Al-4V)' },
      { label: 'Footprint', value: 'Broad cortical-rim spanning geometry' }
    ],
    features: ['Large surface footprint evenly distributing compressive loads to prevent subsidence', 'Multiple lordotic options restoring natural sagittal alignment', 'Bone-mimicking elastic modulus preventing stress shielding', '3D trabecular porous matrix facilitating osteogenesis across the implant'],
    image: '/products/cl-large-fusion-ivd.jpg',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked', 'FDA 510(k)'],
    price: 'POA'
  },
  {
    name: 'Adjustable Artificial Vertebral Body Fixation System',
    slug: 'adjustable-artificial-vertebral-body-fixation-system',
    category: 'spine-surgery',
    hsnCode: '902110',
    subtitle: 'Expandable Corpectomy Prosthesis System',
    description: 'Continuously height-adjustable expandable titanium corpectomy replacement device designed for multi-level anterior spinal reconstruction.',
    specifications: [
      { label: 'Surgical Indication', value: 'Anterior corpectomy following trauma, tumor, or infection' },
      { label: 'Distraction Range', value: 'Continuously adjustable mechanical height expansion' },
      { label: 'Footings', value: 'Swiveling and fixed endplate footings' },
      { label: 'Material', value: 'High-strength Titanium Alloy (TC4)' }
    ],
    features: ['Continuous height adjustment allowing precise in-situ distraction', 'Swiveling endplates accommodating angulated adjacent vertebral surfaces', 'Positive mechanical locking pins preventing secondary post-op collapse', 'Restores axial weight-bearing alignment after multi-level resection'],
    image: '/products/adjustable-vertebral-body.jpg',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked', 'FDA 510(k)'],
    price: 'POA'
  },
  {
    name: '3D Porous Vertebral Prosthesis (Model I-A Cervical & Model I-B Lumbar)',
    slug: '3d-porous-vertebral-prosthesis-model-ia-cervical-model-ib-lumbar',
    category: 'spine-surgery',
    hsnCode: '902110',
    subtitle: '3D-Printed Corpectomy Vertebral Replacement',
    description: 'Full-body 3D-printed porous titanium reconstructive block designed for single or multi-level segment corpectomy reconstructive fusion.',
    specifications: [
      { label: 'Model I-A', value: 'Subaxial Cervical Corpectomy Footprint' },
      { label: 'Model I-B', value: 'Thoracic / Lumbar Corpectomy Footprint' },
      { label: 'Material', value: '3D-Printed Titanium Alloy (Ti-6Al-4V)' },
      { label: 'Structure', value: 'Biomimetic full-body 3D porous matrix' }
    ],
    features: ['Model I-A adapted with low-profile lordosis specifically for subaxial cervical spine', 'Model I-B featuring broad heavy-duty footprint for lumbar compressive loads', 'Bypasses autograft harvest morbidity via osteoconductive porous lattice', 'Direct bone bridge formation through the entire prosthesis body'],
    image: '/products/3d-porous-vertebral-prosthesis.jpg',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked', 'FDA 510(k)'],
    price: 'POA'
  }
];

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', organization: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  useEffect(() => {
    loadProduct();
  }, [slug]);

  const loadProduct = async () => {
    setLoading(true);
    try {
      const { data } = await getProductBySlug(slug);
      setProduct(data.data);
      document.title = `${data.data.name} | Marlon Endomedical`;
    } catch {
      const found = fallbackProducts.find(p => p.slug === slug) || fallbackProducts[0];
      setProduct(found);
      document.title = `${found.name} | Marlon Endomedical`;
    } finally {
      setLoading(false);
    }
  };

  const handleInquiry = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const inquiryText = `Product Inquiry: ${product?.name}
Name: ${formData.name}
Email: ${formData.email}
Organization: ${formData.organization}
Message: ${formData.message}`;

    try {
      await submitInquiry({
        ...formData,
        type: 'product-inquiry',
        productId: product?._id
      });
      showToast('Inquiry submitted! Our team will respond within 24 hours.', 'success');
      setFormData({ name: '', email: '', organization: '', message: '' });
    } catch (err) {
      showToast('Could not submit inquiry. Please try again.', 'error');
    }
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(inquiryText)}`, '_blank');
    window.location.href = `mailto:sales@marlonendomedical.com?subject=Product Inquiry: ${product?.name}&body=${encodeURIComponent(inquiryText)}`;
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="product-detail">
        <div className="container section">
          <div className="product-detail__grid">
            <div className="skeleton" style={{ aspectRatio: '1', borderRadius: 'var(--radius-xl)' }}></div>
            <div>
              <div className="skeleton" style={{ height: 20, width: '30%', marginBottom: 16 }}></div>
              <div className="skeleton" style={{ height: 40, width: '80%', marginBottom: 16 }}></div>
              <div className="skeleton" style={{ height: 100, marginBottom: 24 }}></div>
              <div className="skeleton" style={{ height: 200 }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail" style={{ textAlign: 'center', padding: '12rem 0 6rem' }}>
        <span className="material-symbols-outlined" style={{ fontSize: '4rem', color: 'var(--outline)' }}>error_outline</span>
        <h2 className="headline-lg" style={{ margin: '1rem 0' }}>Product not found</h2>
        <Link to="/products" className="btn btn--primary">Back to Catalog</Link>
      </div>
    );
  }

  const categoryLabel = product.category?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="product-detail" id="product-detail-page">
      <div className="container section" style={{ paddingTop: '2rem' }}>
        {/* Back button */}
        <Link to="/products" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
          color: 'var(--on-surface)', textDecoration: 'none', fontWeight: 600,
          fontSize: '0.875rem', marginBottom: '1rem'
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>arrow_back</span>
          Back to Products
        </Link>

        <div className="product-detail__grid">
          {/* Image */}
          <div className="product-detail__image animate-in">
            {product.image ? (
              <img src={product.image} alt={product.name} />
            ) : (
              <div style={{
                aspectRatio: '1',
                borderRadius: 'var(--radius-xl)',
                background: 'var(--surface-container-high)',
                color: 'var(--on-surface-variant)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%'
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: '6rem', opacity: 0.5 }}>medical_services</span>
              </div>
            )}
            {product.inStock && (
              <div style={{
                position: 'absolute', top: '1rem', right: '1rem',
                background: 'var(--secondary)', color: 'var(--on-secondary)',
                padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)',
                fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase'
              }}>
                In Stock
              </div>
            )}
          </div>

          {/* Info */}
          <div className="product-detail__info animate-in animate-delay-1">
            <div>
              <div className="product-detail__category">{categoryLabel} · HSN {product.hsnCode}</div>
              <h1 className="headline-lg" style={{ margin: '0.5rem 0' }}>{product.name}</h1>
              <p className="body-md" style={{ color: 'var(--on-surface-variant)', marginBottom: '1rem' }}>
                {product.subtitle}
              </p>
              {/* Inquire CTA */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                <a
                  href="#product-inquiry-section"
                  className="btn btn--primary"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('product-inquiry-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>mail</span>
                  Inquire Now
                </a>
              </div>
            </div>

            <p className="body-md" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8 }}>
              {product.description}
            </p>

            {/* Specifications */}
            {product.specifications && product.specifications.length > 0 && (
              <div>
                <h3 className="headline-sm" style={{ marginBottom: '1rem' }}>Specifications</h3>
                <div className="product-detail__specs">
                  {product.specifications.map((spec, i) => (
                    <div key={i} className="spec-item">
                      <div className="spec-item__label">{spec.label}</div>
                      <div className="spec-item__value">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="headline-sm" style={{ marginBottom: '1rem' }}>Key Features</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {product.features.map((feat, i) => (
                    <span key={i} style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                      background: 'var(--surface-container)', padding: '0.5rem 0.75rem',
                      borderRadius: 'var(--radius-md)', fontSize: '0.8125rem', fontWeight: 600
                    }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--primary)' }}>check_circle</span>
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {product.certifications && product.certifications.length > 0 && (
              <div>
                <h3 className="headline-sm" style={{ marginBottom: '1rem' }}>Certifications</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {product.certifications.map((cert, i) => (
                    <span key={i} className="cert-badge">
                      <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>verified</span>
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Inquiry Form */}
        <div style={{ marginTop: '5rem', maxWidth: '640px', margin: '5rem auto 0' }} id="product-inquiry-section">
          <h2 className="headline-md" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
            Request Product Inquiry
          </h2>
          <p className="body-md" style={{ textAlign: 'center', color: 'var(--on-surface-variant)', marginBottom: '2rem' }}>
            Interested in the {product.name}? Fill out the form below and our specialists will get back to you.
          </p>

          <form className="contact-form" onSubmit={handleInquiry} id="product-inquiry-form">
            <div className="grid-2col" style={{ gap: '1rem' }}>
              <input
                type="text" className="input" placeholder="Your Name"
                value={formData.name} onChange={e => setFormData(p => ({...p, name: e.target.value}))}
                required id="inquiry-name"
              />
              <input
                type="email" className="input" placeholder="Email Address"
                value={formData.email} onChange={e => setFormData(p => ({...p, email: e.target.value}))}
                required id="inquiry-email"
              />
            </div>
            <input
              type="text" className="input" placeholder="Organization Name"
              value={formData.organization} onChange={e => setFormData(p => ({...p, organization: e.target.value}))}
              id="inquiry-org"
            />
            <textarea
              className="input" placeholder="Tell us about your requirements (quantity, delivery timeline, etc.)"
              value={formData.message} onChange={e => setFormData(p => ({...p, message: e.target.value}))}
              id="inquiry-message"
            />
            <button type="submit" className="btn btn--primary btn--lg" disabled={submitting} id="inquiry-submit" style={{ width: '100%' }}>
              {submitting ? 'Submitting...' : 'Submit Inquiry'}
            </button>
          </form>
        </div>
      </div>
      <Toast message={toast.message} type={toast.type} visible={toast.visible} onClose={hideToast} />
    </div>
  );
}
