'use client';

import type { Locale, ResearchAttachment } from '@/types';

const fileTypeLabels: Record<ResearchAttachment['fileType'], string> = {
  pdf: 'PDF',
  xlsx: 'XLSX',
  csv: 'CSV',
  zip: 'ZIP',
  image: 'IMG',
  docx: 'DOCX',
};

const fileTypeColors: Record<ResearchAttachment['fileType'], string> = {
  pdf: '#c0392b',
  xlsx: '#1d6f42',
  csv: '#1d6f42',
  zip: '#6c3483',
  image: '#1a6b7a',
  docx: '#2e5aac',
};

export function ArticleAttachments({
  attachments,
  locale,
  title,
  downloadLabel,
}: {
  attachments: ResearchAttachment[];
  locale: Locale;
  title: string;
  downloadLabel: string;
}) {
  return (
    <section className="overflow-hidden border border-[#dcdcdc] bg-white" style={{ borderLeftWidth: 4, borderLeftColor: '#1a6b7a' }}>
      <div className="border-b border-[#dcdcdc] bg-gradient-to-r from-[#e8f4f6] to-[#f5fafb] px-5 py-4">
        <h2 className="ggon-section-title ggon-label text-base">{title}</h2>
      </div>
      <ul className="divide-y divide-[#ececec]">
        {attachments.map((file) => (
          <li key={file.id} className="flex flex-wrap items-center gap-4 px-5 py-4 transition hover:bg-[#fafafa] sm:flex-nowrap">
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center text-xs font-bold text-white shadow-sm"
              style={{ backgroundColor: fileTypeColors[file.fileType] }}
              aria-hidden
            >
              {fileTypeLabels[file.fileType]}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-[#242424]">{file.label[locale]}</p>
              <p className="mt-0.5 text-sm text-[#7f7f7f]">
                {file.fileName} · {file.sizeLabel}
              </p>
            </div>
            <a
              href={file.url}
              download={file.fileType !== 'image' ? file.fileName : undefined}
              target={file.fileType === 'image' ? '_blank' : undefined}
              rel={file.fileType === 'image' ? 'noreferrer' : undefined}
              className="ggon-btn ggon-btn-teal shrink-0 text-xs"
            >
              {downloadLabel}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
