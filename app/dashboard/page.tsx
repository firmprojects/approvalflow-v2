import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
} from 'lucide-react';

const stats = [
  {
    title: 'Total Requests',
    value: '12',
    icon: FileText,
    description: 'All time requests',
  },
  {
    title: 'Approved',
    value: '8',
    icon: CheckCircle2,
    description: 'Approved requests',
  },
  {
    title: 'Rejected',
    value: '2',
    icon: XCircle,
    description: 'Rejected requests',
  },
  {
    title: 'Pending',
    value: '2',
    icon: Clock,
    description: 'Awaiting approval',
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your approval requests and activities
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
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
    </div>
  );
}