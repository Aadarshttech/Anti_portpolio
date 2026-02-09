import os
import shutil
import json
import random
from PIL import Image

SOURCE_DIR = r"D:\Projects\Projects\Anti_portpolio\Twitter"
SINGLE_FILE = r"D:\Projects\Projects\Anti_portpolio\IMG_4944.JPG"
DEST_DIR = r"D:\Projects\Projects\Anti_portpolio\silwalpurnima-main\silwalpurnima-main\public\memories"
JSON_OUTPUT = r"D:\Projects\Projects\Anti_portpolio\silwalpurnima-main\silwalpurnima-main\src\data\memories.json"
MAX_SIZE = (1200, 1200)
QUALITY = 85

CAPTIONS = [
    "Every moment with you is magic ✨",
    "Just happy to be yours ❤️",
    "My favorite hello and hardest goodbye 💑",
    "You make my heart smile 😊",
    "Better together, always 🌟",
    "Lost in your eyes 👀",
    "Collecting beautiful moments with you 📸",
    "You are my sunshine on a rainy day ☀️",
    "Love you to the moon and back 🌙",
    "My partner in crime and in life 🕵️‍♀️",
    "Simply us 💕",
    "Cherishing every second ⏳",
    "You complete me 🧩",
    "Life is better with you by my side 🌈",
    "My forever valentine 💘",
    "Smiling because of you 😄",
    "Our love story is my favorite 📖",
    "Hugs, kisses, and Valentine wishes",
    "You + Me = Perfect ❤️",
    "Creating memories one day at a time 🗓️",
    "Your laugh is my favorite sound 🎶",
    "Happiest when I'm with you 🥰",
    "My rock, my love, my everything 🪨",
    "Adventures with you are the best 🌍",
    "Forever grateful for you 🙏"
]

def optimize_images():
    if not os.path.exists(DEST_DIR):
        os.makedirs(DEST_DIR)
        print(f"Created destination directory: {DEST_DIR}")

    # Ensure data directory exists
    os.makedirs(os.path.dirname(JSON_OUTPUT), exist_ok=True)

    memories_data = []

    # Process all images in SOURCE_DIR
    if os.path.exists(SOURCE_DIR):
        files = [f for f in os.listdir(SOURCE_DIR) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))]
        print(f"Found {len(files)} images in {SOURCE_DIR}")

        for filename in files:
            source_path = os.path.join(SOURCE_DIR, filename)
            process_image(source_path, filename, memories_data)
    else:
        print(f"Source directory not found: {SOURCE_DIR}")

    # Process single file (IMG_4944.JPG) primarily for Hero use, but also add to memories if desired
    if os.path.exists(SINGLE_FILE):
        print(f"Processing specific file: {SINGLE_FILE}")
        process_image(SINGLE_FILE, "hero_success.jpg", memories_data, is_hero=True)
    else:
        print(f"Single file not found: {SINGLE_FILE}")

    # Write metadata to JSON
    with open(JSON_OUTPUT, 'w') as f:
        json.dump(memories_data, f, indent=2)
    print(f"Generated metadata for {len(memories_data)} images at {JSON_OUTPUT}")

def process_image(source_path, original_filename, data_list, is_hero=False):
    dest_filename = os.path.splitext(original_filename)[0] + ".webp"
    dest_path = os.path.join(DEST_DIR, dest_filename)

    try:
        with Image.open(source_path) as img:
            # Correct orientation from EXIF
            try:
                from PIL import ExifTags, ImageOps
                img = ImageOps.exif_transpose(img)
            except Exception:
                pass

            # Convert to RGB
            if img.mode != 'RGB':
                img = img.convert('RGB')

            # Determine orientation
            width, height = img.size
            orientation = "landscape" if width > height else "portrait"

            # Resize
            img.thumbnail(MAX_SIZE, Image.Resampling.LANCZOS)
            img.save(dest_path, "WEBP", quality=QUALITY)
            print(f"Optimized: {dest_filename} ({orientation})")

            # Add to data list (skip if it's the hero image specifically meant for hero section, 
            # unless we want it in timeline too. Let's mark it.)
            
            entry = {
                "src": f"/memories/{dest_filename}",
                "orientation": orientation,
                "caption": random.choice(CAPTIONS),
                "date": "2024-2025", # Placeholder
                "is_hero": is_hero
            }
            data_list.append(entry)

    except Exception as e:
        print(f"Error processing {original_filename}: {e}")

if __name__ == "__main__":
    optimize_images()
