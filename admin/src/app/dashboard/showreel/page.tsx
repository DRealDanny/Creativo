"use client";

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useCommit } from '../components/CommitContext';
import styles from './Showreel.module.css';

// Helper to convert Vimeo URL to embed URL
const getVimeoEmbedUrl = (url: string) => {
  if (!url) return '';
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (match && match[1]) {
    return `https://player.vimeo.com/video/${match[1]}`;
  }
  return url; // fallback to whatever they pasted if it doesn't match standard
};

export default function ShowreelPage() {
  const [savedUrl, setSavedUrl] = useState('');
  const [currentUrl, setCurrentUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { setPendingCommits } = useCommit();

  useEffect(() => {
    fetch('/api/showreel')
      .then(res => res.json())
      .then(data => {
        setSavedUrl(data.url || '');
        setCurrentUrl(data.url || '');
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching showreel:', err);
        setIsLoading(false);
      });
  }, []);

  const isDirty = currentUrl !== savedUrl;

  useEffect(() => {
    setPendingCommits(isDirty ? 1 : 0);
  }, [isDirty, setPendingCommits]);

  const handleCommit = async () => {
    try {
      const res = await fetch('/api/showreel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: currentUrl })
      });
      if (res.ok) {
        setSavedUrl(currentUrl);
        toast.success('Showreel URL saved successfully');
      } else {
        toast.error('Failed to save Showreel URL');
      }
    } catch (error) {
      toast.error('An error occurred while saving');
    }
  };

  const embedUrl = getVimeoEmbedUrl(currentUrl);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Manage Showreel</h1>
      </div>

      <div className={styles.section}>
        {embedUrl && (
          <div className={styles.videoWrapper}>
            <iframe
              src={embedUrl}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Showreel Preview"
            />
          </div>
        )}

        <div className={styles.formRow}>
          <input
            type="text"
            className={styles.input}
            value={currentUrl}
            onChange={(e) => setCurrentUrl(e.target.value)}
            placeholder="https://vimeo.com/..."
          />
          <button
            className={styles.commitButton}
            onClick={handleCommit}
            disabled={!isDirty}
          >
            Commit
          </button>
        </div>
      </div>
    </div>
  );
}
