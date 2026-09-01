'use client';

import { useState } from 'react';
import { researchLibrary as seedResearchLibrary } from '@/data/research';
import { richArticles as seedRichArticles } from '@/data/rich-articles';
import { slugForSubmission, submissionToResearchItem, submissionToRichArticle } from '@/lib/submission-publish';
import type { RegistrationRequest, ResearchItem, RichArticleContent, Submission } from '@/types';

let submissions: Submission[] = [
  {
    id: 's1',
    title: 'Methane emissions from LNG terminals in West Africa',
    summary:
      'Preliminary data on methane leaks at export facilities along the Gulf of Guinea, with community monitoring notes and facility-level estimates.',
    url: 'https://example.org/methane-lng',
    submittedBy: 'member@ggon.demo',
    submittedAt: '2026-08-28T10:00:00Z',
    status: 'under_review',
    authors: ['K. Mensah'],
    organization: 'West Africa Climate Watch',
    year: 2025,
    geographicScope: 'Regional',
    country: 'Africa',
    industrySide: 'Supply',
    petroleumChain: 'Midstream',
    category: 'Ecological and social impacts',
    contentType: 'Report',
    rwgPriorities: ['Social justice and community perspectives'],
    workingGroups: ['Offshore'],
    subjects: ['Gas', 'Ecological impacts'],
    tags: ['methane', 'lng', 'west africa'],
    coverImageUrl: '/images/articles/africa-cover.jpg',
    files: [
      {
        id: 's1-f1',
        label: 'Methane monitoring report (PDF)',
        fileName: 'methane-lng-report.pdf',
        url: '/files/sample-report.pdf',
        fileType: 'pdf',
        sizeLabel: '1.2 MB',
      },
    ],
  },
  {
    id: 's2',
    title: 'Just transition financing models for coal regions',
    summary:
      'Comparative analysis of public finance instruments supporting fossil fuel phase-out in coal-dependent communities.',
    submittedBy: 'member@ggon.demo',
    submittedAt: '2026-08-20T14:30:00Z',
    status: 'approved',
    reviewedBy: 'reviewer@ggon.demo',
    reviewedAt: '2026-08-22T09:00:00Z',
    reviewerNote: 'Strong analysis — ready for editorial composition.',
    authors: ['L. Chen'],
    organization: 'Climate Action Network',
    year: 2025,
    geographicScope: 'Global',
    industrySide: 'Both',
    petroleumChain: 'Multiple',
    category: 'Finance',
    contentType: 'Policy brief',
    rwgPriorities: ['Just transition pathways'],
    workingGroups: ['Finance'],
    subjects: ['Finance', 'Just transition'],
    tags: ['finance', 'coal', 'just transition'],
    coverImageUrl: '/images/articles/finance-cover.jpg',
    files: [],
  },
  {
    id: 's3',
    title: 'Community-led monitoring of gas flaring in the Niger Delta',
    summary: 'Draft case study on citizen science approaches to tracking flaring violations.',
    submittedBy: 'member@ggon.demo',
    submittedAt: '2026-08-25T08:00:00Z',
    status: 'draft',
    authors: ['A. Okonkwo'],
    organization: 'Climate Action Network',
    year: 2025,
    geographicScope: 'National',
    country: 'Nigeria',
    industrySide: 'Supply',
    petroleumChain: 'Upstream',
    category: 'Ecological and social impacts',
    contentType: 'Case study',
    rwgPriorities: ['Social justice and community perspectives'],
    workingGroups: ['Onshore'],
    subjects: ['Gas', 'Community'],
    tags: ['flaring', 'nigeria', 'community'],
    files: [],
  },
];

let registrations: RegistrationRequest[] = [
  {
    id: 'r1',
    name: 'Jane Researcher',
    email: 'jane@example.org',
    organization: 'Climate Justice Coalition',
    requestedAt: '2026-08-30T14:00:00Z',
  },
];

