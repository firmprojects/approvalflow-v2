import { useState, useEffect } from 'react';
import { RequestType, RequestStatus } from '@/lib/types';

export interface Request {
  id: string;
  title: string;
  type: RequestType;
  status: RequestStatus;
  createdAt: Date;
  currentApprover: string;
}

interface UseRequestsOptions {
  status?: RequestStatus;
  type?: RequestType;
  search?: string;
  page?: number;
  limit?: number;
}

export function useRequests(options: UseRequestsOptions = {}) {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    async function fetchRequests() {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (options.status) queryParams.set('status', options.status);
        if (options.type) queryParams.set('type', options.type);
        if (options.search) queryParams.set('search', options.search);
        if (options.page) queryParams.set('page', options.page.toString());
        if (options.limit) queryParams.set('limit', options.limit.toString());

        const response = await fetch(`/api/requests?${queryParams}`);
        if (!response.ok) throw new Error('Failed to fetch requests');
        
        const data = await response.json();
        setRequests(data.requests.map((r: any) => ({
          ...r,
          createdAt: new Date(r.createdAt),
        })));
        setTotalCount(data.total);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchRequests();
  }, [options.status, options.type, options.search, options.page, options.limit]);

  return {
    requests,
    loading,
    error,
    totalCount,
  };
}
