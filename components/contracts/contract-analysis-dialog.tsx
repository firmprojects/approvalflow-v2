'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { mockContractAnalyses } from '@/lib/data/mock-contracts';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface ContractAnalysisDialogProps {
  analysisId: string | null;
  onClose: () => void;
}

export function ContractAnalysisDialog({
  analysisId,
  onClose,
}: ContractAnalysisDialogProps) {
  if (!analysisId) return null;

  const analysis = mockContractAnalyses.find((a) => a.id === analysisId);
  if (!analysis) return null;

  return (
    <Dialog open={!!analysisId} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{analysis.documentName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Summary</h4>
            <p className="text-sm text-muted-foreground">
              {analysis.summary}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Contract Type</p>
              <p className="text-sm">{analysis.contractType}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Effective Date</p>
              <p className="text-sm">
                {analysis.effectiveDate.toLocaleDateString()}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Expiration Date</p>
              <p className="text-sm">
                {analysis.expirationDate.toLocaleDateString()}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Total Value</p>
              <p className="text-sm">
                ${analysis.value.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Parties Involved</h4>
            <div className="flex flex-wrap gap-2">
              {analysis.parties.map((party) => (
                <Badge key={party} variant="secondary">
                  {party}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="obligations">
              <AccordionTrigger>Key Obligations</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  {analysis.obligations.map((obligation, index) => (
                    <li key={index} className="text-sm">
                      • {obligation}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="terms">
              <AccordionTrigger>Important Terms</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  {analysis.terms.map((term, index) => (
                    <li key={index} className="text-sm">
                      • {term}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="risks">
              <AccordionTrigger>Risk Factors</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  {analysis.risks.map((risk, index) => (
                    <li key={index} className="text-sm text-destructive">
                      • {risk}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  );
}