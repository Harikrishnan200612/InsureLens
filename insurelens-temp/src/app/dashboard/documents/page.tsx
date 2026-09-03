'use client';

import Link from 'next/link';

interface DocumentItem {
  id: string;
  title: string;
  category: 'Policy' | 'Bill' | 'Cashless' | 'Summary';
  fileName: string;
  size: string;
  uploadDate: string;
  status: 'Parsed' | 'Verified' | 'Pending';
}

const DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-1',
    title: 'HealthShield Optimum Comprehensive Policy',
    category: 'Policy',
    fileName: 'HealthShield_Optimum_Policy_2026.pdf',
    size: '1.8 MB',
    uploadDate: 'Jan 15, 2026',
    status: 'Verified',
  },
  {
    id: 'doc-2',
    title: 'Apollo Hospitals Inpatient Final Invoice',
    category: 'Bill',
    fileName: 'Apollo_Final_Bill_CLM001.pdf',
    size: '840 KB',
    uploadDate: 'Aug 28, 2026',
    status: 'Parsed',
  },
  {
    id: 'doc-3',
    title: 'Pre-Authorization Initial Approval Letter',
    category: 'Cashless',
    fileName: 'Cashless_TPA_Auth_Apollo.pdf',
    size: '420 KB',
    uploadDate: 'Aug 20, 2026',
    status: 'Verified',
  },
  {
    id: 'doc-4',
    title: 'Orthopedic Discharge Summary & OT Notes',
    category: 'Summary',
    fileName: 'Discharge_Summary_KneeReplacement.pdf',
    size: '1.2 MB',
    uploadDate: 'Aug 28, 2026',
    status: 'Parsed',
  },
];

export default function DocumentsPage() {
  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.5px' }}>Documents</h1>
          <p style={{ fontSize: 14, color: '#64748B', marginTop: 4 }}>
            All processed PDFs, hospital receipts, policy clauses, and authorization letters
          </p>
        </div>
        <Link
          href="/dashboard/upload"
          style={{
            background: '#2563EB',
            color: 'white',
            fontWeight: 700,
            fontSize: 14,
            padding: '10px 20px',
            borderRadius: 10,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          Upload New Document
        </Link>
      </div>

      <div style={{ background: 'white', borderRadius: 14, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#F8FAFC' }}>
              {['Document Name', 'Type', 'File Size', 'Uploaded On', 'Status', 'Actions'].map((h) => (
                <th key={h} style={{ padding: '14px 18px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid #E2E8F0' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DOCUMENTS.map((doc, idx) => (
              <tr key={doc.id} style={{ borderBottom: idx < DOCUMENTS.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                <td style={{ padding: '16px 18px' }}>
                  <div style={{ fontWeight: 700, color: '#0F172A' }}>{doc.title}</div>
                  <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>{doc.fileName}</div>
                </td>
                <td style={{ padding: '16px 18px' }}>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: 100,
                    fontSize: 12,
                    fontWeight: 700,
                    background: doc.category === 'Policy' ? '#EFF6FF' : doc.category === 'Bill' ? '#F0FDF4' : '#F5F3FF',
                    color: doc.category === 'Policy' ? '#2563EB' : doc.category === 'Bill' ? '#16A34A' : '#7C3AED',
                  }}>
                    {doc.category}
                  </span>
                </td>
                <td style={{ padding: '16px 18px', color: '#64748B' }}>{doc.size}</td>
                <td style={{ padding: '16px 18px', color: '#64748B' }}>{doc.uploadDate}</td>
                <td style={{ padding: '16px 18px' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                    fontSize: 12,
                    fontWeight: 700,
                    color: doc.status === 'Verified' ? '#16A34A' : '#2563EB',
                  }}>
                    ● {doc.status}
                  </span>
                </td>
                <td style={{ padding: '16px 18px' }}>
                  <button
                    onClick={() => alert(`Viewing extracted text from ${doc.fileName}`)}
                    style={{
                      padding: '6px 12px',
                      background: '#F1F5F9',
                      border: '1px solid #CBD5E1',
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#334155',
                      cursor: 'pointer',
                    }}
                  >
                    View Extracted
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
