'use client';

import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface AnalysisProgressProps {
  fileName: string;
  progress: number;
}

export function AnalysisProgress({ fileName, progress }: AnalysisProgressProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center space-x-4">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <div className="flex-1 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Analyzing {fileName}</span>
              <span className="text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}