import { ContractAnalysisView } from '@/components/contracts/contract-analysis-view';
import { mockContractAnalyses } from '@/lib/data/mock-contracts';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return mockContractAnalyses.map((analysis) => ({
    id: analysis.id,
  }));
}

export default function ContractAnalysisPage({
  params,
}: {
  params: { id: string };
}) {
  const analysis = mockContractAnalyses.find(a => a.id === params.id);

  if (!analysis) {
    notFound();
  }

  return <ContractAnalysisView analysis={analysis} />;
}