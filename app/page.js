'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // We should wait until the loading state is false before we redirect
    if (!loading) {
      if (isAuthenticated && user) {
        // User is logged in, redirect to their dashboard
        switch (user.role) {
          case 'MANAGER':
            router.push('/manager');
            break;
          case 'COACH':
            router.push('/coach');
            break;
          case 'ARCHER':
            router.push('/archer');
            break;
          default:
            // Fallback if role is unknown, redirect to login
            router.push('/login');
        }
      } else {
        // User is not logged in, redirect to the login page
        router.push('/login');
      }
    }
  }, [isAuthenticated, user, loading, router]);
  
  // Render a loading indicator while the authentication check is in progress.
  // This prevents a flash of content and is good UX.
  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-xl animate-pulse">Loading ArrowLink...</p>
    </div>
  );
}