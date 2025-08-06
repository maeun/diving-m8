import { HeroSection } from '@/components/layout/HeroSection';
import { FeaturedSection } from '@/components/layout/FeaturedSection';
import { TestimonialSection } from '@/components/layout/TestimonialSection';
import { StatisticsSection } from '@/components/layout/StatisticsSection';
import { CTASection } from '@/components/layout/CTASection';
import { SimpleFirebaseTest } from '@/components/SimpleFirebaseTest';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Firebase 연결 테스트 - 개발용 */}
      <div className="py-8 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <SimpleFirebaseTest />
        </div>
      </div>

      <HeroSection />
      <FeaturedSection />
      <StatisticsSection />
      <TestimonialSection />
      <CTASection />
    </main>
  );
}
