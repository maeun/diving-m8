import { ResortProfileView } from '@/components/profile/ResortProfileView';

interface ResortPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ResortPage({ params }: ResortPageProps) {
  const { id } = await params;
  return <ResortProfileView resortId={id} />;
}

export async function generateMetadata({ params }: ResortPageProps) {
  const { id } = await params;
  // In a real app, fetch resort data for metadata
  return {
    title: `Resort Profile - ${id}`,
    description: 'View diving resort profile, facilities, and packages',
  };
}
