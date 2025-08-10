import { redirect } from 'next/navigation';

export default function Home() {
  // 모든 루트 접근을 coming-soon으로 리다이렉트
  redirect('/coming-soon');
}
