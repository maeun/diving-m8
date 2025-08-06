'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  ArrowLeft,
  Shield,
  Users,
  CheckCircle,
  MessageCircle,
} from 'lucide-react';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signInWithKakao } = useAuth();
  const router = useRouter();

  const handleKakaoLogin = async () => {
    setLoading(true);
    setError('');

    try {
      await signInWithKakao();
      router.push('/');
    } catch (err) {
      setError('카카오 로그인에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    {
      icon: Shield,
      title: '안전한 로그인',
      description: '카카오의 보안 시스템으로 안전하게 로그인하세요',
    },
    {
      icon: Users,
      title: '간편한 가입',
      description: '복잡한 회원가입 없이 바로 시작할 수 있어요',
    },
    {
      icon: CheckCircle,
      title: '신뢰할 수 있는 서비스',
      description: '검증된 카카오 계정으로 더욱 안전하게',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
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
              다이빙 메이트에 로그인
            </CardTitle>
            <p className="text-gray-600 mt-2">
              카카오 계정으로 간편하게 시작하세요
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Kakao Login Button */}
            <Button
              onClick={handleKakaoLogin}
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
            <div className="space-y-4 pt-4">
              <h3 className="text-sm font-medium text-gray-700 text-center">
                카카오 로그인의 장점
              </h3>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <benefit.icon className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {benefit.title}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">처음 방문하시나요?</p>
                  <p className="text-xs">
                    카카오 로그인 시 자동으로 회원가입이 완료됩니다. 별도의 가입
                    절차가 필요하지 않아요!
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-500 space-y-2">
          <p>
            로그인하면{' '}
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
            카카오 계정 정보는 안전하게 보호됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
