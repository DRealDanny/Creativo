import sys

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    if "import { useSearchParams }" not in content:
        content = content.replace('import React, { useState, useEffect, useRef } from "react";',
                                  'import React, { useState, useEffect, useRef } from "react";\nimport { useSearchParams } from "next/navigation";')
        content = content.replace('import React, { useState, useEffect, useRef } from \'react\';',
                                  'import React, { useState, useEffect, useRef } from \'react\';\nimport { useSearchParams } from "next/navigation";')

    if "const searchParams = useSearchParams();" not in content:
        # Find where to insert searchParams
        component_name = "export default function "
        idx = content.find(component_name)
        if idx != -1:
            end_idx = content.find("{", idx) + 1
            content = content[:end_idx] + "\n  const searchParams = useSearchParams();\n  const editSlug = searchParams.get('edit');\n" + content[end_idx:]

    # Add effect to select the right project
    if "const editSlug =" in content and "editSlug effect" not in content:
        # Update setProjectData inside fetchData to use editSlug
        # Currently, they just use data[0]
        # We need to change: setProjectData(data[0]); setOriginalProjectData(JSON.parse(JSON.stringify(data[0])));

        # Replace the `if (data.length > 0) {` block inside fetchData
        fetch_start = "const fetchData = async () => {"

        # Let's use a simpler approach:
        # Modify the data processing part inside fetchData
        old_data_proc = """        if (data.length > 0) {
          setProjectData(data[0]);
          setOriginalProjectData(JSON.parse(JSON.stringify(data[0])));

          if (data[0].gridPreview.gridImage) {
            setGridImagePreview(data[0].gridPreview.gridImage);
            setGridImageFile(data[0].gridPreview.gridImage);
          }
          if (data[0].caseStudyHero.heroBgImage) {
            setHeroImagePreview(data[0].caseStudyHero.heroBgImage);
            setHeroImageFile(data[0].caseStudyHero.heroBgImage);
          }

          const initialBlockPreviews: { [key: string]: string } = {};
          const initialBlockFiles: { [key: string]: string } = {};
          data[0].dynamicBlocks.forEach((block) => {
            if (block.blockImage) {
              initialBlockPreviews[block.blockId] = block.blockImage;
              initialBlockFiles[block.blockId] = block.blockImage;
            }
          });
          setBlockImagePreviews(initialBlockPreviews);
          setBlockImageFiles(initialBlockFiles);
        }"""

        new_data_proc = """        if (data.length > 0) {
          let selectedProject = data[0];
          if (editSlug) {
              const found = data.find((p: any) => p.slug === editSlug || p.id === editSlug);
              if (found) selectedProject = found;
          }

          setProjectData(selectedProject);
          setOriginalProjectData(JSON.parse(JSON.stringify(selectedProject)));

          if (selectedProject.gridPreview.gridImage) {
            setGridImagePreview(selectedProject.gridPreview.gridImage);
            setGridImageFile(selectedProject.gridPreview.gridImage);
          }
          if (selectedProject.caseStudyHero.heroBgImage) {
            setHeroImagePreview(selectedProject.caseStudyHero.heroBgImage);
            setHeroImageFile(selectedProject.caseStudyHero.heroBgImage);
          }

          const initialBlockPreviews: { [key: string]: string } = {};
          const initialBlockFiles: { [key: string]: string } = {};
          selectedProject.dynamicBlocks.forEach((block: any) => {
            if (block.blockImage) {
              initialBlockPreviews[block.blockId] = block.blockImage;
              initialBlockFiles[block.blockId] = block.blockImage;
            }
          });
          setBlockImagePreviews(initialBlockPreviews);
          setBlockImageFiles(initialBlockFiles);
        }"""

        if old_data_proc in content:
            content = content.replace(old_data_proc, new_data_proc)
        else:
            print(f"Could not find exact old_data_proc in {filepath}")

        # We also need to add suspense boundary because we are using useSearchParams
        # We wrap the export default function with a Suspense component
        # But wait, next/navigation useSearchParams needs to be wrapped in Suspense in layout or parent, or in the same file
        # Actually in app router, page.tsx can just be wrapped in Suspense if it uses useSearchParams and is client component

    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Updated {filepath}")


def wrap_with_suspense(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    if "import { Suspense } from 'react';" not in content:
        content = "import { Suspense } from 'react';\n" + content

    # We rename the main function and create a new default export that wraps it
    if "export default function BrandingPage() {" in content:
        content = content.replace("export default function BrandingPage() {", "function BrandingPageContent() {")
        content += "\n\nexport default function BrandingPage() {\n  return (\n    <Suspense fallback={<div>Loading...</div>}>\n      <BrandingPageContent />\n    </Suspense>\n  );\n}\n"

    if "export default function WebDevelopmentPage() {" in content:
        content = content.replace("export default function WebDevelopmentPage() {", "function WebDevelopmentPageContent() {")
        content += "\n\nexport default function WebDevelopmentPage() {\n  return (\n    <Suspense fallback={<div>Loading...</div>}>\n      <WebDevelopmentPageContent />\n    </Suspense>\n  );\n}\n"

    if "export default function VideoEditingPage() {" in content:
        content = content.replace("export default function VideoEditingPage() {", "function VideoEditingPageContent() {")
        content += "\n\nexport default function VideoEditingPage() {\n  return (\n    <Suspense fallback={<div>Loading...</div>}>\n      <VideoEditingPageContent />\n    </Suspense>\n  );\n}\n"

    with open(filepath, 'w') as f:
        f.write(content)

process_file("admin/src/app/dashboard/branding/page.tsx")
process_file("admin/src/app/dashboard/web-development/page.tsx")
process_file("admin/src/app/dashboard/video-editing/page.tsx")

wrap_with_suspense("admin/src/app/dashboard/branding/page.tsx")
wrap_with_suspense("admin/src/app/dashboard/web-development/page.tsx")
wrap_with_suspense("admin/src/app/dashboard/video-editing/page.tsx")
