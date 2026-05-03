import { useState, useEffect, useRef } from 'react'
import './App.css'
import Logo from './components/Logo'
import ContactModal from './components/ContactModal'
import { ToolIcons } from './components/ToolIcons'
import MagazineModal from './components/MagazineModal'
import InvestEaseModal from './components/InvestEaseModal'
import IITDelhiLMSModal from './components/IITDelhiLMSModal'


// Project data
const projects = [
  {
    id: 1,
    label: 'EdTech Platform',
    title: 'Govt LMS (IIT Delhi)',
    description: 'Led end-to-end UX design for a 3-platform LMS ecosystem (Student, Faculty, Admin) at IIT Delhi under CSC e-Governance. Delivered full Information Architecture, scalable Design System, and high-fidelity prototypes serving Jharkhand University.',
    image: '/images/project-lms.png',
    isIITDelhiLMS: true
  },
  {
    id: 2,
    label: 'FinTech / Investment',
    title: 'InvestEase',
    description: 'Designed a comprehensive investment management app that consolidates bank accounts, investments, and financial goals into one beautiful dashboard. View the design presentation inside.',
    image: '/images/project-investease.png',
    isInvestEase: true
  },
  {
    id: 3,
    label: 'AgriTech / AI',
    title: 'FarmAI',
    description: 'Built an intelligent AI farming companion featuring crop health monitoring, leaf disease detection, hyper-local weather insights, and smart alerts — with voice and multilingual support for rural accessibility.',
    image: '/images/project-farmai.png',
    link: 'http://localhost:3001'
  },
  {
    id: 4,
    label: 'Magazine (New)',
    title: "THIS ISN'T HORROR",
    description: 'A visual exploration into the macabre through a crafted interactive magazine reflecting the inevitable crush of the corporate machine. Open the book to read.',
    image: '/images/magazine/1-cover.png',
    isMagazine: true,
    isCreativity: true
  },
  {
    id: 5,
    label: 'Game / Interactive',
    title: "Flying Dragon",
    subtitle: 'An arcade-style game inspired by Flappy Bird, redesigned with a dragon concept and improved gameplay experience.',
    description: 'Navigate a fire-breathing dragon through procedurally generated obstacles. Features 3 dragon skins, dynamic sky themes, particle effects, and responsive touch/keyboard controls.',
    image: '/images/project-flying-dragon.png',
    link: '/flying-dragon/index.html',
    isCreativity: true,
    isPlayable: true
  }
]

// Experience data
const experiences = [
  { date: 'Sep 2025–Present', title: 'Lovely Professional University', role: 'Assistant Professor', description: 'Guided research proposals, supported patent development, and improved design curriculum aligned with industry practices. Conducted Faculty Development Programs (FDPs) and coordinated NICHE International Conference. 🎓' },
  { date: 'Nov 2024–Apr 2025', title: 'School of Specialised Excellence (DBSE)', role: 'UI/UX Designer (SRP)', description: 'Developed and delivered UI/UX curriculum integrating UX research, information architecture, and prototyping. Mentored students in UX Design, Interaction Design, and Design Thinking using Figma, Adobe Suite, and Miro. 🎒' },
  { date: 'Apr 2024–Jul 2024', title: 'IIT Delhi', role: 'UI/UX Designer (SRP)', description: 'Designed and delivered UI/UX training curriculum covering research, interaction design, and prototyping. Received a Letter of Recommendation from Dr. Jyoti Kumar, HOD, Department of Design, IIT Delhi. ✨' },
  { date: 'Oct 2023–Apr 2024', title: 'IIT Delhi', role: 'UI/UX Designer (Intern)', description: 'Contributed to the UX/UI design of a Learning Management System (LMS) for Jharkhand University under CSC Government Services Pvt. Ltd. Supported Digital Media & Design curriculum development, creating interactive learning content. 🏛️' },
  { date: 'Jan 2022–Oct 2023', title: 'Ezy Foodz', role: 'UI/UX Designer', description: 'Led packaging and branding redesign, increasing brand recognition by 20%. Designed visual assets and UI concepts using Figma and Adobe Creative Suite. 🍔' }
]

