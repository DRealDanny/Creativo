"use client";

import React, { useState, useEffect } from "react";
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
  heroDeliverables: string;
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
  projectCategory: string;
  isFeaturedOnHome: boolean;
  gridPreview: GridPreview;
  caseStudyHero: CaseStudyHero;
  dynamicBlocks: DynamicBlock[];
}

// Helper to convert Vimeo URL to embed URL
const getVimeoEmbedUrl = (url: string) => {
  if (!url) return '';
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (match && match[1]) {
    return `https://player.vimeo.com/video/${match[1]}`;
  }
  return url;
};

export default function BrandingPage() {
  const [projectData, setProjectData] = useState<BrandProject | null>(null);
  const [originalProjectData, setOriginalProjectData] = useState<BrandProject | null>(null);

  const { setPendingCommits, registerCommitAllHandler } = useCommit();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/branding");
      if (res.ok) {
        const data: BrandProject[] = await res.json();
        if (data.length > 0) {
          setProjectData(data[0]);
          setOriginalProjectData(JSON.parse(JSON.stringify(data[0])));
        }
      }
    } catch (error) {
      console.error("Failed to fetch branding data", error);
      toast.error("Failed to load branding data");
    } finally {
      setIsLoading(false);
    }
  };

  const isGridDirty = JSON.stringify(projectData?.gridPreview) !== JSON.stringify(originalProjectData?.gridPreview);
  const isHeroDirty = JSON.stringify(projectData?.caseStudyHero) !== JSON.stringify(originalProjectData?.caseStudyHero);
  const isBlocksDirty = JSON.stringify(projectData?.dynamicBlocks) !== JSON.stringify(originalProjectData?.dynamicBlocks);

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
  }, [isGridDirty, isHeroDirty, isBlocksDirty, projectData]);

  const handleCommitAll = async () => {
    if (!projectData) return;
    try {
      const res = await fetch("/api/branding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([projectData]),
      });

      if (res.ok) {
        const result = await res.json();
        if (result.data && result.data.length > 0) {
          setOriginalProjectData(JSON.parse(JSON.stringify(result.data[0])));
          setProjectData(result.data[0]);
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

  const handleCommitSection = async () => {
    // Just commit all for simplicity, as they are part of one object
    await handleCommitAll();
  };

  const addDynamicBlock = () => {
    if (!projectData) return;
    const newBlock: DynamicBlock = {
      blockId: `block-${Date.now()}`,
      blockHeading: "",
      blockSubHeading: "",
      blockImage: "",
      blockVimeoLink: ""
    };
    setProjectData({
      ...projectData,
      dynamicBlocks: [...projectData.dynamicBlocks, newBlock]
    });
  };

  const updateDynamicBlock = (index: number, field: keyof DynamicBlock, value: string) => {
    if (!projectData) return;
    const newBlocks = [...projectData.dynamicBlocks];
    newBlocks[index] = { ...newBlocks[index], [field]: value };
    setProjectData({ ...projectData, dynamicBlocks: newBlocks });
  };

  const removeDynamicBlock = (index: number) => {
    if (!projectData) return;
    const newBlocks = projectData.dynamicBlocks.filter((_, i) => i !== index);
    setProjectData({ ...projectData, dynamicBlocks: newBlocks });
  };

  if (isLoading || !projectData) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      {/* SECTION 1: THE GRID HOOK */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3>The Grid Hook (Preview)</h3>
          <button
            className={`${styles.btn} ${styles.btnCommit} ${
              isGridDirty ? styles.btnDirty : ""
            }`}
            onClick={handleCommitSection}
            disabled={!isGridDirty}
          >
            Commit
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.formGroup}>
            <label>Grid Image URL</label>
            <input
              type="text"
              className={styles.input}
              value={projectData.gridPreview.gridImage}
              onChange={(e) =>
                setProjectData({
                  ...projectData,
                  gridPreview: { ...projectData.gridPreview, gridImage: e.target.value }
                })
              }
              placeholder="https://..."
            />
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
                  gridPreview: { ...projectData.gridPreview, gridTitle: e.target.value }
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
                  gridPreview: { ...projectData.gridPreview, gridNarrative: e.target.value }
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
            onClick={handleCommitSection}
            disabled={!isHeroDirty}
          >
            Commit
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.formGroup}>
            <label>Hero Background Image URL</label>
            <input
              type="text"
              className={styles.input}
              value={projectData.caseStudyHero.heroBgImage}
              onChange={(e) =>
                setProjectData({
                  ...projectData,
                  caseStudyHero: { ...projectData.caseStudyHero, heroBgImage: e.target.value }
                })
              }
              placeholder="https://..."
            />
          </div>

          <div className={styles.formGroup}>
            <label>Hero Title</label>
            <input
              type="text"
              className={styles.input}
              value={projectData.caseStudyHero.heroTitle}
              onChange={(e) =>
                setProjectData({
                  ...projectData,
                  caseStudyHero: { ...projectData.caseStudyHero, heroTitle: e.target.value }
                })
              }
              placeholder="e.g. Apex — Complete Brand Identity"
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
                  caseStudyHero: { ...projectData.caseStudyHero, heroSector: e.target.value }
                })
              }
              placeholder="e.g. Brand Identity"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Deliverables</label>
            <input
              type="text"
              className={styles.input}
              value={projectData.caseStudyHero.heroDeliverables}
              onChange={(e) =>
                setProjectData({
                  ...projectData,
                  caseStudyHero: { ...projectData.caseStudyHero, heroDeliverables: e.target.value }
                })
              }
              placeholder="e.g. Brand Strategy · Visual Identity..."
            />
          </div>

          <div className={styles.formGroup}>
            <label>Hero Hook (Rich Text)</label>
            <RichTextEditor
              content={projectData.caseStudyHero.heroHookRichText}
              onChange={(html) =>
                setProjectData({
                  ...projectData,
                  caseStudyHero: { ...projectData.caseStudyHero, heroHookRichText: html }
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
            onClick={handleCommitSection}
            disabled={!isBlocksDirty}
          >
            Commit
          </button>
        </div>

        <div className={styles.content}>
          {projectData.dynamicBlocks.map((block, index) => {
            const embedUrl = getVimeoEmbedUrl(block.blockVimeoLink);
            return (
              <div key={block.blockId} className={styles.section} style={{ backgroundColor: "#F9FAFB", marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <h4 style={{ margin: 0, fontSize: "16px", color: "#374151" }}>Block {index + 1}</h4>
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
                    onChange={(e) => updateDynamicBlock(index, 'blockHeading', e.target.value)}
                    placeholder="Heading..."
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Block SubHeading / Text</label>
                  <textarea
                    className={styles.textarea}
                    value={block.blockSubHeading}
                    onChange={(e) => updateDynamicBlock(index, 'blockSubHeading', e.target.value)}
                    placeholder="Text content..."
                    rows={3}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Block Image URL</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={block.blockImage}
                    onChange={(e) => updateDynamicBlock(index, 'blockImage', e.target.value)}
                    placeholder="https://..."
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Block Vimeo Link</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={block.blockVimeoLink}
                    onChange={(e) => updateDynamicBlock(index, 'blockVimeoLink', e.target.value)}
                    placeholder="https://vimeo.com/..."
                  />
                </div>

                {embedUrl && (
                  <div style={{ marginTop: '16px', position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                    <iframe
                      src={embedUrl}
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      title={`Showreel Preview ${index}`}
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '8px' }}
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
              alignSelf: "flex-start"
            }}
          >
            + Add New Section
          </button>
        </div>
      </div>
    </div>
  );
}
