import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { desc, eq, like, and, or } from 'drizzle-orm';
import { requests } from '@/lib/db/schema/requests';
import { RequestStatus, RequestType } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status') as RequestStatus | null;
    const type = searchParams.get('type') as RequestType | null;
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;

    // Build where conditions
    const whereConditions = [];
    if (status) whereConditions.push(eq(requests.status, status));
    if (type) whereConditions.push(eq(requests.type, type));
    if (search) {
      whereConditions.push(
        or(
          like(requests.title, `%${search}%`),
          like(requests.description, `%${search}%`)
        )
      );
    }

    // Get total count
    const totalCount = await db
      .select({ count: requests.id })
      .from(requests)
      .where(and(...whereConditions))
      .execute();

    // Get paginated results
    const results = await db
      .select()
      .from(requests)
      .where(and(...whereConditions))
      .orderBy(desc(requests.createdAt))
      .limit(limit)
      .offset(offset)
      .execute();

    return NextResponse.json({
      requests: results,
      total: totalCount[0]?.count || 0,
    });
  } catch (error) {
    console.error('Failed to fetch requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch requests' },
      { status: 500 }
    );
  }
}
