'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Users, Award, MapPin, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export function CTASection() {
  const benefits = [
    {
      icon: CheckCircle,
      title: '검증된 전문가',
      description: '모든 강사와 리조트가 엄격한 검증을 거쳤습니다',
    },
    {
      icon: CheckCircle,
      title: '투명한 정보',
      description: '가격, 서비스, 위치 등 모든 정보를 투명하게 제공합니다',
    },
    {
      icon: CheckCircle,
      title: '안전한 다이빙',
      description:
        '안전 기준을 준수하는 전문가들과 함께 안전한 다이빙을 경험하세요',
    },
    {
      icon: CheckCircle,
      title: '24/7 지원',
      description:
        '언제든지 문의하실 수 있도록 24시간 지원 서비스를 제공합니다',
    },
  ];

  return (
    <section className="section-padding gradient-ocean-light bubble-container relative overflow-hidden">
      {/* Animated Bubbles */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div
          className="bubble w-10 h-10 animate-bubble"
          style={{ animationDelay: '0s' }}
        ></div>
        <div
          className="bubble w-6 h-6 animate-bubble"
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className="bubble w-8 h-8 animate-bubble"
          style={{ animationDelay: '4s' }}
        ></div>
        <div
          className="bubble w-5 h-5 animate-bubble"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="bubble w-12 h-12 animate-bubble"
          style={{ animationDelay: '3s' }}
        ></div>
        <div
          className="bubble w-7 h-7 animate-bubble"
          style={{ animationDelay: '5s' }}
        ></div>
      </div>

      {/* Ocean Wave Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-400 rounded-full blur-3xl animate-ocean-wave"></div>
        <div
          className="absolute bottom-20 right-10 w-40 h-40 bg-emerald-400 rounded-full blur-3xl animate-ocean-wave"
          style={{ animationDelay: '1s' }}
        ></div>
      </div>

      <div className="relative section-container">
        <div className="content-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6 lg:space-y-8 animate-fade-in-up">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 lg:mb-6 leading-tight">
                  당신만의 다이빙 스토리를
                  <br />
                  <span
                    className="text-brand-primary animate-fade-in-scale"
                    style={{ animationDelay: '0.3s' }}
                  >
                    시작해보세요
                  </span>
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 mb-6 lg:mb-8 leading-relaxed">
                  검증된 전문가들과 함께하는 안전하고 특별한 바다 속 여행
                  <br />
                  <span className="text-base sm:text-lg text-gray-500">
                    지금 바로 완벽한 다이빙 파트너를 찾아보세요
                  </span>
                </p>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 animate-slide-in-left mobile-touch-feedback"
                    style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                  >
                    <div
                      className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5 animate-float"
                      style={{ animationDelay: `${1 + index * 0.2}s` }}
                    >
                      <benefit.icon className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                        {benefit.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div
                className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-2 lg:pt-4 animate-fade-in-up"
                style={{ animationDelay: '1.2s' }}
              >
                <Link href="/auth/register" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto h-12 px-6 lg:px-8 text-base lg:text-lg btn-primary ripple-effect mobile-touch-feedback">
                    무료로 시작하기
                    <ArrowRight className="ml-2 h-4 w-4 lg:h-5 lg:w-5" />
                  </Button>
                </Link>
                <a 
                  href="https://forms.gle/czU6re1Q3yHvrQVe8" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full sm:w-auto"
                >
                  <Button className="w-full sm:w-auto h-12 px-6 lg:px-8 text-base lg:text-lg btn-secondary ripple-effect mobile-touch-feedback">
                    강사 등록하기
                  </Button>
                </a>
                <Link href="/search" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto h-12 px-6 lg:px-8 text-base lg:text-lg border-2 hover:bg-gray-50 transition-all duration-[var(--transition-normal)] ripple-effect mobile-touch-feedback"
                  >
                    둘러보기
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Content - Enhanced Stats Cards */}
            <div
              className="space-y-6 animate-slide-in-right"
              style={{ animationDelay: '0.9s' }}
            >
              {/* Main Stats Grid - Improved Layout */}
              <div className="grid grid-cols-2 gap-4 lg:gap-6">
                <Card
                  className="card-ocean mobile-card-stack mobile-touch-feedback animate-fade-in-scale group"
                  style={{ animationDelay: '1.2s' }}
                >
                  <CardContent className="p-6 lg:p-8 text-center">
                    <div
                      className="flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl mx-auto mb-4 animate-float group-hover:scale-110 transition-transform duration-300"
                      style={{ animationDelay: '1.5s' }}
                    >
                      <Users className="h-8 w-8 lg:h-10 lg:w-10 text-brand-primary" />
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                      500+
                    </h3>
                    <p className="text-base lg:text-lg text-gray-600 font-semibold mb-1">
                      전문 강사
                    </p>
                    <p className="text-sm text-gray-500">검증된 자격증 보유</p>
                  </CardContent>
                </Card>

                <Card
                  className="card-ocean mobile-card-stack mobile-touch-feedback animate-fade-in-scale group"
                  style={{ animationDelay: '1.4s' }}
                >
                  <CardContent className="p-6 lg:p-8 text-center">
                    <div
                      className="flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl mx-auto mb-4 animate-float group-hover:scale-110 transition-transform duration-300"
                      style={{ animationDelay: '1.7s' }}
                    >
                      <Award className="h-8 w-8 lg:h-10 lg:w-10 text-brand-secondary" />
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                      200+
                    </h3>
                    <p className="text-base lg:text-lg text-gray-600 font-semibold mb-1">
                      리조트
                    </p>
                    <p className="text-sm text-gray-500">
                      최고의 시설과 서비스
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className="card-ocean mobile-card-stack mobile-touch-feedback animate-fade-in-scale group"
                  style={{ animationDelay: '1.6s' }}
                >
                  <CardContent className="p-6 lg:p-8 text-center">
                    <div
                      className="flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl mx-auto mb-4 animate-float group-hover:scale-110 transition-transform duration-300"
                      style={{ animationDelay: '1.9s' }}
                    >
                      <MapPin className="h-8 w-8 lg:h-10 lg:w-10 text-[var(--brand-accent)]" />
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                      50+
                    </h3>
                    <p className="text-base lg:text-lg text-gray-600 font-semibold mb-1">
                      다이빙 지역
                    </p>
                    <p className="text-sm text-gray-500">
                      전국 주요 다이빙 포인트
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className="card-ocean mobile-card-stack mobile-touch-feedback animate-fade-in-scale group"
                  style={{ animationDelay: '1.8s' }}
                >
                  <CardContent className="p-6 lg:p-8 text-center">
                    <div
                      className="flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl mx-auto mb-4 animate-float group-hover:scale-110 transition-transform duration-300"
                      style={{ animationDelay: '2.1s' }}
                    >
                      <CheckCircle className="h-8 w-8 lg:h-10 lg:w-10 text-[var(--error)]" />
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                      95%
                    </h3>
                    <p className="text-base lg:text-lg text-gray-600 font-semibold mb-1">
                      고객 만족도
                    </p>
                    <p className="text-sm text-gray-500">검증된 만족도</p>
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced Testimonial Preview - Better Spacing */}
              <Card
                className="gradient-ocean text-white mobile-touch-feedback animate-fade-in-up overflow-hidden relative"
                style={{ animationDelay: '2s' }}
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

                <CardContent className="p-6 lg:p-8 relative">
                  <div className="flex items-start gap-4 lg:gap-6">
                    <div
                      className="w-14 h-14 lg:w-16 lg:h-16 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0 animate-float backdrop-blur-sm"
                      style={{ animationDelay: '2.3s' }}
                    >
                      <span className="text-xl lg:text-2xl font-bold">김</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className="w-4 h-4 bg-yellow-400 rounded-full"
                            ></div>
                          ))}
                        </div>
                        <span className="text-sm text-cyan-200">5.0</span>
                      </div>
                      <p className="text-cyan-100 mb-4 italic text-base lg:text-lg leading-relaxed">
                        "다이빙 메이트 덕분에 완벽한 강사를 찾을 수 있었어요.
                        투명한 정보와 전문적인 서비스에 정말 만족합니다!"
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-base lg:text-lg">
                            김다이버
                          </p>
                          <p className="text-sm text-cyan-200">
                            오픈워터 다이버 • 제주도
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-cyan-300">2024.02.15</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
