'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { DEMO_PASSWORD, demoUsers } from '@/data/users';
import { useApp } from '@/context/AppContext';

export default function LoginPage() {
  const { setUser, tr } = useApp();
  const router = useRouter();
  const [email, setEmail] = useState('member@ggon.demo');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  return (
    <div className="mx-auto max-w-md space-y-6">
      <h1 className="text-2xl font-bold">{tr('login')}</h1>
      <form
        className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        onSubmit={(e) => {
          e.preventDefault();
          const user = demoUsers.find((u) => u.email === email);
          if (!user || password !== DEMO_PASSWORD) {
            setError('Invalid email or password');
            return;
          }
          if (!user.approved) {
            setError(tr('pendingApproval'));
            return;
          }
          setUser(user);
          router.push('/');
        }}
      >
        {error && <p className="rounded bg-red-50 p-2 text-sm text-red-700">{error}</p>}
        <label className="block text-sm">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            required
          />
        </label>
        <label className="block text-sm">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            required
          />
        </label>
        <button type="submit" className="w-full rounded-lg bg-emerald-700 py-2 font-medium text-white">
          {tr('login')}
        </button>
      </form>
      <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
        <p className="font-medium">{tr('demoCredentials')}</p>
        <ul className="mt-2 space-y-1 font-mono text-xs">
          {demoUsers.map((u) => (
            <li key={u.email}>
              {u.email} — <span className="capitalize">{u.role}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
