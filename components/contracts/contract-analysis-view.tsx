'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  CalendarDays,
  DollarSign,
  Download,
  FileText,
  Users,
  AlertTriangle,
} from 'lucide-react';
import Link from 'next/link';
import { ContractAnalysisResult } from '@/lib/types/contract';

interface ContractAnalysisViewProps {
  analysis: ContractAnalysisResult;
}

export function ContractAnalysisView({ analysis }: ContractAnalysisViewProps) {
  const router = useRouter();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Link
            href="/dashboard/contracts"
            className="flex items-center text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Contracts
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">
            {analysis.fileName}
          </h2>
          <p className="text-muted-foreground">
            Analyzed on {analysis.analyzedAt.toLocaleDateString()}
          </p>
        </div>
        <Button variant="outline" asChild>
          <a href={analysis.fileUrl} download>
            <Download className="mr-2 h-4 w-4" />
            Download Original
          </a>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contract Overview</CardTitle>
            <CardDescription>Key information and summary</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Summary</h3>
              <p className="text-sm text-muted-foreground">{analysis.summary}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Type</p>
                  <p className="text-sm text-muted-foreground">
                    {analysis.contractType}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Value</p>
                  <p className="text-sm text-muted-foreground">
                    {analysis.value.toLocaleString()} {analysis.currency}
                  </p>
                </div>
              </div>

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
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Parties</p>
                  <p className="text-sm text-muted-foreground">
                    {analysis.parties.map((p) => p.name).join(', ')}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Assessment</CardTitle>
            <CardDescription>Identified risks and concerns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analysis.risks.map((risk, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-2 p-2 rounded-lg bg-muted/50"
                >
                  <AlertTriangle className={`h-4 w-4 mt-0.5 ${
                    risk.severity === 'HIGH'
                      ? 'text-destructive'
                      : risk.severity === 'MEDIUM'
                      ? 'text-yellow-500'
                      : 'text-muted-foreground'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{risk.description}</p>
                    {risk.mitigation && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Mitigation: {risk.mitigation}
                      </p>
                    )}
                  </div>
                  <Badge
                    variant={
                      risk.severity === 'HIGH'
                        ? 'destructive'
                        : risk.severity === 'MEDIUM'
                        ? 'default'
                        : 'secondary'
                    }
                  >
                    {risk.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Key Obligations</CardTitle>
            <CardDescription>Required actions and responsibilities</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {analysis.obligations.map((obligation, index) => (
                <li key={index} className="space-y-1">
                  <p className="text-sm font-medium">{obligation.party}</p>
                  <p className="text-sm text-muted-foreground">
                    {obligation.description}
                  </p>
                  {obligation.deadline && (
                    <p className="text-xs text-muted-foreground">
                      Due by: {obligation.deadline.toLocaleDateString()}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Important Terms</CardTitle>
            <CardDescription>Key contract terms and conditions</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {analysis.terms.map((term, index) => (
                <li key={index} className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">{term.title}</p>
                    {term.isHighRisk && (
                      <Badge variant="destructive">High Risk</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {term.description}
                  </p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}