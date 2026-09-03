// Premium calculation & age group service for InsureLens
// Contains reusable logic for age extraction, age grouping, and configurable premium rates.

import { AgeGroup, FamilyMember, PremiumPaymentRecord } from '@/types';

/**
 * Configurable rate table for health insurance premiums.
 * Premium changes according to age group.
 * Labeled as "Estimated Premium" unless extracted directly from policy.
 */
export const PREMIUM_RATES_BY_AGE_GROUP: Record<AgeGroup, { monthly: number; annual: number; label: string }> = {
  '18–30': {
    monthly: 2200,
    annual: 26400,
    label: 'Base Premium (Young Adult / Early Career)',
  },
  '31–45': {
    monthly: 3200,
    annual: 38400,
    label: 'Moderate Premium (Family Core)',
  },
  '46–60': {
    monthly: 5400,
    annual: 64800,
    label: 'Higher Premium (Senior Adult / Pre-Retirement)',
  },
  '61+': {
    monthly: 8800,
    annual: 105600,
    label: 'Highest Premium (Senior Citizen Risk Tier)',
  },
};

/**
 * Calculates exact age in years from an ISO or standard date of birth string.
 */
export function getAge(dateOfBirth: string): number {
  if (!dateOfBirth) return 30; // fallback default
  const dob = new Date(dateOfBirth);
  if (isNaN(dob.getTime())) return 30;

  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  return Math.max(0, age);
}

/**
 * Maps an age number to its respective standardized age group bracket.
 */
export function getAgeGroup(age: number): AgeGroup {
  if (age <= 30) return '18–30';
  if (age <= 45) return '31–45';
  if (age <= 60) return '46–60';
  return '61+';
}

/**
 * Calculates the monthly estimated premium for an individual based on age and policy type.
 */
export function calculatePremium(age: number, policyType?: string): number {
  const ageGroup = getAgeGroup(age);
  const baseRate = PREMIUM_RATES_BY_AGE_GROUP[ageGroup].monthly;

  // Modest adjustment based on policy type if applicable
  if (policyType === 'Critical Illness') {
    return Math.round(baseRate * 1.15);
  }
  if (policyType === 'Family Floater') {
    // Shared sum insured discount factor
    return Math.round(baseRate * 0.9);
  }

  return baseRate;
}

/**
 * Calculates total estimated monthly premium for all members of a family policy.
 */
export function calculateFamilyPremium(members: FamilyMember[]): number {
  if (!members || members.length === 0) return 0;
  return members.reduce((sum, member) => sum + member.estimatedPremium, 0);
}

/**
 * Default family members for family floater coverage.
 */
export const DEFAULT_FAMILY_MEMBERS: FamilyMember[] = [
  {
    id: 'fam-1',
    name: 'Hari (Self)',
    relationship: 'Self',
    age: 28,
    dateOfBirth: '1998-05-12',
    ageGroup: '18–30',
    coverageStatus: 'Covered',
    estimatedPremium: 2200,
  },
  {
    id: 'fam-2',
    name: 'Ananya (Spouse)',
    relationship: 'Spouse',
    age: 26,
    dateOfBirth: '2000-08-22',
    ageGroup: '18–30',
    coverageStatus: 'Covered',
    estimatedPremium: 2200,
  },
  {
    id: 'fam-3',
    name: 'Suresh (Father)',
    relationship: 'Parent',
    age: 58,
    dateOfBirth: '1968-02-14',
    ageGroup: '46–60',
    coverageStatus: 'Covered',
    estimatedPremium: 5400,
  },
  {
    id: 'fam-4',
    name: 'Kavita (Mother)',
    relationship: 'Parent',
    age: 63,
    dateOfBirth: '1963-11-04',
    ageGroup: '61+',
    coverageStatus: 'Covered',
    estimatedPremium: 8800,
  },
];

/**
 * Default premium payment history.
 * Explicitly follows: Month 1 Paid, Month 2 Paid, Month 3 Paid, Month 4 Pending, Month 5 Upcoming
 */
export const DEFAULT_PREMIUM_PAYMENTS: PremiumPaymentRecord[] = [
  {
    monthNumber: 1,
    label: 'Month 1',
    status: 'Paid',
    amount: 2500,
    paidDate: '2026-04-05',
  },
  {
    monthNumber: 2,
    label: 'Month 2',
    status: 'Paid',
    amount: 2500,
    paidDate: '2026-05-05',
  },
  {
    monthNumber: 3,
    label: 'Month 3',
    status: 'Paid',
    amount: 2500,
    paidDate: '2026-06-05',
  },
  {
    monthNumber: 4,
    label: 'Month 4',
    status: 'Pending',
    amount: 2500,
    dueDate: '2026-07-05',
  },
  {
    monthNumber: 5,
    label: 'Month 5',
    status: 'Upcoming',
    amount: 2500,
    dueDate: '2026-08-05',
  },
];
