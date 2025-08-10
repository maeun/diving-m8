'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowRight,
  Building2,
  GraduationCap,
  CheckCircle,
} from 'lucide-react';

export function PreRegistrationSection() {
  const instructorBenefits = [
    '런칭 시 우선 프로필 등록',
    '초기 마케팅 지원',
    '수수료 할인 혜택',
  ];

  const resortBenefits = [
    '런칭 시 프리미엄 노출',
    '마케팅 파트너십',
    '수수료 할인 혜택',
  ];

  return (
    <section
      id="pre-registration"
      className="section-padding gradient-ocean-light bubble-container relative overflow-hidden"
    >
      {/* Animated Bubbles */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className="bubble w-12 h-12 animate-bubble"
          style={{ animationDelay: '0s' }}
        ></div>
        <div
          className="bubble w-8 h-8 animate-bubble"
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className="bubble w-10 h-10 animate-bubble"
          style={{ animationDelay: '4s' }}
        ></div>
        <div
          className="bubble w-6 h-6 animate-bubble"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="bubble w-14 h-14 animate-bubble"
          style={{ animationDelay: '3s' }}
        ></div>
      </div>

      <div className="relative section-container">
        <div className="content-container">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              강사/리조트
              <span className="text-brand-primary"> 사전 등록</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              다이빙메이트와 함께 성장할 파트너를 찾습니다
              <br className="hidden sm:block" />
              지금 사전 등록하고 런칭 혜택을 놓치지 마세요
            </p>
          </div>

          {/* Registration Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Instructor Card */}
            <Card className="card-ocean mobile-card-stack animate-slide-in-left overflow-hidden group hover:shadow-xl transition-all duration-500">
              <CardContent className="p-8 md:p-10">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center animate-float group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="h-8 w-8 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      다이빙 강사
                    </h3>
                    <p className="text-brand-primary font-semibold">
                      Professional Instructor
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  자격증을 보유한 다이빙 강사라면 지금 사전 등록하세요.
                  <br />
                  서비스 런칭과 함께 바로 프로필이 제공됩니다.
                </p>

                {/* Benefits List */}
                <div className="space-y-3 mb-8">
                  {instructorBenefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 animate-slide-in-left"
                      style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                    >
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="https://forms.gle/czU6re1Q3yHvrQVe8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full h-12 text-lg btn-primary ripple-effect mobile-touch-feedback group">
                    강사 사전등록
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* Resort Card */}
            <Card
              className="card-ocean mobile-card-stack animate-slide-in-right overflow-hidden group hover:shadow-xl transition-all duration-500"
              style={{ animationDelay: '0.2s' }}
            >
              <CardContent className="p-8 md:p-10">
                <div className="flex items-center gap-6 mb-8">
                  <div
                    className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center animate-float group-hover:scale-110 transition-transform duration-300"
                    style={{ animationDelay: '0.2s' }}
                  >
                    <Building2 className="h-8 w-8 text-brand-secondary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      다이빙 리조트
                    </h3>
                    <p className="text-brand-secondary font-semibold">
                      Diving Resort
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  다이빙 리조트, 펜션, 다이브샵을 운영하고 계신가요?
                  <br />더 많은 다이버들에게 알려보세요.
                </p>

                {/* Benefits List */}
                <div className="space-y-3 mb-8">
                  {resortBenefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 animate-slide-in-right"
                      style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                    >
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="https://forms.gle/3K4foTtcNLPRuJyB7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full h-12 text-lg btn-secondary ripple-effect mobile-touch-feedback group">
                    리조트 사전등록
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 p-4 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 rounded-xl border border-brand-primary/20">
            <p className="text-center text-gray-700 font-medium">
              💡 <strong>한정 혜택</strong>: 모집 상황에 따라 혜택 제공이 조기
              종료될 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
