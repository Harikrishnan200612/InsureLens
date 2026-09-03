'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DEFAULT_FAMILY_MEMBERS } from '@/lib/premiumService';
import { FamilyMember } from '@/types';

interface UploadFileState {
  name: string;
  size: string;
  format: string;
}

export default function NewClaimAnalysisPage() {
  const router = useRouter();

  // Document upload states
  const [policyFile, setPolicyFile] = useState<UploadFileState | null>(null);
  const [billFile, setBillFile] = useState<UploadFileState | null>(null);
  const [cashlessFile, setCashlessFile] = useState<UploadFileState | null>(null);

  // Patient / Family member selection
  const [selectedMemberId, setSelectedMemberId] = useState<string>('fam-1');

  // Treatment and hospital details
  const [treatmentName, setTreatmentName] = useState('Knee Replacement Surgery');
  const [hospitalName, setHospitalName] = useState('Apollo Hospitals');
  const [billAmount, setBillAmount] = useState('400000');

  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedMember: FamilyMember =
    DEFAULT_FAMILY_MEMBERS.find((m) => m.id === selectedMemberId) || DEFAULT_FAMILY_MEMBERS[0];

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (val: UploadFileState | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate allowed formats
    const allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png', 'txt'];
    const ext = file.name.split('.').pop()?.toLowerCase() || '';

    if (!allowedExtensions.includes(ext)) {
      setError(`Unsupported file format (.${ext}). Accepted formats: PDF, JPG, JPEG, PNG, TXT.`);
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setError('File exceeds 15MB limit. Please upload a smaller file.');
      return;
    }

    setError(null);
    setter({
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      format: ext.toUpperCase(),
    });
  };

  const handleStartAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!treatmentName.trim()) {
      setError('Treatment name is mandatory. Please specify the treatment procedure.');
      return;
    }

    if (!hospitalName.trim()) {
      setError('Hospital name is mandatory.');
      return;
    }

    setAnalyzing(true);

    // Save claim analysis input params to sessionStorage for the results view
    try {
      sessionStorage.setItem(
        'current_claim_patient',
        JSON.stringify({
          memberId: selectedMember.id,
          name: selectedMember.name,
          relationship: selectedMember.relationship,
          age: selectedMember.age,
          treatment: treatmentName.trim(),
          hospital: hospitalName.trim(),
          billAmount: Number(billAmount) || 400000,
        })
      );
    } catch {}

    setTimeout(() => {
      router.push('/dashboard/analysis/active-claim');
    }, 400);
  };

  return (
    <div style={{ maxWidth: 840, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 32, borderBottom: '1px solid #E2E8F0', paddingBottom: 20 }}>
        <h1 style={{ fontSize: 24, fontWeight: 900, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          New Claim Financial Analysis
        </h1>
        <p style={{ fontSize: 14, color: '#64748B', marginTop: 4 }}>
          Upload your insurance policy and hospital documentation to identify coverage rules and calculate estimated out-of-pocket patient responsibility
        </p>
      </div>

      {error && (
        <div
          style={{
            background: '#FEF2F2',
            border: '1px solid #FECACA',
            color: '#DC2626',
            padding: '14px 18px',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 700,
            marginBottom: 24,
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleStartAnalysis} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {/* STEP 1: Select Patient / Family Member */}
        <div style={{ background: '#FFFFFF', borderRadius: 12, border: '1px solid #E2E8F0', padding: 28 }}>
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Step 01
            </span>
            <h2 style={{ fontSize: 16, fontWeight: 900, color: '#0F172A', textTransform: 'uppercase', marginTop: 2 }}>
              Who is receiving the treatment?
            </h2>
            <p style={{ fontSize: 13, color: '#64748B' }}>
              Select the insured family member associated with this hospital treatment:
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
            {DEFAULT_FAMILY_MEMBERS.map((m) => {
              const isSelected = selectedMemberId === m.id;
              return (
                <div
                  key={m.id}
                  onClick={() => setSelectedMemberId(m.id)}
                  style={{
                    border: isSelected ? '2px solid #2563EB' : '1px solid #CBD5E1',
                    background: isSelected ? '#EFF6FF' : '#FFFFFF',
                    borderRadius: 8,
                    padding: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <input
                      type="radio"
                      name="patientSelection"
                      checked={isSelected}
                      onChange={() => setSelectedMemberId(m.id)}
                    />
                    <span style={{ fontWeight: 800, fontSize: 14, color: isSelected ? '#1E40AF' : '#0F172A' }}>
                      {m.relationship}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: '#475569', marginLeft: 22 }}>
                    {m.name} · Age {m.age}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* STEP 2: Document Uploads (Multiple formats supported: PDF, JPG, JPEG, PNG, TXT) */}
        <div style={{ background: '#FFFFFF', borderRadius: 12, border: '1px solid #E2E8F0', padding: 28 }}>
          <div style={{ marginBottom: 18 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Step 02
            </span>
            <h2 style={{ fontSize: 16, fontWeight: 900, color: '#0F172A', textTransform: 'uppercase', marginTop: 2 }}>
              Upload Policy & Medical Invoices
            </h2>
            <p style={{ fontSize: 13, color: '#64748B' }}>
              Supports different policy templates & formats: PDF, JPG, JPEG, PNG, or text-based documents.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* 1. Policy Document */}
            <div style={{ border: '1px solid #CBD5E1', borderRadius: 8, padding: '16px 20px', background: '#F8FAFC' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 14, color: '#0F172A' }}>
                    1. Health Insurance Policy Document *
                  </div>
                  <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>
                    {policyFile ? `${policyFile.name} (${policyFile.format}, ${policyFile.size})` : 'PDF, JPG, PNG, or TXT format accepted (Max 15MB)'}
                  </div>
                </div>
                <label
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    padding: '8px 16px',
                    borderRadius: 6,
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#0F172A',
                    cursor: 'pointer',
                  }}
                >
                  {policyFile ? 'Replace Document' : 'Browse File'}
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.txt"
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileChange(e, setPolicyFile)}
                  />
                </label>
              </div>
            </div>

            {/* 2. Hospital Bill */}
            <div style={{ border: '1px solid #CBD5E1', borderRadius: 8, padding: '16px 20px', background: '#F8FAFC' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 14, color: '#0F172A' }}>
                    2. Hospital Bill / Inpatient Invoice *
                  </div>
                  <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>
                    {billFile ? `${billFile.name} (${billFile.format}, ${billFile.size})` : 'Final hospital invoice or estimate (PDF, JPG, PNG, TXT)'}
                  </div>
                </div>
                <label
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    padding: '8px 16px',
                    borderRadius: 6,
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#0F172A',
                    cursor: 'pointer',
                  }}
                >
                  {billFile ? 'Replace Document' : 'Browse File'}
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.txt"
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileChange(e, setBillFile)}
                  />
                </label>
              </div>
            </div>

            {/* 3. Cashless Authorization (Optional) */}
            <div style={{ border: '1px solid #E2E8F0', borderRadius: 8, padding: '16px 20px', background: '#FFFFFF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 14, color: '#475569' }}>
                    3. Cashless Approval / TPA Pre-Authorization (Optional)
                  </div>
                  <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>
                    {cashlessFile ? `${cashlessFile.name} (${cashlessFile.format}, ${cashlessFile.size})` : 'Upload if initial authorization letter is already issued'}
                  </div>
                </div>
                <label
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    padding: '8px 16px',
                    borderRadius: 6,
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#475569',
                    cursor: 'pointer',
                  }}
                >
                  {cashlessFile ? 'Replace Document' : 'Browse File'}
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.txt"
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileChange(e, setCashlessFile)}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 3: Mandatory Treatment & Hospital Details */}
        <div style={{ background: '#FFFFFF', borderRadius: 12, border: '1px solid #E2E8F0', padding: 28 }}>
          <div style={{ marginBottom: 18 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Step 03
            </span>
            <h2 style={{ fontSize: 16, fontWeight: 900, color: '#0F172A', textTransform: 'uppercase', marginTop: 2 }}>
              Treatment & Billing Information
            </h2>
            <p style={{ fontSize: 13, color: '#64748B' }}>
              Treatment name is mandatory to evaluate procedure sub-limits, exclusions, and room rent caps
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>
                Treatment Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Knee Replacement Surgery"
                value={treatmentName}
                onChange={(e) => setTreatmentName(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '11px 13px',
                  border: '1px solid #CBD5E1',
                  borderRadius: 6,
                  fontSize: 14,
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>
                Hospital Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Apollo Hospitals"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '11px 13px',
                  border: '1px solid #CBD5E1',
                  borderRadius: 6,
                  fontSize: 14,
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>
                Total Bill Amount (INR) *
              </label>
              <input
                type="number"
                placeholder="e.g. 400000"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '11px 13px',
                  border: '1px solid #CBD5E1',
                  borderRadius: 6,
                  fontSize: 14,
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button
            type="submit"
            disabled={analyzing}
            style={{
              background: '#2563EB',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 8,
              padding: '16px 32px',
              fontSize: 15,
              fontWeight: 800,
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              transition: 'background 0.15s',
            }}
          >
            {analyzing ? 'Processing Claim Analysis...' : 'Analyze Insurance & Calculate Responsibility →'}
          </button>

          <p style={{ fontSize: 12, color: '#64748B', textAlign: 'center', lineHeight: 1.6 }}>
            Notice: All estimates are illustrative calculations based on extracted rules. Final claim settlement depends on policy terms and insurer/TPA authorization.
          </p>
        </div>
      </form>
    </div>
  );
}
