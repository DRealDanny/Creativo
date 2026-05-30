import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CaseStudyBranding from './CaseStudyBranding';
import CaseStudyWebDevelopment from './CaseStudyWebDevelopment';

const CaseStudyResolver = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [projectType, setProjectType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkProjectType = async () => {
      try {
        // Check Branding
        const brandRes = await fetch('/data/branding.json?t=' + new Date().getTime());
        if (brandRes.ok) {
          const brandJson = await brandRes.json();
          if (Array.isArray(brandJson) && brandJson.find(p => p.slug === slug || (!p.slug && slug === 'branding'))) {
            setProjectType('branding');
            setLoading(false);
            return;
          }
        }

        // Check Web Development
        const webRes = await fetch('/data/web-development.json?t=' + new Date().getTime());
        if (webRes.ok) {
          const webJson = await webRes.json();
          if (Array.isArray(webJson) && webJson.find(p => p.slug === slug)) {
            setProjectType('web');
            setLoading(false);
            return;
          }
        }

        // If not found in either, redirect to work page
        navigate('/work');
      } catch (err) {
        console.error('Error resolving project type:', err);
        navigate('/work');
      }
    };

    checkProjectType();
  }, [slug, navigate]);

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>;
  }

  if (projectType === 'branding') {
    return <CaseStudyBranding />;
  }

  if (projectType === 'web') {
    return <CaseStudyWebDevelopment />;
  }

  return null;
};

export default CaseStudyResolver;
