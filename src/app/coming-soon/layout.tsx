import type { Metadata } from 'next';
import { generateMetadata } from '@/utils/metadata';

export const metadata: Metadata = {
  ...generateMetadata(),
  title: '다이빙메이트 - 곧 만나요!',
  description:
    '바다 속 특별한 경험을 위한 완벽한 다이빙 파트너, 다이빙메이트가 2025년 상반기에 런칭됩니다.',
};

export default function ComingSoonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen">{children}</div>;
}
