"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useCommit } from '../components/CommitContext';
import styles from './Skills.module.css';

interface SkillCategory {
  category: string;
  icon: string;
  skills: string[];
}

export default function SkillsPage() {
  const [initialData, setInitialData] = useState<SkillCategory[]>([]);
  const [currentData, setCurrentData] = useState<SkillCategory[]>([]);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const res = await fetch('/api/skills');
        if (res.ok) {
          const data = await res.json();
          setInitialData(data);
          setCurrentData(data);
        }
      } catch (error) {
        console.error('Failed to load skills:', error);
      }
    }
    fetchSkills();
  }, []);

  const { setPendingCommits, registerCommitAllHandler } = useCommit();

  const editedCount = useMemo(() => {
    // Count how many categories have different skill arrays
    let count = 0;
    currentData.forEach((cat, index) => {
      const initialCat = initialData[index];
      if (!initialCat) {
        count++;
        return;
      }
      if (JSON.stringify(cat.skills) !== JSON.stringify(initialCat.skills)) {
        count++;
      }
    });
    return count;
  }, [currentData, initialData]);

  useEffect(() => {
    setPendingCommits(editedCount);
  }, [editedCount, setPendingCommits]);

  const currentDataRef = React.useRef(currentData);
  useEffect(() => {
    currentDataRef.current = currentData;
  }, [currentData]);

  useEffect(() => {
    registerCommitAllHandler(async () => {
      const loadingToast = toast.loading('Committing all skills...');
      try {
        const res = await fetch('/api/skills', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(currentDataRef.current),
        });
        if (res.ok) {
          const { data } = await res.json();
          setInitialData(data);
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

  const handleSkillChange = (categoryIndex: number, skillIndex: number, value: string) => {
    setCurrentData(prev => {
      const newData = [...prev];
      newData[categoryIndex] = { ...newData[categoryIndex], skills: [...newData[categoryIndex].skills] };
      newData[categoryIndex].skills[skillIndex] = value;
      return newData;
    });
  };

  const handleAddSkill = (categoryIndex: number) => {
    setCurrentData(prev => {
      const newData = [...prev];
      newData[categoryIndex] = { ...newData[categoryIndex], skills: [...newData[categoryIndex].skills, ''] };
      return newData;
    });
  };

  const handleRemoveSkill = (categoryIndex: number, skillIndex: number) => {
    setCurrentData(prev => {
      const newData = [...prev];
      newData[categoryIndex] = { ...newData[categoryIndex], skills: newData[categoryIndex].skills.filter((_, i) => i !== skillIndex) };
      return newData;
    });
  };

  const handleCommitCategory = async (categoryIndex: number) => {
    const loadingToast = toast.loading(`Committing category...`);
    try {
      const newDataToCommit = [...initialData];
      newDataToCommit[categoryIndex] = currentData[categoryIndex];

      const res = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDataToCommit),
      });

      if (res.ok) {
        const { data } = await res.json();
        setInitialData(data);
        // Also update currentData with the committed version to ensure sync
        setCurrentData(data);
        toast.success('Commit successful!', { id: loadingToast });
      } else {
        toast.error('Commit failed.', { id: loadingToast });
      }
    } catch (error) {
      console.error('Single commit error:', error);
      toast.error('Error committing.', { id: loadingToast });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Manage Skills</h1>
      </div>

      {currentData.map((category, catIndex) => {
        const initialCategory = initialData[catIndex];
        const isCategoryEdited = !initialCategory || JSON.stringify(category.skills) !== JSON.stringify(initialCategory.skills);

        return (
          <div key={catIndex} className={styles.categorySection}>
            <h2 className={styles.categoryTitle}>
              <span aria-hidden="true">{category.icon}</span> {category.category}
            </h2>
            <div className={styles.formGrid}>
              {category.skills.map((skill, skillIndex) => {
                const isSkillEdited = !initialCategory || skill !== initialCategory.skills[skillIndex];
                // we'll just check if the category is edited for commit button, but we can do per-skill UI if we want.

                return (
                  <div key={skillIndex} className={styles.formRow}>
                    <input
                      type="text"
                      className={styles.input}
                      value={skill}
                      onChange={(e) => handleSkillChange(catIndex, skillIndex, e.target.value)}
                      placeholder="Enter skill"
                    />
                    <button
                      className={styles.removeButton}
                      onClick={() => handleRemoveSkill(catIndex, skillIndex)}
                      title="Remove Skill"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                    {/* We can have a commit button per row, or per category.
                        Prompt: "Each skill row gets a transparent input, a Blue Commit button, and a Red Remove button."
                    */}
                    <button
                      className={styles.commitButton}
                      onClick={() => handleCommitCategory(catIndex)}
                      disabled={!isCategoryEdited}
                    >
                      Commit
                    </button>
                  </div>
                );
              })}
            </div>
            <button
              className={styles.addButton}
              onClick={() => handleAddSkill(catIndex)}
            >
              Add Skill
            </button>
          </div>
        );
      })}
    </div>
  );
}
