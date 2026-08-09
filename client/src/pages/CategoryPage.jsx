import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';

const categoryMeta = {
  'surgical-tools': {
    label: 'Surgical Tools',
    icon: 'vaccines',
    accentColor: 'var(--primary-container)',
    glowColor: 'rgba(0,74,153,0.35)',
    tagline: 'Precision instruments trusted in operating theatres worldwide',
    description: 'Our surgical tools portfolio covers the full spectrum of open and minimally invasive procedures — from laparoscopic graspers and electrosurgical generators to specialty scissors, retractors, and needle drivers. Every instrument is manufactured to exacting tolerances and distributed under our ISO 13485:2016 quality program.',
    highlights: [
      { icon: 'precision_manufacturing', label: 'Grade 5 Titanium & 316L Stainless Steel' },
      { icon: 'verified', label: 'ISO 13485 & CE Certified' },
      { icon: 'autorenew', label: 'Reusable & Single-Use Options' },
      { icon: 'local_shipping', label: 'Sterilisation-ready Packaging' },
    ],
    useCases: ['General Surgery', 'Laparoscopic Surgery', 'Orthopaedics', 'Gynaecology', 'ENT', 'Urology'],
    hsnCode: '9018',
  },
  'imaging-systems': {
    label: 'Imaging Systems',
    icon: 'radiology',
    accentColor: 'var(--secondary)',
    glowColor: 'rgba(0,106,102,0.35)',
    tagline: 'See more, treat better — advanced visualisation for clinical excellence',
    description: 'From 4K endoscopy cameras and flexible bronchoscopes to digital X-ray and portable ultrasound, our imaging systems bring next-generation clinical visualisation to surgical suites and diagnostic departments. All systems are sourced from globally certified OEM manufacturers with full CE and CDSCO compliance.',
    highlights: [
      { icon: 'hd', label: '4K Ultra HD & Full HD Options' },
      { icon: 'bolt', label: 'LED Cold-Light Technology' },
      { icon: 'settings_input_composite', label: 'DICOM & HIS/RIS Compatible' },
      { icon: 'support_agent', label: 'Installation & Training Included' },
    ],
    useCases: ['Endoscopy', 'Laparoscopy', 'Radiology', 'Bronchoscopy', 'Cystoscopy', 'ERCP'],
    hsnCode: '9018 / 9022',
  },

  'spine-surgery': {
    label: 'Spine Surgery',
    icon: 'orthopedics',
    accentColor: '#c2410c',
    glowColor: 'rgba(194,65,12,0.3)',
    tagline: 'Comprehensive spinal fixation & interbody fusion implant systems',
    description: 'Marlon Endomedical\'s spine surgery portfolio includes anterior and posterior cervical fixation systems, CF posterior spinal internal fixators across multiple screw series (U3/U4, U6/U7, U8/U9, U15/U16/U18, U Screw 10/11/17/19, U21, U14), and RZ-series lumbar interbody fusion cages. Every implant is manufactured from Grade 5 titanium alloy or PEEK-OPTIMA with rigorous quality assurance and full regulatory compliance.',
    highlights: [
      { icon: 'precision_manufacturing', label: 'Cervical Fixation — Anterior & Posterior Systems' },
      { icon: 'inventory_2', label: 'CF Posterior Fixator — 7 Screw Series Available' },
      { icon: 'bolt', label: 'Fenestrated Screws for Cement Augmentation' },
      { icon: 'hd', label: 'PEEK & 3D-Printed Titanium Interbody Cages' },
    ],
    useCases: ['ACDF (Anterior Cervical Discectomy & Fusion)', 'Posterior Cervical Fixation', 'Thoracolumbar Fusion', 'MIS-TLIF & PLIF Procedures', 'Sacroiliac Joint Fixation', 'Osteoporotic Fracture Augmentation'],
    hsnCode: '9018',
  },
  'endoscopic-spine-equipments': {
    label: 'Endoscopic Spine Equipments',
    icon: 'video_camera_front',
    accentColor: '#0891b2',
    glowColor: 'rgba(8,145,178,0.3)',
    tagline: 'Rigid endoscopes, telescope systems and full spine endoscopy consoles',
    description: 'Marlon Endomedical\'s endoscopic spine equipment line covers rigid rod-lens optics, transforaminal and interlaminar working cannulas, radiofrequency generators, bipolar instrumentation, and Full-HD endoscopy consoles — everything needed for minimally invasive spine procedures.',
    highlights: [
      { icon: 'videocam', label: 'Rigid Rod-Lens Endoscope Optics' },
      { icon: 'bolt', label: 'RF Generators & Bipolar Systems' },
      { icon: 'hd', label: 'Full-HD Visualization Consoles' },
      { icon: 'local_hospital', label: 'Percutaneous Working Cannulas & Kits' },
    ],
    useCases: ['Percutaneous Endoscopic Discectomy', 'Interlaminar Endoscopy', 'Transforaminal Endoscopic Spine Surgery', 'Endoscopic Decompression', 'Radiofrequency Ablation'],
    hsnCode: '9018',
  },
  'joint-replacement-implants': {
    label: 'Joint Replacement Implants',
    icon: 'accessibility_new',
    accentColor: '#4d7c0f',
    glowColor: 'rgba(77,124,15,0.3)',
    tagline: 'Hip joint replacement implants — acetabular cups & femoral stems',
    description: 'Marlon Endomedical\'s joint replacement line includes hip acetabular cup systems (Type-A obturator & Type-B ischial plate) with a uniform rough surface for bone ingrowth, titanium femoral stems with 12/14 taper in straight and curved left/right configurations, cementless finger knuckle (MCP/PIP) prostheses, and a full modular/customized tumor prosthesis range covering hip, hemi-pelvis, knee, shoulder and elbow systems for bone-tumor limb salvage.',
    highlights: [
      { icon: 'precision_manufacturing', label: 'Acetabular Cup — Uniform Rough Surface' },
      { icon: 'inventory_2', label: 'Femoral Stem — Straight & Curved L/R' },
      { icon: 'science', label: 'Ti6Al4V Titanium Alloy Construction' },
      { icon: 'autorenew', label: 'Tumor — Hip, Hemi-Pelvis, Knee, Shoulder & Elbow' },
    ],
    useCases: ['Total Hip Arthroplasty', 'Total Hip Replacement', 'Hip Revision Surgery', 'Acetabular Reaming & Implantation', 'Bone Tumor Resection & Limb Salvage', 'Finger Joint Replacement (MCP & PIP)', 'Total Knee Arthroplasty', 'Elbow Joint Replacement'],
    hsnCode: '9018',
  },
};

