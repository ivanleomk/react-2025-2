import DashboardShell from '@/components/DashboardShell';
import FeedbackLink from '@/components/FeedbackLink';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import { useAuth } from '@/lib/auth';
import React from 'react';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import FeedbackTableHeader from '@/components/FeedbackTableHeader';
import FeedbackTable from '@/components/FeedbackTable';

const MyFeedback = () => {
  const { user } = useAuth();
  const { data } = useSWR(user ? ['/api/feedback', user.token] : null, fetcher);
  console.log(data);

  if (!data) {
    return (
      <DashboardShell>
        <FeedbackTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }
  return (
    <DashboardShell>
      <FeedbackTableHeader />
      {data.feedback.length ? (
        <FeedbackTable allFeedback={data.feedback} />
      ) : (
        <EmptyState />
      )}
    </DashboardShell>
  );
};

export default MyFeedback;
