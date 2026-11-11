"""
Extract product images and information from the Spine new products PDF.
Outputs: images saved to client/public/products/, and prints product info as JSON.
"""
import fitz  # PyMuPDF
import json
import os
import re
from pathlib import Path

PDF_PATH = r"C:\Users\lucky\Downloads\Spine new products-2024.4.1.pdf"
OUTPUT_DIR = r"c:\marlon-endomedical\marlon-endomedical\client\public\products"
os.makedirs(OUTPUT_DIR, exist_ok=True)

doc = fitz.open(PDF_PATH)
total_pages = len(doc)
print(f"Total pages: {total_pages}")

# Extract all page texts
page_texts = []
for i, page in enumerate(doc):
    text = page.get_text("text")
    page_texts.append({"page": i+1, "text": text})

# Save all text to a file for review
with open("pdf_text_dump.txt", "w", encoding="utf-8") as f:
    for pt in page_texts:
        f.write(f"\n\n===== PAGE {pt['page']} =====\n")
        f.write(pt['text'])

print("Text extracted and saved to pdf_text_dump.txt")

# Extract images from each page
img_count = 0
page_images = {}  # page_num -> list of image paths

for page_num in range(total_pages):
    page = doc[page_num]
    images = page.get_images(full=True)
    page_images[page_num+1] = []
    
    for img_index, img in enumerate(images):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        width = base_image["width"]
        height = base_image["height"]
        
        # Skip tiny images (icons/bullets)
        if width < 100 or height < 100:
            continue
        
        img_filename = f"spine_p{page_num+1}_img{img_index+1}.{image_ext}"
        img_path = os.path.join(OUTPUT_DIR, img_filename)
        
        with open(img_path, "wb") as img_file:
            img_file.write(image_bytes)
        
        page_images[page_num+1].append({
            "file": f"/products/{img_filename}",
            "width": width,
            "height": height
        })
        img_count += 1

print(f"Extracted {img_count} images total")

# Print page summary
for page_num, imgs in page_images.items():
    if imgs:
        print(f"Page {page_num}: {len(imgs)} images")
        for img in imgs:
            print(f"  -> {img['file']} ({img['width']}x{img['height']})")

doc.close()
print("\nDone! Check pdf_text_dump.txt for all text content.")
