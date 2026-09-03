'use client';

import Link from 'next/link';
import Logo from '@/components/Logo';

const FEATURES = [
  {
    category: 'Policy Intelligence',
    title: 'Automated Clause Extraction',
    desc: 'Extracts coverage terms, sub-limits, exclusions, deductibles, and co-payment percentages across varied policy formats.',
  },
  {
    category: 'Financial Breakdown',
    title: 'Deterministic Mathematics',
    desc: 'Calculates potential insurer contribution vs estimated patient responsibility using strict rules, not generative estimates.',
  },
  {
    category: 'Gap Explanation',
    title: 'Why Am I Paying This?',
    desc: 'Every deduction is broken down with exact citations to the relevant clause in your health insurance policy.',
  },
  {
    category: 'Family Coverage',
    title: 'Age-Group Based Premiums',
    desc: 'Track floater policy members and calculate estimated premium contributions across distinct demographic tiers.',
  },
  {
    category: 'Document Flexibility',
    title: 'Multiple File Formats',
    desc: 'Accepts PDF, scanned documents, image invoices (JPG, PNG), and plain text policy schedules without template lock-in.',
  },
  {
    category: 'Utilization Ledger',
    title: 'Treatment & Benefit Tracking',
    desc: 'Monitor remaining annual sum insured and historical payouts linked to specific medical treatments.',
  },
];

const STEPS = [
  { step: '01', title: 'Upload Policy & Hospital Invoices', desc: 'Provide your insurance policy and hospital bill in PDF, image, or text format.' },
  { step: '02', title: 'Select Patient & Treatment', desc: 'Identify which family member received care and capture the specific treatment procedure.' },
  { step: '03', title: 'Clause Extraction', desc: 'The system reads policy terms to identify co-pays, deductibles, sub-limits, and exclusions.' },
  { step: '04', title: 'Deterministic Calculation', desc: 'Deterministic financial calculation applies all policy caps and computes the financial gap.' },
  { step: '05', title: 'Clarity & Citations', desc: 'Review your estimated insurance contribution, patient responsibility, and policy clause references.' },
];

export default function LandingPage() {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#F8FAFC', minHeight: '100vh', color: '#0F172A' }}>
      {/* Navigation Header */}
      <nav
        style={{
          background: '#0F172A',
          borderBottom: '1px solid #1E293B',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 68,
          }}
        >
          <Logo variant="light" size="md" href="/" />

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Link
              href="/login"
              style={{
                color: '#CBD5E1',
                fontSize: 14,
                fontWeight: 600,
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: 6,
              }}
            >
              Sign In
            </Link>
            <Link
              href="/register"
              style={{
                background: '#2563EB',
                color: '#FFFFFF',
                fontSize: 14,
                fontWeight: 700,
                textDecoration: 'none',
                padding: '9px 18px',
                borderRadius: 6,
              }}
            >
              Create Account
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        style={{
          background: '#0F172A',
          padding: '80px 28px 90px',
          borderBottom: '1px solid #1E293B',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-block',
              background: '#1E293B',
              border: '1px solid #334155',
              borderRadius: 4,
              padding: '6px 14px',
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: '#60A5FA',
              marginBottom: 24,
            }}
          >
            Financial Intelligence for Health Insurance
          </div>

          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 900,
              color: '#FFFFFF',
              lineHeight: 1.15,
              letterSpacing: '-1px',
              marginBottom: 24,
            }}
          >
            Understand Your Insurance.
            <br />
            Know Your Financial Responsibility.
          </h1>

          <p
            style={{
              fontSize: 'clamp(16px, 2vw, 19px)',
              color: '#94A3B8',
              maxWidth: 720,
              margin: '0 auto 40px',
              lineHeight: 1.6,
            }}
          >
            Insurance accepted does not mean everything is covered. Upload your policy and hospital invoices to discover potential coverage, out-of-pocket costs, and the exact reasons behind claim deductions.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/register"
              style={{
                background: '#2563EB',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: 15,
                padding: '14px 32px',
                borderRadius: 8,
                textDecoration: 'none',
              }}
            >
              Get Started Free →
            </Link>
            <Link
              href="/login"
              style={{
                background: '#1E293B',
                border: '1px solid #334155',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: 15,
                padding: '14px 32px',
                borderRadius: 8,
                textDecoration: 'none',
              }}
            >
              Sign In to Account
            </Link>
          </div>
        </div>
      </section>

      {/* Core Principle Callout */}
      <section style={{ padding: '60px 28px', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: '#DC2626', marginBottom: 8 }}>
            The Central Problem
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: '#0F172A', marginBottom: 16 }}>
            "Insurance Accepted" Does Not Mean "Everything Is Covered"
          </h2>
          <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.7, maxWidth: 760, margin: '0 auto' }}>
            A customer may have a ₹10,00,000 policy but still receive a ₹4,00,000 hospital bill where only a fraction is approved. InsureLens explains the exact financial meaning of the policy clauses instead of merely displaying raw documents.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: '80px 28px', maxWidth: 1160, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 54 }}>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: '#0F172A', textTransform: 'uppercase' }}>
            Key Capabilities
          </h2>
          <p style={{ fontSize: 15, color: '#64748B', marginTop: 4 }}>
            Built for total financial transparency before and after hospitalization
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          {FEATURES.map((f) => (
            <div
              key={f.title}
              style={{
                background: '#FFFFFF',
                borderRadius: 12,
                border: '1px solid #E2E8F0',
                padding: '28px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 6 }}>
                {f.category}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', marginBottom: 10 }}>
                {f.title}
              </h3>
              <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '80px 28px', background: '#FFFFFF', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: '#0F172A', textTransform: 'uppercase' }}>
              How InsureLens Operates
            </h2>
            <p style={{ fontSize: 15, color: '#64748B', marginTop: 4 }}>
              Document parsing to deterministic financial calculation
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {STEPS.map((s) => (
              <div
                key={s.step}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 20,
                  padding: '20px 24px',
                  background: '#F8FAFC',
                  borderRadius: 8,
                  border: '1px solid #E2E8F0',
                }}
              >
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 900,
                    color: '#2563EB',
                    background: '#EFF6FF',
                    padding: '8px 12px',
                    borderRadius: 6,
                    border: '1px solid #BFDBFE',
                  }}
                >
                  {s.step}
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginBottom: 4 }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6 }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Estimate Disclaimer Footer */}
      <footer style={{ background: '#0F172A', color: '#94A3B8', padding: '48px 28px 40px', borderTop: '1px solid #1E293B' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div style={{ marginBottom: 28 }}>
            <Logo variant="light" size="sm" href="/" />
          </div>

          <div
            style={{
              background: '#1E293B',
              border: '1px solid #334155',
              borderRadius: 8,
              padding: '16px 20px',
              fontSize: 13,
              color: '#CBD5E1',
              lineHeight: 1.6,
              marginBottom: 28,
            }}
          >
            <strong style={{ color: '#FFFFFF', textTransform: 'uppercase' }}>Mandatory Product Disclaimer: </strong>
            These are illustrative estimates based on the information available in the uploaded documents. 
            Final claim settlement depends on policy terms and insurer/TPA authorization.
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, fontSize: 13 }}>
            <div>© 2026 InsureLens. All rights reserved.</div>
            <div style={{ display: 'flex', gap: 20 }}>
              <Link href="/login" style={{ color: '#94A3B8', textDecoration: 'none' }}>Sign In</Link>
              <Link href="/register" style={{ color: '#94A3B8', textDecoration: 'none' }}>Register</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
