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
  },
  {
    name: 'Endoscopic Spine Telescope System',
    slug: 'endoscopic-spine-equipment-01',
    category: 'endoscopic-spine-equipments',
    hsnCode: '9018',
    subtitle: 'Rigid endoscope & rod lens optics for surgical spine visualization',
    description: 'Rigid endoscope system with rod lens optics for high-definition visualization during minimally invasive endoscopic spine surgery. Provides a wide field of view with excellent image quality for decompression and fusion procedures.',
    specifications: [
      { label: 'Optics', value: 'Rod lens telescope' },
      { label: 'Approach', value: 'Percutaneous / transforaminal' },
      { label: 'Application', value: 'Endoscopic spine surgery' },
      { label: 'Type', value: 'Endoscopic equipment' }
    ],
    features: ['High-definition optics', 'Wide field of view', 'Rod lens telescope design', 'Full spine application scope'],
    image: '/products/endoscopic-01.jpg',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'Percutaneous Endoscopic Spine Set 2',
    slug: 'endoscopic-spine-equipment-02',
    category: 'endoscopic-spine-equipments',
    hsnCode: '9018',
    subtitle: 'Transforaminal endoscopic spine surgical system',
    description: 'Percutaneous transforaminal endoscopic spine surgical system for minimally invasive decompression procedures.',
    specifications: [
      { label: 'Approach', value: 'Transforaminal / Percutaneous' },
      { label: 'Application', value: 'Spine decompression' },
      { label: 'Type', value: 'Endoscopic equipment' }
    ],
    features: ['Minimally invasive approach', 'Percutaneous access', 'Complete system set'],
    image: '/products/endoscopic-02.jpg',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'Endoscopic Spine Instrument Set 3',
    slug: 'endoscopic-spine-equipment-03',
    category: 'endoscopic-spine-equipments',
    hsnCode: '9018',
    subtitle: 'Full spine endoscopy instrument kit',
    description: 'Complete spine endoscopy instrument kit for minimally invasive spine surgery.',
    specifications: [
      { label: 'Contents', value: 'Full instrument kit' },
      { label: 'Type', value: 'Endoscopic equipment' }
    ],
    features: ['Full kit coverage', 'Minimally invasive surgery'],
    image: '/products/endoscopic-03.jpg',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'Spinal Endoscope Working Set 4',
    slug: 'endoscopic-spine-equipment-04',
    category: 'endoscopic-spine-equipments',
    hsnCode: '9018',
    subtitle: 'Endoscope working channel set with scope & tools',
    description: 'Endoscope working channel set with scope and tools for spinal endoscopic procedures.',
    specifications: [
      { label: 'Contents', value: 'Working channel scope + tools' },
      { label: 'Type', value: 'Endoscopic equipment' }
    ],
    features: ['Working channel design', 'Scope + tools combination'],
    image: '/products/endoscopic-04.jpg',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'Interlaminar Endoscopy Unit 5',
    slug: 'endoscopic-spine-equipment-05',
    category: 'endoscopic-spine-equipments',
    hsnCode: '9018',
    subtitle: 'Interlaminar approach endoscopic equipment',
    description: 'Interlaminar approach endoscopic spine equipment for minimally invasive procedures.',
    specifications: [
      { label: 'Approach', value: 'Interlaminar' },
      { label: 'Type', value: 'Endoscopic equipment' }
    ],
    features: ['Interlaminar approach', 'Minimally invasive'],
    image: '/products/endoscopic-05.jpg',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'Endoscopic Spine Instrument Kit 6',
    slug: 'endoscopic-spine-equipment-06',
    category: 'endoscopic-spine-equipments',
    hsnCode: '9018',
    subtitle: 'Specialized endoscopic spine instruments',
    description: 'Specialized endoscopic spine instruments for minimally invasive surgical spine procedures.',
    specifications: [
      { label: 'Contents', value: 'Specialized instruments' },
      { label: 'Type', value: 'Endoscopic equipment' }
    ],
    features: ['Specialized instruments', 'Spine surgery'],
    image: '/products/endoscopic-06.jpg',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'Full-HD Spine Endoscopy Console 7',
    slug: 'endoscopic-spine-equipment-07',
    category: 'endoscopic-spine-equipments',
    hsnCode: '9018',
    subtitle: 'High-definition endoscopic visualization console',
    description: 'High-definition endoscopic visualization console for spine procedures.',
    specifications: [
      { label: 'Display', value: 'Full HD' },
      { label: 'Type', value: 'Endoscopic equipment' }
    ],
    features: ['Full HD visualization', 'Console system'],
    image: '/products/endoscopic-07.jpg',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'Endoscopic Spine Scope & Trocar Set 8',
    slug: 'endoscopic-spine-equipment-08',
    category: 'endoscopic-spine-equipments',
    hsnCode: '9018',
    subtitle: 'Endoscope with trocar and introducer system',
    description: 'Endoscope with trocar and introducer system for access in endoscopic spine surgery.',
    specifications: [
      { label: 'Contents', value: 'Endoscope + trocar + introducer' },
      { label: 'Type', value: 'Endoscopic equipment' }
    ],
    features: ['Scope with trocar access', 'Introducer system'],
    image: '/products/endoscopic-08.jpg',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'Percutaneous Endoscopic System 9',
    slug: 'endoscopic-spine-equipment-09',
    category: 'endoscopic-spine-equipments',
    hsnCode: '9018',
    subtitle: 'Instruments and optics for percutaneous endoscopy',
    description: 'Instruments and optics for percutaneous endoscopic spine surgery.',
    specifications: [
      { label: 'Approach', value: 'Percutaneous' },
      { label: 'Type', value: 'Endoscopic equipment' }
    ],
    features: ['Percutaneous approach', 'Complete optics and instruments'],
    image: '/products/endoscopic-09.jpg',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'Endoscopic Spine Surgical Tray 10',
    slug: 'endoscopic-spine-equipment-10',
    category: 'endoscopic-spine-equipments',
    hsnCode: '9018',
    subtitle: 'Complete surgical tray with endoscopic instruments',
    description: 'Complete surgical tray with endoscopic spine instruments.',
    specifications: [
      { label: 'Contents', value: 'Complete surgical tray' },
      { label: 'Type', value: 'Endoscopic equipment' }
    ],
    features: ['Complete tray', 'Endoscopic instruments'],
    image: '/products/endoscopic-10.jpg',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'Spine Endoscopy Equipment 11',
    slug: 'endoscopic-spine-equipment-11',
    category: 'endoscopic-spine-equipments',
    hsnCode: '9018',
    subtitle: 'Compact endoscopic spine surgery equipment',
    description: 'Compact endoscopic spine surgery equipment set.',
    specifications: [
      { label: 'Type', value: 'Endoscopic equipment' }
    ],
    features: ['Compact design'],
    image: '/products/endoscopic-11.jpg',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'Transforamal Endoscopic Set 12',
    slug: 'endoscopic-spine-equipment-12',
    category: 'endoscopic-spine-equipments',
    hsnCode: '9018',
    subtitle: 'Transforamal endoscopic spine surgical instruments',
    description: 'Transforamal endoscopic spine surgical instruments.',
    specifications: [
      { label: 'Approach', value: 'Transforamal' },
      { label: 'Type', value: 'Endoscopic equipment' }
    ],
    features: ['Transforamal approach'],
    image: '/products/endoscopic-12.jpg',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'Endoscopic Spine Optics System 13',
    slug: 'endoscopic-spine-equipment-13',
    category: 'endoscopic-spine-equipments',
    hsnCode: '9018',
    subtitle: 'Rod-lens endoscope optics with light cable',
    description: 'Rod-lens endoscope optics with light cable.',
    specifications: [
      { label: 'Optics', value: 'Rod-lens' },
      { label: 'Type', value: 'Endoscopic equipment' }
    ],
    features: ['Rod-lens optics', 'Light cable included'],
    image: '/products/endoscopic-13.jpg',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'Endoscopic Spine Procedure Kit 14',
    slug: 'endoscopic-spine-equipment-14',
    category: 'endoscopic-spine-equipments',
    hsnCode: '9018',
    subtitle: 'Complete kit for endoscopic spine procedures',
    description: 'Complete kit for endoscopic spine procedures.',
    specifications: [
      { label: 'Contents', value: 'Complete kit' },
      { label: 'Type', value: 'Endoscopic equipment' }
    ],
    features: ['Complete procedure kit'],
    image: '/products/endoscopic-14.jpg',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'Spinal Endoscope Console 15',
    slug: 'endoscopic-spine-equipment-15',
    category: 'endoscopic-spine-equipments',
    hsnCode: '9018',
    subtitle: 'Spinal endoscope with camera coupling',
    description: 'Spinal endoscope with camera coupling.',
    specifications: [
      { label: 'Contents', value: 'Endoscope + camera coupling' },
      { label: 'Type', value: 'Endoscopic equipment' }
    ],
    features: ['Camera coupling ready'],
    image: '/products/endoscopic-15.jpg',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'Endoscopic Spine Revolution Set 16',
    slug: 'endoscopic-spine-equipment-16',
    category: 'endoscopic-spine-equipments',
    hsnCode: '9018',
    subtitle: 'Revolver-type endoscopic spine working instruments',
    description: 'Revolver-type endoscopic spine working instruments.',
    specifications: [
      { label: 'Type', value: 'Endoscopic working instruments' }
    ],
    features: ['Revolver-type working channel'],
    image: '/products/endoscopic-16.jpg',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'Endoscopic Radiofrequency System 17',
    slug: 'endoscopic-spine-equipment-17',
    category: 'endoscopic-spine-equipments',
    hsnCode: '9018',
    subtitle: 'RF generator and probes for endoscopic spine surgery',
    description: 'RF generator and probes for endoscopic spine surgery.',
    specifications: [
      { label: 'Type', value: 'RF generator + probes' },
      { label: 'Function', value: 'Radiofrequency' }
    ],
    features: ['RF cautery', 'Endoscopic probes'],
    image: '/products/endoscopic-17.jpg',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'Endoscopic Spine Bipolar Set 18',
    slug: 'endoscopic-spine-equipment-18',
    category: 'endoscopic-spine-equipments',
    hsnCode: '9018',
    subtitle: 'Bipolar endoscopic instruments for coagulation',
    description: 'Bipolar endoscopic instruments for coagulation.',
    specifications: [
      { label: 'Type', value: 'Bipolar instruments' },
      { label: 'Function', value: 'Coagulation' }
    ],
    features: ['Bipolar coagulation'],
    image: '/products/endoscopic-18.jpg',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'Endoscopic Cutting Systems 19',
    slug: 'endoscopic-spine-equipment-19',
    category: 'endoscopic-spine-equipments',
    hsnCode: '9018',
    subtitle: 'Powered cutting and burr systems for endoscopy',
    description: 'Powered cutting and burr systems for endoscopic spine surgery.',
    specifications: [
      { label: 'Type', value: 'Powered cutting / burr system' }
    ],
    features: ['Powered cutting', 'Burr system'],
    image: '/products/endoscopic-19.jpg',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'Spine Endoscopy Full Set 20',
    slug: 'endoscopic-spine-equipment-20',
    category: 'endoscopic-spine-equipments',
    hsnCode: '9018',
    subtitle: 'Complete endoscopic spine equipment set',
    description: 'Complete endoscopic spine equipment set.',
    specifications: [
      { label: 'Contents', value: 'Full equipment set' },
      { label: 'Type', value: 'Endoscopic equipment' }
    ],
    features: ['Complete set'],
    image: '/products/endoscopic-20.jpg',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'Endoscopic Spine Instrumentation 21',
    slug: 'endoscopic-spine-equipment-21',
    category: 'endoscopic-spine-equipments',
    hsnCode: '9018',
    subtitle: 'Endoscopic instruments for spine decompression',
    description: 'Endoscopic instruments for spine decompression.',
    specifications: [
      { label: 'Function', value: 'Spine decompression' },
      { label: 'Type', value: 'Endoscopic instrumentation' }
    ],
    features: ['Decompression instruments'],
    image: '/products/endoscopic-21.jpg',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'Percutaneous Endoscopy Unit 22',
    slug: 'endoscopic-spine-equipment-22',
    category: 'endoscopic-spine-equipments',
    hsnCode: '9018',
    subtitle: 'Percutaneous endoscopic spine surgery set',
    description: 'Percutaneous endoscopic spine surgery set.',
    specifications: [
      { label: 'Approach', value: 'Percutaneous' },
      { label: 'Type', value: 'Endoscopic equipment' }
    ],
    features: ['Percutaneous set'],
    image: '/products/endoscopic-22.jpg',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'Endoscopic Spine Brochure Kit 23',
    slug: 'endoscopic-spine-equipment-23',
    category: 'endoscopic-spine-equipments',
    hsnCode: '9018',
    subtitle: 'Endoscopic spine surgical product line',
    description: 'Endoscopic spine surgical product line overview.',
    specifications: [
      { label: 'Type', value: 'Product line set' }
    ],
    features: ['Product line overview'],
    image: '/products/endoscopic-23.jpg',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'Spine Endoscopy Catalog Set 24',
    slug: 'endoscopic-spine-equipment-24',
    category: 'endoscopic-spine-equipments',
    hsnCode: '9018',
    subtitle: 'Full catalog range of endoscopic spine equipment',
    description: 'Full catalog range of endoscopic spine equipment.',
    specifications: [
      { label: 'Type', value: 'Catalog range set' }
    ],
    features: ['Full range'],
    image: '/products/endoscopic-24.jpg',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'Acetabular Cup System (Type-A Obturator & Type-B Ischial)',
    slug: 'acetabular-cup-system-type-a-obturator-type-b-ischial',
    category: 'joint-replacement-implants',
    hsnCode: '9018',
    subtitle: '46 Acetabulum with uniform rough surface',
    description: 'Hip joint replacement acetabular cup system with a uniform rough surface for enhanced osseointegration. Available in Type-A (obturator type) and Type-B (ischial plate type) configurations. The mesh and hole design allow strong bone tissue adhesion, providing stable, long-term fixation for total hip arthroplasty.',
    specifications: [
      { label: 'System', value: 'Hip joint acetabular cup' },
      { label: 'Surface', value: 'Uniform rough surface' },
      { label: 'Configurations', value: 'Type-A (Obturator type), Type-B (Ischial plate type)' },
      { label: 'Sizes', value: '46 (52 - 72 outer diameter range)' },
      { label: 'Fixing', value: 'Obturator / ischial plate fixation' },
      { label: 'Certifications', value: 'ISO 13485:2016, CE Marked' }
    ],
    features: ['Uniform rough surface for bone ingrowth', 'Type-A Obturator and Type-B Ischial variants', 'Long-term stable fixation', 'Sized 52 to 72 (L/R)'],
    image: '/products/joint-acet-main.png',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'Rough Surface 160 Femoral Stem',
    slug: 'rough-surface-160-femoral-stem',
    category: 'joint-replacement-implants',
    hsnCode: '9018',
    subtitle: 'Titanium femoral stem - straight & curved (L/R) options',
    description: 'Rough Surface 160 femoral stem for hip joint replacement, manufactured from biocompatible titanium alloy (Ti6Al4V) with a 12/14 taper. Available in straight and curved versions for left and right sides, with normal, revision-200 and revision-250 options to suit different patient anatomies.',
    specifications: [
      { label: 'System', value: 'Hip joint femoral stem' },
      { label: 'Material', value: 'Titanium alloy (Ti6Al4V)' },
      { label: 'Vascular Taper', value: '12/14' },
      { label: 'Configurations', value: 'Straight 150, Curved 200 (L/R), Curved 250 (L/R)' },
      { label: 'Options', value: 'Normal, Revision 200, Revision 250' },
      { label: 'Certification', value: 'ISO 13485:2016, CE Marked' }
    ],
    image: '/products/joint-stem-main.png',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'Cementless Finger Metacarpophalangeal (MCP) Knuckle Prosthesis',
    slug: 'cementless-finger-metacarpophalangeal-mcp-knuckle-prosthesis',
    category: 'joint-replacement-implants',
    hsnCode: '9018',
    subtitle: 'Cementless, unconstrained finger joint prosthesis - MCP joint',
    description: 'Cementless, unconstrained metacarpophalangeal (MCP) knuckle prosthesis for replacement of the second to fifth metacarpophalangeal joints. Features a double-shaft design for elastic fixation with free adjustment of collateral ligament tension, a curved metal-bone with polyethylene platform for increased range of motion and reduced wear, and square-step design for improved torsional resistance. It is screwed into the medullary cavity without bone cement, making surgery simple and revision easy.',
    specifications: [
      { label: 'System', value: 'MCP knuckle prosthesis' },
      { label: 'Material (metacarpal head)', value: 'Cobalt-chromium-molybdenum alloy' },
      { label: 'Material (palm platform)', value: 'Ultra-high molecular weight polyethylene' },
      { label: 'Joint anchor', value: 'Titanium alloy fixing screw (size 5-11)' },
      { label: 'Metacarpal head sizes', value: '6, 6+, 7, 7+, 8, 8+, 9, 9+, 10, 10+, 11' },
      { label: 'Cementless', value: 'Yes - no bone cement required' },
      { label: 'Fixation', value: 'Double-shaft elastic fixation' },
      { label: 'Certification', value: 'ISO 13485:2016, CE Marked' }
    ],
    features: ['Double-shaft elastic fixation', 'Curved sliding metal-polyethylene articulation', 'Screwed fixation without bone cement', 'Multiple size configurations', 'Suitable for osteoarthritis & rheumatoid arthritis'],
    image: '/products/finger-mcp-main.jpg',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'Cementless Proximal Interphalangeal (PIP) Knuckle Prosthesis',
    slug: 'cementless-proximal-interphalangeal-pip-knuckle-prosthesis',
    category: 'joint-replacement-implants',
    hsnCode: '9018',
    subtitle: 'Cementless, unconstrained finger joint prosthesis - PIP joint',
    description: 'Cementless, unconstrained proximal interphalangeal (PIP) knuckle prosthesis for the replacement of the proximal interphalangeal joints of the fingers. The flattened dual-bone design provides flexible fixation and allows free adjustment of the lateral collateral ligaments, improving implant stability. The curved sliding motion between the metal bone and the polyethylene platform increases joint range of motion while reducing wear rate. Available in multiple size specifications to suit different patients.',
    specifications: [
      { label: 'System', value: 'PIP knuckle prosthesis' },
      { label: 'Material (proximal fingertip)', value: 'Cobalt-chromium-molybdenum alloy' },
      { label: 'Material (interphalangeal platform)', value: 'Ultra-high molecular weight polyethylene' },
      { label: 'Joint anchor', value: 'Titanium alloy fixing screws (size 5-11)' },
      { label: 'Proximal fingertip sizes', value: '5, 5+, 6, 6+, 7, 7+, 8' },
      { label: 'Cementless', value: 'No bone cement required' },
      { label: 'Certification', value: 'ISO 13485:2016, CE Marked' }
    ],
    features: ['Flattened dual-bone flexible fixation', 'Adjustable lateral collateral ligament tension', 'Curved metal-polyethylene sliding motion', 'Multiple size specifications'],
    image: '/products/finger-pip-main.jpg',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'Custom (Modular) Tumor Hip Prosthesis - Proximal Femur',
    slug: 'custom-modular-tumor-hip-prosthesis-proximal-femur',
    category: 'joint-replacement-implants',
    hsnCode: '9018',
    subtitle: 'Proximal femur tumor replacement with suturing holes & bulky trochanter design',
    description: 'Custom and modular proximal femur tumor hip prosthesis designed for tumor resection of the proximal femur. Features suture holes in both greater and lesser trochanter positions for suturing muscles and restoring muscle function, and a bulky design at the greater trochanter position that restores the shape of the hip and increases the torque of gluteus medius. The lateral grooves and shot-blasting surface provide stable fixation with a high survival rate. Available with cemented or cementless stems, and lengthening prostheses can be customized.',
    specifications: [
      { label: 'System', value: 'Proximal femur tumor hip prosthesis' },
      { label: 'Indications', value: 'Proximal femur tumor, inter-trochanteric fracture, massive bone defects' },
      { label: 'Fixation', value: 'Cemented or cementless stem options' },
      { label: 'Design', value: 'Suture holes at trochanters, bulky trochanter, lateral grooves' },
      { label: 'Packaging', value: 'Sterilized and non-sterilized available' },
      { label: 'Certification', value: 'CFDA, ISO 13485:2016, CE Marked' }
    ],
    features: ['Muscle-suturing holes at trochanters', 'Restored hip shape & gluteus medius torque', 'Shot-blasting surface for stable graft fixation', 'Custom lengthening available', 'Cemented & cementless stems'],
    image: '/products/tumor-hip-proximal-femur.jpg',
    inStock: true,
    featured: false,
    certifications: ['CFDA', 'ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'Gearing Type Hemi-Pelvic Tumor Prosthesis',
    slug: 'gearing-type-hemi-pelvic-tumor-prosthesis',
    category: 'joint-replacement-implants',
    hsnCode: '9018',
    subtitle: '360° rotating gearing hemi-pelvic prosthesis with Ti+HA double coating',
    description: 'Hemi-pelvic tumor prosthesis designed in cooperation with clinical tumor professor Dr. Wei Guo, closely matching human bone structure and biological characteristics. The modular design offers multiple specifications, with a U-type multi-sleeve rotating 360 degrees for adjustment, double gearing design, adjustable anteversion angle and osteotomy position, and a bone trabecular structure for stable bone fixation. The double coating (Ti+HA) enhances osseointegration and it can be used with screws and rods for fixation.',
    specifications: [
      { label: 'System', value: 'Hemi-pelvic tumor prosthesis (gearing type)' },
      { label: 'Design', value: 'Double gearing, 360° rotating U-type multi-sleeve' },
      { label: 'Coating', value: 'Ti + HA double coating' },
      { label: 'Resection Sizes', value: '7 types' },
      { label: 'Pubis Plate', value: '4 sizes, bridgeable to contralateral pubis' },
      { label: 'Certification', value: 'CFDA, ISO 13485:2016, CE Marked' }
    ],
    features: ['Double gearing anti-rotation system', '360° rotating multi-sleeve adjustment', 'Ti+HA double coating', 'Adjustable anteversion & osteotomy', '7 resection sizes, 4 pubis plate sizes'],
    image: '/products/tumor-hemipelvic-gearing.jpg',
    inStock: true,
    featured: false,
    certifications: ['CFDA', 'ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'Dual Mobility Hemi-Pelvis Prosthesis',
    slug: 'dual-mobility-hemi-pelvis-tumor-prosthesis',
    category: 'joint-replacement-implants',
    hsnCode: '9018',
    subtitle: '58° dual-mobility hemi-pelvis with 3D printed trabecular structure',
    description: 'Dual mobility hemi-pelvis prosthesis designed according to the mechanical structure of the human body to restore movement function to the maximum. The combination design provides various specifications and models according to surgical needs. The highly polished inner wall of the acetabular cup, ball head, inner lining and outer cup reduce the risk of dislocation after operation. Features a 58° dual-mobility articulation with a 3D printed trabecular structure and external locking between the metal outer cup and polyethylene liner.',
    specifications: [
      { label: 'System', value: 'Dual mobility hemi-pelvis prosthesis' },
      { label: 'Articulation', value: '58° dual-mobility' },
      { label: 'Structure', value: '3D printed trabecular metal outer cup' },
      { label: 'Liner', value: 'External locking polyethylene liner' },
      { label: 'Dislocation Risk', value: 'Reduced by high-polish inner wall & cup design' },
      { label: 'Certification', value: 'CFDA, ISO 13485:2016, CE Marked' }
    ],
    features: ['58° dual-mobility reduces dislocation', 'High-polish acetabular inner wall', '3D printed trabecular structure', 'External locking outer cup & liner', 'Combination design - multiple models'],
    image: '/products/tumor-hemipelvis-dual-mobility.jpg',
    inStock: true,
    featured: false,
    certifications: ['CFDA', 'ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'Custom (Modular) Tumor Knee - Distal Femoral',
    slug: 'custom-modular-tumor-knee-prosthesis-distal-femoral',
    category: 'joint-replacement-implants',
    hsnCode: '9018',
    subtitle: 'Distal femoral tumor knee with cemented/cementless stems',
    description: 'Custom and modular distal femoral tumor knee prosthesis for bone defects due to tumor and comminuted fracture of the knee joint. The diaphysis is made of forged titanium alloy with UHMWPE surface, giving high strength and light specific gravity. Strong bonding is achieved through taper locking or hinge. The physiological knee flexion and rotation function relieves stem torque force and resists rotation and stress concentration in the medullary cavity. Cemented or cementless distal stems and various sizes are available, with sterile packaging and custom options.',
    specifications: [
      { label: 'System', value: 'Distal femoral tumor knee prosthesis' },
      { label: 'Diaphysis Material', value: 'Forged titanium alloy with UHMWPE surface' },
      { label: 'Sleeve Option', value: 'Cobalt-chromium-molybdenum metal sleeve (optional)' },
      { label: 'Bonding', value: 'Taper locking or hinge' },
      { label: 'Stems', value: 'Cemented or cementless distal stems' },
      { label: 'Certification', value: 'CFDA, ISO 13485:2016, CE Marked' }
    ],
    features: ['Forged Ti alloy + UHMWPE diaphysis', 'Taper locking or hinge bonding', 'Physiological flexion & rotation', 'Cemented / cementless stems', 'Custom & modular options'],
    image: '/products/tumor-knee-femoral-custom.jpg',
    inStock: true,
    featured: false,
    certifications: ['CFDA', 'ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'Femoral-Tibial Lengthening Tumor Knee Prosthesis',
    slug: 'femoral-tibial-lengthening-tumor-knee-prosthesis',
    category: 'joint-replacement-implants',
    hsnCode: '9018',
    subtitle: 'Extendable combined femur & tibia tumor knee system',
    description: 'Femoral-tibial lengthening tumor knee prosthesis combining femoral and tibial knee features for tumor, comminuted fracture or massive defects in both femur and tibia where a common prosthesis will not work. The osteotomy section uses an adjustable and extendable design to meet the needs of children\'s bone growth, with minimally invasive extended regulation and anti-rotation locking. Available with cemented or cementless stems.',
    specifications: [
      { label: 'System', value: 'Femoral-tibial lengthening tumor knee' },
      { label: 'Indications', value: 'Tumor, comminuted fracture, massive defects in both femur & tibia' },
      { label: 'Design', value: 'Adjustable & extendable osteotomy section' },
      { label: 'Stems', value: 'Cemented or cementless' },
      { label: 'Features', value: 'Lengthening, locking, anti-rotation' },
      { label: 'Certification', value: 'CFDA, ISO 13485:2016, CE Marked' }
    ],
    features: ['Combined femoral & tibial knee features', 'Extendable for growing patients', 'Minimally invasive regulation', 'Anti-rotation locking', 'Cemented / cementless stems'],
    image: '/products/tumor-knee-femorotibial.jpg',
    inStock: true,
    featured: false,
    certifications: ['CFDA', 'ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'Bionic Trabecular Tibia Tumor Prosthesis',
    slug: 'bionic-trabecular-tibia-tumor-prosthesis',
    category: 'joint-replacement-implants',
    hsnCode: '9018',
    subtitle: 'Patellar ligament trabecular structure, length-adjustable tibia',
    description: 'Bionic trabecular structure tibia tumor prosthesis with a patellar ligament trabecular structure that allows the patellar ligament to be sutured and grow. The bionic trabecular structure is favourable for long-term bone growth, and the high rough surface with conical design is advantageous for initial fixation. It can be combined with a femoral biological medullary stem to form a whole biological prosthesis of the femur and tibia, making later revision easy. Available in an axial model with different sizes of resection parts and length-adjustable options.',
    specifications: [
      { label: 'System', value: 'Modular tibia tumor prosthesis' },
      { label: 'Structure', value: 'Bionic trabecular patellar ligament structure' },
      { label: 'Fixation', value: 'High rough surface, conical design' },
      { label: 'Models', value: 'Axial model, length-adjustable custom' },
      { label: 'Resection Sizes', value: 'Multiple sizes available' },
      { label: 'Certification', value: 'CFDA, ISO 13485:2016, CE Marked' }
    ],
    features: ['Patellar ligament sutures & grows', 'Bionic trabecular long-term bone growth', 'Conical initial fixation', 'Combine with femoral biological stem', 'Length-adjustable options'],
    image: '/products/tumor-tibia-trabecular.jpg',
    inStock: true,
    featured: false,
    certifications: ['CFDA', 'ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'Reverse Tumor Shoulder Prosthesis',
    slug: 'reverse-tumor-shoulder-prosthesis',
    category: 'joint-replacement-implants',
    hsnCode: '9018',
    subtitle: 'Limb-salvage reverse shoulder with 3D printed trabecular structure',
    description: 'Reverse tumor shoulder prosthesis - a limb-salvage prosthesis for severe tumor of the shoulder when the shoulder cuff cannot be reconstructed. Features a 3D printed trabecular structure for bone ingrowth, proximal suture holes, adjustable length of the total humerus, and different sizes of humeral head and resection parts. A total humerus prosthesis with an ulna prosthesis in prevent-dislocation design is also available for extensive resections.',
    specifications: [
      { label: 'System', value: 'Reverse tumor shoulder / total humerus prosthesis' },
      { label: 'Indications', value: 'Severe tumor of shoulder, unresectable shoulder cuff' },
      { label: 'Structure', value: '3D printed trabecular structure' },
      { label: 'Humerus', value: 'Total humerus, adjustable length & diameter' },
      { label: 'Options', value: 'Various humeral head & resection sizes' },
      { label: 'Certification', value: 'CFDA, ISO 13485:2016, CE Marked' }
    ],
    features: ['Limb-salvage reverse shoulder', '3D printed trabecular structure', 'Total humerus with prevent-dislocation ulna', 'Adjustable humerus length & diameter', 'Multiple sizes'],
    image: '/products/tumor-shoulder-reverse.jpg',
    inStock: true,
    featured: false,
    certifications: ['CFDA', 'ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'Custom Artificial Elbow Prosthesis System',
    slug: 'custom-tumor-elbow-prosthesis-system',
    category: 'joint-replacement-implants',
    hsnCode: '9018',
    subtitle: 'Anatomic elbow joint with carrying angle & anti-rotation groove',
    description: 'Custom artificial elbow prosthesis system with anatomic design and carrying angle for better physiological function recovery. Available as a standard elbow joint prosthesis system, unilateral-osteotomy and bilateral-osteotomy elbow joints (distal humerus / proximal ulna), and a capitulum radii elbow joint. Features an anti-rotation groove, hinge design with carrying angle, and osteotomy length that can be customized according to clinical needs such as tumor size, extent of injury and skeletal characteristics from MRI, CT and X-ray.',
    specifications: [
      { label: 'System', value: 'Custom artificial elbow prosthesis system' },
      { label: 'Variants', value: 'Standard, unilateral-osteotomy, bilateral-osteotomy, capitulum radii' },
      { label: 'Design', value: 'Anatomic carrying angle, hinge, anti-rotation groove' },
      { label: 'Customization', value: 'Osteotomy length customized per patient imaging' },
      { label: 'Models', value: 'Distal humerus / proximal ulna' },
      { label: 'Certification', value: 'CFDA, ISO 13485:2016, CE Marked' }
    ],
    features: ['Anatomic carrying angle', 'Anti-rotation groove & hinge design', 'Unilateral / bilateral osteotomy options', 'Patient-specific customization (MRI/CT/X-ray)', 'Capitulum radii elbow variant'],
    image: '/products/tumor-elbow.jpg',
    inStock: true,
    featured: false,
    certifications: ['CFDA', 'ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'Standard Cemented Elbow Joint Prosthesis',
    slug: 'standard-cemented-elbow-joint-prosthesis',
    category: 'joint-replacement-implants',
    hsnCode: '9018',
    subtitle: 'Anatomic elbow with carrying angle, hinge structure & anti-rotation groove',
    description: 'Standard cemented elbow joint prosthesis with an anatomic design and its own carrying angle for better recovery of physiological function. The hinge structure fits the physiological angle and an anti-rotation groove improves stability. The cement prosthesis technique provides immediate, secure fixation for elbow joint replacement.',
    specifications: [
      { label: 'System', value: 'Standard cement elbow joint prosthesis' },
      { label: 'Design', value: 'Anatomic, with carrying angle' },
      { label: 'Structure', value: 'Hinge structure, anti-rotation groove' },
      { label: 'Fixation', value: 'Bone cement fixation' },
      { label: 'Side', value: 'Left (L) and right (R)' },
      { label: 'Certification', value: 'CFDA, ISO 13485:2016, CE Marked' }
    ],
    features: ['Anatomic design with carrying angle', 'Physiological hinge structure', 'Anti-rotation groove', 'Cemented fixation', 'Physiological function recovery'],
    image: '/products/elbow-standard-cemented.jpg',
    inStock: true,
    featured: false,
    certifications: ['CFDA', 'ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'Unilateral Tumor Elbow Prosthesis (Customized)',
    slug: 'unilateral-tumor-elbow-prosthesis-customized',
    category: 'joint-replacement-implants',
    hsnCode: '9018',
    subtitle: 'Patient-specific osteotomy elbow with custom humerus & ulnar medullary needles',
    description: 'Unilateral tumor elbow prosthesis customized for each patient for bone tumors of the humerus or ulna. The anti-rotation groove and hinge structure fit the physiological angle, and the osteotomy length can be customized according to the patient\'s MRI, CT and X-ray films, tumor size, degree of injury and bone characteristics. Humeral and ulnar medullary needles come in a wide range of diameters and lengths to match different trochlear and medullary cavity sizes.',
    specifications: [
      { label: 'System', value: 'Unilateral tumor elbow (customized)' },
      { label: 'Customization', value: 'Per patient MRI, CT, X-ray, tumor size & bone characteristics' },
      { label: 'Osteotomy Length', value: 'Customizable' },
      { label: 'Humeral Modullary Needle', value: 'Length 40-210mm, dia 3-16mm (prox 5-18mm)' },
      { label: 'Ulnar Modullary Needle', value: 'Length 40-200mm, dia 3-12mm (prox 5-16mm)' },
      { label: 'Articular Surface Width', value: '14-20mm (1mm increments)' },
      { label: 'Certification', value: 'CFDA, ISO 13485:2016, CE Marked' }
    ],
    features: ['Patient-specific customization (MRI/CT/X-ray)', 'Custom osteotomy length', 'Hinge structure with anti-rotation groove', 'Wide range of medullary needle sizes', 'Customized for humerus or ulna tumors'],
    image: '/products/elbow-unilateral-tumor.png',
    inStock: true,
    featured: false,
    certifications: ['CFDA', 'ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'XA-PS Total Knee System (Squatting Knee)',
    slug: 'xa-ps-total-knee-system-squatting-knee',
    category: 'joint-replacement-implants',
    hsnCode: '9018',
    subtitle: 'Asian-fit PS knee with deep-squat flexion & gradient radius design',
    description: 'XA-PS total knee system designed according to Asian bone measurement data for deep flexion and squatting. The PS-plus insert is widened to increase internal and external restrictions, with improved PS cam design where the column is moved backward and double joint surface reduces pressure and wear. Features a high-polished titanium alloy tibial tray, gradient radius condyle design that maintains safe contact area up to 150 degrees, anterior condyle thinning with optimized patellar pulley, and patella options. Suitable for non-inflammatory and inflammatory joint lesions, functional deformity correction, and revision after failed treatments.',
    specifications: [
      { label: 'System', value: 'XA-PS total knee system (squatting knee)' },
      { label: 'Design Basis', value: 'Asian bone measurement data' },
      { label: 'Flexion', value: 'Deep flexion / squat, safe contact to 150°' },
      { label: 'Tibial Tray', value: 'High-polished titanium alloy, PS-plus insert' },
      { label: 'Insert Options', value: 'PS-plus widen, Vit-PE wear & oxidation resistant' },
      { label: 'Patella', value: 'Round & anatomical prostheses' },
      { label: 'Stems', value: 'Cemented & cementless extension stems' },
      { label: 'Size Range', value: 'Sizes 1S to 10L+, AP 40-103mm ML 35-94mm' },
      { label: 'Certification', value: 'CFDA, ISO 13485:2016, CE Marked' }
    ],
    features: ['Deep squat & flexion Asian fit', 'Gradient radius condyle, safe to 150°', 'Improved PS cam - double joint surface', 'High-polished titanium tray, back structure', 'PS-plus & Vit E inserts', 'Round & anatomical patellar options', 'Cemented / cementless extension stems'],
    image: '/products/xa-ps-knee-system-main.png',
    inStock: true,
    featured: false,
    certifications: ['CFDA', 'ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'XN-RHK Rotating Hinged Knee System',
    slug: 'xn-rhk-rotating-hinged-knee-system',
    category: 'joint-replacement-implants',
    hsnCode: '9018',
    subtitle: 'Revision total knee with 40mm jump hinge, straight/eccentric stems',
    description: 'XN-RHK rotating hinged knee system designed for revision total knee arthroplasty with gross instability, ligament insufficiency, severe fracture, multiple revisions or unbalanced flexion-extension gaps. The hinged device provides a maximum jump height of 40mm. Components are made of titanium alloy femoral stems (straight or eccentric extension), CoCrMo hinged device and tibial tray, detached anti-rotation device and polyethylene tibial insert. Cemented and cementless stems are available with femoral (30/60/100mm) and tibial (40/70/110mm) extension options.',
    specifications: [
      { label: 'System', value: 'XN-RHK rotating hinged knee system' },
      { label: 'Indications', value: 'Revision TKA: gross instability, collateral ligament insufficiency, severe fracture, unbalanced gaps' },
      { label: 'Hinge Device', value: 'CoCrMo alloy, max jump height 40mm' },
      { label: 'Femoral Stem', value: 'Titanium, straight/eccentric extension stem' },
      { label: 'Tibial Tray', value: 'CoCrMo alloy, cemented or cementless' },
      { label: 'Extension Stems', value: 'Femur 30/60/100mm, Tibia 40/70/110mm (straight & eccentric)' },
      { label: 'Blocks/Pads', value: 'Distal, posterior, tibia semi-oblique & oblique (5/10mm)' },
      { label: 'Size Range', value: 'Models 2# to 7#' },
      { label: 'Certification', value: 'CFDA, ISO 13485:2016, CE Marked' }
    ],
    features: ['40mm max jump height hinge', 'Rotating hinged articulation', 'CoCrMo & titanium construction', 'Cemented / cementless stems', 'Straight & eccentric extension stems', 'Detachable anti-rotation device'],
    image: '/products/rotating-hinged-knee-main.jpg',
    inStock: true,
    featured: false,
    certifications: ['CFDA', 'ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'BE Stem Femoral Stem (Ti6Al4V / Ti+HA)',
    slug: 'be-stem-femoral-stem-ti6al4v-ti-ha',
    category: 'joint-replacement-implants',
    hsnCode: '9018',
    subtitle: 'Double-taper cementless femoral stem, 12/14 taper, Corail-style design',
    description: 'BE stem femoral stem for hip replacement, precision forged from Ti6Al4V with a 12/14 international taper compatible with ceramic femoral heads. The double-taper design increases vertical and rotational stability while optimising proximal medullary filling. Full-length Ti+HA coating induces rapid osseointegration, vertical grooves decompress the medullary cavity and resist rotation, and the trapezoidal proximal cross-section provides rotational stability and self-locking. Based on a Corail-style design with over 25 years of clinical history and 1 million implantations worldwide.',
    specifications: [
      { label: 'System', value: 'Femoral stem (hip) - cementless' },
      { label: 'Material', value: 'Precision forged Ti6Al4V' },
      { label: 'Taper', value: 'International 12/14 - available for ceramic head' },
      { label: 'Coating', value: 'Full-length Ti + HA' },
      { label: 'Design', value: 'Double-taper, trapezoidal-like proximal, double upright groove' },
      { label: 'Type', value: 'Standard and high-eccentricity prostheses' },
      { label: 'Sizes', value: '8-16, stem length 115-170mm, neck 33-45mm, offset 24.5-34' },
      { label: 'Clinical History', value: '25+ years, 1M implantations (Corail base)' },
      { label: 'Certification', value: 'CFDA, ISO 13485:2016, CE Marked' }
    ],
    features: ['25+ year / 1M-wearing Corail-style record', 'Ti6Al4V precision forged', '12/14 taper accepts ceramic heads', 'Full Ti+HA coating osseointegration', 'Double-taper vertical & rotational stability', 'Threaded holding & simple insertion'],
    image: '/products/be-stem-main.png',
    inStock: true,
    featured: false,
    certifications: ['CFDA', 'ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'XM Knee with TiN Coating (T-Free)',
    slug: 'xm-knee-with-tin-coating-t-free',
    category: 'joint-replacement-implants',
    hsnCode: '9018',
    subtitle: 'TiNbN PVD-coated CoCrMo total knee - reduced metal-ion release & high wear resistance',
    description: 'XM total knee system with T-Free TiN (TiNbN) coating. The femoral condyle and tibial tray are made of cobalt-chromium-molybdenum alloy with a highly polished surface to reduce wear. A titanium-niobium-nitrogen (TiNbN) coating is deposited on the surface by a high-density PVD process to further improve anti-wear performance, reduce release of substrate metal ions (nickel, chromium, cobalt) and improve biocompatibility. The ceramic-like surface isolates the metal prosthesis from the biological environment for improved long-term osseointegration. Design features include a deeper trochlear recess for good patellar contact in high flexion, an open intercondylar design that reduces osteotomy, and a tri-fin tibial plateau that distributes load evenly and enhances anti-dislocation.',
    specifications: [
      { label: 'System', value: 'XM knee system with T-Free TiNbN coating' },
      { label: 'Femoral Material', value: 'CoCrMo alloy - highly polished to reduce wear' },
      { label: 'Tibial Tray Material', value: 'CoCrMo alloy - highly polished to reduce wear' },
      { label: 'Coating', value: 'TiNbN (titanium-niobium-nitrogen) - high-density PVD process' },
      { label: 'Coating Benefits', value: 'Low friction, high wear & corrosion resistance, ceramic-like surface' },
      { label: 'Biocompatibility', value: 'Reduces allergen ion release (Ni, Cr, Co); ideal for metal-sensitive patients' },
      { label: 'Femoral Condyle Sizes', value: '#2-#10, AP 52-71mm, ML 55-77mm' },
      { label: 'Tibial Insert Sizes', value: '#2-#10, AP 41-52mm, ML 62-81mm' },
      { label: 'Size Range', value: 'Sizes 2# to 10#' },
      { label: 'Certification', value: 'CFDA, ISO 13485:2016, CE Marked' }
    ],
    features: ['High-density PVD TiNbN coating on CoCrMo substrate', 'Reduces metal-ion release - recommended for metal-sensitive patients', 'High wear resistance - low coefficient of friction', 'Ceramic surface isolates metal from biological environment', 'Deeper trochlear recess for stable patellar tracking in high flexion', 'Open intercondylar design - reduces bone resection', 'Tri-fin tibial plateau - even load distribution & anti-dislocation', 'CoCrMo femoral condyle & tibial tray with polished surface'],
    image: '/products/xm-knee-tin-main.png',
    inStock: true,
    featured: false,
    certifications: ['CFDA', 'ISO 13485:2016', 'CE Marked'],
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
    window.open(`https://wa.me/919816166456?text=${encodeURIComponent(inquiryText)}`, '_blank');
    window.location.href = `mailto:marlonendomedicaldevices@gmail.com?subject=Product Inquiry: ${product?.name}&body=${encodeURIComponent(inquiryText)}`;
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
