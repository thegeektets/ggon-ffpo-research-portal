'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SubmissionForm } from '@/components/SubmissionForm';
import { useApp } from '@/context/AppContext';
import { usePortalStore } from '@/lib/store';

export default function SubmitPage() {
  const { user, tr } = useApp();
  const { addSubmission } = usePortalStore();
  const [done, setDone] = useState(false);

  if (!user) {
    return (
      <p className="ggon-section-alt border border-[#dcdcdc] p-4">
        Please{' '}
        <Link href="/login" className="ggon-link underline">
          log in
        </Link>{' '}
        to submit research.
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="ggon-page-banner">
        <h1 className="text-2xl font-bold">{tr('submit')}</h1>
        <p className="mt-1">
          Submit metadata, a cover image, and research files. Editors will review and compose the full article before
          publishing.
        </p>
      </div>
      {done ? (
        <div className="space-y-4 border border-[#dcdcdc] bg-[#e8f4f6] p-6 text-sm">
          <p>{tr('submissionSuccess')}</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard" className="ggon-btn ggon-btn-teal !text-xs">
              {tr('backToDashboard')}
            </Link>
            <Link href="/library" className="ggon-btn !text-xs">
              {tr('browsePublicLibrary')}
            </Link>
          </div>
        </div>
      ) : (
        <SubmissionForm
          submittedBy={user.email}
          onSubmit={(data) => {
            addSubmission(data);
            setDone(true);
          }}
        />
      )}
    </div>
  );
}
