import sys

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Move "use client" to the absolute top
    if '"use client";' in content:
        content = content.replace('"use client";', '')
        content = '"use client";\n' + content.lstrip()

    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Fixed {filepath}")

fix_file("admin/src/app/dashboard/branding/page.tsx")
fix_file("admin/src/app/dashboard/web-development/page.tsx")
fix_file("admin/src/app/dashboard/video-editing/page.tsx")
