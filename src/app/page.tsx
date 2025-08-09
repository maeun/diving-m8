import { HeroSection } from '@/components/layout/HeroSection';
import { FeaturedSection } from '@/components/layout/FeaturedSection';
import { TestimonialSection } from '@/components/layout/TestimonialSection';
import { StatisticsSection } from '@/components/layout/StatisticsSection';
import { CTASection } from '@/components/layout/CTASection';
import { SimpleFirebaseTest } from '@/components/SimpleFirebaseTest';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Firebase 연결 테스트 - 개발용 (개발 환경에서만 표시) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="py-4 bg-yellow-50 border-b border-yellow-200">
          <div className="section-container">
            <div className="text-center">
              <p className="text-sm text-yellow-800 mb-2">
                🚧 개발 모드 - Firebase 연결 테스트
              </p>
              <SimpleFirebaseTest />
            </div>
          </div>
        </div>
      )}

      <HeroSection />
      <FeaturedSection />
      <StatisticsSection />
      <TestimonialSection />
      <CTASection />
    </main>
  );
}
