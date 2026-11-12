export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  displayTitle?: string;
  category: string;
  shortTag?: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  deliverables: string[];
  subKeywords: string[];
  previewImage: string;
  metrics: string;
  timeline: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Branding' | 'Social' | 'Web';
  client: string;
  year: string;
  image: string;
  tagline: string;
  brief: string;
  challenge: string;
  strategy: string;
  results: {
    metric: string;
    label: string;
  }[];
  deliverables: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  title: string;
  company: string;
  location: string;
  result: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  service: string;
  budget?: string;
  message: string;
}
