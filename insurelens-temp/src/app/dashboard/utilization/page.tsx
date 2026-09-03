'use client';

import { useState, Fragment } from 'react';
import Link from 'next/link';

const INR = (amount: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

const PCT = (val: number) => `${val}%`;

// ── MY UTILIZATION HISTORY ────────────────────────────────────────────────────
interface UtilizationHistoryItem {
  id: string;
  date: string;
  hospital: string;
  treatment: string;
  treatmentKey: string; // joins to ML benchmark
  patient: string;
  claimAmount: number;
  insuranceAmount: number;
  patientAmount: number;
  status: 'Settled' | 'In Progress' | 'Needs Clarification' | 'Rejected';
}

const MY_HISTORY: UtilizationHistoryItem[] = [
  {
    id: 'CLM-2026-001',
    date: '28 Aug 2026',
    hospital: 'ABC Hospital',
    treatment: 'Knee Replacement Surgery',
    treatmentKey: 'knee-replacement',
    patient: 'Hari (Self)',
    claimAmount: 400000,
    insuranceAmount: 320000,
    patientAmount: 80000,
    status: 'Settled',
  },
  {
    id: 'CLM-2026-002',
    date: '15 Jun 2026',
    hospital: 'XYZ Hospital',
    treatment: 'Appendectomy',
    treatmentKey: 'appendectomy',
    patient: 'Ananya (Spouse)',
    claimAmount: 120000,
    insuranceAmount: 100000,
    patientAmount: 20000,
    status: 'Settled',
  },
  {
    id: 'CLM-2025-042',
    date: '14 Nov 2025',
    hospital: 'Fortis Healthcare',
    treatment: 'Gallbladder Removal (Cholecystectomy)',
    treatmentKey: 'cholecystectomy',
    patient: 'Suresh (Father)',
    claimAmount: 85000,
    insuranceAmount: 65000,
    patientAmount: 20000,
    status: 'Settled',
  },
];

// ── ML BENCHMARK DATA ─────────────────────────────────────────────────────────
// Simulated aggregated data from anonymized patient records via ML pipeline.
// Model: Treatment-Similarity Clustering + Insurance-Coverage Regression
// Cohort filter: Same policy tier (₹10L floater), Metro / Tier-1 city hospitals
// Data window: Jan 2024 – Aug 2026, sample size shown per row
interface BenchmarkRow {
  treatmentKey: string;
  treatmentLabel: string;
  icdCode: string;
  sampleSize: number;
  avgClaimAmount: number;
  avgInsuranceAmount: number;
  avgPatientAmount: number;
  avgInsurancePct: number; // % of claim that insurer covered on average
  p25PatientCost: number;  // 25th percentile — patient paid less than this
  p75PatientCost: number;  // 75th percentile — patient paid more than this
  topDeductionReason: string;
  similarPolicyCoverage: 'Better than average' | 'Average' | 'Below average';
}

const ML_BENCHMARKS: BenchmarkRow[] = [
  {
    treatmentKey: 'knee-replacement',
    treatmentLabel: 'Knee Replacement Surgery (TKR)',
    icdCode: 'M17.1 / Z96.6',
    sampleSize: 3842,
    avgClaimAmount: 370000,
    avgInsuranceAmount: 280000,
    avgPatientAmount: 90000,
    avgInsurancePct: 76,
    p25PatientCost: 55000,
    p75PatientCost: 130000,
    topDeductionReason: 'Treatment sub-limit + Co-payment 10%',
    similarPolicyCoverage: 'Better than average',
  },
  {
    treatmentKey: 'appendectomy',
    treatmentLabel: 'Appendectomy (Laparoscopic)',
    icdCode: 'K37 / K35.8',
    sampleSize: 6210,
    avgClaimAmount: 95000,
    avgInsuranceAmount: 76000,
    avgPatientAmount: 19000,
    avgInsurancePct: 80,
    p25PatientCost: 11000,
    p75PatientCost: 30000,
    topDeductionReason: 'Non-admissible expenses (pharmacy + OPD)',
    similarPolicyCoverage: 'Average',
  },
  {
    treatmentKey: 'cholecystectomy',
    treatmentLabel: 'Gallbladder Removal (Cholecystectomy)',
    icdCode: 'K80 / K81',
    sampleSize: 4917,
    avgClaimAmount: 80000,
    avgInsuranceAmount: 58000,
    avgPatientAmount: 22000,
    avgInsurancePct: 73,
    p25PatientCost: 14000,
    p75PatientCost: 36000,
    topDeductionReason: 'Annual deductible + Non-admissible diagnostics',
    similarPolicyCoverage: 'Average',
  },
  {
    treatmentKey: 'angioplasty',
    treatmentLabel: 'Coronary Angioplasty (PTCA + Stent)',
    icdCode: 'I25.1 / Z95.5',
    sampleSize: 2198,
    avgClaimAmount: 420000,
    avgInsuranceAmount: 310000,
    avgPatientAmount: 110000,
    avgInsurancePct: 74,
    p25PatientCost: 70000,
    p75PatientCost: 165000,
    topDeductionReason: 'Stent device cost capped at sub-limit',
    similarPolicyCoverage: 'Better than average',
  },
  {
    treatmentKey: 'cataract',
    treatmentLabel: 'Cataract Surgery (Phacoemulsification)',
    icdCode: 'H26 / H25',
    sampleSize: 9430,
    avgClaimAmount: 32000,
    avgInsuranceAmount: 22000,
    avgPatientAmount: 10000,
    avgInsurancePct: 69,
    p25PatientCost: 5000,
    p75PatientCost: 18000,
    topDeductionReason: 'Per-eye OPD sub-limit + Co-payment',
    similarPolicyCoverage: 'Below average',
  },
  {
    treatmentKey: 'normal-delivery',
    treatmentLabel: 'Normal Delivery (Maternity)',
    icdCode: 'Z37.0 / O80',
    sampleSize: 7812,
    avgClaimAmount: 55000,
    avgInsuranceAmount: 38000,
    avgPatientAmount: 17000,
    avgInsurancePct: 69,
    p25PatientCost: 8000,
    p75PatientCost: 27000,
    topDeductionReason: 'Maternity sub-limit exhaustion',
    similarPolicyCoverage: 'Average',
  },
];

// helper: find benchmark for a claim
function findBenchmark(key: string): BenchmarkRow | undefined {
  return ML_BENCHMARKS.find(b => b.treatmentKey === key);
}

// helper: compare my patient amount vs peer average
function compareVsPeer(myAmt: number, peerAmt: number): { label: string; color: string; bg: string; border: string } {
  const diff = myAmt - peerAmt;
  const pct = Math.round(Math.abs(diff / peerAmt) * 100);
  if (diff <= 0) return { label: `${pct}% below peer avg — Favourable`, color: '#16A34A', bg: '#F0FDF4', border: '#BBF7D0' };
  if (pct <= 15) return { label: `${pct}% above peer avg — Marginal`, color: '#D97706', bg: '#FFFBEB', border: '#FDE68A' };
  return { label: `${pct}% above peer avg — Review Warranted`, color: '#DC2626', bg: '#FEF2F2', border: '#FECACA' };
}

export default function BenefitUtilizationPage() {
  const [activeTab, setActiveTab] = useState<'my-history' | 'ml-benchmark'>('my-history');
  const [expandedClaimId, setExpandedClaimId] = useState<string | null>(null);

  const totalCoverage = 1000000;
  const usedCoverage = 200000;  // ₹2L used across 3 claims
  const remainingCoverage = 800000;
  const usedPercentage = Math.round((usedCoverage / totalCoverage) * 100);
  const remainingPercentage = 100 - usedPercentage;

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 32, borderBottom: '1px solid #E2E8F0', paddingBottom: 20 }}>
        <h1 style={{ fontSize: 26, fontWeight: 900, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Benefit Utilization & ML Benchmarking
        </h1>
        <p style={{ fontSize: 14, color: '#64748B', marginTop: 4 }}>
          Personal claim history enriched with anonymized peer data to reveal whether your insurance contributions are in line with comparable treatment profiles
        </p>
      </div>

      {/* Coverage Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 24 }}>
        <div style={{ background: '#FFFFFF', borderRadius: 12, border: '1px solid #E2E8F0', padding: 22 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 8 }}>
            Total Coverage
          </div>
          <div style={{ fontSize: 30, fontWeight: 900, color: '#0F172A' }}>{INR(totalCoverage)}</div>
          <div style={{ fontSize: 12, color: '#64748B', marginTop: 6 }}>Annual Sum Insured (Floater Policy)</div>
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: 12, border: '1px solid #E2E8F0', padding: 22 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#DC2626', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 8 }}>
            Used Coverage
          </div>
          <div style={{ fontSize: 30, fontWeight: 900, color: '#DC2626' }}>{INR(usedCoverage)}</div>
          <div style={{ fontSize: 12, color: '#64748B', marginTop: 6 }}>{usedPercentage}% of annual sum insured claimed</div>
        </div>

        <div style={{ background: '#F0FDF4', borderRadius: 12, border: '2px solid #86EFAC', padding: 22 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#16A34A', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 8 }}>
            Remaining Coverage
          </div>
          <div style={{ fontSize: 30, fontWeight: 900, color: '#16A34A' }}>{INR(remainingCoverage)}</div>
          <div style={{ fontSize: 12, color: '#16A34A', marginTop: 6 }}>{remainingPercentage}% active balance available</div>
        </div>

        <div style={{ background: '#EFF6FF', borderRadius: 12, border: '1px solid #BFDBFE', padding: 22 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 8 }}>
            ML Peer Sample
          </div>
          <div style={{ fontSize: 30, fontWeight: 900, color: '#2563EB' }}>32,409</div>
          <div style={{ fontSize: 12, color: '#3B82F6', marginTop: 6 }}>Anonymized patient records indexed</div>
        </div>
      </div>

      {/* Coverage Bar */}
      <div style={{ background: '#FFFFFF', borderRadius: 12, border: '1px solid #E2E8F0', padding: 22, marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', textTransform: 'uppercase' }}>Coverage Balance</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#475569' }}>{usedPercentage}% Used · {remainingPercentage}% Available</span>
        </div>
        <div style={{ height: 14, background: '#F1F5F9', borderRadius: 6, overflow: 'hidden', display: 'flex', marginBottom: 10 }}>
          <div style={{ width: `${usedPercentage}%`, background: '#DC2626' }} />
          <div style={{ width: `${remainingPercentage}%`, background: '#16A34A' }} />
        </div>
        <div style={{ display: 'flex', gap: 24, fontSize: 12, color: '#64748B' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{ width: 9, height: 9, borderRadius: 2, background: '#DC2626' }} />
            <span>Used: {INR(usedCoverage)}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{ width: 9, height: 9, borderRadius: 2, background: '#16A34A' }} />
            <span>Remaining: {INR(remainingCoverage)}</span>
          </div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div style={{ display: 'flex', gap: 0, borderRadius: 8, overflow: 'hidden', border: '1px solid #E2E8F0', marginBottom: 24, width: 'fit-content' }}>
        {([
          { id: 'my-history', label: 'My Utilization History' },
          { id: 'ml-benchmark', label: 'ML Peer Benchmark Comparison' },
        ] as const).map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '11px 22px',
              fontSize: 13,
              fontWeight: 800,
              border: 'none',
              cursor: 'pointer',
              background: activeTab === tab.id ? '#0F172A' : '#F8FAFC',
              color: activeTab === tab.id ? '#FFFFFF' : '#475569',
              transition: 'background 0.15s, color 0.15s',
            }}
          >
            {tab.label}
            {tab.id === 'ml-benchmark' && (
              <span style={{
                marginLeft: 8,
                fontSize: 10,
                fontWeight: 900,
                background: '#2563EB',
                color: '#FFFFFF',
                padding: '2px 6px',
                borderRadius: 4,
                textTransform: 'uppercase',
              }}>
                ML
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── TAB 1: MY UTILIZATION HISTORY ──────────────────────────────────── */}
      {activeTab === 'my-history' && (
        <div>
          <div style={{ background: '#FFFFFF', borderRadius: 12, border: '1px solid #E2E8F0', padding: 24, marginBottom: 24 }}>
            <div style={{ marginBottom: 18 }}>
              <h2 style={{ fontSize: 17, fontWeight: 900, color: '#0F172A', textTransform: 'uppercase' }}>
                Personal Claim Ledger
              </h2>
              <p style={{ fontSize: 13, color: '#64748B', marginTop: 3 }}>
                All submitted claims with treatment procedure, patient, and financial split. Click any row to see ML benchmark comparison.
              </p>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#F8FAFC' }}>
                    {['Date', 'Hospital', 'Treatment', 'Patient', 'Claim Amount', 'Insurance Paid', 'You Paid', 'Coverage %', 'vs Peer Avg', 'Status'].map((h) => (
                      <th key={h} style={{
                        padding: '11px 13px', textAlign: 'left', fontSize: 10, fontWeight: 800,
                        color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px',
                        borderBottom: '2px solid #E2E8F0', whiteSpace: 'nowrap',
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MY_HISTORY.map((item, idx) => {
                    const bench = findBenchmark(item.treatmentKey);
                    const myCovPct = Math.round((item.insuranceAmount / item.claimAmount) * 100);
                    const compare = bench ? compareVsPeer(item.patientAmount, bench.avgPatientAmount) : null;
                    const isExpanded = expandedClaimId === item.id;

                    return (
                      <Fragment key={item.id}>
                        <tr
                          onClick={() => setExpandedClaimId(isExpanded ? null : item.id)}
                          style={{
                            borderBottom: '1px solid #F1F5F9',
                            cursor: 'pointer',
                            background: isExpanded ? '#F8FAFC' : 'transparent',
                          }}
                        >
                          <td style={{ padding: '13px 13px', color: '#64748B', whiteSpace: 'nowrap' }}>{item.date}</td>
                          <td style={{ padding: '13px 13px', fontWeight: 700, color: '#0F172A' }}>{item.hospital}</td>
                          <td style={{ padding: '13px 13px', fontWeight: 800, color: '#2563EB' }}>{item.treatment}</td>
                          <td style={{ padding: '13px 13px', color: '#0F172A', whiteSpace: 'nowrap' }}>{item.patient}</td>
                          <td style={{ padding: '13px 13px', fontWeight: 800, color: '#0F172A', whiteSpace: 'nowrap' }}>{INR(item.claimAmount)}</td>
                          <td style={{ padding: '13px 13px', fontWeight: 800, color: '#16A34A', whiteSpace: 'nowrap' }}>{INR(item.insuranceAmount)}</td>
                          <td style={{ padding: '13px 13px', fontWeight: 800, color: '#DC2626', whiteSpace: 'nowrap' }}>{INR(item.patientAmount)}</td>
                          <td style={{ padding: '13px 13px', fontWeight: 800, color: myCovPct >= 80 ? '#16A34A' : myCovPct >= 70 ? '#D97706' : '#DC2626' }}>
                            {PCT(myCovPct)}
                          </td>
                          <td style={{ padding: '13px 13px', whiteSpace: 'nowrap' }}>
                            {compare ? (
                              <span style={{
                                fontSize: 11, fontWeight: 800, padding: '3px 8px',
                                borderRadius: 4, background: compare.bg, color: compare.color,
                                border: `1px solid ${compare.border}`,
                              }}>
                                {compare.label}
                              </span>
                            ) : (
                              <span style={{ fontSize: 11, color: '#94A3B8' }}>No peer data</span>
                            )}
                          </td>
                          <td style={{ padding: '13px 13px', whiteSpace: 'nowrap' }}>
                            <span style={{
                              padding: '3px 8px', borderRadius: 4, fontSize: 11, fontWeight: 800,
                              textTransform: 'uppercase',
                              background: item.status === 'Settled' ? '#F0FDF4' : '#EFF6FF',
                              color: item.status === 'Settled' ? '#16A34A' : '#2563EB',
                              border: item.status === 'Settled' ? '1px solid #BBF7D0' : '1px solid #BFDBFE',
                            }}>
                              {item.status}
                            </span>
                          </td>
                        </tr>

                        {/* Expandable ML Detail Row */}
                        {isExpanded && bench && (
                          <tr>
                            <td colSpan={10} style={{ padding: 0, background: '#F0F9FF', borderBottom: '2px solid #BFDBFE' }}>
                              <div style={{ padding: '20px 24px' }}>
                                <div style={{ fontSize: 12, fontWeight: 800, color: '#1D4ED8', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 12 }}>
                                  ML Peer Benchmark — {bench.treatmentLabel} · {bench.sampleSize.toLocaleString('en-IN')} similar cases · ICD: {bench.icdCode}
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
                                  {[
                                    { label: 'Peer Avg Claim Amount', mine: INR(item.claimAmount), peer: INR(bench.avgClaimAmount), neutral: true },
                                    { label: 'Peer Avg Insurance Paid', mine: INR(item.insuranceAmount), peer: INR(bench.avgInsuranceAmount), neutral: false },
                                    { label: 'Peer Avg Patient Cost', mine: INR(item.patientAmount), peer: INR(bench.avgPatientAmount), neutral: false },
                                    { label: 'Peer Avg Coverage %', mine: PCT(Math.round((item.insuranceAmount / item.claimAmount) * 100)), peer: PCT(bench.avgInsurancePct), neutral: false },
                                    { label: 'Peer P25 Patient Cost', mine: '—', peer: INR(bench.p25PatientCost), neutral: true },
                                    { label: 'Peer P75 Patient Cost', mine: '—', peer: INR(bench.p75PatientCost), neutral: true },
                                  ].map(col => (
                                    <div key={col.label} style={{ background: '#FFFFFF', borderRadius: 8, padding: '14px 16px', border: '1px solid #BFDBFE' }}>
                                      <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>{col.label}</div>
                                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                                        {col.mine !== '—' && (
                                          <div>
                                            <div style={{ fontSize: 10, color: '#2563EB', fontWeight: 700, marginBottom: 2 }}>YOURS</div>
                                            <div style={{ fontSize: 16, fontWeight: 900, color: '#0F172A' }}>{col.mine}</div>
                                          </div>
                                        )}
                                        <div>
                                          <div style={{ fontSize: 10, color: '#64748B', fontWeight: 700, marginBottom: 2 }}>PEER AVG</div>
                                          <div style={{ fontSize: 16, fontWeight: 900, color: '#475569' }}>{col.peer}</div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                <div style={{ marginTop: 14, padding: '10px 14px', background: '#DBEAFE', borderRadius: 6, fontSize: 12, color: '#1E40AF', fontWeight: 600 }}>
                                  Top Peer Deduction Reason: <strong>{bench.topDeductionReason}</strong>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 12, fontSize: 12, color: '#94A3B8' }}>
              Click any row to expand ML peer benchmark comparison for that treatment.
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: ML BENCHMARK COMPARISON ─────────────────────────────────── */}
      {activeTab === 'ml-benchmark' && (
        <div>
          {/* Model info banner */}
          <div style={{
            background: '#EFF6FF', border: '1px solid #BFDBFE', borderLeft: '4px solid #2563EB',
            borderRadius: 8, padding: '16px 20px', marginBottom: 24,
          }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#1D4ED8', marginBottom: 4 }}>
              ML Benchmark Model Information
            </div>
            <div style={{ fontSize: 13, color: '#1E40AF', lineHeight: 1.6 }}>
              Data source: Anonymized, de-identified health insurance claims from 32,409 patient records across India (Tier-1 & Tier-2 cities).
              Cohort filter: ₹10L floater policy tier. Clustering algorithm: Treatment-ICD Similarity + Age-Band Bucketing.
              Coverage regression: Linear model trained on ICD code, hospital tier, patient age group, and policy type.
              All patient identifiers are removed before comparison. No individual data is shared externally.
            </div>
          </div>

          {/* Full Benchmark Table */}
          <div style={{ background: '#FFFFFF', borderRadius: 12, border: '1px solid #E2E8F0', padding: 24, marginBottom: 24 }}>
            <div style={{ marginBottom: 18 }}>
              <h2 style={{ fontSize: 17, fontWeight: 900, color: '#0F172A', textTransform: 'uppercase' }}>
                Treatment-Wise Peer Benchmark
              </h2>
              <p style={{ fontSize: 13, color: '#64748B', marginTop: 3 }}>
                Each row shows what similar patients with comparable ₹10L floater policies paid across the same treatment categories.
                Rows highlighted in blue match your own claim history.
              </p>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#F8FAFC' }}>
                    {['Treatment', 'ICD Code', 'Sample Size', 'Peer Avg Claim', 'Peer Avg Insurer Paid', 'Peer Avg Patient Cost', 'Avg Coverage %', 'Patient Cost P25–P75 Range', 'Top Deduction Reason', 'Your Policy'].map((h) => (
                      <th key={h} style={{
                        padding: '11px 14px', textAlign: 'left', fontSize: 10, fontWeight: 800,
                        color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px',
                        borderBottom: '2px solid #E2E8F0', whiteSpace: 'nowrap',
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ML_BENCHMARKS.map((b, idx) => {
                    const myRecord = MY_HISTORY.find(h => h.treatmentKey === b.treatmentKey);
                    const isMyTreatment = !!myRecord;

                    return (
                      <tr
                        key={b.treatmentKey}
                        style={{
                          borderBottom: idx < ML_BENCHMARKS.length - 1 ? '1px solid #F1F5F9' : 'none',
                          background: isMyTreatment ? '#F0F9FF' : 'transparent',
                        }}
                      >
                        <td style={{ padding: '14px 14px' }}>
                          <div style={{ fontWeight: 800, color: '#0F172A', fontSize: 13 }}>{b.treatmentLabel}</div>
                          {isMyTreatment && (
                            <div style={{ fontSize: 10, fontWeight: 800, color: '#2563EB', marginTop: 3, textTransform: 'uppercase' }}>
                              Your Claim
                            </div>
                          )}
                        </td>
                        <td style={{ padding: '14px 14px', color: '#64748B', fontFamily: 'monospace', fontSize: 12, whiteSpace: 'nowrap' }}>{b.icdCode}</td>
                        <td style={{ padding: '14px 14px', fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap' }}>
                          {b.sampleSize.toLocaleString('en-IN')} cases
                        </td>
                        <td style={{ padding: '14px 14px', whiteSpace: 'nowrap' }}>
                          <div style={{ fontWeight: 800, color: '#0F172A' }}>{INR(b.avgClaimAmount)}</div>
                          {isMyTreatment && myRecord && (
                            <div style={{ fontSize: 11, color: '#2563EB', fontWeight: 700 }}>Yours: {INR(myRecord.claimAmount)}</div>
                          )}
                        </td>
                        <td style={{ padding: '14px 14px', whiteSpace: 'nowrap' }}>
                          <div style={{ fontWeight: 800, color: '#16A34A' }}>{INR(b.avgInsuranceAmount)}</div>
                          {isMyTreatment && myRecord && (
                            <div style={{ fontSize: 11, color: '#2563EB', fontWeight: 700 }}>Yours: {INR(myRecord.insuranceAmount)}</div>
                          )}
                        </td>
                        <td style={{ padding: '14px 14px', whiteSpace: 'nowrap' }}>
                          <div style={{ fontWeight: 800, color: '#DC2626' }}>{INR(b.avgPatientAmount)}</div>
                          {isMyTreatment && myRecord && (
                            <div style={{ fontSize: 11, color: '#2563EB', fontWeight: 700 }}>Yours: {INR(myRecord.patientAmount)}</div>
                          )}
                        </td>
                        <td style={{ padding: '14px 14px', whiteSpace: 'nowrap' }}>
                          <div style={{ fontWeight: 900, color: b.avgInsurancePct >= 80 ? '#16A34A' : b.avgInsurancePct >= 70 ? '#D97706' : '#DC2626' }}>
                            {PCT(b.avgInsurancePct)}
                          </div>
                        </td>
                        <td style={{ padding: '14px 14px', whiteSpace: 'nowrap', fontSize: 12 }}>
                          <span style={{ color: '#16A34A', fontWeight: 700 }}>{INR(b.p25PatientCost)}</span>
                          <span style={{ color: '#94A3B8', margin: '0 4px' }}>→</span>
                          <span style={{ color: '#DC2626', fontWeight: 700 }}>{INR(b.p75PatientCost)}</span>
                        </td>
                        <td style={{ padding: '14px 14px', fontSize: 12, color: '#475569', minWidth: 200 }}>{b.topDeductionReason}</td>
                        <td style={{ padding: '14px 14px', whiteSpace: 'nowrap' }}>
                          <span style={{
                            fontSize: 11, fontWeight: 800, padding: '4px 8px', borderRadius: 4,
                            background: b.similarPolicyCoverage === 'Better than average' ? '#F0FDF4'
                              : b.similarPolicyCoverage === 'Average' ? '#FFFBEB' : '#FEF2F2',
                            color: b.similarPolicyCoverage === 'Better than average' ? '#16A34A'
                              : b.similarPolicyCoverage === 'Average' ? '#D97706' : '#DC2626',
                            border: b.similarPolicyCoverage === 'Better than average' ? '1px solid #BBF7D0'
                              : b.similarPolicyCoverage === 'Average' ? '1px solid #FDE68A' : '1px solid #FECACA',
                          }}>
                            {b.similarPolicyCoverage}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* ML Insight Summary for user's claims */}
          <div style={{ background: '#FFFFFF', borderRadius: 12, border: '1px solid #E2E8F0', padding: 24, marginBottom: 24 }}>
            <h2 style={{ fontSize: 17, fontWeight: 900, color: '#0F172A', textTransform: 'uppercase', marginBottom: 16 }}>
              Your Claims vs Peer Average — Insight Summary
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {MY_HISTORY.map(item => {
                const bench = findBenchmark(item.treatmentKey);
                if (!bench) return null;
                const compare = compareVsPeer(item.patientAmount, bench.avgPatientAmount);
                const myCovPct = Math.round((item.insuranceAmount / item.claimAmount) * 100);
                const peerCovPct = bench.avgInsurancePct;
                const covDiff = myCovPct - peerCovPct;

                return (
                  <div key={item.id} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 20, padding: '16px 20px',
                    borderRadius: 8, border: '1px solid #E2E8F0', flexWrap: 'wrap',
                  }}>
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <div style={{ fontWeight: 800, color: '#0F172A', fontSize: 14 }}>{item.treatment}</div>
                      <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>{item.patient} · {item.date}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: 10, color: '#94A3B8', fontWeight: 700, marginBottom: 3 }}>YOU PAID</div>
                        <div style={{ fontWeight: 900, color: '#DC2626' }}>{INR(item.patientAmount)}</div>
                        <div style={{ fontSize: 11, color: '#64748B' }}>Peer avg: {INR(bench.avgPatientAmount)}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, color: '#94A3B8', fontWeight: 700, marginBottom: 3 }}>YOUR COVERAGE %</div>
                        <div style={{ fontWeight: 900, color: '#0F172A' }}>{PCT(myCovPct)}</div>
                        <div style={{ fontSize: 11, color: '#64748B' }}>Peer avg: {PCT(peerCovPct)}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, color: '#94A3B8', fontWeight: 700, marginBottom: 3 }}>COVERAGE VS PEERS</div>
                        <div style={{ fontWeight: 900, color: covDiff >= 0 ? '#16A34A' : '#DC2626' }}>
                          {covDiff >= 0 ? `+${covDiff}%` : `${covDiff}%`}
                        </div>
                        <div style={{ fontSize: 11, color: '#64748B' }}>{covDiff >= 0 ? 'Better coverage' : 'Lower coverage'}</div>
                      </div>
                      <span style={{
                        fontSize: 11, fontWeight: 800, padding: '5px 10px', borderRadius: 4,
                        background: compare.bg, color: compare.color, border: `1px solid ${compare.border}`,
                        whiteSpace: 'nowrap',
                      }}>
                        {compare.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ML Disclaimer */}
          <div style={{
            background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 8,
            padding: '14px 18px', fontSize: 12, color: '#64748B', lineHeight: 1.6, marginBottom: 24,
          }}>
            <strong style={{ color: '#0F172A' }}>ML Data Notice: </strong>
            Benchmark data is derived from anonymized and aggregated insurance claims. Individual patient identities are never exposed.
            Comparisons are indicative only — policy terms, hospital tier, city, age band, and network status affect actual outcomes.
            This is not a guarantee of claim approval or reimbursement amount.
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: 14 }}>
        <Link href="/dashboard/insurance" style={{
          background: '#0F172A', color: '#FFFFFF', fontWeight: 700, fontSize: 14,
          padding: '12px 24px', borderRadius: 8, textDecoration: 'none',
        }}>
          My Insurance
        </Link>
        <Link href="/dashboard/upload" style={{
          background: '#2563EB', color: '#FFFFFF', fontWeight: 700, fontSize: 14,
          padding: '12px 24px', borderRadius: 8, textDecoration: 'none',
        }}>
          New Claim Analysis
        </Link>
        <Link href="/dashboard/claims" style={{
          background: '#FFFFFF', color: '#0F172A', fontWeight: 700, fontSize: 14,
          padding: '12px 24px', borderRadius: 8, textDecoration: 'none',
          border: '1px solid #CBD5E1',
        }}>
          Claims History
        </Link>
      </div>
    </div>
  );
}