let publishedResearch: ResearchItem[] = [];
let publishedRichArticles: Record<string, RichArticleContent> = {};

function allSlugs(): string[] {
  return [...seedResearchLibrary, ...publishedResearch].map((item) => item.slug);
}

type SubmissionInput = Omit<Submission, 'id' | 'submittedAt' | 'status'>;

export function usePortalStore() {
  const [, setTick] = useState(0);
  const refresh = () => setTick((n) => n + 1);

  const researchLibrary = [...seedResearchLibrary, ...publishedResearch];

  const getRichArticle = (slug: string): RichArticleContent | undefined =>
    publishedRichArticles[slug] ?? seedRichArticles[slug];

  return {
    submissions,
    registrations,
    researchLibrary,
    getRichArticle,
    publishedCount: publishedResearch.length,
    addSubmission: (sub: SubmissionInput, status: Submission['status'] = 'submitted') => {
      submissions = [
        {
          ...sub,
          id: `s${Date.now()}`,
          submittedAt: new Date().toISOString(),
          status: status === 'submitted' ? 'under_review' : status,
        },
        ...submissions,
      ];
      refresh();
    },
    resubmitSubmission: (id: string, sub: SubmissionInput) => {
      submissions = submissions.map((s) =>
        s.id === id
          ? {
              ...sub,
              id: s.id,
              submittedAt: new Date().toISOString(),
              status: 'under_review',
              reviewedBy: undefined,
              reviewedAt: undefined,
              reviewerNote: undefined,
            }
          : s,
      );
      refresh();
    },
    updateSubmissionContent: (id: string, sub: SubmissionInput, status?: Submission['status']) => {
      submissions = submissions.map((s) =>
        s.id === id
          ? {
              ...sub,
              id: s.id,
              submittedAt: s.submittedAt,
              status: status ?? s.status,
            }
          : s,
      );
      refresh();
    },
    updateSubmission: (
      id: string,
      status: Submission['status'],
      options?: { note?: string; reviewedBy?: string },
    ) => {
      submissions = submissions.map((s) =>
        s.id === id
          ? {
              ...s,
              status,
              reviewerNote: options?.note ?? s.reviewerNote,
              reviewedBy: options?.reviewedBy ?? s.reviewedBy,
              reviewedAt: options?.reviewedBy ? new Date().toISOString() : s.reviewedAt,
            }
          : s,
      );
      refresh();
    },
    updateSubmissionEditor: (id: string, editorBody: string, editorNote?: string) => {
      submissions = submissions.map((s) =>
        s.id === id ? { ...s, editorBody, editorNote: editorNote ?? s.editorNote } : s,
      );
      refresh();
    },
    publishSubmission: (id: string) => {
      const sub = submissions.find((s) => s.id === id);
      if (!sub || sub.status !== 'approved') return null;
      if (!sub.coverImageUrl) return null;

      const slug = slugForSubmission(sub, allSlugs());
      const item = submissionToResearchItem(sub, slug);
      const rich = submissionToRichArticle(sub, sub.editorBody);

      publishedResearch = [item, ...publishedResearch];
      publishedRichArticles = { ...publishedRichArticles, [slug]: rich };
      submissions = submissions.map((s) =>
        s.id === id ? { ...s, status: 'published', publishedSlug: slug } : s,
      );
      refresh();
      return slug;
    },
    approveRegistration: (id: string) => {
      registrations = registrations.filter((r) => r.id !== id);
      refresh();
    },
    rejectRegistration: (id: string) => {
      registrations = registrations.filter((r) => r.id !== id);
      refresh();
    },
    addRegistration: (req: Omit<RegistrationRequest, 'id' | 'requestedAt'>) => {
      registrations = [
        { ...req, id: `r${Date.now()}`, requestedAt: new Date().toISOString() },
        ...registrations,
      ];
      refresh();
    },
  };
}
