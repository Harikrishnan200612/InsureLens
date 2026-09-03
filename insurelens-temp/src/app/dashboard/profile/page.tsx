'use client';

import { useState, useEffect } from 'react';
import { getCurrentUser, updateProfile, DEFAULT_USER } from '@/lib/auth';
import { getAge } from '@/lib/premiumService';
import { UserProfile } from '@/types';

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(DEFAULT_USER);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const active = getCurrentUser() || DEFAULT_USER;
    setUser(active);
    setFormData(active);
  }, []);

  const calculatedAge = getAge(user.dateOfBirth);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = updateProfile(formData);
    setUser(updated);
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Insured User Profile
          </h1>
          <p style={{ fontSize: 14, color: '#64748B', marginTop: 4 }}>
            Manage your personal identity information and associated health policy credentials
          </p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          style={{
            background: isEditing ? '#F1F5F9' : '#0F172A',
            color: isEditing ? '#0F172A' : '#FFFFFF',
            border: isEditing ? '1px solid #CBD5E1' : 'none',
            padding: '10px 20px',
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          {isEditing ? 'Cancel Editing' : 'Edit Profile Information'}
        </button>
      </div>

      {savedSuccess && (
        <div
          style={{
            background: '#F0FDF4',
            border: '1px solid #BBF7D0',
            color: '#16A34A',
            padding: '12px 18px',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 700,
            marginBottom: 24,
          }}
        >
          Profile information successfully updated and saved.
        </div>
      )}

      {isEditing ? (
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Edit Personal Information */}
          <div style={{ background: '#FFFFFF', borderRadius: 12, border: '1px solid #E2E8F0', padding: 28 }}>
            <h2 style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', marginBottom: 20 }}>
              Edit Personal Details
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #CBD5E1', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  required
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #CBD5E1', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #CBD5E1', borderRadius: 6, fontSize: 14, background: 'white', boxSizing: 'border-box' }}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  required
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #CBD5E1', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #CBD5E1', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }}
                />
              </div>
            </div>
          </div>

          {/* Edit Insurance Details */}
          <div style={{ background: '#FFFFFF', borderRadius: 12, border: '1px solid #E2E8F0', padding: 28 }}>
            <h2 style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', marginBottom: 20 }}>
              Edit Insurance Policy Information
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>
                  Insurance Provider
                </label>
                <input
                  type="text"
                  value={formData.insuranceProvider || ''}
                  onChange={(e) => setFormData({ ...formData, insuranceProvider: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #CBD5E1', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>
                  Policy Number
                </label>
                <input
                  type="text"
                  value={formData.policyNumber || ''}
                  onChange={(e) => setFormData({ ...formData, policyNumber: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #CBD5E1', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>
                  Policy Type
                </label>
                <select
                  value={formData.policyType || 'Family Floater'}
                  onChange={(e) => setFormData({ ...formData, policyType: e.target.value as any })}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #CBD5E1', borderRadius: 6, fontSize: 14, background: 'white', boxSizing: 'border-box' }}
                >
                  <option value="Family Floater">Family Floater</option>
                  <option value="Individual Health">Individual Health</option>
                  <option value="Senior Citizen">Senior Citizen</option>
                  <option value="Critical Illness">Critical Illness</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>
                  Policy Start Date
                </label>
                <input
                  type="date"
                  value={formData.policyStartDate || ''}
                  onChange={(e) => setFormData({ ...formData, policyStartDate: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #CBD5E1', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>
                  Policy End Date
                </label>
                <input
                  type="date"
                  value={formData.policyEndDate || ''}
                  onChange={(e) => setFormData({ ...formData, policyEndDate: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #CBD5E1', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button
              type="submit"
              style={{
                background: '#2563EB',
                color: 'white',
                border: 'none',
                padding: '12px 28px',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Save Profile Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              style={{
                background: '#F1F5F9',
                color: '#334155',
                border: '1px solid #CBD5E1',
                padding: '12px 24px',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* SECTION: Personal Information */}
          <div style={{ background: '#FFFFFF', borderRadius: 12, border: '1px solid #E2E8F0', padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, borderBottom: '1px solid #F1F5F9', paddingBottom: 12 }}>
              <h2 style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', textTransform: 'uppercase' }}>
                Personal Information
              </h2>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#2563EB', background: '#EFF6FF', padding: '4px 10px', borderRadius: 6 }}>
                Primary Policyholder
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: 4 }}>Full Name</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#0F172A' }}>{user.fullName}</div>
              </div>

              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: 4 }}>Date of Birth</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#0F172A' }}>{user.dateOfBirth || 'Not specified'}</div>
              </div>

              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: 4 }}>Calculated Age</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: '#2563EB' }}>{calculatedAge} Years</div>
              </div>

              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: 4 }}>Gender</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#0F172A' }}>{user.gender}</div>
              </div>

              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: 4 }}>Phone Number</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#0F172A' }}>{user.phoneNumber}</div>
              </div>

              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: 4 }}>Email Address</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#0F172A' }}>{user.email}</div>
              </div>
            </div>
          </div>

          {/* SECTION: Insurance Information */}
          <div style={{ background: '#FFFFFF', borderRadius: 12, border: '1px solid #E2E8F0', padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, borderBottom: '1px solid #F1F5F9', paddingBottom: 12 }}>
              <h2 style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', textTransform: 'uppercase' }}>
                Insurance Information
              </h2>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#16A34A', background: '#F0FDF4', padding: '4px 10px', borderRadius: 6 }}>
                Active Policy
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: 4 }}>Insurance Provider</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#0F172A' }}>{user.insuranceProvider || 'Information not specified'}</div>
              </div>

              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: 4 }}>Policy Number</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#0F172A' }}>{user.policyNumber || 'Information not specified'}</div>
              </div>

              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: 4 }}>Policy Type</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#0F172A' }}>{user.policyType || 'Individual Health'}</div>
              </div>

              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: 4 }}>Policy Validity</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#0F172A' }}>
                  {user.policyStartDate && user.policyEndDate ? `${user.policyStartDate} to ${user.policyEndDate}` : 'Not specified'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
