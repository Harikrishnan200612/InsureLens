// Client-side & session auth state management for InsureLens
// Provides reliable login, user profile creation, editing, and logout handling.

import { UserProfile } from '@/types';

const STORAGE_KEY = 'insurelens_user';
const AUTH_COOKIE = 'insurelens_auth_token';

export const DEFAULT_USER: UserProfile = {
  id: 'usr_default_01',
  email: 'user@insurelens.ai',
  fullName: 'Jack Miller',
  dateOfBirth: '1998-05-12',
  gender: 'Male',
  phoneNumber: '+91 98765 43210',
  insuranceProvider: 'HealthShield Comprehensive Co.',
  policyNumber: 'HLT-2026-FAM-8821',
  policyType: 'Family Floater',
  policyStartDate: '2026-01-01',
  policyEndDate: '2026-12-31',
  sumInsured: 1000000,
};

/**
 * Returns the currently authenticated user profile or null if logged out.
 */
export function getCurrentUser(): UserProfile | null {
  if (typeof window === 'undefined') {
    return DEFAULT_USER;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Persists an authenticated user session into localStorage and cookie.
 */
export function setCurrentUser(user: UserProfile): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    // Set a cookie so Next.js server components or middleware can inspect session if needed
    document.cookie = `${AUTH_COOKIE}=true; path=/; max-age=86400; SameSite=Lax`;
  } catch (err) {
    console.error('Failed to set user session', err);
  }
}

/**
 * Updates properties of the current user profile.
 */
export function updateProfile(updates: Partial<UserProfile>): UserProfile {
  const current = getCurrentUser() || DEFAULT_USER;
  const updated: UserProfile = { ...current, ...updates };
  setCurrentUser(updated);
  return updated;
}

/**
 * Checks if the user is currently logged in.
 */
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return true;
  return localStorage.getItem(STORAGE_KEY) !== null;
}

/**
 * Reliable Logout:
 * 1. Clears local storage item
 * 2. Clears authentication cookie
 * 3. Navigates to /login
 */
export function logout(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
    // Expire auth cookie
    document.cookie = `${AUTH_COOKIE}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
  } catch (err) {
    console.error('Error during logout', err);
  }

  // Force redirect to login page
  window.location.href = '/login';
}
