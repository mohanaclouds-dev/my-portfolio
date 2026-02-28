import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Chatbot from './Chatbot';

function App() {
  const [projects, setProjects] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // ✅ State for Sidebar

  useEffect(() => {
    axios.get('https://my-portfolio-t4gb.onrender.com/api/projects')
      .then(res => setProjects(res.data))
      .catch(err => console.log("Error fetching projects:", err));
  }, []);

  // ✅ Toggle Menu Function
  const toggleMenu = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // ✅ Close menu when a link is clicked
  const closeMenu = () => {
    setIsSidebarOpen(false);
  };

  // ✅ HELPER: Forces images to show even if Database is empty/broken
  const getProjectImage = (title) => {
    if (title.includes("Cloak")) return "https://cdn-icons-png.flaticon.com/512/3022/3022251.png"; // Luggage Icon
    if (title.includes("Secure")) return "https://cdn-icons-png.flaticon.com/512/2716/2716652.png"; // Lock Icon
    if (title.includes("Music")) return "https://cdn-icons-png.flaticon.com/512/461/461238.png";    // Music Icon
    return "https://cdn-icons-png.flaticon.com/512/1087/1087815.png"; // Default Code Icon
  };

  // ✅ INTERNSHIP DATA
  const internships = [
    {
      id: 1,
      role: "Full Stack Developer Intern",
      company: "DataValley / APSCHE",
      duration: "Short-Term Internship (120 Hours)",
      date: "Completed July 6th, 2024",
      desc: "Worked on end-to-end web development, gaining hands-on experience with frontend and backend technologies.",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", 
      style: { background: '#38bdf8' }, 
      link: "https://drive.google.com/file/d/13Sw7fFmfu9UwkNY3oAOvumZpuZ7-yE2m/view?usp=sharing" 
    },
    {
      id: 2,
      role: "AI-ML-DS Intern",
      company: "Blackbuck Engineers / IIDT",
      duration: "8 Weeks Internship",
      date: "Completed July 24th, 2024",
      desc: "Completed a short-term internship focusing on AI, ML, and Data Science methodologies.",
      image: "https://cdn-icons-png.flaticon.com/512/1693/1693746.png", 
      style: { background: '#a855f7' }, 
      link: "https://drive.google.com/file/d/1dcHauRhEa4Kx59lFlbibL8r4rC2Opm44/view?usp=sharing"
    },
    {
      id: 3,
      role: "Java Programming Intern",
      company: "VaultofCodes",
      duration: "2 Months",
      date: "Nov 2023 - Jan 2024",
      desc: "Built core Java applications and enhanced understanding of object-oriented programming.",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", 
      style: { background: '#facc15' }, 
      link: "https://drive.google.com/file/d/1Zt1GzyEdVdpcCjWMZkvvaxrktMGIv2zL/view?usp=sharing"
    },
    {
      id: 4,
      role: "Python Programming Intern",
      company: "Pantech e Learning / TNSDC",
      duration: "1 Month Virtual Internship",
      date: "Mar 2023 - Apr 2023",
      desc: "Participated in a virtual internship program focused on Python programming fundamentals.",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", 
      style: { background: '#4ade80' }, 
      link: "https://drive.google.com/file/d/16niEwHjrlDvlZ2iWDToR3-Vyy3d1J7_-/view?usp=sharing"
    }
  ];

  // ✅ CERTIFICATION DATA
  const certifications = [
    {
      id: 1,
      title: "Python Programming (A+ Grade)",
      subtitle: "Technical Achievement",
      issuer: "Wave Infotech / NIT Computers",
      image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", 
      link: "https://drive.google.com/file/d/11ZVLIIwJYm160UXWDMjD3sCya2B6nggO/view?usp=sharing"
    },
    {
      id: 2,
      title: "NPTEL Elite Certification",
      subtitle: "Data Structures & Algorithms (Java)",
      issuer: "IIT Kharagpur",
      image: "https://upload.wikimedia.org/wikipedia/en/1/1c/IIT_Kharagpur_Logo.svg",
      link: "https://drive.google.com/file/d/1j87ylY5mY_WgUWaI-Y7SYTR9mnx6ph5q/view?usp=sharing" 
    },
    {
      id: 3,
      title: "Cloud Computing (AWS)",
      subtitle: "Bootcamp Completion",
      issuer: "Microsoft Learn / AWS",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
      link: "https://drive.google.com/file/d/1m95CYK61RImwlOOkoM2Tvry-INgLCRyT/view?usp=sharing"
    },
    {
      id: 4,
      title: "R for Data Science",
      subtitle: "Course Completion",
      issuer: "Cognitive Class / IBM",
      image: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
      link: "https://drive.google.com/file/d/15n7kigh_w2RFW4QytD6YYefEnzrAgRI2/view?usp=sharing"
    },
    {
      id: 5,
      title: "Python Programming Advanced",
      subtitle: "Course Completion",
      issuer: "Guvi / Google",
      image: "https://cdn-icons-png.flaticon.com/512/300/300221.png",
      link: "https://drive.google.com/file/d/19EH9bH5ZVhYllqo_c5GBvOY2kZdK6_ZP/view?usp=sharing"
    }
  ];

  return (
    <div className="app-container">
      
      {/* --- NAVIGATION --- */}
      <nav className="navbar">
        <div className="logo">MVS<span>.DEV</span></div>
        
        {/* Desktop Menu (Hidden on Mobile) */}
        <ul className="nav-links desktop-menu">
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#certifications">Certifications</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        {/* ✅ Hamburger Icon (Visible on Mobile) */}
        <div className="hamburger" onClick={toggleMenu}>
          <div className={`bar ${isSidebarOpen ? 'active' : ''}`}></div>
          <div className={`bar ${isSidebarOpen ? 'active' : ''}`}></div>
          <div className={`bar ${isSidebarOpen ? 'active' : ''}`}></div>
        </div>

        {/* ✅ Mobile Sidebar Overlay */}
        <div className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={closeMenu}></div>

        {/* ✅ Mobile Sidebar Menu */}
        <div className={`mobile-sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <span className="close-btn" onClick={closeMenu}>&times;</span>
          <ul className="mobile-nav-links">
            <li><a href="#about" onClick={closeMenu}>About</a></li>
            <li><a href="#skills" onClick={closeMenu}>Skills</a></li>
            <li><a href="#experience" onClick={closeMenu}>Experience</a></li>
            <li><a href="#projects" onClick={closeMenu}>Projects</a></li>
            <li><a href="#certifications" onClick={closeMenu}>Certifications</a></li>
            <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="hero">
        <div className="hero-content">
          <span className="badge">Full Stack Developer & AI Enthusiast</span>
          <h1>Panadi Mohana Venkata Srinivas</h1>
          <p className="subtitle">
            Building scalable MERN Stack applications and AI solutions. <br />
            B.Tech Graduate with <strong>Distinction (8.53 CGPA)</strong>.
          </p>
          <div className="cta-group">
            <a href="#projects" className="btn primary">View My Work</a>
            <a href="#contact" className="btn secondary">Hire Me</a>
          </div>
        </div>
      </header>

      {/* --- SECTIONS --- */}
      <section id="about" className="section-container">
        <h2>About Me</h2>
        <div className="card about-card">
          <p style={{ fontSize: '1.1rem', color: '#cbd5e1' }}>
            I am a passionate Computer Science graduate from <strong>Krishna University</strong>. 
            I specialize in <strong>Artificial Intelligence, Python, and Full Stack Web Development</strong>. 
            My journey involves solving complex algorithmic problems and building user-centric applications. 
            I am currently seeking opportunities to apply my technical skills in a challenging environment.
          </p>
        </div>
      </section>

      <section id="skills" className="section-container">
        <h2>Technical Skills</h2>
        <div className="skills-grid">
          <div className="card skill-card">
            <h3>Languages</h3>
            <div className="icon-grid">
              <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" /><span>Python</span></div>
              <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" /><span>Java</span></div>
              <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JS" /><span>JavaScript</span></div>
              <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" alt="C" /><span>C Lang</span></div>
            </div>
          </div>
          <div className="card skill-card">
            <h3>Web Development</h3>
            <div className="icon-grid">
              <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" /><span>React</span></div>
              <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node" /><span>Node.js</span></div>
              <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML" /><span>HTML5</span></div>
              <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS" /><span>CSS3</span></div>
            </div>
          </div>
          <div className="card skill-card">
            <h3>Data & Tools</h3>
            <div className="icon-grid">
              <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" /><span>MongoDB</span></div>
              <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" /><span>Git</span></div>
              <div className="skill-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" alt="VS Code" /><span>VS Code</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- INTERNSHIP EXPERIENCE --- */}
      <section id="experience" className="section-container">
        <h2>Internship Experience</h2>
        <div className="cert-grid"> 
          {internships.map((intern) => (
            <a key={intern.id} href={intern.link} target="_blank" rel="noreferrer" className="card cert-card link-card">
               <div className="cert-img-wrapper" style={intern.style}>
                  <img src={intern.image} alt={intern.role} className="cert-img" style={intern.role.includes("Full Stack") || intern.role.includes("AI") || intern.role.includes("Python") ? {filter: 'brightness(0) invert(1)'} : {}} />
               </div>
               <div className="cert-content">
                <h3>{intern.role}</h3>
                <p className="role-tag">{intern.company}</p>
                <p className="issuer-text">{intern.duration}</p>
                <p style={{fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '15px'}}>
                  {intern.desc}
                </p>
                <span className="view-link" style={{fontSize: '0.8rem', color: '#94a3b8'}}>
                  {intern.date} <span style={{color: 'var(--accent)', fontWeight: 'bold'}}>→ View Cert</span>
                </span>
               </div>
            </a>
          ))}
        </div>
      </section>

      {/* --- FEATURED PROJECTS --- */}
      <section id="projects" className="section-container">
        <h2>Featured Projects</h2>
        <div className="projects-grid">
          {projects.length > 0 ? projects.map((project) => {
            // ✅ CONDITIONAL: Only color the "Secure" project icon, make others white
            const isColorful = project.title.includes("Secure");

            return (
              <div key={project._id} className="card project-card">
                <div className="project-img-wrapper" style={{background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <img 
                    src={getProjectImage(project.title)} 
                    alt={project.title} 
                    style={{ 
                      width: '80px', 
                      height: '80px', 
                      objectFit: 'contain',
                      filter: isColorful ? 'none' : 'brightness(0) invert(1) drop-shadow(0 0 5px #38bdf8)'
                    }}
                  />
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <span className="role-tag">{project.role}</span>
                  <p style={{ marginBottom: '15px', color: '#cbd5e1' }}>{project.description}</p>
                  <div className="tags">
                    {project.techStack.map((tech, index) => (
                      <span key={index}>{tech}</span>
                    ))}
                  </div>
                  <a href={project.liveLink} target="_blank" rel="noreferrer" className="link-btn group">
                    View Project <span className="arrow">→</span>
                  </a>
                </div>
              </div>
            );
          }) : <p>Loading projects...</p>}
        </div>
      </section>

      {/* --- CERTIFICATIONS --- */}
      <section id="certifications" className="section-container">
        <h2>Certifications</h2>
        <div className="cert-grid">
          {certifications.map((cert) => (
            <a key={cert.id} href={cert.link} target="_blank" rel="noreferrer" className="card cert-card link-card">
              <div className="cert-img-wrapper">
                <img src={cert.image} alt={cert.title} className="cert-img" />
              </div>
              <div className="cert-content">
                <h3>{cert.title}</h3>
                <p className="role-tag">{cert.subtitle}</p>
                <p className="issuer-text">{cert.issuer}</p>
                <span className="view-link">View Credential →</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="contact" className="section-container">
        <div className="contact-wrapper">
          <div className="contact-text">
            <h2>Let's Talk</h2>
            <p className="contact-sub">
              I am currently open to full-time opportunities. Feel free to reach out to discuss potential projects or roles.
            </p>
            <div className="contact-info-list">
              <div className="info-item">
                <span className="icon">📧</span>
                <div><label>Email</label><a href="mailto:mohanasrinivas08@gmail.com">mohanasrinivas08@gmail.com</a></div>
              </div>
              <div className="info-item">
                <span className="icon">📞</span>
                <div><label>Phone</label><a href="tel:+918886451189">+91 88 8645 1189</a></div>
              </div>
              <div className="social-buttons">
                <a href="https://github.com/MohanaSrinivas" target="_blank" rel="noreferrer" className="btn secondary">GitHub</a>
                <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noreferrer" className="btn primary">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="contact-image-area">
            <div className="blob-bg"></div>
            <img src="/profile.jpg" alt="Mohana Srinivas" className="profile-img" />
          </div>
        </div>
      </section>

      <footer>
        <p>© 2026 Panadi Mohana Venkata Srinivas. Built with the MERN Stack.</p>
      </footer>
      <Chatbot />
    </div>
  );
}

export default App;
