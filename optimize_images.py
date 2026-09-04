import os
from PIL import Image

def optimize_images(directory):
    count = 0
    total_saved = 0
    for filename in os.listdir(directory):
        if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
            filepath = os.path.join(directory, filename)
            try:
                original_size = os.path.getsize(filepath)
                with Image.open(filepath) as img:
                    # Convert RGBA to RGB for JPEG compatibility if saving as JPEG
                    if filename.lower().endswith(('.jpg', '.jpeg')) and img.mode in ('RGBA', 'P'):
                        img = img.convert('RGB')
                    
                    # Resize if too large
                    max_size = (1920, 1920)
                    img.thumbnail(max_size, Image.Resampling.LANCZOS)
                    
                    # Overwrite file with compression
                    if filename.lower().endswith('.png'):
                        img.save(filepath, 'PNG', optimize=True)
                    else:
                        img.save(filepath, 'JPEG', quality=80, optimize=True)
                
                new_size = os.path.getsize(filepath)
                saved = original_size - new_size
                if saved > 0:
                    total_saved += saved
                count += 1
                print(f"Optimized {filename}: Saved {saved / 1024:.2f} KB")
            except Exception as e:
                print(f"Failed to optimize {filename}: {e}")
    print(f"\nOptimization complete! Processed {count} images. Total saved: {total_saved / (1024 * 1024):.2f} MB")

if __name__ == '__main__':
    optimize_images('assets')
