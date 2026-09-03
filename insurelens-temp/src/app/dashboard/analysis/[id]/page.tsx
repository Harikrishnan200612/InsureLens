import AnalysisClient from './AnalysisClient';

export function generateStaticParams() {
  return [{ id: 'active-claim' }, { id: 'demo-claim-001' }];
}

export default function AnalysisPage() {
  return <AnalysisClient />;
}
