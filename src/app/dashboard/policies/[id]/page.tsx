import PolicyClient from './PolicyClient';

export function generateStaticParams() {
  return [{ id: 'policy-001' }];
}

export default function PolicySummaryPage() {
  return <PolicyClient />;
}
