'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle,
  Clock,
  FileText,
  Award,
  Users,
  Shield,
  Waves,
} from 'lucide-react';

export default function InstructorRegisterPage() {
  const requirements = [
    {
      icon: Award,
      title: '다이빙 자격증',
      description: 'PADI, SSI, NAUI 등 공인 다이빙 자격증 보유',
      required: true,
    },
    {
      icon: FileText,
      title: '경력 증명',
      description: '다이빙 강사 경력 및 교육 이력',
      required: true,
    },
    {
      icon: Shield,
      title: '보험 가입',
      description: '다이빙 강사 배상책임보험 가입 증명',
      required: true,
    },
    {
      icon: Users,
      title: '추천서',
      description: '기존 고객 또는 동료 강사 추천서 (선택)',
      required: false,
    },
  ];

  const process = [
    {
      step: 1,
      title: '정보 입력',
      description: '구글 폼을 통해 기본 정보와 자격증 정보를 입력해주세요',
      icon: FileText,
    },
    {
      step: 2,
      title: '서류 검토',
      description: '제출해주신 서류를 검토합니다 (1-3일 소요)',
      icon: Clock,
    },
    {
      step: 3,
      title: '승인 완료',
      description: '승인 후 강사 프로필이 활성화됩니다',
      icon: CheckCircle,
    },
  ];

  const handleGoogleFormRedirect = () => {
    window.open('https://forms.gle/bj3s926w8ez2KW5v8', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 section-padding">
      <div className="section-container">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-brand-primary transition-colors duration-[var(--transition-normal)]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            홈으로 돌아가기
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Waves className="h-8 w-8 text-brand-primary" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                다이빙 강사 등록
              </h1>
              <Waves className="h-8 w-8 text-brand-primary scale-x-[-1]" />
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              다이빙 메이트와 함께 더 많은 다이버들에게 안전하고 즐거운 다이빙
              경험을 선사해주세요
            </p>
          </div>

          {/* Main Registration Card */}
          <Card className="card-standard mb-8">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-900 mb-2">
                강사 등록 신청
              </CardTitle>
              <p className="text-gray-600">
                아래 버튼을 클릭하여 구글 폼에서 강사 등록 정보를 입력해주세요
              </p>
            </CardHeader>
            <CardContent className="text-center">
              <Button
                onClick={handleGoogleFormRedirect}
                className="h-14 px-8 text-lg btn-primary mb-4"
              >
                <FileText className="h-5 w-5 mr-3" />
                강사 등록 신청하기
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
              <p className="text-sm text-gray-500">
                새 창에서 구글 폼이 열립니다
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Requirements */}
            <Card className="card-standard">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-brand-primary" />
                  등록 요구사항
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {requirements.map((req, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <req.icon className="h-5 w-5 text-brand-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {req.title}
                        </h3>
                        <Badge
                          variant={req.required ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {req.required ? '필수' : '선택'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{req.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Process */}
            <Card className="card-standard">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-brand-secondary" />
                  등록 절차
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {process.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-brand-secondary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Benefits */}
          <Card className="card-standard mt-8">
            <CardHeader>
              <CardTitle className="text-center">
                다이빙 메이트 강사가 되면?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-brand-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    더 많은 학생들
                  </h3>
                  <p className="text-sm text-gray-600">
                    전국의 다이빙 애호가들과 연결되어 더 많은 교육 기회를
                    얻으세요
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-brand-secondary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    신뢰할 수 있는 플랫폼
                  </h3>
                  <p className="text-sm text-gray-600">
                    검증된 강사로서 신뢰도 높은 프로필로 학생들에게 어필하세요
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-[var(--brand-accent)]" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    전문가 지원
                  </h3>
                  <p className="text-sm text-gray-600">
                    마케팅 지원, 예약 관리 등 강사 활동에 필요한 도구들을
                    제공합니다
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-2">
              등록 과정에서 궁금한 점이 있으시면 언제든 문의해주세요
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link
                href="/contact"
                className="text-brand-primary hover:text-[var(--brand-primary-hover)] hover:underline transition-colors duration-[var(--transition-normal)]"
              >
                문의하기
              </Link>
              <Link
                href="/faq"
                className="text-brand-primary hover:text-[var(--brand-primary-hover)] hover:underline transition-colors duration-[var(--transition-normal)]"
              >
                자주 묻는 질문
              </Link>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">diving.m8@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
