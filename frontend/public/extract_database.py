import os
import json
from pathlib import Path

# Configuration
PROJECTS_ROOT = "images/projects"   # Directory containing project folders
OUTPUT_JSON = "projects.json"       # Output file

def generate_projects_json(root_dir, output_file):
    root_path = Path(root_dir)
    
    if not root_path.exists():
        print(f"Error: Directory '{root_dir}' not found!")
        return

    projects = {}

    # Supported image extensions
    IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'}

    # Scan each subfolder in the projects directory
    for folder in root_path.iterdir():
        if folder.is_dir():
            folder_name = folder.name
            relative_image_paths = []

            # Look for image files inside the folder
            for image_file in folder.iterdir():
                if image_file.is_file() and image_file.suffix.lower() in IMAGE_EXTENSIONS:
                    # Build relative path: images/projects/foldername/imagename.ext
                    rel_path = f"images/projects/{folder_name}/{image_file.name}"
                    relative_image_paths.append(rel_path)

            # Sort image paths for consistency (optional)
            relative_image_paths.sort()

            # Create entry for this project
            projects[folder_name] = {
                "full_name": "",
                "description": "",
                "started_at": "",
                "ended_at": "",
                "employer": "",
                "pictures": relative_image_paths
            }

    # Write to JSON file with nice formatting
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(projects, f, indent=4, ensure_ascii=False)

    print(f"Generated {output_file} with {len(projects)} projects.")

# Run the script
if __name__ == "__main__":
    generate_projects_json(PROJECTS_ROOT, OUTPUT_JSON)