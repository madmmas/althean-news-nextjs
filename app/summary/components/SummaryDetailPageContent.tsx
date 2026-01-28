'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import SummaryDetailContent from './SummaryDetailContent';
import BlogSidebar from '../../blog/components/BlogSidebar';
import { getSummaryByDocumentId, getSummaries } from '@/lib/strapi';
import type { StrapiSummary } from '@/lib/strapi';

export default function SummaryDetailPageContent() {
  const params = useParams();
  const documentId = params?.documentId as string;
  
  const [summary, setSummary] = useState<StrapiSummary | null>(null);
  const [relatedSummaries, setRelatedSummaries] = useState<StrapiSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!documentId) {
        setError('No documentId provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch the main summary by documentId
        const summaryData = await getSummaryByDocumentId(documentId);
        if (!summaryData) {
          setError('Summary not found');
          setLoading(false);
          return;
        }

        setSummary(summaryData);

        // Fetch related summaries
        const allSummaries = await getSummaries();
        const related = allSummaries
          .filter((s) => s.documentId !== summaryData.documentId)
          .slice(0, 4);
        setRelatedSummaries(related);
      } catch (err) {
        console.error('Error fetching summary:', err);
        setError('Failed to load summary');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [documentId]);

  if (loading) {
    return (
      <>
        <Breadcrumbs title="Loading..." />
        <div className="back__blog__area back-blog-page back-blog-page-single pt-70 pb-60">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <p>Loading summary...</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error || !summary) {
    return (
      <>
        <Breadcrumbs title="Summary Not Found" />
        <div className="back__blog__area back-blog-page back-blog-page-single pt-70 pb-60">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <p>{error || 'Summary not found'}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumbs title={summary.title} />
      <div className="back__blog__area back-blog-page back-blog-page-single pt-70 pb-60">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <SummaryDetailContent summary={summary} relatedSummaries={relatedSummaries} />
            </div>
            <div className="col-lg-4">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
