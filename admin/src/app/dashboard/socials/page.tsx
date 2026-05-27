"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useCommit } from '../components/CommitContext';
import styles from './Socials.module.css';

interface SocialPlatform {
  id: string;
  label: string;
  icon: string;
}

const platforms: SocialPlatform[] = [
  { id: 'email', label: 'Email', icon: 'ri-mail-line' },
  { id: 'x', label: 'X (Twitter)', icon: 'ri-twitter-x-line' },
  { id: 'linkedin', label: 'LinkedIn', icon: 'ri-linkedin-fill' },
  { id: 'instagram', label: 'Instagram', icon: 'ri-instagram-line' },
  { id: 'youtube', label: 'YouTube', icon: 'ri-youtube-fill' },
];

export default function SocialsPage() {
  const [initialValues, setInitialValues] = useState<Record<string, string>>({
    email: 'admin@example.com',
    x: 'https://x.com/example',
    linkedin: 'https://linkedin.com/in/example',
    instagram: 'https://instagram.com/example',
    youtube: 'https://youtube.com/c/example',
  });

  const [currentValues, setCurrentValues] = useState<Record<string, string>>(initialValues);

  const { setPendingCommits, registerCommitAllHandler } = useCommit();

  const editedFieldsCount = useMemo(() => {
    return Object.keys(currentValues).filter(
      (key) => currentValues[key] !== initialValues[key]
    ).length;
  }, [currentValues, initialValues]);

  useEffect(() => {
    setPendingCommits(editedFieldsCount);
  }, [editedFieldsCount, setPendingCommits]);

  // Keep current values in a ref so the single registered handler always sees the latest state
  const currentValuesRef = React.useRef(currentValues);

  useEffect(() => {
    currentValuesRef.current = currentValues;
  }, [currentValues]);

  useEffect(() => {
    registerCommitAllHandler(() => {
      setInitialValues(currentValuesRef.current);
    });
  }, [registerCommitAllHandler]);

  const handleInputChange = (id: string, value: string) => {
    setCurrentValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCommitSingle = (id: string) => {
    setInitialValues((prev) => ({
      ...prev,
      [id]: currentValues[id],
    }));
    toast.success('Commit successful!');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Manage Social</h1>
      </div>

      <div className={styles.formGrid}>
        {platforms.map((platform) => {
          const isEdited = currentValues[platform.id] !== initialValues[platform.id];

          return (
            <div key={platform.id} className={styles.formRow}>
              <div className={styles.iconWrapper}>
                <i className={`${platform.icon} ${styles.icon}`}></i>
              </div>
              <input
                type="text"
                className={styles.input}
                value={currentValues[platform.id]}
                onChange={(e) => handleInputChange(platform.id, e.target.value)}
                placeholder={`Enter ${platform.label} link`}
                aria-label={platform.label}
              />
              <button
                className={styles.commitButton}
                onClick={() => handleCommitSingle(platform.id)}
                disabled={!isEdited}
              >
                Commit
              </button>
            </div>
          );
        })}
      </div>

      <div className={styles.testButtons}>
        <h3>Test Notifications</h3>
        <button className={styles.testButton} onClick={() => toast.error('Commit failed.')}>
          Test Error Toast
        </button>
        <button className={styles.testButton} onClick={() => toast('Partial commit', { icon: '⚠️' })}>
          Test Partial Toast
        </button>
      </div>
    </div>
  );
}
