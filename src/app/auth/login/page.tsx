import { LoginForm } from '@/components/auth/LoginForm';
import { generateMetadata } from '@/utils/metadata';

export const metadata = generateMetadata({
  title: '로그인 - Diving Mate',
  description: '다이빙 메이트에 로그인하여 완벽한 다이빙 경험을 시작하세요.',
});

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
      <LoginForm />
    </div>
  );
}
