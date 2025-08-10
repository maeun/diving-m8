import { ComingSoonHero } from '@/components/layout/ComingSoonHero';
import { ServiceIntroSection } from '@/components/layout/ServiceIntroSection';
import { PreRegistrationSection } from '@/components/layout/PreRegistrationSection';
import { NotificationSignupSection } from '@/components/layout/NotificationSignupSection';
import { Footer } from '@/components/layout/Footer';

export default function ComingSoonPage() {
  return (
    <>
      <ComingSoonHero />
      <ServiceIntroSection />
      <PreRegistrationSection />
      <NotificationSignupSection />
      <Footer />
    </>
  );
}