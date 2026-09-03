'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';
import { setCurrentUser, DEFAULT_USER } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      setError('Please enter both your email address and password.');
      setLoading(false);
      return;
    }

    // Authenticate user session
    setTimeout(() => {
      const user = {
        ...DEFAULT_USER,
        email: email.trim(),
      };
      setCurrentUser(user);
      router.push('/dashboard');
    }, 400);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0F172A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          background: '#FFFFFF',
          borderRadius: 14,
          padding: '40px 36px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <Logo variant="dark" size="lg" href="/" />
          </div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>
            Sign In to InsureLens
          </h1>
          <p style={{ fontSize: 13, color: '#64748B' }}>
            Access your healthcare policy and financial claims analysis
          </p>
        </div>

        {error && (
          <div
            style={{
              background: '#FEF2F2',
              border: '1px solid #FECACA',
              color: '#DC2626',
              padding: '12px 14px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 20,
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                border: '1px solid #CBD5E1',
                borderRadius: 8,
                fontSize: 14,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Password</label>
              <span
                onClick={() => alert('Password reset instructions have been dispatched to your email address.')}
                style={{ fontSize: 12, color: '#2563EB', fontWeight: 600, cursor: 'pointer' }}
              >
                Forgot Password?
              </span>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                border: '1px solid #CBD5E1',
                borderRadius: 8,
                fontSize: 14,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              background: '#2563EB',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 8,
              padding: '13px',
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
              marginTop: 6,
              transition: 'background 0.15s',
            }}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid #E2E8F0', textAlign: 'center' }}>
          <p style={{ fontSize: 13, color: '#64748B' }}>
            Do not have an account?{' '}
            <Link href="/register" style={{ color: '#2563EB', fontWeight: 700, textDecoration: 'none' }}>
              Create New Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