const fallbackProducts = {
  'surgical-tools': [
    { _id: 's5', slug: 'zimmer-nexgen-knee-instrument-set', name: 'Zimmer NexGen Knee Instrument Set', subtitle: 'Total Knee Arthroplasty Instrumentation', category: 'surgical-tools', price: 'POA', inStock: true, image: '/products/zimmer-nexgen-knee-instrument-set.jpg' },
    { _id: 'st1', slug: 'bp-handle-no-7', name: 'BP Handle No. 7', subtitle: 'Surgical Scalpel Handle - 160mm', category: 'surgical-tools', price: 'POA', inStock: true, image: '' },
    { _id: 'st2', slug: 'artery-forceps-curved-cairns', name: 'Artery Forceps Curved Cairns', subtitle: 'Curved Cairns Artery Forceps - 145mm', category: 'surgical-tools', price: 'POA', inStock: true, image: '' },
    { _id: 'st3', slug: 'artery-forceps-straight-cairns', name: 'Artery Forceps Straight Cairns', subtitle: 'Straight Cairns Artery Forceps - 145mm', category: 'surgical-tools', price: 'POA', inStock: true, image: '' },
    { _id: 'st4', slug: 'halstead-mosquito-artery-forceps-curved', name: 'Halstead Mosquito Artery Forceps Curved', subtitle: 'Fine Tip Curved Mosquito Forceps - 125mm', category: 'surgical-tools', price: 'POA', inStock: true, image: '' },
    { _id: 'st5', slug: 'halstead-mosquito-artery-forceps-straight', name: 'Halstead Mosquito Artery Forceps Straight', subtitle: 'Fine Tip Straight Mosquito Forceps - 125mm', category: 'surgical-tools', price: 'POA', inStock: true, image: '' },
    { _id: 'st6', slug: 'dissecting-forceps-toothed', name: 'Dissecting Forceps Toothed', subtitle: '1x2 Teeth Dissecting Forceps - 145mm', category: 'surgical-tools', price: 'POA', inStock: true, image: '' },
    { _id: 'st7', slug: 'debakey-vascular-forceps-atrogrip', name: 'DeBakey Vascular Forceps Atrogrip', subtitle: 'Atraumatic Vascular Forceps - Multi-Length', category: 'surgical-tools', price: 'POA', inStock: true, image: '' },
    { _id: 'st8', slug: 'scissor-metzenbaum-curved-fine', name: 'Scissor Metzenbaum Curved Fine', subtitle: 'Round Point Curved Metzenbaum Scissors', category: 'surgical-tools', price: 'POA', inStock: true, image: '' },
    { _id: 'st9', slug: 'forceps-russian', name: 'Forceps Russian', subtitle: 'Russian Pattern Tissue Forceps - 150mm', category: 'surgical-tools', price: 'POA', inStock: true, image: '' },
    { _id: 'st10', slug: 'needle-holder-heavy', name: 'Needle Holder Heavy', subtitle: 'Heavy-Duty Needle Holder - Multi-Length', category: 'surgical-tools', price: 'POA', inStock: true, image: '' },
    { _id: 'st11', slug: 'needle-holder-fine', name: 'Needle Holder Fine', subtitle: 'Lightweight Fine Needle Holder - Multi-Length', category: 'surgical-tools', price: 'POA', inStock: true, image: '' },
    { _id: 'st12', slug: 'mixter-forceps-fine-medium-long', name: 'Mixter Forceps Fine Medium, Long', subtitle: 'Right-Angled Mixter Forceps - Multi-Length', category: 'surgical-tools', price: 'POA', inStock: true, image: '' },
    { _id: 'st13', slug: 'sydney-scott-forceps', name: 'Sydney Scott Forceps', subtitle: 'Sydney Scott Surgical Forceps - 185mm', category: 'surgical-tools', price: 'POA', inStock: true, image: '' },
    { _id: 'st14', slug: 'langenback-retractor', name: 'Langenback Retractor', subtitle: 'Langenbeck Retractor - 230mm', category: 'surgical-tools', price: 'POA', inStock: true, image: '' },
    { _id: 'st15', slug: 'satinskey-vascular-clamp', name: 'Satinskey Vascular Clamp', subtitle: 'Satinsky Vascular Clamp - Multi-Length', category: 'surgical-tools', price: 'POA', inStock: true, image: '' },
    { _id: 'st16', slug: 'cooley-s-vascular-clamp', name: "Cooley's Vascular Clamp", subtitle: "Cooley Vascular Clamp - Multi-Length", category: 'surgical-tools', price: 'POA', inStock: true, image: '' },
    { _id: 'st17', slug: 'crawford-s-go-around-forceps', name: "Crawford's Go-Around Forceps", subtitle: 'Crawford Go-Around Forceps - Multi-Length', category: 'surgical-tools', price: 'POA', inStock: true, image: '' },
    { _id: 'st18', slug: 'aortic-cross-clamp', name: 'Aortic Cross Clamp', subtitle: 'Cardiothoracic Aortic Cross Clamp - 240mm', category: 'surgical-tools', price: 'POA', inStock: true, image: '' },
    { _id: 'st19', slug: 'clip-applicator', name: 'Clip Applicator (Small, Medium, Large)', subtitle: 'Surgical Clip Applier - 200mm', category: 'surgical-tools', price: 'POA', inStock: true, image: '' },
    { _id: 'st20', slug: 'sternal-retractor-single-blade', name: 'Sternal Retractor Single Blade', subtitle: 'Single Blade Sternal Retractor', category: 'surgical-tools', price: 'POA', inStock: true, image: '' },
    { _id: 'st21', slug: 'sternal-retractor-double-blade', name: 'Sternal Retractor Double Blade', subtitle: 'Double Blade Sternal Retractor', category: 'surgical-tools', price: 'POA', inStock: true, image: '' },
    { _id: 'st22', slug: 'rubios-wire-holding-forceps', name: 'Rubios Wire Holding Forceps', subtitle: 'Rubios Wire Holding Forceps - 200mm', category: 'surgical-tools', price: 'POA', inStock: true, image: '' },
    { _id: 'st23', slug: 'wire-twister-holder', name: 'Wire Twister / Holder', subtitle: 'Wire Twister & Holder - 150mm', category: 'surgical-tools', price: 'POA', inStock: true, image: '' },
    { _id: 'st24', slug: 'wire-cutter', name: 'Wire Cutter', subtitle: 'Surgical Wire Cutter - 235mm', category: 'surgical-tools', price: 'POA', inStock: true, image: '' },
    { _id: 'st25', slug: 'rochester-onhnser-forceps', name: 'Rochester Onhnser Forceps', subtitle: 'Rochester Onhnser Forceps - 185mm', category: 'surgical-tools', price: 'POA', inStock: true, image: '' },
    { _id: 's6', slug: 'marlon-aqua-mat-irrigation-pump', name: 'Marlon Aqua-Mat Endoscopic Irrigation Pump', subtitle: 'Precision Pressure & Flow Fluid Management', category: 'surgical-tools', price: 'POA', inStock: true, image: '/products/marlon-aqua-mat-irrigation-pump.png' },
    { _id: 's7', slug: 'marlon-endoscopic-shaver-system', name: 'Marlon Endoscopic Shaver System', subtitle: 'High-Speed Resection & Debridement Console', category: 'surgical-tools', price: 'POA', inStock: true, image: '/products/marlon-endoscopic-shaver-system.jpg' },
    { _id: 's8', slug: 'marlon-endoscopic-shaver-handpiece', name: 'Marlon Endoscopic Shaver Handpiece', subtitle: 'Ergonomic High-Speed Shaver Handpiece', category: 'surgical-tools', price: 'POA', inStock: true, image: '/products/marlon-endoscopic-shaver-handpiece.jpg' },
    { _id: 's9', slug: 'marlon-rf-generator', name: 'Marlon Radiofrequency (RF) Generator', subtitle: 'High-Frequency Electrosurgical Console', category: 'surgical-tools', price: 'POA', inStock: true, image: '/products/marlon-rf-generator.jpg' }
  ],
  'imaging-systems': [
    { _id: 'i1', slug: 'hd-endoscopy-unit', name: 'HD Endoscopy Unit', subtitle: 'Precision 4K Visualization', category: 'imaging-systems', price: 'POA', inStock: true, image: '/products/hd-endoscopy-unit.png' },
    { _id: 'i2', slug: 'laparoscopic-camera-system', name: 'Laparoscopic Camera System', subtitle: 'Full HD 1080p Surgical Vision', category: 'imaging-systems', price: 'POA', inStock: true, image: '/products/laparoscopic-camera-system.jpg' },
    { _id: 'i3', slug: 'led-light-source', name: 'Endoscopy LED Light Source', subtitle: 'High-Intensity LED Cold Light', category: 'imaging-systems', price: 'POA', inStock: true, image: '/products/led-light-source.jpg' },
    { _id: 'i4', slug: 'marlon-hd-camera-system', name: 'Marlon HD Camera System', subtitle: 'Full HD Endoscopic Camera Console', category: 'imaging-systems', price: 'POA', inStock: true, image: '/products/marlon-hd-camera-system.jpg' },
    { _id: 'i5', slug: 'marlon-cold-light-source-oem', name: 'Marlon Cold Light Source (OEM Package)', subtitle: 'White Light Cold Source OEM System', category: 'imaging-systems', price: 'POA', inStock: true, image: '/products/marlon-cold-light-source-specs.jpg' },
  ],
  'spine-surgery': [
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
    { _id: '14', slug: 'cs-anterior-spinal-internal-fixator-csb1-csb2-bone-plate-series', name: 'CS Anterior Spinal Internal Fixator (CSB1 / CSB2 Bone Plate Series)', subtitle: 'Anterior Thoracolumbar Bone Plate System', category: 'spine-surgery', price: 'POA', inStock: true, image: '/products/cs-anterior-csb1-csb2.jpg' },
    { _id: '15', slug: 'cl-mis-cervical-fusion-cage-ivn-series', name: 'CL MIS Cervical Fusion Cage (IVN Series)', subtitle: '3D-Printed Porous Cervical Fusion Implant', category: 'spine-surgery', price: 'POA', inStock: true, image: '/products/cl-mis-cervical-ivn.jpg' },
    { _id: '16', slug: 'cl-shaped-thoracolumbar-fusion-apparatus-ivo-series', name: 'CL Shaped Thoracolumbar Fusion Apparatus (IVO Series)', subtitle: '3D-Printed Bulleted Lumbar Fusion Cage', category: 'spine-surgery', price: 'POA', inStock: true, image: '/products/cl-shaped-thoracolumbar-ivo.jpg' },
    { _id: '17', slug: 'cl-large-fusion-cage-ivd-series', name: 'CL Large Fusion Cage (IVD Series)', subtitle: '3D-Printed ALIF / LLIF / OLIF Fusion System', category: 'spine-surgery', price: 'POA', inStock: true, image: '/products/cl-large-fusion-ivd.jpg' },
    { _id: '18', slug: 'adjustable-artificial-vertebral-body-fixation-system', name: 'Adjustable Artificial Vertebral Body Fixation System', subtitle: 'Expandable Corpectomy Prosthesis System', category: 'spine-surgery', price: 'POA', inStock: true, image: '/products/adjustable-vertebral-body.jpg' },
    { _id: '19', slug: '3d-porous-vertebral-prosthesis-model-ia-cervical-model-ib-lumbar', name: '3D Porous Vertebral Prosthesis (Model I-A Cervical & Model I-B Lumbar)', subtitle: '3D-Printed Corpectomy Vertebral Replacement', category: 'spine-surgery', price: 'POA', inStock: true, image: '/products/3d-porous-vertebral-prosthesis.jpg' },
  ],
  'endoscopic-spine-equipments': [
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
  ],
  'joint-replacement-implants': [
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
  ],
};

