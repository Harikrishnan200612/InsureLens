// Demo data for InsureLens hackathon demo mode
// Used when API keys are not configured or user clicks "Try Demo Claim"

import { PolicyData, BillData, ClaimCalculationResult, ClaimAnalysis, DashboardStats } from '@/types';

export const DEMO_POLICY: PolicyData = {
  sumInsured: 1000000,
  copayPercentage: 10,
  deductible: 15000,
  roomRentLimit: 5000,
  treatmentLimit: 20000,
  nonAdmissibleExpenses: 25000,
  waitingPeriod: 30,
  exclusions: ['Cosmetic surgery', 'Dental treatment (routine)', 'Maternity (first 9 months)'],
  previousUtilization: 200000,
  policyNumber: 'DEMO-2026-HLT-001',
  insurerName: 'HealthShield Insurance Co.',
  policyHolder: 'Demo Patient',
  validFrom: '2026-01-01',
  validTo: '2026-12-31',
  policyClauses: [
    {
      rule: 'Co-payment',
      value: 10,
      clause: 'Section 4.2',
      explanation: 'A 10% co-payment applies to all admissible expenses. The insured shall bear 10% of the admissible claim amount.',
      confidence: 'high',
    },
    {
      rule: 'Non-admissible Expenses',
      value: 25000,
      clause: 'Section 7.1',
      explanation: 'Certain expenses including registration charges, admission fees, attendant charges, and over-the-counter medicines are not covered under this policy.',
      confidence: 'high',
    },
    {
      rule: 'Treatment Limit',
      value: 20000,
      clause: 'Section 5.3',
      explanation: 'Cataract treatment and similar day-care procedures are subject to a sub-limit of ₹20,000 per eye per hospitalization.',
      confidence: 'medium',
    },
    {
      rule: 'Deductible',
      value: 15000,
      clause: 'Section 3.1',
      explanation: 'An annual deductible of ₹15,000 applies. The insured must bear this amount before insurance benefits become payable.',
      confidence: 'high',
    },
    {
      rule: 'Room Rent Limit',
      value: 5000,
      clause: 'Section 6.1',
      explanation: 'Room rent is restricted to ₹5,000 per day for a standard private room. Proportionate deductions apply if a higher category room is chosen.',
      confidence: 'high',
    },
  ],
};

export const DEMO_BILL: BillData = {
  totalBill: 400000,
  hospitalName: 'Apollo Hospitals',
  patientName: 'Demo Patient',
  admissionDate: '2026-08-20',
  dischargeDate: '2026-08-28',
  treatment: 'Knee Replacement Surgery',
  roomCharges: 50000,
  doctorCharges: 70000,
  medicines: 80000,
  diagnostics: 40000,
  procedure: 100000,
  consumables: 25000,
  adminCharges: 15000,
  other: 20000,
};

export const DEMO_RESULT: ClaimCalculationResult = {
  totalBill: 400000,
  admissibleAmount: 350000,
  estimatedInsuranceContribution: 300000,
  estimatedPatientContribution: 100000,
  financialGap: 100000,
  remainingCoverage: 500000,
  deductions: [
    {
      label: 'Co-payment (10%)',
      amount: 30000,
      reason: 'Your policy contains a 10% co-payment clause. This means you are responsible for 10% of all admissible expenses.',
      policyReference: 'Section 4.2',
      clauseText: 'A 10% co-payment applies to all admissible expenses. The insured shall bear 10% of the admissible claim amount as per the terms and conditions of this policy.',
      category: 'copay',
    },
    {
      label: 'Non-admissible Expenses',
      amount: 25000,
      reason: 'Certain expenses in your bill are not covered under the available policy terms. These include registration charges (₹5,000), attendant charges (₹8,000), over-the-counter medicines (₹7,000), and administrative fees (₹5,000).',
      policyReference: 'Section 7.1',
      clauseText: 'The following expenses are not covered: (a) Registration/admission charges, (b) Attendant or visitor charges, (c) Over-the-counter medicines and non-prescription drugs, (d) Administrative and documentation fees.',
      category: 'non_admissible',
    },
    {
      label: 'Treatment Sub-limit Deduction',
      amount: 20000,
      reason: 'Your policy applies a specific sub-limit for this type of procedure. The total procedure cost exceeded the policy sub-limit, resulting in this deduction.',
      policyReference: 'Section 5.3',
      clauseText: 'For surgical procedures classified under Category B, a sub-limit of ₹1,00,000 per hospitalization applies. Expenses exceeding this limit shall be borne by the insured.',
      category: 'treatment_limit',
    },
    {
      label: 'Annual Deductible',
      amount: 15000,
      reason: 'Your policy has an annual deductible of ₹15,000. This is the amount you must pay each policy year before the insurance contribution begins.',
      policyReference: 'Section 3.1',
      clauseText: 'The policy is subject to an annual deductible of ₹15,000. The insured shall bear the first ₹15,000 of admissible expenses in each policy year before any insurance benefit becomes payable.',
      category: 'deductible',
    },
    {
      label: 'Needs Clarification',
      amount: 10000,
      reason: 'Some charges in the bill could not be definitively classified based on available policy information. These may be covered or excluded depending on insurer review.',
      policyReference: 'Multiple Sections',
      clauseText: 'These items require review by the insurer/TPA to determine admissibility.',
      category: 'clarification',
    },
  ],
  warnings: [
    'Room rent exceeds policy limit of ₹5,000/day. Proportionate deductions may apply.',
    'Consumables coverage may be limited under certain policy versions.',
    'Final settlement subject to TPA/insurer review and document verification.',
  ],
  confidenceFlags: [
    'Treatment category classification is an estimate',
    'Non-admissible amount may vary after insurer review',
  ],
};

export const DEMO_ANALYSIS: ClaimAnalysis = {
  id: 'demo-claim-001',
  userId: 'demo-user',
  status: 'completed',
  policyData: DEMO_POLICY,
  billData: DEMO_BILL,
  result: DEMO_RESULT,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  hospitalName: 'Apollo Hospitals',
  claimId: 'CLM-2026-DEMO-001',
};

export const DEMO_DASHBOARD_STATS: DashboardStats = {
  totalSumInsured: 1000000,
  usedBenefits: 200000,
  availableCoverage: 800000,
  activeClaims: 1,
  potentialPatientExposureMin: 40000,
  potentialPatientExposureMax: 80000,
};

export const DEMO_CLAIMS_HISTORY = [
  {
    id: 'CLM-2026-001',
    date: '2026-08-28',
    hospital: 'Apollo Hospitals',
    billAmount: 400000,
    estimatedCoverage: 300000,
    patientContribution: 100000,
    status: 'In Progress' as const,
  },
  {
    id: 'CLM-2025-042',
    date: '2025-11-14',
    hospital: 'Fortis Healthcare',
    billAmount: 85000,
    estimatedCoverage: 65000,
    patientContribution: 20000,
    status: 'Settled' as const,
  },
  {
    id: 'CLM-2025-018',
    date: '2025-06-03',
    hospital: 'Max Super Speciality',
    billAmount: 150000,
    estimatedCoverage: 115000,
    patientContribution: 35000,
    status: 'Settled' as const,
  },
];
