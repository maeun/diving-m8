'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Users, Award, MapPin } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const params = new URLSearchParams();
      params.append('q', searchQuery.trim());
      window.location.href = `/search?${params.toString()}`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="relative min-h-[600px] bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-300 rounded-full blur-3xl"></div>
      </div>

      <div className="relative section-container section-padding">
        <div className="text-center content-container">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            바다 속 모험이
            <br />
            <span className="text-brand-primary">여기서 시작됩니다</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            검증된 전문 강사와 최고의 다이빙 리조트를 만나보세요
            <br />
            <span className="text-lg md:text-xl text-gray-500">
              안전하고 즐거운 다이빙 경험을 약속드립니다
            </span>
          </p>

          {/* Enhanced Search Bar - Single Input */}
          <div className="card-standard p-6 mb-12 max-w-2xl mx-auto">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="강사, 리조트, 지역명을 검색하세요 (예: 제주도 다이빙)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="pl-10 h-12 text-lg border-0 focus:ring-2 focus:ring-[var(--brand-primary)]"
                />
              </div>
              <Button
                onClick={handleSearch}
                className="h-12 px-8 text-lg btn-primary"
              >
                검색하기
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4">
                <Users className="h-8 w-8 text-brand-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">전문 강사</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mx-auto mb-4">
                <Award className="h-8 w-8 text-brand-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">200+</h3>
              <p className="text-gray-600">리조트</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mx-auto mb-4">
                <MapPin className="h-8 w-8 text-[var(--brand-accent)]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">50+</h3>
              <p className="text-gray-600">다이빙 지역</p>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/search?type=instructor">
              <Button className="h-12 px-8 text-lg btn-primary">
                강사 찾기
              </Button>
            </Link>
            <Link href="/search?type=resort">
              <Button className="h-12 px-8 text-lg btn-secondary">
                리조트 찾기
              </Button>
            </Link>
            <Link href="/instructor/register">
              <Button
                variant="outline"
                className="h-12 px-8 text-lg border-2 border-[var(--brand-accent)] text-[var(--brand-accent)] hover:bg-amber-50 transition-all duration-[var(--transition-normal)]"
              >
                강사 등록하기
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
