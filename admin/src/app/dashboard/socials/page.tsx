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
  { id: 'whatsapp', label: 'WhatsApp', icon: 'ri-whatsapp-line' },
  { id: 'instagram', label: 'Instagram', icon: 'ri-instagram-line' },
  { id: 'behance', label: 'Behance', icon: 'ri-behance-line' },
  { id: 'pinterest', label: 'Pinterest', icon: 'ri-pinterest-line' },
];

export default function SocialsPage() {
  const [initialValues, setInitialValues] = useState<Record<string, string>>({
    email: '',
    whatsapp: '',
    instagram: '',
    behance: '',
    pinterest: '',
  });

  const [currentValues, setCurrentValues] = useState<Record<string, string>>(initialValues);

  useEffect(() => {
    async function fetchSocials() {
      try {
        const res = await fetch('/api/socials');
        if (res.ok) {
          const data = await res.json();
          setInitialValues(data);
          setCurrentValues(data);
        }
      } catch (error) {
        console.error('Failed to load socials:', error);
      }
    }
    fetchSocials();
  }, []);

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
    registerCommitAllHandler(async () => {
      const loadingToast = toast.loading('Committing all...');
      try {
        const res = await fetch('/api/socials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(currentValuesRef.current),
        });
        if (res.ok) {
          const { data } = await res.json();
          setInitialValues(data);
          toast.success('All socials committed successfully!', { id: loadingToast });
        } else {
          toast.error('Failed to commit socials.', { id: loadingToast });
        }
      } catch (error) {
        console.error('Commit all error:', error);
        toast.error('Error committing socials.', { id: loadingToast });
      }
    });
  }, [registerCommitAllHandler]);

  const handleInputChange = (id: string, value: string) => {
    setCurrentValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCommitSingle = async (id: string) => {
    const loadingToast = toast.loading(`Committing ${id}...`);
    try {
      const res = await fetch('/api/socials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [id]: currentValues[id] }),
      });

      if (res.ok) {
        const { data } = await res.json();
        setInitialValues((prev) => ({ ...prev, [id]: data[id] }));
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
    </div>
  );
}