// Skills data
const designSkills = ['User Research', 'Usability Testing', 'Wireframing & Prototyping', 'Design Systems', 'UX Strategy', 'Product Thinking', 'Data Visualization', 'Branding']
const tools = [
  { name: 'Figma', icon: ToolIcons.Figma },
  { name: 'Framer', icon: ToolIcons.Framer },
  { name: 'Maze', icon: ToolIcons.Maze },
  { name: 'Miro', icon: ToolIcons.Miro },
  { name: 'Adobe Suite', icon: ToolIcons['Adobe Suite'] },
  { name: 'Google Analytics', icon: ToolIcons['Google Analytics'] },
  { name: 'Blender', icon: ToolIcons.Blender },
  { name: 'Uizard', icon: ToolIcons.Uizard },
  { name: 'Galileo AI', icon: ToolIcons['Galileo AI'] }
]

// Certificates data
const certificates = [
  {
    title: 'Enterprise Design Thinking Practitioner',
    issuer: 'IBM (2022)',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg'
  },
  {
    title: 'Digital Skills: User Experience',
    issuer: 'Accenture (2022)',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg'
  },
  {
    title: 'Competitive Analysis',
    issuer: 'CareerNinja (2023)',
    logo: 'https://careerninja.in/wp-content/uploads/2021/07/CareerNinja-Logo-NEW-1.png'
  },
  {
    title: 'Strategy for UX Design',
    issuer: 'CareerNinja (2023)',
    logo: 'https://careerninja.in/wp-content/uploads/2021/07/CareerNinja-Logo-NEW-1.png'
  },
  {
    title: 'UX Strategy Tools',
    issuer: 'CareerNinja (2023)',
    logo: 'https://careerninja.in/wp-content/uploads/2021/07/CareerNinja-Logo-NEW-1.png'
  },
  {
    title: 'UI/UX Design Foundation',
    issuer: 'Great Learning (2022)',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Great_Learning_logo.png/220px-Great_Learning_logo.png'
  }
]

