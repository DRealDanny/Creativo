"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import { toast } from "react-hot-toast";
import { useCommit } from "../components/CommitContext";
import RichTextEditor from "../components/RichTextEditor";

interface GridPreview {
  gridImage: string;
  gridTitle: string;
  gridNarrative: string;
}

interface CaseStudyHero {
  heroBgImage: string;
  heroTitle: string;
  heroSector: string;
  heroWhatWeDid: string;
  heroWatchReelLink: string;
  heroHookRichText: string;
}

interface DynamicBlock {
  blockId: string;
  blockHeading: string;
  blockSubHeading: string;
  blockImage: string;
  blockVimeoLink: string;
}

interface BrandProject {
  id: string;
  slug?: string;
  projectCategory: string;
  isFeaturedOnHome: boolean;
  gridPreview: GridPreview;
  caseStudyHero: CaseStudyHero;
  dynamicBlocks: DynamicBlock[];
}

// Helper to convert Vimeo URL to embed URL
const getVimeoEmbedUrl = (url: string) => {
  if (!url) return "";
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (match && match[1]) {
    return `https://player.vimeo.com/video/${match[1]}`;
  }
  return url;
};

function VideoEditingPageContent() {
  const [projectData, setProjectData] = useState<BrandProject | null>(null);
  const [originalProjectData, setOriginalProjectData] =
    useState<BrandProject | null>(null);

  // File objects for uploads
  const [gridImageFile, setGridImageFile] = useState<File | string | null>(
    null,
  );
  const [heroImageFile, setHeroImageFile] = useState<File | string | null>(
    null,
  );
  const [blockImageFiles, setBlockImageFiles] = useState<{
    [key: string]: File | string;
  }>({});

  const [gridImagePreview, setGridImagePreview] = useState<string | null>(null);
  const [heroImagePreview, setHeroImagePreview] = useState<string | null>(null);
  const [blockImagePreviews, setBlockImagePreviews] = useState<{
    [key: string]: string;
  }>({});

  const gridImageRef = useRef<HTMLInputElement>(null);
  const heroImageRef = useRef<HTMLInputElement>(null);

  const { setPendingCommits, registerCommitAllHandler } = useCommit();
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');

  const getEmptyState = (): BrandProject => ({
    id: crypto.randomUUID(),
    projectCategory: "Video Editing",
    isFeaturedOnHome: false,
    gridPreview: { gridImage: "", gridTitle: "", gridNarrative: "" },
    caseStudyHero: {
      heroBgImage: "", heroTitle: "", heroSector: "", heroWhatWeDid: "", heroWatchReelLink: "", heroHookRichText: ""
    },
    dynamicBlocks: []
  });

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/video-editing");
      if (res.ok) {
        const data: BrandProject[] = await res.json();

        if (!slug) {
          // Add New Mode
          const empty = getEmptyState();
          setProjectData(empty);
          setOriginalProjectData(JSON.parse(JSON.stringify(empty)));
        } else {
          // Edit Mode
          const project = data.find((p: BrandProject) => p.id === slug);
          if (project) {
            setProjectData(project);
            setOriginalProjectData(JSON.parse(JSON.stringify(project)));

            if (project.gridPreview?.gridImage) {
              setGridImagePreview(project.gridPreview.gridImage);
              setGridImageFile(project.gridPreview.gridImage);
            }
            if (project.caseStudyHero?.heroBgImage) {
              setHeroImagePreview(project.caseStudyHero.heroBgImage);
              setHeroImageFile(project.caseStudyHero.heroBgImage);
            }

            const initialBlockPreviews: { [key: string]: string } = {};
            const initialBlockFiles: { [key: string]: string } = {};
            if (project.dynamicBlocks) {
              project.dynamicBlocks.forEach((block: DynamicBlock) => {
                if (block.blockImage) {
                  initialBlockPreviews[block.blockId] = block.blockImage;
                  initialBlockFiles[block.blockId] = block.blockImage;
                }
              });
            }
            setBlockImagePreviews(initialBlockPreviews);
            setBlockImageFiles(initialBlockFiles);
          }
        }
      }
    } catch (error) {
      console.error("Failed to fetch branding data", error);
      toast.error("Failed to load branding data");
    } finally {
      setIsLoading(false);
    }
  };

  const isGridDirty =
    (gridImageFile !== null && typeof gridImageFile !== "string") ||
    JSON.stringify(projectData?.gridPreview) !==
      JSON.stringify(originalProjectData?.gridPreview);

  const isHeroDirty =
    (heroImageFile !== null && typeof heroImageFile !== "string") ||
    JSON.stringify(projectData?.caseStudyHero) !==
      JSON.stringify(originalProjectData?.caseStudyHero);

  const isBlocksDirty =
    Object.values(blockImageFiles).some((file) => typeof file !== "string") ||
    JSON.stringify(projectData?.dynamicBlocks) !==
      JSON.stringify(originalProjectData?.dynamicBlocks);

  useEffect(() => {
    let count = 0;
    if (isGridDirty) count++;
    if (isHeroDirty) count++;
    if (isBlocksDirty) count++;
    setPendingCommits(count);
  }, [isGridDirty, isHeroDirty, isBlocksDirty, setPendingCommits]);

  useEffect(() => {
    const handler = async () => {
      if (isGridDirty || isHeroDirty || isBlocksDirty) {
        await handleCommitAll();
      }
    };
    registerCommitAllHandler(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isGridDirty,
    isHeroDirty,
    isBlocksDirty,
    projectData,
    gridImageFile,
    heroImageFile,
    blockImageFiles,
  ]);

  const handleCommitAll = async () => {
    if (!projectData) return;
    try {
      const formData = new FormData();
      formData.append("projectData", JSON.stringify([projectData]));

      if (gridImageFile && typeof gridImageFile !== "string") {
        formData.append("gridImageFile", gridImageFile);
      }
      if (heroImageFile && typeof heroImageFile !== "string") {
        formData.append("heroImageFile", heroImageFile);
      }

      projectData.dynamicBlocks.forEach((block, idx) => {
        const blockFile = blockImageFiles[block.blockId];
        if (blockFile && typeof blockFile !== "string") {
          formData.append(`blockImageFile_${idx}`, blockFile);
        }
      });

      const res = await fetch("/api/video-editing", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const result = await res.json();
        if (result.data && result.data.length > 0) {
          setOriginalProjectData(JSON.parse(JSON.stringify(result.data[0])));
          setProjectData(result.data[0]);

          if (result.data[0].gridPreview.gridImage) {
            setGridImagePreview(result.data[0].gridPreview.gridImage);
            setGridImageFile(result.data[0].gridPreview.gridImage);
          } else {
            setGridImageFile(null);
          }

          if (result.data[0].caseStudyHero.heroBgImage) {
            setHeroImagePreview(result.data[0].caseStudyHero.heroBgImage);
            setHeroImageFile(result.data[0].caseStudyHero.heroBgImage);
          } else {
            setHeroImageFile(null);
          }

          const updatedBlockPreviews: { [key: string]: string } = {};
          const updatedBlockFiles: { [key: string]: string } = {};
          result.data[0].dynamicBlocks.forEach((block: DynamicBlock) => {
            if (block.blockImage) {
              updatedBlockPreviews[block.blockId] = block.blockImage;
              updatedBlockFiles[block.blockId] = block.blockImage;
            }
          });
          setBlockImagePreviews(updatedBlockPreviews);
          setBlockImageFiles(updatedBlockFiles);

          toast.success("Branding updated successfully!");
        }
      } else {
        toast.error("Failed to update Branding.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update Branding.");
    }
  };

  const handleCommitGrid = async () => {
    if (!projectData) return;
    try {
      const formData = new FormData();
      formData.append("updateSection", "gridPreview");
      formData.append("projectData", JSON.stringify([projectData]));

      if (gridImageFile && typeof gridImageFile !== "string") {
        formData.append("gridImageFile", gridImageFile);
      }

      const res = await fetch("/api/video-editing", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const result = await res.json();
        if (result.data && result.data.length > 0) {
          setOriginalProjectData(JSON.parse(JSON.stringify(result.data[0])));
          setProjectData(result.data[0]);

          if (result.data[0].gridPreview.gridImage) {
            setGridImagePreview(result.data[0].gridPreview.gridImage);
            setGridImageFile(result.data[0].gridPreview.gridImage);
          } else {
            setGridImageFile(null);
          }

          toast.success("Grid Preview updated successfully!");
        }
      } else {
        toast.error("Failed to update Grid Preview.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update Grid Preview.");
    }
  };

  const handleCommitHero = async () => {
    if (!projectData) return;
    try {
      const formData = new FormData();
      formData.append("updateSection", "caseStudyHero");
      formData.append("projectData", JSON.stringify([projectData]));

      if (heroImageFile && typeof heroImageFile !== "string") {
        formData.append("heroImageFile", heroImageFile);
      }

      const res = await fetch("/api/video-editing", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const result = await res.json();
        if (result.data && result.data.length > 0) {
          setOriginalProjectData(JSON.parse(JSON.stringify(result.data[0])));
          setProjectData(result.data[0]);

          if (result.data[0].caseStudyHero.heroBgImage) {
            setHeroImagePreview(result.data[0].caseStudyHero.heroBgImage);
            setHeroImageFile(result.data[0].caseStudyHero.heroBgImage);
          } else {
            setHeroImageFile(null);
          }

          toast.success("Hero Entry updated successfully!");
        }
      } else {
        toast.error("Failed to update Hero Entry.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update Hero Entry.");
    }
  };

  const handleCommitBlocks = async () => {
    if (!projectData) return;
    try {
      const formData = new FormData();
      formData.append("updateSection", "dynamicBlocks");
      formData.append("projectData", JSON.stringify([projectData]));

      projectData.dynamicBlocks.forEach((block, idx) => {
        const blockFile = blockImageFiles[block.blockId];
        if (blockFile && typeof blockFile !== "string") {
          formData.append(`blockImageFile_${idx}`, blockFile);
        }
      });

      const res = await fetch("/api/video-editing", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const result = await res.json();
        if (result.data && result.data.length > 0) {
          setOriginalProjectData(JSON.parse(JSON.stringify(result.data[0])));
          setProjectData(result.data[0]);

          const updatedBlockPreviews: { [key: string]: string } = {};
          const updatedBlockFiles: { [key: string]: string } = {};
          result.data[0].dynamicBlocks.forEach((block: DynamicBlock) => {
            if (block.blockImage) {
              updatedBlockPreviews[block.blockId] = block.blockImage;
              updatedBlockFiles[block.blockId] = block.blockImage;
            }
          });
          setBlockImagePreviews(updatedBlockPreviews);
          setBlockImageFiles(updatedBlockFiles);

          toast.success("Dynamic Blocks updated successfully!");
        }
      } else {
        toast.error("Failed to update Dynamic Blocks.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update Dynamic Blocks.");
    }
  };

  const handleGridImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setGridImageFile(file);
      const url = URL.createObjectURL(file);
      setGridImagePreview(url);
    }
  };

  const handleHeroImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setHeroImageFile(file);
      const url = URL.createObjectURL(file);
      setHeroImagePreview(url);
    }
  };

  const handleBlockImageChange = (
    blockId: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setBlockImageFiles({ ...blockImageFiles, [blockId]: file });
      const url = URL.createObjectURL(file);
      setBlockImagePreviews({ ...blockImagePreviews, [blockId]: url });
    }
  };

  const addDynamicBlock = () => {
    if (!projectData) return;
    const newBlock: DynamicBlock = {
      blockId: `block-${Date.now()}`,
      blockHeading: "",
      blockSubHeading: "",
      blockImage: "",
      blockVimeoLink: "",
    };
    setProjectData({
      ...projectData,
      dynamicBlocks: [...projectData.dynamicBlocks, newBlock],
    });
  };

  const updateDynamicBlock = (
    index: number,
    field: keyof DynamicBlock,
    value: string,
  ) => {
    if (!projectData) return;
    const newBlocks = [...projectData.dynamicBlocks];
    newBlocks[index] = { ...newBlocks[index], [field]: value };
    setProjectData({ ...projectData, dynamicBlocks: newBlocks });
  };

  const removeDynamicBlock = (index: number) => {
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
  };

  if (isLoading || !projectData) return <div>Loading...</div>;

  const pageTitle = slug ? `Edit: ${projectData.caseStudyHero.heroTitle || projectData.gridPreview.gridTitle || 'Project'}` : "Create New Video Editing Project";

  return (
    <div className={styles.container}>
      <h2 style={{ marginBottom: "24px", fontSize: "24px", fontWeight: "bold" }}>{pageTitle}</h2>
      {/* SECTION 1: THE GRID HOOK */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3>The Grid Hook (Preview)</h3>
          <button
            className={`${styles.btn} ${styles.btnCommit} ${
              isGridDirty ? styles.btnDirty : ""
            }`}
            onClick={handleCommitGrid}
            disabled={!isGridDirty}
          >
            Commit
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.formGroup}>
            <label>Grid Image</label>
            <div className={styles.imageUploader}>
              <div
                className={styles.imagePreview}
                style={{
                  backgroundImage: gridImagePreview
                    ? `url(${gridImagePreview})`
                    : "none",
                }}
                onClick={() => gridImageRef.current?.click()}
              >
                {!gridImagePreview && <span>Click to upload</span>}
                {gridImagePreview && (
                  <div className={styles.imagePreviewOverlay}>
                    Change Upload
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                ref={gridImageRef}
                style={{ display: "none" }}
                onChange={handleGridImageChange}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Grid Title</label>
            <input
              type="text"
              className={styles.input}
              value={projectData.gridPreview.gridTitle}
              onChange={(e) =>
                setProjectData({
                  ...projectData,
                  gridPreview: {
                    ...projectData.gridPreview,
                    gridTitle: e.target.value,
                  },
                })
              }
              placeholder="e.g. Apex — Brand Identity"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Grid Narrative</label>
            <textarea
              className={styles.textarea}
              value={projectData.gridPreview.gridNarrative}
              onChange={(e) =>
                setProjectData({
                  ...projectData,
                  gridPreview: {
                    ...projectData.gridPreview,
                    gridNarrative: e.target.value,
                  },
                })
              }
              placeholder="Short description for grid preview..."
              rows={2}
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: THE HERO ENTRY */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3>The Hero Entry</h3>
          <button
            className={`${styles.btn} ${styles.btnCommit} ${
              isHeroDirty ? styles.btnDirty : ""
            }`}
            onClick={handleCommitHero}
            disabled={!isHeroDirty}
          >
            Commit
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.formGroup}>
            <label>Hero Background Image</label>
            <div className={styles.imageUploader}>
              <div
                className={styles.imagePreview}
                style={{
                  backgroundImage: heroImagePreview
                    ? `url(${heroImagePreview})`
                    : "none",
                }}
                onClick={() => heroImageRef.current?.click()}
              >
                {!heroImagePreview && <span>Click to upload</span>}
                {heroImagePreview && (
                  <div className={styles.imagePreviewOverlay}>
                    Change Upload
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                ref={heroImageRef}
                style={{ display: "none" }}
                onChange={handleHeroImageChange}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Project Title</label>
            <input
              type="text"
              className={styles.input}
              value={projectData.caseStudyHero.heroTitle}
              onChange={(e) =>
                setProjectData({
                  ...projectData,
                  caseStudyHero: {
                    ...projectData.caseStudyHero,
                    heroTitle: e.target.value,
                  },
                })
              }
              placeholder="e.g. Vanta — Edit Reel"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Sector</label>
            <input
              type="text"
              className={styles.input}
              value={projectData.caseStudyHero.heroSector}
              onChange={(e) =>
                setProjectData({
                  ...projectData,
                  caseStudyHero: {
                    ...projectData.caseStudyHero,
                    heroSector: e.target.value,
                  },
                })
              }
              placeholder="e.g. Video Editing"
            />
          </div>

          <div className={styles.formGroup}>
            <label>What We Did</label>
            <input
              type="text"
              className={styles.input}
              value={projectData.caseStudyHero.heroWhatWeDid}
              onChange={(e) =>
                setProjectData({
                  ...projectData,
                  caseStudyHero: {
                    ...projectData.caseStudyHero,
                    heroWhatWeDid: e.target.value,
                  },
                })
              }
              placeholder="e.g. Long-form Editing · Reels & Shorts..."
            />
          </div>

          <div className={styles.formGroup}>
            <label>Watch Reel Link</label>
            <input
              type="url"
              className={styles.input}
              value={projectData.caseStudyHero.heroWatchReelLink || ""}
              onChange={(e) =>
                setProjectData({
                  ...projectData,
                  caseStudyHero: {
                    ...projectData.caseStudyHero,
                    heroWatchReelLink: e.target.value,
                  },
                })
              }
              placeholder="https://..."
            />
          </div>

          <div className={styles.formGroup}>
            <label>Hero Hook (Rich Text)</label>
            <RichTextEditor
              content={projectData.caseStudyHero.heroHookRichText}
              onChange={(html) =>
                setProjectData({
                  ...projectData,
                  caseStudyHero: {
                    ...projectData.caseStudyHero,
                    heroHookRichText: html,
                  },
                })
              }
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: THE DYNAMIC BUILDER */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3>Dynamic Blocks (Case Study Content)</h3>
          <button
            className={`${styles.btn} ${styles.btnCommit} ${
              isBlocksDirty ? styles.btnDirty : ""
            }`}
            onClick={handleCommitBlocks}
            disabled={!isBlocksDirty}
          >
            Commit
          </button>
        </div>

        <div className={styles.content}>
          {projectData.dynamicBlocks.map((block, index) => {
            const embedUrl = getVimeoEmbedUrl(block.blockVimeoLink);
            return (
              <div
                key={block.blockId}
                className={styles.section}
                style={{ backgroundColor: "#F9FAFB", marginBottom: "16px" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <h4 style={{ margin: 0, fontSize: "16px", color: "#374151" }}>
                    Block {index + 1}
                  </h4>
                  <button
                    onClick={() => removeDynamicBlock(index)}
                    style={{
                      backgroundColor: "#EF4444",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      padding: "4px 8px",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    X
                  </button>
                </div>

                <div className={styles.formGroup}>
                  <label>Block Heading</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={block.blockHeading}
                    onChange={(e) =>
                      updateDynamicBlock(index, "blockHeading", e.target.value)
                    }
                    placeholder="Heading..."
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Block SubHeading / Text</label>
                  <textarea
                    className={styles.textarea}
                    value={block.blockSubHeading}
                    onChange={(e) =>
                      updateDynamicBlock(
                        index,
                        "blockSubHeading",
                        e.target.value,
                      )
                    }
                    placeholder="Text content..."
                    rows={3}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Block Image</label>
                  <div className={styles.imageUploader}>
                    <div
                      className={styles.imagePreview}
                      style={{
                        backgroundImage: blockImagePreviews[block.blockId]
                          ? `url(${blockImagePreviews[block.blockId]})`
                          : "none",
                      }}
                      onClick={() => {
                        const input = document.getElementById(
                          `blockImageFile_${block.blockId}`,
                        ) as HTMLInputElement;
                        if (input) input.click();
                      }}
                    >
                      {!blockImagePreviews[block.blockId] && (
                        <span>Click to upload</span>
                      )}
                      {blockImagePreviews[block.blockId] && (
                        <div className={styles.imagePreviewOverlay}>
                          Change Upload
                        </div>
                      )}
                    </div>
                    <input
                      id={`blockImageFile_${block.blockId}`}
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => handleBlockImageChange(block.blockId, e)}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Block Vimeo Link</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={block.blockVimeoLink}
                    onChange={(e) =>
                      updateDynamicBlock(
                        index,
                        "blockVimeoLink",
                        e.target.value,
                      )
                    }
                    placeholder="https://vimeo.com/..."
                  />
                </div>

                {embedUrl && (
                  <div
                    style={{
                      marginTop: "16px",
                      position: "relative",
                      paddingBottom: "56.25%",
                      height: 0,
                    }}
                  >
                    <iframe
                      src={embedUrl}
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      title={`Showreel Preview ${index}`}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}

          <button
            onClick={addDynamicBlock}
            style={{
              backgroundColor: "#10B981",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "10px 16px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              alignSelf: "flex-start",
            }}
          >
            + Add New Section
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VideoEditingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VideoEditingPageContent />
    </Suspense>
  );
}
