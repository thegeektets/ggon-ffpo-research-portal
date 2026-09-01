'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { demoUsers } from '@/data/users';
import { RoleBadge } from '@/components/Header';
import { SubmissionReviewCard } from '@/components/SubmissionReviewCard';
import { useApp } from '@/context/AppContext';
import {
  canAccessAdmin,
  canApproveMemberships,
  canManageTeam,
  canPublishSubmissions,
  canReviewSubmissions,
  isAwaitingPublish,
  isInReviewQueue,
} from '@/lib/permissions';
import { usePortalStore } from '@/lib/store';
import {
  Check,
  Globe,
  ICON_INLINE,
  Library,
  ListChecks,
  Search,
  X,
} from '@/lib/icons';

export default function AdminPage() {
  const { user, tr } = useApp();
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

  const reviewQueue = useMemo(() => submissions.filter((s) => isInReviewQueue(s.status)), [submissions]);
  const publishQueue = useMemo(() => submissions.filter((s) => isAwaitingPublish(s.status)), [submissions]);
  const otherSubmissions = useMemo(
    () => submissions.filter((s) => !isInReviewQueue(s.status) && !isAwaitingPublish(s.status)),
    [submissions],
  );

  if (!user || !canAccessAdmin(user.role)) {
    return (
      <p className="ggon-section-alt border border-[#dcdcdc] p-4">
        {tr('adminAccessRequired')}{' '}
        <Link href="/login" className="ggon-link underline">
          {tr('login')}
        </Link>{' '}
        {tr('adminAccessHint')}
      </p>
    );
  }

  const canReview = canReviewSubmissions(user.role);
  const canPublish = canPublishSubmissions(user.role);
  const canApprove = canApproveMemberships(user.role);

  const handleReview = (id: string, status: 'approved' | 'rejected' | 'changes_requested', note: string) => {
    updateSubmission(id, status, { note, reviewedBy: user.email });
  };

  return (
    <div className="space-y-8">
      <div className="ggon-page-banner">
        <h1 className="text-2xl font-bold">{tr('adminDashboard')}</h1>
        <p className="mt-1">
          {tr('adminLoggedInAs')} {user.name} <RoleBadge role={user.role} />
        </p>
        {user.role === 'editor' && (
          <p className="mt-2 text-sm text-white/90">{tr('adminEditorHint')}</p>
        )}
        {user.role === 'reviewer' && (
          <p className="mt-2 text-sm text-white/90">{tr('adminReviewerHint')}</p>
        )}
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: tr('adminStatPublished'), value: researchLibrary.length, icon: Library },
          { label: tr('adminStatMemberPublished'), value: publishedCount, icon: Globe },
          ...(canReview
            ? [{ label: tr('adminStatPendingReview'), value: reviewQueue.length, icon: Search }]
            : []),
          ...(canPublish
            ? [{ label: tr('adminStatAwaitingPublish'), value: publishQueue.length, icon: ListChecks }]
            : []),
        ].map((stat) => {
          const StatIcon = stat.icon;
          return (
          <div key={stat.label} className="border border-[#dcdcdc] bg-white p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="ggon-label text-2xl">{stat.value}</p>
              <StatIcon size={20} strokeWidth={1.75} className="shrink-0 text-[#1a6b7a]/40" aria-hidden />
            </div>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
          );
        })}
      </section>

      {canReview && (
        <section>
          <h2 className="ggon-section-title ggon-label text-lg">{tr('adminReviewQueue')}</h2>
          <p className="mt-2 max-w-2xl text-sm text-gray-600">{tr('adminReviewQueueIntro')}</p>
          <div className="mt-4 space-y-4">
            {reviewQueue.length === 0 && (
              <p className="text-sm text-gray-500">{tr('adminNoPendingReview')}</p>
            )}
            {reviewQueue.map((sub) => (
              <SubmissionReviewCard
                key={sub.id}
                sub={sub}
                user={user}
                onApprove={(note) => handleReview(sub.id, 'approved', note)}
                onReject={(note) => handleReview(sub.id, 'rejected', note)}
                onRequestChanges={(note) => handleReview(sub.id, 'changes_requested', note)}
                onSaveEditor={(editorBody, editorNote) => updateSubmissionEditor(sub.id, editorBody, editorNote)}
                onPublish={(editorBody, editorNote) => {
                  updateSubmissionEditor(sub.id, editorBody, editorNote);
                  return publishSubmission(sub.id);
                }}
              />
            ))}
          </div>
        </section>
      )}

      {canPublish && (
        <section>
          <h2 className="ggon-section-title ggon-label text-lg">{tr('adminPublishQueue')}</h2>
          <p className="mt-2 max-w-2xl text-sm text-gray-600">{tr('adminPublishQueueIntro')}</p>
          <div className="mt-4 space-y-4">
            {publishQueue.length === 0 && (
              <p className="text-sm text-gray-500">{tr('adminNoAwaitingPublish')}</p>
            )}
            {publishQueue.map((sub) => (
              <SubmissionReviewCard
                key={sub.id}
                sub={sub}
                user={user}
                onApprove={() => {}}
                onReject={() => {}}
                onRequestChanges={() => {}}
                onSaveEditor={(editorBody, editorNote) => updateSubmissionEditor(sub.id, editorBody, editorNote)}
                onPublish={(editorBody, editorNote) => {
                  updateSubmissionEditor(sub.id, editorBody, editorNote);
                  return publishSubmission(sub.id);
                }}
              />
            ))}
          </div>
        </section>
      )}

      {otherSubmissions.length > 0 && (
        <section>
          <h2 className="ggon-section-title ggon-label text-lg">{tr('adminOtherSubmissions')}</h2>
          <div className="mt-4 space-y-4">
            {otherSubmissions.map((sub) => (
              <SubmissionReviewCard
                key={sub.id}
                sub={sub}
                user={user}
                onApprove={() => {}}
                onReject={() => {}}
                onRequestChanges={() => {}}
                onSaveEditor={(editorBody, editorNote) => updateSubmissionEditor(sub.id, editorBody, editorNote)}
                onPublish={(editorBody, editorNote) => {
                  updateSubmissionEditor(sub.id, editorBody, editorNote);
                  return publishSubmission(sub.id);
                }}
              />
            ))}
          </div>
        </section>
      )}

      {canApprove && (
        <section>
          <h2 className="ggon-section-title ggon-label text-lg">{tr('adminMembershipQueue')}</h2>
          <div className="mt-3 space-y-3">
            {registrations.length === 0 && (
              <p className="text-sm text-gray-500">{tr('adminNoRegistrations')}</p>
            )}
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
                  <button
                    type="button"
                    onClick={() => approveRegistration(reg.id)}
                    className="ggon-btn ggon-btn-teal inline-flex items-center gap-1.5 !text-xs"
                  >
                    <Check size={ICON_INLINE} strokeWidth={2} aria-hidden />
                    {tr('approveMember')}
                  </button>
                  <button
                    type="button"
                    onClick={() => rejectRegistration(reg.id)}
                    className="ggon-btn inline-flex items-center gap-1.5 !text-xs"
                  >
                    <X size={ICON_INLINE} strokeWidth={2} aria-hidden />
                    {tr('rejectMember')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {canManageTeam(user.role) && (
        <section>
          <h2 className="ggon-section-title ggon-label text-lg">{tr('adminTeamRoles')}</h2>
          <table className="mt-3 w-full text-left text-sm">
            <thead>
              <tr className="border-b text-gray-500">
                <th className="py-2">{tr('adminTeamName')}</th>
                <th>{tr('adminTeamEmail')}</th>
                <th>{tr('adminTeamRole')}</th>
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
