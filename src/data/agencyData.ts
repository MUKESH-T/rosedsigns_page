import { ServiceItem, ProjectItem, TestimonialItem } from '../types';

export const AGENCY_INFO = {
  name: 'RoseDsigns',
  tagline: 'Ideas that make your brand bloom.',
  subline: 'Creative · Branding · Advertising',
  aboutStory: `Founded on the belief that enduring brands are grown with patience, artistry, and precision, RoseDsigns is an elite creative studio for visionary companies. We intertwine strategic rigor with delicate editorial aesthetics to elevate brands into timeless cultural symbols. From Parisian haute parfumerie to architectural lifestyle and bespoke digital ateliers, our work turns ambition into effortless elegance.`,
  signature: 'Mukesh T. & The RoseDsigns Collective',
  address: '14 Place Vendôme, 75001 Paris / Worldwide Remote',
  email: 'concierge@rosedsigns.agency',
  phone: '+33 1 42 68 55 00',
  whatsapp: 'https://wa.me/33142685500?text=Hello%20RoseDsigns,%20I%20would%20like%20to%20discuss%20a%20project',
  instagram: 'https://instagram.com/rosedsigns',
  linkedin: 'https://linkedin.com/company/rosedsigns',
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'website-design-development',
    number: '01',
    title: 'Website Design & Development',
    displayTitle: 'WEBSITE DESIGN & DEVELOPMENT',
    category: 'Digital Architecture',
    shortTag: 'WEB & DEVELOPMENT',
    shortDescription: 'Website design, development and ongoing maintenance.',
    fullDescription: 'Responsive website layouts, clear navigation and content structure, and ongoing website updates engineered for effortless performance and conversion.',
    iconName: 'Globe',
    subKeywords: ['RESPONSIVE LAYOUTS', 'NAVIGATION', 'CONTENT STRUCTURE', 'MAINTENANCE', 'SPEED & PERFORMANCE'],
    previewImage: '/src/assets/images/project_solstice_web_1794481970391.jpg',
    deliverables: [
      'Responsive website layouts',
      'Clear navigation and content structure',
      'Ongoing website updates',
    ],
    metrics: '99.9% Clean Build Reliability',
    timeline: '4 – 6 Weeks',
  },
  {
    id: 'branding-identity',
    number: '02',
    title: 'Branding & Identity',
    displayTitle: 'BRANDING & IDENTITY',
    category: 'Identity System',
    shortTag: 'CORE ASSETS',
    shortDescription: 'Logos, taglines, colour palettes, typography and brand guidelines.',
    fullDescription: 'Logos, taglines, bespoke colour palettes, typography architecture, and comprehensive brand guidelines for consistent use across all channels.',
    iconName: 'Sparkles',
    subKeywords: ['LOGO & IDENTITY', 'COLOUR PALETTE', 'TYPOGRAPHY', 'BRAND GUIDELINES', 'PRESTIGE ASSETS'],
    previewImage: '/src/assets/images/project_elysian_couture_1794481969436.jpg',
    deliverables: [
      'Logo and visual identity',
      'Colour palette and typography',
      'Brand guidelines for consistent use',
    ],
    metrics: '+210% Brand Distinction',
    timeline: '4 – 6 Weeks',
  },
  {
    id: 'social-media-presence',
    number: '03',
    title: 'Social Media Presence',
    displayTitle: 'SOCIAL MEDIA PRESENCE',
    category: 'Digital Community',
    shortTag: 'SOCIAL ARCHITECTURE',
    shortDescription: 'Profile setup, content planning, creatives and ongoing management.',
    fullDescription: 'Content planning and profile setup, luxury social creatives and captions, and ongoing social media management to cultivate an engaged audience.',
    iconName: 'Compass',
    subKeywords: ['CONTENT PLANNING', 'PROFILE SETUP', 'SOCIAL CREATIVES', 'CAPTIONS', 'ACCOUNT MANAGEMENT'],
    previewImage: '/src/assets/images/agency_about_studio_1794481968429.jpg',
    deliverables: [
      'Content planning and profile setup',
      'Social creatives and captions',
      'Ongoing social media management',
    ],
    metrics: '+180% Engagement Growth',
    timeline: 'Ongoing / Sprints',
  },
  {
    id: 'seo-digital-visibility',
    number: '04',
    title: 'SEO & Digital Visibility',
    displayTitle: 'SEO & DIGITAL VISIBILITY',
    category: 'Search & Authority',
    shortTag: 'SEARCH & DISCOVERY',
    shortDescription: 'Website and local search optimisation, with consistent social visibility.',
    fullDescription: 'Website search optimisation, local search visibility, and consistent business information calibrated for high search ranking and authority.',
    iconName: 'Target',
    subKeywords: ['WEBSITE SEO', 'LOCAL SEARCH', 'BUSINESS INFO', 'ORGANIC VISIBILITY', 'INDEXING'],
    previewImage: '/src/assets/images/project_lumiere_perfume_1794481969471.jpg',
    deliverables: [
      'Website search optimisation',
      'Local search visibility',
      'Consistent business information',
    ],
    metrics: '+340% Organic Inbound',
    timeline: '3 – 5 Weeks',
  },
  {
    id: 'whatsapp-business-integration',
    number: '05',
    title: 'WhatsApp Business Integration',
    displayTitle: 'WHATSAPP BUSINESS INTEGRATION',
    category: 'Direct Concierge',
    shortTag: 'CONCIERGE & COMMERCE',
    shortDescription: 'Enquiry links, QR codes and connections across websites and campaigns.',
    fullDescription: 'WhatsApp enquiry journeys, QR codes and click-to-chat links, and seamless website and campaign connections for frictionless client enquiries.',
    iconName: 'Globe',
    subKeywords: ['ENQUIRY JOURNEYS', 'QR CODES', 'CLICK TO CHAT', 'WEBSITE CONNECTIONS', 'VIP DIRECT'],
    previewImage: '/src/assets/images/service_whatsapp_concierge_1794490069075.jpg',
    deliverables: [
      'WhatsApp enquiry journeys',
      'QR codes and click-to-chat links',
      'Website and campaign connections',
    ],
    metrics: '+85% Direct Conversion Speed',
    timeline: '2 – 3 Weeks',
  },
  {
    id: 'google-business-profile-management',
    number: '06',
    title: 'Google Business Profile Management',
    displayTitle: 'GOOGLE BUSINESS PROFILE',
    category: 'Local Reputation',
    shortTag: 'LOCAL PRESENCE',
    shortDescription: 'Profile setup, optimisation, location management and review support.',
    fullDescription: 'Business profile setup and updates, location information and optimisation, and active review support and management for verified trust.',
    iconName: 'Crown',
    subKeywords: ['PROFILE SETUP', 'LOCATION MANAGEMENT', 'OPTIMISATION', 'REVIEW SUPPORT', 'MAP VISIBILITY'],
    previewImage: '/src/assets/images/service_google_storefront_1794490085014.jpg',
    deliverables: [
      'Business profile setup and updates',
      'Location information and optimisation',
      'Review support and management',
    ],
    metrics: 'Top 3 Local Map Rankings',
    timeline: 'Ongoing / Sprints',
  },
  {
    id: 'graphics-video-advertising',
    number: '07',
    title: 'Graphics & Video for Advertising',
    displayTitle: 'GRAPHICS & VIDEO ADVERTISING',
    category: 'Campaign Creative',
    shortTag: 'CAMPAIGN ASSETS',
    shortDescription: 'Campaign graphics, promotional videos, reels and digital advertisements.',
    fullDescription: 'High-impact campaign and promotional graphics, reels and advertising videos, and bespoke creative assets adapted for all digital channels.',
    iconName: 'Camera',
    subKeywords: ['PROMOTIONAL GRAPHICS', 'REELS & TIKTOK', 'ADVERTISING VIDEOS', 'DIGITAL CHANNELS', 'HIGH CONVERSION'],
    previewImage: '/src/assets/images/service_cinema_advertising_1794490098566.jpg',
    deliverables: [
      'Campaign and promotional graphics',
      'Reels and advertising videos',
      'Creative adapted for digital channels',
    ],
    metrics: '4.8x Average Ad ROAS',
    timeline: '3 – 5 Weeks',
  },
  {
    id: 'analytics-tracking-reporting',
    number: '08',
    title: 'Analytics, Tracking & Reporting',
    displayTitle: 'ANALYTICS & REPORTING',
    category: 'Performance Intelligence',
    shortTag: 'DATA & METRICS',
    shortDescription: 'Website and campaign tracking, performance analysis and clear reporting.',
    fullDescription: 'Comprehensive website and campaign measurement, data-driven performance analysis, and clear executive reporting to guide your next strategic moves.',
    iconName: 'Sparkles',
    subKeywords: ['CAMPAIGN TRACKING', 'MEASUREMENT', 'PERFORMANCE ANALYSIS', 'EXECUTIVE REPORTING', 'NEXT STEPS'],
    previewImage: '/src/assets/images/service_luxury_analytics_1794490113011.jpg',
    deliverables: [
      'Website and campaign measurement',
      'Performance analysis',
      'Clear reporting to guide next steps',
    ],
    metrics: '100% Data Clarity & ROI Insight',
    timeline: 'Monthly Cadence',
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'lumiere-parfums',
    title: 'Lumière Bespoke Parfumerie',
    category: 'Branding',
    client: 'Maison Lumière',
    year: '2026',
    image: '/src/assets/images/project_lumiere_perfume_1794481969471.jpg',
    tagline: 'The Sensory Architecture of Fine Fragrance',
    brief: 'A century-old Grasse fragrance atelier needed a complete identity renaissance to capture a new generation of discerning global connoisseurs without diluting its ancestral prestige.',
    challenge: 'Reconciling antique artisanal French perfumery with modern digital-first tactile luxury. The packaging had to feel both museum-worthy and sustainably progressive.',
    strategy: 'We developed an embossed antique gold emblem with a blooming rose filigree, paired with heavy flacon glass on raw Italian travertine. Every bottle carries an individually numbered wax seal.',
    results: [
      { metric: '+210%', label: 'Direct Private Orders' },
      { metric: '98.4%', label: 'Five-Star Unboxing Reviews' },
      { metric: '14 Countries', label: 'Global Retail Expansion' }
    ],
    deliverables: ['Identity System', 'Glass Bottle Design', 'Bespoke Typography', 'Luxury Travertine Packaging', 'Editorial Photography'],
    testimonial: {
      quote: 'RoseDsigns captured the invisible poetry of our scents. Their attention to nuance gave our heritage flacon an iconic modern soul.',
      author: 'Camille Saint-Laurent',
      role: 'Head of Brand, Maison Lumière'
    }
  },
  {
    id: 'maison-leonie',
    title: 'Maison Léonie Haute Couture',
    category: 'Branding',
    client: 'Léonie Couture Paris',
    year: '2025',
    image: '/src/assets/images/project_elysian_couture_1794481969436.jpg',
    tagline: 'Poetic Tailoring Meets Regal Gold Gilding',
    brief: 'Parisian fashion house required a comprehensive visual identity and VIP client unboxing suite for their Autumn/Winter Haute Couture collection.',
    challenge: 'Differentiating the house from generic luxury fashion houses by creating a ceremonial unboxing ritual that clients would cherish for decades.',
    strategy: 'We crafted gold-foil embossed keepsake presentation boxes with deep burgundy velvet ribbons and an archival hardbound catalog celebrating artisanal dressmaking techniques.',
    results: [
      { metric: '100%', label: 'Private Salon Sold-Out' },
      { metric: '4.2x', label: 'Editorial Press Coverage' },
      { metric: '+140%', label: 'Client Lifetime Value' }
    ],
    deliverables: ['Archival Lookbook', 'Gold Gilded Presentation Box', 'Silk Ribbon System', 'VIP Invitation Calligraphy', 'Salon Signage'],
    testimonial: {
      quote: 'RoseDsigns understood our heritage immediately. In 4 months, our private salon bookings surged beyond our highest expectations.',
      author: 'Hélène De Montmirail',
      role: 'Creative Director, Maison Léonie'
    }
  },
  {
    id: 'aurelia-atelier',
    title: 'Aurélia Fine Jewelry Flagship',
    category: 'Web',
    client: 'Aurélia Jewelry London',
    year: '2026',
    image: '/src/assets/images/project_solstice_web_1794481970391.jpg',
    tagline: 'Structural Elegance on an Interactive Digital Plinth',
    brief: 'A London-based architectural goldsmith needed a bespoke eCommerce web atelier to sell four-figure handcrafted statement pieces online.',
    challenge: 'Overcoming consumer hesitation when buying high-value jewelry online through immersive high-definition tactile zoom, 360-degree inspection, and concierge booking.',
    strategy: 'We designed a serene, warm ivory digital flagship with fluid motion physics, custom ring-sizing guide, private virtual viewing scheduler, and a frictionless 2-step checkout.',
    results: [
      { metric: '+88%', label: 'Online Sales Volume' },
      { metric: '4m 32s', label: 'Average On-Site Dwell' },
      { metric: '0.8s', label: 'Global Page Load Speed' }
    ],
    deliverables: ['Headless eCommerce Experience', 'Interactive 360 Product Plinth', 'Custom Ring Sizer Logic', 'VIP Concierge Booking Engine', 'Mobile-First Ergonomics'],
    testimonial: {
      quote: 'The digital atelier feels like walking into an exclusive boutique on Bond Street. Flawless aesthetic discipline paired with unmatched commercial conversion.',
      author: 'Julian Vance',
      role: 'Founder & CEO, Aurélia'
    }
  },
  {
    id: 'botanique-botanica',
    title: 'Botanique Botanical Elixirs',
    category: 'Social',
    client: 'Botanique Skincare Switzerland',
    year: '2025',
    image: '/src/assets/images/project_lumiere_perfume_1794481969471.jpg',
    tagline: 'High-Elevation Flora & Sensorial Wellness',
    brief: 'Swiss high-elevation organic skincare brand seeking an elevated social storytelling strategy that communicates alpine purity and scientific extraction.',
    challenge: 'Moving away from greenwashed beauty tropes to establish a scientific yet deeply romantic aesthetic for organic botanical serums.',
    strategy: 'Designed a monthly editorial visual calendar with macro ingredient botanical photography, apothecary glass textures, and mindful daily ritual reels.',
    results: [
      { metric: '+320%', label: 'Organic Instagram Community' },
      { metric: '5.2%', label: 'Consistent Reel Engagement' },
      { metric: '65k', label: 'Email Newsletter Subscribers' }
    ],
    deliverables: ['Social Content Strategy', 'Macro Botanical Photography', 'Editorial Video Reels', 'Influencer Gifting Curation', 'Community Playbook'],
    testimonial: {
      quote: 'Our social engagement went from stagnant to phenomenal. RoseDsigns made botanical science look like fine art.',
      author: 'Dr. Clara Zimmerman',
      role: 'Co-Founder, Botanique'
    }
  },
  {
    id: 'valmont-horology',
    title: 'Valmont Geneva Chronographs',
    category: 'Web',
    client: 'Valmont Watchmakers',
    year: '2026',
    image: '/src/assets/images/project_solstice_web_1794481970391.jpg',
    tagline: 'Swiss Precision Engineered in Digital Micro-Detail',
    brief: 'Independent Swiss mechanical watch manufacture requested a digital showroom showcasing tourbillon escapements with real-time interactive movement demonstrations.',
    challenge: 'Translating micron-level watchmaker craftsmanship into high-performance web animations that load smoothly across all mobile devices.',
    strategy: 'Engineered an interactive timepiece customizer where collectors can explore bezel metals, alligator straps, and watch movements in real-time lighting.',
    results: [
      { metric: '1,200+', label: 'Pre-Orders in 72 Hours' },
      { metric: '$4.6M', label: 'Launch Order Value' },
      { metric: 'Awwwards', label: 'Site of the Day Nominee' }
    ],
    deliverables: ['WebGL Watch Customizer', 'Sound Design Integration', 'Technical Spec Sheets', 'Concierge Appointment Scheduler', 'Collector Portal'],
    testimonial: {
      quote: 'Their technical execution matched the strict tolerances of our horological watchmakers. A triumph of digital craftsmanship.',
      author: 'Marc-André Vulliet',
      role: 'Master Watchmaker, Valmont'
    }
  },
  {
    id: 'elysee-lifestyle',
    title: 'Élysée Architectural Living',
    category: 'Social',
    client: 'Élysée Real Estate & Design',
    year: '2025',
    image: '/src/assets/images/agency_about_studio_1794481968429.jpg',
    tagline: 'Private Mediterranean Residences & Spatial Tranquility',
    brief: 'Ultra-prime architectural real estate brokerage specializing in private villas across Côte d’Azur and Monaco required a discreet social acquisition strategy.',
    challenge: 'Reaching Ultra-High-Net-Worth individuals without vulgar sales pitches or noisy promotional tactics.',
    strategy: 'Created an exclusive "Architectural Solitude" video narrative series highlighting limestone textures, natural light, and private ocean vistas.',
    results: [
      { metric: '3 Estates', label: 'Sold Directly via Inquiries' },
      { metric: '€34M', label: 'Total Transaction Volume' },
      { metric: '82%', label: 'Private Family Office Leads' }
    ],
    deliverables: ['Architectural Drone Films', 'Private Listing Dossiers', 'Curated Editorial LinkedIn & IG', 'Ultra-VIP Direct Mail Suites', 'Quarterly Market Journal'],
    testimonial: {
      quote: 'RoseDsigns understands that true luxury whispers. They connected us with the most discerning buyers on earth with absolute discretion.',
      author: 'Jean-Paul Delacroix',
      role: 'Managing Partner, Élysée Living'
    }
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: '1',
    quote: 'RoseDsigns transformed our heritage house into an iconic contemporary narrative. In 4 months, our direct private salon bookings surged by 180% with zero loss of exclusivity.',
    author: 'Hélène De Montmirail',
    title: 'Creative Director & Founder',
    company: 'Maison Léonie Couture Paris',
    location: 'Paris, France',
    result: '+180% Private Salon Bookings'
  },
  {
    id: '2',
    quote: 'The digital atelier they engineered feels like walking into an exclusive boutique on Bond Street. Flawless aesthetic discipline paired with unmatched commercial conversion.',
    author: 'Julian Vance',
    title: 'Chief Executive Officer',
    company: 'Aurélia Fine Jewelry',
    location: 'London, UK',
    result: '+88% eCommerce Sales Volume'
  },
  {
    id: '3',
    quote: 'Working with RoseDsigns was a masterclass in subtlety and elegance. Their team understood the invisible poetry of our fragrances and translated it into pure gold.',
    author: 'Camille Saint-Laurent',
    title: 'Head of Global Brand',
    company: 'Maison Lumière Parfums',
    location: 'Grasse, France',
    result: '14 New International Markets'
  }
];

