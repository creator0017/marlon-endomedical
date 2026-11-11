"""
Rename key product images from the PDF extraction to clean filenames
for use in the website.
"""
import os
import shutil

SRC = r"c:\marlon-endomedical\marlon-endomedical\client\public\products"

# Map: source filename -> clean destination filename
# Based on PDF content analysis:
# - Pages 3-17: CL MIS Cervical Fusion Cage (3D Fusion Cage)
# - Pages 18-23: Additive Manufacturing Fusion Cage (CL Large Cage / IVO)
# - Pages 24-53: Artificial Vertebral Body Fixation System
# - Pages 54-67: 3D Porous Vertebral Prosthesis

renames = {
    # CL MIS Cervical Fusion Cage - primary product image from page 13
    "spine_p13_img3.png": "cl-mis-cervical-fusion-cage.png",
    # 3D Fusion Cage structural advantage from page 5
    "spine_p5_img3.png": "3d-fusion-cage-structure.png",
    # CL Fusion Cage pore structure from page 8
    "spine_p8_img3.png": "cl-fusion-cage-pore-structure.png",
    # CL Fusion cage 2-year implantation result from page 9
    "spine_p9_img3.png": "cl-fusion-cage-implant-result.png",
    # CL shaped thoracolumbar fusion cage (IVO) from page 21
    "spine_p21_img3.png": "cl-thoracolumbar-fusion-cage-ivo.png",
    # CL Large Cage (IVD) from page 22
    "spine_p22_img3.png": "cl-large-cage-ivd.png",
    # Artificial Vertebral Body - product overview from page 30
    "spine_p30_img3.png": "artificial-vertebral-body-overview.png",
    "spine_p30_img4.png": "artificial-vertebral-body-specs.png",
    # Artificial Vertebral Body feature image from page 31
    "spine_p31_img3.png": "artificial-vertebral-features.png",
    "spine_p31_img5.png": "artificial-vertebral-expanded.png",
    # Artificial Vertebral product detail images pages 35-36
    "spine_p35_img3.png": "artificial-vertebral-detail-1.png",
    "spine_p35_img4.png": "artificial-vertebral-detail-2.png",
    "spine_p36_img4.png": "artificial-vertebral-detail-3.png",
    # 3D Porous Vertebral Prosthesis overview from page 55
    "spine_p55_img3.png": "3d-porous-vertebral-prosthesis-cervical.png",
    "spine_p55_img4.png": "3d-porous-vertebral-prosthesis-lumbar.png",
    # Vertebral Prosthesis I-A (Cervical) from page 57
    "spine_p57_img3.png": "vertebral-prosthesis-ia-cervical.png",
    "spine_p57_img4.png": "vertebral-prosthesis-ia-clinical.png",
    # Vertebral Prosthesis I-B (Lumbar) from page 58
    "spine_p58_img3.png": "vertebral-prosthesis-ib-lumbar.png",
    "spine_p58_img4.png": "vertebral-prosthesis-ib-detail.png",
    # Artificial vertebral real photos pages 56
    "spine_p56_img3.jpeg": "artificial-vertebral-photo-1.jpg",
    "spine_p56_img5.jpeg": "artificial-vertebral-photo-2.jpg",
    # Surgical technique images page 38
    "spine_p38_img3.png": "artificial-vertebral-surgical-1.png",
    "spine_p38_img4.jpeg": "artificial-vertebral-surgical-2.jpg",
    # Photos from page 53 (real use photos)
    "spine_p53_img3.jpeg": "artificial-vertebral-real-use-1.jpg",
    "spine_p53_img4.jpeg": "artificial-vertebral-real-use-2.jpg",
}

copied = 0
for src_name, dst_name in renames.items():
    src = os.path.join(SRC, src_name)
    dst = os.path.join(SRC, dst_name)
    if os.path.exists(src):
        shutil.copy2(src, dst)
        print(f"[OK] Copied {src_name} -> {dst_name}")
        copied += 1
    else:
        print(f"[MISS] Not found: {src_name}")

print(f"\nDone! Copied {copied} product images.")
