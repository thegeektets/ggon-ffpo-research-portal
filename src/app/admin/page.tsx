'use client';

import Link from 'next/link';
import { researchLibrary } from '@/data/research';
import { demoUsers } from '@/data/users';
import { RoleBadge } from '@/components/Header';
import { useApp } from '@/context/AppContext';
import { usePortalStore } from '@/lib/store';

export default function AdminPage() {
  const { user } = useApp();
  const { submissions, registrations, updateSubmission, approveRegistration, rejectRegistration } =
    usePortalStore();

  if (!user || !['owner', 'administrator', 'editor', 'reviewer'].includes(user.role)) {
    return (
      <p className="ggon-section-alt border border-[#dcdcdc] p-4">
        Admin access required. <Link href="/login" className="ggon-link underline">Log in</Link> as
        admin@ggon.demo
      </p>
    );
  }

  const canApprove = ['owner', 'administrator', 'reviewer'].includes(user.role);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600">
          Logged in as {user.name} <RoleBadge role={user.role} />
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-4">
        {[
          { label: 'Published research', value: researchLibrary.length },
          { label: 'Pending submissions', value: submissions.filter((s) => s.status === 'pending').length },
          { label: 'Registration queue', value: registrations.length },
          { label: 'Members', value: demoUsers.length },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border bg-white p-4 shadow-sm">
            <p className="ggon-label text-2xl">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </section>

      {canApprove && (
        <>
          <section>
            <h2 className="text-lg font-semibold">Submission review queue</h2>
            <div className="mt-3 space-y-3">
              {submissions.map((sub) => (
                <div key={sub.id} className="rounded-lg border bg-white p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-medium">{sub.title}</p>
                      <p className="text-sm text-gray-600">{sub.summary}</p>
                      <p className="mt-1 text-xs text-gray-500">
                        {sub.submittedBy} · {new Date(sub.submittedAt).toLocaleDateString()} ·{' '}
                        <span className="capitalize">{sub.status}</span>
                      </p>
                    </div>
                    {sub.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => updateSubmission(sub.id, 'approved')}
                          className="ggon-btn ggon-btn-teal !py-1 !text-xs"
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => updateSubmission(sub.id, 'changes_requested')}
                          className="rounded border px-3 py-1 text-sm"
                        >
                          Request changes
                        </button>
                        <button
                          type="button"
                          onClick={() => updateSubmission(sub.id, 'rejected')}
                          className="rounded bg-red-100 px-3 py-1 text-sm text-red-800"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold">Membership approval queue</h2>
            <div className="mt-3 space-y-3">
              {registrations.length === 0 && <p className="text-sm text-gray-500">No pending registrations.</p>}
              {registrations.map((reg) => (
                <div key={reg.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border bg-white p-4">
                  <div>
                    <p className="font-medium">{reg.name}</p>
                    <p className="text-sm text-gray-600">
                      {reg.email} · {reg.organization}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => approveRegistration(reg.id)}
                      className="ggon-btn ggon-btn-teal !py-1 !text-xs"
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => rejectRegistration(reg.id)}
                      className="rounded border px-3 py-1 text-sm"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {user.role === 'owner' && (
        <section>
          <h2 className="text-lg font-semibold">Team & roles</h2>
          <table className="mt-3 w-full text-left text-sm">
            <thead>
              <tr className="border-b text-gray-500">
                <th className="py-2">Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {demoUsers.map((u) => (
                <tr key={u.id} className="border-b">
                  <td className="py-2">{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <RoleBadge role={u.role} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}
