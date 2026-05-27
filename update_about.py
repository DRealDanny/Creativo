with open('frontend/src/pages/About.jsx', 'r') as f:
    content = f.read()

content = content.replace("import { NavLink } from 'react-router-dom';", "import { useState, useEffect } from 'react';\nimport { NavLink } from 'react-router-dom';")

content = content.replace('''const About = () => {




  return (''', '''const About = () => {
  const [skillsData, setSkillsData] = useState([]);

  useEffect(() => {
    fetch('/data/skills.json')
      .then(res => res.json())
      .then(data => setSkillsData(data))
      .catch(console.error);
  }, []);

  return (''')

content = content.replace('''        <div className="tools-grid">

          <div className="tools-card">
            <span className="tools-card-icon" aria-hidden="true">✦</span>
            <h4 className="tools-card-title">Creative &amp; Visual Design</h4>
            <div className="tools-card-pills">
              <span className="tool-pill">Figma</span>
              <span className="tool-pill">Adobe Photoshop</span>
              <span className="tool-pill">Adobe Illustrator</span>
              <span className="tool-pill">Affinity Designer</span>
            </div>
          </div>

          <div className="tools-card">
            <span className="tools-card-icon" aria-hidden="true">⬡</span>
            <h4 className="tools-card-title">Web Development</h4>
            <div className="tools-card-pills">
              <span className="tool-pill">HTML &amp; CSS</span>
              <span className="tool-pill">JavaScript</span>
              <span className="tool-pill">PHP</span>
              <span className="tool-pill">React</span>
              <span className="tool-pill">GSAP</span>
              <span className="tool-pill">Tailwind CSS</span>
              <span className="tool-pill">Flutter &amp; Dart</span>
            </div>
          </div>

          <div className="tools-card">
            <span className="tools-card-icon" aria-hidden="true">▷</span>
            <h4 className="tools-card-title">Video Editing</h4>
            <div className="tools-card-pills">
              <span className="tool-pill">Adobe After Effects</span>
              <span className="tool-pill">Premiere Pro</span>
              <span className="tool-pill">CapCut</span>
              <span className="tool-pill">DaVinci Resolve</span>
            </div>
          </div>

        </div>''', '''        <div className="tools-grid">
          {skillsData.map((category, index) => (
            <div key={index} className="tools-card">
              <span className="tools-card-icon" aria-hidden="true">{category.icon}</span>
              <h4 className="tools-card-title">{category.category}</h4>
              <div className="tools-card-pills">
                {category.skills.map((skill, sIndex) => (
                  <span key={sIndex} className="tool-pill">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>''')

with open('frontend/src/pages/About.jsx', 'w') as f:
    f.write(content)
