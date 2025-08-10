'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Bell, Mail, ArrowRight, CheckCircle } from 'lucide-react';

export function NotificationSignupSection() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    // 실제 구현시에는 이메일을 서버로 전송
    // 현재는 시뮬레이션
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
    }, 1000);
  };

  const benefits = [
    '런칭 소식을 가장 먼저 받아보세요',
    '베타 테스터 우선 초대',
    '특별 할인 혜택 제공(베타 테스터 한정)',
  ];

  return (
    <section id="notification-signup" className="section-padding bg-gray-50">
      <div className="section-container">
        <div className="content-container">
          {/* Section Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-brand-primary/10 rounded-full px-6 py-3 mb-6">
              <Bell className="w-5 h-5 text-brand-primary" />
              <span className="text-brand-primary font-semibold">
                출시 알림
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              런칭 소식을
              <span className="text-brand-primary">놓치지 마세요</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              다이빙메이트가 출시되는 순간, 이메일로 알려드릴게요
              <br className="hidden sm:block" />
              지금 등록하고 특별한 혜택도 받으세요
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Side - Benefits */}
              <div className="animate-slide-in-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  알림 신청하면 이런 혜택이!
                </h3>

                <div className="space-y-4 mb-8">
                  {benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 animate-slide-in-left"
                      style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                    >
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-gray-700 text-lg">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="grid grid-cols-1 gap-6 text-center">
                    <div>
                      <div className="text-2xl font-bold text-brand-secondary mb-1">
                        2025 4Q
                      </div>
                      <div className="text-sm text-gray-600">런칭 예정</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Signup Form */}
              <div
                className="animate-slide-in-right"
                style={{ animationDelay: '0.3s' }}
              >
                <Card className="card-ocean mobile-card-stack shadow-lg">
                  <CardContent className="p-8 md:p-10">
                    {!isSubmitted ? (
                      <>
                        <div className="text-center mb-8">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-float">
                            <Mail className="h-8 w-8 text-brand-primary" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            출시 알림 신청
                          </h3>
                          <p className="text-gray-600">
                            이메일을 입력하시면 런칭 소식을 보내드릴게요
                          </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div>
                            <Input
                              type="email"
                              placeholder="이메일 주소를 입력하세요"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="h-14 text-lg"
                              required
                            />
                          </div>

                          <Button
                            type="submit"
                            className="w-full h-14 text-lg btn-primary ripple-effect mobile-touch-feedback"
                            disabled={isLoading || !email}
                          >
                            {isLoading ? (
                              '등록 중...'
                            ) : (
                              <>
                                런칭 알림 신청
                                <ArrowRight className="ml-2 h-5 w-5" />
                              </>
                            )}
                          </Button>
                        </form>

                        <p className="text-sm text-gray-500 text-center mt-4">
                          수집된 이메일 주소는 런칭 알림 관련으로만 사용되며,
                          <br />
                          언제든지 수신 거부할 수 있습니다.
                        </p>
                      </>
                    ) : (
                      <div className="text-center animate-fade-in-up">
                        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-bounce">
                          <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          알림 신청 완료!
                        </h3>
                        <p className="text-gray-600 mb-6">
                          <strong>{email}</strong>으로
                          <br />
                          런칭 소식을 보내드릴게요
                        </p>
                        <div className="bg-brand-primary/5 rounded-xl p-4">
                          <p className="text-brand-primary font-semibold">
                            🎉 베타 테스터 우선 초대 대상자가 되셨습니다!
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
