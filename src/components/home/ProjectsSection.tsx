import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight, Clapperboard, Globe, Share2, type LucideIcon } from 'lucide-react';
import PROJECTS_DATA from '../../data/projects';

const FILTERS = ['All', 'Web', 'Social', 'Video'] as const;

const categoryIcons: Record<string, LucideIcon> = {
  Web: Globe,
  Social: Share2,
  Video: Clapperboard,
};

export const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>('All');
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  const visibleProjects = PROJECTS_DATA.filter(
    (project) => activeFilter === 'All' || project.categories.includes(activeFilter),
  );

  return (
    <section
      id="projects"
      className="py-20 sm:py-28 lg:py-32 relative bg-[#F7F3EC] text-[#171514] overflow-hidden bg-grain select-none"
    >
      {/* Soft Radial Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-tr from-[#A76570]/18 via-[#D9B1AE]/10 to-[#B08A57]/10 rounded-full filter blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Top Header Row with Ghost Layered "Work" Typography (Exact match to reference image) */}
        <div className="flex items-start justify-between gap-6 mb-12 sm:mb-16">
          {/* Left subtle kicker */}
          <div className="pt-2 sm:pt-4">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[#B08A57] font-sans font-medium">
              <span>✦</span>
              <span>RoseDsigns</span>
              <span>✦</span>
            </div>
            
          </div>

          {/* Right Layered "Work" Typography Header (Exact detail from reference image) */}
          <div className="relative select-none text-right">
            <span className="block font-sans font-black tracking-tight text-5xl sm:text-7xl lg:text-8xl text-[#171514] leading-none drop-shadow-sm">
              Work
            </span>
            <span
              className="block font-sans font-black tracking-tight text-4xl sm:text-6xl lg:text-7xl text-[#171514]/12 -mt-3 sm:-mt-5 leading-none pointer-events-none"
              aria-hidden="true"
            >
              Work
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-10" role="tablist" aria-label="Filter projects">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              role="tab"
              aria-selected={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] font-sans border transition-colors ${
                activeFilter === filter
                  ? 'bg-[#171514] text-[#F7F3EC] border-[#171514]'
                  : 'text-[#3C3C3C] border-[#B08A57]/35 hover:border-[#B08A57] hover:text-[#171514]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {visibleProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-[#B08A57]/40 bg-[#171514] shadow-2xl transition-all duration-500 hover:shadow-[0_24px_50px_rgba(0,0,0,0.5)] hover:-translate-y-1.5 flex flex-col justify-between min-h-[440px] sm:min-h-[500px] lg:min-h-[540px] p-6 sm:p-7"
            >
              <Link to={`/projects/${project.id}`} className="absolute inset-0 z-20" aria-label={`View ${project.title} project`} />
              <div className="absolute inset-0 z-0 overflow-hidden bg-[#D9B1AE]">
                {!brokenImages[project.id] && (
                  <img
                    src={project.cover}
                    alt={project.gallery[0].alt}
                    className="w-full h-full object-cover filter contrast-105 group-hover:scale-110 transition-transform duration-700 ease-out opacity-85"
                    loading="lazy"
                    onError={() => setBrokenImages((current) => ({ ...current, [project.id]: true }))}
                  />
                )}
                {brokenImages[project.id] && (
                  <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-[#672D39] font-editorial text-2xl">
                    {project.title}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#171514]/95 via-[#171514]/30 to-transparent" />
              </div>

              <div className="relative z-10 flex items-start justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.categories.map((category) => (
                    <span
                      key={category}
                      className="px-3 py-1 rounded-full bg-[#171514]/75 backdrop-blur-md border border-[#F7F3EC]/20 text-[10px] uppercase tracking-[0.2em] text-[#E8E2D8] font-medium"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#D9B1AE] shrink-0" />
              </div>

              <div className="relative z-10 mt-auto pt-24 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-2 mb-2 text-[#D9B1AE]">
                  {project.categories.map((category) => {
                    const Icon = categoryIcons[category];
                    return <Icon key={category} className="w-3.5 h-3.5" aria-hidden="true" />;
                  })}
                </div>
                <h3 className="text-2xl sm:text-3xl font-editorial font-light text-[#F7F3EC] leading-tight drop-shadow-md">
                  {project.title}
                </h3>
                <p className="max-h-0 overflow-hidden opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500 text-xs text-[#E8E2D8]/80 font-sans leading-relaxed mt-0 group-hover:mt-2">
                  {project.summary}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 text-center text-[10px] uppercase tracking-[0.22em] text-[#3C3C3C]/60 font-sans">
          Selected work from rosedsigns.com
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
