import { Metadata } from 'next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
}

export function generateMetadata({
  title = 'Diving Mate - 스쿠버 다이빙 강사 & 리조트 플랫폼',
  description = '스쿠버 다이빙 강사와 리조트를 쉽게 찾고 비교하세요. 투명한 정보 제공으로 완벽한 다이빙 경험을 만들어보세요.',
  keywords = [
    '스쿠버다이빙',
    '다이빙강사',
    '다이빙리조트',
    '다이빙교육',
    'PADI',
    'SSI',
  ],
  image = '/og-image.jpg',
  url = 'https://divingmate.com',
  type = 'website',
}: SEOProps = {}): Metadata {
  return {
    title,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: 'Diving Mate' }],
    creator: 'Diving Mate',
    publisher: 'Diving Mate',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Diving Mate',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'ko_KR',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@divingmate',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
    },
  };
}

export function generateStructuredData(data: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Diving Mate',
    description: '스쿠버 다이빙 강사와 리조트를 연결하는 플랫폼',
    url: 'https://divingmate.com',
    logo: 'https://divingmate.com/logo.png',
    sameAs: [
      'https://www.facebook.com/divingmate',
      'https://www.instagram.com/divingmate',
      'https://twitter.com/divingmate',
    ],
    ...data,
  };
}
