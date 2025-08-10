'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';

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
        className="text-gray-400 hover:text-white transition-colors duration-[var(--transition-normal)]"
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="text-gray-400 hover:text-white transition-colors duration-[var(--transition-normal)]"
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

interface FooterProps {
  className?: string;
}

export function Footer({ className = '' }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`gradient-ocean-deep text-white bubble-container relative overflow-hidden ${className}`}
    >
      {/* Animated Bubbles */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div
          className="bubble w-8 h-8 animate-bubble"
          style={{ animationDelay: '0s' }}
        ></div>
        <div
          className="bubble w-12 h-12 animate-bubble"
          style={{ animationDelay: '4s' }}
        ></div>
        <div
          className="bubble w-6 h-6 animate-bubble"
          style={{ animationDelay: '8s' }}
        ></div>
        <div
          className="bubble w-10 h-10 animate-bubble"
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className="bubble w-5 h-5 animate-bubble"
          style={{ animationDelay: '6s' }}
        ></div>
      </div>

      {/* Wave Effect at Top */}
      <div className="wave-container absolute top-0 left-0 w-full h-24 rotate-180">
        <div className="wave opacity-20"></div>
      </div>

      {/* Main Footer Content */}
      <div className="section-container py-4 sm:py-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                다이빙 메이트
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Chasing Descent Upward, Diving Mate💙
              </p>
            </div>

            {/* Social Media
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
            </div> */}
          </div>

          {/* Services */}
          {/* <FooterSection title="서비스">
            <FooterLink href="/instructor">강사 찾기</FooterLink>
            <FooterLink href="/resort">리조트 찾기</FooterLink>
            <FooterLink href="/search">통합 검색</FooterLink>
            <FooterLink href="/auth/register">강사 등록</FooterLink>
            <FooterLink href="/auth/register">리조트 등록</FooterLink>
            <FooterLink href="/profile">내 프로필</FooterLink>
          </FooterSection> */}

          {/* Support */}
          {/* <FooterSection title="고객 지원">
            <FooterLink href="/help">도움말 센터</FooterLink>
            <FooterLink href="/faq">자주 묻는 질문</FooterLink>
            <FooterLink href="/safety">안전 가이드</FooterLink>
            <FooterLink href="/contact">문의하기</FooterLink>
            <FooterLink href="/feedback">피드백</FooterLink>
            <FooterLink href="/report">신고하기</FooterLink>
          </FooterSection> */}

          {/* Company */}
          {/* <FooterSection title="회사 정보">
            <FooterLink href="/about">회사 소개</FooterLink>
            <FooterLink href="/team">팀 소개</FooterLink>
            <FooterLink href="/careers">채용 정보</FooterLink>
            <FooterLink href="/press">보도자료</FooterLink>
            <FooterLink href="/partners">파트너십</FooterLink>
            <FooterLink href="/contact">연락처</FooterLink>
          </FooterSection> */}
        </div>

        {/* Contact Information */}
        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-800/50">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="flex items-center gap-3 animate-fade-in-up mobile-touch-feedback p-2 rounded-lg hover:bg-white/5 transition-colors">
              <Mail className="h-5 w-5 text-cyan-400 animate-float" />
              <div>
                <p className="text-xs sm:text-sm text-gray-400">E-mail</p>
                <p className="text-sm sm:text-base text-white">
                  diving.m8@gmail.com
                </p>
              </div>
            </div>
            <div
              className="flex items-center gap-3 animate-fade-in-up mobile-touch-feedback p-2 rounded-lg hover:bg-white/5 transition-colors"
              style={{ animationDelay: '0.2s' }}
            >
              <Phone
                className="h-5 w-5 text-emerald-400 animate-float"
                style={{ animationDelay: '1s' }}
              />
              <div>
                <p className="text-xs sm:text-sm text-gray-400">Tel</p>
                <p className="text-sm sm:text-base text-white">
                  Sorry, not now
                </p>
              </div>
            </div>
            <div
              className="flex items-center gap-3 animate-fade-in-up mobile-touch-feedback p-2 rounded-lg hover:bg-white/5 transition-colors"
              style={{ animationDelay: '0.4s' }}
            >
              <MapPin
                className="h-5 w-5 text-blue-400 animate-float"
                style={{ animationDelay: '2s' }}
              />
              <div>
                <p className="text-xs sm:text-sm text-gray-400">Address</p>
                <p className="text-sm sm:text-base text-white">
                  Under water 18m
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800/50">
        <div className="section-container py-2 sm:py-3">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-gray-400 text-xs sm:text-sm text-center">
              <span>
                &copy; {currentYear} 다이빙 메이트. All rights reserved.
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                Made with{' '}
                <Heart className="h-3 w-3 sm:h-4 sm:w-4 inline text-red-500 animate-pulse" />
              </span>
            </div>

            <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
              <FooterLink href="/terms">이용약관</FooterLink>
              <FooterLink href="/privacy">개인정보처리방침</FooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
