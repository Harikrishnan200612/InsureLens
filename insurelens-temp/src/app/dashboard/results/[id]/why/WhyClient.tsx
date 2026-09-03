'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { DEMO_ANALYSIS } from '@/lib/demoData';
import { DeductionItem } from '@/types';

const INR = (amount: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

function DeductionCard({
  deduction,
  index,
  isOpen,
  onToggle,
}: {
  deduction: DeductionItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      style={{
        border: '1px solid #E2E8F0',
        borderRadius: 10,
        overflow: 'hidden',
        background: '#FFFFFF',
        boxShadow: isOpen ? '0 4px 12px rgba(0, 0, 0, 0.04)' : 'none',
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '20px 24px',
          background: isOpen ? '#F8FAFC' : '#FFFFFF',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 6,
            background: '#0F172A',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            fontWeight: 800,
            flexShrink: 0,
          }}
        >
          {index + 1}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 16, color: '#0F172A' }}>{deduction.label}</div>
          <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>
            Policy Reference: <strong style={{ color: '#0F172A' }}>{deduction.policyReference}</strong>
          </div>
        </div>

        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontSize: 20, fontWeight: 900, color: '#DC2626' }}>{INR(deduction.amount)}</div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#2563EB', marginTop: 2 }}>
            {isOpen ? 'Collapse [-]' : 'View Clause [+]'}
          </div>
        </div>
      </button>

      {isOpen && (
        <div style={{ padding: '20px 24px 24px', borderTop: '1px solid #E2E8F0', background: '#FAFAFA' }}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 6 }}>
              Reason for Deduction
            </div>
            <p style={{ fontSize: 14, color: '#334155', lineHeight: 1.7 }}>
              {deduction.reason}
            </p>
          </div>

          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              borderLeft: '4px solid #2563EB',
              borderRadius: 6,
              padding: '14px 18px',
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>
              Extracted Policy Clause ({deduction.policyReference})
            </div>
            <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6, fontStyle: 'italic' }}>
              "{deduction.clauseText}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function WhyClient() {
  const params = useParams();
  const claimId = (params?.id as string) || 'CLM-2026-001';
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [allOpen, setAllOpen] = useState(false);

  const [patientInfo, setPatientInfo] = useState({
    treatment: 'Knee Replacement Surgery',
    hospital: 'Apollo Hospitals',
    name: 'Hari',
    billAmount: 400000,
  });

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('current_claim_patient');
      if (stored) {
        setPatientInfo((prev) => ({ ...prev, ...JSON.parse(stored) }));
      }
    } catch {}
  }, []);

  const result = DEMO_ANALYSIS.result!;

  const toggleAll = () => {
    setAllOpen(!allOpen);
    setOpenIdx(null);
  };

  return (
    <div style={{ maxWidth: 840, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, fontSize: 13, color: '#64748B' }}>
        <Link href="/dashboard" style={{ color: '#2563EB', textDecoration: 'none', fontWeight: 600 }}>Dashboard</Link>
        <span>/</span>
        <Link href={`/dashboard/results/${claimId}`} style={{ color: '#2563EB', textDecoration: 'none', fontWeight: 600 }}>Results</Link>
        <span>/</span>
        <span style={{ color: '#0F172A', fontWeight: 700 }}>Why Am I Paying This?</span>
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
          marginBottom: 24,
        }}
      >
        <strong style={{ textTransform: 'uppercase' }}>Estimate Notice: </strong>
        These are illustrative estimates based on the information available in the uploaded documents. 
        Final claim settlement depends on policy terms and insurer/TPA authorization.
      </div>

      <div style={{ background: '#0F172A', borderRadius: 12, padding: '32px 30px', color: '#FFFFFF', marginBottom: 28 }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: '#94A3B8', marginBottom: 6 }}>
          Clause-by-Clause Financial Breakdown
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>
          Why Am I Paying This?
        </h1>
        <p style={{ fontSize: 14, color: '#CBD5E1', lineHeight: 1.6 }}>
          Understanding the rationale behind your estimated out-of-pocket patient responsibility of{' '}
          <strong style={{ color: '#F87171' }}>{INR(result.financialGap)}</strong> for{' '}
          <strong style={{ color: '#FFFFFF' }}>{patientInfo.treatment}</strong> at {patientInfo.hospital}.
        </p>

        <div style={{ marginTop: 20, display: 'flex', gap: 24, flexWrap: 'wrap', borderTop: '1px solid #334155', paddingTop: 18 }}>
          <div>
            <div style={{ fontSize: 11, color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700 }}>Total Hospital Bill</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#FFFFFF' }}>{INR(patientInfo.billAmount)}</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700 }}>Potential Insurance Contribution</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#4ADE80' }}>₹3,20,000 – ₹3,60,000</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700 }}>Estimated Patient Responsibility</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#F87171' }}>{INR(result.financialGap)}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
        <h2 style={{ fontSize: 16, fontWeight: 900, color: '#0F172A', textTransform: 'uppercase' }}>
          Major Deductions & Policy Clauses
        </h2>
        <button
          type="button"
          onClick={toggleAll}
          style={{
            background: '#FFFFFF',
            border: '1px solid #CBD5E1',
            borderRadius: 6,
            padding: '7px 14px',
            fontSize: 12,
            fontWeight: 700,
            color: '#334155',
            cursor: 'pointer',
          }}
        >
          {allOpen ? 'Collapse All' : 'Expand All'}
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
        {result.deductions.map((deduction, idx) => (
          <DeductionCard
            key={deduction.label}
            deduction={deduction}
            index={idx}
            isOpen={allOpen || openIdx === idx}
            onToggle={() => {
              setAllOpen(false);
              setOpenIdx(openIdx === idx ? null : idx);
            }}
          />
        ))}
      </div>

      <div
        style={{
          background: '#FFFFFF',
          borderRadius: 10,
          border: '2px solid #E2E8F0',
          padding: '20px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 28,
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div>
          <div style={{ fontWeight: 800, fontSize: 16, color: '#0F172A' }}>Total Estimated Financial Gap</div>
          <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>
            Sum of co-payment, non-admissible expenses, sub-limits, and deductible
          </div>
        </div>
        <div style={{ fontSize: 28, fontWeight: 900, color: '#DC2626' }}>
          {INR(result.financialGap)}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', paddingBottom: 20 }}>
        <Link
          href={`/dashboard/results/${claimId}`}
          style={{
            background: '#2563EB',
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: 14,
            padding: '12px 24px',
            borderRadius: 8,
            textDecoration: 'none',
          }}
        >
          ← Back to Financial Summary
        </Link>
        <Link
          href="/dashboard/insurance"
          style={{
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
          View My Insurance
        </Link>
      </div>
    </div>
  );
}
