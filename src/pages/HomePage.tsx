import React, { useRef } from 'react';
import { Hero } from '../components/home/Hero';
import { AboutSection } from '../components/home/AboutSection';
import { ServicesSection } from '../components/home/ServicesSection';
import { ProjectsSection } from '../components/home/ProjectsSection';
import { ContactSection } from '../components/home/ContactSection';
import { RoseScrollAnimation } from '../components/RoseScrollAnimation';

export const HomePage: React.FC = () => {
  const homeRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={homeRef} className="relative w-full">
      {/* Scroll-Driven Blooming Rose following Curvy Road from right to left */}
      <RoseScrollAnimation journeyRef={journeyRef} containerRef={homeRef} />

      {/* Hero & About Journey Track (where the blooming rose travels and vanishes at the end of About) */}
      <div id="hero-about-journey" ref={journeyRef} className="relative w-full overflow-hidden">
        <Hero onExploreWork={scrollToProjects} onTalk={scrollToContact} />
        <AboutSection />
      </div>

      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
};
