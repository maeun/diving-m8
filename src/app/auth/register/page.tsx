'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  ArrowLeft,
  MessageCircle,
  CheckCircle,
  Shield,
  Zap,
  Users,
  Search,
  Award,
} from 'lucide-react';

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signInWithKakao } = useAuth();
  const router = useRouter();

  const benefits = [
    {
      icon: Zap,
      title: '즉시 시작',
      description: '복잡한 가입 절차 없이 바로 이용 가능',
    },
    {
      icon: Shield,
      title: '안전한 인증',
      description: '카카오의 보안 시스템으로 안전하게',
    },
    {
      icon: CheckCircle,
      title: '신뢰할 수 있는 프로필',
      description: '검증된 카카오 계정 기반 프로필',
    },
  ];

  const features = [
    {
      icon: Search,
      title: '다이빙 강사 찾기',
      description: '전문 강사와 함께 안전한 다이빙 교육을 받아보세요',
    },
    {
      icon: Users,
      title: '리조트 예약',
      description: '검증된 다이빙 리조트에서 완벽한 휴가를 즐기세요',
    },
    {
      icon: Award,
      title: '강사/리조트 등록',
      description: '가입 후 프로필에서 간편하게 인증을 신청할 수 있어요',
    },
  ];

  const handleKakaoRegister = async () => {
    setLoading(true);
    setError('');

    try {
      await signInWithKakao();
      router.push('/');
    } catch (err) {
      setError('카카오 회원가입에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 px-4">
      <div className="w-full max-w-2xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            홈으로 돌아가기
          </Link>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">DM</span>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              다이빙 메이트 시작하기
            </CardTitle>
            <p className="text-gray-600 mt-2">
              카카오 계정으로 간편하게 가입하고 다이빙의 세계를 탐험하세요
            </p>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* What you can do */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 text-center">
                다이빙 메이트에서 할 수 있는 일
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <feature.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Kakao Register Button */}
            <Button
              onClick={handleKakaoRegister}
              disabled={loading}
              className="w-full h-14 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium text-base rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin mr-3" />
              ) : (
                <MessageCircle className="h-5 w-5 mr-3" />
              )}
              카카오로 시작하기
            </Button>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-4 rounded-lg border border-red-200">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  {error}
                </div>
              </div>
            )}

            {/* Benefits */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700 text-center">
                카카오로 가입하면 좋은 점
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="text-center p-4 bg-blue-50 rounded-lg"
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <benefit.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      {benefit.title}
                    </p>
                    <p className="text-xs text-gray-600">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Professional Registration Info */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
              <div className="text-center">
                <Award className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">
                  강사 또는 리조트 운영자이신가요?
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  다이빙 메이트에서 전문가로 활동하고 싶으시다면 바로
                  등록하세요!
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <Link href="/instructor/register" className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full h-10 text-sm border-blue-200 text-blue-700 hover:bg-blue-50 transition-all duration-[var(--transition-normal)]"
                    >
                      강사 등록하기
                    </Button>
                  </Link>
                  <Link href="/resort/register" className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full h-10 text-sm border-green-200 text-green-700 hover:bg-green-50 transition-all duration-[var(--transition-normal)]"
                    >
                      리조트 등록하기
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                  <span>✓ 간편한 인증 절차</span>
                  <span>✓ 빠른 승인 처리</span>
                  <span>✓ 전문가 프로필</span>
                </div>
              </div>
            </div>

            {/* Already have account */}
            <div className="text-center pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                이미 계정이 있으신가요?{' '}
                <Link
                  href="/auth/login"
                  className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
                >
                  로그인하기
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-500 space-y-2">
          <p>
            가입하면{' '}
            <Link href="/terms" className="text-blue-600 hover:underline">
              이용약관
            </Link>
            과{' '}
            <Link href="/privacy" className="text-blue-600 hover:underline">
              개인정보처리방침
            </Link>
            에 동의하는 것으로 간주됩니다.
          </p>
          <p className="text-gray-400">
            카카오 계정 정보는 안전하게 보호되며, 필요한 정보만 수집합니다.
          </p>
        </div>
      </div>
    </div>
  );
}
