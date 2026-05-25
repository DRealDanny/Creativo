'use client';

import React, { useState, useMemo } from 'react';
import { useToast } from '../../../components/Toast/ToastContext';
import styles from './Socials.module.css';

type SocialPlatform = 'email' | 'twitter' | 'linkedin' | 'instagram' | 'youtube';

interface SocialData {
  email: string;
  twitter: string;
  linkedin: string;
  instagram: string;
  youtube: string;
}

const INITIAL_VALUES: SocialData = {
  email: 'hello@example.com',
  twitter: 'https://x.com/example',
  linkedin: 'https://linkedin.com/in/example',
  instagram: 'https://instagram.com/example',
  youtube: 'https://youtube.com/@example',
};

const ICONS: Record<SocialPlatform, string> = {
  email: 'ri-mail-line',
  twitter: 'ri-twitter-x-line',
  linkedin: 'ri-linkedin-fill',
  instagram: 'ri-instagram-line',
  youtube: 'ri-youtube-line',
};

export default function SocialsPage() {
  const { showToast } = useToast();

  // Track what's saved on the server (initial/last committed values)
  const [savedValues, setSavedValues] = useState<SocialData>(INITIAL_VALUES);

  // Track what's currently in the inputs
  const [currentValues, setCurrentValues] = useState<SocialData>(INITIAL_VALUES);

  // Compute how many fields differ from their saved state
  const editedFieldsCount = useMemo(() => {
    let count = 0;
    (Object.keys(INITIAL_VALUES) as SocialPlatform[]).forEach((key) => {
      if (currentValues[key] !== savedValues[key]) {
        count++;
      }
    });
    return count;
  }, [currentValues, savedValues]);

  const handleInputChange = (platform: SocialPlatform, value: string) => {
    setCurrentValues((prev) => ({
      ...prev,
      [platform]: value,
    }));
  };

  const handleCommitSingle = (platform: SocialPlatform) => {
    // If there are no changes, just ignore or maybe show info
    if (currentValues[platform] === savedValues[platform]) {
      return;
    }

    // Save the single value
    setSavedValues((prev) => ({
      ...prev,
      [platform]: currentValues[platform],
    }));

    // Check if this was the ONLY changed field
    const otherFieldsChanged = (Object.keys(INITIAL_VALUES) as SocialPlatform[]).some(
      (key) => key !== platform && currentValues[key] !== savedValues[key]
    );

    if (otherFieldsChanged) {
      showToast('warning', 'Partial Commit Successful', 'This change is live, but you still have unsaved edits pending.');
    } else {
      showToast('info', 'Commit Successful', 'Your change has been securely saved and deployed.');
    }
  };

  const handleCommitAll = () => {
    if (editedFieldsCount <= 1) return;

    // Attempting a commit all, simulating success
    setSavedValues(currentValues);
    showToast('success', 'All Commits Successful', 'All your changes have been successfully deployed to the live site.');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Socials</h1>
        <button
          className={`${styles.commitAllButton} ${editedFieldsCount > 1 ? styles.active : ''}`}
          onClick={handleCommitAll}
          disabled={editedFieldsCount <= 1}
        >
          Commit All
        </button>
      </header>

      <div className={styles.formContainer}>
        {(Object.keys(INITIAL_VALUES) as SocialPlatform[]).map((platform) => (
          <div key={platform} className={styles.formRow}>
            <div className={styles.iconContainer}>
              <i className={ICONS[platform]}></i>
            </div>
            <input
              type="text"
              className={styles.inputField}
              value={currentValues[platform]}
              onChange={(e) => handleInputChange(platform, e.target.value)}
              placeholder={`Enter ${platform} link`}
            />
            <button
              className={styles.commitButton}
              onClick={() => handleCommitSingle(platform)}
              disabled={currentValues[platform] === savedValues[platform]}
            >
              Commit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
