"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import styles from "./page.module.css";
import { useCommit } from "../components/CommitContext";

type WorkItem = {
  id: string;
  projectCategory: string;
  categoryFile: string;
  isFeaturedOnHome: boolean;
  gridPreview?: {
    gridTitle?: string;
  };
  caseStudyHero?: {
    heroTitle?: string;
  };
};

export default function WorkDashboard() {
  const [items, setItems] = useState<WorkItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/work");
      if (!res.ok) throw new Error("Failed to fetch work items");
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load work items");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleToggleFeature = async (id: string, currentStatus: boolean, categoryFile: string) => {
    try {
      const newStatus = !currentStatus;

      // Optimistic update
      setItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, isFeaturedOnHome: newStatus } : item
        )
      );

      const res = await fetch("/api/work", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, isFeaturedOnHome: newStatus, categoryFile }),
      });

      if (!res.ok) {
        throw new Error("Failed to update feature status");
      }

      toast.success(newStatus ? "Project featured on home" : "Project removed from home");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update project status");
      // Revert optimistic update
      fetchItems();
    }
  };

  const handleDelete = async (id: string, categoryFile: string) => {
    if (!window.confirm("Are you sure you want to delete this project? This cannot be undone.")) {
      return;
    }

    try {
      const res = await fetch("/api/work", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, categoryFile }),
      });

      if (!res.ok) {
        throw new Error("Failed to delete project");
      }

      setItems(prevItems => prevItems.filter(item => item.id !== id));
      toast.success("Project deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete project");
    }
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>All Work</h1>
          <p className={styles.subtitle}>Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>All Work</h1>
        <p className={styles.subtitle}>Manage all your projects from one central dashboard.</p>
      </div>

      {items.length === 0 ? (
        <div className={styles.emptyState}>
          No projects found.
        </div>
      ) : (
        <div className={styles.list}>
          {items.map((item) => {
            const title = item.gridPreview?.gridTitle || item.caseStudyHero?.heroTitle || item.id;

            return (
              <div key={item.id} className={styles.row}>
                <div className={styles.rowLeft}>
                  <span className={styles.projectTitle}>{title}</span>
                  <span className={styles.badge}>{item.projectCategory}</span>
                </div>

                <div className={styles.rowRight}>
                  <div
                    className={styles.toggleWrapper}
                    onClick={() => handleToggleFeature(item.id, item.isFeaturedOnHome, item.categoryFile)}
                  >
                    <span className={styles.toggleLabel}>Featured</span>
                    <div className={`${styles.toggleSwitch} ${item.isFeaturedOnHome ? styles.active : ''}`}>
                      <div className={styles.toggleCircle}></div>
                    </div>
                  </div>

                  <Link
                    href={`/dashboard/${item.categoryFile.replace('.json', '')}?slug=${item.id}`}
                    className={styles.actionBtn}
                    aria-label="Edit project"
                    title="Edit project"
                  >
                    <i className="ri-pencil-line" style={{ fontSize: '18px' }}></i>
                  </Link>

                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(item.id, item.categoryFile)}
                    aria-label="Delete project"
                    title="Delete project"
                  >
                    <i className="ri-delete-bin-line" style={{ fontSize: '18px' }}></i>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
