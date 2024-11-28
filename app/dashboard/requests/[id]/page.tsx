'use client';

import { useState } from 'react';
import { RequestDetails } from '@/components/requests/request-details';
import { mockRequests } from '@/lib/data/mock-requests';
import { useRouter } from 'next/navigation';

export default function RequestDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const request = mockRequests[params.id];

  if (!request) {
    router.push('/dashboard/requests');
    return null;
  }

  return <RequestDetails request={request} />;
}