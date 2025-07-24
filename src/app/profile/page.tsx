'use client';

import React from 'react';
import { UserProfileView } from '@/components/profile/UserProfileView';

export default function ProfilePage() {
  // In real app, this would come from authentication context
  const userId = 'user1'; // Mock user ID

  return <UserProfileView userId={userId} />;
}
