import { ContractAnalysisResult } from '../types/contract';

export const mockContractAnalyses: ContractAnalysisResult[] = [
  {
    id: '1',
    fileName: 'Service Agreement - TechCorp 2024.pdf',
    fileUrl: '#',
    analyzedAt: new Date('2024-03-10'),
    contractType: 'Service Agreement',
    status: 'COMPLETED',
    summary: 'Annual service agreement for software maintenance and support services between TechCorp and our organization.',
    parties: [
      {
        name: 'TechCorp Inc.',
        role: 'Service Provider',
        contact: 'contact@techcorp.com'
      },
      {
        name: 'Our Organization',
        role: 'Client',
        contact: 'legal@ourorg.com'
      }
    ],
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    value: 75000,
    currency: 'USD',
    obligations: [
      {
        party: 'Service Provider',
        description: 'Monthly system maintenance and updates',
        deadline: new Date('2024-12-31')
      },
      {
        party: 'Client',
        description: 'Payment due within 30 days of invoice'
      }
    ],
    terms: [
      {
        title: 'Payment Terms',
        description: 'Payment due within 30 days of invoice',
        isHighRisk: false
      },
      {
        title: 'Service Level Agreement',
        description: '99.9% uptime guarantee',
        isHighRisk: false
      }
    ],
    risks: [
      {
        description: 'No cap on liability for data breaches',
        severity: 'HIGH',
        mitigation: 'Negotiate liability cap'
      },
      {
        description: 'Automatic price increase of 5% upon renewal',
        severity: 'MEDIUM',
        mitigation: 'Review before renewal'
      }
    ],
    metadata: {
      pageCount: 25,
      language: 'English',
      confidentialityLevel: 'High'
    }
  },
  {
    id: '2',
    fileName: 'Office Lease Agreement 2024.pdf',
    fileUrl: '#',
    analyzedAt: new Date('2024-03-09'),
    contractType: 'Lease Agreement',
    status: 'COMPLETED',
    summary: 'Commercial office space lease agreement for the downtown location.',
    parties: [
      {
        name: 'Commercial Properties LLC',
        role: 'Landlord',
        contact: 'leasing@commprop.com'
      },
      {
        name: 'Our Organization',
        role: 'Tenant',
        contact: 'facilities@ourorg.com'
      }
    ],
    startDate: new Date('2024-02-01'),
    endDate: new Date('2027-01-31'),
    value: 250000,
    currency: 'USD',
    obligations: [
      {
        party: 'Tenant',
        description: 'Monthly rent payment due by 1st of each month',
        deadline: new Date('2024-03-01')
      },
      {
        party: 'Landlord',
        description: 'Maintain common areas and building systems'
      }
    ],
    terms: [
      {
        title: 'Lease Term',
        description: '3-year lease with option to renew',
        isHighRisk: false
      },
      {
        title: 'Security Deposit',
        description: '$20,000 due at signing',
        isHighRisk: false
      }
    ],
    risks: [
      {
        description: 'Personal guarantee required',
        severity: 'HIGH',
        mitigation: 'Negotiate corporate guarantee'
      },
      {
        description: 'No early termination clause',
        severity: 'MEDIUM',
        mitigation: 'Add sublease provision'
      }
    ],
    metadata: {
      pageCount: 45,
      language: 'English',
      confidentialityLevel: 'Medium'
    }
  }
];