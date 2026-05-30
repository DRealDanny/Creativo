import re
with open("admin/src/app/dashboard/branding/page.tsx", "r") as f:
    content = f.read()

# Replace blockImageFiles dictionary keys from using indices to using blockId
# In state declaration:
# const [blockImageFiles, setBlockImageFiles] = useState<{ [key: number]: File }>({});
# const [blockImagePreviews, setBlockImagePreviews] = useState<{ [key: number]: string }>({});
content = content.replace(
    "const [blockImageFiles, setBlockImageFiles] = useState<{ [key: number]: File }>({});",
    "const [blockImageFiles, setBlockImageFiles] = useState<{ [key: string]: File }>({});"
)
content = content.replace(
    "const [blockImagePreviews, setBlockImagePreviews] = useState<{ [key: number]: string }>({});",
    "const [blockImagePreviews, setBlockImagePreviews] = useState<{ [key: string]: string }>({});"
)

# In handleBlockImageChange(index, e) -> pass blockId or find it inside
# wait, better to change the signature of handleBlockImageChange
# or just change inside:
old_handle_block = """  const handleBlockImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBlockImageFiles({ ...blockImageFiles, [index]: file });
      setBlockImagePreviews({ ...blockImagePreviews, [index]: URL.createObjectURL(file) });
      setIsBlocksDirty(true);
    }
  };"""

new_handle_block = """  const handleBlockImageChange = (blockId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBlockImageFiles({ ...blockImageFiles, [blockId]: file });
      setBlockImagePreviews({ ...blockImagePreviews, [blockId]: URL.createObjectURL(file) });
      setIsBlocksDirty(true);
    }
  };"""

content = content.replace(old_handle_block, new_handle_block)

# In useEffect setting initial previews:
#   const initialPreviews: { [key: number]: string } = {};
#   data.dynamicBlocks.forEach((b: any, i: number) => {
#     if (b.blockImage) initialPreviews[i] = b.blockImage;
#   });

old_initial_previews = """  const initialPreviews: { [key: number]: string } = {};
  data.dynamicBlocks.forEach((b: any, i: number) => {
    if (b.blockImage) initialPreviews[i] = b.blockImage;
  });"""

new_initial_previews = """  const initialPreviews: { [key: string]: string } = {};
  data.dynamicBlocks.forEach((b: any) => {
    if (b.blockImage) initialPreviews[b.blockId] = b.blockImage;
  });"""

content = content.replace(old_initial_previews, new_initial_previews)

# In handleCommitSection:
#         Object.keys(blockImageFiles).forEach((indexStr) => {
#           formData.append(`blockImageFile_${indexStr}`, blockImageFiles[Number(indexStr)]);
#         });
# Actually, wait, the API expects `blockImageFile_${i}` where `i` is the index of the dynamic block array that is being sent.
# The `projectData.dynamicBlocks` array is still sequentially sent as JSON.
# If we change the dictionary key to `blockId`, we must map `blockId` back to its array index before appending, OR we append it using `blockId` and modify the backend route!
