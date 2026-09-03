'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Logo from '@/components/Logo';
import { getCurrentUser, logout, DEFAULT_USER } from '@/lib/auth';
import { UserProfile } from '@/types';

interface MenuSubTile {
  href: string;
  label: string;
  subtitle: string;
  badge?: string;
}

interface MenuSection {
  title: string;
  items: MenuSubTile[];
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const activeUser = getCurrentUser();
    if (!activeUser) {
      router.push('/login');
      return;
    }
    setUser(activeUser);
    setLoading(false);

    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [router]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC' }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#64748B' }}>Loading your session...</span>
      </div>
    );
  }

  const menuSections: MenuSection[] = [
    {
      title: 'Overview',
      items: [
        {
          href: '/dashboard',
          label: 'Dashboard',
          subtitle: 'Primary action center',
        },
      ],
    },
    {
      title: 'Claim Intelligence',
      items: [
        {
          href: '/dashboard/upload',
          label: 'New Claim Analysis',
          subtitle: 'Upload documents & assess costs',
          badge: 'Primary',
        },
        {
          href: '/dashboard/claims',
          label: 'Claims History',
          subtitle: 'Audit log & treatment records',
        },
        {
          href: '/dashboard/results/active-claim/why',
          label: 'Deduction Gap Analysis',
          subtitle: 'Clause-by-clause rationale',
        },
      ],
    },
    {
      title: 'Insurance & Family',
      items: [
        {
          href: '/dashboard/insurance',
          label: 'My Insurance',
          subtitle: 'Policy schedule & coverage',
          badge: 'Primary',
        },
        {
          href: '/dashboard/utilization',
          label: 'Benefit Utilization',
          subtitle: 'Sum insured balance & history',
        },
      ],
    },
    {
      title: 'Records & Guidance',
      items: [
        {
          href: '/dashboard/profile',
          label: 'Insured Profile',
          subtitle: 'Identity & policy details',
        },
        {
          href: '/dashboard/documents',
          label: 'Document Vault',
          subtitle: 'Invoices, policies & approvals',
        },
        {
          href: '/dashboard/alerts',
          label: 'Policy Alerts',
          subtitle: 'Sub-limit & breach notices',
          badge: '2',
        },
        {
          href: '/dashboard/help',
          label: 'Help & Knowledge',
          subtitle: 'TPA rules & claim guidance',
        },
      ],
    },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>
      {/* Mobile Backdrop */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.6)',
            zIndex: 40,
            backdropFilter: 'blur(2px)',
          }}
        />
      )}

      {/* Navy Sidebar with Related Sub-Tiles */}
      <aside
        style={{
          width: 280,
          background: '#0F172A',
          borderRight: '1px solid #1E293B',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          transform: isMobile ? (sidebarOpen ? 'translateX(0)' : 'translateX(-100%)') : 'translateX(0)',
          transition: 'transform 0.25s ease-in-out',
        }}
      >
        {/* Logo Section */}
        <div style={{ padding: '24px 22px', borderBottom: '1px solid #1E293B' }}>
          <Logo variant="light" size="md" href="/dashboard" />
        </div>

        {/* Scrollable Navigation Menu with Related Sub-Tiles */}
        <div
          style={{
            flex: 1,
            padding: '20px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            overflowY: 'auto',
          }}
        >
          {menuSections.map((section) => (
            <div key={section.title}>
              {/* Section Header */}
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: '#64748B',
                  paddingLeft: 10,
                  marginBottom: 8,
                }}
              >
                {section.title}
              </div>

              {/* Sub-Tiles in this section */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {section.items.map((item) => {
                  const isActive =
                    item.href === '/dashboard'
                      ? pathname === '/dashboard'
                      : pathname === item.href || pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      style={{
                        padding: '10px 12px',
                        borderRadius: 8,
                        background: isActive ? '#1E293B' : 'transparent',
                        borderLeft: isActive ? '3px solid #2563EB' : '3px solid transparent',
                        textDecoration: 'none',
                        display: 'block',
                        transition: 'background 0.15s, border-color 0.15s',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: isActive ? 800 : 600,
                            color: isActive ? '#FFFFFF' : '#CBD5E1',
                          }}
                        >
                          {item.label}
                        </span>

                        {item.badge && (
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 800,
                              textTransform: 'uppercase',
                              padding: '2px 6px',
                              borderRadius: 4,
                              background: item.badge === 'Primary' ? '#1D4ED8' : '#334155',
                              color: '#FFFFFF',
                            }}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>

                      <div
                        style={{
                          fontSize: 11,
                          color: isActive ? '#94A3B8' : '#64748B',
                          marginTop: 3,
                          lineHeight: 1.3,
                        }}
                      >
                        {item.subtitle}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* User Profile & Reliable Logout */}
        <div style={{ padding: '18px 20px', borderTop: '1px solid #1E293B', background: '#0B1120' }}>
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF' }}>
              {user?.fullName || DEFAULT_USER.fullName}
            </div>
            <div style={{ fontSize: 11, color: '#64748B', marginTop: 1 }}>
              {user?.email || DEFAULT_USER.email}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <Link
              href="/dashboard/profile"
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '7px 10px',
                borderRadius: 6,
                background: '#1E293B',
                color: '#93C5FD',
                border: '1px solid #334155',
                fontSize: 12,
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Profile
            </Link>

            <button
              onClick={logout}
              style={{
                flex: 1,
                padding: '7px 10px',
                borderRadius: 6,
                background: '#1E293B',
                color: '#F87171',
                border: '1px solid #334155',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, marginLeft: isMobile ? 0 : 280, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Top Header */}
        <header
          style={{
            height: 60,
            background: '#FFFFFF',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 28px',
            position: 'sticky',
            top: 0,
            zIndex: 30,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                style={{
                  background: 'none',
                  border: '1px solid #CBD5E1',
                  borderRadius: 6,
                  padding: '6px 10px',
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Menu
              </button>
            )}
            <div style={{ fontSize: 13, fontWeight: 600, color: '#64748B' }}>
              Healthcare Financial Intelligence Platform
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>
              {user?.fullName}
            </span>
            <button
              onClick={logout}
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: '#DC2626',
                background: '#FEF2F2',
                border: '1px solid #FECACA',
                padding: '6px 12px',
                borderRadius: 6,
                cursor: 'pointer',
              }}
            >
              Sign Out
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, padding: '36px 32px', maxWidth: 1200, width: '100%', margin: '0 auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
