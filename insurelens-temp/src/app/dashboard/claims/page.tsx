'use client';

import Link from 'next/link';

const INR = (amount: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

interface ClaimHistoryRow {
  id: string;
  patient: string;
  relationship: string;
  age: number;
  hospital: string;
  treatment: string;
  billAmount: number;
  insuranceContribution: number;
  patientContribution: number;
  status: 'In Progress' | 'Settled' | 'Needs Clarification' | 'Rejected';
  date: string;
}

const CLAIMS: ClaimHistoryRow[] = [
  {
    id: 'CLM-2026-001',
    patient: 'Jack',
    relationship: 'Self',
    age: 28,
    hospital: 'ABC Hospital',
    treatment: 'Knee Replacement Surgery',
    billAmount: 400000,
    insuranceContribution: 320000,
    patientContribution: 80000,
    status: 'In Progress',
    date: '28 Aug 2026',
  },
  {
    id: 'CLM-2026-002',
    patient: 'Ananya',
    relationship: 'Spouse',
    age: 26,
    hospital: 'XYZ Hospital',
    treatment: 'Appendectomy',
    billAmount: 120000,
    insuranceContribution: 100000,
    patientContribution: 20000,
    status: 'Settled',
    date: '15 Jun 2026',
  },
  {
    id: 'CLM-2025-042',
    patient: 'Suresh',
    relationship: 'Parent',
    age: 58,
    hospital: 'Fortis Healthcare',
    treatment: 'Gallbladder Removal (Cholecystectomy)',
    billAmount: 85000,
    insuranceContribution: 65000,
    patientContribution: 20000,
    status: 'Settled',
    date: '14 Nov 2025',
  },
];

export default function ClaimsHistoryPage() {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Claims History
          </h1>
          <p style={{ fontSize: 14, color: '#64748B', marginTop: 4 }}>
            Detailed records of inpatient hospital claims with patient relationship, treatment name, and financial splits
          </p>
        </div>

        <Link
          href="/dashboard/upload"
          style={{
            background: '#2563EB',
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: 13,
            padding: '10px 20px',
            borderRadius: 8,
            textDecoration: 'none',
          }}
        >
          New Claim Analysis
        </Link>
      </div>

      <div style={{ background: '#FFFFFF', borderRadius: 12, border: '1px solid #E2E8F0', padding: 24 }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#F8FAFC' }}>
                {['Claim ID', 'Patient', 'Relationship', 'Age', 'Hospital', 'Treatment', 'Bill Amount', 'Insurance Contribution', 'Patient Contribution', 'Status', 'Date'].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: '12px 14px',
                      textAlign: 'left',
                      fontSize: 11,
                      fontWeight: 800,
                      color: '#475569',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      borderBottom: '2px solid #E2E8F0',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CLAIMS.map((c, idx) => (
                <tr key={c.id} style={{ borderBottom: idx < CLAIMS.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                  <td style={{ padding: '14px 14px', fontWeight: 800, color: '#0F172A', whiteSpace: 'nowrap' }}>{c.id}</td>
                  <td style={{ padding: '14px 14px', fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap' }}>{c.patient}</td>
                  <td style={{ padding: '14px 14px', color: '#475569', whiteSpace: 'nowrap' }}>{c.relationship}</td>
                  <td style={{ padding: '14px 14px', color: '#475569', whiteSpace: 'nowrap' }}>{c.age} yrs</td>
                  <td style={{ padding: '14px 14px', color: '#0F172A', whiteSpace: 'nowrap' }}>{c.hospital}</td>
                  <td style={{ padding: '14px 14px', fontWeight: 700, color: '#2563EB', whiteSpace: 'nowrap' }}>{c.treatment}</td>
                  <td style={{ padding: '14px 14px', fontWeight: 800, color: '#0F172A', whiteSpace: 'nowrap' }}>{INR(c.billAmount)}</td>
                  <td style={{ padding: '14px 14px', fontWeight: 800, color: '#16A34A', whiteSpace: 'nowrap' }}>{INR(c.insuranceContribution)}</td>
                  <td style={{ padding: '14px 14px', fontWeight: 800, color: '#DC2626', whiteSpace: 'nowrap' }}>{INR(c.patientContribution)}</td>
                  <td style={{ padding: '14px 14px', whiteSpace: 'nowrap' }}>
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: 4,
                        fontSize: 11,
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        background: c.status === 'Settled' ? '#F0FDF4' : '#EFF6FF',
                        color: c.status === 'Settled' ? '#16A34A' : '#2563EB',
                        border: c.status === 'Settled' ? '1px solid #BBF7D0' : '1px solid #BFDBFE',
                      }}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 14px', color: '#64748B', whiteSpace: 'nowrap' }}>{c.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
