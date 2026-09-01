export interface PriorityTheme {
  title: string;
  description: string;
  /** Exact `ResearchItem.category` value used for resource counts and library filters */
  category: string;
  href: string;
}

export const priorityThemes: PriorityTheme[] = [
  {
    title: 'Finance',
    category: 'Finance',
    description: 'Tracks public finance flows, subsidies, and divestment campaigns targeting fossil fuel expansion.',
    href: `/library?category=${encodeURIComponent('Finance')}`,
  },
  {
    title: 'Just transition pathways',
    category: 'Just transition pathways',
    description: 'Research on worker retraining, social protection, and community-led transition planning.',
    href: `/library?category=${encodeURIComponent('Just transition pathways')}`,
  },
  {
    title: 'Ecological and social impacts',
    category: 'Ecological and social impacts',
    description: 'Documentation of environmental harm and community impacts from oil and gas operations.',
    href: `/library?category=${encodeURIComponent('Ecological and social impacts')}`,
  },
  {
    title: 'Policy and regulatory updates',
    category: 'Policy and regulatory updates',
    description: 'National and international policy developments affecting oil and gas phase-out.',
    href: `/library?category=${encodeURIComponent('Policy and regulatory updates')}`,
  },
  {
    title: 'Narratives on the Fossil Fuel Phase Out',
    category: 'Narratives on the Fossil Fuel Phase Out',
    description: 'Stories and messaging frameworks for mobilizing audiences toward a fossil-free future.',
    href: '/narratives',
  },
  {
    title: 'Data analysis & strategic insights',
    category: 'Data analysis & strategic insights',
    description: 'Analysis, trackers, and strategic research to inform advocacy and campaigning.',
    href: `/library?category=${encodeURIComponent('Data analysis & strategic insights')}`,
  },
];

export function resourceCountForTheme(category: string, items: { category: string; status: string }[]): number {
  return items.filter((item) => item.status === 'published' && item.category === category).length;
}
