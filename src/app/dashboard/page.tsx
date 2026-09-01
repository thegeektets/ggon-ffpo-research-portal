'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { RoleBadge } from '@/components/Header';
import { SubmissionStatusBadge } from '@/components/SubmissionStatusBadge';
import { useApp } from '@/context/AppContext';
import { demoUsers } from '@/data/users';
import { usePortalStore } from '@/lib/store';
import type { SubmissionStatus } from '@/types';

function statusLabel(tr: (key: string) => string, status: SubmissionStatus): string {
  const key = `status_${status}` as const;
  return tr(key);
}

export default function DashboardPage() {
  const { user, tr } = useApp();
  const router = useRouter();
  const { submissions, registrations, researchLibrary } = usePortalStore();

  useEffect(() => {
    if (!user) router.replace('/login');
  }, [user, router]);

  const canAdmin = user ? ['owner', 'administrator', 'editor', 'reviewer'].includes(user.role) : false;

  const mySubmissions = useMemo(
    () =>
      user
        ? [...submissions.filter((s) => s.submittedBy === user.email)].sort(
            (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
          )
        : [],
    [submissions, user],
  );

  const pendingReview = submissions.filter((s) => s.status === 'pending').length;
  const awaitingPublish = submissions.filter((s) => s.status === 'approved').length;
  const pendingRegistrations = registrations.length;
  const memberCount = demoUsers.filter((u) => u.approved).length;

  const myByStatus = useMemo(() => {
    const counts: Record<SubmissionStatus, number> = {
      pending: 0,
      approved: 0,
      rejected: 0,
      changes_requested: 0,
      published: 0,
    };
    for (const sub of mySubmissions) counts[sub.status] += 1;
    return counts;
  }, [mySubmissions]);

  if (!user) return null;

  const adminNeedsAttention = canAdmin && (pendingReview > 0 || awaitingPublish > 0 || pendingRegistrations > 0);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="ggon-page-banner rounded-lg">
        <p className="ggon-label text-xs text-white/80">{tr('memberWorkspace')}</p>
        <h1 className="mt-1 text-2xl font-bold">{tr('workspaceWelcome')}</h1>
        <p className="mt-2 max-w-2xl text-sm text-white/90">
          {tr('workspaceIntro')} <RoleBadge role={user.role} />
        </p>
      </div>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="border border-[#dcdcdc] bg-white p-4">
          <p className="ggon-label text-2xl text-[#1a6b7a]">{mySubmissions.length}</p>
          <p className="text-sm font-medium text-[#242424]">{tr('dashboardMySubmissions')}</p>
          {mySubmissions.length > 0 && (
            <p className="mt-1 text-xs text-[#7f7f7f]">
              {myByStatus.pending > 0 && `${myByStatus.pending} ${tr('status_pending').toLowerCase()}`}
              {myByStatus.pending > 0 && myByStatus.published > 0 && ' · '}
              {myByStatus.published > 0 && `${myByStatus.published} ${tr('status_published').toLowerCase()}`}
            </p>
          )}
        </div>

        <div className="border border-[#dcdcdc] bg-white p-4">
          <p className="ggon-label text-2xl text-[#1a6b7a]">{researchLibrary.length}</p>
          <p className="text-sm font-medium text-[#242424]">{tr('dashboardLibraryArticles')}</p>
          <Link href="/library" className="ggon-link mt-1 inline-block text-xs font-semibold hover:underline">
            {tr('browsePublicLibrary')} →
          </Link>
        </div>

        <div className="border border-[#dcdcdc] bg-white p-4">
          <p className="ggon-label text-2xl text-[#1a6b7a]">{memberCount}</p>
          <p className="text-sm font-medium text-[#242424]">{tr('dashboardNetworkMembers')}</p>
          <Link href="/members" className="ggon-link mt-1 inline-block text-xs font-semibold hover:underline">
            {tr('viewMembers')} →
          </Link>
        </div>

        {canAdmin ? (
          <div className="border border-[#1a6b7a] bg-[#e8f4f6] p-4">
            <p className="ggon-label text-2xl text-[#1a6b7a]">{pendingReview + awaitingPublish}</p>
            <p className="text-sm font-medium text-[#242424]">{tr('dashboardAdminQueue')}</p>
            <Link href="/admin" className="ggon-link mt-1 inline-block text-xs font-semibold hover:underline">
              {tr('openAdmin')} →
            </Link>
          </div>
        ) : (
          <div className="border border-[#dcdcdc] bg-white p-4">
            <p className="ggon-label text-2xl text-[#1a6b7a]">{myByStatus.pending + myByStatus.changes_requested}</p>
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
            {pendingReview > 0 && (
              <li>
                {pendingReview} {tr('dashboardPendingSubmissions')}{' '}
                <Link href="/admin" className="ggon-link font-semibold hover:underline">
                  {tr('dashboardReviewNow')}
                </Link>
              </li>
            )}
            {awaitingPublish > 0 && (
              <li>
                {awaitingPublish} {tr('dashboardAwaitingPublish')}{' '}
                <Link href="/admin" className="ggon-link font-semibold hover:underline">
                  {tr('dashboardPublishNow')}
                </Link>
              </li>
            )}
            {pendingRegistrations > 0 && (
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

      <section className="flex flex-wrap gap-3">
        <Link href="/submit" className="ggon-btn ggon-btn-teal">
          {tr('dashboardNewSubmission')}
        </Link>
        {mySubmissions.length > 0 && (
          <a href="#my-submissions" className="ggon-btn">
            {tr('dashboardViewMine')}
          </a>
        )}
        <Link href="/library" className="ggon-btn">
          {tr('browsePublicLibrary')}
        </Link>
        {canAdmin && (
          <Link href="/admin" className="ggon-btn ggon-btn-accent">
            {tr('openAdmin')}
            {(pendingReview + awaitingPublish) > 0 && (
              <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white/90 px-1.5 text-[10px] font-bold text-[#a34b12]">
                {pendingReview + awaitingPublish}
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
          <Link href="/submit" className="ggon-link text-xs font-bold uppercase tracking-widest hover:underline">
            + {tr('dashboardNewSubmission')}
          </Link>
        </div>

        {mySubmissions.length === 0 ? (
          <div className="mt-4 border border-dashed border-[#dcdcdc] bg-white p-8 text-center">
            <p className="text-sm text-[#7f7f7f]">{tr('dashboardNoSubmissions')}</p>
            <Link href="/submit" className="ggon-btn ggon-btn-teal mt-4 inline-block">
              {tr('goToSubmit')}
            </Link>
          </div>
        ) : (
          <ul className="mt-4 space-y-3">
            {mySubmissions.map((sub) => (
              <li
                key={sub.id}
                className="border border-[#dcdcdc] bg-white p-4"
                style={{ borderLeftWidth: 4, borderLeftColor: '#1a6b7a' }}
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
                    {sub.reviewerNote && sub.status === 'changes_requested' && (
                      <p className="mt-2 border-l-2 border-orange-300 bg-orange-50 px-3 py-2 text-xs text-orange-900">
                        <span className="font-semibold">{tr('reviewerFeedback')}:</span> {sub.reviewerNote}
                      </p>
                    )}
                  </div>
                  <SubmissionStatusBadge status={sub.status} label={statusLabel(tr, sub.status)} />
                </div>

                <div className="mt-3 flex flex-wrap gap-3 text-xs">
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
                      href="/submit"
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

      <section className="border border-[#dcdcdc] bg-white p-5">
        <h2 className="ggon-label text-sm text-[#1a6b7a]">{tr('dashboardWorkflowTitle')}</h2>
        <ol className="mt-3 space-y-2 text-sm text-[#444]">
          <li>1. {tr('dashboardWorkflowStep1')}</li>
          <li>2. {tr('dashboardWorkflowStep2')}</li>
          <li>3. {tr('dashboardWorkflowStep3')}</li>
          <li>4. {tr('dashboardWorkflowStep4')}</li>
        </ol>
      </section>
    </div>
  );
}
