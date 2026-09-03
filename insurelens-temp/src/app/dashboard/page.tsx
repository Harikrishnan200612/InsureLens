'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCurrentUser, DEFAULT_USER } from '@/lib/auth';
import { UserProfile } from '@/types';

export default function NewDashboardPage() {
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);

  useEffect(() => {
    const active = getCurrentUser();
    if (active) {
      setUser(active);
    }
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', paddingTop: 20 }}>
      {/* Brand Header */}
      <div style={{ marginBottom: 40, textAlign: 'left', borderBottom: '1px solid #E2E8F0', paddingBottom: 28 }}>
        <div
          style={{
            fontSize: 28,
            fontWeight: 900,
            letterSpacing: '1px',
            color: '#0F172A',
            textTransform: 'uppercase',
            marginBottom: 4,
          }}
        >
          INSURELENS
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#64748B' }}>
          Insurance Financial Clarity
        </div>

        <div style={{ marginTop: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A' }}>
            Welcome back, {user.fullName}
          </h1>
          <p style={{ fontSize: 15, color: '#64748B', marginTop: 6 }}>
            Choose what you want to do:
          </p>
        </div>
      </div>

      {/* ONLY TWO PRIMARY MENU OPTIONS */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: 24,
          marginBottom: 36,
        }}
      >
        {/* OPTION 1: NEW CLAIM ANALYSIS */}
        <Link
          href="/dashboard/upload"
          style={{
            textDecoration: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: '#FFFFFF',
            borderRadius: 14,
            padding: '36px 32px',
            border: '2px solid #2563EB',
            boxShadow: '0 4px 14px rgba(37, 99, 235, 0.08)',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: '#2563EB',
                marginBottom: 12,
              }}
            >
              Action 01
            </div>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 900,
                color: '#0F172A',
                letterSpacing: '-0.5px',
                marginBottom: 12,
                textTransform: 'uppercase',
              }}
            >
              NEW CLAIM ANALYSIS
            </h2>
            <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.6 }}>
              Analyze your insurance coverage and estimate your financial responsibility for an upcoming or past hospital treatment.
            </p>
          </div>

          <div style={{ marginTop: 28 }}>
            <span
              style={{
                display: 'inline-block',
                background: '#2563EB',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: 14,
                padding: '12px 24px',
                borderRadius: 8,
              }}
            >
              Start Claim Analysis →
            </span>
          </div>
        </Link>

        {/* OPTION 2: MY INSURANCE */}
        <Link
          href="/dashboard/insurance"
          style={{
            textDecoration: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: '#FFFFFF',
            borderRadius: 14,
            padding: '36px 32px',
            border: '1px solid #CBD5E1',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: '#64748B',
                marginBottom: 12,
              }}
            >
              Action 02
            </div>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 900,
                color: '#0F172A',
                letterSpacing: '-0.5px',
                marginBottom: 12,
                textTransform: 'uppercase',
              }}
            >
              MY INSURANCE
            </h2>
            <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.6 }}>
              View your insurance policies, family members, age-group based premiums, and benefit utilization history.
            </p>
          </div>

          <div style={{ marginTop: 28 }}>
            <span
              style={{
                display: 'inline-block',
                background: '#0F172A',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: 14,
                padding: '12px 24px',
                borderRadius: 8,
              }}
            >
              View My Insurance →
            </span>
          </div>
        </Link>
      </div>

      {/* Estimate Disclaimer */}
      <div
        style={{
          background: '#F8FAFC',
          border: '1px solid #E2E8F0',
          borderRadius: 10,
          padding: '16px 20px',
          fontSize: 13,
          color: '#64748B',
          lineHeight: 1.6,
        }}
      >
        <span style={{ fontWeight: 700, color: '#0F172A' }}>Notice: </span>
        These are illustrative estimates based on the information available in the uploaded documents. 
        Final claim settlement depends on policy terms and insurer/TPA authorization.
      </div>
    </div>
  );
}
