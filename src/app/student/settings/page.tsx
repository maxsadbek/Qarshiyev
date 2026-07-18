import { redirect } from 'next/navigation';
import { getCurrentUser } from '../../../lib/auth';
import { PhoneForm, NoteForm } from './SettingsForms';

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/student/login');

  const student = user.student;
  const latestApp = student?.applications?.[0] ?? null;
  const currentNote = latestApp?.notes ?? '';

  return (
    <div className="space-y-10 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold">⚙️ Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your profile information.</p>
      </div>

      {/* Account Info (Read-only) */}
      <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-3">
        <h2 className="text-lg font-semibold">Account Information</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold">Name</p>
            <p className="mt-0.5 font-medium">{user.firstName} {user.lastName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold">Email</p>
            <p className="mt-0.5 font-medium">{user.email}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold">Role</p>
            <p className="mt-0.5 font-medium capitalize">{user.role.name.toLowerCase()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold">Member Since</p>
            <p className="mt-0.5 font-medium">{user.createdAt.toLocaleDateString('en-GB')}</p>
          </div>
        </div>
      </section>

      {/* Update Phone */}
      <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
        <div>
          <h2 className="text-lg font-semibold">📱 Update Phone</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Update your contact phone number.
          </p>
        </div>
        <PhoneForm currentPhone={user.phone ?? ''} />
      </section>

      {/* Update Note */}
      <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
        <div>
          <h2 className="text-lg font-semibold">📝 Update Note</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Add or edit any additional information about yourself for your teacher.
          </p>
        </div>
        <NoteForm currentNote={currentNote} />
      </section>
    </div>
  );
}
