'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();

  // This effect handles redirection AFTER the initial render has completed.
  useEffect(() => {
    // Wait until the loading state is resolved
    if (loading) {
      return; 
    }

    // If not authenticated after checking, redirect to login
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // If roles are specified and the user's role doesn't match, redirect
    if (allowedRoles && !allowedRoles.includes(user?.role)) {
      console.warn('Access denied: User role not permitted.');
      router.push('/'); // Redirect to a safe default page
    }
  }, [isAuthenticated, user, loading, router, allowedRoles]);

  // **THIS IS THE KEY FIX**
  // While loading, or if the user is not authenticated yet, render a loader.
  // This ensures the server render and the initial client render are identical.
  if (loading || !isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl animate-pulse">Authenticating...</p>
      </div>
    );
  }
  
  // If authenticated and authorized, render the actual page content.
  return children;
};

export default ProtectedRoute;