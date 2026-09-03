'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';
import { setCurrentUser } from '@/lib/auth';
import { UserProfile } from '@/types';

export default function RegisterPage() {
  const router = useRouter();

  // Personal Information
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Optional Insurance Information
  const [hasPolicy, setHasPolicy] = useState(false);
  const [insuranceProvider, setInsuranceProvider] = useState('');
  const [policyNumber, setPolicyNumber] = useState('');
  const [policyType, setPolicyType] = useState<'Individual Health' | 'Family Floater' | 'Senior Citizen' | 'Critical Illness'>('Family Floater');
  const [policyStartDate, setPolicyStartDate] = useState('');
  const [policyEndDate, setPolicyEndDate] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName || !dateOfBirth || !phoneNumber || !email || !password) {
      setError('Please fill in all mandatory personal information fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify your password confirmation.');
      return;
    }

    setLoading(true);

    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      fullName: fullName.trim(),
      dateOfBirth,
      gender,
      phoneNumber: phoneNumber.trim(),
      email: email.trim(),
      ...(hasPolicy && {
        insuranceProvider: insuranceProvider.trim(),
        policyNumber: policyNumber.trim(),
        policyType,
        policyStartDate,
        policyEndDate,
        sumInsured: 1000000,
      }),
    };

    setTimeout(() => {
      setCurrentUser(newUser);
      router.push('/dashboard');
    }, 500);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0F172A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 680,
          background: '#FFFFFF',
          borderRadius: 14,
          padding: '44px 40px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <Logo variant="dark" size="lg" href="/" />
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>
            Create New InsureLens Profile
          </h1>
          <p style={{ fontSize: 14, color: '#64748B' }}>
            Register to calculate insurance coverage and member premium breakdowns
          </p>
        </div>

        {error && (
          <div
            style={{
              background: '#FEF2F2',
              border: '1px solid #FECACA',
              color: '#DC2626',
              padding: '12px 16px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 24,
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* SECTION 1: Personal Information */}
          <div>
            <h2
              style={{
                fontSize: 14,
                fontWeight: 800,
                color: '#0F172A',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                borderBottom: '2px solid #E2E8F0',
                paddingBottom: 8,
                marginBottom: 16,
              }}
            >
              1. Personal Information (Required)
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Hari Krishna"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '11px 13px',
                    border: '1px solid #CBD5E1',
                    borderRadius: 8,
                    fontSize: 14,
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>
                  Date of Birth *
                </label>
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '11px 13px',
                    border: '1px solid #CBD5E1',
                    borderRadius: 8,
                    fontSize: 14,
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>
                  Gender *
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  style={{
                    width: '100%',
                    padding: '11px 13px',
                    border: '1px solid #CBD5E1',
                    borderRadius: 8,
                    fontSize: 14,
                    background: '#FFFFFF',
                    boxSizing: 'border-box',
                  }}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '11px 13px',
                    border: '1px solid #CBD5E1',
                    borderRadius: 8,
                    fontSize: 14,
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '11px 13px',
                    border: '1px solid #CBD5E1',
                    borderRadius: 8,
                    fontSize: 14,
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>
                  Password *
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '11px 13px',
                    border: '1px solid #CBD5E1',
                    borderRadius: 8,
                    fontSize: 14,
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>
                  Confirm Password *
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '11px 13px',
                    border: '1px solid #CBD5E1',
                    borderRadius: 8,
                    fontSize: 14,
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: Optional Insurance Information */}
          <div style={{ background: '#F8FAFC', padding: '20px', borderRadius: 10, border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', textTransform: 'uppercase' }}>
                2. Insurance Information (Optional)
              </span>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={hasPolicy}
                  onChange={(e) => setHasPolicy(e.target.checked)}
                />
                I already have an active policy
              </label>
            </div>

            {hasPolicy && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14, marginTop: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 4 }}>
                    Insurance Provider
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. HealthShield Insurance"
                    value={insuranceProvider}
                    onChange={(e) => setInsuranceProvider(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #CBD5E1',
                      borderRadius: 6,
                      fontSize: 13,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 4 }}>
                    Policy Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. HLT-2026-FAM-8821"
                    value={policyNumber}
                    onChange={(e) => setPolicyNumber(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #CBD5E1',
                      borderRadius: 6,
                      fontSize: 13,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 4 }}>
                    Policy Type
                  </label>
                  <select
                    value={policyType}
                    onChange={(e) => setPolicyType(e.target.value as any)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #CBD5E1',
                      borderRadius: 6,
                      fontSize: 13,
                      background: '#FFFFFF',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="Family Floater">Family Floater</option>
                    <option value="Individual Health">Individual Health</option>
                    <option value="Senior Citizen">Senior Citizen</option>
                    <option value="Critical Illness">Critical Illness</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 4 }}>
                    Policy Start Date
                  </label>
                  <input
                    type="date"
                    value={policyStartDate}
                    onChange={(e) => setPolicyStartDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #CBD5E1',
                      borderRadius: 6,
                      fontSize: 13,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 4 }}>
                    Policy End Date
                  </label>
                  <input
                    type="date"
                    value={policyEndDate}
                    onChange={(e) => setPolicyEndDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #CBD5E1',
                      borderRadius: 6,
                      fontSize: 13,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              background: '#2563EB',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 8,
              padding: '14px',
              fontWeight: 700,
              fontSize: 15,
              cursor: 'pointer',
              marginTop: 6,
            }}
          >
            {loading ? 'Creating Profile...' : 'Complete Registration & Open Dashboard'}
          </button>
        </form>

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <p style={{ fontSize: 13, color: '#64748B' }}>
            Already registered?{' '}
            <Link href="/login" style={{ color: '#2563EB', fontWeight: 700, textDecoration: 'none' }}>
              Sign In Instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