export const STATS_DATA = [
  { value: 140, suffix: '+', label: 'Bespoke Projects Delivered', sub: 'Across 16 Global Capitals' },
  { value: 98, suffix: '%', label: 'Happy Client Retention', sub: 'Multi-Year Brand Partnerships' },
  { value: 8, suffix: '+', label: 'Years of Excellence', sub: 'Dedicated to Timeless Design' }
];

export const FAQ_DATA = [
  {
    question: 'What is the RoseDsigns methodology?',
    answer: 'We call our signature process "The Blossom Framework" — a 4-phase journey comprising Root (deep brand discovery & market positioning), Stem (strategic design architecture & core identities), Petal (tactile execution, digital crafting & asset creation), and Bloom (omnichannel launch & continuous brand amplification).'
  },
  {
    question: 'How do you handle client confidentiality & exclusivity?',
    answer: 'We work with a select roster of maximum 4 major clients simultaneously per quarter. Every engagement includes strict mutual NDA agreements, ensuring bespoke designs remain exclusively yours and never replicated.'
  },
  {
    question: 'What are typical project timelines?',
    answer: 'Visual identity sprints typically span 4 to 6 weeks. Complete digital flagships (web design & custom development) take 6 to 8 weeks. Comprehensive 360-degree brand launch campaigns average 8 to 12 weeks.'
  },
  {
    question: 'Do you offer ongoing creative advisory retainers?',
    answer: 'Yes. After launching your core brand or digital atelier, we offer dedicated creative director retainers covering monthly social direction, campaign production, digital enhancements, and conversion optimization.'
  }
];
