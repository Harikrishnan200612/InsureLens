'use client';

import Link from 'next/link';
import { DEMO_POLICY } from '@/lib/demoData';

const INR = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

export default function PolicyClient() {
  const policy = DEMO_POLICY;

  const policyDetails = [
    { label: 'Sum Insured', value: INR(policy.sumInsured), clause: 'Policy Schedule', desc: 'Maximum amount the insurer will pay for all covered hospitalizations in a policy year.' },
    { label: 'Co-payment', value: `${policy.copayPercentage}%`, clause: 'Section 4.2', desc: `You must pay ${policy.copayPercentage}% of each admissible claim. Insurer covers the rest.` },
    { label: 'Annual Deductible', value: INR(policy.deductible), clause: 'Section 3.1', desc: 'Amount you must pay each policy year before insurance benefits apply.' },
    { label: 'Room Rent Limit', value: `${INR(policy.roomRentLimit)}/day`, clause: 'Section 6.1', desc: `Daily room rent capped at ${INR(policy.roomRentLimit)}. Exceeding this also reduces other charges proportionately.` },
    { label: 'Treatment Sub-limit', value: `${INR(policy.treatmentLimit)}/claim`, clause: 'Section 5.3', desc: 'Maximum capping for specific high-cost surgeries or procedures.' },
    { label: 'Non-admissible Expenses', value: 'As per Annexure I', clause: 'Section 7.1', desc: 'Excluded items such as registration, attendant charges, OTC drugs, and administrative fees.' },
  ];

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 26, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.5px' }}>Policy Summary</h1>
        <p style={{ fontSize: 14, color: '#64748B', marginTop: 4 }}>HealthShield Optimum Comprehensive Policy · Policy Year 2026</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 32 }}>
        {policyDetails.map(item => (
          <div key={item.label} style={{ background: 'white', borderRadius: 14, padding: 24, border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 8 }}>
              {item.label}
            </div>
            <div style={{ fontSize: 26, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.5px', marginBottom: 8 }}>{item.value}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#2563EB', background: '#EFF6FF', padding: '2px 8px', borderRadius: 4, display: 'inline-block', marginBottom: 8 }}>
              Ref: {item.clause}
            </div>
            <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.5 }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <div style={{ background: 'white', borderRadius: 14, border: '1px solid #E2E8F0', padding: 28, marginBottom: 32 }}>
        <div style={{ fontWeight: 800, fontSize: 16, color: '#0F172A', marginBottom: 16 }}>Important Policy Clauses & Rules</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {policy.policyClauses.map(clause => (
            <div key={clause.clause} style={{ padding: '16px 20px', borderRadius: 10, background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontWeight: 800, fontSize: 14, color: '#0F172A' }}>{clause.rule}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#2563EB', background: '#EFF6FF', padding: '2px 8px', borderRadius: 4 }}>
                  {clause.clause}
                </span>
              </div>
              <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6 }}>{clause.explanation}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <Link href="/dashboard/upload" style={{
          background: '#2563EB', color: 'white', fontWeight: 700, fontSize: 14,
          padding: '12px 24px', borderRadius: 10, textDecoration: 'none',
        }}>
          New Claim Analysis
        </Link>
        <Link href="/dashboard/insurance" style={{
          background: 'white', color: '#0F172A', fontWeight: 700, fontSize: 14,
          padding: '12px 24px', borderRadius: 10, textDecoration: 'none', border: '1px solid #CBD5E1',
        }}>
          View Insurance Schedule
        </Link>
      </div>
    </div>
  );
}
