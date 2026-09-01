import { ICON_INLINE, statusIcons } from '@/lib/icons';
import type { SubmissionStatus } from '@/types';

const statusStyles: Record<SubmissionStatus, { className: string }> = {
  draft: { className: 'bg-slate-50 text-slate-700 border-slate-200' },
  submitted: { className: 'bg-amber-50 text-amber-900 border-amber-200' },
  under_review: { className: 'bg-amber-50 text-amber-900 border-amber-200' },
  approved: { className: 'bg-sky-50 text-sky-900 border-sky-200' },
  rejected: { className: 'bg-red-50 text-red-900 border-red-200' },
  changes_requested: { className: 'bg-orange-50 text-orange-900 border-orange-200' },
  published: { className: 'bg-emerald-50 text-emerald-900 border-emerald-200' },
};

export function SubmissionStatusBadge({
  status,
  label,
}: {
  status: SubmissionStatus;
  label: string;
}) {
  const StatusIcon = statusIcons[status];

  return (
    <span
      className={`inline-flex items-center gap-1 border px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${statusStyles[status].className}`}
    >
      <StatusIcon size={ICON_INLINE} strokeWidth={2} className="shrink-0" aria-hidden />
      {label}
    </span>
  );
}
