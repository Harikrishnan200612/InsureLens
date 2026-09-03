'use client';

import Link from 'next/link';
import { DEMO_POLICY } from '@/lib/demoData';

const INR = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

export default function PolicySummaryPage() {
  const policy = DEMO_POLICY;

  const policyDetails = [
    { label: 'Sum Insured', value: INR(policy.sumInsured), icon: '🛡️', color: '#2563EB', clause: 'Policy Schedule', desc: 'Maximum amount the insurer will pay for all covered hospitalizations in a policy year.' },
    { label: 'Co-payment', value: `${policy.copayPercentage}%`, icon: '💳', color: '#D97706', clause: 'Section 4.2', desc: `You must pay ${policy.copayPercentage}% of each admissible claim. Insurer covers the rest.` },
    { label: 'Annual Deductible', value: INR(policy.deductible), icon: '🔖', color: '#7C3AED', clause: 'Section 3.1', desc: 'Amount you must pay each policy year before insurance benefits apply.' },
    { label: 'Room Rent Limit', value: `${INR(policy.roomRentLimit)}/day`, icon: '🛏️', color: '#0891B2', clause: 'Section 6.1', desc: `Daily room rent capped at ${INR(policy.roomRentLimit)}. Exceeding this also reduces other charges proportionately.` },
    { label: 'Treatment Sub-limit', value: INR(policy.treatmentLimit), icon: '📊', color: '#E11D48', clause: 'Section 5.3', desc: 'Certain procedure categories have per-occurrence limits.' },
    { label: 'Non-admissible', value: 'Various', icon: '🚫', color: '#DC2626', clause: 'Section 7.1', desc: 'Registration fees, attendant charges, over-the-counter drugs are excluded.' },
    { label: 'Waiting Period', value: `${policy.waitingPeriod} days`, icon: '⏳', color: '#64748B', clause: 'Section 2.1', desc: 'No claims for pre-existing conditions for this period from policy start.' },
    { label: 'Prev. Utilized', value: INR(policy.previousUtilization), icon: '📉', color: '#DC2626', clause: 'Claims History', desc: 'Amount claimed and settled in previous hospitalizations this policy year.' },
  ];

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, fontSize: 14 }}>
        <Link href="/dashboard/policies" style={{ color: '#64748B', textDecoration: 'none' }}>My Policies</Link>
        <span style={{ color: '#E2E8F0' }}>›</span>
        <span style={{ color: '#0F172A', fontWeight: 600 }}>Policy Summary</span>
      </div>

      {/* Policy Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0F172A, #1E3A5F)',
        borderRadius: 16, padding: '28px 28px',
        marginBottom: 28,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: 'rgba(37,99,235,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>🛡️</div>
          <div>
            <div style={{ color: 'white', fontWeight: 900, fontSize: 20 }}>{policy.insurerName}</div>
            <div style={{ color: '#94A3B8', fontSize: 13 }}>Policy: {policy.policyNumber} · {policy.policyHolder}</div>
          </div>
          <span style={{ marginLeft: 'auto', background: '#16A34A', color: 'white', fontSize: 12, fontWeight: 800, padding: '5px 12px', borderRadius: 100 }}>● Active</span>
        </div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <div style={{ color: '#64748B', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Sum Insured</div>
            <div style={{ color: '#60A5FA', fontSize: 28, fontWeight: 900, letterSpacing: '-0.5px' }}>{INR(policy.sumInsured)}</div>
          </div>
          <div>
            <div style={{ color: '#64748B', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Valid</div>
            <div style={{ color: 'white', fontSize: 16, fontWeight: 700 }}>{policy.validFrom} – {policy.validTo}</div>
          </div>
          <div>
            <div style={{ color: '#64748B', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Available Coverage</div>
            <div style={{ color: '#4ADE80', fontSize: 28, fontWeight: 900, letterSpacing: '-0.5px' }}>{INR(policy.sumInsured - policy.previousUtilization)}</div>
          </div>
        </div>
      </div>

      {/* Coverage Details */}
      <div style={{ background: 'white', borderRadius: 14, border: '1px solid #E2E8F0', overflow: 'hidden', marginBottom: 24 }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid #E2E8F0', fontWeight: 800, fontSize: 16, color: '#0F172A' }}>
          Coverage Details & Policy Clauses
        </div>
        <div style={{ padding: '8px 0' }}>
          {policyDetails.map((detail, idx) => (
            <div key={detail.label} style={{
              padding: '16px 24px',
              borderBottom: idx < policyDetails.length - 1 ? '1px solid #F1F5F9' : 'none',
              display: 'flex', alignItems: 'flex-start', gap: 16,
            }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${detail.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                {detail.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: '#0F172A' }}>{detail.label}</span>
                  <span style={{ fontSize: 11, background: '#F1F5F9', color: '#64748B', padding: '2px 8px', borderRadius: 100, fontWeight: 600 }}>
                    {detail.clause}
                  </span>
                </div>
                <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6 }}>{detail.desc}</div>
              </div>
              <div style={{ fontSize: 18, fontWeight: 900, color: detail.color, flexShrink: 0, whiteSpace: 'nowrap' }}>
                {detail.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Exclusions */}
      <div style={{ background: 'white', borderRadius: 14, border: '1px solid #E2E8F0', padding: 24, marginBottom: 24 }}>
        <div style={{ fontWeight: 800, fontSize: 16, color: '#0F172A', marginBottom: 16 }}>🚫 Key Exclusions</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {policy.exclusions.map((excl) => (
            <div key={excl} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: '#DC2626', fontSize: 16 }}>✗</span>
              <span style={{ fontSize: 14, color: '#475569' }}>{excl}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Link href="/dashboard/upload" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: '#2563EB', color: 'white', fontWeight: 700, fontSize: 13,
          padding: '10px 20px', borderRadius: 9, textDecoration: 'none',
        }}>
          🔍 Analyze a Claim
        </Link>
        <Link href="/dashboard/utilization" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'white', border: '1px solid #E2E8F0', color: '#475569', fontWeight: 600, fontSize: 13,
          padding: '10px 20px', borderRadius: 9, textDecoration: 'none',
        }}>
          📈 Benefit Utilization
        </Link>
      </div>
    </div>
  );
}
