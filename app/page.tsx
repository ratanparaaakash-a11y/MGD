"use client";

import { useEffect, useState } from "react";
import { ShowcaseScene } from "@/components/ShowcaseScene";

const stats = [
  { label: "Strength", value: 82 },
  { label: "Agility", value: 74 },
  { label: "Armor", value: 91 },
  { label: "Speed", value: 80 },
  { label: "Power", value: 99 }
];

const services = [
  {
    label: "01",
    title: "Game Development",
    text: "Unity-powered gameplay systems, prototypes, and polished interactive worlds."
  },
  {
    label: "02",
    title: "AR Applications",
    text: "Immersive mobile AR tools for products, learning, previews, and branded moments."
  },
  {
    label: "03",
    title: "VR Experiences",
    text: "Virtual spaces, guided experiences, and hands-on simulations built for presence."
  },
  {
    label: "04",
    title: "Architectural Walkthrough",
    text: "Real-time spaces that help clients explore interiors, exteriors, and layouts."
  },
  {
    label: "05",
    title: "Training Simulations",
    text: "Interactive modules for operations, safety, onboarding, and technical practice."
  },
  {
    label: "06",
    title: "Product Visualization",
    text: "High-detail 3D assets and product scenes for launches, demos, and configurators."
  }
];

const processSteps = [
  { step: "01", title: "Discover", text: "Understand your idea, users, goals, and target platform." },
  { step: "02", title: "Design", text: "Shape characters, props, spaces, and visual systems in Blender." },
  { step: "03", title: "Develop", text: "Bring the experience to life with Unity interactions and polish." },
  { step: "04", title: "Deliver", text: "Prepare builds and assets for web, mobile, desktop, or headset." }
];

const projects = [
  { title: "Mech Arena Prototype", category: "Game" },
  { title: "Industrial VR Trainer", category: "Simulation" },
  { title: "Interactive Product Bay", category: "Visualization" }
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [statProgress, setStatProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => setIsScrolled(window.scrollY > 24);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });

    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {
    let frameId = 0;
    const startedAt = performance.now();
    const duration = 1500;

    const updateStats = (time: number) => {
      const progress = Math.min((time - startedAt) / duration, 1);
      setStatProgress(progress);

      if (progress < 1) {
        frameId = requestAnimationFrame(updateStats);
      }
    };

    frameId = requestAnimationFrame(updateStats);

    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <main className="showcase-shell" id="home">
      <header className={`site-header ${isScrolled ? "site-header--solid" : ""}`} aria-label="Main navigation">
        <a className="site-brand" href="#home" aria-label="Mukta home">
          <span className="brand-mark" aria-hidden="true" />
          <span>
            <strong>MUKTA</strong>
            <small>GAME & DEVELOPMENT</small>
          </span>
        </a>
        <nav className="site-nav" aria-label="Website sections">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#about">About us</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-cta" href="#contact">
          Start a Project
        </a>
      </header>

      <section className="hero-section" aria-label="Mukta Game and Development">
        <div className="title-backdrop" aria-hidden="true">
          MUKTA
        </div>

        <ShowcaseScene autoRotate={true} animationMode="idle" zoomSignal={0} />

        <div className="hero-copy">
          <p className="hero-kicker">Blender + Unity Studio</p>
          <h1>
            <span>WE BUILD</span>
            <span className="text-red">WORLDS</span>
            <span>IN 3D.</span>
          </h1>
          <p>
            Blender + Unity powered studio crafting games, AR/VR apps, simulations, and
            interactive 3D experiences.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">
              See Our Work
            </a>
            <a className="button button-secondary" href="#services">
              What We Do
            </a>
          </div>
        </div>

        <aside className="stats-panel" aria-label="Unit stats">
          <p>UNIT STATS</p>
          {stats.map((stat) => {
            const currentValue = Math.round(stat.value * statProgress);

            return (
              <div className="stat-row" key={stat.label}>
                <div className="stat-meta">
                  <span>{stat.label}</span>
                  <strong>{currentValue}</strong>
                </div>
                <div className="stat-track" aria-hidden="true">
                  <span style={{ width: `${stat.value * statProgress}%` }} />
                </div>
              </div>
            );
          })}
          <div className="ability-tags" aria-label="Abilities">
            <span>COMBAT READY</span>
            <span>STEALTH</span>
            <span>HEAVY ARMOR</span>
          </div>
        </aside>

        <a className="scroll-cue" href="#services" aria-label="Scroll to explore">
          <span aria-hidden="true" />
          <strong>SCROLL TO EXPLORE</strong>
        </a>
      </section>

      <section className="content-section services-section reveal-section" id="services">
        <div className="section-heading">
          <p>Services</p>
          <h2>WHAT WE BUILD</h2>
          <span>From mobile games to industrial VR, our stack does it all.</span>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <span>{service.label}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section process-section reveal-section" id="about">
        <div className="section-heading">
          <p>Process</p>
          <h2>HOW WE WORK</h2>
          <span>A clear path from rough concept to playable, presentable experience.</span>
        </div>
        <div className="process-grid">
          {processSteps.map((item) => (
            <article className="process-card" key={item.step}>
              <span>{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section work-section reveal-section" id="work">
        <div className="section-heading">
          <p>Portfolio</p>
          <h2>OUR WORK</h2>
          <span>Preview projects shaped for games, simulation, training, and product storytelling.</span>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <span>{project.category}</span>
              <h3>{project.title}</h3>
              <a href="#contact">View Project -&gt;</a>
            </article>
          ))}
        </div>
        <a className="button button-primary portfolio-link" href="#contact">
          See Full Portfolio -&gt;
        </a>
      </section>

      <section className="cta-banner reveal-section" id="contact">
        <div>
          <h2>READY TO BUILD YOUR WORLD?</h2>
          <p>Tell us your idea. We make it real in 3D.</p>
        </div>
        <a href="mailto:hello@muktagamedev.com">START A PROJECT -&gt;</a>
      </section>

      <footer className="site-footer">
        <div className="footer-grid">
          <div>
            <a className="footer-brand" href="#home">
              MUKTA
            </a>
            <p>GAME & DEVELOPMENT</p>
            <span>Blender and Unity studio for games, simulations, and interactive 3D.</span>
          </div>
          <div>
            <h3>Quick Links</h3>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#work">Portfolio</a>
            <a href="#contact">Contact</a>
          </div>
          <div>
            <h3>Services</h3>
            <a href="#services">Game Development</a>
            <a href="#services">AR Applications</a>
            <a href="#services">VR Experiences</a>
            <a href="#services">Product Visualization</a>
          </div>
          <div>
            <h3>Contact</h3>
            <a href="mailto:hello@muktagamedev.com">hello@muktagamedev.com</a>
            <a href="tel:+910000000000">+91 00000 00000</a>
            <span>India</span>
            <div className="social-links">
              <a href="#contact">GitHub</a>
              <a href="#contact">LinkedIn</a>
              <a href="#contact">Instagram</a>
              <a href="#contact">YouTube</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          Copyright 2025 Mukta Game and Development. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
