import type { SubmissionStatus } from '@/types';

const statusStyles: Record<SubmissionStatus, { className: string }> = {
  pending: { className: 'bg-amber-50 text-amber-900 border-amber-200' },
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
  return (
    <span
      className={`inline-block border px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${statusStyles[status].className}`}
    >
      {label}
    </span>
  );
}
