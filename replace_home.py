import sys

def main():
    filepath = "frontend/src/pages/Home.jsx"
    with open(filepath, 'r') as f:
        content = f.read()

    # Imports to add
    new_imports = """import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';"""

    # We want to replace the work grid section with our dynamic one
    start_str = """            <div className="work-grid-home">"""
    end_str = """            </div>
          </div>
        </section>

        {/* ── ABOUT STRIP ── */}"""

    if start_str in content and end_str in content:
        start_idx = content.find(start_str)
        end_idx = content.find(end_str) + len("""            </div>""")

        replacement = """            <div className="work-grid-home">
              {featuredProjects.map(project => {
                let linkPath = "";
                if (project.projectCategory === "Branding") linkPath = `/case-study/branding?slug=${project.slug || project.id}`;
                else if (project.projectCategory === "Web Development") linkPath = `/case-study/web-development?slug=${project.slug || project.id}`;
                else if (project.projectCategory === "Video Editing") linkPath = `/case-study/video-editing?slug=${project.slug || project.id}`;

                return (
                  <NavLink key={project.id} to={linkPath} className="project-card">
                    <div className="card-img">
                      <img src={project.gridPreview?.gridImage || 'https://picsum.photos/800/600'} alt={project.gridPreview?.gridTitle || 'Project'} loading="lazy" width="800" height="600" />
                    </div>
                    <div className="card-overlay">
                      <h3 className="card-title">{project.gridPreview?.gridTitle || 'Untitled'}</h3>
                      <p className="card-sub">{project.gridPreview?.gridNarrative || ''}</p>
                    </div>
                    <div className="card-view-btn" aria-hidden="true"><i className="ri-arrow-right-up-line"></i></div>
                  </NavLink>
                );
              })}
            </div>"""

        content = content[:start_idx] + replacement + content[end_idx:]

        # Add state for featuredProjects
        state_str = """  const [showreelUrl, setShowreelUrl] = useState('');"""
        state_replacement = """  const [showreelUrl, setShowreelUrl] = useState('');
  const [featuredProjects, setFeaturedProjects] = useState([]);"""
        content = content.replace(state_str, state_replacement)

        # Add fetch for featuredProjects
        fetch_str = """      .catch(err => console.error('Error fetching showreel:', err));
  }, []);"""
        fetch_replacement = """      .catch(err => console.error('Error fetching showreel:', err));

    const fetchProjects = async () => {
      try {
        const endpoints = ['/data/branding.json', '/data/web-development.json', '/data/video-editing.json'];
        const responses = await Promise.all(
          endpoints.map(ep => fetch(ep + '?t=' + new Date().getTime()).catch(() => null))
        );

        let allProjects = [];
        for (const res of responses) {
          if (res && res.ok) {
            const data = await res.json();
            if (Array.isArray(data)) {
              allProjects = [...allProjects, ...data];
            }
          }
        }

        const featured = allProjects.filter(p => p.isFeaturedOnHome);
        setFeaturedProjects(featured);
      } catch (error) {
        console.error('Error fetching featured projects:', error);
      }
    };
    fetchProjects();
  }, []);"""
        content = content.replace(fetch_str, fetch_replacement)

        with open(filepath, 'w') as f:
            f.write(content)
        print("Updated Home.jsx")
    else:
        print("Could not find start/end string in Home.jsx")

if __name__ == "__main__":
    main()
