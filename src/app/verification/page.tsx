'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { VerificationRequestComponent } from '@/components/profile/VerificationRequest';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { VerificationRequest } from '@/types';
import { ArrowLeft, Shield } from 'lucide-react';
import Link from 'next/link';

export default function VerificationPage() {
  const [existingRequest, setExistingRequest] =
    useState<VerificationRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, userProfile } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const userType =
    (searchParams.get('type') as 'instructor' | 'resort') || 'instructor';

  useEffect(() => {
    // 실제 구현에서는 사용자의 기존 인증 요청을 확인
    const checkExistingRequest = async () => {
      if (!user) {
        router.push('/auth/login');
        return;
      }

      setLoading(true);

      try {
        // Mock: 기존 요청 확인
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // 예시: 기존 요청이 있는 경우
        // setExistingRequest(mockExistingRequest);

        setExistingRequest(null); // 새 요청
      } catch (error) {
        console.error('기존 요청 확인 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    checkExistingRequest();
  }, [user, router]);

  const handleSubmitVerification = async (
    data: Partial<VerificationRequest>
  ) => {
    try {
      // 실제 구현에서는 서버에 인증 요청 제출
      console.log('인증 요청 제출:', data);

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 성공 시 프로필 페이지로 리다이렉트
      router.push('/profile?tab=verification&success=true');
    } catch (error) {
      console.error('인증 요청 제출 실패:', error);
      throw error;
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">인증 정보를 확인하고 있습니다...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center py-12 px-4">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="p-8">
            <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">로그인이 필요합니다</h2>
            <p className="text-gray-600 mb-6">
              인증 요청을 위해서는 먼저 로그인해주세요.
            </p>
            <Link href="/auth/login">
              <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900">
                카카오로 로그인
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={handleCancel}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            돌아가기
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {userType === 'instructor' ? '강사' : '리조트'} 인증
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {userType === 'instructor'
              ? '다이빙 강사로 활동하기 위해 자격증과 경력을 인증받으세요. 인증 완료 후 학생들을 가르칠 수 있습니다.'
              : '다이빙 리조트 운영자로 등록하기 위해 사업자 정보와 시설을 인증받으세요. 인증 완료 후 고객들에게 서비스를 제공할 수 있습니다.'}
          </p>
        </div>

        {/* Verification Form */}
        <VerificationRequestComponent
          userType={userType}
          existingRequest={existingRequest}
          onSubmit={handleSubmitVerification}
          onCancel={handleCancel}
        />

        {/* Help Section */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">도움이 필요하신가요?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">인증 절차</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>1. 필요한 정보와 서류 준비</li>
                  <li>2. 온라인 신청서 작성</li>
                  <li>3. 관리자 검토 (1-3일)</li>
                  <li>4. 인증 완료 및 서비스 시작</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">문의하기</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>이메일: verification@divingmate.kr</li>
                  <li>전화: 02-1234-5678</li>
                  <li>운영시간: 평일 09:00-18:00</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
