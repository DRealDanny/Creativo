"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useCommit } from '../components/CommitContext';
import styles from './Skills.module.css';

interface SkillsData {
  creativeDesign: string[];
  webDevelopment: string[];
  videoEditing: string[];
}

const categories = [
  { id: 'creativeDesign', label: 'Creative & Visual Design', icon: 'ri-palette-line' },
  { id: 'webDevelopment', label: 'Web Development', icon: 'ri-code-s-slash-line' },
  { id: 'videoEditing', label: 'Video Editing', icon: 'ri-video-chat-line' },
] as const;

export default function SkillsPage() {
  const [initialValues, setInitialValues] = useState<SkillsData>({
    creativeDesign: [],
    webDevelopment: [],
    videoEditing: [],
  });

  const [currentValues, setCurrentValues] = useState<SkillsData>(initialValues);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const res = await fetch('/api/skills');
        if (res.ok) {
          const data = await res.json();
          setInitialValues(data);
          setCurrentValues(data);
        }
      } catch (error) {
        console.error('Failed to load skills:', error);
      }
    }
    fetchSkills();
  }, []);

  const { setPendingCommits, registerCommitAllHandler } = useCommit();

  const editedFieldsCount = useMemo(() => {
    let count = 0;
    (Object.keys(currentValues) as Array<keyof SkillsData>).forEach((category) => {
      // If array length changed, consider it a change
      if (currentValues[category].length !== initialValues[category].length) {
        count++;
        return;
      }
      // If any item changed
      for (let i = 0; i < currentValues[category].length; i++) {
        if (currentValues[category][i] !== initialValues[category][i]) {
          count++;
          break; // Count once per category
        }
      }
    });
    return count;
  }, [currentValues, initialValues]);

  useEffect(() => {
    setPendingCommits(editedFieldsCount);
  }, [editedFieldsCount, setPendingCommits]);

  const currentValuesRef = React.useRef(currentValues);

  useEffect(() => {
    currentValuesRef.current = currentValues;
  }, [currentValues]);

  useEffect(() => {
    registerCommitAllHandler(async () => {
      const loadingToast = toast.loading('Committing all skills...');
      try {
        const res = await fetch('/api/skills', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(currentValuesRef.current),
        });
        if (res.ok) {
          const { data } = await res.json();
          setInitialValues(data);
          toast.success('All skills committed successfully!', { id: loadingToast });
        } else {
          toast.error('Failed to commit skills.', { id: loadingToast });
        }
      } catch (error) {
        console.error('Commit all error:', error);
        toast.error('Error committing skills.', { id: loadingToast });
      }
    });
  }, [registerCommitAllHandler]);

  const handleInputChange = (category: keyof SkillsData, index: number, value: string) => {
    setCurrentValues((prev) => {
      const newCategoryArray = [...prev[category]];
      newCategoryArray[index] = value;
      return { ...prev, [category]: newCategoryArray };
    });
  };

  const handleAddSkill = (category: keyof SkillsData) => {
    setCurrentValues((prev) => ({
      ...prev,
      [category]: [...prev[category], ''],
    }));
  };

  const handleRemoveSkill = (category: keyof SkillsData, index: number) => {
    setCurrentValues((prev) => {
      const newCategoryArray = prev[category].filter((_, i) => i !== index);
      return { ...prev, [category]: newCategoryArray };
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Manage Skills</h1>
      </div>

      {categories.map((category) => {
        return (
          <div key={category.id} className={styles.categorySection}>
            <div className={styles.categoryHeader}>
              <i className={`${category.icon} ${styles.categoryIcon}`}></i>
              <h2 className={styles.categoryTitle}>{category.label}</h2>
            </div>

            <div className={styles.formGrid}>
              {currentValues[category.id]?.map((skill, index) => (
                <div key={index} className={styles.formRow}>
                  <input
                    type="text"
                    className={styles.input}
                    value={skill}
                    onChange={(e) => handleInputChange(category.id, index, e.target.value)}
                    placeholder={`Enter skill`}
                    aria-label={`Skill ${index + 1}`}
                  />
                  <button
                    className={styles.removeButton}
                    onClick={() => handleRemoveSkill(category.id, index)}
                    aria-label={`Remove Skill ${index + 1}`}
                  >
                    <i className={`ri-delete-bin-line ${styles.removeButtonIcon}`}></i>
                  </button>
                </div>
              ))}
            </div>

            <button
              className={styles.addSkillButton}
              onClick={() => handleAddSkill(category.id)}
            >
              + Add Skill
            </button>
          </div>
        );
      })}
    </div>
  );
}
