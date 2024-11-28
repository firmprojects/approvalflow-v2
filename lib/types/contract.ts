export interface ContractParty {
  name: string;
  role: string;
  contact?: string;
}

export interface ContractTerm {
  title: string;
  description: string;
  isHighRisk: boolean;
}

export interface ContractObligation {
  party: string;
  description: string;
  deadline?: Date;
}

export interface ContractRisk {
  description: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  mitigation?: string;
}

export interface ContractAnalysisResult {
  id: string;
  fileName: string;
  fileUrl: string;
  analyzedAt: Date;
  contractType: string;
  status: 'PROCESSING' | 'COMPLETED' | 'FAILED';
  summary: string;
  parties: ContractParty[];
  startDate: Date;
  endDate: Date;
  value: number;
  currency: string;
  obligations: ContractObligation[];
  terms: ContractTerm[];
  risks: ContractRisk[];
  metadata: Record<string, any>;
}