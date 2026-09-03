'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCurrentUser, DEFAULT_USER } from '@/lib/auth';
import {
  DEFAULT_FAMILY_MEMBERS,
  DEFAULT_PREMIUM_PAYMENTS,
  calculateFamilyPremium,
  PREMIUM_RATES_BY_AGE_GROUP,
} from '@/lib/premiumService';
import { UserProfile, FamilyMember, PremiumPaymentRecord } from '@/types';

const INR = (amount: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

export default function MyInsurancePage() {
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);
  const [members, setMembers] = useState<FamilyMember[]>(DEFAULT_FAMILY_MEMBERS);
  const [payments, setPayments] = useState<PremiumPaymentRecord[]>(DEFAULT_PREMIUM_PAYMENTS);

  useEffect(() => {
    const active = getCurrentUser();
    if (active) {
      setUser(active);
    }
  }, []);

  const totalMonthlyPremium = calculateFamilyPremium(members);

  return (
    <div style={{ maxWidth: 1040, margin: '0 auto' }}>
      {/* Page Heading */}
      <div style={{ marginBottom: 32, borderBottom: '1px solid #E2E8F0', paddingBottom: 20 }}>
        <h1 style={{ fontSize: 26, fontWeight: 900, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          My Insurance & Coverage Details
        </h1>
        <p style={{ fontSize: 14, color: '#64748B', marginTop: 4 }}>
          Comprehensive view of your active policy, insured family members, premium breakdown by age tier, and premium payment history
        </p>
      </div>

      {/* 1. Policy Overview Card */}
      <div style={{ background: '#FFFFFF', borderRadius: 14, border: '1px solid #E2E8F0', padding: 28, marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, borderBottom: '1px solid #F1F5F9', paddingBottom: 14, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Active Policy
            </span>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: '#0F172A', marginTop: 2 }}>
              {user.insuranceProvider || 'HealthShield Comprehensive Co.'}
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <span style={{ background: '#F0FDF4', color: '#16A34A', border: '1px solid #BBF7D0', padding: '5px 12px', borderRadius: 6, fontSize: 12, fontWeight: 800, textTransform: 'uppercase' }}>
              Status: Active
            </span>
            <span style={{ background: '#EFF6FF', color: '#2563EB', border: '1px solid #BFDBFE', padding: '5px 12px', borderRadius: 6, fontSize: 12, fontWeight: 800, textTransform: 'uppercase' }}>
              {user.policyType || 'Family Floater'}
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: 4 }}>Policy Number</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#0F172A' }}>{user.policyNumber || 'HLT-2026-FAM-8821'}</div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: 4 }}>Total Sum Insured</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: '#16A34A' }}>₹10,00,000</div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: 4 }}>Annual Deductible</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#0F172A' }}>₹15,000</div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: 4 }}>Co-Payment Clause</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#D97706' }}>10% Admissible</div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: 4 }}>Policy Term</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>01 Jan 2026 – 31 Dec 2026</div>
          </div>
        </div>
      </div>

      {/* 2. Family Members Covered */}
      <div style={{ background: '#FFFFFF', borderRadius: 14, border: '1px solid #E2E8F0', padding: 28, marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 900, color: '#0F172A', textTransform: 'uppercase' }}>
              FAMILY MEMBERS COVERED
            </h2>
            <p style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>
              Premium amount changes according to individual member age and risk group bracket
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
              Total Estimated Family Premium
            </div>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#2563EB' }}>
              {INR(totalMonthlyPremium)} / month
            </div>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, marginTop: 8 }}>
            <thead>
              <tr style={{ background: '#F8FAFC' }}>
                {['Member', 'Relationship', 'Age', 'Age Group', 'Coverage', 'Premium Contribution'].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: '12px 16px',
                      textAlign: 'left',
                      fontSize: 11,
                      fontWeight: 800,
                      color: '#475569',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      borderBottom: '2px solid #E2E8F0',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {members.map((member, idx) => (
                <tr key={member.id} style={{ borderBottom: idx < members.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0F172A' }}>{member.name}</td>
                  <td style={{ padding: '14px 16px', color: '#475569' }}>{member.relationship}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0F172A' }}>{member.age} yrs</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: 4,
                        fontSize: 12,
                        fontWeight: 700,
                        background: '#F1F5F9',
                        color: '#334155',
                        border: '1px solid #CBD5E1',
                      }}
                    >
                      {member.ageGroup}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ color: '#16A34A', fontWeight: 700, fontSize: 13 }}>
                      {member.coverageStatus}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 800, color: '#0F172A' }}>
                    {INR(member.estimatedPremium)}
                    <span style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500, marginLeft: 4 }}>(Estimated)</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: 16, background: '#F8FAFC', borderRadius: 8, padding: '12px 16px', fontSize: 12, color: '#64748B' }}>
          * Configured rate table tiers: 18–30 (Base Premium: ₹2,200), 31–45 (Moderate Premium: ₹3,200), 46–60 (Higher Premium: ₹5,400), 61+ (Senior Citizen Tier: ₹8,800).
        </div>
      </div>

      {/* 3. Premium Payment History */}
      <div style={{ background: '#FFFFFF', borderRadius: 14, border: '1px solid #E2E8F0', padding: 28, marginBottom: 28 }}>
        <div style={{ marginBottom: 18 }}>
          <h2 style={{ fontSize: 18, fontWeight: 900, color: '#0F172A', textTransform: 'uppercase' }}>
            PREMIUM PAYMENT HISTORY
          </h2>
          <p style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>
            Track monthly premium remittance schedule and payment verification
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 16 }}>
          {payments.map((p) => {
            const isPaid = p.status === 'Paid';
            const isPending = p.status === 'Pending';
            const isUpcoming = p.status === 'Upcoming';

            const statusBg = isPaid ? '#F0FDF4' : isPending ? '#FFFBEB' : '#F8FAFC';
            const statusBorder = isPaid ? '#BBF7D0' : isPending ? '#FDE68A' : '#E2E8F0';
            const statusColor = isPaid ? '#16A34A' : isPending ? '#D97706' : '#64748B';

            return (
              <div
                key={p.monthNumber}
                style={{
                  background: statusBg,
                  border: `1px solid ${statusBorder}`,
                  borderRadius: 10,
                  padding: '18px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 800, color: '#0F172A', textTransform: 'uppercase' }}>
                  {p.label}
                </div>

                <div style={{ fontSize: 20, fontWeight: 900, color: '#0F172A' }}>
                  {INR(p.amount)}
                </div>

                <div style={{ marginTop: 4 }}>
                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: 11,
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      color: statusColor,
                      border: `1px solid ${statusBorder}`,
                      background: '#FFFFFF',
                      padding: '3px 8px',
                      borderRadius: 4,
                    }}
                  >
                    {p.status}
                  </span>
                </div>

                <div style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>
                  {isPaid ? `Paid: ${p.paidDate}` : isPending ? `Due: ${p.dueDate}` : `Scheduled: ${p.dueDate}`}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Quick Actions */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <Link
          href="/dashboard/upload"
          style={{
            display: 'inline-block',
            background: '#2563EB',
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: 14,
            padding: '12px 24px',
            borderRadius: 8,
            textDecoration: 'none',
          }}
        >
          New Claim Analysis →
        </Link>
        <Link
          href="/dashboard/utilization"
          style={{
            display: 'inline-block',
            background: '#FFFFFF',
            color: '#0F172A',
            border: '1px solid #CBD5E1',
            fontWeight: 700,
            fontSize: 14,
            padding: '12px 24px',
            borderRadius: 8,
            textDecoration: 'none',
          }}
        >
          View Benefit Utilization History →
        </Link>
      </div>
    </div>
  );
}
