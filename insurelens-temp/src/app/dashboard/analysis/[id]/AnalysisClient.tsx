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

export default function AnalysisClient() {
  const router = useRouter();
  const params = useParams();
  const claimId = params?.id as string || 'active-claim';

  const [steps, setSteps] = useState<Step[]>(
    ANALYSIS_STEPS.map(s => ({ ...s, status: 'pending' }))
  );
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let stepIdx = 0;

    const processNextStep = () => {
      if (stepIdx >= ANALYSIS_STEPS.length) {
        setIsComplete(true);
        setTimeout(() => {
          router.push(`/dashboard/results/${claimId}`);
        }, 800);
        return;
      }

      setSteps(prev => prev.map((s, idx) => {
        if (idx < stepIdx) return { ...s, status: 'done' };
        if (idx === stepIdx) return { ...s, status: 'processing' };
        return { ...s, status: 'pending' };
      }));
      setCurrentStepIdx(stepIdx);

      const duration = ANALYSIS_STEPS[stepIdx].durationMs;
      stepIdx++;
      timer = setTimeout(processNextStep, duration);
    };

    processNextStep();
    return () => clearTimeout(timer);
  }, [claimId, router]);

  const currentStep = steps[currentStepIdx] || steps[0];
  const progressPercent = Math.round(((currentStepIdx + (isComplete ? 1 : 0)) / steps.length) * 100);

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', paddingTop: 20 }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{
          display: 'inline-block',
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          color: '#2563EB',
          background: '#EFF6FF',
          padding: '6px 14px',
          borderRadius: 4,
          marginBottom: 12,
        }}>
          Processing Intelligence Pipeline
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 900, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Analyzing Insurance & Claim
        </h1>
        <p style={{ fontSize: 14, color: '#64748B', marginTop: 4 }}>
          Reference ID: <strong style={{ color: '#0F172A' }}>{claimId}</strong>
        </p>
      </div>

      <div style={{ background: '#FFFFFF', borderRadius: 12, border: '1px solid #E2E8F0', padding: 28, marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', textTransform: 'uppercase' }}>
            Analysis Progress
          </span>
          <span style={{ fontSize: 14, fontWeight: 900, color: '#2563EB' }}>
            {progressPercent}%
          </span>
        </div>

        <div style={{ height: 12, background: '#F1F5F9', borderRadius: 6, overflow: 'hidden', marginBottom: 20 }}>
          <div
            style={{
              height: '100%',
              width: `${progressPercent}%`,
              background: '#2563EB',
              transition: 'width 0.3s ease',
            }}
          />
        </div>

        <div style={{ background: '#F8FAFC', borderRadius: 8, padding: '16px 20px', border: '1px solid #E2E8F0', marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>
            Current Step: {currentStepIdx + 1} of {steps.length}
          </div>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#0F172A' }}>
            {currentStep.label}
          </div>
          <div style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>
            {currentStep.detail}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {steps.map((step, idx) => {
            const isDone = step.status === 'done';
            const isProc = step.status === 'processing';

            return (
              <div
                key={step.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '12px 16px',
                  borderRadius: 8,
                  background: isProc ? '#EFF6FF' : isDone ? '#F8FAFC' : 'transparent',
                  border: isProc ? '1px solid #BFDBFE' : '1px solid transparent',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{
                  width: 24,
                  height: 24,
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontWeight: 900,
                  background: isDone ? '#16A34A' : isProc ? '#2563EB' : '#E2E8F0',
                  color: isDone || isProc ? '#FFFFFF' : '#94A3B8',
                  flexShrink: 0,
                }}>
                  {isDone ? '✓' : idx + 1}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: 13,
                    fontWeight: isProc || isDone ? 700 : 500,
                    color: isProc ? '#1D4ED8' : isDone ? '#0F172A' : '#94A3B8',
                  }}>
                    {step.label}
                  </div>
                </div>

                <div style={{
                  fontSize: 11,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: isDone ? '#16A34A' : isProc ? '#2563EB' : '#94A3B8',
                }}>
                  {isDone ? 'Completed' : isProc ? 'Processing' : 'Pending'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
