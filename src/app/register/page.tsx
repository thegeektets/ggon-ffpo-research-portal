'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { usePortalStore } from '@/lib/store';

export default function RegisterPage() {
  const { tr } = useApp();
  const router = useRouter();
  const { addRegistration } = usePortalStore();
  const [done, setDone] = useState(false);

  return (
    <div className="mx-auto max-w-md space-y-6">
      <h1 className="text-2xl font-bold">{tr('register')}</h1>
      {done ? (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
          Registration submitted. An administrator will review your request before granting access.
        </p>
      ) : (
        <form
          className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            addRegistration({
              name: String(fd.get('name')),
              email: String(fd.get('email')),
              organization: String(fd.get('organization')),
            });
            setDone(true);
            setTimeout(() => router.push('/login'), 2000);
          }}
        >
          <label className="block text-sm">
            Full name
            <input name="name" required className="mt-1 w-full rounded border px-3 py-2" />
          </label>
          <label className="block text-sm">
            Email
            <input name="email" type="email" required className="mt-1 w-full rounded border px-3 py-2" />
          </label>
          <label className="block text-sm">
            Organization
            <input name="organization" required className="mt-1 w-full rounded border px-3 py-2" />
          </label>
          <button type="submit" className="w-full rounded-lg bg-emerald-700 py-2 font-medium text-white">
            Request access
          </button>
        </form>
      )}
    </div>
  );
}
