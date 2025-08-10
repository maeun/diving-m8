'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Search, 
  Heart, 
  User, 
  MessageCircle,
  Bell 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export function BottomNavigation() {
  const pathname = usePathname();
  const { user } = useAuth();

  const navigationItems = [
    {
      name: '홈',
      href: '/',
      icon: Home,
      activeIcon: Home,
    },
    {
      name: '검색',
      href: '/search',
      icon: Search,
      activeIcon: Search,
    },
    {
      name: '저장됨',
      href: '/profile?tab=saved',
      icon: Heart,
      activeIcon: Heart,
      requiresAuth: true,
    },
    {
      name: '메시지',
      href: '/messages',
      icon: MessageCircle,
      activeIcon: MessageCircle,
      requiresAuth: true,
      badge: true,
    },
    {
      name: '프로필',
      href: user ? '/profile' : '/auth/login',
      icon: User,
      activeIcon: User,
    },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const visibleItems = navigationItems.filter(item => 
    !item.requiresAuth || (item.requiresAuth && user)
  );

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50 safe-area-pb"
      role="navigation"
      aria-label="메인 네비게이션"
    >
      <div className="grid h-16" style={{ gridTemplateColumns: `repeat(${visibleItems.length}, 1fr)` }}>
        {visibleItems.map((item) => {
          const Icon = isActive(item.href) ? item.activeIcon : item.icon;
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center relative transition-colors duration-200 ${
                active 
                  ? 'text-brand-primary' 
                  : 'text-gray-500 hover:text-gray-700 active:text-brand-primary'
              }`}
              aria-label={`${item.name}${active ? ' - 현재 페이지' : ''}`}
              role="tab"
              aria-selected={active}
            >
              <div className="relative">
                <Icon 
                  className={`h-5 w-5 ${active ? 'fill-current' : ''}`} 
                  aria-hidden="true"
                />
                {item.badge && user && (
                  <span 
                    className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"
                    aria-label="새 메시지 있음"
                  />
                )}
              </div>
              <span className={`text-xs mt-1 ${active ? 'font-medium' : ''}`}>
                {item.name}
              </span>
              
              {active && (
                <div 
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-brand-primary rounded-full"
                  aria-hidden="true"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}