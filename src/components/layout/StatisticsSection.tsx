'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Users, Award, MapPin, Star, Heart } from 'lucide-react';

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  number: string;
  label: string;
  color: string;
  delay: number;
}

function StatCard({ icon: Icon, number, label, color, delay }: StatCardProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`stat-${label}`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [label]);

  useEffect(() => {
    if (isVisible) {
      const targetNumber = parseInt(number.replace(/\D/g, ''));
      const duration = 2000;
      const increment = targetNumber / (duration / 16);
      let current = 0;

      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          current += increment;
          if (current >= targetNumber) {
            current = targetNumber;
            clearInterval(interval);
          }
          setCount(Math.floor(current));
        }, 16);

        return () => clearInterval(interval);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isVisible, number, delay]);

  return (
    <Card
      className="text-center p-4 sm:p-6 card-ocean mobile-card-stack mobile-touch-feedback animate-fade-in-scale"
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="p-0">
        <div
          className={`flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 ${color} rounded-full mx-auto mb-4 animate-float ripple-effect`}
          style={{ animationDelay: `${delay + 500}ms` }}
        >
          <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
        </div>
        <h3
          className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2"
          id={`stat-${label}`}
        >
          {count.toLocaleString()}+
        </h3>
        <p className="text-sm sm:text-base text-gray-600 font-medium">
          {label}
        </p>
      </CardContent>
    </Card>
  );
}

export function StatisticsSection() {
  const stats = [
    {
      icon: Users,
      number: '500',
      label: '전문 강사',
      color: 'bg-brand-primary',
      delay: 0,
    },
    {
      icon: Award,
      number: '200',
      label: '리조트',
      color: 'bg-brand-secondary',
      delay: 200,
    },
    {
      icon: Heart,
      number: '10000',
      label: '함께하는 다이버들',
      color: 'bg-[var(--error)]',
      delay: 400,
    },
    {
      icon: MapPin,
      number: '50',
      label: '다이빙 지역',
      color: 'bg-[var(--brand-accent)]',
      delay: 600,
    },
  ];

  return (
    <section className="section-padding gradient-ocean bubble-container relative overflow-hidden">
      {/* Animated Bubbles */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="bubble w-8 h-8 animate-bubble"
          style={{ animationDelay: '0s' }}
        ></div>
        <div
          className="bubble w-12 h-12 animate-bubble"
          style={{ animationDelay: '3s' }}
        ></div>
        <div
          className="bubble w-6 h-6 animate-bubble"
          style={{ animationDelay: '6s' }}
        ></div>
        <div
          className="bubble w-10 h-10 animate-bubble"
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className="bubble w-5 h-5 animate-bubble"
          style={{ animationDelay: '4s' }}
        ></div>
        <div
          className="bubble w-14 h-14 animate-bubble"
          style={{ animationDelay: '7s' }}
        ></div>
      </div>

      {/* Ocean Wave Background */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-ocean-wave"></div>
          <div
            className="absolute top-20 right-20 w-16 h-16 bg-white rounded-full animate-ocean-wave"
            style={{ animationDelay: '1s' }}
          ></div>
          <div
            className="absolute bottom-10 left-1/4 w-12 h-12 bg-white rounded-full animate-ocean-wave"
            style={{ animationDelay: '2s' }}
          ></div>
          <div
            className="absolute bottom-20 right-1/3 w-24 h-24 bg-white rounded-full animate-ocean-wave"
            style={{ animationDelay: '3s' }}
          ></div>
        </div>
      </div>

      {/* Wave Effect */}
      <div className="wave-container absolute top-0 left-0 w-full h-24 rotate-180">
        <div className="wave"></div>
      </div>

      <div className="relative section-container">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="h-8 w-8 text-white" />
            <h2 className="text-4xl font-bold text-white">
              함께하는 다이빙 커뮤니티
            </h2>
          </div>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            전국의 다이빙 애호가들이 선택한 믿을 수 있는 파트너
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              icon={stat.icon}
              number={stat.number}
              label={stat.label}
              color={stat.color}
              delay={stat.delay}
            />
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              왜 다이빙 메이트를 선택하나요?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-blue-100">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mx-auto mb-3">
                  <Star className="h-6 w-6 text-yellow-300" />
                </div>
                <h4 className="font-semibold mb-2">검증된 전문가</h4>
                <p className="text-sm">
                  모든 강사와 리조트가 엄격한 검증을 거쳤습니다
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-green-300" />
                </div>
                <h4 className="font-semibold mb-2">지속적 성장</h4>
                <p className="text-sm">
                  매월 새로운 강사와 리조트가 등록됩니다
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mx-auto mb-3">
                  <Heart className="h-6 w-6 text-red-300" />
                </div>
                <h4 className="font-semibold mb-2">고객 만족</h4>
                <p className="text-sm">
                  95% 이상의 고객이 만족한다고 응답했습니다
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
