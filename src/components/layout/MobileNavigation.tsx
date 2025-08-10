'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Plus, Heart, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  requireAuth?: boolean;
}

const navItems: NavItem[] = [
  {
    name: '홈',
    href: '/',
    icon: Home,
  },
  {
    name: '검색',
    href: '/search',
    icon: Search,
  },
  {
    name: '등록',
    href: '/instructor/register',
    icon: Plus,
  },
  {
    name: '저장',
    href: '/profile?tab=saved',
    icon: Heart,
    requireAuth: true,
  },
  {
    name: '프로필',
    href: '/profile',
    icon: User,
    requireAuth: true,
  },
];

export function MobileNavigation() {
  const pathname = usePathname();
  const { user } = useAuth();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href.split('?')[0]);
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-cyan-200/30 shadow-lg safe-area-pb">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          // Skip auth-required items if user is not logged in
          if (item.requireAuth && !user) {
            return null;
          }

          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 mobile-touch-feedback min-w-[60px] ${
                active
                  ? 'text-brand-primary bg-cyan-50'
                  : 'text-gray-600 hover:text-brand-primary hover:bg-gray-50'
              }`}
            >
              <div className={`relative ${active ? 'animate-float' : ''}`}>
                <Icon
                  className={`h-5 w-5 ${active ? 'text-brand-primary' : ''}`}
                />
                {active && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-brand-primary rounded-full animate-pulse"></div>
                )}
              </div>
              <span
                className={`text-xs mt-1 font-medium ${
                  active ? 'text-brand-primary' : ''
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}

        {/* Login button for non-authenticated users */}
        {!user && (
          <Link
            href="/auth/login"
            className="flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 mobile-touch-feedback min-w-[60px] text-gray-600 hover:text-brand-primary hover:bg-gray-50"
          >
            <User className="h-5 w-5" />
            <span className="text-xs mt-1 font-medium">로그인</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
