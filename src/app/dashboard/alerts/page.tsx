'use client';

import Link from 'next/link';

export default function AlertsPage() {
  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Room Rent Exceeds Policy Cap',
      message: 'Apollo Hospitals charged ₹7,500/day for private deluxe room. Your policy cap is ₹5,000/day. Proportionate deductions will apply to surgeon & nursing charges.',
      date: '2 hours ago',
      actionText: 'View Policy Clause',
      actionUrl: '/dashboard/results/demo-claim-001/why',
    },
    {
      id: 2,
      type: 'info',
      title: 'Pre-Authorization Initial Approval Received',
      message: 'HealthShield TPA granted initial cashless sanction for ₹2,50,000 against request of ₹3,50,000. Balance requires final bill submission.',
      date: 'Yesterday',
      actionText: 'Check Utilization',
      actionUrl: '/dashboard/utilization',
    },
  ];

  return (
    <div style={{ maxWidth: 840, margin: '0 auto' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 26, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.5px' }}>Policy & Claim Alerts</h1>
        <p style={{ fontSize: 14, color: '#64748B', marginTop: 4 }}>
          Actionable notifications regarding sub-limits, non-admissible deductions, and authorization statuses
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {alerts.map((alert) => (
          <div
            key={alert.id}
            style={{
              background: 'white',
              borderRadius: 14,
              padding: 24,
              border: '1px solid #E2E8F0',
              borderLeft: alert.type === 'warning' ? '5px solid #D97706' : '5px solid #2563EB',
              boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A' }}>{alert.title}</h3>
              <span style={{ fontSize: 12, color: '#94A3B8' }}>{alert.date}</span>
            </div>
            <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6, marginBottom: 16 }}>
              {alert.message}
            </p>
            <Link
              href={alert.actionUrl}
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: alert.type === 'warning' ? '#D97706' : '#2563EB',
                textDecoration: 'none',
              }}
            >
              {alert.actionText} →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
