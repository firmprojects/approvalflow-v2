'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { AuditAction, AuditLog, UserRole } from '@/lib/types';
import { formatAuditAction } from '@/lib/utils/audit';
import { Download, Search } from 'lucide-react';
import { useState } from 'react';

// Mock audit logs data
const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    timestamp: new Date('2024-03-10T10:30:00'),
    action: AuditAction.REQUEST_CREATED,
    requestId: '1',
    requestTitle: 'Annual Budget Review',
    userId: '1',
    userName: 'Alice Johnson',
    userRole: UserRole.MANAGER,
    details: 'Created budget approval request for Q1 2024',
    ipAddress: '192.168.1.1',
    deviceInfo: 'Chrome/Windows',
  },
  {
    id: '2',
    timestamp: new Date('2024-03-10T11:15:00'),
    action: AuditAction.OTP_REQUESTED,
    requestId: '1',
    requestTitle: 'Annual Budget Review',
    userId: '2',
    userName: 'John Smith',
    userRole: UserRole.DIRECTOR,
    details: 'Requested OTP for approval verification',
    ipAddress: '192.168.1.2',
    deviceInfo: 'Safari/MacOS',
  },
  {
    id: '3',
    timestamp: new Date('2024-03-10T11:20:00'),
    action: AuditAction.REQUEST_APPROVED,
    requestId: '1',
    requestTitle: 'Annual Budget Review',
    userId: '2',
    userName: 'John Smith',
    userRole: UserRole.DIRECTOR,
    details: 'Approved with comment: Budget aligns with department goals',
    ipAddress: '192.168.1.2',
    deviceInfo: 'Safari/MacOS',
  },
];

export default function AuditLogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState<string>('all');

  const filteredLogs = mockAuditLogs.filter(log => {
    const matchesSearch = 
      log.requestTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAction = actionFilter === 'all' || log.action === actionFilter;
    
    return matchesSearch && matchesAction;
  });

  const handleExport = () => {
    const csv = [
      ['Timestamp', 'Action', 'Request', 'User', 'Role', 'Details', 'IP Address', 'Device'],
      ...filteredLogs.map(log => [
        log.timestamp.toISOString(),
        formatAuditAction(log.action),
        log.requestTitle,
        log.userName,
        log.userRole,
        log.details,
        log.ipAddress,
        log.deviceInfo,
      ]),
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Audit Logs</h2>
        <p className="text-muted-foreground">
          Track and monitor all approval workflow activities
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>
            Comprehensive audit trail of all system actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="flex flex-1 items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select
                value={actionFilter}
                onValueChange={setActionFilter}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  {Object.values(AuditAction).map((action) => (
                    <SelectItem key={action} value={action}>
                      {formatAuditAction(action)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Request</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>IP Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      {log.timestamp.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {formatAuditAction(log.action)}
                    </TableCell>
                    <TableCell>{log.requestTitle}</TableCell>
                    <TableCell>
                      <div>
                        <div>{log.userName}</div>
                        <div className="text-sm text-muted-foreground">
                          {log.userRole}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{log.details}</TableCell>
                    <TableCell>
                      <div>
                        <div>{log.ipAddress}</div>
                        <div className="text-sm text-muted-foreground">
                          {log.deviceInfo}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}