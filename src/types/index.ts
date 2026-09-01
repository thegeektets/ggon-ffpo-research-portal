export type UserRole = 'owner' | 'administrator' | 'editor' | 'reviewer' | 'member';

export type Locale = 'en' | 'fr' | 'pt' | 'es';

export type ResearchStatus = 'published' | 'pending' | 'draft' | 'changes_requested';

export interface User {
  id: string;
  name: string;
  email: string;
  organization: string;
  role: UserRole;
  approved: boolean;
  bio?: string;
}

export interface ResearchItem {
  id: string;
  slug: string;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  authors: string[];
  organization: string;
  year: number;
  geographicScope: 'Global' | 'Regional' | 'National' | 'Community';
  country?: string;
  industrySide: 'Demand' | 'Supply' | 'Both';
  petroleumChain: 'Upstream' | 'Midstream' | 'Downstream' | 'Multiple';
  category:
    | 'Data analysis & strategic insights'
    | 'Policy and regulatory updates'
    | 'Narratives on the Fossil Fuel Phase Out'
    | 'Just transition pathways'
    | 'Ecological and social impacts'
    | 'Finance';
  contentType:
    | 'Policy brief'
    | 'Report'
    | 'Case study'
    | 'Interactive map'
    | 'Infographic'
    | 'Database'
    | 'Tracker'
    | 'Explainer';
  rwgPriorities: string[];
  workingGroups: string[];
  subjects: string[];
  url?: string;
  status: ResearchStatus;
  submittedBy?: string;
  tags: string[];
}

export interface Submission {
  id: string;
  title: string;
  summary: string;
  url: string;
  submittedBy: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected' | 'changes_requested';
  reviewerNote?: string;
}

export interface RegistrationRequest {
  id: string;
  name: string;
  email: string;
  organization: string;
  requestedAt: string;
}

export interface SearchFilters {
  q?: string;
  geographicScope?: string;
  industrySide?: string;
  petroleumChain?: string;
  category?: string;
  contentType?: string;
  year?: string;
  rwgPriority?: string;
  workingGroup?: string;
}
