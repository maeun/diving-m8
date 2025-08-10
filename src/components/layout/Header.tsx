'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import {
  Search,
  Menu,
  X,
  User,
  Settings,
  Heart,
  LogOut,
  Bell,
  MessageCircle,
  ChevronDown,
  UserPlus,
  Building,
} from 'lucide-react';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, userProfile, signOut, loading } = useAuth();
  const pathname = usePathname();

  const navigation = [
    { name: '홈', href: '/' },
    { name: '검색', href: '/search' },
  ];

  const registerMenuItems = [
    {
      name: '강사 등록',
      href: '/instructor/register',
      icon: UserPlus,
      description: '다이빙 강사로 등록하기',
    },
    {
      name: '리조트 등록',
      href: '/resort/register',
      icon: Building,
      description: '다이빙 리조트 등록하기',
    },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-cyan-200/30 shadow-sm">
      <div className="section-container">
        <div className="flex items-center justify-between h-16 md:h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 mobile-touch-feedback"
            aria-label="다이빙 메이트 홈으로 가기"
          >
            <div className="w-8 h-8 gradient-ocean rounded-lg flex items-center justify-center animate-float ripple-effect">
              <span className="text-white font-bold text-sm" aria-hidden="true">
                DM
              </span>
            </div>
            <span className="text-lg md:text-xl font-bold text-gray-900">
              다이빙 메이트
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-[var(--transition-normal)] ${
                  isActive(item.href)
                    ? 'text-brand-primary border-b-2 border-[var(--brand-primary)] pb-1'
                    : 'text-gray-700 hover:text-brand-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Register Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-sm font-medium text-gray-700 hover:text-brand-primary transition-colors duration-[var(--transition-normal)] h-auto p-0"
                >
                  등록하기
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64" align="center">
                {registerMenuItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link href={item.href} className="cursor-pointer">
                      <item.icon className="mr-3 h-4 w-4 text-brand-primary" />
                      <div className="flex flex-col">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-xs text-gray-500">
                          {item.description}
                        </span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
            ) : user ? (
              <>
                {/* Notifications */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 relative"
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </Button>

                {/* Messages */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 relative"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={userProfile?.profilePicture}
                          alt={userProfile?.displayName || '사용자'}
                        />
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {userProfile?.displayName?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">
                          {userProfile?.displayName}
                        </p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {userProfile?.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>내 프로필</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/profile?tab=saved"
                        className="cursor-pointer"
                      >
                        <Heart className="mr-2 h-4 w-4" />
                        <span>저장된 항목</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/profile?tab=settings"
                        className="cursor-pointer"
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        <span>설정</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>로그아웃</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">
                    로그인
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm" className="btn-accent">
                    시작하기
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button - Simplified for bottom nav */}
          <div className="md:hidden flex items-center space-x-2">
            {user && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 relative p-2"
                  aria-label="알림"
                >
                  <Bell className="h-5 w-5" />
                  <span
                    className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"
                    aria-hidden="true"
                  ></span>
                </Button>

                <Link href="/profile">
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full p-0"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={userProfile?.profilePicture}
                        alt={userProfile?.displayName || '사용자'}
                      />
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                        {userProfile?.displayName?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </Link>
              </>
            )}

            {!user && (
              <Link href="/auth/login">
                <Button variant="ghost" size="sm" className="text-sm">
                  로그인
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
