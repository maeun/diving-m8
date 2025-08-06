'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, RefreshCw, Home, MessageCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 에러 로깅 (실제 앱에서는 Sentry 등 사용)
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0 text-center">
          <CardContent className="p-8">
            {/* Error Illustration */}
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-16 w-16 text-red-600" />
              </div>

              {/* Error Animation */}
              <div className="flex justify-center space-x-1 mb-4">
                <div className="w-2 h-8 bg-red-300 rounded-full animate-bounce"></div>
                <div className="w-2 h-6 bg-red-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-10 bg-red-500 rounded-full animate-bounce delay-200"></div>
                <div className="w-2 h-4 bg-red-400 rounded-full animate-bounce delay-300"></div>
                <div className="w-2 h-7 bg-red-300 rounded-full animate-bounce delay-400"></div>
              </div>
            </div>

            {/* Error Message */}
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              문제가 발생했습니다
            </h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주시거나
              새로고침을 해보세요.
            </p>

            {/* Error Details (개발 환경에서만 표시) */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mb-6 p-3 bg-gray-100 rounded-lg text-left">
                <p className="text-xs text-gray-600 font-mono break-all">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="text-xs text-gray-500 mt-1">
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={reset}
                className="w-full h-12 bg-red-600 hover:bg-red-700"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                다시 시도
              </Button>

              <Button
                variant="outline"
                onClick={() => (window.location.href = '/')}
                className="w-full h-12"
              >
                <Home className="h-4 w-4 mr-2" />
                홈으로 돌아가기
              </Button>

              <Button
                variant="ghost"
                onClick={() => (window.location.href = '/contact')}
                className="w-full h-12"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                문제 신고하기
              </Button>
            </div>

            {/* Help Text */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                문제가 계속 발생하면{' '}
                <a
                  href="mailto:support@divingmate.kr"
                  className="text-red-600 hover:text-red-700 hover:underline"
                >
                  고객지원팀
                </a>
                으로 연락해주세요.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
