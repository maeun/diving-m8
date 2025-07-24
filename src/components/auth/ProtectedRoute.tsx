'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType?: 'consumer' | 'instructor' | 'resort' | 'admin';
  requireApproval?: boolean;
}

export function ProtectedRoute({
  children,
  requiredUserType,
  requireApproval = false,
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/auth');
        return;
      }

      if (requiredUserType && user.userType !== requiredUserType) {
        router.push('/dashboard');
        return;
      }

      if (requireApproval && !user.isApproved) {
        router.push('/dashboard?message=approval-pending');
        return;
      }
    }
  }, [user, loading, router, requiredUserType, requireApproval]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (requiredUserType && user.userType !== requiredUserType) {
    return null;
  }

  if (requireApproval && !user.isApproved) {
    return null;
  }

  return <>{children}</>;
}
