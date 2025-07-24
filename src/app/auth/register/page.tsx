import { RegisterForm } from '@/components/auth/RegisterForm';
import { generateMetadata } from '@/utils/metadata';

export const metadata = generateMetadata({
  title: '회원가입 - Diving Mate',
  description:
    '다이빙 메이트에 가입하여 최고의 다이빙 강사와 리조트를 만나보세요.',
});

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
      <RegisterForm />
    </div>
  );
}
