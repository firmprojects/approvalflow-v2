'use client';

import { ContractAnalysisResult } from '@/lib/types/contract';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, DollarSign, Users } from 'lucide-react';

interface ContractSummaryProps {
  analysis: ContractAnalysisResult;
}

export function ContractSummary({ analysis }: ContractSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contract Summary</CardTitle>
        <CardDescription>Key information extracted from the contract</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Overview</h3>
          <p className="text-sm text-muted-foreground">{analysis.summary}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Duration</p>
              <p className="text-sm text-muted-foreground">
                {analysis.startDate.toLocaleDateString()} -{' '}
                {analysis.endDate.toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Contract Value</p>
              <p className="text-sm text-muted-foreground">
                {analysis.value.toLocaleString()} {analysis.currency}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Parties</p>
              <p className="text-sm text-muted-foreground">
                {analysis.parties.length} Involved
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Risk Assessment</h3>
          <div className="flex flex-wrap gap-2">
            {analysis.risks.map((risk, index) => (
              <Badge
                key={index}
                variant={
                  risk.severity === 'HIGH'
                    ? 'destructive'
                    : risk.severity === 'MEDIUM'
                    ? 'default'
                    : 'secondary'
                }
              >
                {risk.description}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Key Obligations</h3>
          <ul className="list-disc list-inside space-y-1">
            {analysis.obligations.map((obligation, index) => (
              <li key={index} className="text-sm text-muted-foreground">
                <span className="font-medium">{obligation.party}:</span>{' '}
                {obligation.description}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}