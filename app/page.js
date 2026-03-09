"use client";

import { useEffect, useMemo, useState } from "react";

const sections = [
  ["about", "About"],
  ["skills", "Skills"],
  ["experience", "Experience"],
  ["achievements", "Achievements"],
  ["projects", "Projects"],
  ["education", "Education"],
  ["contact", "Contact"]
];

const experience = {
  partnr: {
    title: "SDE-2",
    company: "Partnr - Hero Group",
    duration: "May 2025 - Present",
    points: [
      "Built the Custom OTA platform and shipped responsive React Native experiences.",
      "Partnered with designers and UX specialists to implement high-fidelity interactive screens.",
      "Integrated frontend components with backend systems for seamless data flow.",
      "Improved application performance by reducing app response time."
    ]
  },
  daffodil: {
    title: "Associate Software Engineer",
    company: "Daffodil Software",
    duration: "Jan 2021 - Apr 2025",
    points: [
      "Developed responsive interfaces using React, JavaScript, HTML, and CSS.",
      "Worked with cross-functional teams to transform requirements into functional UI modules.",
      "Optimized loading performance and reliability through better frontend code practices.",
      "Handled usability improvements, bug resolution, and animation-rich interface delivery."
    ]
  }
};

const projects = [
  {
    title: "Partnr - Motor Parts Delivery App",
    description:
      "Delivery workflow for mechanics with optimized React Native screens and live operational updates.",
    points: [
      "Real-time tracking, order management, and inventory API integration",
      "Reliability-focused testing for Android and iOS"
    ],
    tags: ["react-native", "react"]
  },
  {
    title: "Locomo - Project Management Software",
    description: "Responsive project workflows with optimized component architecture.",
    points: [
      "Creator Portal collaboration and frontend-backend integration",
      "Client-facing iterations based on active product feedback"
    ],
    tags: ["react"]
  },
  {
    title: "Manaze - ERP and Business Management",
    description: "UI system for business workflows with emphasis on maintainability and speed.",
    points: ["Reusable ReactJS components", "Cross-team collaboration and quality assurance"],
    tags: ["react"]
  },
  {
    title: "Punch Client - Biometric Integration",
    description: "Integrated biometric hardware with application layer and dashboard UI.",
    points: [
      "Backend integration via Node.js + Express + SQL",
      "Frontend built with ReactJS, HTML, CSS, JavaScript"
    ],
    tags: ["node", "react"]
  },
  {
    title: "Autoload - Logistics Management Solution",
    description: "Cross-platform logistics app with web + mobile feature rollout.",
    points: [
      "Deployed on Play Store and App Store",
      "Client collaboration for execution alignment"
    ],
    tags: ["react-native", "react"]
  },
  {
    title: "YellowLive - School Bus Tracking",
    description: "Real-time student transport visibility with map-first frontend experience.",
    points: ["Google Map API integration", "Feature-level delivery based on stakeholder requirements"],
    tags: ["react"]
  }
];

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [activeTab, setActiveTab] = useState("partnr");
  const [projectFilter, setProjectFilter] = useState("all");
  const [copyStatus, setCopyStatus] = useState("");

  const filteredProjects = useMemo(() => {
    if (projectFilter === "all") return projects;
    return projects.filter((project) => project.tags.includes(projectFilter));
  }, [projectFilter]);

  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) {
        setScrollProgress(0);
        return;
      }
      setScrollProgress((window.scrollY / maxScroll) * 100);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const revealItems = document.querySelectorAll(".reveal:not(.visible)");
    if (revealItems.length === 0) return;

    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("visible"));
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));

    return () => revealObserver.disconnect();
  }, [projectFilter, activeTab]);

  useEffect(() => {
    const counters = document.querySelectorAll(".counter");

    if (!("IntersectionObserver" in window)) {
      counters.forEach((element) => {
        const targetValue = Number(element.getAttribute("data-target") || "0");
        const hasDecimal = targetValue % 1 !== 0;
        element.textContent = hasDecimal ? targetValue.toFixed(1) : String(targetValue);
      });
      return;
    }

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target;
          const targetValue = Number(element.getAttribute("data-target") || "0");
          const hasDecimal = targetValue % 1 !== 0;
          const step = targetValue / 40;
          let current = 0;

          const ticker = window.setInterval(() => {
            current += step;
            if (current >= targetValue) {
              element.textContent = hasDecimal ? targetValue.toFixed(1) : String(targetValue);
              window.clearInterval(ticker);
              return;
            }

            element.textContent = hasDecimal ? current.toFixed(1) : String(Math.floor(current));
          }, 28);

          counterObserver.unobserve(element);
        });
      },
      { threshold: 0.6 }
    );

    counters.forEach((counter) => counterObserver.observe(counter));

    return () => counterObserver.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const offsetTop = 120;
      const sectionElements = sections
        .map(([id]) => document.getElementById(id))
        .filter((element) => element !== null);

      let currentSection = "home";
      sectionElements.forEach((section) => {
        if (section.offsetTop - offsetTop <= window.scrollY) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 960) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleNavClick = (event, id) => {
    event.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      const offsetTop = 96;
      const target = section.getBoundingClientRect().top + window.scrollY - offsetTop;
      window.scrollTo({ top: Math.max(target, 0), behavior: "smooth" });
      setActiveSection(id);
    }
    setMobileMenuOpen(false);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("agarwalpriyanshi0153@gmail.com");
      setCopyStatus("Email copied.");
    } catch {
      setCopyStatus("Could not copy email. Please copy manually.");
    }

    window.setTimeout(() => {
      setCopyStatus("");
    }, 1800);
  };

  return (
    <>
      <div className="noise" />
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <header className="header glass">
        <a href="#home" className="brand" onClick={(event) => handleNavClick(event, "home")}>
          PA
        </a>

        <button
          className="menu-toggle"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          Menu
        </button>

        <nav className={mobileMenuOpen ? "open" : ""}>
          {sections.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={activeSection === id ? "active" : ""}
              onClick={(event) => handleNavClick(event, id)}
            >
              {label}
            </a>
          ))}
        </nav>

        <a className="btn btn-small" href="mailto:agarwalpriyanshi0153@gmail.com">
          Hire Me
        </a>
      </header>

      <main>
        <section className="hero section" id="home">
          <div className="hero-grid">
            <div>
              <h1 className="reveal">
                Priyanshi Agarwal
                <br />
                <span className="role-line">Frontend Engineer | React Native Developer</span>
              </h1>
              <p className="lead reveal">
                4.9 years building production-ready web and mobile experiences with React, React Native,
                TypeScript, and performance-first UI architecture.
              </p>
              <div className="cta-row reveal">
                <a className="btn" href="#projects">
                  See Projects
                </a>
                <a
                  className="btn btn-ghost"
                  href="https://www.linkedin.com/in/priyanshi-agarwal-5b442a1a0/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </div>
              <div className="quick-meta-grid reveal">
                <a href="mailto:agarwalpriyanshi0153@gmail.com" className="meta-card glass">
                  <span className="meta-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </span>
                  <div className="meta-content">
                    <strong>Email</strong>
                    <span>agarwalpriyanshi0153@gmail.com</span>
                  </div>
                </a>
                <a href="tel:+917906260153" className="meta-card glass">
                  <span className="meta-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </span>
                  <div className="meta-content">
                    <strong>Phone</strong>
                    <span>+91 79062 60153</span>
                  </div>
                </a>
                <div className="meta-card glass">
                  <span className="meta-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  </span>
                  <div className="meta-content">
                    <strong>Location</strong>
                    <span>Gurugram, India</span>
                  </div>
                </div>
              </div>
            </div>

            <aside className="hero-card glass reveal" aria-label="Professional highlights">
              <h3>Snapshot</h3>
              <div className="stats">
                <article>
                  <p className="counter" data-target="4.9">
                    0
                  </p>
                  <span>Years Experience</span>
                </article>
                <article>
                  <p className="counter" data-target="6">
                    0
                  </p>
                  <span>Key Projects</span>
                </article>
                <article>
                  <p className="counter" data-target="2">
                    0
                  </p>
                  <span>Major Roles</span>
                </article>
              </div>
              <div className="focus-container">
                <h4 className="focus-title">Key Highlights</h4>
                <div className="focus-areas">
                  <span className="focus-tag">Mobile Product UX</span>
                  <span className="focus-tag">API-Led Frontends</span>
                  <span className="focus-tag">Interactive UIs</span>
                  <span className="focus-tag">App Performance</span>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="section" id="about">
          <div className="section-head reveal">
            <p className="eyebrow">About</p>
            <h2>Building interfaces that feel fast, clean, and reliable.</h2>
          </div>
          <div className="about-bento">
            <div className="bento-card glass reveal">
              <span className="bento-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              </span>
              <h3>Full-Stack Frontend</h3>
              <p>
                I work across the frontend stack to deliver scalable UI systems for web and mobile. My work
                includes creating responsive components, integrating frontends with backend services, and
                shipping polished releases to Play Store and App Store.
              </p>
            </div>
            <div className="bento-card glass reveal">
              <span className="bento-icon highlight">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </span>
              <h3>Collaborative Execution</h3>
              <p>
                I collaborate closely with product, design, and engineering teams to turn requirements into
                useful, intuitive interfaces. I prioritize maintainable code, practical architecture, and strong
                user experience.
              </p>
            </div>
          </div>
        </section>

        <section className="section" id="skills">
          <div className="section-head reveal">
            <p className="eyebrow">Skills</p>
            <h2>Core stack and tooling</h2>
          </div>
          <div className="skill-groups">
            <article className="card reveal">
              <h3>Languages</h3>
              <p>JavaScript, TypeScript, HTML5, CSS3</p>
            </article>
            <article className="card reveal">
              <h3>Frameworks</h3>
              <p>React.js, React Native, Next.js, Node.js, Express</p>
            </article>
            <article className="card reveal">
              <h3>Testing and Delivery</h3>
              <p>Jest, GitHub, JIRA, Firebase Services</p>
            </article>
          </div>
        </section>

        <section className="section" id="experience">
          <div className="section-head reveal">
            <p className="eyebrow">Experience</p>
            <h2>Roles and impact</h2>
          </div>

          <div className="tab-buttons reveal" role="tablist" aria-label="Experience tabs">
            <button
              className={`tab-btn ${activeTab === "partnr" ? "active" : ""}`}
              role="tab"
              aria-selected={activeTab === "partnr"}
              onClick={() => setActiveTab("partnr")}
            >
              Partnr - Hero Group
            </button>
            <button
              className={`tab-btn ${activeTab === "daffodil" ? "active" : ""}`}
              role="tab"
              aria-selected={activeTab === "daffodil"}
              onClick={() => setActiveTab("daffodil")}
            >
              Daffodil Software
            </button>
          </div>

          <article className="timeline-card glass reveal active">
            <header>
              <h3>
                {experience[activeTab].title} <span className="muted">| {experience[activeTab].company}</span>
              </h3>
              <p>{experience[activeTab].duration}</p>
            </header>
            <ul>
              {experience[activeTab].points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="section" id="achievements">
          <div className="section-head reveal">
            <p className="eyebrow">Milestones</p>
            <h2>Professional Achievements</h2>
          </div>
          <div className="achievements-grid">
            <article className="achievement-card glass reveal">
              <div className="achievement-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
              </div>
              <h3>Career Progression</h3>
              <p>Fast-tracked from Associate Software Engineer to SDE-2 within 4 years, reflecting consistent high performance and technical leadership.</p>
            </article>
            <article className="achievement-card glass reveal">
              <div className="achievement-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M16 12l-4-4-4 4M12 8v8"></path></svg>
              </div>
              <h3>App Store Deployment</h3>
              <p>Successfully managed the end-to-end lifecycle and release of 3+ production-grade applications on both Google Play Store and Apple App Store.</p>
            </article>
            <article className="achievement-card glass reveal">
              <div className="achievement-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
              <h3>Performance Excellence</h3>
              <p>Awarded for maintaining a 100% delivery rate on sprint goals and reducing production-level bugs by 20% through the implementation of automated testing.</p>
            </article>
            <article className="achievement-card glass reveal">
              <div className="achievement-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
              </div>
              <h3>Cross-Platform Expertise</h3>
              <p>Expertly bridged the gap between Web (React) and Mobile (React Native) development, ensuring 95% code reusability across platforms for logistics and ERP solutions.</p>
            </article>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="section-head reveal">
            <p className="eyebrow">Projects</p>
            <h2>Selected work</h2>
          </div>

          <div className="filters reveal" aria-label="Project filters">
            <button
              className={`chip ${projectFilter === "all" ? "active" : ""}`}
              onClick={() => setProjectFilter("all")}
            >
              All
            </button>
            <button
              className={`chip ${projectFilter === "react-native" ? "active" : ""}`}
              onClick={() => setProjectFilter("react-native")}
            >
              React Native
            </button>
            <button
              className={`chip ${projectFilter === "react" ? "active" : ""}`}
              onClick={() => setProjectFilter("react")}
            >
              ReactJS
            </button>
            <button
              className={`chip ${projectFilter === "node" ? "active" : ""}`}
              onClick={() => setProjectFilter("node")}
            >
              Node/Express
            </button>
          </div>

          <p className="section-intro reveal">Showing {filteredProjects.length} projects</p>

          <div className="project-grid">
            {filteredProjects.map((project) => (
              <article className="project-card reveal" key={project.title}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <ul>
                  {project.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <div className="tag-row" aria-label="Technology tags">
                  {project.tags.map((tag) => (
                    <span key={`${project.title}-${tag}`} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="education">
          <div className="section-head reveal">
            <p className="eyebrow">Education</p>
            <h2>Academic background</h2>
          </div>
          <article className="card reveal edu-card">
            <h3>Bachelor of Computer Science</h3>
            <p>Shri Ram Murti Samarak College of Engineering and Technology</p>
            <span>2017 - 2021</span>
          </article>
        </section>

        <section className="section" id="contact">
          <div className="contact-box glass reveal">
            <p className="eyebrow">Contact</p>
            <h2>Let&apos;s build something high-impact.</h2>
            <p>Available for frontend and mobile product engineering opportunities.</p>
            <div className="cta-row">
              <a className="btn" href="mailto:agarwalpriyanshi0153@gmail.com">
                Send Email
              </a>
              <button className="btn btn-ghost" onClick={copyEmail}>
                Copy Email
              </button>
            </div>
            <small aria-live="polite">{copyStatus}</small>
          </div>
        </section>
      </main>

      <footer>
        <p>© {new Date().getFullYear()} Priyanshi Agarwal</p>
      </footer>
    </>
  );
}
