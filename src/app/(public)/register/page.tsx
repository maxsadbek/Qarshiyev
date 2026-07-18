export const dynamic = 'force-dynamic';

import { RegisterPage } from '@/screens/AuthPages';
import { AuthProvider } from '@/context/AuthContext';

export default function Page() {
  return (
    <AuthProvider>
      <RegisterPage />
    </AuthProvider>
  );
}

