import re

with open("admin/src/app/dashboard/branding/page.tsx", "r") as f:
    content = f.read()

# Replace block image dictionaries to use string keys (blockId)
content = content.replace(
    "const [blockImageFiles, setBlockImageFiles] = useState<{ [index: number]: File }>({});",
    "const [blockImageFiles, setBlockImageFiles] = useState<{ [key: string]: File }>({});"
)

content = content.replace(
    "const [blockImagePreviews, setBlockImagePreviews] = useState<{ [index: number]: string }>({});",
    "const [blockImagePreviews, setBlockImagePreviews] = useState<{ [key: string]: string }>({});"
)

# Update initial previews mapping
old_initial_block_previews = """          const initialBlockPreviews: { [index: number]: string } = {};
          data[0].dynamicBlocks.forEach((block, idx) => {
            if (block.blockImage) {
              initialBlockPreviews[idx] = block.blockImage;
            }
          });"""

new_initial_block_previews = """          const initialBlockPreviews: { [key: string]: string } = {};
          data[0].dynamicBlocks.forEach((block) => {
            if (block.blockImage) {
              initialBlockPreviews[block.blockId] = block.blockImage;
            }
          });"""

content = content.replace(old_initial_block_previews, new_initial_block_previews)

# Update updated previews mapping
old_updated_block_previews = """          const updatedBlockPreviews: { [index: number]: string } = {};
          result.data[0].dynamicBlocks.forEach((block: DynamicBlock, idx: number) => {
            if (block.blockImage) {
              updatedBlockPreviews[idx] = block.blockImage;
            }
          });"""

new_updated_block_previews = """          const updatedBlockPreviews: { [key: string]: string } = {};
          result.data[0].dynamicBlocks.forEach((block: DynamicBlock) => {
            if (block.blockImage) {
              updatedBlockPreviews[block.blockId] = block.blockImage;
            }
          });"""

content = content.replace(old_updated_block_previews, new_updated_block_previews)

# Update commit payload logic
old_form_data_append = """      Object.keys(blockImageFiles).forEach((indexStr) => {
        const idx = parseInt(indexStr);
        formData.append(`blockImageFile_${idx}`, blockImageFiles[idx]);
      });"""

new_form_data_append = """      projectData.dynamicBlocks.forEach((block, idx) => {
        if (blockImageFiles[block.blockId]) {
          formData.append(`blockImageFile_${idx}`, blockImageFiles[block.blockId]);
        }
      });"""

content = content.replace(old_form_data_append, new_form_data_append)

# Update handleBlockImageChange signature and logic
old_handle_block_change = """  const handleBlockImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBlockImageFiles({ ...blockImageFiles, [index]: file });
      const url = URL.createObjectURL(file);
      setBlockImagePreviews({ ...blockImagePreviews, [index]: url });
    }
  };"""

new_handle_block_change = """  const handleBlockImageChange = (blockId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBlockImageFiles({ ...blockImageFiles, [blockId]: file });
      const url = URL.createObjectURL(file);
      setBlockImagePreviews({ ...blockImagePreviews, [blockId]: url });
    }
  };"""

content = content.replace(old_handle_block_change, new_handle_block_change)

# Update block rendering (image input)
old_block_render = """                  <div className={styles.imageUploader}>
                    <div
                      className={styles.imagePreview}
                      style={{ backgroundImage: blockImagePreviews[index] ? `url(${blockImagePreviews[index]})` : 'none' }}
                      onClick={() => {
                        const input = document.getElementById(`blockImageFile_${index}`) as HTMLInputElement;
                        if (input) input.click();
                      }}
                    >
                      {!blockImagePreviews[index] && <span>Click to upload</span>}
                    </div>
                    <input
                      id={`blockImageFile_${index}`}
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => handleBlockImageChange(index, e)}
                    />
                  </div>"""

new_block_render = """                  <div className={styles.imageUploader}>
                    <div
                      className={styles.imagePreview}
                      style={{ backgroundImage: blockImagePreviews[block.blockId] ? `url(${blockImagePreviews[block.blockId]})` : 'none' }}
                      onClick={() => {
                        const input = document.getElementById(`blockImageFile_${block.blockId}`) as HTMLInputElement;
                        if (input) input.click();
                      }}
                    >
                      {!blockImagePreviews[block.blockId] && <span>Click to upload</span>}
                    </div>
                    <input
                      id={`blockImageFile_${block.blockId}`}
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => handleBlockImageChange(block.blockId, e)}
                    />
                  </div>"""

content = content.replace(old_block_render, new_block_render)

# Remove the cleanup in removeDynamicBlock because blockId is tied to the block, not index
old_remove_block = """  const removeDynamicBlock = (index: number) => {
    if (!projectData) return;
    const newBlocks = projectData.dynamicBlocks.filter((_, i) => i !== index);

    // Clean up blockImageFiles and blockImagePreviews for the removed index
    const newFiles = { ...blockImageFiles };
    delete newFiles[index];
    setBlockImageFiles(newFiles);

    const newPreviews = { ...blockImagePreviews };
    delete newPreviews[index];
    setBlockImagePreviews(newPreviews);

    setProjectData({ ...projectData, dynamicBlocks: newBlocks });
  };"""

new_remove_block = """  const removeDynamicBlock = (index: number) => {
    if (!projectData) return;

    const blockIdToRemove = projectData.dynamicBlocks[index].blockId;
    const newBlocks = projectData.dynamicBlocks.filter((_, i) => i !== index);

    // Clean up blockImageFiles and blockImagePreviews for the removed blockId
    const newFiles = { ...blockImageFiles };
    delete newFiles[blockIdToRemove];
    setBlockImageFiles(newFiles);

    const newPreviews = { ...blockImagePreviews };
    delete newPreviews[blockIdToRemove];
    setBlockImagePreviews(newPreviews);

    setProjectData({ ...projectData, dynamicBlocks: newBlocks });
  };"""

content = content.replace(old_remove_block, new_remove_block)

with open("admin/src/app/dashboard/branding/page.tsx", "w") as f:
    f.write(content)
