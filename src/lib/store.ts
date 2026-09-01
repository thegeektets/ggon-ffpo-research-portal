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
    status: 'pending',
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
    addSubmission: (sub: Omit<Submission, 'id' | 'submittedAt' | 'status'>) => {
      submissions = [
        {
          ...sub,
          id: `s${Date.now()}`,
          submittedAt: new Date().toISOString(),
          status: 'pending',
        },
        ...submissions,
      ];
      refresh();
    },
    updateSubmission: (id: string, status: Submission['status'], note?: string) => {
      submissions = submissions.map((s) =>
        s.id === id ? { ...s, status, reviewerNote: note ?? s.reviewerNote } : s,
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
