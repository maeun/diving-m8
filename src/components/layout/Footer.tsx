'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Heart,
} from 'lucide-react';

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

function FooterLink({ href, children, external = false }: FooterLinkProps) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-white transition-colors duration-200"
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="text-gray-400 hover:text-white transition-colors duration-200"
    >
      {children}
    </Link>
  );
}

interface FooterSectionProps {
  title: string;
  children: React.ReactNode;
}

function FooterSection({ title, children }: FooterSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-white font-semibold text-lg mb-4">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                다이빙 메이트
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                전문 강사와 최고의 리조트를 연결하여 완벽한 다이빙 경험을
                제공하는 대한민국 최고의 다이빙 플랫폼입니다.
              </p>
            </div>

            {/* Newsletter Signup */}
            <div className="mb-6">
              <h4 className="text-white font-medium mb-3">뉴스레터 구독</h4>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="이메일 주소"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                />
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-white font-medium mb-3">소셜 미디어</h4>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                >
                  <Youtube className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors duration-200"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <FooterSection title="서비스">
            <FooterLink href="/instructor">강사 찾기</FooterLink>
            <FooterLink href="/resort">리조트 찾기</FooterLink>
            <FooterLink href="/search">통합 검색</FooterLink>
            <FooterLink href="/auth/register">강사 등록</FooterLink>
            <FooterLink href="/auth/register">리조트 등록</FooterLink>
            <FooterLink href="/profile">내 프로필</FooterLink>
          </FooterSection>

          {/* Support */}
          <FooterSection title="고객 지원">
            <FooterLink href="/help">도움말 센터</FooterLink>
            <FooterLink href="/faq">자주 묻는 질문</FooterLink>
            <FooterLink href="/safety">안전 가이드</FooterLink>
            <FooterLink href="/contact">문의하기</FooterLink>
            <FooterLink href="/feedback">피드백</FooterLink>
            <FooterLink href="/report">신고하기</FooterLink>
          </FooterSection>

          {/* Company */}
          <FooterSection title="회사 정보">
            <FooterLink href="/about">회사 소개</FooterLink>
            <FooterLink href="/team">팀 소개</FooterLink>
            <FooterLink href="/careers">채용 정보</FooterLink>
            <FooterLink href="/press">보도자료</FooterLink>
            <FooterLink href="/partners">파트너십</FooterLink>
            <FooterLink href="/contact">연락처</FooterLink>
          </FooterSection>
        </div>

        {/* Contact Information */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-sm text-gray-400">이메일</p>
                <p className="text-white">contact@divingmate.kr</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-sm text-gray-400">전화번호</p>
                <p className="text-white">02-1234-5678</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-sm text-gray-400">주소</p>
                <p className="text-white">서울특별시 강남구 테헤란로 123</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>
                &copy; {currentYear} 다이빙 메이트. All rights reserved.
              </span>
              <span>•</span>
              <span>
                Made with <Heart className="h-4 w-4 inline text-red-500" /> in
                Korea
              </span>
            </div>

            <div className="flex gap-6 text-sm">
              <FooterLink href="/terms">이용약관</FooterLink>
              <FooterLink href="/privacy">개인정보처리방침</FooterLink>
              <FooterLink href="/cookies">쿠키 정책</FooterLink>
              <FooterLink href="/sitemap">사이트맵</FooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
