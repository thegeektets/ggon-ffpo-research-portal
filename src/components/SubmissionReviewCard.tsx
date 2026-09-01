'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { RoleBadge } from '@/components/Header';
import type { Submission, User } from '@/types';

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
  onApprove: () => void;
  onReject: () => void;
  onRequestChanges: () => void;
  onPublish: (editorBody: string, editorNote: string) => string | null;
  onSaveEditor: (editorBody: string, editorNote: string) => void;
}) {
  const [editorBody, setEditorBody] = useState(sub.editorBody ?? '');
  const [editorNote, setEditorNote] = useState(sub.editorNote ?? '');
  const canReview = ['owner', 'administrator', 'reviewer'].includes(user.role);
  const canPublish = ['owner', 'administrator', 'editor'].includes(user.role);

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
            {sub.submittedBy} · {new Date(sub.submittedAt).toLocaleDateString()} ·{' '}
            <span className="capitalize">{sub.status}</span>
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
        {sub.coverImageUrl && (
          <div className="relative h-24 w-36 shrink-0 overflow-hidden border border-[#dcdcdc]">
            <Image src={sub.coverImageUrl} alt="" fill className="object-cover" sizes="144px" unoptimized={sub.coverImageUrl.startsWith('data:')} />
          </div>
        )}
      </div>

      {sub.files.length > 0 && (
        <div className="mt-4">
          <p className="ggon-label mb-2 text-xs text-gray-500">Uploaded files</p>
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
          External URL:{' '}
          <a href={sub.url} target="_blank" rel="noreferrer" className="ggon-link hover:underline">
            {sub.url}
          </a>
        </p>
      )}

      {sub.reviewerNote && (
        <p className="mt-3 border-l-2 border-[#c45c26] bg-[#fef3e8] px-3 py-2 text-sm">Reviewer note: {sub.reviewerNote}</p>
      )}

      {canPublish && sub.status === 'approved' && (
        <div className="mt-5 space-y-3 border-t border-[#ececec] pt-5">
          <p className="ggon-label text-xs text-[#1a6b7a]">Editor: compose article body before publishing</p>
          <label className="block text-sm">
            Additional body paragraphs <span className="text-gray-500">(separate paragraphs with a blank line)</span>
            <textarea
              value={editorBody}
              onChange={(e) => setEditorBody(e.target.value)}
              rows={6}
              className="mt-1 w-full border border-[#dcdcdc] px-3 py-2 text-sm"
              placeholder="Add context, findings, and analysis here. The summary will appear as the opening paragraph."
            />
          </label>
          <label className="block text-sm">
            Internal editor note
            <input
              value={editorNote}
              onChange={(e) => setEditorNote(e.target.value)}
              className="mt-1 w-full border border-[#dcdcdc] px-3 py-2 text-sm"
              placeholder="Optional note for the review team"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => onSaveEditor(editorBody, editorNote)} className="ggon-btn !text-xs">
              Save draft
            </button>
            <button
              type="button"
              onClick={() => onPublish(editorBody, editorNote)}
              className="ggon-btn ggon-btn-teal !text-xs"
            >
              Publish to library
            </button>
          </div>
        </div>
      )}

      {sub.status === 'published' && sub.publishedSlug && (
        <p className="mt-4 text-sm">
          Published:{' '}
          <Link href={`/library/${sub.publishedSlug}`} className="ggon-link font-medium hover:underline">
            View article →
          </Link>
        </p>
      )}

      {canReview && sub.status === 'pending' && (
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={onApprove} className="ggon-btn ggon-btn-teal !text-xs">
            Approve for publishing
          </button>
          <button type="button" onClick={onRequestChanges} className="ggon-btn !text-xs">
            Request changes
          </button>
          <button type="button" onClick={onReject} className="rounded bg-red-100 px-3 py-1 text-xs text-red-800">
            Reject
          </button>
        </div>
      )}

      <p className="mt-3 text-xs text-gray-400">
        Reviewing as {user.name} <RoleBadge role={user.role} />
      </p>
    </div>
  );
}
