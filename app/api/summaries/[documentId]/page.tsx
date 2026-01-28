import SummaryDetailPageContent from '../../../summary/components/SummaryDetailPageContent';

// Note: SummaryDetailPageContent is a client component that fetches on the client side
// This works for both static export (S3) and dynamic rendering (Vercel)
// Content is fully dynamic and updates without rebuilding
// generateStaticParams is kept for static export compatibility (pre-generates HTML structure)
export async function generateStaticParams() {
  try {
    const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://brilliant-dream-c3f2fe8788.strapiapp.com/api';
    const res = await fetch(`${STRAPI_API_URL}/summaries?fields[0]=documentId&pagination[limit]=1000`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    
    if (!res.ok) {
      console.warn('Failed to fetch summaries for generateStaticParams');
      return [];
    }
    
    const json = await res.json();
    const summaries = json.data || [];
    return summaries.map((summary: any) => ({
      documentId: summary.documentId || String(summary.id),
    }));
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return [];
  }
}

export default function SummaryDetailPage() {
  return <SummaryDetailPageContent />;
}
