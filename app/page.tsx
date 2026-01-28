import FeaturePosts from './components/FeaturePosts';

// Note: FeaturePosts is now a client component that fetches on the client side
// This works for both static export (S3) and dynamic rendering (Vercel)
export default function Home() {
  return (
    <>
      <FeaturePosts />
    </>
  );
}