// Process words
const processWords = ['🔍 Stalk Users', '✏️ Scribble Ideas', '🎨 Make It Pretty', '🧪 Break Things', '✨ Ship Magic']

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeProcess, setActiveProcess] = useState(0)
  const [progressWidth, setProgressWidth] = useState(0)
  const [copied, setCopied] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMagazineOpen, setIsMagazineOpen] = useState(false)
  const [isInvestEaseOpen, setIsInvestEaseOpen] = useState(false)
  const [isIITDelhiLMSOpen, setIsIITDelhiLMSOpen] = useState(false)

  const processRef = useRef(null)
  const cursorDotRef = useRef(null)
  const cursorRingRef = useRef(null)
  const cursorSpotRef = useRef(null)

  // Toggle modal-open class on body to hide custom cursor over modals
  useEffect(() => {
    const anyModalOpen = isModalOpen || isMagazineOpen || isInvestEaseOpen || isIITDelhiLMSOpen
    document.body.classList.toggle('modal-open', anyModalOpen)
  }, [isModalOpen, isMagazineOpen, isInvestEaseOpen, isIITDelhiLMSOpen])

  // Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Process section animation
      if (processRef.current) {
        const rect = processRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        if (rect.top < windowHeight && rect.bottom > 0) {
          const rawProgress = (windowHeight - rect.top) / (windowHeight * 0.5)
          const progress = Math.min(1, Math.max(0, rawProgress))
          setProgressWidth(progress * 100)
          setActiveProcess(Math.min(processWords.length - 1, Math.floor(progress * processWords.length)))
        }
      }

      // Trigger all animation types on scroll
      document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in, .blur-in').forEach(el => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight - 60) {
          el.classList.add('visible')
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth cursor using RAF
  useEffect(() => {
    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0
    let rafId

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = mouseX + 'px'
        cursorDotRef.current.style.top = mouseY + 'px'
      }
      if (cursorSpotRef.current) {
        cursorSpotRef.current.style.left = mouseX + 'px'
        cursorSpotRef.current.style.top = mouseY + 'px'
      }
    }

    const lerp = (a, b, t) => a + (b - a) * t
    const animateRing = () => {
      ringX = lerp(ringX, mouseX, 0.12)
      ringY = lerp(ringY, mouseY, 0.12)
      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = ringX + 'px'
        cursorRingRef.current.style.top = ringY + 'px'
      }
      rafId = requestAnimationFrame(animateRing)
    }

    window.addEventListener('mousemove', onMouseMove)
    rafId = requestAnimationFrame(animateRing)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      {/* Cursor Spotlight */}
      <div ref={cursorSpotRef} className="cursor-spotlight" />
      <div ref={cursorDotRef} className="cursor-dot" />
      <div ref={cursorRingRef} className="cursor-ring" />

      {/* Navigation */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <Logo />
          <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            <li><a href="#work" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Work</a></li>
            <li><a href="#creativity" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Creativity</a></li>
            <li><a href="#process" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Process</a></li>
            <li><a href="#about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About</a></li>
            <li><a href="#experience" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Experience</a></li>
            <li><a href="#contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</a></li>
          </ul>
          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="hero-bg-grid" />
        <div className="hero-content">
          <div className="hero-badge fade-in">
            <span className="hero-badge-dot" />
            Available for freelance work
          </div>
          <h1 className="display-xl hero-title fade-in delay-1">
            I design interfaces<br />
            <span className="text-outline">that feel effortless.</span>
          </h1>
          <p className="hero-subtitle fade-in delay-2">
            UI/UX Designer crafting clean, accessible and product-ready experiences.
          </p>
          <div className="hero-buttons fade-in delay-3">
            <a href="#work" className="btn btn-primary btn-magnetic">
              Explore Work <span>↓</span>
            </a>
            <a
              href="./Aaqib_Uddin_Hashmi_CV.pdf"
              download="Aaqib_Uddin_Hashmi_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-magnetic"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:'4px'}}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download Resume
            </a>
          </div>

          <div className="hero-stats fade-in delay-4">
            <div className="hero-stat">
              <span className="hero-stat-number">4+</span>
              <span className="hero-stat-label">Years Experience</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-number">15+</span>
              <span className="hero-stat-label">Projects Shipped</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-number">3</span>
              <span className="hero-stat-label">Institutions Trained</span>
            </div>
          </div>

          <a href="#work" className="scroll-indicator fade-in delay-5">
            <div className="scroll-indicator-mouse">
              <div className="scroll-indicator-wheel"></div>
            </div>
            <span className="scroll-indicator-text">Scroll</span>
          </a>
        </div>
      </section>

      {/* Selected Work Section */}
      <section className="works" id="work">
        <div className="container">
          <div className="section-header fade-in" style={{ textAlign: 'center' }}>
            <span className="section-label">Selected Work</span>
            <h2 className="display-lg">Featured Projects</h2>
            <p className="section-subtitle fade-in delay-1">A curated selection spanning EdTech, FinTech, and beyond.</p>
          </div>

          <div className="projects-grid">
            {projects.filter(p => !p.isCreativity).map((project, index) => (
              <article
                key={project.id}
                className={`project-card glow scale-in delay-${index + 1}`}
                onClick={() => {
                  if (project.isMagazine) setIsMagazineOpen(true)
                  if (project.isInvestEase) setIsInvestEaseOpen(true)
                  if (project.isIITDelhiLMS) setIsIITDelhiLMSOpen(true)
                  if (project.link) window.open(project.link, '_blank')
                }}
                style={(project.isMagazine || project.isInvestEase || project.isIITDelhiLMS || project.link) ? { cursor: 'pointer' } : {}}
              >
                <div className={`project-image-wrapper ${project.isMagazine ? 'project-image-wrapper--magazine' : ''}`}>
                  <span className="project-index">0{project.id}</span>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-image"
                  />
                  {(project.isMagazine || project.isInvestEase || project.isIITDelhiLMS || project.link) && (
                    <div className="magazine-overlay-hint">
                      <span>{project.isMagazine ? 'Click to Read' : 'Click to View'}</span>
                    </div>
                  )}
                </div>
                <div className="project-content">
                  <span className="project-label">{project.label}</span>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  {(project.isMagazine || project.isInvestEase || project.isIITDelhiLMS || project.link) && (
                    <span className="project-cta">View Case Study →</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      
      {/* Creativity Section */}
      <section className="creativity" id="creativity">
        <div className="container">
          <div className="section-header fade-in" style={{ textAlign: 'center' }}>
            <span className="section-label">Beyond Interfaces</span>
            <h2 className="display-lg">Creative Exploration</h2>
            <p className="section-subtitle fade-in delay-1">Experiments in visual storytelling and interactive media.</p>
          </div>

          <div className="projects-grid">
            {projects.filter(p => p.isCreativity).map((project, index) => (
              <article
                key={project.id}
                className={`project-card glow scale-in delay-${index + 1} ${project.isPlayable ? 'project-card--playable' : ''}`}
                onClick={() => {
                  if (project.isMagazine) setIsMagazineOpen(true)
                  else if (project.link) window.open(project.link, '_blank', 'noopener,noreferrer')
                }}
                style={{ cursor: 'pointer' }}
                tabIndex={0}
                role="link"
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (project.isMagazine) setIsMagazineOpen(true); else if (project.link) window.open(project.link, '_blank', 'noopener,noreferrer'); } }}
              >
                <div className={`project-image-wrapper ${project.isMagazine ? 'project-image-wrapper--magazine' : ''}`}>
                  <span className="project-index">0{project.id}</span>
                  {project.isPlayable && (
                    <span className="project-tag-live">🎮 Playable Demo</span>
                  )}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-image"
                  />
                  <div className="magazine-overlay-hint">
                    <span>{project.isMagazine ? 'Click to Read' : project.isPlayable ? '▶ Play Now' : 'View Project'}</span>
                  </div>
                </div>
                <div className="project-content">
                  <span className="project-label">{project.label}</span>
                  <h3 className="project-title">{project.title}</h3>
                  {project.subtitle && <p className="project-subtitle">{project.subtitle}</p>}
                  <p className="project-desc">{project.description}</p>
                  {project.isPlayable ? (
                    <span className="project-cta project-cta--play">
                      Play Live Game <span className="cta-external-icon">↗</span>
                    </span>
                  ) : (
                    <span className="project-cta">{project.isMagazine ? 'Read Magazine →' : 'View Project →'}</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process" id="process" ref={processRef}>
        <div className="container">
          <div className="section-header fade-in" style={{ textAlign: 'center' }}>
            <span className="section-label">The Secret Sauce</span>
            <h2 className="display-lg">How the Magic Happens ✨</h2>
            <p className="body-lg" style={{ maxWidth: '600px', margin: '20px auto 0' }}>
              Spoiler: It's not actually magic. Just lots of coffee and user interviews.
            </p>
          </div>

          <div className="process-words">
            {processWords.map((word, index) => (
              <span
                key={word}
                className={`process-word ${index <= activeProcess ? 'active' : ''}`}
              >
                {word}
              </span>
            ))}
          </div>

          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progressWidth}%` }}></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text fade-in-left">
              <span className="section-label">About Me</span>
              <h2 className="display-md" style={{ marginTop: '16px', marginBottom: '24px' }}>Aaqib Uddin Hashmi</h2>
              <p className="body-lg" style={{ marginBottom: '16px' }}>
                <strong>Product Designer · UX Researcher · Design Educator</strong>
              </p>
              <p style={{ color: 'var(--soft-gray)', lineHeight: 1.8, marginBottom: '14px' }}>
                Curious about how people think, behave, and interact with products. That curiosity evolved into a career in UX design and research.
              </p>
              <p style={{ color: 'var(--soft-gray)', lineHeight: 1.8, marginBottom: '14px' }}>
                My work sits at the intersection of design, psychology, and problem-solving — looking beyond the interface to understand why users behave the way they do.
              </p>
              <p style={{ color: 'var(--soft-gray)', lineHeight: 1.8, marginBottom: '32px' }}>
                Outside of design, I enjoy psychology, documentaries, photography, and visual storytelling.
              </p>

            </div>

            <div className="about-image fade-in-right">
              <div className="profile-image-wrapper">
                <img
                  src="/images/profile.jpg"
                  alt="Aaqib Uddin Hashmi"
                  className="profile-image"
                />
                <div className="profile-image-glow" />
              </div>
            </div>
          </div>

          <div className="about-keywords fade-in delay-2">
            <span className="keyword-outline">ACCESSIBILITY</span>
            <span className="keyword-outline">SYSTEMS</span>
            <span className="keyword-outline">INTERACTION</span>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="experience" id="experience">
        <div className="container">
          <div className="section-header fade-in" style={{ textAlign: 'center' }}>
            <span className="section-label">Experience</span>
            <h2 className="display-lg">My Journey</h2>
          </div>
        </div>

        <div className="timeline-wrapper fade-in delay-1">
          <div className="timeline-scroll-container">
            {experiences.map((exp, index) => {
              const yearMatch = exp.date.match(/\d{4}/);
              const year = yearMatch ? yearMatch[0] : '2024';
              
              let badgeClass = 'badge-outline';
              if (index === 0) badgeClass = 'badge-gradient-cyan';
              else if (index === 1) badgeClass = 'badge-solid-blue';
              else if (index === 2) badgeClass = 'badge-gradient-green';
              else if (index === 3) badgeClass = 'badge-solid-purple';
              else if (index === 4) badgeClass = 'badge-gradient-orange';

              return (
                <div key={index} className="timeline-item">
                  <div className={`timeline-badge ${badgeClass}`}>{year}</div>
                  <div className={`timeline-card ${index % 2 === 1 ? 'card-highlight' : ''}`}>
                    <h3>{exp.title} — {exp.role}</h3>
                    <p>{exp.description}</p>
                  </div>
                  <div className="timeline-connector"></div>
                  <div className="timeline-node"></div>
                </div>
              );
            })}
          </div>
          <div className="timeline-line-track"></div>
        </div>
        
        <div className="timeline-scroll-hint fade-in delay-2">
          <div className="scroll-hint-line"></div>
          <span className="scroll-hint-text">Scroll horizontally →</span>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills" id="skills">
        <div className="container">
          <div className="section-header fade-in" style={{ textAlign: 'center' }}>
            <span className="section-label">Expertise</span>
            <h2 className="display-lg">Skills &amp; Tools</h2>
          </div>

          <div className="skills-category fade-in delay-1">
            <h3>Design Skills</h3>
            <div className="skills-grid">
              {designSkills.map((skill) => (
                <span key={skill} className="chip glow">{skill}</span>
              ))}
            </div>
          </div>

          <div className="skills-category fade-in delay-2">
            <h3>Tools</h3>
            <div className="skills-grid">
              {tools.map((tool) => (
                <span key={tool.name} className="chip glow tool-chip">
                  <span className="tool-icon-svg">{tool.icon}</span>
                  {tool.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section className="certificates" id="certificates">
        <div className="container">
          <div className="section-header fade-in" style={{ textAlign: 'center' }}>
            <span className="section-label">Credentials</span>
            <h2 className="display-lg">Certificates</h2>
          </div>

          <div className="certificates-grid">
            {certificates.map((cert, index) => (
              <div key={index} className={`certificate-card scale-in delay-${index + 1}`}>
                <div className="cert-logo-wrapper">
                  <img src={cert.logo} alt={cert.issuer} className="cert-logo" />
                </div>
                <h4>{cert.title}</h4>
                <p>{cert.issuer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="container">
          <div className="fade-in">
            <span className="section-label">Get In Touch</span>
            <h2 className="display-lg contact-title">
              Let's design something<br />
              <span className="text-outline">people love using.</span>
            </h2>
            <p className="contact-subtitle">
              Ready to bring your product vision to life? Let's collaborate and create
              exceptional user experiences together.
            </p>
          </div>

          <div className="contact-buttons fade-in delay-1">
            <a href="mailto:aaqibuddinhashmi@gmail.com" className="btn btn-primary btn-magnetic">
              ✉ Email Me
            </a>
            <a href="https://www.linkedin.com/in/aaqib-uddin-hashmi/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-magnetic">
              LinkedIn
            </a>
            <a href="https://www.behance.net/aaqibuddin" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-magnetic">
              Behance
            </a>
            <button onClick={() => {
              navigator.clipboard.writeText('aaqibuddinhashmi@gmail.com')
              setCopied(true)
              setTimeout(() => setCopied(false), 2000)
            }} className="btn btn-secondary btn-magnetic">
              {copied ? '✓ Copied!' : '⎘ Copy Email'}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <p>© {new Date().getFullYear()} Aaqib Uddin Hashmi. Designed with passion.</p>
          <div className="footer-links">
            <a href="https://www.linkedin.com/in/aaqib-uddin-hashmi/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://www.behance.net/aaqibuddin" target="_blank" rel="noopener noreferrer">Behance</a>
            <a href="mailto:aaqibuddinhashmi@gmail.com">Email</a>
          </div>
        </div>
      </footer>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <MagazineModal isOpen={isMagazineOpen} onClose={() => setIsMagazineOpen(false)} />
      <InvestEaseModal isOpen={isInvestEaseOpen} onClose={() => setIsInvestEaseOpen(false)} />
      <IITDelhiLMSModal isOpen={isIITDelhiLMSOpen} onClose={() => setIsIITDelhiLMSOpen(false)} />

      {/* Copy Feedback Toast */}
      <div className={`copy-feedback ${copied ? 'show' : ''}`}>
        ✓ Email copied to clipboard!
      </div>
    </>
  )
}

export default App
