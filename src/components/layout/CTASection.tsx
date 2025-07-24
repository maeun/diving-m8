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
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-400 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  지금 바로 시작하세요
                </h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  다이빙 메이트와 함께 완벽한 다이빙 경험을 만들어보세요. 전문
                  강사와 최고의 리조트가 여러분을 기다리고 있습니다.
                </p>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <benefit.icon className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/auth/register">
                  <Button className="h-12 px-8 text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105">
                    무료로 시작하기
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/search">
                  <Button
                    variant="outline"
                    className="h-12 px-8 text-lg border-2 hover:bg-gray-50 transition-all duration-200"
                  >
                    둘러보기
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Content - Stats Cards */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      500+
                    </h3>
                    <p className="text-gray-600 font-medium">전문 강사</p>
                    <p className="text-sm text-gray-500 mt-2">
                      검증된 자격증 보유
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-4">
                      <Award className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      200+
                    </h3>
                    <p className="text-gray-600 font-medium">리조트</p>
                    <p className="text-sm text-gray-500 mt-2">
                      최고의 시설과 서비스
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-4">
                      <MapPin className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      50+
                    </h3>
                    <p className="text-gray-600 font-medium">다이빙 지역</p>
                    <p className="text-sm text-gray-500 mt-2">
                      전국 주요 다이빙 포인트
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
                      <CheckCircle className="h-6 w-6 text-red-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      95%
                    </h3>
                    <p className="text-gray-600 font-medium">고객 만족도</p>
                    <p className="text-sm text-gray-500 mt-2">검증된 만족도</p>
                  </CardContent>
                </Card>
              </div>

              {/* Testimonial Preview */}
              <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-bold">김</span>
                    </div>
                    <div>
                      <p className="text-blue-100 mb-3 italic">
                        "다이빙 메이트 덕분에 완벽한 강사를 찾을 수 있었어요.
                        투명한 정보와 전문적인 서비스에 정말 만족합니다!"
                      </p>
                      <div>
                        <p className="font-semibold">김다이버</p>
                        <p className="text-sm text-blue-200">오픈워터 다이버</p>
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
