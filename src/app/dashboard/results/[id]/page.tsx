import ResultsClient from './ResultsClient';

export function generateStaticParams() {
  return [{ id: 'active-claim' }, { id: 'demo-claim-001' }];
}

export default function ClaimResultPage() {
  return <ResultsClient />;
}
