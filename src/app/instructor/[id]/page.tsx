import { InstructorProfileView } from '@/components/profile/InstructorProfileView';

interface InstructorPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function InstructorPage({ params }: InstructorPageProps) {
  const { id } = await params;
  return <InstructorProfileView instructorId={id} />;
}

export async function generateMetadata({ params }: InstructorPageProps) {
  const { id } = await params;
  // In a real app, fetch instructor data for metadata
  return {
    title: `Instructor Profile - ${id}`,
    description: 'View diving instructor profile, certifications, and services',
  };
}
