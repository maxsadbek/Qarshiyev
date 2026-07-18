'use client';

import React, { useState, useTransition } from 'react';
import { updatePhone, updateNote } from './actions';

interface FormState {
  success?: string;
  error?: string;
}

function Alert({ state }: { state: FormState }) {
  if (state.success)
    return (
      <p className="text-sm text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-4 py-2.5 rounded-lg border border-green-200 dark:border-green-800">
        ✅ {state.success}
      </p>
    );
  if (state.error)
    return (
      <p className="text-sm text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-4 py-2.5 rounded-lg border border-red-200 dark:border-red-800">
        ❌ {state.error}
      </p>
    );
  return null;
}

export function PhoneForm({ currentPhone }: { currentPhone: string }) {
  const [state, setState] = useState<FormState>({});
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await updatePhone(fd);
      setState(res ?? {});
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1.5">Phone Number</label>
        <input
          name="phone"
          defaultValue={currentPhone}
          className="w-full max-w-sm px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          placeholder="+998 90 000 00 00"
        />
      </div>
      <Alert state={state} />
      <button
        type="submit"
        disabled={isPending}
        className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition"
      >
        {isPending ? 'Saving…' : 'Update Phone'}
      </button>
    </form>
  );
}

export function NoteForm({ currentNote }: { currentNote: string }) {
  const [state, setState] = useState<FormState>({});
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await updateNote(fd);
      setState(res ?? {});
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1.5">Additional Note</label>
        <textarea
          name="note"
          defaultValue={currentNote}
          rows={4}
          className="w-full max-w-lg px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none"
          placeholder="Write any extra information about yourself…"
        />
        <p className="text-xs text-gray-400 mt-1">Max 1000 characters</p>
      </div>
      <Alert state={state} />
      <button
        type="submit"
        disabled={isPending}
        className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition"
      >
        {isPending ? 'Saving…' : 'Update Note'}
      </button>
    </form>
  );
}

