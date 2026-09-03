'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  DEFAULT_FAMILY_MEMBERS,
  DEFAULT_PREMIUM_PAYMENTS,
  calculateFamilyPremium,
} from '@/lib/premiumService';
import { DEMO_RESULT } from '@/lib/demoData';
import { FamilyMember, PremiumPaymentRecord } from '@/types';

const INR = (amount: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

export default function ResultsClient() {
  const params = useParams();
  const claimId = (params?.id as string) || 'CLM-2026-001';

  const [patientInfo, setPatientInfo] = useState({
    name: 'Jack (Self)',
    relationship: 'Self',
    age: 28,
    treatment: 'Knee Replacement Surgery',
    hospital: 'Apollo Hospitals',
    billAmount: 400000,
  });

  const [members] = useState<FamilyMember[]>(DEFAULT_FAMILY_MEMBERS);
  const [payments] = useState<PremiumPaymentRecord[]>(DEFAULT_PREMIUM_PAYMENTS);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('current_claim_patient');
      if (stored) {
        const parsed = JSON.parse(stored);
        setPatientInfo((prev) => ({ ...prev, ...parsed }));
      }
    } catch {}
  }, []);

  const totalBill = patientInfo.billAmount;
  const result = DEMO_RESULT;
  const potentialInsuranceMin = 320000;
  const potentialInsuranceMax = 360000;
  const estimatedPatientMin = 40000;
  const estimatedPatientMax = 80000;
  const totalFamilyPremium = calculateFamilyPremium(members);

  return (
    <div style={{ maxWidth: 1040, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, fontSize: 13, color: '#64748B' }}>
        <Link href="/dashboard" style={{ color: '#2563EB', textDecoration: 'none', fontWeight: 600 }}>Dashboard</Link>
        <span>/</span>
        <Link href="/dashboard/upload" style={{ color: '#2563EB', textDecoration: 'none', fontWeight: 600 }}>New Claim Analysis</Link>
        <span>/</span>
        <span style={{ color: '#0F172A', fontWeight: 700 }}>Results</span>
      </div>

      <div
        style={{
          background: '#FFFBEB',
          border: '1px solid #FDE68A',
          borderLeft: '4px solid #D97706',
          borderRadius: 8,
          padding: '14px 18px',
          fontSize: 13,
          color: '#92400E',
          lineHeight: 1.6,
          marginBottom: 28,
        }}
      >
        <strong style={{ textTransform: 'uppercase' }}>Estimate Disclaimer: </strong>
        These are illustrative estimates based on the information available in the uploaded documents. 
        Final claim settlement depends on policy terms and insurer/TPA authorization.
      </div>

      <div style={{ background: '#FFFFFF', borderRadius: 14, border: '1px solid #E2E8F0', padding: 28, marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, borderBottom: '1px solid #F1F5F9', paddingBottom: 20, marginBottom: 20 }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Claim Financial Analysis
            </span>
            <h1 style={{ fontSize: 24, fontWeight: 900, color: '#0F172A', marginTop: 4 }}>
              {patientInfo.treatment}
            </h1>
            <div style={{ fontSize: 14, color: '#475569', marginTop: 4 }}>
              Hospital: <strong style={{ color: '#0F172A' }}>{patientInfo.hospital}</strong> · Patient: <strong style={{ color: '#0F172A' }}>{patientInfo.name}</strong> ({patientInfo.relationship}, Age {patientInfo.age})
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ background: '#EFF6FF', color: '#1E40AF', border: '1px solid #BFDBFE', padding: '6px 14px', borderRadius: 6, fontSize: 12, fontWeight: 800, textTransform: 'uppercase' }}>
              Status: In Progress (Estimated)
            </span>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 6 }}>
              Reference ID: {claimId}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          <div style={{ background: '#F8FAFC', borderRadius: 10, padding: '20px 22px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 8 }}>
              Hospital Bill
            </div>
            <div style={{ fontSize: 30, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.5px' }}>
              {INR(totalBill)}
            </div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 6 }}>
              Itemized inpatient hospital charges
            </div>
          </div>

          <div style={{ background: '#F0FDF4', borderRadius: 10, padding: '20px 22px', border: '2px solid #86EFAC' }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#16A34A', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 8 }}>
              Potential Insurance Contribution
            </div>
            <div style={{ fontSize: 26, fontWeight: 900, color: '#16A34A', letterSpacing: '-0.5px' }}>
              {INR(potentialInsuranceMin)} – {INR(potentialInsuranceMax)}
            </div>
            <div style={{ fontSize: 12, color: '#16A34A', marginTop: 6 }}>
              Estimated coverage (Approx. 80%–90%)
            </div>
          </div>

          <div style={{ background: '#FEF2F2', borderRadius: 10, padding: '20px 22px', border: '2px solid #FECACA' }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#DC2626', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 8 }}>
              Estimated Patient Contribution
            </div>
            <div style={{ fontSize: 26, fontWeight: 900, color: '#DC2626', letterSpacing: '-0.5px' }}>
              {INR(estimatedPatientMin)} – {INR(estimatedPatientMax)}
            </div>
            <div style={{ fontSize: 12, color: '#DC2626', marginTop: 6 }}>
              Estimated out-of-pocket responsibility
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: '#FFFFFF', borderRadius: 14, border: '1px solid #E2E8F0', padding: 28, marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, borderBottom: '1px solid #F1F5F9', paddingBottom: 12 }}>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 900, color: '#0F172A', textTransform: 'uppercase' }}>
              WHY IS THERE A FINANCIAL GAP?
            </h2>
            <p style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>
              Breakdown of non-payable amounts, sub-limits, deductibles, and co-payment obligations
            </p>
          </div>
          <Link
            href={`/dashboard/results/${claimId}/why`}
            style={{
              fontSize: 13,
              fontWeight: 800,
              color: '#2563EB',
              textDecoration: 'none',
              padding: '6px 12px',
              borderRadius: 6,
              background: '#EFF6FF',
              border: '1px solid #BFDBFE',
            }}
          >
            Read Detailed Clause Explanations →
          </Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {result.deductions.map((d) => (
            <div
              key={d.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderRadius: 8,
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                flexWrap: 'wrap',
                gap: 12,
              }}
            >
              <div>
                <div style={{ fontWeight: 800, fontSize: 15, color: '#0F172A' }}>{d.label}</div>
                <div style={{ fontSize: 13, color: '#475569', marginTop: 2 }}>{d.reason}</div>
                <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>
                  Policy Reference: <strong style={{ color: '#0F172A' }}>{d.policyReference}</strong>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 18, fontWeight: 900, color: '#DC2626' }}>
                  {INR(d.amount)}
                </div>
                <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>
                  Deduction
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: '#FFFFFF', borderRadius: 14, border: '1px solid #E2E8F0', padding: 28, marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 900, color: '#0F172A', textTransform: 'uppercase' }}>
              FAMILY MEMBERS COVERED
            </h2>
            <p style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>
              Floater policy participants and respective age group premium tiers
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
              Total Estimated Family Premium
            </div>
            <div style={{ fontSize: 18, fontWeight: 900, color: '#2563EB' }}>
              {INR(totalFamilyPremium)} / mo
            </div>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: '#F8FAFC' }}>
                {['Member', 'Relationship', 'Age', 'Age Group', 'Coverage', 'Premium Contribution'].map((h) => (
                  <th key={h} style={{ padding: '12px 14px', textAlign: 'left', fontSize: 11, fontWeight: 800, color: '#475569', textTransform: 'uppercase', borderBottom: '2px solid #E2E8F0' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {members.map((m, idx) => (
                <tr key={m.id} style={{ borderBottom: idx < members.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#0F172A' }}>{m.name}</td>
                  <td style={{ padding: '12px 14px', color: '#475569' }}>{m.relationship}</td>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#0F172A' }}>{m.age}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 12, fontWeight: 700, background: '#F1F5F9', border: '1px solid #CBD5E1', color: '#334155' }}>
                      {m.ageGroup}
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px', color: '#16A34A', fontWeight: 700 }}>{m.coverageStatus}</td>
                  <td style={{ padding: '12px 14px', fontWeight: 800, color: '#0F172A' }}>
                    {INR(m.estimatedPremium)}
                    <span style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500, marginLeft: 4 }}>(Estimated)</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ background: '#FFFFFF', borderRadius: 14, border: '1px solid #E2E8F0', padding: 28, marginBottom: 28 }}>
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 900, color: '#0F172A', textTransform: 'uppercase' }}>
            PREMIUM PAYMENT HISTORY
          </h2>
          <p style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>
            Insured policy payment schedule and verification statuses
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 16 }}>
          {payments.map((p) => {
            const isPaid = p.status === 'Paid';
            const isPending = p.status === 'Pending';
            const statusBg = isPaid ? '#F0FDF4' : isPending ? '#FFFBEB' : '#F8FAFC';
            const statusBorder = isPaid ? '#BBF7D0' : isPending ? '#FDE68A' : '#E2E8F0';
            const statusColor = isPaid ? '#16A34A' : isPending ? '#D97706' : '#64748B';

            return (
              <div
                key={p.monthNumber}
                style={{
                  background: statusBg,
                  border: `1px solid ${statusBorder}`,
                  borderRadius: 8,
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 800, color: '#0F172A', textTransform: 'uppercase' }}>
                  {p.label}
                </div>
                <div style={{ fontSize: 20, fontWeight: 900, color: '#0F172A' }}>
                  {INR(p.amount)}
                </div>
                <div>
                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: 11,
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      color: statusColor,
                      border: `1px solid ${statusBorder}`,
                      background: '#FFFFFF',
                      padding: '2px 8px',
                      borderRadius: 4,
                    }}
                  >
                    {p.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', paddingBottom: 24 }}>
        <Link
          href={`/dashboard/results/${claimId}/why`}
          style={{
            background: '#2563EB',
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: 14,
            padding: '14px 28px',
            borderRadius: 8,
            textDecoration: 'none',
          }}
        >
          Why Am I Paying This? (Full Analysis) →
        </Link>
        <Link
          href="/dashboard/upload"
          style={{
            background: '#FFFFFF',
            color: '#0F172A',
            border: '1px solid #CBD5E1',
            fontWeight: 700,
            fontSize: 14,
            padding: '14px 24px',
            borderRadius: 8,
            textDecoration: 'none',
          }}
        >
          Analyze Another Claim
        </Link>
      </div>
    </div>
  );
}
