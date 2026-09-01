'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useMemo, useState } from 'react';
import { SubmissionForm } from '@/components/SubmissionForm';
import { useApp } from '@/context/AppContext';
import { usePortalStore } from '@/lib/store';

function SubmitPageContent() {
  const { user, tr } = useApp();
  const { submissions, addSubmission, resubmitSubmission, updateSubmissionContent } = usePortalStore();
  const searchParams = useSearchParams();
  const [done, setDone] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);

  const draftId = searchParams.get('draft');
  const resubmitId = searchParams.get('resubmit');
  const editId = draftId || resubmitId;

  const existingSubmission = useMemo(
    () => (editId ? submissions.find((s) => s.id === editId && s.submittedBy === user?.email) : undefined),
    [editId, submissions, user?.email],
  );

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

  if (editId && !existingSubmission) {
    return (
      <p className="ggon-section-alt border border-[#dcdcdc] p-4">
        Submission not found.{' '}
        <Link href="/dashboard" className="ggon-link underline">
          {tr('backToDashboard')}
        </Link>
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="ggon-page-banner">
        <h1 className="text-2xl font-bold">{tr('submit')}</h1>
        <p className="mt-1">
          {resubmitId
            ? tr('dashboardResubmit')
            : 'Submit metadata, a cover image, and research files. Reviewers will approve before editors publish to the library.'}
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
      ) : draftSaved ? (
        <div className="space-y-4 border border-[#dcdcdc] bg-[#e8f4f6] p-6 text-sm">
          <p>{tr('draftSaved')}</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard" className="ggon-btn ggon-btn-teal !text-xs">
              {tr('backToDashboard')}
            </Link>
            <button type="button" onClick={() => setDraftSaved(false)} className="ggon-btn !text-xs">
              {tr('continueDraft')}
            </button>
          </div>
        </div>
      ) : (
        <SubmissionForm
          submittedBy={user.email}
          initialData={existingSubmission}
          onSubmit={(data) => {
            if (resubmitId && existingSubmission) {
              resubmitSubmission(existingSubmission.id, data);
            } else if (draftId && existingSubmission) {
              updateSubmissionContent(existingSubmission.id, data, 'under_review');
            } else {
              addSubmission(data, 'submitted');
            }
            setDone(true);
          }}
          onSaveDraft={(data) => {
            if (draftId && existingSubmission) {
              updateSubmissionContent(existingSubmission.id, data, 'draft');
            } else {
              addSubmission(data, 'draft');
            }
            setDraftSaved(true);
          }}
        />
      )}
    </div>
  );
}

export default function SubmitPage() {
  return (
    <Suspense fallback={<p className="text-sm text-[#7f7f7f]">Loading…</p>}>
      <SubmitPageContent />
    </Suspense>
  );
}
