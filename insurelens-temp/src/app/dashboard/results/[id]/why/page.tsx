import WhyClient from './WhyClient';

export function generateStaticParams() {
  return [{ id: 'active-claim' }, { id: 'demo-claim-001' }];
}

export default function WhyAmIPayingPage() {
  return <WhyClient />;
}
