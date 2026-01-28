import FeaturePosts from './components/FeaturePosts';
import SummaryNews from './components/SummaryNews';

// Note: FeaturePosts and SummaryNews are client components that fetch on the client side
// This works for both static export (S3) and dynamic rendering (Vercel)
export default function Home() {
  return (
    <>
      <FeaturePosts />
      <SummaryNews />
    </>
  );
}
