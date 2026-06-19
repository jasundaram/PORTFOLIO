export type ProjectCategory = 'all' | 'design' | 'photography';

export interface ProjectMetadata {
  [key: string]: string;
}

export interface CaseStudy {
  goal: string;
  process: string;
  outcome: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'design' | 'photography';
  subCategory: string;
  image: string;
  beforeImage?: string; // Optional before image for comparison feature
  description: string;
  year: string;
  metadata: ProjectMetadata; // e.g. "Camera": "Leica M11", "Lens": "Summilux 50mm f/1.4"
  tags: string[];
  palette: string[]; // dominant HEX colors
  caseStudy?: CaseStudy; // Extended case study data
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export interface GearItem {
  name: string;
  category: string;
  specs: string;
}
