'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar } from 'lucide-react';

export function ComingSoonHero() {
  return (
    <section className="min-h-screen flex items-center justify-center gradient-ocean-light bubble-container relative overflow-hidden">
      {/* Animated Bubbles */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className="bubble w-16 h-16 animate-bubble"
          style={{ animationDelay: '0s' }}
        ></div>
        <div
          className="bubble w-10 h-10 animate-bubble"
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className="bubble w-12 h-12 animate-bubble"
          style={{ animationDelay: '4s' }}
        ></div>
        <div
          className="bubble w-8 h-8 animate-bubble"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="bubble w-20 h-20 animate-bubble"
          style={{ animationDelay: '3s' }}
        ></div>
        <div
          className="bubble w-14 h-14 animate-bubble"
          style={{ animationDelay: '5s' }}
        ></div>
      </div>

      {/* Ocean Wave Background */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-20 left-10 w-40 h-40 bg-cyan-400 rounded-full blur-3xl animate-ocean-wave"></div>
        <div
          className="absolute bottom-20 right-10 w-56 h-56 bg-emerald-400 rounded-full blur-3xl animate-ocean-wave"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute top-1/2 left-1/3 w-32 h-32 bg-blue-300 rounded-full blur-3xl animate-ocean-wave"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      <div className="relative section-container text-center">
        <div className="max-w-4xl mx-auto">
          {/* Coming Soon Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 mb-8 mt-12 animate-fade-in-up">
            <Calendar className="w-5 h-5 text-brand-primary" />
            <span className="text-brand-primary font-semibold text-lg">
              Coming Soon
            </span>
          </div>

          {/* Main Title */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            다이빙메이트
            <br />
            <span
              className="text-brand-primary animate-fade-in-scale"
              style={{ animationDelay: '0.4s' }}
            >
              곧 만나요!
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-xl sm:text-2xl md:text-3xl text-gray-700 mb-8 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: '0.6s' }}
          >
            바다 속 특별한 경험을 위한
            <br />
            <span className="text-brand-secondary font-semibold">
              완벽한 다이빙 파트너
            </span>
            를 찾아드립니다
          </p>

          {/* Launch Info */}
          <div
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 mb-12 shadow-lg animate-fade-in-up"
            style={{ animationDelay: '0.8s' }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2025년 4Q 런칭 예정
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              검증된 다이빙 전문가들과 함께하는 안전하고 특별한 다이빙
            </p>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div
                className="animate-slide-in-left"
                style={{ animationDelay: '1s' }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🤿</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  검증된 전문가
                </h3>
                <p className="text-sm text-gray-600">
                  자격증을 보유한 전문 강사들
                </p>
              </div>

              <div
                className="animate-slide-in-up"
                style={{ animationDelay: '1.2s' }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🏝️</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  최고의 리조트
                </h3>
                <p className="text-sm text-gray-600">엄선된 다이빙 리조트</p>
              </div>

              <div
                className="animate-slide-in-right"
                style={{ animationDelay: '1.4s' }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🌊</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">정보 공유</h3>
                <p className="text-sm text-gray-600">함께 나누는 다이빙 경험</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: '1.6s' }}
          >
            <p className="text-lg text-gray-700 mb-8">
              지금 사전 등록하고 런칭 소식을 가장 먼저 받아보세요!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                className="h-14 px-8 text-lg btn-primary ripple-effect mobile-touch-feedback min-w-[200px]"
                onClick={() =>
                  document
                    .getElementById('notification-signup')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                출시 알림 받기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                variant="outline"
                className="h-14 px-8 text-lg border-2 hover:bg-gray-50 transition-all duration-300 ripple-effect mobile-touch-feedback min-w-[200px]"
                onClick={() =>
                  document
                    .getElementById('pre-registration')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                강사/리조트 사전등록
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
