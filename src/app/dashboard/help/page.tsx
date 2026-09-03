'use client';

export default function HelpPage() {
  const faqs = [
    {
      q: 'Why does my claim have a financial gap if I have a ₹10 Lakh sum insured?',
      a: 'Even with high sum insured, health policies have clause-based deductions such as copayments (e.g. 10%), annual deductibles, non-admissible items (gloves, sanitizers, registration fees), and room rent category caps.',
    },
    {
      q: 'What is proportionate deduction due to room rent capping?',
      a: 'If your policy restricts room rent to ₹5,000/day and you choose a room costing ₹7,500/day, insurers proportionally reduce not just the room rent difference, but also associated medical charges (doctor consultations, nursing, surgery fees) by the same ratio.',
    },
    {
      q: 'Can I challenge non-admissible deductions?',
      a: 'Yes! InsureLens flags "Needs Clarification" items that can often be reimbursed by submitting detailed itemized doctor certificates stating that specific consumables were medically essential.',
    },
    {
      q: 'Are the figures shown here guaranteed by my insurance company?',
      a: 'No. All calculations on InsureLens are illustrative mathematical estimates based on extracted policy rules and hospital invoices. Final settlement depends on insurer/TPA authorization.',
    },
  ];

  return (
    <div style={{ maxWidth: 840, margin: '0 auto' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 26, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.5px' }}>Help & Knowledge Center</h1>
        <p style={{ fontSize: 14, color: '#64748B', marginTop: 4 }}>
          Guidance on navigating insurance deductions, cashless settlement, and TPA disputes
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {faqs.map((faq, i) => (
          <div key={i} style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid #E2E8F0' }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginBottom: 8 }}>{faq.q}</h3>
            <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.7 }}>{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
