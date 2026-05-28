"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";
import { toast } from "react-hot-toast";
import { useCommit } from "../components/CommitContext";
import RichTextEditor from "../components/RichTextEditor";

interface IdentityData {
  image?: string;
  subheading?: string;
  heading?: string;
}

interface StoryData {
  heading?: string;
  bioHtml?: string;
  cvLink?: string;
}

interface AboutData {
  identity: IdentityData;
  story: StoryData;
}

export default function AboutPage() {
  const [identityData, setIdentityData] = useState<IdentityData>({});
  const [originalIdentityData, setOriginalIdentityData] = useState<IdentityData>({});

  const [storyData, setStoryData] = useState<StoryData>({});
  const [originalStoryData, setOriginalStoryData] = useState<StoryData>({});

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setPendingCommits } = useCommit();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/about");
      if (res.ok) {
        const data: AboutData = await res.json();
        setIdentityData(data.identity || {});
        setOriginalIdentityData(data.identity || {});

        setStoryData(data.story || {});
        setOriginalStoryData(data.story || {});

        if (data.identity?.image) {
          setImagePreview(data.identity.image);
        }
      }
    } catch (error) {
      console.error("Failed to fetch about data", error);
      toast.error("Failed to load about data");
    } finally {
      setIsLoading(false);
    }
  };

  // Section 1: Identity Dirty Check
  const isIdentityDirty =
    imageFile !== null ||
    JSON.stringify(identityData) !== JSON.stringify(originalIdentityData);

  // Section 2: Story Dirty Check
  const isStoryDirty =
    JSON.stringify(storyData) !== JSON.stringify(originalStoryData);

  // Calculate total pending commits for the TopBar
  useEffect(() => {
    let count = 0;
    if (isIdentityDirty) count++;
    if (isStoryDirty) count++;
    setPendingCommits(count);
  }, [isIdentityDirty, isStoryDirty, setPendingCommits]);

  const { registerCommitAllHandler } = useCommit();
  useEffect(() => {
    const handler = async () => {
      if (isIdentityDirty) {
        await handleCommitIdentity();
      }
      if (isStoryDirty) {
        await handleCommitStory();
      }
    };
    registerCommitAllHandler(handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIdentityDirty, isStoryDirty, identityData, imageFile, storyData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleCommitIdentity = async () => {
    try {
      const formData = new FormData();
      formData.append("identity", JSON.stringify(identityData));
      if (imageFile) {
        formData.append("imageFile", imageFile);
      }

      const res = await fetch("/api/about", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const result = await res.json();
        setOriginalIdentityData(result.data.identity);
        setIdentityData(result.data.identity);
        if (result.data.identity.image) {
          setImagePreview(result.data.identity.image);
        }
        setImageFile(null);
        toast.success("Identity updated successfully!");
      } else {
        toast.error("Failed to update Identity.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update Identity.");
    }
  };

  const handleCommitStory = async () => {
    try {
      const formData = new FormData();
      formData.append("story", JSON.stringify(storyData));

      const res = await fetch("/api/about", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const result = await res.json();
        setOriginalStoryData(result.data.story);
        setStoryData(result.data.story);
        toast.success("Story updated successfully!");
      } else {
        toast.error("Failed to update Story.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update Story.");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      {/* SECTION 1: IDENTITY CARD */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3>Identity Card</h3>
          <button
            className={`${styles.btn} ${styles.btnCommit} ${
              isIdentityDirty ? styles.btnDirty : ""
            }`}
            onClick={handleCommitIdentity}
            disabled={!isIdentityDirty}
          >
            Commit
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.formGroup}>
            <label>Profile Image</label>
            <div className={styles.imageUploader}>
              <div
                className={styles.imagePreview}
                style={{ backgroundImage: imagePreview ? `url(${imagePreview})` : 'none' }}
                onClick={() => fileInputRef.current?.click()}
              >
                {!imagePreview && <span>Click to upload</span>}
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Subheading</label>
            <input
              type="text"
              className={styles.input}
              value={identityData.subheading || ""}
              onChange={(e) =>
                setIdentityData({ ...identityData, subheading: e.target.value })
              }
              placeholder="e.g. BRAND STRUCTURALIST & VIDEO EDITOR"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Heading</label>
            <input
              type="text"
              className={styles.input}
              value={identityData.heading || ""}
              onChange={(e) =>
                setIdentityData({ ...identityData, heading: e.target.value })
              }
              placeholder="e.g. Creativo"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: THE CORE STORY */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3>The Core Story</h3>
          <button
            className={`${styles.btn} ${styles.btnCommit} ${
              isStoryDirty ? styles.btnDirty : ""
            }`}
            onClick={handleCommitStory}
            disabled={!isStoryDirty}
          >
            Commit
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.formGroup}>
            <label>Main Heading</label>
            <textarea
              className={styles.textarea}
              value={storyData.heading || ""}
              onChange={(e) =>
                setStoryData({ ...storyData, heading: e.target.value })
              }
              placeholder="e.g. I don't just design things. I build the visual logic..."
              rows={3}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Bio (Rich Text)</label>
            <RichTextEditor
              content={storyData.bioHtml || ""}
              onChange={(html) =>
                setStoryData({ ...storyData, bioHtml: html })
              }
            />
          </div>

          <div className={styles.formGroup}>
            <label>CV Link</label>
            <input
              type="text"
              className={styles.input}
              value={storyData.cvLink || ""}
              onChange={(e) =>
                setStoryData({ ...storyData, cvLink: e.target.value })
              }
              placeholder="e.g. [Link Text](https://...)"
            />
          </div>
        </div>
      </div>
    </div>
  );
}