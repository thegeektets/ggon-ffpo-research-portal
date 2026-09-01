'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { usePortalStore } from '@/lib/store';

export default function SubmitPage() {
  const { user, tr } = useApp();
  const { addSubmission } = usePortalStore();
  const [done, setDone] = useState(false);

  if (!user) {
    return (
      <p className="ggon-section-alt border border-[#dcdcdc] p-4">
        Please <Link href="/login" className="ggon-link underline">log in</Link> to submit research.
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <h1 className="text-2xl font-bold">{tr('submit')}</h1>
      {done ? (
        <p className="ggon-section-alt border border-[#dcdcdc] p-4">{tr('submissionSuccess')}</p>
      ) : (
        <form
          className="space-y-4 rounded-xl border bg-white p-6 shadow-sm"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            addSubmission({
              title: String(fd.get('title')),
              summary: String(fd.get('summary')),
              url: String(fd.get('url')),
              submittedBy: user.email,
            });
            setDone(true);
          }}
        >
          <label className="block text-sm">
            Title
            <input name="title" required className="mt-1 w-full rounded border px-3 py-2" />
          </label>
          <label className="block text-sm">
            Summary
            <textarea name="summary" required rows={4} className="mt-1 w-full rounded border px-3 py-2" />
          </label>
          <label className="block text-sm">
            URL or file link
            <input name="url" type="url" required className="mt-1 w-full rounded border px-3 py-2" />
          </label>
          <p className="text-xs text-gray-500">
            Metadata tags (geography, RWG priority, content type, etc.) would be collected in the full build.
          </p>
          <button type="submit" className="ggon-btn ggon-btn-teal">
            Submit for review
          </button>
        </form>
      )}
    </div>
  );
}
