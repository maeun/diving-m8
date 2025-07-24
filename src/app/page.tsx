import { HeroSection } from '@/components/layout/HeroSection';
import { FeaturedSection } from '@/components/layout/FeaturedSection';
import { TestimonialSection } from '@/components/layout/TestimonialSection';
import { StatisticsSection } from '@/components/layout/StatisticsSection';
import { CTASection } from '@/components/layout/CTASection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedSection />
      <StatisticsSection />
      <TestimonialSection />
      <CTASection />
    </main>
  );
}
