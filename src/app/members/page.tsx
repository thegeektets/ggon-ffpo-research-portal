'use client';

import Link from 'next/link';
import { demoUsers } from '@/data/users';
import { RoleBadge } from '@/components/Header';
import { useApp } from '@/context/AppContext';

export default function MembersPage() {
  const { user, tr } = useApp();

  if (!user) {
    return (
      <p className="ggon-section-alt border border-[#dcdcdc] p-4">
        <Link href="/login" className="ggon-link underline">
          Log in
        </Link>{' '}
        to view the member directory.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{tr('members')}</h1>
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
              <p className="text-sm text-gray-600">{member.organization}</p>
              <p className="mt-2 text-sm text-gray-500">{member.bio}</p>
              <button type="button" className="ggon-link mt-3 text-sm hover:underline">
                Message (demo)
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
