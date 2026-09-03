'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [name, setName] = useState('Rahul Sharma');
  const [email, setEmail] = useState('demo@insurelens.ai');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 26, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.5px' }}>Profile & Settings</h1>
        <p style={{ fontSize: 14, color: '#64748B', marginTop: 4 }}>
          Manage your account credentials, preferences, and notification defaults
        </p>
      </div>

      <div style={{ background: 'white', borderRadius: 14, border: '1px solid #E2E8F0', padding: 32 }}>
        {saved && (
          <div style={{
            background: '#F0FDF4',
            border: '1px solid #BBF7D0',
            color: '#16A34A',
            padding: '12px 16px',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            marginBottom: 20,
          }}>
            ✓ Profile preferences successfully saved!
          </div>
        )}

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>
              Primary Insured Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%',
                padding: '11px 14px',
                border: '1px solid #CBD5E1',
                borderRadius: 8,
                fontSize: 14,
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>
              Registered Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '11px 14px',
                border: '1px solid #CBD5E1',
                borderRadius: 8,
                fontSize: 14,
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>
              Default Currency & Number Format
            </label>
            <select
              style={{
                width: '100%',
                padding: '11px 14px',
                border: '1px solid #CBD5E1',
                borderRadius: 8,
                fontSize: 14,
                background: 'white',
              }}
            >
              <option>INR (₹ Indian Rupee) - Lakhs & Crores</option>
              <option>USD ($ US Dollar)</option>
            </select>
          </div>

          <button
            type="submit"
            style={{
              alignSelf: 'flex-start',
              background: '#2563EB',
              color: 'white',
              fontWeight: 700,
              fontSize: 14,
              padding: '11px 24px',
              borderRadius: 8,
              border: 'none',
              cursor: 'pointer',
              marginTop: 8,
            }}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
