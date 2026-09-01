'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { RoleBadge } from '@/components/Header';
import { SubmissionReviewCard } from '@/components/SubmissionReviewCard';
import { SubmissionStatusBadge } from '@/components/SubmissionStatusBadge';
import { useApp } from '@/context/AppContext';
import { demoUsers } from '@/data/users';
import {
  BookOpen,
  FileText,
  ICON_INLINE,
  Library,
  ListChecks,
  Plus,
  Search,
  ShieldCheck,
  Upload,
  Users,
} from '@/lib/icons';
import {
  canAccessAdmin,
  canApproveMemberships,
  canPublishSubmissions,
  canReviewSubmissions,
  isAwaitingPublish,
  isInReviewQueue,
} from '@/lib/permissions';
import { usePortalStore } from '@/lib/store';
import type { SubmissionStatus } from '@/types';

function statusLabel(tr: (key: string) => string, status: SubmissionStatus): string {
  return tr(`status_${status}`);
}

export default function DashboardPage() {
  const { user, tr } = useApp();
  const router = useRouter();
  const { submissions, registrations, researchLibrary, updateSubmission, updateSubmissionEditor, publishSubmission } =
    usePortalStore();

  useEffect(() => {
    if (!user) router.replace('/login');
  }, [user, router]);

  const canReview = user ? canReviewSubmissions(user.role) : false;
  const canPublish = user ? canPublishSubmissions(user.role) : false;
  const canAdmin = user ? canAccessAdmin(user.role) : false;
  const canApproveMembers = user ? canApproveMemberships(user.role) : false;

  const mySubmissions = useMemo(
    () =>
      user
        ? [...submissions.filter((s) => s.submittedBy === user.email)].sort(
            (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
          )
        : [],
    [submissions, user],
  );

  const reviewQueue = useMemo(() => submissions.filter((s) => isInReviewQueue(s.status)), [submissions]);
  const publishQueue = useMemo(() => submissions.filter((s) => isAwaitingPublish(s.status)), [submissions]);
  const pendingRegistrations = registrations.length;
  const memberCount = demoUsers.filter((u) => u.approved).length;

  const myByStatus = useMemo(() => {
    const counts: Record<SubmissionStatus, number> = {
      draft: 0,
      submitted: 0,
      under_review: 0,
      approved: 0,
      rejected: 0,
      changes_requested: 0,
      published: 0,
    };
    for (const sub of mySubmissions) counts[sub.status] += 1;
    return counts;
  }, [mySubmissions]);

  if (!user) return null;

  const myInReview = myByStatus.submitted + myByStatus.under_review + myByStatus.changes_requested;
  const adminNeedsAttention =
    (canReview && reviewQueue.length > 0) ||
    (canPublish && publishQueue.length > 0) ||
    (canApproveMembers && pendingRegistrations > 0);

  const handleReview = (id: string, status: 'approved' | 'rejected' | 'changes_requested', note: string) => {
    updateSubmission(id, status, { note, reviewedBy: user.email });
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="ggon-page-banner rounded-lg">
        <p className="ggon-label text-xs text-white/80">{tr('memberWorkspace')}</p>
        <h1 className="mt-1 text-2xl font-bold">{tr('workspaceWelcome')}</h1>
        <p className="mt-2 max-w-2xl text-sm text-white/90">
          {canReview
            ? tr('dashboardReviewerIntro')
            : canPublish && !canReview
              ? tr('dashboardEditorIntro')
              : tr('workspaceIntro')}{' '}
          <RoleBadge role={user.role} />
        </p>
      </div>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="border border-[#dcdcdc] bg-white p-4">
          <div className="flex items-start justify-between gap-2">
            <p className="ggon-label text-2xl text-[#1a6b7a]">{mySubmissions.length}</p>
            <FileText size={20} strokeWidth={1.75} className="shrink-0 text-[#1a6b7a]/40" aria-hidden />
          </div>
          <p className="text-sm font-medium text-[#242424]">{tr('dashboardMySubmissions')}</p>
          {mySubmissions.length > 0 && (
            <p className="mt-1 text-xs text-[#7f7f7f]">
              {myInReview > 0 && `${myInReview} ${tr('dashboardInReview').toLowerCase()}`}
              {myInReview > 0 && myByStatus.published > 0 && ' · '}
              {myByStatus.published > 0 && `${myByStatus.published} ${tr('status_published').toLowerCase()}`}
            </p>
          )}
        </div>

        <div className="border border-[#dcdcdc] bg-white p-4">
          <div className="flex items-start justify-between gap-2">
            <p className="ggon-label text-2xl text-[#1a6b7a]">{researchLibrary.length}</p>
            <Library size={20} strokeWidth={1.75} className="shrink-0 text-[#1a6b7a]/40" aria-hidden />
          </div>
          <p className="text-sm font-medium text-[#242424]">{tr('dashboardLibraryArticles')}</p>
          <Link href="/library" className="ggon-link mt-1 inline-flex items-center gap-1 text-xs font-semibold hover:underline">
            <BookOpen size={ICON_INLINE} strokeWidth={2} aria-hidden />
            {tr('browsePublicLibrary')} →
          </Link>
        </div>

        <div className="border border-[#dcdcdc] bg-white p-4">
          <div className="flex items-start justify-between gap-2">
            <p className="ggon-label text-2xl text-[#1a6b7a]">{memberCount}</p>
            <Users size={20} strokeWidth={1.75} className="shrink-0 text-[#1a6b7a]/40" aria-hidden />
          </div>
          <p className="text-sm font-medium text-[#242424]">{tr('dashboardNetworkMembers')}</p>
          <Link href="/members" className="ggon-link mt-1 inline-flex items-center gap-1 text-xs font-semibold hover:underline">
            <Users size={ICON_INLINE} strokeWidth={2} aria-hidden />
            {tr('viewMembers')} →
          </Link>
        </div>

        {canReview ? (
          <div className="border border-[#1a6b7a] bg-[#e8f4f6] p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="ggon-label text-2xl text-[#1a6b7a]">{reviewQueue.length}</p>
              <Search size={20} strokeWidth={1.75} className="shrink-0 text-[#1a6b7a]/40" aria-hidden />
            </div>
            <p className="text-sm font-medium text-[#242424]">{tr('dashboardReviewQueue')}</p>
            <Link href="/admin" className="ggon-link mt-1 inline-block text-xs font-semibold hover:underline">
              {tr('dashboardReviewNow')} →
            </Link>
          </div>
        ) : canPublish ? (
          <div className="border border-[#1a6b7a] bg-[#e8f4f6] p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="ggon-label text-2xl text-[#1a6b7a]">{publishQueue.length}</p>
              <ListChecks size={20} strokeWidth={1.75} className="shrink-0 text-[#1a6b7a]/40" aria-hidden />
            </div>
            <p className="text-sm font-medium text-[#242424]">{tr('dashboardPublishQueue')}</p>
            <Link href="/admin" className="ggon-link mt-1 inline-block text-xs font-semibold hover:underline">
              {tr('dashboardPublishNow')} →
            </Link>
          </div>
        ) : (
          <div className="border border-[#dcdcdc] bg-white p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="ggon-label text-2xl text-[#1a6b7a]">{myInReview}</p>
              <Search size={20} strokeWidth={1.75} className="shrink-0 text-[#1a6b7a]/40" aria-hidden />
            </div>
            <p className="text-sm font-medium text-[#242424]">{tr('dashboardInReview')}</p>
            {mySubmissions.length > 0 && (
              <a href="#my-submissions" className="ggon-link mt-1 inline-block text-xs font-semibold hover:underline">
                {tr('dashboardViewMine')} →
              </a>
            )}
          </div>
        )}
      </section>

      {adminNeedsAttention && (
        <section className="border border-[#1a6b7a] bg-[#e8f4f6] p-5">
          <h2 className="ggon-label text-sm text-[#1a6b7a]">{tr('dashboardAdminAlert')}</h2>
          <ul className="mt-2 space-y-1 text-sm text-[#242424]">
            {canReview && reviewQueue.length > 0 && (
              <li>
                {reviewQueue.length} {tr('dashboardPendingSubmissions')}{' '}
                <Link href="/admin" className="ggon-link font-semibold hover:underline">
                  {tr('dashboardReviewNow')}
                </Link>
              </li>
            )}
            {canPublish && publishQueue.length > 0 && (
              <li>
                {publishQueue.length} {tr('dashboardAwaitingPublish')}{' '}
                <Link href="/admin" className="ggon-link font-semibold hover:underline">
                  {tr('dashboardPublishNow')}
                </Link>
              </li>
            )}
            {canApproveMembers && pendingRegistrations > 0 && (
              <li>
                {pendingRegistrations} {tr('dashboardPendingRegistrations')}{' '}
                <Link href="/admin" className="ggon-link font-semibold hover:underline">
                  {tr('dashboardApproveMembers')}
                </Link>
              </li>
            )}
          </ul>
        </section>
      )}

      {canReview && reviewQueue.length > 0 && (
        <section id="review-queue">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="ggon-section-title ggon-label text-lg">{tr('dashboardReviewQueueTitle')}</h2>
              <p className="mt-1 text-sm text-[#7f7f7f]">{tr('dashboardReviewQueueIntro')}</p>
            </div>
            <Link href="/admin" className="ggon-link text-xs font-bold uppercase tracking-widest hover:underline">
              {tr('openAdmin')} →
            </Link>
          </div>
          <div className="mt-4 space-y-4">
            {reviewQueue.slice(0, 2).map((sub) => (
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
            {reviewQueue.length > 2 && (
              <Link href="/admin" className="ggon-link text-sm font-semibold hover:underline">
                {tr('dashboardViewAllQueue')} ({reviewQueue.length}) →
              </Link>
            )}
          </div>
        </section>
      )}

      {canPublish && publishQueue.length > 0 && (
        <section id="publish-queue">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="ggon-section-title ggon-label text-lg">{tr('dashboardPublishQueueTitle')}</h2>
              <p className="mt-1 text-sm text-[#7f7f7f]">{tr('dashboardPublishQueueIntro')}</p>
            </div>
            <Link href="/admin" className="ggon-link text-xs font-bold uppercase tracking-widest hover:underline">
              {tr('openAdmin')} →
            </Link>
          </div>
          <div className="mt-4 space-y-4">
            {publishQueue.slice(0, 2).map((sub) => (
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
            {publishQueue.length > 2 && (
              <Link href="/admin" className="ggon-link text-sm font-semibold hover:underline">
                {tr('dashboardViewAllPublish')} ({publishQueue.length}) →
              </Link>
            )}
          </div>
        </section>
      )}

      <section className="flex flex-wrap gap-3">
        <Link href="/submit" className="ggon-btn ggon-btn-teal inline-flex items-center gap-2">
          <Plus size={ICON_INLINE} strokeWidth={2} aria-hidden />
          {tr('dashboardNewSubmission')}
        </Link>
        {mySubmissions.length > 0 && (
          <a href="#my-submissions" className="ggon-btn inline-flex items-center gap-2">
            <FileText size={ICON_INLINE} strokeWidth={2} aria-hidden />
            {tr('dashboardViewMine')}
          </a>
        )}
        <Link href="/library" className="ggon-btn inline-flex items-center gap-2">
          <BookOpen size={ICON_INLINE} strokeWidth={2} aria-hidden />
          {tr('browsePublicLibrary')}
        </Link>
        {canAdmin && (
          <Link href="/admin" className="ggon-btn ggon-btn-accent inline-flex items-center gap-2">
            <ShieldCheck size={ICON_INLINE} strokeWidth={2} aria-hidden />
            {tr('openAdmin')}
            {(reviewQueue.length + publishQueue.length) > 0 && (
              <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white/90 px-1.5 text-[10px] font-bold text-[#a34b12]">
                {canReview ? reviewQueue.length + (canPublish ? publishQueue.length : 0) : publishQueue.length}
              </span>
            )}
          </Link>
        )}
      </section>

      <section id="my-submissions">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="ggon-section-title ggon-label text-lg">{tr('yourSubmissions')}</h2>
            <p className="mt-1 text-sm text-[#7f7f7f]">{tr('dashboardSubmissionsIntro')}</p>
          </div>
          <Link href="/submit" className="ggon-link inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest hover:underline">
            <Plus size={ICON_INLINE} strokeWidth={2} aria-hidden />
            {tr('dashboardNewSubmission')}
          </Link>
        </div>

        {mySubmissions.length === 0 ? (
          <div className="mt-4 rounded-lg border border-dashed border-[#1a6b7a]/30 bg-gradient-to-br from-[#e8f4f6] to-white p-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e8f4f6] text-[#1a6b7a]">
              <FileText size={28} strokeWidth={1.5} />
            </div>
            <p className="mt-4 text-sm text-[#7f7f7f]">{tr('dashboardNoSubmissions')}</p>
            <Link href="/submit" className="ggon-btn ggon-btn-teal mt-5 inline-flex items-center gap-2 shadow-sm">
              <Upload size={ICON_INLINE} strokeWidth={2} aria-hidden />
              {tr('goToSubmit')}
            </Link>
          </div>
        ) : (
          <ul className="mt-4 space-y-3">
            {mySubmissions.map((sub) => (
              <li
                key={sub.id}
                className="ggon-submission-card"
                style={{ borderLeftColor: '#1a6b7a' }}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-[#242424]">{sub.title}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-[#7f7f7f]">{sub.summary}</p>
                    <p className="mt-2 text-xs text-[#7f7f7f]">
                      {tr('submittedOn')}{' '}
                      {new Date(sub.submittedAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                      {' · '}
                      {sub.contentType} · {sub.category}
                    </p>
                    {sub.reviewerNote && (sub.status === 'changes_requested' || sub.status === 'rejected') && (
                      <p className="mt-2 border-l-2 border-orange-300 bg-orange-50 px-3 py-2 text-xs text-orange-900">
                        <span className="font-semibold">{tr('reviewerFeedback')}:</span> {sub.reviewerNote}
                      </p>
                    )}
                  </div>
                  <SubmissionStatusBadge status={sub.status} label={statusLabel(tr, sub.status)} />
                </div>

                <div className="mt-3 flex flex-wrap gap-3 text-xs">
                  {sub.status === 'draft' && (
                    <Link
                      href={`/submit?draft=${sub.id}`}
                      className="ggon-link font-bold uppercase tracking-widest hover:underline"
                    >
                      {tr('continueDraft')} →
                    </Link>
                  )}
                  {sub.status === 'published' && sub.publishedSlug && (
                    <Link
                      href={`/library/${sub.publishedSlug}`}
                      className="ggon-link font-bold uppercase tracking-widest hover:underline"
                    >
                      {tr('dashboardViewPublished')} →
                    </Link>
                  )}
                  {sub.status === 'changes_requested' && (
                    <Link
                      href={`/submit?resubmit=${sub.id}`}
                      className="ggon-link font-bold uppercase tracking-widest hover:underline"
                    >
                      {tr('dashboardResubmit')} →
                    </Link>
                  )}
                  {sub.files.length > 0 && (
                    <span className="text-[#7f7f7f]">
                      {sub.files.length} {tr('dashboardFilesUploaded')}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-lg border border-[#dcdcdc] bg-white p-6 shadow-sm">
        <h2 className="ggon-section-title ggon-label text-sm text-[#1a6b7a]">{tr('dashboardWorkflowTitle')}</h2>
        <ol className="mt-2">
          {[
            tr('dashboardWorkflowStep1'),
            tr('dashboardWorkflowStep2'),
            tr('dashboardWorkflowStep3'),
            tr('dashboardWorkflowStep4'),
          ].map((step, i) => (
            <li key={step} className="ggon-workflow-step">
              <span className="ggon-workflow-step-num">{i + 1}</span>
              <p className="pt-1 text-sm text-[#444]">{step}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
