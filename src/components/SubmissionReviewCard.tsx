'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { RoleBadge } from '@/components/Header';
import { SubmissionStatusBadge } from '@/components/SubmissionStatusBadge';
import { useApp } from '@/context/AppContext';
import { canPublishSubmissions, canReviewSubmissions, isInReviewQueue } from '@/lib/permissions';
import { Check, Globe, ICON_INLINE, MessageSquare, Send, X } from '@/lib/icons';
import type { Submission, User } from '@/types';

function statusLabel(tr: (key: string) => string, status: Submission['status']): string {
  return tr(`status_${status}`);
}

export function SubmissionReviewCard({
  sub,
  user,
  onApprove,
  onReject,
  onRequestChanges,
  onPublish,
  onSaveEditor,
}: {
  sub: Submission;
  user: User;
  onApprove: (note: string) => void;
  onReject: (note: string) => void;
  onRequestChanges: (note: string) => void;
  onPublish: (editorBody: string, editorNote: string) => string | null;
  onSaveEditor: (editorBody: string, editorNote: string) => void;
}) {
  const { tr } = useApp();
  const [editorBody, setEditorBody] = useState(sub.editorBody ?? '');
  const [editorNote, setEditorNote] = useState(sub.editorNote ?? '');
  const [reviewNote, setReviewNote] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [pendingAction, setPendingAction] = useState<'approve' | 'reject' | 'changes' | null>(null);

  const canReview = canReviewSubmissions(user.role);
  const canPublish = canPublishSubmissions(user.role);
  const reviewable = isInReviewQueue(sub.status);

  const handleReviewAction = () => {
    if (!pendingAction) return;
    const note = reviewNote.trim();
    if ((pendingAction === 'reject' || pendingAction === 'changes') && !note) return;

    if (pendingAction === 'approve') onApprove(note || tr('reviewApprovedDefault'));
    if (pendingAction === 'reject') onReject(note);
    if (pendingAction === 'changes') onRequestChanges(note);

    setShowReviewForm(false);
    setPendingAction(null);
    setReviewNote('');
  };

  return (
    <div className="border border-[#dcdcdc] bg-white p-5" style={{ borderLeftWidth: 4, borderLeftColor: '#1a6b7a' }}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-lg font-bold text-[#242424]">{sub.title}</p>
          <p className="mt-2 text-sm text-[#444]">{sub.summary}</p>
          <p className="mt-2 text-xs text-gray-500">
            {sub.authors.join(', ')} · {sub.organization} · {sub.year}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            {sub.submittedBy} · {new Date(sub.submittedAt).toLocaleDateString()}
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="bg-[#e8f4f6] px-2 py-0.5 text-[#1a6b7a]">{sub.contentType}</span>
            <span className="bg-[#fef3e8] px-2 py-0.5 text-[#a34b12]">{sub.category}</span>
            {sub.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="bg-[#f5f5f5] px-2 py-0.5">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <SubmissionStatusBadge status={sub.status} label={statusLabel(tr, sub.status)} />
          {sub.coverImageUrl && (
            <div className="relative h-24 w-36 overflow-hidden border border-[#dcdcdc]">
              <Image
                src={sub.coverImageUrl}
                alt=""
                fill
                className="object-cover"
                sizes="144px"
                unoptimized={sub.coverImageUrl.startsWith('data:')}
              />
            </div>
          )}
        </div>
      </div>

      {sub.files.length > 0 && (
        <div className="mt-4">
          <p className="ggon-label mb-2 text-xs text-gray-500">{tr('uploadedFiles')}</p>
          <ul className="space-y-1 text-sm">
            {sub.files.map((file) => (
              <li key={file.id}>
                <a href={file.url} download={file.fileName} className="ggon-link hover:underline">
                  {file.fileName}
                </a>{' '}
                <span className="text-gray-500">({file.sizeLabel})</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {sub.url && (
        <p className="mt-3 text-sm">
          {tr('externalUrl')}:{' '}
          <a href={sub.url} target="_blank" rel="noreferrer" className="ggon-link hover:underline">
            {sub.url}
          </a>
        </p>
      )}

      {sub.reviewerNote && (
        <div className="mt-3 border-l-2 border-[#c45c26] bg-[#fef3e8] px-3 py-2 text-sm">
          <p>
            <span className="font-semibold">{tr('reviewerFeedback')}:</span> {sub.reviewerNote}
          </p>
          {sub.reviewedBy && sub.reviewedAt && (
            <p className="mt-1 text-xs text-gray-500">
              {sub.reviewedBy} · {new Date(sub.reviewedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      )}

      {canPublish && sub.status === 'approved' && (
        <div className="mt-5 space-y-3 border-t border-[#ececec] pt-5">
          <p className="ggon-label text-xs text-[#1a6b7a]">{tr('editorComposeHint')}</p>
          <label className="block text-sm">
            {tr('editorBodyLabel')}{' '}
            <span className="text-gray-500">({tr('editorBodyHint')})</span>
            <textarea
              value={editorBody}
              onChange={(e) => setEditorBody(e.target.value)}
              rows={6}
              className="mt-1 w-full border border-[#dcdcdc] px-3 py-2 text-sm"
              placeholder={tr('editorBodyPlaceholder')}
            />
          </label>
          <label className="block text-sm">
            {tr('editorNoteLabel')}
            <input
              value={editorNote}
              onChange={(e) => setEditorNote(e.target.value)}
              className="mt-1 w-full border border-[#dcdcdc] px-3 py-2 text-sm"
              placeholder={tr('editorNotePlaceholder')}
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => onSaveEditor(editorBody, editorNote)} className="ggon-btn inline-flex items-center gap-1.5 !text-xs">
              <Send size={ICON_INLINE} strokeWidth={2} aria-hidden />
              {tr('saveDraft')}
            </button>
            <button
              type="button"
              onClick={() => onPublish(editorBody, editorNote)}
              className="ggon-btn ggon-btn-teal inline-flex items-center gap-1.5 !text-xs"
            >
              <Globe size={ICON_INLINE} strokeWidth={2} aria-hidden />
              {tr('publishToLibrary')}
            </button>
          </div>
        </div>
      )}

      {sub.status === 'published' && sub.publishedSlug && (
        <p className="mt-4 text-sm">
          {tr('status_published')}:{' '}
          <Link href={`/library/${sub.publishedSlug}`} className="ggon-link font-medium hover:underline">
            {tr('dashboardViewPublished')} →
          </Link>
        </p>
      )}

      {canReview && reviewable && !showReviewForm && (
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setPendingAction('approve');
              setShowReviewForm(true);
            }}
            className="ggon-btn ggon-btn-teal inline-flex items-center gap-1.5 !text-xs"
          >
            <Check size={ICON_INLINE} strokeWidth={2} aria-hidden />
            {tr('approveForPublishing')}
          </button>
          <button
            type="button"
            onClick={() => {
              setPendingAction('changes');
              setShowReviewForm(true);
            }}
            className="ggon-btn inline-flex items-center gap-1.5 !text-xs"
          >
            <MessageSquare size={ICON_INLINE} strokeWidth={2} aria-hidden />
            {tr('requestChanges')}
          </button>
          <button
            type="button"
            onClick={() => {
              setPendingAction('reject');
              setShowReviewForm(true);
            }}
            className="inline-flex items-center gap-1.5 rounded bg-red-100 px-3 py-1 text-xs text-red-800"
          >
            <X size={ICON_INLINE} strokeWidth={2} aria-hidden />
            {tr('rejectSubmission')}
          </button>
        </div>
      )}

      {canReview && reviewable && showReviewForm && pendingAction && (
        <div className="mt-4 space-y-3 border border-[#dcdcdc] bg-[#fafafa] p-4">
          <p className="ggon-label text-xs text-[#1a6b7a]">
            {pendingAction === 'approve' && tr('reviewApproveTitle')}
            {pendingAction === 'changes' && tr('reviewChangesTitle')}
            {pendingAction === 'reject' && tr('reviewRejectTitle')}
          </p>
          <label className="block text-sm">
            {tr('reviewCommentLabel')}
            {pendingAction !== 'approve' && <span className="text-[#c45c26]"> *</span>}
            <textarea
              value={reviewNote}
              onChange={(e) => setReviewNote(e.target.value)}
              rows={3}
              className="mt-1 w-full border border-[#dcdcdc] px-3 py-2 text-sm"
              placeholder={
                pendingAction === 'approve'
                  ? tr('reviewApprovePlaceholder')
                  : tr('reviewCommentPlaceholder')
              }
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleReviewAction}
              disabled={(pendingAction === 'reject' || pendingAction === 'changes') && !reviewNote.trim()}
              className="ggon-btn ggon-btn-teal !text-xs disabled:opacity-50"
            >
              {tr('confirmReview')}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowReviewForm(false);
                setPendingAction(null);
                setReviewNote('');
              }}
              className="ggon-btn !text-xs"
            >
              {tr('cancelReview')}
            </button>
          </div>
        </div>
      )}

      <p className="mt-3 text-xs text-gray-400">
        {tr('reviewingAs')} {user.name} <RoleBadge role={user.role} />
      </p>
    </div>
  );
}
