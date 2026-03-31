import { useState, useEffect, useRef } from 'react'
import './App.css'
import Logo from './components/Logo'
import ContactModal from './components/ContactModal'
import { ToolIcons } from './components/ToolIcons'
import MagazineModal from './components/MagazineModal'
import InvestEaseModal from './components/InvestEaseModal'


// Project data
const projects = [
  {
    id: 1,
    label: 'EdTech Platform',
    title: 'Govt LMS (IIT Delhi)',
    description: 'Designed a comprehensive Learning Management System for government education initiative, focusing on accessibility and seamless learning experience for diverse user groups.',
    image: '/images/project-lms.png'
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
    label: 'E-commerce',
    title: 'Premium Shoe E-commerce',
    description: 'Crafted a premium shopping experience for a luxury footwear brand with focus on visual storytelling and seamless checkout flow.',
    image: '/images/project-ecommerce.png'
  },
  {
    id: 4,
    label: 'Magazine (New)',
    title: 'THIS ISN\'T HORROR',
    description: 'A visual exploration into the macabre through a crafted interactive magazine reflecting the inevitable crush of the corporate machine. Open the book to read.',
    image: '/images/magazine/1-cover.png',
    isMagazine: true
  }
]

// Experience data
const experiences = [
  { date: '2025-Present', title: 'Lovely Professional University', role: 'Assistant Professor', description: 'Guiding research proposals, supporting patent development, and improving design curriculum. Also coordinating NICHE International Conference! 🎓' },
  { date: 'Apr-Jul 2025', title: 'IIT Delhi', role: 'UI/UX Designer (SRP)', description: 'Designed and delivered UI/UX training curriculum covering research, interaction design, and prototyping. Got a recommendation from Dr. Jyoti Kumar, HOD Design! ✨' },
  { date: 'Apr-Jul 2025', title: 'IIT Delhi', role: 'UI/UX Designer (Intern)', description: 'Designed the UX/UI for a government LMS under CSC. Making govt tech look like it belongs in this century! 🏛️' },
  { date: 'Nov 2024-Apr 2025', title: 'DBSE (School of Specialised Excellence)', role: 'UI/UX Designer (SRP)', description: 'Developed UI/UX curriculum and mentored students in Design Thinking using Figma, Adobe Suite, and Miro. 🎒' },
  { date: 'Jan 2022-Sep 2023', title: 'Ezy Foodz', role: 'UI/UX Designer', description: 'Led packaging and branding redesign, increasing brand recognition by 20%. Designing food apps while getting hungry — professional hazard! 🍔' }
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

// Process words - fun and catchy
const processWords = ['🔍 Stalk Users', '✏️ Scribble Ideas', '🎨 Make It Pretty', '🧪 Break Things', '✨ Ship Magic']

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeProcess, setActiveProcess] = useState(0)
  const [progressWidth, setProgressWidth] = useState(0)
  const [copied, setCopied] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMagazineOpen, setIsMagazineOpen] = useState(false)
  const [isInvestEaseOpen, setIsInvestEaseOpen] = useState(false)


  const processRef = useRef(null)

  // Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Process section animation - faster progression
      if (processRef.current) {
        const rect = processRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight

        if (rect.top < windowHeight && rect.bottom > 0) {
          // Speed multiplier of 2.5x to complete animation faster
          const rawProgress = (windowHeight - rect.top) / (windowHeight * 0.5)
          const progress = Math.min(1, Math.max(0, rawProgress))
          setProgressWidth(progress * 100)
          setActiveProcess(Math.min(processWords.length - 1, Math.floor(progress * processWords.length)))
        }
      }

      // Fade in animations
      document.querySelectorAll('.fade-in, .blur-in').forEach(el => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight - 100) {
          el.classList.add('visible')
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Cursor spotlight
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])



  return (
    <>
      {/* Cursor Spotlight */}
      <div
        className="cursor-spotlight"
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />

      {/* Navigation */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <Logo />

          <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            <li><a href="#work" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Work</a></li>
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
        <div className="hero-content">
          <h1 className="display-xl hero-title fade-in">
            I design interfaces<br />
            <span className="text-outline">that feel effortless.</span>
          </h1>
          <p className="hero-subtitle fade-in delay-1">
            UI/UX Designer crafting clean, accessible and product-ready experiences.
          </p>
          <div className="hero-buttons fade-in delay-2">
            <a href="#work" className="btn btn-primary btn-magnetic">
              Explore Work <span>↓</span>
            </a>
            <a href="#" className="btn btn-secondary btn-magnetic">
              Download Resume
            </a>
          </div>

          <a href="#work" className="scroll-indicator fade-in delay-3">
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
          <div className="section-header fade-in">
            <span className="section-label">Selected Work</span>
            <h2 className="display-lg">Featured Projects</h2>
          </div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <article
                key={project.id}
                className={`project-card glow fade-in delay-${index + 1}`}
                onClick={() => {
                  if (project.isMagazine) setIsMagazineOpen(true);
                  if (project.isInvestEase) setIsInvestEaseOpen(true);
                  if (project.link) window.open(project.link, '_blank');
                }}
                style={(project.isMagazine || project.isInvestEase || project.link) ? { cursor: 'pointer' } : {}}
              >

                <div className="project-image-wrapper" style={project.isMagazine ? { backgroundColor: '#111' } : {}}>
                  <span className="bg-number" style={{ right: '-20px', top: '-40px' }}>
                    0{project.id}
                  </span>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-image"
                    style={(project.isMagazine || project.link) ? { objectFit: 'contain' } : {}}
                  />
                  {project.isMagazine && (
                    <div className="magazine-overlay-hint">
                      <span>Click to Read</span>
                    </div>
                  )}
                  {project.isInvestEase && (
                    <div className="magazine-overlay-hint">
                      <span>Click to View</span>
                    </div>
                  )}
                  {project.link && (
                    <div className="magazine-overlay-hint">
                      <span>Click to View</span>
                    </div>
                  )}

                </div>
                <div className="project-content">
                  <span className="project-label">{project.label}</span>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
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
            <div
              className="progress-fill"
              style={{ width: `${progressWidth}%` }}
            ></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text fade-in">
              <span className="section-label">About Me</span>
              <h2 className="display-md">Aaqib Uddin Hashmi</h2>
              <p className="body-lg">
                <strong>Product Designer | UX Researcher | Design Educator</strong>
              </p>
              <p>
                Curious about how people think, behave, and interact with the products around them.
              </p>
              <p>
                That curiosity naturally evolved into a path in UX design and research, where understanding
                people is just as important as designing interfaces. I enjoy exploring problems through user
                research, observation, and experimentation, uncovering patterns in human behavior, and
                translating those insights into thoughtful digital experiences.
              </p>
              <p>
                My work often sits at the intersection of design, psychology, and problem-solving—looking
                beyond the interface to understand why users behave the way they do and how systems can
                better support them.
              </p>
              <p>
                Outside of design, I enjoy exploring psychology, documentaries, photography, and visual
                storytelling, interests that constantly shape the way I observe people, environments, and
                the subtle details that influence everyday experiences.
              </p>
            </div>

            <div className="about-image fade-in delay-1">
              <div className="profile-image-wrapper">
                <img
                  src="/images/profile.jpg"
                  alt="Aaqib Uddin Hashmi"
                  className="profile-image"
                />
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

      {/* Experience Timeline */}
      <section className="experience" id="experience">
        <div className="container">
          <div className="section-header fade-in" style={{ textAlign: 'center' }}>
            <span className="section-label">Experience</span>
            <h2 className="display-lg">My Journey</h2>
          </div>

          <div className="experience-grid">
            {experiences.map((exp, index) => (
              <div key={index} className={`experience-card fade-in delay-${Math.min(index + 1, 5)}`}>
                <div className="card-inner">
                  <div className="card-front">
                    <span className="exp-date">{exp.date}</span>
                    <h3>{exp.title}</h3>
                    <div className="exp-role">{exp.role}</div>
                  </div>
                  <div className="card-back">
                    <p>{exp.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills" id="skills">
        <div className="container">
          <div className="section-header fade-in" style={{ textAlign: 'center' }}>
            <span className="section-label">Expertise</span>
            <h2 className="display-lg">Skills & Tools</h2>
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
              <div key={index} className={`certificate-card fade-in delay-${index + 1}`}>
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
              Email Me
            </a>
            <a href="https://www.linkedin.com/in/aaqib-uddin-hashmi/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-magnetic">
              LinkedIn
            </a>
            <a href="https://www.behance.net/aaqibuddin" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-magnetic">
              Behance
            </a>

            <button onClick={() => {
              navigator.clipboard.writeText('aaqibuddinhashmi@gmail.com');
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }} className="btn btn-secondary btn-magnetic">
              {copied ? 'Copied!' : 'Copy Email'}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} Aaqib Uddin Hashmi. Designed with passion.</p>
        </div>
      </footer>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <MagazineModal isOpen={isMagazineOpen} onClose={() => setIsMagazineOpen(false)} />
      <InvestEaseModal isOpen={isInvestEaseOpen} onClose={() => setIsInvestEaseOpen(false)} />


      {/* Copy Feedback Toast */}
      <div className={`copy-feedback ${copied ? 'show' : ''}`}>
        ✓ Email copied to clipboard!
      </div>
    </>
  )
}

export default App
