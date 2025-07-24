'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { MessageCircle, User, X, Loader2 } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { signInWithKakao, loading } = useAuth();
  const [loginLoading, setLoginLoading] = useState(false);

  const handleKakaoLogin = async () => {
    try {
      setLoginLoading(true);
      await signInWithKakao();
      onClose();
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoginLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            disabled={loginLoading}
          >
            <X className="h-5 w-5" />
          </button>
          <CardTitle className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            다이빙 메이트에 로그인
          </CardTitle>
          <p className="text-center text-gray-600 text-sm">
            다이빙 강사와 리조트를 찾고 저장하세요
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Kakao Login Button */}
          <Button
            onClick={handleKakaoLogin}
            disabled={loginLoading || loading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 h-auto"
          >
            {loginLoading ? (
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            ) : (
              <MessageCircle className="h-5 w-5 mr-2" />
            )}
            카카오톡으로 로그인
          </Button>

          {/* Benefits */}
          <div className="mt-6 pt-4 border-t">
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              로그인하면 이런 기능을 사용할 수 있어요
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Badge
                  variant="secondary"
                  className="w-2 h-2 p-0 rounded-full bg-blue-500"
                ></Badge>
                관심 있는 강사와 리조트 저장
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Badge
                  variant="secondary"
                  className="w-2 h-2 p-0 rounded-full bg-green-500"
                ></Badge>
                강사와 리조트에 직접 문의
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Badge
                  variant="secondary"
                  className="w-2 h-2 p-0 rounded-full bg-purple-500"
                ></Badge>
                개인 맞춤 추천 받기
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Badge
                  variant="secondary"
                  className="w-2 h-2 p-0 rounded-full bg-orange-500"
                ></Badge>
                활동 내역 관리
              </div>
            </div>
          </div>

          {/* Terms */}
          <p className="text-xs text-gray-500 text-center mt-4">
            로그인하면 <span className="text-blue-600">이용약관</span>과{' '}
            <span className="text-blue-600">개인정보처리방침</span>에 동의하는
            것으로 간주됩니다.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