export default function CategoryPage() {
  const { category } = useParams();
  const meta = categoryMeta[category];
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (meta) document.title = `${meta.label} | Marlon Endomedical`;
    loadProducts();
  }, [category]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const { data } = await getProducts({ category, limit: 6 });
      setProducts(data.data);
    } catch {
      setProducts(fallbackProducts[category] || []);
    } finally {
      setLoading(false);
    }
  };

  // Unknown category
  if (!meta) {
    return (
      <section className="page-hero" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="headline-lg" style={{ marginBottom: '1rem' }}>Category not found</h1>
          <Link to="/products" className="btn btn--primary">Browse All Products</Link>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="page-hero" id={`cat-hero-${category}`}>
        <div className="container">
          {/* Breadcrumb */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.8125rem', color: 'var(--on-surface-variant)' }}>
            <Link to="/" style={{ color: 'var(--on-surface-variant)' }}>Home</Link>
            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>chevron_right</span>
            <Link to="/products" style={{ color: 'var(--on-surface-variant)' }}>Products</Link>
            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>chevron_right</span>
            <span style={{ color: 'var(--on-surface)' }}>{meta.label}</span>
          </div>

          <div className="glass-panel animate-in" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.625rem', padding: '0.375rem 1rem', borderRadius: 'var(--radius-full)', marginBottom: '1.25rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--primary-fixed-dim)' }}>{meta.icon}</span>
            <span className="label-sm" style={{ color: 'var(--primary-fixed-dim)' }}>HSN {meta.hsnCode}</span>
          </div>
          <h1 className="display-lg page-hero__title animate-in">{meta.label}</h1>
          <p className="page-hero__desc animate-in animate-delay-1" style={{ maxWidth: '640px' }}>
            {meta.tagline}
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="section" style={{ padding: '5rem 0' }} id={`cat-overview-${category}`}>
        <div className="container">
          <div className="grid-2col" style={{ gap: '3rem', alignItems: 'center' }}>
            <div className="animate-in">
              <div className="label-sm" style={{ color: 'var(--primary-fixed-dim)', marginBottom: '0.75rem' }}>Category Overview</div>
              <h2 className="headline-lg" style={{ marginBottom: '1.25rem' }}>{meta.label}</h2>
              <p className="body-lg" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.85, marginBottom: '1.5rem' }}>
                {meta.description}
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to={`/products?category=${category}`} className="btn btn--primary">
                  <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>grid_view</span>
                  View All {meta.label}
                </Link>
                <Link to="/quote" className="btn glass-panel">
                  <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>request_quote</span>
                  Get a Quote
                </Link>
              </div>
            </div>

            <div className="animate-in animate-delay-1 grid-2col" style={{ gap: '1rem' }}>
              {meta.highlights.map((h, i) => (
                <div key={i} className="glass-panel" style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '1.5rem', color: meta.accentColor, display: 'block', marginBottom: '0.5rem' }}>{h.icon}</span>
                  <span className="body-sm" style={{ fontWeight: 600, lineHeight: 1.5 }}>{h.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section style={{ background: 'var(--surface-container-low)', padding: '3.5rem 0' }} id={`cat-usecases-${category}`}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div className="label-sm" style={{ color: 'var(--primary-fixed-dim)', marginBottom: '0.5rem' }}>Applications</div>
            <h3 className="headline-md">Common Clinical Use Cases</h3>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
            {meta.useCases.map((uc, i) => (
              <span key={i} className="glass-panel" style={{ padding: '0.5rem 1.125rem', borderRadius: 'var(--radius-full)', fontSize: '0.875rem', fontWeight: 600 }}>
                {uc}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section" style={{ padding: '5rem 0' }} id={`cat-products-${category}`}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div className="label-sm" style={{ color: 'var(--primary-fixed-dim)', marginBottom: '0.5rem' }}>Featured</div>
              <h2 className="headline-lg">Popular {meta.label}</h2>
            </div>
            <Link to={`/products?category=${category}`} style={{ color: 'var(--primary-fixed-dim)', fontSize: '0.875rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
              View full catalog
              <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>arrow_forward</span>
            </Link>
          </div>

          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {[1, 2, 3].map((n) => (
                <div key={n} className="skeleton" style={{ height: '380px', borderRadius: 'var(--radius-xl)' }} />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {products.map((p, i) => (
                <div key={p._id || p.slug} className={`animate-in animate-delay-${(i % 4) + 1}`}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: 'var(--on-surface-variant)', display: 'block', marginBottom: '1rem' }}>inventory_2</span>
              <p className="body-md" style={{ color: 'var(--on-surface-variant)', marginBottom: '1.5rem' }}>Products coming soon. Contact us for availability.</p>
              <Link to="/contact" className="btn btn--primary">Contact Sales</Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id={`cat-cta-${category}`}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="headline-lg" style={{ color: 'var(--on-primary)', marginBottom: '1rem' }}>
            Need {meta.label} for Your Facility?
          </h2>
          <p style={{ color: 'var(--primary-fixed)', fontSize: '1.125rem', marginBottom: '2rem' }}>
            Get customised volume pricing and full compliance documentation within 24 hours.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/quote" className="btn btn--cta btn--lg">
              Request a Quote
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <Link to="/certifications" className="btn btn--lg" style={{ background: 'rgba(255,255,255,0.15)', color: 'var(--on-primary)', border: '1px solid rgba(255,255,255,0.3)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>workspace_premium</span>
              View Certifications
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
