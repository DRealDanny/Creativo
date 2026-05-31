import sys

def main():
    filepath = "admin/src/app/dashboard/video-editing/page.tsx"
    with open(filepath, 'r') as f:
        content = f.read()

    content = content.replace("function BrandingPageContent() {", "function VideoEditingPageContent() {")
    content = content.replace("export default function BrandingPage() {", "export default function VideoEditingPage() {")
    content = content.replace("<BrandingPageContent />", "<VideoEditingPageContent />")

    with open(filepath, 'w') as f:
        f.write(content)

main()
