'use client';

import { useState } from 'react';
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
import { Button } from '@/components/ui/button';
import { mockContractAnalyses } from '@/lib/data/mock-contracts';
import { Eye, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function ContractAnalysisList() {
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Analyses</CardTitle>
        <CardDescription>
          View and manage your contract analyses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document Name</TableHead>
              <TableHead>Analyzed Date</TableHead>
              <TableHead>Contract Type</TableHead>
              <TableHead>Parties</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockContractAnalyses.map((analysis) => (
              <TableRow key={analysis.id}>
                <TableCell className="font-medium">
                  {analysis.fileName}
                </TableCell>
                <TableCell>
                  {analysis.analyzedAt.toLocaleDateString()}
                </TableCell>
                <TableCell>{analysis.contractType}</TableCell>
                <TableCell>
                  {analysis.parties.map(p => p.name).join(', ')}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push(`/dashboard/contracts/${analysis.id}`)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={analysis.fileUrl} download>
                        <Download className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}