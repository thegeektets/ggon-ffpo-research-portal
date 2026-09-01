'use client';

import Link from 'next/link';
import { demoUsers } from '@/data/users';
import { RoleBadge } from '@/components/Header';
import { SubmissionReviewCard } from '@/components/SubmissionReviewCard';
import { useApp } from '@/context/AppContext';
import { usePortalStore } from '@/lib/store';

export default function AdminPage() {
  const { user } = useApp();
  const {
    submissions,
    registrations,
    researchLibrary,
    publishedCount,
    updateSubmission,
    updateSubmissionEditor,
    publishSubmission,
    approveRegistration,
    rejectRegistration,
  } = usePortalStore();

  if (!user || !['owner', 'administrator', 'editor', 'reviewer'].includes(user.role)) {
    return (
      <p className="ggon-section-alt border border-[#dcdcdc] p-4">
        Admin access required.{' '}
        <Link href="/login" className="ggon-link underline">
          Log in
        </Link>{' '}
        as admin@ggon.demo
      </p>
    );
  }

  const canApprove = ['owner', 'administrator', 'reviewer'].includes(user.role);

  return (
    <div className="space-y-8">
      <div className="ggon-page-banner">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="mt-1">
          Logged in as {user.name} <RoleBadge role={user.role} />
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-4">
        {[
          { label: 'Published research', value: researchLibrary.length },
          { label: 'Member submissions', value: publishedCount },
          { label: 'Pending submissions', value: submissions.filter((s) => s.status === 'pending').length },
          { label: 'Awaiting publish', value: submissions.filter((s) => s.status === 'approved').length },
        ].map((stat) => (
          <div key={stat.label} className="border border-[#dcdcdc] bg-white p-4">
            <p className="ggon-label text-2xl">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="ggon-section-title ggon-label text-lg">Submission workflow</h2>
        <p className="mt-2 max-w-2xl text-sm text-gray-600">
          Reviewers approve submissions. Editors compose the article body and publish to the library with cover image and
          downloadable files.
        </p>
        <div className="mt-4 space-y-4">
          {submissions.length === 0 && <p className="text-sm text-gray-500">No submissions yet.</p>}
          {submissions.map((sub) => (
            <SubmissionReviewCard
              key={sub.id}
              sub={sub}
              user={user}
              onApprove={() => updateSubmission(sub.id, 'approved')}
              onReject={() => updateSubmission(sub.id, 'rejected')}
              onRequestChanges={() => updateSubmission(sub.id, 'changes_requested', 'Please revise and resubmit.')}
              onSaveEditor={(editorBody, editorNote) => updateSubmissionEditor(sub.id, editorBody, editorNote)}
              onPublish={(editorBody, editorNote) => {
                updateSubmissionEditor(sub.id, editorBody, editorNote);
                return publishSubmission(sub.id);
              }}
            />
          ))}
        </div>
      </section>

      {canApprove && (
        <section>
          <h2 className="ggon-section-title ggon-label text-lg">Membership approval queue</h2>
          <div className="mt-3 space-y-3">
            {registrations.length === 0 && <p className="text-sm text-gray-500">No pending registrations.</p>}
            {registrations.map((reg) => (
              <div
                key={reg.id}
                className="flex flex-wrap items-center justify-between gap-2 border border-[#dcdcdc] bg-white p-4"
              >
                <div>
                  <p className="font-medium">{reg.name}</p>
                  <p className="text-sm text-gray-600">
                    {reg.email} · {reg.organization}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => approveRegistration(reg.id)} className="ggon-btn ggon-btn-teal !text-xs">
                    Approve
                  </button>
                  <button type="button" onClick={() => rejectRegistration(reg.id)} className="ggon-btn !text-xs">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {user.role === 'owner' && (
        <section>
          <h2 className="ggon-section-title ggon-label text-lg">Team & roles</h2>
          <table className="mt-3 w-full text-left text-sm">
            <thead>
              <tr className="border-b text-gray-500">
                <th className="py-2">Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {demoUsers.map((u) => (
                <tr key={u.id} className="border-b">
                  <td className="py-2">{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <RoleBadge role={u.role} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}
