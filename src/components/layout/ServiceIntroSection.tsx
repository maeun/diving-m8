'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Users, Award, MapPin, Shield, Heart, Star } from 'lucide-react';

export function ServiceIntroSection() {
  const features = [
    {
      icon: Users,
      title: '전문 강사 매칭',
      description: (
        <>
          인증이 완료된 강사들을
          <br />
          찾을 수 있습니다
        </>
      ),
      color: 'from-blue-100 to-blue-200',
      iconColor: 'text-brand-primary',
    },
    {
      icon: Award,
      title: '인증된 리조트',
      description: (
        <>
          다이빙 리조트에 대한 정보를
          <br />
          미리 확인해보세요
        </>
      ),
      color: 'from-emerald-100 to-emerald-200',
      iconColor: 'text-brand-secondary',
    },
    // {
    //   icon: MapPin,
    //   title: '전국 다이빙 포인트',
    //   description: '전국 주요 다이빙 지역의 상세 정보를 제공합니다',
    //   color: 'from-amber-100 to-amber-200',
    //   iconColor: 'text-[var(--brand-accent)]',
    // },
    // {
    //   icon: Shield,
    //   title: '안전 보장',
    //   description: '체계적인 안전 관리와 보험을 통해 안전을 보장합니다',
    //   color: 'from-red-100 to-red-200',
    //   iconColor: 'text-[var(--error)]',
    // },
    {
      icon: Heart,
      title: '공유하는 경험',
      description: (
        <>
          다른 다이버들의 후기를
          <br />
          참고해보세요
        </>
      ),
      color: 'from-pink-100 to-pink-200',
      iconColor: 'text-pink-600',
    },
    // {
    //   icon: Star,
    //   title: '검증된 품질',
    //   description: '실제 이용자들의 리뷰와 평점으로 검증된 서비스입니다',
    //   color: 'from-purple-100 to-purple-200',
    //   iconColor: 'text-purple-600',
    // },
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="section-container">
        <div className="content-container">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              다이빙메이트가{' '}
              <span className="text-brand-primary">특별한 이유</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              안전하고 전문적인 다이빙 경험을 위해
              <br className="hidden sm:block" />
              인증된 강사와 리조트를 한 곳에서 쉽게 찾을 수 있습니다
            </p>
          </div>
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="card-ocean mobile-card-stack mobile-touch-feedback animate-fade-in-scale group hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`flex items-center justify-center w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl mx-auto mb-6 animate-float group-hover:scale-110 transition-transform duration-300`}
                    style={{ animationDelay: `${0.5 + index * 0.2}s` }}
                  >
                    <feature.icon
                      className={`h-10 w-10 ${feature.iconColor}`}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Stats Section
          <div
            className="bg-white rounded-3xl p-8 md:p-12 shadow-lg animate-fade-in-up"
            style={{ animationDelay: '0.8s' }}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                믿을 수 있는 플랫폼
              </h3>
              <p className="text-lg text-gray-600">
                다이빙 업계 전문가들과 함께 만들어가는 안전한 다이빙 생태계
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div
                className="animate-fade-in-scale"
                style={{ animationDelay: '1s' }}
              >
                <div className="text-3xl md:text-4xl font-bold text-brand-primary mb-2">
                  500+
                </div>
                <div className="text-sm md:text-base text-gray-600">
                  검증된 강사
                </div>
              </div>
              <div
                className="animate-fade-in-scale"
                style={{ animationDelay: '1.1s' }}
              >
                <div className="text-3xl md:text-4xl font-bold text-brand-secondary mb-2">
                  200+
                </div>
                <div className="text-sm md:text-base text-gray-600">
                  프리미엄 리조트
                </div>
              </div>
              <div
                className="animate-fade-in-scale"
                style={{ animationDelay: '1.2s' }}
              >
                <div className="text-3xl md:text-4xl font-bold text-[var(--brand-accent)] mb-2">
                  50+
                </div>
                <div className="text-sm md:text-base text-gray-600">
                  다이빙 지역
                </div>
              </div>
              <div
                className="animate-fade-in-scale"
                style={{ animationDelay: '1.3s' }}
              >
                <div className="text-3xl md:text-4xl font-bold text-[var(--error)] mb-2">
                  95%
                </div>
                <div className="text-sm md:text-base text-gray-600">
                  고객 만족도
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
