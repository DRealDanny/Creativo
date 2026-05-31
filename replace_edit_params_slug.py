import sys

def replace_edit_with_slug(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # We need to change: searchParams.get('edit') -> searchParams.get('slug')
    if "searchParams.get('edit')" in content:
        content = content.replace("searchParams.get('edit')", "searchParams.get('slug')")
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated {filepath} to use ?slug=")

replace_edit_with_slug("admin/src/app/dashboard/branding/page.tsx")
replace_edit_with_slug("admin/src/app/dashboard/web-development/page.tsx")
replace_edit_with_slug("admin/src/app/dashboard/video-editing/page.tsx")

def replace_edit_link(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    if "?edit=" in content:
        content = content.replace("?edit=", "?slug=")
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated {filepath} to generate ?slug= links")

replace_edit_link("admin/src/app/dashboard/work/page.tsx")
