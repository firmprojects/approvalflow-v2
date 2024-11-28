'use client';

import { ContractUploader } from '@/components/contracts/contract-uploader';
import { ContractAnalysisList } from '@/components/contracts/contract-analysis-list';

export default function ContractsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Contract Analysis</h2>
        <p className="text-muted-foreground">
          Upload and analyze contract documents using AI
        </p>
      </div>

      <ContractUploader />
      <ContractAnalysisList />
    </div>
  );
}