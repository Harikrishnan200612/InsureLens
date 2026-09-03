// Core TypeScript types for InsureLens

export type AgeGroup = '18–30' | '31–45' | '46–60' | '61+';

export type PaymentStatus = 'Paid' | 'Pending' | 'Upcoming' | 'Overdue';

export interface FamilyMember {
  id: string;
  name: string;
  relationship: 'Self' | 'Spouse' | 'Child' | 'Parent' | 'Parent-in-law' | 'Other';
  age: number;
  dateOfBirth?: string;
  ageGroup: AgeGroup;
  coverageStatus: 'Covered' | 'Excluded' | 'Waiting Period';
  estimatedPremium: number;
}

export interface PremiumPaymentRecord {
  monthNumber: number;
  label: string; // e.g., "Month 1"
  status: PaymentStatus;
  amount: number;
  dueDate?: string;
  paidDate?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  phoneNumber: string;
  // Optional Insurance Information
  insuranceProvider?: string;
  policyNumber?: string;
  policyType?: 'Individual Health' | 'Family Floater' | 'Senior Citizen' | 'Critical Illness';
  policyStartDate?: string;
  policyEndDate?: string;
  sumInsured?: number;
}

export interface PolicyData {
  sumInsured: number;
  copayPercentage: number;
  deductible: number;
  roomRentLimit: number; // per day
  treatmentLimit: number;
  nonAdmissibleExpenses: number;
  waitingPeriod: number; // days
  exclusions: string[];
  previousUtilization: number;
  policyClauses: PolicyClause[];
  policyNumber?: string;
  insurerName?: string;
  policyHolder?: string;
  validFrom?: string;
  validTo?: string;
  policyType?: string;
  premium?: number;
  familyMembers?: FamilyMember[];
  premiumHistory?: PremiumPaymentRecord[];
}

export interface PolicyClause {
  rule: string;
  value: number | string;
  clause: string;
  explanation: string;
  confidence: 'high' | 'medium' | 'low';
}

export interface BillData {
  totalBill: number;
  hospitalName?: string;
  patientName?: string;
  patientMemberId?: string;
  relationship?: string;
  patientAge?: number;
  admissionDate?: string;
  dischargeDate?: string;
  treatment: string; // Treatment name is mandatory whenever available
  roomCharges: number;
  doctorCharges: number;
  medicines: number;
  diagnostics: number;
  procedure: number;
  consumables: number;
  other: number;
  adminCharges?: number;
}

export interface DeductionItem {
  label: string;
  amount: number;
  reason: string;
  policyReference: string;
  clauseText: string;
  category: 'copay' | 'non_admissible' | 'treatment_limit' | 'room_rent' | 'deductible' | 'clarification';
}

export interface ClaimCalculationResult {
  totalBill: number;
  admissibleAmount: number;
  estimatedInsuranceContribution: number;
  estimatedPatientContribution: number;
  financialGap: number;
  deductions: DeductionItem[];
  warnings: string[];
  confidenceFlags: string[];
  remainingCoverage: number;
}

export interface ClaimRecord {
  id: string;
  claimNumber: string;
  patientMemberId?: string;
  patientName: string;
  relationship: string;
  age: number;
  hospital: string;
  treatment: string; // Treatment name is mandatory
  billAmount: number;
  estimatedCoverage: number;
  patientContribution: number;
  status: 'In Progress' | 'Settled' | 'Needs Clarification' | 'Rejected';
  date: string;
}

export interface ClaimAnalysis {
  id: string;
  userId: string;
  status: 'processing' | 'completed' | 'failed' | 'needs_clarification';
  policyData: PolicyData | null;
  billData: BillData | null;
  result: ClaimCalculationResult | null;
  createdAt: string;
  updatedAt: string;
  hospitalName?: string;
  treatmentName?: string;
  patientName?: string;
  patientRelationship?: string;
  patientAge?: number;
  claimId?: string;
}

export interface DocumentUpload {
  id: string;
  name: string;
  type: 'policy' | 'bill' | 'cashless' | 'previous_claims' | 'treatment';
  fileFormat?: 'pdf' | 'jpg' | 'jpeg' | 'png' | 'txt' | 'other';
  fileSize: number;
  status: 'uploading' | 'success' | 'error';
  url?: string;
  extractedText?: string;
}

export interface DashboardStats {
  totalSumInsured: number;
  usedBenefits: number;
  availableCoverage: number;
  activeClaims: number;
  potentialPatientExposureMin: number;
  potentialPatientExposureMax: number;
}

export interface AnalysisStep {
  id: string;
  label: string;
  status: 'pending' | 'processing' | 'done' | 'error';
  detail?: string;
}
