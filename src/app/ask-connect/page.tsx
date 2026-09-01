'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';

export default function AskConnectPage() {
  const { tr } = useApp();
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <h1 className="text-2xl font-bold">{tr('askConnect')}</h1>
      <p className="text-gray-600">
        Ask a question or request a connection to a researcher. Notifications would route to Slack/Asana and email in
        production.
      </p>
      {sent ? (
        <p className="ggon-section-alt border border-[#dcdcdc] p-4">
          Your message has been sent to the GGON research coordinator (demo).
        </p>
      ) : (
        <form
          className="space-y-4 rounded-xl border bg-white p-6 shadow-sm"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <label className="block text-sm">
            Your question
            <textarea name="question" required rows={5} className="mt-1 w-full rounded border px-3 py-2" />
          </label>
          <label className="block text-sm">
            Topic area
            <select className="mt-1 w-full rounded border px-3 py-2">
              <option>Finance & public subsidies</option>
              <option>Just transition</option>
              <option>Litigation</option>
              <option>Narratives & communications</option>
              <option>Other</option>
            </select>
          </label>
          <button type="submit" className="ggon-btn ggon-btn-teal">
            Send
          </button>
        </form>
      )}
    </div>
  );
}
