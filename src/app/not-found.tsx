import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0 text-center">
          <CardContent className="p-8">
            {/* 404 Illustration */}
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                <span className="text-6xl font-bold text-blue-600">404</span>
              </div>

              {/* Wave Animation */}
              <div className="flex justify-center space-x-1 mb-4">
                <div className="w-2 h-8 bg-blue-300 rounded-full animate-pulse"></div>
                <div className="w-2 h-6 bg-blue-400 rounded-full animate-pulse delay-100"></div>
                <div className="w-2 h-10 bg-blue-500 rounded-full animate-pulse delay-200"></div>
                <div className="w-2 h-4 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                <div className="w-2 h-7 bg-blue-300 rounded-full animate-pulse delay-400"></div>
              </div>
            </div>

            {/* Error Message */}
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              페이지를 찾을 수 없습니다
            </h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다. 다른
              페이지를 탐색해보세요.
            </p>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link href="/" className="block">
                <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700">
                  <Home className="h-4 w-4 mr-2" />
                  홈으로 돌아가기
                </Button>
              </Link>

              <Link href="/search" className="block">
                <Button variant="outline" className="w-full h-12">
                  <Search className="h-4 w-4 mr-2" />
                  검색하기
                </Button>
              </Link>

              <Button
                variant="ghost"
                onClick={() => window.history.back()}
                className="w-full h-12"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                이전 페이지로
              </Button>
            </div>

            {/* Help Links */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-3">도움이 필요하신가요?</p>
              <div className="flex justify-center space-x-4 text-sm">
                <Link
                  href="/help"
                  className="text-blue-600 hover:text-blue-700 hover:underline"
                >
                  도움말
                </Link>
                <Link
                  href="/contact"
                  className="text-blue-600 hover:text-blue-700 hover:underline"
                >
                  문의하기
                </Link>
                <Link
                  href="/faq"
                  className="text-blue-600 hover:text-blue-700 hover:underline"
                >
                  FAQ
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
