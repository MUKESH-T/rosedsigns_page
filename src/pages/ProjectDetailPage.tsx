import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clapperboard,
  ExternalLink,
  Globe,
  Share2,
  X,
} from 'lucide-react';
import PROJECTS_DATA from '../data/projects';

const deliverableIcons = {
  web: Globe,
  social: Share2,
  video: Clapperboard,
};

const LiveLink: React.FC<{ label: string; url: string; type: string }> = ({ label, url, type }) => {
  const Icon = deliverableIcons[type as keyof typeof deliverableIcons] || ExternalLink;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-3 bg-[#FDFBF7] hover:bg-[#171514] text-[#171514] hover:text-[#F7F3EC] border border-[#B08A57]/35 rounded-sm text-xs uppercase tracking-[0.14em] transition-colors"
    >
      <Icon className="w-3.5 h-3.5 text-[#A76570]" aria-hidden="true" />
      <span>{label}</span>
      <ExternalLink className="w-3.5 h-3.5 ml-1" aria-hidden="true" />
    </a>
  );
};

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  const currentIndex = PROJECTS_DATA.findIndex((project) => project.id === id);
  const project = currentIndex !== -1 ? PROJECTS_DATA[currentIndex] : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLightboxIndex(null);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen pt-36 pb-20 flex flex-col items-center justify-center text-center px-6 bg-[#F7F3EC] bg-grain">
        <h1 className="font-editorial text-4xl sm:text-5xl text-[#171514] mb-4">Project Not Found</h1>
        <p className="text-sm text-[#3C3C3C]/75 mb-8 font-sans">
          The requested project could not be located.
        </p>
        <Link to="/#projects" className="px-6 py-3 bg-[#171514] text-[#F7F3EC] text-xs uppercase tracking-[0.2em] rounded-sm">
          Return to Work
        </Link>
      </div>
    );
  }

  const nextProject = PROJECTS_DATA[(currentIndex + 1) % PROJECTS_DATA.length];
  const activeImage = lightboxIndex === null ? null : project.gallery[lightboxIndex];

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#F7F3EC] bg-grain min-h-screen text-[#171514]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="mb-10 flex items-center justify-between">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B08A57] hover:text-[#171514] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Work</span>
          </Link>
          <div className="text-xs font-mono tabular-nums text-[#3C3C3C]/60">
            0{currentIndex + 1} / 0{PROJECTS_DATA.length}
          </div>
        </div>

        <div className="max-w-4xl mb-12">
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B08A57] font-sans font-medium mb-4">
            {project.categories.map((category, index) => (
              <React.Fragment key={category}>
                {index > 0 && <span>✦</span>}
                <span>{category}</span>
              </React.Fragment>
            ))}
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-editorial font-light tracking-tight leading-[1.08] mb-6">
            {project.title}
          </h1>
          <p className="text-lg sm:text-xl font-editorial italic text-[#A76570] font-normal leading-relaxed">
            {project.summary}
          </p>
        </div>

        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm border border-[#B08A57]/30 shadow-2xl mb-16 bg-[#D9B1AE]">
          {!brokenImages.hero && (
            <img
              src={project.cover}
              alt={project.gallery[0].alt}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={() => setBrokenImages((current) => ({ ...current, hero: true }))}
            />
          )}
          {brokenImages.hero && (
            <div className="absolute inset-0 flex items-center justify-center text-[#672D39] font-editorial text-3xl">
              {project.title}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#171514]/35 via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
          <div className="lg:col-span-7">
            <div className="text-xs uppercase tracking-[0.22em] text-[#B08A57] font-sans font-medium mb-3">
              Overview
            </div>
            <h2 className="text-2xl sm:text-3xl font-editorial font-medium mb-4">The project</h2>
            <p className="text-base text-[#3C3C3C]/85 font-sans leading-relaxed font-light">{project.summary}</p>
          </div>

          <div className="lg:col-span-5 bg-[#FDFBF7] p-8 rounded-sm border border-[#B08A57]/30">
            <div className="text-xs uppercase tracking-[0.2em] font-medium font-sans mb-6 pb-2 border-b border-[#B08A57]/20">
              What we delivered
            </div>
            <ul className="space-y-4">
              {project.deliverables.map((item) => {
                const Icon = deliverableIcons[item.type as keyof typeof deliverableIcons] || CheckCircle2;
                return (
                  <li key={item.label} className="flex items-center gap-3 text-sm font-sans">
                    <Icon className="w-4 h-4 text-[#A76570] shrink-0" aria-hidden="true" />
                    <span>{item.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mb-20">
          <div className="flex items-end justify-between gap-6 mb-6">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-[#B08A57] font-sans font-medium mb-3">
                Selected imagery
              </div>
              <h2 className="text-2xl sm:text-3xl font-editorial font-medium">Project gallery</h2>
            </div>
            <span className="hidden sm:block text-[10px] uppercase tracking-[0.2em] text-[#3C3C3C]/60">
              Click to enlarge
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {project.gallery.map((image, index) => (
              <button
                type="button"
                key={image.src}
                onClick={() => setLightboxIndex(index)}
                className="group relative aspect-[4/3] overflow-hidden rounded-sm border border-[#B08A57]/25 bg-[#D9B1AE] text-left"
                aria-label={`Open ${image.alt}`}
              >
                {!brokenImages[`gallery-${index}`] && (
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={() => setBrokenImages((current) => ({ ...current, [`gallery-${index}`]: true }))}
                  />
                )}
                {brokenImages[`gallery-${index}`] && (
                  <span className="absolute inset-0 flex items-center justify-center px-5 text-center text-[#672D39] font-editorial text-xl">
                    {image.alt}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <div className="text-xs uppercase tracking-[0.22em] text-[#B08A57] font-sans font-medium mb-3">
            See it live
          </div>
          <div className="flex flex-wrap gap-3">
            {project.links.map((link) => (
              <LiveLink key={link.url} {...link} />
            ))}
          </div>
        </div>

        <div className="mb-20 flex justify-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-4 bg-[#A76570] hover:bg-[#8C525C] text-[#F7F3EC] text-xs uppercase tracking-[0.2em] font-medium rounded-sm transition-colors gold-shimmer"
          >
            <span>Want results like this? Let's talk</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="pt-16 border-t border-[#B08A57]/30">
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#B08A57] font-sans mb-4">Next project</div>
          <Link
            to={`/projects/${nextProject.id}`}
            className="group flex flex-col sm:flex-row sm:items-center justify-between p-8 bg-[#FDFBF7] hover:bg-[#171514] text-[#171514] hover:text-[#F7F3EC] rounded-sm border border-[#B08A57]/30 transition-all duration-500 shadow-sm hover:shadow-xl"
          >
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#A76570] group-hover:text-[#D9B1AE] transition-colors block mb-1">
                {nextProject.categories.join(' · ')}
              </span>
              <h3 className="font-editorial text-3xl sm:text-4xl font-light">{nextProject.title}</h3>
            </div>
            <div className="mt-6 sm:mt-0 flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-medium text-[#B08A57] group-hover:text-[#D9B1AE] transition-colors">
              <span>View next project</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </Link>
        </div>
      </div>

      {activeImage && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-[#171514]/95 p-6 sm:p-10 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Project image lightbox"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute top-5 right-5 p-2 text-[#F7F3EC] hover:text-[#D9B1AE]"
            aria-label="Close image"
          >
            <X className="w-6 h-6" />
          </button>
          {brokenImages[`lightbox-${lightboxIndex}`] ? (
            <div className="text-center text-[#D9B1AE] font-editorial text-2xl">{activeImage.alt}</div>
          ) : (
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className="max-w-full max-h-full object-contain"
              loading="lazy"
              onError={() =>
                setBrokenImages((current) => ({ ...current, [`lightbox-${lightboxIndex}`]: true }))
              }
              onClick={(event) => event.stopPropagation()}
            />
          )}
        </div>
      )}
    </div>
  );
};
