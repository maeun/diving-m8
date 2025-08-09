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
  Building,
  Users,
  Shield,
  Waves,
  MapPin,
  Camera,
  Star,
} from 'lucide-react';

export default function ResortRegisterPage() {
  const requirements = [
    {
      icon: Building,
      title: '사업자 등록증',
      description: '숙박업 또는 관광사업 등록증',
      required: true,
    },
    {
      icon: Shield,
      title: '보험 가입',
      description: '영업배상책임보험 및 시설배상책임보험',
      required: true,
    },
    {
      icon: FileText,
      title: '시설 정보',
      description: '다이빙 시설, 장비, 안전 설비 현황',
      required: true,
    },
    {
      icon: Camera,
      title: '시설 사진',
      description: '리조트 외관, 내부, 다이빙 시설 사진',
      required: true,
    },
    {
      icon: Star,
      title: '인증서',
      description: 'PADI 다이브센터 인증 등 (선택)',
      required: false,
    },
  ];

  const process = [
    {
      step: 1,
      title: '정보 입력',
      description: '구글 폼을 통해 리조트 정보와 시설 현황을 입력해주세요',
      icon: FileText,
    },
    {
      step: 2,
      title: '서류 검토',
      description: '제출해주신 서류와 시설 정보를 검토합니다 (2-5일 소요)',
      icon: Clock,
    },
    {
      step: 3,
      title: '승인 완료',
      description: '승인 후 리조트 프로필이 활성화됩니다',
      icon: CheckCircle,
    },
  ];

  const handleGoogleFormRedirect = () => {
    // 리조트용 구글 폼 URL (현재는 강사용과 동일하게 설정, 추후 별도 폼 생성 필요)
    window.open('https://forms.gle/bj3s926w8ez2KW5v8', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 section-padding">
      <div className="section-container">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-brand-secondary transition-colors duration-[var(--transition-normal)]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            홈으로 돌아가기
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Building className="h-8 w-8 text-brand-secondary" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                다이빙 리조트 등록
              </h1>
              <Waves className="h-8 w-8 text-brand-secondary scale-x-[-1]" />
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              다이빙 메이트와 함께 전국의 다이버들에게 최고의 다이빙 리조트
              경험을 제공해주세요
            </p>
          </div>

          {/* Main Registration Card */}
          <Card className="card-standard mb-8">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-900 mb-2">
                리조트 등록 신청
              </CardTitle>
              <p className="text-gray-600">
                아래 버튼을 클릭하여 구글 폼에서 리조트 등록 정보를 입력해주세요
              </p>
            </CardHeader>
            <CardContent className="text-center">
              <Button
                onClick={handleGoogleFormRedirect}
                className="h-14 px-8 text-lg btn-secondary mb-4"
              >
                <Building className="h-5 w-5 mr-3" />
                리조트 등록 신청하기
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
                  <CheckCircle className="h-5 w-5 text-brand-secondary" />
                  등록 요구사항
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {requirements.map((req, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <req.icon className="h-5 w-5 text-brand-secondary" />
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
                  <Clock className="h-5 w-5 text-brand-primary" />
                  등록 절차
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {process.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-brand-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
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
                다이빙 메이트 파트너 리조트가 되면?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-brand-secondary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    더 많은 고객
                  </h3>
                  <p className="text-sm text-gray-600">
                    전국의 다이빙 애호가들에게 리조트를 홍보하고 예약을 늘리세요
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-brand-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    지역 홍보
                  </h3>
                  <p className="text-sm text-gray-600">
                    지역의 다이빙 명소로 알려져 관광객 유치에 도움이 됩니다
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-[var(--brand-accent)]" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    브랜드 신뢰도
                  </h3>
                  <p className="text-sm text-gray-600">
                    검증된 리조트로서 고객들에게 신뢰감을 주고 재방문율을
                    높이세요
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Special Features for Resorts */}
          <Card className="card-standard mt-8 gradient-secondary text-white">
            <CardHeader>
              <CardTitle className="text-center text-white">
                리조트 전용 특별 혜택
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Camera className="h-6 w-6 text-emerald-200 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">전문 사진 촬영</h4>
                    <p className="text-sm text-emerald-100">
                      리조트 시설과 다이빙 포인트 전문 사진 촬영 서비스 제공
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="h-6 w-6 text-emerald-200 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">마케팅 지원</h4>
                    <p className="text-sm text-emerald-100">
                      SNS 마케팅 및 블로그 포스팅 등 온라인 홍보 지원
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-emerald-200 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">안전 인증</h4>
                    <p className="text-sm text-emerald-100">
                      다이빙 안전 기준 인증 및 정기 점검 서비스
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-6 w-6 text-emerald-200 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">강사 매칭</h4>
                    <p className="text-sm text-emerald-100">
                      검증된 다이빙 강사와의 파트너십 연결 서비스
                    </p>
                  </div>
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
                className="text-brand-secondary hover:text-[var(--brand-secondary-hover)] hover:underline transition-colors duration-[var(--transition-normal)]"
              >
                문의하기
              </Link>
              <Link
                href="/faq"
                className="text-brand-secondary hover:text-[var(--brand-secondary-hover)] hover:underline transition-colors duration-[var(--transition-normal)]"
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
