'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

const ANALYSIS_STEPS = [
  { id: 'upload', label: 'Documents uploaded', detail: 'Policy, hospital bill, and treatment details recorded', durationMs: 400 },
  { id: 'extract', label: 'Extracting text from documents', detail: 'Parsing text and scanned policy content...', durationMs: 800 },
  { id: 'policy', label: 'Understanding policy coverage', detail: 'Identifying rules, limits, and deductible clauses...', durationMs: 1000 },
  { id: 'bill', label: 'Analyzing hospital bill & treatment', detail: 'Extracting line items and procedure classification...', durationMs: 900 },
  { id: 'match', label: 'Matching treatment with policy rules', detail: 'Evaluating procedure sub-limits & co-payment terms...', durationMs: 800 },
  { id: 'history', label: 'Checking previous utilization', detail: 'Calculating available sum insured balance...', durationMs: 600 },
  { id: 'calculate', label: 'Applying deterministic financial rules', detail: 'Executing financial engine (co-pay, deductibles, caps)...', durationMs: 700 },
  { id: 'explain', label: 'Generating deduction explanations', detail: 'Preparing policy clause citations for financial gap...', durationMs: 500 },
];

type StepStatus = 'pending' | 'processing' | 'done' | 'error';

interface Step {
  id: string;
  label: string;
  detail: string;
  durationMs: number;
  status: StepStatus;
}

export default function AnalysisPage() {
  const router = useRouter();
  const params = useParams();
  const claimId = (params?.id as string) || 'active-claim';

  const [steps, setSteps] = useState<Step[]>(
    ANALYSIS_STEPS.map((s) => ({ ...s, status: 'pending' as StepStatus }))
  );
  const [done, setDone] = useState(false);

  useEffect(() => {
    let stepIdx = 0;
    let mounted = true;

    const processStep = () => {
      if (!mounted || stepIdx >= ANALYSIS_STEPS.length) {
        if (mounted) {
          setDone(true);
          setTimeout(() => {
            if (mounted) router.push(`/dashboard/results/${claimId}`);
          }, 600);
        }
        return;
      }

      setSteps((prev) =>
        prev.map((s, i) => ({
          ...s,
          status: i < stepIdx ? 'done' : i === stepIdx ? 'processing' : 'pending',
        }))
      );

      setTimeout(() => {
        if (!mounted) return;
        setSteps((prev) =>
          prev.map((s, i) => ({
            ...s,
            status: i <= stepIdx ? 'done' : 'pending',
          }))
        );
        stepIdx++;
        processStep();
      }, ANALYSIS_STEPS[stepIdx].durationMs);
    };

    const timer = setTimeout(processStep, 200);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [claimId, router]);

  const progress = Math.round((steps.filter((s) => s.status === 'done').length / steps.length) * 100);

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', paddingTop: 20 }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <div
          style={{
            display: 'inline-block',
            padding: '6px 14px',
            borderRadius: 100,
            fontSize: 12,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            background: done ? '#F0FDF4' : '#EFF6FF',
            color: done ? '#16A34A' : '#2563EB',
            border: done ? '1px solid #BBF7D0' : '1px solid #BFDBFE',
            marginBottom: 16,
          }}
        >
          {done ? 'Analysis Completed' : 'Analysis In Progress'}
        </div>

        <h1 style={{ fontSize: 24, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.5px', marginBottom: 8 }}>
          {done ? 'Claim Analysis Complete' : 'Analyzing Insurance & Hospital Documents'}
        </h1>
        <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.6 }}>
          {done
            ? 'Deterministic calculation finished. Redirecting to your financial report...'
            : 'Evaluating policy clauses, treatment sub-limits, deductible, and patient responsibility.'}
        </p>
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#475569' }}>Completion Progress</span>
          <span style={{ fontSize: 13, fontWeight: 900, color: done ? '#16A34A' : '#2563EB' }}>{progress}%</span>
        </div>
        <div style={{ background: '#E2E8F0', borderRadius: 6, height: 8, overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: done ? '#16A34A' : '#2563EB',
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      </div>

      {/* Steps List */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: 12,
          border: '1px solid #E2E8F0',
          overflow: 'hidden',
          marginBottom: 24,
        }}
      >
        {steps.map((step, idx) => {
          const isDone = step.status === 'done';
          const isProcessing = step.status === 'processing';

          return (
            <div
              key={step.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '16px 20px',
                borderBottom: idx < steps.length - 1 ? '1px solid #F1F5F9' : 'none',
                background: isProcessing ? '#F8FAFC' : isDone ? '#FFFFFF' : '#FFFFFF',
              }}
            >
              {/* Step indicator */}
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 800,
                  flexShrink: 0,
                  background: isDone ? '#F0FDF4' : isProcessing ? '#EFF6FF' : '#F1F5F9',
                  color: isDone ? '#16A34A' : isProcessing ? '#2563EB' : '#94A3B8',
                  border: isDone ? '1px solid #BBF7D0' : isProcessing ? '1px solid #BFDBFE' : '1px solid #E2E8F0',
                }}
              >
                {isDone ? '✓' : idx + 1}
              </div>

              {/* Text content */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: isDone || isProcessing ? 700 : 500,
                    color: isDone ? '#0F172A' : isProcessing ? '#2563EB' : '#94A3B8',
                  }}
                >
                  {step.label}
                </div>
                {isProcessing && (
                  <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>{step.detail}</div>
                )}
              </div>

              {/* Status Badge */}
              <div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    padding: '3px 8px',
                    borderRadius: 4,
                    background: isDone ? '#F0FDF4' : isProcessing ? '#EFF6FF' : '#F8FAFC',
                    color: isDone ? '#16A34A' : isProcessing ? '#2563EB' : '#94A3B8',
                    border: isDone ? '1px solid #BBF7D0' : isProcessing ? '1px solid #BFDBFE' : '1px solid #E2E8F0',
                  }}
                >
                  {isDone ? 'Complete' : isProcessing ? 'Active' : 'Queued'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Estimate Disclaimer */}
      <div
        style={{
          background: '#F8FAFC',
          border: '1px solid #E2E8F0',
          borderRadius: 8,
          padding: '14px 18px',
          fontSize: 12,
          color: '#64748B',
          lineHeight: 1.6,
        }}
      >
        These are illustrative estimates based on the information available in the uploaded documents. 
        Final claim settlement depends on policy terms and insurer/TPA authorization.
      </div>
    </div>
  );
}
