import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { requests } from '@/lib/db/schema/requests';
import { mockRequests } from '@/lib/data/mock-requests';

export async function GET() {
  try {
    // Use mock data during development
    const allRequests = Object.values(mockRequests);
    
    const stats = {
      total: allRequests.length,
      approved: allRequests.filter(r => r.status === 'APPROVED').length,
      rejected: allRequests.filter(r => r.status === 'REJECTED').length,
      pending: allRequests.filter(r => r.status === 'PENDING').length,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
