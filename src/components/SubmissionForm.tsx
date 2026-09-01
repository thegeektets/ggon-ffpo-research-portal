'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { filterOptions } from '@/data/research';
import { fileTypeFromName, formatFileSize, readFileAsDataUrl } from '@/lib/files';
import { FileText, ICON_INLINE, ImageIcon, Paperclip, Send, Tags, X } from '@/lib/icons';
import type { Submission, SubmissionFile } from '@/types';

function splitList(value: string): string[] {
  return value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

const inputClass = 'mt-1 w-full border border-[#dcdcdc] px-3 py-2 text-sm';
const labelClass = 'block text-sm font-medium text-[#444]';

type SubmissionData = Omit<Submission, 'id' | 'submittedAt' | 'status'>;

export function SubmissionForm({
  submittedBy,
  initialData,
  onSubmit,
  onSaveDraft,
}: {
  submittedBy: string;
  initialData?: Partial<SubmissionData>;
  onSubmit: (data: SubmissionData) => void;
  onSaveDraft?: (data: SubmissionData) => void;
}) {
  const { tr } = useApp();
  const [error, setError] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(initialData?.coverImageUrl ?? null);
  const [files, setFiles] = useState<SubmissionFile[]>(initialData?.files ?? []);

  const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await readFileAsDataUrl(file, 3);
      setCoverPreview(dataUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Cover upload failed');
    }
  };

  const handleFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files;
    if (!list?.length) return;
    setError(null);
    try {
      const uploaded: SubmissionFile[] = [];
      for (const file of Array.from(list)) {
        const dataUrl = await readFileAsDataUrl(file, 5);
        uploaded.push({
          id: `f-${Date.now()}-${uploaded.length}`,
          label: file.name.replace(/\.[^.]+$/, ''),
          fileName: file.name,
          url: dataUrl,
          fileType: fileTypeFromName(file.name),
          sizeLabel: formatFileSize(file.size),
        });
      }
      setFiles((prev) => [...prev, ...uploaded]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'File upload failed');
    }
  };

  const collectFormData = (form: HTMLFormElement): SubmissionData => {
    const fd = new FormData(form);
    return {
      title: String(fd.get('title') || 'Untitled draft'),
      summary: String(fd.get('summary') || ''),
      url: String(fd.get('url') || '') || undefined,
      submittedBy,
      authors: splitList(String(fd.get('authors') || '')),
      organization: String(fd.get('organization') || ''),
      year: Number(fd.get('year')) || new Date().getFullYear(),
      geographicScope: (String(fd.get('geographicScope')) || 'Global') as Submission['geographicScope'],
      country: String(fd.get('country') || '') || undefined,
      industrySide: (String(fd.get('industrySide')) || 'Both') as Submission['industrySide'],
      petroleumChain: (String(fd.get('petroleumChain')) || 'Multiple') as Submission['petroleumChain'],
      category: (String(fd.get('category')) || filterOptions.category[0]) as Submission['category'],
      contentType: (String(fd.get('contentType')) || filterOptions.contentType[0]) as Submission['contentType'],
      rwgPriorities: splitList(String(fd.get('rwgPriorities') || '')),
      workingGroups: splitList(String(fd.get('workingGroups') || '')),
      subjects: splitList(String(fd.get('subjects') || '')),
      tags: splitList(String(fd.get('tags') || '')),
      coverImageUrl: coverPreview ?? undefined,
      files,
    };
  };

  return (
    <form
      id="submission-form"
      className="space-y-8"
      onSubmit={(e) => {
        e.preventDefault();
        setError(null);

        if (!coverPreview) {
          setError('Please upload a cover image for the article.');
          return;
        }
        const fd = new FormData(e.currentTarget);
        if (files.length === 0 && !String(fd.get('url') || '').trim()) {
          setError('Upload at least one file (PDF, dataset, etc.) or provide an external URL.');
          return;
        }

        onSubmit(collectFormData(e.currentTarget));
      }}
    >
      <section className="space-y-4 border border-[#dcdcdc] bg-white p-6">
        <h2 className="ggon-section-title ggon-label inline-flex items-center gap-2 text-sm">
          <FileText size={ICON_INLINE} strokeWidth={2} className="text-[#1a6b7a]" aria-hidden />
          Core details
        </h2>
        <label className={labelClass}>
          Title
          <input name="title" required defaultValue={initialData?.title} className={inputClass} />
        </label>
        <label className={labelClass}>
          Summary
          <textarea name="summary" required rows={4} defaultValue={initialData?.summary} className={inputClass} />
        </label>
        <label className={labelClass}>
          Authors <span className="font-normal text-gray-500">(comma-separated)</span>
          <input
            name="authors"
            required
            defaultValue={initialData?.authors?.join(', ')}
            placeholder="A. Author, B. Co-author"
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Organization
          <input name="organization" required defaultValue={initialData?.organization} className={inputClass} />
        </label>
        <label className={labelClass}>
          Year
          <input
            name="year"
            type="number"
            required
            defaultValue={initialData?.year ?? 2025}
            min={2000}
            max={2030}
            className={inputClass}
          />
        </label>
      </section>

      <section className="space-y-4 border border-[#dcdcdc] bg-white p-6">
        <h2 className="ggon-section-title ggon-label inline-flex items-center gap-2 text-sm">
          <Tags size={ICON_INLINE} strokeWidth={2} className="text-[#1a6b7a]" aria-hidden />
          Classification
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {(
            [
              ['geographicScope', 'Geographic scope', filterOptions.geographicScope],
              ['industrySide', 'Industry side', filterOptions.industrySide],
              ['petroleumChain', 'Petroleum chain', filterOptions.petroleumChain],
              ['category', 'Category', filterOptions.category],
              ['contentType', 'Content type', filterOptions.contentType],
            ] as const
          ).map(([name, label, options]) => (
            <label key={name} className={labelClass}>
              {label}
              <select
                name={name}
                required
                defaultValue={initialData?.[name as keyof SubmissionData] as string}
                className={inputClass}
              >
                <option value="">Select…</option>
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>
          ))}
          <label className={labelClass}>
            Country / region <span className="font-normal text-gray-500">(optional)</span>
            <input name="country" defaultValue={initialData?.country} placeholder="e.g. Nigeria, EU" className={inputClass} />
          </label>
        </div>
        <label className={labelClass}>
          RWG priorities <span className="font-normal text-gray-500">(comma-separated)</span>
          <input
            name="rwgPriorities"
            defaultValue={initialData?.rwgPriorities?.join(', ')}
            placeholder={filterOptions.rwgPriorities[0]}
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Working groups <span className="font-normal text-gray-500">(comma-separated)</span>
          <input
            name="workingGroups"
            defaultValue={initialData?.workingGroups?.join(', ')}
            placeholder={filterOptions.workingGroups[0]}
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Subjects <span className="font-normal text-gray-500">(comma-separated)</span>
          <input
            name="subjects"
            defaultValue={initialData?.subjects?.join(', ')}
            placeholder="e.g. Litigation, Gas"
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Tags <span className="font-normal text-gray-500">(comma-separated)</span>
          <input
            name="tags"
            required
            defaultValue={initialData?.tags?.join(', ')}
            placeholder="finance, africa, litigation"
            className={inputClass}
          />
        </label>
      </section>

      <section className="space-y-4 border border-[#dcdcdc] bg-white p-6">
        <h2 className="ggon-section-title ggon-label inline-flex items-center gap-2 text-sm">
          <Paperclip size={ICON_INLINE} strokeWidth={2} className="text-[#1a6b7a]" aria-hidden />
          Files & media
        </h2>
        <label className={labelClass}>
          <span className="inline-flex items-center gap-1.5">
            <ImageIcon size={ICON_INLINE} strokeWidth={2} className="text-[#7f7f7f]" aria-hidden />
            Cover image <span className="text-[#c45c26]">*</span>
          </span>
          <input type="file" accept="image/*" onChange={handleCoverChange} className="mt-1 text-sm" />
        </label>
        {coverPreview && (
          <div className="relative h-40 w-full max-w-md overflow-hidden border border-[#dcdcdc]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={coverPreview} alt="Cover preview" className="h-full w-full object-cover" />
          </div>
        )}
        <label className={labelClass}>
          Research files <span className="font-normal text-gray-500">(PDF, CSV, XLSX, ZIP — max 5 MB each)</span>
          <input
            type="file"
            multiple
            accept=".pdf,.csv,.xlsx,.xls,.zip,.doc,.docx,image/*"
            onChange={handleFilesChange}
            className="mt-1 text-sm"
          />
        </label>
        {files.length > 0 && (
          <ul className="space-y-2 text-sm">
            {files.map((file) => (
              <li
                key={file.id}
                className="flex items-center justify-between border border-[#ececec] bg-[#fafafa] px-3 py-2"
              >
                <span>
                  {file.fileName} · {file.sizeLabel}
                </span>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-xs text-red-600"
                  onClick={() => setFiles((prev) => prev.filter((f) => f.id !== file.id))}
                >
                  <X size={14} strokeWidth={2} aria-hidden />
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        <label className={labelClass}>
          External URL <span className="font-normal text-gray-500">(optional if files uploaded)</span>
          <input name="url" type="url" defaultValue={initialData?.url} placeholder="https://…" className={inputClass} />
        </label>
      </section>

      {error && <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}

      <div className="flex flex-wrap gap-3">
        {onSaveDraft && (
          <button
            type="button"
            className="ggon-btn"
            onClick={() => {
              setError(null);
              const form = document.getElementById('submission-form') as HTMLFormElement | null;
              if (!form) return;
              onSaveDraft(collectFormData(form));
            }}
          >
            {tr('saveAsDraft')}
          </button>
        )}
        <button type="submit" className="ggon-btn ggon-btn-teal inline-flex items-center gap-2">
          <Send size={ICON_INLINE} strokeWidth={2} aria-hidden />
          {tr('submitForReview')}
        </button>
      </div>
    </form>
  );
}
