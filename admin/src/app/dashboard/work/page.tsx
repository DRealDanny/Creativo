"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { toast } from "react-hot-toast";

interface Project {
  id: string;
  slug?: string;
  projectCategory: string;
  isFeaturedOnHome: boolean;
  gridPreview: {
    gridTitle: string;
    gridNarrative: string;
  };
}

export default function WorkDashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const endpoints = ['/api/branding', '/api/web-development', '/api/video-editing'];
      const responses = await Promise.all(endpoints.map(ep => fetch(ep)));

      let allProjects: Project[] = [];

      for (const res of responses) {
          if (res.ok) {
              const data = await res.json();
              if (Array.isArray(data)) {
                  allProjects = [...allProjects, ...data];
              }
          }
      }

      setProjects(allProjects);
    } catch (error) {
      console.error("Failed to fetch projects", error);
      toast.error("Failed to load projects");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFeature = async (id: string, category: string, currentStatus: boolean) => {
    try {
      const res = await fetch('/api/work', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          category,
          isFeaturedOnHome: !currentStatus
        })
      });

      if (res.ok) {
        setProjects(projects.map(p =>
          p.id === id ? { ...p, isFeaturedOnHome: !currentStatus } : p
        ));
        toast.success(`Project ${!currentStatus ? 'featured' : 'unfeatured'}`);
      } else {
         toast.error("Failed to update feature status");
      }
    } catch (error) {
        console.error("Failed to update project", error);
        toast.error("An error occurred");
    }
  };

  const handleDelete = async (id: string, category: string) => {
      if (!confirm("Are you sure you want to delete this project?")) return;

      try {
          const res = await fetch(`/api/work?id=${id}&category=${encodeURIComponent(category)}`, {
              method: 'DELETE'
          });

          if (res.ok) {
              setProjects(projects.filter(p => p.id !== id));
              toast.success("Project deleted");
          } else {
              toast.error("Failed to delete project");
          }
      } catch (error) {
          console.error("Failed to delete project", error);
          toast.error("An error occurred");
      }
  };

  const getEditLink = (project: Project) => {
      const cat = project.projectCategory.toLowerCase().replace(' ', '-');
      return `/dashboard/${cat}?slug=${project.slug || project.id}`;
  };

  if (isLoading) {
      return <div className={styles.container}>Loading projects...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Work Dashboard</h1>
        <p>Manage and feature projects across all categories.</p>
      </div>

      <div className={styles.section}>
      {projects.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No projects found. Add projects from the specific category pages.</p>
        </div>
      ) : (
        <div className={styles.projectList}>
          {projects.map((project) => (
            <div key={project.id} className={styles.projectRow}>
              <div className={styles.projectInfo}>
                <div className={styles.projectTitle}>
                    {project.gridPreview?.gridTitle || 'Untitled Project'}
                </div>
                <div className={styles.projectSub}>
                    {project.gridPreview?.gridNarrative || 'No description'}
                </div>
                <div className={styles.projectCategory}>
                    {project.projectCategory}
                </div>
              </div>
              <div className={styles.projectActions}>
                  <button
                      className={`${styles.toggleBtn} ${project.isFeaturedOnHome ? styles.toggleFeatured : styles.toggleUnfeatured}`}
                      onClick={() => handleToggleFeature(project.id, project.projectCategory, project.isFeaturedOnHome)}
                  >
                      {project.isFeaturedOnHome ? 'Featured' : 'Feature'}
                  </button>
                  <Link href={getEditLink(project)} className={styles.editBtn}>
                      Edit
                  </Link>
                  <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(project.id, project.projectCategory)}
                      aria-label="Delete project"
                  >
                      <i className="ri-delete-bin-line"></i>
                  </button>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}
