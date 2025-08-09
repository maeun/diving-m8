'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Search, ArrowLeft, Waves } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl">
        <Card className="card-standard text-center">
          <CardContent className="p-6 md:p-8">
            {/* 404 Illustration with Custom Image */}
            <div className="mb-6">
              <div className="relative w-full max-w-2xl h-48 md:h-64 mx-auto mb-3">
                <Image
                  src="/diving_m8_404.png"
                  alt="다이빙 메이트 404 에러"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Animated Wave Elements - positioned better */}
              <div className="flex justify-center items-end space-x-1 mb-4">
                <div className="w-2 h-6 bg-brand-primary/30 rounded-full animate-wave"></div>
                <div
                  className="w-2 h-4 bg-brand-primary/50 rounded-full animate-wave"
                  style={{ animationDelay: '0.1s' }}
                ></div>
                <div
                  className="w-2 h-8 bg-brand-primary/70 rounded-full animate-wave"
                  style={{ animationDelay: '0.2s' }}
                ></div>
                <div
                  className="w-2 h-3 bg-brand-primary/50 rounded-full animate-wave"
                  style={{ animationDelay: '0.3s' }}
                ></div>
                <div
                  className="w-2 h-5 bg-brand-primary/30 rounded-full animate-wave"
                  style={{ animationDelay: '0.4s' }}
                ></div>
              </div>
            </div>

            {/* Error Message */}
            <div className="mb-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Waves className="h-5 w-5 text-brand-primary" />
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  길을 잃으셨나요?
                </h1>
                <Waves className="h-5 w-5 text-brand-primary scale-x-[-1]" />
              </div>

              <p className="text-base md:text-lg text-gray-600 mb-3 leading-relaxed max-w-md mx-auto">
                바다 깊은 곳처럼 이 페이지도 찾기 어려운 곳에 있는 것 같아요.
              </p>

              <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-lg mx-auto">
                요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다. 다른
                멋진 다이빙 경험을 찾아보세요!
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/">
                  <Button className="w-full sm:w-auto h-11 px-6 btn-primary">
                    <Home className="h-4 w-4 mr-2" />
                    홈으로 돌아가기
                  </Button>
                </Link>

                <Link href="/search">
                  <Button className="w-full sm:w-auto h-11 px-6 btn-secondary">
                    <Search className="h-4 w-4 mr-2" />
                    다이빙 검색하기
                  </Button>
                </Link>
              </div>

              <Button
                variant="ghost"
                onClick={() => window.history.back()}
                className="h-10 px-6 text-sm transition-all duration-[var(--transition-normal)] hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                이전 페이지로
              </Button>
            </div>

            {/* Quick Navigation */}
            <div className="bg-gray-50 rounded-[var(--radius-card)] p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                인기 페이지로 바로가기
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <Link
                  href="/search?type=instructor"
                  className="text-brand-primary hover:text-[var(--brand-primary-hover)] hover:underline transition-colors duration-[var(--transition-normal)]"
                >
                  강사 찾기
                </Link>
                <Link
                  href="/search?type=resort"
                  className="text-brand-secondary hover:text-[var(--brand-secondary-hover)] hover:underline transition-colors duration-[var(--transition-normal)]"
                >
                  리조트 찾기
                </Link>
                <Link
                  href="/instructor/register"
                  className="text-brand-primary hover:text-[var(--brand-primary-hover)] hover:underline transition-colors duration-[var(--transition-normal)]"
                >
                  강사 등록
                </Link>
                <Link
                  href="/resort/register"
                  className="text-brand-secondary hover:text-[var(--brand-secondary-hover)] hover:underline transition-colors duration-[var(--transition-normal)]"
                >
                  리조트 등록
                </Link>
              </div>
            </div>

            {/* Help Links */}
            <div className="pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-3">도움이 필요하신가요?</p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <Link
                  href="/help"
                  className="text-brand-primary hover:text-[var(--brand-primary-hover)] hover:underline transition-colors duration-[var(--transition-normal)]"
                >
                  도움말
                </Link>
                <Link
                  href="/contact"
                  className="text-brand-primary hover:text-[var(--brand-primary-hover)] hover:underline transition-colors duration-[var(--transition-normal)]"
                >
                  문의하기
                </Link>
                <Link
                  href="/faq"
                  className="text-brand-primary hover:text-[var(--brand-primary-hover)] hover:underline transition-colors duration-[var(--transition-normal)]"
                >
                  자주 묻는 질문
                </Link>
                <Link
                  href="/safety"
                  className="text-brand-primary hover:text-[var(--brand-primary-hover)] hover:underline transition-colors duration-[var(--transition-normal)]"
                >
                  안전 가이드
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
