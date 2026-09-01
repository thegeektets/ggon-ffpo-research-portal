'use client';

import { useState } from 'react';
import { filterOptions } from '@/data/research';
import { fileTypeFromName, formatFileSize, readFileAsDataUrl } from '@/lib/files';
import type { Submission, SubmissionFile } from '@/types';

function splitList(value: string): string[] {
  return value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

const inputClass = 'mt-1 w-full border border-[#dcdcdc] px-3 py-2 text-sm';
const labelClass = 'block text-sm font-medium text-[#444]';

export function SubmissionForm({
  submittedBy,
  onSubmit,
}: {
  submittedBy: string;
  onSubmit: (data: Omit<Submission, 'id' | 'submittedAt' | 'status'>) => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [files, setFiles] = useState<SubmissionFile[]>([]);

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

  return (
    <form
      className="space-y-8"
      onSubmit={(e) => {
        e.preventDefault();
        setError(null);
        const fd = new FormData(e.currentTarget);

        if (!coverPreview) {
          setError('Please upload a cover image for the article.');
          return;
        }
        if (files.length === 0 && !String(fd.get('url') || '').trim()) {
          setError('Upload at least one file (PDF, dataset, etc.) or provide an external URL.');
          return;
        }

        onSubmit({
          title: String(fd.get('title')),
          summary: String(fd.get('summary')),
          url: String(fd.get('url') || '') || undefined,
          submittedBy,
          authors: splitList(String(fd.get('authors'))),
          organization: String(fd.get('organization')),
          year: Number(fd.get('year')),
          geographicScope: String(fd.get('geographicScope')) as Submission['geographicScope'],
          country: String(fd.get('country') || '') || undefined,
          industrySide: String(fd.get('industrySide')) as Submission['industrySide'],
          petroleumChain: String(fd.get('petroleumChain')) as Submission['petroleumChain'],
          category: String(fd.get('category')) as Submission['category'],
          contentType: String(fd.get('contentType')) as Submission['contentType'],
          rwgPriorities: splitList(String(fd.get('rwgPriorities'))),
          workingGroups: splitList(String(fd.get('workingGroups'))),
          subjects: splitList(String(fd.get('subjects'))),
          tags: splitList(String(fd.get('tags'))),
          coverImageUrl: coverPreview,
          files,
        });
      }}
    >
      <section className="space-y-4 border border-[#dcdcdc] bg-white p-6">
        <h2 className="ggon-section-title ggon-label text-sm">Core details</h2>
        <label className={labelClass}>
          Title
          <input name="title" required className={inputClass} />
        </label>
        <label className={labelClass}>
          Summary
          <textarea name="summary" required rows={4} className={inputClass} />
        </label>
        <label className={labelClass}>
          Authors <span className="font-normal text-gray-500">(comma-separated)</span>
          <input name="authors" required placeholder="A. Author, B. Co-author" className={inputClass} />
        </label>
        <label className={labelClass}>
          Organization
          <input name="organization" required className={inputClass} />
        </label>
        <label className={labelClass}>
          Year
          <input name="year" type="number" required defaultValue={2025} min={2000} max={2030} className={inputClass} />
        </label>
      </section>

      <section className="space-y-4 border border-[#dcdcdc] bg-white p-6">
        <h2 className="ggon-section-title ggon-label text-sm">Classification</h2>
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
              <select name={name} required className={inputClass}>
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
            <input name="country" placeholder="e.g. Nigeria, EU" className={inputClass} />
          </label>
        </div>
        <label className={labelClass}>
          RWG priorities <span className="font-normal text-gray-500">(comma-separated)</span>
          <input name="rwgPriorities" placeholder={filterOptions.rwgPriorities[0]} className={inputClass} />
        </label>
        <label className={labelClass}>
          Working groups <span className="font-normal text-gray-500">(comma-separated)</span>
          <input name="workingGroups" placeholder={filterOptions.workingGroups[0]} className={inputClass} />
        </label>
        <label className={labelClass}>
          Subjects <span className="font-normal text-gray-500">(comma-separated)</span>
          <input name="subjects" placeholder="e.g. Litigation, Gas" className={inputClass} />
        </label>
        <label className={labelClass}>
          Tags <span className="font-normal text-gray-500">(comma-separated)</span>
          <input name="tags" required placeholder="finance, africa, litigation" className={inputClass} />
        </label>
      </section>

      <section className="space-y-4 border border-[#dcdcdc] bg-white p-6">
        <h2 className="ggon-section-title ggon-label text-sm">Files & media</h2>
        <label className={labelClass}>
          Cover image <span className="text-[#c45c26]">*</span>
          <input type="file" accept="image/*" required onChange={handleCoverChange} className="mt-1 text-sm" />
        </label>
        {coverPreview && (
          <div className="relative h-40 w-full max-w-md overflow-hidden border border-[#dcdcdc]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={coverPreview} alt="Cover preview" className="h-full w-full object-cover" />
          </div>
        )}
        <label className={labelClass}>
          Research files <span className="font-normal text-gray-500">(PDF, CSV, XLSX, ZIP — max 5 MB each)</span>
          <input type="file" multiple accept=".pdf,.csv,.xlsx,.xls,.zip,.doc,.docx,image/*" onChange={handleFilesChange} className="mt-1 text-sm" />
        </label>
        {files.length > 0 && (
          <ul className="space-y-2 text-sm">
            {files.map((file) => (
              <li key={file.id} className="flex items-center justify-between border border-[#ececec] bg-[#fafafa] px-3 py-2">
                <span>
                  {file.fileName} · {file.sizeLabel}
                </span>
                <button type="button" className="text-xs text-red-600" onClick={() => setFiles((prev) => prev.filter((f) => f.id !== file.id))}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        <label className={labelClass}>
          External URL <span className="font-normal text-gray-500">(optional if files uploaded)</span>
          <input name="url" type="url" placeholder="https://…" className={inputClass} />
        </label>
      </section>

      {error && <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}

      <button type="submit" className="ggon-btn ggon-btn-teal">
        Submit for review
      </button>
    </form>
  );
}
