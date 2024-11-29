import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsSkeleton } from '@/components/ui/skeletons';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import {
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
} from 'lucide-react';

async function DashboardStats() {
  // TODO: Replace with actual API call
  const stats = await fetch(process.env.NEXT_PUBLIC_APP_URL + '/api/stats', { next: { revalidate: 60 } }).then(
    (res) => res.json()
  );

  const statItems = [
    {
      title: 'Total Requests',
      value: stats.total,
      icon: FileText,
      description: 'All time requests',
    },
    {
      title: 'Approved',
      value: stats.approved,
      icon: CheckCircle2,
      description: 'Approved requests',
    },
    {
      title: 'Rejected',
      value: stats.rejected,
      icon: XCircle,
      description: 'Rejected requests',
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: Clock,
      description: 'Awaiting approval',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statItems.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your approval requests and activities
        </p>
      </div>

      <ErrorBoundary>
        <Suspense fallback={<StatsSkeleton />}>
          <DashboardStats />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}