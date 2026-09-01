'use client';

import Link from 'next/link';
import { demoUsers } from '@/data/users';
import { RoleBadge } from '@/components/Header';
import { useApp } from '@/context/AppContext';
import { Building2, ICON_INLINE, LogIn, MessageSquare, Users } from '@/lib/icons';

export default function MembersPage() {
  const { user, tr } = useApp();

  if (!user) {
    return (
      <p className="ggon-section-alt border border-[#dcdcdc] p-4">
        <Link href="/login" className="ggon-link inline-flex items-center gap-1 underline">
          <LogIn size={ICON_INLINE} strokeWidth={2} aria-hidden />
          Log in
        </Link>{' '}
        to view the member directory.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e8f4f6] text-[#1a6b7a]">
          <Users size={20} strokeWidth={1.75} aria-hidden />
        </div>
        <h1 className="text-2xl font-bold">{tr('members')}</h1>
      </div>
      <p className="text-gray-600">GGON network members — direct messaging would be available in the full build.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {demoUsers
          .filter((u) => u.approved)
          .map((member) => (
            <div key={member.id} className="rounded-xl border bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-semibold">{member.name}</h2>
                <RoleBadge role={member.role} />
              </div>
              <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-gray-600">
                <Building2 size={ICON_INLINE} strokeWidth={2} className="shrink-0 text-gray-400" aria-hidden />
                {member.organization}
              </p>
              <p className="mt-2 text-sm text-gray-500">{member.bio}</p>
              <button type="button" className="ggon-link mt-3 inline-flex items-center gap-1.5 text-sm hover:underline">
                <MessageSquare size={ICON_INLINE} strokeWidth={2} aria-hidden />
                Message (demo)
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
