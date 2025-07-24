'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { LoginModal } from './LoginModal';
import {
  User,
  Settings,
  Heart,
  MessageCircle,
  LogOut,
  ChevronDown,
} from 'lucide-react';

export function UserMenu() {
  const { user, userProfile, signOut, loading } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [signOutLoading, setSignOutLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setSignOutLoading(true);
      await signOut();
    } catch (error) {
      console.error('로그아웃 실패:', error);
      alert('로그아웃에 실패했습니다.');
    } finally {
      setSignOutLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <Button
          onClick={() => setShowLoginModal(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <User className="h-4 w-4 mr-2" />
          로그인
        </Button>
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 h-auto p-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user.photoURL || ''} alt={user.displayName} />
            <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">
              {user.displayName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:block font-medium">
            {user.displayName}
          </span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{user.displayName}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link
            href="/profile"
            className="flex items-center gap-2 cursor-pointer"
          >
            <User className="h-4 w-4" />내 프로필
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/profile?tab=saved"
            className="flex items-center gap-2 cursor-pointer"
          >
            <Heart className="h-4 w-4" />
            저장된 항목
            {userProfile?.stats.savedItems && (
              <span className="ml-auto text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                {userProfile.stats.savedItems}
              </span>
            )}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/profile?tab=activity"
            className="flex items-center gap-2 cursor-pointer"
          >
            <MessageCircle className="h-4 w-4" />
            활동 내역
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link
            href="/profile?tab=settings"
            className="flex items-center gap-2 cursor-pointer"
          >
            <Settings className="h-4 w-4" />
            설정
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleSignOut}
          disabled={signOutLoading}
          className="flex items-center gap-2 text-red-600 focus:text-red-600 cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          {signOutLoading ? '로그아웃 중...' : '로그아웃'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
