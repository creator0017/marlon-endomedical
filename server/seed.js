require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  {
    name: 'HD Endoscopy Unit',
    category: 'imaging-systems',
    hsnCode: '901814',
    subtitle: 'Precision 4K Visualization',
    description: 'Professional high-definition endoscope unit with 4K resolution for next-generation minimally invasive surgical procedures. Features advanced CMOS sensor technology with superior color reproduction and 160° wide-angle optics.',
    specifications: [
      { label: 'Resolution', value: '4K Ultra HD (3840×2160)' },
      { label: 'Field of View', value: '160° Wide Angle' },
      { label: 'Light Source', value: 'LED Cold Light' },
      { label: 'Working Length', value: '310mm / 450mm' },
      { label: 'Channel Diameter', value: '2.8mm' }
    ],
    features: ['4K Ultra HD Imaging', 'LED Cold Light Source', 'Autoclavable Design', 'Ergonomic Handle', 'Wide-Angle Optics'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAK9ZMPKWDLAIwRlqlD4pZ-LlBD3kVzi1Qb8NR2QRk7Yk9S5WodKDHJAGxWXFrjcpX95sGoxg1_6f_OempfxYioPo5LjPei8P6gYANZ2SivYW1E0f2Z8N8b68USgg_bR8PyhUailHrIiOi9tRdsBZknawYPBr684hTQmLSlLNpXOIm39FDVLRzZ4ZjsZtxAOLLSsohHUlpakCjMGpm_SHz0O4T_3o183sypDd0uZBRzrBRxZd9GPtvM6ptE6wZVMfpuqMCBvGzTa7s',
    inStock: true,
    featured: true,
    certifications: ['ISO 13485:2016', 'CE Marked', 'FDA 510(k)'],
    price: 'POA'
  },
  {
    name: 'Titanium Forceps Set',
    category: 'surgical-tools',
    hsnCode: '9018',
    subtitle: 'Ultra-Lightweight Grade 5',
    description: 'Premium titanium forceps set designed for general and specialized surgery. Grade 5 titanium construction provides exceptional strength-to-weight ratio with superior corrosion resistance for repeated autoclaving.',
    specifications: [
      { label: 'Material', value: 'Grade 5 Titanium (Ti-6Al-4V)' },
      { label: 'Weight', value: '45% lighter than stainless steel' },
      { label: 'Set Contents', value: '12 pieces' },
      { label: 'Tip Options', value: 'Serrated / Smooth / Atraumatic' },
      { label: 'Sterilization', value: 'Autoclavable 134°C' }
    ],
    features: ['Grade 5 Titanium', 'Non-Magnetic', 'Corrosion Resistant', 'Ergonomic Grip', 'Laser-Etched Markings'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcz6Zza1kV_1xkHX27N4w0-ADI690N9CXe2lMOF7wLNpdy7lr6Nn0BTP8xKJ9U_JXT15KJzMLL9IJZjan9tKOXMP4mzb49mQ_nPt65AXXoOdzQAV4QSK3mi0zTM243Hwf3yiqiQLxMSbAOYfB0_xLw8PyWSSIAj_UThIeC7UqhxR6rBJ6NXwB3b3E4wFE1WRojGDUQxxdMVw4vcgsNLEQkCJMBXOxxmrYUgMys155CCQnKWxL2B073tc0dOnl4WdDFB5U5pKkMX_4',
    inStock: true,
    featured: true,
    certifications: ['ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'Digital Autoclave',
    category: 'sterilization',
    hsnCode: '9018',
    subtitle: 'Class B Vacuum Cycle',
    description: 'State-of-the-art Class B digital autoclave with pre-vacuum and post-vacuum cycles. Ensures complete sterilization of hollow instruments, porous loads, and wrapped goods with precise temperature and pressure control.',
    specifications: [
      { label: 'Chamber Volume', value: '23L / 45L / 75L' },
      { label: 'Sterilization Temp', value: '121°C – 134°C' },
      { label: 'Cycle Types', value: 'B-Type, S-Type, N-Type' },
      { label: 'Display', value: '7" LCD Touchscreen' },
      { label: 'Data Logging', value: 'USB + Thermal Printer' }
    ],
    features: ['Class B Pre-Vacuum', 'Touch Screen Control', 'Built-in Printer', 'Auto Door Lock', 'Fault Diagnostics'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC63WRyBtDtGNZA-Tpi7W_iJLHsNKRgh-_aWwtpOGuF3krieJdpk-7VGuzXVB2V_9Rq96XlqU224Z4j2dcnjSz2whuEBeDqXR7J3yA-GMmwwwJMAnlJljuIXEMbvhR_DhQc9f93XXw6jsvfgiD3EK0a8_jYd_jOsSNS-gonZME5YwV9z6PTZbW6k7n5Gfkk7RciwOs_BQwxzSh0pXUcjj1mHQkX_7rO6hA5hxTgYtZ4gObqHEF-6uGy5X7BDnsqLK5qd2Imgp2Ifik',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked', 'EN 13060'],
    price: 'POA'
  },
  {
    name: 'Cardiac Monitor S7',
    category: 'monitoring',
    hsnCode: '901814',
    subtitle: 'Multi-Parameter Tracking',
    description: 'Advanced cardiac monitoring system with 12-lead ECG, SpO2, NIBP, temperature, and respiratory monitoring. Features a 15-inch high-resolution display with customizable alarm parameters for ICU and operating theater use.',
    specifications: [
      { label: 'Display', value: '15" TFT Color LCD' },
      { label: 'Parameters', value: 'ECG, SpO2, NIBP, Temp, Resp, EtCO2' },
      { label: 'Battery', value: '6hr Li-Ion Rechargeable' },
      { label: 'Data Storage', value: '120 hours trending' },
      { label: 'Connectivity', value: 'HL7, Wi-Fi, LAN' }
    ],
    features: ['12-Lead ECG', 'Arrhythmia Analysis', 'Drug Dose Calculator', 'Central Station Ready', 'Touchscreen Interface'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaFZ1pnQw5Pxe483aIjiCFcCBceh3k0VjX7QlLJsuvWLAQFRvx6i7V3diFM7ca1qCEAIdir-ffzzdVPnHPhlGkH5B6ovu5TWjSQcj2jI_OTDapf2a2XW97NFRizRqN58Mt1JdTYtj3tdtqiGpqzwV7CRDYo32BObd8RDT8sjS3iQC1wgeViXZcvxQ_RugmkyS2OqwKZRgEy2g-_Mlmoh4O0gExgeTUWnxavaRna_Zb5uhh1Ww47MXWT5lnodbwwp39n4MxaBXNOPI',
    inStock: true,
    featured: true,
    certifications: ['ISO 13485:2016', 'CE Marked', 'FDA 510(k)'],
    price: 'POA'
  },
  {
    name: 'Laparoscopic Camera System',
    category: 'imaging-systems',
    hsnCode: '901814',
    subtitle: 'Full HD 1080p Surgical Vision',
    description: 'Compact full HD laparoscopic camera system with integrated LED light source. Delivers razor-sharp 1080p imaging with digital zoom capabilities, designed for streamlined minimally invasive surgical workflows.',
    specifications: [
      { label: 'Resolution', value: '1920×1080 Full HD' },
      { label: 'Digital Zoom', value: '2x optical' },
      { label: 'Light Source', value: 'Integrated 80W LED' },
      { label: 'Camera Head', value: '3-chip CMOS sensor' },
      { label: 'Focus', value: 'Auto + Manual' }
    ],
    features: ['Full HD 1080p', 'Integrated LED', 'Auto White Balance', 'Image Capture', 'Video Recording'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhL9JEg8RNSg-uSLPMNeIOePxJpuNtp9FEMr6G1U4u2P8fKI1O40vgmKILqjNkAq2_SmA3hH5s3u1mDNd99crWD0VGeXBRFob7Wi9S18YIf5H5vYYl1Mqsr_GAlsHZ-2Gu_6UVtUgZpDyPR-307x8N4auvGptjWoV5FUmbXCqUeJ71hJfWVStnU3zuvJAzy6Vn-pnYUfhIxqoWOz-VWkap1Mu_AtSP6iV-3UdhnXxt0u3N2i70TbmCPcTnI_BRgwdRlRSWrstb5y0',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'Surgical Scalpel Kit',
    category: 'surgical-tools',
    hsnCode: '9018',
    subtitle: 'Carbon Steel Precision Blades',
    description: 'Premium surgical scalpel kit featuring high-carbon stainless steel blades with ergonomic reusable handles. Complete set includes the most commonly used blade sizes for general surgical, dermatological, and microsurgical procedures.',
    specifications: [
      { label: 'Blade Material', value: 'High-Carbon Stainless Steel' },
      { label: 'Handle Material', value: 'Anodized Aluminum' },
      { label: 'Blade Sizes', value: '#10, #11, #15, #20, #22, #24' },
      { label: 'Handles Included', value: '#3, #4, #7' },
      { label: 'Blades per Size', value: '25 per size (150 total)' }
    ],
    features: ['Precision Ground Edge', 'Individually Wrapped Blades', 'Ergonomic Handle', 'Color-Coded Sizes', 'Sterilization Compatible'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzDmOciNw-T_lq5ei30TBkZJYef9lJoSCYSD4Qs0m-qBcftzXBYugIzy4gsR6p_Uofapn657hUPqEydftt7On9S9-fYGMud1RD9RmZtfDvGo3JefTZXoPS4XsgfOO5QglDJPQVVmiK0vNGvVtwBB9kyRxMGf_1VI8611VphYtNApa3YchPu--Y7jewQSKQSm9LGBrJr9QepvlZwViVHJDGZrS5GHubgChH9bBbxpkMNxthetEoHRE_kKxZZTBbD-XeIiRUTbZBkl0',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked'],
    price: 'POA'
  },
  {
    name: 'Pulse Oximeter Pro',
    category: 'diagnostics',
    hsnCode: '901814',
    subtitle: 'Clinical-Grade SpO2 Monitoring',
    description: 'Hospital-grade pulse oximeter with continuous SpO2 and pulse rate monitoring. Features plethysmograph waveform display, audible/visual alarms, and data trend analysis for ICU, OR, and general ward applications.',
    specifications: [
      { label: 'SpO2 Range', value: '0–100%' },
      { label: 'Accuracy', value: '±2% (70–100%)' },
      { label: 'Pulse Rate', value: '25–250 bpm' },
      { label: 'Display', value: '3.5" OLED Color' },
      { label: 'Battery Life', value: '24 hours continuous' }
    ],
    features: ['Plethysmograph Waveform', 'Audible Alarms', 'Data Trending', 'Adult & Pediatric Probes', 'USB Data Export'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKY8m_2TN6EfCD1fief0R5ABF7yoHZWzp6nNgv0G_yy10naGiobzRWH2SG2J3atVu3vTHgUuau-KP-j9HPNSL3G9vo5TYIcVCjgP4sqWE0lWkWmCuG0D462TM83f16oxaUD9I1mkDEYeTNGJXBXLvpyS04WF8nJWv8wVFyuxRmLJdkkYwiO6o5fr2j7Z65f5P_sEAo04EvB3XJIBkVSLPK9oVPjcrxJKIX5sRi15-UczFp8zU8fV1D2BQA-iUQySyEzLAPtDXJSUs',
    inStock: true,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked', 'FDA 510(k)'],
    price: 'POA'
  },
  {
    name: 'Electrosurgical Generator',
    category: 'surgical-tools',
    hsnCode: '901814',
    subtitle: 'Advanced Bipolar/Monopolar ESU',
    description: 'Microprocessor-controlled electrosurgical generator with both monopolar and bipolar modes. Advanced vessel sealing technology with tissue impedance monitoring for precise energy delivery during surgical procedures.',
    specifications: [
      { label: 'Monopolar Cut', value: '400W max' },
      { label: 'Monopolar Coag', value: '120W max' },
      { label: 'Bipolar', value: '80W max' },
      { label: 'Vessel Seal', value: 'Up to 7mm vessels' },
      { label: 'Safety', value: 'Patient Return Monitor' }
    ],
    features: ['Tissue Impedance Sensing', 'Vessel Sealing', 'Arc Detection', 'Memory Presets', 'Smoke Evacuation Port'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhL9JEg8RNSg-uSLPMNeIOePxJpuNtp9FEMr6G1U4u2P8fKI1O40vgmKILqjNkAq2_SmA3hH5s3u1mDNd99crWD0VGeXBRFob7Wi9S18YIf5H5vYYl1Mqsr_GAlsHZ-2Gu_6UVtUgZpDyPR-307x8N4auvGptjWoV5FUmbXCqUeJ71hJfWVStnU3zuvJAzy6Vn-pnYUfhIxqoWOz-VWkap1Mu_AtSP6iV-3UdhnXxt0u3N2i70TbmCPcTnI_BRgwdRlRSWrstb5y0',
    inStock: false,
    featured: false,
    certifications: ['ISO 13485:2016', 'CE Marked', 'IEC 60601-2-2'],
    price: 'POA'
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    await Product.deleteMany({});
    console.log('Cleared existing products.');

    const created = await Product.insertMany(products);
    console.log(`✓ Seeded ${created.length} products successfully.`);

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
};

seedDB();
