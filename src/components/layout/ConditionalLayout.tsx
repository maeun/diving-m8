'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BottomNavigation } from '@/components/layout/BottomNavigation';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isComingSoonPage = pathname === '/coming-soon';

  if (isComingSoonPage) {
    // Coming Soon 페이지는 Header, BottomNavigation 없이 렌더링
    return (
      <div className="min-h-screen">
        {children}
      </div>
    );
  }

  // 일반 페이지는 기존 레이아웃
  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer className="hidden md:block" />
      <BottomNavigation />
    </div>
  );
}