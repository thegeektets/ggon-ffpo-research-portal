'use client';

import { useState } from 'react';
import type { RegistrationRequest, Submission } from '@/types';

let submissions: Submission[] = [
  {
    id: 's1',
    title: 'Methane emissions from LNG terminals in West Africa',
    summary: 'Preliminary data on methane leaks at export facilities.',
    url: 'https://example.org/methane-lng',
    submittedBy: 'member@ggon.demo',
    submittedAt: '2026-08-28T10:00:00Z',
    status: 'pending',
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

export function usePortalStore() {
  const [, setTick] = useState(0);
  const refresh = () => setTick((n) => n + 1);

  return {
    submissions,
    registrations,
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
        s.id === id ? { ...s, status, reviewerNote: note } : s,
      );
      refresh();
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
